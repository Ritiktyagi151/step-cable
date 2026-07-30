"use client";

import { useEffect, useRef, useState } from "react";
import { FaAward, FaIndustry, FaNetworkWired, FaStore } from "react-icons/fa";
import { homeNumbersSpeak } from "./homeData";

const numberIcons = {
  experience: FaAward,
  network: FaNetworkWired,
  retail: FaStore,
  units: FaIndustry
} as const;

export function NumbersSpeak() {
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
    <section ref={sectionRef} className="relative overflow-hidden bg-white pt-20" aria-labelledby="numbers-speak-title">
      <div className="absolute inset-x-0 top-0 h-32 bg-white" />
      <div className="relative mx-auto max-w-[94rem] px-4 sm:px-6 lg:px-8">
        <div className="bg-[linear-gradient(rgba(91,192,187,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(91,192,187,0.08)_1px,transparent_1px)] bg-[size:44px_44px] relative overflow-hidden rounded-[20px] border border-brand-teal/15 bg-gradient-to-br from-brand-teal to-brand-dark px-6 pb-12 pt-24 text-white shadow-2xl shadow-brand-teal/20 sm:px-10 lg:min-h-[520px] lg:px-16 lg:pb-16">

          <div className={`relative z-10 max-w-xl transition-all duration-700 ease-out ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
            <h2 id="numbers-speak-title" className="mt-4 text-[1.75rem] font-black leading-[1.2] text-white sm:text-4xl">
              Numbers Speak
            </h2>
            <p className="mt-6 text-base font-medium leading-8 text-white/85">
              Our manufacturing strength, distribution network and project support help Step Cables serve residential, industrial and infrastructure requirements across India.
            </p>
          </div>

          <div className="relative z-10 mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:pr-[22rem]">
            {homeNumbersSpeak.map(([value, label, icon]) => {
              const Icon = numberIcons[icon];

              return (
                <div
                  key={label}
                  className={`flex items-center gap-5 transition-all duration-700 ease-out ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${homeNumbersSpeak.findIndex((item) => item[1] === label) * 110}ms` }}
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/16 text-white shadow-lg backdrop-blur">
                    <Icon className="h-9 w-9" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-5xl font-black leading-none text-white sm:text-6xl">{value}</p>
                    <p className="mt-1 text-base font-black leading-tight text-white">{label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`pointer-events-none relative z-10 mt-12 h-72 transition-all duration-1000 ease-out lg:absolute lg:bottom-0 lg:right-16 lg:mt-0 lg:h-[35rem] lg:w-[28rem] ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}>
            <div className="absolute bottom-0 right-0 h-full w-full overflow-hidden rounded-[20px] border border-white/20 bg-white/20 shadow-2xl shadow-slate-900/20 backdrop-blur">
              <img
                src="/assets/img/Step-Cables-Manufacturing-Plant.jpg"
                alt="Step Cables manufacturing"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/35 via-transparent to-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
