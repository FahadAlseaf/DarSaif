import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjectsSafe } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "@/components/ui/Reveal";
import ProjectRail, { type RailProject } from "@/components/project/ProjectRail";

/**
 * Featured projects as a horizontal rail of tall cards.
 * With no projects in Sanity yet, three illustrated placeholder cards render
 * instead (clearly labeled), so the homepage never looks empty.
 */
export default async function FeaturedProjectsSection() {
  const [projects, t, tp, locale] = await Promise.all([
    getFeaturedProjectsSafe(),
    getTranslations("home"),
    getTranslations("projects"),
    getLocale(),
  ]);
  const isRTL = locale === "ar";
  const arrow = isRTL ? "↖" : "↗";

  const items: RailProject[] = projects.map((p, i) => {
    let imageUrl: string | null = null;
    try {
      imageUrl = p.coverImage
        ? urlFor(p.coverImage).width(900).height(1000).url()
        : null;
    } catch {
      imageUrl = null;
    }
    return {
      key: p._id,
      href: `/projects/${p.slug}`,
      title: isRTL && p.titleAr ? p.titleAr : p.title,
      meta: [p.type ? tp(p.type) : null, p.location]
        .filter(Boolean)
        .join(" · "),
      tag: p.type ? tp(p.type) : "",
      imageUrl,
      placeholderVariant: i,
      isPlaceholder: false,
    };
  });

  const placeholderItems: RailProject[] = [0, 1, 2].map((i) => ({
    key: `placeholder-${i}`,
    href: "/projects",
    title: t("projectPlaceholderTitle"),
    meta: t("projectPlaceholderMeta"),
    tag: "—",
    imageUrl: null,
    placeholderVariant: i,
    isPlaceholder: true,
  }));

  const railItems = items.length > 0 ? items : placeholderItems;

  return (
    <section aria-label={t("featuredProjects")} className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-12 md:pt-32">
        <div className="mb-12 flex flex-wrap items-start justify-between gap-10">
          <Reveal>
            <h2 className="font-heading text-4xl font-extrabold leading-snug md:text-6xl">
              {t("featuredPre")}{" "}
              <span className="font-accent font-normal text-accent">
                {t("featuredAccent")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-sm pt-2">
            <p className="mb-6 leading-loose text-text-secondary">
              {t("featuredIntro")}
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-bg transition-transform hover:-translate-y-0.5"
            >
              {t("viewAllProjects")} <span aria-hidden="true">{arrow}</span>
            </Link>
          </Reveal>
        </div>
      </div>

      <ProjectRail items={railItems} />
    </section>
  );
}
