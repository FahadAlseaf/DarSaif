"use server";

import { Resend } from "resend";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<{ success: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  // Set CONTACT_EMAIL in .env.local — defaults to placeholder until configured
  const toEmail = process.env.CONTACT_EMAIL ?? "hello@darsaif.com";

  if (!apiKey) {
    console.error("[sendContactEmail] RESEND_API_KEY is not set");
    return { success: false };
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      // TODO: switch to verified sender domain (noreply@darsaif.com) before launch
      from: "DarSaif Website <onboarding@resend.dev>",
      to: toEmail,
      replyTo: data.email,
      subject: `New Inquiry — ${data.name} (${data.projectType})`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone ?? "—"}`,
        `Project Type: ${data.projectType}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    return { success: true };
  } catch (error) {
    console.error("[sendContactEmail] Failed to send email:", error);
    return { success: false };
  }
}
