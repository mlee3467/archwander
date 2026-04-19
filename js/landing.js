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
  }, 1300);
}

function showLandingScreen() {
  var el = document.getElementById('landing-screen');
  if (!el) return;
  el.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { el.classList.add('visible'); });
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
  if (window.innerWidth > 900) { location.reload(); return; }
  // Close any open mobile action bar first
  if (typeof closeMobileActions === 'function') closeMobileActions();
  showLandingScreen();
}

// ── City & Location popup ────────────────────────────────────────

var _clpSelectedCity = null;
var _clpLocMode      = null;  // 'gps' | 'pin'

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
      // Open sidebar so user can see Favorites / Visited + advanced filters
      if (typeof openSidebar === 'function') openSidebar();
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
  showLandingScreen();
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
  if (typeof openRoutePanel === 'function') openRoutePanel();
}

function _sbaIfl() {
  landingGoIfl();
}

// ══════════════════════════════════════════════════════════════════
