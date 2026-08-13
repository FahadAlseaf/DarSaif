"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LogoMark from "@/components/najdi/LogoMark";

/** Bar offset (px) that closes the three lines into an ✕ when the menu opens. */
const BAR_SHIFT = 7;

interface Props {
  isOpen: boolean;
  onClick: () => void;
  /** Accessible label — "Menu" when closed, "Close" when open. */
  label: string;
}

/**
 * The site's only nav trigger: the Najdi logo mark that swaps to three
 * hamburger lines on hover (or keyboard focus), then folds into an ✕ while
 * the sidebar is open. Touch devices never hover, so the mark simply stays
 * a mark until tapped — the button opens the sidebar either way.
 */
export default function LogoMenuButton({ isOpen, onClick, label }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const showBars = isHovered || isOpen;
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  /** Closed: three stacked lines. Open: top and bottom cross, middle fades. */
  const barState = (index: number) => {
    if (!isOpen) return { rotate: 0, y: 0, opacity: 1 };
    if (index === 1) return { rotate: 0, y: 0, opacity: 0 };
    return {
      rotate: index === 0 ? 45 : -45,
      y: index === 0 ? BAR_SHIFT : -BAR_SHIFT,
      opacity: 1,
    };
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls="site-sidebar"
      className="relative flex h-10 w-14 items-center justify-center text-text-primary"
    >
      {/* Logo mark — fades out as the lines take over */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: showBars ? 0 : 1, scale: showBars ? 0.92 : 1 }}
        transition={transition}
      >
        <LogoMark className="w-14 shrink-0" />
      </motion.span>

      {/* Hamburger lines */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center gap-[5px]"
        animate={{ opacity: showBars ? 1 : 0 }}
        transition={transition}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-[2px] w-9 rounded-full bg-current"
            animate={barState(i)}
            transition={transition}
          />
        ))}
      </motion.span>
    </button>
  );
}
