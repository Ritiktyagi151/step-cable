"use client";

import { useState, useRef, useEffect } from "react";
import { FaShieldAlt, FaCogs, FaTruckLoading, FaGem, FaCheckCircle, FaLongArrowAltRight } from "react-icons/fa";
import { homeAdvantage, homeAdvantageImages } from "./homeData";

const advantageIcons = [FaGem, FaShieldAlt, FaCogs, FaTruckLoading];
const spotlightSlides = [
  "/home-banner/feature1.png",
  "/home-banner/feature2.png",
  "/home-banner/feature3.png",
  "/home-banner/feature4.png",
] as const;

export function StepAdvantage() {
  const [activeId, setActiveId] = useState<string>(homeAdvantage[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeItem = homeAdvantage.find((item) => item.id === activeId) || homeAdvantage[0];

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

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % homeAdvantage.length;
        setActiveId(homeAdvantage[nextIndex].id);
        return nextIndex;
      });
    }, 3500);

    return () => window.clearInterval(slideTimer);
  }, []);

  // Configure section background if provided
  const sectionBgStyle = homeAdvantageImages.sectionBg
    ? {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.94)), url(${homeAdvantageImages.sectionBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <section ref={sectionRef} style={sectionBgStyle} className="overflow-hidden border-b border-brand-teal/15 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col justify-between gap-6 border-b border-brand-teal/15 pb-10 lg:flex-row lg:items-end transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-dark">Engineering Distinction</p>
            <h2 className="mt-4 text-[1.75rem] font-black leading-[1.2] text-slate-900 sm:text-4xl">
              Built with Uncompromising Purity & Manufacturing Precision.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-neutral-600">
            From 99.97% electrolytic copper to continuous vulcanization, every meter of Step Cable is engineered to minimize energy loss and guarantee long-term reliability.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Grid Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {homeAdvantage.map((item, index) => {
              const Icon = advantageIcons[index % advantageIcons.length];
              const isSelected = item.id === activeId;
              const handleSelect = () => {
                setActiveId(item.id);
                setActiveImageIndex(index);
              };

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={handleSelect}
                  onMouseEnter={handleSelect}
                  className={`group relative flex flex-col justify-between p-6 text-left transition-all duration-500 ease-out transform ${
                    isSelected
                      ? "rounded-[20px] border border-brand-teal/15 bg-white/78 shadow-xl shadow-slate-900/5 backdrop-blur-lg border-brand-teal/35 bg-brand-teal/10 text-slate-900 shadow-xl"
                      : "rounded-[20px] border border-brand-teal/15 bg-white/78 shadow-xl shadow-slate-900/5 backdrop-blur-lg text-slate-900 hover:border-brand-teal/35 hover:bg-white/90"
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                  style={{
                    transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
                  }}
                >
                  <div className="z-10">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black uppercase tracking-[0.25em] ${isSelected ? "text-brand-dark" : "text-brand-dark/65"}`}>
                        Pillar 0{index + 1}
                      </span>
                      <Icon className={`text-xl ${isSelected ? "text-brand-dark" : "text-brand-dark/75"}`} aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-xl font-black leading-snug">{item.title}</h3>
                    <p className={`mt-2 text-sm leading-6 ${isSelected ? "text-slate-600" : "text-slate-500"}`}>{item.short}</p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t pt-4 border-current/15 z-10">
                    <span className={`text-2xl font-black tracking-tight ${isSelected ? "text-brand-dark" : "text-slate-900"}`}>{item.stat}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? "text-brand-dark" : "text-brand-dark/65"}`}>
                      {item.statLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Featured Highlight Box */}
          <div
            className={`rounded-[20px] border border-brand-teal/15 bg-white/78 shadow-xl shadow-slate-900/5 backdrop-blur-lg relative flex flex-col justify-between overflow-hidden p-8 text-slate-900 transition-all duration-1000 ease-out transform sm:p-10 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{
              transitionDelay: isVisible ? "400ms" : "0ms",
            }}
          >
            <div className="absolute inset-0 z-0">
              {spotlightSlides.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                    index === activeImageIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-brand-teal/30 to-transparent pointer-events-none z-10" />

            <div className="z-10 relative max-w-md">
              <div className="inline-flex items-center gap-2 border border-brand-teal/15 bg-white/75 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-brand-dark backdrop-blur">
                <FaCheckCircle className="text-brand-dark" /> Technical Spotlight
              </div>
              <h3 className="mt-4 text-xl font-black leading-tight text-slate-900 sm:text-2xl">{activeItem.title}</h3>
              <p className="sr-only">{activeItem.description}</p>
            </div>

            <div className="mt-6 border-t border-brand-teal/15 pt-5 z-10 relative">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">Core Metric</p>
                  <p className="mt-1 text-2xl font-black text-brand-teal">{activeItem.stat}</p>
                  <p className="text-xs text-slate-500">{activeItem.statLabel}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">Quality Guarantee</p>
                  <p className="mt-1 text-base font-bold text-slate-900">100% Factory Inspection</p>
                  <p className="text-xs text-slate-500">With Batch Test Certificate</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <a
                  href="/about-step-cables"
                  className="rounded-full bg-gradient-to-r from-brand-teal to-brand-dark text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5 inline-flex items-center gap-3 px-6 py-3 text-xs font-black uppercase tracking-widest"
                >
                  Read Manufacturing Process <FaLongArrowAltRight />
                </a>
                <div className="flex items-center gap-2">
                  {spotlightSlides.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => {
                        setActiveImageIndex(index);
                        setActiveId(homeAdvantage[index].id);
                      }}
                      aria-label={`Show spotlight image ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === activeImageIndex ? "w-8 bg-brand-teal" : "w-2.5 bg-slate-400/50 hover:bg-brand-teal/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
