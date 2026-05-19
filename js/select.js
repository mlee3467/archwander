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
  _selSet  = new Set();
  _selLocs = [];

  var btn = document.getElementById('sba-sel');
  if (btn) btn.classList.remove('sba-active');

  var mapEl = document.getElementById('map');
  if (mapEl) mapEl.classList.remove('sel-mode-cursor');

  _clearSelMarkers();
  _hideSelBar();
}

// ── Toggle a location in/out of selection ─────────────────────────
function _selToggle(loc) {
  if (!_selModeActive) return false;
  if (_selSet.has(loc.id)) {
    _selSet.delete(loc.id);
    _selLocs = _selLocs.filter(function(l) { return l.id !== loc.id; });
  } else {
    _selSet.add(loc.id);
    _selLocs.push(loc);
  }
  _selUpdateMarker(loc);
  _selUpdateBar();
  return true;
}

// ── Bottom bar ────────────────────────────────────────────────────
function _selUpdateBar() {
  var bar     = document.getElementById('sel-bar');
  var countEl = document.getElementById('sel-bar-count');
  if (!bar) return;

  bar.style.display = 'flex';
  var n = _selSet.size;

  if (n === 0) {
    if (countEl) countEl.textContent = 'Tap markers to select';
  } else {
    if (countEl) countEl.textContent = n + ' selected';
  }

  var shareBtn = document.getElementById('sel-share-btn');
  var favBtn   = document.getElementById('sel-fav-btn');
  var routeBtn = document.getElementById('sel-route-btn');
  if (shareBtn) shareBtn.disabled = (n === 0);
  if (favBtn)   favBtn.disabled   = (n === 0);
  if (routeBtn) routeBtn.disabled = (n < 2);
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

// ── Intercept openLoc when in select mode ─────────────────────────
(function() {
  var _wait = setInterval(function() {
    if (typeof openLoc !== 'function') return;
    clearInterval(_wait);
    var _orig = openLoc;
    openLoc = function(loc) {
      if (_selModeActive) { _selToggle(loc); return; }
      _orig(loc);
    };
  }, 100);
})();
