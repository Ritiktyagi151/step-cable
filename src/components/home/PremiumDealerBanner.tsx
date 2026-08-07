"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaHeadset, FaNetworkWired, FaPaperPlane, FaStore, FaTruckFast } from "react-icons/fa6";

const retailerBenefits = [
  [FaStore, "Retail-ready range"],
  [FaTruckFast, "Dispatch support"],
  [FaHeadset, "Enquiry assistance"],
] as const;

type DealerFormValues = {
  name: string;
  phone: string;
  email: string;
  businessType: "Retailer" | "Distributor";
  city?: string;
  message: string;
};

export function PremiumDealerBanner() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, reset } = useForm<DealerFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      businessType: "Retailer",
      city: "",
      message: "",
    },
  });

  const submitDealerForm = handleSubmit(async (values) => {
    setStatus("sending");

    try {
      const formData = new FormData();
      const city = values.city?.trim() || "";
      const message = values.message.trim();
      const businessType = values.businessType || "Retailer";
      formData.set("subject", `Become a ${businessType} Enquiry`);
      formData.set("name", values.name.trim());
      formData.set("phone", values.phone.trim());
      formData.set("email", values.email.trim());
      if (city) {
        formData.set("message", `Business Type: ${businessType}\nCity / Area: ${city}\n\n${message}`);
      } else {
        formData.set("message", `Business Type: ${businessType}\n\n${message}`);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Unable to submit retailer enquiry");

      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  return (
    <section className="premium-reveal bg-[#171717] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[520px] overflow-hidden p-6 sm:p-8 lg:p-10">
          <img
            src="/assets/img/Project-Monitoring-Step-Industries.jpg"
            alt="Step Cable dealer and retailer support"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-38"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-[#0877ff]/35" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0877ff] text-white shadow-lg shadow-blue-500/20">
                <FaNetworkWired aria-hidden="true" className="text-xl" />
              </span>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.32em] text-[#6db1ff]">
                Retailer & Distributor Network
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight sm:text-5xl">
                Become a retailer or distributor for Step Cable.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/78">
                Retailer ya distributor banne ke liye apni details share karein. Hamari team product range, availability aur channel support ke liye connect karegi.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {retailerBenefits.map(([Icon, label]) => (
                <div key={label} className="rounded-[8px] border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <Icon aria-hidden="true" className="text-lg text-[#6db1ff]" />
                  <p className="mt-3 text-sm font-black leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={submitDealerForm} className="grid gap-4 bg-[#f5f4f1] p-6 text-[#171717] sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0877ff]">
              Become a Partner
            </p>
            <h3 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
              Retailer / Distributor enquiry bhejein.
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-black">
              Name
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your name"
                className="h-12 rounded-[8px] border border-black/10 bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#0877ff] focus:ring-4 focus:ring-[#0877ff]/10"
              />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Phone
              <input
                {...register("phone", { required: true })}
                type="tel"
                placeholder="Mobile number"
                className="h-12 rounded-[8px] border border-black/10 bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#0877ff] focus:ring-4 focus:ring-[#0877ff]/10"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-black">
              I want to become
              <select
                {...register("businessType", { required: true })}
                className="h-12 rounded-[8px] border border-black/10 bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#0877ff] focus:ring-4 focus:ring-[#0877ff]/10"
              >
                <option value="Retailer">Retailer</option>
                <option value="Distributor">Distributor</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black">
              Email
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email@example.com"
                className="h-12 rounded-[8px] border border-black/10 bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#0877ff] focus:ring-4 focus:ring-[#0877ff]/10"
              />
            </label>
            <label className="grid gap-2 text-sm font-black">
              City / Area
              <input
                {...register("city")}
                type="text"
                placeholder="Your market area"
                className="h-12 rounded-[8px] border border-black/10 bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#0877ff] focus:ring-4 focus:ring-[#0877ff]/10"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-black">
            Requirement
            <textarea
              {...register("message", { required: true })}
              placeholder="Apni market, product interest aur requirement ke baare mein batayein"
              rows={4}
              className="resize-none rounded-[8px] border border-black/10 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#0877ff] focus:ring-4 focus:ring-[#0877ff]/10"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-[#0877ff] px-6 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#005fd0] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "sending" ? "Sending..." : "Submit Enquiry"}
            <FaPaperPlane aria-hidden="true" />
          </button>

          {status === "success" && (
            <p className="rounded-[8px] border border-emerald-500/20 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              Thank you. Your retailer enquiry has been submitted.
            </p>
          )}
          {status === "error" && (
            <p className="rounded-[8px] border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
