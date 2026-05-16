// ══════════════════════════════════════════════════════════════════
// LANDING / SPLASH SYSTEM  (mobile first-visit + explicit home)
// ══════════════════════════════════════════════════════════════════

var _mapInited = false;  // true once _doFullMapInit has been called

// ── Splash → Landing ─────────────────────────────────────────────

function showSplash() {
  // Landing screen removed — always go straight to world map
  localStorage.setItem('aw_landing_seen', '1');
  var el = document.getElementById('landing-splash');
  var _isPWA = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
             || window.navigator.standalone === true;
  if (_isPWA || !el) {
    _ensureMapInit();
    return;
  }
  el.style.display = 'flex';
  setTimeout(function() {
    el.classList.add('fade-out');
    setTimeout(function() {
      el.style.display = 'none';
      el.classList.remove('fade-out');
      _ensureMapInit();
    }, 500);
  }, 2500);
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

// Close landing screen and go to map (X button)
function _landingClose() {
  hideLandingScreen(function() {
    localStorage.setItem('aw_landing_seen', '1');
    _ensureMapInit();
  });
}

// Sync the sidebar city <select> with the current activeCity
function _syncSbCitySelect() {
  var sel = document.getElementById('sb-city-select');
  if (sel && typeof activeCity !== 'undefined') sel.value = activeCity;
}

// ── City & Location popup ────────────────────────────────────────

var _clpSelectedCity = null;
var _clpLocMode      = null;  // 'gps' | 'pin'

var _CLP_CITIES = [
  { meta: 'nyc', flag: '🗽', name: 'New York', sub: 'USA'    },
  { meta: 'sel', flag: '⛰️', name: 'Seoul',    sub: 'Korea'  },
  { meta: 'lon', flag: '🎡', name: 'London',   sub: 'UK'     },
  { meta: 'tky', flag: '🗼', name: 'Tokyo',    sub: 'Japan'  },
  { meta: 'chi', flag: '🌬️', name: 'Chicago',  sub: 'USA'    }
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

// Sidebar My Page button (replaces IFL in sidebar)
function _sbaMyPage() {
  if (typeof closeSidebar === 'function') closeSidebar();
  _openMyPage();
}

// Landing → I Feel Lucky
function landingGoLucky() {
  hideLandingScreen(function() {
    _ensureMapInit(function() { _openIflLucky(); });
  });
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

        // ── Section 4: DB Refresh ───────────────────────────────
        '<div class="mpp-section">' +
          '<div class="mpp-sec-title">' + (isKo ? '🔄 데이터 새로고침' : '🔄 Data Refresh') + '</div>' +
          '<div class="mpp-sec-sub">' + (isKo
            ? 'Supabase에서 최신 위치 데이터를 강제로 불러옵니다. 로컬 캐시를 우회하며, 즐겨찾기·방문 데이터는 유지됩니다.'
            : 'Force-fetch the latest location data from Supabase, bypassing the local cache. Favorites & visits are kept.') + '</div>' +
          '<div class="mpp-btn-row">' +
            '<button id="mpp-db-refresh-btn" class="mpp-btn mpp-btn-dbrefresh" onclick="_mpForceDbRefresh()">' +
              (isKo ? '🔄 DB에서 최신 데이터 불러오기' : '🔄 Reload from Database') +
            '</button>' +
          '</div>' +
          '<div id="mpp-db-refresh-status" style="font-size:11px;margin-top:8px;min-height:16px;color:#888;line-height:1.4"></div>' +
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

// ── Force DB refresh ─────────────────────────────────────────────
function _mpForceDbRefresh() {
  var isKo = (typeof LANG !== 'undefined') ? LANG === 'ko' : false;
  var btn    = document.getElementById('mpp-db-refresh-btn');
  var status = document.getElementById('mpp-db-refresh-status');

  // Collect cities that were loaded (reload those; fall back to active city)
  var citiesToReload = [];
  if (typeof _loadedCities !== 'undefined') {
    citiesToReload = Object.keys(_loadedCities).filter(function(k) { return _loadedCities[k]; });
  }
  if (!citiesToReload.length && typeof activeCity !== 'undefined') {
    citiesToReload = [activeCity];
  }
  if (!citiesToReload.length) {
    citiesToReload = ['nyc', 'sel', 'lon', 'tky'];
  }

  // Update button to loading state
  if (btn) {
    btn.disabled = true;
    btn.textContent = isKo ? '⏳ 불러오는 중…' : '⏳ Loading…';
    btn.style.opacity = '0.7';
  }
  if (status) { status.textContent = ''; status.style.color = '#888'; }

  // ── Wipe local caches ──────────────────────────────────────────
  // _loadedCities flags
  if (typeof _loadedCities !== 'undefined') {
    Object.keys(_loadedCities).forEach(function(k) { delete _loadedCities[k]; });
  }
  // LOCS array (keep the array reference, just empty it)
  if (typeof LOCS !== 'undefined') LOCS.length = 0;
  // ⚠️ KEY FIX: _mergeLocsFromStorage() in config.js prioritises localStorage
  // over fresh Supabase data for existing IDs. Clear it so the DB wins.
  localStorage.removeItem('archwander_locs_v2');
  // ⚠️ KEY FIX 2: Service Worker caches external URLs (Cache First).
  // Supabase API responses may be stale in aw-ext-v2 cache.
  // Evict all supabase.co entries before fetching fresh data.
  if ('caches' in window) {
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(name) {
        caches.open(name).then(function(cache) {
          cache.keys().then(function(reqs) {
            reqs.forEach(function(req) {
              if (req.url.includes('supabase.co')) cache.delete(req);
            });
          });
        });
      });
    });
  }

  // ── Reload from Supabase (or data-*.js fallback) ───────────────
  var start    = Date.now();
  var promises = citiesToReload.map(function(code) {
    return (typeof loadCityData === 'function') ? loadCityData(code) : Promise.resolve();
  });

  Promise.all(promises).then(function() {
    var elapsed = ((Date.now() - start) / 1000).toFixed(1);
    var total   = (typeof LOCS !== 'undefined') ? LOCS.length : 0;

    if (typeof refreshApp === 'function')              refreshApp();
    if (typeof _updatePassportStats === 'function')    _updatePassportStats();

    if (btn) {
      btn.disabled = false;
      btn.textContent = isKo ? '🔄 DB에서 최신 데이터 불러오기' : '🔄 Reload from Database';
      btn.style.opacity = '';
    }
    if (status) {
      status.style.color = '#27ae60';
      status.textContent = isKo
        ? '✅ ' + total + '개 장소 업데이트 완료 (' + elapsed + 's)'
        : '✅ ' + total + ' locations updated (' + elapsed + 's)';
    }
  }).catch(function(err) {
    console.error('[mypage] DB refresh error:', err);
    if (btn) {
      btn.disabled = false;
      btn.textContent = isKo ? '🔄 DB에서 최신 데이터 불러오기' : '🔄 Reload from Database';
      btn.style.opacity = '';
    }
    if (status) {
      status.style.color = '#c0392b';
      status.textContent = (isKo ? '❌ 오류: ' : '❌ Error: ') + (err.message || String(err));
    }
  });
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
// FIND WHAT I LIKE (FWIL) — Persona-based discovery
// ══════════════════════════════════════════════════════════════════

var _fwilFromSidebar    = false;
var _fwilSelectedPersonas = [];  // array of persona keys
var _fwilSelectedTags   = [];    // expanded from personas on proceed
var _fwilSaves          = [];    // array of { name, personas, savedAt }
var _fwilTop5           = [];    // computed top-5 locations
var _FWIL_WALK_M        = 1250;  // ~15 min walk radius in metres
var _FWIL_SAVE_KEY      = 'aw_fwil_saves';
var _fwilStep           = 1;     // current step (1=personas, 2=location)

// ── 8 Traveler Personas ──────────────────────────────────────────
var _FWIL_PERSONAS = [
  {
    key: 'classicist',
    icon: '🏛',
    label: 'The Classicist',    labelKo: '클래식 러버',
    hint:  'Beaux-Arts · Gothic · Heritage', hintKo: '클래식 · 고딕 · 역사건축',
    tags: ['beaux-arts','gothic','classical','heritage','historic','neoclassical',
           'baroque','colonial','victorian','renaissance','romanesque',
           '19th century','18th century','historic district']
  },
  {
    key: 'brutalist',
    icon: '⬛',
    label: 'The Brutalist',     labelKo: '브루탈리스트',
    hint:  'Concrete · Raw · Bold',          hintKo: '콘크리트 · 날것의 미학',
    tags: ['brutalism','concrete','raw concrete','exposed structure','brutalist',
           'new brutalism']
  },
  {
    key: 'modernist',
    icon: '◻',
    label: 'The Modernist',     labelKo: '모더니스트',
    hint:  'Bauhaus · Midcentury · Minimal', hintKo: '바우하우스 · 기능주의',
    tags: ['modernism','bauhaus','international style','mid-century','functionalism',
           'minimalism','modern','rationalism','postmodernism','deconstructivism',
           '20th century']
  },
  {
    key: 'urbanist',
    icon: '🏙',
    label: 'The Urbanist',      labelKo: '어바니스트',
    hint:  'Skyscrapers · Towers · Skyline', hintKo: '고층빌딩 · 스카이라인',
    tags: ['skyscraper','tower','high-rise','supertall','megatall','skyline',
           'contemporary','21st century','mixed-use','commercial','office']
  },
  {
    key: 'naturalist',
    icon: '🌿',
    label: 'Park Lover',        labelKo: '자연 탐험가',
    hint:  'Parks · Gardens · Waterfront',   hintKo: '공원 · 정원 · 워터프론트',
    tags: ['park','garden','plaza','square','greenway','landscape','public space',
           'promenade','waterfront','trail','green','botanical','nature']
  },
  {
    key: 'culturist',
    icon: '🎨',
    label: 'Culture Seeker',    labelKo: '컬처 시커',
    hint:  'Museum · Gallery · Theater',     hintKo: '미술관 · 갤러리 · 공연장',
    tags: ['museum','gallery','art','theater','theatre','opera','concert hall',
           'library','cultural','exhibition','performing arts','arts center']
  },
  {
    key: 'engineer',
    icon: '🌉',
    label: 'The Engineer',      labelKo: '엔지니어',
    hint:  'Bridges · Stations · Infra',     hintKo: '교량 · 역사 · 인프라',
    tags: ['bridge','station','railway station','infrastructure','railway','metro',
           'subway','tunnel','dam','port','harbor','transport hub','airport']
  },
  {
    key: 'wanderer',
    icon: '🔭',
    label: 'The Wanderer',      labelKo: '탐험가',
    hint:  'Hidden · Residential · Sacred',  hintKo: '숨겨진 곳 · 주거 · 종교',
    tags: ['residential','housing','social housing','apartment','townhouse',
           'church','cathedral','chapel','temple','mosque','shrine','synagogue',
           'religious','academic','university','campus','school']
  }
];

// Expand selected persona keys → flat tag array (deduplicated)
function _fwilExpandPersonaTags() {
  var tagSet = {};
  _fwilSelectedPersonas.forEach(function(key) {
    var p = _FWIL_PERSONAS.find(function(x) { return x.key === key; });
    if (p) p.tags.forEach(function(t) { tagSet[t] = true; });
  });
  return Object.keys(tagSet);
}

// ── Entry points ─────────────────────────────────────────────────
function landingGoFwil() {
  _fwilFromSidebar = false;
  _fwilSelectedPersonas = [];
  _fwilStep = 1;
  _fwilLoadSaves();
  var landing = document.getElementById('landing-screen');
  if (landing) landing.classList.remove('visible');
  setTimeout(function() {
    if (landing) landing.style.display = 'none';
    _fwilOpenScreen();
  }, 200);
}

function _sbaFwil() {
  _fwilFromSidebar = true;
  if (typeof closeSidebar === 'function') closeSidebar();
  _fwilSelectedPersonas = [];
  _fwilStep = 1;
  _fwilLoadSaves();
  _fwilOpenScreen();
}

function _sbaExplore() {
  var popup  = document.getElementById('explore-popup');
  var overlay = document.getElementById('explore-overlay');
  if (!popup) return;
  var isOpen = popup.style.display !== 'none';
  if (isOpen) {
    _sbaExploreClose();
  } else {
    overlay.style.display = 'block';
    popup.style.display = 'flex';
  }
  // Toggle active state on the button
  var btn = document.getElementById('sba-likable');
  if (btn) btn.classList.toggle('sba-active', !isOpen);
}

function _sbaExploreClose() {
  var popup   = document.getElementById('explore-popup');
  var overlay = document.getElementById('explore-overlay');
  if (popup)   popup.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
  var btn = document.getElementById('sba-likable');
  if (btn) btn.classList.remove('sba-active');
}

function _sbaLucky() {
  if (typeof closeSidebar === 'function') closeSidebar();
  _ensureMapInit(function() { _openIflLucky(); });
}

// ── SV Fullscreen Modal ──────────────────────────────────────────
function _openSVFull(encodedSrc) {
  var modal = document.getElementById('sv-fullscreen');
  var frame = document.getElementById('sv-fullscreen-frame');
  if (!modal || !frame) return;
  frame.src = decodeURIComponent(encodedSrc);
  modal.style.display = 'block';
}
function _closeSVFull() {
  var modal = document.getElementById('sv-fullscreen');
  var frame = document.getElementById('sv-fullscreen-frame');
  if (modal) modal.style.display = 'none';
  if (frame) frame.src = '';  // stop SV video/audio
}

function _fwilOpenScreen() {
  var el = document.getElementById('fwil-screen');
  if (!el) return;
  _fwilBuildPersonaGrid();
  _fwilShowStep(1);
  el.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { el.classList.add('visible'); });
  });
}

function fwilBack() {
  if (_fwilStep === 2) { _fwilShowStep(1); return; }
  var el = document.getElementById('fwil-screen');
  if (el) { el.classList.remove('visible'); setTimeout(function() { el.style.display = 'none'; }, 280); }
  if (_fwilFromSidebar) { _fwilFromSidebar = false; } else { showLandingScreen(); }
}

function fwilClose() {
  var el = document.getElementById('fwil-screen');
  if (el) { el.classList.remove('visible'); setTimeout(function() { el.style.display = 'none'; }, 280); }
  _fwilFromSidebar = false;
  localStorage.setItem('aw_landing_seen', '1');
  _ensureMapInit();
}

function _fwilShowStep(n) {
  _fwilStep = n;
  var s1 = document.getElementById('fwil-step1');
  var s2 = document.getElementById('fwil-step2');
  if (s1) s1.style.display = n === 1 ? 'flex' : 'none';
  if (s2) s2.style.display = n === 2 ? 'flex' : 'none';
  document.querySelectorAll('.fwil-step-dot').forEach(function(d, i) {
    d.classList.toggle('active', i + 1 === n);
  });
}

// ── Persona Grid (Step 1) ────────────────────────────────────────
function _fwilBuildPersonaGrid() {
  var container = document.getElementById('fwil-tag-container');
  if (!container) return;
  var isKo = (typeof LANG !== 'undefined') && LANG === 'ko';

  var html = '';

  // Saved preferences row
  _fwilLoadSaves();
  if (_fwilSaves.length > 0) {
    html += '<div class="fwil-saves-row" id="fwil-saves-row">' +
      '<div class="fwil-saves-title" onclick="fwilToggleSaves()">' +
        '📂 ' + (isKo ? '저장된 취향 불러오기' : 'Load saved preferences') +
        ' <span id="fwil-saves-arrow">▾</span>' +
      '</div>' +
      '<div class="fwil-saves-list" id="fwil-saves-list" style="display:none">' +
        _fwilSavesListHtml() +
      '</div>' +
    '</div>';
  }

  // Persona cards
  html += '<div class="fwil-persona-grid">';
  _FWIL_PERSONAS.forEach(function(p) {
    var sel = _fwilSelectedPersonas.indexOf(p.key) !== -1;
    html += '<button class="fwil-persona-card' + (sel ? ' selected' : '') + '" ' +
      'onclick="fwilTogglePersona(\'' + p.key + '\')">' +
      '<div class="fwil-persona-icon">' + p.icon + '</div>' +
      '<div class="fwil-persona-name">' + (isKo ? p.labelKo : p.label) + '</div>' +
      '<div class="fwil-persona-hint">' + (isKo ? p.hintKo : p.hint) + '</div>' +
    '</button>';
  });
  html += '</div>';

  container.innerHTML = html;
  _fwilUpdateNextBtn();
}

function fwilTogglePersona(key) {
  var idx = _fwilSelectedPersonas.indexOf(key);
  if (idx >= 0) _fwilSelectedPersonas.splice(idx, 1);
  else          _fwilSelectedPersonas.push(key);
  // Toggle card class
  document.querySelectorAll('.fwil-persona-card').forEach(function(card) {
    var cardKey = card.getAttribute('onclick').replace(/fwilTogglePersona\('|'\)/g, '');
    card.classList.toggle('selected', _fwilSelectedPersonas.indexOf(cardKey) !== -1);
  });
  _fwilUpdateNextBtn();
}

function _fwilUpdateNextBtn() {
  var btn = document.getElementById('fwil-next-btn');
  if (!btn) return;
  var isKo = (typeof LANG !== 'undefined') && LANG === 'ko';
  var n = _fwilSelectedPersonas.length;
  if (n > 0) {
    btn.textContent = isKo ? n + '개 선택 · 다음 →' : n + ' selected · Next →';
    btn.classList.add('ready');
  } else {
    btn.textContent = isKo ? '나의 유형을 선택하세요' : 'Pick your traveler type';
    btn.classList.remove('ready');
  }
}

function fwilStep1Next() {
  if (!_fwilSelectedPersonas.length) return;
  _fwilSelectedTags = _fwilExpandPersonaTags();
  _fwilShowSaveModal();
}

// ── Save Modal ───────────────────────────────────────────────────
function _fwilLoadSaves() {
  try { _fwilSaves = JSON.parse(localStorage.getItem(_FWIL_SAVE_KEY) || '[]'); } catch(e) { _fwilSaves = []; }
}

function _fwilSavesListHtml() {
  var isKo = (typeof LANG !== 'undefined') && LANG === 'ko';
  return _fwilSaves.map(function(s, i) {
    var date = s.savedAt ? new Date(s.savedAt).toLocaleDateString() : '';
    var cnt  = (s.personas || []).length;
    return '<div class="fwil-save-item" onclick="fwilLoadFromSlot(' + i + ')">' +
      '<div class="fwil-save-name">' + (s.name || ('Slot ' + (i+1))) + '</div>' +
      '<div class="fwil-save-meta">' + cnt + (isKo ? '개 유형' : ' type' + (cnt !== 1 ? 's' : '')) + (date ? ' · ' + date : '') + '</div>' +
    '</div>';
  }).join('');
}

function fwilToggleSaves() {
  var list  = document.getElementById('fwil-saves-list');
  var arrow = document.getElementById('fwil-saves-arrow');
  if (!list) return;
  var open = list.style.display !== 'none';
  list.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▾' : '▴';
}

function fwilLoadFromSlot(idx) {
  _fwilLoadSaves();
  var s = _fwilSaves[idx];
  if (!s) return;
  _fwilSelectedPersonas = (s.personas || []).slice();
  _fwilBuildPersonaGrid();
  var list = document.getElementById('fwil-saves-list');
  var arrow = document.getElementById('fwil-saves-arrow');
  if (list) list.style.display = 'none';
  if (arrow) arrow.textContent = '▾';
}

function _fwilShowSaveModal() {
  var modal = document.getElementById('fwil-save-modal');
  if (!modal) { _fwilShowStep(2); return; }
  var isKo = (typeof LANG !== 'undefined') && LANG === 'ko';
  _fwilLoadSaves();
  var slotsHtml = '';
  for (var i = 0; i < 5; i++) {
    var s = _fwilSaves[i];
    if (s) {
      slotsHtml += '<button class="fwil-slot-btn occupied" onclick="fwilSaveToSlot(' + i + ')">' +
        '<span class="fwil-slot-name">' + (s.name || ('Slot ' + (i+1))) + '</span>' +
        '<span class="fwil-slot-cnt">' + (s.personas || []).length + (isKo ? '개' : '') + '</span>' +
      '</button>';
    } else {
      slotsHtml += '<button class="fwil-slot-btn empty" onclick="fwilSaveToSlot(' + i + ')">' +
        '<span>+ ' + (isKo ? '새로 저장' : 'Save here') + '</span>' +
      '</button>';
    }
  }
  var body = modal.querySelector('.fwil-modal-body');
  if (body) {
    body.innerHTML =
      '<div class="fwil-modal-title">' + (isKo ? '취향 저장 (선택)' : 'Save preferences (optional)') + '</div>' +
      '<div class="fwil-modal-sub">' + (isKo ? '다음에도 이 선택을 불러올 수 있어요.' : 'Load these choices next time.') + '</div>' +
      '<div class="fwil-slots">' + slotsHtml + '</div>' +
      '<button class="fwil-skip-btn" onclick="fwilSaveSkip()">' + (isKo ? '저장 안 함 →' : 'Skip →') + '</button>';
  }
  modal.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { modal.classList.add('visible'); });
  });
}

function _fwilCloseModal() {
  var modal = document.getElementById('fwil-save-modal');
  if (!modal) return;
  modal.classList.remove('visible');
  setTimeout(function() { modal.style.display = 'none'; }, 220);
}

// Generate default save name: cityname_MMDDYYYY_01 (increments if taken)
function _fwilDefaultSaveName() {
  var cityKey = (typeof activeCityKey !== 'undefined' && activeCityKey) ? activeCityKey
              : (typeof activeCity   !== 'undefined' && activeCity)   ? activeCity : 'city';
  var cityClean = cityKey.replace(/-/g, '').toLowerCase(); // 'new-york' → 'newyork'
  var now  = new Date();
  var mm   = String(now.getMonth() + 1).padStart(2, '0');
  var dd   = String(now.getDate()).padStart(2, '0');
  var yyyy = now.getFullYear();
  var base = cityClean + '_' + mm + dd + yyyy;
  _fwilLoadSaves();
  var taken = _fwilSaves.filter(Boolean).map(function(s) { return s.name || ''; });
  var n = 1, candidate;
  do {
    candidate = base + '_' + String(n).padStart(2, '0');
    n++;
  } while (taken.indexOf(candidate) !== -1);
  return candidate;
}

function fwilSaveToSlot(idx) {
  _fwilLoadSaves();
  var isKo = (typeof LANG !== 'undefined') && LANG === 'ko';
  var existing    = _fwilSaves[idx];
  var defaultName = existing ? existing.name : _fwilDefaultSaveName();
  var name = prompt(isKo ? '이름을 입력하세요:' : 'Enter a name:', defaultName);
  if (name === null) return;
  _fwilSaves[idx] = { name: name || defaultName, personas: _fwilSelectedPersonas.slice(), savedAt: new Date().toISOString() };
  while (_fwilSaves.length < 5) _fwilSaves.push(null);
  try { localStorage.setItem(_FWIL_SAVE_KEY, JSON.stringify(_fwilSaves.filter(Boolean))); } catch(e) {}
  _fwilCloseModal();
  _fwilShowStep(2);
}

function fwilSaveSkip() {
  _fwilCloseModal();
  _fwilShowStep(2);
}

// ── Step 2: Location Mode ────────────────────────────────────────
function fwilUseGPS() {
  var g = document.getElementById('fwil-gps-btn');
  var p = document.getElementById('fwil-pin-btn');
  if (g) g.classList.add('selected');
  if (p) p.classList.remove('selected');
  // Close FWIL screen and activate GPS + watch for origin
  fwilClose();
  _ensureMapInit(function() {
    if (typeof toggleNearMe === 'function' && !nearMeActive) toggleNearMe();
    setTimeout(function() {
      if (typeof locateUserGPS === 'function') locateUserGPS();
    }, 200);
    _fwilWatchForLocation();
  });
}

function fwilDropPin() {
  var g = document.getElementById('fwil-gps-btn');
  var p = document.getElementById('fwil-pin-btn');
  if (g) g.classList.remove('selected');
  if (p) p.classList.add('selected');
  // Close FWIL screen and activate pin drop + watch for origin
  fwilClose();
  _ensureMapInit(function() {
    if (typeof toggleNearMe === 'function' && !nearMeActive) toggleNearMe();
    setTimeout(function() {
      if (typeof startPinDrop === 'function') startPinDrop();
    }, 200);
    _fwilWatchForLocation();
  });
}

// Poll until walkOrigin is set (GPS/pin), then compute top 5
function _fwilWatchForLocation() {
  var tries = 0;
  var iv = setInterval(function() {
    tries++;
    if (typeof walkOrigin !== 'undefined' && walkOrigin && walkOrigin.lat) {
      clearInterval(iv);
      _fwilComputeTop5();
    }
    if (tries >= 60) { clearInterval(iv); } // 30s timeout
  }, 500);
}

// ── Top-5 computation (with 4km route cap) ───────────────────────
var _FWIL_MAX_ROUTE_M = 4000;

// Nearest-neighbor tour order starting from origin
function _fwilNNRoute(origin, locs) {
  var remaining = locs.slice();
  var route = [], cur = origin;
  while (remaining.length) {
    var bestI = 0, bestD = Infinity;
    for (var i = 0; i < remaining.length; i++) {
      var d = haversineM(cur.lat, cur.lng, remaining[i].lat, remaining[i].lng);
      if (d < bestD) { bestD = d; bestI = i; }
    }
    cur = remaining.splice(bestI, 1)[0];
    route.push(cur);
  }
  return route;
}

// Total path distance: origin → stop1 → stop2 → …
function _fwilRouteDist(origin, locs) {
  var total = 0, cur = origin;
  locs.forEach(function(l) {
    total += haversineM(cur.lat, cur.lng, l.lat, l.lng);
    cur = l;
  });
  return total;
}

function _fwilComputeTop5() {
  if (!walkOrigin || !walkOrigin.lat) return;
  var cityKey = (typeof activeCityKey !== 'undefined' && activeCityKey) ? activeCityKey : null;
  var locs = (typeof LOCS !== 'undefined' ? LOCS : []).filter(function(l) {
    return !cityKey || l.city === cityKey;
  });

  // ① Score every location within the 15-min walk radius
  var scored = [];
  locs.forEach(function(l) {
    var dist = haversineM(walkOrigin.lat, walkOrigin.lng, l.lat, l.lng);
    if (dist > _FWIL_WALK_M) return;
    var matchTags = (l.tags || []).concat(l.cats || []);
    var score = 0;
    _fwilSelectedTags.forEach(function(sel) {
      var sl = sel.toLowerCase();
      matchTags.forEach(function(t) { if ((t || '').toLowerCase() === sl) score++; });
      var names = l.archs || (l.arch ? [l.arch] : []);
      names.forEach(function(n)  { if ((n || '').toLowerCase() === sl) score++; });
    });
    if (score > 0) scored.push({ loc: l, score: score, dist: dist });
  });

  if (!scored.length) {
    var isKo = (typeof LANG !== 'undefined') && LANG === 'ko';
    _landingToast(isKo ? '😔 주변에 매칭되는 장소가 없습니다' : '😔 No matching places nearby');
    return;
  }

  // ② Sort: preference score desc → distance from origin asc
  scored.sort(function(a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return a.dist - b.dist;
  });

  // ③ Start with top 5 (or fewer) candidates
  var candidates = scored.slice(0, 5).map(function(s) { return s.loc; });
  var origin = { lat: walkOrigin.lat, lng: walkOrigin.lng };

  // ④ Enforce 4km cap: order by nearest-neighbor, then trim last stop while over budget
  while (candidates.length > 0) {
    var ordered = _fwilNNRoute(origin, candidates);
    if (_fwilRouteDist(origin, ordered) <= _FWIL_MAX_ROUTE_M) {
      _fwilTop5 = ordered;
      break;
    }
    // Remove the last stop in the NN-ordered route (it contributes the longest final leg)
    var lastLoc = ordered[ordered.length - 1];
    candidates = candidates.filter(function(c) { return c !== lastLoc; });
  }

  if (!_fwilTop5 || !_fwilTop5.length) {
    var isKo2 = (typeof LANG !== 'undefined') && LANG === 'ko';
    _landingToast(isKo2 ? '😔 4km 이내에 매칭 장소가 없습니다' : '😔 No matching places within 4km route');
    return;
  }

  _fwilShowResultOverlay();
}

// ── Result Overlay ───────────────────────────────────────────────
function _fwilShowResultOverlay() {
  var el = document.getElementById('fwil-result');
  if (!el) return;
  var isKo = (typeof LANG !== 'undefined') && LANG === 'ko';

  // Highlight top-5 on map
  if (typeof map !== 'undefined' && map && _fwilTop5.length) {
    // Fit map to top-5 bounds
    var bounds = L.latLngBounds(_fwilTop5.map(function(l) { return [l.lat, l.lng]; }));
    if (walkOrigin) bounds.extend([walkOrigin.lat, walkOrigin.lng]);
    map.fitBounds(bounds.pad(0.2));
  }

  // Build list
  var listHtml = _fwilTop5.map(function(loc, i) {
    var photos = loc.photos && loc.photos.length ? loc.photos : [];
    var imgUrl = photos.length
      ? (typeof photoUrl === 'function' ? photoUrl(photos[0], true, 'popup') : photos[0])
      : '';
    var imgHtml = imgUrl
      ? '<img src="' + imgUrl + '" onerror="this.style.display=\'none\'" style="width:44px;height:44px;object-fit:cover;border-radius:8px;flex-shrink:0">'
      : '<div style="width:44px;height:44px;border-radius:8px;background:#2a2a2a;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#666;font-size:18px">📍</div>';
    return '<div class="fwil-res-item" onclick="fwilResClick(\'' + loc.id + '\')">' +
      '<span class="fwil-res-rank">' + (i + 1) + '</span>' +
      imgHtml +
      '<div class="fwil-res-info">' +
        '<div class="fwil-res-name">' + (loc.name || '') + '</div>' +
        '<div class="fwil-res-meta">' + (loc.cat || '') + (loc.hood ? ' · ' + loc.hood : '') + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  el.innerHTML =
    '<div class="fwil-result-panel">' +
      '<div class="fwil-result-header">' +
        '<span class="fwil-result-title">🎯 ' + (isKo ? '내 취향 Top 5' : 'Top 5 For You') + '</span>' +
        '<button class="fwil-result-close" onclick="fwilResultClose()">✕</button>' +
      '</div>' +
      '<div class="fwil-result-list">' + listHtml + '</div>' +
      '<button class="fwil-route-btn" onclick="fwilCreateRoute()">' +
        '🗺 ' + (isKo ? '루트 만들기' : 'Create Route') +
      '</button>' +
    '</div>';

  el.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { el.classList.add('visible'); });
  });
}

function fwilResClick(locId) {
  fwilResultClose();
  if (typeof openLocById === 'function') openLocById(locId);
}

function fwilResultClose() {
  var el = document.getElementById('fwil-result');
  if (!el) return;
  el.classList.remove('visible');
  setTimeout(function() { el.style.display = 'none'; }, 280);
}

function fwilCreateRoute() {
  fwilResultClose();
  if (typeof routeLocations !== 'undefined' && _fwilTop5.length) {
    routeLocations = _fwilTop5.slice();
  }
  if (typeof openRoutePanel === 'function') openRoutePanel();
  else if (typeof _openRouteManager === 'function') _openRouteManager('home');
  if (_fwilTop5.length && typeof calcRoute === 'function') {
    setTimeout(function() { calcRoute(); }, 400);
  }
}

// ══════════════════════════════════════════════════════════════════
// I FEEL LUCKY — Daily card swipe system
// ══════════════════════════════════════════════════════════════════

var _LUCKY_LIMIT   = 10;
var _LUCKY_KEY_DATE  = 'aw_lucky_date_v2'; // v2: UTC-based (old key discarded)
var _LUCKY_KEY_SEEN  = 'aw_lucky_seen_v2'; // v2: reset with new key
var _LUCKY_KEY_LIKED = 'aw_lucky_liked';

var _luckyQueue  = [];
var _luckyIndex  = 0;
var _luckyLiked  = [];   // IDs liked this session
var _luckyTouchX = 0;
var _luckyTouchY = 0;
var _luckyDragging = false;

function _luckyTodayStr() {
  // Use UTC date for consistent daily reset regardless of city/timezone
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD' UTC
}

function _luckyGetSeen() {
  var today = _luckyTodayStr();
  if (localStorage.getItem(_LUCKY_KEY_DATE) !== today) {
    localStorage.setItem(_LUCKY_KEY_DATE, today);
    localStorage.setItem(_LUCKY_KEY_SEEN, '[]');
  }
  try { return JSON.parse(localStorage.getItem(_LUCKY_KEY_SEEN) || '[]'); } catch(e) { return []; }
}

function _luckySaveSeen(arr) {
  localStorage.setItem(_LUCKY_KEY_SEEN, JSON.stringify(arr));
}

function _luckyGetLiked() {
  try { return JSON.parse(localStorage.getItem(_LUCKY_KEY_LIKED) || '[]'); } catch(e) { return []; }
}

function _luckySaveLiked(arr) {
  localStorage.setItem(_LUCKY_KEY_LIKED, JSON.stringify(arr));
}

function _openIflLucky() {
  var screen = document.getElementById('ifl-lucky-screen');
  if (!screen) return;

  var seen = _luckyGetSeen();

  // Already used all 10 today → show results screen
  if (seen.length >= _LUCKY_LIMIT) {
    screen.style.display = 'flex';
    requestAnimationFrame(function() {
      requestAnimationFrame(function() { screen.classList.add('visible'); });
    });
    _showLuckyResults(screen, seen);
    return;
  }

  // Current active city key (e.g. 'new-york', 'seoul')
  var cityKey = (typeof activeCityKey !== 'undefined' && activeCityKey) ? activeCityKey : null;

  // Build queue from current city only, excluding already-seen today
  var allLocs = (typeof LOCS !== 'undefined' ? LOCS : []).filter(function(l) {
    if (seen.indexOf(l.id) !== -1) return false;
    if (cityKey && l.city !== cityKey) return false;
    return true;
  });
  // shuffle
  allLocs.sort(function() { return Math.random() - 0.5; });
  _luckyQueue = allLocs.slice(0, _LUCKY_LIMIT - seen.length);
  _luckyIndex = 0;
  _luckyLiked = [];

  screen.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { screen.classList.add('visible'); });
  });
  _renderLuckyCard(screen, seen);
}

function _closeLuckyScreen() {
  var screen = document.getElementById('ifl-lucky-screen');
  if (!screen) return;
  screen.classList.remove('visible');
  setTimeout(function() { screen.style.display = 'none'; }, 280);
}

function _renderLuckyCard(screen, seen) {
  var cardArea = document.getElementById('ilk-card-area');
  var counter  = document.getElementById('ilk-counter');
  var actions  = document.getElementById('ilk-actions');
  if (!cardArea) return;

  // Guard: if queue is empty but seen < limit, LOCS may not be loaded yet — show error
  if (_luckyIndex >= _luckyQueue.length) {
    var seenNow = seen || _luckyGetSeen();
    if (seenNow.length < _LUCKY_LIMIT && _luckyQueue.length === 0) {
      // LOCS not loaded yet or no locations — show friendly message instead of results
      if (cardArea) cardArea.innerHTML =
        '<div style="color:rgba(255,255,255,0.6);font-size:14px;text-align:center;padding:32px 16px">' +
        'No locations loaded yet.<br>Please wait for the map to finish loading.' +
        '</div>';
      return;
    }
    _showLuckyResults(screen, seenNow);
    return;
  }

  var loc = _luckyQueue[_luckyIndex];
  var total = seen ? seen.length + _luckyQueue.length : _LUCKY_LIMIT;
  var current = seen ? seen.length + _luckyIndex + 1 : _luckyIndex + 1;
  if (counter) counter.textContent = current + ' / ' + Math.min(total, _LUCKY_LIMIT);
  if (actions) actions.style.display = 'flex';

  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';

  // ── Media section: photo → Street View → placeholder ──────────
  var photos = (loc.photos && loc.photos.length) ? loc.photos : [];
  var hasSVKey = typeof GOOGLE_MAPS_API_KEY === 'string' && GOOGLE_MAPS_API_KEY;
  var _SV_ALLOW = 'accelerometer; gyroscope; magnetometer; fullscreen';
  var mediaInner;
  var _pUrl = (photos.length && typeof photoUrl === 'function')
    ? photoUrl(photos[0], true, 'popup')
    : (photos.length ? photos[0] : '');
  if (photos.length) {
    mediaInner = '<img class="ilk-card-img" src="' + _pUrl + '" loading="eager" fetchpriority="high"' +
      ' onerror="this.style.display=\'none\';this.nextElementSibling && (this.nextElementSibling.style.display=\'\')">' +
      '<div class="ilk-card-no-photo" style="display:none"></div>';
  } else if (hasSVKey && loc.lat && loc.lng) {
    // Use correct field names matching core.js / map.js data schema
    var svLat = (loc.sv && loc.sv.lat     != null) ? loc.sv.lat     : loc.lat;
    var svLng = (loc.sv && loc.sv.lng     != null) ? loc.sv.lng     : loc.lng;
    var svH   = (loc.sv && loc.sv.heading != null) ? loc.sv.heading : 0;
    var svP   = (loc.sv && loc.sv.pitch   != null) ? loc.sv.pitch   : 5;
    var svFov = Math.min(100, Math.max(10, (loc.sv && loc.sv.fov != null) ? loc.sv.fov : 80));
    // panoId takes priority over lat/lng (same as map.js / core.js)
    var svQ = 'key=' + GOOGLE_MAPS_API_KEY + '&heading=' + svH + '&pitch=' + svP + '&fov=' + svFov;
    if (loc.sv && loc.sv.panoId) svQ += '&pano=' + loc.sv.panoId;
    else svQ += '&location=' + svLat + ',' + svLng;
    var svSrc = 'https://www.google.com/maps/embed/v1/streetview?' + svQ;
    // iframe is pointer-events:auto → user can pan/drag SV directly inside the card.
    // Swipe left/right still works via the card-info area + LIKE/PASS buttons.
    var _svLabel = (typeof LANG !== 'undefined' && LANG === 'ko') ? '드래그로 탐색' : 'Drag to explore';
    mediaInner = '<iframe class="ilk-card-sv" src="' + svSrc + '"' +
      ' frameborder="0" referrerpolicy="no-referrer-when-downgrade"' +
      ' allowfullscreen allow="' + _SV_ALLOW + '"></iframe>' +
      '<div class="ilk-sv-label">' + _svLabel + '</div>';
    // Request iOS gyroscope permission from parent (must happen in user-gesture context)
    if (typeof _requestMotionPermission === 'function') _requestMotionPermission();
  } else {
    mediaInner = '<div class="ilk-card-no-photo"></div>';
  }

  // ── Meta: architect · year ────────────────────────────────────
  var archParts = [];
  if (loc.arch) archParts.push(loc.arch);
  if (loc.yr)   archParts.push(loc.yr);
  var archYrHtml = archParts.length
    ? '<div class="ilk-arch-yr">' + archParts.join(' · ') + '</div>'
    : '';

  // ── Tags (max 4) ──────────────────────────────────────────────
  var tagsHtml = '';
  if (loc.tags && loc.tags.length) {
    tagsHtml = '<div class="ilk-tags">' +
      loc.tags.slice(0, 4).map(function(tag) {
        return '<span class="ilk-tag">' + tag + '</span>';
      }).join('') + '</div>';
  }

  // ── Description ───────────────────────────────────────────────
  var desc = (isKo ? (loc.desc_ko || loc.desc_en) : (loc.desc_en || loc.desc_ko)) || '';
  if (desc.length > 120) desc = desc.slice(0, 120) + '…';

  // ── City label ────────────────────────────────────────────────
  var cityLabel = (typeof CITY_META !== 'undefined' && loc.city)
    ? (Object.values(CITY_META).find(function(m) { return m.key === loc.city; }) || {}).label || loc.city
    : loc.city || '';

  cardArea.innerHTML =
    '<div class="ilk-card" id="ilk-active-card">' +
      '<div class="ilk-card-media">' + mediaInner + '</div>' +
      '<div class="ilk-card-info">' +
        '<div class="ilk-card-name">' + (loc.name || '') + '</div>' +
        archYrHtml +
        tagsHtml +
        (desc ? '<div class="ilk-card-desc">' + desc + '</div>' : '') +
        '<div class="ilk-card-city">' + cityLabel + '</div>' +
      '</div>' +
      '<div class="ilk-like-badge">LIKE</div>' +
      '<div class="ilk-pass-badge">PASS</div>' +
    '</div>';

  // Bind swipe
  var card = document.getElementById('ilk-active-card');
  if (card) _bindLuckySwipe(card, screen, seen);

  // Preload next card's image so the transition is instant
  var _nextIdx = _luckyIndex + 1;
  if (_nextIdx < _luckyQueue.length) {
    var _nextLoc = _luckyQueue[_nextIdx];
    var _nextPhotos = (_nextLoc.photos && _nextLoc.photos.length) ? _nextLoc.photos : [];
    if (_nextPhotos.length) {
      var _preload = new Image();
      _preload.src = (typeof photoUrl === 'function')
        ? photoUrl(_nextPhotos[0], true, 'popup')
        : _nextPhotos[0];
    }
  }
}

function _bindLuckySwipe(card, screen, seen) {
  card.addEventListener('touchstart', function(e) {
    _luckyTouchX = e.touches[0].clientX;
    _luckyTouchY = e.touches[0].clientY;
    _luckyDragging = true;
    card.style.transition = 'none';
  }, { passive: true });

  card.addEventListener('touchmove', function(e) {
    if (!_luckyDragging) return;
    var dx = e.touches[0].clientX - _luckyTouchX;
    var rotate = dx * 0.07;
    card.style.transform = 'translateX(' + dx + 'px) rotate(' + rotate + 'deg)';
    var likeBadge = card.querySelector('.ilk-like-badge');
    var passBadge = card.querySelector('.ilk-pass-badge');
    if (likeBadge) likeBadge.style.opacity = Math.min(1, Math.max(0, dx / 80));
    if (passBadge) passBadge.style.opacity = Math.min(1, Math.max(0, -dx / 80));
  }, { passive: true });

  card.addEventListener('touchend', function(e) {
    if (!_luckyDragging) return;
    _luckyDragging = false;
    var dx = e.changedTouches[0].clientX - _luckyTouchX;
    card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    if (dx > 70) {
      card.style.transform = 'translateX(120vw) rotate(20deg)';
      card.style.opacity = '0';
      setTimeout(function() { _luckyAdvance('like', screen, seen); }, 300);
    } else if (dx < -70) {
      card.style.transform = 'translateX(-120vw) rotate(-20deg)';
      card.style.opacity = '0';
      setTimeout(function() { _luckyAdvance('pass', screen, seen); }, 300);
    } else {
      card.style.transform = '';
      var likeBadge = card.querySelector('.ilk-like-badge');
      var passBadge = card.querySelector('.ilk-pass-badge');
      if (likeBadge) likeBadge.style.opacity = '0';
      if (passBadge) passBadge.style.opacity = '0';
    }
  }, { passive: true });
}

function _luckyAction(action) {
  var card = document.getElementById('ilk-active-card');
  if (!card || _luckyDragging) return;
  var seen = _luckyGetSeen();
  card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  if (action === 'like') {
    card.style.transform = 'translateX(120vw) rotate(20deg)';
  } else {
    card.style.transform = 'translateX(-120vw) rotate(-20deg)';
  }
  card.style.opacity = '0';
  setTimeout(function() { _luckyAdvance(action, null, seen); }, 300);
}

function _luckyAdvance(action, screen, seen) {
  if (!screen) screen = document.getElementById('ifl-lucky-screen');
  if (!seen) seen = _luckyGetSeen();
  var loc = _luckyQueue[_luckyIndex];
  if (!loc) return;

  // Record as seen
  seen = seen.concat([loc.id]);
  _luckySaveSeen(seen);

  // Record like
  if (action === 'like') {
    _luckyLiked.push(loc.id);
    var allLiked = _luckyGetLiked();
    if (allLiked.indexOf(loc.id) === -1) {
      allLiked.push(loc.id);
      _luckySaveLiked(allLiked);
    }
  }

  _luckyIndex++;

  if (seen.length >= _LUCKY_LIMIT || _luckyIndex >= _luckyQueue.length) {
    _showLuckyResults(screen, seen);
  } else {
    _renderLuckyCard(screen, seen);
  }
}

function _showLuckyResults(screen, seen) {
  if (!screen) screen = document.getElementById('ifl-lucky-screen');
  var cardArea  = document.getElementById('ilk-card-area');
  var counter   = document.getElementById('ilk-counter');
  var actions   = document.getElementById('ilk-actions');
  if (!cardArea) return;

  if (counter) counter.textContent = '✓ Done';
  if (actions) actions.style.display = 'none';

  var liked = _luckyGetLiked();
  var allLocs = typeof LOCS !== 'undefined' ? LOCS : [];
  // Matches: liked locations in the current active city
  var cityKey = typeof activeCityKey !== 'undefined' ? activeCityKey : null;
  var matches = liked
    .map(function(id) { return allLocs.find(function(l) { return l.id === id; }); })
    .filter(function(l) { return l && (!cityKey || l.city === cityKey); });

  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';
  var tomorrowHint = isKo ? '내일 새로운 10개의 장소를 만나보세요.' : 'Come back tomorrow for 10 new places.';
  var matchTitle = isKo ? '🎯 내 관심 장소' : '🎯 Your Matches';
  var noMatch = isKo ? '아직 좋아한 장소가 없어요.' : 'No liked places yet.';
  var favHint = isKo ? '탭하면 즐겨찾기에 추가됩니다.' : 'Tap to add to favorites.';

  var matchHtml = matches.length
    ? matches.map(function(loc) {
        var photos = loc.photos && loc.photos.length ? loc.photos : [];
        var img = photos.length
          ? '<img src="' + photos[0] + '" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0" onerror="this.style.display=\'none\'">'
          : '<div style="width:48px;height:48px;border-radius:8px;background:#333;flex-shrink:0"></div>';
        var isFaved = typeof isFav === 'function' && isFav(loc.id);
        return '<div class="ilk-match-row" onclick="_luckyMatchTap(\'' + loc.id + '\')" style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:12px;background:rgba(255,255,255,0.06);margin-bottom:8px;cursor:pointer">' +
          img +
          '<div style="flex:1;min-width:0">' +
            '<div style="color:#fff;font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (loc.name || '') + '</div>' +
            '<div style="color:rgba(255,255,255,0.45);font-size:11px;margin-top:2px">' + (loc.cat || '') + '</div>' +
          '</div>' +
          '<span style="font-size:18px">' + (isFaved ? '⭐' : '☆') + '</span>' +
        '</div>';
      }).join('')
    : '<div style="color:rgba(255,255,255,0.4);font-size:13px;text-align:center;padding:24px 0">' + noMatch + '</div>';

  cardArea.innerHTML =
    '<div style="width:100%;max-width:400px;padding:0 4px;overflow-y:auto;max-height:100%">' +
      '<div style="color:#fff;font-size:22px;font-weight:800;margin-bottom:4px">' + matchTitle + '</div>' +
      '<div style="color:rgba(255,255,255,0.4);font-size:12px;margin-bottom:20px">' +
        (matches.length ? favHint : tomorrowHint) +
      '</div>' +
      matchHtml +
      '<div style="color:rgba(255,255,255,0.3);font-size:11px;text-align:center;margin-top:16px">' + tomorrowHint + '</div>' +
    '</div>';
}

function _luckyMatchTap(locId) {
  if (typeof toggleFav === 'function') {
    toggleFav(locId);
    // Refresh the star icon
    var rows = document.querySelectorAll('.ilk-match-row');
    rows.forEach(function(row) {
      if (row.getAttribute('onclick') && row.getAttribute('onclick').indexOf(locId) !== -1) {
        var star = row.querySelector('span');
        if (star) star.textContent = (typeof isFav === 'function' && isFav(locId)) ? '⭐' : '☆';
      }
    });
  }
}

// ══════════════════════════════════════════════════════════════════
