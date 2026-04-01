// Translation priority: LOCS_KO (static, data-ko-*.js) → localStorage cache → API (MyMemory/DeepL)
// data-ko.js combines city-specific data-ko-{city}.js files (same pattern as data.js).

// ══════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════
// City data loaded on demand by lazy loader (js/city.js)

// ══════════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════════
// LOCS is populated by the lazy loader — starts empty
var LOCS = [];
// LOCS_KO is populated by lazy loader — Korean translations per city
var LOCS_KO = {};

// Merge newly added locations from freshly loaded data into localStorage snapshot
function _mergeLocsFromStorage(freshLocs) {
  try {
    var d = localStorage.getItem('archwander_locs_v2');
    if (!d) return freshLocs.map(function(l){ return Object.assign({}, l); });
    var stored = JSON.parse(d);
    // Keep stored edits but add any new entries from fresh data
    var storedIds = new Set(stored.map(function(l){ return l.id; }));
    var newEntries = freshLocs.filter(function(l){ return !storedIds.has(l.id); }).map(function(l){ return Object.assign({}, l); });
    return stored.concat(newEntries);
  } catch(e) { return freshLocs.map(function(l){ return Object.assign({}, l); }); }
}

var state = { cat:[], style:[], era:[], access:[], arch:'All', fav:'All', sort:'default', query:'' };
var _MULTI_KEYS = new Set(['cat','style','era','access']);

// ══════════════════════════════════════════════════════════════════
// WIKIMEDIA LICENSE UTILITIES
// ══════════════════════════════════════════════════════════════════
var _wikiLicCache = {};
function _wikiFilename(url) {
  const m = url.match(/Special:FilePath\/([^?#]+)/);
  if (m) return decodeURIComponent(m[1]);
  const parts = url.split('/');
  return decodeURIComponent(parts[parts.length - 1].replace(/^\d+px-/, ''));
}
async function fetchWikiLicense(url) {
  const fn = _wikiFilename(url);
  if (_wikiLicCache[fn]) return _wikiLicCache[fn];
  try {
    const res = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(fn)}&prop=imageinfo&iiprop=extmetadata&format=json&origin=*`,
      { mode: 'cors' }
    );
    const data = await res.json();
    const page = Object.values(data.query?.pages || {})[0];
    const meta = page?.imageinfo?.[0]?.extmetadata || {};
    const license = meta.LicenseShortName?.value || '';
    const artist = (meta.Artist?.value || meta.Credit?.value || '').replace(/<[^>]*>/g, '').trim().slice(0, 60);
    const needsAttrib = /CC[ -]BY/i.test(license);
    const result = { license, artist, needsAttrib };
    _wikiLicCache[fn] = result;
    return result;
  } catch(e) { return { license: '?', artist: '', needsAttrib: false }; }
}
// ══════════════════════════════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════════════════════════════
var CAT_COLORS = {
  'Skyscrapers':           '#4338CA',
  'Historic':              '#C2410C',
  'Infrastructure':        '#475569',
  'Cultural':              '#9333EA',
  'Parks':                 '#166534',
  'Religious':             '#B45309',
  'Academic / Institution':'#1D4ED8',
  'Residential':           '#0F766E',
  'Landmarks':             '#0369A1',
  'Public':                '#6B7280',
  'Retail':                '#BE185D',
  'Commercial':            '#92400E',
};
var CAT_ICON = {
  'Skyscrapers':            'img/icon_skyscraper.png',
  'Historic':               'img/icon_historic.png',
  'Infrastructure':         'img/icon_infra.png',
  'Cultural':               'img/icon_cultural.png',
  'Parks':                  'img/icon_park.png',
  'Religious':              'img/icon_religious.png',
  'Academic / Institution': 'img/icon_academic.png',
  'Residential':            'img/icon_resi.png',
  'Landmarks':              'img/icon_landmark.png',
  'Public':                 'img/icon_public.png',
  'Retail':                 'img/icon_retail.png',
  'Commercial':             'img/icon_commercial.png',
};
var CAT_BG = {
  'Skyscrapers':            '#EEF2FF',
  'Historic':               '#FFF7ED',
  'Infrastructure':         '#F8FAFC',
  'Cultural':               '#FDF4FF',
  'Parks':                  '#F0FDF4',
  'Religious':              '#FFFBEB',
  'Academic / Institution': '#EFF6FF',
  'Residential':            '#F0FDFA',
  'Landmarks':              '#F0F9FF',
  'Public':                 '#F9FAFB',
  'Retail':                 '#FFF1F2',
  'Commercial':             '#FFFBEB',
};
var STYLES = ['Art Deco','Beaux-Arts','Neoclassical','Gothic Revival','Modernist','Expressionist Modernism','Postmodern','Contemporary','Adaptive Reuse','Landscape','High-Tech','Parametric Design','Traditional Korean'];
var ERAS   = ['Pre-1900','Pre-1930','1930–1969','1970–1999','2000–Present'];
var ACCESS = ['All', 'Open to Public', 'Paid Ticket', 'Private'];
var ACCESS_META = {
  'Open to Public': { cls:'access-open', icon:'🔓' },
  'Paid Ticket':    { cls:'access-paid', icon:'🎫' },
  'Private':        { cls:'access-priv', icon:'🔒' },
};
var ERA_RANGE = { 'Pre-1900':[0,1900], 'Pre-1930':[1900,1930], '1930–1969':[1930,1970], '1970–1999':[1970,2000], '2000–Present':[2000,9999] };

// ── Multi-tag helpers ──────────────────────────────────────────
// Primary category / style (first element) for color, icon, badge
function _pCat(loc)   { return (loc.cats  || [loc.cat])[0]; }
function _allCats(loc) { return loc.cats  || [loc.cat]; }
function _allSGs(loc)  { return loc.styleGroups || [loc.styleGroup]; }
function _pCC(loc)     { return CAT_CC_MAP[_pCat(loc)] || 'c-lmk'; }

// All unique architects (sorted) — will be rebuilt per city in initMap / refreshApp
var ARCHITECTS = [];

// ══════════════════════════════════════════════════════════════════
// CONFIGURATION
// ══════════════════════════════════════════════════════════════════
// MapTiler — vector tiles with multilingual labels, custom styling.
// Free: 100,000 map loads/month. Sign up at maptiler.com → copy API key.
// Style: 'streets-v2' (clean), 'basic-v2', 'topo-v2', 'dataviz', 'openstreetmap'
// Leave empty to fall back to CartoDB Voyager raster tiles.
var MAPTILER_API_KEY = '6zoIvJmOmVVyh7LnuSVp';
var MAPTILER_STYLE   = 'toner'; // 'streets-v2' | 'basic-v2' | 'topo-v2' | 'voyager' | 'toner'

// Thunderforest (legacy fallback) — used only if MapTiler key is empty.
// Bilingual raster labels (local name + English). Free: 150,000 tiles/month.
var THUNDERFOREST_API_KEY = '078a67760db947a9803755fe3b7a4916';
var THUNDERFOREST_STYLE   = 'atlas'; // 'transport' | 'cycle' | 'atlas'

// DeepL API (optional) — translates location descriptions, hours, directions etc.
// Free tier: 500,000 characters/month.
// Sign up at deepl.com/pro-api → Free plan → copy Auth Key (ends with :fx).
// Leave empty to use MyMemory (free, no key, lower quality, 5K chars/day).
var DEEPL_API_KEY = '';

// ══════════════════════════════════════════════════════════════════
