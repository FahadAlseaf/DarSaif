"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const accentLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1 },
};

export default function HeroSection() {
  const t = useTranslations("home");
  const shouldReduceMotion = useReducedMotion();

  // When reduced motion is preferred, start in the final "visible" state
  const initial = shouldReduceMotion ? "visible" : "hidden";

  return (
    <section
      aria-label="Hero"
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center overflow-hidden"
    >
      {/* Top accent rule — sweeps in from center */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-accent opacity-30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 1.4, ease: "easeInOut" }
        }
      />

      {/* Staggered content block */}
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={initial}
        animate="visible"
        variants={containerVariants}
      >
        {/* Office name */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-[clamp(3.5rem,12vw,9rem)] leading-[0.9] tracking-[0.04em] text-text-primary uppercase"
        >
          DarSaif
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          aria-hidden="true"
          variants={accentLineVariants}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-12 h-px bg-accent origin-center"
        />

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-xs tracking-[0.35em] uppercase text-text-secondary"
        >
          {t("heroTagline")}
        </motion.p>
      </motion.div>

      {/* Scroll indicator — animated pulsing vertical line */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { delay: 1.6, duration: 0.8 }
        }
      >
        <motion.div
          className="w-px h-12 bg-text-secondary"
          style={{ originY: 0 }}
          animate={
            shouldReduceMotion ? {} : { opacity: [0.3, 0.9, 0.3] }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom border rule */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-border" />
    </section>
  );
}
