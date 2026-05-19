// ══════════════════════════════════════════════════════════════════
// SHARE — Route + Location sharing via short URL (?s=abc12345)
// ══════════════════════════════════════════════════════════════════

// ── Helpers ──────────────────────────────────────────────────────
function _generateShareId() {
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var id = '';
  for (var i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// ── Open Share Modal (called from route panel) ────────────────────
function openShareModal(locationIds, routeStops, city) {
  var modal = document.getElementById('share-modal');
  if (!modal) return;

  // Store data for later use
  modal._shareData = { locationIds: locationIds, routeStops: routeStops, city: city };

  // Populate counts + modal title
  var ko = (typeof LANG !== 'undefined' && LANG === 'ko');
  var hasRoute = routeStops && routeStops.length >= 2;
  var titleEl  = modal.querySelector('.share-modal-title');
  if (titleEl)  titleEl.textContent = hasRoute
    ? (ko ? '🔗 루트 공유' : '🔗 Share Route')
    : (ko ? '🔗 장소 목록 공유' : '🔗 Share Locations');
  var locCount  = document.getElementById('share-loc-count');
  var stopCount = document.getElementById('share-stop-count');
  if (locCount)  locCount.textContent  = locationIds.length + (ko ? '개' : '');
  if (stopCount) stopCount.textContent = hasRoute ? (routeStops.length + (ko ? '개' : '')) : (ko ? '없음' : 'none');
  var stopRow = document.getElementById('share-stop-row');
  if (stopRow) stopRow.style.display = hasRoute ? '' : 'none';

  // Clear title field + link display
  var titleInp = document.getElementById('share-title-inp');
  if (titleInp) titleInp.value = '';
  var linkBox = document.getElementById('share-link-box');
  if (linkBox) linkBox.style.display = 'none';
  var genBtn = document.getElementById('share-gen-btn');
  if (genBtn) genBtn.disabled = false;

  modal.style.display = 'flex';
}

function closeShareModal() {
  var modal = document.getElementById('share-modal');
  if (modal) modal.style.display = 'none';
}

// ── Generate and store share link ────────────────────────────────
async function generateShareLink() {
  var modal = document.getElementById('share-modal');
  if (!modal || !modal._shareData) return;

  var ko = (typeof LANG !== 'undefined' && LANG === 'ko');
  var genBtn  = document.getElementById('share-gen-btn');
  var linkBox = document.getElementById('share-link-box');
  var linkInp = document.getElementById('share-link-inp');

  if (!_supabase) {
    alert(ko ? 'Supabase 연결이 필요합니다.' : 'Supabase connection required.');
    return;
  }

  var titleVal = (document.getElementById('share-title-inp').value || '').trim();
  if (!titleVal) {
    titleVal = ko ? '건축 투어' : 'Architecture Tour';
  }

  if (genBtn) { genBtn.disabled = true; genBtn.textContent = ko ? '생성 중…' : 'Creating…'; }

  try {
    await _ensureSupabaseAuth();

    var shareId = _generateShareId();
    var { data: existing } = await _supabase.from('shares').select('id').eq('id', shareId).single();
    // Retry once on collision (extremely rare)
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
    if (genBtn)  { genBtn.textContent = ko ? '✅ 생성됨' : '✅ Created'; }

  } catch (err) {
    console.error('[share] generate error:', err);
    if (genBtn) { genBtn.disabled = false; genBtn.textContent = ko ? '🔗 링크 생성' : '🔗 Create Link'; }
    alert((ko ? '링크 생성 실패: ' : 'Failed to create link: ') + (err.message || err));
  }
}

function copyShareLink() {
  var linkInp = document.getElementById('share-link-inp');
  if (!linkInp || !linkInp.value) return;
  var ko = (typeof LANG !== 'undefined' && LANG === 'ko');
  navigator.clipboard.writeText(linkInp.value).then(function() {
    var copyBtn = document.getElementById('share-copy-btn');
    if (copyBtn) {
      var prev = copyBtn.textContent;
      copyBtn.textContent = ko ? '✅ 복사됨' : '✅ Copied';
      setTimeout(function() { copyBtn.textContent = prev; }, 2000);
    }
  }).catch(function() {
    linkInp.select();
    document.execCommand('copy');
  });
}

// ── Check URL on load ─────────────────────────────────────────────
async function checkShareParam() {
  var params = new URLSearchParams(window.location.search);
  var shareId = params.get('s');
  if (!shareId || !/^[a-z0-9]{8}$/.test(shareId)) return;

  if (!_supabase) {
    console.warn('[share] No Supabase client — cannot load share');
    return;
  }

  try {
    await _ensureSupabaseAuth();

    var { data, error } = await _supabase
      .from('shares')
      .select('*')
      .eq('id', shareId)
      .single();

    if (error || !data) {
      console.warn('[share] Share not found:', shareId, error);
      return;
    }

    // Wait for app to be ready (city data loaded)
    _applyShare(data);

  } catch (err) {
    console.error('[share] checkShareParam error:', err);
  }
}

async function _applyShare(share) {
  // Resolve city code (e.g. 'chi', 'nyc') from city key (e.g. 'chicago', 'new-york')
  var cityCode = null;
  if (typeof CITY_META !== 'undefined') {
    Object.keys(CITY_META).forEach(function(code) {
      if (CITY_META[code].key === share.city) cityCode = code;
    });
  }

  // Navigate to the shared city immediately (skips world map)
  if (cityCode && typeof _enterCity === 'function') {
    _enterCity(cityCode);
    // Give the city fly animation time to settle before overlaying pins
    await new Promise(function(res) { setTimeout(res, 1400); });
  }

  // Ensure city data is loaded
  if (cityCode && typeof loadCityData === 'function') {
    try { await loadCityData(cityCode); } catch(e) {}
  }

  // Find matching locations
  var matchedLocs = [];
  if (typeof LOCS !== 'undefined' && share.location_ids && share.location_ids.length) {
    matchedLocs = LOCS.filter(function(l) {
      return share.location_ids.indexOf(l.id) !== -1;
    });
  }

  // Show banner
  _showShareBanner(share, matchedLocs);

  // Show pins on map
  if (matchedLocs.length && typeof map !== 'undefined') {
    _showSharePins(matchedLocs);
  }

  // If there are route stops, offer to open route
  if (share.route_stops && share.route_stops.length >= 2 && typeof openRoutePanel === 'function') {
    // Pre-populate route locations
    var routeLocs = [];
    share.route_stops.forEach(function(id) {
      var loc = matchedLocs.find ? matchedLocs.find(function(l){ return l.id === id; })
              : matchedLocs.filter(function(l){ return l.id === id; })[0];
      if (loc) routeLocs.push(loc);
    });
    if (routeLocs.length >= 2) {
      // Store for later use when user clicks "Open Route"
      window._pendingShareRoute = routeLocs;
    }
  }
}

// ── Share Banner ──────────────────────────────────────────────────
function _showShareBanner(share, matchedLocs) {
  var banner = document.getElementById('share-banner');
  if (!banner) return;
  var ko = (typeof LANG !== 'undefined' && LANG === 'ko');

  var titleEl  = document.getElementById('share-banner-title');
  var infoEl   = document.getElementById('share-banner-info');
  var routeBtn = document.getElementById('share-banner-route-btn');

  if (titleEl) titleEl.textContent = share.title || (ko ? '공유된 투어' : 'Shared Tour');
  if (infoEl)  infoEl.textContent  = matchedLocs.length
    + (ko ? '개 장소' : ' locations')
    + (share.route_stops && share.route_stops.length >= 2
        ? (ko ? ' · 루트 포함' : ' · with route') : '');

  if (routeBtn) {
    if (share.route_stops && share.route_stops.length >= 2) {
      routeBtn.style.display = 'inline-flex';
      routeBtn.onclick = function() { _openSharedRoute(); };
    } else {
      routeBtn.style.display = 'none';
    }
  }

  banner.style.display = 'flex';
}

function dismissShareBanner() {
  var banner = document.getElementById('share-banner');
  if (banner) banner.style.display = 'none';
  _clearSharePins();
}

function _openSharedRoute() {
  if (!window._pendingShareRoute || !window._pendingShareRoute.length) return;
  dismissShareBanner();
  if (typeof openRoutePanel !== 'function') return;
  openRoutePanel();
  // Small delay to let panel open
  setTimeout(function() {
    if (typeof routeLocations !== 'undefined') {
      routeLocations = window._pendingShareRoute.slice();
      window._pendingShareRoute = null;
      if (typeof _refreshRouteUI === 'function') _refreshRouteUI();
      if (typeof calculateRoute === 'function') calculateRoute();
    }
  }, 300);
}

// ── Share Pins ────────────────────────────────────────────────────
var _sharePinLayer = null;

function _showSharePins(locs) {
  _clearSharePins();
  if (typeof L === 'undefined' || typeof map === 'undefined') return;

  _sharePinLayer = L.layerGroup().addTo(map);

  var bounds = [];
  locs.forEach(function(loc) {
    if (!loc.lat || !loc.lng) return;
    bounds.push([loc.lat, loc.lng]);
    var icon = L.divIcon({
      html: '<div style="background:#D946A8;color:white;width:28px;height:28px;border-radius:50%;' +
            'display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;' +
            'border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">📍</div>',
      className: '',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    L.marker([loc.lat, loc.lng], { icon: icon })
      .addTo(_sharePinLayer)
      .bindPopup('<b>' + (loc.name || '') + '</b>', { maxWidth: 200 });
  });

  if (bounds.length) {
    try { map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 }); } catch(e) {}
  }
}

function _clearSharePins() {
  if (_sharePinLayer && typeof map !== 'undefined') {
    try { map.removeLayer(_sharePinLayer); } catch(e) {}
    _sharePinLayer = null;
  }
}
