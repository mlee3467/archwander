// ══════════════════════════════════════════════════════════════════
// ROUTE PLANNER
// ══════════════════════════════════════════════════════════════════
// Neighborhood-based walking routes with OSRM routing.
// Extends the existing Near Me system.

var routeActive    = false;
var routeLocations = [];   // ordered list of locations in the route
var routeLine      = null; // Leaflet polyline for the route
var routeMarkers   = [];   // numbered step markers on map
var routeData      = null; // { distance, duration, steps: [...] }

// ── Route Panel UI ───────────────────────────────────────────────

function openRoutePanel() {
  routeActive = true;
  var panel = document.getElementById('route-panel');
  if (!panel) _createRoutePanel();
  panel = document.getElementById('route-panel');
  panel.classList.add('visible');

  // Build neighborhood groups from current city
  var cityLocs = LOCS.filter(function(l) { return l.city === activeCityKey; });
  var hoods = _groupByHood(cityLocs);
  _renderRouteHoods(hoods);
}

function closeRoutePanel() {
  routeActive = false;
  var panel = document.getElementById('route-panel');
  if (panel) panel.classList.remove('visible');
  clearRoute();
}

function _createRoutePanel() {
  var div = document.createElement('div');
  div.id = 'route-panel';
  div.className = 'route-panel';
  div.innerHTML =
    '<div class="route-panel-hdr">' +
      '<span class="route-panel-title">🗺 Route Planner</span>' +
      '<button class="route-panel-close" onclick="closeRoutePanel()">✕</button>' +
    '</div>' +
    '<div class="route-panel-body">' +
      '<div class="route-hood-list" id="route-hood-list"></div>' +
      '<div class="route-selected" id="route-selected">' +
        '<div class="route-sel-title" id="route-sel-title">Selected Stops (0)</div>' +
        '<div class="route-sel-list" id="route-sel-list"></div>' +
        '<div class="route-actions" id="route-actions" style="display:none">' +
          '<button class="route-btn route-btn-calc" onclick="calcRoute()">🚶 Calculate Route</button>' +
          '<button class="route-btn route-btn-clear" onclick="clearRouteSelection()">✕ Clear</button>' +
        '</div>' +
      '</div>' +
      '<div class="route-result" id="route-result" style="display:none"></div>' +
    '</div>';
  document.body.appendChild(div);
}

// ── Neighborhood Grouping ────────────────────────────────────────

function _groupByHood(locs) {
  var groups = {};
  locs.forEach(function(loc) {
    var hood = loc.hood || (LANG === 'ko' ? '기타' : 'Other');
    if (!groups[hood]) groups[hood] = [];
    groups[hood].push(loc);
  });
  // Sort by number of locations (descending)
  var sorted = Object.keys(groups).sort(function(a, b) {
    return groups[b].length - groups[a].length;
  });
  return sorted.map(function(hood) {
    return { name: hood, locs: groups[hood] };
  });
}

function _renderRouteHoods(hoods) {
  var container = document.getElementById('route-hood-list');
  if (!container) return;

  container.innerHTML = '<div class="route-section-label">' +
    (LANG === 'ko' ? '동네별 건축물' : 'Architecture by Neighborhood') + '</div>' +
    hoods.map(function(h) {
      var isExpanded = h.locs.length <= 8;
      return '<div class="route-hood">' +
        '<button class="route-hood-hdr" onclick="toggleRouteHood(this)">' +
          '<span class="route-hood-name">' + _escHtml(h.name) + '</span>' +
          '<span class="route-hood-count">' + h.locs.length + '</span>' +
          '<span class="route-hood-arr">' + (isExpanded ? '▼' : '▶') + '</span>' +
        '</button>' +
        '<div class="route-hood-body" style="display:' + (isExpanded ? 'block' : 'none') + '">' +
          '<button class="route-hood-addall" onclick="addHoodToRoute(\'' + _escHtml(h.name).replace(/'/g, "\\'") + '\')">+ ' +
            (LANG === 'ko' ? '모두 추가' : 'Add All') + '</button>' +
          h.locs.map(function(loc) {
            var inRoute = routeLocations.some(function(r) { return r.id === loc.id; });
            return '<div class="route-loc-item' + (inRoute ? ' in-route' : '') + '" data-id="' + loc.id + '">' +
              '<span class="route-loc-name">' + _escHtml(loc.name) + '</span>' +
              '<button class="route-loc-toggle" onclick="toggleRouteLocation(\'' + loc.id + '\')">' +
                (inRoute ? '−' : '+') + '</button>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');
}

function _escHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function toggleRouteHood(btn) {
  var body = btn.nextElementSibling;
  var arr  = btn.querySelector('.route-hood-arr');
  if (body.style.display === 'none') {
    body.style.display = 'block';
    arr.textContent = '▼';
  } else {
    body.style.display = 'none';
    arr.textContent = '▶';
  }
}

// ── Route Selection ──────────────────────────────────────────────

function toggleRouteLocation(locId) {
  var idx = routeLocations.findIndex(function(r) { return r.id === locId; });
  if (idx >= 0) {
    routeLocations.splice(idx, 1);
  } else {
    var loc = LOCS.find(function(l) { return l.id === locId; });
    if (loc) routeLocations.push(loc);
  }
  _refreshRouteUI();
}

function addHoodToRoute(hoodName) {
  var cityLocs = LOCS.filter(function(l) { return l.city === activeCityKey; });
  var hoodLocs = cityLocs.filter(function(l) {
    return (l.hood || (LANG === 'ko' ? '기타' : 'Other')) === hoodName;
  });
  var existingIds = new Set(routeLocations.map(function(l) { return l.id; }));
  hoodLocs.forEach(function(loc) {
    if (!existingIds.has(loc.id)) routeLocations.push(loc);
  });
  _refreshRouteUI();
}

function clearRouteSelection() {
  routeLocations = [];
  clearRoute();
  _refreshRouteUI();
}

function removeRouteStop(locId) {
  routeLocations = routeLocations.filter(function(l) { return l.id !== locId; });
  _refreshRouteUI();
  if (routeData) calcRoute(); // recalculate if route was shown
}

function _refreshRouteUI() {
  // Update selected list
  var selTitle = document.getElementById('route-sel-title');
  var selList  = document.getElementById('route-sel-list');
  var actions  = document.getElementById('route-actions');

  if (selTitle) selTitle.textContent = (LANG === 'ko' ? '선택한 경유지' : 'Selected Stops') + ' (' + routeLocations.length + ')';

  if (selList) {
    if (routeLocations.length === 0) {
      selList.innerHTML = '<div class="route-sel-empty">' +
        (LANG === 'ko' ? '동네에서 건축물을 추가하세요' : 'Add locations from neighborhoods above') + '</div>';
    } else {
      selList.innerHTML = routeLocations.map(function(loc, i) {
        return '<div class="route-sel-item" draggable="true" data-idx="' + i + '">' +
          '<span class="route-sel-num">' + (i + 1) + '</span>' +
          '<span class="route-sel-name">' + _escHtml(loc.name) + '</span>' +
          '<button class="route-sel-remove" onclick="removeRouteStop(\'' + loc.id + '\')">✕</button>' +
        '</div>';
      }).join('');
    }
  }

  if (actions) actions.style.display = routeLocations.length >= 2 ? 'flex' : 'none';

  // Update hood list item states
  var items = document.querySelectorAll('.route-loc-item');
  var inRouteIds = new Set(routeLocations.map(function(l) { return l.id; }));
  items.forEach(function(item) {
    var id = item.getAttribute('data-id');
    var btn = item.querySelector('.route-loc-toggle');
    if (inRouteIds.has(id)) {
      item.classList.add('in-route');
      if (btn) btn.textContent = '−';
    } else {
      item.classList.remove('in-route');
      if (btn) btn.textContent = '+';
    }
  });
}

// ── OSRM Route Calculation ───────────────────────────────────────

function calcRoute() {
  if (routeLocations.length < 2) return;

  // Optimize order using nearest-neighbor heuristic
  var ordered = _optimizeOrder(routeLocations);
  routeLocations = ordered;
  _refreshRouteUI();

  // Build OSRM waypoints string
  var coords = ordered.map(function(loc) { return loc.lng + ',' + loc.lat; }).join(';');
  var url = 'https://routing.openstreetmap.de/routed-foot/route/v1/driving/' + coords +
            '?overview=full&geometries=geojson&steps=true';

  var resultDiv = document.getElementById('route-result');
  if (resultDiv) {
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="route-loading">' +
      (LANG === 'ko' ? '🚶 경로 계산 중...' : '🚶 Calculating route...') + '</div>';
  }

  fetch(url, { signal: AbortSignal.timeout(10000) })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.routes || !data.routes.length) throw new Error('No route found');
      _displayRoute(data.routes[0], ordered);
    })
    .catch(function(err) {
      console.warn('[route] OSRM failed:', err);
      // Fallback: straight-line route
      _displayStraightRoute(ordered);
    });
}

function _optimizeOrder(locs) {
  // Nearest-neighbor heuristic from the first location
  if (locs.length <= 2) return locs.slice();
  var remaining = locs.slice(1);
  var ordered = [locs[0]];
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

function _displayRoute(route, ordered) {
  clearRoute();

  // Draw polyline
  var coords = route.geometry.coordinates.map(function(c) { return [c[1], c[0]]; });
  routeLine = L.polyline(coords, {
    color: '#3B82F6', weight: 5, opacity: 0.85,
    dashArray: '10,7', lineCap: 'round'
  }).addTo(map);

  // Add numbered markers
  ordered.forEach(function(loc, i) {
    var icon = L.divIcon({
      html: '<div style="background:#3B82F6;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-family:Inter,sans-serif">' + (i + 1) + '</div>',
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    var m = L.marker([loc.lat, loc.lng], { icon: icon })
      .bindTooltip((i + 1) + '. ' + loc.name, { direction: 'top', offset: [0, -14] })
      .on('click', function() { openLoc(loc); })
      .addTo(map);
    routeMarkers.push(m);
  });

  // Fit map
  map.fitBounds(routeLine.getBounds(), { padding: [60, 60] });

  // Show route summary
  var totalDist = route.distance;
  var totalDur  = route.duration;
  routeData = {
    distance: totalDist,
    duration: totalDur,
    stops: ordered.length,
    legs: route.legs || []
  };
  _renderRouteResult(routeData, ordered);
}

function _displayStraightRoute(ordered) {
  clearRoute();

  // Draw straight lines between stops
  var coords = ordered.map(function(loc) { return [loc.lat, loc.lng]; });
  routeLine = L.polyline(coords, {
    color: '#3B82F6', weight: 4, opacity: 0.7,
    dashArray: '6,8', lineCap: 'round'
  }).addTo(map);

  // Add numbered markers
  ordered.forEach(function(loc, i) {
    var icon = L.divIcon({
      html: '<div style="background:#3B82F6;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-family:Inter,sans-serif">' + (i + 1) + '</div>',
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    var m = L.marker([loc.lat, loc.lng], { icon: icon })
      .bindTooltip((i + 1) + '. ' + loc.name, { direction: 'top', offset: [0, -14] })
      .on('click', function() { openLoc(loc); })
      .addTo(map);
    routeMarkers.push(m);
  });

  map.fitBounds(routeLine.getBounds(), { padding: [60, 60] });

  // Estimate using straight-line distances
  var totalDist = 0;
  for (var i = 1; i < ordered.length; i++) {
    totalDist += haversineM(ordered[i-1].lat, ordered[i-1].lng, ordered[i].lat, ordered[i].lng);
  }
  var totalDur = totalDist / 1.33; // ~80m/min
  routeData = { distance: totalDist, duration: totalDur, stops: ordered.length, legs: [], estimated: true };
  _renderRouteResult(routeData, ordered);
}

function _renderRouteResult(data, ordered) {
  var resultDiv = document.getElementById('route-result');
  if (!resultDiv) return;

  var distStr = data.distance < 1000
    ? Math.round(data.distance) + 'm'
    : (data.distance / 1000).toFixed(1) + 'km';
  var durMin = Math.ceil(data.duration / 60);
  var durStr = durMin < 60
    ? durMin + (LANG === 'ko' ? '분' : ' min')
    : Math.floor(durMin / 60) + (LANG === 'ko' ? '시간 ' : 'h ') + (durMin % 60) + (LANG === 'ko' ? '분' : 'min');

  var html = '<div class="route-summary">' +
    '<div class="route-summary-stat">' +
      '<span class="route-stat-val">🚶 ' + distStr + '</span>' +
      '<span class="route-stat-label">' + (LANG === 'ko' ? '총 거리' : 'Total Distance') + '</span>' +
    '</div>' +
    '<div class="route-summary-stat">' +
      '<span class="route-stat-val">⏱ ' + durStr + '</span>' +
      '<span class="route-stat-label">' + (LANG === 'ko' ? '도보 시간' : 'Walking Time') + '</span>' +
    '</div>' +
    '<div class="route-summary-stat">' +
      '<span class="route-stat-val">📍 ' + data.stops + '</span>' +
      '<span class="route-stat-label">' + (LANG === 'ko' ? '경유지' : 'Stops') + '</span>' +
    '</div>' +
  '</div>';

  if (data.estimated) {
    html += '<div class="route-estimate-note">' +
      (LANG === 'ko' ? '⚠ 직선 거리 기반 추정치입니다' : '⚠ Estimated (straight-line distances)') + '</div>';
  }

  // Itinerary
  html += '<div class="route-itinerary">';
  ordered.forEach(function(loc, i) {
    var legInfo = '';
    if (data.legs && data.legs[i]) {
      var leg = data.legs[i];
      var legDist = leg.distance < 1000 ? Math.round(leg.distance) + 'm' : (leg.distance / 1000).toFixed(1) + 'km';
      var legDur  = Math.ceil(leg.duration / 60) + (LANG === 'ko' ? '분' : ' min');
      legInfo = '<div class="route-leg-info">🚶 ' + legDist + ' · ' + legDur + '</div>';
    }
    var catBadge = _pCat(loc);
    html += '<div class="route-stop">' +
      '<div class="route-stop-num">' + (i + 1) + '</div>' +
      '<div class="route-stop-info">' +
        '<div class="route-stop-name">' + _escHtml(loc.name) + '</div>' +
        '<div class="route-stop-meta">' +
          '<span class="cat-badge ' + (CAT_CC_MAP[catBadge] || 'c-lmk') + '" style="font-size:10px">' + catBadge + '</span>' +
          (loc.hood ? ' · ' + _escHtml(loc.hood) : '') +
        '</div>' +
      '</div>' +
    '</div>';
    if (i < ordered.length - 1 && legInfo) {
      html += legInfo;
    }
  });
  html += '</div>';

  // Export button
  html += '<div class="route-export-actions">' +
    '<button class="route-btn route-btn-pdf" onclick="exportRoutePDF()">📄 ' +
      (LANG === 'ko' ? 'PDF 내보내기' : 'Export PDF') + '</button>' +
  '</div>';

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = html;
}

function clearRoute() {
  if (routeLine) { map.removeLayer(routeLine); routeLine = null; }
  routeMarkers.forEach(function(m) { map.removeLayer(m); });
  routeMarkers = [];
  routeData = null;
  var resultDiv = document.getElementById('route-result');
  if (resultDiv) { resultDiv.style.display = 'none'; resultDiv.innerHTML = ''; }
}

// ══════════════════════════════════════════════════════════════════
