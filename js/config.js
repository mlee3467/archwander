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

var state = { cat:[], style:[], era:[], access:[], arch:'All', hood:'All', fav:'All', sort:'default', query:'', themes:[] };
var _MULTI_KEYS = new Set(['cat','style','era','access']);

// ══════════════════════════════════════════════════════════════════
// "I FEEL LIKE…" THEME DEFINITIONS
// ══════════════════════════════════════════════════════════════════
var THEME_DEFS = [
  { key:'historic',   icon:'🏛️', filter: function(l){ return (l.tags||[]).some(function(t){ return t==='historic'; }); } },
  { key:'modern',     icon:'🏙️', filter: function(l){ return l.yr >= 2000; } },
  { key:'pritzker',   icon:'🏆', filter: function(l){ return (l.tags||[]).some(function(t){ return t==='pritzker prize' || t==='pritzker'; }); } },
  { key:'kids',       icon:'👨‍👩‍👧‍👦', filter: function(l){ return l.cc==='c-park' || (l.cats||[]).includes('parks') || ((l.tourOk) && ((l.cats||[]).includes('cultural') || (l.tags||[]).some(function(t){ return t==='museum' || t==='free' || t==='touristic'; }))); } },
  { key:'nature',     icon:'🌿', filter: function(l){ return l.cc==='c-park' || (l.tags||[]).some(function(t){ return /garden|park|waterfront|landscape|nature|forest|botanical|green/i.test(t) && !/parking/i.test(t); }); } },
  { key:'tourist',    icon:'📸', filter: function(l){ return (l.tags||[]).some(function(t){ return t==='touristic' || t==='landmark' || t==='observatory' || t==='iconic'; }) || (l.access||'').toLowerCase().indexOf('free')>=0; } },
  { key:'skyscraper', icon:'🏗️', filter: function(l){ return l.cc==='c-sky' || (l.cats||[]).includes('skyscrapers') || (l.tags||[]).some(function(t){ return t==='skyscraper' || t==='supertall' || t==='megatall'; }); } },
  { key:'landmark',   icon:'🗽', filter: function(l){ return l.cc==='c-lmk' || (l.cats||[]).includes('landmarks') || (l.tags||[]).some(function(t){ return t==='landmark' || t==='iconic'; }); } },
  { key:'shopping',   icon:'🛍️', filter: function(l){ return l.cc==='c-ret' || (l.cats||[]).includes('retail') || (l.tags||[]).some(function(t){ return t==='retail' || t==='shop' || t==='shopping' || t==='restaurant' || t==='dining' || t==='food hall' || t==='hotel'; }); } },
  { key:'luxres',     icon:'🏠', filter: function(l){ return l.cc==='c-res' || (l.cats||[]).includes('residential') || (l.tags||[]).some(function(t){ return t==='luxury residential' || t==='luxury' || t==='residential' || t==='housing' || t==='penthouse' || t==='condominium'; }); } },
];

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
  'c-sky':  { color:'#3366FF', bg:'#DDE6FF', icon:'img/icon_skyscraper.png' },  // vivid blue
  'c-his':  { color:'#FF8C00', bg:'#FFF0DB', icon:'img/icon_historic.png'   },  // orange
  'c-inf':  { color:'#708899', bg:'#EDF1F4', icon:'img/icon_infra.png'      },  // slate gray
  'c-cul':  { color:'#AA44DD', bg:'#F3E5FC', icon:'img/icon_cultural.png'   },  // purple
  'c-park': { color:'#22BB55', bg:'#DCFCE8', icon:'img/icon_park.png'       },  // green
  'c-rel':  { color:'#CCAA00', bg:'#FDF8D8', icon:'img/icon_religious.png'  },  // gold
  'c-aca':  { color:'#11AABB', bg:'#D8F7FA', icon:'img/icon_academic.png'   },  // cyan
  'c-res':  { color:'#88AA22', bg:'#F0F6DC', icon:'img/icon_resi.png'      },  // lime-olive
  'c-lmk':  { color:'#EE3344', bg:'#FFE3E5', icon:'img/icon_landmark.png'  },  // red
  'c-pub':  { color:'#BB7755', bg:'#F5ECE5', icon:'img/icon_public.png'    },  // warm brown
  'c-ret':  { color:'#EE2299', bg:'#FFE0F0', icon:'img/icon_retail.png'    },  // hot pink
  'c-com':  { color:'#886633', bg:'#F2EADD', icon:'img/icon_commercial.png' },  // brown
};
var _CC_DEFAULT = CC_META['c-lmk'];
function _ccMeta(loc) { return CC_META[loc.cc] || _CC_DEFAULT; }
// cc → English category label (used by legend + _tCat for i18n)
var CC_LABEL = {
  'c-sky':'skyscrapers','c-his':'historic','c-inf':'infrastructure',
  'c-cul':'cultural','c-park':'parks','c-rel':'religious',
  'c-aca':'academic','c-res':'residential','c-lmk':'landmarks',
  'c-pub':'public','c-ret':'retail','c-com':'commercial'
};
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
// All unique neighborhoods (sorted) — rebuilt per city in initMap / refreshApp
var NEIGHBORHOODS = [];

// ══════════════════════════════════════════════════════════════════
// CONFIGURATION
// ══════════════════════════════════════════════════════════════════
// MapTiler — raster tiles with multilingual labels. Free: 100k loads/month.
// Secure with Allowed HTTP Origins in MapTiler dashboard.
var MAPTILER_API_KEY = ''; // disabled — free tier exhausted
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
