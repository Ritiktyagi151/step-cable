export const pageRegistry = {
  product: [
    "ab-cable",
    "about-step-cables",
    "advantages-of-insulated-power-cable",
    "conductor",
    "al-conductor",
    "all-alloy-aluminum-conductor-steel-reinforced-aluminum-wires",
    "all-alloy-aluminum-conductor-steel-reinforced",
    "all-alloy-aluminum-conductor",
    "all-aluminum-conductor",
    "aluminum-conductor-alloy-reinforced",
    "aluminum-conductor-steel-reinforced",
    "armoured-cable",
    "drum-handling-practices",
    "electrical-building-wire",
    "electrical-switch",
    "electrical-tapes",
    "elevator-escalator-cable",
    "fireproof-wire",
    "frls-wires",
    "house-wire",
    "housing-wiring-electrical-building-wire",
    "mcb",
    "modular-plates",
    "modular-switch-board",
    "modular-switches",
    "multicore-wire-and-cable",
    "pvc-insulated-power-control-cable",
    "single-core-multicore-industrial-cables",
    "step-cadillac",
    "step-lincoln",
    "submersible-wire",
    "switch-plates",
    "three-core-pvc-insulated-flat-cable",
    "three-core-xlpe-insulated-flat-cable",
    "wire-and-cable",
    "xlpe-insulated-power-control-cable",
  ],
  conductor: [
    "conductor",
  ],
  about: [
    "about-step-cables",
    "about-step-industry",
    "core-values",
    "csr-activity",
    "our-leadership",
    "philosophy",
    "vision-misiion",
  ],
  epc: [
    "about-epc-business",
    "design-engineering-capabilities",
    "project-monitoring",
    "quality-assurance-system",
    "safety-management-pratice",
  ],
  company: [
    "certification",
    "iso-certification",
    "manufacturing-plant",
    "manufacturing-plant-2",
  ],
  clients: [
    "clients",
    "clients1",
    "clients2",
  ],
  career: [
    "application-form",
    "current-openings",
    "hr-philosophy",
  ],
  policy: [
    "privacy-policy",
    "return-policy",
    "terms-and-conditions",
  ],
  sitemap: [
    "sitemap",
  ],
} as const;

export type PageGroup = keyof typeof pageRegistry;

const pageGroupSets = Object.fromEntries(
  Object.entries(pageRegistry).map(([group, slugs]) => [group, new Set<string>(slugs)])
) as Record<PageGroup, Set<string>>;

export function getPageGroup(slug: string): PageGroup | "home" | "contact" | "standard" {
  if (slug === "") return "home";
  if (slug === "contact") return "contact";
  if (slug === "conductor") return "conductor";
  if (slug === "about-step-cables") return "product";

  for (const group of Object.keys(pageGroupSets) as PageGroup[]) {
    if (pageGroupSets[group].has(slug)) return group;
  }

  return "standard";
}
