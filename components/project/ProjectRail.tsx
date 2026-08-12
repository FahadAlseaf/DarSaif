"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ProjectPlaceholderArt } from "@/components/najdi/motifs";

export interface RailProject {
  key: string;
  href: string;
  title: string;
  meta: string;
  tag: string;
  imageUrl: string | null;
  placeholderVariant: number;
  isPlaceholder: boolean;
}

/** Horizontal scroll-snap rail of tall project cards. */
export default function ProjectRail({ items }: { items: RailProject[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="project-rail flex gap-6 overflow-x-auto px-6 pb-24 pt-2 md:px-12 md:pb-32">
      {items.map((item, i) => (
        <motion.div
          key={item.key}
          className="w-[78vw] shrink-0 sm:w-[420px] lg:w-[480px]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{
            duration: 0.8,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={item.href}
            className="group relative block aspect-[4/4.6] overflow-hidden rounded-2xl bg-night"
          >
            {/* Art: Sanity photo or blueprint placeholder */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 480px, 78vw"
                />
              ) : (
                <ProjectPlaceholderArt variant={item.placeholderVariant} />
              )}
            </div>

            {/* Bottom gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />

            {/* Index number */}
            <span
              className="absolute top-5 font-accent text-xl text-night-text/85 ltr:right-6 rtl:left-6"
              dir="ltr"
              style={{ unicodeBidi: "isolate" }}
            >
              /{String(i + 1).padStart(2, "0")}
            </span>

            {/* Meta */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div className="min-w-0">
                <p className="truncate font-heading text-2xl font-extrabold text-night-text">
                  {item.title}
                </p>
                {item.meta && (
                  <p className="mt-1.5 text-sm text-night-text-secondary">
                    {item.meta}
                  </p>
                )}
              </div>
              {item.tag && item.tag !== "—" && (
                <span className="shrink-0 rounded-full border border-night-text/25 bg-night-text/10 px-4 py-1.5 text-xs font-bold text-night-text backdrop-blur-sm">
                  {item.tag}
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
