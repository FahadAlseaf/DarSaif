import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const [ta, tm] = await Promise.all([
    getTranslations("about"),
    getTranslations("meta"),
  ]);
  const title = ta("title");
  const description = tm("aboutDescription");
  return { title, description, openGraph: { title, description } };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  // Multi-paragraph story: stored as newline-delimited string in messages
  const storyParagraphs = t("story")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* ── Hero band ───────────────────────────────────────────────────── */}
      <div className="px-6 pt-24 pb-16 max-w-6xl mx-auto">
        <p className="font-heading text-sm tracking-[0.3em] uppercase text-text-secondary mb-6">
          {t("title")}
        </p>
        <h1 className="font-heading text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[0.02em] text-text-primary uppercase max-w-4xl">
          {t("tagline")}
        </h1>
      </div>

      {/* ── Image placeholder ──────────────────────────────────────────── */}
      {/* Replace the div below with a Next.js <Image> once the office/founder photo is ready */}
      <div
        aria-hidden="true"
        className="w-full aspect-[16/7] bg-surface border-y border-border"
      />

      {/* ── Metadata + Story ───────────────────────────────────────────── */}
      <div className="px-6 py-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-16 md:gap-24">
        {/* Left: metadata */}
        <div className="flex flex-row md:flex-col gap-12 md:gap-10">
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary mb-2">
              {t("founded")}
            </p>
            <p className="font-heading text-2xl text-text-primary">
              {t("foundedYear")}
            </p>
          </div>
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary mb-2">
              {t("locationLabel")}
            </p>
            <p className="font-heading text-2xl text-text-primary">
              {t("location")}
            </p>
          </div>
        </div>

        {/* Right: story */}
        <div>
          <h2 className="font-heading text-sm tracking-[0.3em] uppercase text-text-secondary mb-10">
            {t("storyHeading")}
          </h2>
          <div className="flex flex-col gap-5 max-w-2xl">
            {storyParagraphs.map((para, i) => (
              <p
                key={i}
                className="font-body text-base text-text-primary/80 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission ────────────────────────────────────────────────────── */}
      <div className="border-t border-border px-6 py-20 max-w-6xl mx-auto">
        <p className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary mb-6">
          {t("missionLabel")}
        </p>
        <blockquote className="font-heading text-[clamp(1.5rem,3.5vw,3rem)] leading-[1.1] tracking-[0.02em] text-text-primary max-w-3xl">
          {t("mission")}
        </blockquote>
      </div>
    </div>
  );
}
