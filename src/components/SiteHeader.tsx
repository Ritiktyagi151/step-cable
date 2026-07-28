"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaChevronDown, FaFacebookF, FaInstagram, FaLinkedinIn, FaMobileAlt, FaPhoneAlt, FaSearch, FaTimes, FaTwitter, FaYoutube } from "react-icons/fa";
import { mainNavLinks, navGroups, topNavLinks } from "@/lib/navigation";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/stepCablesIndia/", Icon: FaFacebookF },
  { label: "Twitter", href: "https://twitter.com/StepCablesIndia", Icon: FaTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/stepcablesindia/", Icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/stepcablesofficial/", Icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCEh0fNj2-IXT4uLsgJ8rjXw", Icon: FaYoutube }
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function HeaderLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`py-2 text-sm font-semibold text-neutral-800 transition hover:text-black ${active ? "border-b-2 border-black text-black" : ""}`}
    >
      {label}
    </Link>
  );
}

function TopBarLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`py-1 text-xs font-semibold text-white/85 transition hover:text-white ${active ? "border-b border-white text-white" : ""}`}
    >
      {label}
    </Link>
  );
}

function HeaderDropdown({ group }: { group: (typeof navGroups)[number] }) {
  const pathname = usePathname();
  const active = isActive(pathname, group.href) || group.links.some(([, href]) => isActive(pathname, href));

  return (
    <div className="group relative">
      <Link
        href={group.href}
        className={`flex items-center gap-1.5 py-2 text-sm font-semibold text-neutral-800 transition hover:text-black ${active ? "border-b-2 border-black text-black" : ""}`}
      >
        <span>{group.label}</span>
        <FaChevronDown aria-hidden="true" className="text-[10px] transition group-hover:rotate-180" />
      </Link>
      <div className="invisible absolute left-0 top-full w-64 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <div className="border border-neutral-200 bg-white py-2 shadow-lg">
          {group.links.map(([label, href]) => (
            <Link key={href} href={href} className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const dropdownGroups = navGroups.filter((group) => ["About", "EPC Business", "Step Cables", "Conductor"].includes(group.label));
  const closeMenu = () => {
    setOpen(false);
    setOpenGroups({});
  };
  const toggleGroup = (label: string) => {
    setOpenGroups((current) => ({ ...current, [label]: !current[label] }));
  };
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = search.trim();
    if (value) window.location.href = `/search?q=${encodeURIComponent(value)}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 bg-black text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-2 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:01206849500" className="flex items-center gap-2 hover:text-neutral-200">
              <FaPhoneAlt aria-hidden="true" className="text-xs" />
              <span>0120 6849500-99 (100 lines)</span>
            </a>
            <a href="tel:+918448819330" className="flex items-center gap-2 hover:text-neutral-200">
              <FaMobileAlt aria-hidden="true" />
              <span>+91 8448819330</span>
            </a>
          </div>
          <nav aria-label="Top navigation" className="hidden items-center gap-5 lg:flex">
            {topNavLinks.map(([label, href]) => (
              <TopBarLink key={href} href={href} label={label} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center border border-white/35 text-white transition hover:border-white hover:bg-neutral-900 hover:text-white"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py- sm:px-6 lg:grid lg:grid-cols-[220px_1fr_330px] lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <img src="/assetshome/img/logo-step.png" alt="Step Cables" className="h-12 w-auto" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center justify-center gap-6 lg:flex">
          {mainNavLinks.map(([label, href]) => {
            const group = dropdownGroups.find((item) => item.label === label);
            return group ? <HeaderDropdown key={label} group={group} /> : <HeaderLink key={href} href={href} label={label} />;
          })}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <form onSubmit={submitSearch} className="relative w-40">
            <label htmlFor="desktop-site-search" className="sr-only">
              Search
            </label>
            <input
              id="desktop-site-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              className="h-10 w-full border border-neutral-300 bg-white pl-9 pr-3 text-sm text-black outline-none transition placeholder:text-neutral-500 focus:border-black"
            />
            <FaSearch aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500" />
          </form>
          <Link href="/contact" className="bg-black px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-neutral-800 hover:!text-white">
            Reach Us
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center border border-neutral-300 text-black lg:hidden"
        >
          {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="max-h-[calc(100vh-112px)] overflow-y-auto border-t border-neutral-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            <form onSubmit={submitSearch} className="relative mb-2">
              <label htmlFor="mobile-site-search" className="sr-only">
                Search
              </label>
              <input
                id="mobile-site-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                className="h-11 w-full border border-neutral-300 bg-white pl-10 pr-3 text-sm text-black outline-none transition placeholder:text-neutral-500 focus:border-black"
              />
              <FaSearch aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500" />
            </form>
            <div className="grid gap-1 border-b border-neutral-200 pb-3">
              {topNavLinks.map(([label, href]) => (
                <HeaderLink key={href} href={href} label={label} onClick={closeMenu} />
              ))}
            </div>
            {mainNavLinks.map(([label, href]) => {
              const group = dropdownGroups.find((item) => item.label === label);
              if (!group) return <HeaderLink key={href} href={href} label={label} onClick={closeMenu} />;
              const expanded = Boolean(openGroups[group.label]);

              return (
                <div key={group.label} className="border-b border-neutral-200 py-1">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => toggleGroup(group.label)}
                    className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-black"
                  >
                    <span>{group.label}</span>
                    <FaChevronDown aria-hidden="true" className={`text-xs transition ${expanded ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`${expanded ? "grid" : "hidden"} gap-1 pb-3 pl-4`}>
                    <Link href={group.href} onClick={closeMenu} className="py-2 text-sm font-semibold text-neutral-900">
                      {group.label}
                    </Link>
                    {group.links.map(([itemLabel, itemHref]) => (
                      <Link key={itemHref} href={itemHref} onClick={closeMenu} className="py-2 text-sm text-neutral-700">
                        {itemLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            <Link href="/contact" onClick={closeMenu} className="mt-2 bg-black px-4 py-3 text-center text-sm font-semibold !text-white transition hover:bg-neutral-800 hover:!text-white">
              Reach Us
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
