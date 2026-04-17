"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProject } from "@/sanity/lib/queries";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

const SLIDE_INTERVAL = 5000;
const FADE_DURATION = 1.2;

interface Props {
  projects: SanityProject[];
}

export default function HeroSectionClient({ projects }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? "visible" : "hidden";

  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (shouldReduceMotion || projects.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % projects.length);
    }, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [projects.length, shouldReduceMotion]);

  return (
    <section
      aria-label="Hero"
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 overflow-hidden"
    >
      {/* Background slideshow — no blur, clear photo */}
      {projects.length > 0 && (
        <div className="absolute inset-0 z-0">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              className="absolute inset-0"
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: FADE_DURATION, ease: "easeInOut" }
              }
            >
              <Image
                src={urlFor(project.coverImage).width(1600).height(900).url()}
                alt=""
                aria-hidden="true"
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </motion.div>
          ))}
          {/* Overlay — light enough for photo to show, dark enough for text */}
          <div className="absolute inset-0 bg-bg/50" />
        </div>
      )}

      {/* Foreground content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 py-12 px-8 w-full max-w-3xl"
        initial={initial}
        animate="visible"
        variants={containerVariants}
      >
        {/* Top rule */}
        <motion.div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-px bg-text-primary opacity-30 origin-center"
          variants={lineVariants}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.2, ease: "easeInOut" }
          }
        />

        {/* Full logo — Arabic calligraphy + office name */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="px-6 py-3"
          style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
        >
          <Image
            src="/images/logo-full.png"
            alt="دارسيف — Dar Saif Architect"
            width={432}
            height={210}
            className="h-36 md:h-44 w-auto object-contain"
            style={{ filter: "drop-shadow(0 2px 20px rgba(0,0,0,0.85))" }}
            priority
          />
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-px bg-text-primary opacity-30 origin-center"
          variants={lineVariants}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.2, ease: "easeInOut" }
          }
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-10 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { delay: 1.8, duration: 0.8 }
        }
      >
        <motion.div
          className="w-px h-12 bg-text-primary"
          style={{ originY: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
