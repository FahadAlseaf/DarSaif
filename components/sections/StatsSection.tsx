import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteSettings } from "@/sanity/lib/queries";
import Reveal from "@/components/ui/Reveal";
import StatsGrid, { type StatItem } from "./StatsGrid";

/** Dark "chapter" section: editorial headline + animated stat counters. */
export default async function StatsSection() {
  const [settings, t, locale] = await Promise.all([
    getSiteSettings(),
    getTranslations("home"),
    getLocale(),
  ]);
  const isRTL = locale === "ar";
  const arrow = isRTL ? "↖" : "↗";

  const sanityStats = settings?.stats ?? [];
  const usingPlaceholders = sanityStats.length === 0;

  const stats: StatItem[] = usingPlaceholders
    ? ([1, 2, 3, 4] as const).map((i) => ({
        value: t(`stat${i}Value`),
        label: t(`stat${i}Label`),
        description: t(`stat${i}Desc`),
      }))
    : sanityStats.map((s) => ({
        value: s.value,
        label: (isRTL && s.labelAr ? s.labelAr : s.label) ?? "",
        description:
          (isRTL && s.descriptionAr ? s.descriptionAr : s.description) ?? "",
      }));

  return (
    <section
      aria-label={`${t("statsHeading")} ${t("statsAccent")}`}
      className="bg-night text-night-text"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 flex flex-wrap items-start justify-between gap-10 md:mb-20">
          <Reveal>
            <h2 className="font-heading text-4xl font-extrabold leading-snug md:text-6xl">
              {t("statsHeading")}{" "}
              <span className="font-accent font-normal text-accent-soft">
                {t("statsAccent")}
              </span>
              .
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-sm pt-2">
            <p className="mb-6 leading-loose text-night-text-secondary">
              {t("statsIntro")}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-6 py-3 text-sm font-bold text-text-primary transition-transform hover:-translate-y-0.5"
            >
              {t("philosophyCta")} <span aria-hidden="true">{arrow}</span>
            </Link>
          </Reveal>
        </div>

        <StatsGrid stats={stats} />

        {usingPlaceholders && (
          <p className="mt-6 text-xs text-night-text-secondary/70">
            {t("statsNote")}
          </p>
        )}
      </div>
    </section>
  );
}
