"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaAward,
  FaBoxesStacked,
  FaHeadset,
  FaNetworkWired,
  FaShieldHalved,
  FaTruckFast,
} from "react-icons/fa6";

const advantages = [
  {
    Icon: FaAward,
    title: "Quality",
    text: "Consistent product selection and inspection standards.",
  },
  {
    Icon: FaShieldHalved,
    title: "Safety",
    text: "Products engineered for safer electrical installations.",
  },
  {
    Icon: FaBoxesStacked,
    title: "Wide Product Range",
    text: "Wires, cables, conductors, switches and accessories.",
  },
  {
    Icon: FaNetworkWired,
    title: "Dealer Network",
    text: "Strong retail and distributor reach across markets.",
  },
  {
    Icon: FaTruckFast,
    title: "Reliable Supply",
    text: "Dependable dispatch support for repeat demand.",
  },
  {
    Icon: FaHeadset,
    title: "Customer Support",
    text: "Responsive support for product and dealer enquiries.",
  },
] as const;

function useInView<T extends HTMLElement>(threshold = 0.2) {
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

export function PremiumWhyChooseSection() {
  const { ref: sectionRef, inView: sectionInView } = useInView<HTMLElement>(0.15);
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>(0.1);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f4f7fb] px-4 py-16 text-slate-900 sm:py-20 md:px-10 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p
              className={
                "mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0877ff] shadow-sm transition-all duration-700 ease-out " +
                (sectionInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0877ff]" />
              Why Choose Us
            </p>
            <h2 className="max-w-3xl text-xl  font-black leading-[1.02] tracking-tight text-slate-950 transition-all duration-1000 ease-out sm:text-2xl lg:text-4xl" style={{ transitionDelay: sectionInView ? "120ms" : "0ms", opacity: sectionInView ? 1 : 0, transform: sectionInView ? "translateY(0)" : "translateY(2.5rem)" }}>
              Confidence in every connection.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600 transition-all duration-1000 ease-out lg:justify-self-end lg:text-lg lg:leading-8" style={{ transitionDelay: sectionInView ? "250ms" : "0ms", opacity: sectionInView ? 1 : 0, transform: sectionInView ? "translateY(0)" : "translateY(2.5rem)" }}>
            Practical product confidence for homes, projects, retailers and distribution partners.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ Icon, title, text }, index) => {
            const cardClass =
              "group relative min-h-60 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 text-slate-900 shadow-[0_10px_35px_-24px_rgba(15,23,42,0.35)] transition-all duration-700 ease-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_55px_-28px_rgba(8,119,255,0.35)] sm:min-h-64 sm:p-7 " +
              (gridInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0");
            const cardDelay = gridInView ? index * 110 + "ms" : "0ms";

            return (
              <article
                key={title}
                className={cardClass}
                style={{ transitionDelay: cardDelay }}
              >
                <div aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 transition-transform duration-500 group-hover:scale-125" />
                <div className="relative z-10 flex min-h-48 flex-col sm:min-h-48">
                <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0877ff] ring-1 ring-blue-100 transition duration-300 group-hover:bg-[#0877ff] group-hover:text-white group-hover:ring-[#0877ff]">
                  <Icon aria-hidden="true" className="text-lg transition duration-300 group-hover:scale-110" />
                </span>
                <span className="pt-1 text-sm font-bold tracking-[0.16em] text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                </div>

                <div className="mt-auto pt-9">
                  <h3 className="text-xl font-extrabold leading-tight tracking-tight text-slate-950">{title}</h3>
                  <p className="mt-2.5 max-w-sm text-sm leading-6 text-slate-600">{text}</p>
                </div>
                </div>

                <span className="absolute bottom-0 left-6 right-6 h-px bg-slate-100 transition-colors duration-300 group-hover:bg-blue-200" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
