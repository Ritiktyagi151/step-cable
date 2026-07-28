import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaMobileAlt, FaPhoneAlt, FaTwitter, FaYoutube } from "react-icons/fa";
import { footerLinks, mainNavLinks, navGroups, topNavLinks } from "@/lib/navigation";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/stepCablesIndia/", Icon: FaFacebookF },
  { label: "Twitter", href: "https://twitter.com/StepCablesIndia", Icon: FaTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/stepcablesindia/", Icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/stepcablesofficial/", Icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCEh0fNj2-IXT4uLsgJ8rjXw", Icon: FaYoutube }
];

const businessLinks: Array<[string, string]> = navGroups.flatMap((group) =>
  group.label === "Step Cables" || group.label === "Conductor" ? group.links.slice(0, 6).map(([label, href]) => [label, href] as [string, string]) : []
);

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">{children}</h2>;
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm leading-6 text-neutral-300 transition hover:text-white">
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
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

      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.95fr_0.95fr_1.2fr] lg:px-8">
        <div>
          <img src="/assetshome/img/logo-step.png" alt="Step Cables" className="h-14 w-auto brightness-0 invert" />
          <p className="mt-5 max-w-md text-sm leading-7 text-neutral-300">
            Step Cables delivers wires, power cables, aluminum conductors and EPC business solutions for residential, industrial, utility and infrastructure applications.
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-neutral-400">
            Built around quality assurance, reliable manufacturing and project-ready support, the company serves customers across electrical distribution and construction segments.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <div className="mt-5 grid gap-2">
            {[...mainNavLinks, ...topNavLinks].map(([label, href]) => (
              <FooterLink key={`${label}-${href}`} href={href} label={label} />
            ))}
          </div>
        </div>

        <div>
          <FooterHeading>Products</FooterHeading>
          <div className="mt-5 grid gap-2">
            {footerLinks.map(([label, href]) => (
              <FooterLink key={href} href={href} label={label} />
            ))}
          </div>
        </div>

        <div>
          <FooterHeading>Business</FooterHeading>
          <div className="mt-5 grid gap-2">
            {businessLinks.map(([label, href]) => (
              <FooterLink key={href} href={href} label={label} />
            ))}
          </div>
        </div>

        <div>
          <FooterHeading>Contact Details</FooterHeading>
          <div className="mt-5 grid gap-5 text-sm leading-6 text-neutral-300">
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
            <div className="grid gap-2 border-t border-white/10 pt-5">
              <a href="tel:01206849500" className="hover:text-white">
                Phone: 0120 6849500-99 (100 lines)
              </a>
              <a href="tel:+918448819330" className="hover:text-white">
                Mobile: +91 8448819330
              </a>
              <a href="mailto:info@stepcable.com" className="hover:text-white">
                E-mail: info@stepcable.com
              </a>
              <Link href="/contact" className="mt-2 inline-flex w-fit border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-black">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-3 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Step Cables. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/sitemap" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
