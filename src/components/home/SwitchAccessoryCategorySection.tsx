import { PremiumProductGallerySection, type GalleryCategory } from "./PremiumProductGallerySection";

const switchAccessoryCategories: GalleryCategory[] = [
  {
    title: "Modular Switches",
    eyebrow: "Switch Range",
    href: "/modular-switches",
    image: "/homepage-img/switchs-banner/modularswitches.png",
  },
  {
    title: "STEP Lincoln",
    eyebrow: "Premium Modular",
    href: "/step-lincoln",
    image: "/homepage-img/switchs-banner/modular-switches.png",
  },
  {
    title: "STEP Cadillac",
    eyebrow: "Switches & Plates",
    href: "/step-cadillac",
    image: "/homepage-img/switchs-banner/switches-plates.png",
  },
  {
    title: "MCB & Switchgear",
    eyebrow: "Protection",
    href: "/mcb",
    image: "/homepage-img/switchs-banner/mcb-switchgear.png",
  },
  // {
  //   title: "Switch Plates",
  //   eyebrow: "Accessories",
  //   href: "/switch-plates",
  //   image: "/images/seo-page-img/switch-plates.jpg",
  // },
];

export function SwitchAccessoryCategorySection() {
  return (
    <PremiumProductGallerySection
      eyebrow="Switches & Accessories"
      title="Switches and accessories."
      href="/modular-switches"
      cta="View Switch Range"
      categories={switchAccessoryCategories}
      layout="featured"
    />
  );
}
