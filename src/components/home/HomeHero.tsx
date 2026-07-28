import { homeStats } from "./homeData";

const heroSlides = [
  "/assets/img/slider/Electric-Wires-Step-Cables.jpg",
  "/assets/img/slider/Electric-Cables-Step-Cables.jpg",
  "/assets/img/slider/Power-Cables-Step-Cables.jpg",
  "/assets/img/slider/Power-Transmission-Cables-Step-Industries.jpg",
  "/assets/img/slider/EPC-Companies-Step-Industries.jpg"
];

export function HomeHero() {
  return (
    <section className="relative min-h-[650px] overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {heroSlides.map((src, index) => (
          <img
            key={src}
            src={src}
            alt="Step Cables products"
            className="hero-slide absolute inset-0 h-full w-full object-cover grayscale"
            style={{ animationDelay: `${index * 4}s` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/78 to-black/20" />
      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.55fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">Step Cables</p>
          <h1 className="mt-5 text-5xl font-black leading-none sm:text-7xl">Wires. Cables. Conductors.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">Reliable electrical solutions for homes, industry and infrastructure.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/about-step-cables" className="bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-black hover:bg-neutral-200">
              Explore Products
            </a>
            <a href="/contact" className="border border-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-white hover:text-black">
              Reach Us
            </a>
          </div>
        </div>
        <div className="border border-white/25 bg-black/45 p-5 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">Built For</p>
          <div className="mt-5 grid gap-3">
            {homeStats.map(([value, label]) => (
              <div key={value} className="border-b border-white/15 pb-4 last:border-b-0 last:pb-0">
                <p className="text-3xl font-black">{value}</p>
                <p className="mt-1 text-sm leading-6 text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
