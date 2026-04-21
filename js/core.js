// ══════════════════════════════════════════════════════════════════
// GOOGLE MAPS JS API — Interior Street View (fully interactive)
// The Embed API (iframe) only supports interactive panoramas via pano=ID.
// With location=lat,lng&source=default it shows a static image.
// The JS API handles both modes interactively, so we use it for interior slides.
// ══════════════════════════════════════════════════════════════════
var _mapsJsState = 'idle'; // 'idle' | 'loading' | 'ready'
var _mapsJsQueue = [];

function _loadMapsJS(cb) {
  if (_mapsJsState === 'ready') { cb(); return; }
  _mapsJsQueue.push(cb);
  if (_mapsJsState === 'loading') return;
  _mapsJsState = 'loading';
  var s = document.createElement('script');
  s.src = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAPS_API_KEY +
          '&v=weekly&callback=_onMapsJsReady';
  s.async = true;
  s.onerror = function() { _mapsJsState = 'idle'; _mapsJsQueue = []; };
  document.head.appendChild(s);
}
window._onMapsJsReady = function() {
  _mapsJsState = 'ready';
  _mapsJsQueue.forEach(function(fn) { try { fn(); } catch(e) {} });
  _mapsJsQueue = [];
};

function _fovToZoom(fov) {
  // zoom 1 ≡ 90° FOV (same formula as sv-tool)
  return Math.log2(180 / Math.max(10, Math.min(100, +fov)));
}

function initIntSVPane(div) {
  if (div.dataset.svInit) return; // already initialized
  div.dataset.svInit = '1';
  var cfg;
  try { cfg = JSON.parse(div.dataset.svCfg || '{}'); } catch(e) { return; }
  _loadMapsJS(function() {
    var opts = {
      pov:                  { heading: cfg.h || 0, pitch: cfg.p || 0 },
      zoom:                 _fovToZoom(cfg.f || 90),
      addressControl:       false,
      fullscreenControl:    true,
      motionTracking:       false,
      motionTrackingControl:false,
      linksControl:         false,
      enableCloseButton:    false,
      showRoadLabels:       false
    };
    if (cfg.panoId) {
      opts.pano = cfg.panoId;
    } else {
      opts.position = { lat: cfg.lat, lng: cfg.lng };
      opts.source   = google.maps.StreetViewSource.DEFAULT;
    }
    var pano = new google.maps.StreetViewPanorama(div, opts);
    pano.addListener('status_changed', function() {
      if (pano.getStatus() === google.maps.StreetViewStatus.ZERO_RESULTS) {
        div.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;' +
          'height:100%;color:#888;background:#111;font-size:13px;letter-spacing:0.3px">' +
          'Interior view not available</div>';
        delete div.dataset.svInit; // allow retry if location changes
      }
    });
  });
}

// ══════════════════════════════════════════════════════════════════
// ANALYTICS — User Behaviour Tracking
// ══════════════════════════════════════════════════════════════════
// Stores per-location click and search counts in localStorage.
// Key: 'aw_analytics_v1'  Value: { [locId]: { c: clicks, s: searches, lv: lastVisit } }
// Review counts come from the existing 'archwander_reviews_v1' key.
// This data is also readable by analytics-tool.html (same GitHub Pages origin).

var AW_ANALYTICS_KEY = 'aw_analytics_v1';

function _awReadStats() {
  try { return JSON.parse(localStorage.getItem(AW_ANALYTICS_KEY) || '{}'); } catch(e) { return {}; }
}
function _awWriteStats(data) {
  try { localStorage.setItem(AW_ANALYTICS_KEY, JSON.stringify(data)); } catch(e) {}
}

var awStats = {
  // Track a location click (called when user opens a location panel)
  click(locId) {
    const d = _awReadStats();
    if (!d[locId]) d[locId] = { c: 0, s: 0, lv: 0 };
    d[locId].c = (d[locId].c || 0) + 1;
    d[locId].lv = Date.now();
    _awWriteStats(d);
  },

  // Track search result appearances (called after search renders results)
  // locIds: array of location ids that appeared in results
  search(locIds) {
    if (!locIds || !locIds.length) return;
    const d = _awReadStats();
    locIds.forEach(id => {
      if (!d[id]) d[id] = { c: 0, s: 0, lv: 0 };
      d[id].s = (d[id].s || 0) + 1;
    });
    _awWriteStats(d);
  },

  // Get clicks for a location (0 if not tracked yet)
  getClicks(locId) { return (_awReadStats()[locId]?.c) || 0; },

  // Get searches for a location
  getSearches(locId) { return (_awReadStats()[locId]?.s) || 0; },

  // Get review count from existing review store
  getReviews(locId) {
    try {
      const all = JSON.parse(localStorage.getItem('archwander_reviews_v1') || '{}');
      return (all[locId] || []).length;
    } catch(e) { return 0; }
  },

  // Reset all analytics data
  resetAll() { localStorage.removeItem(AW_ANALYTICS_KEY); },

  // Reset a single location
  resetLoc(locId) {
    const d = _awReadStats();
    delete d[locId];
    _awWriteStats(d);
  },

  // Full snapshot (for analytics tool interop)
  snapshot() { return _awReadStats(); }
};

// Debounced search tracker — fires 800ms after the user stops typing
var _awSearchTimer = null;
function _awTrackSearchDebounced(locIds) {
  clearTimeout(_awSearchTimer);
  _awSearchTimer = setTimeout(() => {
    if (locIds && locIds.length) awStats.search(locIds);
  }, 800);
}

// ══════════════════════════════════════════════════════════════════
// FILTERED + SORTED LIST
// ══════════════════════════════════════════════════════════════════
function getFiltered() {
  let list = LOCS.filter(l => l.city === activeCityKey);
  if (state.cat.length)    list = list.filter(l => state.cat.some(c => _allCats(l).includes(c)));
  if (state.style.length)  list = list.filter(l => state.style.some(s => _allSGs(l).includes(s)));
  if (state.era.length) {
    list = list.filter(l => state.era.some(e => { const [mn, mx] = ERA_RANGE[e]; return l.yr >= mn && l.yr < mx; }));
  }
  if (state.access.length) list = list.filter(l => state.access.includes(l.access));
  if (state.arch  !== 'All') list = list.filter(l => (l.archs || [l.arch]).includes(state.arch));
  if (state.hood  !== 'All') list = list.filter(l => l.hood === state.hood);
  if (state.fav === '★ Favorites') list = list.filter(l => _favSet.has(l.id));
  if (state.fav === '✓ Visited')   list = list.filter(l => _visSet.has(l.id));
  if (state.query) {
    const q = state.query.toLowerCase();
    list = list.filter(l =>
      l.name.toLowerCase().includes(q) || (l.arch||'').toLowerCase().includes(q) ||
      (l.style||'').toLowerCase().includes(q) || (l.hood||'').toLowerCase().includes(q) ||
      _allSGs(l).some(s => s.toLowerCase().includes(q)) ||
      _allCats(l).some(c => c.toLowerCase().includes(q)) ||
      l.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  // "I feel like…" theme filter (OR logic across selected themes)
  if (state.themes.length) {
    list = list.filter(function(l) {
      return state.themes.some(function(tk) {
        var td = THEME_DEFS.find(function(d){ return d.key === tk; });
        return td && td.filter(l);
      });
    });
  }
  // Walk distance filter
  if (walkActive && walkOrigin) {
    const minutes  = parseInt(document.getElementById('walk-slider').value, 10);
    const maxDist  = minutes * 80; // ~80 m/min ≈ 4.8 km/h
    list = list.filter(l => haversineM(walkOrigin.lat, walkOrigin.lng, l.lat, l.lng) <= maxDist);
  }
  // Sort — default is oldest-first (year-asc)
  if (state.sort === 'default' || state.sort === 'year-asc')  list = [...list].sort((a,b) => (a.yr||9999) - (b.yr||9999));
  if (state.sort === 'year-desc') list = [...list].sort((a,b) => (b.yr||0) - (a.yr||0));
  if (state.sort === 'name')      list = [...list].sort((a,b) => a.name.localeCompare(b.name));
  if (state.sort === 'clicks')    list = [...list].sort((a,b) => awStats.getClicks(b.id)   - awStats.getClicks(a.id));
  if (state.sort === 'searches')  list = [...list].sort((a,b) => awStats.getSearches(b.id) - awStats.getSearches(a.id));
  if (state.sort === 'reviews')   list = [...list].sort((a,b) => awStats.getReviews(b.id)  - awStats.getReviews(a.id));
  return list;
}

document.getElementById('search').addEventListener('input', function() {
  state.query = this.value;
  renderList();
  syncMarkers();
});

// ══════════════════════════════════════════════════════════════════
// RENDER LIST
// ══════════════════════════════════════════════════════════════════
var activeLoc = null;

function cardThumb(loc) {
  const m = _ccMeta(loc);
  if (m.icon) {
    return `<div class="card-thumb-icon" style="background-image:url('${m.icon}');background-color:${m.bg}" title="${_allCats(loc).join(', ')}"></div>`;
  }
  return `<img class="card-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background:#e8e8e4">`;
}

function renderList() {
  const list = getFiltered();
  document.getElementById('list-meta').textContent = t('loc_count')(list.length);
  // Track search appearances when user has an active query
  if (state.query && list.length) _awTrackSearchDebounced(list.map(l => l.id));

  const wrap = document.getElementById('loc-list');
  if (!list.length) {
    wrap.innerHTML = `<div class="no-results">${t('no_results')}</div>`;
    return;
  }
  wrap.innerHTML = list.map(loc => `
    <div class="loc-card${activeLoc?.id === loc.id ? ' active' : ''}" onclick="openLocById('${loc.id}')">
      ${cardThumb(loc)}
      <div class="card-body">
        <div class="card-name">${_displayName(loc)}</div>
        <div class="card-meta">${loc.arch}</div>
        <div class="card-row">
          ${_allCats(loc).map((c,i) => `<span class="cat-badge ${i===0 ? _pCC(loc) : (CAT_CC_MAP[c]||'c-lmk')}">${c}</span>`).join(' ')}
          <span class="year-badge">${loc.yr}</span>
          ${loc.access ? `<span class="access-badge ${ACCESS_META[loc.access]?.cls||''}">${ACCESS_META[loc.access]?.icon||''} ${loc.access}</span>` : ''}
          ${(()=>{ const rv=loadReviews(loc.id); return rv.length ? `<span style="font-size:10px;color:#F59E0B;letter-spacing:0.5px">★ ${(rv.reduce((s,r)=>s+r.stars,0)/rv.length).toFixed(1)}</span>` : ''; })()}
        </div>
      </div>
      <div class="card-fav-btns" onclick="event.stopPropagation()">
        <button class="card-fav-btn${isFav(loc.id)?' active':''}" onclick="toggleFav('${loc.id}');this.classList.toggle('active');this.textContent=this.classList.contains('active')?'★':'☆'" title="${t('fav_label')}">
          ${isFav(loc.id)?'★':'☆'}
        </button>
        <button class="card-vis-btn${isVisited(loc.id)?' active':''}" onclick="toggleVisited('${loc.id}');this.classList.toggle('active');this.textContent=this.classList.contains('active')?'✓':'○'" title="${t('vis_label')}">
          ${isVisited(loc.id)?'✓':'○'}
        </button>
      </div>
    </div>
  `).join('');
}

function syncMarkers() {
  const visible = new Set(getFiltered().map(l => l.id));
  // When route is active, hide the regular flag markers for route stops
  // (numbered route markers take their place, avoiding the double-marker overlap)
  const routeIds = (typeof routeActive !== 'undefined' && routeActive &&
                    typeof routeLocations !== 'undefined')
    ? new Set(routeLocations.map(l => l.id)) : new Set();

  // In favorites mode, fav/visited markers bypass the cluster group
  // so they remain individually visible at any zoom level.
  const favMode = typeof _favFilterActive !== 'undefined' && _favFilterActive;
  const favVisIds = favMode
    ? new Set([...(typeof _favSet !== 'undefined' ? [..._favSet] : []),
               ...(typeof _visSet !== 'undefined' ? [..._visSet] : [])])
    : new Set();

  clusterGroup.clearLayers();
  markers.forEach(({ loc, m }) => {
    const show = visible.has(loc.id) && !routeIds.has(loc.id);
    const bypass = favMode && favVisIds.has(loc.id);

    if (!show) {
      // Not visible — remove from direct map layer if it was there
      if (map.hasLayer(m)) map.removeLayer(m);
    } else if (bypass) {
      // Fav/visited in favorites mode: add directly to map (no clustering)
      if (!map.hasLayer(m)) map.addLayer(m);
    } else {
      // Normal: remove from direct layer and add to cluster
      if (map.hasLayer(m)) map.removeLayer(m);
      clusterGroup.addLayer(m);
    }
  });
}

// ── List Overlay ──────────────────────────────────────────────
function _openListOverlay() {
  // On mobile, close sidebar first (it overlaps the map). On desktop, keep sidebar open.
  if (window.innerWidth <= 900 && typeof closeSidebar === 'function') closeSidebar();
  var ov = document.getElementById('list-overlay');
  if (!ov) return;
  ov.style.display = 'flex';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { ov.classList.add('visible'); });
  });
  // Re-render list into overlay
  if (typeof renderList === 'function') renderList();
}

function _closeListOverlay() {
  var ov = document.getElementById('list-overlay');
  if (!ov) return;
  ov.classList.remove('visible');
  setTimeout(function() { ov.style.display = 'none'; }, 220);
}

// ══════════════════════════════════════════════════════════════════
// DETAIL PANEL
// ══════════════════════════════════════════════════════════════════
var photoIdx = 0;

function photoUrl(u, mob, role) {
  if (!u) return u;
  // Determine target width by role and viewport
  let w;
  if      (role === 'card')    w = mob ? 80  : 120;   // sidebar thumbnail
  else if (role === 'gallery') w = mob ? 480 : 700;   // gallery panel
  else                         w = mob ? 500 : 800;   // legacy / default

  // Pattern 1: Wikimedia Commons /thumb/hash1/hash2/filename/NNNpx-filename
  // e.g. https://upload.wikimedia.org/wikipedia/commons/thumb/a/b/File.jpg/800px-File.jpg
  const thumbMatch = u.match(/^(https?:\/\/upload\.wikimedia\.org\/.+\/thumb\/[^/]+\/[^/]+\/[^/]+\/)(\d+)px-(.+)$/);
  if (thumbMatch) return `${thumbMatch[1]}${w}px-${thumbMatch[3]}`;

  // Pattern 2: Wikimedia Commons Special:FilePath?width=NNN
  if (u.includes('Special:FilePath') && u.includes('?width='))
    return u.replace(/\?width=\d+/, `?width=${w}`);

  // Pattern 3: Generic ?width= parameter
  if (u.includes('?width='))
    return u.replace(/\?width=\d+/, `?width=${w}`);

  return u;
}

function openLocById(id) { awStats.click(id); openLoc(LOCS.find(l => l.id === id)); }

function openLoc(loc) {
  _closeListOverlay();  // close list overlay if open
  activeLoc = loc;
  map.flyTo([loc.lat, loc.lng], 16, { duration:1.1 });

  // Gallery
  photoIdx = 0;
  const gallery = document.getElementById('gallery');
  const isMob = window.innerWidth < 768;
  gallery.querySelectorAll('img').forEach(i => i.remove());
  // Remove any previous Street View iframes (exterior + interior)
  gallery.querySelectorAll('.sv-fallback, .sv-fallback-int').forEach(function(el){ el.remove(); });
  gallery.classList.remove('sv-mode');
  // Reset single attribution overlay
  const gAttrib = document.getElementById('g-attrib');
  if (gAttrib) { gAttrib.textContent = ''; gAttrib.style.display = 'none'; }

  var hasPhotos = loc.photos && loc.photos.length > 0;
  var hasSV = typeof GOOGLE_MAPS_API_KEY === 'string' && GOOGLE_MAPS_API_KEY;
  var photoCount = hasPhotos ? loc.photos.length : 0;
  // Normalize svInt → always an array (backward compat: single object → [obj])
  var svIntArr = hasSV ? (Array.isArray(loc.svInt) ? loc.svInt : (loc.svInt ? [loc.svInt] : [])) : [];
  var hasIntSV = svIntArr.length > 0;
  var totalSlides = photoCount + (hasSV ? 1 : 0) + svIntArr.length;

  // Add photo images
  var _photoFails = 0;
  if (hasPhotos) {
    loc.photos.forEach((src, i) => {
      const img = document.createElement('img');
      img.alt = loc.name;
      img.dataset.photoUrl = src;
      if (i === 0) {
        img.src = photoUrl(src, isMob, 'gallery');
        img.classList.add('active');
      } else {
        img.dataset.src = photoUrl(src, isMob, 'gallery');
        img.loading = 'lazy';
      }
      img.onerror = function() {
        this.style.display = 'none';
        _photoFails++;
        // All photos failed → auto-switch to Street View
        if (_photoFails >= photoCount && hasSV) {
          gallery.classList.add('sv-mode');
          var sv = gallery.querySelector('.sv-fallback');
          if (sv) sv.style.display = '';
          gotoPhoto(photoCount);
        }
      };
      gallery.insertBefore(img, gallery.querySelector('.g-btn'));
    });
    applyPhotoAttribution(gallery, loc.photos);
  }

  // Add Street View iframes (exterior always, interior only if svInt exists)
  if (hasSV) {
    // ── Exterior SV ──
    var svIframe = document.createElement('iframe');
    svIframe.className = 'sv-fallback';
    svIframe.setAttribute('loading', 'lazy');
    svIframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    svIframe.setAttribute('allowfullscreen', '');
    svIframe.setAttribute('allow', 'accelerometer; gyroscope; magnetometer; fullscreen');
    var svH   = (loc.sv && loc.sv.heading != null) ? loc.sv.heading : 210;
    var svP   = (loc.sv && loc.sv.pitch   != null) ? loc.sv.pitch   : 10;
    var svF   = Math.min(100, Math.max(10, (loc.sv && loc.sv.fov != null) ? loc.sv.fov : 90)); // Embed API: 10–100
    var svS   = (loc.sv && loc.sv.source)           ? loc.sv.source  : 'outdoor';
    var svLat = (loc.sv && loc.sv.lat     != null)  ? loc.sv.lat     : loc.lat;
    var svLng = (loc.sv && loc.sv.lng     != null)  ? loc.sv.lng     : loc.lng;
    svIframe.src = 'https://www.google.com/maps/embed/v1/streetview?key=' +
      GOOGLE_MAPS_API_KEY + '&location=' + svLat + ',' + svLng +
      '&heading=' + svH + '&pitch=' + svP + '&fov=' + svF + '&source=' + svS;
    if (hasPhotos) svIframe.style.display = 'none';
    gallery.insertBefore(svIframe, gallery.querySelector('.g-btn'));
    if (!hasPhotos) gallery.classList.add('sv-mode');

    // ── Interior SV slides (Google Maps JS API — fully interactive) ──
    // Uses StreetViewPanorama (not Embed iframe) so both panoId and
    // location+source=DEFAULT modes show interactive 360° panoramas.
    svIntArr.forEach(function(si, i) {
      var svIntDiv = document.createElement('div');
      svIntDiv.className = 'sv-fallback-int';
      svIntDiv.dataset.intIndex = i;
      svIntDiv.style.display = 'none';
      svIntDiv.dataset.svCfg = JSON.stringify({
        panoId: si.panoId || null,
        lat: (si.lat != null) ? si.lat : loc.lat,
        lng: (si.lng != null) ? si.lng : loc.lng,
        h: (si.heading != null) ? si.heading : 0,
        p: (si.pitch   != null) ? si.pitch   : 0,
        f: Math.min(100, Math.max(10, (si.fov != null) ? si.fov : 90))
      });
      gallery.insertBefore(svIntDiv, gallery.querySelector('.g-btn'));
    });
  }

  // Build dots for all slides
  if (totalSlides > 0) {
    var dotsHtml = '';
    for (var di = 0; di < totalSlides; di++) {
      var isSvDot    = di === photoCount && hasSV;
      var intIdx     = di - photoCount - (hasSV ? 1 : 0);
      var isSvIntDot = hasIntSV && intIdx >= 0 && intIdx < svIntArr.length;
      dotsHtml += '<div class="g-dot' + (di === 0 ? ' active' : '') +
        (isSvDot ? ' sv-dot' : '') +
        (isSvIntDot ? ' sv-int-dot' : '') +
        '" onclick="gotoPhoto(' + di + ')"></div>';
    }
    document.getElementById('g-dots').innerHTML = dotsHtml;
    updateGLabel();
  } else {
    document.getElementById('g-dots').innerHTML = '';
    document.getElementById('g-label').textContent = '0 / 0';
  }

  // Header
  const color = _ccMeta(loc).color;
  const biName = _displayName(loc);
  const catBadges = _allCats(loc).map((c,i) => `<span class="cat-badge ${i===0 ? _pCC(loc) : (CAT_CC_MAP[c]||'c-lmk')}" style="font-size:11px;margin-right:4px">${c}</span>`).join('');
  document.getElementById('panel-head').innerHTML = `
    <div class="p-cat">${catBadges}</div>
    <div class="p-title">${biName}</div>
    <div class="p-sub">${loc.arch}${(loc.archs && loc.archs.length > 1) ? ' + '+(loc.archs.length-1) : ''} &nbsp;·&nbsp; ${loc.yr}</div>
    <div class="p-tags">${loc.tags.map(t=>`<span class="p-tag">${t}</span>`).join('')}</div>
    <div class="p-action-row">
      <button class="p-action-btn${isFav(loc.id)?' fav-active':''}" id="p-fav-btn" onclick="toggleFav('${loc.id}')"><span class="act-icon">${isFav(loc.id)?'★':'☆'}</span> ${t('fav_label')}</button>
      <button class="p-action-btn${isVisited(loc.id)?' vis-active':''}" id="p-vis-btn" onclick="toggleVisited('${loc.id}')"><span class="act-icon">${isVisited(loc.id)?'✓':'○'}</span> ${t('vis_label')}</button>
    </div>
    <div class="visit-section" id="visit-section-${loc.id}" ${isVisited(loc.id)?'':'style="display:none"'}>
      ${isVisited(loc.id) ? (typeof _buildVisitSectionHTML === 'function' ? _buildVisitSectionHTML(loc.id) : '') : ''}
    </div>
  `;

  // Always render English immediately (instant), then apply Korean on-demand.
  // applyLocTranslation() serves from localStorage cache (instant) or API (~200-500ms).
  _hideTransBar();
  document.getElementById('pane-overview').innerHTML = buildOverviewTab(loc, {});
  document.getElementById('pane-visit').innerHTML    = buildVisitTab(loc, {});
  document.getElementById('pane-here').innerHTML     = buildDirectionsTab(loc, {});
  if (LANG === 'ko') applyLocTranslation(loc);
  document.getElementById('pane-audio').innerHTML   = buildAudioGuideShell();
  document.getElementById('pane-reviews').innerHTML  = buildReviewsTab(loc);

  switchTab('overview');
  document.getElementById('panel').classList.add('open');
  history.pushState({ view: 'panel', locId: loc.id }, '');
  if (window.innerWidth <= 900) { const _pb = document.getElementById('panel-backdrop'); if (_pb) _pb.classList.add('visible'); }
  renderList();

  if (window.innerWidth <= 900) document.getElementById('sidebar').classList.remove('open');
  const bd2=document.getElementById('sidebar-backdrop');if(bd2)bd2.classList.remove('visible');

  // Hide radius ctrl button while detail panel is open
  var _rctrl = document.getElementById('walk-radius-ctrl-btn');
  if (_rctrl) _rctrl.style.display = 'none';
}

function closePanel() {
  if (typeof agStop === 'function') agStop();
  _agLoaded = null; // reset so audio tab reloads when re-opening same location
  _clearWalkRoute();
  var _panelEl = document.getElementById('panel');
  _panelEl.classList.remove('open');
  _panelEl.classList.remove('panel-fullscreen'); // reset full-screen state
  const _pb2 = document.getElementById('panel-backdrop'); if (_pb2) _pb2.classList.remove('visible');
  activeLoc = null;
  renderList();
  updateMarkerSize();

  // Restore radius ctrl button if Near Me is active and float is dismissed
  var _rctrl = document.getElementById('walk-radius-ctrl-btn');
  if (_rctrl && typeof nearMeActive !== 'undefined' && nearMeActive) {
    var _wrf = document.getElementById('walk-radius-float');
    if (_wrf && !_wrf.classList.contains('visible')) _rctrl.style.display = 'flex';
  }
}

// ══════════════════════════════════════════════════════════════════
// TAB BUILDERS
// ══════════════════════════════════════════════════════════════════
function buildOverviewTab(loc, trans = {}) {
  const desc = trans.desc || loc.desc;
  return `
    <p class="desc">${desc}</p>
    <div class="info-row"><span class="info-label">${t('neighborhood')}</span><span class="info-val">${_displayHood(loc, trans.hood)}</span></div>
    <div class="info-row"><span class="info-label">${t('address')}</span><span class="info-val">${_displayAddr(loc, trans.addr)}</span></div>
    <div class="info-row"><span class="info-label">${t('arch_label')}</span><span class="info-val">${(loc.archs && loc.archs.length) ? loc.archs.join(', ') : (loc.arch || '—')}</span></div>
    <div class="info-row"><span class="info-label">${t('completed')}</span><span class="info-val">${loc.yr}</span></div>
    <div class="info-row"><span class="info-label">${t('style_label')}</span><span class="info-val">${_allSGs(loc).join(', ') || '—'}</span></div>
    ${loc.access ? `<div class="info-row"><span class="info-label">${t('access_label')}</span><span class="info-val"><span class="access-badge ${ACCESS_META[loc.access]?.cls||''}">${ACCESS_META[loc.access]?.icon||''} ${loc.access}</span></span></div>` : ''}
  `;
}

function buildVisitTab(loc, trans = {}) {
  const hours     = trans.hours     || loc.hours;
  const lastEntry = trans.lastEntry || loc.lastEntry;
  const admission = trans.admission || loc.admission;
  const tourInfo  = trans.tourInfo  || loc.tourInfo;
  return `
    <div class="info-row"><span class="info-label">${t('hours')}</span><span class="info-val">${hours}</span></div>
    ${loc.lastEntry && loc.lastEntry !== 'N/A' ? `<div class="info-row"><span class="info-label">${t('last_entry')}</span><span class="info-val">${lastEntry}</span></div>` : ''}
    <div class="info-row"><span class="info-label">${t('admission')}</span><span class="info-val">${admission}</span></div>
    <div class="info-row">
      <span class="info-label">${t('guided_tour')}</span>
      <span class="info-val"><span class="tour-badge ${loc.tourOk ? 'tour-yes' : 'tour-no'}">${loc.tourOk ? t('tour_yes') : t('tour_no')}</span></span>
    </div>
    ${loc.tourInfo ? `<div class="info-row"><span class="info-label">${t('tour_info')}</span><span class="info-val">${tourInfo}</span></div>` : ''}
    ${loc.web ? `<div class="btns"><a href="${loc.web}" target="_blank" rel="noopener" class="btn-p">${t('visit_website')}</a></div>` : ''}
  `;
}

function buildDirectionsTab(loc, trans = {}) {
  const transit  = trans.transit  || loc.transit;
  const walkFrom = trans.walkFrom || loc.walkFrom;
  const showWalkBtn = nearMeActive && walkOrigin;
  return `
    ${showWalkBtn ? `<button class="btn-walk-route" onclick="triggerWalkingRoute()">🚶 ${window.innerWidth <= 900 ? 'See walking path' : 'Walking Path'}</button>` : ''}
    <div class="info-row" style="margin-top:${showWalkBtn ? '12' : '0'}px"><span class="info-label">${t('subway')}</span><span class="info-val">${transit}</span></div>
    ${loc.walkFrom ? `<div class="info-row"><span class="info-label">${t('nearby')}</span><span class="info-val">${walkFrom}</span></div>` : ''}
    <div class="btns" style="margin-top:18px">
      <a href="${loc.gmaps}" target="_blank" rel="noopener" class="btn-p">${t('open_gmaps')}</a>
      <a href="https://maps.google.com/?q=${encodeURIComponent(loc.addr)}&layer=c" target="_blank" rel="noopener" class="btn-s">${t('sv_gmaps')}</a>
    </div>
  `;
}