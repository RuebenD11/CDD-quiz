// matcher.js — Flexible answer matching for the CDD quiz.
//
// Three stacked layers of tolerance so the *intent* of an answer matters more
// than its exact wording:
//   1. Normalisation   — case, punctuation, dashes, Greek letters, whitespace
//   2. Domain synonyms — pharmacology / drug-development equivalents
//   3. Typo tolerance  — Levenshtein distance <=1 (<=2 for long words)
//
// Public API (window.CDDMatcher):
//   normalise(s)                 -> string
//   keywordHits(text, keyword)   -> boolean
//   patternHits(text, pattern)   -> boolean   (pattern: string | string[])
//   matchShort(input, q)         -> boolean
//   gradeSAQ(input, markScheme)  -> { earned, total, hits:[{label,marks,matched}] }

(function () {
  "use strict";

  // ------------------------------------------------------------------
  // Synonym dictionary (bidirectional, NORMALISED keys/values)
  // ------------------------------------------------------------------
  const SYN = {
    // Receptors / target classes
    "g protein coupled receptor": ["gpcr", "g protein receptor", "7tmd", "seven transmembrane"],
    "gpcr": ["g protein coupled receptor", "7tmd"],
    "ligand gated ion channel": ["lgic", "ionotropic receptor"],
    "lgic": ["ligand gated ion channel"],
    "receptor tyrosine kinase": ["rtk", "tyrosine kinase receptor"],
    "rtk": ["receptor tyrosine kinase"],
    "nuclear receptor": ["nuclear hormone receptor"],
    "voltage gated calcium channel": ["vgcc", "vscc", "cacc", "ca channel"],
    "voltage gated sodium channel": ["vgsc", "nav", "na channel"],
    "voltage gated potassium channel": ["vgkc", "kcnq", "k channel"],

    // Enzymes / metabolism
    "cytochrome p450": ["cyp", "cyp450", "p450", "cytochrome p 450"],
    "cyp450": ["cytochrome p450", "cyp", "p450"],
    "monoamine oxidase": ["mao"],
    "first pass metabolism": ["presystemic metabolism", "first pass effect"],
    "phase i": ["phase 1", "functionalisation", "functionalization"],
    "phase ii": ["phase 2", "conjugation"],

    // PK parameters
    "volume of distribution": ["vd", "apparent volume of distribution", "vss", "v d"],
    "vd": ["volume of distribution", "apparent volume of distribution"],
    "clearance": ["cl", "total body clearance", "systemic clearance"],
    "bioavailability": ["f", "oral bioavailability", "fraction absorbed"],
    "half life": ["t half", "t1 2", "t 1 2", "elimination half life", "thalf"],
    "area under the curve": ["auc", "area under curve"],
    "auc": ["area under the curve"],
    "steady state": ["css", "steady state concentration"],
    "maximum concentration": ["cmax", "c max", "peak concentration"],
    "first order": ["first order kinetics", "linear kinetics"],
    "zero order": ["zero order kinetics", "saturation kinetics"],

    // Pharmacodynamics
    "concentration response curve": ["dose response curve", "concentration response", "dose response", "log dose response"],
    "ec50": ["ec 50", "half maximal effective concentration"],
    "ic50": ["ic 50", "half maximal inhibitory concentration"],
    "emax": ["e max", "maximal response", "maximum response"],
    "dissociation constant": ["kd", "k d", "equilibrium dissociation constant"],
    "kd": ["dissociation constant"],
    "ki": ["k i", "inhibition constant", "inhibitor constant"],
    "intrinsic efficacy": ["intrinsic activity", "efficacy"],
    "full agonist": ["full agonists"],
    "partial agonist": ["partial agonists"],
    "inverse agonist": ["inverse agonists"],
    "competitive antagonist": ["surmountable antagonist", "reversible competitive antagonist"],
    "non competitive antagonist": ["noncompetitive antagonist", "insurmountable antagonist", "irreversible antagonist"],
    "allosteric": ["allosteric site", "allosteric modulator"],
    "spare receptors": ["receptor reserve", "spare receptor"],
    "constitutive activity": ["basal activity", "agonist independent activity"],

    // Targets / disease genetics
    "single nucleotide polymorphism": ["snp", "snps"],
    "snp": ["single nucleotide polymorphism"],
    "philadelphia chromosome": ["bcr abl", "t 9 22", "9 22 translocation"],
    "tyrosine kinase": ["kinase"],

    // Assays / methods
    "high throughput screening": ["hts", "high throughput screen"],
    "hts": ["high throughput screening"],
    "structure activity relationship": ["sar"],
    "polymerase chain reaction": ["pcr"],
    "knockout": ["knock out", "ko", "gene knockout"],
    "crispr": ["crispr cas9", "cas9", "crispr cas 9"],
    "guide rna": ["grna", "g rna", "single guide rna", "sgrna"],
    "reporter gene": ["reporter genes", "reporter assay"],
    "green fluorescent protein": ["gfp"],
    "luciferase": ["luc"],
    "chloramphenicol acetyltransferase": ["cat"],
    "enzyme linked immunosorbent assay": ["elisa"],
    "elisa": ["enzyme linked immunosorbent assay"],
    "radioligand binding": ["radioligand binding assay", "radioligand displacement", "binding assay"],

    // ADME / transporters
    "blood brain barrier": ["bbb"],
    "p glycoprotein": ["p gp", "pgp", "pglycoprotein", "abcb1", "efflux transporter"],
    "p gp": ["p glycoprotein", "efflux transporter"],
    "organic anion transporter": ["oat", "slc22"],
    "caco 2": ["caco2", "caco 2 cells", "caco2 cells"],

    // Pharmacogenomics
    "pharmacogenomics": ["pgx", "pharmacogenetics", "pgt"],
    "pharmacogenetics": ["pgt", "pharmacogenomics", "pgx"],
    "poor metaboliser": ["poor metabolizer", "pm", "slow metaboliser"],
    "ultrarapid metaboliser": ["ultra rapid metaboliser", "ultrarapid metabolizer", "um", "rapid metaboliser", "extensive metaboliser"],
    "cyp2d6": ["cyp 2d6", "2d6"],

    // Biomarkers / endpoints
    "biomarker": ["biomarkers", "biological marker"],
    "surrogate endpoint": ["surrogate marker", "surrogate endpoints"],
    "target engagement": ["target occupancy", "receptor occupancy"],
    "pharmacodynamic": ["pd", "pharmacodynamic biomarker"],

    // Safety / regulation
    "therapeutic index": ["ti", "therapeutic ratio", "therapeutic window"],
    "ames test": ["ames", "ames assay", "bacterial reverse mutation"],
    "median lethal dose": ["ld50", "ld 50"],
    "median effective dose": ["ed50", "ed 50"],
    "no observed effect level": ["noel", "no observable effect level", "noael"],
    "minimum anticipated biological effect level": ["mabel"],
    "good clinical practice": ["gcp"],
    "international council for harmonisation": ["ich", "international conference on harmonisation", "international conference of harmonisation"],
    "medicines and healthcare products regulatory agency": ["mhra"],
    "food and drug administration": ["fda"],
    "european medicines agency": ["ema"],
    "national institute for health and care excellence": ["nice"],
    "declaration of helsinki": ["helsinki declaration"],
    "randomised controlled trial": ["rct", "randomized controlled trial", "randomised controlled study"],
    "animals scientific procedures act": ["aspa", "aspa 1986", "a sp a"],
    "named veterinary surgeon": ["nvs"],
    "named animal care and welfare officer": ["nacwo"],
    "animal welfare and ethical review body": ["awerb"],
    "adverse drug reaction": ["adr", "adverse effect", "adverse event", "side effect"],
    "pharmacovigilance": ["post marketing surveillance", "phase 4", "phase iv"],

    // New-content lectures
    "excipient": ["excipients"],
    "enteric coating": ["enteric coated", "gastro resistant", "gastroresistant"],
    "modified release": ["sustained release", "extended release", "controlled release", "slow release", "modified release formulation"],
    "monoclonal antibody": ["mab", "mabs", "monoclonal antibodies"],
    "antibody dependent cellular cytotoxicity": ["adcc"],
    "biologic": ["biologics", "biological", "biopharmaceutical"],
    "immunogenicity": ["immunogenic", "anti drug antibody", "anti drug antibodies"],
    "humanisation": ["humanization", "humanised", "humanized"],
    "phage display": ["phage display library"],
    "hybridoma": ["hybridoma technology", "hybridomas"],
    "affinity maturation": ["affinity maturation"],
    "proteolysis targeting chimera": ["protac", "protacs"],
    "protac": ["proteolysis targeting chimera", "protacs"],
    "ubiquitin proteasome system": ["ubiquitin proteasome", "proteasome", "ups"],
    "e3  ubiquitin ligase": ["e3 ligase", "e3 ubiquitin ligase"],
    "molecular glue": ["molecular glues"],
    "hook effect": ["hook"],
    "artificial intelligence": ["ai"],
    "machine learning": ["ml"],
    "deep learning": ["dl", "neural network", "neural networks", "artificial neural network"],
    "drug repurposing": ["repurposing", "drug repositioning", "repositioning"],
    "alphafold": ["alpha fold"],

    // Molecules / ions
    "acetylcholine": ["ach"],
    "cyclic amp": ["camp", "c amp", "cyclic adenosine monophosphate"],
    "camp": ["cyclic amp"],
    "guanosine triphosphate": ["gtp"],
    "calcium": ["ca", "ca2", "ca ion"],
    "messenger rna": ["mrna", "m rna"],

    // Drug names common in the module
    "imatinib": ["glivec", "gleevec", "sti571"],
    "sildenafil": ["viagra"],
    "thalidomide": ["thalidomide"],
    "baricitinib": ["olumiant"],
    "cisapride": ["cisapride"],
  };

  // ------------------------------------------------------------------
  // Levenshtein (early-exit, 1-2 edit fuzzy match)
  // ------------------------------------------------------------------
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    if (Math.abs(m - n) > 2) return Math.abs(m - n);
    let prev = new Array(n + 1), curr = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      curr[0] = i;
      for (let j = 1; j <= n; j++) {
        const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      }
      [prev, curr] = [curr, prev];
    }
    return prev[n];
  }

  // ------------------------------------------------------------------
  // Normalisation
  // ------------------------------------------------------------------
  function normalise(s) {
    return (s || "")
      .toString()
      .trim()
      .toLowerCase()
      // Greek letters -> latin words used in answers
      .replace(/α/g, "alpha").replace(/β/g, "beta")
      .replace(/γ/g, "gamma").replace(/μ/g, "u").replace(/µ/g, "u")
      .replace(/κ/g, "k").replace(/Δ/g, "delta")
      // subscripts / superscripts commonly used
      .replace(/₀/g, "0").replace(/₁/g, "1").replace(/₂/g, "2")
      .replace(/₃/g, "3").replace(/₅/g, "5")
      // dashes -> space
      .replace(/[‐-―\-]/g, " ")
      // strip punctuation
      .replace(/[.,;:!?'"()\/\[\]{}\\=<>%]/g, " ")
      // collapse whitespace
      .replace(/\s+/g, " ")
      .trim();
  }

  // ------------------------------------------------------------------
  // Keyword check — does `keyword` appear in normalised `text`?
  // ------------------------------------------------------------------
  function keywordHits(text, keyword) {
    const k = normalise(keyword);
    if (!k) return false;
    const padded = " " + text + " ";

    if (padded.includes(" " + k + " ")) return true;
    if (padded.includes(k)) return true;

    // Synonym expansion (BFS so chains resolve transitively)
    const seen = new Set();
    const queue = [k];
    while (queue.length) {
      const cur = queue.shift();
      if (seen.has(cur)) continue;
      seen.add(cur);
      const syns = SYN[cur];
      if (!syns) continue;
      for (const s of syns) {
        const ns = normalise(s);
        if (padded.includes(" " + ns + " ") || padded.includes(ns)) return true;
        if (!seen.has(ns)) queue.push(ns);
      }
    }

    // Typo tolerance for single-word keywords (length >= 5)
    if (!k.includes(" ") && k.length >= 5) {
      const tokens = text.split(/\s+/);
      const allowed = k.length >= 8 ? 2 : 1;
      for (const t of tokens) {
        if (t.length < 4) continue;
        if (Math.abs(t.length - k.length) > allowed) continue;
        if (levenshtein(t, k) <= allowed) return true;
      }
    }
    return false;
  }

  // ------------------------------------------------------------------
  // Pattern check — string (single keyword) or array (ALL must hit)
  // ------------------------------------------------------------------
  function patternHits(text, pattern) {
    if (typeof pattern === "string") return keywordHits(text, pattern);
    if (Array.isArray(pattern)) return pattern.every((p) => keywordHits(text, p));
    return false;
  }

  // ------------------------------------------------------------------
  // Public: legacy short-answer matcher
  // ------------------------------------------------------------------
  function matchShort(input, q) {
    const text = normalise(input);
    if (!text) return false;
    const candidates = [q.answer, ...(q.accepts || [])];
    return candidates.some((c) => keywordHits(text, normalise(c)));
  }

  // ------------------------------------------------------------------
  // Public: SAQ grader. Each markScheme entry:
  //   { marks, label, patterns:[pattern,...] }  (point awarded if ANY hits)
  // Returns { earned, total, hits:[{label,marks,matched}] }
  // ------------------------------------------------------------------
  function gradeSAQ(input, markScheme) {
    const text = normalise(input);
    let earned = 0, total = 0;
    const hits = [];
    for (const point of markScheme || []) {
      const m = typeof point.marks === "number" ? point.marks : 1;
      total += m;
      const matched = text.length > 0 && (point.patterns || []).some((p) => patternHits(text, p));
      if (matched) earned += m;
      hits.push({ label: point.label || "", marks: m, matched });
    }
    return { earned, total, hits };
  }

  window.CDDMatcher = { normalise, keywordHits, patternHits, matchShort, gradeSAQ, levenshtein };
})();
