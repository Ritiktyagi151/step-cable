"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

type SwitchAccessoryCategory = {
  title: string;
  eyebrow: string;
  href: string;
  image: string;
};

const switchAccessoryCategories: SwitchAccessoryCategory[] = [
  {
    title: "Modular Switches",
    eyebrow: "Switch Range",
    href: "/modular-switches",
    image: "/homepage-img/switchs-banner/modularswitches.webp",
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
    image: "/homepage-img/switchs-banner/switches-plates.webp",
  },
  {
    title: "MCB & Switchgear",
    eyebrow: "Protection",
    href: "/mcb",
    image: "/homepage-img/switchs-banner/mcb-switchgear.webp",
  },
  // {
  //   title: "Switch Plates",
  //   eyebrow: "Accessories",
  //   href: "/switch-plates",
  //   image: "/images/seo-page-img/switch-plates.jpg",
  // },
];

const switchAccessoryClasses = {
  section:
    "switch-accessory-category-section relative overflow-hidden bg-[#f5f4f1] px-4 pt-14 text-[#171717] sm:px-6 lg:px-10",
  inner: "switch-accessory-category-inner relative mx-auto max-w-8xl border-b border-black/10 pb-10 sm:pb-14",
  header: "switch-accessory-category-header mb-7 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
  eyebrow:
    "switch-accessory-category-eyebrow font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#2486FE] sm:text-[11px] sm:tracking-[0.28em]",
  title:
    "switch-accessory-category-title font-display mt-3 max-w-2xl text-3xl font-black leading-[1.08] tracking-normal text-[#171717] sm:text-5xl lg:text-[3.1rem]",
  cta:
    "switch-accessory-category-cta font-mono group inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[#2486FE] px-4 py-3 text-[11px] font-black uppercase tracking-[0.1em] !text-white shadow-lg shadow-[#2486FE]/20 transition hover:-translate-y-0.5 hover:bg-[#0B6FE8] sm:px-5 sm:text-xs sm:tracking-[0.16em]",
  ctaIcon: "switch-accessory-category-cta-icon transition-transform duration-300 group-hover:translate-x-1",
  grid: "switch-accessory-category-grid grid gap-4 sm:gap-5 lg:grid-cols-[1.15fr_0.85fr]",
  featuredCard:
    "switch-accessory-featured-card group relative min-h-[300px] overflow-hidden rounded-[8px] bg-white shadow-xl shadow-black/5 sm:min-h-[420px]",
  featuredImage: "switch-accessory-featured-image absolute inset-0 h-full w-full object-cover",
  featuredOverlay:
    "switch-accessory-featured-overlay absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent",
  featuredBody: "switch-accessory-featured-body absolute inset-x-0 bottom-0 p-4 text-white sm:p-6",
  featuredEyebrow:
    "switch-accessory-featured-eyebrow font-mono text-[10px] font-black uppercase tracking-[0.14em] text-white/75 sm:text-[11px] sm:tracking-[0.18em]",
  featuredTitle: "switch-accessory-featured-title font-display mt-2 text-2xl font-black leading-tight sm:text-3xl",
  itemGrid: "switch-accessory-item-grid grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-1",
  itemCard:
    "switch-accessory-item-card group grid overflow-hidden rounded-[8px] bg-white shadow-xl shadow-black/5 sm:min-h-[150px] sm:grid-cols-[0.9fr_1.1fr]",
  itemImage: "switch-accessory-item-image h-44 w-full object-cover sm:h-full sm:min-h-[150px]",
  itemBody: "switch-accessory-item-body flex flex-col justify-end p-4 sm:p-5",
  itemEyebrow:
    "switch-accessory-item-eyebrow font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#2486FE] sm:text-[11px] sm:tracking-[0.16em]",
  itemTitle: "switch-accessory-item-title font-display mt-2 text-lg font-black leading-tight text-[#171717] sm:text-xl",
};

function useSwitchCategoryInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -10% 0px", threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function SwitchAccessoryCategorySection() {
  const [featured, ...items] = switchAccessoryCategories;
  const { ref, inView } = useSwitchCategoryInView();

  return (
    <section
      ref={ref}
      className={`${switchAccessoryClasses.section} switch-category-reveal transition-all duration-1000 ease-out will-change-transform ${
        inView
          ? "switch-category-reveal-visible translate-y-0 opacity-100"
          : "switch-category-reveal-hidden translate-y-14 opacity-0"
      }`}
      style={{ transitionDelay: inView ? "120ms" : "0ms" }}
    >
      <div className={switchAccessoryClasses.inner}>
        <div className={switchAccessoryClasses.header}>
          <div>
            <p className={switchAccessoryClasses.eyebrow}>Switches & Accessories</p>
            <h2 className={switchAccessoryClasses.title}>Switches and accessories.</h2>
          </div>

          <a href="/modular-switches" className={switchAccessoryClasses.cta}>
            View Switch Range
            <FaArrowRight aria-hidden="true" size={14} className={switchAccessoryClasses.ctaIcon} />
          </a>
        </div>

        <div className={switchAccessoryClasses.grid}>
          <a href={featured.href} className={switchAccessoryClasses.featuredCard}>
            <img src={featured.image} alt={featured.title} loading="lazy" className={switchAccessoryClasses.featuredImage} />
            <div className={switchAccessoryClasses.featuredOverlay} />
            <div className={switchAccessoryClasses.featuredBody}>
              <p className={switchAccessoryClasses.featuredEyebrow}>{featured.eyebrow}</p>
              <h3 className={switchAccessoryClasses.featuredTitle}>{featured.title}</h3>
            </div>
          </a>

          <div className={switchAccessoryClasses.itemGrid}>
            {items.map((category) => (
              <a key={category.href} href={category.href} className={switchAccessoryClasses.itemCard}>
                <img src={category.image} alt={category.title} loading="lazy" className={switchAccessoryClasses.itemImage} />
                <div className={switchAccessoryClasses.itemBody}>
                  <p className={switchAccessoryClasses.itemEyebrow}>{category.eyebrow}</p>
                  <h3 className={switchAccessoryClasses.itemTitle}>{category.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
