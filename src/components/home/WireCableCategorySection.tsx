"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

type WireCableCategory = {
  title: string;
  eyebrow: string;
  href: string;
  image: string;
  mobileImage?: string;
};

const wireCableCategories: WireCableCategory[] = [
  {
    title: "House & Building Wires",
    eyebrow: "FR / FRLS / Z+",
    href: "/housing-wiring-electrical-building-wire",
    image: "/homepage-img/catogory-img/house_wiring_930x260.png",
    mobileImage: "/homepage-img/catogory-img/house_wiring_mobile.png",
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
    image: "/homepage-img/catogory-img/aerial-bunched-cables.png",
  },
];

const wireCableClasses = {
  section:
    "wire-cable-category-section relative overflow-hidden bg-[#f5f4f1] px-4 pt-16 text-[#171717] sm:px-6 sm:pt-20 lg:px-10 lg:pt-14",
  inner: "wire-cable-category-inner relative mx-auto max-w-8xl border-b border-black/10 pb-10 sm:pb-14",
  header: "wire-cable-category-header mb-7 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
  eyebrow:
    "wire-cable-category-eyebrow font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#2486FE] sm:text-[11px] sm:tracking-[0.28em]",
  title:
    "wire-cable-category-title font-display mt-3 max-w-2xl text-3xl font-black leading-[1.08] tracking-normal text-[#171717] sm:text-5xl lg:text-[3.1rem]",
  cta:
    "wire-cable-category-cta font-mono group inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[#2486FE] px-4 py-3 text-[11px] font-black uppercase tracking-[0.1em] !text-white shadow-lg shadow-[#2486FE]/20 transition hover:-translate-y-0.5 hover:bg-[#0B6FE8] sm:px-5 sm:text-xs sm:tracking-[0.16em]",
  ctaIcon: "wire-cable-category-cta-icon transition-transform duration-300 group-hover:translate-x-1",
  grid: "wire-cable-category-grid grid gap-4 sm:gap-5 lg:grid-cols-6",
  card:
    "wire-cable-category-card group relative min-h-[220px] overflow-hidden rounded-[8px] bg-white shadow-xl shadow-black/5 sm:min-h-[260px]",
  image: "wire-cable-category-image absolute inset-0 h-full w-full object-cover",
  overlay: "wire-cable-category-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent",
  body: "wire-cable-category-body absolute inset-x-0 bottom-0 p-4 text-white sm:p-5",
  cardEyebrow:
    "wire-cable-category-card-eyebrow font-mono text-[10px] font-black uppercase tracking-[0.14em] text-white/75 sm:text-[11px] sm:tracking-[0.18em]",
  cardTitle: "wire-cable-category-card-title font-display mt-2 text-xl font-black leading-tight sm:text-2xl",
};

function useWireCategoryInView(threshold = 0.12) {
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

export function WireCableCategorySection() {
  const { ref, inView } = useWireCategoryInView();

  return (
    <section
      id="products"
      ref={ref}
      className={`${wireCableClasses.section} wire-category-reveal transition-all duration-1000 ease-out will-change-transform ${
        inView
          ? "wire-category-reveal-visible translate-y-0 opacity-100"
          : "wire-category-reveal-hidden translate-y-14 opacity-0"
      }`}
      style={{ transitionDelay: inView ? "0ms" : "0ms" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        #products, .switch-accessory-category-section, .conductor-category-section { font-family: 'Inter', system-ui, sans-serif; }
        #products .font-display, .switch-accessory-category-section .font-display, .conductor-category-section .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        #products .font-mono, .switch-accessory-category-section .font-mono, .conductor-category-section .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <div className={wireCableClasses.inner}>
        <div className={wireCableClasses.header}>
          <div>
            <p className={wireCableClasses.eyebrow}>Wire & Cables</p>
            <h2 className={wireCableClasses.title}>Wire and cable range.</h2>
          </div>

          <a href="/wire-and-cable" className={wireCableClasses.cta}>
            View Wire Range
            <FaArrowRight aria-hidden="true" size={14} className={wireCableClasses.ctaIcon} />
          </a>
        </div>

        <div className={wireCableClasses.grid}>
          {wireCableCategories.map((category, index) => {
            const cardLayout = index === 0 ? "lg:col-span-4" : "lg:col-span-2";

            return (
              <a key={category.href} href={category.href} className={`${wireCableClasses.card} ${cardLayout}`}>
                <picture>
                  {category.mobileImage ? <source media="(max-width: 639px)" srcSet={category.mobileImage} /> : null}
                  <img src={category.image} alt={category.title} loading="lazy" className={wireCableClasses.image} />
                </picture>
                <div className={wireCableClasses.overlay} />
                <div className={wireCableClasses.body}>
                  <p className={wireCableClasses.cardEyebrow}>{category.eyebrow}</p>
                  <h3 className={wireCableClasses.cardTitle}>{category.title}</h3>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
