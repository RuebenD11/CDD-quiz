// mastery.js — Topic mastery scoring + heatmap data model. window.CDDMastery.
//   score = 50*accuracy + 20*consistency + 15*recency + 15*improvement   (0-100)

(function () {
  "use strict";
  const DAY = 86_400_000;
  const RECENCY_WINDOW_DAYS = 30;

  function scoreFromStats(stats, nowMs) {
    if (!stats || (stats.attempts || 0) === 0) {
      return { score: 0, level: "untouched", accuracy: 0, consistency: 0, recency: 0, improvement: 0, attempts: 0, correct: 0, lastSeen: null };
    }
    const now = nowMs || Date.now();
    const attempts = stats.attempts || 0;
    const correct = stats.correct || 0;
    const accuracy = correct / attempts;

    const recent = (stats.recentResults || []).slice(-10);
    let consistency;
    if (recent.length > 0) {
      const p = recent.filter((x) => x).length / recent.length;
      consistency = Math.max(0, Math.min(1, 1 - 4 * (p * (1 - p))));
    } else consistency = accuracy >= 0.5 ? 0.5 : 0;

    let recency = 0;
    if (stats.lastSeen != null) {
      const daysSince = (now - stats.lastSeen) / DAY;
      recency = Math.max(0, Math.min(1, 1 - daysSince / RECENCY_WINDOW_DAYS));
    }

    let improvement = 0.5;
    if (recent.length >= 4) {
      const half = Math.floor(recent.length / 2);
      const f = recent.slice(0, half), l = recent.slice(half);
      const fa = f.filter((x) => x).length / f.length;
      const la = l.filter((x) => x).length / l.length;
      improvement = Math.max(0, Math.min(1, 0.5 + (la - fa) * 0.5));
    } else improvement = accuracy;

    const score = Math.round(accuracy * 50 + consistency * 20 + recency * 15 + improvement * 15);
    return { score, level: levelFromScore(score), accuracy, consistency, recency, improvement, attempts, correct, lastSeen: stats.lastSeen };
  }

  function levelFromScore(s) {
    if (s >= 85) return "mastered";
    if (s >= 70) return "strong";
    if (s >= 50) return "developing";
    return "weak";
  }

  function topicMastery(topic, statsMap, allQuestions) {
    const qs = allQuestions.filter((q) => q.topic === topic);
    let attempts = 0, correct = 0, lastSeen = 0, seenQuestions = 0;
    const allRecent = [];
    qs.forEach((q) => {
      const s = statsMap[q.id];
      if (!s || (s.attempts || 0) === 0) return;
      seenQuestions += 1; attempts += s.attempts || 0; correct += s.correct || 0;
      if (s.lastSeen && s.lastSeen > lastSeen) lastSeen = s.lastSeen;
      (s.recentResults || []).forEach((r) => allRecent.push(r));
    });
    if (attempts === 0) {
      return { topic, score: 0, level: "untouched", accuracy: 0, attempts: 0, correct: 0, lastSeen: null, totalQuestions: qs.length, seenQuestions: 0 };
    }
    const m = scoreFromStats({ attempts, correct, lastSeen, recentResults: allRecent.slice(-10) });
    return { ...m, topic, totalQuestions: qs.length, seenQuestions };
  }

  function questionMastery(question, statsMap) {
    const m = scoreFromStats(statsMap[question.id]);
    return { ...m, id: question.id, topic: question.topic };
  }

  function buildHeatmap(topics, statsMap, allQuestions) {
    return topics.map((t) => topicMastery(t, statsMap, allQuestions));
  }

  function masteryInsights(heatmap) {
    const out = [];
    const seen = heatmap.filter((h) => h.attempts > 0);
    if (seen.length === 0) {
      out.push({ tone: "neutral", title: "Knowledge map is empty", text: "Answer a few questions and your block-by-block mastery will appear here." });
      return out;
    }
    const weak = seen.filter((h) => h.level === "weak");
    const mastered = seen.filter((h) => h.level === "mastered");
    const developing = seen.filter((h) => h.level === "developing");
    if (weak.length) out.push({ tone: "warning", title: `${weak.length} weak block${weak.length === 1 ? "" : "s"}`, text: `Focus here for the biggest gains: ${weak.slice(0, 3).map((h) => h.topic).join(", ")}${weak.length > 3 ? "…" : ""}.` });
    if (mastered.length) out.push({ tone: "positive", title: `Mastered ${mastered.length} block${mastered.length === 1 ? "" : "s"}`, text: `Strong, consistent recall in ${mastered.slice(0, 3).map((h) => h.topic).join(", ")}${mastered.length > 3 ? "…" : ""}. Smart Revision will surface these less often.` });
    if (developing.length && !weak.length) out.push({ tone: "neutral", title: "On the cusp", text: `${developing.length} block${developing.length === 1 ? "" : "s"} in the developing band — a few focused sessions could push them to strong.` });
    const now = Date.now();
    const stale = seen.filter((h) => h.lastSeen && (now - h.lastSeen) / DAY > 14 && h.score >= 50).sort((a, b) => a.lastSeen - b.lastSeen);
    if (stale.length) out.push({ tone: "neutral", title: "Time to refresh", text: `${stale[0].topic} hasn't been reviewed in over two weeks — Smart Revision will cycle it back in.` });
    return out;
  }

  window.CDDMastery = { DAY, scoreFromStats, levelFromScore, topicMastery, questionMastery, buildHeatmap, masteryInsights };
})();
