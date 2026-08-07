"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

const contactFields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "E-mail", name: "email", type: "email", required: true },
  { label: "Phone Number", name: "phone", type: "tel", required: false },
  { label: "Subject", name: "subject", type: "text", required: true },
] as const;

type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, reset } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const submitContactForm = handleSubmit(async (values) => {
    setStatus("sending");

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.set(key, String(value || "").trim());
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Unable to submit contact enquiry");

      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  return (
    <form onSubmit={submitContactForm} className="mt-8 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {contactFields.map((field) => (
          <label key={field.name} className="grid gap-2 text-sm font-bold text-slate-900">
            {field.label}
            {field.required ? " *" : ""}
            <input
              {...register(field.name, { required: field.required })}
              type={field.type}
              className="rounded-2xl border border-brand-teal/15 bg-white/80 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-brand-teal/35 focus:shadow-[0_0_0_4px_rgba(91,192,187,0.12)]"
            />
          </label>
        ))}
      </div>
      <label className="grid gap-2 text-sm font-bold text-slate-900">
        Message *
        <textarea {...register("message", { required: true })} rows={6} className="rounded-2xl border border-brand-teal/15 bg-white/80 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-brand-teal/35 focus:shadow-[0_0_0_4px_rgba(91,192,187,0.12)]" />
      </label>
      <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-gradient-to-r from-brand-teal to-brand-dark px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-fit">
        {status === "sending" ? "Sending..." : "Submit"}
      </button>

      {status === "success" && (
        <p className="rounded-2xl border border-emerald-500/20 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          Thank you. Your enquiry has been submitted.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-2xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          Something went wrong. Please try again or contact us directly.
        </p>
      )}
    </form>
  );
}
