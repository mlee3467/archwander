// ══════════════════════════════════════════════════════════════════
// QUIZ / FLASHCARD MODE
// Photo shown → guess style / architect / era (4 choices)
// ══════════════════════════════════════════════════════════════════

var _quizState = {
  questions: [],
  current: 0,
  score: 0,
  answered: false,
  total: 10,
};

var QUIZ_STORAGE_KEY = 'aw_quiz_best_v1';

function _quizBestScore() {
  try { return JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY) || '{}'); } catch(e) { return {}; }
}
function _quizSaveBest(type, score) {
  try {
    var d = _quizBestScore();
    if (!d[type] || score > d[type]) { d[type] = score; localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(d)); }
  } catch(e) {}
}

// ── Question generators ───────────────────────────────────────────

function _quizMakeStyleQ(loc, allLocs) {
  var correct = (loc.styleGroups && loc.styleGroups[0]) || loc.style;
  if (!correct) return null;
  var pool = [...new Set(allLocs.flatMap(function(l) { return l.styleGroups || []; }))];
  var wrong = _quizShuffle(pool.filter(function(s) { return s !== correct; })).slice(0, 3);
  if (wrong.length < 3) return null;
  return {
    type: 'style',
    prompt: 'What architectural style is this?',
    promptKo: '이 건물의 건축 양식은?',
    correct: correct,
    choices: _quizShuffle([correct, ...wrong]),
    loc: loc,
  };
}

function _quizMakeArchQ(loc, allLocs) {
  var correct = loc.arch || (loc.archs && loc.archs[0]);
  if (!correct) return null;
  var pool = [...new Set(allLocs.map(function(l) { return l.arch || (l.archs && l.archs[0]); }).filter(Boolean))];
  var wrong = _quizShuffle(pool.filter(function(a) { return a !== correct; })).slice(0, 3);
  if (wrong.length < 3) return null;
  return {
    type: 'architect',
    prompt: 'Who was the architect?',
    promptKo: '이 건물을 설계한 건축가는?',
    correct: correct,
    choices: _quizShuffle([correct, ...wrong]),
    loc: loc,
  };
}

function _quizMakeEraQ(loc) {
  if (!loc.yr) return null;
  var eraFn = function(yr) {
    if (yr < 1900) return 'Pre-1900';
    if (yr < 1930) return '1900–1929';
    if (yr < 1970) return '1930–1969';
    if (yr < 2000) return '1970–1999';
    return '2000–Present';
  };
  var correct = eraFn(loc.yr);
  var allEras = ['Pre-1900', '1900–1929', '1930–1969', '1970–1999', '2000–Present'];
  var wrong = _quizShuffle(allEras.filter(function(e) { return e !== correct; })).slice(0, 3);
  return {
    type: 'era',
    prompt: 'When was this building completed?',
    promptKo: '이 건물은 언제 완공되었을까요?',
    correct: correct,
    choices: _quizShuffle([correct, ...wrong]),
    loc: loc,
  };
}

function _quizShuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function _quizBuildQuestions() {
  var allLocs = (typeof LOCS !== 'undefined' ? LOCS : []).filter(function(l) {
    return l.photos && l.photos.length > 0;
  });
  if (allLocs.length < 8) return [];

  var shuffled = _quizShuffle(allLocs);
  var questions = [];
  var generators = [_quizMakeStyleQ, _quizMakeArchQ, _quizMakeEraQ];
  var gIdx = 0;

  for (var i = 0; i < shuffled.length && questions.length < _quizState.total; i++) {
    var loc = shuffled[i];
    var gen = generators[gIdx % generators.length];
    var q = (gen === _quizMakeEraQ) ? gen(loc) : gen(loc, allLocs);
    if (q) { questions.push(q); gIdx++; }
  }
  return questions;
}

// ── UI ────────────────────────────────────────────────────────────

function startQuiz() {
  var qs = _quizBuildQuestions();
  if (qs.length < 5) {
    var isKo = typeof LANG !== 'undefined' && LANG === 'ko';
    alert(isKo ? '퀴즈를 시작하려면 도시를 먼저 선택하세요.' : 'Please select a city first to start the quiz.');
    return;
  }
  _quizState.questions = qs;
  _quizState.current = 0;
  _quizState.score = 0;
  _quizState.answered = false;

  var existing = document.getElementById('quiz-overlay');
  if (existing) existing.parentNode.removeChild(existing);

  var overlay = document.createElement('div');
  overlay.id = 'quiz-overlay';
  overlay.className = 'quiz-overlay';
  document.body.appendChild(overlay);
  _quizRender();
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { overlay.classList.add('visible'); });
  });
}

function closeQuiz() {
  var el = document.getElementById('quiz-overlay');
  if (!el) return;
  el.classList.remove('visible');
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 250);
}

function _quizRender() {
  var overlay = document.getElementById('quiz-overlay');
  if (!overlay) return;
  var state = _quizState;
  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';

  if (state.current >= state.questions.length) {
    _quizShowResult(overlay);
    return;
  }

  var q = state.questions[state.current];
  var loc = q.loc;
  var progressPct = Math.round((state.current / state.questions.length) * 100);
  var photoSrc = (typeof photoUrl === 'function' && loc.photos && loc.photos[0])
    ? photoUrl(loc.photos[0], false, 'popup')
    : (loc.photos && loc.photos[0] ? loc.photos[0] : '');

  var choicesHtml = q.choices.map(function(c) {
    return '<button class="quiz-choice-btn" onclick="_quizAnswer(\'' + c.replace(/'/g, "\\'") + '\')">' + c + '</button>';
  }).join('');

  overlay.innerHTML =
    '<div class="quiz-panel">'
      + '<div class="quiz-hdr">'
        + '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + progressPct + '%"></div></div>'
        + '<div class="quiz-hdr-row">'
          + '<span class="quiz-counter">' + (state.current + 1) + ' / ' + state.questions.length + '</span>'
          + '<span class="quiz-score-label">⭐ ' + state.score + '</span>'
          + '<button class="quiz-close-btn" onclick="closeQuiz()">✕</button>'
        + '</div>'
      + '</div>'
      + '<div class="quiz-body">'
        + '<div class="quiz-type-badge quiz-type-' + q.type + '">'
            + (q.type === 'style' ? '🎨 ' : q.type === 'architect' ? '🏛 ' : '📅 ')
            + (isKo ? q.promptKo : q.prompt)
        + '</div>'
        + (photoSrc
          ? '<div class="quiz-photo-wrap"><img class="quiz-photo" src="' + photoSrc + '" alt=""></div>'
          : '<div class="quiz-photo-placeholder">🏛</div>')
        + '<div class="quiz-choices">' + choicesHtml + '</div>'
      + '</div>'
    + '</div>';
}

function _quizAnswer(choice) {
  if (_quizState.answered) return;
  _quizState.answered = true;
  var q = _quizState.questions[_quizState.current];
  var correct = choice === q.correct;
  if (correct) _quizState.score++;

  var overlay = document.getElementById('quiz-overlay');
  if (!overlay) return;
  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';

  // Mark buttons
  overlay.querySelectorAll('.quiz-choice-btn').forEach(function(btn) {
    btn.disabled = true;
    var text = btn.textContent.trim();
    if (text === q.correct) btn.classList.add('quiz-correct');
    else if (text === choice && !correct) btn.classList.add('quiz-wrong');
  });

  // Show reveal footer
  var panel = overlay.querySelector('.quiz-panel');
  var loc = q.loc;
  var reveal = document.createElement('div');
  reveal.className = 'quiz-reveal ' + (correct ? 'quiz-reveal-correct' : 'quiz-reveal-wrong');
  reveal.innerHTML =
    '<div class="quiz-reveal-result">'
      + (correct
        ? '<span class="quiz-result-icon">✓</span><span class="quiz-result-text">' + (isKo ? '정답!' : 'Correct!') + '</span>'
        : '<span class="quiz-result-icon quiz-result-icon-wrong">✗</span><span class="quiz-result-text">' + (isKo ? '오답 — 정답: ' : 'Wrong — Answer: ') + q.correct + '</span>')
    + '</div>'
    + '<div class="quiz-reveal-name">' + loc.name + (loc.yr ? ', ' + loc.yr : '') + '</div>'
    + '<div class="quiz-reveal-actions">'
      + '<button class="quiz-reveal-open" onclick="closeQuiz();openLocById(\'' + loc.id + '\')">' + (isKo ? '자세히 보기' : 'View building') + '</button>'
      + '<button class="quiz-reveal-next" onclick="_quizNext()">'
        + (_quizState.current + 1 >= _quizState.questions.length
          ? (isKo ? '결과 보기 →' : 'See results →')
          : (isKo ? '다음 →' : 'Next →'))
      + '</button>'
    + '</div>';
  panel.appendChild(reveal);
}

function _quizNext() {
  _quizState.current++;
  _quizState.answered = false;
  _quizRender();
}

function _quizShowResult(overlay) {
  var state = _quizState;
  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';
  var pct = Math.round((state.score / state.questions.length) * 100);
  var grade, gradeClass;
  if (pct >= 90) { grade = isKo ? '건축 전문가! 🏆' : 'Architecture Expert! 🏆'; gradeClass = 'grade-s'; }
  else if (pct >= 70) { grade = isKo ? '우수한 건축 지식! 🥇' : 'Architecture Enthusiast! 🥇'; gradeClass = 'grade-a'; }
  else if (pct >= 50) { grade = isKo ? '좋은 시작! 🥈' : 'Good start! 🥈'; gradeClass = 'grade-b'; }
  else { grade = isKo ? '더 공부해보세요 📖' : 'Keep exploring! 📖'; gradeClass = 'grade-c'; }

  // Save best score
  _quizSaveBest('mixed', state.score);
  var best = _quizBestScore();

  overlay.innerHTML =
    '<div class="quiz-panel quiz-result-panel">'
      + '<button class="quiz-close-btn" onclick="closeQuiz()" style="position:absolute;top:16px;right:16px">✕</button>'
      + '<div class="quiz-result-title">' + (isKo ? '퀴즈 완료!' : 'Quiz Complete!') + '</div>'
      + '<div class="quiz-result-score">' + state.score + ' / ' + state.questions.length + '</div>'
      + '<div class="quiz-result-grade ' + gradeClass + '">' + grade + '</div>'
      + '<div class="quiz-result-bar-wrap">'
        + '<div class="quiz-result-bar"><div class="quiz-result-bar-fill" style="width:' + pct + '%"></div></div>'
        + '<span class="quiz-result-pct">' + pct + '%</span>'
      + '</div>'
      + (best.mixed ? '<div class="quiz-best">🏅 ' + (isKo ? '최고 점수: ' : 'Best: ') + best.mixed + ' / ' + state.questions.length + '</div>' : '')
      + '<div class="quiz-result-actions">'
        + '<button class="quiz-result-retry" onclick="startQuiz()">' + (isKo ? '다시 도전' : 'Try again') + '</button>'
        + '<button class="quiz-result-close" onclick="closeQuiz()">' + (isKo ? '닫기' : 'Close') + '</button>'
      + '</div>'
    + '</div>';
}
