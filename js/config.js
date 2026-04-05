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
// ── CC_META: single source of truth for cc → color, icon, bg ──
// Every location carries a `cc` field (e.g. 'c-sky'). Look up once.
var CC_META = {
  'c-sky':  { color:'#1A0BDF', bg:'#E0DEFF', icon:'img/icon_skyscraper.png' },  // deep blue
  'c-his':  { color:'#F7CBC8', bg:'#FDF0EF', icon:'img/icon_historic.png'   },  // pink-peach
  'c-inf':  { color:'#244283', bg:'#E1E5EF', icon:'img/icon_infra.png'      },  // navy
  'c-cul':  { color:'#881AEC', bg:'#ECDCFC', icon:'img/icon_cultural.png'   },  // purple
  'c-park': { color:'#2DB884', bg:'#DDF5EC', icon:'img/icon_park.png'       },  // green
  'c-rel':  { color:'#E4BC00', bg:'#FDF6D0', icon:'img/icon_religious.png'  },  // gold
  'c-aca':  { color:'#66F2DE', bg:'#E0FCF6', icon:'img/icon_academic.png'   },  // mint
  'c-res':  { color:'#F7EDC1', bg:'#FCFAED', icon:'img/icon_resi.png'      },  // cream
  'c-lmk':  { color:'#D22345', bg:'#FCDEE4', icon:'img/icon_landmark.png'  },  // red
  'c-pub':  { color:'#93AD6C', bg:'#EFF3E8', icon:'img/icon_public.png'    },  // olive-green
  'c-ret':  { color:'#FF46AE', bg:'#FFE0F0', icon:'img/icon_retail.png'    },  // hot pink
  'c-com':  { color:'#8EDDD4', bg:'#E4F7F4', icon:'img/icon_commercial.png' },  // teal
};
var _CC_DEFAULT = CC_META['c-lmk'];
function _ccMeta(loc) { return CC_META[loc.cc] || _CC_DEFAULT; }
var STYLES = ['art deco','beaux-arts','neoclassical','gothic revival','modernist','expressionist modernism','postmodern','contemporary','adaptive reuse','landscape','high-tech','parametric design','traditional korean'];
var ERAS   = ['Pre-1900','Pre-1930','1930–1969','1970–1999','2000–Present'];
var ACCESS = ['All', 'open to public', 'paid ticket', 'private'];
var ACCESS_META = {
  'open to public': { cls:'access-open', icon:'🔓' },
  'paid ticket':    { cls:'access-paid', icon:'🎫' },
  'private':        { cls:'access-priv', icon:'🔒' },
};
var ERA_RANGE = { 'Pre-1900':[0,1900], 'Pre-1930':[1900,1930], '1930–1969':[1930,1970], '1970–1999':[1970,2000], '2000–Present':[2000,9999] };

// ── Multi-tag helpers ──────────────────────────────────────────
// Primary category / style (first element) for color, icon, badge
function _pCat(loc)   { return (loc.cats || [])[0] || 'landmarks'; }
function _allCats(loc) { return loc.cats || []; }
function _allSGs(loc)  { return loc.styleGroups || []; }
function _pCC(loc)     { return loc.cc || 'c-lmk'; }

// All unique architects (sorted) — will be rebuilt per city in initMap / refreshApp
var ARCHITECTS = [];

// ══════════════════════════════════════════════════════════════════
// CONFIGURATION
// ══════════════════════════════════════════════════════════════════
// MapTiler — raster tiles with multilingual labels. Free: 100k loads/month.
// Secure with Allowed HTTP Origins in MapTiler dashboard.
var MAPTILER_API_KEY = '6zoIvJmOmVVyh7LnuSVp';
var MAPTILER_STYLE   = 'streets-v2'; // 'streets-v2' | 'basic-v2' | 'topo-v2' | 'voyager' | 'toner'

// Thunderforest — fallback if MapTiler key is empty. Free: 150,000 tiles/month.
var THUNDERFOREST_API_KEY = '078a67760db947a9803755fe3b7a4916';
var THUNDERFOREST_STYLE   = 'atlas'; // 'transport' | 'cycle' | 'atlas'

// DeepL API (optional) — translates location descriptions, hours, directions etc.
// Free tier: 500,000 characters/month.
// Sign up at deepl.com/pro-api → Free plan → copy Auth Key (ends with :fx).
// Leave empty to use MyMemory (free, no key, lower quality, 5K chars/day).
var DEEPL_API_KEY = '';

// Google Maps Embed — Street View fallback for locations without photos.
// Free: 28,000 loads/month. Secure with HTTP Referrer restriction in Google Cloud Console.
var GOOGLE_MAPS_API_KEY = 'AIzaSyCnoNNGVJN-7FnhsZXXLZwTZY9D8xzOwXE';

// ══════════════════════════════════════════════════════════════════
