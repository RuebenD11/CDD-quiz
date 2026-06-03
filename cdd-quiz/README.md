# CDD Revision — Clinical Drug Development (BIOL21302)

A modular, customisable revision app for Clinical Drug Development, rebuilt in the
clean style of the D&TB "Synapse" quiz app while preserving every feature of the
original single-file CDD revision tool.

## Run it

No build step, no dependencies to install (Chart.js loads once from a CDN; everything
else is local). **Just open `index.html` in any modern browser.**

To serve it locally instead (e.g. so the AI-feedback `fetch` and fonts behave),
double-click `serve.ps1` or run:

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1 -Port 8765
# then open http://localhost:8765/
```

## What it does

Pick one or more **teaching blocks** → choose length & format → run a **Standard**
or **Smart Revision** quiz. Smart Revision uses spaced repetition to surface your
weakest and most-overdue material first.

| View | What it covers |
|------|----------------|
| **Practice** | Build custom quizzes (Mixed / SAQ / MCQ / Calculations) across the 8 blocks |
| **Case Studies** | 5 integrated Section-B scenarios with data tables, dose–response/PK charts, and per-part marking |
| **Exam Sim** | Mirrors the real paper: Section A (answer 5 of 8 SAQs ×10) + Section B (1 compulsory case), 2-hour timer, self-mark |
| **Error Book** | Everything scored < 60%, categorised (factual / conceptual / calculation / exam-technique), one-click retry |
| **Analytics** | Accuracy, day streak, block-by-block mastery heatmap, insights, and Chart.js trend/accuracy charts |

## The 8 teaching blocks (TOPICS)

1. **B1** Drug Targets & Discovery — L02
2. **B2** Mechanisms of Drug Action — L03 (agonists → inverse agonists)
3. **B3** Methods in Drug Discovery — L04 molecular biology, L05 assays
4. **B4** Lead Discovery & Biomarkers — L06 lead gen, L07 lead opt, L08 biomarkers, pain case
5. **B5** Pharmacokinetics — L10/L11 ADME, L12 pharmacogenomics
6. **B6** Preclinical & Safety — L13 in vivo, L14 preclinical safety
7. **B7** Pharmaceutical Dev & Clinical Evaluation — pharmaceutical development, clinical evaluation
8. **B8** 21st-Century Approaches — biologics/immunotherapies/PROTACs, AI & drug repurposing

## Preserved CDD features

- **AI examiner feedback** — type an answer and click *Examiner feedback (AI)*; it builds a
  structured examiner-mode prompt and either calls the Anthropic API (paste a key in Settings)
  or lets you copy the prompt into claude.ai.
- **Self-marking** — every SAQ/case part reveals the official mark scheme as a tickable
  checklist (1 mark = 1 point), with a live running score.
- **Calculation drills** — numeric drills with a units-required check, worked solutions and
  common-error notes; includes a 90-second timed mode.
- **Case-study sections** — full data tables and inline SVG charts (dose–response, Caco-2,
  rat/human PK).
- **Writing coach** — flags vague phrasing, missing units, missing reasoning, and length.
- **Spaced repetition, error book, exam simulator, analytics, profiles, dark mode.**

## Auto-grading (new)

Written answers are now **auto-graded** point-by-point (toggle in *Configure your quiz*).
The matcher (`matcher.js`) stacks three layers so the *intent* of an answer matters more
than the exact wording:

1. **Normalisation** — case, punctuation, dashes, Greek letters, sub/superscripts.
2. **Domain synonyms** — a large pharmacology/drug-development dictionary
   (`GPCR ⇄ G-protein-coupled receptor`, `Vd ⇄ volume of distribution`, `mAb ⇄ monoclonal
   antibody`, `PROTAC ⇄ proteolysis-targeting chimera`, …), expanded transitively.
3. **Typo tolerance** — Levenshtein distance ≤ 1 (≤ 2 for long words), so `fluoxitine`
   still matches `fluoxetine`.

Auto-grade results **pre-tick** the mark scheme; you can always override by ticking/unticking
points yourself. A point's `patterns` is a keyword (any one matches) or an array (all must
appear), e.g. `[["nmda","co agonist"]]`.

## Content sources

Questions are drawn from the BIOL21302 lecture notes, the integrated case-study notes, and
**both the 2023 and 2024 past papers** — every Section-A question and both case studies from
each year are represented, plus questions covering the four newest lectures (Pharmaceutical
Development; Clinical Evaluation; PROTACs/Biologics/Immunotherapies; AI & Drug Repurposing).
Where official mark schemes were unavailable (2023/2024 papers and new lectures), suitable
mark schemes were authored on the standard convention that **one mark = one discrete
point/assertion/fact**.

## File structure

```
cdd-quiz/
├── index.html      # App shell (Practice, Cases, Exam, Errors, Analytics views)
├── styles.css      # Teal academic theme, light + dark
├── questions.js    # TOPICS (8 blocks), BLOCKS metadata, MCQ_BANK
├── saqs.js         # SAQ_BANK — multi-mark, mark-scheme-graded short answers
├── calcs.js        # CALC_BANK — numeric calculation drills (units-required)
├── cases.js        # CASE_BANK — 5 integrated case studies (tables + charts + parts)
├── matcher.js      # Flexible auto-grader (normalise + synonyms + typo tolerance)
├── storage.js      # Persistence (profiles + stats + sessions + errors + exams)
├── srs.js          # Spaced repetition (SM-2 inspired) + Smart-Mode selection
├── mastery.js      # Block mastery scoring + heatmap model
├── analytics.js    # Aggregations + insight derivation
├── app.js          # UI controller / orchestrator
├── serve.ps1       # Tiny local static server (no node/python needed)
└── README.md       # You are here
```

## Adding questions

Add to `SAQ_BANK` (saqs.js), `MCQ_BANK` (questions.js), `CALC_BANK` (calcs.js) or
`CASE_BANK` (cases.js). Tag each with one of the `TOPICS` block names so it joins
filtering, SRS, mastery and analytics. SAQ shape:

```js
{ id:"saq-bX-n", topic:"B5 · Pharmacokinetics", lecture:"L11", source:"core",
  type:"saq", marks:3, question:"…",
  markScheme:[ { marks:1, label:"Point shown to the user", patterns:[["keyword"],["alt phrase"]] }, … ],
  modelAnswer:"concise ideal answer", modelExpanded:"fuller high-scoring answer" }
```
