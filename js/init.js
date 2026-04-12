// ── Hard refresh: purge SW caches, keep localStorage (favs/visits) ──
function hardRefresh() {
  if (!confirm('캐시를 삭제하고 새로고침합니다.\n즐겨찾기/방문 데이터는 유지됩니다.\n\nClear cache and reload?\nFavorites & visits will be kept.')) return;
  if ('caches' in window) {
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(n) { return caches.delete(n); }));
    }).then(function() {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then(function(r) {
          if (r) r.unregister().then(function() { location.reload(true); });
          else location.reload(true);
        });
      } else { location.reload(true); }
    });
  } else { location.reload(true); }
}

// ── Post-init: map + panes + listeners (called after initMap) ──
function _postInitMap() {
  initMap();

  // ── Custom panes for walk overlay z-ordering ──────────────────
  // Leaflet defaults: tilePane=200, overlayPane=400, markerPane=600
  // Walk mask + lines must sit above tiles but BELOW location markers
  var _mkPane = function(name, z) {
    var p = map.createPane(name);
    p.style.zIndex = z;
    p.style.pointerEvents = 'none';
  };
  _mkPane('walkMask',    390);
  _mkPane('walkOverlay', 395);
  _mkPane('walkMarker',  610);

  map.on('zoomend', updateMarkerSize);

  // ── Pin drop: place marker on map click ────────────────────────
  map.on('click', function(e) {
    if (routePinDropMode) {
      routePinDropMode = false;
      map.getContainer().style.cursor = '';
      _onRoutePinDropped(e.latlng.lat, e.latlng.lng);
      return;
    }
    if (!pinDropMode) return;
    pinDropMode = false;
    map.getContainer().style.cursor = '';
    _setWalkOrigin(e.latlng.lat, e.latlng.lng, 'pin');
  });
}

// BOOT
// ══════════════════════════════════════════════════════════════════
window.addEventListener('load', function() {
  if (typeof L === 'undefined') {
    document.getElementById('map').innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:14px;font-family:Inter,sans-serif;color:#555;background:#F7F7F5">' +
      '<div style="font-size:36px">⚠️</div>' +
      '<div style="font-size:15px;font-weight:600;color:#111">Map library failed to load</div>' +
      '<div style="font-size:13px;text-align:center;line-height:1.6">인터넷 연결을 확인하고 새로고침 해주세요.</div>' +
      '<button onclick="location.reload()" style="padding:10px 22px;background:#111;color:white;border:none;border-radius:8px;font-size:13px;cursor:pointer">Refresh ↺</button></div>';
    return;
  }

  // Detect nearest city via GPS (with default fallback), lazy-load its data, then boot
  console.log('[boot] starting GPS detection...');
  _initCityByGPS().then(function(city) {
    console.log('[boot] city selected:', city);
    activeCity    = city;
    activeCityKey = CITY_META[city].key;
    // Sync mobile city select to GPS-detected city
    var _msel = document.getElementById('city-select-mobile');
    if (_msel) _msel.value = city;
    return loadCityData(city);
  }).then(function() {
    _postInitMap();
    // Show GPS location marker on map (passive, without activating walk filter)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          _showUserLocationMarker(pos.coords.latitude, pos.coords.longitude);
        },
        function() {},
        { timeout: 5000, maximumAge: 300000 }
      );
    }
    // Preload other cities in background
    _preloadOtherCities();
  }).catch(function(err) {
    console.error('[boot] Failed to load initial city data:', err);
    // Fallback: init map with empty LOCS
    _postInitMap();
  });

  // ── Walk slider: re-filter on change ──────────────────────────
  document.getElementById('walk-slider').addEventListener('input', function() {
    document.getElementById('walk-label').textContent = `${this.value} min`;
    if (walkActive) _runWalkFilter();
  });
  // Sidebar macro drag-resize
  setupVDrag('dh-fl', 'sb-filters', () => {
    const fav = document.getElementById('fsec-fav');
    if (!fav) return 50;
    const hdr = fav.querySelector('.fsec-hdr');
    return fav.offsetTop + (hdr ? hdr.offsetHeight : 36) + 6;
  }, 480);
  setupHDrag('sb-resize', 'sidebar', 220, 700);
  setupHDragLeft('panel-resize', 'panel', 300, 900);

  // ── Walk-path-mode: tap collapsed panel handle to restore ─────
  document.getElementById('panel').addEventListener('click', function(e) {
    if (walkPathMode && window.innerWidth <= 900) {
      e.stopPropagation();
      toggleWalkPathMode();
    }
  });

  // ── Browser back button navigation ──────────────────────────
  // Push history states when opening panels/modes so Android/iOS back button
  // navigates to the previous UI level instead of leaving the page.
  history.replaceState({ view: 'main' }, '');

  window.addEventListener('popstate', function(e) {
    const st = e.state;
    if (!st) { history.pushState({ view: 'main' }, ''); return; }
    // If in walk-path mode → exit walk-path, restore panel
    if (walkPathMode) {
      toggleWalkPathMode();
      return;
    }
    // If a location panel is open → close it
    if (activeLoc) {
      closePanel();
      return;
    }
    // If walk/near-me bar is open → close it
    if (walkActive || nearMeActive) {
      _fullDeactivate();
      return;
    }
    // Otherwise allow default (nothing to go back to within the app)
  });

  // Per-filter-section body resize (cat/style/era start open; arch starts closed)
  setupBodyDrag('dh-sec-cat',   'body-cat',   30, 220);
  setupBodyDrag('dh-sec-style', 'body-style', 30, 220);
  setupBodyDrag('dh-sec-era',    'body-era',    30, 220);
  setupBodyDrag('dh-sec-access', 'body-access', 30, 180);
});

// ══════════════════════════════════════════════════════════════════
// ADMIN PANEL
// ══════════════════════════════════════════════════════════════════
var CAT_CC_MAP = {
  'Skyscrapers':           'c-sky',
  'Historic':              'c-his',
  'Infrastructure':        'c-inf',
  'Cultural':              'c-cul',
  'Parks':                 'c-park',
  'Religious':             'c-rel',
  'Academic / Institution':'c-aca',
  'Residential':           'c-res',
  'Landmarks':             'c-lmk',
  'Public':                'c-pub',
  'Retail':                'c-ret',
  'Commercial':            'c-com',
  'Mixed-use':             'c-com',
  'Public Space':          'c-park',
};

// Open with Ctrl+Shift+A
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') { e.preventDefault(); openAdmin(); }
});

function openAdmin() {
  renderAdminTable();
  document.getElementById('admin-panel').classList.add('open');
}
function closeAdmin() {
  document.getElementById('admin-panel').classList.remove('open');
}

/* ── Admin filter/sort state ──────────────────────────── */
var admState = { city: 'All', cat: 'All', access: 'All', query: '', sort: '', sortDir: 1 };

function admSetFilter(key, val) {
  admState[key] = val;
  _admSyncResetBtn();
  renderAdminTable();
}

function admSetSort(col) {
  if (admState.sort === col) {
    admState.sortDir *= -1;
  } else {
    admState.sort = col;
    admState.sortDir = 1;
  }
  renderAdminTable();
}

function admResetFilters() {
  admState.city = 'All'; admState.cat = 'All';
  admState.access = 'All'; admState.query = '';
  admState.sort = ''; admState.sortDir = 1;
  document.getElementById('adm-q').value = '';
  document.getElementById('adm-f-city').value = 'All';
  document.getElementById('adm-f-cat').value = 'All';
  document.getElementById('adm-f-access').value = 'All';
  _admSyncResetBtn();
  renderAdminTable();
}

function _admSyncResetBtn() {
  const active = admState.city !== 'All' || admState.cat !== 'All'
               || admState.access !== 'All' || admState.query !== '';
  document.getElementById('adm-filter-reset-btn').style.display = active ? 'block' : 'none';
}

function _admPopulateCities() {
  const sel = document.getElementById('adm-f-city');
  const cities = [...new Set(LOCS.map(l => l.city).filter(Boolean))].sort();
  // keep first "All Cities" option, rebuild the rest
  while (sel.options.length > 1) sel.remove(1);
  cities.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c.replace(/-/g,' ').replace(/\b\w/g,x=>x.toUpperCase());
    sel.appendChild(opt);
  });
}

function renderAdminTable() {
  _admPopulateCities();
  const saved = localStorage.getItem('archwander_locs_v2');
  document.getElementById('adm-reset-storage').style.display = saved ? 'block' : 'none';

  // ── filter ──
  const q = admState.query.toLowerCase().trim();
  let filtered = LOCS.filter(loc => {
    if (admState.city !== 'All' && loc.city !== admState.city) return false;
    if (admState.cat  !== 'All' && !_allCats(loc).includes(admState.cat)) return false;
    if (admState.access !== 'All' && loc.access !== admState.access) return false;
    if (q && !(loc.name||'').toLowerCase().includes(q)
           && !(loc.arch||'').toLowerCase().includes(q)) return false;
    return true;
  });

  // ── sort ──
  if (admState.sort) {
    const d = admState.sortDir;
    filtered = [...filtered].sort((a, b) => {
      let av = a[admState.sort] || '', bv = b[admState.sort] || '';
      if (admState.sort === 'yr') { av = parseInt(av)||0; bv = parseInt(bv)||0; }
      else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase(); }
      return av < bv ? -d : av > bv ? d : 0;
    });
  }

  // ── sort icon update ──
  ['name','yr','city'].forEach(col => {
    const el = document.getElementById(`adm-si-${col}`);
    if (!el) return;
    if (admState.sort === col) {
      el.textContent = admState.sortDir === 1 ? '↑' : '↓';
      el.style.opacity = '1';
    } else {
      el.textContent = '↕'; el.style.opacity = '0.4';
    }
  });

  document.getElementById('admin-count').textContent =
    filtered.length === LOCS.length ? `${LOCS.length} locations`
    : `${filtered.length} / ${LOCS.length} locations`;

  document.getElementById('admin-tbody').innerHTML = filtered.map((loc, i) => `
    <tr>
      <td style="color:var(--text-secondary)">${i+1}</td>
      <td class="td-name">${loc.name}</td>
      <td style="color:var(--text-secondary)">${loc.arch}</td>
      <td style="color:var(--text-secondary)">${loc.yr}</td>
      <td>${_allCats(loc).map(c => `<span class="cat-badge ${CAT_CC_MAP[c]||'c-lmk'}" style="font-size:10px">${c}</span>`).join(' ')}</td>
      <td>${loc.access ? `<span class="access-badge ${ACCESS_META[loc.access]?.cls||''}" style="font-size:10px">${ACCESS_META[loc.access]?.icon||''} ${loc.access}</span>` : '—'}</td>
      <td style="color:var(--text-secondary)">${(loc.city||'').replace(/-/g,' ').replace(/\b\w/g,x=>x.toUpperCase())}</td>
      <td>
        <button class="adm-btn adm-edit" onclick="openEditForm('${loc.id}')">Edit</button>
        <button class="adm-btn adm-del"  onclick="confirmDeleteLoc('${loc.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

var _admEditId = null;

function openAddForm() {
  _admEditId = null;
  _clearAdmForm();
  document.getElementById('adm-form-title').textContent = 'Add New Location';
  document.getElementById('adm-modal').classList.add('open');
}
function openEditForm(id) {
  _admEditId = id;
  const loc = LOCS.find(l => l.id === id);
  if (!loc) return;
  _fillAdmForm(loc);
  document.getElementById('adm-form-title').textContent = 'Edit Location';
  document.getElementById('adm-modal').classList.add('open');
}
function closeAdmModal() {
  document.getElementById('adm-modal').classList.remove('open');
}

function _clearAdmForm() {
  ['af-name','af-arch','af-yr','af-styleGroup','af-lat','af-lng',
   'af-addr','af-hood','af-desc','af-hours','af-admission',
   'af-tags','af-photos','af-tourInfo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('af-tourOk').checked = false;
  document.getElementById('af-cat').value    = 'Landmarks';
  document.getElementById('af-access').value = 'Open to Public';
  document.getElementById('af-era').value    = '2000–Present';
  document.getElementById('af-city').value   = activeCityKey || 'new-york';
}

function _fillAdmForm(loc) {
  const sv = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  sv('af-name',       loc.name);
  sv('af-arch',       loc.arch);
  sv('af-yr',         loc.yr);
  sv('af-styleGroup', _allSGs(loc).join(', '));
  sv('af-lat',        loc.lat);
  sv('af-lng',        loc.lng);
  sv('af-addr',       loc.addr);
  sv('af-hood',       loc.hood);
  sv('af-desc',       loc.desc);
  sv('af-hours',      loc.hours);
  sv('af-admission',  loc.admission);
  sv('af-tourInfo',   loc.tourInfo);
  sv('af-tags',       (loc.tags || []).join(', '));
  sv('af-photos',     (loc.photos || []).join('\n'));
  document.getElementById('af-tourOk').checked = !!loc.tourOk;
  document.getElementById('af-cat').value    = _allCats(loc).join(', ') || 'Landmarks';
  document.getElementById('af-access').value = loc.access || 'Open to Public';
  document.getElementById('af-era').value    = loc.era    || '2000–Present';
  document.getElementById('af-city').value   = loc.city   || 'new-york';
}

// ── ID Generation ─────────────────────────────────────────────────────────
// Format: {city-prefix}-{4-digit sequential}  e.g. nyc-0140, sel-0047, lon-0023, tok-0045
// Numbers are NEVER reused after deletion.
var CITY_ID_PREFIX = { 'new-york':'nyc', 'seoul':'sel', 'london':'lon', 'tokyo':'tok' };

function generateLocationId(cityValue) {
  const prefix = CITY_ID_PREFIX[cityValue] || cityValue.replace(/[^a-z]/g,'').slice(0,3);
  const pattern = new RegExp('^' + prefix + '-(\\d{4})$');
  let maxNum = 0;
  for (const loc of LOCS) {
    const m = loc.id && loc.id.match(pattern);
    if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
  }
  return prefix + '-' + String(maxNum + 1).padStart(4, '0');
}
// ──────────────────────────────────────────────────────────────────────────

function saveAdmForm() {
  const fv = id => (document.getElementById(id)?.value || '').trim();
  const name = fv('af-name');
  const lat  = parseFloat(fv('af-lat'));
  const lng  = parseFloat(fv('af-lng'));
  if (!name)           { alert('Name is required.'); return; }
  if (isNaN(lat)||isNaN(lng)) { alert('Valid Latitude and Longitude are required.'); return; }

  const catsRaw = fv('af-cat') || 'Landmarks';
  const cats = catsRaw.split(',').map(s => s.trim()).filter(Boolean);
  const pCat = cats[0];
  const sgsRaw = fv('af-styleGroup') || 'Contemporary';
  const styleGroups = sgsRaw.split(',').map(s => s.trim()).filter(Boolean);
  const loc = {
    id:         _admEditId || generateLocationId(fv('af-city') || 'new-york'),
    name,       arch:       fv('af-arch') || 'Unknown',
    yr:         parseInt(fv('af-yr')) || new Date().getFullYear(),
    cats,       cc:         CAT_CC_MAP[pCat] || 'c-lmk',
    styleGroups,
    era:        fv('af-era') || '2000–Present',
    access:     fv('af-access') || 'Open to Public',
    city:       fv('af-city') || 'new-york',
    lat, lng,
    addr:       fv('af-addr'),   hood:     fv('af-hood'),
    desc:       fv('af-desc'),   hours:    fv('af-hours'),
    lastEntry:  '',              admission: fv('af-admission'),
    tourOk:     document.getElementById('af-tourOk').checked,
    tourInfo:   fv('af-tourInfo'),
    tags:       fv('af-tags').split(',').map(t=>t.trim()).filter(Boolean),
    photos:     fv('af-photos').split('\n').map(s=>s.trim()).filter(Boolean)
  };

  if (_admEditId) {
    const idx = LOCS.findIndex(l => l.id === _admEditId);
    if (idx >= 0) LOCS[idx] = loc;
  } else {
    LOCS.push(loc);
  }
  try { localStorage.setItem('archwander_locs_v2', JSON.stringify(LOCS)); } catch(e) {}
  refreshApp();
  closeAdmModal();
  renderAdminTable();
}

function confirmDeleteLoc(id) {
  const loc = LOCS.find(l => l.id === id);
  if (!loc || !confirm(`"${loc.name}"을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) return;
  LOCS.splice(LOCS.findIndex(l => l.id === id), 1);
  try { localStorage.setItem('archwander_locs_v2', JSON.stringify(LOCS)); } catch(e) {}
  refreshApp();
  renderAdminTable();
}

function confirmResetStorage() {
  if (!confirm('모든 변경사항을 삭제하고 기본 데이터로 초기화하시겠습니까?')) return;
  localStorage.removeItem('archwander_locs_v2');
  // Re-merge from already-loaded globals (no script reload — const cannot be re-declared)
  LOCS.length = 0;
  Object.keys(CITY_META).forEach(function(code) {
    var meta = CITY_META[code];
    try {
      var cityLocs = (0, eval)(meta.dataVar);
      if (Array.isArray(cityLocs)) {
        cityLocs.forEach(function(l) { LOCS.push(l); });
      }
    } catch(e) { /* city not yet loaded */ }
    try {
      var koData = (0, eval)(meta.koVar);
      if (koData) Object.assign(LOCS_KO, koData);
    } catch(e) { /* ko not yet loaded */ }
  });
  refreshApp();
  renderAdminTable();
}

function exportDataJS() {
  const btn = document.querySelector('.adm-hbtn.adm-hbtn-export');
  if (btn) { btn.textContent = '⏳ Generating…'; btn.disabled = true; }

  const newLocs = `const LOCS_DEFAULT = ${JSON.stringify(LOCS, null, 2)};`;
  const output = `// ArchWander — Location Data\n// Edit this file to add, remove, or update locations.\n// Deploy alongside index.html (Netlify, etc.)\n// ─────────────────────────────────────────────────\n/* DATA_START */\n${newLocs}\n/* DATA_END */\n`;

  const blob = new Blob([output], {type: 'application/javascript;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.js';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);

  if (btn) { btn.textContent = '⬇ Export data.js'; btn.disabled = false; }
}

// sidebar-backdrop-script
(function(){
  var bd = document.getElementById('sidebar-backdrop');
  if (!bd) return;
  bd.addEventListener('click', function() {
    var sb = document.getElementById('sidebar');
    if (sb) sb.classList.remove('open');
    bd.classList.remove('visible');
  });
})();

// Service Worker registration (PWA — enables background audio)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      console.log('[ArchWander] SW registered:', reg.scope);
    }).catch(function(err) {
      console.warn('[ArchWander] SW registration failed:', err);
    });
  });
}

// ── PWA install prompt ────────────────────────────────────────────
var _pwaEvent = null;

// Detect if running as installed PWA (standalone mode)
function _isStandalone() {
  return window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;
}

// Chrome / Edge / Samsung / etc. — beforeinstallprompt
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  if (_isStandalone()) return;
  _pwaEvent = e;
  // Delay 30 seconds from first use
  setTimeout(function() { _showPwaPrompt(); }, 30 * 1000);
});

// iOS Safari — no beforeinstallprompt, detect manually
window.addEventListener('load', function() {
  if (_isStandalone()) return;
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var isSafari = /safari/i.test(navigator.userAgent) && !/chrome|crios|fxios/i.test(navigator.userAgent);
  if (isIOS && isSafari) {
    setTimeout(function() { _showPwaPrompt(true); }, 30 * 1000);
  }
});

function _showPwaPrompt(isIOS) {
  // Don't show if already installed (standalone) or dismissed recently
  if (_isStandalone()) return;
  // Check "don't show today" (1 day)
  var dismissedToday = localStorage.getItem('aw_pwa_dismiss_today');
  if (dismissedToday) {
    var diff1 = Date.now() - parseInt(dismissedToday, 10);
    if (diff1 < 24 * 60 * 60 * 1000) return;
  }
  // Check permanent dismiss (7 days — from ✕ close)
  var dismissed = localStorage.getItem('aw_pwa_dismiss');
  if (dismissed) {
    var diff = Date.now() - parseInt(dismissed, 10);
    if (diff < 7 * 24 * 60 * 60 * 1000) return;
  }
  var prompt = document.getElementById('pwa-prompt');
  if (!prompt) return;
  var desc = document.getElementById('pwa-desc');
  var btn = document.getElementById('pwa-install-btn');
  var lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
  var todayBtn = prompt.querySelector('.pwa-today-btn');
  if (todayBtn) todayBtn.textContent = lang === 'ko' ? '오늘 하루 보지 않기' : 'Not today';
  if (isIOS) {
    if (desc) desc.textContent = lang === 'ko'
      ? '공유 버튼 → "홈 화면에 추가"를 눌러주세요'
      : 'Tap Share → "Add to Home Screen"';
    if (btn) btn.textContent = lang === 'ko' ? '확인' : 'OK';
    btn.onclick = function() { pwaDismiss(); };
  } else {
    if (desc) desc.textContent = lang === 'ko'
      ? '앱을 설치하면 더 편리하게 이용할 수 있어요'
      : 'Install the app for a better experience';
    if (btn) btn.textContent = lang === 'ko' ? '설치' : 'Install';
  }
  prompt.classList.add('visible');
}

function pwaInstall() {
  if (_pwaEvent) {
    _pwaEvent.prompt();
    _pwaEvent.userChoice.then(function(choice) {
      if (choice.outcome === 'accepted') {
        console.log('[ArchWander] PWA installed');
      }
      _pwaEvent = null;
    });
  }
  pwaDismiss();
}

function pwaDismiss() {
  var prompt = document.getElementById('pwa-prompt');
  if (prompt) prompt.classList.remove('visible');
  localStorage.setItem('aw_pwa_dismiss', Date.now().toString());
}

function pwaDismissToday() {
  var prompt = document.getElementById('pwa-prompt');
  if (prompt) prompt.classList.remove('visible');
  localStorage.setItem('aw_pwa_dismiss_today', Date.now().toString());
}
