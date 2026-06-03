// analytics.js — Aggregations + insight derivation. Pure logic. window.CDDAnalytics.

(function () {
  "use strict";

  function getOverview(sessions, statsMap) {
    let totalAnswered = 0, totalCorrect = 0;
    sessions.forEach((s) => { totalAnswered += s.total || 0; totalCorrect += s.correct || 0; });
    return {
      totalQuizzes: sessions.length,
      totalAnswered, totalCorrect, totalIncorrect: totalAnswered - totalCorrect,
      accuracy: totalAnswered === 0 ? 0 : totalCorrect / totalAnswered,
      uniqueQuestionsSeen: Object.keys(statsMap).length,
    };
  }

  function getTopicBreakdown(statsMap, topics) {
    const map = {};
    topics.forEach((t) => { map[t] = { topic: t, attempts: 0, correct: 0 }; });
    Object.values(statsMap).forEach((s) => {
      if (!s || !s.topic || !map[s.topic]) return;
      map[s.topic].attempts += s.attempts || 0;
      map[s.topic].correct += s.correct || 0;
    });
    return Object.values(map).map((o) => ({ ...o, incorrect: o.attempts - o.correct, accuracy: o.attempts === 0 ? null : o.correct / o.attempts }));
  }

  function getRecentTrend(sessions, n = 10) {
    return sessions.slice(-n).map((s) => ({
      timestamp: s.timestamp, accuracy: s.total === 0 ? 0 : s.correct / s.total,
      total: s.total || 0, correct: s.correct || 0, mode: s.mode,
    }));
  }

  function getStrongestWeakest(breakdown, minAttempts = 3) {
    const f = breakdown.filter((b) => b.attempts >= minAttempts && b.accuracy != null);
    if (!f.length) return { strongest: null, weakest: null };
    const s = f.slice().sort((a, b) => b.accuracy - a.accuracy);
    return { strongest: s[0], weakest: s[s.length - 1] === s[0] ? null : s[s.length - 1] };
  }

  function getMostMissed(statsMap, limit = 6) {
    return Object.values(statsMap)
      .filter((s) => (s.attempts || 0) >= 2 && s.incorrect > 0)
      .map((s) => ({ ...s, missRate: s.incorrect / s.attempts }))
      .sort((a, b) => (b.missRate - a.missRate) || (b.incorrect - a.incorrect))
      .slice(0, limit);
  }

  function getInsights(sessions, statsMap, topics) {
    const out = [];
    const overview = getOverview(sessions, statsMap);
    const sw = getStrongestWeakest(getTopicBreakdown(statsMap, topics));
    if (overview.totalQuizzes === 0) {
      out.push({ tone: "neutral", title: "No data yet", text: "Finish your first quiz to unlock analytics and Smart Revision." });
      return out;
    }
    if (sessions.length >= 4) {
      const r5 = sessions.slice(-5), p5 = sessions.slice(-10, -5);
      const ra = r5.reduce((a, s) => a + (s.correct || 0), 0) / Math.max(1, r5.reduce((a, s) => a + (s.total || 0), 0));
      if (p5.length) {
        const pa = p5.reduce((a, s) => a + (s.correct || 0), 0) / Math.max(1, p5.reduce((a, s) => a + (s.total || 0), 0));
        const d = ra - pa, pct = Math.round(Math.abs(d) * 100);
        if (d >= 0.05) out.push({ tone: "positive", title: "Trending up", text: `Accuracy up ${pct} points across your last 5 sessions. Keep the momentum.` });
        else if (d <= -0.05) out.push({ tone: "warning", title: "Trending down", text: `Accuracy down ${pct} points across your last 5 sessions. Review recent misses before pushing on.` });
        else out.push({ tone: "neutral", title: "Steady performance", text: "Accuracy stable recently — a good time to broaden into less-practised blocks." });
      }
    }
    if (sw.weakest) out.push({ tone: "warning", title: "Weakest block", text: `${sw.weakest.topic} — ${Math.round(sw.weakest.accuracy * 100)}% across ${sw.weakest.attempts} attempts. Smart Revision will prioritise it.` });
    if (sw.strongest) out.push({ tone: "positive", title: "Strongest block", text: `${sw.strongest.topic} — ${Math.round(sw.strongest.accuracy * 100)}% accuracy. Keep it warm with the occasional review.` });
    return out;
  }

  window.CDDAnalytics = { getOverview, getTopicBreakdown, getRecentTrend, getStrongestWeakest, getMostMissed, getInsights };
})();
