"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft, FaStar } from "react-icons/fa6";

const testimonials = [
  {
    quote: "Consistent quality and quick dealer support.",
    role: "Electrical Retailer",
    meta: "Counter sales",
  },
  {
    quote: "Reliable dispatches for recurring project demand.",
    role: "Project Buyer",
    meta: "Bulk enquiries",
  },
  {
    quote: "A strong range that moves well at counter level.",
    role: "Distributor",
    meta: "Channel partner",
  },
  {
    quote: "The team understands urgent site requirements and responds fast.",
    role: "Site Engineer",
    meta: "Project execution",
  },
  {
    quote: "Product availability and packaging make repeat orders easier.",
    role: "Wholesale Partner",
    meta: "Regional supply",
  },
  {
    quote: "Good support for cable selection across residential and commercial jobs.",
    role: "Electrical Contractor",
    meta: "Installation work",
  },
  {
    quote: "Dependable quality across multiple product categories.",
    role: "Purchase Manager",
    meta: "Procurement",
  },
  {
    quote: "A reliable brand for customers asking for durable wiring solutions.",
    role: "Retail Counter Owner",
    meta: "Customer sales",
  },
] as const;

export function PremiumTestimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderTestimonials = [...testimonials, ...testimonials.slice(0, 3)];
  const activeDot = activeSlide % testimonials.length;

  useEffect(() => {
    if (activeSlide === testimonials.length) return;

    const timer = window.setTimeout(() => {
      setIsTransitioning(true);
      setActiveSlide((current) => current + 1);
    }, 4200);

    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  const moveSlide = (direction: "prev" | "next") => {
    if (direction === "next") {
      setIsTransitioning(true);
      setActiveSlide((current) => current + 1);
      return;
    }

    if (activeSlide === 0) {
      setIsTransitioning(false);
      setActiveSlide(testimonials.length);
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          setIsTransitioning(true);
          setActiveSlide(testimonials.length - 1);
        })
      );
      return;
    }

    setIsTransitioning(true);
    setActiveSlide((current) => {
      if (current === testimonials.length) return testimonials.length - 1;
      return current - 1;
    });
  };

  return (
    <section className="premium-reveal bg-[#f5f4f1] px-4 py-16 text-[#171717] sm:px-6 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
        <div className="flex flex-col justify-between border-l-4 border-[#0877ff] py-2 pl-5 sm:pl-7">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#0877ff]">
              Testimonials
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-black md:text-4xl">
              Trusted by people who sell, source and specify.
            </h2>
          </div>
          <p className="mt-6 max-w-md text-base leading-8 text-[#5b5751]">
            Practical feedback from retail, distribution and project purchase conversations.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => moveSlide("prev")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#0877ff] shadow-lg shadow-black/5 transition hover:-translate-y-0.5 hover:border-[#0877ff]/30"
            >
              <FaArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => moveSlide("next")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0877ff] text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#005fd0]"
            >
              <FaArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <div className="overflow-hidden">
            <div
              onTransitionEnd={() => {
                if (activeSlide === testimonials.length) {
                  setIsTransitioning(false);
                  setActiveSlide(0);
                  window.requestAnimationFrame(() => setIsTransitioning(true));
                }
              }}
              className={`flex ${
                isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
              } translate-x-[calc(var(--slide-index)*-100%)] md:translate-x-[calc(var(--slide-index)*-50%)] xl:translate-x-[calc(var(--slide-index)*-33.333333%)]`}
              style={{ "--slide-index": activeSlide } as CSSProperties}
            >
              {sliderTestimonials.map(({ quote, role, meta }, index) => (
                <div
                  key={`${role}-${index}`}
                  className="min-w-full pr-0 md:min-w-[50%] md:pr-4 xl:min-w-[33.333333%]"
                >
                  <article className="group relative flex h-[360px] flex-col overflow-hidden rounded-[8px] border border-black/10 bg-white p-6 shadow-xl shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-[#0877ff]/25 hover:shadow-2xl hover:shadow-black/10 sm:h-[340px] xl:h-[380px]">
                    <span className="absolute right-5 top-5 text-5xl font-black leading-none text-[#0877ff]/10">
                      {String((index % testimonials.length) + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 flex h-full flex-1 flex-col justify-between gap-8">
                      <div>
                        <div className="mb-8 flex items-center justify-between gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0877ff] text-white shadow-lg shadow-blue-500/20">
                            <FaQuoteLeft aria-hidden="true" />
                          </span>
                          <span className="flex gap-1 text-sm text-[#f4b000]">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <FaStar key={starIndex} aria-hidden="true" />
                            ))}
                          </span>
                        </div>

                        <p className="text-2xl font-black leading-tight text-[#171717]">
                          {quote}
                        </p>
                      </div>

                      <div className="border-t border-black/10 pt-5">
                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-[#0877ff]">
                          {role}
                        </span>
                        <span className="mt-2 block text-sm font-bold text-[#67625b]">
                          {meta}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.role}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => {
                  setIsTransitioning(true);
                  setActiveSlide(index);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  activeDot === index ? "w-9 bg-[#0877ff]" : "w-2.5 bg-black/15 hover:bg-[#0877ff]/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
