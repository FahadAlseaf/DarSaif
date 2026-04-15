"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-border bg-bg/90 backdrop-blur-sm">
      <Link
        href="/"
        onClick={close}
        className="font-heading text-xl tracking-[0.15em] text-text-primary uppercase"
      >
        DarSaif
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(([key, href]) => (
          <Link
            key={key}
            href={href}
            className="text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-200 tracking-widest uppercase"
          >
            {t(key)}
          </Link>
        ))}
      </nav>

      {/* Right controls: hamburger */}
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? t("close") : t("menu")}
          aria-expanded={isOpen}
          className="md:hidden w-8 h-8 flex items-center justify-center text-text-primary text-base"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile nav overlay — rendered as a sibling panel below the header bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label={t("menu")}
            className="md:hidden absolute top-full inset-x-0 h-[calc(100vh-4rem)] bg-bg border-t border-border flex flex-col items-center justify-center gap-10"
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
                  className="font-heading text-4xl tracking-[0.06em] text-text-primary uppercase hover:text-accent transition-colors duration-200"
                >
                  {t(key)}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
