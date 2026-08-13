import { PremiumProductGallerySection, type GalleryCategory } from "./PremiumProductGallerySection";

const wireCableCategories: GalleryCategory[] = [
  {
    title: "House & Building Wires",
    eyebrow: "FR / FRLS / Z+",
    href: "/housing-wiring-electrical-building-wire",
    image: "/homepage-img/catogory-img/house-wire.png",
  },
  {
    title: "Industrial Cables",
    eyebrow: "Single & Multicore",
    href: "/single-core-multicore-industrial-cables",
    image: "/homepage-img/catogory-img/industrial-cable.png",
  },
  {
    title: "Flat Submersible Cables",
    eyebrow: "Pump Cables",
    href: "/three-core-pvc-insulated-flat-cable",
    image: "/homepage-img/catogory-img/flat-submersible-cables.png",
  },
  {
    title: "Power & Control Cables",
    eyebrow: "PVC / XLPE",
    href: "/pvc-insulated-power-control-cable",
    image: "/homepage-img/catogory-img/power-control-cables.png",
  },
  {
    title: "Aerial Bunched Cables",
    eyebrow: "ABC / XLPE",
    href: "/ab-cable",
    image: "/assets/img/cable-wires.jpg",
  },
];

export function WireCableCategorySection() {
  return (
    <PremiumProductGallerySection
      eyebrow="Wire & Cables"
      title="Wire and cable range."
      href="/wire-and-cable"
      cta="View Wire Range"
      categories={wireCableCategories}
    />
  );
}
