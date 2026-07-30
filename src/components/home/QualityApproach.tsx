"use client";

import { useEffect, useRef, useState } from "react";
import { homeProcess } from "./homeData";

export function QualityApproach() {
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
    <section ref={sectionRef} className="bg-slate-50/80 text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className={`transition-all duration-700 ease-out ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-dark">Quality Approach</p>
          <h2 className="mt-4 text-[1.75rem] font-black leading-[1.2] text-slate-900 sm:text-4xl">Engineered for safety, consistency and dependable supply.</h2>
        </div>
        <div className="grid gap-4">
          {homeProcess.map((item, index) => (
            <div
              key={item}
              className={`grid grid-cols-[3rem_1fr] gap-4 rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition-all duration-700 ease-out ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <span className="text-sm font-black text-brand-dark">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-base leading-7 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
