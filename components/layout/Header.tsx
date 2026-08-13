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
      {/* No bar chrome — a border + fill here just read as an empty band.
          The gradient is invisible over the page background and only shows
          itself once darker content scrolls under the mark.
          z-[70] keeps the trigger above the sidebar, so it reads as the ✕. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex h-14 items-center bg-gradient-to-b from-bg to-transparent px-6 md:px-12 [&>*]:pointer-events-auto">
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
