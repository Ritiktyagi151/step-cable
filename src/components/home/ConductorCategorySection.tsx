"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

type ConductorCategory = {
  title: string;
  eyebrow: string;
  href: string;
  image: string;
};

const conductorCategories: ConductorCategory[] = [
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

const conductorClasses = {
  section:
    "conductor-category-section relative overflow-hidden bg-[#f5f4f1] px-4 py-14 text-[#171717] sm:px-6 lg:px-10",
  inner: "conductor-category-inner relative mx-auto max-w-8xl",
  header: "conductor-category-header mb-7 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
  eyebrow: "conductor-category-eyebrow font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#2486FE] sm:text-[11px] sm:tracking-[0.28em]",
  title: "conductor-category-title font-display mt-3 max-w-2xl text-3xl font-black leading-[1.08] tracking-normal text-[#171717] sm:text-5xl lg:text-[3.1rem]",
  cta: "conductor-category-cta font-mono group inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[#2486FE] px-4 py-3 text-[11px] font-black uppercase tracking-[0.1em] !text-white shadow-lg shadow-[#2486FE]/20 transition hover:-translate-y-0.5 hover:bg-[#0B6FE8] sm:px-5 sm:text-xs sm:tracking-[0.16em]",
  ctaIcon: "transition-transform duration-300 group-hover:translate-x-1",
  grid:
    "conductor-category-grid -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4",
  card:
    "conductor-category-card group w-[76vw] max-w-[285px] shrink-0 snap-start overflow-hidden rounded-[8px] bg-white shadow-xl shadow-black/5 sm:w-auto sm:max-w-none sm:shrink sm:snap-none",
  media: "conductor-category-media aspect-[4/3] overflow-hidden bg-slate-100",
  image: "conductor-category-image h-full w-full object-fill",
  body: "conductor-category-body p-4",
  cardEyebrow: "conductor-category-card-eyebrow font-mono text-[10px] font-black uppercase tracking-[0.12em] text-[#2486FE] sm:tracking-[0.16em]",
  cardTitle: "conductor-category-card-title font-display mt-2 text-lg font-black leading-tight text-[#171717]",
};

function useConductorCategoryInView(threshold = 0.12) {
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

export function ConductorCategorySection() {
  const { ref, inView } = useConductorCategoryInView();
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    if (!slider) return;

    let intervalId: number | undefined;

    const scrollNext = () => {
      const firstCard = slider.querySelector<HTMLElement>(".conductor-category-card");
      const step = firstCard ? firstCard.offsetWidth + 16 : slider.clientWidth;
      const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 8;

      slider.scrollTo({
        left: atEnd ? 0 : slider.scrollLeft + step,
        behavior: "smooth",
      });
    };

    const stopAutoScroll = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const startAutoScroll = () => {
      stopAutoScroll();

      if (!mobileQuery.matches) {
        slider.scrollTo({ left: 0 });
        return;
      }

      intervalId = window.setInterval(scrollNext, 2600);
    };

    startAutoScroll();
    mobileQuery.addEventListener("change", startAutoScroll);

    return () => {
      stopAutoScroll();
      mobileQuery.removeEventListener("change", startAutoScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`${conductorClasses.section} conductor-category-reveal transition-all duration-1000 ease-out will-change-transform ${
        inView
          ? "conductor-category-reveal-visible translate-y-0 opacity-100"
          : "conductor-category-reveal-hidden translate-y-14 opacity-0"
      }`}
      style={{ transitionDelay: inView ? "240ms" : "0ms" }}
    >
      <div className={conductorClasses.inner}>
        <div className={conductorClasses.header}>
          <div>
            <p className={conductorClasses.eyebrow}>Conductors</p>
            <h2 className={conductorClasses.title}>Conductor range.</h2>
          </div>

          <a href="/conductor" className={conductorClasses.cta}>
            View Conductors
            <FaArrowRight aria-hidden="true" size={14} className={conductorClasses.ctaIcon} />
          </a>
        </div>

        <div ref={sliderRef} className={conductorClasses.grid}>
          {conductorCategories.map((category) => (
            <a key={category.href} href={category.href} className={conductorClasses.card}>
              <div className={conductorClasses.media}>
                <img src={category.image} alt={category.title} loading="lazy" className={conductorClasses.image} />
              </div>
              <div className={conductorClasses.body}>
                <p className={conductorClasses.cardEyebrow}>{category.eyebrow}</p>
                <h3 className={conductorClasses.cardTitle}>{category.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
