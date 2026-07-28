import { PageHero } from "@/components/PageHero";
import type { SitePage } from "@/lib/content";

const offices = [
  {
    title: "Corporate Office",
    details: [
      "Address: 1/61, Lane No-1, Vishwas Nagar, Delhi - 110032",
      "Phone: 0120 6849500-99 (100 lines)",
      "E-mail: info@stepcable.com"
    ]
  },
  {
    title: "Company Manufacturing Unit",
    details: [
      "Address: G-1/52 to 59, RIICO Industrial Area Shahjahanpur, Distt-Alwar Rajasthan- 301706",
      "Phone: 0120 6849500-99 (100 lines)"
    ]
  },
  {
    title: "Registered Office",
    details: [
      "Address: 1/61, Lane No-1, Vishwas Nagar, Delhi - 110032",
      "Phone: 0120 6849500-99 (100 lines)"
    ]
  }
];

const contactFields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "E-mail", name: "email", type: "email", required: true },
  { label: "Phone Number", name: "phone", type: "tel", required: false },
  { label: "Subject", name: "subject", type: "text", required: true }
];

type ContactPageProps = {
  page: SitePage;
};

export function ContactPage({ page }: ContactPageProps) {
  return (
    <>
      <PageHero title={page.h1 || "Contact Us"} description="Connect with Step Cables for product enquiries, project support and business communication." image={page.image} />
      <section className="bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="space-y-5">
            {offices.map((office) => (
              <div key={office.title} className="border border-neutral-300 bg-white p-6">
                <h2 className="text-2xl font-black text-black">{office.title}</h2>
                <ul className="mt-4 grid gap-3">
                  {office.details.map((detail) => (
                    <li key={detail} className="border-l-4 border-black pl-4 text-sm leading-7 text-neutral-700">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-neutral-500">Write To Us</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-black">Send your enquiry</h2>
            <form className="mt-8 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactFields.map((field) => (
                  <label key={field.name} className="grid gap-2 text-sm font-bold text-black">
                    {field.label}
                    {field.required ? " *" : ""}
                    <input
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      className="border border-neutral-300 px-4 py-3 text-base font-normal text-black outline-none focus:border-black"
                    />
                  </label>
                ))}
              </div>
              <label className="grid gap-2 text-sm font-bold text-black">
                Message *
                <textarea name="message" required rows={6} className="border border-neutral-300 px-4 py-3 text-base font-normal text-black outline-none focus:border-black" />
              </label>
              <button type="submit" className="w-fit bg-black px-6 py-3 text-sm font-black uppercase tracking-wide text-white hover:bg-neutral-800">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
