import { getTranslations, getLocale } from "next-intl/server";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { getAllServices } from "@/sanity/lib/queries";

export async function generateMetadata() {
  const [ts, tm] = await Promise.all([
    getTranslations("services"),
    getTranslations("meta"),
  ]);
  const title = ts("title");
  const description = tm("servicesDescription");
  return { title, description, openGraph: { title, description } };
}

export default async function ServicesPage() {
  const [services, t, locale] = await Promise.all([
    getAllServices(),
    getTranslations("services"),
    getLocale(),
  ]);

  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      {/* Page heading */}
      <h1 className="font-heading text-sm tracking-[0.3em] uppercase text-text-secondary mb-16">
        {t("title")}
      </h1>

      {/* Empty state */}
      {services.length === 0 && (
        <p className="font-body text-base text-text-secondary py-24 text-center">
          {t("empty")}
        </p>
      )}

      {/* Services list */}
      {services.length > 0 && (
        <ol className="divide-y divide-border">
          {services.map((service, index) => {
            const title = isRTL && service.titleAr ? service.titleAr : service.title;
            const description = (
              isRTL && service.descriptionAr
                ? service.descriptionAr
                : service.description
            ) as PortableTextBlock[] | undefined;

            const number = String(index + 1).padStart(2, "0");

            return (
              <li key={service._id} className="py-12 md:py-16 flex flex-col md:flex-row md:gap-16">
                {/* Number */}
                <span
                  aria-hidden="true"
                  className="font-body text-xs text-text-secondary tracking-[0.2em] mb-4 md:mb-0 md:pt-2 md:w-10 shrink-0"
                >
                  {number}
                </span>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-6">
                  <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[0.02em] text-text-primary">
                    {title}
                  </h2>

                  {description && description.length > 0 && (
                    <div className="max-w-2xl">
                      <PortableText
                        value={description}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="font-body text-base text-text-secondary leading-relaxed mb-4 last:mb-0">
                                {children}
                              </p>
                            ),
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
