// TABS
// ══════════════════════════════════════════════════════════════════
function switchTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.id === 'pane-' + id));
  if (id === 'audio' && activeLoc) loadAudioGuideTab(activeLoc);
  // Desktop: auto-show walking route when switching to Directions tab during Near Me
  if (id === 'here' && activeLoc && nearMeActive && walkOrigin && window.innerWidth > 900) {
    triggerWalkingRoute();
  }
  // Clear route when leaving Directions tab
  if (id !== 'here' && walkRouteLine) _clearWalkRoute();
  // Stop audio when leaving audio tab
  if (id !== 'audio') agStop();
  // Hide photo gallery when Audio tab is active on mobile — more space for script
  const gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.style.display = (id === 'audio' && window.innerWidth <= 900) ? 'none' : '';
  }
}

// ══════════════════════════════════════════════════════════════════
// PHOTOS
// ══════════════════════════════════════════════════════════════════
function _gallerySlideCount() {
  if (!activeLoc) return 0;
  var n = activeLoc.photos ? activeLoc.photos.length : 0;
  var _hasApiKey = typeof GOOGLE_MAPS_API_KEY === 'string' && GOOGLE_MAPS_API_KEY;
  var hasSV = _hasApiKey && !!activeLoc.sv; // exterior SV only when sv is configured
  var svIntArr = _hasApiKey ? (Array.isArray(activeLoc.svInt) ? activeLoc.svInt : (activeLoc.svInt ? [activeLoc.svInt] : [])) : [];
  return n + (hasSV ? 1 : 0) + svIntArr.length;
}
function gotoPhoto(idx) {
  var gallery = document.getElementById('gallery');
  var imgs = Array.from(gallery.querySelectorAll('img'));
  var svExt = gallery.querySelector('.sv-fallback');
  var svIntFrames = Array.from(gallery.querySelectorAll('.sv-fallback-int'));
  var photoCount = activeLoc && activeLoc.photos ? activeLoc.photos.length : 0;
  var hasExtSV = !!svExt; // check actual DOM — exterior SV only exists when loc.sv was configured
  var isSVExt = hasExtSV && idx === photoCount;
  // intRelIdx accounts for whether exterior SV slot exists (avoids off-by-one when sv is null)
  var intRelIdx = idx - photoCount - (hasExtSV ? 1 : 0);
  var isSVInt = svIntFrames.length > 0 && intRelIdx >= 0 && intRelIdx < svIntFrames.length;
  var isSV = isSVExt || isSVInt;

  // Toggle images: hide all, show active photo (or none if SV)
  imgs.forEach(function(img, i) { img.classList.toggle('active', !isSV && i === idx); });

  // Toggle exterior SV iframe
  if (svExt) {
    svExt.style.display = isSVExt ? '' : 'none';
    // Request iOS gyroscope permission when SV becomes visible (user-gesture context)
    if (isSVExt && typeof _requestMotionPermission === 'function') _requestMotionPermission();
  }

  // Toggle interior SV divs — show only the matching one, init JS API on first show
  svIntFrames.forEach(function(fr, fi) {
    var show = isSVInt && fi === intRelIdx;
    fr.style.display = show ? '' : 'none';
    if (show && typeof initIntSVPane === 'function') initIntSVPane(fr);
  });

  gallery.classList.toggle('sv-mode', isSV);

  // Load deferred image
  if (!isSV && imgs[idx]) {
    var cur = imgs[idx];
    if (cur.dataset.src) { cur.src = cur.dataset.src; delete cur.dataset.src; }
  }

  // Update dots
  document.getElementById('g-dots').querySelectorAll('.g-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === idx);
  });

  photoIdx = idx;
  updateGLabel();

  // Attribution
  var attribEl = document.getElementById('g-attrib');
  if (attribEl) {
    var text = (!isSV && imgs[idx]) ? (imgs[idx].dataset.attrib || '') : '';
    attribEl.textContent = text;
    attribEl.style.display = text ? '' : 'none';
  }

  // Preload next image
  if (!isSV && imgs[idx + 1] && imgs[idx + 1].dataset.src) {
    imgs[idx + 1].src = imgs[idx + 1].dataset.src;
    delete imgs[idx + 1].dataset.src;
  }
}
function updateGLabel() {
  if (!activeLoc) return;
  var photoCount = activeLoc.photos ? activeLoc.photos.length : 0;
  var _hasApiKey = typeof GOOGLE_MAPS_API_KEY === 'string' && GOOGLE_MAPS_API_KEY;
  var hasSV = _hasApiKey && !!activeLoc.sv; // exterior SV only when sv is configured
  var svIntArr = _hasApiKey ? (Array.isArray(activeLoc.svInt) ? activeLoc.svInt : (activeLoc.svInt ? [activeLoc.svInt] : [])) : [];
  var isSVExt = hasSV && photoIdx === photoCount;
  var intRelIdx = photoIdx - photoCount - (hasSV ? 1 : 0); // consistent with gotoPhoto
  var isSVInt = svIntArr.length > 0 && intRelIdx >= 0 && intRelIdx < svIntArr.length;
  var label;
  if (isSVInt) {
    label = svIntArr.length > 1
      ? 'Street View · Interior ' + (intRelIdx + 1) + '/' + svIntArr.length
      : 'Street View · Interior';
  } else if (isSVExt) {
    label = 'Street View · Exterior';
  } else {
    label = (photoIdx + 1) + ' / ' + photoCount;
  }
  document.getElementById('g-label').textContent = label;
}
function prevPhoto() { if (activeLoc) { var t = _gallerySlideCount(); gotoPhoto((photoIdx - 1 + t) % t); } }
function nextPhoto() { if (activeLoc) { var t = _gallerySlideCount(); gotoPhoto((photoIdx + 1) % t); } }
async function applyPhotoAttribution(galleryEl, photos) {
  if (!galleryEl || !photos) return;
  const imgs = Array.from(galleryEl.querySelectorAll('img'));
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    const url = img.dataset.photoUrl;
    if (!url) continue;
    try {
      const lic = await fetchWikiLicense(url);
      if (lic.needsAttrib && lic.artist) {
        // Store attribution text on the img element — shown via single #g-attrib overlay
        img.dataset.attrib = `© ${lic.artist.slice(0, 40)} · ${lic.license}`;
        // If this is the currently visible photo, update the overlay immediately
        if (i === photoIdx) {
          const attribEl = document.getElementById('g-attrib');
          if (attribEl) { attribEl.textContent = img.dataset.attrib; attribEl.style.display = ''; }
        }
      }
    } catch(e) {
      // Silently ignore fetch errors
    }
  }
}

// ══════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════
// SIDEBAR DRAG RESIZE
// ══════════════════════════════════════════════════════════════════
function setupVDrag(handleId, targetId, minH, maxH) {
  const handle = document.getElementById(handleId);
  const target = document.getElementById(targetId);
  if (!handle || !target) return;
  let dragging = false, startY = 0, startH = 0;

  const start = y => {
    dragging = true; startY = y; startH = target.offsetHeight;
    target.style.flexShrink = '0';
    handle.classList.add('dragging');
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };
  const move = y => {
    if (!dragging) return;
    const _min = typeof minH === 'function' ? minH() : minH;
    target.style.height = Math.max(_min, Math.min(maxH, startH + y - startY)) + 'px';
  };
  const end = () => {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  handle.addEventListener('mousedown', e => { e.preventDefault(); start(e.clientY); });
  document.addEventListener('mousemove', e => move(e.clientY));
  document.addEventListener('mouseup', end);
  handle.addEventListener('touchstart', e => { e.preventDefault(); start(e.touches[0].clientY); }, { passive: false });
  document.addEventListener('touchmove', e => { if (dragging) { e.preventDefault(); move(e.touches[0].clientY); } }, { passive: false });
  document.addEventListener('touchend', end);
}

function setupHDrag(handleId, targetId, minW, maxW) {
  const handle = document.getElementById(handleId);
  const target = document.getElementById(targetId);
  if (!handle || !target) return;
  let dragging = false, startX = 0, startW = 0;

  const start = x => {
    dragging = true; startX = x; startW = target.offsetWidth;
    handle.classList.add('dragging');
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };
  const move = x => {
    if (!dragging) return;
    const w = Math.max(minW, Math.min(maxW, startW + x - startX));
    target.style.width = w + 'px';
    document.documentElement.style.setProperty('--sidebar-w', w + 'px');
    if (map) map.invalidateSize();
  };
  const end = () => {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  handle.addEventListener('mousedown', e => { e.preventDefault(); start(e.clientX); });
  document.addEventListener('mousemove', e => move(e.clientX));
  document.addEventListener('mouseup', end);
  handle.addEventListener('touchstart', e => { e.preventDefault(); start(e.touches[0].clientX); }, { passive: false });
  document.addEventListener('touchmove', e => { if (dragging) { e.preventDefault(); move(e.touches[0].clientX); } }, { passive: false });
  document.addEventListener('touchend', end);
}

// Drag-resize from LEFT edge (for right panel — dragging left = wider)
function setupHDragLeft(handleId, targetId, minW, maxW) {
  const handle = document.getElementById(handleId);
  const target = document.getElementById(targetId);
  if (!handle || !target) return;
  let dragging = false, startX = 0, startW = 0;

  const start = x => {
    dragging = true; startX = x; startW = target.offsetWidth;
    handle.classList.add('dragging');
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };
  const move = x => {
    if (!dragging) return;
    // Drag left → increase width; drag right → decrease width
    const w = Math.max(minW, Math.min(maxW, startW + startX - x));
    target.style.width = w + 'px';
    document.documentElement.style.setProperty('--panel-w', w + 'px');
    if (map) map.invalidateSize();
  };
  const end = () => {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  handle.addEventListener('mousedown', e => { e.preventDefault(); start(e.clientX); });
  document.addEventListener('mousemove', e => move(e.clientX));
  document.addEventListener('mouseup', end);
  handle.addEventListener('touchstart', e => { e.preventDefault(); start(e.touches[0].clientX); }, { passive: false });
  document.addEventListener('touchmove', e => { if (dragging) { e.preventDefault(); move(e.touches[0].clientX); } }, { passive: false });
  document.addEventListener('touchend', end);
}

// ══════════════════════════════════════════════════════════════════




// ══════════════════════════════════════════════════════════════════
// PER-SECTION FILTER DRAG RESIZE
// ══════════════════════════════════════════════════════════════════
function setupBodyDrag(handleId, bodyId, minH, maxH) {
  const handle = document.getElementById(handleId);
  const body   = document.getElementById(bodyId);
  if (!handle || !body) return;
  let dragging = false, startY = 0, startH = 0;

  const start = y => {
    dragging = true; startY = y; startH = body.offsetHeight;
    handle.classList.add('dragging');
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };
  const move = y => {
    if (!dragging) return;
    body.style.maxHeight = Math.max(minH, Math.min(maxH, startH + y - startY)) + 'px';
  };
  const end = () => {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  handle.addEventListener('mousedown', e => { e.preventDefault(); start(e.clientY); });
  document.addEventListener('mousemove', e => move(e.clientY));
  document.addEventListener('mouseup', end);
  handle.addEventListener('touchstart', e => { e.preventDefault(); start(e.touches[0].clientY); }, { passive: false });
  document.addEventListener('touchmove', e => { if (dragging) { e.preventDefault(); move(e.touches[0].clientY); } }, { passive: false });
  document.addEventListener('touchend', end);
}

// ══════════════════════════════════════════════════════════════════
// REVIEWS & RATINGS
// ══════════════════════════════════════════════════════════════════
var REVIEWS_KEY = 'archwander_reviews_v1';

function loadReviews(locId) {
  try {
    const data = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
    return data[locId]?.reviews || [];
  } catch(e) { return []; }
}

function saveReview(locId, review) {
  try {
    const data = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
    if (!data[locId]) data[locId] = { reviews: [] };
    data[locId].reviews.unshift(review);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(data));
  } catch(e) { console.warn('Review save failed', e); }
}

function starsHtml(n, total = 5, size = 14) {
  let h = '';
  for (let i = 1; i <= total; i++)
    h += `<span style="color:${i <= n ? '#F59E0B' : '#DDD'};font-size:${size}px">★</span>`;
  return h;
}

var reviewStarState = {};

function hoverStar(locId, val) {
  document.querySelectorAll(`#star-sel-${locId} .star-btn`).forEach((b, i) => {
    b.style.color = (i + 1) <= val ? '#F59E0B' : '#DDD';
  });
}
function unhoverStar(locId) {
  const cur = reviewStarState[locId] || 0;
  document.querySelectorAll(`#star-sel-${locId} .star-btn`).forEach((b, i) => {
    b.style.color = (i + 1) <= cur ? '#F59E0B' : '#DDD';
  });
}
function setReviewStar(locId, val) {
  reviewStarState[locId] = val;
  document.querySelectorAll(`#star-sel-${locId} .star-btn`).forEach((b, i) => {
    b.classList.toggle('lit', (i + 1) <= val);
  });
}

function renderReviewList(reviews) {
  if (!reviews.length) return '<div class="review-empty">No reviews yet — be the first to share your experience!</div>';
  return reviews.map(r => `
    <div class="review-card">
      <div style="display:flex;align-items:center;gap:6px">
        <span class="review-card-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
        <span class="review-name-badge">${r.name}</span>
      </div>
      <div class="review-card-meta">${r.date}</div>
      ${r.text ? `<div class="review-card-text">${r.text}</div>` : ''}
    </div>
  `).join('');
}

function buildReviewsTab(loc) {
  const reviews = loadReviews(loc.id);
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.stars, 0) / reviews.length : 0;

  const avgBlock = reviews.length ? `
    <div class="review-avg">
      <div class="review-avg-score">${avg.toFixed(1)}</div>
      <div>
        <div class="review-avg-stars">${starsHtml(Math.round(avg), 5, 15)}</div>
        <div class="review-avg-count">${reviews.length} review${reviews.length !== 1 ? 's' : ''}</div>
      </div>
    </div>` : '';

  return `
    ${avgBlock}
    <div class="review-form">
      <div class="review-form-title">Write a Review</div>
      <div style="margin-bottom:10px">
        <div class="review-form-label">Your rating</div>
        <div class="star-selector" id="star-sel-${loc.id}">
          ${[1,2,3,4,5].map(i =>
            `<button class="star-btn" data-val="${i}"
              onmouseover="hoverStar('${loc.id}',${i})"
              onmouseout="unhoverStar('${loc.id}')"
              onclick="setReviewStar('${loc.id}',${i})">★</button>`
          ).join('')}
        </div>
      </div>
      <div style="margin-bottom:8px">
        <div class="review-form-label">Name (optional)</div>
        <input type="text" id="rev-name-${loc.id}" class="review-input" placeholder="Your name">
      </div>
      <div style="margin-bottom:2px">
        <div class="review-form-label">Review</div>
        <textarea id="rev-text-${loc.id}" class="review-textarea"
          placeholder="Share your experience visiting ${loc.name}…"></textarea>
      </div>
      <button class="review-submit" onclick="submitReview('${loc.id}')">Submit Review</button>
    </div>
    <div id="reviews-list-${loc.id}">${renderReviewList(reviews)}</div>
  `;
}

function submitReview(locId) {
  const stars = reviewStarState[locId] || 0;
  if (!stars) { alert('Please select a star rating first.'); return; }
  awStats.click(locId); // count review submission as an engagement

  const nameEl = document.getElementById(`rev-name-${locId}`);
  const textEl = document.getElementById(`rev-text-${locId}`);
  const name = (nameEl?.value.trim()) || 'Anonymous';
  const text = textEl?.value.trim() || '';

  saveReview(locId, {
    stars,
    name,
    text,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  });

  // Reset form
  delete reviewStarState[locId];
  document.querySelectorAll(`#star-sel-${locId} .star-btn`).forEach(b => {
    b.classList.remove('lit'); b.style.color = '';
  });
  if (nameEl) nameEl.value = '';
  if (textEl) textEl.value = '';

  // Refresh reviews list + avg block
  document.getElementById(`reviews-list-${locId}`).innerHTML = renderReviewList(loadReviews(locId));
  // Update avg display
  const reviews = loadReviews(locId);
  const avg = reviews.reduce((s, r) => s + r.stars, 0) / reviews.length;
  const avgEl = document.querySelector('.review-avg');
  if (avgEl) {
    avgEl.querySelector('.review-avg-score').textContent = avg.toFixed(1);
    avgEl.querySelector('.review-avg-stars').innerHTML = starsHtml(Math.round(avg), 5, 15);
    avgEl.querySelector('.review-avg-count').textContent = `${reviews.length} review${reviews.length !== 1 ? 's' : ''}`;
  } else {
    // Avg block didn't exist before (first review) — rebuild tab
    if (activeLoc?.id === locId) {
      document.getElementById('pane-reviews').innerHTML = buildReviewsTab(activeLoc);
    }
  }
  // Refresh sidebar card rating badge
  renderList();
}

// ══════════════════════════════════════════════════════════════════
