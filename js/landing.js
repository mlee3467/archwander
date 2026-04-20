// ══════════════════════════════════════════════════════════════════
// LANDING / SPLASH SYSTEM  (mobile first-visit + explicit home)
// ══════════════════════════════════════════════════════════════════

var _mapInited = false;  // true once _doFullMapInit has been called

// ── Splash → Landing ─────────────────────────────────────────────

function showSplash() {
  var el = document.getElementById('landing-splash');
  var _firstVisit = !localStorage.getItem('aw_landing_seen');
  if (!el) {
    if (_firstVisit) showLandingScreen();
    else _ensureMapInit();
    return;
  }
  el.style.display = 'flex';
  setTimeout(function() {
    el.classList.add('fade-out');
    setTimeout(function() {
      el.style.display = 'none';
      el.classList.remove('fade-out');
      if (_firstVisit) {
        showLandingScreen();
      } else {
        // Returning user: skip landing, go straight to map
        _ensureMapInit();
      }
    }, 500);
  }, 2500);  // 2500 + 500ms fade = 3s total splash
}

function showLandingScreen() {
  var el = document.getElementById('landing-screen');
  if (!el) return;
  el.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      el.classList.add('visible');
      // Push history so the Android/iOS back button returns to the map
      history.pushState({ view: 'landing' }, '');
    });
  });
}

function hideLandingScreen(cb) {
  var el = document.getElementById('landing-screen');
  if (!el) { if (cb) cb(); return; }
  el.classList.remove('visible');
  setTimeout(function() {
    el.style.display = 'none';
    if (cb) cb();
  }, 280);
}

// ── Public: go-home from anywhere ───────────────────────────────
// Called by logo tap (mobile) or Home button in action bar

function goHome() {
  // Close any open mobile action bar / sidebar first
  if (typeof closeMobileActions === 'function') closeMobileActions();
  if (typeof closeSidebar === 'function') closeSidebar();
  showLandingScreen();
}

// Sync the sidebar city <select> with the current activeCity
function _syncSbCitySelect() {
  var sel = document.getElementById('sb-city-select');
  if (sel && typeof activeCity !== 'undefined') sel.value = activeCity;
}

// ── City & Location popup ────────────────────────────────────────

var _clpSelectedCity = null;
var _clpLocMode      = null;  // 'gps' | 'pin'
var _iflFromSidebar  = false; // true when IFL screen opened from sidebar (not landing)

var _CLP_CITIES = [
  { meta: 'nyc', flag: '🗽', name: 'New York', sub: '뉴욕'  },
  { meta: 'sel', flag: '🏙', name: 'Seoul',    sub: '서울'  },
  { meta: 'lon', flag: '🎡', name: 'London',   sub: '런던'  },
  { meta: 'tky', flag: '🗼', name: 'Tokyo',    sub: '도쿄'  }
];

function _openCityLocPopup() {
  var el = document.getElementById('city-loc-popup');
  if (!el) return;
  _clpRenderCityGrid();
  _clpUpdateGoBtn();
  el.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { el.classList.add('visible'); });
  });
}

function _closeCityLocPopup() {
  var el = document.getElementById('city-loc-popup');
  if (!el) return;
  el.classList.remove('visible');
  setTimeout(function() { el.style.display = 'none'; }, 280);
}

function _clpRenderCityGrid() {
  var grid = document.getElementById('clp-city-grid');
  if (!grid) return;
  grid.innerHTML = _CLP_CITIES.map(function(c) {
    var sel = _clpSelectedCity === c.meta;
    return '<button class="clp-city-btn' + (sel ? ' selected' : '') +
      '" onclick="_clpPickCity(\'' + c.meta + '\')">' +
      '<span class="clp-city-flag">' + c.flag + '</span>' +
      '<span class="clp-city-name">' + c.name + '</span>' +
      '<span class="clp-city-sub">' + c.sub + '</span>' +
      '</button>';
  }).join('');
}

function _clpPickCity(metaKey) {
  _clpSelectedCity = metaKey;
  _clpRenderCityGrid();
  // Fly map to selected city if map is already available
  if (typeof map !== 'undefined' && map && typeof CITY_META !== 'undefined') {
    var meta = CITY_META[metaKey];
    if (meta) map.flyTo([meta.lat, meta.lng], meta.zoom || 13, { duration: 1.1 });
  }
  _clpUpdateGoBtn();
}

function _clpUseGPS() {
  _clpLocMode = 'gps';
  var g = document.getElementById('clp-gps-btn');
  var p = document.getElementById('clp-pin-btn');
  if (g) g.classList.add('selected');
  if (p) p.classList.remove('selected');
  _clpUpdateGoBtn();
}

function _clpDropPin() {
  _clpLocMode = 'pin';
  var g = document.getElementById('clp-gps-btn');
  var p = document.getElementById('clp-pin-btn');
  if (g) g.classList.remove('selected');
  if (p) p.classList.add('selected');
  _clpUpdateGoBtn();
}

function _clpUpdateGoBtn() {
  var btn = document.getElementById('clp-go-btn');
  if (!btn) return;
  btn.classList.toggle('ready', _clpLocMode !== null);
}

function _clpConfirm() {
  if (!_clpLocMode) return;
  localStorage.setItem('aw_landing_seen', '1');
  var chosenCity = _clpSelectedCity;
  var chosenMode = _clpLocMode;
  _closeCityLocPopup();
  hideLandingScreen(function() {
    _ensureMapInit(function() {
      // Switch city if user chose one different from auto-detected
      if (chosenCity && typeof activeCity !== 'undefined' && activeCity !== chosenCity) {
        if (typeof selectCity === 'function') selectCity(chosenCity);
        setTimeout(function() { _clpActivateMode(chosenMode); }, 600);
      } else {
        _clpActivateMode(chosenMode);
      }
    });
  });
}

function _clpActivateMode(mode) {
  if (mode === 'gps') {
    if (typeof toggleNearMe === 'function' && !nearMeActive) toggleNearMe();
    setTimeout(function() {
      if (typeof locateUserGPS === 'function') locateUserGPS();
    }, 200);
  } else if (mode === 'pin') {
    if (typeof toggleNearMe === 'function' && !nearMeActive) toggleNearMe();
    setTimeout(function() {
      if (typeof startPinDrop === 'function') startPinDrop();
    }, 200);
  }
}

// ── Landing button handlers ──────────────────────────────────────

function landingGoCity() {
  _openCityLocPopup();
}

function landingGoIfl() {
  // Show IFL theme selector — no map init yet
  var landing = document.getElementById('landing-screen');
  var iflSel  = document.getElementById('ifl-select-screen');
  if (landing) landing.classList.remove('visible');
  setTimeout(function() {
    if (landing) landing.style.display = 'none';
    if (iflSel) {
      _renderIflSelectScreen();
      iflSel.style.display = 'flex';
      requestAnimationFrame(function() {
        requestAnimationFrame(function() { iflSel.classList.add('visible'); });
      });
    }
  }, 200);
}

function landingGoRec() {
  _landingToast(LANG === 'ko' ? '🚧 준비 중입니다' : '🚧 Coming soon');
}

function landingGoMyPage() {
  localStorage.setItem('aw_landing_seen', '1');
  hideLandingScreen(function() {
    _ensureMapInit(function() {
      _openMyPage();
    });
  });
}

// ── IFL select screen ────────────────────────────────────────────

function iflSelBack() {
  var iflSel = document.getElementById('ifl-select-screen');
  if (iflSel) {
    iflSel.classList.remove('visible');
    setTimeout(function() { iflSel.style.display = 'none'; }, 280);
  }
  if (_iflFromSidebar) {
    _iflFromSidebar = false;
    // Came from sidebar — just close the IFL screen, no landing
  } else {
    showLandingScreen();
  }
}

// X button: close IFL screen and go directly to map (no landing)
function _iflClose() {
  var iflSel = document.getElementById('ifl-select-screen');
  if (iflSel) {
    iflSel.classList.remove('visible');
    setTimeout(function() { iflSel.style.display = 'none'; }, 280);
  }
  _iflFromSidebar = false;
  localStorage.setItem('aw_landing_seen', '1');
  _ensureMapInit();
}

function _renderIflSelectScreen() {
  var body = document.getElementById('ifl-sel-body');
  if (!body || typeof THEME_DEFS === 'undefined') return;
  body.innerHTML = THEME_DEFS.map(function(td) {
    var sel = state && state.themes && state.themes.includes(td.key);
    var label = typeof t === 'function' ? t('ifl_' + td.key) : td.key;
    return '<button class="ifl-sel-chip' + (sel ? ' selected' : '') +
      '" data-key="' + td.key + '" onclick="_iflSelToggle(\'' + td.key + '\')">' +
      '<span class="ifl-sel-icon">' + td.icon + '</span>' +
      '<span class="ifl-sel-label">' + label + '</span>' +
    '</button>';
  }).join('');
  _updateIflSelGo();
}

function _iflSelToggle(key) {
  if (!state || !state.themes) return;
  var idx = state.themes.indexOf(key);
  if (idx >= 0) state.themes.splice(idx, 1);
  else state.themes.push(key);
  document.querySelectorAll('#ifl-sel-body .ifl-sel-chip').forEach(function(btn) {
    btn.classList.toggle('selected', state.themes.includes(btn.getAttribute('data-key')));
  });
  _updateIflSelGo();
}

function _updateIflSelGo() {
  var btn = document.getElementById('ifl-sel-go');
  if (!btn) return;
  var count = (state && state.themes) ? state.themes.length : 0;
  if (count > 0) {
    btn.textContent = LANG === 'ko'
      ? count + '개 테마로 탐색 →'
      : 'Explore ' + count + ' theme' + (count > 1 ? 's' : '') + ' →';
    btn.classList.add('has-theme');
  } else {
    btn.textContent = LANG === 'ko' ? '테마 없이 모두 보기 →' : 'View all →';
    btn.classList.remove('has-theme');
  }
}

function iflSelConfirm() {
  localStorage.setItem('aw_landing_seen', '1');
  var iflSel = document.getElementById('ifl-select-screen');
  if (iflSel) {
    iflSel.classList.remove('visible');
    setTimeout(function() { iflSel.style.display = 'none'; }, 280);
  }
  _ensureMapInit(function() {
    if (typeof renderIflInline === 'function') renderIflInline();
    if (typeof updateClearBtn === 'function') updateClearBtn();
    if (typeof renderList === 'function') renderList();
    if (typeof syncMarkers === 'function') syncMarkers();
    // Mark IFL button active if themes were selected
    var sbaIfl = document.getElementById('sba-ifl');
    if (sbaIfl && typeof state !== 'undefined') sbaIfl.classList.toggle('sba-active', state.themes.length > 0);
    // Also activate Near Me so user sees filtered nearby results
    if (typeof nearMeActive !== 'undefined' && !nearMeActive) {
      if (typeof toggleNearMe === 'function') toggleNearMe();
    }
  });
}

// ── Map init helpers ─────────────────────────────────────────────

function _ensureMapInit(afterFn) {
  if (_mapInited) {
    // Map already running — just call afterFn
    if (afterFn) afterFn();
    return;
  }
  _mapInited = true;
  if (typeof _doFullMapInit === 'function') {
    _doFullMapInit(afterFn);
  }
}

// ── Toast ────────────────────────────────────────────────────────

function _landingToast(msg) {
  var el = document.createElement('div');
  el.className = 'landing-toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { el.style.opacity = '1'; });
  });
  setTimeout(function() {
    el.style.opacity = '0';
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
  }, 2200);
}

// ── Sidebar action button handlers ─────────────────────────────

function _sbaMyLocation() {
  if (typeof closeSidebar === 'function') closeSidebar();
  var popup = document.getElementById('my-loc-popup');
  if (!popup) return;
  popup.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { popup.classList.add('visible'); });
  });
}

function _closeMyLocPopup() {
  var popup = document.getElementById('my-loc-popup');
  if (!popup) return;
  popup.classList.remove('visible');
  setTimeout(function() { popup.style.display = 'none'; }, 220);
}

function _mlpUseGPS() {
  _closeMyLocPopup();
  _ensureMapInit(function() {
    if (typeof toggleNearMe === 'function' && !nearMeActive) toggleNearMe();
    setTimeout(function() {
      if (typeof locateUserGPS === 'function') locateUserGPS();
    }, 180);
  });
}

function _mlpDropPin() {
  _closeMyLocPopup();
  _ensureMapInit(function() {
    if (typeof toggleNearMe === 'function' && !nearMeActive) toggleNearMe();
    setTimeout(function() {
      if (typeof startPinDrop === 'function') startPinDrop();
    }, 180);
  });
}

function _sbaFavorites() {
  if (typeof closeSidebar === 'function') closeSidebar();
  if (typeof toggleFavFilter === 'function') toggleFavFilter();
}

function _sbaRoute() {
  if (typeof closeSidebar === 'function') closeSidebar();
  if (typeof _openRouteManager === 'function') _openRouteManager('home');
}

function _sbaIfl() {
  _iflFromSidebar = true;
  landingGoIfl();
}

// ══════════════════════════════════════════════════════════════════
// MY PAGE POPUP
// ══════════════════════════════════════════════════════════════════

var _myPageFileTarget = null; // 'favvis' | 'routes'

function _openMyPage() {
  // Remove any stale instance first
  var existing = document.getElementById('my-page-overlay');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

  var isKo = (typeof LANG !== 'undefined') ? LANG === 'ko' : false;

  // ── Default city selection state ─────────────────────────────
  var _AW_DEF_CITY_KEY = 'AW_DEFAULT_CITY';
  var currentDefault   = localStorage.getItem(_AW_DEF_CITY_KEY) || '';

  var cityOpts = [
    { val: '',    flag: '📍', label: isKo ? '자동 (GPS)' : 'Auto (GPS)' },
    { val: 'nyc', flag: '🗽', label: isKo ? '뉴욕' : 'New York' },
    { val: 'sel', flag: '🏙', label: isKo ? '서울' : 'Seoul' },
    { val: 'lon', flag: '🎡', label: isKo ? '런던' : 'London' },
    { val: 'tky', flag: '🗼', label: isKo ? '도쿄' : 'Tokyo' }
  ];
  var cityBtnsHtml = cityOpts.map(function(c) {
    var sel = (c.val === currentDefault) ? ' mpp-city-sel' : '';
    return '<button class="mpp-city-btn' + sel + '" data-cityval="' + c.val + '" onclick="_mpPagePickCity(\'' + c.val + '\')">' +
      '<span>' + c.flag + '</span><span>' + c.label + '</span>' +
      '</button>';
  }).join('');

  // ── Stats ──────────────────────────────────────────────────────
  var favCount = (typeof _favSet !== 'undefined') ? _favSet.size : 0;
  var visCount = (typeof _visSet !== 'undefined') ? _visSet.size : 0;
  var routeCount = 0;
  try { routeCount = JSON.parse(localStorage.getItem('aw_saved_routes_v2') || '[]').length; } catch(e) {}

  var overlay = document.createElement('div');
  overlay.id = 'my-page-overlay';
  overlay.className = 'arm-overlay';
  overlay.innerHTML =
    '<div class="arm-panel" id="my-page-panel" style="max-width:420px">' +
      '<div class="arm-header">' +
        '<button class="arm-back" onclick="_closeMyPage()">◀ </button>' +
        '<span class="arm-title">' + (isKo ? '마이 페이지' : 'My Page') + '</span>' +
      '</div>' +
      '<div class="arm-body" style="padding:16px 16px 32px">' +

        // ── Section 1: Data Management ──────────────────────────
        '<div class="mpp-section">' +
          '<div class="mpp-sec-title">' + (isKo ? '📦 데이터 관리' : '📦 Data Management') + '</div>' +

          '<div class="mpp-row-label">' + (isKo ? '즐겨찾기 & 방문' : 'Favorites & Visited') + '</div>' +
          '<div class="mpp-btn-row">' +
            '<button class="mpp-btn mpp-btn-export" onclick="_mpExportFavVis()">' +
              (isKo ? '⬇ 내보내기' : '⬇ Export') + '</button>' +
            '<button class="mpp-btn mpp-btn-import" onclick="_mpImportFavVis()">' +
              (isKo ? '⬆ 가져오기' : '⬆ Import') + '</button>' +
            '<button class="mpp-btn mpp-btn-delete" onclick="_mpDeleteFavVis()">' +
              (isKo ? '🗑 삭제' : '🗑 Delete') + '</button>' +
          '</div>' +

          '<div class="mpp-row-label" style="margin-top:12px">' + (isKo ? '저장된 루트' : 'Saved Routes') + '</div>' +
          '<div class="mpp-btn-row">' +
            '<button class="mpp-btn mpp-btn-export" onclick="_mpExportRoutes()">' +
              (isKo ? '⬇ 내보내기' : '⬇ Export') + '</button>' +
            '<button class="mpp-btn mpp-btn-import" onclick="_mpImportRoutes()">' +
              (isKo ? '⬆ 가져오기' : '⬆ Import') + '</button>' +
            '<button class="mpp-btn mpp-btn-delete" onclick="_mpDeleteRoutes()">' +
              (isKo ? '🗑 삭제' : '🗑 Delete') + '</button>' +
          '</div>' +
        '</div>' +

        // ── Section 2: Default City ─────────────────────────────
        '<div class="mpp-section">' +
          '<div class="mpp-sec-title">' + (isKo ? '🌐 기본 도시 설정' : '🌐 Default City') + '</div>' +
          '<div class="mpp-sec-sub">' + (isKo ? 'GPS와 무관하게 항상 이 도시로 시작합니다.' : 'Always open this city, regardless of GPS.') + '</div>' +
          '<div class="mpp-city-grid" id="mpp-city-grid">' + cityBtnsHtml + '</div>' +
        '</div>' +

        // ── Section 3: Statistics ───────────────────────────────
        '<div class="mpp-section">' +
          '<div class="mpp-sec-title">' + (isKo ? '📊 통계' : '📊 Statistics') + '</div>' +
          '<div class="mpp-stats-row">' +
            '<div class="mpp-stat-card"><span class="mpp-stat-num">' + favCount + '</span><span class="mpp-stat-lbl">' + (isKo ? '즐겨찾기' : 'Favorites') + '</span></div>' +
            '<div class="mpp-stat-card"><span class="mpp-stat-num">' + visCount + '</span><span class="mpp-stat-lbl">' + (isKo ? '방문' : 'Visited') + '</span></div>' +
            '<div class="mpp-stat-card"><span class="mpp-stat-num">' + routeCount + '</span><span class="mpp-stat-lbl">' + (isKo ? '루트' : 'Routes') + '</span></div>' +
          '</div>' +
          '<div class="mpp-coming-soon">🚧 ' + (isKo ? '더 많은 통계 준비 중' : 'More stats coming soon') + '</div>' +
        '</div>' +

      '</div>' +
    '</div>' +
    // hidden file input for import
    '<input type="file" id="mp-import-file" accept=".json" style="display:none" onchange="_mpHandleFileSelected(event)">';

  document.body.appendChild(overlay);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { overlay.classList.add('visible'); });
  });

  // Close on backdrop click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) _closeMyPage();
  });
}

function _closeMyPage() {
  var overlay = document.getElementById('my-page-overlay');
  if (!overlay) return;
  overlay.classList.remove('visible');
  setTimeout(function() {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }, 280);
}

// ── Default city picker ──────────────────────────────────────────
function _mpPagePickCity(val) {
  var _AW_DEF_CITY_KEY = 'AW_DEFAULT_CITY';
  if (val) localStorage.setItem(_AW_DEF_CITY_KEY, val);
  else localStorage.removeItem(_AW_DEF_CITY_KEY);
  // Update button states
  document.querySelectorAll('#mpp-city-grid .mpp-city-btn').forEach(function(btn) {
    var btnVal = btn.getAttribute('data-cityval') || '';
    btn.classList.toggle('mpp-city-sel', btnVal === val);
  });
}

// ── Favorites & Visited export/import/delete ─────────────────────
function _mpExportFavVis() {
  if (typeof favExportJSON === 'function') favExportJSON();
}

function _mpImportFavVis() {
  _myPageFileTarget = 'favvis';
  var fi = document.getElementById('mp-import-file');
  if (fi) { fi.value = ''; fi.click(); }
}

function _mpDeleteFavVis() {
  var isKo = (typeof LANG !== 'undefined') ? LANG === 'ko' : false;
  var msg = isKo
    ? '즐겨찾기와 방문 기록을 모두 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.'
    : 'Delete all favorites and visited records?\nThis cannot be undone.';
  if (!confirm(msg)) return;
  if (typeof _favSet !== 'undefined') _favSet.clear();
  if (typeof _visSet !== 'undefined') _visSet.clear();
  localStorage.removeItem('archwander_favs_v1');
  localStorage.removeItem('archwander_visited_v1');
  localStorage.removeItem('aw_visit_dates_v1');
  localStorage.removeItem('aw_visit_notes_v1');
  if (typeof markers !== 'undefined' && typeof _buildLocIcon === 'function') {
    markers.forEach(function(e) { e.m.setIcon(_buildLocIcon(e.loc)); });
  }
  if (typeof _applyFavFilter === 'function') _applyFavFilter();
  if (typeof renderList === 'function') renderList();
  if (typeof _updatePassportStats === 'function') _updatePassportStats();
  // Refresh stats in popup
  _closeMyPage();
  setTimeout(_openMyPage, 120);
}

// ── Routes export/import/delete ──────────────────────────────────
function _mpExportRoutes() {
  var isKo = (typeof LANG !== 'undefined') ? LANG === 'ko' : false;
  var routes = [];
  try { routes = JSON.parse(localStorage.getItem('aw_saved_routes_v2') || '[]'); } catch(e) {}
  if (!routes.length) {
    alert(isKo ? '저장된 루트가 없습니다.' : 'No saved routes to export.');
    return;
  }
  var settings = {};
  try { settings = JSON.parse(localStorage.getItem('aw_route_settings_v1') || '{}'); } catch(e) {}
  var data = {
    _format: 'archwander-routes-v1',
    exported: new Date().toISOString(),
    routes: routes,
    settings: settings
  };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href   = url;
  a.download = 'ArchWander_routes_' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function _mpImportRoutes() {
  _myPageFileTarget = 'routes';
  var fi = document.getElementById('mp-import-file');
  if (fi) { fi.value = ''; fi.click(); }
}

function _mpDeleteRoutes() {
  var isKo = (typeof LANG !== 'undefined') ? LANG === 'ko' : false;
  var msg = isKo
    ? '저장된 루트를 모두 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.'
    : 'Delete all saved routes?\nThis cannot be undone.';
  if (!confirm(msg)) return;
  localStorage.removeItem('aw_saved_routes_v2');
  localStorage.removeItem('aw_route_settings_v1');
  if (typeof _getSavedRoutes === 'function') {
    // Re-read the (now empty) routes in route manager if open
    var rmBody = document.getElementById('rm-body');
    if (rmBody && typeof _rmHomeHTML === 'function') rmBody.innerHTML = _rmHomeHTML();
  }
  if (typeof _updatePassportStats === 'function') _updatePassportStats();
  _closeMyPage();
  setTimeout(_openMyPage, 120);
}

// ── File input handler ───────────────────────────────────────────
function _mpHandleFileSelected(event) {
  var file = event.target.files && event.target.files[0];
  if (!file) return;
  var isKo = (typeof LANG !== 'undefined') ? LANG === 'ko' : false;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (_myPageFileTarget === 'favvis') {
        // Delegate to existing import logic; simulate overwrite/append choice
        var mode = confirm(isKo
          ? '기존 즐겨찾기/방문 데이터를 유지하고 추가할까요?\n(취소 = 덮어쓰기)'
          : 'Keep existing favorites/visited and merge?\n(Cancel = Overwrite)')
          ? 'append' : 'overwrite';
        if (data._format === 'archwander-favs-v2' && Array.isArray(data.data)) {
          var importFavs = [], importVis = [];
          data.data.forEach(function(entry) {
            if (entry.fav     === 'Y') importFavs.push(entry.id);
            if (entry.visited === 'Y') importVis.push(entry.id);
          });
          if (mode === 'overwrite') {
            if (typeof _favSet !== 'undefined') { _favSet.clear(); importFavs.forEach(function(id) { _favSet.add(id); }); }
            if (typeof _visSet !== 'undefined') { _visSet.clear(); importVis.forEach(function(id)  { _visSet.add(id); }); }
          } else {
            if (typeof _favSet !== 'undefined') importFavs.forEach(function(id) { _favSet.add(id); });
            if (typeof _visSet !== 'undefined') importVis.forEach(function(id)  { _visSet.add(id); });
          }
          localStorage.setItem('archwander_favs_v1',     JSON.stringify([..._favSet]));
          localStorage.setItem('archwander_visited_v1',  JSON.stringify([..._visSet]));
          if (typeof markers !== 'undefined' && typeof _buildLocIcon === 'function') {
            markers.forEach(function(entry) { entry.m.setIcon(_buildLocIcon(entry.loc)); });
          }
          if (typeof _applyFavFilter === 'function') _applyFavFilter();
          if (typeof renderList === 'function') renderList();
          alert(isKo ? '가져오기 완료!' : 'Import successful!');
        } else {
          alert(isKo ? '올바르지 않은 파일 형식입니다.' : 'Invalid file format.');
        }
      } else if (_myPageFileTarget === 'routes') {
        if (data._format === 'archwander-routes-v1' && Array.isArray(data.routes)) {
          var mode2 = confirm(isKo
            ? '기존 루트를 유지하고 추가할까요?\n(취소 = 덮어쓰기)'
            : 'Keep existing routes and merge?\n(Cancel = Overwrite)')
            ? 'append' : 'overwrite';
          var existing = [];
          try { existing = JSON.parse(localStorage.getItem('aw_saved_routes_v2') || '[]'); } catch(x) {}
          var merged = mode2 === 'append' ? existing.concat(data.routes) : data.routes;
          localStorage.setItem('aw_saved_routes_v2', JSON.stringify(merged));
          if (data.settings && mode2 === 'overwrite') {
            localStorage.setItem('aw_route_settings_v1', JSON.stringify(data.settings));
          }
          if (typeof _updatePassportStats === 'function') _updatePassportStats();
          alert(isKo ? '루트 가져오기 완료!' : 'Routes imported successfully!');
        } else {
          alert(isKo ? '올바르지 않은 파일 형식입니다.' : 'Invalid file format.');
        }
      }
    } catch(err) {
      alert(isKo ? '파일을 읽을 수 없습니다.' : 'Could not read file.');
    }
  };
  reader.readAsText(file);
}

// ══════════════════════════════════════════════════════════════════
