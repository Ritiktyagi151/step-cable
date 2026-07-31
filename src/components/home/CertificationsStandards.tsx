"use client";

import { useState, useRef, useEffect } from "react";
import { FaCertificate, FaShieldAlt, FaFlask, FaCheckDouble } from "react-icons/fa";
import { homeCertifications, homeCertificationsImages } from "./homeData";

export function CertificationsStandards() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredItems = homeCertifications;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const sectionBgStyle = {
    backgroundImage: `url(${homeCertificationsImages.sectionBg || "/home-banner/cabel-bg.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section ref={sectionRef} style={sectionBgStyle} className="relative overflow-hidden border-b border-brand-teal/15 text-slate-900">
      <div className="absolute inset-0 bg-black/40" />
      {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(91,192,187,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(91,192,187,0.10)_1px,transparent_1px)] bg-[size:46px_46px]" /> */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Section Header */}
        <div
          className={`relative grid gap-6 rounded-[20px] border border-brand-teal/15 bg-white/80 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-md transition-all duration-1000 ease-out transform sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-10 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/15 bg-brand-teal/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-brand-dark sm:text-xs sm:tracking-[0.28em]">
              <FaShieldAlt className="text-brand-dark" /> Compliance & Testing
            </div>
            <h2 className="mt-4 text-[1.55rem] font-black leading-[1.2] text-slate-900 sm:text-3xl lg:text-4xl">
              Certified for Critical Safety & Standard Compliance.
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Every product batch is manufactured in alignment with Indian Standards (IS), Bureau of Indian Standards (BIS) specs, and rigorous internal lab testing.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["IS", "Standards"],
                ["BIS", "Verified"],
                ["FAT", "Testing"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-2xl border border-brand-teal/15 bg-brand-teal/10 px-4 py-3 text-center">
                  <p className="text-lg font-black text-brand-dark">{value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Standards Grid */}
        <div className="relative mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <div
              key={item.code}
              className={`group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-[20px] border border-brand-teal/15 bg-white/86 p-5 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-500 ease-out transform hover:-translate-y-2 hover:border-brand-teal/35 hover:shadow-2xl hover:shadow-brand-teal/10 sm:min-h-72 sm:p-6 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-teal/10 transition duration-300 group-hover:scale-125" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-brand-teal/15 bg-brand-teal/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-brand-dark">
                    {item.code}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-white shadow-lg shadow-brand-teal/25">
                    <FaCertificate aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-brand-dark/65">{item.category}</p>
                <h3 className="mt-3 text-xl font-black leading-tight text-slate-900 group-hover:text-brand-dark">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-brand-teal/15 pt-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5 text-brand-dark">
                  <FaCheckDouble className="text-brand-dark" /> BIS Verified
                </span>
                <span>Full Test Report</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Lab Testing Feature Bar */}
        <div
          className={`relative mt-14 overflow-hidden rounded-[20px] border border-brand-teal/15 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/15 transition-all duration-1000 ease-out transform sm:p-10 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            transitionDelay: isVisible ? "350ms" : "0ms",
            backgroundImage: homeCertificationsImages.labBg ? `url(${homeCertificationsImages.labBg})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Background Overlay */}
          {homeCertificationsImages.labBg && (
            <div className="absolute inset-0 z-0 bg-slate-950/76" />
          )}

          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal text-white shadow-lg shadow-brand-teal/25">
                <FaFlask aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] text-brand-teal">Quality Assurance</p>
              <h3 className="mt-3 text-3xl font-black leading-tight text-white">In-House High Voltage & Chemical Testing Lab</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-wider text-brand-teal">Flame Retardant (FRLS) Testing</p>
                <p className="mt-2 text-xs leading-5 text-white/72">Verified for low smoke density, high oxygen index, and minimal toxic gas emission.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-wider text-brand-teal">High Voltage Water Immersion</p>
                <p className="mt-2 text-xs leading-5 text-white/72">Spark testing and water immersion spark test to verify 100% insulation integrity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
