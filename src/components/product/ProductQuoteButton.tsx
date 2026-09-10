"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaXmark } from "react-icons/fa6";

type QuoteFormValues = {
  name: string;
  phone: string;
  email: string;
  quantity?: string;
  message: string;
};

type ProductQuoteButtonProps = {
  productName: string;
  productCode?: string;
  className?: string;
};

export function ProductQuoteButton({
  productName,
  productCode,
  className = "",
}: ProductQuoteButtonProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, reset } = useForm<QuoteFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      quantity: "",
      message: "",
    },
  });

  const submitQuote = handleSubmit(async (values) => {
    setStatus("sending");

    try {
      const formData = new FormData();
      const quantity = values.quantity?.trim();
      const codeLine = productCode ? `Product Code: ${productCode}\n` : "";

      formData.set("name", values.name.trim());
      formData.set("phone", values.phone.trim());
      formData.set("email", values.email.trim());
      formData.set("subject", `Product Quote Enquiry - ${productName}`);
      formData.set(
        "message",
        `Product: ${productName}\n${codeLine}${quantity ? `Quantity: ${quantity}\n` : ""}\nRequirement:\n${values.message.trim()}`
      );

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to submit quote enquiry");
      }

      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  const quoteModal =
    open && typeof document !== "undefined" ? (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/65 px-4 py-4 backdrop-blur-sm">
        <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-hidden rounded-[8px] bg-white shadow-2xl shadow-slate-950/25">
          <button
            type="button"
            aria-label="Close quote form"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-[#2486FE] hover:text-white"
          >
            <FaXmark aria-hidden="true" />
          </button>

          <div className="bg-slate-950 p-4 pr-16 text-white sm:p-5 sm:pr-20">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#2486FE]">Get a Quote</p>
            <h2 className="mt-2 text-lg font-black leading-tight sm:text-xl">{productName}</h2>
            {productCode ? <p className="mt-2 text-sm font-bold text-white/70">{productCode}</p> : null}
          </div>

          <form onSubmit={submitQuote} className="grid gap-3 p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-black text-slate-900">
                Name
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="h-10 rounded-[8px] border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#2486FE] focus:ring-4 focus:ring-[#2486FE]/10"
                />
              </label>

              <label className="grid gap-1.5 text-sm font-black text-slate-900">
                Phone
                <input
                  {...register("phone", { required: true })}
                  type="tel"
                  className="h-10 rounded-[8px] border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#2486FE] focus:ring-4 focus:ring-[#2486FE]/10"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-black text-slate-900">
                Email
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="h-10 rounded-[8px] border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#2486FE] focus:ring-4 focus:ring-[#2486FE]/10"
                />
              </label>

              <label className="grid gap-1.5 text-sm font-black text-slate-900">
                Quantity
                <input
                  {...register("quantity")}
                  type="text"
                  className="h-10 rounded-[8px] border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#2486FE] focus:ring-4 focus:ring-[#2486FE]/10"
                />
              </label>
            </div>

            <label className="grid gap-1.5 text-sm font-black text-slate-900">
              Requirement
              <textarea
                {...register("message", { required: true })}
                rows={2}
                className="resize-none rounded-[8px] border border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none transition focus:border-[#2486FE] focus:ring-4 focus:ring-[#2486FE]/10"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#2486FE] px-6 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-[#2486FE]/20 transition hover:-translate-y-0.5 hover:bg-[#0B6FE8] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? "Sending..." : "Submit Quote"}
              <FaPaperPlane aria-hidden="true" />
            </button>

            {status === "success" ? (
              <p className="rounded-[8px] border border-emerald-500/20 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                Thank you. Your quote enquiry has been submitted successfully.
              </p>
            ) : null}

            {status === "error" ? (
              <p className="rounded-[8px] border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                Something went wrong. Please try again or contact us directly.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setStatus("idle");
          setOpen(true);
        }}
        className={
          className ||
          "inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#2486FE] px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0B6FE8]"
        }
      >
        Get a Quote
        <FaPaperPlane aria-hidden="true" className="text-xs" />
      </button>

      {quoteModal ? createPortal(quoteModal, document.body) : null}
    </>
  );
}
