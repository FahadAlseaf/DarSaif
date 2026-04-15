import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, getAdjacentProjects } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Extracts plain text from the first Portable Text block (used for meta description). */
function firstBlockText(blocks: unknown): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  const first = blocks[0] as { children?: { text?: string }[] };
  return (first.children ?? [])
    .map((s) => s.text ?? "")
    .join("")
    .trim()
    .slice(0, 160);
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };

  const title = project.title;
  const description = firstBlockText(project.description) || undefined;
  const ogImage = urlFor(project.coverImage).width(1200).height(630).url();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const [project, t, tp, locale] = await Promise.all([
    getProjectBySlug(slug),
    getTranslations("project"),
    getTranslations("projects"),
    getLocale(),
  ]);

  if (!project) return notFound();

  const { prev, next } = await getAdjacentProjects(slug);
  const isRTL = locale === "ar";

  const displayTitle =
    isRTL && project.titleAr ? project.titleAr : project.title;

  const description = (
    isRTL && project.descriptionAr
      ? project.descriptionAr
      : project.description
  ) as PortableTextBlock[] | undefined;

  const gallery = project.gallery as SanityImageSource[] | undefined;

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="relative h-screen">
        <Image
          src={urlFor(project.coverImage).width(1920).height(1080).url()}
          alt={displayTitle}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Gradient: dark at bottom, fades out toward middle */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent"
        />

        {/* Back link — top-left overlay (below fixed header) */}
        <div className="absolute top-20 inset-x-0 px-6 md:px-12">
          <Link
            href="/projects"
            className="font-body text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-200"
          >
            {isRTL ? `${t("backToProjects")} →` : `← ${t("backToProjects")}`}
          </Link>
        </div>

        {/* Title block — bottom of hero */}
        <div className="absolute bottom-0 inset-x-0 px-6 md:px-12 pb-14">
          {(project.type || project.location) && (
            <p className="font-body text-xs tracking-[0.3em] uppercase text-white/50 mb-4">
              {[project.type, project.location].filter(Boolean).join(" — ")}
            </p>
          )}
          <h1 className="font-heading text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[0.03em] text-white uppercase">
            {displayTitle}
          </h1>
        </div>
      </div>

      {/* ── Metadata bar ───────────────────────────────────────────────── */}
      <div className="border-b border-border px-6 md:px-12 py-10">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-x-16 gap-y-6">
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary mb-2">
              {t("type")}
            </p>
            <p className="font-heading text-2xl text-text-primary capitalize">
              {tp(project.type)}
            </p>
          </div>
          {project.location && (
            <div>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary mb-2">
                {t("location")}
              </p>
              <p className="font-heading text-2xl text-text-primary">
                {project.location}
              </p>
            </div>
          )}
          {project.year && (
            <div>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary mb-2">
                {t("year")}
              </p>
              <p className="font-heading text-2xl text-text-primary">
                {project.year}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Description ────────────────────────────────────────────────── */}
      {description && description.length > 0 && (
        <div className="px-6 md:px-12 py-16">
          <div className="max-w-2xl mx-auto">
            <PortableText
              value={description}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="font-body text-base text-text-primary/80 leading-relaxed mb-5 last:mb-0">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-heading text-3xl text-text-primary mt-10 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-heading text-2xl text-text-primary mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                },
              }}
            />
          </div>
        </div>
      )}

      {/* ── Gallery ────────────────────────────────────────────────────── */}
      {gallery && gallery.length > 0 && (
        <div className="py-8">
          <div
            className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-4"
          >
            {gallery.map((img, i) => (
              <div
                key={i}
                className="snap-start shrink-0 relative h-72 md:h-96 aspect-[4/3] bg-surface overflow-hidden"
              >
                <Image
                  src={urlFor(img).width(900).height(675).url()}
                  alt={`${displayTitle} — ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 55vw, 80vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Prev / Next navigation ─────────────────────────────────────── */}
      <div className="border-t border-border px-6 md:px-12 py-12 mt-8">
        <div className="max-w-4xl mx-auto flex justify-between items-start gap-6">
          {/* Previous project */}
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary">
                {isRTL ? "→" : "←"} {t("previous")}
              </span>
              <span className="font-heading text-xl md:text-2xl text-text-primary/60 group-hover:text-text-primary transition-colors duration-200">
                {isRTL && prev.titleAr ? prev.titleAr : prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Next project */}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col gap-1 text-end"
            >
              <span className="font-body text-xs tracking-[0.25em] uppercase text-text-secondary">
                {t("next")} {isRTL ? "←" : "→"}
              </span>
              <span className="font-heading text-xl md:text-2xl text-text-primary/60 group-hover:text-text-primary transition-colors duration-200">
                {isRTL && next.titleAr ? next.titleAr : next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
}
