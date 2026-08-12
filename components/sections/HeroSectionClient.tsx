"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  HeroBackLayer,
  HeroFrontLayer,
  HeroMidLayer,
} from "@/components/najdi/motifs";

const easeOut = [0.22, 1, 0.36, 1] as const;

interface Props {
  /** Sanity Site Settings hero image. Null → illustrated Najdi placeholder. */
  heroImageUrl: string | null;
}

export default function HeroSectionClient({ heroImageUrl }: Props) {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const arrow = isRTL ? "↖" : "↗";

  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Parallax: layers drift at different speeds while the hero scrolls out.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yWord = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const still = shouldReduceMotion;

  return (
    <section
      ref={ref}
      aria-label={t("heroWordmark")}
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg,#b8aa95 0%,#cbb89a 34%,#dbbe92 58%,#e3b577 78%,#d9a163 100%)",
      }}
    >
      {/* ── Background: Sanity photo when present, Najdi illustration otherwise ── */}
      {heroImageUrl ? (
        <motion.div
          className="absolute inset-0"
          style={still ? undefined : { y: yBack }}
        >
          <Image
            src={heroImageUrl}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55" />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 z-[1]"
          style={still ? undefined : { y: yBack }}
        >
          <HeroBackLayer />
        </motion.div>
      )}

      {/* ── Giant wordmark (sits behind the building silhouette) ── */}
      <motion.h1
        className="pointer-events-none absolute inset-x-0 top-[9%] z-[2] select-none whitespace-nowrap text-center font-heading text-[clamp(96px,19vw,300px)] font-black leading-none text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(180deg,#fdfbf6 0%,#f3e7cf 55%,#eac79a 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          filter: "drop-shadow(0 10px 40px rgba(120,80,30,.2))",
          ...(still ? {} : { y: yWord }),
        }}
        initial={still ? false : { opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: easeOut }}
      >
        {t("heroWordmark")}
      </motion.h1>

      {/* ── Najdi composition (only in placeholder mode) ── */}
      {!heroImageUrl && (
        <>
          <motion.div
            className="absolute inset-0 z-[3]"
            style={still ? undefined : { y: yMid }}
          >
            <HeroMidLayer />
          </motion.div>
          <div className="absolute inset-0 z-[4]">
            <HeroFrontLayer />
          </div>
        </>
      )}

      {/* ── Foreground content ── */}
      <motion.div
        className="absolute inset-0 z-[6] px-6 md:px-12"
        style={still ? undefined : { opacity: contentOpacity }}
        initial={still ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
        }}
      >
        {/* Kicker */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="absolute top-10 text-xs font-medium tracking-[0.22em] text-text-primary/70 ltr:left-6 md:ltr:left-12 rtl:right-6 md:rtl:right-12"
        >
          {t("heroKicker")}
        </motion.p>

        {/* Explore link */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="absolute top-[46%] ltr:left-6 md:ltr:left-12 rtl:right-6 md:rtl:right-12"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 border-b-2 border-bg/80 pb-2 font-heading text-xl font-medium text-bg transition-all hover:gap-5 hover:border-accent-soft md:text-2xl"
          >
            {t("heroExplore")}
            <span aria-hidden="true">{arrow}</span>
          </Link>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="absolute bottom-14 max-w-[240px] font-heading text-lg font-medium leading-relaxed text-bg md:text-xl ltr:left-6 md:ltr:left-12 rtl:right-6 md:rtl:right-12"
        >
          {t("heroTagline")}
        </motion.p>

        {/* Glass callouts — hidden on small screens */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="absolute top-[38%] hidden max-w-[270px] rounded-xl border border-bg/40 bg-bg/30 p-4 text-[13px] font-medium leading-relaxed text-text-primary backdrop-blur-md lg:block ltr:right-[8%] rtl:left-[8%]"
        >
          {t("heroCallout1")}
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="absolute bottom-[16%] hidden max-w-[270px] rounded-xl border border-bg/40 bg-bg/30 p-4 text-[13px] font-medium leading-relaxed text-text-primary backdrop-blur-md lg:block ltr:right-[30%] rtl:left-[30%]"
        >
          {t("heroCallout2")}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 z-[7] -translate-x-1/2 text-[11px] tracking-[0.3em] text-bg/80"
        animate={still ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {t("scrollHint")}
      </motion.div>
    </section>
  );
}
