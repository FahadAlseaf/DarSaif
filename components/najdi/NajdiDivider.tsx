"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ZIGZAG_PATH } from "./motifs";

/** Najdi crenellation line that draws itself as the user scrolls past. */
export default function NajdiDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 35%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="overflow-hidden bg-bg py-14" aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="h-[70px] w-full"
      >
        <motion.path
          d={ZIGZAG_PATH}
          fill="none"
          stroke="rgb(var(--color-accent))"
          strokeWidth="2"
          style={shouldReduceMotion ? undefined : { pathLength }}
        />
      </svg>
    </div>
  );
}
