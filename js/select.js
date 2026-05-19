// ══════════════════════════════════════════════════════════════════
// SELECT MODE — manual multi-location collection
// ══════════════════════════════════════════════════════════════════

var _selModeActive = false;
var _selSet        = new Set();  // selected loc IDs
var _selLocs       = [];         // ordered array of selected locs
var _selMarkerLayer = null;
var _selMarkerMap   = {};        // id → L.marker (checkmark overlay)

// ── Enter / Exit ──────────────────────────────────────────────────
function _sbaSelect() {
  if (_selModeActive) { _exitSelMode(); } else { _enterSelMode(); }
}

function _enterSelMode() {
  _selModeActive = true;
  _selSet   = new Set();
  _selLocs  = [];

  var btn = document.getElementById('sba-sel');
  if (btn) btn.classList.add('sba-active');

  var mapEl = document.getElementById('map');
  if (mapEl) mapEl.classList.add('sel-mode-cursor');

  // Close sidebar on mobile so map is accessible
  if (window.innerWidth <= 900 && typeof closeSidebar === 'function') closeSidebar();

  _selUpdateBar();
}

function _exitSelMode() {
  _selModeActive = false;

  var btn = document.getElementById('sba-sel');
  if (btn) btn.classList.remove('sba-active');

  var mapEl = document.getElementById('map');
  if (mapEl) mapEl.classList.remove('sel-mode-cursor');

  _selClearAllTooltips();
  _selSet  = new Set();
  _selLocs = [];

  _clearSelMarkers();
  _hideSelBar();
}

// ── Toggle a location in/out of selection ─────────────────────────
function _selToggle(loc) {
  if (!_selModeActive) return false;
  if (_selSet.has(loc.id)) {
    // Deselect: restore tooltip first, then remove
    _selSetTooltip(loc, false);
    _selSet.delete(loc.id);
    _selLocs = _selLocs.filter(function(l) { return l.id !== loc.id; });
  } else {
    _selSet.add(loc.id);
    _selLocs.push(loc);
  }
  // Redraw ALL numbered pins (handles renumbering after deselect)
  _selRefreshAllMarkers();
  _selUpdateBar();
  // Reopen all permanent tooltips after Leaflet's click event settles
  setTimeout(_selRefreshAllTooltips, 60);
  return true;
}

// Redraw every selected marker pin with correct numbering
function _selRefreshAllMarkers() {
  if (typeof L === 'undefined' || typeof map === 'undefined') return;
  if (!_selMarkerLayer) _selMarkerLayer = L.layerGroup().addTo(map);
  // Clear all current pins
  _selMarkerLayer.clearLayers();
  _selMarkerMap = {};
  // Redraw with updated indices
  _selLocs.forEach(function(loc, idx) {
    var icon = L.divIcon({
      html: '<div class="sel-check-pin">' + (idx + 1) + '</div>',
      className: 'sel-check-marker',
      iconSize:  [26, 26],
      iconAnchor:[13, 13]
    });
    var m = L.marker([loc.lat, loc.lng], { icon: icon, zIndexOffset: 1500 })
              .addTo(_selMarkerLayer);
    _selMarkerMap[loc.id] = m;
  });
}

// Reopen permanent tooltips for all selected markers
function _selRefreshAllTooltips() {
  if (typeof markers === 'undefined') return;
  _selLocs.forEach(function(loc) { _selSetTooltip(loc, true); });
}

// Keep tooltip open on selected markers
function _selSetTooltip(loc, open) {
  if (typeof markers === 'undefined') return;
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].loc.id === loc.id && markers[i].m) {
      var m = markers[i].m;
      try {
        if (open) {
          m.unbindTooltip();
          m.bindTooltip(loc.name || '', { direction: 'top', offset: [0, -28], opacity: 0.94, permanent: true });
          m.openTooltip();
        } else {
          m.unbindTooltip();
          m.bindTooltip(loc.name || '', { direction: 'top', offset: [0, -26], opacity: 0.94 });
        }
      } catch(e) {}
      break;
    }
  }
}

function _selClearAllTooltips() {
  if (typeof markers === 'undefined') return;
  _selLocs.forEach(function(loc) { _selSetTooltip(loc, false); });
}

// ── Bottom bar ────────────────────────────────────────────────────
function _selUpdateBar() {
  var bar     = document.getElementById('sel-bar');
  var countEl = document.getElementById('sel-bar-count');
  if (!bar) return;

  bar.style.display = 'flex';
  var n = _selSet.size;

  var actionsEl = document.getElementById('sel-bar-actions');
  var shareBtn  = document.getElementById('sel-share-btn');
  var favBtn    = document.getElementById('sel-fav-btn');
  var routeBtn  = document.getElementById('sel-route-btn');

  if (n === 0) {
    if (countEl) {
      countEl.textContent = 'Tap markers to select';
      countEl.classList.add('sel-bar-hint');
    }
    if (actionsEl) actionsEl.style.display = 'none';
  } else {
    if (countEl) {
      countEl.textContent = n + ' selected';
      countEl.classList.remove('sel-bar-hint');
    }
    if (actionsEl) actionsEl.style.display = '';
    if (shareBtn) shareBtn.disabled = false;
    if (favBtn)   favBtn.disabled   = false;
    if (routeBtn) routeBtn.disabled = (n < 2);
  }
}

function _hideSelBar() {
  var bar = document.getElementById('sel-bar');
  if (bar) bar.style.display = 'none';
}

// ── Checkmark pin markers ─────────────────────────────────────────
function _selUpdateMarker(loc) {
  if (typeof L === 'undefined' || typeof map === 'undefined') return;
  if (!_selMarkerLayer) _selMarkerLayer = L.layerGroup().addTo(map);

  if (_selSet.has(loc.id)) {
    var num  = _selLocs.findIndex(function(l){ return l.id === loc.id; }) + 1;
    var icon = L.divIcon({
      html: '<div class="sel-check-pin">' + num + '</div>',
      className: 'sel-check-marker',
      iconSize:  [26, 26],
      iconAnchor:[13, 13]
    });
    var m = L.marker([loc.lat, loc.lng], { icon: icon, zIndexOffset: 1500 })
              .addTo(_selMarkerLayer);
    _selMarkerMap[loc.id] = m;
  } else {
    if (_selMarkerMap[loc.id]) {
      _selMarkerLayer.removeLayer(_selMarkerMap[loc.id]);
      delete _selMarkerMap[loc.id];
    }
  }
}

function _clearSelMarkers() {
  if (_selMarkerLayer && typeof map !== 'undefined') {
    try { map.removeLayer(_selMarkerLayer); } catch(e) {}
    _selMarkerLayer = null;
  }
  _selMarkerMap = {};
}

// ── Actions ───────────────────────────────────────────────────────
function _selShare() {
  if (_selLocs.length === 0) return;
  var city = _selLocs[0].city || (typeof activeCityKey !== 'undefined' ? activeCityKey : '');
  var ids  = _selLocs.map(function(l) { return l.id; });
  if (typeof openShareModal === 'function') openShareModal(ids, [], city);
}

function _selAddFavs() {
  if (_selLocs.length === 0) return;
  _selLocs.forEach(function(loc) {
    if (typeof toggleFav === 'function' &&
        typeof _favSet !== 'undefined' && !_favSet.has(loc.id)) {
      toggleFav(loc.id);
    }
  });
  var btn = document.getElementById('sel-fav-btn');
  if (btn) {
    var prev = btn.innerHTML;
    btn.innerHTML = '✅ Done';
    setTimeout(function() { btn.innerHTML = prev; }, 2000);
  }
}

function _selRoute() {
  if (_selLocs.length < 2) return;
  var locsToRoute = _selLocs.slice();
  _exitSelMode();
  if (typeof clearRouteSelection === 'function') clearRouteSelection();
  if (typeof routeLocations !== 'undefined') routeLocations = locsToRoute;
  setTimeout(function() {
    if (typeof openRoutePanel === 'function') openRoutePanel();
    setTimeout(function() {
      if (typeof calcRoute === 'function' &&
          typeof routeLocations !== 'undefined' && routeLocations.length >= 2) {
        calcRoute();
      }
    }, 150);
  }, 100);
}

// ── Intercept _showMapMarkerPopup when in select mode ────────────
// Markers call _showMapMarkerPopup(loc) directly, not openLoc
(function() {
  var _wait = setInterval(function() {
    if (typeof _showMapMarkerPopup !== 'function') return;
    clearInterval(_wait);
    var _orig = _showMapMarkerPopup;
    _showMapMarkerPopup = function(loc) {
      if (_selModeActive) { _selToggle(loc); return; }
      _orig(loc);
    };
  }, 100);
})();
