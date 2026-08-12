"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NajdiDoor, ZIGZAG_PATH } from "@/components/najdi/motifs";

const easeOut = [0.22, 1, 0.36, 1] as const;

interface Props {
  /** Arch image (Sanity). Null → illustrated Najdi-door placeholder. */
  archImageUrl: string | null;
}

export default function HeroSectionClient({ archImageUrl }: Props) {
  const t = useTranslations("home");
  const locale = useLocale();
  const arrow = locale === "ar" ? "↖" : "↗";
  const shouldReduceMotion = useReducedMotion();
  const still = shouldReduceMotion;
  const zigRef = useRef<SVGPathElement>(null);

  // Draw the zigzag once on mount
  useEffect(() => {
    const path = zigRef.current;
    if (!path || still) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.getBoundingClientRect(); // force layout so the transition runs
    path.style.transition = "stroke-dashoffset 2.4s cubic-bezier(.22,1,.36,1) .5s";
    path.style.strokeDashoffset = "0";
  }, [still]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      aria-label={t("heroTitlePre")}
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-bg"
    >
      {/* Outlined giant wordmark behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.12em] select-none whitespace-nowrap font-heading text-[clamp(110px,16vw,250px)] font-black leading-none text-transparent ltr:left-[-2vw] rtl:right-[-2vw]"
        style={{ WebkitTextStroke: "1.5px var(--color-border)" }}
      >
        {t("heroWordmark")}
      </div>

      <div className="relative z-[2] mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-12 md:px-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        {/* Copy */}
        <motion.div
          initial={still ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.9, ease: easeOut }}
            className="mb-5 text-xs font-medium tracking-[0.22em] text-text-secondary"
          >
            {t("heroKicker")}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.9, ease: easeOut }}
            className="font-heading text-5xl font-black leading-snug md:text-7xl"
          >
            {t("heroTitlePre")}{" "}
            <span className="font-accent font-normal text-accent">
              {t("heroTitleAccent")}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.9, ease: easeOut }}
            className="mb-9 mt-6 max-w-xl leading-loose text-text-secondary"
          >
            {t("heroLead")}
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.9, ease: easeOut }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-bg transition-transform hover:-translate-y-0.5"
            >
              {t("heroExplore")} <span aria-hidden="true">{arrow}</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-7 py-3.5 text-sm font-bold text-text-primary transition-transform hover:-translate-y-0.5"
            >
              {t("heroSecondaryCta")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Arch visual */}
        <motion.div
          initial={still ? false : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.25 }}
          className="relative mx-auto h-[52vh] w-full max-w-[520px] lg:h-[min(72vh,660px)]"
        >
          {/* Outer arch outline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3.5 rounded-[300px_300px_30px_30px] border-[1.5px] border-border"
          />
          <div className="relative h-full w-full overflow-hidden rounded-[290px_290px_22px_22px] bg-surface shadow-[0_30px_80px_rgba(22,19,14,.25)]">
            {archImageUrl ? (
              <Image
                src={archImageUrl}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
              />
            ) : (
              <NajdiDoor />
            )}
          </div>

          {/* Glass chips */}
          <motion.div
            initial={still ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.9 }}
            className="absolute top-[12%] rounded-xl border border-white/60 bg-bg/75 px-4 py-3 text-[13px] font-semibold shadow-[0_10px_30px_rgba(22,19,14,.12)] backdrop-blur-md ltr:-left-6 rtl:-right-6"
          >
            {t("heroChip1")}
          </motion.div>
          <motion.div
            initial={still ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 1.1 }}
            className="absolute bottom-[13%] rounded-xl border border-white/60 bg-bg/75 px-4 py-3 text-[13px] font-semibold shadow-[0_10px_30px_rgba(22,19,14,.12)] backdrop-blur-md ltr:-right-5 rtl:-left-5"
          >
            📍 {t("heroChip2")}
          </motion.div>
        </motion.div>
      </div>

      {/* Self-drawing zigzag along the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] opacity-50"
      >
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="h-full w-full">
          <path
            ref={zigRef}
            d={ZIGZAG_PATH}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </section>
  );
}
