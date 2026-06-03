// srs.js — Spaced-repetition (SM-2 inspired) + Smart-Mode question selection.
// Pure logic, no DOM. window.CDDSRS.
//
// SAQ/case items are graded by a fractional score (earned/total). We map that
// fraction (optionally blended with a confidence rating) to an SM-2 quality 0-5.

(function () {
  "use strict";
  const DAY = 86_400_000;

  // Quality 0..5 from (scoreFraction, optional confidence 1..5).
  function qualityFromScore(frac, confidence) {
    let q;
    if (frac >= 0.85) q = 5;
    else if (frac >= 0.6) q = 4;
    else if (frac >= 0.4) q = 3;
    else if (frac >= 0.2) q = 2;
    else if (frac > 0) q = 1;
    else q = 0;
    // Confidence nudges by +/-1 (confidently wrong should hurt; hesitant-correct shouldn't max)
    if (confidence != null) {
      const c = Number(confidence);
      if (frac >= 0.6 && c <= 2) q = Math.max(3, q - 1);       // got it but unsure
      if (frac < 0.4 && c >= 4) q = Math.max(0, q - 1);        // confidently wrong
    }
    return q;
  }

  // Boolean-correct convenience (MCQ / short).
  function qualityFromCorrect(correct, confidence) {
    return qualityFromScore(correct ? 1 : 0, confidence);
  }

  function updateStats(stats, { scoreFrac, correct, confidence }, nowMs) {
    const now = nowMs || Date.now();
    const frac = typeof scoreFrac === "number" ? scoreFrac : (correct ? 1 : 0);
    const isCorrect = frac >= 0.6;
    const q = (typeof scoreFrac === "number")
      ? qualityFromScore(frac, confidence)
      : qualityFromCorrect(correct, confidence);

    let ease = stats.ease == null ? 2.5 : stats.ease;
    ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

    let reps = stats.reps || 0;
    let interval = stats.interval || 0;
    let lapses = stats.lapses || 0;

    if (q < 3) {
      reps = 0; interval = 1; lapses += 1;
    } else {
      reps += 1;
      if (reps === 1) interval = 1;
      else if (reps === 2) interval = 3;
      else interval = Math.max(1, Math.round((stats.interval || 1) * ease));
    }

    const recent = (stats.recentResults || []).concat(!!isCorrect).slice(-10);

    return {
      ...stats,
      attempts: (stats.attempts || 0) + 1,
      correct: (stats.correct || 0) + (isCorrect ? 1 : 0),
      incorrect: (stats.incorrect || 0) + (isCorrect ? 0 : 1),
      lastSeen: now,
      lastConfidence: confidence == null ? null : Number(confidence),
      lastScoreFrac: frac,
      ease, reps, interval, lapses,
      due: now + interval * DAY,
      recentResults: recent,
    };
  }

  function computePriority(stats, nowMs) {
    const now = nowMs || Date.now();
    const attempts = stats.attempts || 0;
    const accuracy = attempts > 0 ? stats.correct / attempts : 0;
    const weakness = attempts > 0 ? (1 - accuracy) : 0;
    const unseen = attempts === 0 ? 1 : 0;

    let dueScore = 0;
    if (stats.due != null) {
      const daysOverdue = (now - stats.due) / DAY;
      const interval = Math.max(1, stats.interval || 1);
      if (daysOverdue >= 0) dueScore = Math.min(2, daysOverdue / interval) + 0.5;
    }
    const last3 = (stats.recentResults || []).slice(-3);
    const recentWrong = last3.length ? last3.filter((x) => !x).length / last3.length : 0;

    return 50 * dueScore + 35 * weakness + 20 * unseen + 10 * recentWrong;
  }

  function selectQuestions(pool, statsMap, count, opts = {}) {
    const now = Date.now();
    const tmm = opts.topicMasteryMap || null;
    const ranked = pool.map((q) => {
      const s = statsMap[q.id] || { attempts: 0, correct: 0, recentResults: [] };
      let p = computePriority(s, now);
      if (tmm && tmm[q.topic] != null) {
        const m = Math.max(0, Math.min(100, tmm[q.topic]));
        p += 15 * (1 - m / 100);
      }
      return { q, p };
    });
    ranked.sort((a, b) => (b.p - a.p) || (Math.random() - 0.5));
    return ranked.slice(0, count).map((r) => r.q);
  }

  function getDueCount(pool, statsMap) {
    const now = Date.now();
    return pool.filter((q) => { const s = statsMap[q.id]; return s && s.due != null && s.due <= now; }).length;
  }

  function dueItems(pool, statsMap) {
    const now = Date.now();
    return pool.filter((q) => { const s = statsMap[q.id]; return !s || s.due == null || s.due <= now; });
  }

  function priorityLabel(priority, stats) {
    if (priority >= 70) return { label: "High priority", level: "high" };
    if (priority >= 40) return { label: "Needs review", level: "med" };
    if (stats && (stats.attempts || 0) === 0) return { label: "New", level: "new" };
    return null;
  }

  window.CDDSRS = {
    DAY, qualityFromScore, qualityFromCorrect, updateStats,
    computePriority, selectQuestions, getDueCount, dueItems, priorityLabel,
  };
})();
