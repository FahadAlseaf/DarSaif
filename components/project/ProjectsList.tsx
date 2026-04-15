"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProject } from "@/sanity/lib/queries";

const PROJECT_TYPES = [
  "all",
  "residential",
  "commercial",
  "urban",
  "planning",
  "interior",
] as const;
type FilterType = (typeof PROJECT_TYPES)[number];

interface Props {
  projects: SanityProject[];
}

export default function ProjectsList({ projects }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const locale = useLocale();
  const t = useTranslations("projects");
  const isRTL = locale === "ar";

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  // Desktop image panel: show hovered project, fall back to first in filtered list
  const activeProject =
    projects.find((p) => p._id === hoveredId) ?? filtered[0] ?? null;

  function handleRowClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    projectId: string
  ) {
    if (!isTouchDevice) return; // desktop: let Link navigate normally
    if (expandedId !== projectId) {
      e.preventDefault(); // first tap: expand inline preview
      setExpandedId(projectId);
    }
    // second tap on same row: allow default navigation
  }

  function handleFilterChange(type: FilterType) {
    setFilter(type);
    setExpandedId(null);
    setHoveredId(null);
  }

  const filterLabels: Record<FilterType, string> = {
    all: t("all"),
    residential: t("residential"),
    commercial: t("commercial"),
    urban: t("urban"),
    planning: t("planning"),
    interior: t("interior"),
  };

  return (
    <div>
      {/* Filter bar */}
      <div
        role="tablist"
        aria-label="Filter by project type"
        className="flex gap-8 overflow-x-auto mb-16 border-b border-border pb-4"
      >
        {PROJECT_TYPES.map((type) => (
          <button
            key={type}
            role="tab"
            aria-selected={filter === type}
            onClick={() => handleFilterChange(type)}
            className={`font-body text-xs tracking-[0.25em] uppercase whitespace-nowrap transition-colors duration-200 pt-3 pb-1 border-b-2 -mb-[calc(1rem+2px)] ${
              filter === type
                ? "text-text-primary border-accent"
                : "text-text-secondary hover:text-text-primary border-transparent"
            }`}
          >
            {filterLabels[type]}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="font-body text-sm text-text-secondary py-24 text-center tracking-[0.3em] uppercase">
          {t("empty")}
        </p>
      )}

      {/* List + image panel */}
      {filtered.length > 0 && (
        <div
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-start"
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Numbered list */}
          <ol className="divide-y divide-border">
            {filtered.map((project, index) => {
              const displayTitle =
                isRTL && project.titleAr ? project.titleAr : project.title;
              const isHovered = hoveredId === project._id;
              const isExpanded = expandedId === project._id;

              return (
                <li key={project._id}>
                  {/* Row */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex items-baseline gap-4 md:gap-6 py-6"
                    onMouseEnter={() => setHoveredId(project._id)}
                    onClick={(e) => handleRowClick(e, project._id)}
                  >
                    {/* Number */}
                    <span
                      className={`font-body text-xs tracking-[0.2em] tabular-nums shrink-0 transition-colors duration-300 ${
                        isHovered ? "text-accent" : "text-text-secondary"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Title + type/location */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-heading text-2xl md:text-3xl leading-tight transition-colors duration-300 ${
                          isHovered
                            ? "text-text-primary"
                            : "text-text-primary/70"
                        }`}
                      >
                        {displayTitle}
                      </p>
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-text-secondary mt-1">
                        {[project.type, project.location]
                          .filter(Boolean)
                          .join(" — ")}
                      </p>
                    </div>

                    {/* Year */}
                    {project.year && (
                      <span
                        className={`hidden sm:block font-body text-xs tabular-nums shrink-0 transition-colors duration-300 ${
                          isHovered ? "text-text-primary" : "text-text-secondary"
                        }`}
                      >
                        {project.year}
                      </span>
                    )}

                    {/* Arrow */}
                    <span
                      aria-hidden="true"
                      className={`font-body shrink-0 transition-all duration-300 ${
                        isHovered
                          ? "text-accent"
                          : "text-text-secondary/40"
                      }`}
                      style={
                        isHovered
                          ? {
                              transform: isRTL
                                ? "translateX(-4px)"
                                : "translateX(4px)",
                            }
                          : undefined
                      }
                    >
                      {isRTL ? "←" : "→"}
                    </span>
                  </Link>

                  {/* Mobile inline image preview */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        className="lg:hidden overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                        }
                      >
                        <div className="pb-6 pt-2 flex flex-col gap-4">
                          <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                            <Image
                              src={urlFor(project.coverImage)
                                .width(800)
                                .height(600)
                                .url()}
                              alt={displayTitle}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1023px) calc(100vw - 3rem), 0px"
                            />
                          </div>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="font-body text-xs tracking-[0.3em] uppercase text-accent"
                          >
                            {isRTL ? `← ${t("viewProject")}` : `${t("viewProject")} →`}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          {/* Desktop image reveal panel */}
          <div className="hidden lg:block sticky top-24">
            <div className="relative aspect-[3/4] bg-surface overflow-hidden">
              <AnimatePresence mode="wait">
                {activeProject && (
                  <motion.div
                    key={activeProject._id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }
                    }
                  >
                    <Image
                      src={urlFor(activeProject.coverImage)
                        .width(800)
                        .height(1067)
                        .url()}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 0px"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
