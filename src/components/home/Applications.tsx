import { homeIndustries } from "./homeData";
import { FaBolt, FaBuilding, FaCity, FaHardHat, FaIndustry, FaPlug } from "react-icons/fa";

const applicationIcons = [FaBuilding, FaIndustry, FaHardHat, FaBolt, FaCity, FaPlug];

export function Applications() {
  return (
    <section className="overflow-hidden border-b border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div className="flex flex-col justify-between border-l-4 border-black pl-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-neutral-500">Applications</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-black">Built for every electrical environment.</h2>
            <p className="mt-5 max-w-md text-base leading-8 text-neutral-600">
              From housing networks to utility infrastructure, Step Cables supports dependable power movement across project types.
            </p>
          </div>
          <a href="/clients1" className="mt-8 w-fit bg-black px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-neutral-800">
            View Clients
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {homeIndustries.map((item, index) => {
            const Icon = applicationIcons[index % applicationIcons.length];
            return (
              <div
                key={item}
                className="application-card group relative min-h-40 overflow-hidden border border-neutral-200 bg-neutral-50 p-6 transition hover:border-black hover:bg-black hover:text-white"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="absolute right-4 top-4 text-5xl text-neutral-200 transition group-hover:text-white/10">
                  <Icon aria-hidden="true" />
                </div>
                <div className="relative">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-neutral-500 transition group-hover:text-white/55">0{index + 1}</span>
                  <h3 className="mt-10 text-xl font-black uppercase tracking-wide text-black transition group-hover:text-white">{item}</h3>
                  <div className="mt-5 h-1 w-10 bg-black transition group-hover:w-20 group-hover:bg-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-black py-4 text-white">
        <div className="application-marquee flex whitespace-nowrap text-xs font-black uppercase tracking-[0.35em] text-white/75">
          {[...homeIndustries, ...homeIndustries].map((item, index) => (
            <span key={`${item}-${index}`} className="mx-7">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
