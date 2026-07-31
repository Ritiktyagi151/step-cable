"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { FaBars, FaChevronDown, FaFacebookF, FaInstagram, FaLinkedinIn, FaMobileAlt, FaPhoneAlt, FaSearch, FaTimes, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import blogPostsData from "@/data/static-blog-posts.json";
import pagesData from "@/data/static-pages.json";
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

type SearchItem = {
  title: string;
  href: string;
  description: string;
  type: "Page" | "Blog";
  haystack: string;
};

type SearchSuggestionListProps = {
  suggestions: SearchItem[];
  visible: boolean;
  onSelect: () => void;
};

const searchItems: SearchItem[] = [
  ...pagesData.map((page) => ({
    title: page.h1 || page.title,
    href: page.url,
    description: page.description || page.contentText,
    type: "Page" as const,
    haystack: `${page.h1} ${page.title} ${page.description} ${page.keywords ?? ""} ${page.contentText}`.toLowerCase()
  })),
  ...blogPostsData.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    description: post.description || post.excerpt || post.contentText,
    type: "Blog" as const,
    haystack: `${post.title} ${post.description} ${post.keywords ?? ""} ${post.excerpt ?? ""} ${post.contentText}`.toLowerCase()
  }))
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
      className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition duration-300 hover:bg-brand-teal/10 hover:text-brand-dark lg:px-2 lg:text-xs xl:px-2.5 xl:text-[13px] 2xl:px-3 2xl:text-sm ${active ? "bg-brand-teal/10 text-brand-dark" : ""}`}
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
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition duration-300 hover:bg-brand-teal/10 hover:text-brand-dark lg:px-2 lg:text-xs xl:px-2.5 xl:text-[13px] 2xl:px-3 2xl:text-sm ${active ? "bg-brand-teal/10 text-brand-dark" : ""}`}
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

function SearchSuggestionList({ suggestions, visible, onSelect }: SearchSuggestionListProps) {
  if (!visible) return null;

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-[70] overflow-hidden rounded-2xl border border-brand-teal/15 bg-white shadow-2xl shadow-slate-900/15">
      {suggestions.length ? (
        suggestions.map((item) => (
          <Link
            key={`${item.type}-${item.href}`}
            href={item.href}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onSelect}
            className="block border-b border-brand-teal/10 px-4 py-3 text-left transition last:border-b-0 hover:bg-brand-teal/10"
          >
            <span className="text-[10px] font-black uppercase text-brand-dark">{item.type}</span>
            <span className="mt-1 block truncate text-sm font-bold text-slate-900">{item.title}</span>
            <span className="mt-1 block truncate text-xs text-slate-500">{item.description}</span>
          </Link>
        ))
      ) : (
        <div className="px-4 py-3 text-sm font-semibold text-slate-500">No suggestions found</div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [reachFormOpen, setReachFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const dropdownGroups = navGroups.filter((group) => ["About", "EPC Business", "Step Cables", "Conductor"].includes(group.label));
  const query = search.trim().toLowerCase();
  const suggestions = useMemo(() => {
    if (query.length < 2) return [];

    return searchItems
      .filter((item) => item.haystack.includes(query))
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aScore = aTitle.startsWith(query) ? 0 : aTitle.includes(query) ? 1 : 2;
        const bScore = bTitle.startsWith(query) ? 0 : bTitle.includes(query) ? 1 : 2;
        return aScore - bScore || a.title.localeCompare(b.title);
      })
      .slice(0, 6);
  }, [query]);
  const showSuggestions = searchFocused && query.length >= 2;
  const closeMenu = () => {
    setOpen(false);
    setOpenGroups({});
  };
  const closeSearch = () => {
    setSearchFocused(false);
    setDesktopSearchOpen(false);
    setMobileSearchOpen(false);
    closeMenu();
  };
  const toggleDesktopSearch = () => {
    setOpen(false);
    setOpenGroups({});
    setMobileSearchOpen(false);
    setDesktopSearchOpen((value) => !value);
  };
  const toggleMobileSearch = () => {
    setDesktopSearchOpen(false);
    setOpen(false);
    setOpenGroups({});
    setMobileSearchOpen((value) => !value);
  };
  const toggleGroup = (label: string) => {
    setOpenGroups((current) => ({ ...current, [label]: !current[label] }));
  };
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  useEffect(() => {
    if (mobileSearchOpen) mobileSearchInputRef.current?.focus();
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (desktopSearchOpen) desktopSearchInputRef.current?.focus();
  }, [desktopSearchOpen]);

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-teal/15 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
      <div className="hidden border-b border-brand-teal/10 bg-gray-600 text-white backdrop-blur-xl lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-8 py-2 text-sm">
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

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:grid lg:h-auto lg:grid-cols-[135px_minmax(0,1fr)_150px] lg:gap-3 lg:px-5 lg:py-2 xl:grid-cols-[170px_minmax(0,1fr)_170px] xl:gap-4 xl:px-6 2xl:grid-cols-[220px_minmax(0,1fr)_200px] 2xl:gap-5 2xl:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
          <span className="flex h-12 w-[76px] items-center overflow-visible sm:w-[82px] lg:h-12 lg:w-[76px] xl:h-12 xl:w-[84px] 2xl:h-14 2xl:w-[92px]">
            <img
              src="/assetshome/img/logo-step.png"
              alt="Step Cables"
              width={126}
              height={80}
              className="block h-auto max-h-12 w-full object-contain xl:max-h-14"
            />
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden min-w-0 items-center justify-center gap-0.5 xl:gap-1.5 2xl:gap-3 lg:flex">
          {mainNavLinks.map(([label, href]) => {
            const group = dropdownGroups.find((item) => item.label === label);
            return group ? <HeaderDropdown key={label} group={group} /> : <HeaderLink key={href} href={href} label={label} />;
          })}
        </nav>

        <div className="hidden min-w-0 items-center justify-end gap-2 xl:gap-3 lg:flex">
          <button
            type="button"
            aria-label="Open search"
            aria-expanded={desktopSearchOpen}
            onClick={toggleDesktopSearch}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-teal/20 bg-white/85 text-brand-dark shadow-sm transition hover:border-brand-teal/40 hover:bg-brand-teal/10"
          >
            {desktopSearchOpen ? <FaTimes aria-hidden="true" className="text-sm" /> : <FaSearch aria-hidden="true" className="text-sm" />}
          </button>
          <button type="button" onClick={openReachForm} className="rounded-full bg-gradient-to-r from-brand-teal to-brand-dark px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5 xl:px-6">
            Reach Us
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Open search"
            aria-expanded={mobileSearchOpen}
            onClick={toggleMobileSearch}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-teal/15 bg-white/80 text-brand-dark shadow-sm"
          >
            {mobileSearchOpen ? <FaTimes aria-hidden="true" className="text-sm" /> : <FaSearch aria-hidden="true" className="text-sm" />}
          </button>
          <a
            href="tel:+918448819330"
            aria-label="Call Step Cables"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-teal/15 bg-white/80 text-brand-dark shadow-sm"
          >
            <FaPhoneAlt aria-hidden="true" className="text-sm" />
          </a>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-teal/15 bg-white/80 text-slate-800 shadow-sm"
          >
            {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>

      {desktopSearchOpen ? (
        <form onSubmit={submitSearch} className="absolute right-6 top-[calc(100%+10px)] hidden w-[min(420px,calc(100vw-48px))] rounded-2xl border border-brand-teal/15 bg-white p-3 shadow-2xl shadow-slate-900/15 lg:block xl:right-8">
          <div className="relative">
            <label htmlFor="desktop-site-search" className="sr-only">
              Search
            </label>
            <input
              ref={desktopSearchInputRef}
              id="desktop-site-search"
              name="q"
              type="search"
              value={search}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products, pages, blogs"
              className="h-12 w-full rounded-full border border-brand-teal/20 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition duration-300 placeholder:text-slate-400 focus:border-brand-teal/50 focus:shadow-[0_0_0_4px_rgba(91,192,187,0.12)]"
            />
            <FaSearch aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-dark" />
            <div className="[&>div]:max-h-80 [&>div]:overflow-y-auto">
              <SearchSuggestionList suggestions={suggestions} visible={showSuggestions} onSelect={closeSearch} />
            </div>
          </div>
        </form>
      ) : null}

      {mobileSearchOpen ? (
        <form onSubmit={submitSearch} className="border-t border-brand-teal/15 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-xl lg:hidden">
          <div className="relative mx-auto flex max-w-7xl gap-2">
            <label htmlFor="mobile-header-search" className="sr-only">
              Search
            </label>
            <input
              ref={mobileSearchInputRef}
              id="mobile-header-search"
              name="q"
              type="search"
              value={search}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products, pages, blogs"
              className="h-11 min-w-0 flex-1 rounded-full border border-brand-teal/15 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-brand-teal/50"
            />
            <FaSearch aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-dark" />
            <button type="submit" className="h-11 rounded-full bg-brand-dark px-4 text-sm font-bold text-white shadow-sm">
              Search
            </button>
            <SearchSuggestionList suggestions={suggestions} visible={showSuggestions} onSelect={closeSearch} />
          </div>
        </form>
      ) : null}

      {open ? (
        <nav aria-label="Mobile navigation" className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-brand-teal/15 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            <div className="grid gap-2 border-b border-brand-teal/15 pb-3 text-sm font-semibold text-slate-700">
              <a href="tel:01206849500" className="flex items-center gap-2 rounded-xl px-3 py-2">
                <FaPhoneAlt aria-hidden="true" className="text-xs text-brand-dark" />
                <span>0120 6849500-99 (100 lines)</span>
              </a>
              <a href="tel:+918448819330" className="flex items-center gap-2 rounded-xl px-3 py-2">
                <FaMobileAlt aria-hidden="true" className="text-brand-dark" />
                <span>+91 8448819330</span>
              </a>
              <div className="flex items-center gap-2 px-3 pt-1">
                {socialLinks.map(({ label, href, Icon, className }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-teal/15 bg-white shadow-sm"
                  >
                    <Icon aria-hidden="true" className={className} />
                  </a>
                ))}
              </div>
            </div>
            <form onSubmit={submitSearch} className="relative mb-2">
              <label htmlFor="mobile-site-search" className="sr-only">
                Search
              </label>
              <input
                id="mobile-site-search"
                name="q"
                type="search"
                value={search}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                className="h-11 w-full rounded-full border border-brand-teal/15 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-brand-teal/50"
              />
              <FaSearch aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-dark" />
              <SearchSuggestionList suggestions={suggestions} visible={showSuggestions} onSelect={closeSearch} />
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
