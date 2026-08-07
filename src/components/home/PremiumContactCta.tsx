import { FaArrowRight, FaEnvelope, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import type { CSSProperties } from "react";

function ContactCard() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/75 p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] backdrop-blur-xl transition-all duration-500 hover:border-white hover:shadow-[0_25px_70px_-15px_rgba(8,119,255,0.12)] sm:p-4 lg:grid lg:grid-cols-12 lg:gap-6 lg:p-5">
      
      {/* Left Media Side - Taking 5 Columns in Large View */}
      <div className="relative min-h-[320px] overflow-hidden rounded-2xl sm:min-h-[400px] lg:col-span-5 lg:min-h-[500px]">
        <img
          src="/assets/img/Step-Cables-Contact.jpg"
          alt="Step Cable contact"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        
        {/* Soft Multi-layer Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-slate-950/80 lg:via-slate-950/40 lg:to-transparent" />
        
        {/* Top Floating Tag */}
        <div className="absolute left-6 top-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            24/7 Priority Support
          </span>
        </div>

        {/* Floating Quick Action Pills */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href="tel:+918448819330"
            className="group/btn flex items-center gap-3.5 rounded-2xl border border-white/15 bg-slate-950/50 p-2.5 pr-5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-950/70 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 transition-transform group-hover/btn:scale-110">
              <FaPhoneAlt className="text-sm" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">Call Us Direct</span>
              <span className="text-sm font-bold text-white">+91 8448819330</span>
            </div>
          </a>

          <a
            href="mailto:info@stepcable.com"
            className="group/btn flex items-center gap-3.5 rounded-2xl border border-white/15 bg-slate-950/50 p-2.5 pr-5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-blue-400/50 hover:bg-slate-950/70 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 transition-transform group-hover/btn:scale-110">
              <FaEnvelope className="text-sm" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">Email Support</span>
              <span className="text-sm font-bold text-white">info@stepcable.com</span>
            </div>
          </a>
        </div>
      </div>

      {/* Right Content Side - Taking 7 Columns */}
      <div className="relative flex flex-col justify-between rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-slate-100/80 p-6 sm:p-10 lg:col-span-7 lg:p-12">
        <div>
          {/* Header Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0877ff]">
            Contact Step Cable
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            Need product support or a project quote?
          </h2>

          <p className="mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
            Connect with our expert team for high-quality wires, cables, conductors, and nationwide retail supply solutions across India.
          </p>

          {/* Clean Modern Grid Pills */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Product Enquiries",
              "Dealer & Partner Support",
              "Bulk Commercial Supply",
              "Technical Project Guidance",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all hover:border-blue-200 hover:bg-white hover:shadow-md"
              >
                <FaCheckCircle className="text-base text-[#0877ff]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="/contact"
            className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#0877ff] px-8 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:bg-[#0062db] hover:shadow-xl hover:shadow-blue-500/40"
          >
            <span>Let&apos;s Connect</span>
            <FaArrowRight
              aria-hidden="true"
              className="text-sm transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </a>

          <span className="text-xs font-semibold text-slate-500">
            ⚡ Quick response guaranteed within 24 hours
          </span>
        </div>
      </div>
    </div>
  );
}

export function PremiumContactCta() {
  const mirrorMaskStyle: CSSProperties = {
    transform: "scaleY(-0.95) translateY(-4px)",
    transformOrigin: "top",
    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.08) 25%, transparent 60%)",
    maskImage:
      "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.08) 25%, transparent 60%)",
  };

  return (
    <section className="relative overflow-hidden bg-[#e4e2dd] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-amber-200/30 blur-[100px]" />

      {/* Main Full-Width Wrapper Container */}
      <div className="relative mx-auto max-w-[1360px]">
        {/* Primary Visible Card */}
        <div className="relative z-10">
          <ContactCard />
        </div>

        {/* Floor Seam Line Shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-full z-20 -mt-1.5 hidden h-4 bg-gradient-to-b from-black/20 via-black/5 to-transparent blur-[2px] sm:block"
        />

        {/* Mirror Floor Reflection Container */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-full z-0 hidden select-none opacity-80 blur-[0.8px] sm:block"
          style={mirrorMaskStyle}
        >
          <ContactCard />
        </div>

        {/* Diffused Floor Glow/Shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-16 top-full z-0 hidden h-36 rounded-full bg-slate-900/15 blur-3xl sm:block"
        />
      </div>
    </section>
  );
}

export default PremiumContactCta;