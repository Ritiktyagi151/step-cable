const baseRedirectRules = [
  { source: "/index.html", destination: "/", permanent: true },

  { source: "/about-step-industry.html", destination: "/about-step-industry", permanent: true },
  { source: "/our-leadership.html", destination: "/our-leadership", permanent: true },
  { source: "/vision-misiion.html", destination: "/vision-misiion", permanent: true },
  { source: "/philosophy.html", destination: "/philosophy", permanent: true },
  { source: "/csr-activity.html", destination: "/csr-activity", permanent: true },
  { source: "/about-epc-business.html", destination: "/about-epc-business", permanent: true },
  { source: "/design-engineering-capabilities.html", destination: "/design-engineering-capabilities", permanent: true },
  { source: "/quality-assurance-system.html", destination: "/quality-assurance-system", permanent: true },
  { source: "/safety-management-pratice.html", destination: "/safety-management-pratice", permanent: true },
  { source: "/project-monitoring.html", destination: "/project-monitoring", permanent: true },
  { source: "/about-step-cables.html", destination: "/about-step-cables", permanent: true },
  { source: "/housing-wiring-electrical-building-wire.html", destination: "/housing-wiring-electrical-building-wire", permanent: true },
  { source: "/electrical-building-wire.html", destination: "/electrical-building-wire", permanent: true },
  { source: "/single-core-multicore-industrial-cables.html", destination: "/single-core-multicore-industrial-cables", permanent: true },
  { source: "/three-core-pvc-insulated-flat-cable.html", destination: "/three-core-pvc-insulated-flat-cable", permanent: true },
  { source: "/three-core-xlpe-insulated-flat-cable.html", destination: "/three-core-xlpe-insulated-flat-cable", permanent: true },
  { source: "/elevator-escalator-cable.html", destination: "/elevator-escalator-cable", permanent: true },
  { source: "/pvc-insulated-power-control-cable.html", destination: "/pvc-insulated-power-control-cable", permanent: true },
  { source: "/xlpe-insulated-power-control-cable.html", destination: "/xlpe-insulated-power-control-cable", permanent: true },
  { source: "/advantages-of-insulated-power-cable.html", destination: "/advantages-of-insulated-power-cable", permanent: true },
  { source: "/ab-cable.html", destination: "/ab-cable", permanent: true },
  { source: "/all-aluminum-conductor.html", destination: "/all-aluminum-conductor", permanent: true },
  { source: "/all-alloy-aluminum-conductor.html", destination: "/all-alloy-aluminum-conductor", permanent: true },
  { source: "/aluminum-conductor-steel-reinforced.html", destination: "/aluminum-conductor-steel-reinforced", permanent: true },
  { source: "/aluminum-conductor-alloy-reinforced.html", destination: "/aluminum-conductor-alloy-reinforced", permanent: true },
  { source: "/all-alloy-aluminum-conductor-steel-reinforced.html", destination: "/all-alloy-aluminum-conductor-steel-reinforced", permanent: true },
  { source: "/al-conductor.html", destination: "/al-conductor", permanent: true },
  { source: "/drum-handling-practices.html", destination: "/drum-handling-practices", permanent: true },
  { source: "/all-alloy-aluminum-conductor-steel-reinforced-aluminum-wires.html", destination: "/all-alloy-aluminum-conductor-steel-reinforced-aluminum-wires", permanent: true },
  { source: "/certification.html", destination: "/certification", permanent: true },
  { source: "/clients1.html", destination: "/clients1", permanent: true },
  { source: "/manufacturing-plant.html", destination: "/manufacturing-plant", permanent: true },
  { source: "/hr-philosophy.html", destination: "/hr-philosophy", permanent: true },
  { source: "/current-openings.html", destination: "/current-openings", permanent: true },
  { source: "/application-form.html", destination: "/application-form", permanent: true },
  { source: "/contact.html", destination: "/contact", permanent: true },
  { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
  { source: "/return-policy.html", destination: "/return-policy", permanent: true },
  { source: "/terms-and-conditions.html", destination: "/terms-and-conditions", permanent: true },
  { source: "/house-wire.html", destination: "/house-wire", permanent: true },
  { source: "/submersible-wire.html", destination: "/submersible-wire", permanent: true },
  { source: "/armoured-cable.html", destination: "/armoured-cable", permanent: true },
  { source: "/wire-and-cable.html", destination: "/wire-and-cable", permanent: true },
  { source: "/fireproof-wire.html", destination: "/fireproof-wire", permanent: true },
  { source: "/frls-wires.html", destination: "/frls-wires", permanent: true },
  { source: "/multicore-wire-and-cable.html", destination: "/multicore-wire-and-cable", permanent: true },
  { source: "/modular-switches.html", destination: "/modular-switches", permanent: true },
  { source: "/mcb.html", destination: "/mcb", permanent: true },
  { source: "/switch-plates.html", destination: "/switch-plates", permanent: true },
  { source: "/modular-switch-board.html", destination: "/modular-switch-board", permanent: true },
  { source: "/electrical-tapes.html", destination: "/electrical-tapes", permanent: true },
  { source: "/electrical-switch.html", destination: "/electrical-switch", permanent: true },
  { source: "/modular-plates.html", destination: "/modular-plates", permanent: true },

  { source: "/blog/category/blog", destination: "/blog", permanent: true },
  { source: "/blog/category/step-cable", destination: "/blog", permanent: true },
  { source: "/blog/author/admin", destination: "/blog", permanent: true },
  { source: "/blog/tag/electrical-switch-manufacturers-near-me", destination: "/blog", permanent: true },
  { source: "/blog/tag/wire-and-cable-manufacturers", destination: "/blog", permanent: true },
  { source: "/blog/tag/best-house-wire-for-your-home", destination: "/blog", permanent: true },
  { source: "/blog/tag/fire-proof-wire-manufacturers", destination: "/blog", permanent: true },
  { source: "/blog/tag/multicore-wire-and-cable", destination: "/blog", permanent: true },
  { source: "/blog/tag/best-wire-manufacturers-in-india", destination: "/blog", permanent: true },
  { source: "/blog/tag/submersible-wire", destination: "/blog", permanent: true },
  { source: "/blog/tag/best-quality-wires-and-cables", destination: "/blog", permanent: true },
  { source: "/blog/tag/modular-switch-board-manufacturers", destination: "/blog", permanent: true },
  { source: "/blog/tag/step-cables", destination: "/blog", permanent: true },
];

const redirectRules = baseRedirectRules.flatMap((rule) => {
  if (rule.source === "/" || rule.source.endsWith(".html") || rule.source.endsWith("/")) return [rule];
  return [rule, { ...rule, source: `${rule.source}/` }];
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return redirectRules;
  }
};

export default nextConfig;
