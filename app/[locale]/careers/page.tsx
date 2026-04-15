import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const [tc, tm] = await Promise.all([
    getTranslations("careers"),
    getTranslations("meta"),
  ]);
  const title = tc("title");
  const description = tm("careersDescription");
  return { title, description, openGraph: { title, description } };
}

export default async function CareersPage() {
  const t = await getTranslations("careers");

  return (
    <div className="min-h-screen px-6 py-24 max-w-6xl mx-auto flex flex-col">
      {/* Page heading */}
      <p className="font-heading text-sm tracking-[0.3em] uppercase text-text-secondary mb-16">
        {t("title")}
      </p>

      {/* Main content — vertically centered in remaining space */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl py-16">
        <h1 className="font-heading text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[0.02em] text-text-primary uppercase mb-10">
          {t("heading")}
        </h1>

        <p className="font-body text-base text-text-secondary leading-relaxed mb-12">
          {t("body")}
        </p>

        <a
          href="mailto:careers@darsaif.com"
          className="inline-flex items-center gap-3 font-body text-xs tracking-[0.25em] uppercase text-text-primary border border-border px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-200 self-start"
        >
          {t("cta")}
        </a>
      </div>
    </div>
  );
}
