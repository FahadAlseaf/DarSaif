"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ProjectPlaceholderArt } from "@/components/najdi/motifs";
import Reveal from "@/components/ui/Reveal";

export interface HoverProject {
  key: string;
  href: string;
  title: string;
  meta: string;
  imageUrl: string | null;
  placeholderVariant: number;
}

/**
 * V3 signature interaction: an editorial project list where the project
 * image floats after the cursor while hovering a row (desktop only).
 */
export default function ProjectHoverList({ items }: { items: HoverProject[] }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // Lerp the floating image toward the cursor
  useEffect(() => {
    if (shouldReduceMotion) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      const el = floatRef.current;
      if (el) {
        el.style.left = `${pos.current.x - 150}px`;
        el.style.top = `${pos.current.y - 190}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [shouldReduceMotion]);

  return (
    <div>
      <div onMouseLeave={() => setActiveIndex(null)}>
        {items.map((item, i) => (
          <Reveal key={item.key} delay={i * 0.05}>
            <Link
              href={item.href}
              onMouseEnter={() => setActiveIndex(i)}
              className="group grid grid-cols-[3.2rem_1fr_2rem] items-center gap-5 border-t border-night-border py-9 transition-all last:border-b hover:bg-night-surface hover:px-5 md:grid-cols-[4.5rem_1fr_auto_2.5rem] md:gap-7"
            >
              <span
                className="font-accent text-lg text-accent-soft"
                dir="ltr"
                style={{ unicodeBidi: "isolate" }}
              >
                /{String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate font-heading text-2xl font-extrabold transition-colors group-hover:text-accent-soft md:text-4xl">
                {item.title}
              </span>
              {item.meta && (
                <span className="hidden text-sm text-night-text-secondary md:block">
                  {item.meta}
                </span>
              )}
              <span
                aria-hidden="true"
                className="text-xl text-accent-soft transition-transform duration-300 group-hover:ltr:translate-x-1 group-hover:ltr:-translate-y-1 group-hover:rtl:-translate-x-1 group-hover:rtl:-translate-y-1"
              >
                ↖
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Floating cursor image — desktop only */}
      {!shouldReduceMotion && (
        <div
          ref={floatRef}
          aria-hidden="true"
          className={`pointer-events-none fixed z-[90] hidden aspect-[4/4.6] w-[300px] overflow-hidden rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,.45)] transition-[opacity,transform] duration-300 lg:block ${
            activeIndex !== null
              ? "scale-100 rotate-0 opacity-100"
              : "scale-90 rotate-2 opacity-0"
          }`}
        >
          {items.map((item, i) => (
            <div
              key={item.key}
              className={`absolute inset-0 transition-opacity duration-300 ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              ) : (
                <ProjectPlaceholderArt variant={item.placeholderVariant} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
