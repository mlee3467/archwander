// ══════════════════════════════════════════════════════════════════
// ROUTE PLANNER
// ══════════════════════════════════════════════════════════════════
// Location curation + Google Maps handoff for navigation.
// OSRM + walker animation retained for Near Me single-destination use.

var routeActive      = false;
var routeLocations   = [];   // ordered list of locations in the route
var routeLine        = null; // Leaflet polyline for the route
var routeMarkers     = [];   // numbered step markers on map
var routeData        = null; // { distance, duration, steps: [...] }
var _rpsSelectedHoods = new Set(); // selected hoods in the presel modal (multi-select)
var _SAVED_ROUTES_KEY = 'aw_saved_routes_v2';  // current: array of named routes
var routeOriginMarker = null; // green start marker at walkOrigin
var _routeTravelMode  = 'walking'; // 'walking' | 'transit' | 'driving'

// ── Distance thresholds (absolute distances) ──────────────────────
var _WLK_D_STOP  = 6000;   // 6km+ → beyond limit marker logic

// ── Start Marker Icon Builder ──────────────────────────────────────
function _buildStartMarkerIcon() {
  return L.divIcon({
    html:
      '<div style="display:flex;align-items:center;gap:4px;white-space:nowrap">' +
        '<div style="background:#22c55e;color:white;width:28px;height:28px;border-radius:50%;' +
        'display:flex;align-items:center;justify-content:center;font-size:14px;' +
        'border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35);flex-shrink:0">📍</div>' +
        '<div style="font-size:9px;font-family:Inter,sans-serif;font-weight:600;color:#111;' +
        'background:rgba(255,255,255,0.92);padding:2px 5px;border-radius:3px;' +
        'box-shadow:0 1px 4px rgba(0,0,0,0.25)">Start</div>' +
      '</div>',
    className: '',
    iconSize: [100, 28],
    iconAnchor: [14, 14]
  });
}

// ── Route Marker Icon Builder ────────────────────────────────────
// visited=false → pink; visited=true → black; beyondLimit → gray
function _buildRouteMarkerIcon(num, name, visited, beyondLimit) {
  var circleBg  = beyondLimit ? '#aaaaaa' : visited ? '#111111' : '#D946A8';
  var circleBdr = beyondLimit ? '#cccccc' : 'white';
  var labelCol  = beyondLimit ? '#888' : '#111';
  var labelBg   = beyondLimit ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.92)';
  return L.divIcon({
    html:
      '<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;cursor:pointer;pointer-events:auto">' +
        '<div style="background:' + circleBg + ';color:white;width:28px;height:28px;border-radius:50%;' +
        'display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;' +
        'border:2px solid ' + circleBdr + ';box-shadow:0 2px 6px rgba(0,0,0,0.3);font-family:Inter,sans-serif;' +
        'flex-shrink:0;pointer-events:auto">' + num + '</div>' +
        '<div style="font-size:9px;font-family:Inter,sans-serif;font-weight:600;color:' + labelCol + ';' +
        'background:' + labelBg + ';padding:2px 5px;border-radius:3px;' +
        'box-shadow:0 1px 4px rgba(0,0,0,0.25);max-width:90px;overflow:hidden;text-overflow:ellipsis;' +
        'pointer-events:auto">' +
        _escHtml(name) + '</div>' +
      '</div>',
    className: '',
    iconSize:   [130, 28],
    iconAnchor: [14, 14]
  });
}

// ── Route Panel UI ───────────────────────────────────────────────

var routePinDropMode  = false;  // kept for init.js compatibility
var _routeActivePopup = null;   // currently open route marker popup

function _getRouteLocs() {
  return typeof getFiltered === 'function'
    ? getFiltered()
    : LOCS.filter(function(l) { return l.city === activeCityKey; });
}

var _ROUTE_PRESEL_THRESHOLD = 12; // max locations before pre-selection modal

function openRoutePanel() {
  routeActive = true;
  var sbaRoute = document.getElementById('sba-route');
  if (sbaRoute) sbaRoute.classList.add('sba-active');
  if (typeof _updateSetRouteFab === 'function') _updateSetRouteFab(); // hide FAB
  if (!document.getElementById('route-panel')) _createRoutePanel();
  var panel = document.getElementById('route-panel');
  panel.classList.remove('minimized');
  panel.classList.add('visible');

  // If we already have route locations (e.g. "Back to Map" was pressed), restore UI
  if (routeLocations.length > 0) {
    _refreshRouteUI();
    return;
  }

  // If too many locations, show pre-selection modal first
  var locs = _getRouteLocs();
  if (locs.length > _ROUTE_PRESEL_THRESHOLD) {
    _showRoutePreselModal(locs);
    return;
  }

  // Auto-populate from current filtered list
  routeLocations = locs.slice();
  _refreshRouteUI();
  // No auto-routing: user controls Google Maps handoff via action bar
}

function closeRoutePanel() {
  routeActive = false;
  var sbaRoute = document.getElementById('sba-route');
  if (sbaRoute) sbaRoute.classList.remove('sba-active');
  _closeRouteCustomPopup();
  if (typeof _updateSetRouteFab === 'function') _updateSetRouteFab(); // re-show FAB
  var panel = document.getElementById('route-panel');
  if (panel) { panel.classList.remove('visible'); panel.classList.remove('minimized'); }
  clearRoute();
}

function _createRoutePanel() {
  var div = document.createElement('div');
  div.id = 'route-panel';
  div.className = 'route-panel';
  div.innerHTML =
    '<div class="route-panel-hdr" style="position:relative">' +
      '<button class="route-panel-back" onclick="_routePanelBack()" title="Back to map">◀ </button>' +
      '<span class="route-panel-title">Route Planner</span>' +
      '<div class="route-hdr-right">' +
        '<button class="route-hdr-icon-btn" onclick="_saveMyRoute()" title="Save route">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>' +
        '</button>' +
        '<button class="route-hdr-icon-btn" onclick="_loadMyRoute()" title="Load saved route">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>' +
        '</button>' +
        '<button class="route-hdr-icon-btn" id="route-share-btn" onclick="_openRouteShare()" title="Share route" style="display:none">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' +
        '</button>' +
        '<button class="route-hdr-icon-btn route-hdr-clear-btn" id="route-top-clear" onclick="clearRouteSelection()" style="display:none">Clear</button>' +
        '<button class="route-hdr-icon-btn" onclick="closeRoutePanel()" title="Close &amp; clear">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="route-save-toast" id="route-save-toast"></div>' +
    '</div>' +
    '<div class="route-panel-body" id="route-panel-body">' +
      '<div class="route-stop-list" id="route-sel-list"></div>' +
      '<div class="route-result" id="route-result" style="display:none"></div>' +
    '</div>';
  document.body.appendChild(div);
}

function clearRouteSelection() {
  _closeRouteCustomPopup();
  routeLocations = [];
  clearRoute();
  _refreshRouteUI();
}

// Hide route panel without clearing route state (Back to Map)
function _routePanelBack() {
  var panel = document.getElementById('route-panel');
  if (!panel) return;
  // On mobile, if a route has been built keep the minimized peek bar visible
  if (window.innerWidth <= 900 && routeLocations.length >= 2) {
    _minimizeRoutePanelMobile();
  } else {
    panel.classList.remove('visible');
  }
  // Keep routeActive, routeLocations, and drawn route intact
}

// ══════════════════════════════════════════════════════════════════
// ROUTE SETTINGS (persisted)
// ══════════════════════════════════════════════════════════════════

var _ROUTE_SETTINGS_KEY = 'aw_route_settings_v1';
var _routeMaxDistM      = 6000;   // max before 6km warning
var _routeAnimEnabled   = true;   // walker animation

(function _loadRouteSettings() {
  try {
    var s = JSON.parse(localStorage.getItem(_ROUTE_SETTINGS_KEY) || '{}');
    if (typeof s.maxDistM    === 'number') { _routeMaxDistM = s.maxDistM; _WLK_D_STOP = s.maxDistM; }
    if (typeof s.animEnabled === 'boolean') _routeAnimEnabled = s.animEnabled;
  } catch(e) {}
})();

function _saveRouteSettings() {
  localStorage.setItem(_ROUTE_SETTINGS_KEY, JSON.stringify({
    maxDistM: _routeMaxDistM, animEnabled: _routeAnimEnabled
  }));
}

// ── Saved Routes Storage ─────────────────────────────────────────

function _getSavedRoutes() {
  try { return JSON.parse(localStorage.getItem(_SAVED_ROUTES_KEY) || '[]'); }
  catch(e) { return []; }
}
function _putSavedRoutes(routes) {
  localStorage.setItem(_SAVED_ROUTES_KEY, JSON.stringify(routes));
  if (typeof syncSchedulePush === 'function') syncSchedulePush();
}

// Generate default name: e.g. "seoul-gangnam-15mins-01"
function _generateDefaultRouteName() {
  var city = (typeof activeCityKey !== 'undefined' && activeCityKey) ? activeCityKey : 'city';

  // Most common neighborhood
  var hoodCount = {};
  routeLocations.forEach(function(l) {
    if (l.hood) hoodCount[l.hood] = (hoodCount[l.hood] || 0) + 1;
  });
  var hood = 'area', maxCnt = 0;
  Object.keys(hoodCount).forEach(function(h) {
    if (hoodCount[h] > maxCnt) { maxCnt = hoodCount[h]; hood = h; }
  });
  var hoodSlug = hood.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'area';

  // Duration
  var durMin = 15;
  if (routeData && routeData.duration) durMin = Math.ceil(routeData.duration / 60);
  else if (routeLocations.length > 0) durMin = routeLocations.length * 5;
  var durRounded = Math.max(5, Math.round(durMin / 5) * 5);
  var durStr = durRounded + 'mins';

  // Auto-increment index
  var saved = _getSavedRoutes();
  var prefix = city + '-' + hoodSlug + '-' + durStr + '-';
  var maxIdx = 0;
  saved.forEach(function(r) {
    if (r.name && r.name.indexOf(prefix) === 0) {
      var n = parseInt(r.name.slice(prefix.length), 10);
      if (!isNaN(n) && n > maxIdx) maxIdx = n;
    }
  });
  return prefix + String(maxIdx + 1).padStart(2, '0');
}

// Show save dialog with editable name
function _saveMyRoute() {
  if (!routeLocations.length) return;
  var defaultName = _generateDefaultRouteName();
  var existing = document.getElementById('aw-save-route-dialog');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

  var dlg = document.createElement('div');
  dlg.id = 'aw-save-route-dialog';
  dlg.className = 'aw-dialog-overlay';
  dlg.innerHTML =
    '<div class="aw-dialog-box">' +
      '<div class="aw-dialog-title">Save Route</div>' +
      '<div class="aw-dialog-sub">Name this route</div>' +
      '<input class="aw-dialog-input" id="aw-route-name-input" type="text"' +
        ' value="' + _escHtml(defaultName) + '" maxlength="60" autocomplete="off" spellcheck="false">' +
      '<div class="aw-dialog-btns">' +
        '<button class="aw-dialog-btn aw-dialog-cancel" onclick="_cancelSaveRoute()">✕&nbsp;Cancel</button>' +
        '<button class="aw-dialog-btn aw-dialog-confirm" onclick="_confirmSaveRoute()">✓&nbsp;Save</button>' +
      '</div>' +
    '</div>';
  dlg.addEventListener('click', function(e) { if (e.target === dlg) _cancelSaveRoute(); });
  document.body.appendChild(dlg);
  var inp = document.getElementById('aw-route-name-input');
  if (inp) {
    inp.focus(); inp.select();
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') _confirmSaveRoute();
      if (e.key === 'Escape') _cancelSaveRoute();
    });
  }
}

function _cancelSaveRoute() {
  var dlg = document.getElementById('aw-save-route-dialog');
  if (dlg && dlg.parentNode) dlg.parentNode.removeChild(dlg);
}

function _confirmSaveRoute() {
  var inp = document.getElementById('aw-route-name-input');
  var name = inp ? inp.value.trim() : '';
  if (!name) name = _generateDefaultRouteName();

  var hoodCount = {};
  routeLocations.forEach(function(l) {
    if (l.hood) hoodCount[l.hood] = (hoodCount[l.hood] || 0) + 1;
  });
  var topHood = '', maxCnt = 0;
  Object.keys(hoodCount).forEach(function(h) {
    if (hoodCount[h] > maxCnt) { maxCnt = hoodCount[h]; topHood = h; }
  });

  var entry = {
    id:          'r-' + Date.now(),
    name:        name,
    city:        (typeof activeCityKey !== 'undefined') ? activeCityKey : '',
    locationIds: routeLocations.map(function(l) { return l.id; }),
    stops:       routeLocations.length,
    hood:        topHood,
    duration:    routeData ? Math.round(routeData.duration) : 0,
    distance:    routeData ? Math.round(routeData.distance) : 0,
    savedAt:     Date.now()
  };
  var routes = _getSavedRoutes();
  routes.push(entry);
  _putSavedRoutes(routes);
  // Immediately refresh My Journey count so sidebar shows updated number
  if (typeof _updatePassportStats === 'function') _updatePassportStats();
  _cancelSaveRoute();

  var toast = document.getElementById('route-save-toast');
  if (toast) {
    toast.textContent = 'Saved ✓ ' + name;
    toast.style.opacity = '1';
    setTimeout(function() { if (toast) toast.style.opacity = '0'; }, 2500);
  }
}

// 📂 button in route panel → open manager at saved-routes level
function _loadMyRoute() { _openRouteManager('saved'); }

// Load a specific saved route into the planner
function _loadSavedRouteById(id) {
  var routes = _getSavedRoutes();
  var found  = routes.find(function(r) { return r.id === id; });
  if (!found) return;
  var allLocs = typeof LOCS !== 'undefined' ? LOCS : [];
  var loaded  = found.locationIds.map(function(lid) {
    return allLocs.find(function(l) { return l.id === lid; });
  }).filter(Boolean);
  if (!loaded.length) {
    alert('Could not find locations in current city data.');
    return;
  }
  _closeRouteManager();
  routeLocations = loaded;
  if (!document.getElementById('route-panel')) _createRoutePanel();
  var panel = document.getElementById('route-panel');
  panel.classList.remove('minimized');
  panel.classList.add('visible');
  routeActive = true;
  if (typeof _updateSetRouteFab === 'function') _updateSetRouteFab();
  _refreshRouteUI();
  // calcRoute() is only used by Near Me walker animation — not called from planner
}

// ══════════════════════════════════════════════════════════════════
// ROUTE MANAGER POPUP  (multi-level: home → saved | settings)
// ══════════════════════════════════════════════════════════════════

function _openRouteManager(startLevel) {
  var sbaRoute = document.getElementById('sba-route');
  if (sbaRoute) sbaRoute.classList.add('sba-active');
  var existing = document.getElementById('aw-route-manager');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

  var overlay = document.createElement('div');
  overlay.id  = 'aw-route-manager';
  overlay.className = 'arm-overlay';
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) _closeRouteManager();
  });
  var panel = document.createElement('div');
  panel.className = 'arm-panel';
  panel.id = 'arm-panel';
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  _rmRender(startLevel || 'home');
}

function _closeRouteManager() {
  var el = document.getElementById('aw-route-manager');
  if (el && el.parentNode) el.parentNode.removeChild(el);
  // sba-route only stays active if route panel is also open
  if (!routeActive) {
    var sbaRoute = document.getElementById('sba-route');
    if (sbaRoute) sbaRoute.classList.remove('sba-active');
  }
}

function _rmRender(level) {
  var panel = document.getElementById('arm-panel');
  if (!panel) return;
  if      (level === 'home')     panel.innerHTML = _rmHomeHTML();
  else if (level === 'saved')    panel.innerHTML = _rmSavedHTML();
  else if (level === 'settings') panel.innerHTML = _rmSettingsHTML();
}

function _rmHomeHTML() {
  return '<div class="arm-header">' +
    '<button class="arm-back" onclick="_closeRouteManager()">◀ </button>' +
    '<span class="arm-title">🗺&nbsp;Route Manager</span>' +
    '<button class="arm-close" onclick="_closeRouteManager()">✕</button>' +
  '</div>' +
  '<div class="arm-menu">' +
    '<button class="arm-item arm-item-create" onclick="_rmCreateRoute()">' +
      '<span class="arm-item-icon">▶</span>' +
      '<span class="arm-item-text">' +
        '<span class="arm-item-label">Create Route</span>' +
        '<span class="arm-item-sub">Build from current filter</span>' +
      '</span>' +
    '</button>' +
    '<button class="arm-item" onclick="_rmRender(\'saved\')">' +
      '<span class="arm-item-icon"></span>' +
      '<span class="arm-item-text">' +
        '<span class="arm-item-label">Saved Routes</span>' +
        '<span class="arm-item-sub">Load from your saved routes</span>' +
      '</span>' +
      '<span class="arm-item-arrow">›</span>' +
    '</button>' +
    '<button class="arm-item" onclick="_rmRender(\'settings\')">' +
      '<span class="arm-item-icon"></span>' +
      '<span class="arm-item-text">' +
        '<span class="arm-item-label">Route Settings</span>' +
        '<span class="arm-item-sub">Radius, distance, animation</span>' +
      '</span>' +
      '<span class="arm-item-arrow">›</span>' +
    '</button>' +
  '</div>';
}

function _rmSavedHTML() {
  var routes = _getSavedRoutes();
  var rowsHtml = '';
  if (!routes.length) {
    rowsHtml = '<div class="arm-empty">No saved routes yet</div>';
  } else {
    rowsHtml = routes.slice().reverse().map(function(r) {
      var durMin  = r.duration ? Math.ceil(r.duration / 60) : 0;
      var durStr  = durMin > 0
        ? (durMin < 60 ? durMin + 'min' : Math.floor(durMin/60) + 'h ' + (durMin%60) + 'min')
        : '—';
      var distStr = r.distance > 0
        ? (r.distance < 1000 ? Math.round(r.distance) + 'm' : (r.distance/1000).toFixed(1) + 'km') : '—';
      var dateStr = r.savedAt ? new Date(r.savedAt).toLocaleDateString() : '';
      return '<div class="arm-route-row">' +
        '<div class="arm-route-main">' +
          '<div class="arm-route-name">' + _escHtml(r.name) + '</div>' +
          '<div class="arm-route-meta">' +
            (r.city ? '<span class="arm-tag">' + _escHtml(r.city) + (r.hood ? ' · ' + _escHtml(r.hood) : '') + '</span>' : '') +
            (r.stops ? '<span class="arm-tag">' + r.stops + ' stops</span>' : '') +
            (durStr !== '—' ? '<span class="arm-tag">⏱ ' + durStr + '</span>' : '') +
            (distStr !== '—' ? '<span class="arm-tag">' + distStr + '</span>' : '') +
            (dateStr ? '<span class="arm-tag arm-tag-date">' + dateStr + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="arm-route-btns">' +
          '<button class="arm-load-btn" onclick="_rmLoadRoute(\'' + r.id + '\')">Load</button>' +
          '<button class="arm-del-btn"  onclick="_rmDeleteRoute(\'' + r.id + '\')">🗑</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }
  return '<div class="arm-header">' +
    '<button class="arm-back" onclick="_rmRender(\'home\')">◀ </button>' +
    '<span class="arm-title">📂&nbsp;Saved Routes</span>' +
    '<button class="arm-close" onclick="_closeRouteManager()">✕</button>' +
  '</div>' +
  '<div class="arm-scrollable">' + rowsHtml + '</div>' +
  (routes.length > 0
    ? '<div class="arm-footer"><button class="arm-export-btn" onclick="_exportSavedRoutesJson()">⬇&nbsp;Export JSON</button></div>'
    : '');
}

function _rmSettingsHTML() {
  var maxKm = (_routeMaxDistM / 1000).toFixed(1);
  var radius = typeof walkRadius !== 'undefined' ? walkRadius : 15;
  return '<div class="arm-header">' +
    '<button class="arm-back" onclick="_rmRender(\'home\')">◀ </button>' +
    '<span class="arm-title">⚙&nbsp;Route Settings</span>' +
    '<button class="arm-close" onclick="_closeRouteManager()">✕</button>' +
  '</div>' +
  '<div class="arm-settings">' +
    '<div class="arm-srow">' +
      '<div class="arm-slabel">' +
        '<span class="arm-sname">Default Walk Radius</span>' +
        '<span class="arm-sdesc">Near Me default radius</span>' +
      '</div>' +
      '<div class="arm-sctrl">' +
        '<input type="number" class="arm-num" id="arm-walk-radius" value="' + radius + '" min="5" max="60" step="5">' +
        '<span class="arm-unit">min</span>' +
      '</div>' +
    '</div>' +
    '<div class="arm-srow">' +
      '<div class="arm-slabel">' +
        '<span class="arm-sname">Max Route Distance</span>' +
        '<span class="arm-sdesc">Warning threshold</span>' +
      '</div>' +
      '<div class="arm-sctrl">' +
        '<input type="number" class="arm-num" id="arm-max-dist" value="' + maxKm + '" min="1" max="30" step="0.5">' +
        '<span class="arm-unit">km</span>' +
      '</div>' +
    '</div>' +
    '<div class="arm-srow">' +
      '<div class="arm-slabel">' +
        '<span class="arm-sname">Route Animation</span>' +
        '<span class="arm-sdesc">Walker character animation</span>' +
      '</div>' +
      '<div class="arm-sctrl">' +
        '<label class="arm-toggle">' +
          '<input type="checkbox" id="arm-anim-toggle"' + (_routeAnimEnabled ? ' checked' : '') + ' onchange="_routeAnimEnabled=this.checked">' +
          '<span class="arm-toggle-track"><span class="arm-toggle-thumb"></span></span>' +
        '</label>' +
      '</div>' +
    '</div>' +
    '<div class="arm-srow arm-srow-apply">' +
      '<button class="arm-apply-btn" onclick="_rmApplySettings()">Apply &amp; Save</button>' +
    '</div>' +
    '<div class="arm-srow arm-srow-export">' +
      '<div class="arm-slabel">' +
        '<span class="arm-sname">Export Route Data</span>' +
        '<span class="arm-sdesc">All saved routes as JSON</span>' +
      '</div>' +
      '<button class="arm-export-inline" onclick="_exportSavedRoutesJson()">⬇ JSON</button>' +
    '</div>' +
  '</div>';
}

function _rmCreateRoute() {
  _closeRouteManager();
  openRoutePanel();
}

function _rmLoadRoute(id) {
  _loadSavedRouteById(id);
}

function _rmDeleteRoute(id) {
  var routes = _getSavedRoutes().filter(function(r) { return r.id !== id; });
  _putSavedRoutes(routes);
  _rmRender('saved');
}

function _rmApplySettings() {
  var rInp = document.getElementById('arm-walk-radius');
  var dInp = document.getElementById('arm-max-dist');
  if (rInp) {
    var r = parseInt(rInp.value, 10);
    if (!isNaN(r) && r >= 5 && r <= 60 && typeof walkRadius !== 'undefined') {
      walkRadius = r;
      var sl = document.getElementById('walk-slider'), lb = document.getElementById('walk-label');
      if (sl) sl.value = r;
      if (lb) lb.textContent = r + ' min';
    }
  }
  if (dInp) {
    var d = parseFloat(dInp.value);
    if (!isNaN(d) && d >= 1 && d <= 30) {
      _routeMaxDistM = Math.round(d * 1000);
      _WLK_D_STOP    = _routeMaxDistM;
    }
  }
  _saveRouteSettings();
  // Success toast inside panel
  var panel = document.getElementById('arm-panel');
  if (!panel) return;
  var prev = panel.querySelector('.arm-toast');
  if (prev) prev.parentNode.removeChild(prev);
  var t = document.createElement('div');
  t.className = 'arm-toast';
  t.textContent = 'Settings saved ✓';
  panel.appendChild(t);
  setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 2200);
}

// Shared export (called from multiple levels)

function _exportSavedRoutesJson() {
  var routes = _getSavedRoutes();
  var json   = JSON.stringify(routes, null, 2);
  var blob   = new Blob([json], { type: 'application/json' });
  var url    = URL.createObjectURL(blob);
  var a      = document.createElement('a');
  a.href = url;
  a.download = 'archwander-routes-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() { URL.revokeObjectURL(url); if (a.parentNode) a.parentNode.removeChild(a); }, 1000);
}

function removeRouteStop(locId) {
  _closeRouteCustomPopup();
  routeLocations = routeLocations.filter(function(l) { return l.id !== locId; });
  _refreshRouteUI();
  // Route drawing only happens in Near Me context (calcRoute not called here)
  if (routeLocations.length < 2) clearRoute();
}

function _refreshRouteUI() {
  var selList  = document.getElementById('route-sel-list');
  var topClear = document.getElementById('route-top-clear');
  if (topClear) topClear.style.display = routeLocations.length >= 1 ? 'flex' : 'none';
  // Show share button when ≥1 stop added (route calc not required)
  var shareBtn = document.getElementById('route-share-btn');
  if (shareBtn) shareBtn.style.display = routeLocations.length >= 1 ? 'flex' : 'none';
  if (!selList) return;
  if (routeLocations.length === 0) {
    selList.innerHTML = '<div class="route-sel-empty">No locations match current filters</div>';
    return;
  }

  // Summary header
  var header = '<div class="rsl-header">' +
    '<span class="rsl-count">' + routeLocations.length + ' stop' + (routeLocations.length !== 1 ? 's' : '') + '</span>' +
  '</div>';

  // Stop list with visit time per stop
  var pace = _getPaceMult();
  var stopList = routeLocations.map(function(loc, i) {
    var vMin = Math.round(_getVisitMin(loc) * pace);
    var vStr = _fmtVisitTime(vMin);
    return '<div class="route-sel-item" data-id="' + loc.id + '">' +
      '<span class="route-sel-num">' + (i + 1) + '</span>' +
      '<span class="route-sel-name">' + _routeLocName(loc) + '</span>' +
      '<span class="route-visit-badge">~' + vStr + '</span>' +
      '<button class="route-sel-remove" onclick="removeRouteStop(\'' + loc.id + '\')">✕</button>' +
    '</div>';
  }).join('');

  // Action bar (shown when ≥1 stop)
  var actionBar = '';
  if (routeLocations.length >= 1) {
    // Straight-line distance estimate
    var distHtml = '';
    if (routeLocations.length >= 2) {
      var estKm = _estimatedRouteKm(routeLocations);
      var distStr = _fmtRouteDist(estKm);
      distHtml = '<div class="route-dist-est">' +
        '📏 ~' + distStr +
        '<span class="route-dist-note"> straight-line</span>' +
      '</div>';
    }

    var city = (typeof activeCityKey !== 'undefined') ? activeCityKey : '';
    var isSeoul = (city === 'seoul');

    var mapsButtons = '';
    if (isSeoul) {
      mapsButtons =
        '<button class="route-gmaps-open-btn route-naver-btn" onclick="_openNaverMaps()">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
          'Open in Naver Maps' +
        '</button>' +
        '<button class="route-gmaps-open-btn route-gmaps-alt-btn" onclick="_openGoogleMaps()">Google Maps</button>';
    } else {
      mapsButtons =
        '<button class="route-gmaps-open-btn" onclick="_openGoogleMaps()">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
          'Open in Google Maps' +
        '</button>';
    }

    // Total visit time estimate
    var totalVisitMin = routeLocations.reduce(function(sum, loc) {
      return sum + _getVisitMin(loc) * pace;
    }, 0);
    var totalVisitStr = _fmtVisitTime(totalVisitMin);
    var paceLabel = (function() {
      var p = localStorage.getItem('aw_visit_pace') || 'normal';
      return { quick:'Quick', normal:'Normal', relaxed:'Relaxed' }[p];
    })();
    var visitHtml =
      '<div class="route-visit-total">' +
        '🕐 Est. visit time: ' +
        '<strong>' + totalVisitStr + '</strong>' +
        ' <span class="route-visit-pace">(' + paceLabel + ')</span>' +
      '</div>' +
      '<div class="route-visit-disclaimer">' +
        '⚠ Estimated visit times may vary significantly by individual.' +
      '</div>';

    actionBar =
      '<div class="route-gmaps-bar">' +
        distHtml +
        visitHtml +
        '<div class="route-gmaps-actions">' +
          '<button id="route-optimize-btn" class="route-gmaps-sec-btn"' +
            (routeLocations.length < 3 ? ' disabled style="opacity:.4;cursor:default"' : '') +
            ' onclick="_optimizeRouteBtn()">Optimize order</button>' +
        '</div>' +
        mapsButtons +
      '</div>';
  }

  selList.innerHTML = header + stopList + actionBar;
}

// ── Visit time helpers ───────────────────────────────────────────

function _getVisitMin(loc) {
  // Per-location manual override (bypasses all multipliers)
  if (loc.visitMin && loc.visitMin > 0) return loc.visitMin;
  // Category default
  var defaults = (typeof VISIT_MIN_DEFAULTS !== 'undefined') ? VISIT_MIN_DEFAULTS : {};
  var base = defaults[loc.cc] || 25;
  // Size tier multiplier
  var sizeMults = (typeof SIZE_MULT !== 'undefined') ? SIZE_MULT : { xs:0.5, s:0.75, m:1.0, l:1.5, xl:2.0 };
  var sizeMult = (loc.size && sizeMults[loc.size]) ? sizeMults[loc.size] : 1.0;
  return base * sizeMult;
}

function _getPaceMult() {
  var pace = localStorage.getItem('aw_visit_pace') || 'normal';
  var mults = (typeof VISIT_PACE_MULT !== 'undefined') ? VISIT_PACE_MULT : { quick:0.6, normal:1.0, relaxed:1.5 };
  return mults[pace] || 1.0;
}

function _fmtVisitTime(totalMin) {
  totalMin = Math.round(totalMin);
  if (totalMin < 60) return totalMin + 'min';
  var h = Math.floor(totalMin / 60);
  var m = totalMin % 60;
  if (m === 0) return h + 'h';
  return h + 'h ' + m + 'min';
}

// ── Distance helpers ─────────────────────────────────────────────

function _haversineKm(lat1, lng1, lat2, lng2) {
  var R = 6371;
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLng = (lng2 - lng1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function _estimatedRouteKm(locs) {
  if (!locs || locs.length < 2) return 0;
  var total = 0;
  for (var i = 1; i < locs.length; i++) {
    total += _haversineKm(locs[i-1].lat, locs[i-1].lng, locs[i].lat, locs[i].lng);
  }
  return total;
}

function _fmtRouteDist(km) {
  var imperial = localStorage.getItem('aw_units') === 'imperial';
  if (imperial) {
    var miles = km * 0.621371;
    return miles < 0.1 ? Math.round(miles * 5280) + ' ft' : miles.toFixed(1) + ' mi';
  } else {
    return km < 1 ? Math.round(km * 1000) + ' m' : km.toFixed(1) + ' km';
  }
}

// ── Naver Maps handoff (Seoul only) ─────────────────────────────

function _buildNaverMapsUrl() {
  if (!routeLocations.length) return null;
  var stops  = routeLocations;
  var origin = (typeof walkOrigin !== 'undefined' && walkOrigin && walkOrigin.lat) ? walkOrigin : null;
  var dest   = stops[stops.length - 1];

  // Mobile: try app deep link
  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    var url = 'nmap://route/walk?';
    if (origin) {
      url += 'slat=' + origin.lat + '&slng=' + origin.lng + '&sname=' + encodeURIComponent('현재위치');
    } else if (stops.length > 1) {
      url += 'slat=' + stops[0].lat + '&slng=' + stops[0].lng + '&sname=' + encodeURIComponent(stops[0].name);
    }
    var viaArr = origin ? stops.slice(0, -1) : stops.slice(1, -1);
    if (viaArr.length) {
      url += '&via=' + viaArr.map(function(l) {
        return l.lat + ',' + l.lng + ',' + encodeURIComponent(l.name);
      }).join('|');
    }
    url += '&dlat=' + dest.lat + '&dlng=' + dest.lng + '&dname=' + encodeURIComponent(dest.name);
    url += '&appname=com.archwander';
    return url;
  }

  // Web fallback
  var originPart = origin
    ? (origin.lng + ',' + origin.lat + ',' + encodeURIComponent('현재위치') + ',POINT')
    : (stops.length > 1
      ? (stops[0].lng + ',' + stops[0].lat + ',' + encodeURIComponent(stops[0].name) + ',POINT')
      : '-');
  var destPart = dest.lng + ',' + dest.lat + ',' + encodeURIComponent(dest.name) + ',POINT';
  return 'https://map.naver.com/v5/directions/' + originPart + '/' + destPart + '/-/walk';
}

function _openNaverMaps() {
  var url = _buildNaverMapsUrl();
  if (url) window.open(url, '_blank');
}

function _openRouteShare() {
  if (routeLocations.length < 1) return;
  var locationIds = routeLocations.map(function(l) { return l.id; });
  // Include route_stops only when route has actually been calculated
  var routeStops  = (routeData && routeData.distance > 0) ? locationIds : [];
  var city = (routeLocations[0] && routeLocations[0].city) || (typeof activeCityKey !== 'undefined' ? activeCityKey : '');
  if (typeof openShareModal === 'function') {
    openShareModal(locationIds, routeStops, city);
  }
}

function _routeLocName(loc) {
  return _escHtml(loc.name);
}

function _escHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── OSRM Route Calculation ───────────────────────────────────────

function calcRoute() {
  if (routeLocations.length < 2) return;

  // Detect origin (GPS / dropped pin from Near Me / Set My Location)
  var origin = (typeof walkOrigin !== 'undefined' && walkOrigin && walkOrigin.lat) ? walkOrigin : null;

  // Optimize order — start from location closest to origin if available
  var ordered = _optimizeOrder(routeLocations, origin);
  routeLocations = ordered;
  _refreshRouteUI();

  // Build OSRM coordinate string: prepend origin if available
  var coordParts = ordered.map(function(loc) { return loc.lng + ',' + loc.lat; });
  if (origin) coordParts.unshift(origin.lng + ',' + origin.lat);
  var coords = coordParts.join(';');
  var url = 'https://routing.openstreetmap.de/routed-foot/route/v1/driving/' + coords +
            '?overview=full&geometries=geojson&steps=true';

  var resultDiv = document.getElementById('route-result');
  if (resultDiv) {
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="route-loading">Calculating route...</div>';
  }

  fetch(url, { signal: AbortSignal.timeout(10000) })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.routes || !data.routes.length) throw new Error('No route found');
      _displayRoute(data.routes[0], ordered, origin);
      _minimizeRoutePanelMobile();
    })
    .catch(function(err) {
      console.warn('[route] OSRM failed:', err);
      _displayStraightRoute(ordered, origin);
      _minimizeRoutePanelMobile();
    });
}

function _minimizeRoutePanelMobile() {
  if (window.innerWidth > 900) return;
  var panel = document.getElementById('route-panel');
  if (panel) {
    panel.classList.add('minimized');
    // Ensure peek handle exists
    if (!document.getElementById('route-peek-handle')) {
      var handle = document.createElement('div');
      handle.id = 'route-peek-handle';
      handle.className = 'route-peek-handle';
      handle.innerHTML = '<div class="route-peek-bar"></div>' +
        '<span class="route-peek-label">Route Planner</span>';
      handle.onclick = function() { _restoreRoutePanel(); };
      panel.appendChild(handle);
    }
  }
}

function _restoreRoutePanel() {
  var panel = document.getElementById('route-panel');
  if (panel) panel.classList.remove('minimized');
}

// ── Google Maps handoff ──────────────────────────────────────────

function _setRouteTravelMode(mode) {
  _routeTravelMode = mode;
  ['walking','transit','driving'].forEach(function(m) {
    var btn = document.getElementById('rmode-' + m);
    if (btn) btn.classList.toggle('rmode-active', m === mode);
  });
}

function _buildGoogleMapsUrl() {
  if (!routeLocations.length) return null;
  var stops  = routeLocations;
  var origin = (typeof walkOrigin !== 'undefined' && walkOrigin && walkOrigin.lat) ? walkOrigin : null;
  var base   = 'https://www.google.com/maps/dir/?api=1&travelmode=' + _routeTravelMode;

  if (origin) {
    // GPS available: current location → all stops
    var dest = stops[stops.length - 1];
    var wps  = stops.slice(0, -1).map(function(l) { return l.lat + ',' + l.lng; }).join('|');
    return base +
      '&origin='      + origin.lat + ',' + origin.lng +
      '&destination=' + dest.lat   + ',' + dest.lng +
      (wps ? '&waypoints=' + wps : '');
  } else {
    // No GPS: first stop = origin, last = destination
    if (stops.length === 1) {
      return base + '&destination=' + stops[0].lat + ',' + stops[0].lng;
    }
    var dest = stops[stops.length - 1];
    var wps  = stops.slice(1, -1).map(function(l) { return l.lat + ',' + l.lng; }).join('|');
    return base +
      '&origin='      + stops[0].lat + ',' + stops[0].lng +
      '&destination=' + dest.lat     + ',' + dest.lng +
      (wps ? '&waypoints=' + wps : '');
  }
}

function _openGoogleMaps() {
  var url = _buildGoogleMapsUrl();
  if (url) window.open(url, '_blank');
}

function _copyGoogleMapsLink() {
  var url = _buildGoogleMapsUrl();
  if (!url) return;
  navigator.clipboard.writeText(url).then(function() {
    var btn = document.getElementById('route-copy-link-btn');
    if (btn) {
      btn.textContent = 'Copied!';
      setTimeout(function() { btn.textContent = 'Copy link'; }, 1800);
    }
  }).catch(function() {
    window.prompt('Google Maps link:', url);
  });
}

function _optimizeRouteBtn() {
  if (routeLocations.length < 3) return;
  var origin = (typeof walkOrigin !== 'undefined' && walkOrigin && walkOrigin.lat) ? walkOrigin : null;
  routeLocations = _optimizeOrder(routeLocations, origin);
  _refreshRouteUI();
  var btn = document.getElementById('route-optimize-btn');
  if (btn) {
    btn.textContent = 'Done!';
    setTimeout(function() { btn.textContent = 'Optimize order'; }, 1600);
  }
}

// ── Nearest-neighbor order optimization ─────────────────────────

function _optimizeOrder(locs, origin) {
  // Nearest-neighbor heuristic; if origin provided, start from closest loc to it
  if (locs.length <= 2) return locs.slice();
  var startIdx = 0;
  if (origin) {
    var minD = Infinity;
    for (var oi = 0; oi < locs.length; oi++) {
      var d = haversineM(origin.lat, origin.lng, locs[oi].lat, locs[oi].lng);
      if (d < minD) { minD = d; startIdx = oi; }
    }
  }
  var remaining = locs.slice();
  remaining.splice(startIdx, 1);
  var ordered = [locs[startIdx]];
  while (remaining.length > 0) {
    var last = ordered[ordered.length - 1];
    var nearestIdx = 0;
    var nearestDist = Infinity;
    for (var i = 0; i < remaining.length; i++) {
      var d = haversineM(last.lat, last.lng, remaining[i].lat, remaining[i].lng);
      if (d < nearestDist) { nearestDist = d; nearestIdx = i; }
    }
    ordered.push(remaining[nearestIdx]);
    remaining.splice(nearestIdx, 1);
  }
  return ordered;
}

function _displayRoute(route, ordered, origin) {
  clearRoute();

  var coords = route.geometry.coordinates.map(function(c) { return [c[1], c[0]]; });
  routeLine = null;

  // Cumulative distance at each stop via OSRM leg distances.
  // If origin is present, legs[0] = origin→stop1, legs[1..] = stop1→stop2…
  // cumDistAtStop[0] = 0 (origin or stop1), cumDistAtStop[i+offset] = dist at stop i
  var cumDistAtStop = [0];
  var cumDist = 0;
  if (route.legs) {
    route.legs.forEach(function(leg) {
      cumDist += leg.distance;
      cumDistAtStop.push(cumDist);
    });
  }
  // With origin: cumDistAtStop = [0, d_o→1, d_o→1+d_1→2, ...]  length=N+1
  // Without:     cumDistAtStop = [0, d_1→2, ...]                length=N

  // Place start marker at origin
  if (origin) {
    routeOriginMarker = L.marker([origin.lat, origin.lng], {
      icon: _buildStartMarkerIcon(), zIndexOffset: 800
    }).addTo(map);
  }

  ordered.forEach(function(loc, i) {
    // With origin: distAtStop is cumDistAtStop[i+1]; without: cumDistAtStop[i]
    var distAtStop = origin ? (cumDistAtStop[i + 1] || 0) : (cumDistAtStop[i] || 0);
    var beyondLimit = distAtStop > _WLK_D_STOP;
    var m = L.marker([loc.lat, loc.lng], {
      icon: _buildRouteMarkerIcon(i + 1, loc.name, false, beyondLimit),
      opacity: beyondLimit ? 0.35 : 1.0,
      zIndexOffset: beyondLimit ? -100 : 0
    })
    .on('click', (function(l, beyond) {
      return function(e) {
        L.DomEvent.stopPropagation(e);
        _showRouteMarkerPopup(l, beyond);
      };
    })(loc, beyondLimit))
    .addTo(map);
    routeMarkers.push(m);
  });

  map.fitBounds(L.latLngBounds(coords), { padding: [60, 60] });
  // route.distance already includes origin leg since we passed origin to OSRM
  routeData = { distance: route.distance, duration: route.duration, stops: ordered.length, legs: route.legs || [] };
  _renderRouteResult(routeData, ordered, origin ? cumDistAtStop.slice(1) : cumDistAtStop);
  if (typeof syncMarkers === 'function') syncMarkers();
  _check6kmWarning();
}

function _displayStraightRoute(ordered, origin) {
  clearRoute();

  // If origin provided, prepend it so the straight-line path starts from there
  var coords = ordered.map(function(loc) { return [loc.lat, loc.lng]; });
  if (origin) coords.unshift([origin.lat, origin.lng]);
  routeLine = null;

  // Compute cumulative straight-line distances
  var cumDistAtStop = [0];
  var running = 0;
  for (var i = 1; i < coords.length; i++) {
    running += haversineM(coords[i-1][0], coords[i-1][1], coords[i][0], coords[i][1]);
    cumDistAtStop.push(running);
  }
  // With origin: cumDistAtStop = [0, d_o→1, ...] length=N+1
  // Without:     cumDistAtStop = [0, d_1→2, ...]  length=N

  // Place start marker at origin
  if (origin) {
    routeOriginMarker = L.marker([origin.lat, origin.lng], {
      icon: _buildStartMarkerIcon(), zIndexOffset: 800
    }).addTo(map);
  }

  ordered.forEach(function(loc, i) {
    var distAtStop = origin ? (cumDistAtStop[i + 1] || 0) : (cumDistAtStop[i] || 0);
    var beyondLimit = distAtStop > _WLK_D_STOP;
    var m = L.marker([loc.lat, loc.lng], {
      icon: _buildRouteMarkerIcon(i + 1, loc.name, false, beyondLimit),
      opacity: beyondLimit ? 0.35 : 1.0,
      zIndexOffset: beyondLimit ? -100 : 0
    })
    .on('click', (function(l, beyond) {
      return function(e) {
        L.DomEvent.stopPropagation(e);
        _showRouteMarkerPopup(l, beyond);
      };
    })(loc, beyondLimit))
    .addTo(map);
    routeMarkers.push(m);
  });

  map.fitBounds(L.latLngBounds(coords), { padding: [60, 60] });
  routeData = { distance: running, duration: running / 1.33, stops: ordered.length, legs: [], estimated: true };
  _renderRouteResult(routeData, ordered, origin ? cumDistAtStop.slice(1) : cumDistAtStop);
  if (typeof syncMarkers === 'function') syncMarkers();
  _check6kmWarning();
}

// ── Route Marker Popup (custom DOM — works on mobile) ────────────

function _showRouteMarkerPopup(loc, beyondLimit) {
  _closeRouteCustomPopup();

  var catBadge = _pCat(loc);
  var catClass = (typeof CAT_CC_MAP !== 'undefined' && CAT_CC_MAP[catBadge]) ? CAT_CC_MAP[catBadge] : 'c-lmk';
  var beyondNote = beyondLimit
    ? '<div class="rmp-beyond">⚠ Beyond 6km</div>'
    : '';

  // Thumbnail: SV primary (orientation-aware) → photo fallback → nothing
  var thumbHtml = '';
  var hasSvKey = typeof GOOGLE_MAPS_API_KEY !== 'undefined' && GOOGLE_MAPS_API_KEY;
  var svEmbedSrc = '';
  if (loc.sv && hasSvKey) {
    var svLat = loc.sv.lat || loc.lat;
    var svLng = loc.sv.lng || loc.lng;
    var svQ = 'key=' + GOOGLE_MAPS_API_KEY +
      '&heading=' + (loc.sv.heading || 0) +
      '&pitch='   + (loc.sv.pitch   || 0) +
      '&fov='     + (loc.sv.fov     || 90);
    if (loc.sv.panoId) svQ += '&pano=' + loc.sv.panoId;
    else               svQ += '&location=' + svLat + ',' + svLng;
    svEmbedSrc = 'https://www.google.com/maps/embed/v1/streetview?' + svQ;
  }
  var SV_ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; magnetometer; picture-in-picture';
  var svIntArr = (loc.svInt && loc.svInt.length) ? loc.svInt : (loc.svInt ? [loc.svInt] : []);
  var hasInt = svIntArr.length > 0;

  if (svEmbedSrc) {
    // SV is primary — device orientation/direction works on mobile
    var togBar = '';
    if (hasInt) {
      var togBtns = '<button class="rmp-sv-tog active" onclick="_rmpSvToggle(this,\'outdoor\')">Outdoor</button>';
      for (var ii = 0; ii < svIntArr.length; ii++) {
        var intLabel = svIntArr.length === 1
          ? 'Interior'
          : 'Interior ' + (ii + 1);
        togBtns += '<button class="rmp-sv-tog" onclick="_rmpSvToggle(this,\'interior-' + ii + '\')">' + intLabel + '</button>';
      }
      togBar = '<div class="rmp-sv-tog-bar">' + togBtns + '</div>';
    }
    var outdoorPane = '<div class="rmp-sv-pane rmp-sv-outdoor">' +
      '<iframe src="' + svEmbedSrc + '" allowfullscreen allow="' + SV_ALLOW + '" loading="lazy"></iframe>' +
      '</div>';
    var intPanes = '';
    if (hasInt) {
      for (var ji = 0; ji < svIntArr.length; ji++) {
        var si = svIntArr[ji];
        var siH = (si.heading != null) ? si.heading : 0;
        var siP = (si.pitch   != null) ? si.pitch   : 0;
        var siF = Math.min(100, Math.max(10, (si.fov != null) ? si.fov : 90));
        var siBase = 'https://www.google.com/maps/embed/v1/streetview?key=' +
          GOOGLE_MAPS_API_KEY + '&heading=' + siH + '&pitch=' + siP + '&fov=' + siF;
        var siSrc = si.panoId
          ? siBase + '&pano=' + si.panoId
          : siBase + '&location=' + ((si.lat != null) ? si.lat : loc.lat) +
            ',' + ((si.lng != null) ? si.lng : loc.lng);
        intPanes += '<div class="rmp-sv-pane rmp-sv-interior" style="display:none">' +
          '<iframe src="' + siSrc + '" allow="' + SV_ALLOW + '" allowfullscreen loading="lazy"' +
          ' referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
      }
    }
    thumbHtml = '<div class="rmp-sv-wrap">' + togBar + outdoorPane + intPanes + '</div>';
  } else if (loc.photos && loc.photos.length > 0) {
    // Photo fallback (no SV data for this location)
    var pUrl = typeof photoUrl === 'function'
      ? photoUrl(loc.photos[0], true, 'popup')
      : loc.photos[0];
    thumbHtml = '<div class="rmp-thumb">' +
      '<img src="' + pUrl + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'">' +
      '</div>';
  }

  var el = document.createElement('div');
  el.id = 'route-custom-popup';
  el.className = 'route-custom-popup';
  // rmp-close sits at popup root (absolute, z:10) — floats over thumb or body
  el.innerHTML =
    '<button class="rmp-close" onclick="_closeRouteCustomPopup()" aria-label="close">✕</button>' +
    thumbHtml +
    '<div class="rmp-body">' +
      '<div class="rmp-name" onclick="_closeRouteCustomPopup();openLocById(\'' + loc.id + '\')" style="cursor:pointer;text-decoration:underline;text-underline-offset:2px">' + _escHtml(loc.name) + '</div>' +
      '<div class="rmp-meta">' +
        '<span class="cat-badge ' + catClass + '" style="font-size:10px">' + catBadge + '</span>' +
        (loc.hood ? '<span style="color:#888"> · ' + _escHtml(loc.hood) + '</span>' : '') +
      '</div>' +
      beyondNote +
      '<button class="rmp-remove" onclick="_routePopupRemove(\'' + loc.id + '\')">✕ Remove from route</button>' +
    '</div>';
  document.body.appendChild(el);

  var isMobile = window.innerWidth <= 900;
  if (isMobile) {
    // Fixed bottom card, above the minimized panel peek bar (52px) + small gap
    el.style.cssText =
      'position:fixed;bottom:64px;left:50%;transform:translateX(-50%);z-index:3000;';
  } else {
    // Position near marker on desktop — get marker's screen coordinates
    var pt  = map.latLngToContainerPoint([loc.lat, loc.lng]);
    var box = map.getContainer().getBoundingClientRect();
    var sx  = box.left + pt.x;
    var sy  = box.top  + pt.y;
    // After appending we can measure el size
    var pw = el.offsetWidth  || 220;
    var ph = el.offsetHeight || 110;
    var left = Math.max(8, Math.min(sx - pw / 2, window.innerWidth  - pw - 8));
    var top  = Math.max(8, Math.min(sy - ph - 16, window.innerHeight - ph - 8));
    el.style.cssText =
      'position:fixed;left:' + left + 'px;top:' + top + 'px;z-index:3000;';
  }

  _routeActivePopup = el;

  // Close when user taps elsewhere on the map
  setTimeout(function() {
    map.once('click', function() { _closeRouteCustomPopup(); });
  }, 80);
}

function _closeRouteCustomPopup() {
  var el = document.getElementById('route-custom-popup');
  if (el && el.parentNode) el.parentNode.removeChild(el);
  _routeActivePopup = null;
}

function _routePopupRemove(locId) {
  removeRouteStop(locId);
}

// Toggle outdoor ↔ interior SV in route marker popup
function _rmpSvToggle(btn, mode) {
  var wrap = btn.closest ? btn.closest('.rmp-sv-wrap') : null;
  if (!wrap) return;
  // Update active button
  var togs = wrap.querySelectorAll('.rmp-sv-tog');
  for (var i = 0; i < togs.length; i++) togs[i].classList.remove('active');
  btn.classList.add('active');
  // Show/hide panes
  var outdoor   = wrap.querySelector('.rmp-sv-outdoor');
  var interiors = wrap.querySelectorAll('.rmp-sv-interior');
  if (mode === 'outdoor') {
    if (outdoor) outdoor.style.display = '';
    for (var a = 0; a < interiors.length; a++) interiors[a].style.display = 'none';
  } else {
    var idx = parseInt(mode.replace('interior-', ''), 10);
    if (outdoor) outdoor.style.display = 'none';
    for (var b = 0; b < interiors.length; b++) {
      var pane = interiors[b];
      if (b === idx) {
        pane.style.display = '';
      } else {
        pane.style.display = 'none';
      }
    }
  }
}

function _renderRouteResult(data, ordered, cumDistAtStop) {
  var resultDiv = document.getElementById('route-result');
  if (!resultDiv) return;

  var distStr = data.distance < 1000
    ? Math.round(data.distance) + 'm'
    : (data.distance / 1000).toFixed(1) + 'km';
  var durMin = Math.ceil(data.duration / 60);
  var durStr = durMin < 60
    ? durMin + ' min'
    : Math.floor(durMin / 60) + 'h ' + (durMin % 60) + 'min';

  var html =
    '<div class="route-summary">' +
      '<div class="route-summary-stat">' +
        '<span class="route-stat-val">' + distStr + '</span>' +
        '<span class="route-stat-label">Total Distance</span>' +
      '</div>' +
      '<div class="route-summary-stat">' +
        '<span class="route-stat-val">⏱ ' + durStr + '</span>' +
        '<span class="route-stat-label">Walking Time</span>' +
      '</div>' +
      '<div class="route-summary-stat">' +
        '<span class="route-stat-val">' + data.stops + '</span>' +
        '<span class="route-stat-label">Stops</span>' +
      '</div>' +
    '</div>';

  if (data.estimated) {
    html += '<div class="route-estimate-note">⚠ Estimated (straight-line distances)</div>';
  }

  html += '<div class="route-itinerary">';
  ordered.forEach(function(loc, i) {
    var distAtStop = (cumDistAtStop && cumDistAtStop[i]) ? cumDistAtStop[i] : 0;
    var beyond = distAtStop > _WLK_D_STOP;
    var legInfo = '';
    if (data.legs && data.legs[i]) {
      var leg = data.legs[i];
      var legDist = leg.distance < 1000 ? Math.round(leg.distance) + 'm' : (leg.distance / 1000).toFixed(1) + 'km';
      var legDur  = Math.ceil(leg.duration / 60) + ' min';
      legInfo = '<div class="route-leg-info">' + legDist + ' · ' + legDur + '</div>';
    }
    var catBadge = _pCat(loc);
    html += '<div class="route-stop' + (beyond ? ' route-stop-beyond' : '') + '">' +
      '<div class="route-stop-num" style="background:' + (beyond ? '#aaa' : '#3B82F6') + '">' + (i + 1) + '</div>' +
      '<div class="route-stop-info">' +
        '<div class="route-stop-name">' + _routeLocName(loc) + '</div>' +
        '<div class="route-stop-meta">' +
          '<span class="cat-badge ' + (CAT_CC_MAP[catBadge] || 'c-lmk') + '" style="font-size:10px">' + catBadge + '</span>' +
          (loc.hood ? ' · ' + _escHtml(loc.hood) : '') +
          (beyond ? ' <span style="color:#f59e0b;font-size:10px">· ⚠ Beyond 6km</span>' : '') +
        '</div>' +
      '</div>' +
    '</div>';
    if (i < ordered.length - 1 && legInfo) html += legInfo;
  });
  html += '</div>';

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = html;
}

function clearRoute() {
  _closeRouteCustomPopup();
  if (routeLine) { try { map.removeLayer(routeLine); } catch(e) {} routeLine = null; }
  routeMarkers.forEach(function(m) { try { map.removeLayer(m); } catch(e) {} });
  if (routeOriginMarker) { try { map.removeLayer(routeOriginMarker); } catch(e) {} routeOriginMarker = null; }
  routeMarkers = [];
  routeData = null;
  var resultDiv = document.getElementById('route-result');
  if (resultDiv) { resultDiv.style.display = 'none'; resultDiv.innerHTML = ''; }
  // Restore regular flag markers for route stops
  if (typeof syncMarkers === 'function') syncMarkers();
}



// ── Stubs kept for backward compatibility ─────────────────────────
// v0.3 route stubs removed

// ══════════════════════════════════════════════════════════════════
// ROUTE PRE-SELECTION MODAL
// ══════════════════════════════════════════════════════════════════

function _showRoutePreselModal(locs) {
  var overlay = document.getElementById('route-presel-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'route-presel-overlay';
    overlay.className = 'route-presel-overlay';
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) _closeRoutePresel();
    });
    document.body.appendChild(overlay);
  }

  // Build unique, sorted neighborhood list from the current locs
  var hoods = [];
  var seen = {};
  locs.forEach(function(l) {
    if (l.hood && !seen[l.hood]) { seen[l.hood] = true; hoods.push(l.hood); }
  });
  hoods.sort();

  // Count per hood
  var hoodCount = {};
  locs.forEach(function(l) { if (l.hood) hoodCount[l.hood] = (hoodCount[l.hood] || 0) + 1; });

  var chipsHtml = hoods.map(function(h) {
    var cnt  = hoodCount[h] || 0;
    var hEsc = h.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    return '<button class="rps-hood-chip" data-hood="' + _escHtml(h) + '" onclick="_rpsToggleHood(\'' + hEsc + '\')">' +
      _escHtml(h) + ' <span style="opacity:0.5;font-size:11px">(' + cnt + ')</span></button>';
  }).join('');

  overlay.innerHTML =
    '<div class="rps-box">' +
      '<div class="rps-title">' + locs.length + ' locations in route</div>' +
      '<div class="rps-sub">Select one or more neighborhoods then proceed, proceed with all, or pick manually.</div>' +
      '<button class="rps-set-loc-btn" onclick="_closeRoutePresel(true);if(typeof _sbaMyLocation===\'function\')_sbaMyLocation();">Set My Location</button>' +
      '<div class="rps-btns">' +
        '<button class="rps-proceed-btn" onclick="_routePreselProceed()">▶ Proceed</button>' +
        '<button class="rps-manual-btn" onclick="_routePreselManual()">Manual</button>' +
        '<button class="rps-cancel-btn" onclick="_closeRoutePresel(true)">Cancel</button>' +
      '</div>' +
      '<div class="rps-section-label" style="margin-top:18px">Choose a neighborhood</div>' +
      '<div class="rps-hoods">' + (chipsHtml || '<span style="color:#999;font-size:12px">No neighborhood data</span>') + '</div>' +
    '</div>';

  overlay.classList.add('open');
}

function _rpsToggleHood(hood) {
  if (_rpsSelectedHoods.has(hood)) {
    _rpsSelectedHoods.delete(hood);
  } else {
    _rpsSelectedHoods.add(hood);
  }
  // Update chip visual state
  var chips = document.querySelectorAll('.rps-hood-chip');
  chips.forEach(function(chip) {
    if (chip.dataset.hood === hood) chip.classList.toggle('selected', _rpsSelectedHoods.has(hood));
  });
  // Update Proceed button to show selected count
  var proceedBtn = document.querySelector('.rps-proceed-btn');
  if (proceedBtn) {
    var n = _rpsSelectedHoods.size;
    proceedBtn.textContent = n > 0
      ? '▶ Proceed (' + n + ' hoods)'
      : '▶ Proceed';
  }
}

function _routePreselProceed() {
  var allLocs = _getRouteLocs();
  if (_rpsSelectedHoods.size > 0) {
    var sel = _rpsSelectedHoods;
    routeLocations = allLocs.filter(function(l) { return l.hood && sel.has(l.hood); });
  } else {
    routeLocations = allLocs.slice();
  }
  _closeRoutePresel();
  _refreshRouteUI();
  if (routeLocations.length >= 2) calcRoute();
}

function _routePreselManual() {
  _closeRoutePresel();
  // Open route panel empty — user can remove stops or use filters then re-open
  routeLocations = [];
  _refreshRouteUI();
  // Show a hint in the empty list state (handled by _refreshRouteUI)
}

function _closeRoutePresel(andClosePanel) {
  _rpsSelectedHoods.clear();
  var overlay = document.getElementById('route-presel-overlay');
  if (overlay) overlay.classList.remove('open');
  if (andClosePanel) {
    closeRoutePanel();
  }
}

// ══════════════════════════════════════════════════════════════════
// ROUTE 6KM WARNING
// ══════════════════════════════════════════════════════════════════

function _check6kmWarning() {
  if (!routeData || routeData.distance <= _WLK_D_STOP) return;
  var overlay = document.getElementById('route-6km-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'route-6km-overlay';
    overlay.className = 'route-6km-overlay';
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) _6kmNo();
    });
    document.body.appendChild(overlay);
  }

  var dist = (routeData.distance / 1000).toFixed(1);

  overlay.innerHTML =
    '<div class="r6km-box">' +
      '<div class="r6km-icon">!</div>' +
      '<div class="r6km-msg">' +
        'Total route is <strong>' + dist + 'km</strong>.<br>Would you like to adjust the location list?' +
      '</div>' +
      '<div class="r6km-btns">' +
        '<button class="r6km-yes" onclick="_6kmYes()">Yes</button>' +
        '<button class="r6km-no"  onclick="_6kmNo()">No</button>' +
      '</div>' +
    '</div>';

  overlay.classList.add('open');
}

function _6kmYes() {
  // Dismiss warning and re-open route panel for editing
  var overlay = document.getElementById('route-6km-overlay');
  if (overlay) overlay.classList.remove('open');
  var panel = document.getElementById('route-panel');
  if (panel) { panel.classList.remove('minimized'); panel.classList.add('visible'); }
}

function _6kmNo() {
  // Dismiss warning, keep route as-is
  var overlay = document.getElementById('route-6km-overlay');
  if (overlay) overlay.classList.remove('open');
}

// ══════════════════════════════════════════════════════════════════
