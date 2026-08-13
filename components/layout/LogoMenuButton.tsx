"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import MorphPath from "@/components/najdi/MorphPath";
import { MORPH_SHAPES, VIEW_BOX } from "@/components/najdi/logoMorph";

const EASE = [0.65, 0, 0.35, 1] as const;

interface Props {
  isOpen: boolean;
  onClick: () => void;
  /** Accessible label — "Menu" when closed, "Close" when open. */
  label: string;
}

/**
 * The site's only nav trigger. The Najdi mark's three shapes morph into the
 * three burger lines on hover (or keyboard focus), then fold into an ✕ while
 * the sidebar is open — one continuous shape animation, not a crossfade.
 * Touch devices never hover, so the mark stays a mark until tapped.
 */
export default function LogoMenuButton({ isOpen, onClick, label }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toBar = useMotionValue(0);
  const toCross = useMotionValue(0);
  // The middle line is the one that disappears into the ✕
  const middleOpacity = useTransform(toCross, [0, 1], [1, 0]);

  const showBars = isHovered || isOpen;

  useEffect(() => {
    const options = shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.45, ease: EASE };
    const runs = [
      animate(toBar, showBars ? 1 : 0, options),
      animate(toCross, isOpen ? 1 : 0, options),
    ];
    return () => runs.forEach((run) => run.stop());
  }, [showBars, isOpen, shouldReduceMotion, toBar, toCross]);

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
      className="-m-2 flex w-[4.5rem] items-center justify-center p-2 text-text-primary"
    >
      <svg
        viewBox={VIEW_BOX}
        fill="currentColor"
        aria-hidden="true"
        className="w-14 shrink-0 overflow-visible"
      >
        {MORPH_SHAPES.map((shape, i) => (
          <motion.g key={i} style={i === 1 ? { opacity: middleOpacity } : undefined}>
            <MorphPath shape={shape} toBar={toBar} toCross={toCross} />
          </motion.g>
        ))}
      </svg>
    </button>
  );
}
