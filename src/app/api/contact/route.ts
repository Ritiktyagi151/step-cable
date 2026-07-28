import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const subject = String(form.get("subject") || "").trim();
  const message = String(form.get("message") || "").trim();
  const phone = String(form.get("phone") || "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (to && host && user && pass) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass }
    });

    await transporter.sendMail({
      to,
      from: process.env.SMTP_FROM || user,
      replyTo: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    });
  }

  return new NextResponse("Success", { status: 200 });
}
