"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

const slides = [
  {
    type: "video",
    src: "/video/stepcables.mp4",
    // poster: "/home-banner/banner1.png",
    label: "Step Cable presence video",
    objectPosition: "center center",
  },
  {
    type: "image",
    src: "/home-banner/wire-cables-banner.png",
    mobileSrc: "/home-banner/wire-cables-bannermobile.png",
    label: "Step Cable banner 1",
    objectPosition: "58% center",
    mobileObjectPosition: "center center",
  },
  {
    type: "image",
    src: "/home-banner/swtichesand-accessories.png",
    mobileSrc: "/home-banner/switches-and-accessoriesmobile.png",
    label: "Step Cable banner 2",
    objectPosition: "center center",
  },
  {
    type: "image",
    src: "/home-banner/conductor-banner.png",
    mobileSrc: "/home-banner/conductor-mobile.png",
    label: "Step Cable banner 3",
    objectPosition: "center center",
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
    <section className="relative h-[clamp(300px,48vh,430px)] overflow-hidden bg-[#f5f4f1] sm:h-[56vh] lg:min-h-[81vh]">
      <div className="relative h-full">
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
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: slide.objectPosition }}
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <picture
                  key={isActive ? `${slide.src}-${activeSlide}` : slide.src}
                  className="absolute inset-0 block h-full w-full"
                  style={{
                    animation: isActive
                      ? "bannerZoomOut 5000ms ease-out forwards"
                      : undefined,
                    transform: isActive ? undefined : "scale(1)",
                    transformOrigin: "center center",
                  }}
                >
                  {"mobileSrc" in slide ? (
                    <source media="(max-width: 639px)" srcSet={slide.mobileSrc} />
                  ) : null}
                  <img
                    src={slide.src}
                    alt={slide.label}
                    loading="lazy"
                    className="hero-slide-media h-full w-full object-cover"
                    style={{
                      "--hero-desktop-object-position": slide.objectPosition,
                      "--hero-mobile-object-position":
                        "mobileObjectPosition" in slide
                          ? slide.mobileObjectPosition
                          : slide.objectPosition,
                    } as CSSProperties}
                  />
                </picture>
              )}
            </div>
          );
        })}
      </div>
      <style jsx global>{`
        @keyframes bannerZoomOut {
          from {
            transform: scale(1.08);
          }

          to {
            transform: scale(1);
          }
        }

        .hero-slide-media {
          object-position: var(--hero-mobile-object-position);
        }

        @media (min-width: 640px) {
          .hero-slide-media {
            object-position: var(--hero-desktop-object-position);
          }
        }
      `}</style>
    </section>
  );
}
