"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { FaBars, FaChevronDown, FaFacebookF, FaInstagram, FaLinkedinIn, FaMobileAlt, FaPhoneAlt, FaSearch, FaTimes, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { mainNavLinks, navGroups, topNavLinks } from "@/lib/navigation";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/stepCablesIndia/", Icon: FaFacebookF, className: "text-[#1877F2]" },
  { label: "X", href: "https://twitter.com/StepCablesIndia", Icon: FaXTwitter, className: "text-black" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/stepcablesindia/", Icon: FaLinkedinIn, className: "text-[#0A66C2]" },
  { label: "Instagram", href: "https://www.instagram.com/stepcablesofficial/", Icon: FaInstagram, className: "text-[#E4405F]" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCEh0fNj2-IXT4uLsgJ8rjXw", Icon: FaYoutube, className: "text-[#FF0000]" }
];

const reachUsFields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "E-mail", name: "email", type: "email", required: true },
  { label: "Phone Number", name: "phone", type: "tel", required: false },
  { label: "Subject", name: "subject", type: "text", required: true },
] as const;

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
      className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition duration-300 hover:bg-brand-teal/10 hover:text-brand-dark ${active ? "bg-brand-teal/10 text-brand-dark" : ""}`}
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
      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600 transition duration-300 hover:bg-brand-teal/10 hover:text-brand-dark ${active ? "bg-brand-teal/10 text-brand-dark" : ""}`}
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
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition duration-300 hover:bg-brand-teal/10 hover:text-brand-dark ${active ? "bg-brand-teal/10 text-brand-dark" : ""}`}
      >
        <span>{group.label}</span>
        <FaChevronDown aria-hidden="true" className="text-[10px] transition group-hover:rotate-180" />
      </Link>
      <div className="invisible absolute left-0 top-full w-72 pt-4 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100">
        <div className="rounded-[20px] border border-brand-teal/15 bg-white/78 shadow-xl shadow-slate-900/5 backdrop-blur-lg overflow-hidden py-2">
          {group.links.map(([label, href]) => (
            <Link key={href} href={href} className="block px-5 py-3 text-sm text-slate-600 transition duration-300 hover:bg-brand-teal/10 hover:text-brand-dark">
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
  const [reachFormOpen, setReachFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
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
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = search.trim();
    if (value) window.location.href = `/search?q=${encodeURIComponent(value)}`;
  };
  const openReachForm = () => {
    closeMenu();
    setReachFormOpen(true);
  };
  const submitReachForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReachFormOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const reachFormModal = reachFormOpen ? (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-sm sm:py-10">
      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[20px] border border-brand-teal/20 bg-white shadow-2xl shadow-slate-950/25 lg:grid-cols-[0.85fr_1.15fr]">
        <button
          type="button"
          aria-label="Close reach us form"
          onClick={() => setReachFormOpen(false)}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-700 shadow-lg transition duration-300 hover:bg-brand-teal hover:text-white"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <div className="relative min-h-72 overflow-hidden bg-slate-950 p-7 text-white sm:p-8 lg:min-h-full">
          <img src="/assets/img/cable-wires.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/45 to-brand-teal/35" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <div className="inline-flex rounded-2xl bg-white/90 p-3 shadow-xl shadow-black/20">
                <img src="/assetshome/img/logo-step.png" alt="Step Cables" className="h-12 w-auto" />
              </div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.32em] text-brand-teal">Wire & Conductor Manufacturing</p>
              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Connect with Step Cables</h2>
            </div>

            <div className="grid gap-3 text-sm font-semibold text-white/85">
              <a href="tel:01206849500" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur transition duration-300 hover:bg-white/15">
                0120 6849500-99 (100 lines)
              </a>
              <a href="tel:+918448819330" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur transition duration-300 hover:bg-white/15">
                +91 8448819330
              </a>
              <a href="mailto:info@stepcable.com" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur transition duration-300 hover:bg-white/15">
                info@stepcable.com
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="pr-12 text-xs font-black uppercase tracking-[0.32em] text-brand-dark">Reach Us</p>
          <h2 className="mt-4 pr-12 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">Send your enquiry</h2>
          <form onSubmit={submitReachForm} className="mt-8 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {reachUsFields.map((field) => (
                <label key={field.name} className="grid gap-2 text-sm font-bold text-slate-900">
                  {field.label}
                  {field.required ? " *" : ""}
                  <input
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    className="rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-brand-teal/35 focus:shadow-[0_0_0_4px_rgba(91,192,187,0.12)]"
                  />
                </label>
              ))}
            </div>
            <label className="grid gap-2 text-sm font-bold text-slate-900">
              Message *
              <textarea name="message" required rows={4} className="rounded-2xl border border-brand-teal/15 bg-white px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-brand-teal/35 focus:shadow-[0_0_0_4px_rgba(91,192,187,0.12)]" />
            </label>
            <button type="submit" className="w-fit rounded-full bg-gradient-to-r from-brand-teal to-brand-dark px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-teal/15 bg-white/78 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
      <div className="border-b border-brand-teal/10 bg-gray-600 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-2 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:01206849500" className="flex items-center gap-2 transition duration-300 hover:text-brand-dark">
              <FaPhoneAlt aria-hidden="true" className="text-xs text-brand-dark" />
              <span>0120 6849500-99 (100 lines)</span>
            </a>
            <a href="tel:+918448819330" className="flex items-center gap-2 transition duration-300 hover:text-brand-dark">
              <FaMobileAlt aria-hidden="true" className="text-brand-dark" />
              <span>+91 8448819330</span>
            </a>
          </div>
          <nav aria-label="Top navigation" className="hidden items-center gap-5 lg:flex">
            {topNavLinks.map(([label, href]) => (
              <TopBarLink key={href} href={href} label={label} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon, className }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-teal/15 bg-white/90 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand-teal/35 hover:bg-white"
              >
                <Icon aria-hidden="true" className={className} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-1.5 sm:px-6 lg:grid lg:grid-cols-[210px_minmax(0,1fr)_300px] lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <img src="/assetshome/img/logo-step.png" alt="Step Cables" className="h-10 w-auto" />
        </Link>

        <nav aria-label="Main navigation" className="hidden min-w-0 items-center justify-center gap-3 xl:gap-5 lg:flex">
          {mainNavLinks.map(([label, href]) => {
            const group = dropdownGroups.find((item) => item.label === label);
            return group ? <HeaderDropdown key={label} group={group} /> : <HeaderLink key={href} href={href} label={label} />;
          })}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <form onSubmit={submitSearch} className="relative w-36 xl:w-40">
            <label htmlFor="desktop-site-search" className="sr-only">
              Search
            </label>
            <input
              id="desktop-site-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              className="h-10 w-full rounded-full border border-brand-teal/15 bg-white/70 pl-10 pr-3 text-sm text-slate-700 outline-none transition duration-300 placeholder:text-slate-400 focus:border-brand-teal/50 focus:bg-white focus:shadow-[0_0_0_4px_rgba(91,192,187,0.12)]"
            />
            <FaSearch aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-brand-dark" />
          </form>
          <button type="button" onClick={openReachForm} className="rounded-full bg-gradient-to-r from-brand-teal to-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5">
            Reach Us
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-teal/15 bg-white/70 text-slate-800 shadow-sm lg:hidden"
        >
          {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="max-h-[calc(100vh-112px)] overflow-y-auto border-t border-brand-teal/15 bg-white/92 px-4 py-4 shadow-lg backdrop-blur-xl lg:hidden">
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
                className="h-11 w-full rounded-full border border-brand-teal/15 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-brand-teal/50"
              />
              <FaSearch aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-dark" />
            </form>
            <div className="grid gap-1 border-b border-brand-teal/15 pb-3">
              {topNavLinks.map(([label, href]) => (
                <HeaderLink key={href} href={href} label={label} onClick={closeMenu} />
              ))}
            </div>
            {mainNavLinks.map(([label, href]) => {
              const group = dropdownGroups.find((item) => item.label === label);
              if (!group) return <HeaderLink key={href} href={href} label={label} onClick={closeMenu} />;
              const expanded = Boolean(openGroups[group.label]);

              return (
                <div key={group.label} className="border-b border-brand-teal/15 py-1">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => toggleGroup(group.label)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-800"
                  >
                    <span>{group.label}</span>
                    <FaChevronDown aria-hidden="true" className={`text-xs transition ${expanded ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`${expanded ? "grid" : "hidden"} gap-1 pb-3 pl-4`}>
                    <Link href={group.href} onClick={closeMenu} className="py-2 text-sm font-semibold text-slate-800">
                      {group.label}
                    </Link>
                    {group.links.map(([itemLabel, itemHref]) => (
                      <Link key={itemHref} href={itemHref} onClick={closeMenu} className="py-2 text-sm text-slate-600">
                        {itemLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            <button type="button" onClick={openReachForm} className="mt-2 rounded-full bg-gradient-to-r from-brand-teal to-brand-dark px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5">
              Reach Us
            </button>
          </div>
        </nav>
      ) : null}
    </header>
    {mounted && reachFormModal ? createPortal(reachFormModal, document.body) : null}
    </>
  );
}
