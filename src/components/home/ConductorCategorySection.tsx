import { PremiumProductGallerySection, type GalleryCategory } from "./PremiumProductGallerySection";

const conductorCategories: GalleryCategory[] = [
  {
    title: "AAC Conductors",
    eyebrow: "All Aluminium",
    href: "/all-aluminum-conductor",
    image: "/assets/img/conductor.jpg",
  },
  {
    title: "AAAC Conductors",
    eyebrow: "Aluminium Alloy",
    href: "/all-alloy-aluminum-conductor",
    image: "/assets/img/al-conductor.jpg",
  },
  {
    title: "ACSR Conductors",
    eyebrow: "Steel Reinforced",
    href: "/aluminum-conductor-steel-reinforced",
    image: "/assets/img/conductor-acsr.jpg",
  },
  {
    title: "ACAR Conductors",
    eyebrow: "Alloy Reinforced",
    href: "/aluminum-conductor-alloy-reinforced",
    image: "/assets/img/conductor-acar.jpg",
  },
  {
    title: "AACSR Conductors",
    eyebrow: "Alloy Steel Reinforced",
    href: "/all-alloy-aluminum-conductor-steel-reinforced",
    image: "/assets/img/conductor-aacsr.jpg",
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
