"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const SPEED_PX_PER_S = 60;

/**
 * Seamless infinite marquee. The content is rendered twice; a rAF loop
 * translates the track and wraps by modulo of the measured half-width,
 * so there is no visible restart point — ever, at any font or viewport.
 */
export default function MarqueeClient({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const half = track.scrollWidth / 2; // re-measured each frame: robust to font swaps
      if (half > 0) {
        x -= SPEED_PX_PER_S * dt;
        if (x <= -half) x += half;
        track.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [shouldReduceMotion]);

  const Sequence = () => (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className="flex shrink-0 items-center gap-7 px-7 font-heading text-base font-medium text-surface"
        >
          {item}
          <span aria-hidden="true" className="text-accent-soft">
            ✦
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      className="overflow-hidden border-y border-night-border bg-night py-4"
      aria-hidden="true"
    >
      {/* direction:ltr keeps the translateX math identical in RTL */}
      <div ref={trackRef} className="flex w-max will-change-transform" style={{ direction: "ltr" }}>
        <Sequence />
        <Sequence />
      </div>
    </div>
  );
}
