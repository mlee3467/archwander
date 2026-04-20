// REPORT ISSUE
// ══════════════════════════════════════════════════════════════════
var REPORTS_KEY = 'archwander_reports_v1';

function loadReports() {
  try { return JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]'); } catch(e) { return []; }
}

function saveReport(report) {
  try {
    const reports = loadReports();
    reports.unshift(report);
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  } catch(e) { console.warn('Report save failed', e); }
}

function openReportModal() {
  if (!activeLoc) return;
  const overlay = document.getElementById('report-modal-overlay');
  const locDisplay = document.getElementById('report-loc-display');
  const typeEl = document.getElementById('report-type');
  const descEl = document.getElementById('report-desc');
  const body = document.getElementById('report-modal-body');

  // Reset form
  locDisplay.textContent = activeLoc.name;
  if (typeEl) typeEl.value = '';
  if (descEl) descEl.value = '';
  // Restore form if it was in success state
  body.innerHTML = `
    <div class="report-loc-label">Location</div>
    <div class="report-loc-name" id="report-loc-display">${activeLoc.name}</div>
    <div class="report-field-label">Issue type *</div>
    <select id="report-type" class="report-select">
      <option value="">${LANG === 'ko' ? '이슈 유형 선택…' : 'Select issue type…'}</option>
      <option value="wrong_info">${LANG === 'ko' ? '설명에 잘못된 정보' : 'Wrong information in description'}</option>
      <option value="wrong_coords">${LANG === 'ko' ? '지도 위치 오류' : 'Wrong map location / coordinates'}</option>
      <option value="wrong_hours">${LANG === 'ko' ? '운영시간 또는 입장료 오류' : 'Wrong hours or admission info'}</option>
      <option value="missing_info">${LANG === 'ko' ? '중요 정보 누락' : 'Missing important information'}</option>
      <option value="photo_issue">${LANG === 'ko' ? '사진 문제' : 'Photo issue'}</option>
      <option value="closed">${LANG === 'ko' ? '영구 폐쇄된 장소' : 'Place is permanently closed'}</option>
      <option value="other">${LANG === 'ko' ? '기타' : 'Other'}</option>
    </select>
    <div class="report-field-label">${LANG === 'ko' ? '상세 내용' : 'Details'}</div>
    <textarea id="report-desc" class="report-textarea"
      placeholder="${LANG === 'ko' ? '문제를 자세히 설명해주세요…' : 'Describe the issue in detail…'}"></textarea>
    <button class="report-submit" onclick="submitReport()">${LANG === 'ko' ? '신고 제출' : 'Submit Report'}</button>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReportModal() {
  document.getElementById('report-modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function handleReportOverlayClick(e) {
  if (e.target === document.getElementById('report-modal-overlay')) closeReportModal();
}

function submitReport() {
  const typeEl = document.getElementById('report-type');
  const descEl = document.getElementById('report-desc');
  const type = typeEl?.value;
  const desc = descEl?.value.trim() || '';

  if (!type) {
    typeEl.style.borderColor = '#EF4444';
    setTimeout(() => { if (typeEl) typeEl.style.borderColor = ''; }, 1500);
    return;
  }

  const issueLabels = {
    wrong_info: 'Wrong information', wrong_coords: 'Wrong coordinates',
    wrong_hours: 'Wrong hours/admission', missing_info: 'Missing info',
    photo_issue: 'Photo issue', closed: 'Permanently closed', other: 'Other'
  };

  saveReport({
    id: Date.now(),
    locId: activeLoc.id,
    locName: activeLoc.name,
    city: activeLoc.city,
    type,
    typeLabel: issueLabels[type] || type,
    desc,
    lang: LANG,
    date: new Date().toISOString(),
    status: 'new'
  });

  // Show success
  document.getElementById('report-modal-body').innerHTML = `
    <div class="report-success">
      ✅ ${LANG === 'ko' ? '신고가 접수되었습니다. 감사합니다!' : 'Report submitted. Thank you!'}
    </div>
  `;
  setTimeout(() => closeReportModal(), 2000);
}

// Update Report button label on language change
function updateReportBtnLabel() {
  const btn = document.getElementById('tab-report-btn');
  if (btn) btn.innerHTML = `🚩 ${t('tab_report')}`;
}

// ══════════════════════════════════════════════════════════════════
// MAP TYPE / GPS / MOBILE
// ══════════════════════════════════════════════════════════════════
function setMapType(type) {
  document.getElementById('btn-street').classList.toggle('active', type === 'street');
  document.getElementById('btn-sat').classList.toggle('active', type === 'satellite');
  if (type === 'street') { map.removeLayer(satLayer); streetLayer.addTo(map); }
  else { map.removeLayer(streetLayer); satLayer.addTo(map); }
}

// ══════════════════════════════════════════════════════════════════
// NEAR ME + WALK FILTER
// ══════════════════════════════════════════════════════════════════
var nearMeActive = false;

function toggleNearMe() {
  nearMeActive = !nearMeActive;
  var nearBtn = document.getElementById('near-me-btn');
  if (nearBtn) nearBtn.classList.toggle('active', nearMeActive);
  if (nearMeActive) {
    var wb = document.getElementById('walk-bar');
    if (wb) wb.classList.add('visible');  // show GPS/Pin buttons immediately
    history.pushState({ view: 'nearMe' }, '');
  } else {
    _fullDeactivate();
  }
}

function _fullDeactivate() {
  nearMeActive = false;
  walkActive   = false;
  walkOrigin   = null;
  pinDropMode  = false;
  if (window.map) map.getContainer().style.cursor = '';
  if (userMarker)    { userMarker.remove();    userMarker    = null; }
  if (pinDropMarker) { pinDropMarker.remove(); pinDropMarker = null; }
  _clearWalkOverlay();
  var wb = document.getElementById('walk-bar');
  if (wb) { wb.classList.remove('visible'); wb.style.height = '0'; wb.style.overflow = 'hidden'; }
  var wrf = document.getElementById('walk-radius-float');
  if (wrf) wrf.classList.remove('visible');
  var _wctrl = document.getElementById('walk-radius-ctrl-btn');
  if (_wctrl) _wctrl.style.display = 'none';
  var nearBtn = document.getElementById('near-me-btn');
  if (nearBtn) nearBtn.classList.remove('active');
  document.getElementById('walk-gps-btn').classList.remove('active', 'locating');
  document.getElementById('walk-pin-btn').classList.remove('active', 'locating');
  var wrb = document.getElementById('walk-route-btn');
  if (wrb) wrb.style.display = 'none';
  _updateSetRouteFab();
  renderList();
  syncMarkers();
  // Refresh route planner to show all locations again
  if (typeof refreshRouteList === 'function') refreshRouteList();
}

// Just hide the floating slider card; show radius-ctrl button below Set-Route FAB
function _closeWalkFloat() {
  var wrf = document.getElementById('walk-radius-float');
  if (wrf) wrf.classList.remove('visible');
  var ctrl = document.getElementById('walk-radius-ctrl-btn');
  if (ctrl) ctrl.style.display = 'flex';
}

// Reopen the float from the radius-ctrl button
function _reopenWalkFloat() {
  var wrf = document.getElementById('walk-radius-float');
  if (wrf) {
    // Reset to center position each time it reopens
    wrf.style.left = '';
    wrf.style.top  = '';
    wrf.style.transform = '';
    wrf.classList.add('visible');
    _initWalkFloatDrag();
  }
  var ctrl = document.getElementById('walk-radius-ctrl-btn');
  if (ctrl) ctrl.style.display = 'none';
}

// Initialize drag-to-reposition on the walk-radius-float
function _initWalkFloatDrag() {
  var el = document.getElementById('walk-radius-float');
  if (!el || el._dragInited) return;
  el._dragInited = true;
  var drag = { active: false, sx: 0, sy: 0, ox: 0, oy: 0 };

  function _startDrag(clientX, clientY) {
    var rect = el.getBoundingClientRect();
    drag.active = true;
    drag.sx = clientX; drag.sy = clientY;
    drag.ox = rect.left + rect.width  / 2;
    drag.oy = rect.top  + rect.height / 2;
    el.style.left = drag.ox + 'px';
    el.style.top  = drag.oy + 'px';
    el.style.transform = 'translate(-50%,-50%)';
    el.style.cursor = 'grabbing';
  }
  function _applyDrag(clientX, clientY) {
    var nx = drag.ox + (clientX - drag.sx);
    var ny = drag.oy + (clientY - drag.sy);
    var hw = el.offsetWidth  / 2 + 8;
    var hh = el.offsetHeight / 2 + 8;
    el.style.left = Math.max(hw, Math.min(window.innerWidth  - hw, nx)) + 'px';
    el.style.top  = Math.max(hh, Math.min(window.innerHeight - hh, ny)) + 'px';
  }
  function _endDrag() { drag.active = false; el.style.cursor = 'grab'; }

  el.addEventListener('mousedown', function(e) {
    if (e.target.closest && e.target.closest('.wrf-close')) return;
    if (e.target.tagName === 'INPUT') return;
    _startDrag(e.clientX, e.clientY);
    e.preventDefault();
  });
  el.addEventListener('touchstart', function(e) {
    if (e.target.closest && e.target.closest('.wrf-close')) return;
    if (e.target.tagName === 'INPUT') return;
    _startDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  document.addEventListener('mousemove', function(e) {
    if (!drag.active) return;
    _applyDrag(e.clientX, e.clientY);
  });
  document.addEventListener('touchmove', function(e) {
    if (!drag.active) return;
    e.preventDefault();
    _applyDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });
  document.addEventListener('mouseup',  _endDrag);
  document.addEventListener('touchend', _endDrag);
}

// Alias kept so selectCity() still works unchanged
function clearWalkFilter() { _fullDeactivate(); }

function locateUserGPS() {
  if (!navigator.geolocation) { alert('Geolocation not supported.'); return; }
  // Mobile: minimize sidebar so map is fully visible
  if (window.innerWidth <= 900) closeSidebar();
  const gpsBtn = document.getElementById('walk-gps-btn');
  const pinBtn = document.getElementById('walk-pin-btn');
  gpsBtn.classList.add('locating');
  pinBtn.classList.remove('active', 'locating');
  navigator.geolocation.getCurrentPosition(
    pos => {
      gpsBtn.classList.remove('locating');
      _setWalkOrigin(pos.coords.latitude, pos.coords.longitude, 'gps');
    },
    () => {
      alert('Could not get your location. Check browser permissions.');
      gpsBtn.classList.remove('locating');
    }
  );
}

function startPinDrop() {
  pinDropMode = true;
  map.getContainer().style.cursor = 'crosshair';
  // Mobile: minimize sidebar so user can tap the map
  if (window.innerWidth <= 900) closeSidebar();
  document.getElementById('walk-pin-btn').classList.add('locating');
  document.getElementById('walk-gps-btn').classList.remove('active', 'locating');
}

// Shared pin icon for GPS + Pin markers. 📍 emoji.
function _personMarkerIcon() {
  return L.divIcon({
    html: '<div style="position:relative;width:36px;height:40px;pointer-events:none;user-select:none">' +
          '<span style="position:absolute;bottom:4px;left:0;right:0;text-align:center;font-size:36px;line-height:1;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.35))">📍</span>' +
          '</div>',
    className: '',
    iconSize:  [36, 40],
    iconAnchor:[18, 40]
  });
}
// Walking person icon (mobile walk-path mode only)
function _walkingPersonIcon() {
  return L.divIcon({
    html: '<div style="position:relative;width:36px;height:40px;pointer-events:none;user-select:none">' +
          '<span style="position:absolute;bottom:4px;left:0;right:0;text-align:center;font-size:36px;line-height:1;' +
          'filter:drop-shadow(0 2px 5px rgba(0,0,0,0.35));' +
          '-webkit-text-stroke:0.5px black;color:black">🚶🏻‍♀️‍➡️</span>' +
          '</div>',
    className: '',
    iconSize:  [36, 40],
    iconAnchor:[18, 40]
  });
}
// Swap marker icon between default pin and walking person
function _setMarkerWalkMode(active) {
  const m = userMarker || pinDropMarker;
  if (!m) return;
  m.setIcon(active ? _walkingPersonIcon() : _personMarkerIcon());
}

// ── Set Route FAB (mobile only) ──────────────────────────────────
function _updateSetRouteFab() {
  var fab = document.getElementById('set-route-fab');
  if (!fab) return;
  var show = nearMeActive && walkOrigin && window.innerWidth <= 900 && !routeActive;
  fab.style.display = show ? 'flex' : 'none';
  if (typeof LANG !== 'undefined') {
    var lbl = fab.querySelector('.srf-label');
    if (lbl) lbl.textContent = LANG === 'ko' ? '루트 설정' : 'Set Route';
  }
}
function _setRouteFabTap() {
  if (typeof openRoutePanel === 'function') openRoutePanel();
}

function _setWalkOrigin(lat, lng, mode) {
  walkOrigin = { lat, lng };
  walkActive = true;

  // Show floating radius card now that a location has been provided
  var wrf = document.getElementById('walk-radius-float');
  if (wrf) {
    // Reset to default center position on each new origin
    wrf.style.left = ''; wrf.style.top = ''; wrf.style.transform = '';
    wrf.classList.add('visible');
  }
  // Hide radius ctrl button (float is now open)
  var _wctrl = document.getElementById('walk-radius-ctrl-btn');
  if (_wctrl) _wctrl.style.display = 'none';
  _initWalkFloatDrag();

  // Clear old markers
  if (userMarker)    { userMarker.remove();    userMarker    = null; }
  if (pinDropMarker) { pinDropMarker.remove(); pinDropMarker = null; }

  if (mode === 'gps') {
    userMarker = L.marker([lat, lng], {
      pane: 'walkMarker',
      icon: _personMarkerIcon()
    }).addTo(map).bindPopup('📍 You are here').openPopup();
    document.getElementById('walk-gps-btn').classList.add('active');
    document.getElementById('walk-pin-btn').classList.remove('active', 'locating');
  } else {
    pinDropMarker = L.marker([lat, lng], {
      pane:     'walkMarker',
      draggable: true,
      icon:      _personMarkerIcon()
    }).addTo(map);
    pinDropMarker.on('dragend', function() {
      const p = pinDropMarker.getLatLng();
      walkOrigin = { lat: p.lat, lng: p.lng };
      _runWalkFilter();
    });
    document.getElementById('walk-pin-btn').classList.add('active');
    document.getElementById('walk-pin-btn').classList.remove('locating');
    document.getElementById('walk-gps-btn').classList.remove('active', 'locating');
    map.getContainer().style.cursor = '';
    pinDropMode = false;
  }

  _runWalkFilter();
  // Show route button in walk bar (desktop)
  var wrb = document.getElementById('walk-route-btn');
  if (wrb) wrb.style.display = '';
  // Show floating FAB (mobile)
  _updateSetRouteFab();
}

function _runWalkFilter() {
  if (!walkActive || !walkOrigin) return;
  const minutes = parseInt(document.getElementById('walk-slider').value, 10);
  document.getElementById('walk-label').textContent = `${minutes} min`;
  renderList();
  syncMarkers();
  _drawWalkOverlay();
  // Update route planner if open
  if (typeof refreshRouteList === 'function') refreshRouteList();
  // Fit map to nearby locations + origin
  const nearby = getFiltered();
  if (nearby.length > 0) {
    const bounds = L.latLngBounds(nearby.map(l => [l.lat, l.lng]));
    bounds.extend([walkOrigin.lat, walkOrigin.lng]);
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
  } else {
    map.setView([walkOrigin.lat, walkOrigin.lng], Math.max(map.getZoom(), 15));
  }
}

function _drawWalkOverlay() {
  if (!walkActive || !walkOrigin) return;
  const minutes = parseInt(document.getElementById('walk-slider').value, 10);
  const radiusM = minutes * 80; // ~80 m/min
  const { lat, lng } = walkOrigin;

  _clearWalkOverlay();

  // ① Gray mask: world bbox with circular hole (evenodd fill rule)
  const outerRing = [[-90, -360], [-90, 360], [90, 360], [90, -360]];
  const innerRing = circlePolyPoints(lat, lng, radiusM);
  walkMaskLayer = L.polygon([outerRing, innerRing], {
    pane:        'walkMask',
    stroke:      false,
    fillColor:   '#666666',
    fillOpacity: 0.45
  }).addTo(map);

  // ② Dashed circle border
  walkCircleLayer = L.circle([lat, lng], {
    pane:      'walkOverlay',
    radius:    radiusM,
    color:     '#EF4444',
    weight:    2,
    opacity:   0.85,
    fill:      false,
    dashArray: '7, 9'
  }).addTo(map);

  // Location count badge — centered below the person marker dot
  const nearby = getFiltered();
  const n    = nearby.length;
  const lbl  = LANG === 'ko' ? `${n}곳` : `${n} spot${n !== 1 ? 's' : ''}`;
  const zero = n === 0;
  walkCountLabel = L.marker([lat, lng], {
    pane:        'walkMarker',   // same pane as the person icon, renders above it in DOM
    interactive: false,
    icon: L.divIcon({
      html: `<div style="
        transform:translate(-50%,28px);
        display:inline-block;
        background:${zero ? 'rgba(107,114,128,0.92)' : 'rgba(239,68,68,0.92)'};
        color:white;font-size:12px;font-weight:700;
        font-family:Inter,-apple-system,sans-serif;
        padding:3px 9px;border-radius:20px;
        border:2px solid white;white-space:nowrap;
        box-shadow:0 2px 8px rgba(0,0,0,0.28);
        pointer-events:none;line-height:1.4
      ">${lbl}</div>`,
      className: '',
      iconSize:   [0, 0],
      iconAnchor: [0, 0]   // transform handles all positioning
    })
  }).addTo(map);
}

function _clearWalkOverlay() {
  if (walkMaskLayer)   { walkMaskLayer.remove();   walkMaskLayer   = null; }
  if (walkCircleLayer) { walkCircleLayer.remove();  walkCircleLayer = null; }
  if (walkLineGroup)   { walkLineGroup.remove();    walkLineGroup   = null; }
  if (walkCountLabel)  { walkCountLabel.remove();   walkCountLabel  = null; }
  _clearWalkRoute();
}

// ── Walking route (pedestrian routing) ────────────────────────────
// Uses routing.openstreetmap.de/routed-foot — a true pedestrian-profile
// OSRM server. The public router.project-osrm.org only runs the car profile
// regardless of the /foot/ path segment in the URL.
//
// Fallback chain:
//  1. routing.openstreetmap.de/routed-foot  (no key, OSM pedestrian data)
//  2. router.project-osrm.org/route/v1/driving  (car — last resort only)
var walkRouteLine = null;
var walkPathMode  = false;

var WALK_ROUTERS = [
  // Primary: OSM demo server with genuine pedestrian profile
  (o, d) => `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${o.lng},${o.lat};${d.lng},${d.lat}?overview=full&geometries=geojson`,
];

function _clearWalkRoute() {
  if (walkRouteLine) { map.removeLayer(walkRouteLine); walkRouteLine = null; }
  if (walkPathMode) _setMarkerWalkMode(false);
  walkPathMode = false;
  const panel = document.getElementById('panel');
  if (panel) panel.classList.remove('walk-path-mode');
}

async function showWalkingRoute(loc) {
  if (!walkOrigin || !loc) return null;
  _clearWalkRoute();
  for (const routerFn of WALK_ROUTERS) {
    const url = routerFn(walkOrigin, loc);
    try {
      const res  = await fetch(url, { signal: AbortSignal.timeout(8000) });
      const data = await res.json();
      if (data.routes && data.routes.length) {
        const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        walkRouteLine = L.polyline(coords, {
          color: '#EF4444', weight: 5, opacity: 0.85,
          dashArray: '10,7', lineCap: 'round'
        }).addTo(map);
        map.fitBounds(walkRouteLine.getBounds(), { padding: [60, 60] });
        const dist = data.routes[0].distance;
        const dur  = data.routes[0].duration;
        const distStr = dist < 1000 ? `${Math.round(dist)}m` : `${(dist/1000).toFixed(1)}km`;
        const durStr  = `${Math.ceil(dur / 60)} min walk`;
        return { distance: distStr, duration: durStr };
      }
    } catch(e) { console.warn('Walk router failed, trying next:', url, e); }
  }
  return null;
}

async function triggerWalkingRoute() {
  if (!activeLoc || !walkOrigin) return;
  const btn = document.querySelector('.btn-walk-route');
  if (btn) btn.innerHTML = '🚶 Loading...';
  const result = await showWalkingRoute(activeLoc);
  if (btn && result) btn.innerHTML = `🚶 ${result.distance}`;
  else if (btn) btn.innerHTML = '🚶 Route not available';
  // On mobile: collapse panel to reveal map + swap pin to walking person
  if (window.innerWidth <= 900 && result) {
    walkPathMode = true;
    document.getElementById('panel').classList.add('walk-path-mode');
    _setMarkerWalkMode(true);
    history.pushState({ view: 'walkPath' }, '');
  }
  // Fit map to show both pin origin and full route
  if (result && walkRouteLine && walkOrigin) {
    const bounds = walkRouteLine.getBounds().extend([walkOrigin.lat, walkOrigin.lng]);
    map.fitBounds(bounds, { padding: [80, 80] });
  }
}

function toggleWalkPathMode() {
  if (!walkPathMode) return;
  _setMarkerWalkMode(false);
  walkPathMode = false;
  document.getElementById('panel').classList.remove('walk-path-mode');
}

function toggleSidebar() {
  // Mobile: if location panel is open, close it first and open sidebar
  if (window.innerWidth <= 900 && activeLoc) {
    closePanel();
  }
  const side = document.getElementById('sidebar');
  const bd = document.getElementById('sidebar-backdrop');
  const isOpen = side.classList.toggle('open');
  if (bd) bd.classList.toggle('visible', isOpen);
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  const bd = document.getElementById('sidebar-backdrop');
  if (bd) bd.classList.remove('visible');
}

// ── Mobile action bar toggle ──────────────────────────────────────
function toggleMobileActions() {
  var bar = document.getElementById('mobile-action-bar');
  if (!bar || window.innerWidth > 900) return toggleSidebar();
  // Close location panel first if open
  if (activeLoc) closePanel();
  var isOpen = bar.classList.toggle('open');
  // Toggle sidebar together with action bar
  var side = document.getElementById('sidebar');
  var bd = document.getElementById('sidebar-backdrop');
  if (isOpen) {
    side.classList.add('open');
    if (bd) bd.classList.add('visible');
  } else {
    side.classList.remove('open');
    if (bd) bd.classList.remove('visible');
  }
}
function closeMobileActions() {
  var bar = document.getElementById('mobile-action-bar');
  if (bar) bar.classList.remove('open');
  // Also close sidebar
  if (window.innerWidth <= 900) {
    document.getElementById('sidebar').classList.remove('open');
    var bd = document.getElementById('sidebar-backdrop');
    if (bd) bd.classList.remove('visible');
  }
}

// ══════════════════════════════════════════════════════════════════
// SHOW GPS LOCATION MARKER (passive, without activating walk filter)
// ══════════════════════════════════════════════════════════════════
// Show user's GPS location as a marker on the map without activating walk filter
function _showUserLocationMarker(lat, lng) {
  if (userMarker) { userMarker.remove(); userMarker = null; }
  var icon = L.divIcon({
    className: 'gps-dot-icon',
    html: '<div class="gps-dot"><div class="gps-dot-pulse"></div></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
  userMarker = L.marker([lat, lng], {
    icon: icon,
    zIndexOffset: 1000,
    interactive: false
  }).addTo(map);
}

// ── Sidebar Position Sync ────────────────────────────────────
// Dynamically aligns sidebar top to actual header bottom, fixing
// any sub-pixel or safe-area mismatch on mobile devices.
function _syncSidebarTop() {
  if (window.innerWidth > 900) return;  // desktop: CSS handles it
  var hdr = document.querySelector('header');
  if (!hdr) return;
  var bottom = Math.ceil(hdr.getBoundingClientRect().bottom);
  var topVal = bottom + 'px';
  var els = [
    document.getElementById('sidebar'),
    document.getElementById('sidebar-backdrop'),
    document.getElementById('list-overlay')
  ];
  els.forEach(function(el) { if (el) el.style.top = topVal; });
}

// Run once on load and on orientation/resize changes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { setTimeout(_syncSidebarTop, 50); });
} else {
  setTimeout(_syncSidebarTop, 50);
}
window.addEventListener('resize', function() { setTimeout(_syncSidebarTop, 100); });
window.addEventListener('orientationchange', function() { setTimeout(_syncSidebarTop, 300); });

// ══════════════════════════════════════════════════════════════════