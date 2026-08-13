"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

const NAV_LINKS = [
  ["homeLink", "/"],
  ["projects", "/projects"],
  ["services", "/services"],
  ["about", "/about"],
  ["contact", "/contact"],
] as const;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Slide-in nav drawer — the site's whole header lives here now. It opens
 * from the inline-start edge (left in English, right in Arabic) and sits
 * below the fixed bar so the logo/✕ trigger stays visible on top of it.
 */
export default function Sidebar({ isOpen, onClose }: Props) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const isRtl = locale === "ar";
  const arrow = isRtl ? "↖" : "↗";
  const offscreen = isRtl ? "100%" : "-100%";
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const };

  // Escape closes; opening moves focus into the panel for keyboard users.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector("a")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onClose}
            aria-hidden="true"
            // The tint rides on the element's own opacity, not bg-night/40 —
            // the colour tokens are raw var()s, so Tailwind alpha modifiers
            // on them compile to nothing.
            className="fixed inset-0 z-[55] bg-night backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
          />

          <motion.div
            ref={panelRef}
            id="site-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            className="fixed inset-y-0 z-[60] flex w-[min(86vw,22rem)] flex-col border-border bg-bg pt-16 ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l"
            initial={{ x: offscreen }}
            animate={{ x: 0 }}
            exit={{ x: offscreen }}
            transition={transition}
          >
            <nav
              aria-label={t("menu")}
              className="flex flex-1 flex-col justify-center gap-1 px-8"
            >
              {NAV_LINKS.map(([key, href], i) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.35, delay: 0.1 + i * 0.05 }
                    }
                  >
                    <Link
                      href={href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={`block py-2 font-heading text-3xl font-extrabold transition-colors duration-200 hover:text-accent ${
                        isActive ? "text-accent" : "text-text-primary"
                      }`}
                    >
                      {t(key)}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="flex items-center justify-between gap-4 border-t border-border px-8 py-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-transform hover:-translate-y-0.5"
              >
                {t("startProject")} <span aria-hidden="true">{arrow}</span>
              </Link>
              <LanguageToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
