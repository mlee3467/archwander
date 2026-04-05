# ArchWander — Project Context for Claude

## 프로젝트 개요
ArchWander는 건축/도시 여행 가이드 웹앱이야. 모듈식 HTML/CSS/JS 구성이며 GitHub Pages로 배포 중.

- **메인 앱**: `index.html` (HTML shell, ~490줄) + `css/styles.css` + `js/*.js` (12 모듈)
- **데이터**: `data-seoul.js`, `data-new-york.js`, `data-london.js`, `data-tokyo.js` (lazy loading)
- **번역**: `data-ko-*.js` (도시별 한국어, lazy loading)
- **도구**: `Archwander_tools/` 폴더 내 (로컬 전용, GitHub Pages 미배포)

## 파일 구조 (컴포넌트 분리)
```
index.html          ← HTML shell (body만, ~490줄)
css/styles.css      ← 전체 CSS (~1360줄)
js/config.js        ← 상수, 색상, 설정, LOCS/LOCS_KO 초기화
js/i18n.js          ← 언어 시스템, 번역 API
js/map.js           ← 맵 초기화, 타일 레이어, 마커, 클러스터
js/filters.js       ← 필터 UI + 로직
js/core.js          ← 리스트 렌더, 상세 패널, 탭
js/audio.js         ← 오디오 가이드 시스템
js/ui.js            ← 탭, 사진, 사이드바, 리뷰
js/walk.js          ← Near Me, 도보 필터, GPS, OSRM 라우팅
js/city.js          ← 즐겨찾기, 도시 선택, lazy loading
js/route.js         ← 루트 플래너 (동네별 경로, OSRM)
js/pdf.js           ← PDF 내보내기 (location + route)
js/init.js          ← 부팅, 관리자 패널, SW 등록
```

## Git / 배포 정보
- **Remote**: `origin/main` (GitHub)
- **배포**: GitHub Pages (main 브랜치 자동 배포)
- **작업 순서**: 파일 수정 → `git add` → `git commit` → `git push origin main`
- ⚠️ `git pull --rebase` 나 `git rebase` 는 절대 사용하지 마. 충돌 발생 시 `git pull origin main` (merge 방식)으로만.

## 주요 시스템

### Lazy Loading (도시 데이터)
- `loadCityData(cityCode)` — 도시별 data-*.js + data-ko-*.js 동적 로딩
- 부팅 시 GPS 기반 가장 가까운 도시 로딩 → 나머지 백그라운드 preload
- `CITY_META`에 `dataVar`, `koVar` 필드로 전역 변수명 매핑
- `LOCS`는 빈 배열로 시작, lazy load 시 merge

### 지도 타일
- **1순위**: MapTiler 벡터 타일 (`MAPTILER_API_KEY` 설정 시, MapLibre GL + leaflet-maplibre-gl)
- **2순위**: Thunderforest 라스터 (`THUNDERFOREST_API_KEY`)
- **3순위**: CartoDB Voyager 라스터 (기본)

### 갤러리 (오른쪽 location 정보 패널)
- `.gallery` 높이: `45vh`, 배경 `#000`
- `.gallery img`: `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%)`
- 모바일에서는 `transform:none` override 필수 (없으면 이미지 오프셋 버그)

### Street View 바
- `.sv-reopen-bar` CSS는 **반드시 글로벌 스코프** (미디어 쿼리 밖)에 정의
- 미디어 쿼리 안에 넣으면 데스크탑에서 스타일 미적용

### 썸네일 (카드 리스트)
- 사진 없는 경우 + 로드 실패 모두 동일하게 처리
- 투명 1px GIF (`data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`) + `background:#e8e8e4`
- `onerror="this.onerror=null;this.src='[1px GIF]';this.style.background='#e8e8e4'"`

### 로고
- `<div class="logo" onclick="location.reload()" style="cursor:pointer">` — 클릭 시 페이지 새로고침

## Location ID 시스템

### 형식: `{city-prefix}-{4자리 순번}`
| 도시 | city 값 | ID prefix | 현재 범위 | 다음 ID |
|------|---------|-----------|-----------|---------|
| New York | `new-york` | `nyc` | nyc-0001 ~ nyc-0214 | **nyc-0215** |
| Seoul | `seoul` | `sel` | sel-0001 ~ sel-0127 | **sel-0128** |
| London | `london` | `lon` | lon-0001 ~ lon-0022 | **lon-0023** |
| Tokyo | `tokyo` | `tok` | tok-0001 ~ tok-0094 | **tok-0095** |

### 규칙
- ID는 **이름과 무관** — 이름이 바뀌어도 ID는 그대로 유지
- 삭제된 location의 번호는 **재사용하지 않음** (항상 max+1)
- 새 location 추가 시 Admin 패널이 `generateLocationId()` 자동 호출
- localStorage 키: `archwander_locs_v2` (v1=구 kebab ID, 호환 안 됨)

## 데이터 파일 구조 (`data-*.js`)
```javascript
const LOCS_NEW_YORK = [  // 또는 LOCS_SEOUL, LOCS_LONDON
  {
    id: 'nyc-0143',       // city-prefix + 4자리 순번 (자동 생성)
    name: "Location Name",
    city: 'new-york',
    lat: 40.748,
    lng: -73.985,
    // ... 기타 필드
  }
];
```

## 도구 파일들 (`Archwander_tools/`)
- **`image-rank-tool.html`**: 사진 순위 편집기. `slice(0,15)`로 최대 15장 표시.
- **`map-tool.html`**: 지도 기반 좌표 편집기. Leaflet 사용.
  - `renderList()` — `#loc-list-empty` 별도 DOM 엘리먼트 없이 인라인 HTML로 처리 (null 참조 버그 방지)
- **`photo-tool.html`**: Wikimedia Commons 사진 검색. fetch 시 `mode:'cors', credentials:'omit'` 필수.

## 주요 해결된 버그 이력
1. **mobile gallery 이미지 오프셋**: 데스크탑 `transform:translate(-50%,-50%)` → 모바일 `transform:none` 으로 리셋
2. **sv-reopen-bar 미적용**: @media 안에 CSS가 있었음 → 글로벌로 이동
3. **map-tool null 에러**: `innerHTML` 교체 후 `#loc-list-empty` DOM이 사라져 `.style` 접근 시 null → 인라인 처리로 해결
4. **photo-tool Failed to fetch**: 브라우저 확장(광고차단기) 차단 + file:// 제약 → CORS 옵션 명시

## 미결 과제
- [ ] Carto Voyager 영어 라벨: 라스터 타일 특성상 불가. 옵션: MapLibre+OpenFreeMap (벡터), Stadia Maps (라스터+영어), 또는 현상 유지
- [ ] 현재 로컬 git이 rebase 중간 상태. 다른 컴퓨터에서는 신경 쓸 필요 없음 (remote는 정상)
