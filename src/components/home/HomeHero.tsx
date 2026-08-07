import { FaBolt, FaCheckCircle, FaHeadset, FaLongArrowAltRight, FaShieldAlt, FaStore } from "react-icons/fa";

const retailHeroProducts = [
  {
    title: "House Wiring",
    copy: "FR and FRLS wires for safer homes, shops and offices.",
    href: "/housing-wiring-electrical-building-wire",
    image: "/wiresforhome/Safest-Electrical-Wires-For-Home.JPG",
  },
  {
    title: "Submersible Cable",
    copy: "Flat 3 core cables for pumps and everyday water systems.",
    href: "/three-core-pvc-insulated-flat-cable",
    image: "/wiresforhome/Best-Submersible-Cable-For-Pump.JPG",
  },
  {
    title: "Power & Control Cable",
    copy: "Reliable cable choices for panels, shops and small sites.",
    href: "/pvc-insulated-power-control-cable",
    image: "/assets/img/cable-wires.jpg",
  },
] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 text-slate-950 lg:pt-32">
      <div className="absolute inset-x-0 top-0 h-[62%] bg-slate-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-7 sm:px-6 sm:pb-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-18 lg:pt-10">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-teal/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-dark shadow-sm">
            <FaStore aria-hidden="true" />
            Retail wire & cable range
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.08] text-slate-950 sm:text-5xl lg:text-6xl">
            Step Cables for homes, shops and daily electrical needs.
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
            Choose safe house wires, submersible cables, power cables and conductors from a pan-India retail network with dependable product support.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="/step-cadillac"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand-teal px-6 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-brand-teal/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Shop Product Range <FaLongArrowAltRight aria-hidden="true" />
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-brand-teal/25 bg-white px-6 text-sm font-black uppercase tracking-wide text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-teal/45 hover:bg-brand-teal/10"
            >
              Ask for Dealer Support
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["85K+", "Retailers"],
              ["900+", "Dealers"],
              ["7", "Manufacturing units"],
            ].map(([value, label]) => (
              <div key={label} className="border-l-2 border-brand-teal bg-white/70 px-4 py-3 shadow-sm">
                <p className="text-2xl font-black text-slate-950">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={retailHeroProducts[0].href} className="group relative min-h-[360px] overflow-hidden rounded-[20px] bg-slate-900 shadow-2xl shadow-slate-900/15 sm:col-span-2 lg:min-h-[440px]">
              <img src={retailHeroProducts[0].image} alt={retailHeroProducts[0].title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-dark">
                  <FaShieldAlt aria-hidden="true" />
                  Popular for homes
                </div>
                <h2 className="mt-4 text-3xl font-black leading-tight">{retailHeroProducts[0].title}</h2>
                <p className="mt-2 max-w-md text-sm font-medium leading-6 text-white/85">{retailHeroProducts[0].copy}</p>
              </div>
            </a>

            {retailHeroProducts.slice(1).map((product) => (
              <a key={product.title} href={product.href} className="group relative min-h-56 overflow-hidden rounded-[20px] bg-slate-900 shadow-xl shadow-slate-900/10">
                <img src={product.image} alt={product.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/12 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-black leading-tight">{product.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/82">{product.copy}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="absolute -bottom-5 left-4 right-4 grid gap-2 rounded-[20px] border border-brand-teal/20 bg-white p-4 shadow-xl shadow-slate-900/12 sm:left-auto sm:right-6 sm:w-80">
            {[
              [FaCheckCircle, "Genuine Step quality"],
              [FaBolt, "Fast product enquiry"],
              [FaHeadset, "Dealer and stock support"],
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <Icon className="text-brand-dark" aria-hidden="true" />
                <span>{label as string}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
