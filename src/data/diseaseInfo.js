export const diseaseCards = [
  {
    icon: "Bug",
    title: "Causative Agent",
    body: "Diphtheria is caused by Corynebacterium diphtheriae, a gram-positive rod-shaped bacterium. It releases a potent exotoxin that attacks the heart muscle (myocarditis), peripheral nerves (polyneuropathy), and kidneys — often before clinical diagnosis is made.",
  },
  {
    icon: "Wind",
    title: "How It Spreads",
    body: "Transmitted primarily through respiratory droplets and direct contact with infected secretions or contaminated surfaces. Asymptomatic carriers actively spread the disease without showing illness. Crowded, poorly ventilated environments dramatically accelerate community transmission.",
  },
  {
    icon: "HeartPulse",
    title: "Clinical Presentation",
    body: "The hallmark sign is a thick, grayish-white pseudomembrane forming on the tonsils and pharynx, which can cause suffocation. Early symptoms include sore throat, low-grade fever, and malaise. Without treatment, the case fatality rate is 5–10%, rising to 20%+ in children under 5.",
  },
  {
    icon: "Syringe",
    title: "DPT Vaccine — The Shield",
    body: "The DPT (Diphtheria, Pertussis, Tetanus) combination vaccine provides over 95% protection when the full series is completed. It is safe, effective, and available free of charge at all government primary healthcare centres across Nigeria under the National Programme on Immunization (NPI).",
  },
  {
    icon: "Calendar",
    title: "Nigeria Immunization Schedule",
    body: "DPT-HepB-Hib: 6 weeks, 10 weeks, 14 weeks (primary series). Boosters at 18 months and 4–6 years. Missing even one dose significantly reduces protection. Children who miss doses can receive catch-up vaccinations at any government health facility — no questions asked.",
  },
  {
    icon: "AlertTriangle",
    title: "Re-emergence in Nigeria",
    body: "Nigeria has confirmed diphtheria outbreaks across Kano, Yobe, Osun, Borno, Zamfara, and Kwara States since 2022. Outbreaks disproportionately affect unvaccinated and under-vaccinated children under 15. The NCDC and WHO have issued national alerts demanding urgent immunization response.",
  },
];

export const vaccinationSchedule = [
  {
    dose: "1st Dose",
    age: "6 Weeks",
    vaccine: "DPT-HepB-Hib",
    type: "Primary Series",
    fill: 100,
  },
  {
    dose: "2nd Dose",
    age: "10 Weeks",
    vaccine: "DPT-HepB-Hib",
    type: "Primary Series",
    fill: 100,
  },
  {
    dose: "3rd Dose",
    age: "14 Weeks",
    vaccine: "DPT-HepB-Hib",
    type: "Primary Series",
    fill: 100,
  },
  {
    dose: "4th Dose",
    age: "18 Months",
    vaccine: "DPT Booster",
    type: "Booster",
    fill: 60,
  },
  {
    dose: "5th Dose",
    age: "4–6 Years",
    vaccine: "DPT Booster",
    type: "Booster",
    fill: 30,
  },
];

export const urgencyStats = [
  {
    icon: "AlertTriangle",
    value: 3521,
    suffix: "+",
    label: "Confirmed diphtheria cases reported in Nigeria since 2022",
  },
  {
    icon: "TrendingDown",
    value: 42,
    prefix: "~",
    suffix: "%",
    label: "Estimated DPT3 coverage gap in rural Kwara State communities",
  },
  {
    icon: "Calendar",
    value: 2022,
    suffix: "–",
    label: "Active national outbreak · NCDC emergency alert still in effect",
  },
  {
    icon: "Shield",
    value: 95,
    suffix: "%+",
    label: "Vaccine protection efficacy when full 5-dose DPT series completed",
  },
];

export const kapBaseline = [
  { label: "Knowledge of diphtheria", value: 38, color: "#fbbf24" },
  {
    label: "Positive attitude toward DPT vaccine",
    value: 61,
    color: "#3b82f6",
  },
  { label: "DPT series completion rate", value: 54, color: "#1a4a8a" },
  {
    label: "Sought professional advice on vaccines",
    value: 29,
    color: "#fde68a",
  },
];

export const barriers = [
  {
    severity: "HIGH",
    name: "Misinformation & Vaccine Hesitancy",
    color: "#dc2626",
  },
  {
    severity: "HIGH",
    name: "Healthcare Access & Distance Barriers",
    color: "#dc2626",
  },
  {
    severity: "MODERATE",
    name: "Low Community Awareness of Diphtheria",
    color: "#d4a017",
  },
  {
    severity: "MODERATE",
    name: "Vaccine Supply & Cold Chain Failures",
    color: "#d4a017",
  },
  {
    severity: "CONTEXTUAL",
    name: "Socio-cultural & Religious Resistance",
    color: "#7c3aed",
  },
  {
    severity: "MODERATE",
    name: "Economic Barriers & Competing Priorities",
    color: "#d4a017",
  },
];

export const studySites = [
  {
    name: "Sobi Specialist Hospital",
    type: "Primary · Outpatient Units",
    status: "primary",
  },
  {
    name: "Community Mosques — Ilorin West",
    type: "Secondary · Friday Jumu'ah",
    status: "secondary",
  },
  {
    name: "Mandate Market & Environs",
    type: "Secondary · High-Traffic Days",
    status: "secondary",
  },
];
