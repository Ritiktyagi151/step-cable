import { FaCheckCircle, FaHeadset, FaLongArrowAltRight, FaMapMarkerAlt, FaStoreAlt } from "react-icons/fa";
import { retailSupportSteps } from "./homeData";

const supportIcons = [FaStoreAlt, FaHeadset, FaCheckCircle] as const;

export function RetailBuyingSupport() {
  return (
    <section className="border-b border-brand-teal/15 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="home-section-eyebrow-light">Retail network</p>
          <h2 className="home-section-heading-light">From product selection to nearby supply support.</h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/72">
            Make the homepage feel retail-first with easy product discovery, dealer confidence and direct enquiry for stock, pricing and technical fit.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:-translate-y-0.5 hover:bg-brand-mint"
            >
              Enquire Now <FaLongArrowAltRight aria-hidden="true" />
            </a>
            <a
              href="tel:+918448819330"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/20 px-6 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Call Retail Support
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          {retailSupportSteps.map(([title, description], index) => {
            const Icon = supportIcons[index % supportIcons.length];

            return (
              <article key={title} className="grid grid-cols-[56px_1fr] gap-4 rounded-[20px] border border-white/12 bg-white/8 p-5 backdrop-blur transition hover:bg-white/12 sm:grid-cols-[72px_1fr] sm:p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal text-2xl text-white sm:h-16 sm:w-16">
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-teal">Step 0{index + 1}</span>
                    {index === 2 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/82">
                        <FaMapMarkerAlt aria-hidden="true" />
                        Pan India
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-xl font-black leading-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/68">{description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
