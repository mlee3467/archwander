// LANGUAGE  (EN default · KO optional)
// ══════════════════════════════════════════════════════════════════
var LANG = localStorage.getItem('archwander_lang') || 'en';

var T = {
  en: {
    search_ph:    'Search buildings, architects, styles…',
    street:       'Street',       satellite:    'Satellite',
    my_location:  'My Location',
    filters:      'Filters',      clear_all:    '✕ Clear all',   clear: '✕ Clear',
    category:     'Category',     style:        'Style',          era:   'Era',
    access:       'Access',       architect:    'Architect',
    sort_default: 'Default order',sort_oldest:  'Oldest first',
    sort_newest:  'Newest first', sort_az:      'Name A–Z',
    sort_clicks:  'Most Visited', sort_searches:'Most Searched', sort_reviews: 'Most Reviewed',
    tab_overview: 'Overview',     tab_visit:    'Visit',
    tab_here:     'Directions',   tab_audio:    '🎧 Audio',       tab_reviews: 'Reviews',    tab_report: 'Report',
    neighborhood: 'Neighborhood', address:      'Address',
    arch_label:   'Architect',    completed:    'Completed',
    style_label:  'Style',        access_label: 'Access',
    hours:        'Hours',        last_entry:   'Last Entry',     admission: 'Admission',
    guided_tour:  'Guided Tour',  tour_yes:     '✓ Available',   tour_no:   '✗ Not available',
    tour_info:    'Tour Info',    visit_website:'Visit Official Website ↗',
    subway:       'Subway',       nearby:       'Nearby',
    open_gmaps:   'Open in Google Maps ↗',
    sv_gmaps:     'Street View (Google Maps) ↗',
    ag_loading:   'Loading audio guide…',
    ag_play:      'Play',         ag_pause:     'Pause',
    ag_unavail:   'No audio guide yet for this location.',
    ag_unavail_sub:'Audio guides are being added gradually. Check back soon.',
    ag_travel:    'Lock your screen and listen while you explore.',
    ag_min:       n => `~${n} min listen`,
    no_results:   'No locations match.<br>Try adjusting your filters.',
    loc_count:    n => `${n} location${n !== 1 ? 's' : ''}`,
    fav_label:    'Favorite',
    vis_label:    'Visited',
    near_me:      'Find Near Me',
    favorites:    'Favorites',
    mob_near:     'Find Near',
    mob_fav:      'Favorites',
    mob_route:    'Route',
    export_pdf:   'PDF',
    pdf_need_pin: 'Place a pin first using "Find Near Me" to export the nearby locations as PDF.',
    pdf_generating:'Generating…',
    pdf_no_locs:  'No locations to export.',
    pdf_summary:  'Summary',
    pdf_name:     'Name',
    pdf_architect:'Architect',
    pdf_year:     'Year',
    pdf_style:    'Style',
    pdf_category: 'Category',
    pdf_access:   'Access',
    pdf_address:  'Address',
    pdf_neighborhood:'Neighborhood',
    pdf_hours:    'Hours',
    pdf_admission:'Admission',
    pdf_transit:  'Transit',
    pdf_tags:     'Tags',
    pdf_locations:'locations',
    pdf_walking:  'walking radius from pin',
    fav_io_label: 'Favorites Data',
    fav_io_export:'Export',
    fav_io_import:'Import',
    fav_imp_title:'Import Favorites',
    fav_imp_desc: 'Choose how to merge the imported data with your current favorites and visited locations.',
    fav_imp_overwrite:'Overwrite',
    fav_imp_append:'Append',
    fav_imp_cancel:'Cancel',
    fav_imp_success:'Favorites imported successfully!',
    fav_imp_invalid:'Invalid file format. Please select a valid ArchWander favorites JSON file.',
    fav_exp_empty:'No favorites or visited locations to export.',
    ifl_title:    'I feel like exploring…',
    ifl_btn:      'I feel like…',
    ifl_historic: 'Pre-1900s Space',
    ifl_modern:   'Modern Space',
    ifl_pritzker: 'Pritzker Prize Winners',
    ifl_kids:     'Kid-friendly Space',
    ifl_nature:   'Nature & Green',
    ifl_tourist:  'Tourist Highlights',
    ifl_skyscraper:'Skyscrapers',
    ifl_landmark: 'Landmarks',
    ifl_shopping: 'Shopping & Dining',
    ifl_apply:    'Apply',
    ifl_clear:    '✕ Clear',
  },
  ko: {
    search_ph:    '건물, 건축가, 스타일 검색…',
    street:       '지도',         satellite:    '위성',
    my_location:  '내 위치',
    filters:      '필터',         clear_all:    '✕ 전체 초기화', clear: '✕ 초기화',
    category:     '카테고리',     style:        '스타일',         era:   '시대',
    access:       '접근성',       architect:    '건축가',
    sort_default: '기본 순서',    sort_oldest:  '오래된순',
    sort_newest:  '최신순',       sort_az:      '이름 A–Z',
    sort_clicks:  '많이 방문한순', sort_searches:'많이 검색된순', sort_reviews: '리뷰 많은순',
    tab_overview: '개요',         tab_visit:    '방문',
    tab_here:     '오시는 길',    tab_audio:    '🎧 오디오',      tab_reviews: '리뷰',        tab_report: '오류신고',
    neighborhood: '지역',         address:      '주소',
    arch_label:   '건축가',       completed:    '완공',
    style_label:  '스타일',       access_label: '접근성',
    hours:        '운영시간',     last_entry:   '마지막 입장',    admission: '입장료',
    guided_tour:  '가이드 투어',  tour_yes:     '✓ 가능',        tour_no:   '✗ 불가',
    tour_info:    '투어 정보',    visit_website:'공식 웹사이트 ↗',
    subway:       '지하철',       nearby:       '주변',
    open_gmaps:   'Google Maps에서 열기 ↗',
    sv_gmaps:     'Street View (Google Maps) ↗',
    ag_loading:   '오디오 가이드 로딩 중…',
    ag_play:      '재생',         ag_pause:     '일시정지',
    ag_unavail:   '이 장소의 오디오 가이드가 아직 없습니다.',
    ag_unavail_sub:'오디오 가이드를 지속적으로 추가 중입니다. 나중에 다시 확인해 주세요.',
    ag_travel:    '화면을 잠그고 걸으면서 들어보세요.',
    ag_min:       n => `약 ${n}분 분량`,
    no_results:   '조건에 맞는 장소가 없습니다.<br>필터를 조정해 보세요.',
    loc_count:    n => `${n}개 장소`,
    fav_label:    '즐겨찾기',
    vis_label:    '방문함',
    near_me:      '내위치 근처 검색',
    favorites:    '즐겨찾기',
    mob_near:     '내위치',
    mob_fav:      '즐겨찾기',
    mob_route:    '루트',
    export_pdf:   'PDF',
    pdf_need_pin: '"내위치 근처 검색"에서 핀을 먼저 설정해야 주변 장소를 PDF로 내보낼 수 있습니다.',
    pdf_generating:'생성 중…',
    pdf_no_locs:  '내보낼 장소가 없습니다.',
    pdf_summary:  '요약',
    pdf_name:     '이름',
    pdf_architect:'건축가',
    pdf_year:     '연도',
    pdf_style:    '스타일',
    pdf_category: '카테고리',
    pdf_access:   '접근성',
    pdf_address:  '주소',
    pdf_neighborhood:'지역',
    pdf_hours:    '운영시간',
    pdf_admission:'입장료',
    pdf_transit:  '교통편',
    pdf_tags:     '태그',
    pdf_locations:'개 장소',
    pdf_walking:  '도보 반경',
    fav_io_label: '즐겨찾기 데이터',
    fav_io_export:'내보내기',
    fav_io_import:'가져오기',
    fav_imp_title:'즐겨찾기 가져오기',
    fav_imp_desc: '가져온 데이터를 현재 즐겨찾기 및 방문 기록과 어떻게 병합할지 선택해 주세요.',
    fav_imp_overwrite:'덮어쓰기',
    fav_imp_append:'추가',
    fav_imp_cancel:'취소',
    fav_imp_success:'즐겨찾기를 성공적으로 가져왔습니다!',
    fav_imp_invalid:'잘못된 파일 형식입니다. ArchWander 즐겨찾기 JSON 파일을 선택해 주세요.',
    fav_exp_empty:'내보낼 즐겨찾기 또는 방문 기록이 없습니다.',
    ifl_title:    '이런 곳이 보고 싶어요…',
    ifl_btn:      '추천 테마',
    ifl_historic: '1900년 이전 공간',
    ifl_modern:   '현대적인 공간',
    ifl_pritzker: '프리츠커 수상자 작품',
    ifl_kids:     '어린이 친화적 공간',
    ifl_nature:   '자연 친화적 공간',
    ifl_tourist:  '관광지 위주',
    ifl_skyscraper:'초고층 건물',
    ifl_landmark: '랜드마크 위주',
    ifl_shopping: '쇼핑 / 레스토랑',
    ifl_apply:    '적용',
    ifl_clear:    '✕ 초기화',
  }
};

function t(key) {
  const map = T[LANG] || T.en;
  return key in map ? map[key] : (T.en[key] ?? key);
}

// Korean translations for category, access, and common style terms
var _KO_CAT = {
  'academic / institution':'학술/기관', 'academic':'학술', 'educational':'교육',
  'institution':'기관', 'commercial':'상업', 'cultural':'문화',
  'historic':'역사', 'infrastructure':'인프라', 'landmarks':'랜드마크',
  'landmark':'랜드마크', 'parks':'공원', 'park':'공원',
  'public':'공공', 'civic':'시민시설', 'government':'정부',
  'religious':'종교', 'residential':'주거', 'housing':'주거',
  'retail':'소매/상업', 'skyscrapers':'초고층',
  'museum':'박물관', 'gallery':'갤러리', 'observatory':'전망대',
  'memorial':'기념관', 'hospitality':'숙박', 'office':'오피스',
  'mixed-use':'복합용도', 'public space':'공공공간', 'sports':'체육'
};
var _KO_ACCESS = {
  'free admission':'무료 입장', 'paid admission':'유료 입장', 'paid ticket':'유료 입장권',
  'paid admission (observatory)':'유료 (전망대)', 'ticketed':'유료',
  'open to public':'일반 공개', 'open to public (ground floor)':'일반 공개 (1층)',
  'open to public (lobby)':'일반 공개 (로비)', 'open to public (plaza)':'일반 공개 (광장)',
  'open to public (icp museum)':'일반 공개 (ICP 미술관)',
  'lobby & atrium (free)':'로비 & 아트리움 (무료)', 'lobby viewable':'로비 관람 가능',
  'private':'비공개', 'private (exterior viewable)':'비공개 (외부 관람 가능)',
  'private (lobby viewable)':'비공개 (로비 관람 가능)',
  'exterior only':'외부만 관람 가능', 'campus access (exterior viewable)':'캠퍼스 접근 (외부 관람)',
  'restaurant / commercial':'레스토랑 / 상업시설'
};
function _tCat(cat) { return LANG === 'ko' ? (_KO_CAT[cat] || cat) : cat; }
function _tAccess(acc) { return LANG === 'ko' ? (_KO_ACCESS[acc] || acc) : acc; }

function toggleLangMenu() {
  const menu = document.getElementById('lang-menu');
  const btn  = document.getElementById('lang-btn');
  const ov   = document.getElementById('lang-overlay');
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open');
    btn.classList.remove('open');
    if (ov) ov.classList.remove('open');
  } else {
    menu.classList.add('open');
    btn.classList.add('open');
    if (ov) ov.classList.add('open');
  }
}
function closeLangMenu() {
  document.getElementById('lang-menu').classList.remove('open');
  document.getElementById('lang-btn').classList.remove('open');
  const ov = document.getElementById('lang-overlay');
  if (ov) ov.classList.remove('open');
}
function setLang(lang) {
  LANG = lang;
  localStorage.setItem('archwander_lang', LANG);
  closeLangMenu();
  setMapLang();
  applyLang();
  // Re-translate active location if switching to Korean
  if (LANG === 'ko' && activeLoc) applyLocTranslation(activeLoc);
  // Reset audio tab so it reloads in the new language
  if (typeof agStop === 'function') agStop();
  if (typeof _agLoaded !== 'undefined') _agLoaded = null;
}

// Close lang dropdown when clicking outside
document.addEventListener('click', function(e) {
  const dd = document.getElementById('lang-dropdown');
  if (dd && !dd.contains(e.target)) closeLangMenu();
});

// ── Translation helpers ────────────────────────────────────────────
// Single MyMemory request — parallel-safe
async function _myMemoryOne(text) {
  try {
    const r = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 500))}&langpair=en|ko`
    );
    const d = await r.json();
    return (d.responseStatus === 200 && d.responseData) ? d.responseData.translatedText : text;
  } catch(e) { return text; }
}

// Translates an array of strings — all requests fire in parallel
async function translateTexts(texts) {
  if (!texts || !texts.length) return [];
  // DeepL: single batch request (fastest — ~200ms)
  if (DEEPL_API_KEY) {
    try {
      const res = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: texts, target_lang: 'KO', source_lang: 'EN' })
      });
      if (res.ok) {
        const data = await res.json();
        return data.translations.map(tr => tr.text);
      }
    } catch(e) { /* fall through */ }
  }
  // MyMemory fallback — fire all requests in parallel (~500ms total vs 4-6s sequential)
  return Promise.all(texts.map(t => _myMemoryOne(t)));
}

// Priority fields shown in the first visible tab; rest deferred
var TRANS_PRIORITY = ['desc', 'hood', 'addr'];
var TRANS_DEFERRED = ['hours', 'admission', 'transit', 'lastEntry', 'tourInfo', 'walkFrom'];

async function getLocTranslation(loc, onlyPriority = false) {
  // ── Static translations (data-ko-*.js) — instant, no API needed ─
  if (typeof LOCS_KO !== 'undefined' && LOCS_KO[loc.id]) {
    return LOCS_KO[loc.id];
  }

  const cacheKey = `archwander_trans_ko_${loc.id}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      // If full cache exists, return it; if we only need priority, return early
      if (!onlyPriority || TRANS_PRIORITY.every(k => parsed[k] || !loc[k])) return parsed;
    }
  } catch(e) {}
  const fieldKeys = onlyPriority ? TRANS_PRIORITY : [...TRANS_PRIORITY, ...TRANS_DEFERRED];
  const toTranslate = {};
  fieldKeys.forEach(k => { if (loc[k] && loc[k] !== 'N/A' && loc[k] !== '-') toTranslate[k] = loc[k]; });
  const keys = Object.keys(toTranslate);
  const vals = Object.values(toTranslate);
  if (!keys.length) return {};
  const translated = await translateTexts(vals);
  const result = {};
  keys.forEach((k, i) => { result[k] = translated[i] || toTranslate[k]; });
  if (!onlyPriority) {
    try { localStorage.setItem(cacheKey, JSON.stringify(result)); } catch(e) {}
  }
  return result;
}

// ── Translation status bar helpers ─────────────────────────────────
function _showTransBar(msg, phase2 = false) {
  const bar = document.getElementById('trans-bar');
  if (!bar) return;
  const msgEl = bar.querySelector('.trans-msg');
  if (msgEl) {
    msgEl.textContent = msg;
    msgEl.classList.toggle('trans-phase2', phase2);
  }
  bar.classList.add('loading');
}
function _hideTransBar() {
  const bar = document.getElementById('trans-bar');
  if (bar) bar.classList.remove('loading');
}

// On-demand translation with localStorage cache
// Priority: LOCS_KO (static) → localStorage cache → API (MyMemory/DeepL)
async function applyLocTranslation(loc) {
  const guard = () => activeLoc && activeLoc.id === loc.id && LANG === 'ko';
  if (!guard()) return;

  // ── Highest priority: static translations from data-ko-*.js ────
  if (typeof LOCS_KO !== 'undefined' && LOCS_KO[loc.id]) {
    const trans = LOCS_KO[loc.id];
    const ovPane = document.getElementById('pane-overview');
    const viPane = document.getElementById('pane-visit');
    const hrPane = document.getElementById('pane-here');
    if (ovPane) ovPane.innerHTML = buildOverviewTab(loc, trans);
    if (viPane) viPane.innerHTML = buildVisitTab(loc, trans);
    if (hrPane) hrPane.innerHTML = buildDirectionsTab(loc, trans);
    return;
  }

  // ── Fast path: full localStorage cache hit ──────────────────────
  const cacheKey = `archwander_trans_ko_${loc.id}`;
  const _tryCache = () => {
    try { const c = localStorage.getItem(cacheKey); return c ? JSON.parse(c) : null; } catch(e) { return null; }
  };
  const cached = _tryCache();
  if (cached && TRANS_PRIORITY.every(k => cached[k] || !loc[k])) {
    // Fully cached — apply instantly, no bar needed
    const ovPane = document.getElementById('pane-overview');
    const viPane = document.getElementById('pane-visit');
    const hrPane = document.getElementById('pane-here');
    if (ovPane) ovPane.innerHTML = buildOverviewTab(loc, cached);
    if (viPane) viPane.innerHTML = buildVisitTab(loc, cached);
    if (hrPane) hrPane.innerHTML = buildDirectionsTab(loc, cached);
    return;
  }

  // ── Slow path: API translation ──────────────────────────────────
  // Phase 1 — priority fields (desc, hood, addr)
  // DeepL: ~200ms · MyMemory parallel: ~500ms
  _showTransBar('한국어로 번역 중...', false);

  const priTrans = await getLocTranslation(loc, true);
  if (!guard()) { _hideTransBar(); return; }

  const ovPane = document.getElementById('pane-overview');
  const viPane = document.getElementById('pane-visit');
  const hrPane = document.getElementById('pane-here');
  if (ovPane) ovPane.innerHTML = buildOverviewTab(loc, priTrans);

  // Phase 2 — deferred fields (hours, transit, tourInfo…)
  // Runs while user reads Phase 1 result
  _showTransBar('상세 정보 번역 중...', true);

  const fullTrans = await getLocTranslation(loc, false);
  if (!guard()) { _hideTransBar(); return; }

  if (ovPane) ovPane.innerHTML = buildOverviewTab(loc, fullTrans);
  if (viPane) viPane.innerHTML = buildVisitTab(loc, fullTrans);
  if (hrPane) hrPane.innerHTML = buildDirectionsTab(loc, fullTrans);
  _hideTransBar();
}

function setMapLang() {
  if (map && map.hasLayer(streetLayer)) {
    map.removeLayer(streetLayer);
    streetLayer = _makeStreetLayer();
    streetLayer.addTo(map);
  }
}

function applyLang() {
  // Search placeholder
  const searchEl = document.getElementById('search');
  if (searchEl) searchEl.placeholder = t('search_ph');
  // Header buttons
  const btnS = document.getElementById('btn-street');  if (btnS) btnS.textContent = t('street');
  const btnSat = document.getElementById('btn-sat');   if (btnSat) btnSat.textContent = t('satellite');
  // Sidebar filter header
  const sbLabel = document.querySelector('.sb-top-label');
  if (sbLabel) {
    // Preserve the SVG icon — only replace the text node after it
    const svg = sbLabel.querySelector('svg');
    sbLabel.textContent = '';
    if (svg) sbLabel.prepend(svg);
    sbLabel.append(' ' + t('filters'));
  }
  const sbClear = document.getElementById('sb-clear');
  if (sbClear) sbClear.textContent = t('clear_all');
  // Filter section labels + clear buttons
  const fsecMap = { cat:'category', style:'style', era:'era', access:'access', arch:'architect', fav:'favorites' };
  Object.entries(fsecMap).forEach(([id, key]) => {
    const lbl = document.querySelector(`#fsec-${id} .fsec-hdr > span:first-child`);
    if (lbl) lbl.textContent = t(key);
    const rst = document.querySelector(`#reset-${id}`);
    if (rst) rst.textContent = t('clear');
  });
  // Sort dropdown options
  const sortSel = document.getElementById('sort-sel');
  if (sortSel) {
    const keys = ['sort_default','sort_oldest','sort_newest','sort_az','sort_clicks','sort_searches','sort_reviews'];
    [...sortSel.options].forEach((opt, i) => { if (keys[i]) opt.textContent = t(keys[i]); });
  }
  // Panel tabs
  const tabMap = { overview:'tab_overview', visit:'tab_visit', here:'tab_here', audio:'tab_audio', reviews:'tab_reviews' };
  Object.entries(tabMap).forEach(([tab, key]) => {
    const el = document.querySelector(`.tab[data-tab="${tab}"]`);
    if (el) el.textContent = t(key);
  });
  // Near Me + Favorites header buttons
  const nearText = document.querySelector('#near-me-btn .near-text');
  if (nearText) nearText.textContent = t('near_me');
  const favText = document.querySelector('#fav-btn .fav-text');
  if (favText) favText.textContent = t('favorites');
  // Mobile action bar buttons
  const mobNear = document.querySelector('.mob-near-text');
  if (mobNear) mobNear.textContent = t('mob_near');
  const mobFav = document.querySelector('.mob-fav-text');
  if (mobFav) mobFav.textContent = t('mob_fav');
  const mobRoute = document.querySelector('.mob-route-text');
  if (mobRoute) mobRoute.textContent = t('mob_route');
  updateReportBtnLabel();
  // Fav export/import bar + modal
  const fioLbl = document.getElementById('fav-io-label');       if (fioLbl) fioLbl.textContent = t('fav_io_label');
  const fioExp = document.getElementById('fav-io-export-label');if (fioExp) fioExp.textContent = t('fav_io_export');
  const fioImp = document.getElementById('fav-io-import-label');if (fioImp) fioImp.textContent = t('fav_io_import');
  const fimTtl = document.getElementById('fav-import-title');   if (fimTtl) fimTtl.textContent = t('fav_imp_title');
  const fimDsc = document.getElementById('fav-import-desc');    if (fimDsc) fimDsc.textContent = t('fav_imp_desc');
  const fimOvr = document.getElementById('fav-import-overwrite');if(fimOvr) fimOvr.textContent = t('fav_imp_overwrite');
  const fimApp = document.getElementById('fav-import-append');  if (fimApp) fimApp.textContent = t('fav_imp_append');
  const fimCnl = document.getElementById('fav-import-cancel');  if (fimCnl) fimCnl.textContent = t('fav_imp_cancel');
  // "I feel like…" button text
  const iflText = document.querySelector('#ifl-btn .ifl-text');
  if (iflText) iflText.textContent = t('ifl_btn');
  const mobIflText = document.querySelector('.mob-ifl-text');
  if (mobIflText) mobIflText.textContent = t('ifl_btn');
  const iflApplyBtn = document.getElementById('ifl-apply-btn');
  if (iflApplyBtn) iflApplyBtn.textContent = t('ifl_apply');
  const iflClearBtn = document.getElementById('ifl-clear-btn');
  if (iflClearBtn) iflClearBtn.textContent = t('ifl_clear');
  // Lang dropdown: update label + checkmarks (use short label on mobile)
  const langCur = document.getElementById('lang-current');
  if (langCur) {
    const isMobile = window.innerWidth <= 900;
    if (LANG === 'ko') langCur.textContent = isMobile ? 'KO' : '한국어';
    else langCur.textContent = 'EN';
  }
  const chkEn = document.getElementById('check-en');
  const chkKo = document.getElementById('check-ko');
  if (chkEn) chkEn.textContent = LANG === 'en' ? '✓' : '';
  if (chkKo) chkKo.textContent = LANG === 'ko' ? '✓' : '';
  // Rebuild dynamic content
  buildFilters();
  renderList();
  if (typeof buildLegend === 'function') buildLegend();
  // Re-apply panel when switching language
  if (activeLoc) {
    _hideTransBar();
    document.getElementById('pane-overview').innerHTML = buildOverviewTab(activeLoc, {});
    document.getElementById('pane-visit').innerHTML    = buildVisitTab(activeLoc, {});
    document.getElementById('pane-here').innerHTML     = buildDirectionsTab(activeLoc, {});
    document.getElementById('pane-audio').innerHTML = buildAudioGuideShell();
    _agLoaded = null; // reset so audio reloads for new lang if needed
    if (LANG === 'ko') applyLocTranslation(activeLoc);
  }
}

