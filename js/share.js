// ══════════════════════════════════════════════════════════════════
// SHARE — Route + Location sharing via short URL (?s=abc12345)
// ══════════════════════════════════════════════════════════════════

// ── State ─────────────────────────────────────────────────────────
var _shareModeActive  = false;
var _shareModeLocIds  = [];    // ordered list of shared loc IDs
var _shareModeTitle   = '';
var _shareMarkerLayer = null;  // L.layerGroup for numbered markers
var _sdDragStartY     = 0;
var _sdDragStartH     = 0;
var _sdCurrentH       = 0;
var _sdMinimized      = false;

// ── Short-code helpers ─────────────────────────────────────────────
function _generateShareId() {
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var id = '';
  for (var i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
}

// ── Open Share Modal (called from route panel / favorites) ─────────
function openShareModal(locationIds, routeStops, city) {
  var modal = document.getElementById('share-modal');
  if (!modal) return;
  modal._shareData = { locationIds: locationIds, routeStops: routeStops, city: city };

  var hasRoute = routeStops && routeStops.length >= 2;
  var titleEl  = modal.querySelector('.share-modal-title');
  if (titleEl) titleEl.textContent = hasRoute ? '🔗 Share Route' : '🔗 Share Locations';
  var locCount  = document.getElementById('share-loc-count');
  var stopCount = document.getElementById('share-stop-count');
  if (locCount)  locCount.textContent  = locationIds.length;
  if (stopCount) stopCount.textContent = hasRoute ? routeStops.length : 'none';
  var stopRow = document.getElementById('share-stop-row');
  if (stopRow) stopRow.style.display = hasRoute ? '' : 'none';

  var titleInp = document.getElementById('share-title-inp');
  if (titleInp) titleInp.value = '';
  var linkBox = document.getElementById('share-link-box');
  if (linkBox) linkBox.style.display = 'none';
  var genBtn = document.getElementById('share-gen-btn');
  if (genBtn) { genBtn.disabled = false; genBtn.textContent = '🔗 Create Link'; }

  modal.style.display = 'flex';
}

function closeShareModal() {
  var modal = document.getElementById('share-modal');
  if (modal) modal.style.display = 'none';
}

// ── Generate share link ─────────────────────────────────────────────
async function generateShareLink() {
  var modal = document.getElementById('share-modal');
  if (!modal || !modal._shareData) return;
  var genBtn  = document.getElementById('share-gen-btn');
  var linkBox = document.getElementById('share-link-box');
  var linkInp = document.getElementById('share-link-inp');

  if (!_supabase) {
    alert('Supabase connection required.');
    return;
  }
  var titleVal = (document.getElementById('share-title-inp').value || '').trim();
  if (!titleVal) titleVal = 'Architecture Tour';

  if (genBtn) { genBtn.disabled = true; genBtn.textContent = 'Creating…'; }

  try {
    await _ensureSupabaseAuth();
    var shareId = _generateShareId();
    var { data: existing } = await _supabase.from('shares').select('id').eq('id', shareId).single();
    if (existing) shareId = _generateShareId();

    var { error } = await _supabase.from('shares').insert({
      id:           shareId,
      city:         modal._shareData.city,
      title:        titleVal,
      location_ids: modal._shareData.locationIds,
      route_stops:  modal._shareData.routeStops
    });
    if (error) throw error;

    var baseUrl = window.location.origin + window.location.pathname;
    var shareUrl = baseUrl + '?s=' + shareId;
    if (linkInp) linkInp.value = shareUrl;
    if (linkBox) linkBox.style.display = 'flex';
    if (genBtn)  genBtn.textContent = '✅ Created';
  } catch (err) {
    console.error('[share] generate error:', err);
    if (genBtn) { genBtn.disabled = false; genBtn.textContent = '🔗 Create Link'; }
    alert('Failed to create link: ' + (err.message || err));
  }
}

function copyShareLink() {
  var linkInp = document.getElementById('share-link-inp');
  if (!linkInp || !linkInp.value) return;
  navigator.clipboard.writeText(linkInp.value).then(function() {
    var copyBtn = document.getElementById('share-copy-btn');
    if (copyBtn) {
      var prev = copyBtn.textContent;
      copyBtn.textContent = '✅ Copied';
      setTimeout(function() { copyBtn.textContent = prev; }, 2000);
    }
  }).catch(function() { linkInp.select(); document.execCommand('copy'); });
}

// ── Check URL param on app load ────────────────────────────────────
async function checkShareParam() {
  var params = new URLSearchParams(window.location.search);
  var shareId = params.get('s');
  if (!shareId || !/^[a-z0-9]{8}$/.test(shareId)) return;
  if (!_supabase) { console.warn('[share] no Supabase client'); return; }

  try {
    await _ensureSupabaseAuth();
    var { data, error } = await _supabase.from('shares').select('*').eq('id', shareId).single();
    if (error || !data) { console.warn('[share] not found:', shareId, error); return; }
    _applyShare(data);
  } catch (err) {
    console.error('[share] checkShareParam error:', err);
  }
}

async function _applyShare(share) {
  // Resolve city code
  var cityCode = null;
  if (typeof CITY_META !== 'undefined') {
    Object.keys(CITY_META).forEach(function(code) {
      if (CITY_META[code].key === share.city) cityCode = code;
    });
  }

  // Load city data first, then enter city instantly (no fly animation)
  if (cityCode && typeof loadCityData === 'function') {
    try { await loadCityData(cityCode); } catch(e) {}
  }
  if (cityCode && typeof _enterCity === 'function') {
    _enterCity(cityCode, { noAnim: true });
    // Brief pause for map state to settle after setView
    await new Promise(function(res) { setTimeout(res, 200); });
  }

  // Match locations
  var matchedLocs = [];
  if (typeof LOCS !== 'undefined' && share.location_ids && share.location_ids.length) {
    var idOrder = {};
    share.location_ids.forEach(function(id, i) { idOrder[id] = i; });
    matchedLocs = LOCS.filter(function(l) { return idOrder[l.id] !== undefined; });
    matchedLocs.sort(function(a, b) { return idOrder[a.id] - idOrder[b.id]; });
  }

  // Resolve route stops before entering share mode (so button visibility is set correctly)
  var routeLocs = [];
  if (share.route_stops && share.route_stops.length >= 2) {
    routeLocs = share.route_stops.map(function(id) {
      return matchedLocs.find ? matchedLocs.find(function(l){ return l.id === id; })
           : matchedLocs.filter(function(l){ return l.id === id; })[0];
    }).filter(Boolean);
  }
  if (routeLocs.length >= 2) window._pendingShareRoute = routeLocs;

  // Enter share mode (pass routeLocs so drawer shows Open Route button)
  _enterShareMode(share.title || 'Architecture Tour', share.location_ids, matchedLocs, routeLocs);
}

// ── Share Mode: enter / exit ───────────────────────────────────────
function _enterShareMode(title, locIds, locs, routeLocs) {
  _shareModeActive = true;
  _shareModeLocIds = locIds;
  _shareModeTitle  = title;

  // Dim all other markers
  _applyShareModeMarkers(locIds);

  // Place numbered blinking markers on map
  _placeShareMarkers(locs);

  // Build and show drawer
  _buildShareDrawer(title, locs, routeLocs || []);
  _showShareDrawer();

  // On mobile: keep sidebar closed
  var sb = document.getElementById('sidebar');
  if (sb && window.innerWidth <= 900) sb.classList.remove('open');

  // Add class to map container for CSS-based dimming
  var mapEl = document.getElementById('map');
  if (mapEl) mapEl.classList.add('share-mode-active');

  // Fit map to shared pins — no animation (instant view)
  if (locs.length && typeof map !== 'undefined') {
    try {
      var bounds = locs.filter(function(l){ return l.lat && l.lng; })
                       .map(function(l){ return [l.lat, l.lng]; });
      if (bounds.length) {
        map.fitBounds(bounds, { padding: [40, 140], maxZoom: 15, animate: false });
      }
    } catch(e) {}
  }
}

function _exitShareMode() {
  if (!_shareModeActive) return;
  _shareModeActive = false;
  _shareModeLocIds = [];

  // Restore markers
  _clearShareModeMarkers();
  _clearShareMarkers();

  // Hide drawer
  _hideShareDrawer();

  // Remove CSS class
  var mapEl = document.getElementById('map');
  if (mapEl) mapEl.classList.remove('share-mode-active');

  window._pendingShareRoute = null;
}

// ── Marker dimming ─────────────────────────────────────────────────
function _applyShareModeMarkers(locIds) {
  if (typeof markers === 'undefined') return;
  var idSet = new Set(locIds);
  markers.forEach(function(item) {
    if (!item.m) return;
    if (!idSet.has(item.loc.id)) {
      item.m.setOpacity(0.15);
    } else {
      item.m.setOpacity(0); // hidden — replaced by share pin marker
    }
  });
}

function _clearShareModeMarkers() {
  if (typeof markers === 'undefined') return;
  markers.forEach(function(item) {
    if (item.m) item.m.setOpacity(1);
  });
  if (typeof syncMarkers === 'function') syncMarkers();
}

// ── Numbered blinking markers ──────────────────────────────────────
function _buildSharePinIcon(num) {
  return L.divIcon({
    html: '<div class="share-pin-wrap">' +
          '<div class="share-pin-ring"></div>' +
          '<div class="share-pin-ring2"></div>' +
          '<div class="share-pin-num">' + num + '</div>' +
          '</div>',
    className: 'share-pin-marker',
    iconSize:  [44, 44],
    iconAnchor:[22, 22]
  });
}

function _placeShareMarkers(locs) {
  _clearShareMarkers();
  if (typeof L === 'undefined' || typeof map === 'undefined') return;
  _shareMarkerLayer = L.layerGroup().addTo(map);
  locs.forEach(function(loc, i) {
    if (!loc.lat || !loc.lng) return;
    var m = L.marker([loc.lat, loc.lng], {
      icon: _buildSharePinIcon(i + 1),
      zIndexOffset: 2000
    }).addTo(_shareMarkerLayer);
    m.on('click', function() { _shareOpenLoc(loc); });
  });
}

function _clearShareMarkers() {
  if (_shareMarkerLayer && typeof map !== 'undefined') {
    try { map.removeLayer(_shareMarkerLayer); } catch(e) {}
    _shareMarkerLayer = null;
  }
}

// ── Drawer ─────────────────────────────────────────────────────────
function _buildShareDrawer(title, locs, routeLocs) {
  var drawer      = document.getElementById('share-drawer');
  var titleEl     = document.getElementById('sd-title');
  var subEl       = document.getElementById('sd-subtitle');
  var listEl      = document.getElementById('sd-list');
  var routeBtn    = document.getElementById('sd-open-route-btn');
  if (!drawer) return;

  var hasRoute = routeLocs && routeLocs.length >= 2;
  if (titleEl) titleEl.textContent = hasRoute ? (title || 'Architecture Tour') : 'List of Shared Locations';
  if (routeBtn) routeBtn.style.display = hasRoute ? 'inline-flex' : 'none';

  if (listEl) {
    listEl.innerHTML = locs.map(function(loc, i) {
      var ccKey  = (typeof _pCC === 'function') ? _pCC(loc) : (loc.cc || 'c-lmk');
      var ccMeta = (typeof CC_META !== 'undefined' && CC_META[ccKey]) || (typeof CC_META !== 'undefined' && CC_META['c-lmk']) || { color:'#EE3344', bg:'#FFE3E5', icon:'img/icon_landmark.png' };
      var thumb;
      if (loc.photos && loc.photos[0]) {
        thumb = '<div class="sd-item-thumb" style="position:relative;overflow:hidden">' +
          '<img src="' + loc.photos[0] + '" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.style.background=\'' + ccMeta.bg + '\';this.style.display=\'none\'">' +
        '</div>';
      } else {
        thumb = '<div class="sd-item-thumb" style="background:' + ccMeta.bg + ';display:flex;align-items:center;justify-content:center">' +
          '<img src="' + ccMeta.icon + '" style="width:26px;height:26px;object-fit:contain;mix-blend-mode:multiply" onerror="this.style.display=\'none\'">' +
        '</div>';
      }
      var cats = (loc.cats && loc.cats.length) ? loc.cats[0] : (loc.era || '');
      var isFav = (typeof _favSet !== 'undefined') && _favSet.has(loc.id);
      return '<div class="sd-item" onclick="_shareOpenLoc(_sdLocs[' + i + '])">' +
        '<div class="sd-item-num">' + (i + 1) + '</div>' +
        thumb +
        '<div class="sd-item-info">' +
          '<div class="sd-item-name">' + _sdEsc(loc.name) + '</div>' +
          '<div class="sd-item-meta">' + _sdEsc(cats) + (loc.yr ? ' · ' + loc.yr : '') + '</div>' +
        '</div>' +
        '<button class="sd-item-fav" onclick="event.stopPropagation();_sdToggleFav(\'' + loc.id + '\',this)" ' +
        'title="Add to Favorites">' + (isFav ? '⭐' : '☆') + '</button>' +
      '</div>';
    }).join('');
  }

  // Store loc refs for click handler
  window._sdLocs = locs;
}

function _sdEsc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Open shared route in Route Planner ───────────────────────────
function _shareOpenRoute() {
  var pendingRoute = window._pendingShareRoute;
  if (!pendingRoute || pendingRoute.length < 2) return;

  // Minimize drawer first
  _sdMinimizeDrawer();

  // Load stops into route planner
  if (typeof clearRouteSelection === 'function') clearRouteSelection();
  if (typeof routeLocations !== 'undefined') {
    routeLocations = pendingRoute.slice();
  }

  setTimeout(function() {
    if (typeof openRoutePanel === 'function') {
      openRoutePanel();
    }
    // calcRoute is not called by openRoutePanel when stops already exist — call manually
    setTimeout(function() {
      if (typeof calcRoute === 'function' && typeof routeLocations !== 'undefined' && routeLocations.length >= 2) {
        calcRoute();
      }
    }, 150);
  }, 250);
}

function _sdToggleFav(id, btn) {
  if (typeof toggleFav !== 'function') return;
  toggleFav(id);
  var isFav = (typeof _favSet !== 'undefined') && _favSet.has(id);
  if (btn) btn.textContent = isFav ? '⭐' : '☆';
}

function _shareAddAllFavs() {
  if (typeof toggleFav !== 'function') return;
  window._sdLocs && window._sdLocs.forEach(function(loc) {
    if (typeof _favSet !== 'undefined' && !_favSet.has(loc.id)) {
      toggleFav(loc.id);
    }
  });
  // Refresh fav stars in list
  var listEl = document.getElementById('sd-list');
  if (listEl) {
    listEl.querySelectorAll('.sd-item-fav').forEach(function(btn, i) {
      btn.textContent = '⭐';
    });
  }
  var addAllBtn = document.getElementById('sd-add-all-btn');
  if (addAllBtn) { addAllBtn.textContent = '✅ Added'; setTimeout(function() { addAllBtn.textContent = '⭐ Add all'; }, 2000); }
}

function _shareOpenLoc(loc) {
  // Minimize drawer before opening detail panel
  _sdMinimizeDrawer();
  if (typeof openLoc === 'function') {
    setTimeout(function() { openLoc(loc); }, 150);
  }
}

// ── Drawer show / hide / drag ──────────────────────────────────────
function _showShareDrawer() {
  var drawer = document.getElementById('share-drawer');
  if (!drawer) return;
  _sdMinimized = false;
  drawer.style.display = 'flex';
  drawer.style.height = '';   // reset to CSS default (33vh)
  drawer.classList.remove('sd-minimized');
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { drawer.classList.add('sd-visible'); });
  });
  _sdInitDrag(drawer);
}

function _hideShareDrawer() {
  var drawer = document.getElementById('share-drawer');
  if (!drawer) return;
  drawer.classList.remove('sd-visible', 'sd-minimized');
  _sdMinimized = false;
  setTimeout(function() { drawer.style.display = 'none'; }, 350);
}

function _sdRestoreDrawer() {
  var drawer = document.getElementById('share-drawer');
  if (!drawer || !_shareModeActive) return;
  _sdMinimized = false;
  drawer.classList.remove('sd-minimized');
  drawer.classList.add('sd-visible');
}

function _sdMinimizeDrawer() {
  var drawer = document.getElementById('share-drawer');
  if (!drawer) return;
  _sdMinimized = true;
  drawer.classList.add('sd-minimized');
}

function _sdInitDrag(drawer) {
  var handle = drawer.querySelector('.sd-handle-bar');
  if (!handle || handle._sdDragBound) return;
  handle._sdDragBound = true;

  function onStart(y) {
    _sdDragStartY = y;
    _sdDragStartH = drawer.getBoundingClientRect().height;
    _sdCurrentH   = _sdDragStartH;
    drawer.style.transition = 'none';
  }
  function onMove(y) {
    var dy = _sdDragStartY - y;
    var newH = Math.min(Math.max(_sdDragStartH + dy, 56), window.innerHeight * 0.667);
    _sdCurrentH = newH;
    drawer.style.height = newH + 'px';
    drawer.style.transform = 'translateY(0)';
  }
  function onEnd() {
    drawer.style.transition = '';
    // Snap: if dragged to < 100px, minimize
    if (_sdCurrentH < 100) {
      _sdMinimizeDrawer();
      drawer.style.height = '';
      drawer.style.transform = '';
    } else {
      drawer.classList.remove('sd-minimized');
      drawer.style.height = _sdCurrentH + 'px';
    }
  }

  handle.addEventListener('touchstart', function(e) { onStart(e.touches[0].clientY); }, { passive: true });
  handle.addEventListener('touchmove',  function(e) { e.preventDefault(); onMove(e.touches[0].clientY); }, { passive: false });
  handle.addEventListener('touchend',   function()  { onEnd(); });

  handle.addEventListener('mousedown', function(e) {
    onStart(e.clientY);
    function mm(ev) { onMove(ev.clientY); }
    function mu()   { onEnd(); document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); }
    document.addEventListener('mousemove', mm);
    document.addEventListener('mouseup',   mu);
  });
}

// Restore drawer when detail panel closes
var _origClosePanel = null;
(function() {
  var _waitForClose = setInterval(function() {
    if (typeof closePanel !== 'function') return;
    clearInterval(_waitForClose);
    _origClosePanel = closePanel;
    closePanel = function() {
      _origClosePanel();
      if (_shareModeActive) {
        setTimeout(_sdRestoreDrawer, 200);
      }
    };
  }, 100);
})();
