import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllServices } from "@/sanity/lib/queries";

/** Extracts plain text from the first Portable Text block. */
function firstLineText(blocks: unknown): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  const first = blocks[0] as { children?: { text?: string }[] };
  return (first.children ?? [])
    .map((span) => span.text ?? "")
    .join("")
    .trim();
}

export default async function ServicesTeaserSection() {
  const [services, t, locale] = await Promise.all([
    getAllServices(),
    getTranslations("services"),
    getLocale(),
  ]);

  // Section is invisible until services are added in Sanity
  if (services.length === 0) return null;

  const isRTL = locale === "ar";
  const displayed = services.slice(0, 4);

  return (
    <section
      aria-label={t("title")}
      className="py-24 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-16">
          <h2 className="font-heading text-sm tracking-[0.3em] uppercase text-text-secondary">
            {t("title")}
          </h2>
          <Link
            href="/services"
            className="font-body text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            {t("viewAll")} {isRTL ? "←" : "→"}
          </Link>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {displayed.map((service) => {
            const title =
              isRTL && service.titleAr ? service.titleAr : service.title;
            const description = firstLineText(
              isRTL && service.descriptionAr
                ? service.descriptionAr
                : service.description
            );

            return (
              <div
                key={service._id}
                className="bg-bg p-8 flex flex-col gap-3"
              >
                <h3 className="font-heading text-2xl md:text-3xl text-text-primary leading-tight">
                  {title}
                </h3>
                {description && (
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
