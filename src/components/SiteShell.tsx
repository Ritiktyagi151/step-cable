import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { FaWhatsapp } from "react-icons/fa";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800">
      <SiteHeader />
      <main className="pt-16 lg:pt-[104px]">{children}</main>
      <SiteFooter />
      <a
        href="https://wa.me/918448819330"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-slate-900/25 transition duration-300 hover:-translate-y-1 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      >
        <FaWhatsapp aria-hidden="true" className="text-3xl sm:text-4xl" />
      </a>
    </div>
  );
}
