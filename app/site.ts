// Central place for company details and page content.
// Contact details left empty are hidden on the site until filled in.

export const company = {
  name: "SteriQual Solutions Pvt. Ltd.",
  short: "SteriQual",
  city: "Ahmedabad, Gujarat, India",
  email: "", // e.g. "info@steriqualsolutions.com"
  phone: "", // e.g. "+91 98XXX XXXXX"
  whatsapp: "", // digits only with country code, e.g. "9198XXXXXXXX"
  address: "", // full office address
  hours: "", // e.g. "Monday to Saturday, 9:30 am to 6:30 pm"
  linkedin: "",
  /** Public profiles that prove this is the same business (LinkedIn, Google Business Profile, IndiaMART, Justdial…). */
  sameAs: [] as string[],
  locality: "Ahmedabad",
  region: "Gujarat",
  country: "IN",
};

/** Live site address (no trailing slash). */
export const siteUrl = "https://steriqualsolutions.com";

export const siteDescription =
  "Ahmedabad-based GMP consulting: cleanroom and equipment qualification, CSV, contamination control, mock audits, training and sterile lab consumables.";

/** Every page agents and search engines should read. */
export const pages = [
  { path: "/", md: "index", title: "Home", priority: 1 },
  { path: "/about-us", md: "about-us", title: "About Us", priority: 0.8 },
  { path: "/services", md: "services", title: "Services", priority: 0.9 },
  { path: "/products", md: "products", title: "Laboratory Consumables and Equipment", priority: 0.8 },
  { path: "/contact-us", md: "contact-us", title: "Contact Us", priority: 0.7 },
  { path: "/privacy-policy", md: "privacy-policy", title: "Privacy Policy", priority: 0.3 },
  { path: "/terms-of-use", md: "terms-of-use", title: "Terms of Use", priority: 0.3 },
];

export const nav = [
  { href: "/about-us", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contact-us", label: "Contact" },
];

/** Regulators whose audits the team has faced directly. */
export const auditsFaced = ["USFDA", "EMA", "INVIMA"];

export const regulators = [
  { code: "USFDA", flag: "us", name: "U.S. Food and Drug Administration", region: "United States" },
  { code: "EMA", flag: "eu", name: "European Medicines Agency", region: "European Union" },
  { code: "INVIMA", flag: "co", name: "Instituto Nacional de Vigilancia de Medicamentos y Alimentos", region: "Colombia" },
];

/** What each standard covers, shown on the home page. */
export const standardsDetail = [
  { name: "ISO 14644-1", area: "Cleanroom classification", text: "Classifies air cleanliness by the concentration of airborne particles." },
  { name: "ISO 14644-3", area: "Cleanroom test methods", text: "Test methods for airflow, pressure, filter leaks, recovery and containment." },
  { name: "USFDA cGMP", area: "United States", text: "21 CFR Parts 210 and 211 for drug manufacturing, and Part 11 for electronic records." },
  { name: "EU GMP", area: "European Union", text: "EudraLex Volume 4, including Annex 1 for sterile medicinal products." },
  { name: "PIC/S GMP", area: "International", text: "The GMP guide shared by inspectorates of the Pharmaceutical Inspection Co-operation Scheme." },
  { name: "Schedule M", area: "India", text: "GMP requirements under the Drugs and Cosmetics Act, 1940 and its Rules." },
];

/** Hero photos for inner pages (Unsplash License). Swap for the client's own photos when available. */
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=70`;
export const heroPhotos = {
  about: u("photo-1669101283985-ab2b293923df"),
  services: u("photo-1748002388689-c62b45d5c28b"),
  products: u("photo-1668600418879-c461f6079c06"),
  contact: u("photo-1669101283516-e608dcf142df"),
};

/** Standards the services are aligned with. */
export const standards = [
  "ISO 14644-1",
  "ISO 14644-3",
  "USFDA",
  "EMA",
  "PIC/S",
  "cGMP",
  "Drugs and Cosmetics Act, India",
];

export type Service = { key?: string; title: string; text: string; tag?: string };

export const pharma = {
  id: "pharmaceutical",
  title: "Pharmaceutical GMP & Investigation Services",
  short:
    "Comprehensive compliance, risk management and validation frameworks for sterile and non-sterile drug manufacturing facilities.",
  services: [
    {
      key: "ccs",
      title: "Contamination Control Strategy (CCS)",
      text: "End-to-end design, gap analysis and execution aligned with current international mandates.",
    },
    {
      key: "investigation",
      title: "Microbial failure investigations",
      text: "Deep-dive root-cause identification for environmental monitoring (EM) excursions, deviations, operational failures and out-of-specification (OOS) results.",
    },
    {
      key: "aps",
      title: "Aseptic Processing Simulation (APS) troubleshooting",
      text: "Specialized intervention, analysis and robust remediation plans for media fill failures.",
    },
    {
      key: "water",
      title: "Water system & area qualification",
      text: "Meticulous qualification protocols for Purified Water (PW), Water for Injection (WFI), clean utilities and HVAC systems.",
    },
    {
      key: "equipment",
      title: "Equipment qualification including CSV",
      text: "Qualification of equipment, including Computer Systems Validation (CSV).",
    },
    {
      key: "audit",
      title: "Mock auditing & regulatory readiness",
      text: "Comprehensive pre-inspection plant assessments to prepare for successful audits by global regulatory bodies.",
    },
    {
      key: "sop",
      title: "SOP & study protocol preparation",
      text: "Clear, technically sound and fully compliant laboratory procedures and execution scripts.",
    },
    {
      key: "training",
      title: "QC microbiology training",
      text: "Specialized training structures that reduce laboratory subjectivity and human error.",
    },
  ] as Service[],
  note: "Our validation and consulting services are aligned with international standards such as ISO, USFDA, EMA, PIC/S and the Indian Drugs and Cosmetics Act.",
};

export const cleanroom = {
  id: "cleanroom",
  title: "Precision Cleanroom Qualification & Testing",
  short:
    "Advanced environmental monitoring, structural integrity assessments and particle dynamic testing, tailored to meet stringent semiconductor manufacturing standards.",
  tests: [
    {
      key: "particles",
      title: "Airborne particle count",
      text: "Measures suspended air particles with calibrated counters to verify the target cleanliness class.",
      tag: "ISO 14644-1",
    },
    {
      key: "velocity",
      title: "Airflow velocity & volume",
      text: "Measures filter face velocities and volumetric flow rates to confirm uniform air distribution and exchange rates.",
      tag: "ISO 14644-3",
    },
    {
      key: "pressure",
      title: "Air pressure differential",
      text: "Verifies positive pressure cascades and their stability across cleanroom boundaries to prevent contaminant ingress.",
      tag: "ISO 14644-3",
    },
    {
      key: "filter",
      title: "Filter integrity (HEPA/ULPA leak test)",
      text: "Uses an upstream aerosol challenge to scan for media bypass, framing and gasket leaks.",
      tag: "ISO 14644-3",
    },
    {
      key: "visual",
      title: "Airflow direction & visualization",
      text: "Maps air currents over critical surfaces with visual tracers to confirm clean, non-turbulent streamlines.",
      tag: "ISO 14644-3",
    },
    {
      key: "climate",
      title: "Temperature & humidity",
      text: "Tracks room climate stability to prevent electrostatic and material risks.",
      tag: "ISO 14644-3",
    },
    {
      key: "recovery",
      title: "Recovery test",
      text: "Benchmarks how quickly the room flushes out a particle spike and returns to baseline cleanliness.",
      tag: "ISO 14644-3",
    },
    {
      key: "leak",
      title: "Containment leak test",
      text: "Checks structural joints and ceiling panels for air leakage that lets ambient particles in.",
      tag: "ISO 14644-3",
    },
  ] as Service[],
};

export const supply = {
  id: "consumables",
  title: "Laboratory Consumables and Equipment",
  short:
    "Supply of high-calibre sterile and depyrogenated consumables, and laboratory testing instruments tailored for pharmaceutical QC environments.",
  items: [
    {
      title: "Supply of consumables",
      text: "Reliable distribution of premium sterile, non-sterile and depyrogenated microbiological consumables. All consumables meet the applicable regulatory requirements.",
    },
    {
      title: "Equipment supply and custom design",
      text: "Sourcing, supply and custom engineering of specialized pharmaceutical QC laboratory instruments, built around your exact requirements.",
    },
  ] as Service[],
};

export const team = [
  {
    name: "Mehul Panchal",
    initials: "MP",
    role: "Principal Consultant",
    years: "16+ years",
    field: "QC microbiology & aseptic processing",
    credential: "Postgraduate, Microbiology",
    expertise: ["Microbial excursions", "Deviations", "APS failures", "OOS results"],
    bio: "Advanced postgraduate credentials in microbiology with over 16 years of core industrial experience in quality control microbiology and aseptic processing techniques. A proven track record managing regulatory audits from the USFDA, EMA and INVIMA, with specialized expertise in resolving microbial excursions, deviations, APS failures and OOS results.",
  },
  {
    name: "Dharmesh Prajapati",
    initials: "DP",
    role: "Consultant, Instrumentation & Equipment Compliance",
    years: "12 years",
    field: "Pharmaceutical equipment engineering",
    credential: "B.E. Instrumentation",
    expertise: ["Hardware qualification", "Automation validation", "Instrument calibration"],
    bio: "A B.E. in Instrumentation with 12 years of specialized engineering experience focused on pharmaceutical industry equipment. Provides expert oversight for hardware qualification, automation validation and instrument calibration alignment, so your critical systems fit modern production requirements.",
  },
];

export const enquiry = {
  sectors: ["Pharmaceutical", "Semiconductor", "Other"],
  services: [
    "GMP technical consulting",
    "Facility & area qualification",
    "Laboratory consumables",
    "Equipment supply",
    "Documentation",
    "Training",
    "Mock audits",
  ],
};
