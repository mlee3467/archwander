// LANGUAGE — English only (Korean UI removed for performance)
// t() function kept intact — used throughout the codebase
// ══════════════════════════════════════════════════════════════════
var LANG = 'en';

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
    near_me:      'My Location',
    favorites:    'Favorites',
    mob_near:     'My Location',
    mob_fav:      'Favorites',
    mob_route:    'Route',
    sba_likable:  'Explore',
    sba_loc:      'My Location',
    sba_fav:      'Favorites',
    sba_route:    'Route',
    sba_ifl:      'My Page',
    export_pdf:   'PDF',
    pdf_need_pin: 'Place a pin first using "My Location" to export the nearby locations as PDF.',
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
  }
};

function t(key) {
  const map = T.en;
  return key in map ? map[key] : key;
}

// Category / access passthrough (ko translation removed)
function _tCat(cat)    { return cat; }
function _tAccess(acc) { return acc; }

// Language functions — stubs (UI removed, kept for any residual calls)
// lang-menu stubs removed (UI removed in v0.3)

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
    const svg = sbLabel.querySelector('svg');
    sbLabel.textContent = '';
    if (svg) sbLabel.prepend(svg);
    sbLabel.append(' ' + t('filters'));
  }
  const sbClear = document.getElementById('sb-clear');
  if (sbClear) sbClear.textContent = t('clear_all');
  // Filter section labels + clear buttons
  const fsecMap = { cat:'category', style:'style', era:'era', access:'access', arch:'architect', hood:'neighborhood', fav:'favorites' };
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
  // Sidebar action buttons
  ['likable','loc','fav','route','ifl'].forEach(function(k) {
    var el = document.getElementById('sba-' + k + '-label');
    if (el) el.innerHTML = t('sba_' + k).replace(/\n/g, '<br>');
  });
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
  // Rebuild dynamic content
  buildFilters();
  renderList();
  if (typeof buildLegend === 'function') buildLegend();
  // Re-apply panel
  if (activeLoc) {
    document.getElementById('pane-overview').innerHTML = buildOverviewTab(activeLoc, {});
    document.getElementById('pane-visit').innerHTML    = buildVisitTab(activeLoc, {});
    document.getElementById('pane-here').innerHTML     = buildDirectionsTab(activeLoc, {});
    document.getElementById('pane-audio').innerHTML = buildAudioGuideShell();
    _agLoaded = null;
  }
}
