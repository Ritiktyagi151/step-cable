"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaBolt, FaBoxesStacked, FaCertificate } from "react-icons/fa6";

const aboutImage = "/homepage-img/company.png";
const qualityImage = "/assets/img/fwdfinalplantimages/Wires-Cables-Quality-Control.jpg";

const highlights = [
  ["30+", "Years"],
  ["900+", "Dealers"],
  ["85K+", "Retailers"],
] as const;

const process = [
  [FaBoxesStacked, "Product Range"],
  [FaCertificate, "Quality Checks"],
  [FaBolt, "Supply"],
] as const;

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function PremiumAboutSection() {
  const { ref: leftRef, inView: leftInView } = useInView<HTMLDivElement>(0.25);
  const { ref: rightRef, inView: rightInView } = useInView<HTMLDivElement>(0.15);

  const leftBoxClass =
    "relative border-l-4 border-[#0877ff] pl-5 transition-all duration-1000 ease-out sm:pl-7 " +
    (leftInView ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0");

  const ctaClass =
    "mt-8 inline-flex items-center gap-2 rounded-full bg-[#0877ff] px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-blue-500/20 transition-all duration-700 ease-out hover:-translate-y-0.5 hover:bg-[#005fd0] " +
    (leftInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0");

  const videoCardClass =
    "absolute left-0 top-0 w-[78%] overflow-hidden rounded-[8px] border border-white/70 bg-white shadow-2xl shadow-black/15 transition-all duration-1000 ease-out " +
    (rightInView ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0");

  const imageCardClass =
    "absolute bottom-0 right-0 w-[54%] overflow-hidden rounded-[8px] border border-white/70 bg-white shadow-2xl shadow-black/15 transition-all duration-1000 ease-out " +
    (rightInView ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0");

  return (
    <section className="overflow-hidden bg-[#f5f4f1] px-4 py-16 text-[#171717] sm:px-6 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div ref={leftRef} className={leftBoxClass}>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#0877ff]">
            About Step Cable
          </p>
          <h2 className="max-w-3xl text-2xl font-black md:text-4xl">
            Reliable electrical products with quality-led supply support.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#55514b] sm:text-lg">
            Step Cable supplies wires, cables, conductors and electrical essentials for homes, industries and distribution partners across India.
          </p>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {highlights.map(([value, label], index) => {
              const cardClass =
                "relative overflow-hidden rounded-[8px] border border-black/10 bg-white/75 p-5 shadow-xl shadow-black/5 transition-all duration-700 ease-out " +
                (leftInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0");
              const cardDelay = leftInView ? (300 + index * 150) + "ms" : "0ms";

              return (
                <div key={label} className={cardClass} style={{ transitionDelay: cardDelay }}>
                  <span className="absolute inset-x-0 top-0 h-1 bg-[#0877ff]" />
                  <strong className="block text-3xl font-black leading-none sm:text-4xl">{value}</strong>
                  <span className="mt-2 block text-xs font-black uppercase tracking-[0.14em] text-[#625f59]">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <a
            href="/about-step-cables"
            className={ctaClass}
            style={{ transitionDelay: leftInView ? "750ms" : "0ms" }}
          >
            Know Step Cable <FaArrowRight aria-hidden="true" />
          </a>
        </div>

        <div ref={rightRef} className="relative min-h-[540px] lg:min-h-[620px]">
          <div className={videoCardClass}>
            <img
              src={aboutImage}
              alt="Step Cable quality approved products"
              loading="lazy"
              className="aspect-[16/11] h-full w-full object-cover"
            />
          </div>

          <div className="absolute right-0 top-[18%] z-10 grid gap-3">
            {process.map(([Icon, label], index) => {
              const badgeClass =
                "flex min-w-44 items-center gap-3 rounded-full border border-[#0877ff]/10 bg-white/80 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] shadow-xl shadow-black/10 backdrop-blur transition-all duration-700 ease-out hover:-translate-y-1 " +
                (rightInView ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0");
              const badgeDelay = rightInView ? (400 + index * 180) + "ms" : "0ms";

              return (
                <div key={label} className={badgeClass} style={{ transitionDelay: badgeDelay }}>
                  <Icon aria-hidden="true" className="animate-pulse text-base text-[#0877ff]" />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>

          <div className={imageCardClass} style={{ transitionDelay: rightInView ? "300ms" : "0ms" }}>
            <img
              src={qualityImage}
              alt="Step Cable quality control"
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
