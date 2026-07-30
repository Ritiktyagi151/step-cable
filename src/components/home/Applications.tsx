"use client";

import { useEffect, useRef, useState } from "react";
import { homeIndustryApplications } from "./homeData";

export function Applications() {
  const leftColumn = homeIndustryApplications.slice(0, 5);
  const rightColumn = homeIndustryApplications.slice(5);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="applications"
      className="relative min-h-[560px] overflow-hidden border-y border-brand-teal/15 bg-[url('/assets/img/epc.jpg')] bg-cover bg-center text-slate-900 lg:min-h-[640px] lg:bg-fixed"
      aria-labelledby="industry-application-title"
    >
      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center justify-end px-4 py-14 sm:px-6 lg:min-h-[640px] lg:px-8 lg:py-20">
        <div className={`ml-auto w-full max-w-2xl text-left transition-all duration-1000 ease-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>
          <div className="mb-6 h-1 w-20 rounded-full bg-brand-teal" />
          <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-brand-teal">Industry Application</p>
          <h2 id="industry-application-title" className="mt-3 text-2xl font-black leading-tight text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
            Built for demanding
            <span className="block text-brand-teal">industrial environments.</span>
          </h2>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <div className="grid gap-3">
              {leftColumn.map((item, index) => (
                <p
                  key={item}
                  className={`flex min-h-12 items-center justify-start gap-3 rounded-[20px] border border-white/15 bg-black/35 px-4 py-3 text-left text-[0.68rem] font-black uppercase tracking-[0.08em] text-white shadow-lg shadow-slate-900/20 backdrop-blur-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-brand-teal/45 hover:bg-black/45 sm:min-h-14 sm:gap-5 sm:text-xs sm:tracking-[0.12em] ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <span className="text-[0.65rem] text-brand-teal">0{index + 1}</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
            <div className="grid gap-3">
              {rightColumn.map((item, index) => (
                <p
                  key={item}
                  className={`flex min-h-12 items-center justify-start gap-3 rounded-[20px] border border-white/15 bg-black/35 px-4 py-3 text-left text-[0.68rem] font-black uppercase tracking-[0.08em] text-white shadow-lg shadow-slate-900/20 backdrop-blur-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-brand-teal/45 hover:bg-black/45 sm:min-h-14 sm:gap-5 sm:text-xs sm:tracking-[0.12em] ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
                  style={{ transitionDelay: `${(index + 5) * 80}ms` }}
                >
                  <span className="text-[0.65rem] text-brand-teal">0{index + 6}</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
