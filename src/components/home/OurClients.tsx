import Link from "next/link";
import { getPageBySlug } from "@/lib/content";

export function OurClients() {
  const clientsPage = getPageBySlug("clients1");
  const logos = (clientsPage?.contentBlocks || [])
    .filter((block) => block.type === "image")
    .map((block) => ({ src: block.src, alt: block.alt }))
    .slice(0, 18);

  if (!logos.length) return null;

  return (
    <section className="overflow-hidden border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-neutral-500">Our Clients</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-black">Trusted by public, industrial and corporate organizations.</h2>
          </div>
          <Link href="/clients1" className="w-fit border border-black px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-black hover:text-white">
            View All Clients
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {logos.slice(0, 12).map((logo) => (
            <div key={`${logo.src}-${logo.alt}`} className="flex h-36 items-center justify-center bg-white p-4 transition hover:bg-neutral-50 sm:p-6">
              <img src={logo.src} alt={logo.alt} className="max-h-24 w-full object-contain transition duration-300 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-black py-4">
        <div className="client-logo-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[...logos, ...logos].map((logo, index) => (
            <div key={`${logo.src}-${index}`} className="flex h-20 w-56 items-center justify-center bg-white px-5">
              <img src={logo.src} alt={logo.alt} className="max-h-14 w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
