"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    type: "video",
    src: "/video/stepcables.mp4",
    // poster: "/home-banner/banner1.png",
    label: "Step Cable presence video",
  },
  {
    type: "image",
    src: "/home-banner/wire-cables-banner.png",
    label: "Step Cable banner 1",
  },
  {
    type: "image",
    src: "/home-banner/swtichesand-accessories.png",
    label: "Step Cable banner 2",
  },
  {
    type: "image",
    src: "/home-banner/conductor-banner.png",
    label: "Step Cable banner 3",
  },
] as const;

export function PremiumHeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    const active = slides[activeSlide];
    if (active.type === "video") return;

    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  useEffect(() => {
    slides.forEach((slide, index) => {
      if (slide.type !== "video") return;

      const video = videoRefs.current[slide.src];
      if (!video) return;

      if (index === activeSlide) {
        video.currentTime = 0;
        void video.play();
      } else {
        video.pause();
      }
    });
  }, [activeSlide]);

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-[#f5f4f1]">
      <div className="relative min-h-[80vh]">
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;

          return (
            <div
              key={slide.src}
              className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
                isActive ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
            >
              {slide.type === "video" ? (
                <video
                  ref={(element) => {
                    videoRefs.current[slide.src] = element;
                  }}
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={slide.label}
                  onEnded={() => {
                    setActiveSlide((current) => (current + 1) % slides.length);
                  }}
                  className="absolute inset-0 h-full w-full object-fill"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  key={isActive ? `${slide.src}-${activeSlide}` : slide.src}
                  src={slide.src}
                  alt={slide.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-fill"
                  style={{
                    animation: isActive
                      ? "bannerZoomOut 5000ms ease-out forwards"
                      : undefined,
                    transform: isActive ? undefined : "scale(1)",
                    transformOrigin: "center center",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <style jsx global>{`
        @keyframes bannerZoomOut {
          from {
            transform: scale(1.15);
          }

          to {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
