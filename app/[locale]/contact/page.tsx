import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";

export async function generateMetadata() {
  const [tc, tm] = await Promise.all([
    getTranslations("contact"),
    getTranslations("meta"),
  ]);
  const title = tc("title");
  const description = tm("contactDescription");
  return { title, description, openGraph: { title, description } };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  // Set NEXT_PUBLIC_WHATSAPP in .env.local — e.g. 966501234567 (no + or spaces)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP ?? "";
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "#";

  return (
    <div className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      {/* Page heading */}
      <h1 className="font-heading text-sm tracking-[0.3em] uppercase text-text-secondary mb-16">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-16 lg:gap-24 items-start">
        {/* ── Contact form ───────────────────────────────────────────── */}
        <ContactForm />

        {/* ── Sidebar: WhatsApp + Office info ────────────────────────── */}
        <aside className="flex flex-col gap-12">
          {/* WhatsApp */}
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary mb-4">
              WhatsApp
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-body text-xs tracking-[0.25em] uppercase text-text-primary border border-border px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
            >
              {t("whatsapp")}
            </a>
          </div>

          {/* Office address */}
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary mb-4">
              {t("officeLabel")}
            </p>
            <address className="not-italic font-heading text-xl leading-snug text-text-primary">
              {t("address")}
            </address>
          </div>

          {/* Map — replace the div below with a Google Maps embed iframe once the
              exact office address/pin is confirmed. Aspect ratio matches typical
              embedded map proportions. */}
          <div
            aria-label="Office location map"
            className="w-full aspect-[4/3] bg-surface border border-border"
          />
        </aside>
      </div>
    </div>
  );
}
