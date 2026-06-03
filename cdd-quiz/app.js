// app.js — CDD Revision application controller.
// Orchestrates views, the quiz lifecycle, SRS persistence, case studies,
// the exam simulator, the error book and the analytics dashboard.
// Depends on: TOPICS, BLOCKS, MCQ_BANK (questions.js); SAQ_BANK (saqs.js);
// CALC_BANK (calcs.js); CASE_BANK (cases.js); CDDMatcher, CDDStorage, CDDSRS,
// CDDMastery, CDDAnalytics; global Chart (Chart.js via CDN).

(function () {
  "use strict";

  // QUESTION_BANK = MCQ + SAQ + Calc + (flattened case parts), merged at boot.
  let QUESTION_BANK = [];

  const state = {
    selectedTopics: new Set(TOPICS),
    length: 10,
    format: "mixed",         // mixed | saq | mcq | calc
    autoGrade: true,
    randomiseOrder: true,
    confidenceEnabled: true,
    quiz: null,
    pending: null,
    charts: {},
    settings: { apiKey: "", apiModel: "claude-sonnet-4-6" },
  };

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  let toastTimer = null;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2400); }

  // ----- markdown-lite renderer for case scenarios (paragraphs + pipe tables) -----
  function renderMarkdownLite(text) {
    const lines = String(text).split(/\r?\n/);
    let html = "", tableRows = [], inTable = false;
    const flush = () => {
      if (!inTable) return;
      const rows = tableRows.filter((r) => !/^\s*\|[-\s:|]+\|\s*$/.test(r));
      let h = "<div class='scroll-x'><table>";
      rows.forEach((line, idx) => {
        const cells = line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        const tag = idx === 0 ? "th" : "td";
        h += "<tr>" + cells.map((c) => `<${tag}>${esc(c)}</${tag}>`).join("") + "</tr>";
      });
      html += h + "</table></div>"; inTable = false; tableRows = [];
    };
    for (const ln of lines) {
      if (/^\s*\|.*\|\s*$/.test(ln)) { inTable = true; tableRows.push(ln); }
      else { flush(); html += ln.trim() === "" ? "" : `<p>${esc(ln)}</p>`; }
    }
    flush();
    return html;
  }

  // =================================================================
  // Boot: merge banks into QUESTION_BANK
  // =================================================================
  function buildQuestionBank() {
    const bank = [];
    (typeof MCQ_BANK !== "undefined" ? MCQ_BANK : []).forEach((q) => bank.push(q));
    (typeof SAQ_BANK !== "undefined" ? SAQ_BANK : []).forEach((q) => bank.push(q));
    (typeof CALC_BANK !== "undefined" ? CALC_BANK : []).forEach((q) => bank.push(q));
    // flatten case parts as standalone gradable items (tagged to their block)
    (typeof CASE_BANK !== "undefined" ? CASE_BANK : []).forEach((cs) => {
      cs.parts.forEach((p) => {
        bank.push({
          id: `${cs.id}::${p.id}`, topic: cs.topic, type: "saq",
          lecture: cs.title, source: cs.source, marks: p.marks,
          question: p.stem, markScheme: p.markScheme,
          modelAnswer: p.modelAnswer, modelExpanded: p.modelExpanded,
          _case: cs.id, _caseTitle: cs.title, _scenario: cs.scenario, _chart: cs.chart,
        });
      });
    });
    return bank;
  }

  // =================================================================
  // Prefs
  // =================================================================
  function loadPrefs() {
    try {
      const raw = localStorage.getItem(CDDStorage.prefsKey());
      if (raw) {
        const d = JSON.parse(raw);
        if (Array.isArray(d.selectedTopics)) state.selectedTopics = new Set(d.selectedTopics.filter((t) => TOPICS.includes(t)));
        if (typeof d.length !== "undefined") state.length = d.length;
        if (typeof d.format === "string") state.format = d.format;
        if (typeof d.autoGrade === "boolean") state.autoGrade = d.autoGrade;
        if (typeof d.randomiseOrder === "boolean") state.randomiseOrder = d.randomiseOrder;
        if (typeof d.confidenceEnabled === "boolean") state.confidenceEnabled = d.confidenceEnabled;
        if (d.theme) document.documentElement.setAttribute("data-theme", d.theme);
      }
    } catch (e) {}
    state.settings = CDDStorage.getSettings();
  }
  function savePrefs() {
    try {
      localStorage.setItem(CDDStorage.prefsKey(), JSON.stringify({
        selectedTopics: [...state.selectedTopics], length: state.length, format: state.format,
        autoGrade: state.autoGrade, randomiseOrder: state.randomiseOrder, confidenceEnabled: state.confidenceEnabled,
        theme: document.documentElement.getAttribute("data-theme"),
      }));
    } catch (e) {}
  }

  // streak
  function bumpStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const last = localStorage.getItem(CDDStorage.lastDayKey());
    let streak = parseInt(localStorage.getItem(CDDStorage.streakKey()) || "0", 10);
    if (last !== today) {
      const y = new Date(); y.setDate(y.getDate() - 1);
      streak = last === y.toISOString().slice(0, 10) ? streak + 1 : 1;
      localStorage.setItem(CDDStorage.lastDayKey(), today);
      localStorage.setItem(CDDStorage.streakKey(), String(streak));
    }
    $("#streakValue").textContent = streak;
  }
  function getStreak() { return parseInt(localStorage.getItem(CDDStorage.streakKey()) || "0", 10); }

  // =================================================================
  // View navigation
  // =================================================================
  function showView(name) {
    $$(".view").forEach((v) => v.classList.remove("active"));
    const t = $("#view-" + name); if (t) t.classList.add("active");
    $$(".nav-link").forEach((a) => a.classList.toggle("active", a.dataset.view === name));
    if (name === "analytics") renderAnalytics();
    if (name === "cases") renderCaseList();
    if (name === "exam") renderExamIntro();
    if (name === "markscheme") renderMarkscheme();
    if (name === "errors") renderErrorBook();
    if (name === "dashboard") { updateSmartBanner(); updateStartMeta(); }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // =================================================================
  // Dashboard
  // =================================================================
  function renderHeroStats() {
    const total = QUESTION_BANK.length;
    const saq = QUESTION_BANK.filter((q) => q.type === "saq").length;
    const mcq = QUESTION_BANK.filter((q) => q.type === "mcq").length;
    const calc = QUESTION_BANK.filter((q) => q.type === "calc").length;
    $("#heroStats").innerHTML = `
      <div class="stat"><div class="stat-value">${total}</div><div class="stat-label">questions</div></div>
      <div class="stat"><div class="stat-value">${TOPICS.length}</div><div class="stat-label">blocks</div></div>
      <div class="stat"><div class="stat-value">${saq}</div><div class="stat-label">SAQs</div></div>
      <div class="stat"><div class="stat-value">${calc}</div><div class="stat-label">calculations</div></div>
      <div class="stat"><div class="stat-value">${CASE_BANK.length}</div><div class="stat-label">case studies</div></div>`;
  }

  function renderTopicGrid() {
    const grid = $("#topicGrid"); grid.innerHTML = "";
    BLOCKS.forEach((b) => {
      const count = QUESTION_BANK.filter((q) => q.topic === b.topic).length;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "topic" + (state.selectedTopics.has(b.topic) ? " selected" : "");
      el.innerHTML = `
        <span class="topic-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        <span class="topic-body"><span class="topic-name">${esc(b.topic)}</span><span class="topic-lectures">${esc(b.lectures.join(" · "))}</span></span>
        <span class="topic-count">${count}</span>`;
      el.addEventListener("click", () => {
        if (state.selectedTopics.has(b.topic)) state.selectedTopics.delete(b.topic); else state.selectedTopics.add(b.topic);
        el.classList.toggle("selected"); savePrefs(); updateStartMeta(); updateSmartBanner();
      });
      grid.appendChild(el);
    });
  }

  function bindChipRows() {
    $$("#lengthRow .chip").forEach((c) => {
      const v = c.dataset.length;
      c.classList.toggle("selected", (v === "all" && state.length === "all") || parseInt(v, 10) === state.length);
      c.addEventListener("click", () => { $$("#lengthRow .chip").forEach((x) => x.classList.remove("selected")); c.classList.add("selected"); state.length = v === "all" ? "all" : parseInt(v, 10); savePrefs(); updateStartMeta(); });
    });
    $$("#formatRow .chip").forEach((c) => {
      c.classList.toggle("selected", state.format === c.dataset.format);
      c.addEventListener("click", () => { $$("#formatRow .chip").forEach((x) => x.classList.remove("selected")); c.classList.add("selected"); state.format = c.dataset.format; savePrefs(); updateStartMeta(); updateSmartBanner(); });
    });
    const bind = (id, key) => { const el = $(id); el.checked = state[key]; el.addEventListener("change", (e) => { state[key] = e.target.checked; savePrefs(); }); };
    bind("#autoGrade", "autoGrade"); bind("#randomiseOrder", "randomiseOrder"); bind("#confidenceEnabled", "confidenceEnabled");
  }

  function eligible() {
    return QUESTION_BANK.filter((q) => {
      if (!state.selectedTopics.has(q.topic)) return false;
      if (state.format === "mcq") return q.type === "mcq";
      if (state.format === "saq") return q.type === "saq";
      if (state.format === "calc") return q.type === "calc";
      return true; // mixed
    });
  }

  function updateStartMeta() {
    const el = eligible(), meta = $("#startMeta"), btn = $("#startBtn");
    if (state.selectedTopics.size === 0) { meta.textContent = "Select at least one block."; btn.disabled = true; return; }
    if (el.length === 0) { meta.textContent = "No questions match your filters."; btn.disabled = true; return; }
    const n = state.length === "all" ? el.length : Math.min(state.length, el.length);
    meta.textContent = `${n} question${n === 1 ? "" : "s"} from ${state.selectedTopics.size} block${state.selectedTopics.size === 1 ? "" : "s"} (${el.length} available).`;
    btn.disabled = false;
  }

  function updateSmartBanner() {
    const el = eligible(), stats = CDDStorage.getAllStats();
    const due = CDDSRS.getDueCount(el, stats);
    const seen = el.filter((q) => stats[q.id] && stats[q.id].attempts > 0).length;
    const sub = $("#smartBannerSub"), btn = $("#smartBtn");
    if (el.length === 0) { sub.textContent = "Select at least one block to use Smart Revision."; btn.disabled = true; return; }
    btn.disabled = false;
    if (seen === 0) sub.textContent = "No history yet — Smart Revision will start with a balanced sample of your selected blocks.";
    else if (due > 0) sub.textContent = `${due} question${due === 1 ? "" : "s"} due for review · ${seen} seen. Smart Revision picks weak and overdue items first.`;
    else sub.textContent = `Nothing strictly due — ${seen} seen so far. Smart Revision will focus on your weakest material.`;
    const n = state.length === "all" ? Math.min(20, el.length) : Math.min(state.length, el.length);
    btn.textContent = `Start Smart Revision (${n}) →`;
  }

  // =================================================================
  // Quiz lifecycle
  // =================================================================
  function buildOptionOrder(options, correctIdx) {
    const indexed = options.map((text, i) => ({ text, i }));
    const order = shuffle(indexed);
    return { options: order.map((o) => o.text), correctIndex: order.findIndex((o) => o.i === correctIdx) };
  }

  function startQuiz({ mode = "standard", custom = null } = {}) {
    let pool = custom || eligible();
    const target = state.length === "all" ? pool.length : Math.min(state.length, pool.length);
    if (mode === "smart" && !custom) {
      const stats = CDDStorage.getAllStats();
      const heatmap = CDDMastery.buildHeatmap(TOPICS, stats, QUESTION_BANK);
      const tmm = {}; heatmap.forEach((c) => { tmm[c.topic] = c.score; });
      pool = CDDSRS.selectQuestions(pool, stats, target, { topicMasteryMap: tmm });
    } else {
      if (state.randomiseOrder) pool = shuffle(pool);
      pool = pool.slice(0, target);
    }
    if (!pool.length) return;
    const stats = CDDStorage.getAllStats(); const now = Date.now();
    state.quiz = {
      mode, index: 0, score: 0, totalMarks: 0, earnedMarks: 0, answers: [],
      questions: pool.map((q) => ({
        ...q,
        _display: q.type === "mcq" ? buildOptionOrder(q.options, q.answer) : null,
        _priority: CDDSRS.computePriority(stats[q.id] || { attempts: 0, correct: 0, recentResults: [] }, now),
        _stats: stats[q.id] || null,
      })),
    };
    state.pending = null;
    showView("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const quiz = state.quiz, q = quiz.questions[quiz.index];
    $("#progressLabel").textContent = `Question ${quiz.index + 1} of ${quiz.questions.length}`;
    $("#scoreLabel").textContent = `Score: ${quiz.score}`;
    $("#progressFill").style.width = `${(quiz.index / quiz.questions.length) * 100}%`;

    let badge = "";
    if (quiz.mode === "smart") { const l = CDDSRS.priorityLabel(q._priority, q._stats); if (l) badge = `<span class="priority-badge ${l.level}">${l.label}</span>`; }
    const marks = q.marks || (q.markScheme ? q.markScheme.reduce((a, p) => a + (p.marks || 1), 0) : null);
    const tags = [
      `<span class="q-tag accent">${esc(q.topic.split(" · ")[0])}</span>`,
      `<span class="q-tag">${q.type === "mcq" ? "MCQ" : q.type === "calc" ? "Calculation" : "SAQ"}</span>`,
      q.source && q.source !== "core" ? `<span class="q-tag">${esc(q.source)} paper</span>` : "",
      marks ? `<span class="q-tag marks">${marks} mark${marks === 1 ? "" : "s"}</span>` : "",
      badge,
    ].join("");

    const scenario = q._scenario ? `<div class="q-scenario"><strong class="small muted">From case: ${esc(q._caseTitle)}</strong>${renderMarkdownLite(q._scenario)}</div>` : "";

    let bodyHtml = "";
    if (q.type === "mcq") {
      bodyHtml = `<div class="options" id="optionsContainer"></div>`;
    } else if (q.type === "calc") {
      bodyHtml = `
        <div class="recall-tools"><button class="btn btn-sm" data-act="timer">⏱ Timed (90s)</button><span class="timer" data-role="timer" hidden>01:30</span></div>
        ${q.formula ? `<div class="form-hint"><b>Formula:</b> ${esc(q.formula)}</div>` : ""}
        <div class="calc-input-row"><input class="short-input calc-input" id="calcInput" placeholder="Answer e.g. 3.5" autocomplete="off"/><span class="form-hint">${q.unit ? "units: " + esc(q.unit) : ""}</span></div>
        <label class="field-label" style="margin-top:10px">Working (optional)</label>
        <textarea class="saq-input" id="calcWork" style="min-height:70px" placeholder="Show your working — units are required for full marks."></textarea>
        <div class="form-controls"><button class="btn btn-primary btn-sm" id="submitBtn">Check</button></div>`;
    } else { // saq
      bodyHtml = `
        <div class="recall-tools"><button class="btn btn-sm" data-act="timer">⏱ Timed recall (120s)</button><button class="btn btn-sm" data-act="blank">📄 Blank-page</button><span class="timer" data-role="timer" hidden>02:00</span></div>
        <textarea class="saq-input" id="saqInput" placeholder="Write your answer. Each mark-scheme point you cover scores. Phrasing is flexible — synonyms, abbreviations and minor typos are accepted."></textarea>
        <div class="form-controls"><button class="btn btn-primary btn-sm" id="submitBtn">Submit</button><button class="btn btn-ghost btn-sm" id="aiBtn">Examiner feedback (AI)</button><span class="form-hint" id="saqHint"></span></div>`;
    }

    $("#questionCard").innerHTML = `
      <div class="question-tags">${tags}</div>
      ${scenario}
      <h2 class="question-text">${esc(q.question)}</h2>
      ${bodyHtml}
      <div class="feedback" id="feedback" hidden></div>
      <div class="quiz-controls"><button class="btn btn-primary" id="nextBtn" disabled>${quiz.index === quiz.questions.length - 1 ? "Finish →" : "Next →"}</button></div>`;

    state.pending = null;
    wireQuestion(q);
    $("#nextBtn").addEventListener("click", nextQuestion);
  }

  function wireQuestion(q) {
    if (q.type === "mcq") {
      const cont = $("#optionsContainer"); const labels = ["A", "B", "C", "D", "E", "F"];
      q._display.options.forEach((text, idx) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "option";
        b.innerHTML = `<span class="marker">${labels[idx]}</span><span class="option-text">${esc(text)}</span>`;
        b.addEventListener("click", () => handleMcq(idx, q));
        cont.appendChild(b);
      });
    } else if (q.type === "calc") {
      $("#submitBtn").addEventListener("click", () => handleCalc(q));
      $("#calcInput").focus();
      bindTimer(q, 90);
    } else {
      const hint = $("#saqHint");
      const total = q.marks || (q.markScheme || []).reduce((a, p) => a + (p.marks || 1), 0);
      hint.textContent = `${total} mark${total === 1 ? "" : "s"} · pass at 60%`;
      $("#submitBtn").addEventListener("click", () => handleSaq(q));
      $("#aiBtn").addEventListener("click", () => openAiFeedback(q, $("#saqInput").value));
      $("#saqInput").focus();
      bindTimer(q, 120);
      $$("[data-act=blank]").forEach((b) => b.addEventListener("click", () => { const ta = $("#saqInput"); ta.value = ""; ta.style.minHeight = "240px"; ta.placeholder = "Blank-page recall — write a full structured answer before submitting."; ta.focus(); toast("Blank-page mode: write a full answer, then submit."); }));
    }
  }

  function bindTimer(q, secs) {
    const btn = $("[data-act=timer]"); if (!btn) return;
    const tEl = $("[data-role=timer]");
    btn.addEventListener("click", () => {
      tEl.hidden = false; let left = secs; let iv;
      const tick = () => {
        const m = Math.floor(left / 60), s = left % 60;
        tEl.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        tEl.classList.toggle("warn", left <= 30 && left > 10);
        tEl.classList.toggle("bad", left <= 10);
        if (left <= 0) { clearInterval(iv); tEl.textContent = "TIME"; const sb = $("#submitBtn"); if (sb && !state.pending) sb.click(); return; }
        left--;
      };
      tick(); iv = setInterval(tick, 1000);
    });
  }

  // ---- writing coach ----
  const VAGUE = ["helps with", "is important", "is good", "is bad", "sort of", "kind of", "does stuff", "stuff", "a lot of", "a bit", "various", "it works"];
  function writingFlags(text) {
    const flags = [];
    if (!text || text.trim().length < 5) return ["No answer typed — attempt it before revealing the scheme."];
    const t = text.toLowerCase(), words = text.trim().split(/\s+/).length;
    for (const v of VAGUE) if (t.includes(v)) { flags.push(`Vague phrase “${v}” — replace with a precise mechanism, number or term.`); break; }
    if (words > 220) flags.push(`Long answer (~${words} words). SAQ points are 1–2 sentences each — be more concise.`);
    if (words < 8) flags.push("Very short answer — likely missing mark points (one precise point per mark).");
    if (/\b\d+(\.\d+)?\b/.test(text) && !/(mg|kg|µ|μ|nm|nM|µM|mM|\bM\b|\bL\b|\bh\b|min|mL|%|Da|mN)/.test(text)) flags.push("Numerical value without units — units are required for full marks.");
    if (!/\b(because|due to|via|through|so that|therefore|hence|as)\b/i.test(text) && words > 20) flags.push("No explanatory connective (“because/via/therefore”) — make your reasoning explicit.");
    return flags;
  }

  function handleMcq(idx, q) {
    const correctIdx = q._display.correctIndex, ok = idx === correctIdx;
    $$(".option").forEach((el, i) => { el.disabled = true; if (i === correctIdx) el.classList.add("correct"); if (i === idx && !ok) el.classList.add("incorrect"); });
    state.pending = { type: "mcq", correct: ok, scoreFrac: ok ? 1 : 0, given: q._display.options[idx], correctText: q._display.options[correctIdx], confidence: null };
    const fb = $("#feedback"); fb.hidden = false; fb.className = "feedback " + (ok ? "correct" : "incorrect");
    fb.innerHTML = `<div class="feedback-status">${ok ? "✓ CORRECT" : "✗ INCORRECT"}</div>${ok ? "" : `<div class="feedback-correct"><strong>Correct answer:</strong> ${esc(q._display.options[correctIdx])}</div>`}<div class="feedback-explanation">${esc(q.explanation || "")}</div>${confidenceHtml()}`;
    bindConfidence(); enableNext();
  }

  function handleCalc(q) {
    const raw = $("#calcInput").value.trim(); const work = $("#calcWork").value;
    const num = parseFloat(raw.replace(/[, ]/g, ""));
    const close = !isNaN(num) && Math.abs(num - q.answer) <= q.tolerance + 1e-9;
    const hasUnit = /[a-zA-Zµμ%\/]/.test(raw) || /[a-zA-Zµμ%]/.test(work);
    const ok = close && (!q.unit || hasUnit);
    const frac = close ? (q.unit && !hasUnit ? 0.5 : 1) : (raw && !isNaN(num) ? 0.2 : 0);
    $("#calcInput").disabled = true; $("#submitBtn").disabled = true;
    state.pending = { type: "calc", correct: ok, scoreFrac: frac, given: raw + " " + (work ? "[" + work + "]" : ""), correctText: `${q.answer} ${q.unit || ""}`, confidence: null };
    const notes = [];
    if (isNaN(num)) notes.push("No numeric answer entered.");
    else if (!close) notes.push(`Numeric answer off (yours: ${num}, expected: ${q.answer} ${q.unit || ""}).`);
    if (q.unit && !hasUnit) notes.push("No units stated — units are required for full marks.");
    if (!notes.length) notes.push("Correct, with units. Well done.");
    const fb = $("#feedback"); fb.hidden = false; fb.className = "feedback " + (ok ? "correct" : "incorrect");
    fb.innerHTML = `
      <div class="feedback-status">${ok ? "✓ CORRECT" : close ? "△ PARTIAL" : "✗ REVIEW"}</div>
      <div class="feedback-explanation">${notes.map(esc).join("<br>")}</div>
      <details class="model-toggle" open><summary>Worked solution</summary><div class="model-body"><ol>${(q.steps || []).map((s) => `<li>${esc(s)}</li>`).join("")}</ol><strong>Answer: ${esc(String(q.answer))} ${esc(q.unit || "")}</strong></div></details>
      ${q.feedback ? `<details class="model-toggle"><summary>Common error types</summary><div class="model-body">${Object.entries(q.feedback).map(([k, v]) => `<div><b>${esc(k)}:</b> ${esc(v)}</div>`).join("")}</div></details>` : ""}
      ${confidenceHtml()}`;
    bindConfidence(); enableNext();
  }

  function handleSaq(q) {
    const text = $("#saqInput").value;
    const grade = CDDMatcher.gradeSAQ(text, q.markScheme || []);
    const autoFrac = grade.total > 0 ? grade.earned / grade.total : 0;
    $("#saqInput").disabled = true; $("#submitBtn").disabled = true;
    const flags = writingFlags(text);
    // Build mark scheme self-mark UI (pre-ticked where auto-grade hit, if autoGrade on)
    const msItems = grade.hits.map((h, i) => `
      <li class="ms-point ${state.autoGrade && h.matched ? "hit" : ""}" data-i="${i}" data-marks="${h.marks}">
        <input type="checkbox" ${state.autoGrade && h.matched ? "checked" : ""}/>
        <span class="ms-marks">+${h.marks} mk</span>
        <span class="ms-text">${esc(h.label)}<span class="ms-auto ${h.matched ? "yes" : "no"}">${h.matched ? "auto ✓" : "auto ·"}</span></span>
      </li>`).join("");
    const fb = $("#feedback"); fb.hidden = false;
    const passed = autoFrac >= 0.6;
    fb.className = "feedback " + (passed ? "correct" : "incorrect");
    fb.innerHTML = `
      <div class="feedback-status" id="fbStatus"></div>
      <div class="markscheme">
        <div class="markscheme-head"><span class="ms-label">Mark scheme — tick what you genuinely covered (auto-grade pre-ticks matches)</span><span class="ms-score" id="msScore"></span></div>
        <ul class="ms-list" id="msList">${msItems}</ul>
      </div>
      <details class="model-toggle" open><summary>Model answer</summary><div class="model-body">${esc(q.modelAnswer || "")}</div></details>
      ${q.modelExpanded ? `<details class="model-toggle"><summary>Expanded high-scoring answer</summary><div class="model-body">${esc(q.modelExpanded)}</div></details>` : ""}
      ${flags.length ? `<details class="model-toggle" open><summary>Writing coach — ${flags.length} flag${flags.length === 1 ? "" : "s"}</summary><div class="model-body"><ul>${flags.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div></details>` : ""}
      <div style="margin-top:10px"><button class="btn btn-ghost btn-sm" id="aiBtn2">Examiner feedback (AI)</button></div>
      ${confidenceHtml()}`;

    const recompute = () => {
      let earned = 0;
      $$("#msList .ms-point").forEach((li) => { if (li.querySelector("input").checked) earned += parseFloat(li.dataset.marks); });
      const total = grade.total || q.marks || 1;
      const frac = total > 0 ? earned / total : 0;
      $("#msScore").textContent = `${(+earned.toFixed(1))}/${total} · ${Math.round(frac * 100)}%`;
      const pass = frac >= 0.6;
      fb.className = "feedback " + (pass ? "correct" : "incorrect");
      $("#fbStatus").textContent = pass ? `✓ PASS · ${(+earned.toFixed(1))}/${total} marks` : `△ BELOW THRESHOLD · ${(+earned.toFixed(1))}/${total} marks`;
      state.pending.scoreFrac = frac; state.pending.correct = pass; state.pending.earned = earned; state.pending.total = total;
    };
    $$("#msList .ms-point").forEach((li) => li.addEventListener("click", (e) => {
      if (e.target.tagName !== "INPUT") { const cb = li.querySelector("input"); cb.checked = !cb.checked; }
      li.classList.toggle("hit", li.querySelector("input").checked); recompute();
    }));

    state.pending = { type: "saq", correct: passed, scoreFrac: autoFrac, given: text.trim(), correctText: q.modelAnswer || "", confidence: null, grade, _flags: flags, _q: q };
    recompute();
    $("#aiBtn2").addEventListener("click", () => openAiFeedback(q, text));
    bindConfidence(); enableNext();
  }

  function confidenceHtml() {
    if (!state.confidenceEnabled) return "";
    return `<div class="confidence-row"><div class="confidence-label">How confident were you?</div><div class="confidence-chips" id="confChips">
      <button type="button" class="conf-chip" data-c="1">1<span>guess</span></button>
      <button type="button" class="conf-chip" data-c="2">2</button>
      <button type="button" class="conf-chip" data-c="3">3<span>unsure</span></button>
      <button type="button" class="conf-chip" data-c="4">4</button>
      <button type="button" class="conf-chip" data-c="5">5<span>certain</span></button></div></div>`;
  }
  function bindConfidence() {
    $$("#confChips .conf-chip").forEach((c) => c.addEventListener("click", () => { if (!state.pending) return; $$("#confChips .conf-chip").forEach((x) => x.classList.remove("selected")); c.classList.add("selected"); state.pending.confidence = parseInt(c.dataset.c, 10); }));
  }
  function enableNext() { const n = $("#nextBtn"); n.disabled = false; n.focus(); }

  function commitPending() {
    const quiz = state.quiz, q = quiz.questions[quiz.index], p = state.pending; if (!p) return;
    quiz.answers.push({ questionId: q.id, topic: q.topic, type: q.type, question: q.question, correct: p.correct, scoreFrac: p.scoreFrac, given: p.given, correctText: p.correctText, confidence: p.confidence, marks: q.marks });
    if (p.correct) quiz.score += 1;
    const prev = CDDStorage.getStats(q.id, q.topic);
    const next = CDDSRS.updateStats(prev, { scoreFrac: p.scoreFrac, correct: p.correct, confidence: p.confidence });
    next.topic = q.topic; CDDStorage.setStats(q.id, next);
    // error book
    if (p.scoreFrac < 0.6) {
      CDDStorage.addError({ when: Date.now(), id: q.id, topic: q.topic, type: q.type, question: q.question, given: typeof p.given === "string" ? p.given.slice(0, 280) : "", scoreFrac: p.scoreFrac, marks: q.marks, category: classifyError(q, p) });
    }
    state.pending = null;
  }

  function classifyError(q, p) {
    if (q.type === "calc") return "calculation";
    if (typeof p.given === "string" && p.given.trim().length < 5) return "exam-technique";
    if (p._flags && p._flags.some((f) => /vague|short|connective|units/i.test(f))) return "exam-technique";
    if (p.scoreFrac < 0.2) return "factual";
    return "conceptual";
  }

  function nextQuestion() {
    if (state.pending) commitPending();
    const quiz = state.quiz;
    if (quiz.index < quiz.questions.length - 1) { quiz.index += 1; renderQuestion(); }
    else { $("#progressFill").style.width = "100%"; finishQuiz(); }
  }

  // =================================================================
  // Results / review
  // =================================================================
  function finishQuiz() {
    const quiz = state.quiz, total = quiz.questions.length, score = quiz.score;
    const pct = total === 0 ? 0 : Math.round((score / total) * 100);
    CDDStorage.recordSession({ id: "s-" + Date.now(), timestamp: Date.now(), mode: quiz.mode, total, correct: score, topics: [...new Set(quiz.answers.map((a) => a.topic))], questionResults: quiz.answers.map((a) => ({ id: a.questionId, correct: a.correct, confidence: a.confidence, topic: a.topic })) });
    $("#scorePercent").textContent = `${pct}%`; $("#scoreFraction").textContent = `${score} / ${total}`;
    const circ = 2 * Math.PI * 52, ring = $("#scoreRing");
    ring.style.strokeDasharray = String(circ); requestAnimationFrame(() => { ring.style.strokeDashoffset = String(circ * (1 - pct / 100)); });
    let title = "Session complete.", sub = "";
    if (pct === 100) { title = "Flawless."; sub = "Every question passed — excellent recall."; }
    else if (pct >= 80) { title = "Excellent work."; sub = "Strong understanding; drill the few you missed for full mastery."; }
    else if (pct >= 60) { title = "Good progress."; sub = "Promising — focus where errors clustered."; }
    else if (pct >= 40) { title = "Solid start."; sub = "Plenty to consolidate. Review the model answers and retry."; }
    else { title = "Time to revisit."; sub = "Read the mark schemes, retry the incorrect set and come back."; }
    if (quiz.mode === "smart") sub += " (Smart Revision pulled your highest-priority items.)";
    $("#resultsTitle").textContent = title; $("#resultsSubtitle").textContent = sub;
    // breakdown
    const byTopic = {};
    quiz.answers.forEach((a) => { byTopic[a.topic] = byTopic[a.topic] || { c: 0, t: 0 }; byTopic[a.topic].t++; if (a.correct) byTopic[a.topic].c++; });
    const cont = $("#resultsBreakdown"); cont.innerHTML = `<div class="breakdown-title">Breakdown by block</div>`;
    Object.entries(byTopic).sort((a, b) => (b[1].c / b[1].t) - (a[1].c / a[1].t)).forEach(([topic, t]) => {
      const p = Math.round((t.c / t.t) * 100);
      const row = document.createElement("div"); row.className = "breakdown-row";
      row.innerHTML = `<div>${esc(topic)}</div><div>${t.c}/${t.t} · ${p}%</div><div class="breakdown-bar"><div class="breakdown-fill" style="width:${p}%"></div></div>`;
      cont.appendChild(row);
    });
    const inc = quiz.answers.filter((a) => !a.correct).length;
    const rb = $("#retryIncorrectBtn"); rb.disabled = inc === 0; rb.textContent = inc ? `Retry incorrect (${inc})` : "Retry incorrect";
    showView("results"); bumpStreak();
  }

  function showReview() {
    const list = $("#reviewList"); list.innerHTML = "";
    state.quiz.answers.forEach((a, i) => {
      const item = document.createElement("article"); item.className = "review-item " + (a.correct ? "correct" : "incorrect");
      const conf = a.confidence ? ` · conf ${a.confidence}/5` : "";
      item.innerHTML = `
        <div class="review-meta"><span>Q${i + 1} · ${esc(a.topic.split(" · ")[0])}${conf}</span><span>${a.correct ? "✓ PASS" : "△ REVIEW"} · ${Math.round((a.scoreFrac || 0) * 100)}%</span></div>
        <h3>${esc(a.question)}</h3>
        <div class="review-block"><div class="label">Your answer</div><div>${esc(a.given && String(a.given).trim() ? a.given : "(no answer)")}</div></div>
        ${a.correct ? "" : `<div class="review-block"><div class="label">Model answer</div><div>${esc(a.correctText || "")}</div></div>`}`;
      list.appendChild(item);
    });
    showView("review");
  }

  function retryIncorrect() {
    const inc = state.quiz.answers.filter((a) => !a.correct).map((a) => QUESTION_BANK.find((q) => q.id === a.questionId)).filter(Boolean);
    if (inc.length) startQuiz({ mode: "retry", custom: inc });
  }

  // =================================================================
  // AI examiner feedback
  // =================================================================
  function buildAiPrompt(q, text) {
    const marks = q.marks || (q.markScheme || []).reduce((a, p) => a + (p.marks || 1), 0);
    const points = (q.markScheme || []).map((p) => `- (${p.marks} mk) ${p.label}`).join("\n");
    return `You are an examiner for the UK undergraduate module Clinical Drug Development (BIOL21302).
Mark this student's answer against the official mark scheme.

QUESTION (${marks} marks):
${q.question}

OFFICIAL MARK POINTS (≈ 1 point per mark):
${points}

STUDENT ANSWER:
"""
${text || "(no answer provided)"}
"""

Respond in this exact structure:
1) ESTIMATED SCORE: <n>/${marks} — with the credit given for each mark point.
2) MISSING POINTS: bullet the scheme points the student did not cover.
3) PRECISION / WRITING FEEDBACK: vagueness, missing mechanism, weak justification, unit errors, length.
4) ONE TARGETED PROBE: a Socratic follow-up to deepen understanding.
Be terse and examiner-style. No filler.`;
  }

  function openAiFeedback(q, text) {
    const prompt = buildAiPrompt(q, text);
    openDialog("Examiner feedback (AI)", `
      <p class="small muted">Calls Claude with an examiner-mode prompt. Without an API key, copy the prompt into claude.ai or your preferred chat.</p>
      <label class="field-label">Anthropic API key (optional, stored locally only)</label>
      <input type="password" id="aiKey" value="${esc(state.settings.apiKey || "")}" placeholder="sk-ant-..." autocomplete="off"/>
      <label class="field-label">Model</label>
      <select id="aiModel">
        <option value="claude-opus-4-1" ${state.settings.apiModel === "claude-opus-4-1" ? "selected" : ""}>claude-opus-4-1</option>
        <option value="claude-sonnet-4-6" ${state.settings.apiModel === "claude-sonnet-4-6" ? "selected" : ""}>claude-sonnet-4-6</option>
        <option value="claude-haiku-4-5" ${state.settings.apiModel === "claude-haiku-4-5" ? "selected" : ""}>claude-haiku-4-5</option>
      </select>
      <label class="field-label">Generated prompt</label>
      <textarea id="aiPrompt" rows="9">${esc(prompt)}</textarea>
      <div class="ai-out" id="aiOut"></div>`, [
      { label: "Copy prompt", cls: "btn", fn: () => { navigator.clipboard.writeText($("#aiPrompt").value).then(() => toast("Prompt copied")); } },
      { label: "Call Claude", cls: "btn btn-primary", fn: callClaude, keepOpen: true },
      { label: "Close", cls: "btn btn-ghost", fn: closeDialog },
    ]);
  }

  async function callClaude() {
    const key = $("#aiKey").value.trim(), model = $("#aiModel").value, prompt = $("#aiPrompt").value;
    state.settings.apiKey = key; state.settings.apiModel = model; CDDStorage.setSettings(state.settings);
    const out = $("#aiOut");
    if (!key) { toast("Add an API key, or copy the prompt to use elsewhere."); return; }
    out.innerHTML = `<div class="pulse muted small">Calling Claude…</div>`;
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model, max_tokens: 1200, messages: [{ role: "user", content: prompt }] }),
      });
      const j = await r.json();
      if (j.error) { out.innerHTML = `<div class="ai-result" style="color:var(--error)">Error: ${esc(j.error.message || JSON.stringify(j.error))}</div>`; return; }
      const txt = (j.content && j.content[0] && j.content[0].text) || "(no content)";
      out.innerHTML = `<div class="ai-result">${esc(txt)}</div>`;
    } catch (e) {
      out.innerHTML = `<div class="ai-result" style="color:var(--error)">Network error: ${esc(e.message)}. Browser CORS may block direct calls — copy the prompt into claude.ai instead.</div>`;
    }
  }

  // =================================================================
  // Case studies
  // =================================================================
  function renderCaseList() {
    $("#caseListWrap").hidden = false; $("#caseDetail").hidden = true;
    const list = $("#caseList"); list.innerHTML = "";
    CASE_BANK.forEach((cs) => {
      const card = document.createElement("button"); card.type = "button"; card.className = "case-card";
      card.innerHTML = `<h3>${esc(cs.title)}</h3><div class="case-meta">${esc(cs.topic.split(" · ")[0])} · ${cs.parts.length} parts · ${cs.totalMarks} marks${cs.source && cs.source !== "core" ? " · " + esc(cs.source) + " paper" : ""}</div>`;
      card.addEventListener("click", () => openCase(cs));
      list.appendChild(card);
    });
  }

  function openCase(cs) {
    $("#caseListWrap").hidden = true;
    const wrap = $("#caseDetail"); wrap.hidden = false;
    wrap.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="caseBack">← All case studies</button>
      <div class="card" style="margin:14px 0">
        <div class="card-header"><h2>${esc(cs.title)}</h2><p>${esc(cs.topic)} · ${cs.totalMarks} marks total</p></div>
        <div class="q-scenario">${renderMarkdownLite(cs.scenario)}</div>
        ${cs.chart ? `<div id="caseChart"></div>` : ""}
      </div>
      <div id="caseParts"></div>`;
    $("#caseBack").addEventListener("click", () => renderCaseList());
    if (cs.chart) $("#caseChart").innerHTML = renderChart(cs.chart);
    const host = $("#caseParts");
    cs.parts.forEach((p, i) => host.appendChild(renderCasePart(cs, p, i)));
  }

  function renderCasePart(cs, part, i) {
    const el = document.createElement("div"); el.className = "card case-part";
    el.innerHTML = `
      <div class="question-tags"><span class="q-tag accent">Part ${i + 1}</span><span class="q-tag marks">${part.marks} marks</span>${part.skill ? `<span class="q-tag">${esc(part.skill)}</span>` : ""}</div>
      <h2 class="question-text" style="font-size:16px">${esc(part.stem)}</h2>
      <textarea class="saq-input" placeholder="Write your answer. Mark-scheme points are auto-detected; you can also tick them yourself."></textarea>
      <div class="form-controls"><button class="btn btn-primary btn-sm" data-act="submit">Submit &amp; mark</button><button class="btn btn-ghost btn-sm" data-act="ai">Examiner feedback (AI)</button></div>
      <div class="feedback" data-role="fb" hidden></div>`;
    const ta = el.querySelector("textarea"), fb = el.querySelector("[data-role=fb]");
    el.querySelector("[data-act=ai]").addEventListener("click", () => openAiFeedback({ question: part.stem, marks: part.marks, markScheme: part.markScheme }, ta.value));
    el.querySelector("[data-act=submit]").addEventListener("click", () => {
      const grade = CDDMatcher.gradeSAQ(ta.value, part.markScheme || []);
      const autoFrac = grade.total ? grade.earned / grade.total : 0;
      const items = grade.hits.map((h, idx) => `
        <li class="ms-point ${state.autoGrade && h.matched ? "hit" : ""}" data-i="${idx}" data-marks="${h.marks}">
          <input type="checkbox" ${state.autoGrade && h.matched ? "checked" : ""}/>
          <span class="ms-marks">+${h.marks} mk</span>
          <span class="ms-text">${esc(h.label)}<span class="ms-auto ${h.matched ? "yes" : "no"}">${h.matched ? "auto ✓" : "auto ·"}</span></span></li>`).join("");
      fb.hidden = false; fb.className = "feedback " + (autoFrac >= 0.6 ? "correct" : "incorrect");
      fb.innerHTML = `
        <div class="feedback-status" data-role="st"></div>
        <div class="markscheme"><div class="markscheme-head"><span class="ms-label">Mark scheme — tick what you covered</span><span class="ms-score" data-role="sc"></span></div><ul class="ms-list">${items}</ul></div>
        <details class="model-toggle" open><summary>Model answer</summary><div class="model-body">${esc(part.modelAnswer || "")}</div></details>
        ${part.modelExpanded ? `<details class="model-toggle"><summary>Expanded answer</summary><div class="model-body">${esc(part.modelExpanded)}</div></details>` : ""}`;
      const recompute = () => {
        let earned = 0; fb.querySelectorAll(".ms-point").forEach((li) => { if (li.querySelector("input").checked) earned += parseFloat(li.dataset.marks); });
        const total = grade.total || part.marks; const frac = total ? earned / total : 0;
        fb.querySelector("[data-role=sc]").textContent = `${+earned.toFixed(1)}/${total} · ${Math.round(frac * 100)}%`;
        fb.className = "feedback " + (frac >= 0.6 ? "correct" : "incorrect");
        fb.querySelector("[data-role=st]").textContent = frac >= 0.6 ? `✓ PASS · ${+earned.toFixed(1)}/${total}` : `△ ${+earned.toFixed(1)}/${total}`;
        // record into SRS under the flattened id
        const qid = `${cs.id}::${part.id}`;
        const prev = CDDStorage.getStats(qid, cs.topic);
        // (only persist a fresh attempt once per submit — recompute also fires on ticks; persist on submit click below)
        el._lastFrac = frac;
      };
      fb.querySelectorAll(".ms-point").forEach((li) => li.addEventListener("click", (e) => { if (e.target.tagName !== "INPUT") { const cb = li.querySelector("input"); cb.checked = !cb.checked; } li.classList.toggle("hit", li.querySelector("input").checked); recompute(); }));
      recompute();
      // persist one attempt
      const qid = `${cs.id}::${part.id}`;
      const prev = CDDStorage.getStats(qid, cs.topic);
      const next = CDDSRS.updateStats(prev, { scoreFrac: autoFrac, correct: autoFrac >= 0.6, confidence: null });
      next.topic = cs.topic; CDDStorage.setStats(qid, next);
      if (autoFrac < 0.6) CDDStorage.addError({ when: Date.now(), id: qid, topic: cs.topic, type: "saq", question: part.stem, given: ta.value.slice(0, 280), scoreFrac: autoFrac, marks: part.marks, category: autoFrac < 0.2 ? "factual" : "conceptual" });
      toast(`Recorded ${Math.round(autoFrac * 100)}% for this part`);
    });
    return el;
  }

  // ---- inline SVG charts for case data ----
  function renderChart(kind) {
    if (kind === "doseResponse") return doseResponseSvg();
    if (kind === "caco2") return caco2Svg();
    if (kind === "pk") return pkSvg();
    return "";
  }
  function axisFrame(w, h, pl, pr, pt, pb, xlab, ylab, xticks, yticks) {
    return `<line class="axis" x1="${pl}" y1="${pt}" x2="${pl}" y2="${h - pb}"/><line class="axis" x1="${pl}" y1="${h - pb}" x2="${w - pr}" y2="${h - pb}"/>${xticks}${yticks}<text x="${w / 2}" y="${h - 4}" text-anchor="middle">${xlab}</text><text transform="translate(13,${h / 2}) rotate(-90)" text-anchor="middle">${ylab}</text>`;
  }
  function doseResponseSvg() {
    const w = 520, h = 300, pl = 48, pr = 16, pt = 16, pb = 36, x0 = -10, x1 = -4, y0 = 0, y1 = 7;
    const xs = (v) => pl + (v - x0) * (w - pl - pr) / (x1 - x0), ys = (v) => h - pb - (v - y0) * (h - pt - pb) / (y1 - y0);
    const sig = (emax, lec) => { const o = []; for (let lc = x0; lc <= x1; lc += 0.2) o.push([lc, emax / (1 + Math.pow(10, lec - lc))]); return o; };
    const path = (pts, col) => `<path class="curve" stroke="${col}" d="${pts.map((p, i) => (i ? "L" : "M") + xs(p[0]).toFixed(1) + "," + ys(p[1]).toFixed(1)).join(" ")}"/>`;
    let grid = ""; for (let x = x0; x <= x1; x++) grid += `<line class="grid" x1="${xs(x)}" y1="${pt}" x2="${xs(x)}" y2="${h - pb}"/>`;
    for (let y = 0; y <= y1; y++) grid += `<line class="grid" x1="${pl}" y1="${ys(y)}" x2="${w - pr}" y2="${ys(y)}"/>`;
    let xt = ""; for (let x = x0; x <= x1; x++) xt += `<text x="${xs(x)}" y="${h - pb + 13}" text-anchor="middle">${x}</text>`;
    let yt = ""; for (let y = 0; y <= y1; y++) yt += `<text x="${pl - 6}" y="${ys(y) + 3}" text-anchor="end">${y}</text>`;
    return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Dose–response curves">${grid}${axisFrame(w, h, pl, pr, pt, pb, "log[Drug] (M)", "Response", xt, yt)}
      ${path(sig(6.35, -7.3), "var(--c-500)")}${path(sig(2.05, -7.3), "var(--gold)")}${path(sig(6.2, -6.1), "var(--c-300)")}
      <text x="${w - pr - 150}" y="${pt + 14}"><tspan fill="var(--c-500)">━ Drug A (full)</tspan></text>
      <text x="${w - pr - 150}" y="${pt + 30}"><tspan fill="var(--gold)">━ Drug B (partial)</tspan></text>
      <text x="${w - pr - 150}" y="${pt + 46}"><tspan fill="var(--c-300)">━ A + antagonist</tspan></text></svg>
      <div class="small muted" style="margin-top:4px">Illustrative curves for the data in the tables (plot the exact points on graph paper in the exam).</div>`;
  }
  function lineChart(series, w, h, xmax, ymax, xlab, ylab) {
    const pl = 48, pr = 16, pt = 16, pb = 36;
    const xs = (v) => pl + v * (w - pl - pr) / xmax, ys = (v) => h - pb - v * (h - pt - pb) / ymax;
    let grid = ""; for (let i = 0; i <= 5; i++) { const yv = (ymax / 5) * i; grid += `<line class="grid" x1="${pl}" y1="${ys(yv)}" x2="${w - pr}" y2="${ys(yv)}"/>`; }
    let yt = ""; for (let i = 0; i <= 5; i++) { const yv = Math.round((ymax / 5) * i); yt += `<text x="${pl - 6}" y="${ys(yv) + 3}" text-anchor="end">${yv}</text>`; }
    let xt = ""; for (let i = 0; i <= 4; i++) { const xv = Math.round((xmax / 4) * i); xt += `<text x="${xs(xv)}" y="${h - pb + 13}" text-anchor="middle">${xv}</text>`; }
    const paths = series.map((s) => `<path class="curve" stroke="${s.col}" d="${s.pts.map((p, i) => (i ? "L" : "M") + xs(p[0]).toFixed(1) + "," + ys(p[1]).toFixed(1)).join(" ")}"/>`).join("");
    const legend = series.map((s, i) => `<text x="${w - pr - 150}" y="${pt + 14 + i * 16}"><tspan fill="${s.col}">━ ${s.name}</tspan></text>`).join("");
    return `<svg class="chart" viewBox="0 0 ${w} ${h}">${grid}${axisFrame(w, h, pl, pr, pt, pb, xlab, ylab, xt, yt)}${paths}${legend}</svg>`;
  }
  function caco2Svg() {
    const t = [0, 1, 2, 4, 6, 8, 12, 24];
    const mp1 = [0, 8, 14.2, 26.4, 39.4, 49, 53.6, 59.2], mp2 = [0, 17.6, 37.4, 57.2, 75.2, 83.2, 87.4, 92.4];
    return lineChart([
      { name: "ManUPharm1 (% baso)", col: "var(--c-500)", pts: t.map((x, i) => [x, mp1[i]]) },
      { name: "ManUPharm2 (% baso)", col: "var(--gold)", pts: t.map((x, i) => [x, mp2[i]]) },
    ], 520, 300, 24, 100, "Time (h)", "% basolateral") + `<div class="small muted" style="margin-top:4px">Illustrative — ManUPharm2 is absorbed faster and more completely.</div>`;
  }
  function pkSvg() {
    const tIV = [0.5, 1, 1.5, 2, 3, 4], iv = [32.2, 24.2, 17, 12.5, 6.6, 3.5];
    const tOr = [1, 1.5, 2, 3, 4, 6, 8], or = [1, 5.5, 10, 14, 15, 8.7, 4.5];
    return lineChart([
      { name: "IV", col: "var(--c-500)", pts: tIV.map((x, i) => [x, iv[i]]) },
      { name: "Oral", col: "var(--gold)", pts: tOr.map((x, i) => [x, or[i]]) },
    ], 520, 300, 8, 35, "Time (h)", "Plasma [drug] (µg/mL)") + `<div class="small muted" style="margin-top:4px">Illustrative — IV declines from the start; oral rises to a delayed, lower peak.</div>`;
  }

  // =================================================================
  // Exam simulator (Section A: 5 of 8 SAQ ×10; Section B: 1 case)
  // =================================================================
  let examState = null, examTimer = null;
  function renderExamIntro() {
    if (examState && examState.active) { renderExamActive(); return; }
    if (examState && examState.marking) { renderExamMarking(); return; }
    const wrap = $("#examWrap");
    const exams = CDDStorage.getExams();
    wrap.innerHTML = `
      <div class="card">
        <div class="card-header"><h2>Exam simulation</h2><p>Mirrors the BIOL21302 paper format.</p></div>
        <ul class="small" style="line-height:1.9;padding-left:18px">
          <li><b>Section A</b> — 8 short-answer questions presented; answer any <b>5 × 10 marks = 50 marks</b></li>
          <li><b>Section B</b> — one compulsory case study = 50 marks</li>
          <li>2-hour paper; self-mark (with auto-grade help) on submission</li>
        </ul>
        <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" id="examStart">Start mock exam</button>
        </div>
      </div>
      ${exams.length ? `<div class="card" style="margin-top:14px"><div class="card-header"><h2>Past attempts</h2></div>${exams.slice().reverse().map((e) => `<div class="breakdown-row"><div>${new Date(e.when).toLocaleString()}</div><div><b>${e.got}/${e.total}</b> · A ${e.secA}/50 · B ${e.secB}/50</div></div>`).join("")}</div>` : ""}`;
    $("#examStart").addEventListener("click", startExam);
  }

  function startExam() {
    // pick up to 8 SAQs across distinct blocks for Section A
    const saqs = QUESTION_BANK.filter((q) => q.type === "saq" && !q._case);
    const byTopic = {}; saqs.forEach((q) => { (byTopic[q.topic] = byTopic[q.topic] || []).push(q); });
    const topics = shuffle(Object.keys(byTopic)); const picked = [];
    for (const t of topics) { if (picked.length >= 8) break; const arr = byTopic[t]; picked.push(arr[Math.floor(Math.random() * arr.length)]); }
    while (picked.length < 8 && saqs.length >= 8) { const cand = saqs[Math.floor(Math.random() * saqs.length)]; if (!picked.includes(cand)) picked.push(cand); }
    const caseStudy = CASE_BANK[Math.floor(Math.random() * CASE_BANK.length)];
    examState = { active: true, marking: false, started: Date.now(), duration: 120 * 60 * 1000, sectionA: picked, sectionB: caseStudy, selected: new Set(), answers: {}, selfMarks: {} };
    renderExamActive();
  }

  function renderExamActive() {
    const wrap = $("#examWrap"), ex = examState;
    wrap.innerHTML = `
      <div class="analytics-header"><div><h1 class="analytics-title">Mock exam</h1><p class="analytics-sub">Answer any 5 of 8 in Section A, plus the Section B case.</p></div><div style="display:flex;gap:10px;align-items:center"><span class="timer exam-timer" id="examTimer">--:--</span><button class="btn btn-danger btn-sm" id="examSubmit">Submit &amp; self-mark</button></div></div>
      <div class="card" style="margin-bottom:12px"><b>Section A</b> — selected <span id="selCount">0</span>/5. Tick the box on the 5 you want marked.</div>
      <div id="examSecA"></div>
      <div class="card" style="margin:14px 0"><b>Section B — compulsory case study (50 marks)</b></div>
      <div id="examSecB"></div>`;
    const aHost = $("#examSecA");
    ex.sectionA.forEach((q, i) => {
      const d = document.createElement("details"); d.className = "exam-q";
      d.innerHTML = `<summary><span>Q${i + 1} · ${esc(q.topic.split(" · ")[0])}</span><label style="font-weight:500;font-size:13px"><input type="checkbox" data-qid="${q.id}"/> answer this</label></summary>
        <div class="exam-body"><div class="question-text" style="font-size:15px">${esc(q.question)}</div><textarea class="saq-input" data-qid="${q.id}" placeholder="Your answer...">${esc(ex.answers[q.id] || "")}</textarea></div>`;
      aHost.appendChild(d);
      d.querySelector("input[type=checkbox]").addEventListener("change", (e) => {
        if (e.target.checked) { if (ex.selected.size >= 5) { e.target.checked = false; toast("You can select only 5 in Section A."); return; } ex.selected.add(q.id); }
        else ex.selected.delete(q.id);
        $("#selCount").textContent = ex.selected.size;
      });
      d.querySelector("textarea").addEventListener("input", (e) => { ex.answers[q.id] = e.target.value; });
    });
    const bHost = $("#examSecB");
    const card = document.createElement("div"); card.className = "card";
    card.innerHTML = `<div class="card-header"><h2>${esc(ex.sectionB.title)}</h2></div><div class="q-scenario">${renderMarkdownLite(ex.sectionB.scenario)}</div>${ex.sectionB.chart ? renderChart(ex.sectionB.chart) : ""}
      ${ex.sectionB.parts.map((p, i) => `<div class="case-part" style="margin-top:14px"><div class="question-tags"><span class="q-tag accent">Part ${i + 1}</span><span class="q-tag marks">${p.marks} marks</span></div><div class="question-text" style="font-size:15px">${esc(p.stem)}</div><textarea class="saq-input" data-pid="${ex.sectionB.id}::${p.id}" placeholder="Your answer...">${esc(ex.answers[ex.sectionB.id + "::" + p.id] || "")}</textarea></div>`).join("")}`;
    bHost.appendChild(card);
    bHost.querySelectorAll("textarea[data-pid]").forEach((ta) => ta.addEventListener("input", (e) => { ex.answers[e.target.dataset.pid] = e.target.value; }));
    $("#examSubmit").addEventListener("click", () => endExam(false));
    if (examTimer) clearInterval(examTimer);
    const tEl = $("#examTimer");
    const tick = () => {
      const left = Math.max(0, ex.duration - (Date.now() - ex.started)), s = Math.round(left / 1000);
      tEl.textContent = `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
      tEl.classList.toggle("warn", left < 15 * 60000 && left >= 5 * 60000); tEl.classList.toggle("bad", left < 5 * 60000);
      if (left <= 0) { clearInterval(examTimer); endExam(true); }
    };
    tick(); examTimer = setInterval(tick, 1000);
  }

  function endExam(timedOut) {
    if (examTimer) clearInterval(examTimer);
    examState.active = false; examState.marking = true; examState.timeUsed = Date.now() - examState.started;
    renderExamMarking(timedOut);
  }

  function renderExamMarking(timedOut) {
    const ex = examState, wrap = $("#examWrap");
    let secA = ex.sectionA.filter((q) => ex.selected.has(q.id));
    if (secA.length < 5) secA = secA.concat(ex.sectionA.filter((q) => !ex.selected.has(q.id))).slice(0, 5);
    wrap.innerHTML = `<div class="analytics-header"><div><h1 class="analytics-title">Self-mark</h1><p class="analytics-sub">${timedOut ? "Time expired · " : ""}Tick each mark-scheme point you covered (auto-grade pre-ticks matches).</p></div></div><div id="examMark"></div><div class="card" style="margin-top:14px"><button class="btn btn-primary" id="examFinalise">Finalise &amp; save attempt</button></div>`;
    const host = $("#examMark");
    const addItem = (qid, stem, scheme, modelAnswer, label) => {
      const grade = CDDMatcher.gradeSAQ(ex.answers[qid] || "", scheme || []);
      const card = document.createElement("div"); card.className = "card"; card.style.marginBottom = "12px";
      card.innerHTML = `<div class="card-header"><h2 style="font-size:16px">${esc(label)}</h2></div>
        <div class="question-text" style="font-size:14px">${esc(stem)}</div>
        <div class="review-block" style="margin-top:8px"><div class="label">Your answer</div><div>${esc(ex.answers[qid] || "(blank)")}</div></div>
        <div class="markscheme"><div class="markscheme-head"><span class="ms-label">Mark scheme</span><span class="ms-score" data-role="sc">0</span></div>
        <ul class="ms-list">${grade.hits.map((h, i) => `<li class="ms-point ${state.autoGrade && h.matched ? "hit" : ""}" data-marks="${h.marks}"><input type="checkbox" ${state.autoGrade && h.matched ? "checked" : ""}/><span class="ms-marks">+${h.marks}</span><span class="ms-text">${esc(h.label)}</span></li>`).join("")}</ul></div>
        <details class="model-toggle"><summary>Model answer</summary><div class="model-body">${esc(modelAnswer || "")}</div></details>`;
      const total = grade.total || 10;
      const recompute = () => { let e = 0; card.querySelectorAll(".ms-point").forEach((li) => { if (li.querySelector("input").checked) e += parseFloat(li.dataset.marks); }); card.querySelector("[data-role=sc]").textContent = `${+e.toFixed(1)}/${total}`; ex.selfMarks[qid] = e; };
      card.querySelectorAll(".ms-point").forEach((li) => li.addEventListener("click", (ev) => { if (ev.target.tagName !== "INPUT") { const cb = li.querySelector("input"); cb.checked = !cb.checked; } li.classList.toggle("hit", li.querySelector("input").checked); recompute(); }));
      recompute();
      host.appendChild(card);
    };
    secA.forEach((q, i) => addItem(q.id, q.question, q.markScheme, q.modelAnswer, `Section A · Q${i + 1} (${q.topic.split(" · ")[0]})`));
    ex.sectionB.parts.forEach((p, i) => addItem(`${ex.sectionB.id}::${p.id}`, p.stem, p.markScheme, p.modelAnswer, `Section B · Part ${i + 1}`));
    $("#examFinalise").addEventListener("click", () => {
      let secAm = 0, secBm = 0;
      secA.forEach((q) => { secAm += ex.selfMarks[q.id] || 0; });
      ex.sectionB.parts.forEach((p) => { secBm += ex.selfMarks[`${ex.sectionB.id}::${p.id}`] || 0; });
      // scale to /50 each
      const secAmax = secA.reduce((a, q) => a + (q.marks || 10), 0) || 50;
      const secBmax = ex.sectionB.totalMarks || 50;
      const secA50 = Math.round((secAm / secAmax) * 50), secB50 = Math.round((secBm / secBmax) * 50);
      CDDStorage.recordExam({ when: Date.now(), got: secA50 + secB50, total: 100, secA: secA50, secB: secB50, timeUsed: ex.timeUsed });
      // feed SRS
      const persist = (qid, topic, scheme) => { const g = CDDMatcher.gradeSAQ(ex.answers[qid] || "", scheme || []); const f = g.total ? (ex.selfMarks[qid] || 0) / g.total : 0; const prev = CDDStorage.getStats(qid, topic); const next = CDDSRS.updateStats(prev, { scoreFrac: f, correct: f >= 0.6, confidence: null }); next.topic = topic; CDDStorage.setStats(qid, next); };
      secA.forEach((q) => persist(q.id, q.topic, q.markScheme));
      ex.sectionB.parts.forEach((p) => persist(`${ex.sectionB.id}::${p.id}`, ex.sectionB.topic, p.markScheme));
      examState = null; bumpStreak();
      toast(`Saved: ${secA50 + secB50}/100`);
      showView("analytics");
    });
  }

  // =================================================================
  // Mark scheme — read-only view of every question with its answer
  // broken down into the marks (components) awarded for each point.
  // =================================================================
  const MS_TYPE_LABEL = { saq: "SAQ", mcq: "MCQ", calc: "Calculation", case: "Case part" };
  const msFilter = { type: "all", block: "all", paper: "all", q: "" };
  let msBound = false;

  function msTypeOf(q) {
    if (q.type === "mcq") return "mcq";
    if (q.type === "calc") return "calc";
    return q._case ? "case" : "saq";
  }

  // A question's source is "core", "2023", "2024" or "2023/2024" (appeared in
  // both papers). Match against the selected paper, splitting combined sources.
  function msMatchesPaper(q, paper) {
    if (paper === "all") return true;
    const src = q.source || "core";
    if (paper === "core") return src === "core";
    return src.split("/").includes(paper);
  }

  function msSearchText(q) {
    const parts = [q.question || q.stem || ""];
    (q.markScheme || []).forEach((p) => parts.push(p.label));
    if (q.modelAnswer) parts.push(q.modelAnswer);
    if (q.modelExpanded) parts.push(q.modelExpanded);
    if (q.type === "mcq") { parts.push((q.options || []).join(" ")); parts.push(q.explanation || ""); }
    if (q.type === "calc") { parts.push(q.formula || ""); parts.push((q.steps || []).join(" ")); }
    if (q._caseTitle) parts.push(q._caseTitle);
    return parts.join(" ").toLowerCase();
  }

  function msBreakdown(q) {
    if (q.type === "mcq") {
      const correct = (q.options || [])[q.answer];
      return `<ul class="ms-list">
        <li class="ms-point static hit"><span class="ms-marks">✓ ans</span><span class="ms-text">${esc(correct || "")}</span></li>
      </ul>${q.explanation ? `<details class="model-toggle" open><summary>Why this is correct</summary><div class="model-body">${esc(q.explanation)}</div></details>` : ""}`;
    }
    if (q.type === "calc") {
      const steps = (q.steps || []).map((s) => `<li>${esc(s)}</li>`).join("");
      const fb = q.feedback ? Object.values(q.feedback).map(esc).join(" · ") : "";
      return `<div class="ms-calc">
        ${q.formula ? `<div class="ms-formula">${esc(q.formula)}</div>` : ""}
        ${steps ? `<ol class="ms-steps">${steps}</ol>` : ""}
        <div class="ms-answer"><span class="ms-marks">${q.marks} mk</span><span>Answer: <strong>${esc(String(q.answer))}${q.unit ? " " + esc(q.unit) : ""}</strong>${typeof q.tolerance !== "undefined" ? ` <span class="ms-tol">(± ${esc(String(q.tolerance))})</span>` : ""} — units required for full marks</span></div>
      </div>${fb ? `<details class="model-toggle"><summary>Examiner notes</summary><div class="model-body">${fb}</div></details>` : ""}`;
    }
    // SAQ / flattened case part
    const pts = (q.markScheme || []).map((p) => `
      <li class="ms-point static">
        <span class="ms-marks">+${p.marks} mk</span>
        <span class="ms-text">${esc(p.label)}</span>
      </li>`).join("");
    return `<ul class="ms-list">${pts}</ul>
      ${q.modelAnswer ? `<details class="model-toggle"><summary>Model answer</summary><div class="model-body">${esc(q.modelAnswer)}</div></details>` : ""}
      ${q.modelExpanded ? `<details class="model-toggle"><summary>Expanded answer</summary><div class="model-body">${esc(q.modelExpanded)}</div></details>` : ""}`;
  }

  function msCard(q) {
    const t = msTypeOf(q);
    const marks = q.type === "mcq" ? 1 : (q.marks || 0);
    const tags = [
      `<span class="q-tag accent">${MS_TYPE_LABEL[t]}</span>`,
      `<span class="q-tag marks">${marks} mark${marks === 1 ? "" : "s"}</span>`,
    ];
    if (q._case) tags.push(`<span class="q-tag">Case: ${esc(q._caseTitle || "")}</span>`);
    else if (q.lecture) tags.push(`<span class="q-tag">${esc(q.lecture)}</span>`);
    if (q.source && q.source !== "core") tags.push(`<span class="q-tag">${esc(q.source)} paper</span>`);
    return `<div class="card ms-card">
      <div class="question-tags">${tags.join("")}</div>
      <div class="ms-question">${esc(q.question || q.stem || "")}</div>
      ${msBreakdown(q)}
    </div>`;
  }

  function renderMsList() {
    const host = $("#msList"), empty = $("#msEmpty"), countEl = $("#msCount");
    let items = QUESTION_BANK.slice();
    if (msFilter.type !== "all") items = items.filter((q) => msTypeOf(q) === msFilter.type);
    if (msFilter.block !== "all") items = items.filter((q) => q.topic === msFilter.block);
    if (msFilter.paper !== "all") items = items.filter((q) => msMatchesPaper(q, msFilter.paper));
    if (msFilter.q) items = items.filter((q) => (q._msSearch || (q._msSearch = msSearchText(q))).includes(msFilter.q));

    let html = "", totalMarks = 0;
    TOPICS.forEach((topic) => {
      const group = items.filter((q) => q.topic === topic);
      if (!group.length) return;
      const gm = group.reduce((s, q) => s + (q.type === "mcq" ? 1 : (q.marks || 0)), 0);
      totalMarks += gm;
      html += `<div class="ms-group">
        <div class="ms-group-head"><h2>${esc(topic)}</h2><span class="ms-group-meta">${group.length} question${group.length === 1 ? "" : "s"} · ${gm} marks</span></div>
        ${group.map(msCard).join("")}
      </div>`;
    });
    host.innerHTML = html;
    empty.hidden = items.length > 0;
    countEl.textContent = items.length ? `Showing ${items.length} question${items.length === 1 ? "" : "s"} · ${totalMarks} marks total` : "";
  }

  function renderMarkscheme() {
    const bf = $("#msBlockFilter");
    if (!bf.dataset.built) {
      bf.innerHTML = `<button class="chip selected" data-msblock="all">All blocks</button>`
        + TOPICS.map((t) => `<button class="chip" data-msblock="${esc(t)}">${esc(t.split(" · ")[0])}</button>`).join("");
      bf.dataset.built = "1";
    }
    if (!msBound) {
      $("#msSearch").addEventListener("input", (e) => { msFilter.q = e.target.value.trim().toLowerCase(); renderMsList(); });
      $("#msTypeFilter").addEventListener("click", (e) => {
        const b = e.target.closest("[data-mstype]"); if (!b) return;
        msFilter.type = b.dataset.mstype;
        $$("#msTypeFilter .chip").forEach((c) => c.classList.toggle("selected", c === b));
        renderMsList();
      });
      bf.addEventListener("click", (e) => {
        const b = e.target.closest("[data-msblock]"); if (!b) return;
        msFilter.block = b.dataset.msblock;
        $$("#msBlockFilter .chip").forEach((c) => c.classList.toggle("selected", c === b));
        renderMsList();
      });
      $("#msPaperFilter").addEventListener("click", (e) => {
        const b = e.target.closest("[data-mspaper]"); if (!b) return;
        msFilter.paper = b.dataset.mspaper;
        $$("#msPaperFilter .chip").forEach((c) => c.classList.toggle("selected", c === b));
        renderMsList();
      });
      $("#msPrintBtn").addEventListener("click", () => window.print());
      msBound = true;
    }
    renderMsList();
  }

  // =================================================================
  // Error book
  // =================================================================
  function renderErrorBook() {
    const errors = CDDStorage.getErrors();
    const cats = ["factual", "conceptual", "calculation", "exam-technique"];
    const counts = {}; cats.forEach((c) => counts[c] = 0); errors.forEach((e) => { counts[e.category] = (counts[e.category] || 0) + 1; });
    $("#errorCats").innerHTML = cats.map((c) => `<div class="error-cat"><div class="n">${counts[c]}</div><div class="c">${c.replace("-", " ")}</div></div>`).join("");
    const host = $("#errorList");
    if (!errors.length) { host.innerHTML = `<div class="empty-state"><h3>No errors logged</h3><p>Anything you score below 60% lands here, ready to re-drill.</p></div>`; return; }
    host.innerHTML = "";
    errors.forEach((e) => {
      const item = document.createElement("div"); item.className = "error-item";
      item.innerHTML = `<div class="review-meta"><span><span class="q-tag" style="background:var(--error-bg);color:var(--error)">${e.category.replace("-", " ")}</span> ${esc(e.topic.split(" · ")[0])} · ${Math.round((e.scoreFrac || 0) * 100)}%</span><span>${new Date(e.when).toLocaleDateString()}</span></div>
        <div style="font-size:14px;margin:6px 0">${esc(e.question)}</div>
        <button class="btn btn-ghost btn-sm" data-retry="${esc(e.id)}">Retry now →</button>`;
      item.querySelector("[data-retry]").addEventListener("click", () => { const q = QUESTION_BANK.find((x) => x.id === e.id); if (q) startQuiz({ mode: "retry", custom: [q] }); else toast("Question not found"); });
      host.appendChild(item);
    });
  }

  // =================================================================
  // Analytics
  // =================================================================
  function themeColors() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    return { dark, text: dark ? "#b3c7c1" : "#3f534e", grid: dark ? "rgba(55,181,156,.15)" : "rgba(28,122,104,.10)", primary: dark ? "#37b59c" : "#1c7a68", primarySoft: dark ? "rgba(55,181,156,.3)" : "rgba(28,122,104,.18)", error: "#d2546b", success: "#2f9e7e" };
  }
  function destroyChart(id) { if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id]; } }

  function renderAnalytics() {
    const sessions = CDDStorage.getSessions(), stats = CDDStorage.getAllStats();
    const empty = sessions.length === 0;
    $("#analyticsEmpty").hidden = !empty; $("#analyticsContent").hidden = empty;
    if (empty) return;
    const overview = CDDAnalytics.getOverview(sessions, stats);
    const breakdown = CDDAnalytics.getTopicBreakdown(stats, TOPICS);
    const sw = CDDAnalytics.getStrongestWeakest(breakdown);
    const heatmap = CDDMastery.buildHeatmap(TOPICS, stats, QUESTION_BANK);
    const insights = CDDMastery.masteryInsights(heatmap).concat(CDDAnalytics.getInsights(sessions, stats, TOPICS));

    $("#statCards").innerHTML = `
      <div class="stat-card accent"><div class="label">Overall accuracy</div><div class="value">${Math.round(overview.accuracy * 100)}%</div><div class="delta">${overview.totalCorrect} of ${overview.totalAnswered}</div></div>
      <div class="stat-card"><div class="label">Quizzes</div><div class="value">${overview.totalQuizzes}</div></div>
      <div class="stat-card"><div class="label">Questions seen</div><div class="value">${overview.uniqueQuestionsSeen}</div><div class="delta">of ${QUESTION_BANK.length}</div></div>
      <div class="stat-card"><div class="label">Day streak</div><div class="value">${getStreak()}</div></div>`;

    const card = (kind, h) => h ? `<div class="highlight-card ${kind === "strong" ? "strong" : "weak"}"><div class="highlight-icon">${kind === "strong" ? "↑" : "↓"}</div><div class="highlight-meta"><div class="label">${kind === "strong" ? "Strongest block" : "Weakest block"}</div><div class="topic-name">${esc(h.topic)}</div><div class="meta-line">${Math.round(h.accuracy * 100)}% across ${h.attempts} attempts</div></div></div>` : `<div class="highlight-card"></div>`;
    $("#highlightRow").innerHTML = (sw.strongest || sw.weakest) ? card("strong", sw.strongest) + card("weak", sw.weakest) : `<div class="highlight-card"><div class="highlight-icon">·</div><div class="highlight-meta"><div class="topic-name">Need ≥3 attempts per block to surface highlights.</div></div></div><div class="highlight-card"></div>`;

    const hm = $("#masteryHeatmap"); hm.innerHTML = "";
    heatmap.forEach((c) => {
      const tile = document.createElement("button"); tile.type = "button"; tile.className = `mastery-tile lvl-${c.level}`;
      tile.innerHTML = `<div class="tile-level">${c.level}</div><div class="tile-name">${esc(c.topic)}</div><div style="display:flex;justify-content:space-between;align-items:flex-end;gap:8px"><div class="tile-score">${c.attempts ? c.score : "—"}</div><div class="tile-meta"><span>${c.seenQuestions}/${c.totalQuestions}</span><span>${c.attempts ? Math.round(c.accuracy * 100) + "%" : "—"}</span></div></div><div class="tile-bar"><div style="width:${c.attempts ? c.score : 0}%"></div></div>`;
      tile.addEventListener("click", () => { state.selectedTopics = new Set([c.topic]); savePrefs(); renderTopicGrid(); startQuiz({ mode: "smart" }); });
      hm.appendChild(tile);
    });

    $("#insightList").innerHTML = insights.map((it) => `<li class="insight ${it.tone || "neutral"}"><div class="insight-icon">${it.tone === "positive" ? "✓" : it.tone === "warning" ? "!" : "i"}</div><div><div class="insight-title">${esc(it.title || "")}</div><div class="insight-text">${esc(it.text || "")}</div></div></li>`).join("");

    renderTopicChart(breakdown); renderTrendChart(CDDAnalytics.getRecentTrend(sessions, 10));
  }

  function renderTopicChart(breakdown) {
    if (typeof Chart === "undefined") return;
    const col = themeColors(); destroyChart("topicChart");
    const data = breakdown.filter((b) => b.attempts > 0).sort((a, b) => (a.accuracy || 0) - (b.accuracy || 0));
    if (!data.length) { $("#topicChart").style.display = "none"; return; }
    $("#topicChart").style.display = "";
    state.charts.topicChart = new Chart($("#topicChart"), {
      type: "bar",
      data: { labels: data.map((d) => d.topic.split(" · ")[0]), datasets: [{ data: data.map((d) => Math.round((d.accuracy || 0) * 100)), backgroundColor: data.map((d) => (d.accuracy >= 0.8 ? col.success : d.accuracy >= 0.5 ? col.primary : col.error)), borderRadius: 6, maxBarThickness: 26 }] },
      options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { min: 0, max: 100, ticks: { color: col.text, callback: (v) => v + "%" }, grid: { color: col.grid } }, y: { ticks: { color: col.text, font: { size: 10 } }, grid: { display: false } } } },
    });
  }
  function renderTrendChart(trend) {
    if (typeof Chart === "undefined") return;
    const col = themeColors(); destroyChart("trendChart"); if (!trend.length) return;
    state.charts.trendChart = new Chart($("#trendChart"), {
      type: "line",
      data: { labels: trend.map((t, i) => `S${i + 1}`), datasets: [{ data: trend.map((t) => Math.round(t.accuracy * 100)), borderColor: col.primary, backgroundColor: col.primarySoft, fill: true, tension: 0.35, pointRadius: 4, pointBackgroundColor: col.primary, pointBorderColor: "#fff", pointBorderWidth: 2 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: col.text }, grid: { color: col.grid } }, y: { min: 0, max: 100, ticks: { color: col.text, callback: (v) => v + "%" }, grid: { color: col.grid } } } },
    });
  }

  // =================================================================
  // Dialog helpers
  // =================================================================
  function openDialog(title, bodyHtml, buttons) {
    $("#dlgTitle").textContent = title; $("#dlgBody").innerHTML = bodyHtml;
    const foot = $("#dlgFoot"); foot.innerHTML = "";
    (buttons || []).forEach((b) => { const el = document.createElement("button"); el.className = b.cls; el.textContent = b.label; el.addEventListener("click", () => { b.fn(); if (!b.keepOpen) closeDialog(); }); foot.appendChild(el); });
    const dlg = $("#dlg"); if (!dlg.open) dlg.showModal();
  }
  function closeDialog() { const d = $("#dlg"); if (d.open) d.close(); }

  function openSettings() {
    openDialog("Settings", `
      <label class="field-label">Anthropic API key (for AI examiner feedback)</label>
      <input type="password" id="setKey" value="${esc(state.settings.apiKey || "")}" placeholder="sk-ant-… (stored locally only)"/>
      <label class="field-label">AI model</label>
      <select id="setModel">
        <option value="claude-opus-4-1" ${state.settings.apiModel === "claude-opus-4-1" ? "selected" : ""}>claude-opus-4-1</option>
        <option value="claude-sonnet-4-6" ${state.settings.apiModel === "claude-sonnet-4-6" ? "selected" : ""}>claude-sonnet-4-6</option>
        <option value="claude-haiku-4-5" ${state.settings.apiModel === "claude-haiku-4-5" ? "selected" : ""}>claude-haiku-4-5</option>
      </select>
      <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-sm" id="exportBtn">Export progress (JSON)</button>
        <button class="btn btn-sm btn-danger" id="resetBtn">Reset all progress</button>
      </div>`, [
      { label: "Close", cls: "btn btn-ghost", fn: closeDialog },
      { label: "Save", cls: "btn btn-primary", fn: () => { state.settings.apiKey = $("#setKey").value.trim(); state.settings.apiModel = $("#setModel").value; CDDStorage.setSettings(state.settings); toast("Settings saved"); } },
    ]);
    $("#exportBtn").addEventListener("click", () => {
      const data = { stats: CDDStorage.getAllStats(), sessions: CDDStorage.getSessions(), errors: CDDStorage.getErrors(), exams: CDDStorage.getExams() };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `cdd-revision-${Date.now()}.json`; a.click();
    });
    $("#resetBtn").addEventListener("click", () => { if (confirm("Reset all stats, sessions, errors and exams? This cannot be undone.")) { CDDStorage.resetAll(); Object.keys(state.charts).forEach(destroyChart); toast("Progress reset"); closeDialog(); updateSmartBanner(); } });
  }

  // =================================================================
  // Theme
  // =================================================================
  function bindTheme() {
    const refresh = () => { const dark = document.documentElement.getAttribute("data-theme") === "dark"; $("#iconMoon").style.display = dark ? "none" : "block"; $("#iconSun").style.display = dark ? "block" : "none"; };
    refresh();
    $("#themeToggle").addEventListener("click", () => { const cur = document.documentElement.getAttribute("data-theme"); document.documentElement.setAttribute("data-theme", cur === "dark" ? "light" : "dark"); refresh(); savePrefs(); if ($("#view-analytics").classList.contains("active")) renderAnalytics(); });
  }

  // =================================================================
  // Profiles
  // =================================================================
  function renderProfilePicker() {
    const picker = $("#profilePicker"), list = $("#profileList");
    const profiles = CDDStorage.getProfiles(); list.innerHTML = "";
    profiles.forEach((p) => {
      const c = document.createElement("button"); c.type = "button"; c.className = "profile-card";
      c.innerHTML = `<div class="profile-avatar">${esc(p.name.charAt(0).toUpperCase())}</div><div class="profile-name">${esc(p.name)}</div>`;
      c.addEventListener("click", () => { CDDStorage.setActiveProfile(p.id); enterApp(); });
      list.appendChild(c);
    });
    picker.hidden = false;
    document.querySelector(".app-header").hidden = true; document.querySelector(".app-main").hidden = true; document.querySelector(".app-footer").hidden = true;
  }

  function bindProfilePicker() {
    $("#newProfileForm").addEventListener("submit", (e) => {
      e.preventDefault(); const name = $("#newProfileInput").value.trim(); if (!name) return;
      const first = CDDStorage.getProfiles().length === 0;
      const id = CDDStorage.addProfile(name);
      if (first) CDDStorage.migrateUnprefixedData(id);
      CDDStorage.setActiveProfile(id); enterApp();
    });
    $("#switchProfileBtn").addEventListener("click", () => renderProfilePicker());
  }

  function enterApp() {
    $("#profilePicker").hidden = true;
    document.querySelector(".app-header").hidden = false; document.querySelector(".app-main").hidden = false; document.querySelector(".app-footer").hidden = false;
    boot();
  }

  let bound = false;
  function boot() {
    loadPrefs();
    if (!bound) {
      bindTheme(); bindChipRows();
      $("#selectAllTopics").addEventListener("click", () => { state.selectedTopics = new Set(TOPICS); renderTopicGrid(); savePrefs(); updateStartMeta(); updateSmartBanner(); });
      $("#clearTopics").addEventListener("click", () => { state.selectedTopics = new Set(); renderTopicGrid(); savePrefs(); updateStartMeta(); updateSmartBanner(); });
      $("#startBtn").addEventListener("click", () => startQuiz({ mode: "standard" }));
      $("#smartBtn").addEventListener("click", () => startQuiz({ mode: "smart" }));
      $("#quitBtn").addEventListener("click", () => { if (confirm("End this quiz? Progress this session is discarded.")) showView("dashboard"); });
      $("#reviewBtn").addEventListener("click", showReview);
      $("#retryIncorrectBtn").addEventListener("click", retryIncorrect);
      $("#homeBtn").addEventListener("click", () => showView("dashboard"));
      $("#reviewBackBtn").addEventListener("click", () => showView("results"));
      $$("#headerNav .nav-link").forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));
      $("#settingsBtn").addEventListener("click", openSettings);
      $("#dlgClose").addEventListener("click", closeDialog);
      $("#resetAnalyticsBtn").addEventListener("click", () => { if (confirm("Reset all analytics & history?")) { CDDStorage.resetAll(); Object.keys(state.charts).forEach(destroyChart); renderAnalytics(); updateSmartBanner(); } });
      $("#clearErrorsBtn").addEventListener("click", () => { if (confirm("Clear the error book?")) { CDDStorage.clearErrors(); renderErrorBook(); } });
      document.addEventListener("keydown", (e) => {
        if (!$("#view-quiz").classList.contains("active")) return;
        const n = $("#nextBtn");
        if (e.key === "Enter" && n && !n.disabled) { nextQuestion(); return; }
        const q = state.quiz && state.quiz.questions[state.quiz.index];
        if (q && q.type === "mcq" && /^[1-6]$/.test(e.key)) { const opts = $$(".option"); const i = +e.key - 1; if (opts[i] && !opts[i].disabled) opts[i].click(); }
      });
      bound = true;
    }
    renderHeroStats(); renderTopicGrid(); updateStartMeta(); updateSmartBanner();
    $("#streakValue").textContent = getStreak();
    const active = CDDStorage.getProfiles().find((p) => p.id === CDDStorage.getActiveProfileId());
    if (active) { $("#activeProfileName").textContent = active.name; $("#switchProfileBtn").hidden = false; }
    showView("dashboard");
  }

  function init() {
    QUESTION_BANK = buildQuestionBank();
    bindProfilePicker();
    const id = CDDStorage.getActiveProfileId();
    if (id && CDDStorage.getProfiles().find((p) => p.id === id)) { CDDStorage.setActiveProfile(id); enterApp(); }
    else renderProfilePicker();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
