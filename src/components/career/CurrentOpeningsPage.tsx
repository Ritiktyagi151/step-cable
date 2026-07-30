import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import type { SitePage } from "@/lib/content";
import { currentOpeningIntro, currentOpeningLocations, currentOpeningSections } from "./careerData";

type CurrentOpeningsPageProps = {
  page: SitePage;
};

export function CurrentOpeningsPage({ page }: CurrentOpeningsPageProps) {
  return (
    <>
      <PageHero title={page.h1 || "Current Openings"} description="Career opportunities at Step Cables for sales, business development and electrical industry professionals." image={page.image} />
      <section className="bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10">
            <aside className="space-y-5">
              <div className="rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark sm:tracking-[0.35em]">Working At Step Cables</p>
                <div className="mt-5 space-y-4">
                  {currentOpeningIntro.map((item) => (
                    <p key={item} className="text-sm leading-7 text-slate-600">{item}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-6">
                <h2 className="text-xl font-black text-slate-900">Location</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentOpeningLocations.map((location) => (
                    <span key={location} className="rounded-full border border-brand-teal/15 bg-brand-teal/10 px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-900">
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
            <div className="space-y-5">
              {currentOpeningSections.map((section, index) => (
                <section key={section.title} className="rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-black text-brand-dark">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{section.title}</h2>
                      <ul className="mt-4 grid gap-3">
                        {section.items.map((item) => (
                          <li key={item} className="border-l-4 border-brand-teal/35 pl-4 text-sm leading-7 text-slate-600">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              ))}
              <Link href="/application-form" className="inline-block w-full rounded-full bg-gradient-to-r from-brand-teal to-brand-dark px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5 sm:w-fit">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
