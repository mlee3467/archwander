// ══════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════
// City data loaded on demand by lazy loader (js/city.js)

// ══════════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════════
// LOCS is populated by the lazy loader — starts empty
var LOCS = [];

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

var state = { cat:[], style:[], era:[], access:[], arch:'All', hood:'All', fav:'All', sort:'default', query:'' };
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

// ── Visit time defaults (minutes per category, normal pace) ─────
var VISIT_MIN_DEFAULTS = {
  'c-cul':  75,  // museum, cultural center, theater
  'c-park': 40,  // park, garden
  'c-his':  35,  // historic building
  'c-aca':  35,  // university, library, school
  'c-ret':  30,  // market, shopping
  'c-pub':  25,  // civic, public space
  'c-rel':  25,  // religious
  'c-com':  20,  // commercial / office lobby
  'c-sky':  20,  // skyscraper (exterior / observation)
  'c-lmk':  20,  // landmark
  'c-inf':  20,  // infrastructure (bridge, station)
  'c-res':  15,  // residential (exterior only)
};
var VISIT_PACE_MULT = { quick: 0.6, normal: 1.0, relaxed: 1.5 };
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
var THUNDERFOREST_API_KEY = ''; // disabled — using CartoDB Voyager raster
var THUNDERFOREST_STYLE   = 'pioneer'; // 'transport' | 'cycle' | 'atlas' | 'pioneer' | 'landscape'

// Google Maps Embed — Street View fallback for locations without photos.
// Free: 28,000 loads/month. Secure with HTTP Referrer restriction in Google Cloud Console.
// ⚠️ 실제 키는 GitHub Actions Secret (GOOGLE_MAPS_API_KEY)으로 주입됨 — 이 파일에 직접 입력 금지.
var GOOGLE_MAPS_API_KEY = '__GOOGLE_MAPS_API_KEY__';

// ── Supabase ─────────────────────────────────────────────────────
// Location data is served from Supabase instead of public JS files.
// Dashboard → Settings → API 에서 Project URL과 anon key를 복사하세요.
// anon key는 클라이언트에 노출되어도 안전 (RLS로 읽기 전용 제한됨).
// ⚠️ 실제 값은 GitHub Actions Secret으로 주입됨 — 이 파일에 직접 입력 금지.
var SUPABASE_URL      = '__SUPABASE_URL__';
var SUPABASE_ANON_KEY = '__SUPABASE_ANON_KEY__';

// Supabase 클라이언트 초기화 (URL/KEY 없으면 로컬 JS 파일 폴백)
var _supabase = (SUPABASE_URL && SUPABASE_ANON_KEY && typeof supabase !== 'undefined')
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    })
  : null;

// ── Anonymous Auth gate ───────────────────────────────────────────
// All Supabase data fetches must call _ensureSupabaseAuth() first.
// On first call: checks for existing session, otherwise signs in anonymously.
// Supabase RLS requires role = 'authenticated' — anon key alone is blocked.
var _sbAuthReady   = false;
var _sbAuthPromise = null;

function _ensureSupabaseAuth() {
  if (!_supabase)        return Promise.resolve();
  if (_sbAuthReady)      return Promise.resolve();
  if (_sbAuthPromise)    return _sbAuthPromise;

  _sbAuthPromise = _supabase.auth.getSession()
    .then(function(res) {
      if (res.data && res.data.session) {
        // Existing valid session found (localStorage)
        _sbAuthReady = true;
        return;
      }
      // No session — sign in anonymously
      return _supabase.auth.signInAnonymously().then(function(r) {
        if (r.error) console.warn('[auth] signInAnonymously failed:', r.error.message);
        _sbAuthReady = true;
      });
    })
    .catch(function(e) {
      console.warn('[auth] Session check error:', e.message);
      _sbAuthReady = true; // don't block app on auth failure
    });

  return _sbAuthPromise;
}

// Helper: get current session access_token (falls back to anon key)
