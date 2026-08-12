import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllServicesSafe } from "@/sanity/lib/queries";
import Reveal from "@/components/ui/Reveal";
import StickyServiceCards, {
  type ServiceCard,
} from "./StickyServiceCards";

/** Extracts plain text from the first Portable Text block. */
function firstLineText(blocks: unknown): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  const first = blocks[0] as { children?: { text?: string }[] };
  return (first.children ?? [])
    .map((span) => span.text ?? "")
    .join("")
    .trim();
}

/**
 * V3 services — sticky stacked cards that pile up while scrolling.
 * Sanity services when present; four labeled placeholders otherwise.
 */
export default async function ServicesTeaserSection() {
  const [services, t, th, locale] = await Promise.all([
    getAllServicesSafe(),
    getTranslations("services"),
    getTranslations("home"),
    getLocale(),
  ]);

  const isRTL = locale === "ar";
  const arrow = isRTL ? "↖" : "↗";

  const cards: ServiceCard[] =
    services.length > 0
      ? services.slice(0, 4).map((service) => ({
          key: service._id,
          title: isRTL && service.titleAr ? service.titleAr : service.title,
          description: firstLineText(
            isRTL && service.descriptionAr
              ? service.descriptionAr
              : service.description
          ),
        }))
      : ([1, 2, 3, 4] as const).map((i) => ({
          key: `svc-ph-${i}`,
          title: th(`svcPh${i}Title`),
          description: th(`svcPh${i}Desc`),
        }));

  return (
    <section aria-label={t("title")} className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <h2 className="font-heading text-4xl font-extrabold leading-snug md:text-6xl">
              {th("servicesPre")}{" "}
              <span className="font-accent font-normal text-accent">
                {th("servicesAccent")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent transition-colors hover:text-text-primary"
            >
              {t("viewAll")} <span aria-hidden="true">{arrow}</span>
            </Link>
          </Reveal>
        </div>
        <Reveal>
          <p className="mb-12 text-sm text-text-secondary">{th("stackHint")}</p>
        </Reveal>

        <StickyServiceCards cards={cards} />
      </div>
    </section>
  );
}
