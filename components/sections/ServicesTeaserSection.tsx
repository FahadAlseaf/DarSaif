import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllServicesSafe } from "@/sanity/lib/queries";
import Reveal from "@/components/ui/Reveal";

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
 * Services as numbered editorial rows (/01 … /04) on the dark chapter.
 * With no services in Sanity yet, four placeholder rows render from the
 * message files so the section never disappears.
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

  const rows =
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
    <section aria-label={t("title")} className="bg-night text-night-text">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-14 flex flex-wrap items-start justify-between gap-10">
          <Reveal>
            <h2 className="font-heading text-4xl font-extrabold leading-snug md:text-6xl">
              {th("servicesPre")}{" "}
              <span className="font-accent font-normal text-accent-soft">
                {th("servicesAccent")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-sm pt-2">
            <p className="mb-6 leading-loose text-night-text-secondary">
              {th("servicesIntro")}
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent-soft transition-colors hover:text-night-text"
            >
              {t("viewAll")} <span aria-hidden="true">{arrow}</span>
            </Link>
          </Reveal>
        </div>

        <div>
          {rows.map((row, i) => (
            <Reveal key={row.key} delay={i * 0.06}>
              <Link
                href="/services"
                className="group grid grid-cols-[3.5rem_1fr_2rem] items-center gap-5 border-t border-night-border py-9 transition-colors last:border-b hover:bg-night-surface md:grid-cols-[5rem_1fr_1.2fr_3rem] md:gap-8"
              >
                <span
                  className="font-accent text-xl text-accent-soft"
                  dir="ltr"
                  style={{ unicodeBidi: "isolate" }}
                >
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-2xl font-extrabold md:text-3xl">
                  {row.title}
                </span>
                {row.description && (
                  <span className="hidden text-sm leading-loose text-night-text-secondary md:block">
                    {row.description}
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="text-xl text-accent-soft transition-transform duration-300 group-hover:ltr:translate-x-1 group-hover:ltr:-translate-y-1 group-hover:rtl:-translate-x-1 group-hover:rtl:-translate-y-1"
                >
                  {arrow}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
