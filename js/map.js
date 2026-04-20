// ══════════════════════════════════════════════════════════════════
// MAP
// ══════════════════════════════════════════════════════════════════
var map, streetLayer, satLayer, markers = [], userMarker = null;
var clusterGroup = null;   // Leaflet.markercluster group
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
  // Priority: MapTiler raster → Thunderforest raster → CartoDB Voyager raster
  if (MAPTILER_API_KEY) {
    var mapLang = LANG === 'ko' ? 'ko' : 'en';
    return L.tileLayer(
      'https://api.maptiler.com/maps/' + MAPTILER_STYLE + '/{z}/{x}/{y}.png?key=' + MAPTILER_API_KEY + '&language=' + mapLang,
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
  // Default: CartoDB Voyager
  return L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    { attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19 }
  );
}

function initMap() {
  var cityMeta = CITY_META[activeCity] || CITY_META['nyc'];
  map = L.map('map', { center:[cityMeta.lat, cityMeta.lng], zoom: cityMeta.zoom, zoomControl:false });
  streetLayer = _makeStreetLayer().addTo(map);
  satLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { attribution:'© Esri / DigitalGlobe', maxZoom:18 }
  );
  L.control.zoom({ position:'bottomright' }).addTo(map);
  clusterGroup = createClusterGroup();
  map.addLayer(clusterGroup);
  const initLocs = LOCS.filter(l => l.city === activeCityKey);
  ARCHITECTS = [...new Set(initLocs.flatMap(l => l.archs || [l.arch]))].sort();
  NEIGHBORHOODS = [...new Set(initLocs.map(l => l.hood).filter(Boolean))].sort();
  initLocs.forEach(addMarker);
  buildFilters();
  renderList();
  applyLang();
  // Translation is now fully on-demand — no prefetch on startup
  // Update badge with city-specific count
  const badge = document.getElementById('pilot-badge');
  if (badge) badge.textContent = `🗺 ArchWander · Pilot v0.2 · ${initLocs.length} Locations`;
  buildLegend();
}

// ── Map Legend ──────────────────────────────────────────────
var legendControl = null;
function buildLegend() {
  if (legendControl) map.removeControl(legendControl);
  legendControl = L.control({ position: 'topright' });
  legendControl.onAdd = function() {
    var isMobile = window.innerWidth <= 900;
    var div = L.DomUtil.create('div', 'map-legend' + (isMobile ? ' collapsed' : ''));
    var titleText = LANG === 'ko' ? '범례' : 'Legend';
    var html = '<div class="legend-toggle" onclick="toggleLegend()">' +
      '<span class="legend-toggle-label">' + titleText + '</span>' +
      '<span class="legend-arrow">▾</span></div>';
    html += '<div class="legend-body">';
    var order = ['c-lmk','c-sky','c-his','c-cul','c-park','c-pub','c-rel','c-aca','c-res','c-inf','c-ret','c-com'];
    order.forEach(function(cc) {
      var m = CC_META[cc];
      var label = typeof _tCat === 'function' ? _tCat(CC_LABEL[cc]) : CC_LABEL[cc];
      html += '<div class="legend-item">' +
        '<span class="legend-dot" style="background:' + m.color + '"></span>' +
        '<span class="legend-label">' + label + '</span></div>';
    });
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

function refreshApp() {
  const cityLocs = LOCS.filter(l => l.city === activeCityKey);
  ARCHITECTS = [...new Set(cityLocs.flatMap(l => l.archs || [l.arch]))].sort();
  NEIGHBORHOODS = [...new Set(cityLocs.map(l => l.hood).filter(Boolean))].sort();
  if (clusterGroup) clusterGroup.clearLayers();
  markers.length = 0;
  ['cat','style','era','access','arch','hood'].forEach(k => {
    const el = document.getElementById(k === 'arch' ? 'body-arch' : `body-${k}`);
    if (el) el.innerHTML = '';
  });
  cityLocs.forEach(addMarker);
  buildFilters();
  clearAllFilters();
  if (activeLoc) closePanel();
  // Update badge
  const badge = document.getElementById('pilot-badge');
  if (badge) badge.textContent = `🗺 ArchWander · Pilot v0.2 · ${cityLocs.length} Locations`;
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
    .bindTooltip(_displayName(loc), { direction:'top', offset:[0,-26], opacity:0.94 })
    .on('click', () => _showMapMarkerPopup(loc));
  clusterGroup.addLayer(m);
  markers.push({ loc, m });
}

// ── Map marker mini-popup ────────────────────────────────────────
function _closeMapMarkerPopup() {
  var el = document.getElementById('map-marker-popup');
  if (el && el.parentNode) el.parentNode.removeChild(el);
  _mapMarkerPopupActive = null;
}

function _showMapMarkerPopup(loc) {
  _closeMapMarkerPopup();

  var catBadge = (typeof _pCat === 'function') ? _pCat(loc) : (loc.cat || '');
  var catClass = (typeof CAT_CC_MAP !== 'undefined' && CAT_CC_MAP[catBadge]) ? CAT_CC_MAP[catBadge] : 'c-lmk';
  var _lang    = (typeof LANG !== 'undefined') ? LANG : 'en';
  var _esc     = (typeof _escHtml === 'function') ? _escHtml : function(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };

  // Thumbnail: SV (orientation-aware) → photo → nothing
  var thumbHtml  = '';
  var hasSvKey   = (typeof GOOGLE_MAPS_API_KEY !== 'undefined') && GOOGLE_MAPS_API_KEY;
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
  if (svEmbedSrc) {
    thumbHtml = '<div class="rmp-sv-wrap" style="height:160px">' +
      '<div class="rmp-sv-pane rmp-sv-outdoor">' +
      '<iframe src="' + svEmbedSrc + '" allowfullscreen allow="' + SV_ALLOW + '" loading="lazy"></iframe>' +
      '</div></div>';
  } else if (loc.photos && loc.photos.length > 0) {
    var pUrl = loc.photos[0];
    if (pUrl.indexOf('wikimedia') >= 0 || pUrl.indexOf('commons') >= 0) {
      pUrl = pUrl.replace(/[?&]width=\d+/, '') + (pUrl.indexOf('?') >= 0 ? '&' : '?') + 'width=400';
    }
    thumbHtml = '<div class="rmp-thumb">' +
      '<img src="' + pUrl + '" loading="lazy" onerror="this.parentNode.style.display=\'none\'">' +
      '</div>';
  }

  var el = document.createElement('div');
  el.id = 'map-marker-popup';
  el.className = 'route-custom-popup';
  el.innerHTML =
    '<button class="rmp-close" onclick="_closeMapMarkerPopup()" aria-label="close">✕</button>' +
    thumbHtml +
    '<div class="rmp-body">' +
      '<div class="rmp-name" onclick="_closeMapMarkerPopup();openLocById(\'' + loc.id + '\')" style="cursor:pointer;text-decoration:underline;text-underline-offset:2px">' +
        _esc(loc.name) +
      '</div>' +
      '<div class="rmp-meta">' +
        '<span class="cat-badge ' + catClass + '" style="font-size:10px">' + catBadge + '</span>' +
        (loc.hood ? '<span style="color:#888"> · ' + _esc(loc.hood) + '</span>' : '') +
        (loc.yr   ? '<span style="color:#888"> · ' + loc.yr + '</span>' : '') +
      '</div>' +
      '<button class="rmp-open-btn" onclick="_closeMapMarkerPopup();openLocById(\'' + loc.id + '\')">' +
        (_lang === 'ko' ? '상세 보기 →' : 'View details →') +
      '</button>' +
    '</div>';
  document.body.appendChild(el);

  var isMobile = window.innerWidth <= 900;
  if (isMobile) {
    el.style.cssText = 'position:fixed;bottom:64px;left:50%;transform:translateX(-50%);z-index:3000;';
  } else {
    var pt  = map.latLngToContainerPoint([loc.lat, loc.lng]);
    var box = map.getContainer().getBoundingClientRect();
    var sx  = box.left + pt.x;
    var sy  = box.top  + pt.y;
    var pw  = el.offsetWidth  || 220;
    var ph  = el.offsetHeight || 120;
    var left = Math.max(8, Math.min(sx - pw / 2, window.innerWidth  - pw - 8));
    var top  = Math.max(8, Math.min(sy - ph - 16, window.innerHeight - ph - 8));
    el.style.cssText = 'position:fixed;left:' + left + 'px;top:' + top + 'px;z-index:3000;';
  }

  _mapMarkerPopupActive = el;

  // Auto-close when user taps elsewhere on the map
  setTimeout(function() {
    map.once('click', function() { _closeMapMarkerPopup(); });
  }, 80);
}

