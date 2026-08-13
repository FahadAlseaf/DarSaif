import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import { ZIGZAG_PATH } from "@/components/najdi/motifs";

export default async function ContactCtaSection() {
  const [t, locale] = await Promise.all([
    getTranslations("home"),
    getLocale(),
  ]);
  const arrow = locale === "ar" ? "↖" : "↗";

  return (
    <section
      aria-label={t("contactCta")}
      className="relative overflow-hidden bg-night text-center text-night-text"
    >
      <div className="mx-auto max-w-4xl px-6 pb-40 pt-32 md:pb-48 md:pt-40">
        <Reveal>
          <h2 className="mb-7 font-heading text-5xl font-extrabold leading-snug md:text-7xl">
            {t("ctaPre")}{" "}
            <span className="font-accent font-normal text-accent-soft">
              {t("ctaAccent")}
            </span>
            .
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mb-11 text-night-text-secondary">
            {t("contactSubline")}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-accent-soft px-9 py-4 text-base font-bold text-text-primary transition-transform hover:-translate-y-0.5"
          >
            {t("contactCta")} <span aria-hidden="true">{arrow}</span>
          </Link>
        </Reveal>
      </div>

      {/* Najdi crenellation line along the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-25"
      >
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="h-full w-full">
          <path
            d={ZIGZAG_PATH}
            fill="none"
            stroke="rgb(var(--color-accent))"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </section>
  );
}
