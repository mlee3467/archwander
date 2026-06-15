// sync.js — Cross-device sync via Supabase Auth + user_state table
// ══════════════════════════════════════════════════════════════════

// ── localStorage keys to sync ─────────────────────────────────────
var _SYNC_KEYS = {
  favs:        'archwander_favs_v1',
  visited:     'archwander_visited_v1',
  visit_dates: 'aw_visit_dates_v1',
  visit_notes: 'aw_visit_notes_v1',
  routes:      'aw_saved_routes_v2'
};

// ── State ─────────────────────────────────────────────────────────
var _syncUser        = null;  // current Supabase user (null if anon)
var _syncLastAt      = null;  // ISO string of last successful sync
var _syncPushTimer   = null;  // debounce timer for auto-push
var _syncPendingEmail = '';   // OTP flow: email being verified
var _syncBusy        = false; // prevent concurrent syncs
var _syncModalMode   = 'sync'; // 'signup' | 'login' | 'sync'

// ── Init: attach to Supabase auth state ──────────────────────────
function syncInit() {
  if (!_supabase) return;
  _syncLastAt = localStorage.getItem('aw_sync_last');

  _supabase.auth.onAuthStateChange(function(event, session) {
    var user = session && session.user;
    var isAnon = !user || !!user.is_anonymous;
    var prevUser = _syncUser;
    _syncUser = isAnon ? null : user;

    if (!isAnon && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
      var wasSignedOut = !prevUser;
      var ago = _syncLastAt ? (Date.now() - new Date(_syncLastAt).getTime()) : Infinity;
      // Auto-sync on login/restore, or if >30 min since last sync
      if (wasSignedOut || ago > 30 * 60 * 1000) {
        syncAll().catch(function(e) { console.warn('[sync] auto-sync failed:', e.message); });
      }
    }

    // Update My Page UI + header auth area
    _syncUpdateStatusUI();
    _updateHeaderAuth();
  });
}

// ── Read all sync-relevant data from localStorage ─────────────────
function _syncReadLocal() {
  function _arr(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { return []; }
  }
  function _obj(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch(e) { return {}; }
  }
  return {
    favs:        _arr(_SYNC_KEYS.favs),
    visited:     _arr(_SYNC_KEYS.visited),
    visit_dates: _obj(_SYNC_KEYS.visit_dates),
    visit_notes: _obj(_SYNC_KEYS.visit_notes),
    routes:      _arr(_SYNC_KEYS.routes)
  };
}

// ── Write merged state to localStorage + refresh in-memory sets ──
function _syncWriteLocal(state) {
  localStorage.setItem(_SYNC_KEYS.favs,        JSON.stringify(state.favs        || []));
  localStorage.setItem(_SYNC_KEYS.visited,     JSON.stringify(state.visited     || []));
  localStorage.setItem(_SYNC_KEYS.visit_dates, JSON.stringify(state.visit_dates || {}));
  localStorage.setItem(_SYNC_KEYS.visit_notes, JSON.stringify(state.visit_notes || {}));
  localStorage.setItem(_SYNC_KEYS.routes,      JSON.stringify(state.routes      || []));

  // Refresh in-memory favs/visited sets
  if (typeof _favSet !== 'undefined' && _favSet) {
    _favSet.clear();
    (state.favs || []).forEach(function(id) { _favSet.add(id); });
  }
  if (typeof _visSet !== 'undefined' && _visSet) {
    _visSet.clear();
    (state.visited || []).forEach(function(id) { _visSet.add(id); });
  }
  // Refresh map markers if loaded
  if (typeof markers !== 'undefined' && typeof _buildLocIcon === 'function') {
    Object.values(markers).forEach(function(m) {
      if (m._locId) {
        var lc = (typeof LOCS !== 'undefined' ? LOCS : []).find(function(l) { return l.id === m._locId; });
        if (lc) { try { m.setIcon(_buildLocIcon(lc)); } catch(e) {} }
      }
    });
  }
  // Refresh passport stats if visible
  if (typeof _updatePassportStats === 'function') {
    try { _updatePassportStats(); } catch(e) {}
  }
}

// ── Merge local + server state ────────────────────────────────────
// favs/visited: union (never lose data)
// visit_dates/notes: union of keys; local wins on conflict
// routes: merge by id; latest savedAt wins; routes without id are kept
function _syncMerge(local, server) {
  var favs    = Array.from(new Set((local.favs    || []).concat(server.favs    || [])));
  var visited = Array.from(new Set((local.visited || []).concat(server.visited || [])));

  var visit_dates = Object.assign({}, server.visit_dates || {}, local.visit_dates || {});
  var visit_notes = Object.assign({}, server.visit_notes || {}, local.visit_notes || {});

  // Merge routes by id
  var routeMap = {};
  (server.routes || []).forEach(function(r) {
    if (r && r.id) routeMap[r.id] = r;
  });
  var noIdRoutes = [];
  (local.routes || []).forEach(function(r) {
    if (!r) return;
    if (!r.id) { noIdRoutes.push(r); return; }
    var existing = routeMap[r.id];
    if (!existing) { routeMap[r.id] = r; return; }
    var lTime = r.savedAt       ? new Date(r.savedAt).getTime()       : 0;
    var sTime = existing.savedAt ? new Date(existing.savedAt).getTime() : 0;
    if (lTime >= sTime) routeMap[r.id] = r;
  });
  var routes = Object.values(routeMap).concat(noIdRoutes);

  return { favs, visited, visit_dates, visit_notes, routes };
}

// ── Push local → Supabase ─────────────────────────────────────────
async function syncPush() {
  if (!_supabase || !_syncUser) return;
  var state = _syncReadLocal();
  var res = await _supabase
    .from('user_state')
    .upsert({
      user_id:     _syncUser.id,
      favs:        state.favs,
      visited:     state.visited,
      visit_dates: state.visit_dates,
      visit_notes: state.visit_notes,
      routes:      state.routes,
      updated_at:  new Date().toISOString()
    }, { onConflict: 'user_id' });
  if (res.error) throw new Error(res.error.message);
  _syncLastAt = new Date().toISOString();
  localStorage.setItem('aw_sync_last', _syncLastAt);
  _syncUpdateStatusUI();
}

// ── Pull Supabase → return server state (or null if no row) ──────
async function _syncPull() {
  if (!_supabase || !_syncUser) return null;
  var res = await _supabase
    .from('user_state')
    .select('*')
    .eq('user_id', _syncUser.id)
    .single();
  if (res.error) {
    if (res.error.code === 'PGRST116') return null; // no row yet (expected for new user)
    throw new Error(res.error.message);
  }
  return res.data;
}

// ── Full sync: pull → merge → push ───────────────────────────────
async function syncAll() {
  if (!_supabase || !_syncUser || _syncBusy) return;
  _syncBusy = true;
  try {
    var server = await _syncPull();
    var local  = _syncReadLocal();
    var merged = server ? _syncMerge(local, server) : local;
    _syncWriteLocal(merged);
    await syncPush(); // push merged result so server is always up to date
    console.log('[sync] syncAll done — user:', _syncUser.email || _syncUser.id);
  } catch(e) {
    console.warn('[sync] syncAll failed:', e.message);
    throw e;
  } finally {
    _syncBusy = false;
  }
}

// ── Debounced auto-push (call after any local data change) ────────
function syncSchedulePush() {
  if (!_syncUser) return; // only push if logged in
  clearTimeout(_syncPushTimer);
  _syncPushTimer = setTimeout(function() {
    syncPush().catch(function(e) { console.warn('[sync] auto-push failed:', e.message); });
  }, 3000);
}

// ── OTP: send code ────────────────────────────────────────────────
async function syncSendOtp(email) {
  if (!_supabase) throw new Error('Supabase not initialized');
  var res = await _supabase.auth.signInWithOtp({
    email: email,
    options: { shouldCreateUser: true }
  });
  if (res.error) throw new Error(res.error.message);
  _syncPendingEmail = email;
}

// ── OTP: verify code ──────────────────────────────────────────────
async function syncVerifyOtp(email, token) {
  if (!_supabase) throw new Error('Supabase not initialized');
  var res = await _supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: 'email'
  });
  if (res.error) throw new Error(res.error.message);
  return res.data;
}

// ── Google OAuth ──────────────────────────────────────────────────
async function syncSignInGoogle() {
  if (!_supabase) throw new Error('Supabase not initialized');
  var res = await _supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname,
      queryParams: { access_type: 'offline', prompt: 'select_account' }
    }
  });
  if (res.error) throw new Error(res.error.message);
}

// ── Apple OAuth ───────────────────────────────────────────────────
async function syncSignInApple() {
  if (!_supabase) throw new Error('Supabase not initialized');
  var res = await _supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
  if (res.error) throw new Error(res.error.message);
}

// ── Facebook OAuth ────────────────────────────────────────────────
async function syncSignInFacebook() {
  if (!_supabase) throw new Error('Supabase not initialized');
  var res = await _supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
  if (res.error) throw new Error(res.error.message);
}

// ── Sign out ──────────────────────────────────────────────────────
async function syncSignOut() {
  if (!_supabase) return;
  await _supabase.auth.signOut();
  _syncUser  = null;
  _syncLastAt = null;
  localStorage.removeItem('aw_sync_last');
  // Re-establish anonymous session so Supabase RLS still works for location data
  window._sbAuthReady   = false;
  window._sbAuthPromise = null;
  if (typeof _ensureSupabaseAuth === 'function') _ensureSupabaseAuth();
  _syncUpdateStatusUI();
  _updateHeaderAuth();
}

// ════════════════════════════════════════════════════════════════════
// SYNC MODAL
// ════════════════════════════════════════════════════════════════════

function syncOpenModal(mode) {
  var el = document.getElementById('sync-modal');
  if (!el) return;
  _syncModalMode = mode || 'sync'; // 'signup' | 'login' | 'sync'
  _syncRenderStep('method');
  el.style.display = 'flex';
  // Close on backdrop click
  el.onclick = function(e) { if (e.target === el) syncCloseModal(); };
}

function syncCloseModal() {
  var el = document.getElementById('sync-modal');
  if (el) el.style.display = 'none';
}

function _isKo() {
  return (typeof currentLang !== 'undefined' && currentLang === 'ko')
    || (navigator.language || '').startsWith('ko');
}

function _syncRenderStep(step, errorMsg) {
  var body = document.getElementById('sync-modal-body');
  if (!body) return;
  var ko = _isKo();

  if (step === 'method') {
    var isSignup = _syncModalMode === 'signup';
    var isLogin  = _syncModalMode === 'login';
    var title = isSignup ? (ko ? '🙌 ArchWander 가입하기' : '🙌 Create Your Account')
              : isLogin  ? (ko ? '👋 다시 오셨군요!' : '👋 Welcome Back')
              : (ko ? '🔄 기기 간 동기화' : '🔄 Sync Across Devices');
    var sub = isSignup
      ? (ko ? '이메일로 계정을 만들어 즐겨찾기·방문·루트를<br>모든 기기에서 유지하세요.'
            : 'Create your account to keep favorites, visits<br>&amp; routes synced across all your devices.')
      : isLogin
      ? (ko ? '이메일로 로그인하면 저장된 즐겨찾기·방문·루트를<br>이 기기로 복원합니다.'
            : 'Sign in to restore your saved favorites, visits<br>&amp; routes on this device.')
      : (ko ? '로그인하면 즐겨찾기·방문 기록·저장 루트가<br>모든 기기에 자동 동기화됩니다.'
            : 'Sign in to keep favorites, visits &amp; routes<br>in sync across all your devices.');
    body.innerHTML =
      '<div class="sm-title">' + title + '</div>' +
      '<div class="sm-sub">' + sub + '</div>' +
      // Apple
      '<button class="sm-btn sm-btn-apple" onclick="_syncDoApple()">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" style="flex-shrink:0;margin-right:8px"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>' +
        (ko ? 'Apple로 계속' : 'Continue with Apple') +
      '</button>' +
      // Google
      '<button class="sm-btn sm-btn-google" onclick="_syncDoGoogle()">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" style="flex-shrink:0;margin-right:8px"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>' +
        (ko ? 'Google로 계속' : 'Continue with Google') +
      '</button>' +
      // Facebook
      '<button class="sm-btn sm-btn-facebook" onclick="_syncDoFacebook()">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" style="flex-shrink:0;margin-right:8px"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
        (ko ? 'Facebook으로 계속' : 'Continue with Facebook') +
      '</button>' +
      '<div class="sm-divider"><span>' + (ko ? '또는 이메일로' : 'or continue with email') + '</span></div>' +
      '<label class="sm-label">' + (ko ? '이메일 주소' : 'Email address') + '</label>' +
      '<input class="sm-input" id="sm-email" type="email" placeholder="you@example.com" autocomplete="email">' +
      (errorMsg ? '<div class="sm-error">' + errorMsg + '</div>' : '') +
      '<button class="sm-btn sm-btn-primary" onclick="_syncDoSendOtp()">' + (ko ? '인증 코드 받기 →' : 'Send Code →') + '</button>';
    var inp = document.getElementById('sm-email');
    if (inp) {
      inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') _syncDoSendOtp(); });
      setTimeout(function() { try { inp.focus(); } catch(e) {} }, 80);
    }

  } else if (step === 'otp') {
    body.innerHTML =
      '<div class="sm-title">' + (ko ? '📨 코드를 확인하세요' : '📨 Check Your Email') + '</div>' +
      '<div class="sm-sub">' + (ko
        ? '<strong>' + _syncPendingEmail + '</strong>으로<br>6자리 인증 코드를 보냈어요.'
        : 'We sent a 6-digit code to<br><strong>' + _syncPendingEmail + '</strong>.') + '</div>' +
      '<label class="sm-label">' + (ko ? '인증 코드 6자리' : '6-digit code') + '</label>' +
      '<input class="sm-input sm-input-otp" id="sm-otp" type="text" inputmode="numeric" maxlength="6" placeholder="000000" autocomplete="one-time-code">' +
      (errorMsg ? '<div class="sm-error">' + errorMsg + '</div>' : '') +
      '<button class="sm-btn sm-btn-primary" onclick="_syncDoVerify()">' + (ko ? '인증 완료 →' : 'Verify →') + '</button>' +
      '<button class="sm-btn sm-btn-text" onclick="_syncRenderStep(\'method\')">' + (ko ? '← 다시 시도' : '← Try again') + '</button>';
    var otpInp = document.getElementById('sm-otp');
    if (otpInp) {
      otpInp.addEventListener('keydown', function(e) { if (e.key === 'Enter') _syncDoVerify(); });
      setTimeout(function() { try { otpInp.focus(); } catch(e) {} }, 80);
    }

  } else if (step === 'loading') {
    body.innerHTML =
      '<div class="sm-spinner"></div>' +
      '<div class="sm-title">' + (ko ? '⏳ 동기화 중...' : '⏳ Syncing...') + '</div>' +
      '<div class="sm-sub">' + (ko ? '잠깐만 기다려 주세요.' : 'Just a moment.') + '</div>';

  } else if (step === 'success') {
    var email = _syncUser && _syncUser.email ? _syncUser.email : '';
    body.innerHTML =
      '<div class="sm-check">✓</div>' +
      '<div class="sm-title">' + (ko ? '동기화 완료!' : 'All Synced!') + '</div>' +
      '<div class="sm-sub">' + (ko
        ? (email ? '<strong>' + email + '</strong>으로 로그인되었어요.<br>즐겨찾기·방문·루트가 모든 기기에서 자동으로 동기화됩니다.' : '동기화 완료!')
        : (email ? 'Signed in as <strong>' + email + '</strong>.<br>Favorites, visits &amp; routes now sync automatically.' : 'Sync complete!')) + '</div>' +
      '<button class="sm-btn sm-btn-primary" onclick="syncCloseModal()">' + (ko ? '완료' : 'Done') + '</button>';
    setTimeout(syncCloseModal, 3500);
  }
}

async function _syncDoGoogle() {
  var ko = _isKo();
  try {
    _syncRenderStep('loading');
    await syncSignInGoogle();
  } catch(e) {
    _syncRenderStep('method', (ko ? 'Google 로그인 실패: ' : 'Google error: ') + e.message);
  }
}

async function _syncDoApple() {
  var ko = _isKo();
  try {
    _syncRenderStep('loading');
    await syncSignInApple();
  } catch(e) {
    _syncRenderStep('method', (ko ? 'Apple 로그인 실패: ' : 'Apple error: ') + e.message);
  }
}

async function _syncDoFacebook() {
  var ko = _isKo();
  try {
    _syncRenderStep('loading');
    await syncSignInFacebook();
  } catch(e) {
    _syncRenderStep('method', (ko ? 'Facebook 로그인 실패: ' : 'Facebook error: ') + e.message);
  }
}

async function _syncDoSendOtp() {
  var ko = _isKo();
  var emailEl = document.getElementById('sm-email');
  if (!emailEl) return;
  var email = emailEl.value.trim();
  if (!email || !email.includes('@')) {
    emailEl.style.borderColor = '#e11d48';
    try { emailEl.focus(); } catch(e) {}
    return;
  }
  emailEl.disabled = true;
  try {
    await syncSendOtp(email);
    _syncRenderStep('otp');
  } catch(e) {
    emailEl.disabled = false;
    _syncRenderStep('method', (ko ? '전송 실패: ' : 'Error: ') + e.message);
  }
}

async function _syncDoVerify() {
  var ko = _isKo();
  var tokenEl = document.getElementById('sm-otp');
  if (!tokenEl) return;
  var token = tokenEl.value.replace(/\D/g, '').slice(0, 6);
  if (token.length !== 6) {
    tokenEl.style.borderColor = '#e11d48';
    try { tokenEl.focus(); } catch(e) {}
    return;
  }
  tokenEl.disabled = true;
  _syncRenderStep('loading');
  try {
    await syncVerifyOtp(_syncPendingEmail, token);
    // onAuthStateChange fires SIGNED_IN → syncAll() runs automatically
    // Give it a moment to finish then show success
    await new Promise(function(res) { setTimeout(res, 1800); });
    _syncRenderStep('success');
  } catch(e) {
    _syncRenderStep('otp', (ko ? '인증 실패: ' : 'Error: ') + e.message);
  }
}

// ── Header auth area (Sign Up / Log In / user chip) ───────────────
function _updateHeaderAuth() {
  var el = document.getElementById('header-auth-area');
  if (!el) return;
  var ko = _isKo();

  if (_syncUser && _syncUser.email) {
    // Logged in — show user initial chip (clicks open My Page)
    var initial = _syncUser.email.charAt(0).toUpperCase();
    el.innerHTML =
      '<button class="hdr-user-chip" onclick="typeof _sbaMyPage===\'function\'?_sbaMyPage():syncOpenModal()" title="' + _syncUser.email + '">' +
        initial +
      '</button>';
  } else {
    // Not logged in — Sign Up + Log In
    el.innerHTML =
      '<button class="hdr-auth-btn hdr-auth-signup" onclick="syncOpenModal(\'signup\')">' +
        (ko ? '회원가입' : 'Sign Up') +
      '</button>' +
      '<button class="hdr-auth-btn hdr-auth-login" onclick="syncOpenModal(\'login\')">' +
        (ko ? '로그인' : 'Log In') +
      '</button>';
  }
}

// ── My Page sync status block ─────────────────────────────────────
function _syncUpdateStatusUI() {
  var el = document.getElementById('mpp-sync-status');
  if (!el) return;
  var ko = _isKo();
  _syncLastAt = _syncLastAt || localStorage.getItem('aw_sync_last');

  if (_syncUser && _syncUser.email) {
    var lastStr = '—';
    if (_syncLastAt) {
      try {
        lastStr = new Date(_syncLastAt).toLocaleString('ko-KR', {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
      } catch(e) { lastStr = _syncLastAt.slice(0, 16); }
    }
    el.innerHTML =
      '<div class="mpp-sync-row">' +
        '<div class="mpp-sync-info">' +
          '<div class="mpp-sync-email">✅ ' + _syncUser.email + '</div>' +
          '<div class="mpp-sync-last">' + (ko ? '마지막 동기화: ' : 'Last sync: ') + lastStr + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="mpp-btn-row" style="margin-top:8px">' +
        '<button class="mpp-btn mpp-btn-syncon" onclick="_mppDoSync()">' + (ko ? '🔄 지금 동기화' : '🔄 Sync Now') + '</button>' +
        '<button class="mpp-btn mpp-btn-signout" onclick="_mppDoSignOut()">' + (ko ? '로그아웃' : 'Sign Out') + '</button>' +
      '</div>';
  } else {
    el.innerHTML =
      '<button class="mpp-btn mpp-btn-syncon" onclick="syncOpenModal()" style="width:100%">' +
        (ko ? '🔄 기기 간 동기화 설정하기' : '🔄 Set Up Cross-Device Sync') +
      '</button>' +
      '<div class="mpp-sync-hint">' +
        (ko ? '즐겨찾기·방문·루트를 모든 기기에서 유지' : 'Keep favorites, visits &amp; routes on every device') +
      '</div>';
  }
  // Keep header auth area in sync
  _updateHeaderAuth();
}

async function _mppDoSync() {
  var ko = _isKo();
  var el = document.getElementById('mpp-sync-status');
  if (el) el.innerHTML = '<div style="text-align:center;padding:12px;color:#888;font-size:12px">' + (ko ? '⏳ 동기화 중...' : '⏳ Syncing...') + '</div>';
  try {
    await syncAll();
    // Re-render My Page to reflect updated status
    if (typeof _closeMyPage === 'function' && typeof _openMyPage === 'function') {
      _closeMyPage();
      setTimeout(_openMyPage, 80);
    } else {
      _syncUpdateStatusUI();
    }
  } catch(e) {
    if (el) _syncUpdateStatusUI();
    alert((ko ? '동기화 실패: ' : 'Sync failed: ') + e.message);
  }
}

async function _mppDoSignOut() {
  var ko = _isKo();
  if (!confirm(ko ? '로그아웃하면 이 기기의 동기화가 해제됩니다. 계속할까요?' : 'Sign out and disconnect this device from sync?')) return;
  await syncSignOut();
  if (typeof _closeMyPage === 'function' && typeof _openMyPage === 'function') {
    _closeMyPage();
    setTimeout(_openMyPage, 80);
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────
// Runs after _supabase is created in config.js
if (typeof _supabase !== 'undefined' && _supabase) {
  syncInit();
}
// Render initial auth area (Sign Up / Log In) after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  _updateHeaderAuth();
});
