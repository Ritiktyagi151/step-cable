"use client";

import { useState, useRef, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaFileAlt, FaLongArrowAltRight, FaCheck } from "react-icons/fa";
import { homeWorkflow, homeWorkflowImages } from "./homeData";

export function ProjectWorkflow() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Configure section background if provided
  const sectionBgStyle = homeWorkflowImages.sectionBg
    ? {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.94)), url(${homeWorkflowImages.sectionBg})`,
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
            <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-dark">Project Delivery Workflow</p>
            <h2 className="mt-4 text-[1.75rem] font-black leading-[1.2] text-slate-900 sm:text-4xl">
              From Engineering Specification to On-Site Delivery.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-neutral-600">
            A structured execution protocol supporting EPC contractors, utilities, and commercial developers at every project phase.
          </p>
        </div>

        {/* Workflow Timeline Steps Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeWorkflow.map((item, index) => (
            <div
              key={item.step}
              className={`rounded-[20px] border border-brand-teal/15 bg-white/78 shadow-xl shadow-slate-900/5 backdrop-blur-lg group relative flex flex-col justify-between p-6 transition duration-500 ease-out transform hover:border-brand-teal/35 hover:bg-white/90 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black tracking-tight text-brand-dark/35 transition group-hover:text-brand-dark">
                    {item.step}
                  </span>
                  <span className="rounded-full border border-brand-teal/15 bg-brand-teal/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-brand-dark transition group-hover:border-brand-teal/35 group-hover:bg-brand-teal/15">
                    Phase 0{index + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-black leading-snug text-slate-900 transition group-hover:text-brand-dark">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 border-t border-brand-teal/15 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-dark/60">
                  Key Deliverable
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs font-bold text-slate-900">
                  <FaCheck className="text-brand-dark transition group-hover:text-brand-dark" />
                  <span>{item.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* High-Impact Project Inquiry CTA Card */}
       
      </div>
    </section>
  );
}
