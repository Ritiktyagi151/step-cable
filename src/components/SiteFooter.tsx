import Link from "next/link";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaMobileAlt, FaPhoneAlt, FaPinterestP, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { footerLinks, mainNavLinks, navGroups, topNavLinks } from "@/lib/navigation";

const socialLinks = [
  { label: "Phone", href: "tel:01206849500", Icon: FaPhoneAlt, className: "text-brand-dark" },
  { label: "E-mail", href: "mailto:info@stepcable.com", Icon: FaEnvelope, className: "text-[#EA4335]" },
  { label: "WhatsApp", href: "https://wa.me/918448819330", Icon: FaWhatsapp, className: "text-[#25D366]" },
  { label: "Pinterest", href: "https://www.pinterest.com/search/pins/?q=Step%20Cables", Icon: FaPinterestP, className: "text-[#E60023]" },
  { label: "Location", href: "https://www.google.com/maps/search/?api=1&query=Stellar%20Okas%201425%203rd%20floor%20Noida%20Sector-142%20UP-201305", Icon: FaMapMarkerAlt, className: "text-[#34A853]" },
  { label: "X", href: "https://twitter.com/StepCablesIndia", Icon: FaXTwitter, className: "text-black" },
  { label: "Facebook", href: "https://facebook.com/stepCablesIndia/", Icon: FaFacebookF, className: "text-[#1877F2]" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/stepcablesindia/", Icon: FaLinkedinIn, className: "text-[#0A66C2]" },
  { label: "Instagram", href: "https://www.instagram.com/stepcablesofficial/", Icon: FaInstagram, className: "text-[#E4405F]" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCEh0fNj2-IXT4uLsgJ8rjXw", Icon: FaYoutube, className: "text-[#FF0000]" }
];

const businessLinks: Array<[string, string]> = navGroups.flatMap((group) =>
  group.label === "Step Cables" || group.label === "Conductor" ? group.links.slice(0, 6).map(([label, href]) => [label, href] as [string, string]) : []
);

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">{children}</h2>;
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm leading-6 text-white/72 transition duration-300 hover:text-brand-teal">
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-teal/15 bg-[url('/images/footer-bg.jpg')] bg-cover bg-center text-white lg:bg-fixed">
      <div className="absolute inset-0 bg-black/72 backdrop-blur-[1px]" />
      <div className="bg-[linear-gradient(rgba(91,192,187,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(91,192,187,0.08)_1px,transparent_1px)] bg-[size:44px_44px] absolute inset-0 opacity-45" />
      {/* <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-[88rem] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="border border-white/10 p-5">
            <div className="flex items-center gap-3">
              <FaPhoneAlt aria-hidden="true" className="text-lg" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">Call Us</p>
                <a href="tel:01206849500" className="text-sm font-semibold text-white hover:text-neutral-300">
                  0120 6849500-99 (100 lines)
                </a>
              </div>
            </div>
          </div>
          <div className="border border-white/10 p-5">
            <div className="flex items-center gap-3">
              <FaMobileAlt aria-hidden="true" className="text-lg" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">Mobile</p>
                <a href="tel:+918448819330" className="text-sm font-semibold text-white hover:text-neutral-300">
                  +91 8448819330
                </a>
              </div>
            </div>
          </div>
          <div className="border border-white/10 p-5">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt aria-hidden="true" className="text-lg" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">Corporate Enquiry</p>
                <Link href="/contact" className="text-sm font-semibold text-white hover:text-neutral-300">
                  Reach Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="relative mx-auto grid max-w-[88rem] grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:gap-10 lg:grid-cols-[1.25fr_0.75fr_0.95fr_0.95fr_1.2fr] lg:px-8">
        <div className="col-span-2 lg:col-span-1">
          <img src="/assetshome/img/logo-step.png" alt="Step Cables" className="h-14 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/78">
            Step Cables delivers wires, power cables, aluminum conductors and EPC business solutions for residential, industrial, utility and infrastructure applications.
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
            Built around quality assurance, reliable manufacturing and project-ready support, the company serves customers across electrical distribution and construction segments.
          </p>
          <div className="mt-6 grid w-fit grid-cols-5 gap-2">
            {socialLinks.map(({ label, href, Icon, className }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/90 transition duration-300 hover:-translate-y-0.5 hover:border-brand-teal/35 hover:bg-white"
              >
                <Icon aria-hidden="true" className={className} />
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <FooterHeading>Quick Links</FooterHeading>
          <div className="mt-5 grid gap-2">
            {[...mainNavLinks, ...topNavLinks].map(([label, href]) => (
              <FooterLink key={`${label}-${href}`} href={href} label={label} />
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <FooterHeading>Products</FooterHeading>
          <div className="mt-5 grid gap-2">
            {footerLinks.map(([label, href]) => (
              <FooterLink key={href} href={href} label={label} />
            ))}
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 lg:col-span-1">
          <FooterHeading>Business</FooterHeading>
          <div className="mt-5 grid gap-2">
            {businessLinks.map(([label, href]) => (
              <FooterLink key={href} href={href} label={label} />
            ))}
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <FooterHeading>Contact Details</FooterHeading>
          <div className="mt-5 grid gap-5 text-sm leading-6 text-white/72">
            <div>
              <p className="font-semibold text-white">Corporate Office</p>
              <p className="mt-1">1/61, Lane No-1, Vishwas Nagar, Delhi - 110032</p>
            </div>
            <div>
              <p className="font-semibold text-white">Manufacturing Unit</p>
              <p className="mt-1">G-1/52 to 59, RIICO Industrial Area Shahjahanpur, Distt-Alwar, Rajasthan - 301706</p>
            </div>
            <div>
              <p className="font-semibold text-white">Registered Office</p>
              <p className="mt-1">1/61, Lane No-1, Vishwas Nagar, Delhi - 110032</p>
            </div>
            <div className="grid gap-2 border-t border-white/15 pt-5">
              <a href="tel:01206849500" className="hover:text-brand-teal">
                Phone: 0120 6849500-99 (100 lines)
              </a>
              <a href="tel:+918448819330" className="hover:text-brand-teal">
                Mobile: +91 8448819330
              </a>
              <a href="mailto:info@stepcable.com" className="hover:text-brand-teal">
                E-mail: info@stepcable.com
              </a>
              <Link href="/contact" className="rounded-full bg-gradient-to-r from-brand-teal to-brand-dark text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5 mt-2 inline-flex w-fit px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/15 bg-black/45 px-4 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-3 text-xs text-white/72 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Step Cables. All rights reserved.</p>
          <p className="font-semibold text-white/82">Design and develop by <a href="https://www.jaikvik.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal">
            Jaikvik Technology India Pvt Ltd
          </a> </p>
        </div>
      </div>
    </footer>
  );
}
