"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export interface StatItem {
  value: string; // e.g. "120+", "98%", "12"
  label: string;
  description: string;
}

/** Splits "120+" into { number: 120, prefix: "", suffix: "+" }. */
function parseValue(value: string) {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return { number: null, prefix: "", suffix: value };
  return { number: parseInt(match[2], 10), prefix: match[1], suffix: match[3] };
}

function CountUp({ value }: { value: string }) {
  const { number, prefix, suffix } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(
    shouldReduceMotion ? number ?? 0 : 0
  );

  useEffect(() => {
    if (!inView || number === null || shouldReduceMotion) {
      if (number !== null) setDisplay(number);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * number));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, number, shouldReduceMotion]);

  if (number === null) {
    return <span ref={ref}>{value}</span>;
  }
  return (
    <span ref={ref} dir="ltr" style={{ unicodeBidi: "isolate" }}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function StatsGrid({ stats }: { stats: StatItem[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={`${stat.value}-${i}`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="rounded-2xl border border-night-border p-8 transition-colors duration-300 hover:border-accent"
        >
          <div className="font-accent text-5xl text-night-text md:text-6xl">
            <CountUp value={stat.value} />
          </div>
          {stat.label && (
            <div className="mt-6 font-heading text-lg font-bold">
              {stat.label}
            </div>
          )}
          {stat.description && (
            <p className="mt-2 text-sm leading-relaxed text-night-text-secondary">
              {stat.description}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
