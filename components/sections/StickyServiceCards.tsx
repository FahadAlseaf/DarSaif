"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export interface ServiceCard {
  key: string;
  title: string;
  description: string;
}

/** Color chapters for the stacked cards (cycled). */
const SKINS = [
  "bg-surface text-text-primary",
  "bg-border text-text-primary",
  "bg-night-surface text-night-text",
  "bg-accent text-bg",
] as const;

const NUM_SKINS = [
  "text-accent",
  "text-accent",
  "text-accent-soft",
  "text-bg",
] as const;

function StackCard({
  card,
  index,
  isLast,
}: {
  card: ServiceCard;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 110px", "end 40px"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  const animated = !shouldReduceMotion && !isLast;

  return (
    <motion.div
      ref={ref}
      style={animated ? { scale, opacity } : undefined}
      className={`sticky top-24 mb-6 grid min-h-[320px] grid-cols-1 items-center gap-8 rounded-3xl border border-border p-10 shadow-[0_-12px_40px_rgba(22,19,14,.08)] md:grid-cols-[auto_1fr] md:p-12 ${SKINS[index % SKINS.length]}`}
    >
      <div
        className={`font-accent text-7xl md:text-8xl ${NUM_SKINS[index % NUM_SKINS.length]}`}
        dir="ltr"
        style={{ unicodeBidi: "isolate" }}
      >
        /{String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <h3 className="mb-4 font-heading text-3xl font-extrabold md:text-4xl">
          {card.title}
        </h3>
        {card.description && (
          <p className="max-w-2xl leading-loose opacity-80">{card.description}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function StickyServiceCards({ cards }: { cards: ServiceCard[] }) {
  return (
    <div>
      {cards.map((card, i) => (
        <StackCard
          key={card.key}
          card={card}
          index={i}
          isLast={i === cards.length - 1}
        />
      ))}
    </div>
  );
}
