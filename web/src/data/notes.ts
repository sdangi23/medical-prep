// Short reference notes embedded in each study day
// Format: NoteBlock with title + bullet points (or table rows marked with |)

export interface NoteBlock {
  title: string;
  type: 'bullets' | 'table' | 'mnemonic';
  rows?: string[];     // for table: first entry = header (col1|col2|...)
  points?: string[];   // for bullets
  mnemonic?: string;   // for mnemonic: the word/phrase
  items?: string[];    // for mnemonic: what each letter stands for
}

export type DayNotes = NoteBlock[];

export const NOTES: Record<number, DayNotes> = {

  // ── Day 1: Diabetes Mellitus ──────────────────────────────────────────────
  1: [
    {
      title: 'Diagnostic Criteria (WHO/ADA 2023)',
      type: 'table',
      rows: [
        'Test|Diabetes|Pre-diabetes',
        'FPG (fasting)|≥ 126 mg/dL|100–125',
        '2h OGTT (75g)|≥ 200 mg/dL|140–199',
        'HbA1c|≥ 6.5%|5.7–6.4%',
        'Random + symptoms|≥ 200 mg/dL|—',
      ],
    },
    {
      title: 'DKA vs HHS — Quick Comparison',
      type: 'table',
      rows: [
        'Feature|DKA|HHS',
        'Type|Mainly T1DM|Mainly T2DM (elderly)',
        'Onset|Hours|Days–weeks',
        'Glucose|250–600|> 600 mg/dL',
        'Ketones|Strongly positive|Absent/trace',
        'pH|< 7.3|Normal (> 7.3)',
        'Osmolarity|< 320|> 320 mOsm/kg',
        'Mortality|< 1%|10–20%',
      ],
    },
    {
      title: 'DKA Management Protocol',
      type: 'bullets',
      points: [
        'Fluids: 0.9% NaCl 1L in 1h → then based on Na/glucose',
        'Insulin: 0.1 U/kg/h IV infusion (only after K+ >3.3 mEq/L)',
        'Potassium: Give if K+ < 5.5 — DKA always total-body K+ depleted',
        'Bicarbonate: Only if pH < 6.9',
        'Switch to SC insulin + feed when glucose < 200 + anion gap closed',
        '⚠️ Cerebral oedema: risk in children if fluids given too fast',
      ],
    },
    {
      title: 'Antidiabetic Drug Classes',
      type: 'table',
      rows: [
        'Drug|Mechanism|Hypo risk|Weight',
        'Metformin|↓ hepatic gluconeogenesis (AMPK)|No|↓ or neutral',
        'Sulfonylurea (glibenclamide)|↑ insulin secretion (K+ channel)|Yes|↑',
        'SGLT2i (empagliflozin)|Glycosuria via SGLT2 block|No|↓ (cardiorenal benefit)',
        'GLP-1 RA (semaglutide)|Incretin, ↑ insulin, ↓ glucagon|No|↓↓',
        'DPP4i (sitagliptin)|Prolong endogenous GLP-1|No|Neutral',
        'Insulin glargine|Basal insulin replacement|Yes|↑',
      ],
    },
    {
      title: 'Insulin Types',
      type: 'table',
      rows: [
        'Type|Onset|Peak|Duration',
        'Lispro/Aspart (rapid)|5–15 min|1–2h|4–6h',
        'Regular (short)|30–60 min|2–4h|6–8h',
        'NPH (intermediate)|2–4h|4–10h|12–18h',
        'Glargine/Detemir (long)|2h|No peak|20–24h',
      ],
    },
  ],

  // ── Day 2: Liver Disease & Jaundice ──────────────────────────────────────
  2: [
    {
      title: 'Jaundice — LFT Pattern',
      type: 'table',
      rows: [
        'Type|Bilirubin|ALP|AST/ALT|Causes',
        'Pre-hepatic|Unconj ↑|Normal|Normal|Haemolysis, Gilbert\'s',
        'Hepatic|Both ↑|Mild ↑|↑↑ (hepatocellular)|Viral hepatitis, cirrhosis',
        'Post-hepatic|Conjugated ↑|↑↑|Mild ↑|Choledocholithiasis, Ca head pancreas',
      ],
    },
    {
      title: 'Hepatitis B Serology — Must Know',
      type: 'table',
      rows: [
        'Marker|Meaning',
        'HBsAg|Active infection (surface antigen)',
        'Anti-HBs|Immunity (vaccine or recovery)',
        'HBeAg|High replication, very infectious',
        'Anti-HBe|Low replication',
        'Anti-HBc IgM|Acute infection / window period',
        'Anti-HBc IgG|Past infection (lifetime marker)',
        'Window period|HBsAg −ve, Anti-HBs −ve → ONLY Anti-HBc IgM +ve',
      ],
    },
    {
      title: 'Child-Pugh Score (5 parameters = A/B/C)',
      type: 'table',
      rows: [
        'Parameter|1 pt|2 pt|3 pt',
        'Bilirubin (µmol/L)|< 34|34–50|> 50',
        'Albumin (g/L)|> 35|28–35|< 28',
        'PT prolongation (sec)|< 4|4–6|> 6',
        'Ascites|None|Mild|Tense',
        'Encephalopathy|None|Grade 1–2|Grade 3–4',
        'Score|A = 5–6|B = 7–9|C = 10–15',
      ],
    },
    {
      title: 'Cirrhosis Complications & Rx',
      type: 'bullets',
      points: [
        'Ascites: restrict Na, spironolactone first (+ furosemide), therapeutic paracentesis for tense',
        'SBP: PMN > 250 cells/µL in ascites fluid → IV cefotaxime 5d + albumin',
        'Hepatic Encephalopathy: lactulose (titrate to 2–3 stools/day) + rifaximin',
        'HRS: type 1 (AKI within 2 wks) vs type 2 (chronic) → terlipressin + albumin',
        'Primary Prophylaxis varices: propranolol or carvedilol; bleeding → terlipressin + endoscopic banding',
        'HCC surveillance: USG ± AFP every 6 months in all cirrhotics',
      ],
    },
  ],

  // ── Day 3: Anaemia ────────────────────────────────────────────────────────
  3: [
    {
      title: 'WHO Anaemia Cutoffs (Hb g/dL)',
      type: 'table',
      rows: [
        'Group|Anaemia (Hb <)',
        'Adult male|13.0',
        'Adult female (non-pregnant)|12.0',
        'Pregnant woman|11.0',
        'Children 6–59 months|11.0',
        'Children 5–11 yr|11.5',
        'Children 12–14 yr|12.0',
      ],
    },
    {
      title: 'Microcytic Anaemia — IDA vs Thalassaemia Trait',
      type: 'table',
      rows: [
        'Feature|IDA|Beta-Thal Trait',
        'MCV|↓↓|↓ (disproportionately low)',
        'RBC count|↓|Normal or ↑',
        'Serum ferritin|↓ (< 12)|Normal',
        'TIBC|↑|Normal',
        'HbA2|Normal|↑ (> 3.5%) — diagnostic',
        'Peripheral smear|Pencil cells|Target cells, basophilic stippling',
        'Treatment|Iron supplementation|No iron — genetic counselling',
      ],
    },
    {
      title: 'Haemolytic Anaemias Key Facts',
      type: 'bullets',
      points: [
        'Intravascular: haemoglobinaemia, haemoglobinuria (Coca-Cola urine), ↑ LDH, ↓ haptoglobin',
        'Extravascular: jaundice, splenomegaly, ↑ unconjugated bilirubin',
        'Sickle cell crises: Vaso-occlusive (pain crisis), Sequestration (spleen), Aplastic (parvovirus B19), Haemolytic',
        'HbSS on electrophoresis: HbS prominent, HbA absent',
        'G6PD triggers: primaquine, dapsone, rasburicase, nitrofurantoin, infections (fava beans)',
        'Beta-thal major: requires transfusion from birth, desferrioxamine to chelate iron, HbF ↑ compensatory',
      ],
    },
    {
      title: 'Megaloblastic Anaemia — B12 vs Folate',
      type: 'table',
      rows: [
        'Feature|Vit B12|Folate',
        'Source|Animal products|Green vegetables',
        'Body stores|3–5 years|3–4 months',
        'Neurological features|Yes — SCD|No',
        'Serum level|↓|↓',
        'MMA (methylmalonic acid)|↑ (specific for B12)|Normal',
        'Homocysteine|↑|↑',
        'Treatment|IM hydroxocobalamin|Folic acid PO',
      ],
    },
  ],

  // ── Day 4: SNAPSHOT DAY ───────────────────────────────────────────────────
  4: [
    {
      title: '🔁 Snapshot Day — What to Do',
      type: 'bullets',
      points: [
        'Open notes/medicine.md → read each snapshot table (do NOT skip)',
        'Run Days 1–3 flashcards blind (cover the answer)',
        'Complete 45 mixed MCQs: 15 DM + 15 Liver + 15 Anaemia',
        'For each wrong answer: write the concept in 1 sentence',
        'End with 15-min timed recall: close all notes, write key numbers from memory',
      ],
    },
    {
      title: 'Day 4 Must-Recall Points',
      type: 'bullets',
      points: [
        'DM: FPG ≥126, HbA1c ≥6.5%, DKA pH <7.3 with ketones',
        'DKA K+ rule: do NOT start insulin if K+ < 3.3 mEq/L',
        'Liver: HBV window period = only anti-HBc IgM positive',
        'Child-Pugh: 5 parameters — bilirubin, albumin, PT, ascites, encephalopathy',
        'IDA vs Thal trait: HbA2 > 3.5% = thal trait, ferritin ↓ = IDA',
        'Sickle cell on OGTT: HbS band on electrophoresis, HbA absent',
      ],
    },
  ],

  // ── Day 5: Neoplasia & Tumor Markers ──────────────────────────────────────
  5: [
    {
      title: 'Tumor Markers — Complete Table',
      type: 'table',
      rows: [
        'Marker|Cancer|Notes',
        'AFP (α-fetoprotein)|HCC, Yolk sac|Also ↑ in pregnancy (normal)',
        'CEA|Colorectal, lung, breast|Not specific; used for monitoring',
        'CA-125|Ovarian|Also in endometriosis/PID',
        'PSA|Prostate|Screening + monitoring; ↑ in BPH too',
        'CA 19-9|Pancreas, cholangiocarcinoma|Most specific for pancreatic Ca',
        'β-HCG|Choriocarcinoma, testicular|Also + in normal pregnancy',
        'LDH|Lymphoma, testicular, ALL|Non-specific tumour bulk marker',
        'NSE|SCLC, Neuroblastoma|Small cell + neural crest tumours',
        'Calcitonin|Medullary thyroid Ca|Screen MEN2 families',
        'S-100|Melanoma, Schwannoma|Neural crest origin',
        'Chromogranin A|Carcinoid, APML|Neuroendocrine tumours',
      ],
    },
    {
      title: 'Benign vs Malignant — 8 Differences',
      type: 'table',
      rows: [
        'Feature|Benign|Malignant',
        'Differentiation|Well|Poor',
        'Growth rate|Slow|Fast',
        'Mitoses|Rare/normal|Frequent/atypical',
        'Local invasion|No|Yes',
        'Metastasis|Never|Yes (defining feature)',
        'Necrosis|Rare|Common (central)',
        'Capsule|Often present|No capsule',
        'Nuclear features|Regular, small nucleolus|Pleomorphic, prominent nucleolus',
      ],
    },
    {
      title: 'Viral Carcinogens — Must Know Pairs',
      type: 'table',
      rows: [
        'Virus|Cancer',
        'HPV 16/18|Cervical Ca, oropharyngeal Ca, anal Ca',
        'HBV/HCV|Hepatocellular Carcinoma',
        'EBV|Burkitt lymphoma, NPC, Hodgkin\'s (mixed cellularity)',
        'HTLV-1|Adult T-cell Leukaemia/Lymphoma',
        'HHV-8 (KSHV)|Kaposi\'s sarcoma (AIDS)',
        'H. pylori|Gastric adenocarcinoma, MALT lymphoma',
      ],
    },
    {
      title: 'Metastasis Routes',
      type: 'bullets',
      points: [
        'Lymphatic: carcinomas (most common) → regional LNs → Virchow\'s node (left supraclavicular = gastric/other abdominal Ca)',
        'Haematogenous: sarcomas, renal cell, thyroid, choriocarcinoma, hepatocellular',
        'Transcoelomic: ovary → peritoneum (Krukenberg tumour = gastric Ca to ovary via peritoneal route)',
        'Perineural: prostate, pancreatic, head & neck cancers',
        'Breast: Paget\'s disease = intraductal spread along skin',
        'Lung → brain, Breast → bone (osteolytic), Prostate → bone (osteoblastic)',
      ],
    },
  ],

  // ── Day 6: Viral Infections ───────────────────────────────────────────────
  6: [
    {
      title: 'Exanthemata — Comparison Table',
      type: 'table',
      rows: [
        'Disease|Rash Day|Distribution|Pathognomonic sign|Causative virus',
        'Measles|Day 4|Descending: face → trunk → limbs|Koplik spots (buccal mucosa)|Paramyxovirus',
        'Rubella|Day 1|Descending (similar but milder)|Forchheimer spots (soft palate)|Togavirus',
        'Chickenpox|Day 1|Centripetal (trunk > face > limbs)|Dew-drop on rose petal|VZV (Herpesviridae)',
        'Smallpox|Day 4|Centrifugal (face > limbs > trunk)|Palmoplantar lesions|Orthopoxvirus',
        'Roseola|Day 4|Trunk (when fever breaks)|Nagayama spots (uvulopalatal)|HHV-6',
        'Erythema infectiosum|Day 1|Slapped cheek → lacy rash|Slapped cheek|Parvovirus B19',
      ],
    },
    {
      title: 'Chickenpox vs Smallpox — 5 Differences',
      type: 'table',
      rows: [
        'Feature|Chickenpox|Smallpox',
        'Distribution|Centripetal (trunk first)|Centrifugal (face/limbs first)',
        'Lesion stage|Multiple stages simultaneously|All same stage',
        'Palms & soles|Spared|Involved (key differentiator)',
        'Prodrome|Minimal|3–4 day severe prodrome',
        'Severity|Usually mild|Severe, 30% mortality (unvaccinated)',
      ],
    },
    {
      title: 'Dengue — Diagnostic Tests & Timing',
      type: 'table',
      rows: [
        'Test|Positive from|Use',
        'NS1 antigen|Day 1–5|Early diagnosis',
        'IgM antibody|Day 5 onwards|Acute infection',
        'IgG antibody|Day 7+ (or earlier in secondary)|Secondary/past infection',
        'Tourniquet test|Any time|≥10 petechiae in 2.5cm = positive',
      ],
    },
    {
      title: 'HIV — CD4 Count Clinical Thresholds',
      type: 'table',
      rows: [
        'CD4 (cells/µL)|Action/Risk',
        '< 500|Start ART (regardless of WHO stage)',
        '< 350|Opportunistic infections begin to appear',
        '< 200|PCP pneumonia risk → start cotrimoxazole prophylaxis',
        '< 100|Toxoplasma, Cryptococcus risk',
        '< 50|MAC (Mycobacterium avium complex) risk → start azithromycin prophylaxis',
      ],
    },
    {
      title: 'ART First Line (WHO 2024)',
      type: 'bullets',
      points: [
        'First line: TDF + 3TC + DTG (tenofovir + lamivudine + dolutegravir)',
        'Alternate: TDF + FTC + EFV (if DTG unavailable)',
        'Pregnancy: DTG safe; avoid EFV in 1st trimester (neural tube defect risk)',
        'PMTCT: All HIV+ pregnant women on ART; NVP syrup to newborn for 6 weeks',
        'OI prophylaxis: cotrimoxazole DS when CD4 < 200 (start with ART)',
        'Immune reconstitution syndrome (IRIS): 2–8 weeks after ART start',
      ],
    },
  ],

  // ── Day 7: Neurology ──────────────────────────────────────────────────────
  7: [
    {
      title: 'Stroke — Ischaemic vs Haemorrhagic',
      type: 'table',
      rows: [
        'Feature|Ischaemic (80%)|Haemorrhagic (20%)',
        'Onset|Gradual (wake-up stroke)|Sudden, often during activity',
        'Headache|Rare|Severe ("thunderclap")',
        'Consciousness|Usually preserved initially|Often impaired',
        'CT findings|Normal (early) → hypodensity|Hyperdensity (blood)',
        'Thrombolysis|Yes (if ischaemic confirmed)|Contraindicated',
        'BP management|< 185/110 for tPA eligibility|Cautious lowering only',
      ],
    },
    {
      title: 'Thrombolysis (tPA) Criteria — RUHS Favourite',
      type: 'bullets',
      points: [
        'Window: within 4.5 hours of symptom onset (3h if >80yrs/DM/prior stroke)',
        'NIHSS: ≥4 (significant deficit) and ≤25 (not too severe)',
        'Contraindications: ICH on CT, major surgery <14d, BP >185/110 uncorrected',
        'Dose: alteplase 0.9 mg/kg IV (max 90 mg), 10% as bolus + 90% over 60 min',
        'No aspirin/heparin for 24h after tPA',
        'Mechanical thrombectomy: up to 24h if large vessel occlusion (LVO)',
      ],
    },
    {
      title: 'Epilepsy — Drug Selection by Seizure Type',
      type: 'table',
      rows: [
        'Seizure Type|First Choice|Alternative',
        'Absence|Ethosuximide (or valproate)|Lamotrigine',
        'GTCS (idiopathic generalised)|Sodium valproate|Levetiracetam',
        'Focal (partial)|Carbamazepine|Lamotrigine, levetiracetam',
        'Myoclonic|Sodium valproate|Levetiracetam, clonazepam',
        'Infantile spasms|ACTH or vigabatrin|—',
        'Status Epilepticus|Diazepam IV → phenytoin/fosphenytoin → thiopentone|—',
      ],
    },
    {
      title: 'CSF Analysis — 4-Way Comparison',
      type: 'table',
      rows: [
        'Feature|Normal|Bacterial|Viral|TB|Fungal (Crypto)',
        'Appearance|Clear|Turbid/purulent|Clear|Clear/fibrin web|Clear',
        'Cells/µL|< 5|1000–10000 (PMN)|100–1000 (lymph)|100–500 (lymph)|< 500 (lymph)',
        'Protein|0.15–0.45 g/L|↑↑ (> 1)|Normal/mild ↑|↑↑|↑',
        'Glucose (CSF/serum)|> 0.6|↓↓ (< 0.4)|Normal|↓↓ (< 0.4)|↓',
        'Special test|—|Gram stain/culture|PCR|ZN stain/culture|India ink / Ag',
      ],
    },
  ],

  // ── Day 8: Snapshot ───────────────────────────────────────────────────────
  8: [
    {
      title: 'Review Checklist — Day 8',
      type: 'bullets',
      points: [
        'Tumor markers: cover right column — name the cancer for each marker',
        'Exanthemata: which has centrifugal rash? Which has palmoplantar lesions?',
        'Stroke: what is the thrombolysis window? Key contraindication?',
        'HIV: CD4 threshold for cotrimoxazole prophylaxis?',
        'Status epilepticus: first 2 drug steps?',
      ],
    },
  ],

  // ── Day 9: Endocrine Physiology ───────────────────────────────────────────
  9: [
    {
      title: 'Thyroid Axis & TFT Interpretation',
      type: 'table',
      rows: [
        'Condition|TSH|fT4|fT3',
        'Primary hypothyroidism|↑↑|↓|↓',
        'Primary hyperthyroidism|↓↓|↑|↑',
        'Central (pituitary) hypothyroidism|↓ or normal|↓|↓',
        'Subclinical hypothyroidism|↑|Normal|Normal',
        'Sick euthyroid syndrome|Normal/↓|Normal/↓|↓↓ (low T3)',
        'Recovering euthyroid|↑ (transient)|Normal|Normal',
      ],
    },
    {
      title: 'Adrenal Cortex — Zone/Hormone/Function',
      type: 'table',
      rows: [
        'Zone (outer→inner)|Hormone|Function|Mnemonic',
        'Glomerulosa|Aldosterone (mineralocorticoid)|Na retention, K excretion|GFR = salt/sugar/sex',
        'Fasciculata|Cortisol (glucocorticoid)|Stress response, gluconeogenesis|',
        'Reticularis|DHEA/androgens (sex steroids)|Adrenarche|',
      ],
    },
    {
      title: 'Insulin Physiology Key Points',
      type: 'bullets',
      points: [
        'Released by beta cells of islets of Langerhans (pancreas)',
        'Stimuli: ↑ glucose, amino acids, GLP-1 (incretin), acetylcholine, CCK',
        'Counter-regulatory hormones: glucagon (main), cortisol, growth hormone, epinephrine',
        'GLUT2 in pancreatic beta cells (glucose sensor), GLUT4 in muscle/fat (insulin-dependent)',
        'Insulin promotes: glycogen synthesis, protein synthesis, fat storage',
        'Insulin inhibits: glycogenolysis, gluconeogenesis, lipolysis, ketogenesis',
      ],
    },
  ],

  // ── Day 10: Neonatal Problems ─────────────────────────────────────────────
  10: [
    {
      title: 'Neonatal Jaundice — Physiological vs Pathological',
      type: 'table',
      rows: [
        'Feature|Physiological|Pathological',
        'Onset|> 24 hours|< 24 hours (always pathological)',
        'Duration|< 14 days (term), < 21 days (preterm)|> 14 days (term)',
        'Rate of rise|< 0.5 mg/dL/h|> 0.5 mg/dL/h',
        'Peak bilirubin|< 12 (term), < 15 (preterm)|> 15 mg/dL',
        'Cause|Physiological haemolysis|ABO/Rh incompatibility, G6PD, sepsis',
      ],
    },
    {
      title: 'NRP Algorithm (Neonatal Resuscitation)',
      type: 'bullets',
      points: [
        'Initial steps: warm, dry, stimulate → assess breathing and HR',
        'PPV if: apnoea OR gasping OR HR < 100 bpm',
        'Target SpO2 60–65% at 1min → 85–95% at 5–10min',
        'Chest compressions if HR < 60 after 30s of PPV: 3:1 ratio',
        'Epinephrine: 0.01–0.03 mg/kg IV (umbilical vein) if HR < 60 despite CPR',
        'Therapeutic hypothermia: if HIE criteria met, start within 6 hours, 72h duration',
      ],
    },
    {
      title: 'Sarnat Staging — HIE',
      type: 'table',
      rows: [
        'Stage|Consciousness|Tone|Seizures|Outcome',
        'Stage I (mild)|Hyperalert|Normal/↑|None|Full recovery',
        'Stage II (moderate)|Lethargic|Hypotonic|Common|Variable',
        'Stage III (severe)|Stupor/coma|Flaccid|Uncommon|Death/severe disability',
      ],
    },
  ],

  // ── Day 11: Enteric Fever + Imaging ──────────────────────────────────────
  11: [
    {
      title: 'Enteric Fever — Key Facts',
      type: 'bullets',
      points: [
        'Causative agent: Salmonella typhi (typhoid fever), S. paratyphi (paratyphoid)',
        'Route: faeco-oral, contaminated water/food',
        'Widal test: O-agglutinin titre ≥ 1:160 = diagnostic (H = flagellar, less specific)',
        'Gold standard: bone marrow culture (most sensitive), blood culture in week 1',
        'Rose spots: trunk, day 7–10, salmon-coloured blanching macules',
        'Relative bradycardia: pulse-temperature dissociation (Faget\'s sign)',
        'Complications: intestinal perforation (3rd week), haemorrhage, hepatitis',
        'Treatment: azithromycin (mild–moderate), IV ceftriaxone (severe, India choice)',
      ],
    },
    {
      title: 'Food Poisoning — Onset Times (PYQ Favourite)',
      type: 'table',
      rows: [
        'Agent|Onset|Key Features',
        'Staph aureus|1–6h (avg 2–4h)|Preformed enterotoxin; vomiting > diarrhoea; rice/cream',
        'B. cereus (emetic)|1–6h|Re-heated rice; vomiting prominent',
        'B. cereus (diarrhoeal)|8–16h|Watery diarrhoea',
        'Clostridium perfringens|8–16h|Meat dishes; diarrhoea; self-limiting',
        'C. botulinum|12–36h|Descending flaccid paralysis, cranial nerves first',
        'ETEC|1–3 days|Traveller\'s diarrhoea; heat-labile + heat-stable toxins',
      ],
    },
    {
      title: 'Imaging Modality Selection',
      type: 'table',
      rows: [
        'Clinical Scenario|Best Modality|Why',
        'Abdominal trauma (haemodynamically stable)|CT abdomen + pelvis with contrast|Fast, comprehensive',
        'First trimester pregnancy (pelvic mass)|Transvaginal USG|No radiation, real-time',
        'Soft tissue tumour (limb)|MRI|Best soft tissue contrast',
        'Head injury (emergency)|Non-contrast CT head|Fast, rules out haemorrhage',
        'Chest (consolidation, TB)|CXR first → HRCT if needed|Radiation tradeoff',
        'Breast lump < 35 yrs|USG|Younger → dense breast; no radiation',
        'Breast lump > 35 yrs|Mammography|Better sensitivity in fatty breast',
        'Renal colic|CT KUB (non-contrast)|Most sensitive for stones',
        'Early joint pathology|MRI|Cartilage/ligament assessment',
        'Bone fracture|X-ray|Quick, cost-effective',
      ],
    },
  ],

  // ── Day 12: Snapshot ──────────────────────────────────────────────────────
  12: [
    {
      title: 'Review Checklist — Day 12',
      type: 'bullets',
      points: [
        'TFT pattern: write TSH and fT4 for primary hypothyroidism vs sick euthyroid',
        'NRP: at what HR do you start PPV? At what HR do you start chest compressions?',
        'Widal test: what titre is diagnostic? Which antigen (O or H) is more specific?',
        'Food poisoning: which organism causes descending paralysis?',
        'Imaging: which modality for soft tissue tumour of thigh?',
      ],
    },
  ],

  // ── Day 13: Cardiology ────────────────────────────────────────────────────
  13: [
    {
      title: 'ECG Changes in MI — Timeline',
      type: 'table',
      rows: [
        'Time after MI|ECG Change|Clinical Significance',
        'Minutes–1h|Hyperacute T waves (peaked, tall)|Earliest change; often missed',
        '1–6h|ST elevation (STEMI) — convex|Injury pattern; reperfusion window',
        '6h–24h|Q waves appear (> 25% R wave, > 40ms)|Infarction (dead myocardium)',
        '24h–weeks|T wave inversion|Evolving MI (still viable pericardium)',
        'Months|Persistent Q waves|Old/completed MI',
      ],
    },
    {
      title: 'STEMI Territory vs Artery',
      type: 'table',
      rows: [
        'Leads|Territory|Artery',
        'V1–V4|Anterior wall|LAD',
        'V5–V6, I, aVL|Lateral wall|LCx',
        'II, III, aVF|Inferior wall|RCA (dominant)',
        'V1–V2 (tall R)|Posterior (reciprocal)|RCA or LCx',
        'V3R, V4R|Right ventricle|RCA (proximal)',
      ],
    },
    {
      title: 'Heart Failure — Key Points',
      type: 'bullets',
      points: [
        'HFrEF: EF < 40% (systolic failure); HFpEF: EF ≥ 50% (diastolic failure)',
        'NYHA I: no symptoms; II: symptoms on moderate exertion; III: on mild exertion; IV: at rest',
        'HFrEF evidence-based treatment: ACEi/ARB + beta-blocker + MRA (spironolactone) + SGLT2i',
        'LMNOP for acute pulmonary oedema: Lasix (furosemide), Morphine, Nitrates, O2, Positioning (upright)',
        'BNP/NT-proBNP: elevated in HF; useful for diagnosis and monitoring',
        'CXR in HF: cardiomegaly (CTR > 0.5), Kerley B lines, bat-wing perihilar opacities, pleural effusion',
      ],
    },
    {
      title: 'CHA₂DS₂-VASc Score (AF anticoagulation)',
      type: 'bullets',
      points: [
        'C=CHF, H=HTN, A₂=Age≥75 (2pts), D=DM, S₂=Stroke/TIA (2pts), V=Vascular disease, A=Age 65–74, Sc=Sex category (female)',
        'Score ≥ 2 (men) or ≥ 3 (women): anticoagulate (DOAC preferred over warfarin)',
        'Score 1 (men): consider anticoagulation',
        'Anticoagulants: apixaban, rivaroxaban, dabigatran (DOACs); warfarin if valvular AF (INR 2–3)',
      ],
    },
  ],

  // ── Day 14: Nephrology ────────────────────────────────────────────────────
  14: [
    {
      title: 'AKI — KDIGO Staging',
      type: 'table',
      rows: [
        'Stage|Serum Creatinine|Urine Output',
        'Stage 1|×1.5–1.9 baseline OR ↑ ≥0.3 mg/dL in 48h|< 0.5 ml/kg/h for 6–12h',
        'Stage 2|×2–2.9 baseline|< 0.5 ml/kg/h for ≥12h',
        'Stage 3|×3 baseline OR ≥4 mg/dL OR RRT started|< 0.3 ml/kg/h for ≥24h or anuria 12h',
      ],
    },
    {
      title: 'Pre-Renal vs Intrinsic AKI',
      type: 'table',
      rows: [
        'Index|Pre-Renal|Intrinsic (ATN)',
        'FeNa|< 1%|> 2%',
        'Urine Na|< 20 mEq/L|> 40 mEq/L',
        'Urine osmolality|> 500 mOsm/kg|< 350 mOsm/kg',
        'Urine: plasma creatinine|> 40|< 20',
        'Response to fluids|Improves|No improvement',
        'Casts|Hyaline casts|Muddy brown (granular) casts = ATN',
      ],
    },
    {
      title: 'Nephrotic vs Nephritic Syndrome',
      type: 'table',
      rows: [
        'Feature|Nephrotic|Nephritic',
        'Proteinuria|> 3.5 g/day (massive)|< 3.5 g/day (mild–moderate)',
        'Haematuria|No (or mild)|Yes (RBC casts)',
        'Hypertension|Mild (secondary)|Prominent',
        'Oedema|Massive (anasarca)|Periorbital (mild)',
        'Albumin|↓↓|Normal or mild ↓',
        'Example cause|MCD (child), MN (adult)|Post-strep GN, IgA nephropathy',
        'Treatment|Steroids (MCD), RAAS block|Treat underlying cause',
      ],
    },
    {
      title: 'Hyperkalaemia — Emergency Management',
      type: 'bullets',
      points: [
        'ECG changes: peaked T waves → widened QRS → sine wave → VF',
        'Calcium gluconate (10ml 10% IV): membrane stabilisation, works in 1–3 min',
        'Insulin + 50% dextrose: shifts K+ intracellularly, works in 15–30 min',
        'Sodium bicarbonate: only if metabolic acidosis co-exists',
        'Salbutamol nebulisation: adjunct, shifts K+ into cells',
        'Kayexalate / patiromer: K+ removal (slower, 24–48h)',
        'Dialysis: if refractory or severe (K+ > 6.5 with ECG changes)',
      ],
    },
  ],

  // ── Day 15: Thyroid ───────────────────────────────────────────────────────
  15: [
    {
      title: 'Thyroid Cancers — Comparison',
      type: 'table',
      rows: [
        'Type|Frequency|Origin|Spread|Marker|Prognosis',
        'Papillary|75–80%|Follicular cell|Lymphatic|—|Best (>95% 10yr)',
        'Follicular|10–15%|Follicular cell|Haematogenous (bone, lung)|—|Good',
        'Medullary|5%|Parafollicular C-cell|Lymphatic + blood|Calcitonin|Intermediate',
        'Anaplastic|< 5%|Follicular cell|Rapid local invasion|—|Worst (months)',
        'Lymphoma|Rare|Lymphoid|—|—|Depends on type',
      ],
    },
    {
      title: 'Thyroid Storm — Management (4-Drug Protocol)',
      type: 'bullets',
      points: [
        'PTU (propylthiouracil): blocks synthesis AND peripheral T4→T3 conversion (use over carbimazole in storm)',
        'Lugol\'s iodine: 10 drops TDS (after PTU by 1h — "Wolff-Chaikoff effect")',
        'Beta-blocker (propranolol): controls tachycardia + blocks peripheral conversion',
        'Hydrocortisone 100mg 8-hourly: prevents adrenal crisis + blocks T4→T3',
        'Also: cooling blanket, IV fluids, treat precipitating cause (usually infection)',
        'MEN2A: medullary thyroid Ca + phaeochromocytoma + hyperparathyroidism (RET mutation)',
      ],
    },
  ],

  // ── Day 16: Snapshot ──────────────────────────────────────────────────────
  16: [
    {
      title: 'Review Checklist — Day 16',
      type: 'bullets',
      points: [
        'ECG MI: at what time do Q waves appear? What is the last change?',
        'STEMI inferior leads + artery involved?',
        'AKI stage 1 criteria (creatinine)?',
        'Pre-renal vs ATN: FeNa cutoffs?',
        'Nephrotic vs nephritic: which has RBC casts?',
        'Thyroid storm: 4 drugs (name all)',
      ],
    },
  ],

  // ── Day 17: Tuberculosis ──────────────────────────────────────────────────
  17: [
    {
      title: 'NTEP Regimen — DS-TB (India 2024)',
      type: 'table',
      rows: [
        'Phase|Duration|Drugs|Daily/Thrice weekly',
        'Intensive|2 months|HRZE (Isoniazid + Rifampicin + Pyrazinamide + Ethambutol)|Daily',
        'Continuation|4 months|HR (Isoniazid + Rifampicin)|Daily',
        'Total|6 months|—|—',
        'Notes: All under DOTS (Directly Observed Treatment Short-course)|—|—|—',
      ],
    },
    {
      title: 'ATT Drug Side Effects — PYQ Favourite',
      type: 'table',
      rows: [
        'Drug|Major Side Effect|Mechanism/Notes',
        'Isoniazid (H)|Peripheral neuropathy, hepatitis|Give pyridoxine (B6) prophylactically',
        'Rifampicin (R)|Hepatitis, orange-red urine|Enzyme inducer (CYP450); OCPs fail',
        'Pyrazinamide (Z)|Hyperuricaemia, hepatitis, arthralgia|Inhibits uric acid excretion',
        'Ethambutol (E)|Optic neuritis (colour vision first)|Check visual acuity monthly; reversible if caught early',
        'Streptomycin (S)|Ototoxicity, nephrotoxicity|Avoid in pregnancy (VIII nerve damage to fetus)',
      ],
    },
    {
      title: 'Drug-Resistant TB — Definitions',
      type: 'bullets',
      points: [
        'MDR-TB: resistant to at least H + R',
        'Pre-XDR TB: MDR + resistant to any fluoroquinolone',
        'XDR-TB: MDR + resistant to fluoroquinolone + at least one of: bedaquiline OR linezolid',
        'MDR-TB treatment: BPaL (Bedaquiline + Pretomanid + Linezolid) or longer regimens (18–24 months)',
        'CBNAAT (Xpert MTB-RIF): first-line test — detects TB + rifampicin resistance in 2 hours',
      ],
    },
  ],

  // ── Day 18: Respiratory ───────────────────────────────────────────────────
  18: [
    {
      title: 'Asthma — GINA Step-Up Therapy',
      type: 'table',
      rows: [
        'Step|Treatment',
        'Step 1|As-needed low-dose ICS-formoterol',
        'Step 2|Low-dose ICS daily + SABA PRN',
        'Step 3|Low-dose ICS-LABA daily',
        'Step 4|Medium-dose ICS-LABA',
        'Step 5|High-dose ICS-LABA + tiotropium/anti-IL5/anti-IgE biologic',
      ],
    },
    {
      title: 'COPD — GOLD Staging (Spirometry)',
      type: 'table',
      rows: [
        'GOLD Grade|FEV1 % predicted|Severity',
        'GOLD 1|≥ 80%|Mild',
        'GOLD 2|50–79%|Moderate',
        'GOLD 3|30–49%|Severe',
        'GOLD 4|< 30%|Very Severe',
        'Diagnostic criterion: FEV1/FVC < 0.70 post-bronchodilator|—|—',
      ],
    },
    {
      title: 'Pneumonia — CURB-65 Score',
      type: 'table',
      rows: [
        'Criterion|Score',
        'Confusion (new)|1',
        'Urea > 7 mmol/L (BUN > 19 mg/dL)|1',
        'Respiratory rate ≥ 30/min|1',
        'BP: systolic < 90 OR diastolic ≤ 60|1',
        'Age ≥ 65 years|1',
        'Score 0–1: outpatient|Score 2: hospital admission|Score ≥ 3: HDU/ICU',
      ],
    },
  ],

  // ── Day 19: Rheumatology + Gastro ─────────────────────────────────────────
  19: [
    {
      title: 'SLE — 2019 EULAR/ACR Criteria',
      type: 'bullets',
      points: [
        'Entry criterion: ANA titres ≥ 1:80 (most sensitive, 98%)',
        'Anti-dsDNA: high specificity (70%), correlates with disease activity and nephritis',
        'Anti-Smith (anti-Sm): highest specificity (99%) but low sensitivity (25%)',
        'Anti-phospholipid antibodies: lupus anticoagulant, anti-cardiolipin → thrombosis + recurrent miscarriage',
        'Hydroxychloroquine: given to ALL SLE patients (reduces flares, organ damage, mortality)',
        'Lupus nephritis Class III/IV: most severe; requires cyclophosphamide or mycophenolate + steroids',
      ],
    },
    {
      title: 'Crohn\'s vs Ulcerative Colitis',
      type: 'table',
      rows: [
        'Feature|Crohn\'s Disease|Ulcerative Colitis',
        'Distribution|Any part (mouth to anus)|Colon only, starts at rectum',
        'Pattern|Skip lesions|Continuous from rectum upward',
        'Rectal involvement|Spared (50%)|Always involved',
        'Depth|Full thickness (transmural)|Mucosal only',
        'Fistulas|Common|Rare',
        'Perianal disease|Common|Rare',
        'Smoking|Risk factor|Protective',
        'Colonoscopy|Cobblestone, linear ulcers, normal mucosa between|Loss of haustrations, pseudo-polyps',
        'Barium|String sign (stricture)|Lead-pipe appearance',
      ],
    },
  ],

  // ── Day 20: Medicine Mock ──────────────────────────────────────────────────
  20: [
    {
      title: 'Mock Test Strategy',
      type: 'bullets',
      points: [
        'Read each question ONCE slowly, then eliminate 2 wrong options',
        'Never change an answer unless you are 100% sure — first instinct is often right',
        'Flag uncertain questions and come back at the end',
        'Pace: 1 min/question for first pass (60 min for 60 questions)',
        'Reserve 10 min at end to review flagged questions',
        'Score: each subject separately to find your weakest link',
      ],
    },
  ],

  // ── Day 21: Epidemiology ──────────────────────────────────────────────────
  21: [
    {
      title: 'Study Designs — Quick Reference',
      type: 'table',
      rows: [
        'Design|Direction|Measure|Best For',
        'Cross-sectional|Single time point|Prevalence|Chronic diseases, planning',
        'Case-control|Retrospective|Odds Ratio (OR)|Rare diseases',
        'Cohort (prospective)|Forward|Relative Risk (RR)|Rare exposure',
        'RCT|Prospective|RR, NNT|Efficacy of intervention',
        'Ecological|Population level|Correlation|Hypothesis generation',
        'Meta-analysis|Systematic|Pooled RR/OR|Highest level of evidence',
      ],
    },
    {
      title: '2×2 Table Formulas — Must Memorise',
      type: 'bullets',
      points: [
        'Layout: a=exposed+disease, b=exposed+no disease, c=unexposed+disease, d=unexposed+no disease',
        'Incidence exposed = a/(a+b); Incidence unexposed = c/(c+d)',
        'Relative Risk (RR) = [a/(a+b)] / [c/(c+d)] — use in cohort/RCT',
        'Odds Ratio (OR) = (a×d) / (b×c) — use in case-control',
        'Attributable Risk (AR) = Incidence exposed − Incidence unexposed',
        'NNT = 1/ARR (absolute risk reduction)',
      ],
    },
    {
      title: 'Sensitivity, Specificity, PPV, NPV',
      type: 'table',
      rows: [
        'Measure|Formula|Mnemonic/Notes',
        'Sensitivity|TP/(TP+FN)|SnNout: high Sensitivity → rules OUT if Negative',
        'Specificity|TN/(TN+FP)|SpPin: high Specificity → rules IN if Positive',
        'PPV|TP/(TP+FP)|Affected by prevalence (↑ prevalence → ↑ PPV)',
        'NPV|TN/(TN+FN)|↑ prevalence → ↓ NPV',
        'Likelihood ratio +|Sensitivity/(1−Specificity)|> 10 = strong positive test',
      ],
    },
  ],

  // ── Day 22: Vital Statistics ──────────────────────────────────────────────
  22: [
    {
      title: 'India Vital Statistics — NFHS-5 / SRS 2020',
      type: 'table',
      rows: [
        'Indicator|India Value|Target (NHP/SDG)',
        'IMR (Infant Mortality Rate)|28 per 1000 LB|< 20 by 2030',
        'NNMR (Neonatal Mortality Rate)|20 per 1000 LB|< 10 by 2030',
        'U5MR (Under-5 Mortality)|32 per 1000 LB|< 25',
        'MMR (Maternal Mortality)|97 per 1,00,000 LB|< 70 by 2030',
        'TFR (Total Fertility Rate)|2.0|2.1 = replacement level',
        'CBR (Crude Birth Rate)|19.5 per 1000 pop|—',
        'CDR (Crude Death Rate)|6.0 per 1000 pop|—',
        'Life Expectancy|69.7 yrs (M=68.2, F=71.1)|—',
        'NRR (Net Reproduction Rate)|0.96|1.0 = stable population',
      ],
    },
    {
      title: 'Vital Statistics Formulas',
      type: 'bullets',
      points: [
        'IMR = (Deaths < 1yr / Live Births in same year) × 1000',
        'NNMR = (Deaths < 28d / Live Births) × 1000',
        'PNMR (Perinatal MR) = (Stillbirths + Deaths < 7d / Births ≥ 28wk) × 1000',
        'MMR = (Maternal deaths / 1,00,000 live births)',
        'TFR = Sum of ASFRs × 5 (or ASFR for each 5-year age group summed)',
        'Natural Growth Rate = CBR − CDR',
      ],
    },
  ],

  // ── Day 23: Vaccines & UIP ────────────────────────────────────────────────
  23: [
    {
      title: 'UIP 2026 — Complete Schedule',
      type: 'table',
      rows: [
        'Age|Vaccines Given',
        'Birth|BCG, OPV 0, Hep B 0',
        '6 weeks|OPV 1, IPV 1, Penta 1, Rota 1, PCV 1',
        '10 weeks|OPV 2, Penta 2, Rota 2',
        '14 weeks|OPV 3, IPV 2, Penta 3, Rota 3, PCV 2',
        '9 months|MR 1, JE 1 (endemic areas), Vit A 1',
        '12 months|PCV 3 (booster)',
        '16–24 months|OPV 4, MR 2, JE 2, DPT B1, Vit A 2',
        '5 years|DPT B2',
        '10 years|Td',
        '16 years|Td',
        'Pregnant women|TT2 (or Td × 2 doses, 4 wks apart)',
      ],
    },
    {
      title: 'Cold Chain Equipment',
      type: 'table',
      rows: [
        'Equipment|Temperature|Purpose',
        'ILR (Ice-Lined Refrigerator)|+2 to +8°C|Storage at PHC level',
        'Deep Freezer|-15 to -25°C|OPV long-term storage; freeze ice packs',
        'Walk-in Cooler (WIC)|+2 to +8°C|District cold store; large volume',
        'Walk-in Freezer (WIF)|-15 to -25°C|District; bulk OPV',
        'Cold Box|+2 to +8°C|Transport (days)',
        'Vaccine Carrier|+2 to +8°C|Last mile (< 1 day)',
      ],
    },
    {
      title: 'Freeze-Sensitive vs Heat-Sensitive Vaccines',
      type: 'bullets',
      points: [
        'Freeze-sensitive (damaged by freezing ≤0°C): DPT, DT, TT, Hep B, Rabies — "Killed/adsorbed vaccines"',
        'Most heat-sensitive: OPV (store at -20°C; once thawed, use within 1 month)',
        'VVM (Vaccine Vial Monitor): Inner square lighter than outer circle = discard',
        'Shake test: for DPT, DT, TT, Hep B — shake and observe precipitate (if "floccules" don\'t re-suspend → discard if freeze suspected)',
        'BCG: light-sensitive; protect from sunlight; store at +2 to +8°C',
      ],
    },
  ],

  // ── Day 24: Snapshot PSM ──────────────────────────────────────────────────
  24: [
    {
      title: 'Review Checklist — PSM Day 24',
      type: 'bullets',
      points: [
        'OR vs RR: which study uses which measure?',
        'SnNout and SpPin: explain in one sentence each',
        'India IMR, MMR, TFR: write from memory',
        'UIP: name the vaccines given at 14 weeks',
        'Cold chain: ILR temperature + which vaccines are freeze-sensitive?',
        'Secondary attack rate vs attack rate: what is the difference?',
      ],
    },
  ],

  // ── Day 25: PSM Drill ─────────────────────────────────────────────────────
  25: [
    {
      title: 'Family Planning Methods — Key Numbers',
      type: 'table',
      rows: [
        'Method|Pearl Index (failures/100 woman-years)|Notes',
        'Male sterilisation (NSV)|0.1|Most effective',
        'Female sterilisation (laparoscopy)|0.5|Pomeroy\'s technique most common',
        'Cu-T 380A (IUD)|0.6–0.8|Effective 10 years',
        'LNG-IUS (Mirena)|0.1–0.2|Effective 5 years; also treats menorrhagia',
        'PPIUCD|< 1|Inserted within 48h postpartum',
        'Combined OCP|0.3 (perfect use), 9 (typical use)|Take at same time daily',
        'Barrier (male condom)|2 (perfect), 15 (typical)|Only method preventing STIs',
        'Emergency contraception (LNG)|1–2% failure if used within 72h|Not regular contraception',
      ],
    },
    {
      title: 'Epidemic Investigation — 10 Steps',
      type: 'bullets',
      points: [
        '1. Confirm the diagnosis (clinical + lab)',
        '2. Confirm the epidemic (compare current vs expected cases)',
        '3. Case definition (time, place, person)',
        '4. Find cases — active search (house-to-house)',
        '5. Describe (epidemic curve, spot map, person characteristics)',
        '6. Form hypothesis (who, what, where, when, how)',
        '7. Test hypothesis (analytical study: case-control or cohort)',
        '8. Institute control measures (do NOT wait for step 7)',
        '9. Evaluate control measures',
        '10. Report writing',
      ],
    },
  ],

  // ── Days 26–40: Pathology/Surgery/Microbiology — abbreviated notes ─────────

  26: [
    {
      title: 'Leukaemia — FAB Classification Quick Table',
      type: 'table',
      rows: [
        'Type|Subtype|Key Feature|Treatment',
        'ALL L1|Common in children|TdT+, CD10+, small blasts|BFM protocol',
        'ALL L2|Adults|Large blasts|—',
        'ALL L3 (Burkitt)|EBV, t(8;14)|Vacuolated cytoplasm|R-CHOP',
        'AML M3 (APML)|t(15;17)|Auer rods, DIC risk|ATRA + arsenic trioxide',
        'AML M5|Monocytic|NSE+, gum infiltration|—',
        'CML|Philadelphia chr t(9;22)|BCR-ABL, splenomegaly|Imatinib',
        'CLL|Elderly, smudge cells|CD19+CD5+, indolent|Ibrutinib / watch-wait',
      ],
    },
    {
      title: 'Lymphoma Key Facts',
      type: 'bullets',
      points: [
        'Reed-Sternberg cells: pathognomonic for Hodgkin\'s Lymphoma (owl-eye cells)',
        'HL types: Nodular Sclerosis (commonest, young women, mediastinal), Mixed Cellularity (EBV-related, HIV), Lymphocyte Predominant (best prognosis)',
        'HL treatment: ABVD (Adriamycin + Bleomycin + Vinblastine + Dacarbazine)',
        'Ann Arbor staging: I = one LN region; II = 2+ regions, same side; III = both sides; IV = extranodal',
        'Burkitt lymphoma: t(8;14) = c-MYC translocation, "starry sky" pattern, jaw mass (endemic), EBV',
        'Multiple myeloma: CRAB criteria = hyperCalcaemia, Renal failure, Anaemia, Bone pain',
      ],
    },
  ],

  27: [
    {
      title: 'Necrosis Types — Disease Associations',
      type: 'table',
      rows: [
        'Type|Appearance|Associated Disease',
        'Coagulative|Firm, pale; architecture preserved|MI, infarct (most organs)',
        'Liquefactive|Pus/liquid; architecture lost|Brain infarct, abscess',
        'Caseous|Cheese-like; granuloma centre|Tuberculosis (pathognomonic)',
        'Fat|Calcium soap deposits|Pancreatitis, fat trauma (breast)',
        'Fibrinoid|Pink, fibrin-like in vessel wall|Malignant HTN, immune complex',
        'Gangrenous|Dry (arterial) or wet (venous)|Peripheral vascular disease',
      ],
    },
    {
      title: 'Granuloma Types',
      type: 'table',
      rows: [
        'Granuloma|Caseation|Giant Cell Type|Disease',
        'TB|Yes (caseous centre)|Langhans (nuclei at periphery)|Tuberculosis',
        'Sarcoid|No (non-caseating)|Foreign body type|Sarcoidosis',
        'Crohn\'s|No|Foreign body|Crohn\'s disease',
        'Leprosy (TT type)|No|Epithelioid + lymphocytes|Tuberculoid leprosy',
        'Foreign body|No|Foreign body (nuclei central)|Suture, talc, silica',
      ],
    },
  ],

  28: [
    {
      title: 'Glomerulopathy — LM/EM/IF Patterns',
      type: 'table',
      rows: [
        'Disease|Light Microscopy|Electron Microscopy|IF|Clinical',
        'MCD|Normal|Foot process effacement|Negative|Nephrotic (child); steroid-responsive',
        'Membranous GN|Thickened GBM, "spike and dome"|Subepithelial deposits|Granular IgG + C3|Nephrotic (adult); anti-PLA2R',
        'IgA nephropathy|Mesangial proliferation|Mesangial deposits|IgA dominant|Haematuria after URTI (Berger)',
        'Post-strep GN|Hypercellularity, "starry sky"|Subepithelial "humps"|Granular C3 + IgG|Nephritic, children',
        'MPGN|Tram-track|Subendothelial deposits|C3|Nephritic/nephrotic, C3↓',
        'Diabetic|Kimmelstiel-Wilson nodules|GBM thickening|IgG, albumin|Nephrotic, DM|',
      ],
    },
  ],

  29: [
    {
      title: 'Day 29 Snapshot — Review Triggers',
      type: 'bullets',
      points: [
        'Leukaemia: which type has Auer rods + DIC risk? What is the treatment?',
        'Reed-Sternberg cells: which lymphoma?',
        'Caseous necrosis = which disease?',
        'IgA nephropathy vs Post-strep GN: key clinical difference (timing of haematuria)',
        'Kimmelstiel-Wilson nodules = which disease on renal biopsy?',
      ],
    },
  ],

  30: [
    {
      title: 'Pathology — High-Yield Exam One-Liners',
      type: 'bullets',
      points: [
        'Bcl-2 overexpression → follicular lymphoma (t(14;18)) → anti-apoptotic',
        'p53 mutation → most common cancer mutation overall (Li-Fraumeni syndrome)',
        'Rb gene deletion → retinoblastoma (child) + osteosarcoma',
        'BRCA1/2 → breast + ovarian cancer (hereditary)',
        'APC mutation → familial adenomatous polyposis → colorectal Ca',
        'Mallory bodies (hyaline) → alcoholic hepatitis',
        'Russell bodies (plasma cells full of Ig) → multiple myeloma, chronic inflammation',
        'Psammoma bodies (concentric calcified) → PTC, meningioma, serous ovarian Ca, mesothelioma',
      ],
    },
  ],

  31: [
    {
      title: 'Fracture Eponyms — Must Know',
      type: 'table',
      rows: [
        'Fracture|Description|Mechanism|Complication',
        'Colles\'|Distal radius, dorsally angulated (dinner-fork)|FOOSH (fall on outstretched hand)|Malunion, median nerve',
        'Smith\'s|Distal radius, volarly angulated (reversed Colles)|Fall on flexed wrist|—',
        'Pott\'s|Bimalleolar ankle|Eversion + external rotation|—',
        'Monteggia|Ulna # + radial head dislocation|Forced pronation|Posterior interosseous nerve',
        'Galeazzi|Radius # + DRUJ dislocation|Direct blow|—',
        'Scaphoid|Snuffbox tenderness|FOOSH in young|AVN (30%)',
        'Supracondylar|Distal humerus (child)|FOOSH, hyperextension|Anterior interosseous nerve, cubitus varus',
        'NOF|Neck of femur (Garden I–IV)|Low-energy fall in elderly|AVN (III/IV), non-union',
      ],
    },
    {
      title: 'Parkland Formula & Burns',
      type: 'bullets',
      points: [
        'Formula: 4 ml × body weight (kg) × %TBSA burn (Ringer\'s lactate)',
        'First 8h from time of burn: give HALF the calculated volume',
        'Next 16h: give remaining HALF',
        'Urine output target: 0.5–1 ml/kg/h (adult), 1 ml/kg/h (child)',
        'TBSA rule of nines: head 9%, each arm 9%, each thigh 9%, each leg 9%, trunk (ant) 18%, trunk (post) 18%, perineum 1%',
        'Do NOT include simple erythema (1st degree) in TBSA calculation',
      ],
    },
  ],

  32: [
    {
      title: 'Acute Abdomen — Signs',
      type: 'table',
      rows: [
        'Sign|Test|Meaning',
        'McBurney\'s point|1/3 from ASIS to umbilicus|Appendicitis tenderness',
        'Rovsing\'s sign|LIF pressure → RIF pain|Peritoneal irritation at appendix',
        'Psoas sign|Hip extension → pain|Retrocaecal appendix',
        'Obturator sign|Hip internal rotation → pain|Pelvic appendix',
        'Alvarado (MANTRELS)|Migratory pain, Anorexia, Nausea, Tenderness RIF, Rebound, Elevated temp, Leukocytosis, Shift|Score ≥ 7 = surgical exploration',
        'Murphy\'s sign|RUQ pain on inspiration during palpation|Acute cholecystitis',
        'Cullen\'s sign|Periumbilical bruising|Retroperitoneal haemorrhage (pancreatitis, AAA)',
        'Grey Turner\'s sign|Flank bruising|Retroperitoneal haemorrhage',
      ],
    },
  ],

  33: [
    {
      title: 'Shock Classification',
      type: 'table',
      rows: [
        'Class|Blood Loss|HR|BP|Pulse pressure|Urine output',
        'I|< 15% (< 750ml)|Normal|Normal|Normal|Normal (> 30ml/h)',
        'II|15–30% (750–1500)|> 100|Normal|↓|20–30 ml/h',
        'III|30–40% (1500–2000)|> 120|↓|↓|5–15 ml/h',
        'IV|> 40% (> 2000)|> 140|↓↓|↓↓|< 5 ml/h',
      ],
    },
  ],

  34: [
    {
      title: 'Surgery Snapshot Day — Quick Recalls',
      type: 'bullets',
      points: [
        'Parkland formula: 4 × kg × %TBSA; first half in 8h',
        'Colles vs Smith: which is dorsally angulated? (Colles = dorsally = dinner fork)',
        'Monteggia: ulna + radial head — which nerve at risk? (posterior interosseous)',
        'Alvarado ≥ 7: surgical exploration for appendicitis',
        'Shock class III: BP starts to fall at what blood loss? (30–40%)',
        'Garden classification NOF: Grade IV → what complication? (AVN)',
      ],
    },
  ],

  35: [
    {
      title: 'Thyroid + Breast Surgery Key Points',
      type: 'bullets',
      points: [
        'Total thyroidectomy: risk of RLN (recurrent laryngeal nerve) → hoarseness; risk of hypoparathyroidism → hypocalcaemia',
        'MEN1 (Wermer): 3Ps = Parathyroid + Pituitary + Pancreas (gastrinoma/insulinoma)',
        'MEN2A: Medullary thyroid Ca + Phaeochromocytoma + Hyperparathyroidism (RET proto-oncogene)',
        'MEN2B: MTC + Phaeochromocytoma + Mucosal neuromas + Marfanoid habitus',
        'Breast triple assessment: clinical examination + imaging (USG < 35yr, mammo > 35yr) + FNAC/core biopsy',
        'Sentinel lymph node biopsy: negative → no full axillary clearance needed',
      ],
    },
  ],

  36: [
    {
      title: 'Malaria — Species Comparison',
      type: 'table',
      rows: [
        'Feature|P. falciparum|P. vivax|P. malariae|P. ovale',
        'Fever cycle|48h (tertian, irregular)|48h (tertian)|72h (quartan)|48h (tertian)',
        'RBC preference|All ages|Young RBCs|Old RBCs|Reticulocytes',
        'Relapse|No (no hypnozoites)|Yes (hypnozoites in liver)|Recrudescence|Yes (hypnozoites)',
        'Cerebral malaria|Yes (sequestration)|No|No|No',
        'Schüffner\'s dots|No|Yes|No|Yes',
        'Treatment|ACT (AS+SP or AL)|CQ + primaquine (check G6PD first)|CQ|CQ + primaquine',
      ],
    },
    {
      title: 'Severe Malaria (P. falciparum) Criteria',
      type: 'bullets',
      points: [
        'Cerebral malaria: altered consciousness, convulsions, GCS < 11',
        'Severe anaemia: Hb < 5 g/dL in adults',
        'Renal failure: creatinine > 265 µmol/L or urine < 400ml/24h',
        'Pulmonary oedema: ARDS pattern',
        'Hyperparasitaemia: > 5% parasitised RBCs',
        'Treatment: IV artesunate (preferred over IV quinine)',
      ],
    },
  ],

  37: [
    {
      title: 'Culture Media — Key Organism–Medium Pairs',
      type: 'table',
      rows: [
        'Medium|Organism|Appearance',
        'Blood agar|Strep, Staph (general)|Haemolysis patterns (α/β/γ)',
        'Chocolate agar|Neisseria, Haemophilus|Brown; releases V+X factors',
        'MacConkey agar|Enterobacteriaceae|Pink = lactose fermenter (E.coli); colourless = non-fermenter (Salmonella)',
        'TCBS agar|Vibrio cholerae|Yellow (sucrose fermenter)',
        'Löwenstein-Jensen|Mycobacterium|Buff-yellow colonies; 6–8 weeks',
        'Bordet-Gengou|Bordetella pertussis|Mercury drop colonies',
        'Sabouraud dextrose|Fungi|Cream colonies',
        'Thayer-Martin|Neisseria gonorrhoeae|Selective; inhibits commensals',
      ],
    },
  ],

  38: [
    {
      title: 'Hypersensitivity — 4 Types',
      type: 'table',
      rows: [
        'Type|Mechanism|Timing|Examples|Treatment',
        'I (Immediate)|IgE + mast cells + histamine|Seconds–minutes|Allergy, anaphylaxis, asthma|Epinephrine, antihistamine',
        'II (Cytotoxic)|IgG/IgM + complement → cell lysis|Hours|ABO transfusion reaction, HDN, Goodpasture, myasthenia gravis|—',
        'III (Immune complex)|Antigen-Ab complexes → complement|Hours–days|SLE, serum sickness, post-strep GN, Arthus|Steroids',
        'IV (Delayed/Cell-mediated)|T cells (CD4/CD8)|48–72h|TB Mantoux, contact dermatitis, transplant rejection, type 1 DM|Steroids, tacrolimus',
      ],
    },
  ],

  39: [
    {
      title: 'Sterilisation vs Disinfection',
      type: 'table',
      rows: [
        'Method|Kills|Temperature/Conditions|Used For',
        'Autoclave (steam under pressure)|All including spores|121°C, 15 psi, 15 min|Surgical instruments, dressings',
        'Dry heat|All including spores|160°C, 1h OR 170°C, 30 min|Glass, oils, powders (heat-stable)',
        'ETO (ethylene oxide)|All|Cold (37–55°C), 3–6h|Heat-sensitive plastics, endoscopes',
        'Glutaraldehyde 2%|All (10h = sterilise; 30 min = high-level disinfect)|Room temp|Flexible endoscopes',
        'Boiling water|Most except spores|100°C, 20 min|Intermediate; not sterilisation',
        'Pasteurisation|Vegetative forms, non-sporing|62.5°C/30 min or 72°C/15 sec|Milk (not sterilisation)',
        'Prion (CJD)|Prions require|134°C, 18 min autoclave|Instruments used in prion cases',
      ],
    },
  ],

  40: [
    {
      title: 'Big Five Score Targets',
      type: 'table',
      rows: [
        'Subject|Expected Qs|Your Target|Minimum Acceptable',
        'General Medicine|24–25|≥ 21|18',
        'PSM|12–13|≥ 11|9',
        'Pathology|11–12|≥ 10|8',
        'Surgery|10–11|≥ 8|7',
        'Microbiology|9–10|≥ 8|7',
        'Total (Big Five)|66–71|≥ 58|49',
      ],
    },
  ],

  // ── Anatomy Days (41–43) ───────────────────────────────────────────────────

  41: [
    {
      title: 'Nerve Injury → Deformity → Loss (PYQ Gold)',
      type: 'table',
      rows: [
        'Nerve|Deformity|Muscles Lost|Sensory Loss',
        'Radial|Wrist drop (finger extension also lost)|BEST = Brachioradialis, Extensors, Supinator, Triceps|Lateral dorsum hand, 1st web space',
        'Ulnar|Claw hand (4th & 5th fingers)|Hypothenar, interossei, medial 2 lumbricals, adductor pollicis|Medial 1½ fingers (ring + little)',
        'Median (wrist)|Ape hand (can\'t oppose thumb)|Thenar (LOAF), lat 2 lumbricals|Lateral 3½ fingers (thumb/index/middle)',
        'Axillary|Deltoid wasting, flat shoulder|Deltoid, teres minor|"Regimental badge" area',
        'Musculocutaneous|Weak elbow flexion|Biceps, brachialis|Lateral forearm',
      ],
    },
    {
      title: 'Brachial Plexus Injuries',
      type: 'table',
      rows: [
        'Injury|Roots|Mechanism|Clinical',
        'Erb\'s palsy|C5, C6|Traction: shoulder + neck forced apart|Waiter\'s tip: adduction, internal rotation, forearm pronation, wrist flexion',
        'Klumpke\'s palsy|C8, T1|Traction: arm pulled upward (difficult delivery)|Claw hand (all digits); Horner if T1 sympathetics',
        'Pan-plexus (C5–T1)|C5–T1|Severe traction|Complete flail arm',
      ],
    },
  ],

  42: [
    {
      title: 'Cranial Nerve Palsies — Clinical Features',
      type: 'table',
      rows: [
        'CN|Function|Lesion Sign',
        'III|Oculomotor|Complete ptosis + eye "down and out" + dilated pupil. Note: Medical CN3 (DM/HTN) = pupil SPARED',
        'IV|Trochlear|Vertical diplopia, head tilt away from lesion (superior oblique palsy)',
        'VI|Abducens|Lateral rectus palsy → eye deviated medially (esotropia)',
        'VII (LMN)|Facial|All facial muscles (including forehead): Bell\'s palsy, parotid tumour',
        'VII (UMN)|Facial|Forehead SPARED (bilateral cortical representation)',
        'XII|Hypoglossal|Tongue deviates TOWARD lesion (LMN); away = UMN (rare)',
      ],
    },
    {
      title: 'Arterial Territories — Brain',
      type: 'table',
      rows: [
        'Artery|Territory|Deficit if occluded',
        'ACA (anterior cerebral)|Medial hemisphere — leg/foot motor + sensory|Leg weakness > arm weakness',
        'MCA (middle cerebral)|Lateral hemisphere — arm/face; Broca + Wernicke areas|Arm > leg weakness; aphasia (dominant hemisphere)',
        'PCA (posterior cerebral)|Occipital lobe, thalamus|Homonymous hemianopia with macular sparing',
        'PICA (posterior inferior cerebellar)|Lateral medulla (Wallenberg\'s syndrome)|Dysphagia, hoarseness, Horner, ipsilateral face/contralateral body sensory loss',
        'Basilar artery|Brainstem, cerebellum|"Locked-in" syndrome if complete',
      ],
    },
  ],

  43: [
    {
      title: 'Rotator Cuff — SITS Muscles',
      type: 'table',
      rows: [
        'Muscle|Action|Nerve|Note',
        'Supraspinatus|Initiate abduction 0–15°|Suprascapular|Most commonly torn; painful arc 60–120°',
        'Infraspinatus|External rotation|Suprascapular|—',
        'Teres Minor|External rotation|Axillary|—',
        'Subscapularis|Internal rotation|Upper + lower subscapular|Anterior; tested by lift-off/belly-press',
      ],
    },
    {
      title: 'LOAF — Median Nerve Hand Muscles',
      type: 'bullets',
      points: [
        'L = Lateral 2 Lumbricals (1st and 2nd)',
        'O = Opponens Pollicis (thumb opposition)',
        'A = Abductor Pollicis Brevis',
        'F = Flexor Pollicis Brevis (superficial head)',
        'All thenar muscles + lateral 2 lumbricals = MEDIAN nerve',
        'Test: pen test (patient picks up pen between thumb and finger) — difficult in median nerve palsy',
      ],
    },
  ],

  // ── Biochemistry (45–46) ───────────────────────────────────────────────────

  45: [
    {
      title: 'Vitamin Deficiencies — Clinical Features',
      type: 'table',
      rows: [
        'Vitamin|Deficiency Disease|Key Clinical Feature',
        'A (Retinol)|Xerophthalmia|Night blindness → Bitot spots → keratomalacia; ↑ childhood mortality in measles',
        'D (Cholecalciferol)|Rickets (child) / Osteomalacia (adult)|Craniotabes, rachitic rosary, Harrison\'s groove, bow legs',
        'E (Tocopherol)|Haemolytic anaemia, neuropathy|Rare; premature neonates most at risk',
        'K (Phylloquinone)|Haemorrhagic disease of newborn|Prolonged PT; give Vit K to all neonates at birth',
        'B1 (Thiamine)|Beriberi / Wernicke\'s|Wet beriberi = cardiac; dry = peripheral neuropathy; Wernicke\'s = confusion+ataxia+ophthalmoplegia',
        'B2 (Riboflavin)|Ariboflavinosis|Angular stomatitis, magenta tongue, corneal vascularisation',
        'B3 (Niacin)|Pellagra|3Ds: Dermatitis (photosensitive) + Diarrhoea + Dementia; Casal\'s necklace',
        'B6 (Pyridoxine)|Sideroblastic anaemia|Also: INH side effect — give B6 prophylactically',
        'B9 (Folate)|Megaloblastic anaemia|Neural tube defects in pregnancy; start BEFORE conception',
        'B12 (Cobalamin)|Megaloblastic + SCD|Subacute combined degeneration of spinal cord (DCML + corticospinal)',
        'C (Ascorbic acid)|Scurvy|Perifollicular haemorrhage, corkscrew hairs, Fraenkel\'s sign (X-ray)',
      ],
    },
  ],

  46: [
    {
      title: 'Acid-Base Disorders — Quick Identification',
      type: 'table',
      rows: [
        'Disorder|pH|PaCO2|HCO3|Causes',
        'Metabolic acidosis|↓|↓ (compensatory)|↓|DKA, lactic acidosis, renal failure, diarrhoea',
        'Metabolic alkalosis|↑|↑ (compensatory)|↑|Vomiting, diuretics, hyperaldosteronism',
        'Respiratory acidosis|↓|↑ (primary)|↑ (compensatory)|COPD, respiratory failure, sedatives',
        'Respiratory alkalosis|↑|↓ (primary)|↓ (compensatory)|Hyperventilation, anxiety, high altitude, early salicylate',
      ],
    },
    {
      title: 'HAGMA — Mnemonic MUDPILES',
      type: 'bullets',
      points: [
        'M = Methanol poisoning',
        'U = Uraemia (renal failure)',
        'D = DKA / diabetic ketoacidosis',
        'P = Paracetamol (late, causes lactic acidosis)',
        'I = Isoniazid / Iron overdose',
        'L = Lactic acidosis (shock, metformin, hypoxia)',
        'E = Ethylene glycol poisoning',
        'S = Salicylate (aspirin overdose — also causes resp alkalosis initially)',
        'Normal anion gap (NAGMA): Diarrhoea, RTA type 1/2, Addison\'s disease',
        'Anion gap = Na − (Cl + HCO3); normal = 8–12 mEq/L',
      ],
    },
  ],

  // ── Pharmacology (47, 49) ──────────────────────────────────────────────────

  47: [
    {
      title: 'Drug Antidotes — Complete Table (PYQ Gold)',
      type: 'table',
      rows: [
        'Poison|Antidote|Mechanism',
        'Organophosphate|Atropine + Pralidoxime (2-PAM)|Atropine blocks muscarinic effects; 2-PAM reactivates AChE',
        'Paracetamol|N-acetylcysteine (NAC)|Replenishes glutathione',
        'Opioids (heroin, morphine)|Naloxone (IV/IM)|Opioid receptor antagonist',
        'Warfarin|Vitamin K (slow) + FFP/PCC (fast)|—',
        'Heparin|Protamine sulfate|1 mg per 100 U of heparin',
        'Iron|Desferrioxamine (deferoxamine)|Chelates Fe3+',
        'Benzodiazepines|Flumazenil|GABA-A receptor antagonist',
        'Carbon monoxide|100% O2 (or hyperbaric O2)|Displaces CO from haemoglobin',
        'Cyanide|Hydroxocobalamin or Amyl nitrite→Na nitrite→Na thiosulfate|—',
        'Methanol / Ethylene glycol|Fomepizole (or ethanol)|Inhibits alcohol dehydrogenase',
        'Digoxin toxicity|Digibind (anti-digoxin Fab fragments)|—',
        'Beta-blocker overdose|Glucagon|Bypasses β receptor; ↑ cAMP',
        'TCA overdose|Sodium bicarbonate|Alkalinisation narrows QRS',
      ],
    },
  ],

  48: [
    {
      title: 'Biochemistry + Pharmacology Review',
      type: 'bullets',
      points: [
        'Thiamine before glucose: always give IV thiamine BEFORE glucose in suspected Wernicke\'s',
        'INH + B6: isoniazid causes peripheral neuropathy by blocking B6 — give pyridoxine routinely',
        'Organophosphate SLUDGE: Salivation, Lacrimation, Urination, Defecation, GI upset, Emesis',
        'Digoxin toxicity ECG: prolonged PR, ST scooping ("Salvador Dalí moustache"), bradycardia',
        'MUDPILES = HAGMA causes; if AG normal → NAGMA (diarrhoea or RTA)',
        'Anion gap formula: Na − (Cl + HCO3) = 8–12 normal',
      ],
    },
  ],

  49: [
    {
      title: 'Antimicrobials — Mechanism & Target',
      type: 'table',
      rows: [
        'Antibiotic Class|Mechanism|Clinical Use',
        'Beta-lactams (penicillin, cephalosporin, carbapenem)|Cell wall synthesis (PBP)|Broad spectrum; augmentin = amox+clavulanate',
        'Aminoglycosides (gentamicin, amikacin)|30S ribosome; bactericidal|Gram-negative; nephrotoxic + ototoxic',
        'Tetracyclines (doxy)|30S ribosome; bacteriostatic|Atypicals, RMSF, cholera; avoid in pregnancy/children',
        'Macrolides (azithromycin)|50S ribosome; bacteriostatic|Atypicals (Mycoplasma, Legionella, Chlamydia)',
        'Fluoroquinolones (ciprofloxacin)|DNA gyrase + topoisomerase IV|UTI, GI infections, MDR-TB regimens',
        'Clindamycin|50S ribosome|Anaerobes; pseudomembranous colitis risk (C. diff)',
        'Vancomycin|Cell wall (D-Ala-D-Ala); bactericidal|MRSA, C. diff (oral)',
        'Metronidazole|DNA strand breakage (anaerobic organisms)|Anaerobes, C. diff, H. pylori, amoebiasis, giardia',
      ],
    },
  ],

  50: [
    {
      title: 'Cardiac Cycle Events',
      type: 'table',
      rows: [
        'Event|Phase|Valve Status',
        'Isovolumetric contraction|Systole start|All valves CLOSED; pressure rises rapidly',
        'Rapid ejection|Systole|Aortic/pulmonary OPEN; MV/TV closed',
        'Isovolumetric relaxation|Diastole start|All valves CLOSED; pressure falls',
        'Rapid ventricular filling|Early diastole|MV/TV OPEN; aortic/pulm closed',
        'S1 heart sound|MV+TV closure|Start of systole',
        'S2 heart sound|Aortic+pulmonary closure|Start of diastole',
        'S3 (gallop)|Rapid ventricular filling|Pathological in adults: HF, MR',
        'S4 (atrial kick)|End diastole (atrial contraction)|Pathological: LVH, HOCM',
      ],
    },
  ],

  // ── Shorts (51–57) ─────────────────────────────────────────────────────────

  51: [
    {
      title: 'Orthopaedics Key One-Liners',
      type: 'bullets',
      points: [
        'CTEV (Club Foot) = CAVE: Cavus (high arch) + Adduction + Varus (hindfoot) + Equinus (plantarflexion)',
        'Treatment: Ponseti casting (serial manipulation + casting) + Achilles tenotomy',
        'Salter-Harris Type I: through growth plate only (best prognosis)',
        'Salter-Harris Type V: crush injury to growth plate (worst prognosis)',
        'NOF neck of femur: Garden Grade I–II = impacted/incomplete (treat with screws); III–IV = displaced → hemiarthroplasty in elderly',
        'AVN: neck of femur + scaphoid most common in orthopaedics',
        'TB spine (Pott\'s disease): lower thoracic, cold abscess, kyphosis, paraplegia → anterior decompression (Hodgson\'s operation)',
      ],
    },
  ],

  52: [
    {
      title: 'CSOM — Tubotympanic vs Atticoantral',
      type: 'table',
      rows: [
        'Feature|Tubotympanic (Safe)|Atticoantral (Unsafe)',
        'Site of perforation|Central (pars tensa)|Marginal/attic (pars flaccida)',
        'Discharge|Mucoid, profuse, no odour|Scanty, purulent, foul-smelling',
        'Cholesteatoma|No|Yes (pathognomonic of unsafe)',
        'Bone erosion|No|Yes (ossicles → facial canal)',
        'Complications|Rare|Common (meningitis, facial palsy, intracranial abscess)',
        'Treatment|Myringoplasty|Mastoidectomy (modified radical or canal wall-down)',
      ],
    },
    {
      title: 'Tuning Fork Tests',
      type: 'table',
      rows: [
        'Test|Conductive Hearing Loss (CHL)|Sensorineural Hearing Loss (SNHL)',
        'Rinne|BC > AC (negative Rinne — BC is better)|AC > BC (positive Rinne — normal or SNHL)',
        'Weber|Lateralises to WORSE ear (louder sound = more bone contact)|Lateralises to BETTER ear',
        'Normal|AC > BC (Rinne positive); Weber central|—',
      ],
    },
  ],

  53: [
    {
      title: 'Glaucoma — POAG vs PACG',
      type: 'table',
      rows: [
        'Feature|POAG|PACG (Acute)',
        'Onset|Insidious, painless|Sudden, painful',
        'Vision|Tunnel vision (late)|Sudden blurring + coloured halos',
        'IOP|Elevated (>21 mmHg)|Very high (> 50 mmHg possible)',
        'Pupil|Normal|Mid-dilated, non-reactive',
        'Disc|C:D ratio > 0.6, cupping|Cupped in chronic',
        'Angle|Open|Closed',
        'Treatment|Latanoprost (PG analogue) first line|Laser peripheral iridotomy (emergency)',
      ],
    },
    {
      title: 'Diabetic Retinopathy — Stages',
      type: 'bullets',
      points: [
        'Background/NPDR: microaneurysms → dot/blot haemorrhages → hard exudates',
        'Pre-proliferative NPDR: cotton-wool spots (nerve fibre ischaemia)',
        'Proliferative DR: new vessels (NVD on disc, NVE elsewhere) → vitreous haemorrhage → tractional RD',
        'Maculopathy: clinically significant macular oedema (CSMO) — commonest cause of visual loss in DM',
        'Treatment: pan-retinal photocoagulation (PRP) for PDR; anti-VEGF (ranibizumab) for CSMO',
      ],
    },
  ],

  54: [
    {
      title: 'Shorts Review Checklist',
      type: 'bullets',
      points: [
        'CSOM: which type has cholesteatoma? (atticoantral = unsafe)',
        'Tuning fork: Weber lateralises to which ear in CHL?',
        'CTEV = CAVE — what does each letter mean?',
        'Glaucoma: first-line drug for POAG (latanoprost)',
        'DR: what is the commonest cause of visual loss in DM? (maculopathy/CSMO)',
        'LOAF muscles: what does each letter stand for?',
        'Salter-Harris V: which is best/worst prognosis? (I = best, V = worst)',
      ],
    },
  ],

  55: [
    {
      title: 'PPH Management — 4Ts',
      type: 'table',
      rows: [
        'Cause|4T|Management',
        'Uterine atony (80%)|Tone|Bimanual compression; oxytocin IV; misoprostol; carboprost (15-methyl PGF2α)',
        'Tissue retention|Tissue|Manual removal of placenta; check placenta complete',
        'Trauma (lacerations)|Trauma|Repair; check cervix + vagina; Bakri balloon for uterine packing',
        'Thrombin (coagulopathy)|Thrombin|FFP + cryoprecipitate + platelets; treat DIC if present',
        'Surgical options (if above fail): B-Lynch suture → uterine artery ligation → internal iliac ligation → hysterectomy|—|—',
      ],
    },
    {
      title: 'IPC Sections — Medicolegal',
      type: 'table',
      rows: [
        'IPC Section|Offence',
        '302|Murder (culpable homicide amounting to murder)',
        '304A|Death by negligence (rash or negligent act)',
        '304B|Dowry death',
        '312|Causing miscarriage (voluntary)',
        '313|Abortion without woman\'s consent',
        '376|Rape',
        '354|Outraging modesty of a woman',
        '325|Voluntarily causing grievous hurt',
        '120B|Criminal conspiracy',
      ],
    },
  ],

  56: [
    {
      title: 'Developmental Milestones — Age Grid',
      type: 'table',
      rows: [
        'Age|Gross Motor|Fine Motor|Social/Language',
        '3 months|Head control in prone; lift chest|Hands unfisted; follows 90°|Social smile (6–8 wks); cooing',
        '6 months|Sit with support; roll over|Palmer grasp; transfers objects|Stranger anxiety starts; babbling',
        '9 months|Sit without support; crawl|Inferior pincer (thumb+fingers)|"Ma-ma" (non-specific); waves bye',
        '12 months|Cruise furniture; stand alone|Fine pincer (thumb+forefinger)|First specific words; 2–3 words',
        '18 months|Walk independently|Tower of 3 cubes; scribble|10+ words; identifies body parts',
        '2 years|Run; kick ball|Tower 6 cubes; circular scribble|2–3 word sentences; 200+ words',
        '3 years|Climb stairs (alternating)|Tower 9–10 cubes; copies circle|Sentences; 900 words; asks "why"',
        '4 years|Hop on one leg|Copies cross|Tells stories; 1500 words',
        '5 years|Skip; stand on one leg 10 sec|Copies square; writes name|2000 words; reads simple words',
      ],
    },
  ],

  57: [
    {
      title: 'Shorts Final Snapshot',
      type: 'bullets',
      points: [
        'PPH oxytocin dose: 10 IU IV bolus or 20 IU in 500ml saline',
        'MTP Act 2021 (India): up to 20 weeks for all women; up to 24 weeks for special categories (rape, fetal anomaly)',
        'ORS (WHO low osmolarity): Na 75, K 20, Cl 65, Citrate 10, Glucose 75 mEq/L; osmolarity 245',
        'MUAC: < 11.5cm = severe acute malnutrition (SAM); 11.5–12.5 = moderate; > 12.5 = normal',
        'Fast breathing (IMNCI): ≥ 60/min in < 2m; ≥ 50/min in 2–12m; ≥ 40/min in 1–5y',
        'Developmental milestones: social smile at 6–8 weeks (earliest testable milestone)',
      ],
    },
  ],

  58: [
    {
      title: 'Revision Day 58 — Medicine Priority Items',
      type: 'bullets',
      points: [
        'DM: FPG ≥126; HbA1c ≥6.5%; DKA = ketones + low pH; HHS = osmolarity > 320, no ketones',
        'Hepatitis B: window period = HBsAg−ve, Anti-HBs−ve, Anti-HBc IgM +ve',
        'Stroke: tPA window 4.5h; hyperacute T waves are the FIRST ECG change in MI',
        'ATT: H = neuropathy (give B6); E = optic neuritis (check VA monthly)',
        'PSM: IMR=28, MMR=97, TFR=2.0; SnNout / SpPin',
        'UIP: vaccines at 14 weeks = OPV3 + IPV2 + Penta3 + Rota3 + PCV2',
      ],
    },
  ],

  59: [
    {
      title: 'Revision Day 59 — High-Yield One-Liners',
      type: 'bullets',
      points: [
        'AML M3 (APML): t(15;17), Auer rods, DIC → ATRA treatment',
        'Malaria severe: IV artesunate (not quinine); P. falciparum = no hypnozoites',
        'STEMI inferior (II, III, aVF) = RCA; lateral (I, aVL, V5-V6) = LCx',
        'Parkland: 4 × kg × %TBSA; first half in 8 hours from time of burn',
        'Exanthemata: smallpox = centrifugal + palmoplantar; chickenpox = centripetal',
        'Antidotes: organo-phosphate = atropine + pralidoxime; paracetamol = NAC',
        'Nephritic: RBC casts; Nephrotic: >3.5g/day protein',
      ],
    },
  ],

  60: [
    {
      title: 'Mock Test Day — Mental Preparation',
      type: 'bullets',
      points: [
        'Read each question once. Do not go back to re-read unless you finish early.',
        'Eliminate obviously wrong answers first; choose between remaining 2.',
        'No negative marking → attempt EVERY question (never leave blank).',
        'Community Medicine (PSM) questions: read numbers carefully — they test exact values.',
        'Pharmacology: drug mechanism is the question type — know MOA for all drug classes.',
        'If scoring > 80 on this mock, you are on track for 85+ on exam day.',
        'Target score by subject: Medicine 21, PSM 11, Pathology 10, Surgery 8, Micro 8 = 58/67 from Big Five alone.',
      ],
    },
  ],
};
