// cases.js — Integrated drug-development case studies (Section B style, ~35–50 marks).
//
// Each case: { id, title, topic, block, source, totalMarks, scenario (markdown-lite
// with pipe tables), chart? ("doseResponse"|"caco2"|"pk"), parts:[ { id, marks,
// skill, stem, markScheme:[{marks,label,patterns}], modelAnswer, modelExpanded } ] }
//
// Parts are graded exactly like SAQs (auto-grade + manual self-mark + AI feedback).
// app.js merges each part into the global QUESTION_BANK for SRS/mastery/analytics.

const CASE_BANK = [

  // ===================================================================
  // CASE 1 — Muscarinic ACh receptor antagonist (2023 Case Study 1 + original)
  // ===================================================================
  {
    id: "case-musc", title: "Muscarinic acetylcholine receptor antagonist",
    topic: "B2 · Mechanisms of Drug Action", block: 2, source: "2023", totalMarks: 50,
    chart: "doseResponse",
    scenario: `The actions of different compounds on muscarinic acetylcholine receptors in intestinal smooth muscle were examined. Muscle contraction (tension) was measured after increasing concentrations of Drugs A and B. The experiment with Drug A was then repeated in the presence of 10 nM Drug C, which had no effect alone.

Table 1 — Tension (mN) vs log[Drug]
| log[Drug] (M) | Drug A (mN) | Drug B (mN) |
|---:|---:|---:|
| -9   | 0.04 | 0    |
| -8.5 | 0.30 | 0.10 |
| -8   | 1.20 | 0.35 |
| -7.5 | 2.60 | 0.85 |
| -7   | 4.10 | 1.35 |
| -6.5 | 5.20 | 1.68 |
| -6   | 5.70 | 1.86 |
| -5.5 | 6.10 | 1.95 |
| -5   | 6.30 | 2.00 |
| -4.5 | 6.35 | 2.05 |

Table 2 — Drug A in the presence of 10 nM Drug C
| log[Drug A] (M) | Tension (mN) |
|---:|---:|
| -8   | 0.05 |
| -7.5 | 0.40 |
| -7   | 1.15 |
| -6.5 | 2.30 |
| -6   | 3.60 |
| -5.5 | 4.80 |
| -5   | 5.65 |
| -4.5 | 6.20 |

Lead optimisation produced two further candidate antagonists, X and Z, profiled at all five muscarinic subtypes.

Table 3 — Antagonist Ki (nM) at muscarinic subtypes
| Compound | M1 | M2 | M3 | M4 | M5 | M2/M3 ratio |
|---|---:|---:|---:|---:|---:|---:|
| X | 0.11 | 21   | 0.20  | 0.12  | 0.13  | 105 |
| Z | 0.011| 0.66 | 0.027 | 0.009 | 0.047 | 24  |`,
    parts: [
      {
        id: "case-musc-1", marks: 10, skill: "interpretation",
        stem: "Plot the response against log[concentration] for Drug A, Drug B, and Drug A in the presence of Drug C on one set of axes. (Describe the curves you would draw: axes, units, shapes, plateaus.)",
        markScheme: [
          { marks: 2, label: "x-axis = log[Drug] (M); y-axis = tension (mN) — both axes labelled with units", patterns: [["log", "concentration"], ["tension", "mn"], ["axis", "unit"], ["y axis", "x axis"]] },
          { marks: 2, label: "Drug A: sigmoidal curve reaching a plateau at ~6.35 mN", patterns: [["sigmoid"], ["a", "plateau"], ["6", "mn"], ["maximal", "a"]] },
          { marks: 2, label: "Drug B: sigmoidal curve to a much lower plateau (~2.05 mN, ~1/3 of A)", patterns: [["b", "lower"], ["2", "mn"], ["lower plateau"], ["b", "sub maximal"]] },
          { marks: 2, label: "Drug A + C: parallel rightward shift of A's curve, same Emax (~6.2 mN)", patterns: [["parallel", "shift"], ["right", "shift"], ["same emax"], ["a c", "right"]] },
          { marks: 2, label: "All three curves clearly labelled / keyed and plotted to scale", patterns: [["key"], ["label", "curve"], ["legend"], ["to scale"]] },
        ],
        modelAnswer: "Plot tension (mN, y) against log[Drug] (M, x), with both axes labelled with units. Drug A is sigmoidal, plateauing at ~6.35 mN. Drug B is sigmoidal but reaches a much lower plateau (~2.05 mN, about a third of A). Drug A + 10 nM Drug C runs parallel to A's curve, shifted to the right, with the same Emax (~6.2 mN). Provide a clear key distinguishing the three curves.",
        modelExpanded: "Axes: x = log[Drug] (M), y = tension (mN), both with units. Drug A is a sigmoidal curve asymptoting to ~6.35 mN with half-maximal response near log = −7.3 (~50 nM). Drug B is sigmoidal but reaches a markedly lower maximum (~2.05 mN, about a third of A's Emax) at a similar EC50. The curve for Drug A in the presence of 10 nM Drug C is parallel to A's, shifted to the right, with essentially the same Emax (~6.2 mN). Mark all axes with units and use a clear key — plotting points accurately to scale earns credit.",
      },
      {
        id: "case-musc-2", marks: 10, skill: "reasoning",
        stem: "From the graph, what can be concluded about the mechanism of action of each of Drugs A, B and C? Justify your answer using the data.",
        markScheme: [
          { marks: 2, label: "Drug A is a FULL agonist (reaches the maximal/plateau response)", patterns: [["a", "full agonist"], ["full agonist"], ["a", "maximal"]] },
          { marks: 2, label: "Justify A: response plateaus at the system maximum", patterns: [["plateau", "maximum"], ["maximal response"], ["highest", "tension"]] },
          { marks: 2, label: "Drug B is a PARTIAL agonist (plateaus well below A's Emax despite saturation)", patterns: [["b", "partial"], ["partial agonist"], ["b", "sub maximal"]] },
          { marks: 2, label: "Drug C is a COMPETITIVE antagonist (no effect alone; parallel right shift of A, Emax unchanged)", patterns: [["c", "competitive"], ["competitive antagonist"], ["c", "antagonist"]] },
          { marks: 2, label: "Justify C: parallel right shift with unchanged Emax = surmountable/competitive (else Emax would fall)", patterns: [["parallel", "right"], ["surmountable"], ["emax", "unchanged"], ["right", "emax", "same"]] },
        ],
        modelAnswer: "Drug A is a full agonist — its response reaches the maximal plateau of the system. Drug B is a partial agonist — it plateaus well below A's Emax (~2.05 vs 6.35 mN) even at saturating concentrations. Drug C is a competitive antagonist — it has no effect alone but shifts Drug A's curve in parallel to the right with Emax unchanged, the hallmark of surmountable competitive antagonism (a non-competitive antagonist would have lowered Emax).",
        modelExpanded: "Drug A is a full agonist because its response reaches a plateau — the maximal achievable response in this preparation (~6.35 mN). Drug B is a partial agonist: its curve also plateaus, but at a maximum (~2.05 mN) far below Drug A's, and increasing concentration further does not raise the response. Drug C is a competitive antagonist: alone it produces no effect, and in the presence of Drug A it shifts A's concentration–response curve to the right in parallel while Emax remains essentially unchanged. A parallel rightward shift with unchanged Emax is the hallmark of a surmountable, competitive (orthosteric) antagonist; non-competitive antagonism would have reduced Emax.",
      },
      {
        id: "case-musc-3", marks: 10, skill: "interpretation",
        stem: "What pharmacological parameters can be measured from this graph? List them, define them, and estimate their values (with units), indicating how the values were obtained.",
        markScheme: [
          { marks: 2, label: "Emax = maximal response; A ≈ 6.35 mN, B ≈ 2.05 mN, A+C ≈ 6.2 mN", patterns: [["emax"], ["maximal response"], ["6", "2", "mn"]] },
          { marks: 2, label: "EC50 = concentration giving 50% of that curve's Emax", patterns: [["ec50", "50"], ["half", "maximal", "concentration"], ["50", "emax"]] },
          { marks: 2, label: "EC50 (Drug A) ≈ 50 nM (~5 × 10⁻⁸ M)", patterns: [["50 nm"], ["5", "10", "8"], ["a", "50"]] },
          { marks: 2, label: "EC50 (Drug A + C) shifted higher (~0.8 µM) — used for dose ratio", patterns: [["0.8", "um"], ["shift", "higher"], ["micromolar"], ["dose ratio"]] },
          { marks: 2, label: "Values must carry units; show derivation on the graph (50% across → down → antilog)", patterns: [["units"], ["antilog"], ["read", "off"], ["50", "across"]] },
        ],
        modelAnswer: "Emax (maximal response): Drug A ≈ 6.35 mN, Drug B ≈ 2.05 mN, Drug A+C ≈ 6.2 mN. EC50 (the concentration producing 50% of that curve's Emax): Drug A ≈ 50 nM (~5 × 10⁻⁸ M); Drug A + C is shifted to ~0.8 µM, allowing a dose ratio to be calculated. All values need units; derive EC50 by reading across from 50% of Emax to the curve, dropping to the x-axis and taking the antilog.",
        modelExpanded: "Two key parameters are readable. Emax (maximal response): Drug A ≈ 6.35 mN, Drug B ≈ 2.05 mN, Drug A + 10 nM C ≈ 6.2 mN. EC50 (concentration giving 50% of that curve's Emax): Drug A ≈ 50 nM (5 × 10⁻⁸ M); Drug B at a similar EC50; Drug A + C shifted to ~0.8 µM (8 × 10⁻⁷ M). Annotate the graph to show how each is obtained — read across from 50% on the y-axis to the curve, drop to the x-axis, take the antilog (with units). Every value must carry units; quoting only the log value typically earns half marks. From the shift, dose ratio DR = 800/50 ≈ 16.",
      },
      {
        id: "case-musc-4", marks: 10, skill: "reasoning",
        stem: "Lead optimisation converted Drug D (M3 Ki = 0.12 nM, M2 Ki = 0.11 nM, M2/M3 = 0.92) into Drug E (M3 Ki = 0.20 nM, M2 Ki = 21 nM, M2/M3 = 105). What did optimisation achieve, and is it a good outcome for an overactive-bladder indication?",
        markScheme: [
          { marks: 2, label: "Drug E retains strong M3 affinity (Ki ~0.2 nM, only slightly weaker than D)", patterns: [["retain", "m3"], ["m3", "0.2"], ["still", "potent", "m3"]] },
          { marks: 2, label: "M2 affinity dramatically reduced (0.11 → 21 nM, ~200-fold)", patterns: [["m2", "reduce"], ["200 fold"], ["m2", "21"], ["lose", "m2"]] },
          { marks: 2, label: "M2/M3 selectivity rises from 0.92 to 105 (~100-fold M3 selectivity)", patterns: [["selectivity", "increase"], ["0.92", "105"], ["100 fold", "m3"], ["ratio", "105"]] },
          { marks: 2, label: "Good outcome: M3 drives bladder smooth-muscle contraction (on-target)", patterns: [["m3", "bladder"], ["m3", "smooth muscle"], ["m3", "detrusor"]] },
          { marks: 2, label: "M3-over-M2 selectivity reduces cardiac (M2) ADRs e.g. bradycardia — favourable trade-off", patterns: [["m2", "cardiac"], ["m2", "heart"], ["bradycardia"], ["reduce", "cardiac"]] },
        ],
        modelAnswer: "Optimisation kept strong M3 affinity (Ki ~0.2 nM, only marginally weaker than D) while dramatically reducing M2 affinity (0.11 → 21 nM, ~200-fold), raising M2/M3 selectivity from 0.92 to 105 — about 100-fold selectivity for M3 over M2. This is a good outcome for overactive bladder: M3 mediates bladder (detrusor) smooth-muscle contraction (the desired pharmacology), while M2 mediates cardiac effects (bradycardia), so M3-over-M2 selectivity reduces cardiac ADRs for a small loss of absolute M3 potency.",
        modelExpanded: "Drug E retains strong M3 affinity (Ki ≈ 0.2 nM, only marginally less potent than D at M3) but its M2 affinity has fallen ~200-fold (Ki 0.11 → 21 nM). The M2/M3 ratio therefore rises from 0.92 (essentially equal) to 105 — roughly 100-fold selectivity for M3 over M2. For overactive bladder this is desirable: M3 mediates detrusor smooth-muscle contraction (the on-target pharmacology), whereas M2 in the heart contributes to bradycardia and conduction effects. Selectivity for M3 over M2 therefore reduces cardiac on-target ADRs while preserving efficacy; the minor cost is the small loss of absolute M3 potency, acceptable given the safety gain.",
      },
      {
        id: "case-musc-5", marks: 10, skill: "interpretation",
        stem: "Using Table 3, which compound (X or Z) shows the most promise as a selective M3 antagonist? Justify your answer with the numerical ratios.",
        markScheme: [
          { marks: 2, label: "Z is more potent at M3 in absolute terms (Ki 0.027 nM vs 0.20 nM for X)", patterns: [["z", "potent"], ["z", "0.027"], ["z", "higher affinity"]] },
          { marks: 2, label: "But Z binds all subtypes strongly → essentially pan-muscarinic (poor selectivity)", patterns: [["z", "pan"], ["z", "all subtype"], ["z", "not selective"], ["z", "poor selectivity"]] },
          { marks: 2, label: "X has weaker M3 affinity (0.20 nM) but ~100× selectivity over M2 (21/0.20)", patterns: [["x", "selectivity"], ["x", "105"], ["x", "100"], ["x", "m2", "m3"]] },
          { marks: 2, label: "Choose X — better selectivity profile is more important than raw potency", patterns: [["choose", "x"], ["x", "promise"], ["x", "best"], ["x", "selective"]] },
          { marks: 2, label: "Caveat: selectivity over M1/M4/M5 still needs improvement (justify with numbers)", patterns: [["m1", "m4", "m5"], ["caveat"], ["improve", "selectivity"], ["m4", "m5"]] },
        ],
        modelAnswer: "Compound X is the more promising selective M3 antagonist. Although Z is more potent at M3 in absolute terms (Ki 0.027 vs 0.20 nM), Z binds all five muscarinic subtypes strongly and is essentially pan-muscarinic. X has weaker M3 affinity but ~100-fold selectivity over M2 (21/0.20 = 105). Selectivity matters more than raw potency for limiting off-target ADRs, so choose X — with the caveat that its selectivity over M1, M4 and M5 still needs improving.",
        modelExpanded: "Compound Z is the more potent M3 ligand in absolute terms (Ki = 0.027 nM vs 0.20 nM for X), but it also binds the other subtypes strongly (M1 0.011, M2 0.66, M4 0.009, M5 0.047 nM) — only single-figure-fold selectivity over off-target subtypes — so it is effectively a pan-muscarinic antagonist that would cause widespread ACh-blockade ADRs. Compound X has weaker M3 affinity (0.20 nM) but far better selectivity — ~105-fold over M2 (21/0.20) and ~10–100-fold over M1/M4/M5. Selectivity is more important than raw potency for safety, so X is the better starting point, with the explicit caveat that selectivity over M1, M4 and M5 still needs to be improved while retaining M3 affinity. Justification must reference the numerical ratios.",
      },
    ],
  },

  // ===================================================================
  // CASE 2 — 5-HT4 partial agonist (2024 Case Study 1)
  // ===================================================================
  {
    id: "case-5ht4", title: "5-HT₄ agonists for GI disorders (cisapride derivatives)",
    topic: "B3 · Methods in Drug Discovery", block: 4, source: "2024", totalMarks: 50,
    chart: "doseResponse",
    scenario: `A programme aims to develop oral 5-HT₄ serotonin-receptor agonists for GI disorders. Cisapride, a 5-HT₄ partial agonist, was previously licensed but withdrawn for serious off-target effects. Cisapride derivatives (Drugs A, B, C) were tested for their ability to displace radiolabelled cisapride from CHO membranes expressing human 5-HT₄ receptors.

Table 1 — Binding data (Kd for cisapride = 79 nM)
| Drug | IC50 (nM) | Ki (nM) |
|---|---:|---:|
| A | 109 | 8   |
| B | 55  | 4   |
| C | 78  | 240 |

Functional (cAMP) assays were then run. Responses are % of the maximal serotonin response (cisapride: EC50 = 140 nM, Emax = 73%).

Table 2 — Functional response (% max serotonin)
| log[Drug] (M) | Drug A | Drug B | Drug C |
|---:|---:|---:|---:|
| -9.5 | 2.2  |      |      |
| -9   | 6.6  | 0.1  | 0.1  |
| -8.5 | 18.3 | 0.0  | 0.4  |
| -8   | 44.4 | 0.0  | 1.6  |
| -7.5 | 69.1 | 0.1  | 4.2  |
| -7   | 87.6 | 0.2  | 12.1 |
| -6.5 | 95.8 | 0.2  | 28.5 |
| -6   | 98.6 | 0.1  | 45.1 |
| -5.5 | 99.6 | 0.1  | 58.4 |
| -5   | 99.9 | 0.2  | 62.4 |
| -4.5 |      | 0.1  | 64.9 |

Following in vitro safety testing Drug A was pursued. Four derivatives stimulated guinea-pig ileum with similar efficacy; in-vivo mouse data:

Table 3 — In-vivo results
| Drug | t½ (IV) | F (oral) |
|---|---:|---:|
| W | 17 h  | 0.1 (10%) |
| X | 1.5 h | 0.6 (60%) |
| Y | 12 h  | 0.5 (50%) |
| Z | 15 h  | 0      |`,
    parts: [
      {
        id: "case-5ht4-1", marks: 5, skill: "reasoning",
        stem: "Outline the principles of the radioligand binding assay used to screen the new compounds, and explain how the IC50 and Ki for drug binding are determined.",
        markScheme: [
          { marks: 1, label: "A fixed concentration of radiolabelled ligand (cisapride) is bound to the receptor membranes", patterns: [["radiolabel"], ["radioligand"], ["labelled", "ligand"]] },
          { marks: 1, label: "Increasing test-compound concentrations compete/displace the radioligand", patterns: [["displace"], ["compete"], ["increasing", "concentration"]] },
          { marks: 1, label: "Bound radioactivity is measured; plot displacement vs log[test compound]", patterns: [["bound", "radioactivity"], ["plot", "displace"], ["measure", "bound"]] },
          { marks: 1, label: "IC50 = concentration of test compound displacing 50% of bound radioligand", patterns: [["ic50", "50"], ["50", "displace"]] },
          { marks: 1, label: "Ki derived from IC50 via Cheng-Prusoff (corrects for radioligand concentration/Kd)", patterns: [["cheng prusoff"], ["ki", "ic50"], ["correct", "kd"]] },
        ],
        modelAnswer: "A fixed amount of radiolabelled cisapride is bound to membranes expressing the 5-HT₄ receptor, then increasing concentrations of the test compound are added to compete it off. Bound radioactivity is measured and plotted against log[test compound]; the IC50 is the concentration displacing 50% of the bound radioligand. Ki (a concentration-independent affinity) is then calculated from IC50 using the Cheng–Prusoff equation, which corrects for the radioligand concentration and its Kd.",
        modelExpanded: "In a competition radioligand binding assay, membranes containing the human 5-HT₄ receptor are incubated with a fixed concentration of radiolabelled cisapride, which binds the receptor. Increasing concentrations of the unlabelled test compound are added and compete with the radioligand for the binding site; the higher the test compound's affinity, the more radioligand is displaced. After separating bound from free, the bound radioactivity is measured and plotted against log[test compound] to give a displacement curve. The IC50 is read off as the concentration of test compound that displaces 50% of the specifically bound radioligand. Because IC50 depends on the radioligand concentration used, it is converted to the affinity constant Ki using the Cheng–Prusoff equation (Ki = IC50 / (1 + [radioligand]/Kd)), giving an assay-independent measure of affinity.",
      },
      {
        id: "case-5ht4-2", marks: 10, skill: "interpretation",
        stem: "Plot concentration–response curves for Drugs A, B and C on one set of axes (describe them), then determine the EC50 values for Drugs A and C.",
        markScheme: [
          { marks: 2, label: "Axes: % max serotonin response (y) vs log[Drug] (M, x), labelled with units", patterns: [["percent", "response"], ["log", "concentration"], ["axis", "label"]] },
          { marks: 2, label: "Drug A: full sigmoidal curve reaching ~100% of max serotonin response", patterns: [["a", "100"], ["a", "full"], ["a", "maximal"]] },
          { marks: 2, label: "Drug C: lower/right-shifted curve reaching ~65% (incomplete, less potent)", patterns: [["c", "65"], ["c", "lower"], ["c", "right"]] },
          { marks: 2, label: "Drug B: essentially flat (~0% response) across all concentrations", patterns: [["b", "flat"], ["b", "no response"], ["b", "0"]] },
          { marks: 2, label: "EC50(A) ≈ 10 nM (log ~−8); EC50(C) ≈ 1 µM (log ~−6) — read at 50% of own Emax, with units", patterns: [["ec50", "a", "10"], ["a", "8"], ["c", "1", "um"], ["c", "6"]] },
        ],
        modelAnswer: "Plot % maximal serotonin response (y) against log[Drug] (M, x). Drug A is a full sigmoidal curve reaching ~100% (so essentially a full agonist relative to serotonin); Drug C is right-shifted and reaches only ~65% (less potent, lower maximum); Drug B is essentially flat at ~0%. Reading at 50% of each drug's own maximum: EC50(A) ≈ 10 nM (log −8); EC50(C) ≈ 1 µM (log ≈ −6). Quote units and show the read-off on the graph.",
        modelExpanded: "Axes: y = % of the maximal serotonin response, x = log[Drug] (M), both labelled. Drug A gives a full sigmoidal curve rising to ~100% of the serotonin maximum (a full agonist in this system), with half-maximal response around log −8 → EC50 ≈ 10 nM. Drug C is shifted to the right and plateaus around 65% (lower potency and a lower maximum), with half of its own maximum near log −6 → EC50 ≈ 1 µM. Drug B produces essentially no functional response (~0%) at any concentration despite binding well (see Table 1). EC50 values must carry units and the derivation (50% of that curve's Emax → across to curve → down to x-axis → antilog) should be shown on the graph.",
      },
      {
        id: "case-5ht4-3", marks: 7, skill: "reasoning",
        stem: "(a) What terms describe the mechanisms of action of Drug A and Drug C? Explain. (4)  (b) Rank the agonist potency (least → most potent) of cisapride and its derivatives. (3)",
        markScheme: [
          { marks: 1, label: "Drug A = (full) agonist — reaches ~100% of the maximal serotonin response", patterns: [["a", "full agonist"], ["a", "agonist"], ["a", "100"]] },
          { marks: 1, label: "Drug C = partial agonist — reaches a sub-maximal plateau (~65%)", patterns: [["c", "partial"], ["c", "sub maximal"], ["c", "65"]] },
          { marks: 1, label: "Drug B = antagonist (binds — low Ki — but no functional response)", patterns: [["b", "antagonist"], ["b", "binds", "no response"], ["b", "no", "efficacy"]] },
          { marks: 1, label: "Justify using both binding (Ki) and functional (Emax/EC50) data", patterns: [["ki", "functional"], ["binding", "and", "function"], ["emax", "ec50"]] },
          { marks: 1, label: "Potency rank uses EC50: most potent = lowest EC50 (Drug A)", patterns: [["a", "most potent"], ["lowest ec50"], ["a", "lowest"]] },
          { marks: 1, label: "Cisapride EC50 = 140 nM (intermediate)", patterns: [["cisapride", "140"], ["cisapride", "intermediate"]] },
          { marks: 1, label: "Rank: C (least) < cisapride < A (most) [B is an antagonist — no agonist potency]", patterns: [["c", "cisapride", "a"], ["least", "c"], ["b", "not", "agonist"]] },
        ],
        modelAnswer: "Drug A is a (full) agonist — it reaches ~100% of the maximal serotonin response. Drug C is a partial agonist — it plateaus sub-maximally (~65%). Drug B binds well (low Ki = 4 nM) but produces no functional response, so it is an antagonist. Using EC50 for agonist potency (lower = more potent): Drug A (~10 nM) is most potent, cisapride is intermediate (140 nM), and Drug C (~1 µM) is least potent — so the rank is C < cisapride < A (Drug B is an antagonist and has no agonist potency).",
        modelExpanded: "Drug A reaches ~100% of the maximal serotonin response, so it behaves as a full agonist; Drug C plateaus well below the maximum (~65%), so it is a partial agonist; Drug B binds the receptor with high affinity (Ki = 4 nM, the lowest of the three) yet produces essentially no functional cAMP response, identifying it as an antagonist. The conclusion uses both the binding data (all three displace radioligand, so all bind) and the functional data (only A and C produce a response). Agonist potency is ranked by EC50 (the lower the EC50, the more potent): Drug A (~10 nM) > cisapride (140 nM) > Drug C (~1 µM), i.e. least → most potent = C < cisapride < A. Drug B is an antagonist and therefore has no agonist potency to rank.",
      },
      {
        id: "case-5ht4-4", marks: 14, skill: "reasoning",
        stem: "(a) Suggest an explanation for the result obtained with Drug B (binds well but no functional response). (4)  (b) Describe an experiment to test your explanation, including how the data would be presented and the result expected if you are correct. (10)",
        markScheme: [
          { marks: 2, label: "Drug B has affinity (low Ki) but no/low intrinsic efficacy → it is an antagonist", patterns: [["affinity", "no efficacy"], ["antagonist"], ["binds", "not activate"], ["no intrinsic efficacy"]] },
          { marks: 2, label: "Predict: B should block an agonist (e.g. serotonin or Drug A) functionally", patterns: [["block", "agonist"], ["block", "serotonin"], ["antagonise", "a"]] },
          { marks: 2, label: "Experiment: agonist concentration–response curve ± a fixed concentration of Drug B", patterns: [["concentration response", "b"], ["agonist", "plus", "b"], ["with", "without", "b"]] },
          { marks: 2, label: "Plot response vs log[agonist] for control vs +Drug B", patterns: [["plot", "log", "agonist"], ["control", "b"], ["response", "log"]] },
          { marks: 2, label: "Expected (competitive): parallel rightward shift, Emax unchanged → confirms antagonism", patterns: [["parallel", "right"], ["right shift"], ["emax", "unchanged"]] },
          { marks: 2, label: "If non-competitive instead: Emax reduced (allow as alternative reasoning)", patterns: [["non competitive"], ["emax", "reduce"], ["insurmountable"]] },
        ],
        modelAnswer: "Drug B has affinity (low Ki = 4 nM) but little/no intrinsic efficacy, so it binds without activating the receptor — i.e. it is an antagonist. Prediction: it should block a functional agonist. Test: construct a concentration–response curve to an agonist (serotonin or Drug A) alone and in the presence of a fixed concentration of Drug B, measuring cAMP. Plot response (% max) against log[agonist] for both conditions. If Drug B is a competitive antagonist, the curve shifts in parallel to the right with Emax unchanged (surmountable); if non-competitive, Emax would fall instead — either result confirms B is an antagonist rather than a silent binder.",
        modelExpanded: "The explanation is that Drug B possesses affinity (it displaces radioligand with a low Ki of 4 nM) but lacks intrinsic efficacy, so it occupies the receptor without activating it — the defining property of an antagonist. To test this, set up the same functional cAMP assay and build a concentration–response curve to a known agonist (serotonin or Drug A) in the absence and presence of a fixed concentration of Drug B. Present the data as response (% of maximal serotonin response) plotted against log[agonist] for the two conditions on the same axes. If Drug B is a competitive (surmountable) antagonist, its curve will be shifted to the right in parallel with the control, with Emax unchanged — increasing agonist concentration overcomes the block. If Drug B were instead a non-competitive antagonist, Emax would be reduced without a simple parallel shift. Either pattern confirms that Drug B is an antagonist (occupies but does not activate the receptor), explaining its strong binding but absent functional response; a Schild analysis across several B concentrations could further quantify the antagonism.",
      },
      {
        id: "case-5ht4-5", marks: 6, skill: "reasoning",
        stem: "Of in-vivo derivatives W, X, Y, Z (Table 3), which shows the most promise for an oral GI drug, and why? Refer to the stated properties.",
        markScheme: [
          { marks: 2, label: "Best choice = Drug Y (good oral F 50% AND long t½ 12 h)", patterns: [["y", "promise"], ["choose", "y"], ["y", "best"]] },
          { marks: 1, label: "Y has adequate oral bioavailability (50%) — needed for an oral drug", patterns: [["y", "50"], ["y", "oral", "bioavailability"], ["y", "f"]] },
          { marks: 1, label: "Y has a long enough t½ (12 h) for convenient (e.g. once/twice-daily) dosing", patterns: [["y", "12"], ["y", "half life"], ["y", "long"]] },
          { marks: 1, label: "Reject W: long t½ but very poor oral F (10%)", patterns: [["w", "poor", "f"], ["w", "10"], ["w", "low bioavailability"]] },
          { marks: 1, label: "Reject X (short t½ 1.5 h) and Z (zero oral F — not absorbed orally)", patterns: [["x", "short"], ["x", "1.5"], ["z", "0"], ["z", "not absorb"]] },
        ],
        modelAnswer: "Drug Y shows the most promise. For an oral drug you need both adequate oral bioavailability and a half-life long enough for convenient dosing. Y has good oral F (50%) and a long t½ (12 h), so it would be well absorbed and need only once/twice-daily dosing. W is rejected (long t½ but very poor oral F of 10%), X is rejected (t½ only 1.5 h — too frequent dosing), and Z is rejected (zero oral bioavailability — not absorbed orally).",
        modelExpanded: "An orally administered GI drug needs to be both well absorbed (adequate oral bioavailability) and to persist long enough for a practical dosing schedule (a reasonable half-life). Drug Y is the best compromise: oral F = 50% (good absorption) and t½ = 12 h (supporting once- or twice-daily dosing). Drug W has a long half-life (17 h) but very poor oral bioavailability (10%), so most of an oral dose would be lost. Drug X is well absorbed (60%) but its 1.5 h half-life would require very frequent dosing. Drug Z has zero oral bioavailability, so it cannot be used orally at all. Therefore Drug Y is the most promising candidate.",
      },
    ],
  },

  // ===================================================================
  // CASE 3 — Caco-2 oral opioid absorption / P-gp / OAT (2024 Case Study 2)
  // ===================================================================
  {
    id: "case-caco2", title: "Oral opioid absorption: Caco-2, P-gp & OAT transporters",
    topic: "B5 · Pharmacokinetics", block: 5, source: "2024", totalMarks: 50,
    chart: "caco2",
    scenario: `Developing an oral opioid analgesic, the absorption of candidates ManUPharm1 and ManUPharm2 was assessed in Caco-2 cells. 50 µM was added to the apical side and the basolateral concentration measured over time by HPLC.

Table 1 — Basolateral concentration (µM); % = ([baso]/50)×100
| Time (h) | MP1 (µM) | MP2 (µM) |
|---:|---:|---:|
| 0  | 0    | 0    |
| 1  | 4    | 8.8  |
| 2  | 7.1  | 18.7 |
| 4  | 13.2 | 28.6 |
| 6  | 19.7 | 37.6 |
| 8  | 24.5 | 41.6 |
| 12 | 26.8 | 43.7 |
| 24 | 29.6 | 46.2 |

The experiment was repeated with 10 µM verapamil (a P-glycoprotein inhibitor):

Table 2 — Basolateral concentration (µM) + verapamil
| Time (h) | MP1 (µM) | MP2 (µM) |
|---:|---:|---:|
| 1  | 6.4  | 11.8 |
| 2  | 12.6 | 20.8 |
| 4  | 20.8 | 30.9 |
| 6  | 30.1 | 40.8 |
| 8  | 33.6 | 42.9 |
| 12 | 35.4 | 45.8 |
| 24 | 34.9 | 45.4 |

ManUPharm2 was then studied in Caco-2 cells expressing wild-type or mutant Organic Anion Transporters (OAT1/OAT3, encoded by SLC22A6 and SLC22A8):

Table 3 — % ManUPharm2 in basolateral compartment
| Time (h) | Wild-type | SLC22A6 variant | SLC22A8 variant |
|---:|---:|---:|---:|
| 1  | 16.8 | 4.6  | 7.9  |
| 2  | 38.7 | 13.2 | 17.6 |
| 4  | 55.4 | 24.6 | 30.8 |
| 6  | 72.2 | 31.3 | 42.9 |
| 8  | 81.0 | 42.0 | 52.4 |
| 12 | 85.9 | 43.7 | 56.2 |
| 24 | 89.3 | 44.9 | 57.8 |`,
    parts: [
      {
        id: "case-caco2-1", marks: 5, skill: "recall",
        stem: "(a) Define bioavailability. (1)  (b) Give THREE advantages of the Caco-2 cell-layer method for assessing drug absorption. (3)  (c) Give ONE alternative technique for assessing absorption. (1)",
        markScheme: [
          { marks: 1, label: "Bioavailability = fraction of administered dose reaching the systemic circulation intact", patterns: [["fraction", "systemic"], ["reach", "circulation"], ["intact"]] },
          { marks: 1, label: "Advantage: human-derived, expresses relevant transporters/enzymes (physiologically relevant)", patterns: [["human"], ["transporter"], ["physiolog"], ["relevant"]] },
          { marks: 1, label: "Advantage: in vitro, reproducible, higher-throughput / cheaper than animals; reduces animal use", patterns: [["in vitro"], ["reproducib"], ["throughput"], ["cheaper"], ["reduce", "animal"]] },
          { marks: 1, label: "Advantage: can study mechanism (apical→basolateral, efflux, paracellular)", patterns: [["mechanism"], ["apical", "basolateral"], ["efflux"], ["permeability"]] },
          { marks: 1, label: "Alternative: PAMPA (artificial membrane), everted gut sac, in situ perfusion, or in vivo PK", patterns: [["pampa"], ["everted"], ["gut sac"], ["perfusion"], ["in vivo"]] },
        ],
        modelAnswer: "Bioavailability is the fraction of an administered dose that reaches the systemic circulation as intact drug. Three Caco-2 advantages: it is human-derived and expresses relevant transporters/enzymes (physiologically relevant); it is an in-vitro, reproducible, higher-throughput and cheaper assay that reduces animal use; and it allows mechanism to be studied (apical→basolateral transport, efflux, paracellular route). One alternative technique: PAMPA (artificial-membrane permeability), an everted gut sac, in-situ perfusion, or in-vivo PK.",
        modelExpanded: "Bioavailability (F) is the fraction of an administered dose reaching the systemic circulation as intact drug. The Caco-2 monolayer (human colorectal cells that differentiate into an enterocyte-like layer with tight junctions, microvilli and drug transporters) offers several advantages: it is human-derived and expresses physiologically relevant transporters and metabolising enzymes, so results translate reasonably to human intestinal absorption; it is an in-vitro system that is reproducible, relatively high-throughput and cheaper than animal studies, reducing animal use; and it allows the mechanism of permeation to be dissected (transcellular vs paracellular, and the contribution of efflux transporters such as P-gp by adding inhibitors). Alternative techniques include PAMPA (parallel artificial-membrane permeability assay), the everted gut sac, in-situ intestinal perfusion, or direct in-vivo pharmacokinetic studies.",
      },
      {
        id: "case-caco2-2", marks: 12, skill: "interpretation",
        stem: "Calculate the % of each drug entering the basolateral compartment at 24 h, then describe the plot of % basolateral vs time for ManUPharm1 and ManUPharm2 and comment on the results.",
        markScheme: [
          { marks: 2, label: "% = ([basolateral]/50) × 100 → MP1 at 24 h = 59.2%, MP2 = 92.4%", patterns: [["59"], ["92"], ["50", "100"], ["basolateral", "50"]] },
          { marks: 2, label: "Plot % basolateral (y) vs time in hours (x), labelled with units", patterns: [["plot", "time"], ["percent", "y"], ["axis", "unit"]] },
          { marks: 2, label: "Both curves rise then plateau (approach a maximum)", patterns: [["plateau"], ["level off"], ["rise", "then"]] },
          { marks: 2, label: "ManUPharm2 is absorbed faster and to a greater extent than ManUPharm1", patterns: [["mp2", "faster"], ["mp2", "greater"], ["2", "more", "absorb"], ["2", "higher"]] },
          { marks: 2, label: "ManUPharm1 absorption is lower/incomplete — better permeability/absorption for MP2", patterns: [["mp1", "lower"], ["1", "incomplete"], ["1", "less"]] },
          { marks: 2, label: "Implication: ManUPharm2 likely the better oral candidate on absorption", patterns: [["mp2", "better", "oral"], ["2", "candidate"], ["2", "preferred"]] },
        ],
        modelAnswer: "At 24 h, % basolateral = ([baso]/50)×100: ManUPharm1 = 29.6/50 = 59.2%, ManUPharm2 = 46.2/50 = 92.4%. Plotting % basolateral (y) against time (h, x), both curves rise and plateau, but ManUPharm2 is absorbed both faster and to a greater extent than ManUPharm1 (which is lower and incomplete). On absorption alone, ManUPharm2 is therefore the better oral candidate.",
        modelExpanded: "Convert concentrations to % using % = ([basolateral]/50 µM)×100. At 24 h: ManUPharm1 = 29.6/50 = 59.2%; ManUPharm2 = 46.2/50 = 92.4%. Plot % in the basolateral compartment (y) against time in hours (x), labelling units. Both drugs show an initial rise that slows and plateaus as equilibrium is approached. ManUPharm2 crosses the monolayer faster (steeper early slope) and reaches a much higher final percentage, indicating greater permeability and more complete absorption; ManUPharm1 is slower and plateaus lower, indicating poorer/incomplete absorption. On the basis of absorption, ManUPharm2 is the more promising oral candidate.",
      },
      {
        id: "case-caco2-3", marks: 6, skill: "reasoning",
        stem: "Provide THREE explanations as to why absorption across the Caco-2 cell layer could be limited. (6 marks)",
        markScheme: [
          { marks: 2, label: "Active efflux by transporters (e.g. P-glycoprotein) pumps drug back to the apical side", patterns: [["efflux"], ["p glycoprotein"], ["p gp"], ["pump", "back"]] },
          { marks: 2, label: "Poor passive permeability — too polar/large/ionised to cross the membrane", patterns: [["poor permeability"], ["polar"], ["too large"], ["ionised"], ["lipophilic", "low"]] },
          { marks: 2, label: "Metabolism by enzymes in the cells, or low solubility / tight junctions limiting paracellular route", patterns: [["metabol"], ["enzyme"], ["solubility"], ["tight junction"], ["paracellular"]] },
        ],
        modelAnswer: "Absorption can be limited by (1) active efflux — transporters such as P-glycoprotein pump the drug back to the apical side; (2) poor passive permeability — the drug is too polar, too large or too ionised to cross the lipid membrane; and (3) metabolism by enzymes within the cells, or low aqueous solubility / restrictive tight junctions limiting the paracellular route.",
        modelExpanded: "Three reasons absorption across the Caco-2 monolayer may be limited: (1) Active efflux — apical efflux transporters, especially P-glycoprotein (P-gp), pump the drug back out of the cell toward the apical side, reducing net transfer (this can be tested by adding an inhibitor such as verapamil). (2) Poor passive permeability — a drug that is too polar, too large, or substantially ionised at physiological pH crosses the lipid bilayer slowly. (3) Intracellular metabolism by Caco-2 enzymes degrades the drug en route, and/or low aqueous solubility limits the concentration available to permeate while tight junctions restrict the paracellular pathway.",
      },
      {
        id: "case-caco2-4", marks: 9, skill: "interpretation",
        stem: "With 10 µM verapamil, calculate the 24 h % for each drug, add to your graph, and comment on the conclusions about the role of P-glycoprotein.",
        markScheme: [
          { marks: 2, label: "+Verapamil 24 h: MP1 = 34.9/50 = 69.8%, MP2 = 45.4/50 = 90.8%", patterns: [["69"], ["70"], ["90"], ["34.9", "50"]] },
          { marks: 2, label: "Verapamil increases ManUPharm1 absorption markedly (≈59% → ≈70%)", patterns: [["mp1", "increase"], ["1", "more", "verapamil"], ["1", "higher", "verapamil"]] },
          { marks: 2, label: "ManUPharm2 little changed by verapamil", patterns: [["mp2", "little"], ["2", "unchanged"], ["2", "no", "change"]] },
          { marks: 2, label: "Conclusion: ManUPharm1 is a P-gp substrate (efflux limited its absorption)", patterns: [["mp1", "substrate"], ["1", "p gp", "substrate"], ["1", "efflux"]] },
          { marks: 1, label: "ManUPharm2 is not (significantly) a P-gp substrate", patterns: [["mp2", "not", "substrate"], ["2", "not", "p gp"]] },
        ],
        modelAnswer: "With verapamil at 24 h: ManUPharm1 = 34.9/50 = 69.8%, ManUPharm2 = 45.4/50 = 90.8%. Adding these to the graph shows verapamil markedly increases ManUPharm1 absorption (≈59% → ≈70%) but barely changes ManUPharm2. The conclusion is that ManUPharm1 is a P-glycoprotein substrate — efflux by P-gp was limiting its absorption, and inhibiting P-gp with verapamil relieves this — whereas ManUPharm2 is not significantly a P-gp substrate.",
        modelExpanded: "Recalculate % at 24 h with verapamil: ManUPharm1 = 34.9/50 = 69.8%; ManUPharm2 = 45.4/50 = 90.8%. Plotting these alongside the original curves shows that P-gp inhibition by verapamil substantially increases ManUPharm1's transfer (from ~59% to ~70%, with faster early kinetics), but has little effect on ManUPharm2 (already ~92%). The conclusion is that ManUPharm1 is a substrate for P-glycoprotein: apical P-gp was effluxing it back, limiting net absorption, and blocking P-gp with verapamil relieves that limitation. ManUPharm2 is not significantly a P-gp substrate, consistent with its already high, efflux-independent permeability — reinforcing that ManUPharm2 has the better intrinsic oral-absorption profile.",
      },
      {
        id: "case-caco2-5", marks: 9, skill: "reasoning",
        stem: "(a) Comment on the Table 3 results (OAT wild-type vs SLC22A6/SLC22A8 variants). (4)  (b) OAT1/OAT3 are also in the kidney basolateral membrane — explain how mutations could affect elimination of ManUPharm2 and how this relates to dose-setting in (i) Phase 1 and (ii) Phase 2/3 trials. (5)",
        markScheme: [
          { marks: 2, label: "Both transporter variants reduce ManUPharm2 transfer vs wild-type → OAT1/OAT3 aid its uptake/absorption", patterns: [["variant", "reduce"], ["mutant", "less"], ["oat", "uptake"], ["lower", "variant"]] },
          { marks: 2, label: "SLC22A6 (OAT1) variant reduces it more than SLC22A8 (OAT3) → OAT1 contributes more", patterns: [["slc22a6", "more"], ["oat1", "more"], ["a6", "lower"]] },
          { marks: 1, label: "In kidney, reduced OAT function → reduced renal secretion → slower elimination/accumulation", patterns: [["reduced", "secretion"], ["slower", "elimination"], ["accumulat"], ["renal"]] },
          { marks: 2, label: "Phase 1: variability between individuals → must account for poor-eliminators (lower starting/safe dose, monitor exposure)", patterns: [["phase 1", "variab"], ["phase 1", "safe dose"], ["phase 1", "exposure"], ["accumulat", "toxic"]] },
          { marks: 2, label: "Phase 2/3: stratify/genotype patients; adjust dose for genotype; ensure efficacy & safety across variants", patterns: [["stratif"], ["genotyp", "patient"], ["adjust dose"], ["phase 2", "population"], ["phase 3", "diverse"]] },
        ],
        modelAnswer: "Both OAT variants reduce ManUPharm2 transfer relative to wild-type, so OAT1/OAT3 normally aid its uptake/absorption; the SLC22A6 (OAT1) variant reduces it more than SLC22A8 (OAT3), so OAT1 contributes more. In the kidney, reduced OAT function means reduced renal secretion, slowing elimination and risking accumulation. For dose-setting: in Phase 1 this inter-individual variability means poor-eliminators could accumulate drug, so a cautious starting/safe dose and exposure monitoring are needed; in Phase 2/3 patients should be genotyped/stratified and doses adjusted by genotype to ensure both efficacy and safety across the variant populations.",
        modelExpanded: "(a) Both transporter variants markedly reduce the percentage of ManUPharm2 reaching the basolateral compartment compared with wild-type, showing that OAT1 (SLC22A6) and OAT3 (SLC22A8) normally facilitate its uptake/absorption. The SLC22A6 (OAT1) variant reduces transfer more than the SLC22A8 (OAT3) variant, so OAT1 makes the larger contribution. (b) Because OAT1/OAT3 in the kidney's basolateral membrane mediate active tubular secretion of organic anions, loss-of-function mutations would reduce renal secretion of ManUPharm2, slowing its elimination and causing it to accumulate (higher exposure, longer half-life). For dosing: (i) in Phase 1, this genetic inter-individual variability means some healthy volunteers could clear the drug poorly and accumulate it to toxic levels, so a conservative starting dose, careful dose escalation and exposure (PK) monitoring are essential, and the safe dose range must accommodate poor eliminators; (ii) in Phase 2/3, patients should be genotyped/stratified for these polymorphisms so that doses can be adjusted by genotype, ensuring the drug is both efficacious and safe across the genetically diverse patient population (and informing the final label/dose recommendations).",
      },
    ],
  },

  // ===================================================================
  // CASE 4 — Rat & human PK (2023 Case Study 2)
  // ===================================================================
  {
    id: "case-pk", title: "Rat & human pharmacokinetics (ManUPharm)",
    topic: "B5 · Pharmacokinetics", block: 5, source: "2023", totalMarks: 50,
    chart: "pk",
    scenario: `ManUPharm1 was given to rats at 8 mg/kg and plasma concentration measured over time after IV and oral dosing.

Table 1 — Plasma [ManUPharm1] (µg/mL) after 8 mg/kg
| Time (h) | IV | Oral |
|---:|---:|---:|
| 0.5 | 32.2 | 0    |
| 1   | 24.2 | 1    |
| 1.5 | 17   | 5.5  |
| 2   | 12.5 | 10   |
| 3   | 6.6  | 14   |
| 4   | 3.5  | 15   |
| 6   | 0    | 8.7  |
| 8   | 0    | 4.5  |

ManUPharm2 (an analogue) progressed to a Phase 1 bioequivalence study comparing a suspension and a capsule, dosed fasted, after a high-fat meal (fed, fat) or a low-calorie meal (fed, light). (See Figure 1 in the question.)`,
    parts: [
      {
        id: "case-pk-1", marks: 3, skill: "calculation",
        stem: "What dose of ManUPharm1 (at 8 mg/kg) was administered to a 280 g rat? Show your working.",
        markScheme: [
          { marks: 1, label: "Convert weight: 280 g = 0.28 kg", patterns: [["0.28"], ["280", "kg"], ["convert", "kg"]] },
          { marks: 1, label: "Dose = 8 mg/kg × 0.28 kg", patterns: [["8", "0.28"], ["8", "280"], ["multiply"]] },
          { marks: 1, label: "= 2.24 mg (with units)", patterns: [["2.24"], ["2.2", "mg"]] },
        ],
        modelAnswer: "280 g = 0.28 kg. Dose = 8 mg/kg × 0.28 kg = 2.24 mg.",
        modelExpanded: "Convert the body weight to kilograms first: 280 g = 0.28 kg. Then multiply by the per-weight dose: 8 mg/kg × 0.28 kg = 2.24 mg. Always quote the unit (mg). A common error is to forget the gram-to-kilogram conversion.",
      },
      {
        id: "case-pk-2", marks: 10, skill: "reasoning",
        stem: "What are the advantages and disadvantages of oral and IV routes in rodents and in humans, and why are both determined in PK studies?",
        markScheme: [
          { marks: 2, label: "IV advantage: 100% bioavailability, known/complete dose to circulation, rapid", patterns: [["iv", "100"], ["iv", "complete"], ["iv", "known dose"]] },
          { marks: 2, label: "IV disadvantage: invasive, needs trained personnel/solubility, not the clinical route for most drugs", patterns: [["iv", "invasive"], ["iv", "skilled"], ["iv", "not", "clinical"], ["iv", "solubility"]] },
          { marks: 2, label: "Oral advantage: clinically relevant route, convenient/non-invasive", patterns: [["oral", "convenient"], ["oral", "clinical"], ["oral", "non invasive"], ["oral", "relevant"]] },
          { marks: 2, label: "Oral disadvantage: variable/incomplete absorption + first-pass metabolism → variable F", patterns: [["oral", "first pass"], ["oral", "variable"], ["oral", "incomplete"]] },
          { marks: 2, label: "Both needed: comparing oral vs IV AUC gives absolute oral bioavailability (F)", patterns: [["auc", "iv"], ["bioavailability", "compare"], ["f", "oral", "iv"], ["both", "bioavailability"]] },
        ],
        modelAnswer: "IV dosing delivers a known, complete dose straight to the circulation (F = 100%, rapid, reference standard) but is invasive, needs skilled handling and adequate solubility, and is not the route most drugs are taken by. Oral dosing is the clinically relevant, convenient, non-invasive route but gives variable, incomplete absorption with first-pass metabolism, so bioavailability is variable. Both are determined because comparing the oral and IV AUCs (at the same dose) gives the absolute oral bioavailability F = AUC(oral)/AUC(IV) — essential for predicting human oral dosing.",
        modelExpanded: "Intravenous dosing places the entire dose directly into the systemic circulation, so bioavailability is 100% and the dose reaching the blood is known exactly; the onset is rapid and IV is the reference against which other routes are measured. Its disadvantages are that it is invasive, requires skilled personnel and adequate drug solubility for injection, and is not how most drugs are given clinically. Oral dosing is the clinically relevant, convenient and non-invasive route preferred by patients, but it suffers variable and often incomplete absorption and presystemic (first-pass) metabolism, so bioavailability is reduced and variable. Both routes are studied because the absolute oral bioavailability can only be obtained by comparing the area under the plasma concentration–time curve after oral dosing with that after IV dosing of the same dose: F = AUC(oral)/AUC(IV). This quantifies how much of an oral dose reaches the circulation and is critical for translating the dose to humans.",
      },
      {
        id: "case-pk-3", marks: 12, skill: "interpretation",
        stem: "Plot the IV and oral plasma concentration–time data (describe the two curves), then comment on how the route of administration affected the plasma-concentration profile.",
        markScheme: [
          { marks: 2, label: "Plot plasma [drug] (y) vs time (x), with units; both curves on one set of axes", patterns: [["plasma", "concentration", "time"], ["axis", "unit"], ["one set", "axes"]] },
          { marks: 2, label: "IV: highest at the first time point then declines (exponential decay)", patterns: [["iv", "highest", "start"], ["iv", "decline"], ["iv", "decay"]] },
          { marks: 2, label: "Oral: starts at zero, rises to a peak (Cmax/Tmax) then falls", patterns: [["oral", "rise", "peak"], ["cmax"], ["tmax"], ["oral", "zero"]] },
          { marks: 2, label: "Oral shows a delayed, lower peak — reflects absorption time", patterns: [["oral", "delay"], ["oral", "lower peak"], ["absorption", "time"]] },
          { marks: 2, label: "IV avoids the absorption phase (drug already in blood)", patterns: [["iv", "no absorption"], ["iv", "directly"], ["iv", "avoid", "absorption"]] },
          { marks: 2, label: "Differences in AUC reflect bioavailability/first-pass for the oral route", patterns: [["auc", "bioavailability"], ["first pass"], ["auc", "differ"]] },
        ],
        modelAnswer: "Plot plasma [ManUPharm1] (µg/mL, y) against time (h, x) with both routes on one set of axes. The IV curve starts highest (~32 µg/mL at 0.5 h) and declines steadily (exponential elimination). The oral curve starts at zero, rises to a delayed, lower peak (Cmax ~15 µg/mL at ~4 h, the Tmax) and then falls. The oral profile reflects the time needed for absorption (an absorption phase the IV route skips because drug is delivered straight to the blood), and any difference in AUC reflects incomplete oral bioavailability/first-pass metabolism.",
        modelExpanded: "Plot plasma concentration (µg/mL, y-axis) against time (hours, x-axis) for both routes on the same axes. The IV profile is highest at the earliest sampled time (~32 µg/mL at 0.5 h) and declines monotonically (first-order exponential elimination), reaching zero by ~6 h. The oral profile begins at zero, rises through an absorption phase to a delayed, lower peak (Cmax ≈ 15 µg/mL at a Tmax of ~4 h), then declines. The contrast shows that IV dosing places drug directly in the circulation (no absorption phase, immediate high concentration), whereas oral dosing must first be absorbed across the gut, giving a slower onset, lower Cmax and later Tmax. Comparing the areas under the two curves reveals the oral bioavailability and the impact of first-pass metabolism.",
      },
      {
        id: "case-pk-4", marks: 10, skill: "calculation",
        stem: "Use the IV data to calculate the volume of distribution of ManUPharm1 in the rat (280 g, 8 mg/kg = 2.24 mg dose). Outline the method and give the value.",
        markScheme: [
          { marks: 2, label: "Plot ln/log of IV plasma concentration vs time and extrapolate back to t = 0 (C0)", patterns: [["extrapolat"], ["log", "time"], ["back", "zero"], ["c0"]] },
          { marks: 2, label: "C0 ≈ 43 µg/mL (extrapolated intercept)", patterns: [["c0", "43"], ["intercept", "43"], ["43"]] },
          { marks: 2, label: "Vd = dose / C0", patterns: [["vd", "dose", "c0"], ["dose", "divide", "c0"]] },
          { marks: 2, label: "Convert units: 2.24 mg / 43 µg/mL = 2240 µg / 43 µg/mL ≈ 52 mL", patterns: [["2240"], ["52"], ["50", "ml"], ["unit", "convert"]] },
          { marks: 2, label: "State Vd ≈ 52 mL (~0.05 L, ~186 mL/kg) with units", patterns: [["52 ml"], ["0.05", "l"], ["ml", "kg"], ["vd", "ml"]] },
        ],
        modelAnswer: "Plot log(IV plasma concentration) vs time and extrapolate the line back to t = 0 to get C0 (≈ 43 µg/mL). Then Vd = dose / C0 = 2.24 mg / 43 µg/mL = 2240 µg / 43 µg/mL ≈ 52 mL (≈ 0.05 L, ~186 mL/kg for the 280 g rat). Quote units throughout.",
        modelExpanded: "After an IV bolus the plasma concentration must be extrapolated back to the moment of injection to find the initial concentration C0, because distribution and elimination begin immediately. Plot the natural log (or log10) of the IV plasma concentrations against time; the data fall on a straight line (first-order elimination), and extrapolating that line back to t = 0 gives the intercept C0 ≈ 43 µg/mL. The apparent volume of distribution is then Vd = dose / C0. Using the dose for the 280 g rat (8 mg/kg × 0.28 kg = 2.24 mg = 2240 µg): Vd = 2240 µg / 43 µg/mL ≈ 52 mL (≈ 0.05 L, or ~186 mL/kg). Always carry units consistently (convert mg to µg so they cancel with µg/mL to give mL).",
      },
      {
        id: "case-pk-5", marks: 15, skill: "reasoning",
        stem: "ManUPharm2 entered a Phase 1 bioequivalence study of a suspension vs a capsule (fasted, fed-fat, fed-light). (a) Why might a suspension and a capsule be compared? (5)  (b) Interpreting plasma profiles, which formulation is best, and why? (10)",
        markScheme: [
          { marks: 2, label: "Compared to test how formulation/dosage form affects rate & extent of absorption (bioequivalence)", patterns: [["bioequivalence"], ["formulation", "absorption"], ["rate", "extent"], ["dosage form", "affect"]] },
          { marks: 2, label: "Suspension already dispersed → faster dissolution/absorption; capsule must disintegrate first", patterns: [["suspension", "faster"], ["capsule", "disintegrat"], ["dissolution", "first"]] },
          { marks: 1, label: "Also assess the food effect (fed vs fasted) on absorption", patterns: [["food effect"], ["fed", "fasted"], ["meal", "absorption"]] },
          { marks: 2, label: "Best formulation = the one giving adequate, consistent bioavailability with least food effect", patterns: [["consistent"], ["least", "food"], ["reproducible", "absorption"], ["adequate", "bioavailability"]] },
          { marks: 2, label: "Judge by Cmax, Tmax and AUC across conditions", patterns: [["cmax"], ["tmax"], ["auc"]] },
          { marks: 2, label: "Capsule often preferred for convenience/stability/dosing accuracy IF bioavailability acceptable", patterns: [["capsule", "convenien"], ["capsule", "stable"], ["capsule", "accurate"], ["capsule", "preferred"]] },
          { marks: 1, label: "A large food effect or low/variable AUC argues against that formulation", patterns: [["large food effect"], ["variable", "auc"], ["low", "auc"]] },
        ],
        modelAnswer: "(a) A suspension and capsule are compared to see how the dosage form affects the rate and extent of absorption (a bioequivalence question): a suspension is already dispersed so dissolves/absorbs faster, whereas a capsule must disintegrate and dissolve first; the study also tests the food effect (fed vs fasted). (b) The best formulation is the one giving adequate, consistent bioavailability with the smallest food effect, judged by Cmax, Tmax and AUC across conditions. A capsule is usually preferred for convenience, stability and dosing accuracy provided its bioavailability is acceptable and food-independent; a large food effect or low/variable AUC would argue against a formulation.",
        modelExpanded: "(a) Different dosage forms can give very different absorption, so a suspension and a capsule are compared to determine how the formulation affects the rate and extent of drug absorption — i.e. whether they are bioequivalent. A suspension presents the drug already dispersed in liquid, so it dissolves and is absorbed quickly; a capsule must first disintegrate and the drug dissolve before absorption, which can slow or reduce uptake. Running each fasted, after a high-fat meal and after a low-calorie meal also characterises the food effect on absorption. (b) The best formulation is the one that delivers adequate and reproducible systemic exposure with the least sensitivity to food, judged from the plasma profiles by Cmax (peak), Tmax (time to peak) and AUC (total exposure) across the conditions. Typically the suspension shows a higher, earlier Cmax (faster absorption) while a capsule is slower; if the capsule still achieves comparable AUC and a small food effect, it is usually preferred because it offers better convenience, stability, dosing accuracy and patient acceptability. Conversely, a formulation showing a large food effect (markedly different fed vs fasted profiles) or low/variable AUC would be rejected because it would make dosing unpredictable in patients.",
      },
    ],
  },

  // ===================================================================
  // CASE 5 — CB2 agonist for neuropathic pain (from the user's case-study notes)
  // ===================================================================
  {
    id: "case-pain", title: "Drugs to treat pain: a CB₂ agonist programme",
    topic: "B4 · Lead Discovery & Biomarkers", block: 4, source: "core", totalMarks: 35,
    chart: null,
    scenario: `Neuropathic pain is caused by a lesion or disease of the somatosensory nervous system (e.g. after diabetic neuropathy or VZV infection). Current drugs (e.g. pregabalin, duloxetine) are only symptomatic and give ~50% relief in only ~1 in 4 patients. A company develops a CB₂-receptor agonist, aiming for CB₂ selectivity over CB₁ to avoid CNS side effects. The lead (Compound 1) has hCB₂ pEC50 8.45, CB₂/CB₁ selectivity 30–100-fold, hERG pKi 5.37, and good PK (Cl 31 mL/min/kg, Vss 2.5 L/kg, t½ 1 h, F 31%). Efficacy is tested in the Chung rat spinal-nerve-ligation model using von Frey filaments, and target engagement is explored with 2-DG/FDG imaging and spleen CB₂ binding.`,
    parts: [
      {
        id: "case-pain-1", marks: 5, skill: "recall",
        stem: "Define neuropathic pain and explain why it is a poorly served therapeutic area (the unmet need). (5 marks)",
        markScheme: [
          { marks: 1, label: "Pain caused by a lesion/disease of the somatosensory nervous system", patterns: [["lesion"], ["somatosensory"], ["nervous system", "damage"], ["nerve", "damage"]] },
          { marks: 1, label: "Features e.g. allodynia (pain from non-painful stimulus) / hyperalgesia", patterns: [["allodynia"], ["hyperalgesia"], ["anaesthesia dolorosa"]] },
          { marks: 1, label: "Current drugs are symptomatic, not disease-modifying/curative", patterns: [["symptomatic"], ["not", "curative"], ["not", "disease modifying"]] },
          { marks: 1, label: "Poor efficacy — only ~1 in 4 patients get ~50% relief", patterns: [["1 in 4"], ["quarter"], ["50", "relief"], ["poor", "efficacy"]] },
          { marks: 1, label: "Significant unmet need / large impact on quality of life (HRQOL), work, mood, sleep", patterns: [["unmet need"], ["quality of life"], ["hrqol"], ["impact", "life"]] },
        ],
        modelAnswer: "Neuropathic pain is pain caused by a lesion or disease of the somatosensory nervous system, with features such as allodynia (pain from a normally non-painful stimulus) and hyperalgesia. It is poorly served because current treatments are only symptomatic (not disease-modifying or curative) and have poor efficacy — only about 1 in 4 patients achieve ~50% pain relief — leaving a large unmet need given its major impact on quality of life, work, mood and sleep.",
        modelExpanded: "Neuropathic pain is pain caused by a lesion or disease of the somatosensory nervous system; it may be spontaneous or provoked and follows conditions such as diabetic neuropathy and varicella-zoster infection. Characteristic features include allodynia (pain evoked by a normally non-painful stimulus), hyperalgesia (exaggerated response to a painful stimulus) and anaesthesia dolorosa (pain in a numb area). It is a poorly served area because the available drugs (paracetamol/NSAIDs/opioids are largely ineffective; tricyclics, SNRIs and anticonvulsants such as pregabalin/duloxetine are only partly effective) are symptomatic rather than disease-modifying or curative, and even the leading agents give around 50% pain relief in only ~1 in 4 patients. Combined with its substantial impairment of health-related quality of life, productivity, mood and sleep, this leaves a major unmet clinical need.",
      },
      {
        id: "case-pain-2", marks: 6, skill: "reasoning",
        stem: "Why is the CB₂ receptor an attractive target for neuropathic pain, and why is selectivity over CB₁ important? (6 marks)",
        markScheme: [
          { marks: 1, label: "CB₂ is a GPCR (druggable target class)", patterns: [["cb2", "gpcr"], ["g protein coupled"], ["7tmd"]] },
          { marks: 1, label: "CB₂ is expressed on immune cells and on neurones in SC/DRG, and upregulated with injury", patterns: [["immune cell"], ["dorsal root"], ["drg"], ["upregulat", "injury"], ["spinal cord"]] },
          { marks: 1, label: "Activation reduces neuro-inflammation/microglial activation and sensitisation → analgesia", patterns: [["microglia"], ["inflammation"], ["sensitis"], ["analgesia"]] },
          { marks: 1, label: "Novel mechanism / accessible / druggable target (right place, right class)", patterns: [["novel"], ["accessible"], ["druggable"]] },
          { marks: 1, label: "CB₁ activation causes CNS/psychoactive side effects we want to avoid", patterns: [["cb1", "cns"], ["cb1", "psychoactive"], ["cb1", "side effect"], ["central", "side effect"]] },
          { marks: 1, label: "CB₂ selectivity over CB₁ delivers analgesia without CNS effects (safety)", patterns: [["selectivity", "cb1"], ["avoid", "cb1"], ["without", "cns"], ["devoid", "cns"]] },
        ],
        modelAnswer: "CB₂ is an attractive target because it is a GPCR (a druggable class), expressed on immune cells and on neurones in the spinal cord/DRG and upregulated with nerve injury, and its activation reduces neuro-inflammation/microglial activation and central sensitisation to give analgesia — a novel, accessible mechanism. Selectivity over CB₁ matters because CB₁ activation produces the CNS/psychoactive side effects of cannabinoids; a CB₂-selective agonist can deliver analgesia while avoiding those central effects, improving the safety profile.",
        modelExpanded: "CB₂ is a 7-transmembrane GPCR (it inhibits adenylyl cyclase via Gi/Go and activates MAPK via βγ) — a well-precedented, druggable target class. It is expressed principally on immune cells but also on neurones in the spinal cord and dorsal root ganglia and in the brain, and its expression increases in the spinal cord and periphery after nerve injury. Activating CB₂ inhibits cytokine/chemokine release and immune-cell migration peripherally and reduces microglial activation and central sensitisation, producing analgesia through a mechanism distinct from existing drugs — a novel, accessible target located where it is needed. Selectivity over CB₁ is critical because CB₁ activation mediates the central, psychoactive cannabinoid side effects; a compound selective for CB₂ over CB₁ can therefore deliver analgesia while being 'devoid of CB₁-like CNS side effects', giving a better therapeutic window.",
      },
      {
        id: "case-pain-3", marks: 8, skill: "interpretation",
        stem: "Interpret Compound 1's profile (hCB₂ pEC50 8.45; CB₂/CB₁ selectivity 30–100×; hERG pKi 5.37; Cl 31 mL/min/kg; Vss 2.5 L/kg; t½ 1 h; F 31%). What is good, and what needs optimisation? (8 marks)",
        markScheme: [
          { marks: 1, label: "Good CB₂ potency (pEC50 8.45 ≈ EC50 ~3.5 nM)", patterns: [["good", "potency"], ["8.45"], ["nm", "potent"], ["high", "potency"]] },
          { marks: 1, label: "Good CB₂/CB₁ selectivity (30–100-fold)", patterns: [["selectivity", "good"], ["30", "100"], ["fold", "selective"]] },
          { marks: 1, label: "hERG: pKi 5.37 is low affinity → reasonable safety window vs CB₂ (good)", patterns: [["herg", "low"], ["herg", "window"], ["herg", "5.37"], ["herg", "good"]] },
          { marks: 1, label: "Acceptable oral bioavailability (F 31%)", patterns: [["f", "31"], ["oral", "bioavailability", "acceptable"], ["bioavailability", "ok"]] },
          { marks: 1, label: "Moderate clearance (31 mL/min/kg) and reasonable Vss (2.5 L/kg)", patterns: [["clearance", "moderate"], ["vss", "2.5"], ["distribution", "good"]] },
          { marks: 2, label: "Needs optimisation: very short half-life (t½ = 1 h) → too frequent dosing / unsuitable once-daily", patterns: [["half life", "short"], ["t half", "1"], ["too frequent"], ["short", "duration"]] },
          { marks: 1, label: "Could improve potency/selectivity further and reduce clearance to extend t½", patterns: [["reduce", "clearance"], ["improve", "selectivity"], ["extend", "half life"], ["further optimis"]] },
        ],
        modelAnswer: "Good: strong CB₂ potency (pEC50 8.45 ≈ EC50 ~3.5 nM), good CB₂/CB₁ selectivity (30–100-fold), low hERG affinity (pKi 5.37, so a reasonable safety window), acceptable oral bioavailability (F 31%), moderate clearance and a reasonable Vss (2.5 L/kg). Needs optimisation: the half-life is very short (t½ = 1 h), so dosing would be too frequent and once-daily dosing is unlikely without change — reducing clearance (and/or improving potency and selectivity) would extend the half-life and improve the profile.",
        modelExpanded: "Strengths: Compound 1 has high CB₂ potency (pEC50 8.45 corresponds to an EC50 of ~3.5 nM) and useful CB₂-over-CB₁ selectivity (30–100-fold), which is exactly what's needed to separate analgesia from CB₁-mediated CNS effects. Its hERG affinity is low (pKi 5.37), giving a comfortable margin over the CB₂ potency and suggesting low QT-prolongation risk. Oral bioavailability (F = 31%) is acceptable for an oral drug, clearance is moderate (31 mL/min/kg) and the volume of distribution (Vss 2.5 L/kg) is reasonable. The main weakness is the very short half-life (t½ = 1 h), which would demand inconveniently frequent dosing and makes once-daily dosing impractical without a modified-release approach or chemistry changes. Optimisation should therefore focus on reducing metabolic clearance to lengthen the half-life, while ideally further improving potency and CB₂/CB₁ selectivity and preserving the clean hERG profile.",
      },
      {
        id: "case-pain-4", marks: 8, skill: "synthesis",
        stem: "Describe how efficacy and target engagement were demonstrated for this programme (the Chung model and the imaging/biomarker work), and why a translatable biomarker matters. (8 marks)",
        markScheme: [
          { marks: 1, label: "Chung model = unilateral spinal-nerve (L5) ligation producing neuropathy", patterns: [["chung"], ["spinal nerve ligation"], ["l5", "ligation"], ["nerve ligation"]] },
          { marks: 1, label: "Mechanical allodynia assessed with von Frey filaments (pain threshold)", patterns: [["von frey"], ["allodynia", "threshold"], ["mechanical", "threshold"]] },
          { marks: 1, label: "Compound 1 raised pain threshold (efficacy comparable to gabapentin)", patterns: [["raise", "threshold"], ["gabapentin"], ["increase", "tolerance"], ["efficacy", "comparable"]] },
          { marks: 1, label: "2-DG / FDG imaging showed reduced pain-associated activity in dorsal horn/cortex", patterns: [["2dg"], ["fdg"], ["dorsal horn"], ["imaging", "activity"]] },
          { marks: 1, label: "Imaging is a translatable functional biomarker of central pain processing", patterns: [["translatable"], ["functional biomarker"], ["central", "processing"]] },
          { marks: 1, label: "Spleen CB₂ binding correlated with raised pain threshold = target-engagement biomarker", patterns: [["spleen"], ["target engagement"], ["cb2 binding", "correlat"]] },
          { marks: 1, label: "Safety: hERG window checked; AMES/micronucleus/DEREK clear", patterns: [["ames"], ["micronucleus"], ["derek"], ["herg", "window"]] },
          { marks: 1, label: "Translatable biomarkers bridge animal→human (endpoint differs: human uses subjective pain scales)", patterns: [["bridge", "human"], ["subjective", "pain"], ["endpoint", "differ"], ["translate", "human"]] },
        ],
        modelAnswer: "Efficacy was shown in the Chung model (unilateral L5 spinal-nerve ligation producing neuropathy), assessing mechanical allodynia with von Frey filaments: Compound 1 raised the pain threshold with efficacy comparable to gabapentin. Target engagement and mechanism were supported by 2-DG/FDG imaging showing reduced pain-associated activity in the dorsal horn and somatosensory cortex (a translatable functional biomarker of central pain processing), and by spleen CB₂ binding correlating with raised pain threshold (a target-engagement biomarker). Safety was checked (hERG window; clear AMES, micronucleus and DEREK). Translatable biomarkers matter because the animal endpoint differs from the human one (humans report subjective pain), so an objective, conserved readout is needed to bridge animal efficacy to human proof-of-mechanism and dose selection.",
        modelExpanded: "Efficacy was demonstrated in the Chung rat model of peripheral neuropathy, in which unilateral ligation of the L5 spinal nerve induces a lesion and stable mechanical allodynia. Pain threshold was quantified with calibrated von Frey filaments (the force needed to evoke withdrawal): thresholds fall after surgery, and after dosing both gabapentin and Compound 1 raised the threshold (increased tolerance) over ~3 hours, showing efficacy equivalent to the market standard. To link this to mechanism and target engagement, 2-deoxyglucose/FDG functional imaging showed a dramatic reduction in pain-associated metabolic activity in the dorsal horn at L5 and in the corresponding somatosensory cortex after a cannabinoid agonist — a quantitative, translatable functional biomarker of central pain processing that (unlike a behavioural readout) can also be measured in humans. Because FDG/PET imaging is cumbersome, a simpler target-engagement biomarker was developed: CB₂ binding in the spleen (also upregulated in neuropathic pain) showed a positive linear relationship with the increase in pain threshold. Safety work checked the hERG window and returned clear AMES, micronucleus and DEREK results. Translatable biomarkers are important because the efficacy endpoint differs between species — animals give objective thresholds whereas humans report subjective pain on scales — so an objective, biologically conserved readout of target engagement and mechanism is needed to bridge animal efficacy to human proof-of-mechanism, de-risk the programme and guide clinical dose selection (candidate nomination here was successful).",
      },
    ],
  },
];

if (typeof window !== "undefined") window.CASE_BANK = CASE_BANK;
