export type TodoType = 'warmup' | 'theory' | 'mcq' | 'review' | 'snapshot' | 'flashcard' | 'mock';

export interface Todo {
  id: string;
  text: string;
  duration: string;
  type: TodoType;
}

export type PhaseNum = 1 | 2 | 3 | 4 | 5;

export interface DayPlan {
  day: number;
  date: string;
  title: string;
  subtitle: string;
  phase: PhaseNum;
  phaseLabel: string;
  subject: string;
  subjectColor: string;
  isSnapshotDay: boolean;
  totalMinutes: number;
  snapshotReview?: string[];
  todos: Todo[];
}

// ─── helpers ────────────────────────────────────────────────────────────────

function t(day: number, idx: number): string {
  return `d${day}-t${idx}`;
}

function stdDay(
  day: number, date: string, title: string, subtitle: string,
  phase: PhaseNum, phaseLabel: string, subject: string, subjectColor: string,
  warmup: string,
  block1: string, block2: string,
  mcqText: string, mcqCount: number,
  snapshotText: string,
  block3?: string,
): DayPlan {
  const todos: Todo[] = [
    { id: t(day, 1), text: warmup, duration: '15 min', type: 'warmup' },
    { id: t(day, 2), text: block1, duration: '40 min', type: 'theory' },
    { id: t(day, 3), text: block2, duration: '35 min', type: 'theory' },
  ];
  if (block3) todos.push({ id: t(day, 4), text: block3, duration: '30 min', type: 'theory' });
  todos.push(
    { id: t(day, 5), text: `MCQ Drill: Solve ${mcqCount} ${mcqText} PYQ questions from the bank`, duration: '45 min', type: 'mcq' },
    { id: t(day, 6), text: 'Error Review: Go through every wrong answer — write one-line explanation in margin', duration: '20 min', type: 'review' },
    { id: t(day, 7), text: snapshotText, duration: '15 min', type: 'snapshot' },
    { id: t(day, 8), text: 'Flashcards: Create 5 cards for the hardest points from today', duration: '10 min', type: 'flashcard' },
  );
  const minutes = 15 + 40 + 35 + (block3 ? 30 : 0) + 45 + 20 + 15 + 10;
  return { day, date, title, subtitle, phase, phaseLabel, subject, subjectColor, isSnapshotDay: false, totalMinutes: minutes, todos };
}

function snapDay(
  day: number, date: string, title: string,
  phase: PhaseNum, phaseLabel: string,
  reviews: Array<{ topic: string; qs: number }>,
  snapshotReview: string[],
): DayPlan {
  const todos: Todo[] = [];
  let idx = 1;
  reviews.forEach((r, i) => {
    todos.push({ id: t(day, idx++), text: `Block ${i + 1} — ${r.topic}: Re-read snapshot bullets → solve ${r.qs} targeted MCQs`, duration: '30 min', type: 'snapshot' });
  });
  todos.push(
    { id: t(day, idx++), text: `Mixed Marathon: ${reviews.length * 15 + 5} unseen MCQs blending all reviewed topics`, duration: '50 min', type: 'mcq' },
    { id: t(day, idx++), text: 'Error Deep Dive: For each wrong answer write WHY you got it wrong + correct concept', duration: '25 min', type: 'review' },
    { id: t(day, idx++), text: 'Flashcard Sprint: Run through ALL flashcards from the reviewed days', duration: '15 min', type: 'flashcard' },
    { id: t(day, idx++), text: 'Consolidation: Read all review-day snapshots back-to-back without notes', duration: '15 min', type: 'snapshot' },
  );
  const minutes = reviews.length * 30 + 50 + 25 + 15 + 15;
  return { day, date, title, subtitle: `Spaced Repetition Review`, phase, phaseLabel, subject: 'Revision', subjectColor: 'purple', isSnapshotDay: true, totalMinutes: minutes, snapshotReview, todos };
}

// ─── Full 60-Day Plan ────────────────────────────────────────────────────────

export const PLAN: DayPlan[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 1 — GUARANTEED TOPICS (Days 1–12)  ← appear in ALL 9 papers
  // ═══════════════════════════════════════════════════════════════════════════

  {
    day: 1, date: '2026-09-20',
    title: 'Diabetes Mellitus', subtitle: 'DM Types · DKA · HHS · Insulin',
    phase: 1, phaseLabel: 'Phase 1 — Guaranteed Topics',
    subject: 'Medicine', subjectColor: 'blue', isSnapshotDay: false, totalMinutes: 215,
    todos: [
      { id: 'd1-t1', text: 'Warm-up: Skim the DM chapter headings & tables in Harrison\'s — just 2 pages overview (no deep reading)', duration: '15 min', type: 'warmup' },
      { id: 'd1-t2', text: 'Theory Block 1 — DM Basics: Type 1 vs Type 2 pathophysiology, WHO/ADA 2023 diagnostic criteria (FPG ≥126, 2hPG ≥200, HbA1c ≥6.5%), LADA, MODY overview', duration: '40 min', type: 'theory' },
      { id: 'd1-t3', text: 'Theory Block 2 — DM Management: Lifestyle, metformin first line, stepwise add-on (SGLT2i, GLP-1 RA, DPP4i), insulin types & timing (rapid/short/intermediate/long), combination regimens', duration: '40 min', type: 'theory' },
      { id: 'd1-t4', text: 'Theory Block 3 — Complications: DKA vs HHS comparison table (onset, age, glucose, ketones, pH, osmolarity), DKA management (fluids → insulin → K+ correction protocol), hypoglycaemia management', duration: '35 min', type: 'theory' },
      { id: 'd1-t5', text: 'MCQ Drill: Solve 30 DM-focused PYQ questions. Prioritise DKA management, drug mechanism, HbA1c targets', duration: '45 min', type: 'mcq' },
      { id: 'd1-t6', text: 'Error Review: Go through every wrong answer — write one-line concept fix in the margin of your question sheet', duration: '20 min', type: 'review' },
      { id: 'd1-t7', text: 'Snapshot: Write 10-bullet DM summary in notes/medicine.md (DKA vs HHS table + insulin names + diagnostic criteria)', duration: '20 min', type: 'snapshot' },
      { id: 'd1-t8', text: 'Flashcards: Make 6 cards — (1) DM diagnostic criteria, (2) DKA vs HHS, (3) insulin types, (4) SGLT2i drugs, (5) DKA K+ protocol, (6) HbA1c targets', duration: '10 min', type: 'flashcard' },
    ],
  },

  {
    day: 2, date: '2026-09-21',
    title: 'Liver Disease & Jaundice', subtitle: 'Hepatitis Serology · Cirrhosis · Portal HTN',
    phase: 1, phaseLabel: 'Phase 1 — Guaranteed Topics',
    subject: 'Medicine', subjectColor: 'blue', isSnapshotDay: false, totalMinutes: 210,
    todos: [
      { id: 'd2-t1', text: 'Warm-up: Read yesterday\'s 10-bullet DM snapshot in notes/medicine.md (no re-studying, just recall)', duration: '10 min', type: 'warmup' },
      { id: 'd2-t2', text: 'Theory Block 1 — Jaundice: Pre-hepatic/hepatic/post-hepatic classification, bilirubin metabolism steps, unconjugated vs conjugated causes, LFT patterns per type', duration: '35 min', type: 'theory' },
      { id: 'd2-t3', text: 'Theory Block 2 — Viral Hepatitis: Hep A/B/C/D/E — routes (faeco-oral vs parenteral), incubation, serology markers (HBsAg, anti-HBs, HBeAg, anti-HBc IgM/IgG, anti-HCV), treatment (DAAs for HCV, tenofovir/entecavir for HBV)', duration: '45 min', type: 'theory' },
      { id: 'd2-t4', text: 'Theory Block 3 — Cirrhosis: Child-Pugh scoring (5 parameters), complications (ascites, SBP diagnosis & Rx, hepatorenal syndrome, hepatic encephalopathy grading & Rx, HCC surveillance)', duration: '35 min', type: 'theory' },
      { id: 'd2-t5', text: 'MCQ Drill: Solve 30 Liver/Jaundice PYQ questions — focus on serology interpretation and Child-Pugh score', duration: '45 min', type: 'mcq' },
      { id: 'd2-t6', text: 'Error Review: Annotate wrong answers — hepatitis serology is the #1 confusion zone', duration: '20 min', type: 'review' },
      { id: 'd2-t7', text: 'Snapshot: Create hepatitis serology comparison table in notes/medicine.md + Child-Pugh parameters', duration: '15 min', type: 'snapshot' },
      { id: 'd2-t8', text: 'Flashcards: 5 cards — (1) Hep B serology window period, (2) Child-Pugh score, (3) SBP diagnosis criteria, (4) jaundice LFT pattern, (5) HBV vs HCV treatment', duration: '10 min', type: 'flashcard' },
    ],
  },

  {
    day: 3, date: '2026-09-22',
    title: 'Anaemia & Haematology', subtitle: 'Classification · IDA · Haemolytic · Sickle Cell',
    phase: 1, phaseLabel: 'Phase 1 — Guaranteed Topics',
    subject: 'Medicine', subjectColor: 'blue', isSnapshotDay: false, totalMinutes: 205,
    todos: [
      { id: 'd3-t1', text: 'Warm-up: Rapid recall quiz — name 5 DM facts + hepatitis B serology window period (don\'t open notes)', duration: '10 min', type: 'warmup' },
      { id: 'd3-t2', text: 'Theory Block 1 — Classification: WHO Hb cutoffs by age/sex, morphological (micro/macro/normo + hypo/normo/hyper), etiological framework. IDA workup: serum ferritin, TIBC, iron, peripheral smear (pencil cells)', duration: '35 min', type: 'theory' },
      { id: 'd3-t3', text: 'Theory Block 2 — Megaloblastic & Sideroblastic: B12 vs folate deficiency differentiation, subacute combined degeneration (B12 only), sideroblastic causes & ring sideroblasts on Prussian blue', duration: '35 min', type: 'theory' },
      { id: 'd3-t4', text: 'Theory Block 3 — Haemolytic Anaemias: Intravascular vs extravascular signs, sickle cell (HbSS, crisis types, Hb electrophoresis), thalassemia (alpha vs beta, genetics, HbA2 in beta-thal), G6PD deficiency triggers', duration: '35 min', type: 'theory' },
      { id: 'd3-t5', text: 'MCQ Drill: Solve 25 Anaemia PYQ questions — peripheral smear interpretation questions are highest yield', duration: '40 min', type: 'mcq' },
      { id: 'd3-t6', text: 'Error Review: Focus on confusion between IDA vs thalassaemia trait (both microcytic)', duration: '20 min', type: 'review' },
      { id: 'd3-t7', text: 'Snapshot: Anaemia comparison table in notes/medicine.md (MCV, MCH, ferritin, TIBC, smear, treatment per type)', duration: '20 min', type: 'snapshot' },
      { id: 'd3-t8', text: 'Flashcards: 5 cards — (1) IDA vs thalassemia trait, (2) B12 vs folate deficiency, (3) sickle cell crisis types, (4) G6PD triggers, (5) WHO Hb cutoffs', duration: '10 min', type: 'flashcard' },
    ],
  },

  snapDay(4, '2026-09-23',
    '🔁 Snapshot Review — DM · Liver · Anaemia',
    1, 'Phase 1 — Guaranteed Topics',
    [
      { topic: 'Diabetes Mellitus (DM)', qs: 15 },
      { topic: 'Liver Disease & Jaundice', qs: 15 },
      { topic: 'Anaemia & Haematology', qs: 15 },
    ],
    ['DKA vs HHS differences', 'Hepatitis B serology: HBsAg, anti-HBs, HBeAg, window period', 'IDA vs thalassemia trait differentiation', 'Child-Pugh score 5 parameters', 'DM diagnostic criteria numbers (FPG 126, HbA1c 6.5%)', 'Anaemia WHO Hb cutoffs']
  ),

  {
    day: 5, date: '2026-09-24',
    title: 'Neoplasia & Tumor Markers', subtitle: 'Benign vs Malignant · Carcinogenesis · Markers Table',
    phase: 1, phaseLabel: 'Phase 1 — Guaranteed Topics',
    subject: 'Pathology', subjectColor: 'orange', isSnapshotDay: false, totalMinutes: 215,
    todos: [
      { id: 'd5-t1', text: 'Warm-up: 5 random flashcards from Days 1–3 (DM, Hepatitis, Anaemia) — test yourself without notes', duration: '10 min', type: 'warmup' },
      { id: 'd5-t2', text: 'Theory Block 1 — Benign vs Malignant: 8 classic differences (differentiation, growth rate, mitoses, invasion, metastasis, recurrence, necrosis, nuclear features). Metastasis pathways: lymphatic, haematogenous, transcoelomic, perineural', duration: '40 min', type: 'theory' },
      { id: 'd5-t3', text: 'Theory Block 2 — Carcinogenesis: Chemical (initiators vs promoters), radiation (UV → skin, X-ray → leukaemia), viral oncogenesis (HPV 16/18 → cervix, HBV/HCV → HCC, EBV → Burkitt/NPC, HTLV-1 → T-cell leukaemia). Oncogenes vs tumour suppressor genes (p53, RB, BRCA)', duration: '35 min', type: 'theory' },
      { id: 'd5-t4', text: 'Theory Block 3 — Tumor Markers: Memorise full table: AFP (HCC + yolk sac), CEA (colorectal), CA-125 (ovary), PSA (prostate), CA-19-9 (pancreas), β-HCG (choriocarcinoma + testis), LDH (lymphoma + testis), NSE (small cell lung + neuroblastoma), Calcitonin (medullary thyroid), S-100 (melanoma + schwannoma)', duration: '25 min', type: 'theory' },
      { id: 'd5-t5', text: 'MCQ Drill: Solve 40 Neoplasia/Tumor Marker PYQ questions — tumor marker Qs are 100% repeated', duration: '50 min', type: 'mcq' },
      { id: 'd5-t6', text: 'Error Review: Note which malignancies share markers (HCG in choriocarcinoma AND testicular)', duration: '20 min', type: 'review' },
      { id: 'd5-t7', text: 'Snapshot: Write tumor markers table + 8 differences benign/malignant in notes/pathology.md', duration: '20 min', type: 'snapshot' },
      { id: 'd5-t8', text: 'Flashcards: 6 cards — (1) AFP cancers, (2) CEA/CA-125/PSA, (3) β-HCG uses, (4) viral carcinogens, (5) oncogenes examples, (6) metastasis routes', duration: '10 min', type: 'flashcard' },
    ],
  },

  {
    day: 6, date: '2026-09-25',
    title: 'Viral Infections & Exanthemata', subtitle: 'Measles · HIV · Dengue · Hepatitis Virology',
    phase: 1, phaseLabel: 'Phase 1 — Guaranteed Topics',
    subject: 'Microbiology', subjectColor: 'teal', isSnapshotDay: false, totalMinutes: 215,
    todos: [
      { id: 'd6-t1', text: 'Warm-up: Tumor markers recall — name the cancer for AFP, CEA, PSA, CA-125, CA-19-9, Calcitonin (close notes)', duration: '10 min', type: 'warmup' },
      { id: 'd6-t2', text: 'Theory Block 1 — Exanthemata Comparison Table: Measles (Koplik spots, 3Cs: cough/coryza/conjunctivitis, descending rash), Rubella (Forchheimer spots, lymphadenopathy, CRS), Chickenpox (centripetal, crops, dew-drops), Smallpox (centrifugal, same-stage lesions, palmoplantar), Roseola (rose-coloured, fever resolves when rash appears)', duration: '45 min', type: 'theory' },
      { id: 'd6-t3', text: 'Theory Block 2 — Arboviruses: Dengue (NS1 Ag days 1–5, IgM days 5+, tourniquet test, warning signs, dengue shock criteria, fluid management), Chikungunya vs Zika distinguishing features', duration: '30 min', type: 'theory' },
      { id: 'd6-t4', text: 'Theory Block 3 — HIV: WHO clinical staging (1–4), CD4 thresholds (ART <500, PCP prophylaxis <200, MAC prophylaxis <50), AIDS-defining illnesses list, WHO 2024 ART first line (TDF+3TC+DTG), PMTCT protocol', duration: '35 min', type: 'theory' },
      { id: 'd6-t5', text: 'MCQ Drill: Solve 40 Viral infection PYQ questions — exanthemata comparison Qs appear every year', duration: '50 min', type: 'mcq' },
      { id: 'd6-t6', text: 'Error Review: Chickenpox vs smallpox differentiation is most commonly tested confusion', duration: '20 min', type: 'review' },
      { id: 'd6-t7', text: 'Snapshot: Exanthemata comparison table (6 features per disease) + HIV staging table in notes/microbiology.md', duration: '20 min', type: 'snapshot' },
      { id: 'd6-t8', text: 'Flashcards: 6 cards — (1) Koplik vs Forchheimer, (2) dengue diagnostic tests & timing, (3) HIV CD4 thresholds, (4) dengue warning signs, (5) CRS features, (6) ART first-line WHO 2024', duration: '10 min', type: 'flashcard' },
    ],
  },

  {
    day: 7, date: '2026-09-26',
    title: 'Neurology — Stroke, Seizures, Meningitis', subtitle: 'Stroke Management · Epilepsy Drugs · CSF Analysis',
    phase: 1, phaseLabel: 'Phase 1 — Guaranteed Topics',
    subject: 'Medicine', subjectColor: 'blue', isSnapshotDay: false, totalMinutes: 230,
    todos: [
      { id: 'd7-t1', text: 'Warm-up: Read Neoplasia + Viral snapshots from Days 5–6 (just scan the tables, 5 min each)', duration: '10 min', type: 'warmup' },
      { id: 'd7-t2', text: 'Theory Block 1 — Stroke: Ischaemic (TOAST classification: LAA/CE/SVO/cryptogenic) vs haemorrhagic, FAST mnemonic, NIHSS, thrombolysis window (4.5h ischaemic), contraindications to tPA, TIA vs stroke, lacunar stroke syndromes', duration: '40 min', type: 'theory' },
      { id: 'd7-t3', text: 'Theory Block 2 — Epilepsy: ILAE 2017 classification (focal/generalised/unknown), first-line drugs by type (absence→ethosuximide, generalised tonic-clonic→valproate/levetiracetam, focal→carbamazepine/lamotrigine), status epilepticus protocol (BZD → phenytoin/fosphenytoin → anaesthesia), pregnancy cautions', duration: '35 min', type: 'theory' },
      { id: 'd7-t4', text: 'Theory Block 3 — Meningitis: CSF analysis comparison table (bacterial vs viral vs TB vs fungal: appearance, WBC, differential, protein, glucose, special tests), empirical treatment by age group, Cryptococcus in HIV (India ink), tuberculous meningitis (fibrin web, low glucose)', duration: '30 min', type: 'theory' },
      { id: 'd7-t5', text: 'MCQ Drill: Solve 35 Neurology PYQ questions — CSF analysis scenario Qs are very common', duration: '45 min', type: 'mcq' },
      { id: 'd7-t6', text: 'Error Review: Stroke thrombolysis window and CSF interpretation are the two zones most often missed', duration: '20 min', type: 'review' },
      { id: 'd7-t7', text: 'Snapshot: CSF analysis table + stroke management algorithm in notes/medicine.md', duration: '20 min', type: 'snapshot' },
      { id: 'd7-t8', text: 'Flashcards: 6 cards — (1) CSF bacterial meningitis, (2) thrombolysis criteria, (3) absence epilepsy drug, (4) status epilepticus protocol, (5) stroke syndromes, (6) TB meningitis CSF', duration: '10 min', type: 'flashcard' },
      { id: 'd7-t9', text: '🏆 Weekly Wrap-up: Read ALL 7 days\' snapshots back-to-back (DM → Liver → Anaemia → Neoplasia → Viral → Neurology). This takes 25 min but locks in memory.', duration: '25 min', type: 'snapshot' },
    ],
  },

  snapDay(8, '2026-09-27',
    '🔁 Snapshot Review — Neoplasia · Viral Infections · Neurology',
    1, 'Phase 1 — Guaranteed Topics',
    [
      { topic: 'Neoplasia & Tumor Markers', qs: 15 },
      { topic: 'Viral Infections & Exanthemata', qs: 15 },
      { topic: 'Neurology', qs: 15 },
    ],
    ['Tumor markers full table (10 markers)', 'Exanthemata: 3 distinguishing features per disease', 'HIV CD4 thresholds for prophylaxis', 'CSF findings in bacterial vs TB meningitis', 'Thrombolysis window for stroke', 'Status epilepticus step protocol']
  ),

  stdDay(9, '2026-09-28', 'Endocrine Physiology', 'Thyroid · Adrenal · Pituitary · Insulin Physiology',
    1, 'Phase 1 — Guaranteed Topics', 'Physiology', 'indigo',
    'Warm-up: Quick recall — name 3 DM drugs and 2 exanthemata distinguishing features',
    'Thyroid: synthesis steps (MIT → DIT → T3/T4), TBG binding, negative feedback axis, TFTs interpretation (TSH, fT4, fT3), sick euthyroid syndrome',
    'Adrenal: cortex zones (GFR = mineralocorticoid/glucocorticoid/sex), cortisol diurnal rhythm, ACTH stimulation test, Cushing vs Addison features',
    'MCQ on Endocrine Physiology', 25,
    'Snapshot: Endocrine axes diagrams + TFT interpretation rules in notes/physiology.md',
    'Pituitary hormones: anterior (FSH/LH/ACTH/TSH/GH/PRL) vs posterior (ADH/Oxytocin), insulin physiology (release triggers, counter-regulatory hormones, incretin effect)',
  ),

  stdDay(10, '2026-09-29', 'Neonatal Problems', 'Jaundice · NRP · HIE · Prematurity',
    1, 'Phase 1 — Guaranteed Topics', 'Paediatrics', 'pink',
    'Warm-up: Endocrine physiology flashcard — TFT pattern in hypothyroidism vs sick euthyroid',
    'Neonatal Jaundice: physiological vs pathological criteria, Bhutani nomogram, phototherapy thresholds, exchange transfusion indications, causes (ABO/Rh incompatibility, G6PD, Crigler-Najjar)',
    'NRP (Neonatal Resuscitation Programme): ABCD steps, initial assessment, PPV criteria (apnoea/HR<100/gasping), CPAP vs intubation, epinephrine dose route',
    'MCQ on Neonatal topics', 25,
    'Snapshot: NRP algorithm flowchart + phototherapy thresholds table in notes/paediatrics.md',
    'HIE: Sarnat staging (I/II/III), therapeutic hypothermia criteria & window (6h, 72h duration), Prematurity complications (RDS, IVH, NEC, ROP, PDA)',
  ),

  stdDay(11, '2026-09-30', 'Enteric Fever + Imaging Modalities', 'Typhoid · Cholera · CT/MRI/USG Selection',
    1, 'Phase 1 — Guaranteed Topics', 'Microbiology + Radiology', 'teal',
    'Warm-up: Neonatal jaundice — phototherapy threshold & exchange transfusion indication numbers',
    'Enteric Fever: Widal titre (1:160 O-agglutinin diagnostic), Salmonella typhi culture gold standard (bone marrow), rose spots, relative bradycardia. Cholera: rice-water stools, El Tor biotype, ORS composition (WHO low-osmolarity), oral vs IV rehydration indications',
    'Food Poisoning Agents: Staph aureus (toxin, 2-4h), Bacillus cereus (emetic 1h, diarrhoeal 8h), Clostridium perfringens (8-16h), Clostridium botulinum (cranial nerve palsy, flaccid paralysis, descending)',
    'MCQ on Enteric + Imaging', 25,
    'Snapshot: Food poisoning comparison table + imaging modality selection rules in notes/microbiology.md',
    'Imaging Modality Selection: USG (first-line for abd, safe in pregnancy), CT (trauma, lung, bones, head — fast), MRI (soft tissue, spine, brain — no radiation), plain X-ray (chest, bone, KUB), mammography (breast screen), FNAC vs biopsy rules',
  ),

  snapDay(12, '2026-10-01',
    '🔁 Snapshot Review — Endocrine · Neonatal · Enteric/Imaging',
    1, 'Phase 1 — Guaranteed Topics',
    [
      { topic: 'Endocrine Physiology', qs: 12 },
      { topic: 'Neonatal Problems', qs: 12 },
      { topic: 'Enteric Fever & Imaging', qs: 12 },
    ],
    ['Thyroid axis: hypothalamus→pituitary→thyroid', 'NRP algorithm steps', 'Phototherapy threshold numbers', 'Widal diagnostic titre', 'Food poisoning onset times', 'Imaging modality: which for trauma, pregnancy, soft tissue']
  ),

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 2 — BIG FIVE DEEP DIVE (Days 13–40)
  // ═══════════════════════════════════════════════════════════════════════════

  stdDay(13, '2026-10-02', 'Cardiology — MI, ECG, Heart Failure', 'ACS · STEMI Management · ECG Changes · HF Classification',
    2, 'Phase 2 — Big Five Deep Dive', 'Medicine', 'blue',
    'Warm-up: Name the imaging modality for: trauma abdomen, soft tissue knee, early pregnancy, lung shadow',
    'MI: STEMI vs NSTEMI vs UA — ECG changes timeline (hyperacute T → ST elevation → Q waves → T inversion), Killip classification, initial management (MONA + dual antiplatelet), reperfusion (PCI < 90 min vs fibrinolysis <12h), contraindications to fibrinolysis',
    'Heart Failure: HFrEF vs HFpEF, NYHA classification, Framingham criteria, treatment: ACEi/ARB, β-blocker, spironolactone, SGLT2i (new 2022 guideline), acute pulmonary oedema management (LMNOP)',
    'MCQ on Cardiology', 30,
    'Snapshot: ECG MI timeline table + HF treatment algorithm in notes/medicine.md',
    'Arrhythmias: AF (rate vs rhythm control, CHA₂DS₂-VASc score, anticoagulation), VT vs SVT differentiation, wide vs narrow QRS, digoxin toxicity ECG changes, complete heart block management',
  ),

  stdDay(14, '2026-10-03', 'Nephrology', 'AKI · CKD · Nephrotic · Nephritic · Electrolytes',
    2, 'Phase 2 — Big Five Deep Dive', 'Medicine', 'blue',
    'Warm-up: MI management — MONA mnemonic + fibrinolysis time window',
    'AKI vs CKD: KDIGO AKI staging (creatinine ×1.5, ×2, ×3), pre-renal vs intrinsic vs post-renal differentiation, FeNa (< 1% pre-renal), urine Na, cast types. CKD staging (GFR < 60 for 3 months), anaemia of CKD (erythropoietin ↓), renal osteodystrophy',
    'Nephrotic syndrome: heavy proteinuria (>3.5g/day), hypoalbuminaemia, oedema, hyperlipidaemia. Causes: MCD (child), MN (adult), FSGS (HIV, heroin). Nephritic: haematuria + proteinuria + HTN + oliguria + RBC casts. Causes: post-strep GN, IgA nephropathy, SLE',
    'MCQ on Nephrology', 30,
    'Snapshot: AKI KDIGO staging + nephrotic vs nephritic comparison in notes/medicine.md',
    'Electrolytes: Hyponatraemia (euvolaemic → SIADH diagnosis & Rx), hyperkalaemia (ECG changes + emergency treatment: calcium gluconate → insulin/dextrose → kayexalate), hypocalcaemia (Chvostek, Trousseau, causes)',
  ),

  stdDay(15, '2026-10-04', 'Thyroid Disorders', 'Hypothyroidism · Graves · Thyroid Cancers · Thyroid Storm',
    2, 'Phase 2 — Big Five Deep Dive', 'Medicine', 'blue',
    'Warm-up: Nephrotic vs nephritic — write 4 differences from memory',
    'Hypothyroidism: Primary vs central, Hashimoto (anti-TPO, anti-thyroglobulin), features (myxoedema, delayed DTR), cretinism, myxoedema coma Rx (IV T4 + hydrocortisone + warm). TFT: ↑TSH, ↓fT4',
    'Hyperthyroidism: Graves (TSI antibody, exophthalmos, pretibial myxoedema), toxic adenoma, thyroiditis. Treatment: PTU vs carbimazole (carbimazole for most, PTU in 1st trimester), radioiodine, surgery. Thyroid storm: Lugol\'s iodine + beta-blocker + PTU + steroids + cooling',
    'MCQ on Thyroid', 25,
    'Snapshot: TFT interpretation table + thyroid storm management in notes/medicine.md',
    'Thyroid Cancers: PTC (most common, psammoma bodies, RET/PTC mutation, best prognosis), FTC (haematogenous spread), MTC (calcitonin marker, MEN2), ATC (worst prognosis). Surgical vs radioiodine Rx',
  ),

  snapDay(16, '2026-10-05',
    '🔁 Snapshot Review — Cardiology · Nephrology · Thyroid',
    2, 'Phase 2 — Big Five Deep Dive',
    [
      { topic: 'Cardiology (MI, ECG, HF)', qs: 15 },
      { topic: 'Nephrology', qs: 15 },
      { topic: 'Thyroid Disorders', qs: 15 },
    ],
    ['ECG MI changes timeline (4 stages)', 'NYHA classification + HF drugs', 'AKI KDIGO staging criteria', 'Nephrotic vs nephritic 4 differences', 'Thyroid storm management (4 drugs)', 'TFT pattern in primary hypothyroidism']
  ),

  stdDay(17, '2026-10-06', 'Tuberculosis', 'NTEP Protocol · ATT Regimens · MDR-TB · Drug SE',
    2, 'Phase 2 — Big Five Deep Dive', 'Medicine', 'blue',
    'Warm-up: Thyroid cancers — name the 4 types and their distinguishing feature each',
    'NTEP (formerly RNTCP): Presumptive TB diagnosis (CBNAAT/Xpert MTB-RIF as first test), treatment categories (Category I = new cases, Category II = retreatment), DOTS, treatment outcomes (cured, completed, failed, defaulted, died)',
    'ATT Regimens: HRZE for 2 months + HR for 4 months (new DS-TB), paediatric weight-band dosing, DOTS-Plus for MDR-TB (18–24 months), BdQ + DLM in XDR-TB. Drug side effects: HRZE — H=peripheral neuropathy (pyridoxine), R=hepatitis+orange urine, Z=hyperuricaemia+arthralgia, E=optic neuritis',
    'MCQ on Tuberculosis', 30,
    'Snapshot: ATT regimen table + drug side effects in notes/medicine.md',
    'Extra-pulmonary TB: TB meningitis (pyrazinamide crosses BBB, steroids adjunct), TB peritonitis (exudative), Pott\'s spine (paraplegia risk), adrenal TB (Addison\'s), primary complex, Ghon focus, miliary TB (HRCT) features',
  ),

  stdDay(18, '2026-10-07', 'Respiratory — Asthma, COPD, Pneumonia', 'Step-up Therapy · GOLD Staging · CAP Management',
    2, 'Phase 2 — Big Five Deep Dive', 'Medicine', 'blue',
    'Warm-up: TB drug side effects — which drug causes optic neuritis? Peripheral neuropathy?',
    'Asthma: GINA step-up therapy (Step 1–5), SABA + ICS + LABA + tiotropium + biologics. Severe asthma features (PEFR <50%, unable to speak, paradoxical breathing), life-threatening signs, acute management (SABA + ipratropium + systemic steroids + MgSO4)',
    'COPD: GOLD staging (FEV1% predicted: GOLD 1>80, 2=50–79, 3=30–49, 4<30), ABCD assessment, triple therapy (ICS + LABA + LAMA), acute exacerbation Rx, oxygen target SpO2 88–92% (hypercapnic risk)',
    'MCQ on Respiratory', 25,
    'Snapshot: Asthma step therapy + GOLD staging table in notes/medicine.md',
    'Pneumonia: CURB-65 score (admit ≥2), CAP vs HAP vs VAP, empirical antibiotics (CURB-65 0–1: amoxicillin, 2: hospital, ≥3: ICU dual/triple), atypical organisms (Mycoplasma: cold agglutinins, Legionella: urinary Ag, Chlamydia: single titre ≥1:512)',
  ),

  stdDay(19, '2026-10-08', 'Rheumatology + Gastroenterology', 'RA · SLE · Crohn vs UC · UGI Bleed',
    2, 'Phase 2 — Big Five Deep Dive', 'Medicine', 'blue',
    'Warm-up: CURB-65 criteria — name all 5 parameters',
    'Rheumatology: RA (2010 ACR/EULAR criteria, RF, anti-CCP, DMARD = MTX first line, biologics), SLE (2019 EULAR/ACR criteria: lupus nephritis class III/IV worst, anti-dsDNA, anti-Smith diagnostic, hydroxychloroquine for all), Gout (urate crystals negatively birefringent, allopurinol for prevention)',
    'IBD: Crohn vs UC — 8 differences (full-thickness vs mucosal, skip lesions vs continuous, rectal sparing vs rectal involvement, fistulas in Crohn, cobblestone appearance, string sign, no smoking risk in UC). Treatment: 5-ASA, steroids, azathioprine, anti-TNF (infliximab)',
    'MCQ on Rheumatology + Gastro', 30,
    'Snapshot: Crohn vs UC comparison table + SLE diagnostic criteria in notes/medicine.md',
    'UGI Bleeding: Rockford classification, Blatchford score for risk stratification, endoscopy (within 24h), adrenaline injection + thermal coagulation. Causes: PUD (H. pylori → CLO test, HP eradication triple therapy), Mallory-Weiss, oesophageal varices (terlipressin + antibiotics + endoscopic band ligation)',
  ),

  {
    day: 20, date: '2026-10-09',
    title: '🔁 Medicine Full Mock + Snapshot', subtitle: 'All Medicine Topics — 60 MCQ Sprint',
    phase: 2, phaseLabel: 'Phase 2 — Big Five Deep Dive',
    subject: 'Medicine', subjectColor: 'blue', isSnapshotDay: true, totalMinutes: 230,
    snapshotReview: ['DM & Liver', 'Anaemia', 'Neurology', 'Cardiology', 'Nephrology', 'Thyroid', 'TB', 'Respiratory', 'Rheumatology', 'Gastro'],
    todos: [
      { id: 'd20-t1', text: 'Medicine Mock Test: Solve 60 unseen Medicine MCQs in 75 minutes (simulate exam pace = 1.25 min/Q)', duration: '75 min', type: 'mock' },
      { id: 'd20-t2', text: 'Score & Analyse: Calculate score, categorise errors by topic — which topics lost most marks?', duration: '20 min', type: 'review' },
      { id: 'd20-t3', text: 'Weak Topic Blitz: Pick lowest-scoring topic → re-read that snapshot + 15 additional MCQs', duration: '35 min', type: 'snapshot' },
      { id: 'd20-t4', text: 'Flashcard Mega-Sprint: Run all Medicine flashcards (all 13 days worth)', duration: '20 min', type: 'flashcard' },
      { id: 'd20-t5', text: 'Score Tracker: Write today\'s mock score in the Weekly Performance Tracker. Target: ≥70%', duration: '5 min', type: 'review' },
    ],
  },

  stdDay(21, '2026-10-10', 'Epidemiology & Biostatistics', 'Study Designs · RR · OR · Sensitivity/Specificity',
    2, 'Phase 2 — Big Five Deep Dive', 'PSM', 'green',
    'Warm-up: Medicine mock weakest topic — read 3 key bullet points from that topic\'s snapshot',
    'Study Designs: Descriptive vs analytical, observational vs experimental. Cross-sectional (prevalence), case-control (OR, retrospective, rare disease), cohort (RR, prospective, rare exposure), RCT (gold standard for efficacy). Ecological study, systematic review, meta-analysis',
    'Measures of Association: Relative Risk (RR = incidence exposed/unexposed), Odds Ratio (OR = ad/bc in 2×2 table), Attributable Risk (AR = incidence exposed − unexposed), Population AR%. Confidence intervals and p-value interpretation (p<0.05 = significant)',
    'MCQ on Epidemiology', 30,
    'Snapshot: 2×2 table formulas + study design comparison in notes/psm.md',
    'Screening Tests: Sensitivity (true positive rate, rules OUT if negative = SnNout), Specificity (true negative rate, rules IN if positive = SpPin), PPV/NPV (affected by prevalence), ROC curve, likelihood ratios. ELISA vs Western blot in HIV testing',
  ),

  stdDay(22, '2026-10-11', 'Vital Statistics — All India Values', 'IMR · MMR · TFR · CBR · CDR — Memorise Numbers',
    2, 'Phase 2 — Big Five Deep Dive', 'PSM', 'green',
    'Warm-up: Sensitivity vs specificity — what does SnNout mean? SpPin?',
    'Key National Indicators (SRS 2020/NFHS-5 values): CBR=19.5, CDR=6.0, NMR=20, NNMR=11.4, IMR=28, U5MR=32, MMR=97/1,00,000 LB, TFR=2.0, NRR=0.96, Life Expectancy=69.7y (M=68.2, F=71.1). Target values under NHP/SDG 2030',
    'Definitions of ALL indicators: IMR (deaths <1y/1000 LB), NNMR (deaths <28d/1000 LB), PNMR, Perinatal MR, Maternal MR, TFR, GRR, NRR, Standardised MR, Case Fatality Rate vs Attack Rate. Significance and determinants of each',
    'MCQ on Vital Statistics', 30,
    'Snapshot: INDIA vital statistics cheat sheet with all numbers in notes/psm.md',
    'Demography & Fertility: Population pyramid shapes (expansive/constrictive/stationary), demographic transition stages, census India (decadal, last 2011), ASHA/AWW/ANM roles, sub-centre norms (1/5000 rural)',
  ),

  stdDay(23, '2026-10-12', 'Vaccines, Cold Chain & UIP Schedule', 'Full UIP 2026 · Cold Chain Equipment · VPDs',
    2, 'Phase 2 — Big Five Deep Dive', 'PSM', 'green',
    'Warm-up: India\'s IMR, MMR, TFR, NMR values from memory',
    'Universal Immunisation Programme (UIP) 2026: Birth (BCG, OPV0, Hep B0), 6wk (OPV1, IPV1, Penta1, Rota1, PCV1), 10wk (OPV2, Penta2, Rota2), 14wk (OPV3, IPV2, Penta3, Rota3, PCV2), 9m (MR1, JE1-endemic, Vitamin A1), 12m (PCV3), 16–24m (OPV4, MR2, JE2, DPT B1, Vitamin A2), 5y (DPT B2), 10y (Td), 16y (Td)',
    'Cold Chain Equipment: ILR (+2 to +8°C storage), Deep Freezer (−15 to −25°C, OPV long-term), Walk-in Cooler, Walk-in Freezer, Vaccine Van, Ice-lined Refrigerator. Freeze-sensitive vaccines (Hep B, DPT, TT, DT — damaged by freezing). Heat-sensitive (OPV most sensitive). VVM (Vaccine Vial Monitor) colour change',
    'MCQ on Vaccines & Cold Chain', 30,
    'Snapshot: Complete UIP schedule table + cold chain equipment hierarchy in notes/psm.md',
    'Vaccine-Preventable Diseases (VPDs): Tetanus (neonatal tetanus — 3 antitoxin units, maternal TT/Td schedule), Measles/Rubella elimination targets, Polio (eIPV strategy, AFP surveillance, hot case definition), JE endemic districts (Rajasthan included)',
  ),

  snapDay(24, '2026-10-13',
    '🔁 Snapshot Review — Epidemiology · Vital Stats · Vaccines + NHP + Family Planning',
    2, 'Phase 2 — Big Five Deep Dive',
    [
      { topic: 'Epidemiology & Biostatistics', qs: 12 },
      { topic: 'Vital Statistics (number recall)', qs: 10 },
      { topic: 'Vaccines & UIP Schedule', qs: 12 },
    ],
    ['2×2 table: OR and RR formulas', 'India IMR=28, MMR=97, TFR=2.0, NMR=20', 'UIP schedule — age/antigen grid', 'Cold chain: ILR vs Deep Freezer temperatures', 'SnNout = high sensitivity rules out', 'Family planning — IUD types (Cu380A vs LNG-IUS) and failure rates']
  ),

  {
    day: 25, date: '2026-10-14',
    title: 'PSM Mixed MCQ Drill', subtitle: 'NHP · Family Planning · Epidemic Investigation · 50-Q Sprint',
    phase: 2, phaseLabel: 'Phase 2 — Big Five Deep Dive',
    subject: 'PSM', subjectColor: 'green', isSnapshotDay: false, totalMinutes: 195,
    todos: [
      { id: 'd25-t1', text: 'Warm-up: Read NHP acronyms snapshot — NTEP, NVBDCP, RMNCH+A, RBSK, NPCDCS, Ayushman Bharat PM-JAY', duration: '15 min', type: 'warmup' },
      { id: 'd25-t2', text: 'Theory — Family Planning: IUD types (Cu-T 380A = 10y, LNG-IUS Mirena = 5y, PPIUCD = 48h post-delivery), OCP (combined vs POP), emergency contraception (levonorgestrel 1.5mg <72h, ulipristal <120h), sterilisation (Pomeroy\'s, mini-lap, NSV), failure rates (Pearl index)', duration: '35 min', type: 'theory' },
      { id: 'd25-t3', text: 'Theory — Epidemic Investigation: 10 steps (confirm diagnosis → confirm epidemic → find cases → attack rate → test hypothesis → control measures → report), Primary/secondary attack rate calculations, point-source vs propagated epidemic curves', duration: '30 min', type: 'theory' },
      { id: 'd25-t4', text: 'PSM Mega-Drill: Solve 50 mixed PSM MCQs (epidemiology, vital stats, vaccines, NHP, family planning, environment)', duration: '60 min', type: 'mcq' },
      { id: 'd25-t5', text: 'Error Analysis: Group errors by sub-topic — common patterns in PSM numerical questions?', duration: '25 min', type: 'review' },
      { id: 'd25-t6', text: 'Snapshot: NHP list + family planning failure rates + epidemic investigation 10 steps in notes/psm.md', duration: '15 min', type: 'snapshot' },
      { id: 'd25-t7', text: 'Flashcard Sprint: All PSM flashcards from Days 21–25', duration: '15 min', type: 'flashcard' },
    ],
  },

  stdDay(26, '2026-10-15', 'Haematological Pathology', 'Leukaemia FAB · Lymphoma · Myeloma · Clotting',
    2, 'Phase 2 — Big Five Deep Dive', 'Pathology', 'orange',
    'Warm-up: Pearl index — what does it measure? Failure rate of Cu-T vs OCP?',
    'Leukaemia Classification: ALL (L1/L2/L3, TdT+, CD10+, children, most curable), AML (M0–M7, M3 = APML → ATRA Rx, M5 = monocytic, DIC risk), CML (BCR-ABL, Philadelphia chromosome, blast crisis, imatinib), CLL (smear cells, CD19+CD5+, elderly, indolent)',
    'Lymphoma: Hodgkin\'s (Reed-Sternberg cells, bimodal age, nodular sclerosis commonest in women, Ann Arbor staging, ABVD chemo), NHL vs HL differences, Burkitt lymphoma (EBV, t(8;14), starry sky), DLBCL (commonest aggressive NHL)',
    'MCQ on Haematological Path', 30,
    'Snapshot: Leukaemia comparison table (FAB, marker, age, treatment) in notes/pathology.md',
    'Multiple Myeloma: CRAB criteria (hyperCalcaemia, Renal failure, Anaemia, Bone pain), M-protein (IgG commonest, IgA), Bence-Jones proteins (light chains), rouleaux formation, punched-out lesions skull X-ray. Coagulation: PT (extrinsic), APTT (intrinsic), TT (fibrin), DIC (↑PT+APTT+D-dimer, ↓platelet+fibrinogen)',
  ),

  stdDay(27, '2026-10-16', 'Cell Injury, Inflammation & Repair', 'Apoptosis · Granulomas · Wound Healing',
    2, 'Phase 2 — Big Five Deep Dive', 'Pathology', 'orange',
    'Warm-up: CRAB criteria of myeloma + Reed-Sternberg cell association',
    'Cell Injury: Reversible (cell swelling, fatty change, myelin figures) vs irreversible (nuclear changes: pyknosis → karyorrhexis → karyolysis). Necrosis types: coagulative (MI), liquefactive (brain, abscess), caseous (TB), fat (pancreatitis, traumatic), fibrinoid (vessels, immune), gangrene (wet vs dry)',
    'Apoptosis: Intrinsic (mitochondrial, cytochrome C, caspase 9) vs extrinsic (Fas-FasL, caspase 8), apoptotic bodies, no inflammation. Differs from necrosis. BCL-2 (anti-apoptotic, follicular lymphoma t(14;18)), p53 (induces apoptosis after DNA damage)',
    'MCQ on Cell Injury & Inflammation', 25,
    'Snapshot: Necrosis types table + granuloma types in notes/pathology.md',
    'Inflammation & Repair: Acute (vascular changes, neutrophils, chemical mediators: histamine/PGs/leukotrienes/bradykinin), chronic (macrophages, lymphocytes, plasma cells, granulomas). Granuloma types: TB (Langhans giant cells, caseous centre), Sarcoid (non-caseating), Crohn, foreign body. Wound healing: 1st vs 2nd vs 3rd intention',
  ),

  stdDay(28, '2026-10-17', 'Organ Pathology', 'Liver · Kidney · Lung · CVS Pathology',
    2, 'Phase 2 — Big Five Deep Dive', 'Pathology', 'orange',
    'Warm-up: TB granuloma features — giant cell type, necrosis type, central features',
    'Liver Pathology: Fatty liver (steatosis, macrovesicular vs microvesicular), alcoholic hepatitis (Mallory bodies, perivenular fibrosis), cirrhosis (macro vs micronodular), hepatocellular carcinoma (AFP, Councilman bodies in viral hepatitis, ground-glass hepatocytes in HBV)',
    'Kidney Pathology: GN classification (proliferative vs non-proliferative), IgA nephropathy (mesangial deposits, Berger disease), membranous GN (spike-dome pattern, anti-PLA2R), MPGN (tram-track), diabetic nephropathy (Kimmelstiel-Wilson lesions)',
    'MCQ on Organ Pathology', 25,
    'Snapshot: Glomerulopathy comparison table (LM, EM, IF patterns) in notes/pathology.md',
    'Lung Pathology: Pneumoconiosis (silicosis = eggshell calcification, asbestosis = ferruginous bodies + mesothelioma risk), lung carcinoma types (squamous = hilar, central, PTHrP; adenocarcinoma = peripheral, EGFR; SCLC = ACTH, ADH, central, worst prognosis). CVS: atherosclerosis (fatty streak → fibrous plaque → complicated), aortic aneurysm (syphilis = ascending, atherosclerosis = descending)',
  ),

  snapDay(29, '2026-10-18',
    '🔁 Snapshot Review — Haematological Path · Cell Injury · Organ Path',
    2, 'Phase 2 — Big Five Deep Dive',
    [
      { topic: 'Haematological Pathology (Leukaemia/Lymphoma)', qs: 15 },
      { topic: 'Cell Injury, Inflammation & Repair', qs: 12 },
      { topic: 'Organ Pathology', qs: 12 },
    ],
    ['Leukaemia FAB classification all types', 'Reed-Sternberg cells + ABVD chemotherapy', 'Necrosis types and associated diseases', 'Granuloma types: TB vs Sarcoid', 'IgA nephropathy = Berger disease', 'Lung carcinoma: squamous vs adeno vs SCLC']
  ),

  {
    day: 30, date: '2026-10-19',
    title: 'Pathology Full Mock', subtitle: '40 MCQ Sprint + Weak Area Review',
    phase: 2, phaseLabel: 'Phase 2 — Big Five Deep Dive',
    subject: 'Pathology', subjectColor: 'orange', isSnapshotDay: false, totalMinutes: 190,
    todos: [
      { id: 'd30-t1', text: 'Pathology Mock Test: Solve 40 unseen Pathology MCQs in 50 min (simulate exam pacing)', duration: '50 min', type: 'mock' },
      { id: 'd30-t2', text: 'Score & Analyse: Calculate score — split by Neoplasia, Haematology, Cell Injury, Organ Path', duration: '15 min', type: 'review' },
      { id: 'd30-t3', text: 'Weak Topic Deep Dive: Lowest-scoring Pathology subtopic → re-read snapshot + 20 more targeted MCQs', duration: '45 min', type: 'snapshot' },
      { id: 'd30-t4', text: 'Neoplasia Rapid-Fire: Name cancer for each tumor marker (10 markers in 5 min)', duration: '10 min', type: 'flashcard' },
      { id: 'd30-t5', text: 'Update Notes: Add any new points from MCQ errors to pathology.md snapshot', duration: '15 min', type: 'review' },
      { id: 'd30-t6', text: 'Flashcard Sprint: All Pathology flashcards', duration: '15 min', type: 'flashcard' },
    ],
  },

  stdDay(31, '2026-10-20', 'Fractures & Trauma', 'ATLS · Fracture Complications · Specific Fractures',
    2, 'Phase 2 — Big Five Deep Dive', 'Surgery', 'red',
    'Warm-up: Pathology mock score review — name the one topic that scored lowest',
    'ATLS Primary Survey: ABCDE (Airway + C-spine → Breathing → Circulation → Disability → Exposure), Golden hour concept, Parkland formula for burns (4ml × %TBSA × weight kg, first half in 8h, rest in 16h), burn depth classification, rule of nines',
    'Specific Fractures: Colles (dorsally angulated, dinner-fork deformity, elderly women, FOOSH), Smith (volar angulated, reversed Colles), Pott\'s (bimalleolar ankle), Monteggia (ulna + radial head dislocation), Galeazzi (radius + DRUJ), Scaphoid (anatomical snuffbox, AVN risk)',
    'MCQ on Fractures & Trauma', 30,
    'Snapshot: Fracture eponyms table + ATLS primary survey in notes/surgery.md',
    'Fracture Complications: Fat embolism (petechiae + hypoxia + confusion, 24–48h), compartment syndrome (5Ps: Pain on passive stretch, Pressure, Paresthesia, Paralysis, Pallor, Pulselessness → fasciotomy), DVT, malunion, non-union causes, AVN (scaphoid + neck of femur most common)',
  ),

  stdDay(32, '2026-10-21', 'Acute Abdomen, Obstruction & Hernias', 'Appendicitis · Obstruction · Peritonitis · Hernia Types',
    2, 'Phase 2 — Big Five Deep Dive', 'Surgery', 'red',
    'Warm-up: Compartment syndrome — name the 5 Ps and the treatment',
    'Acute Appendicitis: Alvarado score (MANTRELS), McBurney point, Rovsing sign, Psoas sign, Obturator sign. Appendix positions (retrocaecal commonest). Perforated appendix → peritonitis → abscess. Paediatric appendicitis pitfalls (diffuse peritonitis faster)',
    'Intestinal Obstruction: Mechanical vs functional (paralytic ileus), small vs large bowel, closed-loop (torsion), volvulus (sigmoid most common in India, caecal in West). X-ray: dilated loops + air-fluid levels, stepladder pattern (SBO), absent gas in rectum',
    'MCQ on Acute Abdomen', 30,
    'Snapshot: Alvarado score + obstruction X-ray features in notes/surgery.md',
    'Hernias: Inguinal (indirect vs direct, Hessert triangle), femoral (below & lateral to pubic tubercle, highest strangulation risk), umbilical, hiatus (sliding vs rolling). Complications: irreducible → obstructed → strangulated. Richter hernia (part of bowel wall). Repair: Shouldice, Lichtenstein, laparoscopic TEP/TAPP',
  ),

  stdDay(33, '2026-10-22', 'Burns, Shock & Oesophageal Disorders', 'Parkland · Shock Types · Achalasia · Carcinoma Oesophagus',
    2, 'Phase 2 — Big Five Deep Dive', 'Surgery', 'red',
    'Warm-up: Alvarado score — name MANTRELS mnemonic',
    'Shock: Classification (hypovolaemic/distributive/cardiogenic/obstructive), Class I–IV blood loss (≤15%, 15–30%, 30–40%, >40%), clinical signs per class, treatment principles. Septic shock (Sepsis-3 definition: SOFA score ≥2, vasopressors needed, lactate >2 mmol). Noradrenaline = vasopressor of choice in septic shock',
    'Burns: TBSA calculation (rule of nines, Lund & Browder chart), depth (superficial/partial/full thickness), Parkland formula (4ml × wt × %TBSA, Ringer\'s lactate, first 8h = first half), escharotomy indications, fluid endpoints (UO 0.5–1ml/kg/h)',
    'MCQ on Shock & Burns', 25,
    'Snapshot: Shock classification table + Parkland formula in notes/surgery.md',
    'Oesophageal Disorders: Achalasia (failure of LOS relaxation, bird-beak on barium swallow, manometry gold standard, treatment = Heller\'s myotomy/pneumatic dilation/botulinum toxin), carcinoma oesophagus (upper 1/3 = SCC, lower 1/3 = adenocarcinoma, worst prognosis, dysphagia progression)',
  ),

  snapDay(34, '2026-10-23',
    '🔁 Snapshot Review — Surgery (Fractures · Abdomen · Shock) + Thyroid/Breast/Urology',
    2, 'Phase 2 — Big Five Deep Dive',
    [
      { topic: 'Fractures & Trauma', qs: 12 },
      { topic: 'Acute Abdomen + Hernias', qs: 12 },
      { topic: 'Shock + Burns + Oesophagus', qs: 12 },
    ],
    ['Fracture eponyms (Colles, Smith, Pott\'s, Monteggia)', 'Parkland formula numbers', 'Shock Class I–IV blood loss percentages', 'Alvarado score MANTRELS', 'Achalasia treatment options', 'Thyroid cancers: 4 types, distinguishing feature each']
  ),

  {
    day: 35, date: '2026-10-24',
    title: 'Surgery Mixed Mock', subtitle: '40 MCQ Sprint + Thyroid/Breast/Urology Rapid Study',
    phase: 2, phaseLabel: 'Phase 2 — Big Five Deep Dive',
    subject: 'Surgery', subjectColor: 'red', isSnapshotDay: false, totalMinutes: 195,
    todos: [
      { id: 'd35-t1', text: 'Thyroid Surgery Rapid Study: Thyroid cancer types + MEN syndromes (MEN1: 3Ps, MEN2A: MTC+pheo+hyperPTH, MEN2B: MTC+pheo+mucosal neuromas), total thyroidectomy complications (RLN, hypoparathyroidism)', duration: '30 min', type: 'theory' },
      { id: 'd35-t2', text: 'Breast + Urology Rapid Study: Breast carcinoma (IDC commonest, staging, FNAC vs core biopsy, sentinel node biopsy, triple assessment), BPH (IPSS score, PSA, TURP vs medical Rx: 5-AR inhibitors + alpha-blockers)', duration: '25 min', type: 'theory' },
      { id: 'd35-t3', text: 'Surgery Mock Test: Solve 40 unseen Surgery MCQs in 50 min', duration: '50 min', type: 'mock' },
      { id: 'd35-t4', text: 'Score & Error Analysis: Split by fractures, abdomen, thyroid, breast', duration: '20 min', type: 'review' },
      { id: 'd35-t5', text: 'Weak Surgery Topic: Re-read its snapshot + 15 targeted MCQs', duration: '35 min', type: 'snapshot' },
      { id: 'd35-t6', text: 'Surgery Flashcard Sprint: All surgery cards', duration: '15 min', type: 'flashcard' },
    ],
  },

  stdDay(36, '2026-10-25', 'Malaria & Parasites', 'Life Cycle · P.falciparum · Drug Resistance · Helminthiasis',
    2, 'Phase 2 — Big Five Deep Dive', 'Microbiology', 'teal',
    'Warm-up: BPH medical treatment — which drug classes and their mechanisms',
    'Malaria Life Cycle: Anopheles female → sporozoites → liver (exo-erythrocytic) → ring trophozoites → schizonts → merozoites → erythrocytes. P.falciparum (severe malaria: cerebral, anaemia, renal failure, hyperparasitaemia >5%) vs P.vivax/ovale (hypnozoites, relapse) vs P.malariae (quartan fever, 72h cycle)',
    'Malaria Treatment: Chloroquine-sensitive (P.vivax/ovale: CQ + primaquine for hypnozoites, test G6PD before primaquine), uncomplicated P.falciparum (Artemisinin-based combo: ACT = AS+SP or AL first line India), severe malaria (IV artesunate, no quinine in children). Drug resistance monitoring',
    'MCQ on Malaria & Parasites', 30,
    'Snapshot: Malaria species comparison table + treatment algorithm in notes/microbiology.md',
    'Helminthiasis: Ascaris (eosinophilia, Loeffler syndrome, intestinal obstruction, albendazole/mebendazole), Hookworm (iron deficiency anaemia, cutaneous larva migrans = dog/cat hookworm), Filariasis (Wuchereria bancrofti, lymphoedema, DEC + albendazole MDA), Tapeworm (cysticercosis = pork, echinococcus = dog, hydatid cyst)',
  ),

  stdDay(37, '2026-10-26', 'Bacterial Identification & Culture Media', 'Gram Staining · Culture Media · Key Pathogens',
    2, 'Phase 2 — Big Five Deep Dive', 'Microbiology', 'teal',
    'Warm-up: Malaria treatment — what do you add before primaquine? Why?',
    'Gram Staining: Gram-positive (thick peptidoglycan = purple: Staph, Strep, Bacillus, Clostridium) vs gram-negative (thin PG + outer membrane = red/pink: E.coli, Klebsiella, Pseudomonas, Neisseria). Acid-fast (Mycobacterium = ZN stain red), spirochetes (Borrelia, Treponema = dark field microscopy)',
    'Culture Media: Blood agar (Staph), Chocolate agar (Neisseria, Haemophilus), MacConkey (Enterobacteriaceae: lactose fermenters pink), TCBS (Vibrio cholera yellow), Löwenstein-Jensen (Mycobacteria, 6–8 weeks), Thayer-Martin (GC selective), Bordet-Gengou (Bordetella), Sabouraud (fungi)',
    'MCQ on Bacterial ID', 25,
    'Snapshot: Culture media table (organism → medium → appearance) in notes/microbiology.md',
    'Key Pathogens Quick-Fire: Staph aureus (coagulase+, MRSA, protein A, scalded skin syndrome), Strep pyogenes (group A, ASO titre, rheumatic fever, glomerulonephritis), Strep pneumoniae (optochin sensitive, capsule = virulence, pneumonia/meningitis/otitis), N.meningitidis (group B/C/W135/Y, Waterhouse-Friderichsen syndrome)',
  ),

  stdDay(38, '2026-10-27', 'Immunology — Ig, Hypersensitivity & Complement', 'Ig Types · 4 Hypersensitivity Types · Complement Pathways',
    2, 'Phase 2 — Big Five Deep Dive', 'Microbiology', 'teal',
    'Warm-up: Culture media for Mycobacterium and Vibrio cholerae — names and appearance',
    'Immunoglobulins: IgG (most abundant, crosses placenta, secondary response, opsonin), IgM (first response, pentamer, ABO antibody, agglutination), IgA (dimer, mucosal, breast milk, secretory piece), IgE (allergy, parasites, mast cell sensitisation), IgD (B-cell receptor, minimal). Half-lives and clinical significance',
    'Hypersensitivity: Type I (IgE, immediate, allergy/anaphylaxis, mast cells, epinephrine Rx), Type II (IgG/IgM + complement, cytotoxic: ABO transfusion reactions, haemolytic disease of newborn, Goodpasture), Type III (immune complex: serum sickness, SLE, Arthus reaction, C3 ↓), Type IV (T-cell mediated, delayed 48–72h: TB skin test, contact dermatitis, transplant rejection)',
    'MCQ on Immunology', 25,
    'Snapshot: 4 hypersensitivity types table + Ig properties in notes/microbiology.md',
    'Complement: Classical pathway (IgM/IgG), Lectin pathway, Alternative pathway (spontaneous C3b). C3 (central, consumed in Type III), C5–C9 (MAC = membrane attack complex), C3b (opsonin), C5a (chemotaxis, anaphylatoxin). Deficiencies: C1-inhibitor (hereditary angioedema), C3 (recurrent pyogenic infections), terminal (recurrent Neisseria)',
  ),

  snapDay(39, '2026-10-28',
    '🔁 Snapshot Review — Malaria · Bacterial ID · Immunology + Sterilization',
    2, 'Phase 2 — Big Five Deep Dive',
    [
      { topic: 'Malaria & Parasites', qs: 12 },
      { topic: 'Bacterial ID & Culture Media', qs: 12 },
      { topic: 'Immunology (Ig + Hypersensitivity)', qs: 12 },
    ],
    ['Malaria species: fever cycle + relapse species', 'Culture media: 8 key media–organism pairs', '4 hypersensitivity types: mechanism + example each', 'IgG vs IgM: which crosses placenta, which is first response', 'Sterilization: autoclave temp/pressure/time', 'Disinfection levels (high/intermediate/low) + agents']
  ),

  {
    day: 40, date: '2026-10-29',
    title: 'Microbiology Mock + Big Five Score Tracker', subtitle: '40 MCQ Sprint + Overall Big Five Assessment',
    phase: 2, phaseLabel: 'Phase 2 — Big Five Deep Dive',
    subject: 'Microbiology', subjectColor: 'teal', isSnapshotDay: false, totalMinutes: 200,
    todos: [
      { id: 'd40-t1', text: 'Sterilization Rapid Study: Autoclaving (121°C/15psi/15min for spores), Dry heat (160°C/1h), ETO (cold, plastics), Glutaraldehyde (2% for 10h = sterilise, 30min = high-level disinfect), boiling, pasteurisation. Prion sterilisation: 134°C/18min autoclave', duration: '20 min', type: 'theory' },
      { id: 'd40-t2', text: 'Microbiology Mock Test: Solve 40 unseen Microbiology MCQs in 50 min', duration: '50 min', type: 'mock' },
      { id: 'd40-t3', text: 'Error Analysis: Categorise — virology/bacteriology/mycology/immunology/sterilization?', duration: '15 min', type: 'review' },
      { id: 'd40-t4', text: '🏆 Big Five Score Tracker: Mock test yourself briefly on each Big Five subject (10 Qs each = 50 Qs) and record scores to identify current standing', duration: '35 min', type: 'mock' },
      { id: 'd40-t5', text: 'Gap Analysis: Which Big Five subject needs most work before Phase 3? Note it here and plan extra time.', duration: '15 min', type: 'review' },
      { id: 'd40-t6', text: 'Flashcard Sprint: All Microbiology flashcards', duration: '15 min', type: 'flashcard' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 3 — TIER 2 SUBJECTS + SHORT SPECIALTIES (Days 41–57)
  // ═══════════════════════════════════════════════════════════════════════════

  stdDay(41, '2026-10-30', 'Anatomy — Limb Nerves & Brachial Plexus', 'Nerve Injuries · Deformities · Erb\'s · Klumpke\'s',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Anatomy', 'indigo',
    'Warm-up: Big Five weakest subject gap note — read 5 key points from that subject\'s snapshot',
    'Brachial Plexus: Roots C5–T1, trunks/divisions/cords/branches. Erb\'s palsy (C5,C6: waiter\'s tip, deltoid + biceps weak, lateral rotation lost), Klumpke\'s palsy (C8,T1: intrinsic hand muscles, claw hand, Horner if T1 sympathetics). Saturday night palsy = radial nerve (wrist drop, loss of finger extension)',
    'Median Nerve: Carpal tunnel syndrome (thenar wasting, pen test, Phalen/Tinel), ape hand deformity (can\'t oppose thumb), sensory loss lateral 3½ fingers. Ulnar Nerve (claw hand = ring+little fingers, hypothenar wasting, loss of 4th web sensation). Femoral nerve (quadriceps weakness, knee extension lost)',
    'MCQ on Nerve Injuries', 25,
    'Snapshot: Nerve injury deformity table in notes/anatomy.md (nerve → deformity → muscles lost → sensory)',
    'Sciatic Nerve: posterior thigh + all below knee (except medial leg = saphenous). Common peroneal palsy (foot drop, inversion, loss of dorsiflexion, high-stepping gait). Tibial nerve (can\'t plantarflex, tar-heel gait). Axillary nerve (deltoid wasting, military patch analgesia, after shoulder dislocation)',
  ),

  stdDay(42, '2026-10-31', 'Anatomy — Cranial Nerves & Arterial Supply', 'CN Palsies · Circle of Willis · Coronary Arteries',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Anatomy', 'indigo',
    'Warm-up: Nerve palsy deformities — name the deformity for radial, ulnar, median nerve injuries',
    'Cranial Nerves: CN3 palsy (complete ptosis, eye down-and-out, dilated pupil: medical CN3 = pupil spared in DM). CN6 (lateral rectus = medial deviation). CN7 (LMN = all facial muscles: Bell\'s palsy, crocodile tears; UMN = forehead spared). CN12 (tongue deviation toward lesion, LMN = wasting)',
    'Cerebral Circulation: Circle of Willis (ICA → ACA + MCA, PCA from basilar). ACA (medial hemisphere, leg area), MCA (lateral hemisphere, arm/face area, Broca/Wernicke), PCA (occipital, visual cortex). Berry aneurysms (AComA commonest, subarachnoid haemorrhage)',
    'MCQ on Cranial Nerves & Arteries', 25,
    'Snapshot: CN palsy clinical features table + Circle of Willis anatomy in notes/anatomy.md',
    'Coronary Arteries: LAD (anterior wall LV + septum, LAD territory = anterior MI), LCx (lateral wall + posterior LV), RCA (inferior wall + SA/AV nodes = inferior MI → heart block risk). Coronary dominance: RCA dominant in 85%',
  ),

  stdDay(43, '2026-11-01', 'Anatomy — Muscle Anatomy & Nerve Injuries', 'Rotator Cuff · Hand Muscles · Peripheral Nerve Classification',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Anatomy', 'indigo',
    'Warm-up: Circle of Willis — ACA territory vs MCA territory (which body part?)',
    'Rotator Cuff: SITS muscles (Supraspinatus = initiate abduction, Infraspinatus = external rotation, Teres minor = external rotation, Subscapularis = internal rotation). Supraspinatus most commonly torn. Painful arc 60°–120°',
    'Hand Muscles: Thenar (OpponensP, AbductorPB, FlexorPB = all median nerve), Hypothenar (ulnar nerve). Lumbricals (1&2 median, 3&4 ulnar). Interossei (ulnar nerve). LOAF muscles of hand = median nerve',
    'MCQ on Muscle Anatomy', 25,
    'Snapshot: SITS + LOAF mnemonics + peripheral nerve classification in notes/anatomy.md',
    'Sunderland Classification: Neuropraxia (Grade I, conduction block, full recovery), Axonotmesis (Grade II, axon cut, endoneurium intact, Wallerian degeneration, good recovery), Neurotmesis (Grade V, complete division, surgical repair needed). Wallerian degeneration: distal to injury, 2–3 weeks',
  ),

  snapDay(44, '2026-11-02',
    '🔁 Snapshot Review — All Anatomy',
    3, 'Phase 3 — Tier 2 + Short Specialties',
    [
      { topic: 'Limb Nerves & Brachial Plexus', qs: 12 },
      { topic: 'Cranial Nerves & Arterial Supply', qs: 12 },
      { topic: 'Muscle Anatomy & Nerve Classification', qs: 10 },
    ],
    ['Brachial plexus: Erb\'s vs Klumpke\'s features', 'CN7 LMN vs UMN (forehead sparing)', 'ACA vs MCA territory', 'Rotator cuff: SITS muscles and their functions', 'LOAF = median nerve hand muscles', 'Sunderland Grade I vs II vs V']
  ),

  stdDay(45, '2026-11-03', 'Biochemistry — Vitamins & Deficiencies', 'Fat-Soluble · Water-Soluble · Clinical Features · Excess Toxicity',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Biochemistry', 'yellow',
    'Warm-up: Rotator cuff — which muscle initiates abduction? Which tendon most often tears?',
    'Fat-Soluble Vitamins (ADEK): Vit A (night blindness, Bitot spots, keratomalacia, Brindley test — serum retinol, safe dose in pregnancy issue, Vit A supplements in measles), Vit D (rickets in children — craniotabes/rachitic rosary/Harrison groove, osteomalacia in adults, 25-OH-D is storage form, 1,25-diOH active), Vit K (neonatal haemorrhagic disease, PT prolonged, green leafy vegetables + gut bacteria)',
    'Water-Soluble Vitamins: Vit B1/Thiamine (Beriberi: dry = peripheral neuropathy, wet = cardiac failure; Wernicke\'s encephalopathy: confusion/ataxia/ophthalmoplegia; Korsakoff: confabulation — give IV thiamine before glucose!), Vit B2/Riboflavin (glossitis, angular stomatitis), Vit B3/Niacin (Pellagra: 3Ds — Dermatitis/Diarrhoea/Dementia, 4th D = Death, necklace of Casal)',
    'MCQ on Vitamins', 30,
    'Snapshot: Vitamin deficiency table (vitamin → clinical features → test → treatment) in notes/biochemistry.md',
    'More Water-Soluble: Vit B6/Pyridoxine (sideroblastic anaemia, peripheral neuropathy — side effect of INH, treat with pyridoxine), Vit B12/Cobalamin (subacute combined degeneration, MCV ↑, homocysteine ↑, methylmalonic acid ↑, Schilling test, intrinsic factor), Vit C/Ascorbic acid (scurvy: perifollicular haemorrhage, corkscrew hairs, Fraenkel\'s sign on X-ray)',
  ),

  stdDay(46, '2026-11-04', 'Biochemistry — Metabolic Cycles & Acid-Base', 'Glycolysis · TCA · Urea Cycle · ABG Interpretation',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Biochemistry', 'yellow',
    'Warm-up: Pellagra — 4Ds mnemonic and which vitamin',
    'Metabolic Cycles: Glycolysis (glucose→pyruvate, 2 ATP net, cytoplasm, rate limiting = PFK-1), TCA/Krebs cycle (mitochondria, 3 NADH+1 FADH2+1 GTP per turn, isocitrate dehydrogenase = rate limiting), Gluconeogenesis (liver/kidney, from lactate/amino acids/glycerol), Fatty acid oxidation (β-oxidation, carnitine shuttle, ketone body formation in fasting)',
    'Enzyme Deficiencies: PKU (phenylketonuria, phenylalanine hydroxylase, mousy odour, tyrosine supplementation), Galactosaemia (galactose-1-P uridyltransferase, cataracts + jaundice + E.coli sepsis in newborn), G6PD (Heinz bodies, precipitated by primaquine/dapsone/infection), Alkaptonuria (homogentisate oxidase, black urine on standing, ochronosis)',
    'MCQ on Biochemistry', 25,
    'Snapshot: ABG interpretation algorithm + enzyme deficiency table in notes/biochemistry.md',
    'Acid-Base Balance: ABG normal values (pH 7.35–7.45, PaCO2 35–45, HCO3 22–26), simple disorders + compensation, Winter\'s formula (expected PaCO2 = 1.5×HCO3+8±2 in metabolic acidosis), HAGMA vs NAGMA (MUDPILES mnemonic), respiratory alkalosis causes (hyperventilation, anxiety, high altitude, salicylate early)',
  ),

  stdDay(47, '2026-11-05', 'Pharmacology — Antidotes & CVS Drugs', 'Poisoning Antidotes · Antihypertensives · Antiarrhythmics',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Pharmacology', 'purple',
    'Warm-up: ABG interpretation — what ABG pattern in DKA? In COPD exacerbation?',
    'Drug Antidotes (HIGH YIELD — memorize ALL): Organophosphate (Atropine + Pralidoxime 2-PAM), Paracetamol/Acetaminophen (N-acetylcysteine, Rumack-Matthew nomogram), Opioids (Naloxone), Warfarin/VKA (Vit K, FFP, PCC), Heparin (Protamine sulfate, 1mg/100U heparin), Iron (Desferrioxamine/Deferoxamine), BZD (Flumazenil), CO (100% O2 or Hyperbaric), Cyanide (Hydroxocobalamin or amyl nitrite→sodium nitrite→sodium thiosulfate), Methanol (Ethanol or Fomepizole), Digoxin (Digibind/Fab fragments), Beta-blocker (Glucagon), TCA (NaHCO3)',
    'Antihypertensives: ACEi (end in -pril, cough SE = bradykinin, contraindicated in bilateral RAS and pregnancy), ARB (end in -sartan, no cough, same CI), CCB (amlodipine = DHP for HTN, verapamil/diltiazem for rate control), thiazides (hypoKaemia, hyperglycaemia, hyperuricaemia), beta-blockers (avoid in asthma), aldosterone antagonists (spironolactone = gynaecomastia)',
    'MCQ on Antidotes', 35,
    'Snapshot: Drug antidotes table (poison → antidote → mechanism) in notes/pharmacology.md',
    'Antiarrhythmics (Vaughan Williams): Class I (Na channel: Ia quinidine/procainamide, Ib lidocaine=VT, Ic flecainide), Class II (beta-blockers), Class III (K channel: amiodarone=multi-class, sotalol, ibutilide for AF), Class IV (CCB: verapamil/diltiazem for SVT). Digoxin (Vaughan Williams unclassified, AV block SE, narrow therapeutic index)',
  ),

  snapDay(48, '2026-11-06',
    '🔁 Snapshot Review — Biochemistry + Pharmacology',
    3, 'Phase 3 — Tier 2 + Short Specialties',
    [
      { topic: 'Vitamins & Deficiencies', qs: 12 },
      { topic: 'Metabolic Cycles & Acid-Base', qs: 10 },
      { topic: 'Antidotes & CVS Drugs', qs: 12 },
    ],
    ['Vitamin deficiencies: match vitamin to clinical feature', 'ABG: normal values + 4 simple disorders', 'Drug antidotes: all 13 poison-antidote pairs', 'ACEi vs ARB differences', 'Antiarrhythmic classes 1–4', 'TCA cycle rate-limiting enzyme']
  ),

  stdDay(49, '2026-11-07', 'Pharmacology — ANS, Antimicrobials & Antidiabetics', 'Adrenergic · Cholinergic · ATT · SGLT2i · GLP-1',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Pharmacology', 'purple',
    'Warm-up: Antidotes rapid-fire — cover antidote column and name each from poison',
    'ANS Drugs: Alpha1 agonists (phenylephrine, nasal decongestant), Alpha2 agonists (clonidine, methyldopa in pregnancy HTN), Beta1 agonists (dobutamine = inotrope), Beta2 agonists (salbutamol = SABA), Non-selective alpha (phentolamine for phaeochromocytoma diagnosis), Beta-blockers (atenolol B1-selective, propranolol non-selective, carvedilol B1+alpha1). Atropine (anticholinergic = tachycardia, mydriasis, dry mouth), Neostigmine (anti-ChE = reverse NMB)',
    'Antimicrobials Mechanism: Beta-lactams (cell wall), aminoglycosides (30S = bactericidal), tetracyclines (30S = bacteriostatic, avoid in pregnancy), macrolides (50S = azithromycin for atypicals), clindamycin (50S, anaerobes, pseudomembranous colitis), fluoroquinolones (DNA gyrase, cipro for UTI/GI)',
    'MCQ on Pharmacology', 30,
    'Snapshot: ATT drug classes + antimicrobial targets in notes/pharmacology.md',
    'Antidiabetic Drugs: Metformin (biguanide, AMPK activation, no hypoglycaemia, hold in CKD eGFR<30), Sulfonylureas (insulin secretagogue, hypoglycaemia risk, glibenclamide), SGLT2i (glycosuria, weight loss, cardiorenal protection, empagliflozin, DKA in T1DM risk), GLP-1 RA (liraglutide/semaglutide, weight loss, GI SE, pancreatitis rare), DPP4i (gliptin, weight neutral, no hypoglycaemia)',
  ),

  stdDay(50, '2026-11-08', 'Physiology — CVS, Renal & Nervous System', 'Cardiac Cycle · GFR · Nerve Conduction · Neurotransmitters',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Physiology', 'indigo',
    'Warm-up: SGLT2 inhibitors — 3 key clinical benefits and one serious adverse effect',
    'CVS Physiology: Cardiac cycle phases (isovolumetric contraction/relaxation, rapid/slow ejection), heart sounds (S1=MV+TV closure, S2=AV+PV closure, S3=rapid ventricular filling=HF, S4=atrial kick=stiff ventricle), JVP waves (a=atrial contraction, c=TV closure, v=venous filling), Frank-Starling law, cardiac output (CO=HR×SV)',
    'Renal Physiology: GFR measurement (inulin = gold standard, creatinine clinically used), tubular functions (PCT = Na/glucose/aa reabsorption, loop = concentration, DCT = Na/K exchange aldosterone, CD = water ADH), countercurrent mechanism, JGA (macula densa, renin release, autoregulation)',
    'MCQ on Physiology', 25,
    'Snapshot: Cardiac cycle events + tubular function per segment in notes/physiology.md',
    'Neurotransmitters & Receptors: ACh (muscarinic + nicotinic), Dopamine (D1: vasodilation; D2: anti-emetic target, Parkinson), Serotonin (5-HT3: nausea, 5-HT1A: antidepressant), GABA (BZD and barbiturate site), Glutamate (NMDA: memory/learning), Noradrenaline (alpha/beta), Histamine (H1: allergy, H2: gastric acid)',
  ),

  stdDay(51, '2026-11-09', 'Orthopaedics', 'Fractures · Osteomyelitis · TB Spine · OA vs RA · Scoliosis',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Orthopaedics', 'gray',
    'Warm-up: Frank-Starling law — what does it state? Which heart sound indicates HF?',
    'Fractures: Growth plate injuries (Salter-Harris I–V), Stress fracture vs Pathological fracture vs Insufficiency fracture. Supracondylar fracture (child, anterior interosseous nerve injury, anterior fat pad sign, cubitus varus deformity). Neck of femur (Garden classification I–IV, AVN risk in III/IV, dynamic hip screw vs hemiarthroplasty)',
    'Osteomyelitis: Acute (haematogenous, Staph aureus, metaphysis, involucrum/sequestrum on X-ray, IV antibiotics 6 weeks), Chronic (Brodie\'s abscess, sinus tracts), TB Spine (Pott\'s: lower thoracic/lumbar commonest, cold abscess, kyphosis, paraplegia → anterior decompression)',
    'MCQ on Orthopaedics', 25,
    'Snapshot: Ortho fractures table + TB spine features in notes/shorts.md',
    'OA vs RA: Joints (OA = weight-bearing DIP/knee/hip; RA = small joints PIP/MCP/wrist, spares DIP), morning stiffness (RA >1h, OA <30min), X-ray (OA: osteophytes/joint space narrowing; RA: periarticular osteopenia/erosions). CTEV (clubfoot): CAVE (Cavus/Adduction/Varus/Equinus), Ponseti method',
  ),

  stdDay(52, '2026-11-10', 'ENT', 'CSOM · Cholesteatoma · Epistaxis · Laryngeal Carcinoma',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'ENT', 'gray',
    'Warm-up: OA vs RA morning stiffness and joint distribution differences',
    'CSOM: Tubotympanic (safe/mucosal type: central perforation, mucoid discharge, no cholesteatoma) vs Atticoantral (unsafe/squamous type: marginal/attic perforation, cholesteatoma, conductive hearing loss, complications). Cholesteatoma: keratinising squamous epithelium in middle ear, bone erosion, pearly mass, surgical treatment (mastoidectomy). Tuning fork tests: Rinne (BC>AC = CHL negative Rinne), Weber (lateralises to worse ear in CHL, better ear in SNHL)',
    'Epistaxis: Little\'s area = Kiesselbach\'s plexus (anastomosis of 4 vessels: SPA + GP + LSN + ASN). Anterior epistaxis (commonest, first aid = pinch & lean forward), posterior (internal carotid territory, packing/sphenopalatine artery ligation). Causes: HTN commonest in adults',
    'MCQ on ENT', 25,
    'Snapshot: CSOM types comparison + tuning fork test interpretation in notes/shorts.md',
    'Larynx: Laryngeal carcinoma (glottic commonest in India, hoarseness = early sign = good prognosis; supraglottic = late hoarseness; subglottic = worst). DNS (deviated nasal septum: commonest symptom = nasal obstruction, SMR surgery). Tonsillitis (peritonsillar abscess = quinsy: uvula deviation away from abscess, needle aspiration + antibiotics)',
  ),

  stdDay(53, '2026-11-11', 'Ophthalmology', 'Glaucoma · Cataract · Retinal Disorders · Trachoma',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Ophthalmology', 'gray',
    'Warm-up: Tuning fork tests — Rinne and Weber in conductive hearing loss',
    'Glaucoma: Primary open-angle (POAG: insidious, painless, 70% field loss before awareness, cup:disc ratio >0.6, IOP >21, treatment: prostaglandin analogues = latanoprost first line, beta-blocker = timolol, acetazolamide). Primary angle-closure (PACG: acute red eye, halos, headache, IOP very high, semi-dilated pupil, laser iridotomy)',
    'Cataract: Types (nuclear = brunescent in elderly, posterior subcapsular = steroid/DM/UV, anterior polar, congenital = TORCH). Surgery: ECCE (extracapsular) vs phacoemulsification (phaco). IOL power calculation (biometry). Post-op: posterior capsular opacification (PCO) = Nd:YAG laser capsulotomy',
    'MCQ on Ophthalmology', 25,
    'Snapshot: Glaucoma types comparison + retinopathy classification in notes/shorts.md',
    'Retinal Disorders: Diabetic retinopathy (background = microaneurysms/dot-blot haemorrhages; pre-proliferative = cotton-wool spots; proliferative = new vessels, vitreous haemorrhage, tractional RD; maculopathy = most common cause of blindness in DM). Trachoma: Chlamydia trachomatis, WHO SAFE strategy, trichiasis → corneal scarring → blindness. Vitamin A deficiency: night blindness → Bitot spots → xerophthalmia → keratomalacia',
  ),

  snapDay(54, '2026-11-12',
    '🔁 Snapshot Review — Ortho · ENT · Ophthalmology · Physiology',
    3, 'Phase 3 — Tier 2 + Short Specialties',
    [
      { topic: 'Orthopaedics', qs: 10 },
      { topic: 'ENT (CSOM, Epistaxis, Larynx)', qs: 10 },
      { topic: 'Ophthalmology (Glaucoma, Cataract, Retina)', qs: 10 },
    ],
    ['Garden classification NOF fracture', 'CSOM: tubotympanic vs atticoantral differences', 'Little\'s area vessels (4 sources)', 'Glaucoma: POAG vs PACG clinical difference', 'DR: stages and most common cause of blindness', 'Cardiac cycle: S1 and S2 valve closure']
  ),

  stdDay(55, '2026-11-13', 'FMT + OBG', 'IPC Sections · PPH · PIH Management · Cervical Carcinoma',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'FMT + OBG', 'pink',
    'Warm-up: Glaucoma first-line drug + mechanism of action',
    'Forensic Medicine: MLC (medico-legal case: mandatory reporting, first treating doctor\'s responsibility), Dying declaration (magistrate, FIR value, not a confessional statement), IPC sections (302=murder, 304A=negligent death, 312=MTP/abortion, 376=rape, 354=outraging modesty, 325=grievous hurt). Medical negligence: 3Cs (carelessness + commission/omission + causation = Bolam test)',
    'Obstetric Emergencies: PPH (primary <24h: HAEMOSTASIS mnemonic, 4Ts=Tone/Trauma/Tissue/Thrombin; oxytocin first line, misoprostol, carboprost, Bakri balloon, B-Lynch suture), Preeclampsia (BP≥140/90 + proteinuria after 20wk, MgSO4 for seizure prophylaxis, hydralazine/labetalol for severe HTN, delivery = only cure)',
    'MCQ on FMT + OBG', 30,
    'Snapshot: IPC sections table + PPH 4Ts management in notes/shorts.md',
    'OBG continued: APH (placenta praevia: painless bright red bleeding, soft uterus, USG diagnosis, avoid PV; abruption: painful dark bleeding, board-like uterus, fetal distress). Cervical carcinoma (HPV 16/18, LEEP for CIN, radical hysterectomy for Stage I–IIA, radiation for IIB+, Pap smear screening)',
  ),

  stdDay(56, '2026-11-14', 'Paediatrics', 'Neonatology · Milestones · IMNCI · Paediatric Doses',
    3, 'Phase 3 — Tier 2 + Short Specialties', 'Paediatrics', 'pink',
    'Warm-up: PPH 4Ts — name all 4 and first-line drug for uterine atony',
    'Neonatology Extended: Jaundice (TSB levels for phototherapy per weight/age, direct hyperbilirubinemia always pathological), NEC (premature, bloody stool, pneumatosis intestinalis on X-ray, NPO+TPN+antibiotics), RDS (Type II pneumocytes, surfactant deficiency, ground-glass appearance, exogenous surfactant + CPAP), Sepsis (early <72h = GBS/E.coli, late = Staph coag-negative)',
    'Developmental Milestones: 3m (social smile, head control), 6m (sit with support, transfers objects), 9m (crawl, pincer grasp starts), 12m (stand, first words), 18m (walk, 10 words), 2y (run, 2-3 word sentences), 3y (tricycle, dress undress), 4y (hop on one leg), 5y (skip). DQ = DA/CA × 100',
    'MCQ on Paediatrics', 25,
    'Snapshot: Developmental milestones table by age in notes/paediatrics.md (motor/language/social)',
    'IMNCI: Integrated Management of Neonatal and Childhood Illness. Pneumonia classification (fast breathing: 60/min <2m, 50/min 2–12m, 40/min 1–5y; severe = chest indrawing; very severe = unable to drink/convulsions). ORS composition (WHO low-osmolarity: Na 75, Cl 65, glucose 75, K 20, citrate 10, total 245 mOsm/L). MUAC (Red <11.5cm, Yellow 11.5–12.5cm, Green >12.5cm)',
  ),

  {
    day: 57, date: '2026-11-15',
    title: '🔁 Snapshot — FMT · OBG · Paediatrics + Shorts Mixed Drill',
    subtitle: '50-MCQ Mixed Short Specialties Sprint',
    phase: 3, phaseLabel: 'Phase 3 — Tier 2 + Short Specialties',
    subject: 'Shorts Revision', subjectColor: 'gray', isSnapshotDay: true, totalMinutes: 220,
    snapshotReview: ['FMT IPC sections', 'OBG emergencies', 'Paediatrics milestones', 'Ortho', 'ENT', 'Ophthalmology', 'Pharmacology'],
    todos: [
      { id: 'd57-t1', text: 'Block 1 — FMT + OBG: Re-read IPC sections table + PPH 4Ts + APH types, then 15 MCQs', duration: '30 min', type: 'snapshot' },
      { id: 'd57-t2', text: 'Block 2 — Paediatrics: Re-read milestones table + NRP + ORS composition, then 15 MCQs', duration: '30 min', type: 'snapshot' },
      { id: 'd57-t3', text: 'Block 3 — Ortho + ENT + Ophtho: Re-read shorts.md, then 15 MCQs', duration: '30 min', type: 'snapshot' },
      { id: 'd57-t4', text: 'Shorts Mixed Mega-Drill: Solve 50 unseen short specialties MCQs (Ortho+ENT+Ophtho+FMT+OBG+Paeds+Physio+Derma+Psych)', duration: '60 min', type: 'mcq' },
      { id: 'd57-t5', text: 'Error Analysis + Update Snapshots: Add any missed points to notes/shorts.md', duration: '25 min', type: 'review' },
      { id: 'd57-t6', text: 'Flashcard Sprint: All short specialties flashcards from Phase 3', duration: '15 min', type: 'flashcard' },
      { id: 'd57-t7', text: '🏆 Phase 3 Milestone: Record Phase 3 mock score. Are you hitting 70%+ accuracy across all subjects?', duration: '10 min', type: 'review' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 4 — FIRST FULL REVISION CYCLE (Days 58–59)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    day: 58, date: '2026-11-16',
    title: 'Full Revision — Medicine & PSM', subtitle: 'Read Snapshots Only · No New Material',
    phase: 4, phaseLabel: 'Phase 4 — Full Revision Cycle',
    subject: 'Medicine + PSM', subjectColor: 'green', isSnapshotDay: true, totalMinutes: 240,
    snapshotReview: ['DM', 'Liver', 'Anaemia', 'Neurology', 'Cardiology', 'Nephrology', 'Thyroid', 'TB', 'Respiratory', 'PSM vital stats', 'Vaccines', 'Epidemiology'],
    todos: [
      { id: 'd58-t1', text: 'Medicine Snapshot Marathon: Read ALL medicine snapshots in notes/medicine.md back-to-back (DM, Liver, Anaemia, Neurology, Cardiology, Nephrology, Thyroid, TB, Respiratory, Rheumatology, Gastro)', duration: '45 min', type: 'snapshot' },
      { id: 'd58-t2', text: 'Medicine Flashcard Sprint: Run through ALL Medicine flashcards (estimate 45–60 cards)', duration: '20 min', type: 'flashcard' },
      { id: 'd58-t3', text: 'PSM Snapshot Marathon: Read ALL PSM snapshots (vital stats numbers, UIP schedule, epidemiology formulas, NHP list, family planning rates)', duration: '35 min', type: 'snapshot' },
      { id: 'd58-t4', text: 'PSM Flashcard Sprint: All PSM flashcards', duration: '15 min', type: 'flashcard' },
      { id: 'd58-t5', text: 'Medicine + PSM Mixed MCQ: Solve 50 questions mixing both subjects (unseen questions only)', duration: '60 min', type: 'mcq' },
      { id: 'd58-t6', text: 'Error Review: Annotate and update any stale snapshot bullets with corrected points', duration: '20 min', type: 'review' },
      { id: 'd58-t7', text: 'High-Risk Numbers Drill: Recall these from memory — India IMR, MMR, TFR, NMR, and DM diagnostic criteria numbers', duration: '5 min', type: 'flashcard' },
    ],
  },

  {
    day: 59, date: '2026-11-17',
    title: 'Full Revision — Pathology, Micro, Surgery & Tier 2', subtitle: 'Snapshots + 50-Q Mixed Mock',
    phase: 4, phaseLabel: 'Phase 4 — Full Revision Cycle',
    subject: 'All Subjects', subjectColor: 'purple', isSnapshotDay: true, totalMinutes: 245,
    snapshotReview: ['Neoplasia', 'Haematological pathology', 'Leukaemia FAB', 'Viral infections', 'Malaria', 'Immunology', 'Fractures', 'Shock', 'Anatomy nerve injuries', 'Vitamins', 'Pharmacology antidotes'],
    todos: [
      { id: 'd59-t1', text: 'Pathology Snapshot: Read notes/pathology.md (tumor markers, neoplasia, leukaemia FAB, organ pathology)', duration: '30 min', type: 'snapshot' },
      { id: 'd59-t2', text: 'Microbiology Snapshot: Read notes/microbiology.md (exanthemata table, HIV staging, malaria species, hypersensitivity types, culture media)', duration: '25 min', type: 'snapshot' },
      { id: 'd59-t3', text: 'Surgery Snapshot: Read notes/surgery.md (fracture eponyms, ATLS, Parkland formula, shock classification)', duration: '20 min', type: 'snapshot' },
      { id: 'd59-t4', text: 'Tier 2 Snapshot Sprint: Read notes/anatomy.md + notes/biochemistry.md + notes/pharmacology.md (key tables only)', duration: '30 min', type: 'snapshot' },
      { id: 'd59-t5', text: 'Big Mixed Mock: Solve 50 questions across ALL subjects (10 Medicine + 10 PSM + 5 Path + 5 Micro + 5 Surgery + 15 Tier 2/Shorts)', duration: '60 min', type: 'mock' },
      { id: 'd59-t6', text: 'Error Analysis: Identify your top 3 weakest topics going into the mock test', duration: '20 min', type: 'review' },
      { id: 'd59-t7', text: 'Final Weak Topic Blitz: Pick worst topic → re-read its snapshot + 20 targeted MCQs', duration: '40 min', type: 'mcq' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE 5 — MOCK TESTS (Day 60)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    day: 60, date: '2026-11-18',
    title: '🎯 Full Mock Test — 2024 PYQ Paper', subtitle: '100 MCQs · 120 Min · Exam Simulation',
    phase: 5, phaseLabel: 'Phase 5 — Mock Tests',
    subject: 'All Subjects', subjectColor: 'red', isSnapshotDay: false, totalMinutes: 250,
    todos: [
      { id: 'd60-t1', text: '📋 Pre-test: Light revision of your top 10 guaranteed topic flashcards (15 min maximum — no heavy studying)', duration: '15 min', type: 'flashcard' },
      { id: 'd60-t2', text: '🎯 FULL MOCK TEST (2024 PYQ): 100 MCQs in exactly 120 minutes. Strict exam conditions: no breaks, no phone, simulate exam hall. Aim for ≥80%', duration: '120 min', type: 'mock' },
      { id: 'd60-t3', text: 'Score Analysis: Calculate total score + subject-wise breakdown (Medicine, PSM, Path, Micro, Surgery, Tier 2, Shorts)', duration: '20 min', type: 'review' },
      { id: 'd60-t4', text: 'Deep Error Review: For each wrong answer write the correct concept. Categorise errors: (a) forgot concept (b) misread question (c) careless. Only (a) errors need re-study.', duration: '35 min', type: 'review' },
      { id: 'd60-t5', text: '🏆 60-Day Milestone: Record final mock score. Compare to Week 1 accuracy. You now have 25 buffer days to Dec 13.', duration: '10 min', type: 'snapshot' },
      { id: 'd60-t6', text: '📅 Final 25-Day Plan: Write down your top 3 weak subjects from this mock → schedule 2nd revision cycle for those in buffer days (Nov 19–Dec 12)', duration: '10 min', type: 'review' },
    ],
  },
];

// ─── derived utilities ───────────────────────────────────────────────────────

export const START_DATE = new Date('2026-09-20');
export const EXAM_DATE = new Date('2026-12-13');

export function todayDayNumber(): number {
  const today = new Date();
  const diff = Math.floor((today.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(60, diff + 1));
}

export function daysUntilExam(): number {
  const today = new Date();
  return Math.max(0, Math.ceil((EXAM_DATE.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
}

export const PHASE_COLORS: Record<PhaseNum, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  2: { bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-300' },
  3: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  4: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
  5: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
};

export const TODO_TYPE_CONFIG: Record<TodoType, { icon: string; color: string; label: string }> = {
  warmup:    { icon: '☀️', color: 'bg-yellow-50 border-yellow-200',  label: 'Warm-up'     },
  theory:    { icon: '📖', color: 'bg-blue-50 border-blue-200',      label: 'Theory'      },
  mcq:       { icon: '✏️', color: 'bg-green-50 border-green-200',    label: 'MCQ Drill'   },
  review:    { icon: '🔍', color: 'bg-orange-50 border-orange-200',  label: 'Review'      },
  snapshot:  { icon: '📌', color: 'bg-purple-50 border-purple-200',  label: 'Snapshot'    },
  flashcard: { icon: '🃏', color: 'bg-pink-50 border-pink-200',      label: 'Flashcards'  },
  mock:      { icon: '🎯', color: 'bg-red-50 border-red-200',        label: 'Mock Test'   },
};
