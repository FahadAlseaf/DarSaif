"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import LogoMenuButton from "./LogoMenuButton";
import Sidebar from "./Sidebar";

/**
 * The bar is now just the brand mark, which doubles as the menu trigger —
 * every nav link, the CTA and the language toggle live in <Sidebar>.
 * Kept at h-16 so the layout's `pt-16` main offset still holds.
 */
export default function Header() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll while the sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* z-[70] keeps the trigger above the sidebar, so it reads as the ✕ */}
      <header className="fixed inset-x-0 top-0 z-[70] flex h-16 items-center border-b border-border/70 bg-bg/90 px-6 backdrop-blur-md md:px-12">
        <LogoMenuButton
          isOpen={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          label={isOpen ? t("close") : t("menu")}
        />
      </header>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
