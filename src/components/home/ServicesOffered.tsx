"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBolt,
  FaBroadcastTower,
  FaChargingStation,
  FaIndustry,
  FaPlug,
  FaSolarPanel,
} from "react-icons/fa";

const leftServices = [
  {
    titleAccent: "House",
    title: "Wiring",
    description: "Fire-safe copper wires for homes, offices and commercial electrical networks.",
    icon: FaPlug,
  },
  {
    titleAccent: "Industrial",
    title: "Cables",
    description: "Single-core and multicore cables engineered for machinery, panels and plants.",
    icon: FaIndustry,
  },
  {
    titleAccent: "Power",
    title: "Control",
    description: "PVC and XLPE insulated cables for dependable distribution and control circuits.",
    icon: FaChargingStation,
  },
] as const;

const rightServices = [
  {
    titleAccent: "Aluminium",
    title: "Conductors",
    description: "AAC, AAAC, ACSR and AL-59 conductors for transmission and distribution lines.",
    icon: FaBroadcastTower,
  },
  {
    titleAccent: "EPC",
    title: "Support",
    description: "Project-ready electrical supply support with technical guidance and dispatch care.",
    icon: FaBolt,
  },
  {
    titleAccent: "Solar",
    title: "Solutions",
    description: "Durable cable selections for renewable power, utility and outdoor installations.",
    icon: FaSolarPanel,
  },
] as const;

export function ServicesOffered() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 bottom-0 h-20 bg-slate-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr_1fr]">
          <div className="grid gap-5 sm:gap-8 lg:gap-14">
            {leftServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={`${service.titleAccent}-${service.title}`}
                  className={`grid grid-cols-[64px_1fr] items-start gap-4 rounded-[20px] border border-brand-teal/15 bg-white/72 p-4 text-left shadow-lg shadow-slate-900/5 backdrop-blur transition-all duration-700 ease-out hover:-translate-y-1 hover:border-brand-teal/35 sm:grid-cols-[86px_1fr] sm:gap-6 sm:p-5 ${
                    isVisible ? "translate-x-0 opacity-100" : "-translate-x-14 opacity-0"
                  }`}
                  style={{ transitionDelay: `${leftServices.indexOf(service) * 110}ms` }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-teal/10 text-3xl text-brand-dark sm:h-20 sm:w-20 sm:text-5xl">
                    <Icon aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-normal leading-tight text-slate-900 sm:text-2xl">
                      <span className="block text-lg font-bold text-brand-dark sm:text-xl">{service.titleAccent}</span>
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base sm:leading-8">{service.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={`relative mx-auto min-h-[430px] w-full max-w-[420px] overflow-visible rounded-[20px] bg-[url('/assets/img/cable-wires.jpg')] bg-cover bg-center text-white shadow-2xl shadow-brand-teal/20 transition-all duration-700 ease-out sm:min-h-[540px] lg:min-h-[620px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}>
            <div className="absolute inset-0 rounded-[20px] bg-brand-teal/90" aria-hidden="true" />
            <div className="relative z-10 flex min-h-[430px] flex-col items-center justify-center px-6 py-10 text-center sm:min-h-[540px] sm:px-8 sm:py-14 lg:min-h-[620px]">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-white">Services We</p>
              <h2 className="mt-4 text-[1.75rem] font-black leading-[1.2] text-white sm:text-4xl">Offered</h2>
              <p className="mt-8 max-w-xs text-base font-medium leading-8 sm:mt-12 sm:text-lg sm:leading-9">
                Complete wire, cable and conductor solutions for safe, efficient electrical infrastructure.
              </p>
              <a
                href="/about-step-cables"
                className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-white px-8 text-base font-bold !text-slate-950 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-slate-950 hover:!text-white focus:outline-none focus:ring-4 focus:ring-white/50 sm:mt-14 sm:min-h-16 sm:px-12 sm:text-lg"
              >
                View All Services
              </a>
            </div>
            <div className="absolute -bottom-8 left-8 h-8 w-16 bg-brand-teal [clip-path:polygon(0_0,100%_0,100%_100%)]" aria-hidden="true" />
            <div className="absolute -bottom-8 right-8 h-8 w-16 bg-brand-teal [clip-path:polygon(0_0,100%_0,0_100%)]" aria-hidden="true" />
          </div>

          <div className="grid gap-5 sm:gap-8 lg:gap-14">
            {rightServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={`${service.titleAccent}-${service.title}`}
                  className={`grid grid-cols-[1fr_64px] items-start gap-4 rounded-[20px] border border-brand-teal/15 bg-white/72 p-4 text-right shadow-lg shadow-slate-900/5 backdrop-blur transition-all duration-700 ease-out hover:-translate-y-1 hover:border-brand-teal/35 sm:grid-cols-[1fr_86px] sm:gap-6 sm:p-5 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-14 opacity-0"
                  }`}
                  style={{ transitionDelay: `${rightServices.indexOf(service) * 110}ms` }}
                >
                  <div>
                    <h3 className="text-xl font-normal leading-tight text-slate-900 sm:text-2xl">
                      <span className="block text-lg font-bold text-brand-dark sm:text-xl">{service.titleAccent}</span>
                      {service.title}
                    </h3>
                    <p className="mt-3 ml-auto max-w-sm text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base sm:leading-8">{service.description}</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-teal/10 text-3xl text-brand-dark sm:h-20 sm:w-20 sm:text-5xl">
                    <Icon aria-hidden="true" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
