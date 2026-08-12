"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LogoMark from "@/components/najdi/LogoMark";

const NAV_LINKS = [
  ["projects", "/projects"],
  ["services", "/services"],
  ["about", "/about"],
  ["contact", "/contact"],
] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const arrow = locale === "ar" ? "↖" : "↗";
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border/70 bg-bg/90 px-6 backdrop-blur-md md:px-12">
      {/* Brand lockup — Najdi mark + bilingual wordmark */}
      <Link href="/" onClick={close} className="flex items-center gap-3">
        <LogoMark className="w-14 shrink-0 text-text-primary" />
        <span className="flex items-baseline gap-3">
          <span className="font-heading text-xl font-extrabold text-text-primary">
            {locale === "ar" ? "دار سيف" : "DARSAIF"}
          </span>
          <span className="hidden text-[9px] font-medium tracking-[0.3em] text-text-secondary sm:block">
            {locale === "ar" ? "DARSAIF" : "دار سيف"}
          </span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-1 rounded-full border border-border/80 bg-bg/60 p-1.5 backdrop-blur-md md:flex">
        {NAV_LINKS.map(([key, href]) => (
          <Link
            key={key}
            href={href}
            className="rounded-full px-4 py-1.5 text-sm font-medium text-text-primary/80 transition-colors duration-200 hover:bg-text-primary/10 hover:text-text-primary"
          >
            {t(key)}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {/* CTA — desktop */}
        <Link
          href="/contact"
          className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-bg transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          {t("startProject")} <span aria-hidden="true">{arrow}</span>
        </Link>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? t("close") : t("menu")}
          aria-expanded={isOpen}
          className="flex h-8 w-8 items-center justify-center text-base text-text-primary md:hidden"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label={t("menu")}
            className="absolute inset-x-0 top-full flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-10 border-t border-border bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
          >
            {NAV_LINKS.map(([key, href], i) => (
              <motion.div
                key={key}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <Link
                  href={href}
                  onClick={close}
                  className="font-heading text-4xl font-extrabold text-text-primary transition-colors duration-200 hover:text-accent"
                >
                  {t(key)}
                </Link>
              </motion.div>
            ))}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.4, delay: 0.28, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <Link
                href="/contact"
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-base font-bold text-bg"
              >
                {t("startProject")} <span aria-hidden="true">{arrow}</span>
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
