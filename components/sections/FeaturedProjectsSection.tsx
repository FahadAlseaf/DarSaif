import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/sanity/lib/queries";
import FeaturedProjectsList from "@/components/project/FeaturedProjectsList";

export default async function FeaturedProjectsSection() {
  const [projects, t, locale] = await Promise.all([
    getFeaturedProjects(),
    getTranslations("home"),
    getLocale(),
  ]);

  // Section is invisible until real projects exist in Sanity
  if (projects.length === 0) return null;

  return (
    <section
      aria-label={t("featuredProjects")}
      className="py-24 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-16">
          <h2 className="font-heading text-sm tracking-[0.3em] uppercase text-text-secondary">
            {t("featuredProjects")}
          </h2>
          <Link
            href="/projects"
            className="font-body text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            {t("viewAllProjects")} {locale === "ar" ? "←" : "→"}
          </Link>
        </div>

        <FeaturedProjectsList projects={projects} />
      </div>
    </section>
  );
}
