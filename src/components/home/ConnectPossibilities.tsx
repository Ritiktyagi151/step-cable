"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { homeConnectSection } from "./homeData";

export function ConnectPossibilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[linear-gradient(rgba(91,192,187,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(91,192,187,0.08)_1px,transparent_1px)] bg-[size:44px_44px] relative overflow-hidden border-y border-brand-teal/15 bg-white text-slate-900"
      aria-labelledby="connect-section-title"
    >
      {/* Bottom Accent Bar in Brand Gradient */}
      <div className="absolute bottom-0 left-0 h-16 w-[58%] bg-gradient-to-r from-brand-teal/30 via-white to-brand-teal/30 [clip-path:polygon(0_0,100%_0,96%_100%,0_100%)]" />

      <div className="relative mx-auto min-h-[auto] max-w-[96rem] px-4 py-10 sm:px-6 sm:py-16 lg:min-h-[640px] lg:px-8 lg:py-0">
        <div className="flex flex-col gap-10 lg:min-h-[640px] lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div
            className={`relative z-10 max-w-2xl rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition-all duration-1000 ease-out sm:p-8 lg:w-[48%] lg:p-10 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
          >
            <h2 id="connect-section-title" className="mt-4 max-w-xl text-[1.55rem] font-black leading-[1.2] text-slate-900 sm:text-3xl lg:text-4xl">
              {homeConnectSection.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:mt-8 sm:text-xl sm:leading-9">{homeConnectSection.subtitle}</p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-5">
              <a
                href={homeConnectSection.primaryBtnHref}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-brand-teal to-brand-dark px-5 text-base font-bold text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5 sm:min-h-15 sm:gap-5 sm:px-7 sm:text-lg"
              >
                {homeConnectSection.primaryBtnText}
                <FaChevronRight aria-hidden="true" className="text-base" />
              </a>
              <a
                href={homeConnectSection.secondaryBtnHref}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-brand-teal/35 bg-white/70 px-5 text-base font-bold text-slate-900 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-dark sm:min-h-15 sm:gap-5 sm:px-7 sm:text-lg"
              >
                {homeConnectSection.secondaryBtnText}
                <FaChevronRight aria-hidden="true" className="text-base" />
              </a>
            </div>
          </div>

          {/* Skewed Frame with Brand Gradient Border */}
          <div
            className={`relative z-10 h-64 w-full overflow-hidden rounded-[20px] border border-brand-teal/15 bg-white/70 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur transition-all delay-150 duration-1000 ease-out sm:h-96 sm:p-3 lg:ml-auto lg:h-[32rem] lg:w-[46%] ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
          >
            <video
              className="relative h-full w-full rounded-2xl object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/img/Step-Cables-Manufacturing-Plant.jpg"
            >
              <source src={homeConnectSection.videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
