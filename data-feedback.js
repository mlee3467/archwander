// ArchWander — Feedback / Report Schema
// Reports submitted by users are stored in localStorage under REPORTS_STORAGE_KEY.
// This file defines the schema, categories, and helper functions used by both
// the main app (index.html) and the review tool (Archwander_tools/feedback-review-tool.html).

const REPORTS_STORAGE_KEY = 'archwander_reports_v1';

const REPORT_ISSUE_TYPES = {
  wrong_info:    { label: 'Wrong information',        labelKo: '잘못된 정보',      icon: '📝' },
  wrong_coords:  { label: 'Wrong map location',       labelKo: '지도 위치 오류',   icon: '📍' },
  wrong_hours:   { label: 'Wrong hours / admission',  labelKo: '운영시간/입장료 오류', icon: '🕐' },
  missing_info:  { label: 'Missing information',      labelKo: '정보 누락',        icon: '❓' },
  photo_issue:   { label: 'Photo issue',              labelKo: '사진 문제',        icon: '🖼' },
  closed:        { label: 'Permanently closed',       labelKo: '영구 폐쇄',        icon: '🔒' },
  other:         { label: 'Other',                    labelKo: '기타',             icon: '⚠️' },
};

const REPORT_STATUSES = {
  new:       { label: 'New',       color: '#EF4444' },
  reviewed:  { label: 'Reviewed',  color: '#F59E0B' },
  resolved:  { label: 'Resolved',  color: '#16A34A' },
  dismissed: { label: 'Dismissed', color: '#9CA3AF' },
};

// Report object schema:
// {
//   id:        number   — Date.now() at submission time
//   locId:     string   — location ID (e.g. 'empire-state')
//   locName:   string   — human-readable name
//   city:      string   — city code ('new-york', 'seoul', 'london', 'tokyo')
//   type:      string   — key from REPORT_ISSUE_TYPES
//   typeLabel: string   — human-readable issue type
//   desc:      string   — user's description (may be empty)
//   lang:      string   — UI language at time of report ('en' | 'ko')
//   date:      string   — ISO 8601 timestamp
//   status:    string   — key from REPORT_STATUSES (default: 'new')
//   note:      string   — operator note (added via review tool)
// }
