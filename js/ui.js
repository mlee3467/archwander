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
  var hasSV = typeof GOOGLE_MAPS_API_KEY === 'string' && GOOGLE_MAPS_API_KEY;
  var svIntArr = hasSV ? (Array.isArray(activeLoc.svInt) ? activeLoc.svInt : (activeLoc.svInt ? [activeLoc.svInt] : [])) : [];
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
  var hasSV = typeof GOOGLE_MAPS_API_KEY === 'string' && GOOGLE_MAPS_API_KEY;
  var svIntArr = hasSV ? (Array.isArray(activeLoc.svInt) ? activeLoc.svInt : (activeLoc.svInt ? [activeLoc.svInt] : [])) : [];
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
  // Also persist to Supabase (fire-and-forget)
  if (typeof _submitToSupabase === 'function') {
    _submitToSupabase('reviews', {
      loc_id:   locId,
      loc_name: (typeof activeLoc !== 'undefined' && activeLoc?.id === locId) ? activeLoc.name : null,
      city:     (typeof activeLoc !== 'undefined' && activeLoc?.id === locId) ? activeLoc.city : null,
      stars:    review.stars,
      name:     review.name,
      text:     review.text,
      lang:     typeof LANG !== 'undefined' ? LANG : 'en'
    });
  }
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

// Supabase row는 snake_case (loc_id, created_at), localStorage row는 camelCase
function _normalizeReview(r) {
  return {
    stars: r.stars,
    name:  r.name  || 'Anonymous',
    text:  r.text  || '',
    date:  r.date  || (r.created_at
      ? new Date(r.created_at).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })
      : '')
  };
}

function renderReviewList(reviews) {
  if (!reviews.length) return '<div class="review-empty">No reviews yet — be the first to share your experience!</div>';
  return reviews.map(r => {
    const n = _normalizeReview(r);
    return `
    <div class="review-card">
      <div style="display:flex;align-items:center;gap:6px">
        <span class="review-card-stars">${'★'.repeat(n.stars)}${'☆'.repeat(5 - n.stars)}</span>
        <span class="review-name-badge">${n.name}</span>
      </div>
      <div class="review-card-meta">${n.date}</div>
      ${n.text ? `<div class="review-card-text">${n.text}</div>` : ''}
    </div>`;
  }).join('');
}

function _updateReviewAvgBlock(reviews) {
  if (!reviews.length) return;
  const avg = reviews.reduce((s, r) => s + r.stars, 0) / reviews.length;
  const avgEl = document.querySelector('.review-avg');
  if (avgEl) {
    avgEl.querySelector('.review-avg-score').textContent = avg.toFixed(1);
    avgEl.querySelector('.review-avg-stars').innerHTML   = starsHtml(Math.round(avg), 5, 15);
    avgEl.querySelector('.review-avg-count').textContent = `${reviews.length} review${reviews.length !== 1 ? 's' : ''}`;
  }
}

// Supabase에서 locId의 리뷰를 가져와 DOM 갱신
function _fetchAndRenderReviews(locId) {
  if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL) return;
  if (typeof SUPABASE_ANON_KEY === 'undefined' || !SUPABASE_ANON_KEY) return;
  fetch(`${SUPABASE_URL}/rest/v1/reviews?loc_id=eq.${encodeURIComponent(locId)}&order=created_at.desc`, {
    headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + SUPABASE_ANON_KEY }
  })
  .then(r => r.ok ? r.json() : Promise.reject(r.status))
  .then(rows => {
    const listEl = document.getElementById(`reviews-list-${locId}`);
    if (!listEl) return; // 탭이 닫혔으면 무시
    if (!rows.length) return; // 결과 없으면 localStorage 그대로 유지
    listEl.innerHTML = renderReviewList(rows);
    _updateReviewAvgBlock(rows);
    renderList(); // 사이드바 rating 뱃지 갱신
  })
  .catch(() => {}); // 실패해도 localStorage 표시 유지
}

function buildReviewsTab(loc) {
  // 1) 즉시 localStorage로 렌더 (오프라인/초기 로드 대응)
  const localReviews = loadReviews(loc.id);
  const avg = localReviews.length ? localReviews.reduce((s, r) => s + r.stars, 0) / localReviews.length : 0;

  const avgBlock = localReviews.length ? `
    <div class="review-avg">
      <div class="review-avg-score">${avg.toFixed(1)}</div>
      <div>
        <div class="review-avg-stars">${starsHtml(Math.round(avg), 5, 15)}</div>
        <div class="review-avg-count">${localReviews.length} review${localReviews.length !== 1 ? 's' : ''}</div>
      </div>
    </div>` : '';

  const html = `
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
    <div id="reviews-list-${loc.id}">${renderReviewList(localReviews)}</div>
  `;

  // 2) 렌더 직후 Supabase에서 전체 리뷰 비동기 로드 (다른 디바이스 리뷰 포함)
  setTimeout(() => _fetchAndRenderReviews(loc.id), 0);

  return html;
}

function submitReview(locId) {
  const stars = reviewStarState[locId] || 0;
  if (!stars) { alert('Please select a star rating first.'); return; }
  awStats.click(locId);

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

  // 즉시 localStorage로 갱신 (즉각 피드백)
  const localReviews = loadReviews(locId);
  document.getElementById(`reviews-list-${locId}`).innerHTML = renderReviewList(localReviews);
  _updateReviewAvgBlock(localReviews);

  // Supabase 저장 완료 후 전체 리뷰 재로드 (약간 딜레이)
  setTimeout(() => {
    _fetchAndRenderReviews(locId);
    renderList();
  }, 800);

  // avg 블록 없으면 (첫 리뷰) 탭 전체 재렌더
  if (!document.querySelector('.review-avg') && activeLoc?.id === locId) {
    document.getElementById('pane-reviews').innerHTML = buildReviewsTab(activeLoc);
  }
}

// ══════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════
// SHARE
// ══════════════════════════════════════════════════════════════════
function _shareUrl() {
  if (!activeLoc) return '';
  return `https://www.google.com/maps/search/?api=1&query=${activeLoc.lat},${activeLoc.lng}`;
}
function _shareText() {
  if (!activeLoc) return '';
  return `${activeLoc.name} — ArchWander\n${_shareUrl()}`;
}

function openShareSheet(e) {
  if (!activeLoc) return;
  e && e.stopPropagation();

  const url     = _shareUrl();
  const overlay = document.getElementById('share-sheet-overlay');
  const sheet   = document.getElementById('share-sheet');
  const input   = document.getElementById('share-url-input');
  const copyBtn = document.getElementById('share-copy-btn');

  input.value = url;
  copyBtn.textContent = 'Copy';
  copyBtn.classList.remove('copied');
  sheet.style.transform = '';
  overlay.classList.add('open');

  // Position sheet near the share button
  const btn = document.getElementById('p-share-btn');
  if (btn) {
    const r      = btn.getBoundingClientRect();
    const sheetW = 272;
    let left = Math.min(r.left, window.innerWidth - sheetW - 12);
    left = Math.max(8, left);
    let top = r.bottom + 6;
    if (top + 250 > window.innerHeight) top = r.top - 252;
    sheet.style.left = left + 'px';
    sheet.style.top  = top  + 'px';
  } else {
    sheet.style.left      = '50%';
    sheet.style.top       = '50%';
    sheet.style.transform = 'translate(-50%,-50%)';
  }
}

function closeShareSheet() {
  document.getElementById('share-sheet-overlay').classList.remove('open');
}

function shareAction(platform) {
  const url  = _shareUrl();
  const text = _shareText();
  const enc  = encodeURIComponent;

  switch (platform) {
    case 'copy':
      navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('share-copy-btn');
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      }).catch(() => { document.getElementById('share-url-input').select(); });
      break;

    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, '_blank', 'width=600,height=400');
      closeShareSheet(); break;

    case 'x':
      window.open(`https://twitter.com/intent/tweet?text=${enc(activeLoc.name)}&url=${enc(url)}`, '_blank', 'width=600,height=400');
      closeShareSheet(); break;

    case 'threads':
      window.open(`https://www.threads.net/intent/post?text=${enc(text)}`, '_blank', 'width=600,height=500');
      closeShareSheet(); break;

    case 'instagram':
      navigator.clipboard.writeText(url).then(() => {
        alert('링크 복사됨! Instagram 앱에 붙여넣기 하세요.');
      }).catch(() => { document.getElementById('share-url-input').select(); });
      break;

    case 'whatsapp':
      window.open(`https://wa.me/?text=${enc(text)}`, '_blank');
      closeShareSheet(); break;

    case 'kakao':
      if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
        window.open(`kakaotalk://msg/send?text=${enc(text)}`, '_blank');
        setTimeout(() => {
          navigator.clipboard.writeText(url).catch(() => {});
        }, 300);
      } else {
        navigator.clipboard.writeText(url).then(() => {
          alert('링크 복사됨! KakaoTalk에 붙여넣기 하세요.');
        });
      }
      break;

    case 'line':
      window.open(`https://line.me/R/msg/text/?${enc(text)}`, '_blank');
      closeShareSheet(); break;

    case 'native':
      if (navigator.share) {
        navigator.share({ title: activeLoc.name, text: `${activeLoc.name} — ArchWander`, url })
          .catch(() => {});
        closeShareSheet();
      } else {
        navigator.clipboard.writeText(url).then(() => {
          const btn = document.getElementById('share-copy-btn');
          btn.textContent = '✓ Copied!';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
        });
      }
      break;
  }
}
