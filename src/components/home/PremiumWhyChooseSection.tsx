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

const bgImage = "/home-banner/banner2.png";

const advantages = [
  {
    Icon: FaAward,
    title: "Quality",
    text: "Consistent product selection and inspection standards.",
    image: "/homepage-img/why-choose/quality-light.png",
  },
  {
    Icon: FaShieldHalved,
    title: "Safety",
    text: "Products engineered for safer electrical installations.",
    image: "/homepage-img/why-choose/safety.png",
  },
  {
    Icon: FaBoxesStacked,
    title: "Wide Product Range",
    text: "Wires, cables, conductors, switches and accessories.",
    image: "/homepage-img/why-choose/wide-product-range.png",
  },
  {
    Icon: FaNetworkWired,
    title: "Dealer Network",
    text: "Strong retail and distributor reach across markets.",
    image: "/homepage-img/why-choose/dealer-network.png",
  },
  {
    Icon: FaTruckFast,
    title: "Reliable Supply",
    text: "Dependable dispatch support for repeat demand.",
    image: "/homepage-img/why-choose/reliable-supply.png",
  },
  {
    Icon: FaHeadset,
    title: "Customer Support",
    text: "Responsive support for product and dealer enquiries.",
    image: "/homepage-img/why-choose/customer-support.png",
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

  const headingClass =
    "max-w-3xl text-3xl font-black text-white leading-[0.98] tracking-normal transition-all duration-1000 ease-out  md:text-5xl " +
    (sectionInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0");

  const subTextClass =
    "max-w-md text-sm leading-7  text-gray-100 transition-all duration-1000 ease-out sm:text-base " +
    (sectionInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-16 text-[#171717]   md:px-10 md:py-14"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 md:bg-fixed"
          style={{ backgroundImage: `url(${bgImage})`, opacity: sectionInView ? 1 : 0.72 }}
        />
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#f5f4f1]/95 via-[#f5f4f1]/70 to-[#f5f4f1]/95" /> */}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={
                "mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#0877ff] transition-all duration-700 ease-out " +
                (sectionInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")
              }
            >
              Why Choose Us
            </p>
            <h2 className={headingClass} style={{ transitionDelay: sectionInView ? "120ms" : "0ms" }}>
              Built around certainty.
            </h2>
          </div>
          <p className={subTextClass} style={{ transitionDelay: sectionInView ? "250ms" : "0ms" }}>
            Practical product confidence for homes, projects, retailers and distribution partners.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ Icon, title, text, image }, index) => {
            const cardClass =
              "group relative min-h-72 overflow-hidden rounded-[8px] border border-white/20 bg-slate-950 p-6 text-white shadow-xl shadow-black/10 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-[#0877ff]/40 hover:shadow-2xl hover:shadow-black/20 " +
              (gridInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0");
            const cardDelay = gridInView ? index * 110 + "ms" : "0ms";

            return (
              <article
                key={title}
                className={cardClass}
                style={{ transitionDelay: cardDelay, backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                {/* <div className="absolute inset-0 bg-black/48 transition duration-500 group-hover:bg-black/42" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10" /> */}

                <div className="relative z-10 flex min-h-60 flex-col justify-between">
                <span className="absolute right-0 top-0 text-5xl font-black leading-none text-white/10">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/16 text-white backdrop-blur transition duration-300 group-hover:bg-[#0877ff] group-hover:text-white">
                  <Icon aria-hidden="true" className="text-xl transition duration-300 group-hover:scale-110" />
                </div>

                <div className="rounded-[8px] bg-black/48 p-4 shadow-2xl shadow-black/20 backdrop-blur-sm">
                  <h3 className="text-2xl font-black leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">{title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">{text}</p>
                </div>
                </div>

                <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#0877ff] transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
