// ══════════════════════════════════════════════════════════════════
// MAP
// ══════════════════════════════════════════════════════════════════
var map, streetLayer, satLayer, markers = [], userMarker = null;
var clusterGroup = null;   // Leaflet.markercluster group
var _cityPinMarkers = {};
var _worldMode = true;     // true until user clicks a city card (prevents zoom-in past 4)
var _mapMarkerPopupActive = null; // currently shown map marker mini-popup
// ── Walk filter state ──────────────────────────────────────────────
var walkOrigin    = null;   // { lat, lng } GPS position or dropped pin
var walkActive    = false;  // is walk filter currently on?
var pinDropMode      = false;  // waiting for user to click map (walk filter)
var routePinDropMode = false;  // waiting for user to click map (route near-me)
var pinDropMarker = null;   // the draggable pin on map
// Walk overlay layers
var walkMaskLayer   = null; // gray outer mask (inverted circle)
var walkCircleLayer = null; // dashed circle border
var walkLineGroup   = null; // polylines to each nearby location
var walkCountLabel  = null; // location count badge inside circle

// Approximate a circle as a polygon in lat/lng space
function circlePolyPoints(lat, lng, radiusM, n = 72) {
  const R    = 6371000;
  const latR = lat * Math.PI / 180;
  const pts  = [];
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * 2 * Math.PI;
    pts.push([
      lat + (radiusM * Math.cos(angle)) / R * (180 / Math.PI),
      lng + (radiusM * Math.sin(angle)) / (R * Math.cos(latR)) * (180 / Math.PI)
    ]);
  }
  return pts;
}

function haversineM(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLng/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function _makeStreetLayer() {
  // Priority: MapTiler raster → Thunderforest raster → CartoDB raster
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (MAPTILER_API_KEY) {
    var mapLang  = LANG === 'ko' ? 'ko' : 'en';
    var mapStyle = isDark ? 'streets-v2-dark' : MAPTILER_STYLE;
    return L.tileLayer(
      'https://api.maptiler.com/maps/' + mapStyle + '/{z}/{x}/{y}.png?key=' + MAPTILER_API_KEY + '&language=' + mapLang,
      { attribution: '© <a href="https://www.maptiler.com/copyright/">MapTiler</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512, zoomOffset: -1, maxZoom: 20 }
    );
  }
  if (THUNDERFOREST_API_KEY) {
    return L.tileLayer(
      'https://{s}.tile.thunderforest.com/' + THUNDERFOREST_STYLE + '/{z}/{x}/{y}.png?apikey=' + THUNDERFOREST_API_KEY,
      { attribution: 'Maps © <a href="https://www.thunderforest.com">Thunderforest</a>, Data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abc', maxZoom: 19 }
    );
  }
  // Default: CartoDB Voyager (light) or Dark Matter (dark)
  var cartoUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  return L.tileLayer(cartoUrl, {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd', maxZoom: 19
  });
}

// ── Swap street tile when dark mode toggles ────────────────────────
function _refreshStreetTile() {
  if (!map || typeof streetLayer === 'undefined') return;
  var wasOnMap = map.hasLayer(streetLayer);
  if (wasOnMap) map.removeLayer(streetLayer);
  streetLayer = _makeStreetLayer();
  if (wasOnMap) streetLayer.addTo(map);
}

function initMap() {
  // Start at world view so city overview cards are visible on load
  var _isMobile = window.innerWidth < 901;
  var _wmZoom = _isMobile ? 1 : 3;
  map = L.map('map', { center:[20, 10], zoom:_wmZoom, zoomControl:false, minZoom:_wmZoom, maxZoom:4, maxBoundsViscosity: 1.0 });
  streetLayer = _makeStreetLayer().addTo(map);
  satLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { attribution:'© Esri / DigitalGlobe', maxZoom:18 }
  );
  L.control.zoom({ position:'bottomright' }).addTo(map);
  clusterGroup = createClusterGroup();
  // World mode on load: DON'T add clusterGroup so location markers stay hidden
  // (city overview cards are shown instead; clusterGroup added when city is selected)

  // Override getMinZoom so city-mode zoom floor (5) is enforced at Leaflet core level
  map.getMinZoom = function() { return _worldMode ? (window.innerWidth < 901 ? 1 : 3) : (window.innerWidth < 901 ? 10 : 11); };
  // Build empty marker set — LOCS is always empty at initMap() time (data loads async)
  // refreshApp() handles full render after data arrives
  applyLang();
  // Translation is now fully on-demand — no prefetch on startup
  buildLegend();
  // Set dropdowns to "world" on initial load
  var _mSel = document.getElementById('city-select-mobile');
  if (_mSel) _mSel.value = 'world';
  var _sbSel = document.getElementById('sb-city-select');
  if (_sbSel) _sbSel.value = 'world';
  // Zoom guard + city card visibility
  map.on('zoomend', function() {
    var z = map.getZoom();
    // City mode: snap back to min zoom (mobile=10, desktop=11)
    var _minCity = window.innerWidth < 901 ? 10 : 11;
    if (!_worldMode && z < _minCity) {
      map.setZoom(_minCity, { animate: false });
      return;
    }
    _updateCityPinVisibility();
  });
}

// ── City Overview Cards (world zoom) ─────────────────────────────
// Get total location count — checks merged LOCS first, then raw dataVar (lazy-load fallback)
function _getCityTotalCount(cm) {
  var fromLocs = LOCS.filter(function(l) { return l.city === cm.key; }).length;
  if (fromLocs > 0) return fromLocs;
  if (cm.dataVar) {
    try {
      var raw = (0, eval)(cm.dataVar);
      if (Array.isArray(raw)) return raw.length;
    } catch(e) {}
  }
  return 0;
}

function _buildCityPins() {
  // Remove existing city pin markers
  Object.keys(_cityPinMarkers).forEach(function(k) {
    if (_cityPinMarkers[k]) map.removeLayer(_cityPinMarkers[k]);
  });
  _cityPinMarkers = {};

  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';
  Object.keys(CITY_META).forEach(function(code) {
    var cm = CITY_META[code];
    var total   = _getCityTotalCount(cm);
    var cityLocs = LOCS.filter(function(l) { return l.city === cm.key; });
    var favCnt  = cityLocs.filter(function(l) { return _favSet.has(l.id); }).length;
    var visCnt  = cityLocs.filter(function(l) { return _visSet.has(l.id); }).length;

    var statsHtml = '<div class="cwp-stats">';
    if (total > 0) {
      statsHtml += '<span class="cwp-stat">' + total + ' ' + (isKo ? '장소' : 'spots') + '</span>';
      var subRow = '';
      if (favCnt > 0) subRow += '<span class="cwp-stat cwp-fav">♥ ' + favCnt + '</span>';
      if (visCnt > 0) subRow += '<span class="cwp-stat cwp-vis">✓ ' + visCnt + '</span>';
      if (subRow) statsHtml += '<div class="cwp-stats-sub">' + subRow + '</div>';
    }
    statsHtml += '</div>';

    var _cityName = cm.label;
    var cardHtml =
      '<div class="cwp-anchor">' +
        '<div class="cwp-card" onclick="_cwpCityClick(\'' + code + '\')">' +
          '<div class="cwp-name">' + _cityName + '</div>' +
          statsHtml +
        '</div>' +
        '<div class="cwp-dot"></div>' +
      '</div>';

    // iconSize/iconAnchor [0,0]: anchor point = lat/lng = dot center
    var icon = L.divIcon({ className: 'cwp-wrap', html: cardHtml, iconSize: [0,0], iconAnchor: [0,0] });
    var m = L.marker([cm.lat, cm.lng], { icon: icon, zIndexOffset: 2000 });
    map.addLayer(m);
    _cityPinMarkers[code] = m;
  });
  _updateCityPinVisibility();

}

function _updateCityPinVisibility() {
  var show = map.getZoom() < 5;
  Object.keys(_cityPinMarkers).forEach(function(k) {
    var m = _cityPinMarkers[k];
    if (!m) return;
    var el = m.getElement ? m.getElement() : null;
    if (el) el.style.display = show ? '' : 'none';
  });
}

// ── Central city entry point ─────────────────────────────────────
// Called from city cards, dropdown, and selectCity().
// Handles ALL cases: world→city, city→city, same city re-entry.
function _enterCity(code, opts) {
  var meta = CITY_META[code];
  if (!meta) return;
  var noAnim = opts && opts.noAnim;
  // Already showing this city in city mode — nothing to do (skip in noAnim to allow forced re-entry)
  if (!noAnim && code === activeCity && !_worldMode) return;

  // 1. Exit world mode
  _worldMode = false;
  _clearWorldModeUI();
  map.setMaxZoom(19);
  buildLegend();

  // 2. Set active city state immediately (before async load)
  activeCity    = code;
  activeCityKey = meta.key;

  // 3. Sync dropdowns
  var mSel = document.getElementById('city-select-mobile');
  if (mSel) mSel.value = code;
  var sbSel = document.getElementById('sb-city-select');
  if (sbSel) sbSel.value = code;

  // 4. Navigate to city center (clear previous city's pan bounds)
  map.setMaxBounds(null);
  var _entryZoom = (window.innerWidth < 901) ? meta.zoom - 1 : meta.zoom;
  if (noAnim) {
    map.setView([meta.lat, meta.lng], _entryZoom, { animate: false });
  } else {
    map.flyTo([meta.lat, meta.lng], _entryZoom, { duration: 1.2 });
  }

  // 5. Clear walk filter if active
  if (typeof walkActive !== 'undefined' && walkActive &&
      typeof clearWalkFilter === 'function') clearWalkFilter();

  // 6. Load city data, then render markers AFTER fly animation ends.
  //    MarkerCluster throws "_zoom undefined" if addLayer is called while
  //    the map is still at world zoom (2). We wait for moveend to ensure
  //    the map has reached city zoom before adding any markers.
  loadCityData(code).then(function() {
    // Add clusterGroup to map (needed before refreshApp adds markers)
    if (clusterGroup && !map.hasLayer(clusterGroup)) map.addLayer(clusterGroup);
    var _rendered = false;
    function _doRender() {
      if (_rendered) return;
      _rendered = true;
      map.off('moveend', _doRender);
      if (typeof refreshApp === 'function') refreshApp();
      // IFL archived — auto-trigger removed
      // Set pan bounds: city viewport × PAD to limit tile loading
      // Mobile uses lower zoom + larger PAD for wider geographic coverage on small screen
      var _meta = typeof CITY_META !== 'undefined' ? CITY_META[code] : null;
      if (_meta) {
        var _mob  = window.innerWidth < 901;
        var PAD   = _mob ? 3.0 : 2.0;
        var bzoom = _meta.zoom - (_mob ? 1 : 0);
        var cPx   = map.project([_meta.lat, _meta.lng], bzoom);
        var hw    = (window.innerWidth  / 2) * PAD;
        var hh    = (window.innerHeight / 2) * PAD;
        var sw    = map.unproject(L.point(cPx.x - hw, cPx.y + hh), bzoom);
        var ne    = map.unproject(L.point(cPx.x + hw, cPx.y - hh), bzoom);
        map.setMaxBounds(L.latLngBounds(sw, ne));
      }
    }
    // Primary: render once fly animation completes
    map.once('moveend', _doRender);
    // Fallback: render after 1.6s (fly is 1.2s) in case moveend doesn't fire
    setTimeout(_doRender, 1600);
    // Mobile: auto-open sidebar after city entry (skip in share mode)
    if (window.innerWidth < 901 && window.location.search.indexOf('s=') === -1) {
      setTimeout(function() {
        var sb = document.getElementById('sidebar');
        var bd = document.getElementById('sidebar-backdrop');
        if (sb && !sb.classList.contains('open')) {
          sb.classList.add('open');
          if (bd) bd.classList.add('visible');
        }
      }, 1400);
    }
  }).catch(function(err) {
    console.error('[_enterCity] load failed for', code, ':', err);
  });
}

// City card onclick handler — thin wrapper around _enterCity
function _cwpCityClick(code) {
  _enterCity(code);
}

// Switch to world overview mode (called from dropdown "World Map" option)
function _goWorldMap() {
  _worldMode = true;
  map.setMaxBounds(null);  // remove city pan restriction
  map.setMaxZoom(4);   // re-apply world-mode cap (no zoom-in past 4)
  if (map.hasLayer(clusterGroup)) map.removeLayer(clusterGroup);
  buildLegend();        // switch from category legend to world-stats legend
  map.flyTo([20, 10], window.innerWidth < 901 ? 1 : 3, { duration: 1.2 });
  // Sync both city dropdowns to show the world option
  var mSel = document.getElementById('city-select-mobile');
  if (mSel) mSel.value = 'world';
  var sbSel = document.getElementById('sb-city-select');
  if (sbSel) sbSel.value = 'world';
  // Rebuild city pins + red dotted line after fly completes
  map.once('moveend', function() {
    if (_worldMode) _buildCityPins();
  });
}

// ── Map Legend ──────────────────────────────────────────────
var legendControl = null;
var _legendHiddenCats = new Set(); // cc codes currently hidden via legend checkboxes

function buildLegend() {
  if (_worldMode) { _buildWorldLegend(); return; }
  if (legendControl) map.removeControl(legendControl);
  legendControl = L.control({ position: 'topright' });
  legendControl.onAdd = function() {
    var isMobile = window.innerWidth <= 900;
    var div = L.DomUtil.create('div', 'map-legend' + (isMobile ? ' collapsed' : ''));
    var titleText = LANG === 'ko' ? '범례' : 'Legend';
    // Header: toggle expand + "All / None" quick links
    var allTxt  = LANG === 'ko' ? '전체' : 'All';
    var noneTxt = LANG === 'ko' ? '없음' : 'None';
    var html = '<div class="legend-toggle" onclick="toggleLegend()">' +
      '<span class="legend-toggle-label">' + titleText + '</span>' +
      '<span class="legend-arrow">▾</span></div>';
    html += '<div class="legend-body">';
    // All / None quick-select row
    html += '<div class="legend-all-none">' +
      '<button class="legend-qbtn" onclick="event.stopPropagation();_legendSelectAll(true)">' + allTxt + '</button>' +
      '<span class="legend-qsep">·</span>' +
      '<button class="legend-qbtn" onclick="event.stopPropagation();_legendSelectAll(false)">' + noneTxt + '</button>' +
      '</div>';
    var order = ['c-lmk','c-sky','c-his','c-cul','c-park','c-pub','c-rel','c-aca','c-res','c-inf','c-ret','c-com'];
    order.forEach(function(cc) {
      var m = CC_META[cc];
      var label = typeof _tCat === 'function' ? _tCat(CC_LABEL[cc]) : CC_LABEL[cc];
      var isOn = !_legendHiddenCats.has(cc);
      // Pure div toggle — no <input type=checkbox> to avoid browser/dark-mode rendering issues
      html += '<div class="legend-item legend-item-cb' + (isOn ? '' : ' legend-row-off') + '"' +
        ' id="legend-row-' + cc + '"' +
        ' onclick="event.stopPropagation();_toggleLegendRow(\'' + cc + '\')">' +
        '<span class="legend-ck">' + (isOn ? '✓' : '') + '</span>' +
        '<span class="legend-dot" style="background:' + m.color + '"></span>' +
        '<span class="legend-label">' + label + '</span>' +
        '</div>';
    });
    html += '</div>';
    div.innerHTML = html;
    L.DomEvent.disableClickPropagation(div);
    return div;
  };
  legendControl.addTo(map);
}

// ── World-mode UI: lock banner (desktop) + bottom sheet (mobile) ──
function _applyWorldModeUI() {
  var isMobile = window.innerWidth < 901;
  var banner  = document.getElementById('world-lock-banner');
  var actions = document.getElementById('sb-actions');
  var sheet   = document.getElementById('city-sheet');
  if (!isMobile) {
    // Desktop: show lock banner, dim buttons
    if (banner)  banner.style.display = 'block';
    if (actions) actions.classList.add('world-locked');
    if (sheet)   sheet.style.display = 'none';
  } else {
    // Mobile: hide banner, show sliding bottom sheet
    if (banner)  banner.style.display = 'none';
    if (actions) actions.classList.remove('world-locked');
    if (sheet) {
      sheet.style.display = 'block';
      requestAnimationFrame(function() { sheet.classList.add('visible'); });
    }
  }
}

function _clearWorldModeUI() {
  var banner  = document.getElementById('world-lock-banner');
  var actions = document.getElementById('sb-actions');
  var sheet   = document.getElementById('city-sheet');
  if (banner)  banner.style.display = 'none';
  if (actions) actions.classList.remove('world-locked');
  if (sheet) {
    sheet.classList.remove('visible');
    setTimeout(function() { if (!_worldMode) sheet.style.display = 'none'; }, 350);
  }
}

// World-mode legend: global favorites + visited stats panel
function _buildWorldLegend() {
  _applyWorldModeUI();
  if (legendControl) map.removeControl(legendControl);
  legendControl = L.control({ position: 'topright' });
  legendControl.onAdd = function() {
    var isMobile = window.innerWidth <= 900;
    var div = L.DomUtil.create('div', 'map-legend' + (isMobile ? ' collapsed' : ''));
    var isKo = typeof LANG !== 'undefined' && LANG === 'ko';
    var totalFav = typeof _favSet !== 'undefined' ? _favSet.size : 0;
    var totalVis = typeof _visSet !== 'undefined' ? _visSet.size : 0;
    var titleText = isKo ? '내 기록' : 'My Stats';
    var html = '<div class="legend-toggle" onclick="toggleLegend()">' +
      '<span class="legend-toggle-label">' + titleText + '</span>' +
      '<span class="legend-arrow">▾</span></div>';
    html += '<div class="legend-body">';
    html += '<div class="wm-stat-row">' +
      '<span class="wm-stat-icon wm-fav">♥</span>' +
      '<span class="wm-stat-label">' + (isKo ? '즐겨찾기' : 'Favorites') + '</span>' +
      '<span class="wm-stat-val">' + totalFav + '</span></div>';
    html += '<div class="wm-stat-row">' +
      '<span class="wm-stat-icon wm-vis">✓</span>' +
      '<span class="wm-stat-label">' + (isKo ? '방문' : 'Visited') + '</span>' +
      '<span class="wm-stat-val">' + totalVis + '</span></div>';
    html += '</div>';
    div.innerHTML = html;
    L.DomEvent.disableClickPropagation(div);
    return div;
  };
  legendControl.addTo(map);
}

function toggleLegend() {
  var el = document.querySelector('.map-legend');
  if (el) el.classList.toggle('collapsed');
}

// Toggle a single row by clicking it
function _toggleLegendRow(cc) {
  var nowHidden = _legendHiddenCats.has(cc);
  // nowHidden=true → user wants to show → checked=true; nowHidden=false → hide → checked=false
  toggleLegendCat(cc, nowHidden);
  var row = document.getElementById('legend-row-' + cc);
  if (row) {
    row.classList.toggle('legend-row-off', !nowHidden);
    var ck = row.querySelector('.legend-ck');
    if (ck) ck.textContent = nowHidden ? '✓' : '';
  }
}

// Toggle a single category on/off (also called by _legendSelectAll)
function toggleLegendCat(cc, checked) {
  if (checked) { _legendHiddenCats.delete(cc); }
  else         { _legendHiddenCats.add(cc); }
  if (typeof syncMarkers === 'function') syncMarkers();
  if (typeof renderList  === 'function') renderList();
}

// Quick-select All or None
function _legendSelectAll(on) {
  var order = ['c-lmk','c-sky','c-his','c-cul','c-park','c-pub','c-rel','c-aca','c-res','c-inf','c-ret','c-com'];
  _legendHiddenCats.clear();
  if (!on) order.forEach(function(cc) { _legendHiddenCats.add(cc); });
  order.forEach(function(cc) {
    var row = document.getElementById('legend-row-' + cc);
    if (row) {
      row.classList.toggle('legend-row-off', !on);
      var ck = row.querySelector('.legend-ck');
      if (ck) ck.textContent = on ? '✓' : '';
    }
  });
  if (typeof syncMarkers === 'function') syncMarkers();
  if (typeof renderList  === 'function') renderList();
}

function refreshApp() {
  // In world mode: just refresh city overview cards, skip all marker/filter rendering
  if (_worldMode) {
    _buildCityPins();
    return;
  }
  const cityLocs = LOCS.filter(l => l.city === activeCityKey);
  console.log('[refreshApp] city=' + activeCityKey + ' locs=' + cityLocs.length + ' LOCS_total=' + LOCS.length);
  if (cityLocs.length === 0 && LOCS.length === 0) {
    console.error('[refreshApp] LOCS is empty — data has not loaded yet. Will be called again when data arrives.');
    return; // exit early — no point building empty UI
  }
  ARCHITECTS = [...new Set(cityLocs.flatMap(l => l.archs || [l.arch]))].sort();
  NEIGHBORHOODS = [...new Set(cityLocs.map(l => l.hood).filter(Boolean))].sort();
  if (clusterGroup) clusterGroup.clearLayers();
  markers.length = 0;
  ['cat','style','era','access','arch','hood'].forEach(k => {
    const el = document.getElementById(k === 'arch' ? 'body-arch' : `body-${k}`);
    if (el) el.innerHTML = '';
  });
  cityLocs.forEach(addMarker);
  console.log('[refreshApp] addMarker done, markers=' + markers.length);
  // Sync markers immediately — don't rely solely on clearAllFilters chain
  if (typeof syncMarkers === 'function') syncMarkers();
  buildFilters();
  clearAllFilters();
  if (activeLoc) closePanel();
  // Update badge
  const badge = document.getElementById('pilot-badge');
  if (badge) badge.textContent = `🗺 ArchWander · Pilot v0.2 · ${cityLocs.length} Locations`;
  // Rebuild city overview cards so counts (fav/visited) stay current
  _buildCityPins();
  console.log('[refreshApp] done, cluster=' + (clusterGroup ? clusterGroup.getLayers().length : '?'));
}

// ══════════════════════════════════════════════════════════════════
// MARKERS
// ══════════════════════════════════════════════════════════════════
// ── Marker zoom sizing ──────────────────────────────────────
// CLUSTER_ZOOM: zoom 이 이 값 이상이면 클러스터 해제 → 개별 마커 표시
var CLUSTER_ZOOM = 15;

function updateMarkerSize() {
  const z = map.getZoom();
  const el = document.getElementById('map');
  el.classList.toggle('zoom-full', z >= 14);
  el.classList.toggle('zoom-out', z < 11);
}

// ── Cluster Group 생성 ───────────────────────────────────────
function createClusterGroup() {
  return L.markerClusterGroup({
    // 같은 화면 내 80px 이내 마커는 자동 클러스터
    maxClusterRadius: 80,
    // CLUSTER_ZOOM 이상에서 클러스터 해제 → 카테고리 색상 개별 마커 노출
    disableClusteringAtZoom: CLUSTER_ZOOM,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    animate: true,
    // 클러스터 아이콘: 단색(#111) + 흰 숫자, 크기 3단계
    iconCreateFunction(cluster) {
      const n = cluster.getChildCount();
      const cls = n < 10 ? 'sm' : n < 50 ? 'md' : 'lg';
      const size = n < 10 ? 32 : n < 50 ? 42 : 52;
      return L.divIcon({
        html: `<div class="cluster-icon cluster-${cls}">${n}</div>`,
        className: '',
        iconSize:   [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    }
  });
}

function addMarker(loc) {
  const icon = _buildLocIcon(loc);
  const m = L.marker([loc.lat, loc.lng], { icon })
    .bindTooltip(_displayName(loc), { direction:'top', offset:[0,-48], opacity:0.94 })
    .on('click', () => _showMapMarkerPopup(loc));
  // Re-apply highlight (+ blink) class after Leaflet recreates the element (spiderfy/animate)
  m.on('add', function() {
    if (typeof _highlightedMarkerId !== 'undefined' && _highlightedMarkerId === loc.id) {
      var el = m.getElement();
      if (el) {
        el.classList.add('marker-highlight');
        if (typeof _highlightBlinkActive !== 'undefined' && _highlightBlinkActive) {
          el.classList.add('marker-blink');
        }
      }
    }
  });
  clusterGroup.addLayer(m);
  markers.push({ loc, m });
}

// ── Map marker mini-popup ────────────────────────────────────────
function _closeMapMarkerPopup() {
  var el = document.getElementById('map-marker-popup');
  if (el && el.parentNode) el.parentNode.removeChild(el);
  _mapMarkerPopupActive = null;
  // Clear marker highlight only if no panel is open
  if (!document.getElementById('panel')?.classList.contains('open')) {
    if (typeof clearMarkerHighlight === 'function') clearMarkerHighlight();
  }
}

function _showMapMarkerPopup(loc) {
  // Second tap on same marker → open detail directly
  if (_mapMarkerPopupActive && _mapMarkerPopupActive.id === loc.id) {
    _closeMapMarkerPopup();
    if (typeof openLocById === 'function') openLocById(loc.id);
    return;
  }
  _closeMapMarkerPopup();
  // Highlight this marker
  if (typeof highlightMarker === 'function') highlightMarker(loc.id, true);
  _mapMarkerPopupActive = loc;

  var catBadge = (typeof _pCat === 'function') ? _pCat(loc) : (loc.cat || '');
  var catClass = (typeof CAT_CC_MAP !== 'undefined' && CAT_CC_MAP[catBadge]) ? CAT_CC_MAP[catBadge] : 'c-lmk';
  var _lang    = (typeof LANG !== 'undefined') ? LANG : 'en';
  var _esc     = (typeof _escHtml === 'function') ? _escHtml : function(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };

  var el = document.createElement('div');
  el.id = 'map-marker-popup';
  el.className = 'route-custom-popup';
  el.style.width = '280px';  // fix width so offsetWidth is reliable before layout
  el.innerHTML =
    '<button class="rmp-close" onclick="_closeMapMarkerPopup()" aria-label="close">✕</button>' +
    '<div class="rmp-body">' +
      '<div class="rmp-name" onclick="_closeMapMarkerPopup();openLocById(\'' + loc.id + '\')" style="cursor:pointer;text-decoration:underline;text-underline-offset:2px">' +
        _esc(loc.name) +
      '</div>' +
      '<div class="rmp-meta">' +
        '<span class="cat-badge ' + catClass + '" style="font-size:10px">' + catBadge + '</span>' +
        (loc.yr ? '<span style="color:#888"> · ' + loc.yr + '</span>' : '') +
      '</div>' +
      (loc.arch ? '<div class="rmp-arch">' + _esc(loc.arch) + '</div>' : '') +
    '</div>';
  document.body.appendChild(el);

  var isMobile = window.innerWidth <= 900;
  if (isMobile) {
    // Fixed at bottom — enough space above for the marker animation to show
    el.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:3000;';
  } else {
    var pt  = map.latLngToContainerPoint([loc.lat, loc.lng]);
    var box = map.getContainer().getBoundingClientRect();
    var sx  = box.left + pt.x;
    var sy  = box.top  + pt.y;
    var pw  = el.offsetWidth  || 220;
    var ph  = el.offsetHeight || 120;
    var left = Math.max(8, Math.min(sx - pw / 2, window.innerWidth  - pw - 8));
    // +80px extra clearance so the ring + glow animation is fully visible
    var top  = Math.max(8, Math.min(sy - ph - 80, window.innerHeight - ph - 8));
    el.style.cssText = 'position:fixed;left:' + left + 'px;top:' + top + 'px;z-index:3000;';
  }

  _mapMarkerPopupActive = el;

  // Auto-close when user taps elsewhere on the map
  setTimeout(function() {
    map.once('click', function() { _closeMapMarkerPopup(); });
  }, 80);
}

