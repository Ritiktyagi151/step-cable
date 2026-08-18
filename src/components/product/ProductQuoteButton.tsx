"use client";

import { useState } from "react";
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
          "inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#5BC0BB] px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#3AA9A4]"
        }
      >
        Get a Quote
        <FaPaperPlane aria-hidden="true" className="text-xs" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-sm sm:py-10">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[8px] bg-white shadow-2xl shadow-slate-950/25">
            <button
              type="button"
              aria-label="Close quote form"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-[#5BC0BB] hover:text-white"
            >
              <FaXmark aria-hidden="true" />
            </button>

            <div className="bg-slate-950 p-6 pr-16 text-white sm:p-8 sm:pr-20">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5BC0BB]">Get a Quote</p>
              <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">{productName}</h2>
              {productCode ? <p className="mt-3 text-sm font-bold text-white/70">{productCode}</p> : null}
            </div>

            <form onSubmit={submitQuote} className="grid gap-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-black text-slate-900">
                  Name
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="h-12 rounded-[8px] border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#5BC0BB] focus:ring-4 focus:ring-[#5BC0BB]/10"
                  />
                </label>

                <label className="grid gap-2 text-sm font-black text-slate-900">
                  Phone
                  <input
                    {...register("phone", { required: true })}
                    type="tel"
                    className="h-12 rounded-[8px] border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#5BC0BB] focus:ring-4 focus:ring-[#5BC0BB]/10"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-black text-slate-900">
                  Email
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="h-12 rounded-[8px] border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#5BC0BB] focus:ring-4 focus:ring-[#5BC0BB]/10"
                  />
                </label>

                <label className="grid gap-2 text-sm font-black text-slate-900">
                  Quantity
                  <input
                    {...register("quantity")}
                    type="text"
                    className="h-12 rounded-[8px] border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#5BC0BB] focus:ring-4 focus:ring-[#5BC0BB]/10"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-black text-slate-900">
                Requirement
                <textarea
                  {...register("message", { required: true })}
                  rows={4}
                  className="resize-none rounded-[8px] border border-slate-200 px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#5BC0BB] focus:ring-4 focus:ring-[#5BC0BB]/10"
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-[#5BC0BB] px-6 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-[#5BC0BB]/20 transition hover:-translate-y-0.5 hover:bg-[#3AA9A4] disabled:cursor-not-allowed disabled:opacity-70"
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
      ) : null}
    </>
  );
}
