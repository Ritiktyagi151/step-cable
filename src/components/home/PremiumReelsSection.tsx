"use client";

import { FaInstagram } from "react-icons/fa6";

const homeReels = [
  {
    title: "Manufacturing Floor",
    label: "Step Cable production",
    src: "/video/reel1.mp4",
  },
  {
    title: "Cable Range",
    label: "Wires and cable products",
    src: "/video/reel2.mp4",
  },
  {
    title: "Brand Presence",
    label: "Step Cable brand video",
    src: "/video/reel3.mp4",
  },
  {
    title: "Quality & Supply",
    label: "Step Cable overview",
    src: "/video/reel4.mp4",
  },
] as const;

function getVideoType(src: string) {
  return src.endsWith(".webm") ? "video/webm" : "video/mp4";
}

export function PremiumReelsSection() {
  return (
    <section className="bg-white px-4 py-16 text-[#171717] sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0877ff]">Reels</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight text-[#171717] sm:text-4xl lg:text-5xl">
              Step Cable in motion
            </h2>
          </div>
          <a
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0877ff] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#005fd0]"
          >
            <FaInstagram aria-hidden="true" />
            Connect With Us
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {homeReels.map((reel) => (
            <article
              key={reel.src}
              className="group overflow-hidden rounded-[8px] border border-black/10 bg-[#f5f4f1] shadow-xl shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-[#0877ff]/30 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="aspect-[9/16] overflow-hidden bg-black">
                <video
                  muted
                  loop
                  playsInline
                  autoPlay
                  controls
                  preload="metadata"
                  aria-label={reel.label}
                  className="h-full w-full object-cover"
                >
                  <source src={reel.src} type={getVideoType(reel.src)} />
                </video>
              </div>
              <div className="p-4">
                <h3 className="text-base font-black leading-snug text-[#171717]">{reel.title}</h3>
                <p className="mt-1 text-sm font-medium leading-6 text-slate-600">{reel.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PremiumReelsSection;
