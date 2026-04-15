import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function ContactCtaSection() {
  const t = await getTranslations("home");

  return (
    <section
      aria-label={t("contactCta")}
      className="py-32 px-6 border-t border-border text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        {/* Heading */}
        <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.04em] text-text-primary uppercase">
          {t("contactCta")}
        </h2>

        {/* Gold rule */}
        <div aria-hidden="true" className="w-12 h-px bg-accent opacity-60" />

        {/* Subline */}
        <p className="font-body text-sm tracking-[0.05em] text-text-secondary max-w-xs">
          {t("contactSubline")}
        </p>

        {/* CTA button */}
        <Link
          href="/contact"
          className="mt-2 inline-block font-body text-xs tracking-[0.3em] uppercase border border-accent text-accent px-10 py-4 hover:bg-accent hover:text-bg transition-colors duration-300"
        >
          {t("contactCta")}
        </Link>
      </div>
    </section>
  );
}
