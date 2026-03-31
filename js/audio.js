// AUDIO GUIDE — Web Speech API
// ══════════════════════════════════════════════════════════════════

// Audio data registry — populated on demand via dynamic <script> load
// Each city has EN and KO variants; the correct one is chosen by LANG at load time
var _AUDIO_CITY_MAP = {
  'new-york': {
    en: { varName: 'AUDIO_EN_NYC', file: 'data-audio-en-new-york.js' },
    ko: { varName: 'AUDIO_KO_NYC', file: 'data-audio-ko-new-york.js' },
  },
  'seoul': {
    en: { varName: 'AUDIO_EN_SEL', file: 'data-audio-en-seoul.js' },
    ko: { varName: 'AUDIO_KO_SEL', file: 'data-audio-ko-seoul.js' },
  },
  'london': {
    en: { varName: 'AUDIO_EN_LON', file: 'data-audio-en-london.js' },
    ko: { varName: 'AUDIO_KO_LON', file: 'data-audio-ko-london.js' },
  },
  'tokyo': {
    en: { varName: 'AUDIO_EN_TKY', file: 'data-audio-en-tokyo.js' },
    ko: { varName: 'AUDIO_KO_TKY', file: 'data-audio-ko-tokyo.js' },
  },
};
// Helper: get the audio meta for current language (fallback to 'en')
function _agMeta(city) {
  const cityMap = _AUDIO_CITY_MAP[city];
  if (!cityMap) return null;
  return cityMap[LANG] || cityMap['en'] || null;
}
var _agLoadedCities = new Set(); // tracks which city files are already in DOM
var _agSynth    = window.speechSynthesis || null;
var _agUtter    = null;
var _agPlaying  = false;
var _agPaused   = false;
var _agLoaded   = null; // id of location whose script is rendered

var _agMode     = '';    // 'synth' — playback engine
var _agTitle    = '';    // current location title (for Media Session)
var _agKeepAlive = null; // keepalive <audio> for background

// Create a DOM-attached <audio> element (used for keepalive only)
function _agMakeAudio() {
  const a = new Audio();
  a.setAttribute('playsinline', '');
  a.setAttribute('webkit-playsinline', '');
  a.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;';
  document.body.appendChild(a);
  return a;
}

// Clean text for speech: strip parenthetical English annotations in Korean mode
// e.g. "엠파이어 스테이트 빌딩(Empire State Building)은" → "엠파이어 스테이트 빌딩은"
function _agCleanForTts(text, lang) {
  if (lang === 'ko') {
    text = text.replace(/\s*\([A-Za-z0-9\s,.'&\-\/\u2019]+\)/g, '');
  }
  return text.trim();
}

function _agStartKeepAlive() {
  if (!_agKeepAlive) _agKeepAlive = _agMakeAudio();
  // Silent WAV keepalive — keeps mobile audio session alive
  const sr = 8000, dur = 1, n = sr * dur;
  const buf = new ArrayBuffer(44 + n * 2);
  const v = new DataView(buf);
  const ws = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  ws(0,'RIFF'); v.setUint32(4, 36 + n*2, true);
  ws(8,'WAVE'); ws(12,'fmt ');
  v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,1,true);
  v.setUint32(24,sr,true); v.setUint32(28,sr*2,true);
  v.setUint16(32,2,true); v.setUint16(34,16,true);
  ws(36,'data'); v.setUint32(40, n*2, true);
  for (let i = 0; i < n; i++) v.setInt16(44 + i*2, Math.sin(2*Math.PI*40*i/sr)*3000, true);
  _agKeepAlive.src = URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
  _agKeepAlive.loop = true;
  _agKeepAlive.volume = 0.01;
  _agKeepAlive.play().catch(() => {});
}
function _agStopKeepAlive() {
  if (_agKeepAlive) { _agKeepAlive.pause(); _agKeepAlive.removeAttribute('src'); }
}

// Media Session API — lock screen controls + Android audio focus
// On Android Chrome, setting playbackState = 'playing' is CRITICAL:
// it signals Android to maintain audio focus and show the persistent
// lock-screen notification, which prevents the OS from killing playback.
function _agSetMediaSession(title) {
  if (!('mediaSession' in navigator)) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title || 'Audio Guide',
      artist: 'ArchWander',
      album: 'Architecture Tour',
      // Artwork enables the Android lock-screen notification card.
      // Without it Chrome may not show the persistent notification,
      // and Android may not maintain audio focus.
      artwork: [
        { src: 'img/logo_large.png', sizes: '512x512', type: 'image/png' },
        { src: 'img/Logo_small.png', sizes: '128x128', type: 'image/png' },
      ]
    });
    navigator.mediaSession.playbackState = 'playing'; // ← Android audio focus key
    navigator.mediaSession.setActionHandler('play',          () => agToggle());
    navigator.mediaSession.setActionHandler('pause',         () => agToggle());
    navigator.mediaSession.setActionHandler('previoustrack', () => agSkip(-1));
    navigator.mediaSession.setActionHandler('nexttrack',     () => agSkip(1));
    navigator.mediaSession.setActionHandler('stop',          () => agStop());
  } catch(e) {}
}

// Update playbackState only — call this on play/pause without rebuilding metadata
function _agSetPlaybackState(state) { // state: 'playing' | 'paused' | 'none'
  if (!('mediaSession' in navigator)) return;
  try { navigator.mediaSession.playbackState = state; } catch(e) {}
}

// Wake Lock — keep screen on during playback (secondary defense)
var _agWakeLock = null;
async function _agRequestWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try { _agWakeLock = await navigator.wakeLock.request('screen'); } catch(e) {}
}
function _agReleaseWakeLock() {
  if (_agWakeLock) { _agWakeLock.release().catch(()=>{}); _agWakeLock = null; }
}

// Re-acquire wake lock when screen turns back on
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && _agPlaying && !_agPaused) {
    _agRequestWakeLock();
    if (_agKeepAlive && _agKeepAlive.paused) _agKeepAlive.play().catch(() => {});
    _agSetPlaybackState('playing');
  }
});
var _agSpeeds   = [0.75, 1, 1.25, 1.5, 2];
var _AG_SPEED_KEY    = 'aw_audio_speed';
var _AG_AUTOPLAY_KEY = 'aw_audio_autoplay';
// Restore saved speed from localStorage (persists across locations)
var _agSpeedIdx = (() => {
  try {
    const saved = parseFloat(localStorage.getItem(_AG_SPEED_KEY));
    const idx = _agSpeeds.indexOf(saved);
    return idx >= 0 ? idx : 1; // default 1×
  } catch(e) { return 1; }
})();
// Restore auto-play preference (default: true)
var _agAutoPlay = (() => {
  try {
    const saved = localStorage.getItem(_AG_AUTOPLAY_KEY);
    return saved === null ? true : saved === 'true';
  } catch(e) { return true; }
})();
var _agScript   = '';  // current full script text
var _agSentences = []; // split sentences
var _agSentIdx  = 0;   // which sentence is playing
// (progress now handled by requestAnimationFrame — see _agStartSmoothProgress)

/* -- Shell HTML rendered immediately when location panel opens ---------- */
function buildAudioGuideShell() {
  return `<div id="ag-root"><div class="ag-loading"><div class="ag-spinner"></div><span>${t('ag_loading')}</span></div></div>`;
}

/* -- Dynamic lazy-load of city audio data file -------------------------- */
function _agLoadCityFile(city) {
  return new Promise((resolve) => {
    const meta = _agMeta(city);
    if (!meta) return resolve(false); // city/lang not yet supported
    const cacheKey = city + ':' + LANG; // track per city+lang
    // Already loaded?
    if (_agLoadedCities.has(cacheKey) || window[meta.varName]) {
      _agLoadedCities.add(cacheKey);
      return resolve(true);
    }
    // Remove any previous failed script tag for this file
    const prev = document.querySelector(`script[src="${meta.file}"]`);
    if (prev) prev.remove();

    const s = document.createElement('script');
    s.src = meta.file;
    s.onload = () => {
      // window[meta.varName] must be set by the file (as window.X = {...})
      if (window[meta.varName]) {
        _agLoadedCities.add(cacheKey);
        resolve(true);
      } else {
        console.warn('[AudioGuide] File loaded but variable not found:', meta.varName);
        resolve(false);
      }
    };
    s.onerror = () => {
      console.warn('[AudioGuide] Failed to load audio file:', meta.file);
      resolve(false); // graceful — file may not exist yet
    };
    document.head.appendChild(s);
  });
}

/* -- Returns the audio data object for the current city --------------- */
function _agGetData(city) {
  const meta = _agMeta(city);
  if (!meta) return null;
  return window[meta.varName] || null;
}

/* -- Estimate listening time (avg 130 wpm) ----------------------------- */
function _agEstMin(text) {
  if (LANG === 'ko') {
    // Korean: estimate by character count (~200 chars/min for TTS)
    const chars = text.replace(/\s+/g, '').length;
    return Math.max(1, Math.round(chars / 200));
  }
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 130));
}

/* -- Split script into sentences for progress tracking ----------------- */
function _agSplit(text) {
  // Split on sentence endings, keeping the delimiter
  return text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];
}

/* -- Build the full player + script UI --------------------------------- */
function _agRenderPlayer(entry) {
  _agScript    = entry.script;
  _agSentences = _agSplit(_agScript);
  const totalSec  = _agEstMin(_agScript) * 60;
  const minText   = t('ag_min')(_agEstMin(_agScript));

  // Flatten: global sentence index across all paragraphs
  let sentGlobalIdx = 0;
  const paragraphsHtml = _agScript.split(/\n\n+/).map(para => {
    const sents = _agSplit(para);
    const spans = sents.map(s => {
      const idx = sentGlobalIdx++;
      return `<span class="ag-sentence" data-sidx="${idx}">${s}</span>`;
    }).join('');
    return `<p>${spans}</p>`;
  }).join('');

  return `<div class="ag-wrap">
    <!-- STICKY PLAYER BAR -->
    <div class="ag-player">
      <div class="ag-player-top-row">
        <div>
          <div class="ag-player-title">🎧 ${entry.title}</div>
          <div class="ag-player-sub">${minText} · ${LANG === 'ko' ? '한국어' : 'English'} · <span id="ag-mode-label"></span></div>
        </div>
        <label class="ag-autoplay-label" title="Auto-play when Audio tab opens">
          <input type="checkbox" id="ag-autoplay-chk"
            ${_agAutoPlay ? 'checked' : ''}
            onchange="agSetAutoPlay(this.checked)">
          <span>Auto-play</span>
        </label>
      </div>

      <!-- Timeline slider -->
      <div class="ag-timeline-wrap">
        <input type="range" class="ag-timeline" id="ag-timeline"
          min="0" max="1000" value="0" step="1"
          oninput="_agOnSeek(this.value)"
          onchange="_agOnSeekEnd(this.value)"
          style="--pct:0%;--border-color:#e5e5e0">
        <div class="ag-time-row">
          <span id="ag-time-cur">0:00</span>
          <span id="ag-time-tot">${_agFmtSec(totalSec)}</span>
        </div>
      </div>

      <!-- Controls: speed · ⏮ ▶ ⏭ · 🔁 -->
      <div class="ag-ctrl-row">
        <div class="ag-speed-wrap" id="ag-speed-wrap">
          <button class="ag-speed-btn" id="ag-speed-btn"
            onclick="agToggleSpeedMenu(event)">${_agSpeeds[_agSpeedIdx]}× <span class="ag-speed-caret">▲</span></button>
          <div class="ag-speed-menu" id="ag-speed-menu">
            ${_agSpeeds.map((s,i) => `<div class="ag-speed-opt${i===_agSpeedIdx?' selected':''}" onclick="agSetSpeed(${i})">
              ${s}× <span class="ag-speed-check">${i===_agSpeedIdx?'✓':''}</span>
            </div>`).join('')}
          </div>
        </div>
        <button class="ag-ctrl-btn" onclick="agSkip(-1)" title="Previous sentence"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="3" y="4" width="3" height="16"/><polygon points="21,4 9,12 21,20"/></svg></button>
        <button class="ag-play-btn" id="ag-play-btn" onclick="agToggle()"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="6,3 20,12 6,21"/></svg></button>
        <button class="ag-ctrl-btn" onclick="agSkip(1)" title="Next sentence"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="3,4 15,12 3,20"/><rect x="18" y="4" width="3" height="16"/></svg></button>
        <button class="ag-ctrl-btn${_agRepeat ? ' active' : ''}" id="ag-repeat-btn"
          onclick="agToggleRepeat()" title="Repeat"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l3 3-3 3"/><path d="M3 11V9a4 4 0 0 1 4-4h13"/><path d="M7 22l-3-3 3-3"/><path d="M21 13v2a4 4 0 0 1-4 4H4"/></svg></button>
      </div>
    </div>

    <!-- SCRIPT TEXT -->
    <div class="ag-script-box" id="ag-script-box">${paragraphsHtml}</div>
    <div class="ag-travel-note">🗺 ${t('ag_travel')}</div>
  </div>`;
}

/* -- Render "not available" state --------------------------------------- */
function _agRenderUnavail() {
  return `<div class="ag-unavail">
    <div class="ag-unavail-icon">🎙</div>
    <strong>${t('ag_unavail')}</strong><br>
    <span style="font-size:11px;color:var(--text-secondary)">${t('ag_unavail_sub')}</span>
  </div>`;
}

/* -- Main entry: called when Audio tab is opened ----------------------- */
async function loadAudioGuideTab(loc) {
  const root = document.getElementById('ag-root');
  if (!root) return;
  if (_agLoaded === loc.id) return; // already rendered
  _agLoaded = loc.id;

  agStop();
  root.innerHTML = `<div class="ag-loading"><div class="ag-spinner"></div><span>${t('ag_loading')}</span></div>`;

  const city = loc.city;
  const ok   = await _agLoadCityFile(city);
  const data = ok ? _agGetData(city) : null;
  const entry = data ? data[loc.id] : null;

  if (entry && entry.script) {
    _agTitle = entry.title || loc.name || 'Audio Guide';
    root.innerHTML = _agRenderPlayer(entry);
    // AUTO-PLAY: only if user has auto-play enabled (tab click = user gesture)
    if (_agAutoPlay) requestAnimationFrame(() => { agToggle(); });
  } else {
    if (!entry) _agLoaded = null; // allow retry
    root.innerHTML = _agRenderUnavail();
  }
}

/* ── Playback controls ─────────────────────────────────────────────────── */

var _agRepeat = false; // repeat mode

function agToggle() {
  if (_agPlaying && !_agPaused) {
    /* ── Pause ── */
    if (_agSynth) _agSynth.pause();
    _agPaused = true;
    _agSetPlayIcon(false);
    _agStopSmoothProgress();
    _agSetPlaybackState('paused');
  } else if (_agPaused) {
    /* ── Resume ── */
    if (_agSynth && (_agSynth.paused || _agSynth.speaking)) {
      _agSynth.resume();
      _agPaused = false;
      _agSetPlayIcon(true);
      _agStartSmoothProgress();
      _agSetPlaybackState('playing');
    } else {
      _agStartPlayback(_agSentIdx);
    }
  } else {
    /* ── Start fresh ── */
    _agStartPlayback(_agSentIdx);
  }
}

function agStop() {
  _agStopKeepAlive();
  if (_agSynth) _agSynth.cancel();
  _agPlaying = false;
  _agPaused  = false;
  _agSentIdx = 0;
  _agMode    = '';
  _agStopSmoothProgress();
  _agSetPlayIcon(false);
  _agUpdateTimeline(0);
  _agClearHighlight();
  _agReleaseWakeLock();
  _agSetPlaybackState('none');
  _agUpdateModeLabel('');
}

function agToggleSpeedMenu(e) {
  e.stopPropagation();
  const wrap = document.getElementById('ag-speed-wrap');
  if (!wrap) return;
  wrap.classList.toggle('open');
  const btn = document.getElementById('ag-speed-btn');
  if (btn) btn.classList.toggle('open', wrap.classList.contains('open'));
}

function agSetSpeed(idx) {
  _agSpeedIdx = idx;
  // Persist to localStorage
  try { localStorage.setItem(_AG_SPEED_KEY, _agSpeeds[idx]); } catch(e) {}

  // Update button label
  const btn = document.getElementById('ag-speed-btn');
  if (btn) btn.innerHTML = `${_agSpeeds[idx]}× <span class="ag-speed-caret">▲</span>`;

  // Update menu items
  document.querySelectorAll('#ag-speed-menu .ag-speed-opt').forEach((el, i) => {
    el.classList.toggle('selected', i === idx);
    const chk = el.querySelector('.ag-speed-check');
    if (chk) chk.textContent = i === idx ? '✓' : '';
  });

  // Close dropdown
  const wrap = document.getElementById('ag-speed-wrap');
  if (wrap) wrap.classList.remove('open');
  btn && btn.classList.remove('open');

  // Apply new speed immediately if playing — restart current sentence
  if (_agPlaying && !_agPaused) {
    if (_agSynth) _agSynth.cancel();
    _agPlaying = false;
    _agStartPlayback(_agSentIdx);
  }
}

function agSkip(delta) {
  const target = Math.max(0, Math.min(_agSentences.length - 1, _agSentIdx + delta));
  const wasPlaying = _agPlaying && !_agPaused;
  if (_agSynth) _agSynth.cancel();
  _agPlaying = false;
  _agPaused  = false;
  if (wasPlaying) {
    _agStartPlayback(target);
  } else {
    _agSentIdx = target;
    _agHighlight(target);
    _agUpdateTimeline(target / Math.max(1, _agSentences.length - 1));
    _agUpdateTimeDisplay();
  }
}

function agToggleRepeat() {
  _agRepeat = !_agRepeat;
  const btn = document.getElementById('ag-repeat-btn');
  if (btn) btn.classList.toggle('active', _agRepeat);
}

function agSetAutoPlay(checked) {
  _agAutoPlay = checked;
  try { localStorage.setItem(_AG_AUTOPLAY_KEY, String(checked)); } catch(e) {}
}

/* -- Timeline seek (drag) ---------------------------------------------- */
var _agSeeking = false; // true while user is dragging the timeline

function _agOnSeek(val) {
  // Pause rAF progress updates so they don't fight with the user's drag
  if (!_agSeeking) {
    _agSeeking = true;
    _agStopSmoothProgress();
    // Pause speechSynthesis during drag so it doesn't advance sentences
    if (_agPlaying && !_agPaused && _agSynth && _agSynth.speaking) {
      _agSynth.pause();
    }
  }
  const pct = parseInt(val) / 1000;
  const sentIdx = Math.round(pct * Math.max(0, _agSentences.length - 1));
  _agUpdateTimeline(pct);
  _agHighlight(sentIdx);
  _agUpdateTimeDisplay(sentIdx);
}

function _agOnSeekEnd(val) {
  _agSeeking = false;
  const pct = parseInt(val) / 1000;
  const target = Math.round(pct * Math.max(0, _agSentences.length - 1));
  const wasPlaying = _agPlaying && !_agPaused;
  if (_agSynth) _agSynth.cancel();
  _agPlaying = false;
  _agPaused  = false;
  _agSentIdx = target;
  if (wasPlaying) _agStartPlayback(target);
}

/* ── Internal playback engine ─────────────────────────────────────────── */

// Smooth-progress state
var _agRafId        = null; // requestAnimationFrame handle
var _agSentStart    = 0;    // timestamp when current sentence started

function _onPlaybackDone() {
  _agPlaying = false;
  _agPaused  = false;
  _agSentIdx = 0;
  _agMode    = '';
  _agSetPlayIcon(false);
  _agStopSmoothProgress();
  _agUpdateTimeline(0);
  _agClearHighlight();
  _agStopKeepAlive();
  _agReleaseWakeLock();
  _agUpdateModeLabel('');
}

function _agUpdateModeLabel(mode) {
  const el = document.getElementById('ag-mode-label');
  if (!el) return;
  el.textContent = mode === 'synth' ? 'Web Speech' : '';
}

function _agStartPlayback(fromIdx) {
  fromIdx = (fromIdx === undefined) ? 0 : Math.max(0, Math.min(fromIdx, _agSentences.length - 1));
  if (!_agSentences.length) return;

  // Stop any existing playback
  _agStopKeepAlive();
  if (_agSynth) _agSynth.cancel();

  _agPlaying = true;
  _agPaused  = false;
  _agMode    = 'synth';
  _agSetPlayIcon(true);
  _agRequestWakeLock();
  _agSetMediaSession(_agTitle);
  _agUpdateModeLabel('synth');

  // Start keepalive audio (must be within user gesture window)
  _agStartKeepAlive();

  let idx = fromIdx;
  _agStartSmoothProgress();

  if (!_agSynth) { _onPlaybackDone(); return; }
  _agSynth.cancel();

  // Select best available voice
  const voices = _agSynth.getVoices();
  const isKo = (LANG === 'ko');
  const voicePriority = isKo ? [
    'Google 한국의', 'Microsoft SunHi Online', 'Microsoft InJoon Online', 'Yuna',
  ] : [
    'Google US English', 'Microsoft Aria Online', 'Microsoft Guy Online',
    'Microsoft Jenny Online', 'Samantha', 'Daniel', 'Karen',
  ];
  const langPrefix = isKo ? 'ko' : 'en';
  let preferred = null;
  for (const name of voicePriority) {
    const v = voices.find(v => v.name === name);
    if (v) { preferred = v; break; }
  }
  if (!preferred) preferred =
    voices.find(v => v.lang.startsWith(langPrefix) && /neural|natural|premium|enhanced|online/i.test(v.name)) ||
    voices.find(v => v.lang.startsWith(langPrefix)) ||
    (isKo ? voices.find(v => /ko[-_]/i.test(v.lang)) : voices.find(v => /en[-_]/i.test(v.lang))) || null;

  function speakNext() {
    if (idx >= _agSentences.length) {
      if (_agRepeat) { idx = 0; speakNext(); return; }
      _onPlaybackDone(); return;
    }
    _agSentIdx = idx;
    _agSentStart = performance.now();
    _agHighlight(idx);
    _agScrollToSentence(idx);

    const cleanText = _agCleanForTts(_agSentences[idx].trim(), LANG);
    if (!cleanText) { idx++; speakNext(); return; }

    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = isKo ? 'ko-KR' : 'en-US';
    u.rate = _agSpeeds[_agSpeedIdx];
    if (preferred) u.voice = preferred;
    u.onend   = () => { idx++; speakNext(); };
    u.onerror = e => { if (e.error !== 'interrupted') { idx++; speakNext(); } };
    _agSynth.speak(u);
  }
  speakNext();
}

function _agHighlight(idx) {
  _agClearHighlight();
  const all = document.querySelectorAll('#ag-script-box .ag-sentence');
  if (all[idx]) all[idx].classList.add('speaking');
}

function _agClearHighlight() {
  document.querySelectorAll('#ag-script-box .ag-sentence.speaking')
    .forEach(el => el.classList.remove('speaking'));
}

function _agScrollToSentence(idx) {
  // Scroll the panel-scroll container so the speaking sentence is visible
  const span = document.querySelectorAll('#ag-script-box .ag-sentence')[idx];
  if (!span) return;
  span.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function _agSetPlayIcon(playing) {
  const btn = document.getElementById('ag-play-btn');
  if (!btn) return;
  btn.innerHTML = playing
    ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>'
    : '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="6,3 20,12 6,21"/></svg>';
  btn.classList.toggle('playing', playing);
  btn.title = playing ? t('ag_pause') : t('ag_play');
}

function _agUpdateTimeline(pct) {
  // pct is 0–1; map to 0–1000 for smooth thumb position (no sentence-boundary snapping)
  const tl = document.getElementById('ag-timeline');
  if (!tl) return;
  tl.value = Math.round(pct * 1000);
  tl.style.setProperty('--pct', (pct * 100).toFixed(2) + '%');
}

function _agUpdateTimeDisplay(sentIdx, smoothPct) {
  const totalSec = _agEstMin(_agScript) * 60;
  let elapsed;
  if (smoothPct !== undefined) {
    elapsed = smoothPct * totalSec;
  } else {
    sentIdx = (sentIdx === undefined) ? _agSentIdx : sentIdx;
    elapsed = (sentIdx / Math.max(1, _agSentences.length - 1)) * totalSec;
  }
  const curEl = document.getElementById('ag-time-cur');
  if (curEl) curEl.textContent = _agFmtSec(Math.round(elapsed));
}

function _agFmtSec(s) {
  s = Math.round(s);
  return `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
}

/* ── Smooth progress via requestAnimationFrame ─────────────────────── */
function _agStartSmoothProgress() {
  _agStopSmoothProgress();
  function tick() {
    if (!_agPlaying || _agPaused || _agSeeking) return;
    const n = Math.max(1, _agSentences.length - 1);
    let frac = 0; // fractional progress within current sentence (0..1)

    // Estimate progress from elapsed time since sentence started
    const isKo = (LANG === 'ko');
    const sent = _agSentences[_agSentIdx] || '';
    const estMs = isKo
      ? (sent.length / 200) * 60000 / _agSpeeds[_agSpeedIdx]
      : ((sent.split(/\s+/).length) / 130) * 60000 / _agSpeeds[_agSpeedIdx];
    const elapsed = performance.now() - _agSentStart;
    frac = Math.min(elapsed / Math.max(estMs, 500), 0.99);

    const smoothPct = (_agSentIdx + frac) / n;
    _agUpdateTimeline(smoothPct);
    _agUpdateTimeDisplay(undefined, smoothPct);
    _agRafId = requestAnimationFrame(tick);
  }
  _agRafId = requestAnimationFrame(tick);
}

function _agStopSmoothProgress() {
  if (_agRafId) { cancelAnimationFrame(_agRafId); _agRafId = null; }
}

// Pre-load voices (Chrome loads them async)
if (_agSynth && _agSynth.onvoiceschanged !== undefined) {
  _agSynth.onvoiceschanged = () => {};
}

// Close speed dropdown when clicking outside
document.addEventListener('click', () => {
  const wrap = document.getElementById('ag-speed-wrap');
  const btn  = document.getElementById('ag-speed-btn');
  if (wrap) wrap.classList.remove('open');
  if (btn)  btn.classList.remove('open');
});

// ══════════════════════════════════════════════════════════════════
