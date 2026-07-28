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
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <aside className="space-y-5">
              <div className="border border-black bg-white p-6">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-neutral-500">Working At Step Cables</p>
                <div className="mt-5 space-y-4">
                  {currentOpeningIntro.map((item) => (
                    <p key={item} className="text-sm leading-7 text-neutral-700">{item}</p>
                  ))}
                </div>
              </div>
              <div className="border border-neutral-300 bg-white p-6">
                <h2 className="text-xl font-black">Location</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentOpeningLocations.map((location) => (
                    <span key={location} className="border border-neutral-300 px-3 py-2 text-xs font-black uppercase tracking-wide">
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
            <div className="space-y-5">
              {currentOpeningSections.map((section, index) => (
                <section key={section.title} className="border border-neutral-300 bg-white p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-black text-neutral-400">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 className="text-2xl font-black text-black">{section.title}</h2>
                      <ul className="mt-4 grid gap-3">
                        {section.items.map((item) => (
                          <li key={item} className="border-l-4 border-black pl-4 text-sm leading-7 text-neutral-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              ))}
              <Link href="/application-form" className="inline-block bg-black px-6 py-3 text-sm font-black uppercase tracking-wide text-white hover:bg-neutral-800">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
