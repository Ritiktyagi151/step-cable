import { PremiumProductGallerySection, type GalleryCategory } from "./PremiumProductGallerySection";

const conductorCategories: GalleryCategory[] = [
  {
    title: "AAC Conductors",
    eyebrow: "All Aluminium",
    href: "/all-aluminum-conductor",
    image: "/new-product-img/conductor/aac.png",
  },
  {
    title: "AAAC Conductors",
    eyebrow: "Aluminium Alloy",
    href: "/all-alloy-aluminum-conductor",
    image: "/new-product-img/conductor/aaac.png",
  },
  {
    title: "ACSR Conductors",
    eyebrow: "Steel Reinforced",
    href: "/aluminum-conductor-steel-reinforced",
    image: "/new-product-img/conductor/acsr.png",
  },
  {
    title: "ACAR Conductors",
    eyebrow: "Alloy Reinforced",
    href: "/aluminum-conductor-alloy-reinforced",
    image: "/new-product-img/conductor/acar.png",
  },
  {
    title: "AACSR Conductors",
    eyebrow: "Alloy Steel Reinforced",
    href: "/all-alloy-aluminum-conductor-steel-reinforced",
    image: "/new-product-img/conductor/aacsr.png",
  },
  {
    title: "AL-59 Conductors",
    eyebrow: "Aluminium Alloy",
    href: "/al-conductor",
    image: "/new-product-img/conductor/al-59.png",
  },
  {
    title: "AACSR/AW Conductors",
    eyebrow: "Reinforced Aluminium",
    href: "/all-alloy-aluminum-conductor-steel-reinforced-aluminum-wires",
    image: "/new-product-img/conductor/aacsr-aw.png",
  },
  {
    title: "Drum Handling",
    eyebrow: "Handling Guide",
    href: "/drum-handling-practices",
    image: "/new-product-img/conductor/dru-handling.png",
  },
];

export function ConductorCategorySection() {
  return (
    <PremiumProductGallerySection
      eyebrow="Conductors"
      title="Conductor range."
      href="/conductor"
      cta="View Conductors"
      categories={conductorCategories}
      layout="compact"
      showDivider={false}
    />
  );
}
