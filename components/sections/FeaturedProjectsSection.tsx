import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getAllProjectsSafe,
  getFeaturedProjectsSafe,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "@/components/ui/Reveal";
import ProjectHoverList, {
  type HoverProject,
} from "@/components/project/ProjectHoverList";

/**
 * V3 projects section — dark chapter, editorial list with the
 * cursor-following image interaction.
 *
 * Data priority: featured projects → all projects (newest, max 6) →
 * labeled placeholder rows.
 */
export default async function FeaturedProjectsSection() {
  const [featured, t, tp, locale] = await Promise.all([
    getFeaturedProjectsSafe(),
    getTranslations("home"),
    getTranslations("projects"),
    getLocale(),
  ]);
  const isRTL = locale === "ar";
  const arrow = isRTL ? "↖" : "↗";

  const projects =
    featured.length > 0 ? featured : (await getAllProjectsSafe()).slice(0, 6);

  const items: HoverProject[] =
    projects.length > 0
      ? projects.map((p, i) => {
          let imageUrl: string | null = null;
          try {
            imageUrl = p.coverImage
              ? urlFor(p.coverImage).width(700).height(800).url()
              : null;
          } catch {
            imageUrl = null;
          }
          return {
            key: p._id,
            href: `/projects/${p.slug}`,
            title: isRTL && p.titleAr ? p.titleAr : p.title,
            meta: [p.type ? tp(p.type) : null, p.location, p.year]
              .filter(Boolean)
              .join(" · "),
            imageUrl,
            placeholderVariant: i,
          };
        })
      : [0, 1, 2].map((i) => ({
          key: `placeholder-${i}`,
          href: "/projects",
          title: t("projectPlaceholderTitle"),
          meta: t("projectPlaceholderMeta"),
          imageUrl: null,
          placeholderVariant: i,
        }));

  return (
    <section
      aria-label={t("featuredProjects")}
      className="bg-night text-night-text"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <h2 className="font-heading text-4xl font-extrabold leading-snug md:text-6xl">
              {t("featuredPre")}{" "}
              <span className="font-accent font-normal text-accent-soft">
                {t("featuredAccent")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-6 py-3 text-sm font-bold text-text-primary transition-transform hover:-translate-y-0.5"
            >
              {t("viewAllProjects")} <span aria-hidden="true">{arrow}</span>
            </Link>
          </Reveal>
        </div>

        <ProjectHoverList items={items} />

        <p className="mt-5 hidden text-xs text-night-text-secondary/70 lg:block">
          {t("projectsHoverHint")} ✨
        </p>
      </div>
    </section>
  );
}
