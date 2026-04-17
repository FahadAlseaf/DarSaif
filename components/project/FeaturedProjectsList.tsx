"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProject } from "@/sanity/lib/queries";

interface Props {
  projects: SanityProject[];
}

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturedProjectsList({ projects }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const activeProject =
    projects.find((p) => p._id === hoveredId) ?? projects[0] ?? null;

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-start"
      onMouseLeave={() => setHoveredId(null)}
    >
      {/* Numbered list */}
      <motion.ol
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
        }}
        className="divide-y divide-border"
      >
        {projects.map((project, index) => {
          const displayTitle =
            isRTL && project.titleAr ? project.titleAr : project.title;
          const isHovered = hoveredId === project._id;

          return (
            <motion.li
              key={project._id}
              variants={rowVariants}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group flex items-baseline gap-6 py-6"
                onMouseEnter={() => setHoveredId(project._id)}
              >
                <span
                  className={`font-body text-xs tracking-[0.2em] tabular-nums shrink-0 transition-colors duration-300 ${
                    isHovered ? "text-accent" : "text-text-secondary"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <p
                    className={`font-heading text-2xl md:text-3xl leading-tight transition-colors duration-300 ${
                      isHovered ? "text-text-primary" : "text-text-primary/70"
                    }`}
                  >
                    {displayTitle}
                  </p>
                  {(project.type || project.location) && (
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-text-secondary mt-1">
                      {[project.type, project.location].filter(Boolean).join(" — ")}
                    </p>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className={`font-body shrink-0 transition-all duration-300 ${
                    isHovered ? "text-accent" : "text-text-secondary/40"
                  }`}
                  style={
                    isHovered
                      ? { transform: isRTL ? "translateX(-4px)" : "translateX(4px)" }
                      : undefined
                  }
                >
                  {isRTL ? "←" : "→"}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ol>

      {/* Image reveal panel — desktop only */}
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
                  src={urlFor(activeProject.coverImage).width(800).height(1067).url()}
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
  );
}
