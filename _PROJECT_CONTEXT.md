# ArchWander — Project Context for Claude

## 프로젝트 개요
- **이름**: ArchWander — Static GitHub Pages 건축 랜드마크 지도 앱
- **GitHub**: https://github.com/mlee3467/ArchWander.git
- **Tools repo**: https://github.com/mlee3467/ArchWander_tools.git
- **도시**: New York (nyc), Seoul (sel), London (lon), Tokyo (tky)

## 파일 구조
- index.html — 메인 앱 (CSS/JS 모두 포함, ~3200줄)
- data.js — LOCS_DEFAULT 조합 (도시별 data-*.js 합침)
- data-new-york.js / data-seoul.js / data-london.js / data-tokyo.js
- data-ko.js — 한국어 정적 번역 (translate-tool.html로 생성)
- Archwander_tools/translate-tool.html — 번역 도구

## Location 데이터 필드
id, name, cc, cats, styleGroups, era, city, arch, archs, yr,
access, lat, lng, addr, hood, desc, hours, lastEntry, admission,
tourOk, tourInfo, transit, walkFrom, tags, photos
※ cat, styleGroup, style, web, gmaps, archdaily, wiki, drawings 필드는 purge됨

## Config 상수 (index.html 상단)
- THUNDERFOREST_API_KEY = 078a67760db947a9803755fe3b7a4916 / STYLE = 'atlas' (bilingual 레이블)
- JAWG_TOKEN = '' (비활성)
- DEEPL_API_KEY = '' (MyMemory fallback 사용)
- YOUTUBE_API_KEY = AIzaSyD5QJKfu5LgdgJlfmJSFu8r8V6bdGaqR14

## 번역 시스템
- 정적(즉시): LOCS_KO[loc.id] — data-ko.js 로드
- Runtime fallback: applyLocTranslation() → MyMemory API (병렬)
- 번역 필드: desc, hood, addr, hours, lastEntry, admission, tourInfo, transit, walkFrom
- 도구: translate-tool.html → data-*.js 선택 → Translate All → data-ko.js 다운로드 → push

## 주요 JS 함수
- openLoc(loc) — 패널 열기, LOCS_KO 정적 번역 우선 사용
- buildOverviewTab/buildVisitTab/buildDirectionsTab(loc, trans)
- loadVideosForTab(loc) — YouTube 2-stage fetch + hybrid score
- setLang(lang) / toggleLangMenu() / closeLangMenu()
- _makeStreetLayer() — Thunderforest(bilingual) or CartoDB fallback
- _loadLocsFromStorage() — localStorage merge (신규 location 포함)
- prefetchTranslations() — 백그라운드 번역 캐시 워밍

## 사이드바 구조
- .sb-filters: display:flex; flex-direction:column; height:240px (drag-resizable)
- #fsec-arch.open: flex:1 → 건축가 리스트 남은 공간 자동 채움

## 주의사항
- 새 location이 안 보이면 localStorage 캐시 문제 → _loadLocsFromStorage() merge 로직
- data-ko.js 없어도 동작 (typeof LOCS_KO undefined 가드 있음)
- GitHub Actions 403 → 코드 문제 아님, 빈 커밋으로 재시도
- Windows CMD: rm 대신 del /f .git\index.lock

## 새 Location 추가 순서
1. data-{city}.js에 entry 추가
2. translate-tool.html로 번역 → data-ko.js 업데이트
3. git add data-{city}.js data-ko.js index.html && git commit && git push
