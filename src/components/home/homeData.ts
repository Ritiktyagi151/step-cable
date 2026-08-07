export const homeStats = [
  ["30+", "Years of group experience"],
  ["100", "Phone lines for quick enquiry"],
  ["Pan India", "Supply and project support"]
] as const;

export const homeNumbersSpeak = [
  ["30+", "Years Experience", "experience"],
  ["900+", "Dealer Network", "network"],
  ["85K+", "Retail Touchpoints", "retail"],
  ["7", "Manufacturing Units", "units"]
] as const;

export const homeProducts = [
  ["House Wiring", "Fire-safe building wires for residential and commercial electrical networks.", "/housing-wiring-electrical-building-wire"],
  ["Industrial Cables", "Single-core and multicore cables for machinery, panels and industrial power use.", "/single-core-multicore-industrial-cables"],
  ["Power & Control", "PVC and XLPE insulated cables for dependable distribution and control circuits.", "/pvc-insulated-power-control-cable"],
  ["Conductors", "AAC, AAAC, ACSR, ACAR and AL-59 conductors for transmission and distribution.", "/all-aluminum-conductor"]
] as const;

export const retailCategories = [
  {
    title: "Home & Apartment Wiring",
    description: "FR, FRLS and building wires for electricians, home owners and retail counters.",
    href: "/housing-wiring-electrical-building-wire",
    image: "/wiresforhome/Fire-Retardant-House-Wires.JPG",
    tag: "Home safety",
  },
  {
    title: "Pump & Submersible Cable",
    description: "PVC and XLPE flat cables for pumps, farms, buildings and water systems.",
    href: "/three-core-pvc-insulated-flat-cable",
    image: "/wiresforhome/Best-Strong-Submersible-Cable-For-Pump.JPG",
    tag: "Fast moving",
  },
  {
    title: "Shop, Panel & Industrial Cable",
    description: "Single-core, multicore, power and control cable options for daily projects.",
    href: "/single-core-multicore-industrial-cables",
    image: "/assets/img/cable.jpg",
    tag: "Project ready",
  },
  {
    title: "Retail Electrical Essentials",
    description: "Modular switches, MCBs, plates, tapes and everyday electrical products.",
    href: "/modular-switches",
    image: "/images/seo-page-img/modular-switch-board.jpg",
    tag: "Counter demand",
  },
] as const;

export const retailSupportSteps = [
  ["Find the right product", "Browse by application, cable type or retail product category."],
  ["Connect with Step", "Send an enquiry for dealer support, availability or technical help."],
  ["Buy with confidence", "Get genuine Step products backed by a large retail and dealer network."],
] as const;

export const homeProcess = [
  "Application-led cable selection for homes, factories, utilities and EPC projects.",
  "Quality checks aligned with relevant Indian standards and project requirements.",
  "Manufacturing and dispatch coordination focused on consistency, traceability and timely delivery.",
  "Technical support for conductor, wiring, flat cable and power cable requirements."
] as const;

export const homeIndustries = ["Residential", "Industrial", "Infrastructure", "Utilities", "Commercial", "EPC Projects"] as const;

export const homeIndustryApplications = [
  "Crane",
  "Oil & Offshore",
  "Structural",
  "Fishing",
  "Elevator",
  "General Engineering",
  "Aerial Transportation",
  "Mining",
  "Conveyor Cord",
  "Forestry"
] as const;

export const homeAdvantage = [
  {
    id: "purity",
    title: "99.97% Electrolytic Grade Copper",
    short: "Maximum Conductivity & Low Resistance",
    description: "Manufactured using 99.97% pure oxygen-free copper rods to deliver superior conductivity, minimize power loss, and withstand thermal overloads.",
    stat: "99.97%",
    statLabel: "Copper Purity",
  },
  {
    id: "extrusion",
    title: "Precision Insulation & Sheathing",
    short: "High Dielectric Strength & FRLS Options",
    description: "Dual-layer extrusion technology ensures consistent wall thickness, high insulation resistance, and flame-retardant (FRLS / ZHFR) properties.",
    stat: "100%",
    statLabel: "Cavity-Free Dielectric",
  },
  {
    id: "customization",
    title: "Custom EPC Specifications",
    short: "Tailored Armor, Sheath & Drum Lengths",
    description: "Specialized cable armoring (GS wire/strip), custom color-coded sheaths, and customized drum lengths engineered for project requirements.",
    stat: "Custom",
    statLabel: "Armoring & Lengths",
  },
  {
    id: "traceability",
    title: "Pan-India Logistics & Traceability",
    short: "Batch Testing & Direct Factory Dispatch",
    description: "Every shipment is dispatched with batch-wise Test Certificates (TC), drum sealing, and direct site delivery across India.",
    stat: "Pan-India",
    statLabel: "Site Logistics",
  },
] as const;

export const homeCertifications = [
  {
    code: "IS 694",
    title: "PVC Insulated Building Wires & Cables",
    category: "Indian Standard",
    description: "Covers single-core and multicore flexible & rigid copper cables up to 1100V for residential, commercial and panel wiring.",
  },
  {
    code: "IS 7098 (Part 1)",
    title: "XLPE Insulated Heavy Duty Power Cables",
    category: "Indian Standard",
    description: "Cross-linked polyethylene insulated cables for working voltages up to and including 1100V with high thermal rating.",
  },
  {
    code: "IS 1554 (Part 1)",
    title: "PVC Insulated Heavy Duty Electrical Cables",
    category: "Indian Standard",
    description: "Heavy-duty PVC power and control cables for distribution networks, industrial wiring and underground installation.",
  },
  {
    code: "IS 398",
    title: "Aluminum Conductors (AAC, AAAC, ACSR)",
    category: "Indian Standard",
    description: "Bare aluminum conductors for overhead transmission and distribution lines engineered for mechanical strength.",
  },
  {
    code: "ISO 9001:2015",
    title: "Quality Management System",
    category: "International Standard",
    description: "Certified manufacturing facilities ensuring stringent quality assurance, continuous improvement and process control.",
  },
  {
    code: "FRLS / ZHFR",
    title: "Flame Retardant Low Smoke Testing",
    category: "Safety Performance",
    description: "Extensive lab testing for oxygen index, temperature index, acid gas generation, and light transmission under fire conditions.",
  },
] as const;

export const homeWorkflow = [
  {
    step: "01",
    title: "Technical Consultation & Cable Sizing",
    description: "Our engineering support team evaluates project voltage ratings, current capacity, ambient conditions, and cable route factors to recommend optimal specs.",
    deliverable: "Cable Specification & Datasheet",
  },
  {
    step: "02",
    title: "Custom Manufacturing & Armoring",
    description: "Production of conductor cores, high-precision insulation, armoring (GS wire/strip), and outer sheathing strictly adhering to IS/IEC standards.",
    deliverable: "Quality-Controlled Production Batch",
  },
  {
    step: "03",
    title: "Factory Acceptance Testing (FAT)",
    description: "Rigorous high-voltage testing, conductor resistance measurement, insulation resistance testing, and dimensional inspection with optional client witnessing.",
    deliverable: "Certified Test Report (TC)",
  },
  {
    step: "04",
    title: "Protective Packaging & Site Dispatch",
    description: "Heavy-duty wooden or steel drum winding, moisture-proof capping, drum sealing, and scheduled freight transport directly to project sites across India.",
    deliverable: "On-Time Site Delivery",
  },
] as const;

export const homeAdvantageImages = {
  sectionBg: "", // optional full section background
  spotlightBg: "/assets/img/Step-Cables-Manufacturing-Plant-LR.jpg", // spotlight card bg
} as const;

export const homeCertificationsImages = {
  sectionBg: "", // optional section bg
  labBg: "/assets/img/Safety-Management-Practice.jpg", // lab testing block bg
} as const;

export const homeWorkflowImages = {
  sectionBg: "", // optional section bg
  ctaBg: "/assets/img/Project-Monitoring-Step-Industries.jpg", // bottom RFQ card bg
} as const;

export const homeConnectSection = {
  title: "Connect to what's possible.",
  subtitle: "Step Cables' complete electrical and power solutions bring your project infrastructure into alignment – from domestic wiring to heavy industrial transmission.",
  videoUrl: "/assets/video/wire.webm",
  primaryBtnText: "Talk to an expert",
  primaryBtnHref: "/contact",
  secondaryBtnText: "Explore by industry",
  secondaryBtnHref: "#applications",
} as const;
