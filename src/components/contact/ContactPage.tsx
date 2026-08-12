import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import type { SitePage } from "@/lib/content";

const offices = [
  {
    title: "Corporate Office",
    details: [
      "Address: K-10/40, Lower Ground Floor DLF City Phase-II Gurugram, Haryana-122008 India.",
      "Phone: 011-49771108-09-10",
      "Phone: 0120 6849500-99 (100 lines)",
      "E-mail: info@stepcable.com"
    ]
  },
  {
    title: "Company Manufacturing Unit",
    details: [
      "Address: G-1/52 to 59, RIICO Industrial Area Shahjahanpur, Distt-Alwar Rajasthan- 301706",
      "Phone: 01494235422",
      "Phone: 0120 6849500-99 (100 lines)",
      "E-mail: info@stepcable.com"
    ]
  },
  {
    title: "Registered Office",
    details: [
      "Address: 1/61, Lane No-1, Delhi-110032",
      "Phone: 0120 6849500-99 (100 lines)",
      "E-mail: info@stepcable.com"
    ]
  }
];

const quickDetails = [
  ["Sales Enquiry", "0120 6849500-99 (100 lines)"],
  ["Direct Support", "+91 8448819330"],
  ["Email Support", "info@stepcable.com"],
  ["Response", "Quick email assistance"]
] as const;

type ContactPageProps = {
  page: SitePage;
};

export function ContactPage({ page }: ContactPageProps) {
  return (
    <>
      <PageHero slug={page.slug} title={page.h1 || "Contact Us"} description="Connect with Step Cables for product enquiries, project support and business communication." image={page.image} />
      <section className="bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickDetails.map(([label, value]) => (
              <div key={label} className="rounded-[20px] border border-brand-teal/15 bg-white/82 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-brand-teal/35">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-dark">{label}</p>
                <p className="mt-3 text-base font-black leading-6 text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="space-y-5">
            {offices.map((office) => (
              <div key={office.title} className="rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-6">
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{office.title}</h2>
                <ul className="mt-4 grid gap-3">
                  {office.details.map((detail) => (
                    <li key={detail} className="border-l-4 border-brand-teal/35 pl-4 text-sm leading-7 text-slate-600">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-dark sm:tracking-[0.35em]">Write To Us</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">Send your enquiry</h2>
            <ContactForm />
          </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[20px] border border-brand-teal/15 bg-white/78 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-lg">
            <div className="px-3 pb-4 pt-2">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-dark">Location Map</p>
              <h2 className="mt-3 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">Find us on map</h2>
            </div>
            <iframe
              title="Step Cables location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.7336973094566!2d77.41126787528401!3d28.503074175735698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce956f0d8c11b%3A0x902f2d78535f0aef!2sStellar%201425!5e1!3m2!1sen!2sin!4v1786172442589!5m2!1sen!2sin"
              className="h-[300px] w-full rounded-2xl border-0 sm:h-[420px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </>
  );
}
