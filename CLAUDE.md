# ArchWander — Project Context for Claude

## 프로젝트 개요
ArchWander는 건축/도시 여행 가이드 웹앱이야. 정적 HTML/CSS/JS 구성이며 GitHub Pages로 배포 중.

- **메인 앱**: `index.html` (GitHub Pages에서 서비스)
- **데이터**: `data-seoul.js`, `data-new-york.js`, `data-london.js`
- **도구**: `Archwander_tools/` 폴더 내 (로컬 전용, GitHub Pages 미배포)

## Git / 배포 정보
- **Remote**: `origin/main` (GitHub)
- **배포**: GitHub Pages (main 브랜치 자동 배포)
- **작업 순서**: 파일 수정 → `git add` → `git commit` → `git push origin main`
- ⚠️ `git pull --rebase` 나 `git rebase` 는 절대 사용하지 마. 충돌 발생 시 `git pull origin main` (merge 방식)으로만.

## index.html 주요 구조

### 지도
- **라이브러리**: Leaflet.js
- **타일**: Carto Voyager 라스터 (`basemaps.cartocdn.com/rastertiles/voyager/`)
- 라스터 타일이라 언어 파라미터 없음 — 라벨은 OSM 현지어로 bake-in

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

## 데이터 파일 구조 (`data-*.js`)
```javascript
const LOCATIONS = [
  {
    id: "unique-id",
    name: "Location Name",
    lat: 37.123,
    lng: 126.456,
    type: "architecture",      // architecture | landscape | public-space | interior
    tags: ["tag1", "tag2"],
    description: "설명",
    address: "주소",
    photos: ["photo1.jpg", "photo2.jpg"]  // img/ 폴더 기준
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
