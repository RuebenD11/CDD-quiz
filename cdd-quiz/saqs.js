// saqs.js — Short-Answer Question bank (multi-mark, mark-scheme graded).
//
// Each SAQ:
//   { id, topic, lecture, source, type:"saq", marks, question,
//     markScheme:[ { marks, label, patterns:[pattern,...] } ],
//     modelAnswer, modelExpanded }
//
// One mark = one discrete point/assertion/fact (per the exam convention).
// markScheme labels double as the manual self-mark checklist AND the
// auto-grade target. A point is auto-awarded if ANY of its patterns hit
// (see matcher.js — synonyms + typo tolerance built in). `patterns` entries
// are a string (one keyword) or an array of strings (ALL required).
//
// `source` tags: "core" (lecture-derived), "2023" / "2024" (past paper).
// app.js merges SAQ_BANK into the global QUESTION_BANK at boot.

const SAQ_BANK = [

  // =====================================================================
  // BLOCK 1 — DRUG TARGETS & DRUG DISCOVERY (L02)
  // =====================================================================
  {
    id: "saq-b1-1a", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "2024",
    type: "saq", marks: 2,
    question: "Define the term ‘drug target’. (2 marks)",
    markScheme: [
      { marks: 1, label: "A drug target is a specific (usually protein) molecule…", patterns: [["specific", "molecule"], ["protein", "molecule"], "macromolecule"] },
      { marks: 1, label: "…with which a drug interacts to produce its (therapeutic) biological effect", patterns: [["drug", "interact"], ["produce", "effect"], ["bind", "effect"]] },
    ],
    modelAnswer: "A drug target is a specific molecule (usually a protein) with which a drug interacts to produce its biological (therapeutic) effect.",
    modelExpanded: "A drug target is the specific (usually protein) molecule with which a drug interacts to elicit its pharmacological effect — the macromolecule whose modulation produces the desired biological response.",
  },
  {
    id: "saq-b1-1b", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "2024",
    type: "saq", marks: 3,
    question: "Give THREE features of a good drug target, explaining each. (3 marks)",
    markScheme: [
      { marks: 1, label: "Efficacious — modulating it produces a meaningful change in the disease", patterns: ["efficacious", ["modulat", "disease"], ["meaningful", "change"]] },
      { marks: 1, label: "Safe — modulation does not cause unacceptable adverse effects", patterns: ["safe", ["not", "toxic"], ["acceptable", "adverse"]] },
      { marks: 1, label: "Druggable AND clinically/commercially needed (accept either as the third feature)", patterns: ["druggable", ["clinically", "need"], ["commercial", "need"], ["unmet", "need"]] },
    ],
    modelAnswer: "Good targets are: efficacious — modulation produces a meaningful change in the disease; safe — modulation does not cause unacceptable adverse effects; and druggable as well as clinically/commercially needed — accessible to a drug with a measurable response and addressing an unmet need with a viable market.",
    modelExpanded: "Three features define a good target: (1) Efficacious — modulating the target produces a meaningful change in disease processes; (2) Safe — modulation does not cause unacceptable adverse effects; (3) Druggable and clinically/commercially needed — it is accessible to a drug molecule with a measurable biological response and addresses an unmet clinical need with a viable market.",
  },
  {
    id: "saq-b1-2", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "2024",
    type: "saq", marks: 5,
    question: "Explain why G-protein-coupled receptors (GPCRs) are the targets of a significant proportion of therapeutic drugs. (5 marks)",
    markScheme: [
      { marks: 1, label: "GPCRs are the largest receptor superfamily (~800 genes), so many disease-relevant targets exist", patterns: [["largest", "family"], ["superfamily"], ["many", "receptor"], "800"] },
      { marks: 1, label: "They are cell-surface / membrane proteins, so accessible to drugs without needing to cross the membrane", patterns: [["cell surface"], ["membrane", "accessible"], ["extracellular", "binding"], ["do not", "enter cell"]] },
      { marks: 1, label: "They have well-defined ligand-binding pockets (orthosteric + allosteric sites) — highly druggable", patterns: [["binding", "pocket"], ["orthosteric"], ["allosteric"], ["druggable"]] },
      { marks: 1, label: "They transduce/amplify signals (via G proteins / second messengers), so small drug effects are amplified", patterns: [["amplif"], ["second messenger"], ["signal transduc"], ["g protein"]] },
      { marks: 1, label: "They regulate diverse physiology, so are involved in many diseases (broad therapeutic relevance)", patterns: [["diverse", "physiolog"], ["many", "disease"], ["wide", "range"], ["broad", "process"]] },
    ],
    modelAnswer: "GPCRs are the largest receptor family, sit on the cell surface (so are accessible without entering the cell), have druggable orthosteric/allosteric binding pockets, amplify signals via G proteins, and regulate diverse physiology — so they are relevant to many diseases.",
    modelExpanded: "GPCRs comprise the largest superfamily of cell-surface receptors (~800 human genes). Because they are membrane proteins with their ligand-binding site accessible from outside the cell, a drug does not need to cross the plasma membrane to act. They possess well-defined orthosteric and allosteric binding pockets that small molecules can engage, making them highly druggable, and they amplify signals through G-protein/second-messenger cascades so even modest occupancy yields a measurable response. Finally, they regulate an enormous range of physiology (neurotransmission, hormones, sensory systems), so they are implicated in a wide variety of diseases — together explaining why roughly a third of marketed drugs act on GPCRs.",
  },
  {
    id: "saq-b1-3", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "core",
    type: "saq", marks: 6,
    question: "Compare phenotypic and molecular (target-based) approaches to drug discovery, giving one strength of each, and outline the discovery of imatinib as an example. (6 marks)",
    markScheme: [
      { marks: 1, label: "Phenotypic: screen for an observable biological effect; target deconvoluted later", patterns: [["phenotypic", "effect"], ["observable", "effect"], ["target", "later"], ["deconvolut"]] },
      { marks: 1, label: "Phenotypic strength: can find first-in-class drugs without knowing the target", patterns: [["first in class"], ["no", "prior", "target"], ["novel mechanism"]] },
      { marks: 1, label: "Molecular: start from a defined target and screen compounds against it (rational)", patterns: [["defined target"], ["target based"], ["rational"], ["known target"]] },
      { marks: 1, label: "Molecular strength: hypothesis-driven; suited to monogenic disease", patterns: [["hypothesis driven"], ["monogenic"], ["mendelian"]] },
      { marks: 1, label: "Imatinib: CML driven by Philadelphia chromosome → Bcr-Abl fusion tyrosine kinase", patterns: [["philadelphia"], ["bcr abl"], ["fusion", "kinase"]] },
      { marks: 1, label: "Kinase assay screen identified imatinib → approved 2001, first-line CML", patterns: [["kinase assay"], ["imatinib"], ["glivec"], ["first line", "cml"]] },
    ],
    modelAnswer: "Phenotypic discovery screens for an observable effect and finds the target afterwards (good for first-in-class drugs without prior target knowledge). Molecular discovery starts from a defined target and screens against it (rational, hypothesis-driven, good for monogenic disease). Imatinib: CML is driven by the Philadelphia chromosome producing the Bcr-Abl fusion kinase; an in vitro kinase assay identified imatinib, approved in 2001 as first-line CML therapy.",
    modelExpanded: "In phenotypic discovery, compounds are screened for an observable effect on cells/tissues/organisms and the molecular target is deconvoluted afterwards — historically this yielded a disproportionate share of first-in-class drugs. In the molecular approach a defined target is identified from disease biology and compounds are screened against it; it is rational and hypothesis-driven and works well for monogenic Mendelian disease. Imatinib illustrates the molecular approach: ~95% of CML patients carry the Philadelphia chromosome (t(9;22)) producing the constitutively active Bcr-Abl fusion tyrosine kinase; an in vitro kinase assay was used to screen for inhibitors, imatinib was identified (1992) and approved in 2001 (Gleevec), remaining first-line for CML.",
  },
  {
    id: "saq-b1-4a", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "2023",
    type: "saq", marks: 2,
    question: "What are the main determinants when choosing a target for a new drug discovery project in a pharmaceutical company? (2 marks)",
    markScheme: [
      { marks: 1, label: "Scientific determinant: strong target–disease link / validation and druggability", patterns: [["validat"], ["target", "disease", "link"], ["druggable"], ["unmet", "need"]] },
      { marks: 1, label: "Commercial/strategic determinant: market size, IP/patent position, competition, safety", patterns: [["market"], ["patent"], ["commercial"], ["competition"], ["intellectual property"]] },
    ],
    modelAnswer: "Target choice balances scientific factors — a validated target–disease link, druggability and unmet clinical need — against commercial/strategic factors — market size, patentability, competition and the anticipated safety profile.",
    modelExpanded: "When selecting a target a company weighs scientific determinants — a strong, validated target–disease link, druggability, and an unmet clinical need — against commercial and strategic determinants — market size, intellectual-property/patent position, competitive landscape and the anticipated safety profile.",
  },
  {
    id: "saq-b1-4b", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "2023",
    type: "saq", marks: 4,
    question: "How has the nature of drugs changed over the past ~20 years? (4 marks)",
    markScheme: [
      { marks: 1, label: "Shift from small molecules toward biologics (mAbs, proteins)", patterns: [["biologic"], ["monoclonal"], ["protein", "drug"]] },
      { marks: 1, label: "Rise of targeted / personalised (stratified) medicine and pharmacogenomics", patterns: [["personalised"], ["personalized"], ["stratified"], ["targeted therapy"], ["pharmacogenom"]] },
      { marks: 1, label: "New modalities: gene therapy, RNA/antisense, PROTACs, cell therapy", patterns: [["gene therapy"], ["rna"], ["antisense"], ["protac"], ["cell therapy"], ["sirna"]] },
      { marks: 1, label: "Greater use of computational/AI methods and structure-based design", patterns: [["ai"], ["computational"], ["machine learning"], ["structure based"], ["in silico"]] },
    ],
    modelAnswer: "Over ~20 years drugs have shifted from small molecules toward biologics (mAbs, proteins), toward targeted/personalised medicine guided by pharmacogenomics, toward new modalities (gene/RNA therapies, PROTACs, cell therapy), and toward computational/AI-driven design.",
    modelExpanded: "Over the past two decades the nature of drugs has changed markedly: a major shift from small molecules to biologics (monoclonal antibodies, recombinant proteins) which now dominate revenue; the rise of targeted and personalised/stratified medicine guided by pharmacogenomics and companion diagnostics; the emergence of entirely new modalities such as gene therapy, RNA/antisense oligonucleotides, PROTAC degraders and cell therapies; and the growing use of computational, structure-based and AI-driven approaches throughout discovery.",
  },
  {
    id: "saq-b1-5", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "2023",
    type: "saq", marks: 4,
    question: "Describe how a project team would determine what type of drug would be suitable for a newly identified receptor interacting with a known pathway. (4 marks)",
    markScheme: [
      { marks: 1, label: "Establish whether activating or inhibiting the receptor is therapeutically desirable (direction of effect)", patterns: [["activat", "inhibit"], ["direction", "effect"], ["agonist", "antagonist", "needed"], ["up", "down", "regulate"]] },
      { marks: 1, label: "Decide ligand type accordingly: agonist / antagonist / partial agonist / inverse agonist / modulator", patterns: [["agonist"], ["antagonist"], ["partial agonist"], ["inverse agonist"], ["modulator"]] },
      { marks: 1, label: "Use the pathway/endogenous ligand and receptor class to guide modality (small molecule vs biologic)", patterns: [["endogenous ligand"], ["receptor class"], ["small molecule", "biologic"], ["modality"]] },
      { marks: 1, label: "Validate with knockout/knockdown or tool compounds to confirm the predicted effect before committing", patterns: [["knockout"], ["knockdown"], ["tool compound"], ["validat"]] },
    ],
    modelAnswer: "The team first establishes whether the disease needs the receptor activated or inhibited (the direction of the desired effect), then chooses the ligand type accordingly (agonist, antagonist, partial/inverse agonist or allosteric modulator). The known pathway and endogenous ligand, plus the receptor class, guide whether a small molecule or biologic is appropriate, and the hypothesis is validated with knockout/knockdown or tool compounds before committing.",
    modelExpanded: "Because the receptor sits in a known pathway, the team can predict the consequence of modulating it: they first decide whether the therapeutic goal requires increasing or decreasing receptor signalling. That sets the required ligand type — a full or partial agonist to enhance signalling, an antagonist or inverse agonist to suppress it, or an allosteric modulator for finer control. The receptor class and its endogenous ligand inform the modality: a classical GPCR or enzyme is amenable to a small molecule, whereas an extracellular target may suit a biologic. The prediction is then validated experimentally — gene knockout/knockdown, transgenic models or selective tool compounds — to confirm that modulating the receptor produces the desired phenotype before a full programme is committed.",
  },

  // =====================================================================
  // BLOCK 2 — MECHANISMS OF DRUG ACTION (L03)
  // =====================================================================
  {
    id: "saq-b2-1", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "core",
    type: "saq", marks: 3,
    question: "Explain the difference between full agonists, partial agonists and positive allosteric modulators (PAMs). (3 marks)",
    markScheme: [
      { marks: 1, label: "Full agonist: binds orthosteric site, high efficacy, gives maximal response (100% Emax)", patterns: [["full agonist", "maximal"], ["100", "emax"], ["maximal response"]] },
      { marks: 1, label: "Partial agonist: binds orthosteric site but lower efficacy → sub-maximal response even at full occupancy", patterns: [["partial", "sub maximal"], ["partial", "lower", "efficacy"], ["cannot reach", "maximal"]] },
      { marks: 1, label: "PAM: binds a separate allosteric site, no effect alone, enhances an agonist's affinity/efficacy", patterns: [["allosteric", "enhance"], ["allosteric", "site"], ["potentiat", "agonist"]] },
    ],
    modelAnswer: "Full agonists bind the orthosteric site with high efficacy and give the maximal response (100% Emax). Partial agonists bind the same site but with lower efficacy, so even at full occupancy the response is sub-maximal. PAMs bind a distinct allosteric site, do nothing alone, and increase the affinity and/or efficacy of an orthosteric agonist.",
    modelExpanded: "Full agonists occupy the orthosteric site and have sufficient intrinsic efficacy to drive the receptor to its maximal response (100% Emax). Partial agonists occupy the same site but have lower intrinsic efficacy, so even at full occupancy they evoke a sub-maximal response and can behave as functional antagonists in the presence of a full agonist (e.g. buprenorphine at MOP). Positive allosteric modulators do not activate the receptor alone; they bind a distinct allosteric site and increase the affinity and/or efficacy of an orthosteric agonist (e.g. benzodiazepines at GABA-A).",
  },
  {
    id: "saq-b2-2", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "core",
    type: "saq", marks: 4,
    question: "Describe how the EC50 of a full agonist is determined from a concentration–response curve and what it tells us. (4 marks)",
    markScheme: [
      { marks: 1, label: "Plot response (as % of maximal response) against log[agonist]", patterns: [["plot", "response"], ["log", "concentration"], ["percent", "maximal"], ["response", "log"]] },
      { marks: 1, label: "Read across from 50% of the maximal response to the curve", patterns: [["50", "maximal"], ["half", "maximal"], ["50", "response"]] },
      { marks: 1, label: "Drop down to the x-axis and take the antilog to get EC50 (with units)", patterns: [["antilog"], ["x axis"], ["units"], ["inverse log"]] },
      { marks: 1, label: "EC50 is the concentration giving 50% of Emax — a measure of potency for comparing agonists", patterns: [["potency"], ["50", "emax"], ["compare", "agonist"]] },
    ],
    modelAnswer: "Plot the response (as % of the maximal response) against log[agonist]; read across from 50% of Emax to the curve, drop to the x-axis and take the antilog (with units) to obtain EC50. EC50 is the agonist concentration producing 50% of Emax — a measure of potency that lets you compare agonists at the same receptor.",
    modelExpanded: "Apply a range of agonist concentrations and plot the response (normally as a percentage of the maximum response) against log[agonist], giving a sigmoidal curve. Read across from 50% on the y-axis to the curve, drop down to the x-axis to find log[A] at half-maximal response, and take the antilog (quoting units) to obtain the EC50. EC50 is a measure of potency — the lower the EC50, the more potent the agonist — and allows direct comparison between agonists at the same receptor and tissue. Note EC50 is not the same as Kd unless there are no spare receptors.",
  },
  {
    id: "saq-b2-3", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "core",
    type: "saq", marks: 3,
    question: "Explain what a non-competitive antagonist does to the Emax and EC50 of an agonist, and why. (3 marks)",
    markScheme: [
      { marks: 1, label: "EC50 unchanged — antagonist binds a separate (allosteric) site, not competing at the orthosteric site", patterns: [["ec50", "unchanged"], ["ec50", "same"], ["allosteric"], ["not compete"]] },
      { marks: 1, label: "Emax decreases — functional receptors are removed from the responsive pool", patterns: [["emax", "decrease"], ["emax", "reduce"], ["fewer", "receptor"], ["remove", "receptor"]] },
      { marks: 1, label: "Block is non-surmountable / irreversible — increasing [agonist] cannot restore Emax", patterns: [["non surmountable"], ["insurmountable"], ["irreversible"], ["cannot", "restore"]] },
    ],
    modelAnswer: "EC50 is unchanged because the antagonist binds a separate site and doesn't compete at the orthosteric site, so agonist affinity for the remaining receptors is unaffected. Emax falls because functional receptors are removed from the responsive pool, and the block is non-surmountable — more agonist cannot restore Emax.",
    modelExpanded: "A non-competitive antagonist binds at a site distinct from the orthosteric agonist site (or binds the orthosteric site irreversibly), so it does not compete directly with the agonist. Because the agonist's affinity for the available receptors is unchanged, EC50 stays the same. However, the antagonist effectively removes a fraction of receptors from the responsive pool, so the maximum achievable response (Emax) is reduced. Increasing agonist concentration cannot surmount this, distinguishing non-competitive from competitive antagonism (which shifts EC50 right with Emax preserved).",
  },
  {
    id: "saq-b2-4", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "core",
    type: "saq", marks: 5,
    question: "Define affinity and intrinsic efficacy, and define Bmax, Emax and EC50, stating the difference between EC50 and Kd. (5 marks)",
    markScheme: [
      { marks: 1, label: "Affinity = capacity of a ligand to bind the receptor (agonists and antagonists have it)", patterns: [["affinity", "bind"], ["ability", "bind"]] },
      { marks: 1, label: "Intrinsic efficacy = capacity of a bound ligand to activate the receptor (only agonists)", patterns: [["intrinsic efficacy"], ["activate", "receptor"], ["only", "agonist"]] },
      { marks: 1, label: "Bmax = maximum binding capacity (total receptors)", patterns: [["bmax"], ["maximum binding"], ["total receptor"]] },
      { marks: 1, label: "Emax = maximum biological response; EC50 = [agonist] giving 50% of Emax", patterns: [["emax", "response"], ["ec50", "50"]] },
      { marks: 1, label: "EC50 ≠ Kd because of spare receptors / signal amplification (max response below full occupancy)", patterns: [["spare receptor"], ["amplif"], ["receptor reserve"], ["below", "occupancy"]] },
    ],
    modelAnswer: "Affinity is a ligand's capacity to bind the receptor (both agonists and antagonists have it). Intrinsic efficacy is the bound ligand's capacity to activate the receptor (only agonists). Bmax = total receptor/maximum binding; Emax = maximum response; EC50 = the concentration giving 50% of Emax. EC50 ≠ Kd because spare receptors/signal amplification let a maximal response occur below 100% occupancy.",
    modelExpanded: "Affinity is the capacity of a ligand to bind to its receptor (governed by association/dissociation, quantified by Kd); both agonists and antagonists possess affinity. Intrinsic efficacy is the ability of a bound ligand to activate the receptor and generate a response — only agonists possess it. Bmax is the maximum binding capacity (total receptors occupiable at saturating ligand). Emax is the maximum biological response. EC50 is the agonist concentration giving 50% of Emax, whereas Kd is the concentration giving 50% receptor occupancy. EC50 and Kd are not necessarily equal because of signal amplification and spare receptors: a maximal response can be reached at well below 100% occupancy, so EC50 often lies below Kd.",
  },
  {
    id: "saq-b2-5a", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "2024",
    type: "saq", marks: 2,
    question: "Explain the meaning of the term ‘inverse agonist’. (2 marks)",
    markScheme: [
      { marks: 1, label: "An inverse agonist binds the receptor and produces a response opposite to that of an agonist", patterns: [["opposite", "agonist"], ["reduce", "response"], ["negative efficacy"]] },
      { marks: 1, label: "It reduces the basal/constitutive activity of the receptor below baseline", patterns: [["basal", "activity"], ["constitutive", "below"], ["reduce", "basal"], ["below baseline"]] },
    ],
    modelAnswer: "An inverse agonist binds the receptor and produces the opposite response to an agonist, reducing the receptor's basal (constitutive) activity below baseline — it has 'negative efficacy'.",
    modelExpanded: "An inverse agonist binds the receptor and produces an effect opposite to that of an agonist — it has 'negative efficacy', reducing the receptor's basal/constitutive signalling below the unliganded baseline.",
  },
  {
    id: "saq-b2-5b", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "2024",
    type: "saq", marks: 1,
    question: "What receptor property is required for a ligand to be an inverse agonist? (1 mark)",
    markScheme: [
      { marks: 1, label: "Required property: the receptor must show constitutive (agonist-independent) activity", patterns: [["constitutive activity"], ["agonist independent"], ["basal activity"]] },
    ],
    modelAnswer: "The receptor must possess constitutive (agonist-independent) activity; without basal tone an inverse agonist behaves indistinguishably from an antagonist.",
    modelExpanded: "For an inverse agonist's effect to be observable the receptor must possess constitutive (agonist-independent) activity; if there is no basal tone, an inverse agonist behaves indistinguishably from an antagonist.",
  },
  {
    id: "saq-b2-5c", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "2024",
    type: "saq", marks: 2,
    question: "How does an inverse agonist differ from a pure antagonist? (2 marks)",
    markScheme: [
      { marks: 1, label: "A pure antagonist has no effect on basal activity (zero efficacy)", patterns: [["antagonist", "no effect", "basal"], ["antagonist", "zero efficacy"], ["no", "intrinsic", "effect"]] },
      { marks: 1, label: "An antagonist only blocks agonist binding; an inverse agonist actively lowers signalling", patterns: [["block", "agonist"], ["antagonist", "block"], ["inverse", "lower", "signal"]] },
    ],
    modelAnswer: "A pure (neutral) antagonist has no effect on basal activity (zero efficacy) — it simply blocks agonist binding — whereas an inverse agonist actively lowers signalling below baseline.",
    modelExpanded: "A pure (neutral) antagonist has zero efficacy: it occupies the receptor and blocks agonist access but does not change basal activity. The key difference is therefore that an antagonist only prevents agonist action, whereas an inverse agonist actively turns signalling down below baseline.",
  },
  {
    id: "saq-b2-6", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "core",
    type: "saq", marks: 3,
    question: "Explain what is meant by ‘spare receptors’ (receptor reserve) and give one functional consequence. (3 marks)",
    markScheme: [
      { marks: 1, label: "Emax reached at less than 100% occupancy of Bmax (sometimes <5%)", patterns: [["less than", "occupancy"], ["below", "100"], ["small", "occupancy"], ["5"]] },
      { marks: 1, label: "Due to amplification of signal downstream / equivalently EC50 < Kd", patterns: [["amplif"], ["ec50", "kd"], ["downstream"]] },
      { marks: 1, label: "Consequence: partial receptor inactivation shifts curve right before reducing Emax (potency loss first)", patterns: [["shift", "right"], ["loss", "potency"], ["before", "emax"]] },
    ],
    modelAnswer: "Spare receptors exist when Emax is reached at much less than 100% occupancy (sometimes <5%), because the signal is amplified downstream — equivalently EC50 < Kd. A consequence is that partial receptor inactivation first shifts the agonist curve to the right (loss of apparent potency) before Emax falls.",
    modelExpanded: "Spare receptors (receptor reserve) are present when the maximal response is achieved at occupancy well below Bmax — sometimes under 5% — because signalling pathways amplify the response from a few activated receptors. Operationally, if EC50 is lower than Kd, spare receptors are inferred. The functional consequence is that small reductions in functional receptor number (e.g. by an irreversible antagonist) primarily shift the concentration–response curve to the right (loss of apparent potency) before Emax is reduced. The number of spare receptors varies between tissues for the same receptor.",
  },

  // =====================================================================
  // BLOCK 3 — METHODS IN DRUG DISCOVERY (L04 molecular biology, L05 assays)
  // =====================================================================
  {
    id: "saq-b3-1", topic: "B3 · Methods in Drug Discovery", lecture: "L05", source: "core",
    type: "saq", marks: 3,
    question: "Compare biochemical (ligand-binding) and functional (bioassay) assays in early drug discovery. (3 marks)",
    markScheme: [
      { marks: 1, label: "Binding assays detect binding; simple, robust, scalable to HTS but binding-only", patterns: [["binding", "robust"], ["binding", "hts"], ["binding", "scalable"], ["radioligand"]] },
      { marks: 1, label: "Binding cannot distinguish agonist from antagonist", patterns: [["cannot distinguish", "agonist"], ["agonist", "antagonist", "not"], ["no", "efficacy"]] },
      { marks: 1, label: "Functional assays measure a response → reveal efficacy/potency & discriminate activators from inhibitors (slower, lower throughput)", patterns: [["functional", "efficacy"], ["functional", "response"], ["distinguish", "agonist", "antagonist"], ["activator", "inhibitor"]] },
    ],
    modelAnswer: "Ligand-binding assays detect whether a compound binds (e.g. radioligand displacement) — simple, robust and scalable to HTS, but they only report binding and can't tell an agonist from an antagonist. Functional bioassays measure a downstream response, revealing efficacy and potency and distinguishing activators from inhibitors, but are slower and lower-throughput.",
    modelExpanded: "Ligand-binding assays detect a compound's ability to bind a target (e.g. radioligand displacement to give IC50, or scintillation proximity assays). They are simple, robust, inexpensive and scalable to high-throughput screening, but report only binding and cannot distinguish agonists from antagonists. Functional/bioassays measure a downstream response proportional to target activation (cAMP, Ca²⁺ flux, contraction, reporter gene), revealing efficacy and potency and discriminating activators from inhibitors. The trade-off is that functional assays are slower, more variable and lower-throughput, so binding assays dominate primary screening while functional assays drive lead profiling.",
  },
  {
    id: "saq-b3-2", topic: "B3 · Methods in Drug Discovery", lecture: "L05", source: "core",
    type: "saq", marks: 4,
    question: "Explain the principle of the GTP-γ-S assay and how it distinguishes agonists from antagonists at a GPCR. (4 marks)",
    markScheme: [
      { marks: 1, label: "On activation Gα exchanges GDP for GTP; GTPase normally hydrolyses GTP to terminate the signal", patterns: [["gdp", "gtp"], ["exchange", "gtp"], ["gtpase"]] },
      { marks: 1, label: "GTP-γ-S is a non-hydrolysable GTP analogue that traps Gα in its active state", patterns: [["non hydrolysable"], ["analogue"], ["trap", "active"], ["cannot", "hydrolyse"]] },
      { marks: 1, label: "More agonist → more activated G proteins → more GTP-γ-S incorporated (efficacy readout)", patterns: [["agonist", "increase", "incorporat"], ["more", "g protein"], ["efficacy"], ["35s"]] },
      { marks: 1, label: "Antagonists don't increase incorporation and block agonist-induced incorporation", patterns: [["antagonist", "no", "increase"], ["antagonist", "block"], ["block", "agonist"]] },
    ],
    modelAnswer: "GPCR activation makes Gα exchange GDP for GTP; normally the intrinsic GTPase hydrolyses GTP to end the signal. GTP-γ-S is a non-hydrolysable GTP analogue that traps Gα in its active state, so the amount incorporated is proportional to the number of activated G proteins — a direct efficacy readout. Agonists increase incorporation; antagonists do not, and block agonist-induced incorporation.",
    modelExpanded: "GPCR activation drives Gα to exchange GDP for GTP; Gα–GTP dissociates and activates effectors before its intrinsic GTPase hydrolyses GTP back to GDP, terminating the signal. GTP-γ-S is a non-hydrolysable analogue of GTP — once loaded onto Gα it cannot be removed, permanently capturing the active state. The amount of GTP-γ-S incorporated (often via ³⁵S label) is proportional to the number of activated G proteins and hence to agonist efficacy. Antagonists do not themselves promote incorporation and block agonist-induced incorporation, so the assay distinguishes them.",
  },
  {
    id: "saq-b3-3", topic: "B3 · Methods in Drug Discovery", lecture: "L04", source: "core",
    type: "saq", marks: 3,
    question: "Describe how CRISPR/Cas9 is used to edit a target gene in a mammalian cell. (3 marks)",
    markScheme: [
      { marks: 1, label: "Design a guide RNA complementary to the target sequence to recruit Cas9", patterns: [["guide rna"], ["grna"], ["complementary", "target"]] },
      { marks: 1, label: "Cas9 introduces a double-strand break at the gRNA-defined site", patterns: [["double strand break"], ["cas9", "cut"], ["dsb"]] },
      { marks: 1, label: "Repair by NHEJ (knock-out) or HDR with a template (knock-in/correction)", patterns: [["nhej"], ["hdr"], ["homology directed"], ["repair", "template"]] },
    ],
    modelAnswer: "A guide RNA complementary to the target sequence recruits Cas9, which makes a double-strand break at that site. The cell repairs the break either imprecisely by NHEJ (producing indels that knock out the gene) or, with a supplied template, by HDR (introducing a defined edit — knock-in or correction).",
    modelExpanded: "CRISPR/Cas9 is adapted from a prokaryotic immune system. A guide RNA designed to base-pair with the target DNA recruits the Cas9 endonuclease, which introduces a double-strand break at that site. The cell's repair machinery either rejoins the ends imprecisely (non-homologous end joining, NHEJ), producing indels that knock the gene out, or uses a co-introduced template to make a defined change by homology-directed repair (HDR — knock-in or correction). CRISPR is fast, cheap and can be delivered by direct injection into oocytes.",
  },
  {
    id: "saq-b3-4a", topic: "B3 · Methods in Drug Discovery", lecture: "L05", source: "2023",
    type: "saq", marks: 3,
    question: "What are reporter genes and why are they used in assays for drug screening? (3 marks)",
    markScheme: [
      { marks: 1, label: "A reporter gene encodes an easily detectable product placed under the control of a pathway of interest", patterns: [["easily", "detect"], ["measurable", "product"], ["under control", "promoter"], ["readout"]] },
      { marks: 1, label: "Its expression reports activity of the linked promoter/signalling pathway", patterns: [["report", "activity"], ["promoter", "activity"], ["pathway", "activity"]] },
      { marks: 1, label: "Used because the signal is quantitative, sensitive and scalable to HTS", patterns: [["quantitative"], ["sensitive"], ["high throughput"], ["scalable"]] },
    ],
    modelAnswer: "A reporter gene encodes an easily measured product placed under the control of a pathway of interest, so its expression reports that pathway's activity. They are useful because the readout is quantitative, sensitive and scalable to high-throughput screening.",
    modelExpanded: "A reporter gene is a gene whose product is easily and quantitatively detected, placed under the control of a promoter or response element coupled to the signalling pathway being studied; its expression therefore reports the activity of that pathway. They are used because the readout is objective, sensitive, quantitative and scalable to high-throughput screening.",
  },
  {
    id: "saq-b3-4b", topic: "B3 · Methods in Drug Discovery", lecture: "L05", source: "2023",
    type: "saq", marks: 3,
    question: "Give THREE examples of a reporter gene. (3 marks)",
    markScheme: [
      { marks: 1, label: "Example: luciferase (luminescence)", patterns: ["luciferase"] },
      { marks: 1, label: "Example: green fluorescent protein (GFP / fluorescence)", patterns: ["gfp", "fluorescent protein"] },
      { marks: 1, label: "Example: β-galactosidase / CAT / β-lactamase / SEAP (any valid third)", patterns: ["galactosidase", "lacz", "chloramphenicol acetyltransferase", "cat", "lactamase", "seap"] },
    ],
    modelAnswer: "Luciferase (bioluminescence), green fluorescent protein (GFP, fluorescence) and β-galactosidase/lacZ (colorimetric) — others include chloramphenicol acetyltransferase (CAT), β-lactamase and secreted alkaline phosphatase (SEAP).",
    modelExpanded: "Common examples are luciferase (bioluminescence), green fluorescent protein (fluorescence) and β-galactosidase/lacZ (colorimetric); other valid reporters include chloramphenicol acetyltransferase (CAT), β-lactamase and secreted alkaline phosphatase (SEAP). Many are non-mammalian, which is why they give such low background in mammalian cells.",
  },
  {
    id: "saq-b3-4c", topic: "B3 · Methods in Drug Discovery", lecture: "L05", source: "2023",
    type: "saq", marks: 2,
    question: "How are cells modified to enable a reporter gene assay? (2 marks)",
    markScheme: [
      { marks: 1, label: "Cells are transfected with a construct linking the reporter gene to a response element/promoter", patterns: [["transfect"], ["construct"], ["plasmid"], ["response element"]] },
      { marks: 1, label: "The reporter is downstream of the target pathway so activation drives reporter expression", patterns: [["downstream", "pathway"], ["activation", "express"], ["target", "drive"]] },
    ],
    modelAnswer: "Cells are genetically modified (transfected) with a construct in which the reporter gene is placed downstream of a response element/promoter controlled by the target pathway, so when the target is activated the reporter is expressed.",
    modelExpanded: "Cells are genetically modified (transfected) with a construct (plasmid) in which the reporter gene is placed downstream of a response element activated by the target pathway, so that when the target is activated the reporter is transcribed and its easily detectable product accumulates in proportion to pathway activity.",
  },
  {
    id: "saq-b3-4d", topic: "B3 · Methods in Drug Discovery", lecture: "L05", source: "2023",
    type: "saq", marks: 2,
    question: "Cells do not normally express reporter genes — why is this an advantage? (2 marks)",
    markScheme: [
      { marks: 1, label: "No/low background signal because cells don't normally express it", patterns: [["low background"], ["no background"], ["not normally express"]] },
      { marks: 1, label: "→ high signal-to-noise, specific readout attributable to the introduced pathway", patterns: [["signal to noise"], ["specific"], ["attributable"], ["clean"]] },
    ],
    modelAnswer: "Because cells don't normally express these (often non-mammalian) reporters, background signal is essentially zero, giving a very high signal-to-noise ratio and a clean, specific readout attributable to the introduced pathway.",
    modelExpanded: "Because cells do not normally express these (often non-mammalian) reporters, background expression is essentially zero. This gives a very high signal-to-noise ratio and a specific, clean readout that can be attributed unambiguously to the introduced target pathway rather than to endogenous activity.",
  },
  {
    id: "saq-b3-5", topic: "B3 · Methods in Drug Discovery", lecture: "L04", source: "core",
    type: "saq", marks: 4,
    question: "Outline the steps in reverse pharmacology used to identify a ligand for an orphan GPCR. (4 marks)",
    markScheme: [
      { marks: 1, label: "Express the orphan GPCR in a cell line with compatible G-protein machinery", patterns: [["express", "cell line"], ["heterologous", "express"], ["transfect", "receptor"]] },
      { marks: 1, label: "Build a functional assay (reporter, Ca²⁺ flux, second messenger) around those cells", patterns: [["functional assay"], ["reporter"], ["calcium", "flux"], ["second messenger"]] },
      { marks: 1, label: "Screen known endogenous ligands of related receptors against the assay", patterns: [["endogenous ligand"], ["known ligand"], ["screen", "ligand"]] },
      { marks: 1, label: "If no hit, fractionate/purify tissue extracts to fish out the activating molecule", patterns: [["tissue extract"], ["fractionat"], ["purif"], ["fishing"]] },
    ],
    modelAnswer: "Express the orphan GPCR in a cell line with the right G-protein machinery, build a functional assay (reporter, Ca²⁺ flux or second-messenger readout) around it, screen known endogenous ligands of related receptors, and — if none activate it — fractionate and purify tissue extracts to identify the activating molecule.",
    modelExpanded: "Reverse pharmacology starts from a known receptor and works back to its ligand. The orphan GPCR is expressed in a heterologous cell line containing compatible G-protein machinery. A functional assay (reporter gene, fluorescent Ca²⁺ indicator or second-messenger readout) is built around those cells. A panel of endogenous ligands of related receptors (ACh, glutamate, GABA, noradrenaline, serotonin, dopamine, etc.) is screened. If none activate the receptor, 'fishing expeditions' are performed: extracts from tissues that express the receptor are assayed and progressively fractionated and purified until the active molecule is isolated and identified.",
  },
  {
    id: "saq-b3-6a", topic: "B3 · Methods in Drug Discovery", lecture: "L04", source: "2024",
    type: "saq", marks: 4,
    question: "Explain how the development of recombinant proteins has revolutionised the treatment of certain diseases. (4 marks)",
    markScheme: [
      { marks: 1, label: "Allow large-scale production of human proteins previously scarce/animal-sourced", patterns: [["large scale", "production"], ["previously", "animal"], ["scarce"], ["unlimited supply"]] },
      { marks: 1, label: "Provide exact human sequence → lower immunogenicity / fewer reactions than animal-derived", patterns: [["human sequence"], ["lower immunogenicity"], ["less", "immune"], ["fewer", "reaction"]] },
      { marks: 1, label: "Enable replacement of a missing/deficient protein (replacement therapy) for previously untreatable disease", patterns: [["replacement therapy"], ["replace", "missing"], ["deficient protein"]] },
      { marks: 1, label: "Safer (no contamination risk e.g. CJD/HIV from pooled human/animal sources)", patterns: [["contamination"], ["cjd"], ["hiv"], ["safer", "supply"], ["pooled"]] },
    ],
    modelAnswer: "Recombinant proteins allow large-scale production of exact human-sequence proteins that were previously scarce or animal-derived, lowering immunogenicity, enabling replacement therapy for previously untreatable deficiencies, and removing contamination risks (e.g. CJD from cadaveric GH, HIV/hepatitis from pooled blood factors).",
    modelExpanded: "Recombinant DNA technology lets human proteins be produced at scale in cultured cells, revolutionising treatment by: providing an essentially unlimited, consistent supply of proteins that were previously scarce or extracted from animals/cadavers; using the exact human sequence so immunogenicity is lower and efficacy higher; enabling protein-replacement therapy for previously untreatable conditions; and removing the contamination risks (e.g. CJD from cadaveric growth hormone, HIV/hepatitis from pooled blood factor concentrates).",
  },
  {
    id: "saq-b3-6b", topic: "B3 · Methods in Drug Discovery", lecture: "L04", source: "2024",
    type: "saq", marks: 3,
    question: "Give THREE examples of recombinant proteins used as drugs and the conditions they treat. (3 marks)",
    markScheme: [
      { marks: 1, label: "Example: recombinant human insulin → diabetes", patterns: [["insulin"]] },
      { marks: 1, label: "Example: human growth hormone → growth hormone deficiency / dwarfism", patterns: [["growth hormone"], ["somatotropin"]] },
      { marks: 1, label: "Example: factor VIII → haemophilia (or EPO → anaemia; any valid)", patterns: [["factor viii"], ["factor 8"], ["erythropoietin"], ["epo"], ["interferon"]] },
    ],
    modelAnswer: "Recombinant human insulin (diabetes), human growth hormone (growth-hormone deficiency/dwarfism) and clotting factor VIII (haemophilia A) — others include erythropoietin (anaemia) and interferons (MS/hepatitis).",
    modelExpanded: "Examples include recombinant human insulin (diabetes), human growth hormone (growth-hormone deficiency), clotting factor VIII (haemophilia A), erythropoietin (anaemia) and interferons (MS/hepatitis). Three named examples each paired with the condition they treat are required.",
  },
  {
    id: "saq-b3-6c", topic: "B3 · Methods in Drug Discovery", lecture: "L04", source: "2024",
    type: "saq", marks: 3,
    question: "Give THREE limitations of bacterial expression systems for producing recombinant proteins. (3 marks)",
    markScheme: [
      { marks: 1, label: "Bacteria can't perform post-translational modifications (e.g. glycosylation)", patterns: [["post translational"], ["glycosylation"], ["modification"]] },
      { marks: 1, label: "Incorrect folding / lack of disulphide bonds → inactive protein / inclusion bodies", patterns: [["folding"], ["disulphide"], ["disulfide"], ["inclusion bodies"], ["misfold"]] },
      { marks: 1, label: "Endotoxin contamination / cannot make very large or complex proteins", patterns: [["endotoxin"], ["lipopolysaccharide"], ["large", "protein"], ["complex protein"]] },
    ],
    modelAnswer: "Bacteria cannot perform eukaryotic post-translational modifications (e.g. glycosylation); they often fold complex human proteins incorrectly or fail to form disulphide bonds (giving inactive protein or insoluble inclusion bodies); and they introduce endotoxin (lipopolysaccharide) contamination and struggle with very large or multi-subunit proteins.",
    modelExpanded: "Bacterial (E. coli) expression is limited because bacteria cannot carry out eukaryotic post-translational modifications such as glycosylation; they often fold complex human proteins incorrectly or fail to form disulphide bonds, producing inactive protein or insoluble inclusion bodies; and they introduce endotoxin (lipopolysaccharide) contamination and struggle with very large or multi-subunit proteins — which is why mammalian systems (e.g. CHO cells) are frequently used despite higher cost.",
  },
  {
    id: "saq-b3-7", topic: "B3 · Methods in Drug Discovery", lecture: "L05", source: "core",
    type: "saq", marks: 3,
    question: "List THREE features of a good bioassay and briefly justify each. (3 marks)",
    markScheme: [
      { marks: 1, label: "Sensitive — detects compounds at low concentration so weak hits aren't missed", patterns: ["sensitive", ["low", "concentration"], ["detect", "weak"]] },
      { marks: 1, label: "Specific — discriminates compounds acting on different targets (minimises false positives)", patterns: ["specific", ["different target"], ["false positive"]] },
      { marks: 1, label: "Precise/reproducible — low variability across repeats/operators (accept accurate/efficient)", patterns: ["reproducible", "precise", ["low", "variability"], "accurate", "efficient"] },
    ],
    modelAnswer: "Sensitive (detects activity at low concentration so weak but genuine hits aren't missed), specific (discriminates compounds acting on different targets, minimising false positives), and precise/reproducible (steep, reproducible curves with low variability between repeats and operators). Accept also accurate and efficient/scalable.",
    modelExpanded: "A useful bioassay should be (i) sensitive — detect effects at low concentration so genuine but weak activity isn't missed; (ii) specific — discriminate compounds acting on different targets so the readout reflects the intended biology; (iii) precise/reproducible — concentration–response curves are steep and reproducible across days, preparations and operators. Additional desirable features are accuracy (measured potency reflects true potency) and efficiency (quick, scalable to required throughput — cell-based assays generally outperform tissue/organ assays here).",
  },

  // =====================================================================
  // BLOCK 4 — LEAD DISCOVERY & BIOMARKERS (L06, L07, L08)
  // =====================================================================
  {
    id: "saq-b4-1", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L06", source: "core",
    type: "saq", marks: 3,
    question: "Define active, hit and lead in the lead-generation pipeline. (3 marks)",
    markScheme: [
      { marks: 1, label: "Active = compound showing any effect in a primary biological screen", patterns: [["active", "any effect"], ["active", "primary screen"], ["any", "effect", "screen"]] },
      { marks: 1, label: "Hit = compound showing the desired mechanism (e.g. antagonist/inhibitor)", patterns: [["hit", "desired mechanism"], ["hit", "antagonist"], ["hit", "inhibitor"], ["desired", "mechanism"]] },
      { marks: 1, label: "Lead = a hit amenable to chemical optimisation into a candidate", patterns: [["lead", "optimis"], ["lead", "candidate"], ["amenable", "optimis"]] },
    ],
    modelAnswer: "Active = any compound producing a positive readout in a primary screen (mechanism not necessarily desired). Hit = an active showing the desired mechanism (e.g. antagonism/inhibition). Lead = a hit suitable for chemical optimisation toward a drug candidate.",
    modelExpanded: "An active is any compound that gives a positive readout in a primary biological screen — interaction is confirmed but the mechanism may not be the intended one. A hit is a subset of actives that shows the desired pharmacological mechanism, such as receptor antagonism or enzyme inhibition (hits may still have poor drug-like properties). A lead is a hit suitable for chemical optimisation — amenable to structural modification, with appropriate physicochemical properties and no obvious toxicophores — on the path to a candidate drug.",
  },
  {
    id: "saq-b4-2", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L06", source: "core",
    type: "saq", marks: 4,
    question: "State Lipinski's Rule of 5 and what it predicts. (4 marks)",
    markScheme: [
      { marks: 1, label: "≤5 hydrogen-bond donors", patterns: [["5", "donor"], ["hydrogen bond donor"]] },
      { marks: 1, label: "≤10 hydrogen-bond acceptors", patterns: [["10", "acceptor"], ["hydrogen bond acceptor"]] },
      { marks: 1, label: "Molecular mass < 500 Da", patterns: [["500"], ["molecular", "mass"], ["mw"]] },
      { marks: 1, label: "logP < 5; breaking ≥2 rules predicts poor oral absorption/permeability", patterns: [["logp"], ["partition coefficient"], ["poor", "absorption"], ["oral", "absorption"]] },
    ],
    modelAnswer: "≤5 H-bond donors, ≤10 H-bond acceptors, molecular mass <500 Da, and logP <5. Compounds breaking two or more rules are likely to have poor oral absorption/permeability — it is a guide to oral bioavailability, not an absolute.",
    modelExpanded: "Lipinski's Rule of 5 is an empirical guide to oral bioavailability based on physicochemical properties: ≤5 hydrogen-bond donors (OH/NH), ≤10 hydrogen-bond acceptors (N/O), molecular mass <500 Da, and logP <5. Compounds breaking two or more rules tend to have poor absorption or permeability. They are guidelines, not absolutes, and apply less well to biologics, transporter substrates and other special classes.",
  },
  {
    id: "saq-b4-3", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L07", source: "core",
    type: "saq", marks: 4,
    question: "List FOUR properties defined in a Candidate Drug Target Profile (CDTP) and briefly justify each. (4 marks)",
    markScheme: [
      { marks: 1, label: "Potency against target (nM–low µM) — supports lower doses, less off-target burden", patterns: ["potency", ["nm"], ["low dose"]] },
      { marks: 1, label: "Selectivity (e.g. ≥10-fold window) — reduces on/off-target toxicity", patterns: ["selectivity", ["fold"], ["window"]] },
      { marks: 1, label: "Pharmacokinetics (F, t½, protein binding) — supports an acceptable dose/schedule", patterns: ["pharmacokinetic", ["bioavailability"], ["half life"], ["protein binding"]] },
      { marks: 1, label: "Safety (no hERG/QT, no major CYP inhibition, no genotoxicity)", patterns: ["herg", ["cyp", "inhibit"], "genotox", ["qt"], "safety"] },
    ],
    modelAnswer: "Potency at the target (nM range — supports low doses), selectivity (a safety window over related targets — limits toxicity), pharmacokinetics (adequate oral F, suitable t½, acceptable protein binding — supports dosing), and safety (no hERG/QT liability, no major CYP inhibition, no genotoxicity). Each ensures the drug works at sensible doses with acceptable safety.",
    modelExpanded: "A CDTP defines the criteria a compound must meet to be nominated as a candidate. Common elements: (1) Potency (nM–10 µM cell assay) so therapeutic doses are reasonable and off-target exposure is low; (2) Selectivity (≥10-fold over related targets) to limit on/off-target toxicity; (3) Pharmacokinetics (oral F >~20%, t½ ~8–12 h, plasma protein binding <80%) so adequate free drug reaches the target on a workable schedule; (4) Safety — no QT prolongation/hERG liability, no major CYP3A4/2D6 inhibition, no genotoxicity (clean AMES/micronucleus). The CDTP also covers patent position, scale-up, formulation and route of administration.",
  },
  {
    id: "saq-b4-4a", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L07", source: "2023",
    type: "saq", marks: 5,
    question: "Explain the general principles of how lead optimisation brings effective and safe drugs through to the preclinical stage. (5 marks)",
    markScheme: [
      { marks: 1, label: "Iterative cycles of chemical modification, synthesis, testing (design–make–test–analyse)", patterns: [["iterative"], ["design make test"], ["cycle", "modif"], ["medicinal chem", "modif"]] },
      { marks: 1, label: "Improve potency and selectivity for the target", patterns: [["improve", "potency"], ["increase", "selectivity"], ["potency", "selectivity"]] },
      { marks: 1, label: "Optimise pharmacokinetics / ADME (absorption, half-life, metabolic stability)", patterns: [["pharmacokinetic"], ["adme"], ["metabolic stability"], ["half life"], ["bioavailability"]] },
      { marks: 1, label: "Use SAR (structure–activity relationships) to guide modifications", patterns: [["sar"], ["structure activity"]] },
      { marks: 1, label: "Reduce/remove toxicity and off-target/safety liabilities (e.g. hERG)", patterns: [["reduce", "toxicity"], ["off target"], ["herg"], ["safety", "liability"]] },
    ],
    modelAnswer: "Lead optimisation runs iterative design–make–test–analyse cycles, using SAR to improve potency and selectivity for the target, optimise the ADME/PK profile (absorption, half-life, metabolic stability), and reduce toxicity and off-target (e.g. hERG) liabilities.",
    modelExpanded: "Lead optimisation is an iterative 'design–make–test–analyse' process in which medicinal chemists modify the lead series and biologists test the products, using structure–activity relationships to direct each round. The goals are to improve potency and selectivity for the target, optimise the pharmacokinetic/ADME profile (oral absorption, metabolic stability, half-life), and reduce toxicity and off-target/safety liabilities such as hERG/QT.",
  },
  {
    id: "saq-b4-4b", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L07", source: "2023",
    type: "saq", marks: 5,
    question: "How are decisions made regarding which compounds progress to potential candidate drugs? (5 marks)",
    markScheme: [
      { marks: 1, label: "Assess against the CDTP / target candidate profile criteria", patterns: [["cdtp"], ["candidate", "profile"], ["criteria"], ["target product profile"]] },
      { marks: 1, label: "Balance multiple parameters (potency, PK, safety, selectivity) — multi-parameter optimisation", patterns: [["balance"], ["multi parameter"], ["trade off"], ["compromise"]] },
      { marks: 1, label: "Consider developability: synthesis/scale-up cost, formulation, patentability", patterns: [["scale up"], ["synthesis", "cost"], ["formulation"], ["patent"], ["developability"]] },
      { marks: 1, label: "Use defined go/no-go criteria and a project team / committee decision", patterns: [["go no go"], ["committee"], ["project team"], ["decision", "criteria"]] },
      { marks: 1, label: "Rank/benchmark candidates and select best-in-class against competitors/gold standards", patterns: [["benchmark"], ["rank"], ["gold standard"], ["best in class"], ["compare", "competitor"]] },
    ],
    modelAnswer: "Candidate decisions balance the multiple parameters (potency, PK, safety, selectivity) against the CDTP/target candidate profile and developability (scale-up, formulation, patent). A project team applies defined go/no-go criteria, ranking and benchmarking compounds against competitor and gold-standard drugs to select the best-in-class compound to progress.",
    modelExpanded: "Decisions on which compounds progress to candidate are made against the explicit criteria of the Candidate Drug Target Profile, balancing the competing parameters (potency, PK, safety, selectivity — multi-parameter optimisation) and weighing developability (synthetic route and scale-up cost, formulation, patent position). Defined go/no-go gates are used: compounds are profiled, ranked and benchmarked against competitor compounds and gold standards, and a cross-functional project team or committee selects the best-in-class compound that meets the profile to take into preclinical development.",
  },
  {
    id: "saq-b4-5", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "core",
    type: "saq", marks: 3,
    question: "Define a biomarker and give THREE distinct functional categories with one example each. (3 marks)",
    markScheme: [
      { marks: 1, label: "An objectively measured indicator of normal biology, disease or drug response", patterns: [["objectively", "measur"], ["indicator"], ["quantifiable"]] },
      { marks: 1, label: "Diagnostic (e.g. troponin in MI) or susceptibility/prognostic example", patterns: ["diagnostic", "troponin", "prognostic", "susceptibility"] },
      { marks: 1, label: "Pharmacodynamic/response (e.g. cAMP) or safety (e.g. hERG/QT, ALT)", patterns: [["pharmacodynamic"], ["camp"], ["safety", "biomarker"], ["herg"], ["alt"]] },
    ],
    modelAnswer: "A biomarker is a characteristic that is objectively measured as an indicator of normal biology, a pathogenic process, or response to a drug. Categories include diagnostic (e.g. troponin in MI), pharmacodynamic/response (e.g. cAMP for a GPCR drug) and safety (e.g. hERG/QT or raised ALT) — others are predictive, prognostic and susceptibility.",
    modelExpanded: "A biomarker is a characteristic that is objectively measured and evaluated as an indicator of normal biology, pathogenic processes or response to a therapeutic intervention. Functional categories include: diagnostic (confirms disease, e.g. troponin); susceptibility/risk (e.g. BRCA1/2); predictive (identifies likely responders, e.g. HER2 for trastuzumab); prognostic (predicts course); pharmacodynamic/response (drug effect, e.g. cAMP); monitoring; and safety (predicts toxicity, e.g. hERG/QT, ALT for hepatotoxicity).",
  },
  {
    id: "saq-b4-6a", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "2023",
    type: "saq", marks: 2,
    question: "What is the definition of a biomarker? (2 marks)",
    markScheme: [
      { marks: 1, label: "Objectively measured/quantifiable characteristic…", patterns: [["objectively measured"], ["quantifiable"], ["measured", "evaluated"]] },
      { marks: 1, label: "…indicator of normal biology, disease or response to treatment", patterns: [["indicator"], ["normal", "patholog"], ["response", "treatment"]] },
    ],
    modelAnswer: "A biomarker is an objectively measured, quantifiable characteristic that acts as an indicator of normal biology, a pathogenic process or a response to treatment.",
    modelExpanded: "A biomarker is a characteristic objectively measured and evaluated as an indicator of normal biology, a pathogenic process or a response to a therapeutic intervention.",
  },
  {
    id: "saq-b4-6b", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "2023",
    type: "saq", marks: 2,
    question: "What is the difference between predictive and prognostic biomarkers? (2 marks)",
    markScheme: [
      { marks: 1, label: "Predictive: identifies who will respond to a treatment (predicts treatment effect)", patterns: [["predictive", "respond"], ["likely responder"], ["predict", "treatment effect"]] },
      { marks: 1, label: "Prognostic: predicts disease course/outcome regardless of treatment", patterns: [["prognostic", "course"], ["prognostic", "outcome"], ["regardless", "treatment"]] },
    ],
    modelAnswer: "A predictive biomarker identifies who will respond to a particular treatment (it predicts the treatment effect, e.g. HER2 for trastuzumab), whereas a prognostic biomarker predicts the likely disease course/outcome regardless of treatment.",
    modelExpanded: "Predictive and prognostic biomarkers differ in what they forecast: a predictive biomarker identifies patients likely to respond to a specific treatment (it predicts the treatment effect, e.g. HER2 for trastuzumab), whereas a prognostic biomarker predicts the likely course or outcome of the disease irrespective of treatment.",
  },
  {
    id: "saq-b4-6c", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "2023",
    type: "saq", marks: 6,
    question: "Using HIV as an example, explain how surrogate endpoints can be used and what this means. (6 marks)",
    markScheme: [
      { marks: 1, label: "Surrogate endpoint = a biomarker used to substitute for a true clinical endpoint", patterns: [["surrogate", "substitute"], ["surrogate endpoint"], ["substitute", "clinical endpoint"]] },
      { marks: 1, label: "It is expected to predict clinical benefit/harm and is measurable earlier/more easily", patterns: [["predict", "clinical"], ["earlier"], ["more easily"]] },
      { marks: 1, label: "HIV: CD4+ T-cell count is used as a surrogate", patterns: [["cd4"], ["t cell count"]] },
      { marks: 1, label: "HIV: (plasma) viral load is used as a surrogate", patterns: [["viral load"]] },
      { marks: 1, label: "Falling CD4+ / rising viral load correlates with progression to AIDS/death", patterns: [["progression", "aids"], ["correlate", "progression"], ["predict", "aids"]] },
      { marks: 1, label: "Allows efficacy in months rather than years → accelerates drug approval", patterns: [["months", "years"], ["accelerat"], ["faster", "approval"], ["shorten", "trial"]] },
    ],
    modelAnswer: "A surrogate endpoint is a biomarker used to substitute for a true clinical endpoint; it is expected to predict clinical benefit/harm and is measurable earlier or more easily. In HIV, CD4+ T-cell count and plasma viral load are surrogates: falling CD4+/rising viral load correlates with progression to AIDS and death, so antiretroviral efficacy can be judged in months rather than years, accelerating approval.",
    modelExpanded: "A surrogate endpoint is a biomarker used in place of a true clinical endpoint of patient benefit or harm; it must be expected to predict the clinical outcome and is usually measurable earlier or more easily. In HIV, CD4+ T-helper cell counts and (later) plasma viral load were validated as surrogate endpoints — a fall in CD4+ or rise in viral load correlates with and predicts progression to AIDS and death. Using them shortened antiretroviral trials from years (waiting for clinical events) to months, dramatically accelerating approval during the epidemic; the validation burden is high when a biomarker fully substitutes for the clinical endpoint.",
  },
  {
    id: "saq-b4-7a", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "2024",
    type: "saq", marks: 1,
    question: "How are biomarkers used in early drug discovery to identify potential therapeutic targets? (1 mark)",
    markScheme: [
      { marks: 1, label: "Biomarkers (e.g. disease-associated molecules/genes) highlight candidate targets linked to disease", patterns: [["disease associated"], ["highlight", "target"], ["link", "disease"], ["identify", "target"]] },
    ],
    modelAnswer: "Disease-associated biomarkers (molecules or genes that differ between healthy and diseased states) highlight candidate therapeutic targets linked to the disease, because a marker that tracks disease may sit on a causal pathway.",
    modelExpanded: "In early discovery, disease-associated biomarkers (molecules, genes or expression signatures that differ between healthy and diseased states) point to candidate therapeutic targets, because a marker that tracks disease may sit on a causal pathway.",
  },
  {
    id: "saq-b4-7b", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "2024",
    type: "saq", marks: 2,
    question: "List approaches that could be used to identify such biomarkers. (2 marks)",
    markScheme: [
      { marks: 1, label: "Genomic/transcriptomic approaches (GWAS, gene expression, SNP association)", patterns: [["gwas"], ["gene expression"], ["transcriptom"], ["genomic"], ["snp"]] },
      { marks: 1, label: "Proteomic/metabolomic or imaging approaches", patterns: [["proteomic"], ["metabolomic"], ["imaging"], ["mass spectrometry"]] },
    ],
    modelAnswer: "Genomic/transcriptomic approaches (GWAS, differential gene expression, SNP association), and proteomic/metabolomic profiling or imaging (e.g. mass spectrometry).",
    modelExpanded: "Such biomarkers are identified through genomic/transcriptomic methods (GWAS, differential gene expression, SNP association), proteomic and metabolomic profiling (e.g. mass spectrometry), or imaging.",
  },
  {
    id: "saq-b4-7c", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "2024",
    type: "saq", marks: 3,
    question: "What role do pharmacodynamic biomarkers play across in vitro, animal in vivo and clinical testing? (3 marks)",
    markScheme: [
      { marks: 1, label: "PD biomarker shows the drug has produced its biological/mechanistic effect", patterns: [["biological effect"], ["mechanism", "effect"], ["target engagement"], ["proof of mechanism"]] },
      { marks: 1, label: "Provides a translatable readout from in vitro → animal → human", patterns: [["translat"], ["in vitro", "in vivo", "clinical"], ["bridge", "species"]] },
      { marks: 1, label: "Informs dose selection / confirms exposure–response across the stages", patterns: [["dose", "select"], ["exposure response"], ["confirm", "dose"]] },
    ],
    modelAnswer: "A pharmacodynamic biomarker shows the drug has engaged its target and produced the expected biological effect; measuring the same PD marker in vitro, in animal in vivo studies and in clinical testing gives a translatable readout that confirms mechanism across species and informs dose selection/exposure–response.",
    modelExpanded: "Pharmacodynamic biomarkers report that a drug has engaged its target and produced the expected downstream effect; the same PD marker measured in vitro, in animal in vivo studies and in clinical testing provides a translatable thread that confirms mechanism across species and informs dose selection and exposure–response relationships.",
  },
  {
    id: "saq-b4-7d", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "2024",
    type: "saq", marks: 4,
    question: "What challenges are associated with incorporating biomarkers into clinical trials? (4 marks)",
    markScheme: [
      { marks: 1, label: "Challenge: validation — biomarker must be shown to reliably predict the outcome", patterns: [["validat"], ["reliably predict"], ["correlate", "outcome"]] },
      { marks: 1, label: "Challenge: assay standardisation/reproducibility across sites", patterns: [["standardis"], ["reproducib"], ["assay", "consistent"], ["across", "site"]] },
      { marks: 1, label: "Challenge: invasiveness/cost/practicality of sampling (e.g. biopsy, PET)", patterns: [["invasive"], ["cost"], ["biopsy"], ["pet"], ["practical"]] },
      { marks: 1, label: "Challenge: population variability / may not translate to clinical benefit", patterns: [["variability"], ["population", "differ"], ["not", "translate"], ["may not", "benefit"]] },
    ],
    modelAnswer: "The biomarker must be rigorously validated to show it reliably predicts the clinical outcome; assays must be standardised and reproducible across trial sites; sampling can be invasive, expensive or impractical (e.g. repeat biopsies, PET); and inter-patient variability — or a marker that correlates with but doesn't cause the outcome — can mean it fails to translate into demonstrable patient benefit.",
    modelExpanded: "Incorporating biomarkers into clinical trials is challenging: the biomarker must be rigorously validated to show it reliably predicts the clinical outcome; assays must be standardised and reproducible across multiple trial sites; sampling can be invasive, expensive or impractical (e.g. repeat biopsies or PET scans); and inter-patient variability — or a marker that correlates with but does not actually cause the clinical outcome — can mean the biomarker fails to translate into demonstrable patient benefit.",
  },
  {
    id: "saq-b4-8", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "core",
    type: "saq", marks: 4,
    question: "Critique the TGN1412 disaster from a biomarker / preclinical-model perspective. (4 marks)",
    markScheme: [
      { marks: 1, label: "TGN1412 was an anti-CD28 superagonist mAb intended to expand T-regulatory cells", patterns: [["cd28"], ["superagonist"], ["t reg"], ["regulatory t"]] },
      { marks: 1, label: "Macaques shared CD28 sequence (100% homology) so were chosen as the model", patterns: [["macaque"], ["homology"], ["sequence", "same"], ["cynomolgus"]] },
      { marks: 1, label: "But macaques don't express CD28 on CD4+ effector memory T cells (the human cytokine source)", patterns: [["effector memory"], ["not express", "cd28"], ["cd4", "memory"]] },
      { marks: 1, label: "So animal biomarkers missed the human cytokine-release syndrome — markers must reflect conserved biology in the relevant cells", patterns: [["cytokine release"], ["cytokine storm"], ["conserved", "biolog"], ["relevant cell"]] },
    ],
    modelAnswer: "TGN1412 was an anti-CD28 superagonist mAb meant to expand T-regs. Cynomolgus macaques were chosen because they share 100% CD28 sequence homology, but unlike humans they don't express CD28 on CD4+ effector memory T cells — the cells driving the human cytokine release. So the animal safety/PD biomarkers failed to predict the catastrophic cytokine-release syndrome, showing a translatable biomarker must reflect biology conserved in the relevant cell types, not just sequence homology.",
    modelExpanded: "TGN1412 was a CD28-specific superagonist monoclonal antibody intended to expand T-regulatory cells. In phase 1 (2006) six volunteers developed catastrophic cytokine-release syndrome and multi-organ failure. Preclinical safety had been conducted in cynomolgus macaques on the basis of 100% CD28 extracellular-domain sequence homology and similar tissue binding. The fatal mismatch was that macaques do not express CD28 on CD4+ effector memory T cells — the cells responsible for the human cytokine release — so the preclinical PD/safety biomarkers were not predictive. The episode shows that a translatable biomarker must reflect biology conserved across species in the relevant cell types, not merely sequence-level conservation, and that 'standard' markers may be neither sensitive nor discriminatory for new biology.",
  },

  // =====================================================================
  // BLOCK 5 — PHARMACOKINETICS (L10, L11, L12)
  // =====================================================================
  {
    id: "saq-b5-1", topic: "B5 · Pharmacokinetics", lecture: "L10", source: "2023/2024",
    type: "saq", marks: 3,
    question: "Define the term ‘excipient’. Provide ONE example of a type of excipient and describe its purpose in a medicine. (3 marks)",
    markScheme: [
      { marks: 1, label: "An excipient is a constituent of a medicine other than the active substance", patterns: [["other than", "active"], ["non active"], ["inactive", "ingredient"], ["not", "active ingredient"]] },
      { marks: 1, label: "Names a type: filler/diluent, disintegrant, binder, surfactant, glidant, lubricant, stabiliser, flavour/colour", patterns: ["filler", "diluent", "disintegrant", "binder", "surfactant", "glidant", "lubricant", "stabiliser", "flavour", "colour"] },
      { marks: 1, label: "Describes its purpose (e.g. filler adds bulk; disintegrant breaks up tablet; binder gives strength)", patterns: [["bulk"], ["break", "up"], ["mechanical", "strength"], ["flow"], ["dissolution"], ["shelf life"]] },
    ],
    modelAnswer: "An excipient is any constituent of a medicine other than the active substance. For example, a filler/diluent (e.g. lactose) increases the bulk volume of the tablet so a small dose of active can be handled and dosed accurately. (Other valid: disintegrant breaks up the tablet; binder gives mechanical strength; lubricant reduces friction; stabiliser extends shelf life.)",
    modelExpanded: "An excipient is any constituent of a medicine other than the active pharmaceutical ingredient. Examples and purposes include: fillers/diluents (increase bulk volume so a small mass of active can be dosed accurately); disintegrants (ensure the tablet breaks up into fragments on contact with liquid, aiding dissolution); binders (give granules/tablets mechanical strength); surfactants/wetting agents (improve wettability); glidants (improve powder flow during manufacture); lubricants (reduce friction in tablet formation/ejection); flavouring/colouring agents (improve palatability/appearance); and chemical stabilisers (extend shelf life). Only one example is required, but it must be named and its purpose described.",
  },
  {
    id: "saq-b5-2a", topic: "B5 · Pharmacokinetics", lecture: "L10", source: "2023",
    type: "saq", marks: 1,
    question: "Define bioavailability. (1 mark)",
    markScheme: [
      { marks: 1, label: "Bioavailability = fraction of an administered dose reaching the systemic circulation as intact drug", patterns: [["fraction", "systemic"], ["reach", "circulation"], ["intact drug"]] },
    ],
    modelAnswer: "Bioavailability is the fraction of an administered dose that reaches the systemic circulation as intact drug (for an IV dose, F = 1).",
    modelExpanded: "Bioavailability (F) is the fraction of an administered dose that reaches the systemic circulation as intact drug; for an intravenous dose F = 1.",
  },
  {
    id: "saq-b5-2b", topic: "B5 · Pharmacokinetics", lecture: "L10", source: "2023",
    type: "saq", marks: 1,
    question: "Describe the relationship between particle size and oral bioavailability. (1 mark)",
    markScheme: [
      { marks: 1, label: "Smaller particle size → greater oral bioavailability", patterns: [["smaller", "increase"], ["decrease", "size", "increase"], ["smaller", "bioavailability"]] },
    ],
    modelAnswer: "Smaller particle size gives greater oral bioavailability.",
    modelExpanded: "Oral bioavailability increases as particle size decreases — smaller particles give greater oral bioavailability (because dissolution rate rises with surface area).",
  },
  {
    id: "saq-b5-2c", topic: "B5 · Pharmacokinetics", lecture: "L10", source: "2023",
    type: "saq", marks: 3,
    question: "Explain why it is important to identify the correct particle size when formulating solid tablets. (3 marks)",
    markScheme: [
      { marks: 1, label: "Solid drug must dissolve before it can be absorbed", patterns: [["dissolve", "absorb"], ["must dissolve"]] },
      { marks: 1, label: "Dissolution rate ∝ effective surface area, which is set by particle size", patterns: [["surface area"], ["dissolution rate"], ["noyes whitney"]] },
      { marks: 1, label: "Wrong size → poor/variable absorption (sub-therapeutic or batch-to-batch variation)", patterns: [["sub therapeutic"], ["variable", "absorption"], ["batch"], ["inconsistent"]] },
    ],
    modelAnswer: "A solid drug must dissolve before it can be absorbed, and dissolution rate is proportional to the effective surface area (set by particle size); if particles are too large, dissolution is too slow during the absorption window, giving sub-therapeutic or batch-to-batch-variable exposure.",
    modelExpanded: "Correct particle size matters because solid drug must dissolve in GI fluids before it can cross the mucosa, and the dissolution rate is directly proportional to the effective surface area of drug particles in contact with the fluid (Noyes–Whitney). Particle size therefore controls dissolution rate and, when dissolution is rate-limiting, oral bioavailability: particles that are too large dissolve too slowly during the absorption window and give sub-therapeutic exposure or unpredictable batch-to-batch variability (particles too small can also impair powder flow and tableting).",
  },
  {
    id: "saq-b5-3", topic: "B5 · Pharmacokinetics", lecture: "L10", source: "2023/2024",
    type: "saq", marks: 2,
    question: "What is the benefit of using an enteric coating in some orally administered formulations? (2 marks)",
    markScheme: [
      { marks: 1, label: "Resists low gastric pH but dissolves at the higher pH of the duodenum/small intestine", patterns: [["gastric", "ph"], ["resist", "stomach"], ["dissolve", "duodenum"], ["higher ph"]] },
      { marks: 1, label: "Protects an acid-labile drug from stomach breakdown (or protects the stomach from the drug, e.g. NSAIDs)", patterns: [["protect", "drug"], ["acid labile"], ["protect", "stomach"], ["nsaid"]] },
    ],
    modelAnswer: "An enteric coating resists the low pH of gastric fluid but dissolves at the higher pH of the duodenum, so it protects an acid-labile drug from breakdown in the stomach (or alternatively protects the gastric mucosa from an irritant drug such as an NSAID).",
    modelExpanded: "Enteric (gastro-resistant) coatings are designed to resist dissolution at the low pH of gastric fluid (~1.5–3.5) but to dissolve at the higher pH of the duodenum (~6). This protects an acid-labile drug from breakdown in the stomach, ensuring intact drug reaches the small intestine for absorption, and can also protect the gastric mucosa from a locally irritant drug (e.g. some NSAIDs) by delaying release.",
  },
  {
    id: "saq-b5-4a", topic: "B5 · Pharmacokinetics", lecture: "L10", source: "2024",
    type: "saq", marks: 2,
    question: "Explain the term apparent volume of distribution, Vd. (2 marks)",
    markScheme: [
      { marks: 1, label: "Vd is the hypothetical volume relating total drug in body to plasma concentration (Vd = Q/Cp)", patterns: [["q", "cp"], ["total", "plasma"], ["hypothetical volume"], ["amount", "concentration"]] },
      { marks: 1, label: "It is not a real physiological volume — reflects tissue vs plasma affinity", patterns: [["not", "real"], ["not", "physiolog"], ["tissue", "plasma", "affinity"], ["apparent"]] },
    ],
    modelAnswer: "Vd is the hypothetical volume into which the total amount of drug in the body would need to be distributed to give the observed plasma concentration (Vd = Q/Cp). It is not a real physiological volume — it reflects the drug's relative affinity for tissues versus plasma.",
    modelExpanded: "The apparent volume of distribution (Vd) is the hypothetical volume that would contain the total amount of drug in the body (Q, mg) at the concentration observed in plasma (Cp, mg/L): Vd = Q/Cp. It is not a real anatomical volume; it reflects the relative affinity of the drug for tissues versus plasma.",
  },
  {
    id: "saq-b5-4b", topic: "B5 · Pharmacokinetics", lecture: "L10", source: "2024",
    type: "saq", marks: 2,
    question: "State THREE factors that affect a drug's Vd and why. (2 marks)",
    markScheme: [
      { marks: 1, label: "Lipid solubility (↑ raises Vd) / tissue binding (↑ raises Vd)", patterns: [["lipid", "solub"], ["lipophil"], ["tissue binding"]] },
      { marks: 1, label: "Plasma protein binding (↑ lowers Vd) [accept size, ionisation, perfusion, BBB]", patterns: [["plasma protein binding"], ["protein binding"], ["ionisation"], ["perfusion"], ["bbb"]] },
    ],
    modelAnswer: "High lipid solubility and strong tissue binding raise Vd (drug partitions out of plasma into tissues); high plasma protein binding lowers Vd (drug is held in the vascular space). Other factors: molecular size, ionisation, tissue perfusion and barriers such as the BBB.",
    modelExpanded: "Factors raising Vd: high lipid solubility (partitioning into adipose/membranes) and strong tissue binding. Factors lowering Vd: strong plasma-protein binding (which holds drug in the vascular space). Other influences include molecular size, ionisation/pH partitioning, tissue perfusion and barriers such as the BBB. (Drugs tightly bound to plasma proteins, e.g. warfarin, have low Vd; highly lipophilic drugs, e.g. imipramine, have Vd far above total body water.)",
  },
  {
    id: "saq-b5-5", topic: "B5 · Pharmacokinetics", lecture: "L11", source: "core",
    type: "saq", marks: 3,
    question: "Compare zero-order and first-order elimination kinetics. (3 marks)",
    markScheme: [
      { marks: 1, label: "Zero-order: constant AMOUNT eliminated per unit time, independent of concentration (saturated)", patterns: [["zero order", "constant amount"], ["constant amount"], ["saturat"], ["independent", "concentration"]] },
      { marks: 1, label: "First-order: constant FRACTION per unit time; rate ∝ plasma concentration (most drugs)", patterns: [["first order", "fraction"], ["constant fraction"], ["proportional", "concentration"]] },
      { marks: 1, label: "Half-life constant only for first-order; e.g. ethanol/high-dose phenytoin are zero-order", patterns: [["half life", "constant"], ["ethanol"], ["phenytoin"], ["alcohol"]] },
    ],
    modelAnswer: "Zero-order elimination removes a constant amount of drug per unit time regardless of concentration (occurs when the pathway is saturated, e.g. ethanol, high-dose phenytoin). First-order elimination removes a constant fraction per unit time, with rate proportional to plasma concentration (most drugs). Half-life is constant only for first-order kinetics.",
    modelExpanded: "Zero-order elimination removes a constant amount of drug per unit time regardless of plasma concentration; it occurs when the elimination pathway (usually an enzyme) is saturated at clinical concentrations — ethanol and high-dose phenytoin are classic examples, and the concentration–time plot is linear on linear axes. First-order elimination removes a constant fraction per unit time, so rate is proportional to plasma concentration and half-life is a constant of the system; on a log-concentration vs time plot first-order elimination gives a straight line. First-order is by far the more common behaviour.",
  },
  {
    id: "saq-b5-6", topic: "B5 · Pharmacokinetics", lecture: "L11", source: "core",
    type: "saq", marks: 3,
    question: "Distinguish Phase I and Phase II drug-metabolising reactions. (3 marks)",
    markScheme: [
      { marks: 1, label: "Phase I = functionalisation (oxidation/reduction/hydrolysis), often CYP450, creates polar groups", patterns: [["functionalisation"], ["oxidation"], ["cyp"], ["phase i", "polar"]] },
      { marks: 1, label: "Phase II = conjugation (glucuronidation, sulphation, glutathione…) attaching a polar moiety", patterns: [["conjugation"], ["glucuronid"], ["sulphation"], ["glutathione"]] },
      { marks: 1, label: "Net effect: convert lipophilic drugs to water-soluble (usually inactive) metabolites for excretion", patterns: [["water soluble"], ["excret"], ["inactive metabolite"], ["lipophilic", "soluble"]] },
    ],
    modelAnswer: "Phase I reactions are functionalisation steps (oxidation, reduction, hydrolysis — often CYP450-mediated) that create or unmask polar groups. Phase II reactions are conjugations (glucuronidation, sulphation, glutathione, etc.) that attach a polar moiety. Together they convert lipid-soluble drugs into water-soluble, generally inactive metabolites for excretion.",
    modelExpanded: "Phase I reactions are functionalisation steps — oxidation (typically CYP450), reduction, hydrolysis or hydration — that create or unmask polar functional groups (–OH, –NH₂, –SH, –COOH), making the molecule slightly more water-soluble and preparing it for Phase II. Phase II reactions are conjugations, attaching polar moieties (glucuronic acid, sulphate, glutathione, amino acids, acetyl) to a functional handle; products are higher-MW, more water-soluble and generally inactive, ready for excretion in urine or bile. The phases may proceed sequentially or independently. Outcomes include inactivation (paracetamol), prodrug activation (codeine → morphine), and occasionally formation of reactive/toxic metabolites.",
  },
  {
    id: "saq-b5-7", topic: "B5 · Pharmacokinetics", lecture: "L11", source: "core",
    type: "saq", marks: 4,
    question: "Describe the microsomal stability assay and what its output tells the medicinal chemist. (4 marks)",
    markScheme: [
      { marks: 1, label: "Incubate test compound with liver microsomes + cofactors (NADPH for Phase I) at 37 °C", patterns: [["microsome"], ["nadph"], ["liver", "incubat"], ["37"]] },
      { marks: 1, label: "Remove aliquots over time and quench with acetonitrile to stop the reaction", patterns: [["aliquot"], ["time point"], ["quench"], ["acetonitrile"], ["stop", "reaction"]] },
      { marks: 1, label: "Analyse remaining parent compound by LC/MS", patterns: [["lc ms"], ["mass spectrometry"], ["liquid chromatography"], ["remaining", "parent"]] },
      { marks: 1, label: "Output: intrinsic clearance / in vitro t½ → flags metabolic instability for redesign", patterns: [["intrinsic clearance"], ["in vitro", "half life"], ["metabolic", "instab"], ["soft spot"]] },
    ],
    modelAnswer: "Test compound is incubated with liver microsomes plus cofactors (NADPH for Phase I) at 37 °C; aliquots are removed over time and quenched with acetonitrile, then the remaining parent compound is measured by LC/MS. The decline gives an in vitro half-life/intrinsic clearance — high clearance/short t½ flags metabolic instability and tells the chemist to redesign (block soft spots, swap labile groups).",
    modelExpanded: "Microsomes (from rat or human liver, containing CYP enzymes) are incubated with the test compound at 37 °C in a 96-well plate, with required cofactors added (NADPH for Phase I). Aliquots are removed at multiple time points and quenched with acetonitrile to inactivate the enzymes and precipitate protein; samples are centrifuged and the supernatant analysed by liquid chromatography/mass spectrometry to quantify remaining parent compound. From the decline in parent over time an in vitro half-life and intrinsic clearance (CL_int) are calculated. High CL_int/short t½ indicates metabolic instability and warns the medicinal chemist that the compound needs structural modification — blocking metabolic soft spots, swapping labile groups or adding electron-withdrawing groups — before in vivo PK studies.",
  },
  {
    id: "saq-b5-8", topic: "B5 · Pharmacokinetics", lecture: "L12", source: "core",
    type: "saq", marks: 2,
    question: "Following the ICH guidelines, define the terms pharmacogenomics and pharmacogenetics. (2 marks)",
    markScheme: [
      { marks: 1, label: "Pharmacogenomics = study of variations in DNA AND RNA characteristics related to drug response (broader)", patterns: [["dna", "rna"], ["genomics", "broad"], ["dna and rna"]] },
      { marks: 1, label: "Pharmacogenetics = study of variations in DNA SEQUENCE related to drug response (subset)", patterns: [["dna sequence"], ["sequence", "drug response"], ["subset"]] },
    ],
    modelAnswer: "Pharmacogenomics (PGx) is the study of variations in DNA and RNA characteristics as related to drug response (the broader term). Pharmacogenetics (PGt) is the study of variations in DNA sequence as related to drug response — a subset of pharmacogenomics.",
    modelExpanded: "Under the ICH definitions, pharmacogenomics (PGx) is the study of variations in DNA and RNA characteristics as related to drug response, encompassing germline and somatic sequence variation plus expression/regulatory changes. Pharmacogenetics (PGt) is the narrower subset focused on variations in DNA sequence (germline polymorphisms) as related to drug response. In practice the terms are often used interchangeably, but PGt is narrower.",
  },
  {
    id: "saq-b5-9a", topic: "B5 · Pharmacokinetics", lecture: "L12", source: "2023",
    type: "saq", marks: 2,
    question: "Drug X is metabolised mainly by CYP2D6. The table shows the % dose excreted as parent drug vs main metabolite in 5 volunteers [V1 parent 42.6/metab 37.2; V2 28.9/39.6; V3 52.5/4.4; V4 37.3/42.6; V5 11.2/65.3]. Which volunteer is a likely CYP2D6 poor metaboliser, and why? (2 marks)",
    markScheme: [
      { marks: 1, label: "Poor metaboliser = Volunteer 3 (highest parent, lowest metabolite)", patterns: [["volunteer 3"], ["v3"], ["highest parent"], ["52"]] },
      { marks: 1, label: "Reason: little drug converted to metabolite → reduced CYP2D6 activity", patterns: [["little", "metabolite"], ["low", "metabolite"], ["reduced", "activity"], ["not", "metabolis"]] },
    ],
    modelAnswer: "Volunteer 3 — highest parent (52.5%) and lowest metabolite (4.4%), so very little drug is being converted, indicating reduced CYP2D6 activity (a poor metaboliser).",
    modelExpanded: "Reading the table, Volunteer 3 excretes the most parent drug (52.5%) and the least main metabolite (4.4%), so very little drug is being metabolised — a likely CYP2D6 poor metaboliser with reduced enzyme activity.",
  },
  {
    id: "saq-b5-9b", topic: "B5 · Pharmacokinetics", lecture: "L12", source: "2023",
    type: "saq", marks: 2,
    question: "Drug X is metabolised mainly by CYP2D6. The table shows the % dose excreted as parent drug vs main metabolite in 5 volunteers [V1 parent 42.6/metab 37.2; V2 28.9/39.6; V3 52.5/4.4; V4 37.3/42.6; V5 11.2/65.3]. Which volunteer is a likely rapid metaboliser, and why? (2 marks)",
    markScheme: [
      { marks: 1, label: "Rapid metaboliser = Volunteer 5 (lowest parent, highest metabolite)", patterns: [["volunteer 5"], ["v5"], ["lowest parent"], ["65"]] },
      { marks: 1, label: "Reason: most drug converted to metabolite → high CYP2D6 activity", patterns: [["most", "metabolite"], ["high", "metabolite"], ["rapid", "convert"], ["high", "activity"]] },
    ],
    modelAnswer: "Volunteer 5 — lowest parent (11.2%) and highest metabolite (65.3%), so almost all the drug is being converted, indicating high CYP2D6 activity (a rapid/ultra-rapid metaboliser).",
    modelExpanded: "Volunteer 5 excretes the least parent (11.2%) and the most metabolite (65.3%), so almost all the drug is being converted to metabolite — a likely rapid (ultra-rapid) metaboliser with high CYP2D6 activity.",
  },
  {
    id: "saq-b5-9c", topic: "B5 · Pharmacokinetics", lecture: "L12", source: "2023",
    type: "saq", marks: 4,
    question: "Drug X is metabolised mainly by CYP2D6. The table shows the % dose excreted as parent drug vs main metabolite in 5 volunteers [V1 parent 42.6/metab 37.2; V2 28.9/39.6; V3 52.5/4.4; V4 37.3/42.6; V5 11.2/65.3]. Assuming Drug X is the active drug, for which volunteer is efficacy likely poor, and what dosing changes would you make and why? (4 marks)",
    markScheme: [
      { marks: 1, label: "If Drug X is the ACTIVE drug, the rapid metaboliser (V5) has poor efficacy (drug cleared too fast)", patterns: [["rapid", "poor efficacy"], ["v5", "efficacy"], ["cleared", "fast"], ["active", "rapid"]] },
      { marks: 1, label: "Justification: rapid conversion → low parent exposure → sub-therapeutic", patterns: [["sub therapeutic"], ["low", "exposure"], ["low parent"], ["too low"]] },
      { marks: 1, label: "Change: increase dose and/or dosing frequency for the rapid metaboliser", patterns: [["increase dose"], ["higher dose"], ["more frequent"], ["increase frequency"]] },
      { marks: 1, label: "Reason: restores adequate plasma concentration / therapeutic exposure", patterns: [["adequate", "concentration"], ["restore", "exposure"], ["therapeutic", "level"]] },
    ],
    modelAnswer: "If Drug X is the active species, efficacy is likely poor in the rapid metaboliser (Volunteer 5): rapid conversion gives low parent-drug exposure, which is sub-therapeutic. I would increase the dose and/or dosing frequency for V5 to restore adequate plasma concentrations and therapeutic effect.",
    modelExpanded: "If Drug X itself is the pharmacologically active species, the rapid metaboliser (V5) is most likely to have poor efficacy, because the drug is cleared so quickly that parent-drug exposure is sub-therapeutic. To compensate, the dose and/or dosing frequency should be increased for that patient to restore adequate plasma concentrations and therapeutic effect. (Conversely, if Drug X were a prodrug activated by CYP2D6, the poor metaboliser would lack efficacy and the rapid metaboliser would be at risk of toxicity.)",
  },
  {
    id: "saq-b5-10", topic: "B5 · Pharmacokinetics", lecture: "L12", source: "core",
    type: "saq", marks: 3,
    question: "Describe the clinical significance of HLA-B*57:01 in abacavir use. (3 marks)",
    markScheme: [
      { marks: 1, label: "HLA-B*57:01 is strongly associated with abacavir hypersensitivity syndrome", patterns: [["hla", "57"], ["hypersensitivity"], ["abacavir", "reaction"]] },
      { marks: 1, label: "Pre-prescription genotyping identifies carriers (shown in an RCT to eliminate confirmed reactions)", patterns: [["genotyp"], ["screen", "before"], ["pre", "prescription"], ["rct"]] },
      { marks: 1, label: "Abacavir is contraindicated in carriers — a key example of translational pharmacogenetics", patterns: [["contraindicated"], ["avoid", "carrier"], ["not", "prescribe"], ["translational"]] },
    ],
    modelAnswer: "HLA-B*57:01 is strongly associated with abacavir hypersensitivity syndrome. Pre-prescription genotyping identifies carriers (a randomised trial showed excluding carriers eliminated confirmed reactions), so abacavir is contraindicated in HLA-B*57:01-positive patients — a leading example of translational pharmacogenetics in routine NHS practice.",
    modelExpanded: "HLA-B*57:01 is a class I MHC allele strongly associated with abacavir hypersensitivity syndrome (AHS), a severe immune-mediated reaction. A randomised controlled trial showed that excluding HLA-B*57:01 carriers from abacavir treatment completely eliminated immunologically confirmed AHS. Consequently abacavir is contraindicated in HLA-B*57:01-positive patients, and routine pre-prescription genotyping has been standard NHS practice for over a decade — widely cited as the best example of translational, cost-effective pharmacogenetics in current clinical use.",
  },

  // =====================================================================
  // BLOCK 6 — PRECLINICAL & SAFETY (L13, L14)
  // =====================================================================
  {
    id: "saq-b6-1", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "core",
    type: "saq", marks: 3,
    question: "State the 3Rs of animal research and give a practical example of each. (3 marks)",
    markScheme: [
      { marks: 1, label: "Replacement — use a non-animal alternative (e.g. AMES test, cell lines, modelling)", patterns: [["replacement"], ["ames"], ["cell line"], ["non animal"], ["in vitro", "alternative"]] },
      { marks: 1, label: "Reduction — minimum number of animals (better stats, imaging, data sharing)", patterns: [["reduction"], ["minimum number"], ["fewer animal"], ["statistic"]] },
      { marks: 1, label: "Refinement — minimise pain/suffering (analgesia, training, enrichment)", patterns: [["refinement"], ["analgesia"], ["training"], ["enrichment"], ["minimise", "suffering"]] },
    ],
    modelAnswer: "Replacement — using a non-animal alternative where possible (e.g. the AMES test, cell lines, computer modelling). Reduction — using the minimum number of animals (e.g. better statistical design, imaging that allows repeat measures, data sharing). Refinement — minimising pain, suffering and distress (e.g. analgesia/anaesthesia, training animals to cooperate, environmental enrichment).",
    modelExpanded: "The 3Rs (Russell & Burch, 1959) are: (1) Replacement — using non-animal alternatives: absolute (computer modelling, in vitro methods such as the AMES test, human volunteers) or relative (cell lines, abattoir material, invertebrates); (2) Reduction — using the smallest number of animals consistent with experimental design, via better statistics, imaging that permits within-animal repeat measures, and sharing data/resources; (3) Refinement — minimising pain, suffering and distress using non-invasive techniques, appropriate anaesthesia/analgesia, training animals to cooperate (e.g. blood sampling), and enriching housing.",
  },
  {
    id: "saq-b6-2a", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "2024",
    type: "saq", marks: 3,
    question: "Outline THREE permissible purposes for an animal Project Licence. (3 marks)",
    markScheme: [
      { marks: 1, label: "Purpose: basic/translational research into normal or abnormal biology/disease", patterns: [["basic research"], ["translational"], ["disease", "research"], ["understand", "biology"]] },
      { marks: 1, label: "Purpose: development/testing of drugs, treatments, devices (improving health)", patterns: [["development", "drug"], ["treatment"], ["test", "drug"], ["medicine"]] },
      { marks: 1, label: "Purpose: protection of the environment / education & training / forensic enquiry (any valid)", patterns: [["environment"], ["education"], ["training", "purpose"], ["forensic"], ["species preservation"]] },
    ],
    modelAnswer: "Permissible purposes include: basic/translational research into normal or abnormal biology and disease; development and testing of drugs, treatments or devices to improve health; and protection of the environment, education/training, species preservation or forensic enquiry.",
    modelExpanded: "Under ASPA 1986 a project licence may only be granted for permissible purposes, which include: basic research to understand normal or abnormal structure/function; translational/applied research for the prevention, diagnosis or treatment of disease; development, manufacture or testing of drugs, foodstuffs and devices; protection of the natural environment; preservation of species; higher education and training; and forensic enquiry.",
  },
  {
    id: "saq-b6-2b", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "2024",
    type: "saq", marks: 6,
    question: "Name and briefly outline each of the 3Rs. (6 marks)",
    markScheme: [
      { marks: 1, label: "Replacement — defined", patterns: [["replacement"]] },
      { marks: 1, label: "Replacement — example/explanation (non-animal alternative)", patterns: [["non animal"], ["in vitro"], ["cell line"], ["model"], ["alternative"]] },
      { marks: 1, label: "Reduction — defined", patterns: [["reduction"]] },
      { marks: 1, label: "Reduction — example/explanation (minimum animals)", patterns: [["minimum"], ["fewer"], ["statistic"], ["imaging"]] },
      { marks: 1, label: "Refinement — defined", patterns: [["refinement"]] },
      { marks: 1, label: "Refinement — example/explanation (reduce suffering)", patterns: [["suffering"], ["analgesia"], ["enrichment"], ["welfare"], ["pain"]] },
    ],
    modelAnswer: "Replacement — use non-animal alternatives wherever possible (e.g. cell lines, the AMES test, computer modelling). Reduction — use the minimum number of animals consistent with the design (better statistics, imaging that allows repeat measures, data sharing). Refinement — minimise pain, suffering and distress (analgesia/anaesthesia, environmental enrichment, training animals to cooperate).",
    modelExpanded: "The 3Rs are Replacement (use non-animal methods wherever possible — modelling, in vitro assays such as the AMES test, human volunteers), Reduction (use the fewest animals consistent with the design, via robust statistics, imaging that allows repeat measures and data sharing), and Refinement (minimise pain, suffering and distress through analgesia/anaesthesia, environmental enrichment and training animals to cooperate).",
  },
  {
    id: "saq-b6-2c", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "2024",
    type: "saq", marks: 1,
    question: "Training animals to cooperate with procedures (e.g. blood sampling) to reduce stress is an example of which of the 3Rs? (1 mark)",
    markScheme: [
      { marks: 1, label: "Training animals to cooperate = Refinement", patterns: [["refinement"]] },
    ],
    modelAnswer: "Refinement — training an animal to cooperate with blood sampling reduces its stress, so it is an example of Refinement.",
    modelExpanded: "Training an animal to cooperate with a procedure such as blood sampling reduces its pain, suffering and distress, and is therefore an example of Refinement (not Replacement or Reduction).",
  },
  {
    id: "saq-b6-3a", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "2023",
    type: "saq", marks: 1,
    question: "Name the UK regulatory body overseeing animal research. (1 mark)",
    markScheme: [
      { marks: 1, label: "Regulatory body: the Home Office (Animals in Science Regulation Unit)", patterns: [["home office"], ["asru"]] },
    ],
    modelAnswer: "The Home Office (through the Animals in Science Regulation Unit, ASRU).",
    modelExpanded: "In the UK, animal research is regulated by the Home Office, through the Animals in Science Regulation Unit (ASRU), under ASPA 1986.",
  },
  {
    id: "saq-b6-3b", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "2023",
    type: "saq", marks: 1,
    question: "How often must project licence holders report regulated procedures? (1 mark)",
    markScheme: [
      { marks: 1, label: "Report regulated procedures annually (once a year)", patterns: [["annual"], ["once a year"], ["yearly"], ["every year"]] },
    ],
    modelAnswer: "Annually — regulated procedures must be reported once a year.",
    modelExpanded: "Project licence holders must submit a return of the regulated procedures carried out annually (once a year).",
  },
  {
    id: "saq-b6-3c", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "2023",
    type: "saq", marks: 2,
    question: "What is the AWERB and its role? (2 marks)",
    markScheme: [
      { marks: 1, label: "AWERB = Animal Welfare and Ethical Review Body", patterns: [["animal welfare", "ethical review"], ["awerb"]] },
      { marks: 1, label: "AWERB role: promotes welfare/3Rs and provides local ethical review/advice on projects", patterns: [["ethical review"], ["promote", "welfare"], ["3rs"], ["advice", "project"]] },
    ],
    modelAnswer: "The AWERB is the Animal Welfare and Ethical Review Body — a local committee that promotes animal welfare and the 3Rs and provides ethical review and advice on project licence applications.",
    modelExpanded: "The Animal Welfare and Ethical Review Body (AWERB) is a local committee that promotes animal welfare and the application of the 3Rs, provides ethical review and advice on project licence applications, and supports a culture of care.",
  },
  {
    id: "saq-b6-3d", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "2023",
    type: "saq", marks: 4,
    question: "Identify two named officials required for UK animal licences and their roles. (4 marks)",
    markScheme: [
      { marks: 1, label: "Named official 1: NVS (Named Veterinary Surgeon) — provides veterinary care/advice", patterns: [["named veterinary"], ["nvs"], ["veterinary", "care"]] },
      { marks: 1, label: "NVS role correctly described (veterinary advice on health/welfare)", patterns: [["veterinary", "advice"], ["health", "welfare"], ["vet", "care"]] },
      { marks: 1, label: "Named official 2: NACWO — Named Animal Care and Welfare Officer (day-to-day welfare)", patterns: [["nacwo"], ["named animal care"], ["care and welfare"]] },
      { marks: 1, label: "NACWO role correctly described (oversees day-to-day care/welfare) [accept NTCO/NIO]", patterns: [["day to day", "care"], ["oversee", "welfare"], ["ntco"], ["named information"], ["named compliance"]] },
    ],
    modelAnswer: "The Named Veterinary Surgeon (NVS), who provides expert veterinary advice on the health and welfare of the animals; and the Named Animal Care and Welfare Officer (NACWO), who oversees day-to-day animal care and welfare. (Also accept NTCO — training/competency — and NIO — information/compliance.)",
    modelExpanded: "Named officials required at a licensed establishment include the Named Veterinary Surgeon (NVS), who provides expert veterinary advice on the health and welfare of the animals, and the Named Animal Care and Welfare Officer (NACWO), who oversees day-to-day welfare; others are the Named Training and Competency Officer (NTCO) and the Named Information Officer (NIO)/Named Compliance Officer.",
  },
  {
    id: "saq-b6-3e", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "2023",
    type: "saq", marks: 2,
    question: "Name and explain one licence governing animal research in the UK. (2 marks)",
    markScheme: [
      { marks: 1, label: "Names a licence: Project / Personal / Establishment licence", patterns: [["project licence"], ["personal licence"], ["establishment licence"]] },
      { marks: 1, label: "Explains that licence correctly (project=programme; personal=individual; establishment=premises)", patterns: [["programme of work"], ["individual", "carry out"], ["premises"], ["the where"], ["the who"], ["the what"]] },
    ],
    modelAnswer: "The Project licence authorises a specific programme of scientific work (granted only for permissible purposes). (Others: the Personal licence covers the individual carrying out procedures; the Establishment licence covers the premises.)",
    modelExpanded: "Three licences are required under ASPA: the Establishment licence (covers the premises), the Project licence (covers the programme of work, granted only for permissible purposes), and the Personal licence (covers the individual carrying out procedures, after accredited training). Naming and explaining any one is required — e.g. the Project licence authorises a defined programme of scientific work.",
  },
  {
    id: "saq-b6-4", topic: "B6 · Preclinical & Safety", lecture: "L13", source: "core",
    type: "saq", marks: 4,
    question: "What can be achieved ONLY by in vivo studies? Give two specific examples. (4 marks)",
    markScheme: [
      { marks: 1, label: "Whole-body integrated effects / full PK (ADME) in a living system", patterns: [["whole body"], ["integrated"], ["pharmacokinetic"], ["adme"], ["systemic"]] },
      { marks: 1, label: "Long-term effects: chronic toxicity, carcinogenicity, reproductive toxicity", patterns: [["chronic"], ["carcinogen"], ["reproductive"], ["long term"]] },
      { marks: 1, label: "Example: clonidine antihypertensive effect only seen in vivo (vasoconstrictor in vitro)", patterns: [["clonidine"]] },
      { marks: 1, label: "Example: fluconazole modest in vitro but highly effective in vivo (or other valid)", patterns: [["fluconazole"], ["unexpected", "effect"], ["prodrug", "activation"]] },
    ],
    modelAnswer: "Only in vivo studies reveal integrated whole-body effects and the full PK (ADME) profile in a living system, and long-term effects such as chronic toxicity, carcinogenicity and reproductive toxicity. Examples of effects seen only in vivo: clonidine's antihypertensive action (it is a vasoconstrictor in vitro) and fluconazole's strong antifungal efficacy (modest in vitro).",
    modelExpanded: "In vivo studies are essential for questions in vitro models cannot answer: (i) integrated whole-body effects (cardiovascular, respiratory, CNS), because systemic compensation isn't captured by isolated cells/tissues; (ii) long-term effects — chronic toxicity, carcinogenicity (18–24 months) and multi-generational reproductive toxicity; (iii) the full PK profile (absorption, distribution, metabolism, excretion of parent and metabolites); and (iv) unexpected effects. Classic examples: clonidine, whose antihypertensive action was discovered only in vivo (it acts as a vasoconstrictor in vitro), and fluconazole, which shows modest in vitro antifungal activity but is highly efficacious in vivo. In vivo studies also set the clinical starting dose.",
  },
  {
    id: "saq-b6-5a", topic: "B6 · Preclinical & Safety", lecture: "L14", source: "core",
    type: "saq", marks: 2,
    question: "Distinguish hazard from risk with an example. (2 marks)",
    markScheme: [
      { marks: 1, label: "Hazard = intrinsic potential of a substance to cause harm", patterns: [["hazard", "potential"], ["intrinsic", "harm"], ["potential", "cause harm"]] },
      { marks: 1, label: "Risk = likelihood of harm under specific conditions of exposure (dose/route/population)", patterns: [["risk", "likelihood"], ["probability", "harm"], ["conditions", "exposure"]] },
    ],
    modelAnswer: "Hazard is the intrinsic potential of a substance to cause harm; risk is the likelihood of harm under specific conditions of exposure (dose, route, population). For example, a hazardous drug used at a low, controlled exposure carries low risk.",
    modelExpanded: "Hazard describes the intrinsic potential of a substance to cause harm (e.g. cyanide is highly hazardous). Risk is the probability of harm under defined conditions of exposure (dose, route, frequency, population); a highly hazardous compound may carry low clinical risk if exposure is tightly controlled.",
  },
  {
    id: "saq-b6-5b", topic: "B6 · Preclinical & Safety", lecture: "L14", source: "core",
    type: "saq", marks: 3,
    question: "Define therapeutic index, give the formula, and explain why it has limited clinical utility. (3 marks)",
    markScheme: [
      { marks: 1, label: "TI = max non-toxic dose (LD50/TD50) ÷ minimum effective dose (ED50)", patterns: [["ld50", "ed50"], ["td50"], ["lethal", "effective"]] },
      { marks: 1, label: "Large TI suggests a wide safety margin between efficacy and toxicity", patterns: [["safety margin"], ["wide", "window"], ["margin", "efficacy", "toxicity"]] },
      { marks: 1, label: "Limited: animal-derived/population variability; ignores curve slopes & idiosyncratic ADRs (high TI ≠ safe, e.g. thalidomide)", patterns: [["variability"], ["slope"], ["idiosyncratic"], ["thalidomide"], ["animal", "derived"]] },
    ],
    modelAnswer: "Therapeutic index = maximum non-toxic dose (LD50 or TD50) ÷ minimum effective dose (ED50); a large TI suggests a wide safety margin between efficacy and toxicity. Its clinical utility is limited because it is animal-derived (human population variability isn't captured), ignores the slopes of the dose–response curves, and ignores idiosyncratic ADRs — so a high TI (e.g. thalidomide) doesn't guarantee safety.",
    modelExpanded: "The therapeutic index quantifies relative safety as the ratio of the maximum non-toxic dose (often LD50 or TD50) to the minimum effective dose (often ED50); a wide TI suggests a comfortable margin between efficacy and toxicity. It has limited clinical utility because it is derived from a model species (human population variability isn't captured), ignores the slopes of the dose–response curves (a steep tox curve narrows the practical margin), and doesn't address idiosyncratic/off-target ADRs — some low-TI drugs (digoxin, warfarin) remain useful with monitoring, while high-TI drugs (thalidomide) can still cause catastrophic harm.",
  },
  {
    id: "saq-b6-6", topic: "B6 · Preclinical & Safety", lecture: "L14", source: "core",
    type: "saq", marks: 3,
    question: "Describe the principle of the AMES test for mutagenicity. (3 marks)",
    markScheme: [
      { marks: 1, label: "Uses histidine-auxotrophic Salmonella on histidine-free medium ± S9 metabolic activation", patterns: [["histidine"], ["salmonella"], ["auxotroph"], ["s9"]] },
      { marks: 1, label: "Mutagens cause reversion mutations back to histidine prototrophy → visible colonies", patterns: [["reversion"], ["revertant"], ["prototroph"], ["colonies"]] },
      { marks: 1, label: "Mutagenicity ∝ number of revertant colonies; ±S9 distinguishes parent vs metabolite", patterns: [["number", "colonies"], ["proportional", "colonies"], ["s9", "metabolite"]] },
    ],
    modelAnswer: "Histidine-auxotrophic Salmonella are plated on histidine-free medium with the test compound, with and without S9 metabolic activation. Mutagens cause reversion mutations back to histidine prototrophy, so colonies grow on the histidine-free plate; mutagenicity is proportional to the number of revertant colonies, and ±S9 distinguishes parent- from metabolite-induced mutagenicity.",
    modelExpanded: "The AMES test exploits histidine-auxotrophic Salmonella typhimurium strains that cannot grow without histidine. Bacteria are exposed to the test compound, with and without rat liver S9 fraction (to mimic mammalian metabolic activation), and plated on histidine-free agar. A mutagenic compound (or mutagenic metabolite) causes reversion mutations restoring histidine prototrophy, allowing colonies to grow. The number of revertant colonies is proportional to mutagenicity; different tester strains detect different mutation types, and ±S9 distinguishes parent-mediated from metabolite-mediated mutagenicity. It is a recognised absolute replacement for animal genotoxicity screening.",
  },
  {
    id: "saq-b6-7", topic: "B6 · Preclinical & Safety", lecture: "L14", source: "core",
    type: "saq", marks: 4,
    question: "What does the thalidomide tragedy reveal about the limitations of preclinical safety testing? (4 marks)",
    markScheme: [
      { marks: 1, label: "Appeared extremely non-toxic in rodents (LD50 couldn't be established)", patterns: [["non toxic", "rodent"], ["ld50", "could not"], ["appeared", "safe"]] },
      { marks: 1, label: "Teratogenicity not predicted because rodents are insensitive — species choice is critical", patterns: [["species", "critical"], ["rodent", "insensitive"], ["teratogen", "rodent"], ["species", "choice"]] },
      { marks: 1, label: "Teratogenic in rabbits/primates (not rodents) → drove 2-species testing (one non-rodent)", patterns: [["rabbit"], ["primate"], ["two species"], ["non rodent"]] },
      { marks: 1, label: "Stereochemistry/chirality matters (S-enantiomer teratogenic) → enantiomer-by-enantiomer assessment", patterns: [["stereochemistry"], ["enantiomer"], ["chirality"], ["racemic"], ["s isomer"]] },
    ],
    modelAnswer: "Thalidomide appeared so non-toxic in rodents that an LD50 couldn't be established, yet caused severe human limb defects — because rodents are insensitive to its teratogenicity, showing species choice is critical. It is teratogenic in rabbits and primates, which drove the modern requirement for two species (including one non-rodent). It also showed stereochemistry matters (the S-enantiomer is teratogenic), so enantiomers must be assessed individually.",
    modelExpanded: "Thalidomide was marketed in 1957 as a sedative/antiemetic and given to pregnant women; it appeared so non-toxic in rodents that an LD50 could not be established, yet ~12,000 children were born with limb-reduction defects before its 1961 withdrawal. It is teratogenic in zebrafish, chickens, rabbits and monkeys but not rodents, so the rodent-only package failed to predict human risk — demonstrating that species choice is critical. The teratogenic S-enantiomer intercalates DNA at purines in promoters of limb-angiogenesis genes. The lessons reshaped reproductive toxicology: testing now requires one rodent AND one non-rodent species (commonly rabbit), with separate studies across all developmental stages, and attention to chirality (assessing enantiomers separately for efficacy and safety).",
  },

  // =====================================================================
  // BLOCK 7 — PHARMACEUTICAL DEVELOPMENT & CLINICAL EVALUATION
  // =====================================================================
  {
    id: "saq-b7-1", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Pharmaceutical development", source: "core",
    type: "saq", marks: 4,
    question: "Define ‘pharmaceutics’ and outline the objectives of dosage-form design (ensuring product quality). (4 marks)",
    markScheme: [
      { marks: 1, label: "Pharmaceutics = converting a drug into a medicine (adding excipients to make a dosage form)", patterns: [["convert", "medicine"], ["drug into", "medicine"], ["dosage form"]] },
      { marks: 1, label: "Achieve a predictable/reproducible therapeutic response", patterns: [["predictable"], ["reproducible", "response"], ["consistent", "effect"]] },
      { marks: 1, label: "Maintain chemical & physical stability (and protect from microbial contamination)", patterns: [["stability"], ["stable"], ["microbial"], ["preserved"]] },
      { marks: 1, label: "Uniform/accurate dosing, manufacturable at scale, acceptable to the patient", patterns: [["uniform", "dose"], ["accurate", "dose"], ["large scale"], ["acceptab"], ["patient"]] },
    ],
    modelAnswer: "Pharmaceutics is the conversion of a drug (the active ingredient) into a medicine by formulating it with excipients into a dosage form. The objectives of dosage-form design are to achieve a predictable, reproducible therapeutic response; maintain chemical and physical stability (and protect against microbial contamination); ensure uniform, accurate dosing; be manufacturable reproducibly at scale; and be acceptable to prescriber and patient.",
    modelExpanded: "A drug is the pharmacologically active ingredient; pharmaceutics is the process of converting that drug into a medicine. Dosage-form design aims to achieve a predictable therapeutic response from a formulation that can be manufactured at large scale with reproducible quality. Key considerations are: does the product maintain chemical and physical stability (temperature, humidity, light)? does it need preserving against microbial contamination? is the dose of drug uniform and accurate? is it acceptable to users (prescriber and patient)? with suitable packaging and labelling — ideally independent of patient-to-patient variation.",
  },
  {
    id: "saq-b7-2", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Pharmaceutical development", source: "core",
    type: "saq", marks: 4,
    question: "Compare the major routes of administration in terms of their effect on bioavailability and onset of action. (4 marks)",
    markScheme: [
      { marks: 1, label: "IV: 100% bioavailability, fastest onset (seconds) — direct to systemic circulation", patterns: [["intravenous"], ["iv", "100"], ["iv", "fast"], ["direct", "circulation"]] },
      { marks: 1, label: "Oral: most common but variable F (incomplete absorption + first-pass metabolism); slower onset", patterns: [["oral", "first pass"], ["oral", "variable"], ["oral", "absorption"], ["oral", "slow"]] },
      { marks: 1, label: "IM/SC: intermediate onset (minutes); absorption across tissue before systemic", patterns: [["intramuscular"], ["subcutaneous"], ["im", "sc"], ["minutes"]] },
      { marks: 1, label: "Transdermal/inhaled/other: e.g. transdermal bypasses first-pass; inhaled rapid local/systemic", patterns: [["transdermal", "first pass"], ["transdermal"], ["inhal"], ["bypass", "first pass"]] },
    ],
    modelAnswer: "Intravenous gives 100% bioavailability and the fastest onset (seconds) because the drug enters the systemic circulation directly. Oral is the commonest route but has variable bioavailability (incomplete absorption plus first-pass metabolism) and a slower onset. IM/SC injection gives intermediate onset (minutes) as drug is absorbed across tissue first. Transdermal delivery bypasses first-pass metabolism (slow, sustained), while inhaled routes give rapid local/systemic action.",
    modelExpanded: "Route of administration strongly affects both bioavailability (F) and onset. Intravenous injection delivers drug directly into the systemic circulation, so F = 100% and onset is within seconds (used in emergencies). Oral dosing (~70% of products) is convenient but F is reduced and variable because of incomplete absorption and presystemic (first-pass) metabolism in gut wall and liver, and onset is minutes-to-hours. Intramuscular and subcutaneous injections give onset in minutes as drug is absorbed across tissue before reaching the circulation. Transdermal patches give slow, sustained delivery and bypass first-pass metabolism (e.g. fentanyl, GTN, nicotine, HRT); inhaled/respiratory routes give rapid local or systemic effect; rectal, buccal and nasal routes also partly avoid first-pass metabolism.",
  },
  {
    id: "saq-b7-3", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Pharmaceutical development", source: "core",
    type: "saq", marks: 4,
    question: "Explain the rationale for modified-release (e.g. sustained-release) drug-delivery systems and give two design strategies. (4 marks)",
    markScheme: [
      { marks: 1, label: "Maintain plasma concentration within the therapeutic window for longer", patterns: [["therapeutic window"], ["maintain", "concentration"], ["steady", "level"], ["avoid", "peak"]] },
      { marks: 1, label: "Reduce dosing frequency → improve adherence (and reduce side effects from peaks)", patterns: [["dosing frequency"], ["adherence"], ["compliance"], ["fewer doses"], ["reduce", "side effect"]] },
      { marks: 1, label: "Strategy: hydrophilic matrix / diffusion-controlled system (release slowed by matrix)", patterns: [["matrix"], ["diffusion", "control"], ["hydrophilic matrix"]] },
      { marks: 1, label: "Strategy: membrane-controlled / osmotic-pump / reservoir system", patterns: [["membrane", "control"], ["osmotic pump"], ["reservoir"], ["coating", "control"]] },
    ],
    modelAnswer: "Modified-release systems aim to keep the plasma concentration within the therapeutic window for longer and to reduce dosing frequency, improving adherence and reducing peak-related side effects. Design strategies include hydrophilic matrix (diffusion-controlled) systems, where the drug is released slowly from a matrix, and membrane-controlled or osmotic-pump (reservoir) systems, where a rate-controlling membrane or osmotic core governs release.",
    modelExpanded: "Modified-release (sustained/extended/controlled/delayed) delivery aims to maintain plasma drug concentrations within the therapeutic window for an extended period, smoothing out the peaks and troughs of immediate-release dosing. This reduces dosing frequency (improving patient adherence) and can reduce peak-concentration side effects and tissue irritation. Strategies include: hydrophilic matrix systems where drug diffuses slowly out of a swelling polymer matrix (rate-limited by dissolution and diffusion); membrane-controlled (reservoir) systems where release is governed by the thickness/porosity of a coating membrane and aqueous solubility; and osmotic-pump systems where water entry through a membrane pushes drug solution out through a laser-drilled orifice at a controlled rate. The drug needs adequate solubility and permeability for these systems to work.",
  },
  {
    id: "saq-b7-4", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "core",
    type: "saq", marks: 5,
    question: "Compare the phases of clinical drug evaluation (Phase 1–4), stating the participants and main aim of each. (5 marks)",
    markScheme: [
      { marks: 1, label: "Phase 1: small number of healthy volunteers (~25–50); focus on safety + PK, safe dose range", patterns: [["phase 1", "healthy"], ["phase 1", "safety"], ["healthy volunteer"]] },
      { marks: 1, label: "Phase 2: small number of patients (~10–300); first test of efficacy + optimum dose", patterns: [["phase 2", "patient"], ["phase 2", "efficacy"], ["optimum dose"]] },
      { marks: 1, label: "Phase 3: large patient cohort (thousands); confirm efficacy/safety in diverse population, vs comparator", patterns: [["phase 3", "large"], ["phase 3", "thousand"], ["confirm", "efficacy"]] },
      { marks: 1, label: "Phase 4: post-marketing pharmacovigilance; long-term/rare adverse effects in very large population", patterns: [["phase 4", "post market"], ["pharmacovigilance"], ["rare", "adverse"], ["long term", "effect"]] },
      { marks: 1, label: "Phase 1 uses healthy volunteers EXCEPT for severe disease (e.g. cancer) where patients are used", patterns: [["except", "cancer"], ["severe disease", "patient"], ["cancer", "patient"], ["life threatening", "patient"]] },
    ],
    modelAnswer: "Phase 1: ~25–50 healthy volunteers; focus on safety and PK, defining the safe dose range. Phase 2: ~10–300 patients; first test of efficacy and the optimum dose. Phase 3: thousands of patients; confirms efficacy and safety in a larger, diverse population, often versus a comparator. Phase 4: post-marketing pharmacovigilance in very large numbers, detecting rare or long-term adverse effects. (Phase 1 normally uses healthy volunteers, except for severe/life-threatening disease such as cancer, where patients are recruited.)",
    modelExpanded: "Phase 1 is the start of most trials: a small number of healthy volunteers (~25–50) are studied short-term to identify the safe clinical dose range (starting low and escalating until adverse effects appear) and the most frequent/serious adverse effects, with PK measurements (metabolites, oral bioavailability, half-life); ~30% of drugs fail here. Phase 2 is the first test in patients with the target disease (~10–300), determining efficacy and optimum dose and continuing safety monitoring; 65–70% fail. Phase 3 tests a much larger, more diverse patient cohort (thousands) to confirm effectiveness and safety, often against a placebo and/or existing comparator; ~70% fail. Phase 4 is post-marketing pharmacovigilance in very large numbers, detecting rare and long-term adverse effects missed earlier (e.g. retigabine's retinal/tissue discolouration). Phase 0 (optional) uses ~10 volunteers and a sub-therapeutic microdose to check early human PK. Phase 1 uses healthy volunteers except where the drug treats severe/life-threatening disease (e.g. cancer), when patients are recruited.",
  },
  {
    id: "saq-b7-5a", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "2024",
    type: "saq", marks: 3,
    question: "Name and outline ONE type of clinical study. (3 marks)",
    markScheme: [
      { marks: 1, label: "Names a study type (e.g. cohort, case-control, cross-sectional, RCT, crossover)", patterns: ["cohort", "case control", "cross sectional", "randomised controlled", "crossover", "parallel group", "prospective", "retrospective"] },
      { marks: 1, label: "Outlines its design correctly", patterns: [["allocate", "random"], ["group", "share"], ["over time"], ["point in time"], ["control"], ["compare", "group"]] },
      { marks: 1, label: "Outlines its purpose/use or advantage", patterns: [["purpose"], ["used to"], ["advantage"], ["each subject", "control"], ["fewer subject"]] },
    ],
    modelAnswer: "A randomised controlled trial (RCT) allocates subjects randomly to treatment or control groups and compares outcomes against the control; randomisation removes allocation bias, making it the standard for testing the efficacy of a new drug.",
    modelExpanded: "Example study type — a randomised controlled trial randomly allocates subjects to experimental and control groups and compares the drug effect against the control; randomisation removes allocation bias and balances confounders, making it the standard for testing efficacy. (Other valid types: cohort — a group sharing a characteristic followed over time; case-control — comparing groups defined by exposure/treatment; cross-sectional — a snapshot at one time point; crossover — each subject receives all treatments in random order, serving as their own control.)",
  },
  {
    id: "saq-b7-5b", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "2024",
    type: "saq", marks: 1,
    question: "Explain the term ‘blinding’ in clinical trials. (1 mark)",
    markScheme: [
      { marks: 1, label: "Blinding = hiding the treatment allocation from those involved to avoid bias", patterns: [["hide", "treatment"], ["unaware", "treatment"], ["avoid bias"], ["reduce bias"]] },
    ],
    modelAnswer: "Blinding means hiding the treatment allocation from those involved so that knowledge of the treatment cannot bias the result.",
    modelExpanded: "Blinding is concealing the treatment allocation from those involved so that knowledge of the treatment cannot bias the subject's response, the investigator's behaviour or the analysis.",
  },
  {
    id: "saq-b7-5c", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "2024",
    type: "saq", marks: 6,
    question: "Name and briefly outline the THREE main types of blinding. (6 marks)",
    markScheme: [
      { marks: 1, label: "Single blind named", patterns: [["single blind"]] },
      { marks: 1, label: "Single blind: subject unaware of treatment", patterns: [["subject", "unaware"], ["patient", "not know"], ["participant", "blind"]] },
      { marks: 1, label: "Double blind named", patterns: [["double blind"]] },
      { marks: 1, label: "Double blind: subject AND investigator/experimenter unaware", patterns: [["subject", "experimenter"], ["both", "unaware"], ["investigator", "blind"]] },
      { marks: 1, label: "Triple blind named", patterns: [["triple blind"]] },
      { marks: 1, label: "Triple blind: subject, investigator AND data analyst all unaware", patterns: [["data analyst"], ["analyst", "blind"], ["all three", "blind"]] },
    ],
    modelAnswer: "Single blind — the subject is unaware of which treatment they receive; double blind — both the subject and the investigator/experimenter are unaware; triple blind — the subject, the investigator and the data analyst are all unaware of the allocation.",
    modelExpanded: "The three main types are: single blind — the subject is unaware of which treatment they receive; double blind — both the subject and the investigator/experimenter are unaware; triple blind — the subject, the investigator and the data analyst are all blinded to the allocation until the data have been analysed.",
  },
  {
    id: "saq-b7-6", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "core",
    type: "saq", marks: 5,
    question: "Explain the importance of randomisation, blinding, a placebo control and statistical power in a good clinical trial. (5 marks)",
    markScheme: [
      { marks: 1, label: "Randomisation: allocates subjects so each treatment is equally likely — removes allocation bias/balances confounders", patterns: [["random", "bias"], ["random", "confound"], ["equal chance"], ["balance", "group"]] },
      { marks: 1, label: "Blinding: hides allocation to prevent conscious/unconscious bias in response/assessment", patterns: [["blind", "bias"], ["hide", "allocation"], ["unaware"]] },
      { marks: 1, label: "Placebo: controls for natural disease change and the placebo (expectation) effect", patterns: [["placebo", "expect"], ["placebo", "control"], ["sugar pill"], ["natural", "change"]] },
      { marks: 1, label: "Statistical power: probability of detecting a real effect (rejecting a false null)", patterns: [["power", "detect"], ["reject", "null"], ["probability", "real effect"]] },
      { marks: 1, label: "Power increases with sample size and effect size → need enough subjects", patterns: [["sample size"], ["effect size"], ["enough subject"], ["large", "number"]] },
    ],
    modelAnswer: "Randomisation allocates subjects so each treatment is equally likely, removing allocation bias and balancing confounders. Blinding hides the allocation, preventing conscious/unconscious bias in subjects' responses and investigators' assessments. A placebo control accounts for the natural course of disease and the placebo (expectation) effect. Statistical power is the probability of detecting a real effect (rejecting a false null); it increases with sample size and effect size, so enough subjects must be recruited.",
    modelExpanded: "A good trial relies on four statistical safeguards. Randomisation allocates treatments so each subject has an equal chance of any treatment, removing selection bias and balancing confounders (age, sex, weight) across groups; robust (usually computer-generated) methods are essential. Blinding conceals the allocation from subjects and researchers, preventing conscious or unconscious bias in subjects' responses, in how clinicians treat/assess patients, and in data analysis. A placebo control (a dummy resembling the treatment but lacking active drug) accounts for spontaneous changes in disease and the placebo/expectation effect, so improvement can be attributed to the drug. Statistical power is the probability of correctly rejecting a false null hypothesis (detecting a true effect); it rises with sample size and effect size, so a good trial recruits enough subjects to keep false-negative and false-positive rates low (significance typically P<0.05).",
  },
  {
    id: "saq-b7-7", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "core",
    type: "saq", marks: 4,
    question: "Outline the regulatory framework for approving a new drug for marketing in the UK, including the role of NICE. (4 marks)",
    markScheme: [
      { marks: 1, label: "Must complete Phase 3 and submit a New Drug Application / marketing authorisation to the regulator", patterns: [["new drug application"], ["marketing authorisation"], ["phase 3", "complete"], ["submit", "application"]] },
      { marks: 1, label: "Approved by the competent authority — MHRA (UK), EMA (EU), FDA (USA)", patterns: [["mhra"], ["ema"], ["fda"]] },
      { marks: 1, label: "Authority weighs safety/efficacy, benefit vs risk, labelling, manufacturing/QC", patterns: [["benefit", "risk"], ["safe", "effective"], ["labelling"], ["quality control"]] },
      { marks: 1, label: "NICE appraises cost-effectiveness/value (advisory) to guide NHS prescribing", patterns: [["nice", "cost"], ["cost effective"], ["value for money"], ["nice", "guidance"]] },
    ],
    modelAnswer: "A drug must complete a Phase 3 trial and the company submits a New Drug Application (marketing authorisation) to the competent authority — MHRA in the UK (EMA in the EU, FDA in the USA). The authority weighs safety and efficacy, whether benefits outweigh risks, the labelling and the manufacturing/quality-control methods. Once approved, NICE appraises the drug's clinical and cost-effectiveness (an advisory role) to guide NHS prescribing.",
    modelExpanded: "Before marketing, a new drug must have successfully completed a Phase 3 clinical trial; the company then submits a New Drug Application (marketing authorisation) containing all preclinical, PK and clinical data, the full ingredient list and manufacturing/processing/packaging information. Approval is granted by the competent authority — the MHRA in the UK, the EMA in the EU, the FDA in the USA — which asks whether the drug is safe and effective for its intended use, whether benefits outweigh risks, whether the labelling is appropriate, and whether manufacturing and quality-control methods are adequate. Approval allows doctors to prescribe, but in England and Wales the National Institute for Health and Care Excellence (NICE) then appraises effectiveness, comparison with existing medicines, the patient groups who benefit, and cost/value for money; NICE is advisory (it does not regulate approval) but its guidance is closely followed by the NHS (the Scottish Medicines Consortium plays the equivalent role in Scotland).",
  },
  {
    id: "saq-b7-8", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "core",
    type: "saq", marks: 3,
    question: "What is pharmacovigilance (Phase 4) and why is it necessary? Give an example. (3 marks)",
    markScheme: [
      { marks: 1, label: "Ongoing monitoring of a drug's safety after it is marketed", patterns: [["monitor", "safety"], ["after", "market"], ["post market"], ["surveillance"]] },
      { marks: 1, label: "Detects rare/long-term adverse effects missed in smaller earlier trials", patterns: [["rare"], ["long term"], ["missed", "trial"], ["large", "population"]] },
      { marks: 1, label: "Example: retigabine — retinal/tissue (blue-grey) discolouration led to withdrawal", patterns: [["retigabine"], ["retinal"], ["discolour"], ["blue grey"]] },
    ],
    modelAnswer: "Pharmacovigilance is the ongoing monitoring of a drug's safety after it has been marketed and given to far larger numbers of patients. It is necessary to detect rare or long-term adverse effects that earlier, smaller trials would miss. For example, the antiepileptic retigabine was found during pharmacovigilance to cause retinal pigment abnormalities and blue-grey tissue discolouration, leading to its withdrawal.",
    modelExpanded: "Pharmacovigilance (Phase 4) is the continued monitoring of a marketed drug's safety. Once approved, a drug is administered to many more, and more diverse, patients than in trials, increasing the chance of detecting rare adverse reactions or effects of long-term use. Information is gathered from patients, healthcare providers and the literature to monitor adverse drug reactions, involvement in overdose/misuse/abuse, and effects in pregnancy/breastfeeding. A classic example is retigabine, approved in 2011 for its novel mechanism, which during pharmacovigilance was found to cause retinal pigment abnormalities and blue-grey discolouration of lips, nail beds, sclera and conjunctiva with long-term use, and was subsequently withdrawn.",
  },

  // =====================================================================
  // BLOCK 8 — 21st-CENTURY APPROACHES (Biologics/Immuno/PROTACs, AI/Repurposing)
  // =====================================================================
  {
    id: "saq-b8-1", topic: "B8 · 21st-Century Approaches", lecture: "PROTACs", source: "core",
    type: "saq", marks: 4,
    question: "What is a PROTAC? Describe its three components and how it works. (4 marks)",
    markScheme: [
      { marks: 1, label: "A bifunctional small molecule that drives targeted protein degradation", patterns: [["bifunctional"], ["degradation"], ["proteolysis targeting"]] },
      { marks: 1, label: "Warhead 1: a ligand that binds the target protein", patterns: [["ligand", "target"], ["bind", "target protein"], ["warhead", "target"]] },
      { marks: 1, label: "Warhead 2: a ligand that binds an E3 ubiquitin ligase (joined by a linker)", patterns: [["e3", "ligase"], ["e3 ubiquitin"], ["linker"]] },
      { marks: 1, label: "Brings target + E3 ligase together → target ubiquitinated and degraded by the proteasome", patterns: [["ubiquitin"], ["proteasome"], ["tag", "degrad"]] },
    ],
    modelAnswer: "A PROTAC (proteolysis-targeting chimera) is a bifunctional small molecule that drives targeted protein degradation. It has three parts: one warhead that binds the target protein, a second warhead that binds an E3 ubiquitin ligase, and a linker joining them. By bringing the target and the E3 ligase into proximity, the target is ubiquitinated and then degraded by the ubiquitin–proteasome system.",
    modelExpanded: "A PROTAC (proteolysis-targeting chimera) is a bifunctional small molecule with three chemical elements: a ligand (warhead 1) that binds the target protein, a ligand (warhead 2) that binds an E3 ubiquitin ligase, and a linker that joins the two warheads. It works through the ubiquitin–proteasome system: by forming a ternary complex that brings the target protein into proximity with the E3 ligase, the target is poly-ubiquitinated and thereby tagged for degradation by the proteasome. Because the PROTAC is released and recycled (catalytic), it acts at sub-stoichiometric concentrations.",
  },
  {
    id: "saq-b8-2", topic: "B8 · 21st-Century Approaches", lecture: "PROTACs", source: "core",
    type: "saq", marks: 4,
    question: "Give TWO advantages and TWO challenges of PROTACs compared with conventional small-molecule inhibitors. (4 marks)",
    markScheme: [
      { marks: 1, label: "Advantage: catalytic/sub-stoichiometric → low doses (DC50 « KD)", patterns: [["catalytic"], ["sub stoichiometric"], ["low dose"], ["dc50"]] },
      { marks: 1, label: "Advantage: can hit ‘undruggable’ targets (binding site needn't be functional) / overcome resistance / remove all protein functions", patterns: [["undruggable"], ["non functional", "site"], ["overcome", "resistance"], ["whole protein", "degrad"], ["scaffold", "function"]] },
      { marks: 1, label: "Challenge: large molecules → poor membrane permeability / break Lipinski's rule", patterns: [["large", "molecule"], ["permeability"], ["lipinski"], ["cross", "membrane"]] },
      { marks: 1, label: "Challenge: difficult PK/screening/rational design; hook effect; few E3 ligases used", patterns: [["hook effect"], ["rational design", "difficult"], ["screening", "difficult"], ["few e3"], ["pharmacokinetic", "difficult"]] },
    ],
    modelAnswer: "Advantages: they act catalytically and sub-stoichiometrically (DC50 far below KD, so very low doses), and they can target previously ‘undruggable’ proteins (the binding site needn't be functional), remove non-enzymatic functions, and overcome resistance mutations. Challenges: they are large molecules with poor membrane permeability that often break Lipinski's rule, and they are hard to design, screen and optimise (difficult PK, the ‘hook effect’ at high concentration, and only a few E3 ligases used so far).",
    modelExpanded: "Advantages of PROTACs over classical inhibitors: (1) they are catalytic and recycled, so they work at sub-stoichiometric concentrations (DC50 can be >100-fold lower than KD), allowing low doses; (2) they remove the whole protein, so non-enzymatic (scaffolding) functions are eliminated, not just catalytic activity; (3) the binding site does not need to be functional, so previously 'undruggable' targets become accessible; (4) because the whole protein is degraded, point mutations are less likely to cause resistance; and (5) degradation is reversible and can be timed. Challenges: (1) they are large molecules with many H-bond donors/acceptors, so they struggle to abide by Lipinski's rule of 5 and cross membranes (competing with efflux); (2) their PK and pharmacodynamics are hard to evaluate with traditional screening; (3) rational design is harder (ternary-complex geometry, linker choice); (4) the 'hook effect' reduces degradation at high concentrations; and (5) only ~4 of >600 human E3 ligases have so far been exploited.",
  },
  {
    id: "saq-b8-3a", topic: "B8 · 21st-Century Approaches", lecture: "Biologics", source: "2023",
    type: "saq", marks: 1,
    question: "How do we define biologics? (1 mark)",
    markScheme: [
      { marks: 1, label: "A biologic is any (medicinal) product derived from/produced by a living organism", patterns: [["living organism"], ["from", "living"], ["produced by", "cell"], ["biological", "source"]] },
    ],
    modelAnswer: "A biologic is any medicinal product derived from or produced by a living organism (cells, bacteria, etc.).",
    modelExpanded: "A biologic is any product derived from or produced by a living organism (mammalian or bacterial cells, etc.), as opposed to a small molecule made by chemical synthesis.",
  },
  {
    id: "saq-b8-3b", topic: "B8 · 21st-Century Approaches", lecture: "Biologics", source: "2023",
    type: "saq", marks: 3,
    question: "Explain why biologics are more difficult to quality-control than small chemical entities. (3 marks)",
    markScheme: [
      { marks: 1, label: "Large, complex structures (primary–quaternary) hard to fully characterise", patterns: [["large", "complex"], ["structure", "complex"], ["quaternary"], ["characterise"]] },
      { marks: 1, label: "Heterogeneity/variability from cell expression & manufacturing (e.g. glycosylation/PTMs)", patterns: [["heterogen"], ["variability"], ["glycosylation"], ["post translational"], ["batch"]] },
      { marks: 1, label: "Many possible impurities (host-cell protein/DNA, endotoxin, aggregates, misfolds)", patterns: [["host cell"], ["endotoxin"], ["aggregat"], ["impurit"], ["misfold"]] },
    ],
    modelAnswer: "They are large, complex molecules (primary–quaternary structure) that are hard to fully characterise; they are heterogeneous and batch-variable because cell-expression and manufacturing conditions imprint post-translational modifications (e.g. glycosylation); and they carry many possible impurities (host-cell protein/DNA, endotoxin, aggregates, misfolds).",
    modelExpanded: "Quality control is harder than for small chemical entities because: biologics are very large, structurally complex molecules (primary, secondary, tertiary and quaternary structure) that are difficult to characterise fully; they are inherently heterogeneous and batch-to-batch variable because cell expression systems and manufacturing conditions imprint post-translational modifications (e.g. glycosylation) that differ between cell lines, clones and runs; and they can contain numerous process-related impurities (residual host-cell protein/DNA, endotoxins) and product-related impurities (sequence variants, aggregates, misfolded protein).",
  },
  {
    id: "saq-b8-3c", topic: "B8 · 21st-Century Approaches", lecture: "Biologics", source: "2023",
    type: "saq", marks: 6,
    question: "Describe how optimisation of monoclonal antibodies (mAbs) can be achieved. (6 marks)",
    markScheme: [
      { marks: 1, label: "Affinity maturation — improve target binding affinity (e.g. to 0.1–10 nM)", patterns: [["affinity maturation"], ["improve", "affinity"], ["increase", "affinity"]] },
      { marks: 1, label: "Humanisation — replace rodent sequence to reduce immunogenicity", patterns: [["humanis"], ["reduce", "immunogenic"], ["rodent", "human"]] },
      { marks: 1, label: "Fc engineering — tune effector function (ADCC/phagocytosis)/glycosylation", patterns: [["fc engineering"], ["fc region"], ["effector function"], ["adcc"]] },
      { marks: 1, label: "Increase effectiveness/potency / optimise PK (half-life)", patterns: [["increase", "potency"], ["effectiveness"], ["half life"], ["pk"]] },
      { marks: 1, label: "Screening cascade (binding → functional → cell-based) to select leads", patterns: [["binding", "functional"], ["elisa"], ["screening cascade"], ["primary", "secondary"]] },
      { marks: 1, label: "Reduce aggregation / improve developability & stability", patterns: [["aggregation"], ["stability"], ["developability"], ["solubility"]] },
    ],
    modelAnswer: "mAbs are optimised by affinity maturation (improving binding affinity, e.g. to 0.1–10 nM), humanisation (replacing rodent sequence to cut immunogenicity), Fc engineering (tuning effector functions such as ADCC/glycosylation), improving potency and optimising PK/half-life, using a screening cascade (binding → functional → cell-based) to select leads, and reducing aggregation to improve stability/developability.",
    modelExpanded: "Monoclonal antibody optimisation includes: affinity maturation to improve typically low (10–100 nM) binding affinities into the desired 0.1–10 nM range; humanisation to replace rodent framework sequence and reduce immunogenicity; Fc engineering to tune effector functions such as antibody-dependent cellular cytotoxicity/phagocytosis and glycosylation; improving potency and optimising PK (e.g. FcRn-mediated half-life); using a screening cascade (primary binding ELISA → functional ligand-receptor assay → cell-based signalling assay) to filter hits to leads; and reducing aggregation to improve stability and developability.",
  },
  {
    id: "saq-b8-4a", topic: "B8 · 21st-Century Approaches", lecture: "Biologics", source: "2024",
    type: "saq", marks: 4,
    question: "What distinguishes the sources & manufacture of biologics from small chemical molecules? (4 marks)",
    markScheme: [
      { marks: 1, label: "Biologics are made in living cells/organisms; small molecules by chemical synthesis", patterns: [["living", "cell"], ["chemical synthesis"], ["produced", "organism"], ["synthesi", "small"]] },
      { marks: 1, label: "Biologics are large/complex with heterogeneity; small molecules small & well-defined", patterns: [["large", "complex"], ["heterogen"], ["well defined"], ["small", "defined"]] },
      { marks: 1, label: "Manufacture is sensitive to process/cell line (process defines product) and harder to purify", patterns: [["process", "define"], ["cell line"], ["purif"], ["sensitive", "condition"]] },
      { marks: 1, label: "Require cold-chain / risk of contamination; higher cost", patterns: [["cold chain"], ["contamination"], ["expensive"], ["cost"]] },
    ],
    modelAnswer: "Biologics are produced in living cells/organisms (small molecules by chemical synthesis); they are large, complex and heterogeneous (small molecules are small and well-defined); their manufacture is highly sensitive to the cell line and process (the process defines the product) and harder to purify; and they often need a cold chain, carry contamination risk and cost more.",
    modelExpanded: "Biologics are produced by living systems (mammalian/bacterial cells), whereas small molecules are made by defined chemical synthesis; biologics are large, complex, heterogeneous molecules versus small, well-characterised entities; their production is exquisitely sensitive to the expression cell line and manufacturing process (so 'the process defines the product'), demands extensive purification, and is costly with contamination risk and cold-chain requirements.",
  },
  {
    id: "saq-b8-4b", topic: "B8 · 21st-Century Approaches", lecture: "Biologics", source: "2024",
    type: "saq", marks: 2,
    question: "What challenges are associated with the stability of biologics? (2 marks)",
    markScheme: [
      { marks: 1, label: "Stability: prone to denaturation/aggregation/degradation (temperature, pH, shear)", patterns: [["denatur"], ["aggregat"], ["degrad"], ["temperature"], ["unfold"]] },
      { marks: 1, label: "Stability: sensitive to storage conditions / short shelf life / need refrigeration", patterns: [["storage"], ["shelf life"], ["refrigerat"], ["freeze"]] },
    ],
    modelAnswer: "They are prone to denaturation, aggregation and degradation (from temperature, pH, light and shear) and are sensitive to storage conditions — giving short shelf lives and a need for refrigeration/careful formulation.",
    modelExpanded: "Protein biologics readily denature, aggregate, oxidise or undergo proteolytic/chemical degradation in response to temperature, pH, light and shear stress; this makes them sensitive to storage conditions, giving shorter shelf lives and a need for refrigeration and careful formulation.",
  },
  {
    id: "saq-b8-4c", topic: "B8 · 21st-Century Approaches", lecture: "Biologics", source: "2024",
    type: "saq", marks: 4,
    question: "Explain why the pharmacokinetics of biologics are more complex than those of small molecules. (4 marks)",
    markScheme: [
      { marks: 1, label: "PK: not orally bioavailable (digested) → given parenterally", patterns: [["not", "oral"], ["digest"], ["parenteral"], ["injection"]] },
      { marks: 1, label: "Distribution limited (large size/charge) — largely via lymphatics; small Vd", patterns: [["lymphatic"], ["limited", "distribution"], ["small", "vd"], ["size", "charge"]] },
      { marks: 1, label: "Eliminated by proteolysis/target-mediated disposition (not CYP) → long, non-linear half-life", patterns: [["proteolys"], ["target mediated"], ["not", "cyp"], ["non linear"], ["fcrn"]] },
      { marks: 1, label: "Immunogenicity / anti-drug antibodies alter clearance over time", patterns: [["immunogenic"], ["anti drug antibod"], ["adа"], ["clearance", "change"]] },
    ],
    modelAnswer: "They are not orally bioavailable (digested in the gut, so given parenterally); distribution is limited by their large size and charge and occurs largely via the lymphatics (small Vd); they are eliminated by proteolysis/target-mediated disposition rather than CYP metabolism (giving long, often non-linear half-lives); and they can provoke anti-drug antibodies that change clearance over time.",
    modelExpanded: "Pharmacokinetics are more complex because: biologics are destroyed in the gut so cannot be given orally (administered parenterally with delayed Tmax from the injection site); distribution is limited by their large size and charge and occurs largely via the lymphatic system (small Vd, ~2–4 L); they are eliminated by intracellular lysosomal proteolysis and target-mediated drug disposition rather than CYP metabolism, with FcRn recycling giving long half-lives (~3–4 weeks) and often non-linear kinetics; and immunogenicity (anti-drug antibodies) can alter clearance over the course of treatment.",
  },
  {
    id: "saq-b8-5", topic: "B8 · 21st-Century Approaches", lecture: "Biologics", source: "core",
    type: "saq", marks: 3,
    question: "Compare hybridoma technology and phage display for generating antibody hits. (3 marks)",
    markScheme: [
      { marks: 1, label: "Hybridoma: immunise animal, fuse B cells with myeloma → immortal cells secreting mAb", patterns: [["hybridoma"], ["fuse", "myeloma"], ["immunise"], ["b cell", "fuse"]] },
      { marks: 1, label: "Phage display: library of antibody fragments displayed on phage, panned against antigen (in vitro)", patterns: [["phage"], ["display", "antigen"], ["pan"], ["library", "fragment"]] },
      { marks: 1, label: "Phage display is fully in vitro & can yield human sequences (less humanisation); hybridoma gives rodent mAbs needing humanisation", patterns: [["in vitro"], ["human", "sequence"], ["humanisation"], ["rodent", "mab"]] },
    ],
    modelAnswer: "Hybridoma technology immunises an animal and fuses its antibody-producing B cells with myeloma cells to create immortal clones secreting a single monoclonal antibody. Phage display uses an in-vitro library of antibody fragments displayed on bacteriophage, panned against the antigen to select binders. Phage display is fully in vitro and can yield human sequences (reducing the need for humanisation), whereas hybridomas typically give rodent antibodies that must be humanised.",
    modelExpanded: "Hybridoma technology generates monoclonal antibodies by immunising an animal (usually a mouse) against the antigen, then fusing antibody-secreting B cells with immortal myeloma cells to create hybridomas — immortal clones each secreting a single specificity that can be screened and expanded. Phage display is an in-vitro alternative: a large library of antibody fragments (e.g. scFv/Fab) is expressed on the surface of bacteriophage, and the library is 'panned' against immobilised antigen to enrich binders over successive rounds. Phage display is entirely in vitro, can be performed with human antibody libraries (yielding human sequences and reducing the immunogenicity/humanisation burden) and allows control of selection conditions, whereas hybridomas produce rodent antibodies that generally require subsequent humanisation.",
  },
  {
    id: "saq-b8-6", topic: "B8 · 21st-Century Approaches", lecture: "AI in drug development", source: "core",
    type: "saq", marks: 4,
    question: "Describe how AI/machine learning is used across drug development, distinguishing supervised and unsupervised learning. (4 marks)",
    markScheme: [
      { marks: 1, label: "Used across target ID, discovery/screening, preclinical prediction, trial optimisation", patterns: [["target id"], ["screen"], ["predict", "toxicity"], ["clinical trial"], ["discovery"]] },
      { marks: 1, label: "Benefits: faster, cheaper, analyses huge datasets / predicts binding & properties", patterns: [["faster"], ["cheaper"], ["large", "dataset"], ["predict", "binding"], ["lower cost"]] },
      { marks: 1, label: "Supervised ML uses labelled data to predict outcomes", patterns: [["supervised", "label"], ["labelled data"], ["predict", "outcome"]] },
      { marks: 1, label: "Unsupervised ML uses unlabelled data to find patterns/clusters", patterns: [["unsupervised", "unlabel"], ["pattern"], ["cluster"], ["grouping"]] },
    ],
    modelAnswer: "AI/ML is used throughout drug development — target identification, screening/discovery, preclinical prediction (toxicity, properties) and clinical-trial optimisation — making development faster and cheaper by analysing huge datasets and predicting binding/drug-likeness. Supervised learning uses labelled data to predict outcomes (e.g. activity/toxicity), whereas unsupervised learning uses unlabelled data to find patterns and clusters.",
    modelExpanded: "AI is applied across the pipeline: target identification (mining biological datasets), drug discovery (screening billions of virtual compounds, predicting molecular binding and drug-likeness, generative design of new molecules), preclinical testing (simulating behaviour in cells/animals, predicting toxicity and side effects earlier), and clinical-trial optimisation (selecting patient groups, monitoring real-time responses). Benefits include faster development, lower R&D cost, more precise/personalised medicines and improved safety profiles. Machine learning trains algorithms on data to improve with experience: supervised learning uses labelled data (known inputs and outputs) to predict outcomes such as activity or toxicity, while unsupervised learning uses raw, unlabelled data to discover patterns, group similar items and reduce dimensionality. Deep learning extends ML using artificial neural networks (input, hidden and output layers). Examples: AlphaFold (protein-structure prediction), DSP-1181 (Exscientia — first AI-designed drug to trial), and Insilico Medicine's generative-AI DDR1 inhibitor.",
  },
  {
    id: "saq-b8-7", topic: "B8 · 21st-Century Approaches", lecture: "Drug repurposing", source: "core",
    type: "saq", marks: 4,
    question: "What is drug repurposing, why is it an attractive strategy, and give one AI-enabled example. (4 marks)",
    markScheme: [
      { marks: 1, label: "Repurposing = finding a new therapeutic use for an existing/approved (or failed) drug", patterns: [["new use", "existing"], ["repositioning"], ["existing drug", "new"], ["approved", "new indication"]] },
      { marks: 1, label: "Attractive: faster and cheaper (safety/PK/manufacturing already known)", patterns: [["faster"], ["cheaper"], ["lower cost"], ["safety", "known"], ["already", "data"]] },
      { marks: 1, label: "Attractive: lower risk / lower attrition (de-risked)", patterns: [["lower risk"], ["low risk"], ["attrition"], ["de risk"]] },
      { marks: 1, label: "Example: BenevolentAI → baricitinib for COVID-19 (AAK1/JAK) [or DRIAD for Alzheimer's]", patterns: [["baricitinib"], ["benevolent"], ["aak1"], ["driad"], ["covid"]] },
    ],
    modelAnswer: "Drug repurposing is finding a new therapeutic use for an existing, approved (or failed) drug. It is attractive because it is faster and cheaper — safety, PK and manufacturing data already exist — and lower-risk with reduced attrition. An AI-enabled example: BenevolentAI used a knowledge graph to identify baricitinib (a JAK inhibitor that also inhibits AAK1) for COVID-19, blocking viral entry and the cytokine storm; it later gained FDA authorisation. (DRIAD's ML ranking of drugs for Alzheimer's is another example.)",
    modelExpanded: "Drug repurposing (repositioning) is identifying a new therapeutic use for an existing or previously failed drug. It is attractive because much of the costly groundwork is already done: safety, pharmacokinetic and manufacturing data exist, so development is faster (~3–8 vs 10–15 years) and cheaper (~$300 million vs $1–3 billion) with a lower attrition risk. AI accelerates this: BenevolentAI used its biomedical knowledge graph to identify AAK1 (a regulator of clathrin-mediated endocytosis used by SARS-CoV-2) and ranked baricitinib — an approved JAK1/2 inhibitor that also inhibits AAK1 — as a candidate that could both reduce viral entry and suppress the COVID-19 cytokine storm; baricitinib went from prediction (Jan 2020) to FDA Emergency Use Authorization (Nov 2020) and full approval. The DRIAD machine-learning framework similarly ranks approved/late-stage drugs for Alzheimer's by how well they reverse AD-associated gene-expression changes.",
  },
  {
    id: "saq-b8-8", topic: "B8 · 21st-Century Approaches", lecture: "Drug repurposing", source: "core",
    type: "saq", marks: 4,
    question: "Outline how the DRIAD machine-learning framework was used to repurpose drugs for Alzheimer's disease. (4 marks)",
    markScheme: [
      { marks: 1, label: "Aim: rank existing FDA-approved/late-stage drugs that might modify AD progression", patterns: [["rank", "existing"], ["fda approved"], ["modify", "progression"], ["predict", "drug"]] },
      { marks: 1, label: "Uses post-mortem brain gene-expression data from AD patients vs controls", patterns: [["gene expression"], ["post mortem"], ["brain", "tissue"], ["ad patient", "control"]] },
      { marks: 1, label: "Treats cells with the drugs and compares drug-induced signature to AD dysregulation", patterns: [["treat", "cell"], ["signature"], ["compare", "dysregulat"], ["reverse", "expression"]] },
      { marks: 1, label: "Assumption: drugs that reverse AD-related expression changes may be therapeutic (ranked output)", patterns: [["reverse"], ["oppose"], ["therapeutic"], ["heatmap"], ["ranked"]] },
    ],
    modelAnswer: "DRIAD is an ML framework built to predict and rank existing FDA-approved/late-stage drugs that might modify Alzheimer's progression. It uses post-mortem brain gene-expression data from AD patients and healthy controls, treats cells (expressing those profiles) with a panel of drugs, and compares each drug-induced gene-expression signature with the AD dysregulation. The assumption is that drugs which reverse/oppose AD-related expression changes may be therapeutic, producing a ranked (heatmap) output of candidates.",
    modelExpanded: "DRIAD (Drug Repurposing In Alzheimer's Disease) is a machine-learning framework designed to identify existing FDA-approved or late-stage investigational drugs that might modify disease progression in Alzheimer's. It uses post-mortem gene-expression data from the brain tissue of AD patients and healthy controls (from cohorts such as ROSMAP, Mayo and MSBB). Human cells are used to model these expression profiles and are treated with ~80 drugs drawn from the LINCS library; the ML compares how closely each drug-induced gene-expression signature matches or opposes the gene dysregulation seen in AD brains. The assumption is that a drug which reverses AD-related expression changes might be therapeutic, and the method outputs a ranked heatmap. In the study, top-scoring compounds were predominantly kinase inhibitors (JAK, ULK, NEK families) modulating interferon signalling, autophagy and microtubule pathways.",
  },

  // =====================================================================
  // EXTENDED SAQ BANK — 3 per block (new angles + reworded past-paper variants)
  // =====================================================================

  // ---- BLOCK 1 (extended) ----
  {
    id: "saq-b1-6", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "core",
    type: "saq", marks: 5,
    question: "Using glyceryl trinitrate (GTN) as an example, describe the phenotypic (‘observation-led’) approach to drug discovery and outline GTN's mechanism of action. (5 marks)",
    markScheme: [
      { marks: 1, label: "Phenotypic discovery starts from an observed biological effect; the molecular target/mechanism is deconvoluted later", patterns: [["phenotypic", "effect"], ["observ", "effect"], ["target", "later"], ["deconvolut"]] },
      { marks: 1, label: "GTN's vasodilator effect was observed (factory workers' headaches; relief of angina) and used clinically (since 1879) long before its mechanism was known", patterns: [["factory"], ["headache"], ["1879"], ["before", "mechanism"], ["century"]] },
      { marks: 1, label: "GTN is a prodrug converted to nitric oxide (NO)", patterns: [["nitric oxide"], ["prodrug", "no"], ["converted", "no"]] },
      { marks: 1, label: "NO activates soluble guanylyl cyclase → increased cGMP", patterns: [["guanylyl cyclase"], ["guanyl cyclase"], ["cgmp"]] },
      { marks: 1, label: "cGMP activates PKG → reduced intracellular Ca²⁺ → smooth-muscle relaxation/vasodilation", patterns: [["pkg"], ["calcium"], ["relaxation"], ["vasodilat"]] },
    ],
    modelAnswer: "In phenotypic discovery a compound is found through an observed biological effect, and its molecular target/mechanism is worked out afterwards. GTN's vasodilator effect (causing factory workers' headaches, and relieving angina) was used clinically from 1879 — for over a century before the mechanism was understood. GTN is a prodrug converted to nitric oxide (NO); NO activates soluble guanylyl cyclase, raising cGMP, which activates PKG, lowering intracellular Ca²⁺ and relaxing vascular smooth muscle (vasodilation).",
    modelExpanded: "The phenotypic (observation-led) approach screens for, or exploits, an observable physiological effect on cells, tissues or whole organisms; the molecular target is identified later by target deconvolution. GTN is the classic example: workers in dynamite factories experienced headaches, dizziness and 'Monday-morning sickness' from vasodilation, and inhaled amyl nitrite was known to relieve angina by the same mechanism, so GTN was introduced for angina in 1879 and used effectively for a century before its mechanism was known. Mechanistically GTN is a prodrug metabolised to nitric oxide (NO); NO diffuses across membranes and activates soluble guanylyl cyclase, which converts GTP to cGMP; cGMP activates protein kinase G (PKG), driving phosphorylation events that lower intracellular Ca²⁺ and relax vascular smooth muscle, producing vasodilation (its main drawback is tolerance on prolonged exposure).",
  },
  {
    id: "saq-b1-7", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "core",
    type: "saq", marks: 4,
    question: "Compare ‘first-in-class’ and ‘best-in-class’ (me-too) drug-development strategies, giving one advantage and one risk of each. (4 marks)",
    markScheme: [
      { marks: 1, label: "First-in-class: develops a drug against a novel, previously unexploited target/mechanism", patterns: [["first in class"], ["novel target"], ["new target"], ["unprecedented"]] },
      { marks: 1, label: "First-in-class advantage: can be highly profitable (blockbuster)/strong IP/addresses unmet need — but high risk (target may prove ineffective)", patterns: [["blockbuster"], ["unmet need"], ["high risk"], ["may", "ineffective"], ["patent"]] },
      { marks: 1, label: "Best-in-class: improves on an already-validated target where a drug already exists (lower scientific risk)", patterns: [["best in class"], ["validated target"], ["already", "drug"], ["lower risk"], ["me too"]] },
      { marks: 1, label: "Best-in-class risk/limitation: faces competition in a crowded market (must displace existing treatment)", patterns: [["competition"], ["crowded"], ["displace"], ["existing treatment"]] },
    ],
    modelAnswer: "A first-in-class strategy develops a drug against a novel, previously unexploited target — potentially highly profitable (a blockbuster addressing unmet need with strong IP), but high-risk because the target may turn out to be ineffective. A best-in-class (me-too) strategy improves on an already-validated target where a drug already exists, which is scientifically lower-risk, but the drug must compete in (and displace incumbents from) a crowded market.",
    modelExpanded: "Choosing the target involves balancing scientific and commercial factors. First-in-class projects pursue a new, unprecedented target/mechanism: the reward can be enormous (many become blockbusters, with strong patent protection and the ability to meet a genuine unmet need), but the risk is high because a putative target may prove ineffective or unsafe once tested. Best-in-class ('me-too' or 'fast-follower') projects start from a target that has already been validated by an existing drug, so the scientific risk is lower and the strategy is to make a better drug (e.g. longer duration, fewer side effects, better selectivity); the trade-off is a more competitive, crowded market in which the new drug must demonstrably out-perform and displace incumbents.",
  },
  {
    id: "saq-b1-8", topic: "B1 · Drug Targets & Discovery", lecture: "L02", source: "core",
    type: "saq", marks: 4,
    question: "What is meant by target validation, and describe how a project team would increase confidence that a chosen target is involved in a disease? (4 marks)",
    markScheme: [
      { marks: 1, label: "Validation = confirming the target has a functional role in the disease AND that a drug acting on it has the predicted effect", patterns: [["functional role"], ["confirm", "role"], ["predicted effect"], ["involved", "disease"]] },
      { marks: 1, label: "Check the gene is expressed in the relevant tissue (differential gene-expression analysis)", patterns: [["gene expression"], ["differential", "expression"], ["expressed", "tissue"]] },
      { marks: 1, label: "Check the protein is expressed in the right place and has appropriate activity (proteomics)", patterns: [["proteomic"], ["protein", "expressed"], ["protein", "activity"]] },
      { marks: 1, label: "Test the effect of deleting/overexpressing the gene (siRNA, knockout/transgenic animals) and use tool compounds/disease models to confirm the phenotype", patterns: [["sirna"], ["knockout"], ["transgenic"], ["overexpress"], ["tool compound"]] },
    ],
    modelAnswer: "Target validation is confirming that the target molecule has a functional role in the disease and that a drug acting on it produces the predicted effect. A project team increases confidence by checking the gene is expressed in the appropriate tissue (differential gene-expression analysis), that the protein is expressed in the right place with appropriate activity (proteomics), and by testing the effects of deleting or overexpressing the gene (siRNA knockdown, transgenic/knockout animals) and using tool compounds in disease models to confirm the predicted phenotype before committing.",
    modelExpanded: "Target validation provides confirmation of two things: (1) that the target molecule has a genuine functional role in the disease, and (2) that the action of a drug on the proposed target produces the predicted therapeutic effect. To build confidence and minimise risk, a team will: ask whether the gene is expressed in the appropriate tissues (differential gene-expression analysis); confirm the protein is expressed in the right place and has the expected functional activity (proteomic analysis); and test the consequences of deleting or over-expressing the gene encoding the target using siRNA knockdown or transgenic/knockout animals. Selective tool compounds in cellular and animal disease models are then used to confirm that modulating the target gives the desired phenotype. Putative targets can still fail (e.g. if they have a secondary role that opposes the intended effect), which is why several targets may be pursued as a disease portfolio.",
  },

  // ---- BLOCK 2 (extended) ----
  {
    id: "saq-b2-7", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "core",
    type: "saq", marks: 4,
    question: "Explain what is meant by a ‘biased agonist’ (functional selectivity), using oliceridine at the µ-opioid receptor as an example. (4 marks)",
    markScheme: [
      { marks: 1, label: "A biased agonist preferentially activates some signalling pathways coupled to a receptor more than others (functional selectivity)", patterns: [["functional selectivity"], ["preferential", "pathway"], ["some", "pathway"], ["biased"]] },
      { marks: 1, label: "This reflects different intrinsic efficacy for different pathways / distinct receptor conformations (beyond a simple two-state model)", patterns: [["intrinsic efficacy", "pathway"], ["different conformation"], ["distinct conformation"], ["more than two"]] },
      { marks: 1, label: "At MOP, G-protein signalling mediates analgesia whereas β-arrestin signalling mediates respiratory depression/constipation/nausea", patterns: [["g protein", "analgesia"], ["arrestin", "respiratory"], ["arrestin", "depression"], ["arrestin", "side effect"]] },
      { marks: 1, label: "Oliceridine is a G-protein-biased MOP agonist intended to retain analgesia with fewer β-arrestin-mediated side effects", patterns: [["oliceridine"], ["g protein biased"], ["retain analgesia"], ["fewer", "side effect"]] },
    ],
    modelAnswer: "A biased agonist preferentially activates some of the signalling pathways coupled to a receptor more than others (functional selectivity), because it has different intrinsic efficacy for different pathways (the receptor can adopt more than one active conformation). At the µ-opioid receptor (MOP), G-protein signalling mediates analgesia whereas β-arrestin signalling mediates respiratory depression, nausea and constipation. Oliceridine is a G-protein-biased MOP agonist, intended to retain analgesia while producing fewer β-arrestin-mediated side effects.",
    modelExpanded: "Functional selectivity (biased agonism) describes a ligand that does not activate all of the signalling pathways coupled to a receptor to the same extent — it has greater intrinsic efficacy for recruiting one downstream pathway than another, even though the same receptor is engaged. This implies the receptor can adopt more than one active conformation, so the simple two-state model is too simplistic. The classic teaching example is the µ-opioid receptor: G-protein activation produces the desired analgesia, whereas β-arrestin recruitment is associated with respiratory depression, nausea and constipation. Oliceridine is a G-protein-biased MOP agonist designed to maximise the analgesic (G-protein) signal while minimising β-arrestin-mediated adverse effects (a 'balanced' endogenous agonist activates all pathways optimally).",
  },
  {
    id: "saq-b2-8", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "core",
    type: "saq", marks: 5,
    question: "Describe the two-state model of receptor activation and use it to explain how an agonist, an antagonist and an inverse agonist each affect the R⇌R* equilibrium. (5 marks)",
    markScheme: [
      { marks: 1, label: "Receptors exist in equilibrium between a resting (R) and active (R*) state; at rest most are in R, so little/no response", patterns: [["resting", "active"], ["r and r"], ["equilibrium", "state"], ["mostly", "resting"]] },
      { marks: 1, label: "Constitutively active receptors sit further toward R*, giving measurable basal activity", patterns: [["constitutive"], ["basal activity"], ["agonist independent"]] },
      { marks: 1, label: "Agonists bind with higher affinity to R*, stabilising it and shifting the equilibrium toward R* (increased response)", patterns: [["agonist", "r star"], ["agonist", "active state"], ["stabilis", "active"], ["shift", "r star"]] },
      { marks: 1, label: "Antagonists bind R and R* equally, not shifting the equilibrium, but block agonist binding", patterns: [["antagonist", "equally"], ["bind both"], ["block", "agonist"], ["no", "shift"]] },
      { marks: 1, label: "Inverse agonists bind with higher affinity to R, shifting equilibrium toward R and reducing constitutive activity", patterns: [["inverse", "r"], ["inverse", "resting"], ["reduce", "constitutive"], ["shift", "resting"]] },
    ],
    modelAnswer: "In the two-state model, receptors are in equilibrium between a resting (R) and an active (R*) state. At rest most receptors are in R, so little or no response is measured; constitutively active receptors sit further toward R*, giving measurable basal activity. Agonists bind with higher affinity to R* and stabilise it, shifting the equilibrium toward R* (increased response). Antagonists bind R and R* equally, so they don't shift the equilibrium but block agonist binding. Inverse agonists bind with higher affinity to R, shifting the equilibrium toward R and reducing constitutive (basal) activity.",
    modelExpanded: "The two-state model is used mainly to describe GPCRs and ligand-gated ion channels. Receptors interconvert between a resting state (R) and an active state (R*); the equilibrium constant determines the distribution in the absence of ligand. For most receptors the equilibrium lies far toward R, so there is little basal response, but some receptors are constitutively active (equilibrium nearer R*), giving measurable activity without ligand. A full agonist binds with higher affinity to R*, stabilising the active state and driving the equilibrium toward R* — at high concentration it can move (almost) all receptors into R*, producing the maximal response. A partial agonist has some affinity for both states, so it shifts the equilibrium toward R* but to a lesser extent (sub-maximal Emax). An antagonist binds R and R* with equal affinity, so it does not change the equilibrium itself but prevents agonist binding. An inverse agonist binds with higher affinity to R, shifting the equilibrium away from R* and thereby reducing constitutive (basal) activity — which is only observable when the receptor has constitutive activity.",
  },
  {
    id: "saq-b2-9", topic: "B2 · Mechanisms of Drug Action", lecture: "L03", source: "core",
    type: "saq", marks: 4,
    question: "Define a ‘partial agonist’ and explain, in terms of intrinsic efficacy and receptor occupancy, why it cannot evoke the maximal tissue response even at full occupancy. Give one clinical example. (4 marks)",
    markScheme: [
      { marks: 1, label: "A partial agonist binds the orthosteric site and produces a response, but a sub-maximal one even when all receptors are occupied", patterns: [["sub maximal"], ["not maximal"], ["less than maximal"], ["partial", "response"]] },
      { marks: 1, label: "It has lower intrinsic efficacy than a full agonist (cannot fully stabilise the active state)", patterns: [["lower", "intrinsic efficacy"], ["less efficacy"], ["cannot fully", "activate"], ["partial efficacy"]] },
      { marks: 1, label: "Its Emax is below that of a full agonist even at 100% occupancy", patterns: [["emax", "below"], ["100", "occupancy"], ["full occupancy", "sub"], ["saturation", "not maximal"]] },
      { marks: 1, label: "In the presence of a full agonist it can act as a functional antagonist; e.g. buprenorphine (partial µ-agonist)", patterns: [["functional antagonist"], ["buprenorphine"]] },
    ],
    modelAnswer: "A partial agonist binds the orthosteric site and produces a measurable response, but a sub-maximal one even when all receptors are occupied. This is because it has lower intrinsic efficacy than a full agonist — it cannot fully stabilise the active receptor state — so its Emax lies below that of a full agonist even at full (100%) occupancy. In the presence of a full agonist a partial agonist can behave as a functional antagonist; a clinical example is buprenorphine, a partial µ-opioid agonist used in opioid dependence.",
    modelExpanded: "A partial agonist is a ligand that occupies the receptor and evokes a response, but even at saturating concentrations (full occupancy) the maximal response it produces (its Emax) is less than that of a full agonist. The reason lies in intrinsic efficacy: efficacy is the capacity of a bound ligand to activate the receptor, and a partial agonist has lower intrinsic efficacy than a full agonist, so it cannot fully stabilise the active (R*) state — increasing occupancy cannot compensate. Because it occupies receptors without fully activating them, in the presence of a full agonist a partial agonist competes for occupancy and reduces the overall response, behaving as a functional antagonist. Buprenorphine (a partial µ-opioid agonist) illustrates this: it provides analgesia/maintenance while limiting the effect of, and competing with, full opioid agonists, which is useful in treating opioid use disorder.",
  },

  // ---- BLOCK 3 (extended) ----
  {
    id: "saq-b3-8", topic: "B3 · Methods in Drug Discovery", lecture: "L05", source: "2024",
    type: "saq", marks: 4,
    question: "Outline the principle of a radioligand binding assay and explain how specific binding is distinguished from non-specific binding. (4 marks)",
    markScheme: [
      { marks: 1, label: "A radiolabelled ligand (e.g. ³H/¹²⁵I/³⁵S) is incubated with tissue/cells containing the target; bound radioactivity is measured after washing", patterns: [["radioligand"], ["radiolabel"], ["tritium"], ["incubat", "tissue"]] },
      { marks: 1, label: "Total binding = specific (saturable, to receptor) + non-specific (non-saturable, to other sites)", patterns: [["total binding"], ["specific", "non specific"], ["saturable", "non saturable"]] },
      { marks: 1, label: "A second incubation adds excess unlabelled (‘cold’) ligand, which displaces radioligand from specific sites but not non-specific sites → defines NSB", patterns: [["excess", "cold"], ["unlabelled"], ["non specific binding"], ["displace", "specific"]] },
      { marks: 1, label: "Specific binding = total binding − non-specific binding (allows Kd or IC50 to be determined)", patterns: [["total", "minus", "non specific"], ["subtract"], ["specific binding", "difference"], ["kd"], ["ic50"]] },
    ],
    modelAnswer: "A radiolabelled ligand (³H, ¹²⁵I or ³⁵S) is incubated with tissue or cells expressing the target, and bound radioactivity is measured after washing off free ligand. The total bound radioactivity is the sum of specific binding (saturable, to the receptor) and non-specific binding (non-saturable, to other tissue sites). A second incubation is performed with the radioligand plus a large excess of unlabelled ('cold') ligand: the cold ligand out-competes the radioligand at the specific sites (which are limited) but not at the non-saturable non-specific sites, so the bound radioactivity in this tube is the non-specific binding. Specific binding = total binding − non-specific binding, and from a range of concentrations Kd (or, for a displacing drug, IC50) can be determined.",
    modelExpanded: "A radioligand binding assay requires tissue/cells containing the target protein, a radiolabelled ligand (commonly tritium ³H, iodine-125 or sulphur-35), an instrument to measure radioactivity, and a method to separate bound from free ligand (e.g. filtration/washing). When the radioligand is incubated with the preparation, the bound radioactivity comprises specific binding (to the receptor, which is saturable) and non-specific binding (to membranes and other sites, which is non-saturable). To resolve these, a parallel incubation is run with the same radioligand plus a large excess of unlabelled ('cold') ligand: at the limited number of specific sites the cold ligand out-competes the trace radioligand, so essentially only non-specific binding remains, whereas the non-saturable non-specific binding is unchanged. Specific binding is therefore obtained by subtraction (total − non-specific). Saturation analysis of specific binding gives Kd and Bmax, and a competition (displacement) experiment with a non-radioactive test compound gives its IC50.",
  },
  {
    id: "saq-b3-9", topic: "B3 · Methods in Drug Discovery", lecture: "L05", source: "core",
    type: "saq", marks: 3,
    question: "Explain the principle of the scintillation proximity assay (SPA) and give one advantage over a conventional radioligand binding assay. (3 marks)",
    markScheme: [
      { marks: 1, label: "The target (e.g. receptor membrane) is attached to a bead containing scintillant", patterns: [["bead", "scintillant"], ["microbead"], ["receptor", "bead"]] },
      { marks: 1, label: "Only radioligand bound (in proximity) to the bead transfers β-particle energy to the scintillant → light emission; unbound radioligand is too far to cause emission", patterns: [["proximity"], ["beta particle"], ["light"], ["bound", "emission"], ["unbound", "no effect"]] },
      { marks: 1, label: "Advantage: bound and free ligand need not be separated (no washing step) → faster/scalable to HTS", patterns: [["no", "separat"], ["no wash"], ["without separation"], ["high throughput"]] },
    ],
    modelAnswer: "In a scintillation proximity assay the target (e.g. a receptor-containing membrane) is attached to a microbead containing scintillant. When a radioligand binds the target it is brought close enough to the bead that the β-particles it emits transfer energy to the scintillant, producing light; unbound radioligand in solution is too far away to cause light emission. The key advantage over a conventional radioligand binding assay is that bound and free ligand do not need to be separated (no washing/filtration step), making it faster and readily scalable to high-throughput screening.",
    modelExpanded: "The SPA depends on the short range of β-particles released by radioactive decay. The receptor-bearing membrane is immobilised on a microbead impregnated with scintillant. A radioligand that binds the receptor sits within range of the bead, so its emitted β-particles deposit energy in the scintillant and trigger light emission that is measured; radioligand that remains free in solution is too distant for energy transfer and produces no signal. Because the signal only arises from bound ligand, there is no need to physically separate bound from free ligand — eliminating the washing/filtration step required in classical binding assays. This makes the SPA quicker, easily automated and widely used for high-throughput screening in the pharmaceutical industry.",
  },
  {
    id: "saq-b3-10", topic: "B3 · Methods in Drug Discovery", lecture: "L04", source: "2023",
    type: "saq", marks: 4,
    question: "Define a reporter gene, give TWO examples, and explain why the fact that cells do not normally express the reporter is advantageous. (4 marks)",
    markScheme: [
      { marks: 1, label: "A reporter gene encodes an easily/quantitatively measured product placed under the control of a promoter/response element of the pathway of interest", patterns: [["easily", "measur"], ["measurable", "product"], ["under control", "promoter"], ["response element"]] },
      { marks: 1, label: "Its expression reports the activity of the linked pathway/promoter", patterns: [["report", "activity"], ["pathway", "activity"], ["promoter activity"]] },
      { marks: 1, label: "Two valid examples (luciferase, GFP, β-galactosidase/lacZ)", patterns: ["luciferase", "gfp", "fluorescent protein", "galactosidase", "lacz"] },
      { marks: 1, label: "No/low background expression → high signal-to-noise, specific readout attributable to the introduced pathway", patterns: [["low background"], ["no background"], ["signal to noise"], ["not normally express"]] },
    ],
    modelAnswer: "A reporter gene encodes an easily and quantitatively measured product, placed under the control of a promoter or response element coupled to the pathway of interest, so that its expression reports the activity of that pathway. Examples include luciferase (luminescence) and green fluorescent protein (fluorescence) — also β-galactosidase/lacZ. Because cells do not normally express these (often non-mammalian) reporters, background expression is essentially zero, giving a very high signal-to-noise ratio and a specific readout that can be attributed unambiguously to the introduced pathway.",
    modelExpanded: "A reporter gene is a gene whose product is easily and quantitatively detected and which is placed under the control of a promoter/response element linked to the signalling pathway being studied; its expression therefore acts as a readout of that pathway's activity. Cells are transfected with a construct in which the reporter sits downstream of the response element, so activation of the target pathway drives reporter expression. Common examples are luciferase (bioluminescence), GFP (fluorescence) and β-galactosidase/lacZ (colorimetric). A major advantage is that cells do not normally express these reporters, so background expression is negligible: this gives a very high signal-to-noise ratio and means the measured signal can be attributed specifically to activation of the introduced pathway, making the assay sensitive, objective and scalable to high-throughput screening.",
  },

  // ---- BLOCK 4 (extended) ----
  {
    id: "saq-b4-9", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L06", source: "core",
    type: "saq", marks: 5,
    question: "Compare rational (structure-/ligand-based) design and empirical (high-throughput) screening as approaches to lead generation, giving an example or situation in which each is preferred. (5 marks)",
    markScheme: [
      { marks: 1, label: "Rational design uses knowledge of the target structure, its endogenous ligand, or a known active compound to design molecules to screen", patterns: [["rational", "structure"], ["target structure"], ["known ligand"], ["in silico", "design"]] },
      { marks: 1, label: "Preferred when structural/mechanistic information or a starting ligand is available", patterns: [["structural information"], ["known", "available"], ["mechanistic"], ["starting", "molecule"]] },
      { marks: 1, label: "Rational example: captopril (from ACE structure), bethanechol (modified ACh), or amlodipine (from nifedipine)", patterns: ["captopril", "bethanechol", "amlodipine", "nifedipine"] },
      { marks: 1, label: "Empirical screening makes no structural assumptions and screens large/diverse compound libraries", patterns: [["empirical"], ["no assumption"], ["screen", "librar"], ["any", "structure"]] },
      { marks: 1, label: "Empirical is the only option when nothing is known about target structure/ligands; often yields first-in-class drugs (or unexpected SAR even when the target is known)", patterns: [["nothing", "known"], ["first in class"], ["unexpected"], ["no information"]] },
    ],
    modelAnswer: "Rational design uses knowledge of the target's structure, its endogenous ligand, or a known active compound to design molecules that are then synthesised and screened in a target-based assay. It is preferred when structural, mechanistic or ligand information is available — examples include captopril (designed from the ACE structure), bethanechol (a metabolically stable analogue of ACh) and amlodipine (developed from the template nifedipine). Empirical (high-throughput) screening makes no assumptions about what structure will be active and screens large, diverse libraries of synthetic or natural compounds. It is the only option when nothing is known about the target structure or its ligands, and historically yields many first-in-class drugs; it can also reveal unexpected scaffolds and SAR even when the target structure is known.",
    modelExpanded: "Lead generation can be approached rationally or empirically. Rational design relies on prior knowledge: the structure of the target (e.g. designing the ACE inhibitor captopril from the enzyme's active site — the first drug from target-structure knowledge), modification of a natural substrate/ligand (e.g. bethanechol, an AChE-resistant ACh analogue for bladder dysfunction), or improvement of a known active compound (the 'fast-follower' approach — e.g. amlodipine derived from nifedipine, with a longer duration of action). Rational design is attractive when structural information, low-MW starting molecules, mechanistic information, or target-class analogues are available. Empirical screening makes no assumptions about active structures and tests whatever libraries of synthetic or natural compounds can be obtained; it is the only option when neither the target structure nor any ligand is known, and many first-in-class drugs have come from it. Even when a structure is known, empirical screening can throw up unpredicted scaffolds that open new, unexpected structure–activity relationships. High-throughput screening automates the empirical approach to test very large compound numbers quickly.",
  },
  {
    id: "saq-b4-10", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L08", source: "core",
    type: "saq", marks: 5,
    question: "Distinguish target-engagement, mechanism (pharmacodynamic) and outcome (efficacy) biomarkers, giving one example of each. (5 marks)",
    markScheme: [
      { marks: 1, label: "Target-engagement biomarker: shows the drug physically interacts with/occupies its target (no functional information)", patterns: [["target engagement"], ["occupancy"], ["interact", "target"], ["binds", "target"]] },
      { marks: 1, label: "Example: PET/SPECT displacement of a D2 radioligand for antipsychotics (≈65% occupancy needed)", patterns: [["pet"], ["spect"], ["d2", "displace"], ["65"], ["radiotracer"]] },
      { marks: 1, label: "Mechanism (pharmacodynamic) biomarker: shows a downstream functional/physiological consequence of target engagement", patterns: [["mechanism", "downstream"], ["pharmacodynamic", "functional"], ["downstream", "event"], ["functional", "consequence"]] },
      { marks: 1, label: "Example: cAMP (ELISA/mass spec) for a GPCR-acting drug", patterns: [["camp"], ["second messenger"], ["enzyme activity"]] },
      { marks: 1, label: "Outcome/efficacy biomarker: linked to disease and predicts clinical benefit (e.g. blood pressure; CD4+/viral load in HIV)", patterns: [["outcome"], ["efficacy biomarker"], ["disease related"], ["blood pressure"], ["cd4"], ["viral load"]] },
    ],
    modelAnswer: "A target-engagement biomarker shows that the drug physically interacts with (occupies) its target, without giving functional information — for example PET/SPECT displacement of a D2 radioligand for an antipsychotic (around 65% D2 occupancy is needed for efficacy). A mechanism (pharmacodynamic) biomarker shows a downstream functional/physiological consequence of that engagement — for example measuring cAMP (by ELISA or mass spectrometry) for a drug acting at a GPCR. An outcome (efficacy/disease-related) biomarker has a defined link to the disease and predicts clinical benefit — for example a fall in blood pressure, or CD4+ count/viral load in HIV.",
    modelExpanded: "Translational biomarkers can be grouped by what they report. (1) Target-engagement biomarkers confirm that the compound interacts with its macromolecular target — they validate the drug–target relationship but give no functional information; imaging (PET, SPECT) is commonly used, e.g. displacement of a D2-receptor radioligand by an antipsychotic, where the degree of displacement gives the receptor occupancy (≈65% D2 occupancy is the benchmark for antipsychotic efficacy), allowing early proof of concept and dose focusing. (2) Mechanism/pharmacodynamic biomarkers report the physiological consequence of engaging the target — a change in a downstream event such as enzyme activity, gene/protein expression, behaviour or a blood chemical (e.g. cAMP for a GPCR-acting drug, measured by ELISA or mass spectrometry) — i.e. evidence that 'something is happening'. (3) Outcome/efficacy (disease-related) biomarkers have a defined link with the disease and predict compound efficacy; they may be biochemical or physiological (e.g. blood-pressure change, or CD4+ count and viral load as surrogate endpoints in HIV).",
  },
  {
    id: "saq-b4-11", topic: "B4 · Lead Discovery & Biomarkers", lecture: "L06", source: "core",
    type: "saq", marks: 4,
    question: "Discuss the value and the limitations of natural products as a source of lead compounds. (4 marks)",
    markScheme: [
      { marks: 1, label: "Value: exceptional structural diversity/novelty (unpredictable scaffolds) → greater chance of hitting a new target", patterns: [["diversity"], ["novel structure"], ["unexpected", "structure"], ["unpredictable"]] },
      { marks: 1, label: "Often very specific, potent interactions (e.g. venom toxins; botanicals such as aspirin/digoxin; microbial penicillin)", patterns: [["venom"], ["toxin"], ["aspirin"], ["digoxin"], ["penicillin"], ["specific", "interaction"]] },
      { marks: 1, label: "Limitation: supply/reproducibility issues (varies with season/environment/species rarity); limited scalability", patterns: [["supply"], ["reproducib"], ["season"], ["scalab"], ["rare", "species"]] },
      { marks: 1, label: "Aim is to identify the active structure and reproduce/optimise it by synthetic chemistry or biotechnology", patterns: [["identify", "structure"], ["synthetic chemistry"], ["biotech"], ["industrially"], ["template"]] },
    ],
    modelAnswer: "Natural products are valuable because they offer exceptional structural diversity and novelty — unpredictable scaffolds that increase the chance of finding a molecule that recognises a new target — and they often have very specific, potent interactions (e.g. venom toxins from snakes/spiders, botanicals such as aspirin and digoxin, microbial products such as penicillin). Their limitations are practical: supply can be unreliable and irreproducible (varying with season, environment and species rarity) and scalability is limited. The usual aim is therefore to identify the active structure and then reproduce or optimise it industrially by synthetic chemistry or biotechnology.",
    modelExpanded: "Natural products — chemicals produced by living organisms — have historically been a rich source of leads, and their greatest strength is diversity: organisms generate unexpected, unpredictable structures (e.g. a protein glue from the Australian crucifix frog stronger than medical glue), and diversity of structure is more important than sheer compound number because it increases the chance of finding a molecule that recognises a novel target. They include botanicals (aspirin, digoxin), microbial products (penicillin, botulinum toxin), fungi (muscarine), and animal/marine sources, with venoms (snake, spider, scorpion, amphibian, marine) being especially rich because their constituent proteins make very specific target interactions. The limitations are practical rather than chemical: a given species may not produce the compound consistently (different seasons or environments), a reproducible supply of a rare or remote organism can be hard to secure, and scalability is limited. Consequently the active structure is usually identified and then produced industrially by synthetic chemistry or biotechnology, or used as a template lead for new compounds.",
  },

  // ---- BLOCK 5 (extended) ----
  {
    id: "saq-b5-11", topic: "B5 · Pharmacokinetics", lecture: "L10", source: "core",
    type: "saq", marks: 4,
    question: "Explain how pH, pKa and ionisation determine whether a weak acid or weak base is absorbed across the gut wall. (4 marks)",
    markScheme: [
      { marks: 1, label: "Only the unionised form is lipid-soluble and can cross the membrane by passive diffusion", patterns: [["unionised"], ["non ionised"], ["lipid soluble", "unionised"], ["only", "unionised"]] },
      { marks: 1, label: "The degree of ionisation depends on the pH of the environment and the drug's pKa (Henderson-Hasselbalch)", patterns: [["ph", "pka"], ["henderson"], ["ionisation", "depend"]] },
      { marks: 1, label: "Weak acids are less ionised (more absorbed) in acidic conditions", patterns: [["weak acid", "acidic"], ["acid", "unionised", "acidic"], ["acid", "stomach"]] },
      { marks: 1, label: "Weak bases are less ionised (more absorbed) in basic/alkaline conditions; so site of absorption depends on acid/base nature and pKa", patterns: [["base", "basic"], ["base", "alkaline"], ["base", "intestine"], ["site", "depend"]] },
    ],
    modelAnswer: "Only the unionised form of a drug is lipid-soluble and able to cross the gut membrane by passive diffusion. The fraction that is unionised depends on the pH of the environment and the drug's pKa (described by the Henderson-Hasselbalch equation). A weak acid is less ionised — and therefore better absorbed — in acidic conditions (e.g. the stomach), whereas a weak base is less ionised, and better absorbed, in more basic/alkaline conditions (e.g. the small intestine). So the site and extent of absorption depend on whether the drug is a weak acid or base and on its pKa relative to the local pH.",
    modelExpanded: "Many drugs are weak acids or weak bases and exist as an equilibrium between ionised and unionised forms. Only the unionised (uncharged) species is sufficiently lipid-soluble to diffuse passively across the lipid bilayer of the gut mucosa; the ionised form is trapped in the aqueous phase. The position of the ionisation equilibrium is set by the pH of the surrounding fluid and the drug's pKa, related by the Henderson-Hasselbalch equation. For a weak acid, a low (acidic) pH suppresses ionisation, so more drug is unionised and absorbable — hence weak acids (e.g. aspirin) can be absorbed in the acidic stomach; for a weak base, a higher (more alkaline) pH suppresses ionisation, so weak bases are favoured for absorption in the more alkaline small intestine. Relevant pH values include stomach ~1.5–3.5, blood ~7.4 and urine ~4.5–8.0; the same principle (pH partitioning) also influences distribution and renal reabsorption.",
  },
  {
    id: "saq-b5-12", topic: "B5 · Pharmacokinetics", lecture: "L11", source: "core",
    type: "saq", marks: 4,
    question: "Describe the THREE processes by which the kidney handles drugs during renal elimination. (4 marks)",
    markScheme: [
      { marks: 1, label: "Glomerular filtration — filters drug that is not bound to plasma proteins", patterns: [["glomerular filtration"], ["filter", "not bound"], ["filtration", "free"]] },
      { marks: 1, label: "Active tubular secretion — carrier-mediated (e.g. OAT transporters), e.g. for penicillins", patterns: [["tubular secretion"], ["active secretion"], ["oat"], ["penicillin"]] },
      { marks: 1, label: "Passive reabsorption — lipid-soluble (unionised) drug reabsorbed back into blood; urine pH affects this", patterns: [["passive reabsorption"], ["reabsorb"], ["lipid soluble", "reabsorb"], ["urine ph"]] },
      { marks: 1, label: "Net renal excretion = filtration + secretion − reabsorption; favours water-soluble drugs/metabolites", patterns: [["filtration", "secretion", "reabsorption"], ["net"], ["water soluble", "excret"], ["urine", "water soluble"]] },
    ],
    modelAnswer: "Three processes contribute to renal handling of drugs: (1) glomerular filtration, which filters drug that is not bound to plasma proteins; (2) active tubular secretion, a carrier-mediated process (e.g. via organic anion transporters, OATs) that secretes certain drugs such as penicillins into the tubule; and (3) passive reabsorption, in which lipid-soluble (unionised) drug is reabsorbed from the tubule back into the blood — influenced by urine pH (acids reabsorbed in acidic urine, bases in basic urine). Net renal excretion = filtration + secretion − reabsorption, and the kidney mainly eliminates water-soluble drugs and metabolites.",
    modelExpanded: "The kidney is the key organ for eliminating water-soluble drugs, and three processes determine how much drug appears in urine. Glomerular filtration passively filters free (non-protein-bound) drug at the glomerulus, so only the unbound fraction is filtered. Active tubular secretion is a carrier-mediated process in the proximal tubule: organic anion transporters (OATs) in the basolateral membrane (and other transporters) actively secrete drugs such as penicillins into the tubular fluid, and can do so even against a concentration gradient. Passive reabsorption then returns lipid-soluble, unionised drug from the tubular lumen back into the blood as water is reabsorbed; because only the unionised form is reabsorbed, urine pH matters — acidic drugs are reabsorbed more in acidic urine and basic drugs in basic urine (the basis of urinary alkalinisation in some overdoses). Net renal excretion therefore equals filtration plus secretion minus reabsorption. Lipophilic drugs are largely reabsorbed and must first be metabolised to more water-soluble forms before they can be efficiently excreted.",
  },
  {
    id: "saq-b5-13", topic: "B5 · Pharmacokinetics", lecture: "L10", source: "2024",
    type: "saq", marks: 4,
    question: "Define the apparent volume of distribution (Vd) and explain why warfarin has a low Vd (~8 L) whereas imipramine has a very high Vd (~2100 L). (4 marks)",
    markScheme: [
      { marks: 1, label: "Vd is the hypothetical volume relating the total amount of drug in the body (Q) to plasma concentration (Cp): Vd = Q/Cp", patterns: [["q", "cp"], ["amount", "concentration"], ["hypothetical volume"], ["total", "plasma"]] },
      { marks: 1, label: "It is not a real physiological volume — it reflects relative affinity for tissues versus plasma", patterns: [["not", "real"], ["not", "physiolog"], ["tissue", "plasma", "affinity"], ["apparent"]] },
      { marks: 1, label: "Warfarin is ~99% plasma-protein bound, holding it in the vascular space → low Vd", patterns: [["warfarin", "protein"], ["plasma protein", "bound"], ["vascular", "low"], ["99"]] },
      { marks: 1, label: "Imipramine is highly lipophilic/tissue-bound, partitioning into tissues, leaving little in plasma → very high Vd", patterns: [["imipramine", "lipophil"], ["lipid soluble", "high"], ["tissue", "high vd"], ["partition", "tissue"]] },
    ],
    modelAnswer: "Vd is the hypothetical (apparent) volume that would contain the total amount of drug in the body (Q) at the concentration measured in plasma (Cp): Vd = Q/Cp. It is not a real physiological volume — it reflects the drug's relative affinity for tissues versus plasma. Warfarin is ~99% bound to plasma albumin, which holds it in the vascular space, so it has a low Vd (~8 L). Imipramine is highly lipophilic and strongly tissue-bound, so it partitions extensively into tissues, leaving very little in plasma — giving a very high apparent Vd (~2100 L).",
    modelExpanded: "The apparent volume of distribution relates the total amount of drug in the body to its plasma concentration: Vd = Q (mg) / Cp (mg/L). It is 'apparent' because it does not correspond to any real anatomical compartment (reference volumes: plasma ~3 L, ECF ~12 L, total body water ~42 L); rather, it expresses how the drug partitions between plasma and the rest of the body. A drug that stays in the plasma gives a high Cp for a given dose and therefore a small Vd, whereas a drug that leaves the plasma for the tissues gives a low Cp and a large Vd. Warfarin is ~99% bound to plasma proteins (albumin), which keeps it in the vascular compartment, so its plasma concentration is relatively high and its Vd is low (~8 L). Imipramine is highly lipid-soluble and binds extensively to tissue components, so it partitions out of plasma into tissues, leaving a very low plasma concentration and hence an enormous apparent Vd (~2100 L — far larger than any real body volume). Factors raising Vd include high lipid solubility and tissue binding; factors lowering it include strong plasma-protein binding.",
  },

  // ---- BLOCK 6 (extended) ----
  {
    id: "saq-b6-8", topic: "B6 · Preclinical & Safety", lecture: "L14", source: "core",
    type: "saq", marks: 5,
    question: "Describe the LD50 test and give THREE reasons why it has largely been replaced (e.g. by the fixed-dose procedure). (5 marks)",
    markScheme: [
      { marks: 1, label: "LD50 (introduced 1927) = the dose that kills 50% of a group of animals in a set time, used as an index of acute toxicity (mg/kg)", patterns: [["ld50", "50"], ["kill", "50"], ["acute toxicity"], ["1927"]] },
      { marks: 1, label: "Various doses are given to groups of animals and % mortality recorded to calculate the LD50", patterns: [["various doses"], ["groups", "mortality"], ["percent", "mortality"], ["calculate", "ld50"]] },
      { marks: 1, label: "Reason: measures only mortality, not sub-lethal or chronic toxicity", patterns: [["only", "mortality"], ["not", "sub lethal"], ["not", "chronic"]] },
      { marks: 1, label: "Reason: varies widely between species and with experimental conditions; cannot detect idiosyncratic reactions", patterns: [["vary", "species"], ["experimental conditions"], ["idiosyncratic"]] },
      { marks: 1, label: "Reason: uses many animals and causes suffering disproportionate to the information gained (replaced by the fixed-dose procedure, OECD TG 420)", patterns: [["many animals"], ["suffering", "disproportionate"], ["fixed dose"], ["tg 420"]] },
    ],
    modelAnswer: "The LD50 test (created in 1927) measures acute toxicity: various doses of a drug are given to groups of animals, the percentage mortality in a set period (e.g. 2 days) is recorded, and the dose lethal to 50% of the group (mg/kg) is calculated. It has largely been replaced because: (1) it measures only mortality, not sub-lethal or chronic toxicity; (2) it varies widely between species and with experimental conditions, and cannot detect idiosyncratic reactions; and (3) it uses many animals and causes suffering disproportionate to the information gained. The fixed-dose procedure (OECD TG 420), using fixed doses (5, 50, 500, 2000 mg/kg) and 'evident toxicity' as the endpoint, uses fewer animals and avoids death as an endpoint.",
    modelExpanded: "The LD50 (median lethal dose) test was created in 1927 as an index of acute toxicity. Groups of animals are given various doses of the drug, the percentage mortality over a set period (e.g. 2 days) is recorded, and the dose that kills 50% of the group is calculated and expressed in mg/kg (e.g. ethanol ~10,000; nicotine ~1; botulinum toxin ~0.00001 mg/kg). It has been largely abandoned because of serious limitations: it measures only mortality, not the many sub-lethal forms toxicity can take, nor chronic toxicity; results vary widely between species and are very sensitive to experimental conditions; it cannot detect idiosyncratic reactions; and it requires large numbers of animals and causes suffering disproportionate to the information obtained (the LD50 measured at 24 h can also differ ~27-fold from that at 14 days). It has been deleted from OECD guidelines in favour of alternatives such as the fixed-dose procedure (OECD TG 420), in which the drug is given at one of four fixed dose levels (5, 50, 500, 2000 mg/kg), animals are observed for 14 days and autopsied to identify target organs, and 'evident toxicity' rather than death is the endpoint — using fewer animals and causing less suffering.",
  },
  {
    id: "saq-b6-9", topic: "B6 · Preclinical & Safety", lecture: "L14", source: "core",
    type: "saq", marks: 5,
    question: "Outline the aims of reproductive (developmental) toxicity testing and explain what the thalidomide tragedy added to modern requirements. (5 marks)",
    markScheme: [
      { marks: 1, label: "Aim: reveal toxic effects on reproduction at all stages of development (fertility/early embryonic; embryo-fetal/organogenesis; pre- and post-natal)", patterns: [["all stages"], ["fertility"], ["embryo", "fetal"], ["organogenesis"], ["pre", "post natal"]] },
      { marks: 1, label: "Uses one rodent and one non-rodent species (e.g. rat and rabbit)", patterns: [["one rodent", "non rodent"], ["rat", "rabbit"], ["two species"]] },
      { marks: 1, label: "Assesses fertility/malformations/litter size/survival/development", patterns: [["malformation"], ["litter size"], ["fertility"], ["survival"], ["fetal", "examination"]] },
      { marks: 1, label: "Thalidomide appeared so non-toxic in rodents that no LD50 could be set, yet caused ~12,000 human limb defects — species choice is critical", patterns: [["non toxic", "rodent"], ["no ld50"], ["limb"], ["species", "critical"], ["12"]] },
      { marks: 1, label: "Teratogenic in rabbits/primates but not rodents → drove two-species requirement; S-enantiomer is teratogenic → assess enantiomers separately (chirality)", patterns: [["rabbit"], ["primate"], ["enantiomer"], ["s isomer"], ["chirality"], ["stereochemistry"]] },
    ],
    modelAnswer: "Reproductive (developmental) toxicity testing aims to reveal any toxic effect of a drug on reproduction at all stages of development — fertility and early embryonic development; embryo-fetal development (organogenesis); and pre-/post-natal development — using one rodent and one non-rodent species (e.g. rat and rabbit) and assessing fertility, malformations, litter size, survival and development. Thalidomide added two key lessons: it appeared so non-toxic in rodents that no LD50 could be established, yet caused ~12,000 human limb defects — showing species choice is critical (it is teratogenic in rabbits and primates but not rodents), which drove the requirement to test in one rodent AND one non-rodent species; and because only the S-enantiomer is teratogenic, enantiomers must be assessed separately (chirality matters).",
    modelExpanded: "Reproductive toxicology aims to reveal any toxic effect of a drug on mammalian reproduction at all stages of development: (1) fertility and early embryonic development (drug given to male and female rats around mating, assessing sexual function, sperm, pregnancy rate, implantation sites, litter size and gross fetal examination); (2) embryo-fetal development, using a pregnant rodent and a non-rodent (e.g. rabbit) with the drug given during organogenesis, assessing live/dead fetuses, malformations and histology; and (3) pre- and post-natal development, with the drug given through pregnancy and lactation, assessing F1 growth, fertility, survival, behaviour and locomotion. Thalidomide reshaped these requirements: marketed in the late 1950s as a sedative/antiemetic and used for morning sickness, it appeared so non-toxic in rodent models that an LD50 could not be established, yet ~12,000 children were born with limb-reduction defects before its 1961 withdrawal. It is a potent teratogen in zebrafish, chickens, rabbits and monkeys but not rodents, demonstrating that species choice is critical, which is why testing now requires one rodent AND one non-rodent species. The teratogenic S-enantiomer intercalates DNA at purines in promoters of limb-angiogenesis genes, so the episode also established that enantiomers must be assessed separately for both efficacy and safety (chirality).",
  },
  {
    id: "saq-b6-10", topic: "B6 · Preclinical & Safety", lecture: "L14", source: "core",
    type: "saq", marks: 3,
    question: "Distinguish hazard from risk, and explain the underlying principle of pre-clinical toxicity testing. (3 marks)",
    markScheme: [
      { marks: 1, label: "Hazard = the intrinsic potential of a substance to cause harm", patterns: [["hazard", "potential"], ["intrinsic", "harm"], ["potential", "cause harm"]] },
      { marks: 1, label: "Risk = the likelihood of harm under specific conditions of exposure (dose/route/population)", patterns: [["risk", "likelihood"], ["probability", "harm"], ["conditions", "exposure"]] },
      { marks: 1, label: "Underlying principle: give a large dose to a small number of animals and extrapolate to a large number of humans given a small dose; greater risk is acceptable for life-threatening disease", patterns: [["large dose", "small number"], ["extrapolate"], ["small dose", "human"], ["life threatening", "risk"]] },
    ],
    modelAnswer: "Hazard is the intrinsic potential of a substance to cause harm, whereas risk is the likelihood of harm under specific conditions of exposure (dose, route, population). The underlying principle of pre-clinical toxicity testing is to administer a large dose to a small number of animals and extrapolate to a large number of humans who will be given a small dose; a greater level of risk is accepted when treating a life-threatening condition (e.g. a chemotherapy agent versus a contraceptive pill).",
    modelExpanded: "Hazard and risk are distinct concepts. Hazard describes the intrinsic potential of a substance to cause harm (an absolute property of the substance — e.g. cyanide is highly hazardous). Risk is the likelihood (probability) of harm actually occurring under defined conditions of exposure — dose, route, frequency and the population exposed — so a highly hazardous substance can carry low risk if exposure is tightly controlled. Pre-clinical safety testing works on the underlying principle of administering a large dose to a small number of animals and extrapolating the findings to a large number of humans who will each receive a small dose; animal studies thus generate hazard information that informs human risk. The acceptable level of risk is judged against benefit: greater risk is tolerated for a life-threatening condition (e.g. a chemotherapy agent) than for a drug used in healthy people (e.g. a contraceptive pill), reflecting Paracelsus's principle that the dose makes the poison.",
  },

  // ---- BLOCK 7 (extended) ----
  {
    id: "saq-b7-9", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "core",
    type: "saq", marks: 4,
    question: "Compare cohort, case-control and cross-sectional study designs, noting whether each is observational. (4 marks)",
    markScheme: [
      { marks: 1, label: "Cohort: a longitudinal study following a group sharing a characteristic over time to investigate outcomes (observational)", patterns: [["cohort", "longitudinal"], ["follow", "over time"], ["group", "characteristic"]] },
      { marks: 1, label: "Case-control: compares two groups defined by an exposure/treatment (not randomly allocated); observational; useful for adverse effects", patterns: [["case control", "exposure"], ["not", "random"], ["compare", "two group"], ["adverse effect"]] },
      { marks: 1, label: "Cross-sectional: collects data from a population at a single time point (a snapshot); observational/descriptive", patterns: [["cross sectional", "time point"], ["snapshot"], ["one time"], ["descriptive"]] },
      { marks: 1, label: "All three are observational; a valid contrast/example is given (e.g. cohort = contraceptive users over years; case-control = clots vs COVID vaccination; cross-sectional = adherence snapshot)", patterns: [["observational"], ["contraceptive"], ["clot"], ["adherence"], ["framingham"]] },
    ],
    modelAnswer: "A cohort study is a longitudinal (observational) study that follows a group sharing a common characteristic over time to investigate outcomes — e.g. long-term consequences of oral contraceptives. A case-control study (observational) compares two groups defined by an exposure or treatment, not by random allocation — useful for identifying adverse effects, e.g. blood clots versus COVID-19 vaccination. A cross-sectional study collects data from a sample of a population at a single point in time (a snapshot) and is observational/descriptive — e.g. the proportion of patients adhering to a prescribed drug. All three are observational, in contrast to a randomised controlled trial.",
    modelExpanded: "These are all observational study designs (no random allocation of treatment, unlike an RCT). A cohort study is longitudinal: a cohort (group) sharing a common characteristic (e.g. birth date, occupation, exposure) is followed and measured repeatedly over a period — often years — to investigate the long-term consequences of a treatment or exposure (e.g. the long-term effects of oral contraceptives, or the Framingham heart study). A case-control study compares two groups of patients identified on the basis of an exposure or treatment (e.g. one group that received a drug versus one that did not); patients are not allocated randomly, so it is observational and is often used to identify adverse effects or factors affecting response (e.g. the relationship between blood clots and COVID-19 vaccination). A cross-sectional study collects data from a sample of a population at a single defined time point, giving a descriptive 'snapshot' (e.g. the proportion of patients adhering to a prescribed drug) rather than testing a hypothesis over time.",
  },
  {
    id: "saq-b7-10", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "core",
    type: "saq", marks: 4,
    question: "Explain what is meant by the statistical power of a clinical trial and state the two main factors that determine it. Why does a trial of a rare disease pose a problem? (4 marks)",
    markScheme: [
      { marks: 1, label: "Power = the probability of correctly rejecting a false null hypothesis (detecting a true effect)", patterns: [["reject", "false null"], ["detect", "true effect"], ["probability", "real effect"]] },
      { marks: 1, label: "Equivalently, the likelihood of avoiding a false-negative result (as power rises, error falls)", patterns: [["false negative"], ["avoid", "error"], ["error decreases"]] },
      { marks: 1, label: "Power increases with sample size (number of subjects)", patterns: [["sample size"], ["number of subject"], ["more subject"]] },
      { marks: 1, label: "Power increases with the size of the effect being detected; a rare disease limits recruitable subjects → lower power", patterns: [["effect size"], ["size of the effect"], ["rare disease"], ["limit", "subject"], ["few", "patient"]] },
    ],
    modelAnswer: "The statistical power of a trial is the probability of correctly rejecting a false null hypothesis — i.e. of detecting a true effect when one really exists (equivalently, of avoiding a false-negative result); as power increases, the chance of error decreases. The two main factors that determine it are the sample size (number of subjects — more subjects gives higher power) and the size of the effect being detected (a larger effect is detected more reliably). A trial of a rare disease poses a problem because the number of patients that can be recruited is limited, which reduces the sample size and therefore the power, making a true effect harder to demonstrate.",
    modelExpanded: "Statistical tests estimate the probability that a result differs from the null hypothesis; two means are usually said to differ significantly if P<0.05. However, a P<0.05 result can arise even when there is no real difference (a false positive), and a non-significant result (P>0.05) can occur even when a real difference exists (a false negative). The statistical power of a test is the probability of correctly rejecting a false null hypothesis — i.e. the likelihood of detecting a true effect and not making a false-negative error; as power increases, the chance of error decreases. Two main factors affect power: the sample size (the more subjects recruited, the higher the power and the lower the chance of a false negative or positive) and the size of the effect being detected (larger effects are detected more reliably). A good trial therefore recruits a large number of volunteers — but this is not always possible, for example when testing a drug for a rare disease, where the limited number of recruitable patients caps the achievable power.",
  },
  {
    id: "saq-b7-11", topic: "B7 · Pharmaceutical Dev & Clinical Evaluation", lecture: "Clinical evaluation", source: "core",
    type: "saq", marks: 4,
    question: "Describe a crossover clinical trial design, giving two advantages and two limitations. (4 marks)",
    markScheme: [
      { marks: 1, label: "Every subject receives all the treatments/doses, administered in a randomised order, with a wash-out period between them", patterns: [["all treatments"], ["randomised order"], ["wash out"], ["each", "all", "dose"]] },
      { marks: 1, label: "Advantage: each subject is their own control (lower within-subject variability)", patterns: [["own control"], ["within subject"], ["each subject", "control"]] },
      { marks: 1, label: "Advantage: treatments tested in every subject; fewer subjects required", patterns: [["fewer subject"], ["every subject"], ["less subject"]] },
      { marks: 1, label: "Limitations (any two): carry-over between treatments; order effects; highest dose may be given first (safety); higher drop-out", patterns: [["carry over"], ["order", "effect"], ["highest dose first"], ["drop out"]] },
    ],
    modelAnswer: "In a crossover trial every subject receives all of the treatments (or doses), administered in a randomised order, with a wash-out period between each to allow the previous drug to clear; each treatment is then compared with the control. Advantages: each subject acts as their own control (so within-subject variability is smaller than between-subject variability) and every treatment is tested in every subject, so fewer subjects are required. Limitations: there may be carry-over between treatments and the order in which treatments are given may affect the outcome; a subject might receive the highest dose first (a safety concern); and subjects are more likely to drop out before the (longer) trial finishes.",
    modelExpanded: "A crossover study is a clinical trial structure in which every subject receives the same set of treatments or doses, but administered in a randomised order, with a wash-out period between each administration to allow the previous drug to be cleared; at the end, the data from each treatment/dose are compared against the controls. Its advantages stem from each subject serving as their own control: within-subject variability is smaller than between-subject variability, every treatment is tested in every subject, and consequently fewer subjects are needed than in a parallel-group design. Its limitations are that there may be carry-over of effect between treatments; the order in which doses/treatments are given may itself influence the outcome; a subject might be given the highest dose first, which may not be safe; and, because each subject completes a longer sequence, drop-out before the trial finishes is more likely.",
  },

  // ---- BLOCK 8 (extended) ----
  {
    id: "saq-b8-9", topic: "B8 · 21st-Century Approaches", lecture: "PROTACs", source: "core",
    type: "saq", marks: 4,
    question: "Explain the ‘hook effect’ seen with PROTACs at high concentrations, and state why only a few E3 ligases are currently used. (4 marks)",
    markScheme: [
      { marks: 1, label: "PROTACs work by forming a productive ternary complex (target–PROTAC–E3 ligase) that drives ubiquitination/degradation", patterns: [["ternary complex"], ["target", "e3", "complex"], ["bring together"], ["ubiquitin"]] },
      { marks: 1, label: "At high PROTAC concentrations the two warheads bind target and E3 ligase on separate molecules (binary complexes)", patterns: [["high concentration", "separate"], ["binary"], ["saturate", "separate"], ["each warhead", "separate"]] },
      { marks: 1, label: "This prevents productive ternary-complex formation, so degradation falls at high concentrations (bell-shaped/‘hook’ response)", patterns: [["prevent", "ternary"], ["degradation", "fall"], ["bell shaped"], ["hook"]] },
      { marks: 1, label: "Only ~4 of the >600 human E3 ligases have so far been successfully exploited for PROTAC design", patterns: [["4 e3"], ["four", "ligase"], ["600"], ["few", "e3"]] },
    ],
    modelAnswer: "PROTACs act by forming a productive ternary complex that brings the target protein and an E3 ubiquitin ligase together, leading to ubiquitination and proteasomal degradation. At high PROTAC concentrations, the two warheads increasingly bind the target and the E3 ligase on separate molecules (forming binary complexes), so the productive ternary complex cannot form. Degradation therefore decreases at high concentrations, giving a bell-shaped ('hook') concentration–response. Only about 4 of the >600 human E3 ligases have so far been successfully exploited for PROTAC design.",
    modelExpanded: "A PROTAC must simultaneously engage its target protein (warhead 1) and an E3 ubiquitin ligase (warhead 2) to assemble a productive ternary complex (target–PROTAC–E3 ligase); this proximity allows the E3 ligase to poly-ubiquitinate the target, tagging it for proteasomal degradation. The 'hook effect' arises at high PROTAC concentrations: there is now so much PROTAC that, statistically, individual molecules tend to occupy the target and the E3 ligase on separate molecules (forming unproductive binary complexes) rather than bridging the two into a ternary complex. Because ternary-complex formation is required for ubiquitination, degradation paradoxically decreases as concentration rises, producing a characteristic bell-shaped (hook-shaped) concentration–response curve. The narrow choice of E3 ligases is a further challenge: although the human genome encodes more than 600 E3 ligases, only about four have so far been successfully harnessed in PROTAC design, limiting tissue selectivity and the range of targets that can be degraded.",
  },
  {
    id: "saq-b8-10", topic: "B8 · 21st-Century Approaches", lecture: "Biologics", source: "2024",
    type: "saq", marks: 5,
    question: "Describe the pharmacokinetics of monoclonal antibodies under ADME headings, explaining why they differ from small molecules. (5 marks)",
    markScheme: [
      { marks: 1, label: "Absorption: not orally bioavailable (digested) → given parenterally, with delayed Tmax from the injection site", patterns: [["not", "oral"], ["digest"], ["parenteral"], ["injection"]] },
      { marks: 1, label: "Distribution: limited (large size/charge), largely via the lymphatic system → small Vd (~2–4 L)", patterns: [["lymphatic"], ["limited", "distribution"], ["small", "vd"], ["size", "charge"]] },
      { marks: 1, label: "Metabolism: degraded by intracellular lysosomal proteolysis (not CYP450)", patterns: [["proteolys"], ["lysosom"], ["not", "cyp"]] },
      { marks: 1, label: "Elimination/half-life: FcRn recycling gives long half-lives (~3–4 weeks); small fragments (<69 kDa) can be renally excreted; often non-linear/target-mediated", patterns: [["fcrn"], ["3", "4 week"], ["long half life"], ["non linear"], ["target mediated"], ["69"]] },
      { marks: 1, label: "Immunogenicity (anti-drug antibodies) is the main safety issue and can alter clearance; few drug–drug interactions", patterns: [["immunogenic"], ["anti drug antibod"], ["clearance", "change"], ["few", "interaction"]] },
    ],
    modelAnswer: "Absorption: monoclonal antibodies are not orally bioavailable (they are digested), so they are given parenterally, with a delayed Tmax due to slow transfer from the injection site. Distribution: it is limited by their large size and charge and occurs largely via the lymphatic system, giving a small Vd (~2–4 L). Metabolism: they are degraded by intracellular lysosomal proteolysis throughout the body, not by CYP450. Elimination/half-life: FcRn-mediated recycling gives long half-lives (~3–4 weeks), small fragments (<69 kDa) can be excreted by the kidney, and the kinetics are often non-linear (target-mediated). In addition, immunogenicity (anti-drug antibodies) is the main safety issue and can change clearance over time, and drug–drug interactions are limited.",
    modelExpanded: "The PK of monoclonal antibodies differs fundamentally from small molecules. Absorption: as large proteins they are destroyed in the gut, so they are not orally bioavailable and must be given parenterally (e.g. SC or IV); after SC dosing there is a delayed Tmax owing to slow transfer from the injection site. Distribution: their large size, charge and tight target binding limit distribution, which occurs largely via the lymphatic system rather than across membranes, giving a small volume of distribution (~2–4 L, roughly the plasma/vascular volume). Metabolism: rather than CYP450 metabolism, antibodies are broken down by intracellular lysosomal proteolytic degradation occurring throughout the body. Elimination and half-life: FcRn-mediated recycling rescues IgG from degradation, giving long half-lives (~3–4 weeks); small fragments (<69 kDa) can be excreted directly by the kidney; and clearance is frequently non-linear because of target-mediated drug disposition. Finally, the dominant safety/clearance consideration is immunogenicity — anti-drug antibodies can form and alter clearance over the course of treatment — while classical drug–drug interactions are limited because antibodies are handled as endogenous proteins (though cytokine-mediated changes in drug-metabolising enzymes are watched for).",
  },
  {
    id: "saq-b8-11", topic: "B8 · 21st-Century Approaches", lecture: "Drug repurposing", source: "core",
    type: "saq", marks: 4,
    question: "Outline how BenevolentAI used artificial intelligence to repurpose baricitinib for COVID-19. (4 marks)",
    markScheme: [
      { marks: 1, label: "They used an AI-driven biomedical knowledge graph (linking drugs, genes, proteins, mechanisms and pathways)", patterns: [["knowledge graph"], ["ai", "graph"], ["biomedical", "data"]] },
      { marks: 1, label: "It identified AAK1 as a regulator of clathrin-mediated endocytosis used by SARS-CoV-2 to enter cells", patterns: [["aak1"], ["clathrin"], ["endocytosis"], ["viral entry"]] },
      { marks: 1, label: "Among approved AAK1 inhibitors, baricitinib ranked highest", patterns: [["baricitinib", "rank"], ["aak1 inhibitor"], ["approved", "highest"]] },
      { marks: 1, label: "Baricitinib also inhibits JAK1/2 → suppresses the cytokine storm; predicted Jan 2020 → trials → FDA EUA (Nov 2020)", patterns: [["jak"], ["cytokine"], ["emergency use"], ["eua"], ["fda"]] },
    ],
    modelAnswer: "BenevolentAI used its AI-driven biomedical knowledge graph (linking drugs, genes, proteins, mechanisms and pathways) to interrogate COVID-19 biology. The AI identified AAK1 (AP2-associated protein kinase 1) as a key regulator of clathrin-mediated endocytosis — the process SARS-CoV-2 uses to enter human cells. Among all FDA-approved AAK1 inhibitors, baricitinib ranked highest, because as well as inhibiting AAK1 (potentially reducing viral entry) it blocks JAK1/2, which can suppress the cytokine storm in severe COVID-19. Predicted in January 2020 (published in The Lancet), it entered trials, and in November 2020 the FDA granted Emergency Use Authorization — a real-world demonstration of AI in drug repurposing.",
    modelExpanded: "BenevolentAI was the first company to use AI successfully to identify a drug to repurpose for COVID-19 (to inhibit viral entry/replication and/or suppress the inflammatory response). They used a proprietary AI-driven biomedical knowledge graph — a structured representation of drugs, genes and proteins together with mechanisms, processes and pathways — and interactive tools (graph-pattern querying and protein–protein interaction network analysis) to find approved anti-inflammatory drugs and to map the mechanisms the virus exploits. The AI identified AAK1 (AP2-associated protein kinase 1) as a key regulator of clathrin-mediated endocytosis, a route SARS-CoV-2 uses to enter human cells. Among all FDA-approved drugs that inhibit AAK1, baricitinib ranked highest because it both inhibits AAK1 (which may reduce viral entry) and blocks JAK1/2 (which can suppress the cytokine storm seen in severe cases). The timeline shows the real-world impact: predicted and proposed in The Lancet in January 2020, baricitinib entered clinical trials by April 2020, the ACTT-2 trial (baricitinib + remdesivir) showed reduced recovery time and mortality, the FDA granted Emergency Use Authorization in November 2020, and full approval followed in May 2022.",
  },
];

if (typeof window !== "undefined") window.SAQ_BANK = SAQ_BANK;
