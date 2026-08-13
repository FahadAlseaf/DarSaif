"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { MorphKind, MorphShape } from "./logoMorph";

/** Command letter + how many x/y pairs it consumes, per shape structure. */
const COMMANDS: Record<MorphKind, [string, number][]> = {
  crescent: [
    ["M", 1],
    ...(Array(7).fill(["C", 3]) as [string, number][]),
    ["L", 1],
    ...(Array(8).fill(["C", 3]) as [string, number][]),
  ],
  tile: [
    ["M", 1],
    ["L", 1],
    ["L", 1],
    ["L", 1],
  ],
};

const round = (n: number) => Math.round(n * 10) / 10;

/** Smoothstep over a sub-range of t, so the remap adds no velocity kink. */
function ramp(t: number, from: number, to: number): number {
  const v = Math.min(1, Math.max(0, (t - from) / (to - from)));
  return v * v * (3 - 2 * v);
}

function toPath(nums: number[], kind: MorphKind): string {
  let i = 0;
  let d = "";
  for (const [letter, pairs] of COMMANDS[kind]) {
    d += letter;
    for (let p = 0; p < pairs; p++) {
      d += `${round(nums[i++])} ${round(nums[i++])} `;
    }
  }
  return `${d}Z`;
}

interface Props {
  shape: MorphShape;
  /** 0 = logo, 1 = burger lines. */
  toBar: MotionValue<number>;
  /** 0 = burger lines, 1 = ✕. */
  toCross: MotionValue<number>;
}

/**
 * One of the mark's three shapes. Because every state shares a command
 * structure, the in-between frames are a plain lerp of the coordinate lists,
 * nested so the two progress values compose: logo → bar → ✕.
 *
 * The logo's three shapes sit side by side but the three lines are stacked,
 * so a uniform lerp drags them straight through each other into a blob at the
 * halfway point. Running y ahead of x fixes that: the shapes separate onto
 * their own rows first, then stretch out along them.
 */
export default function MorphPath({ shape, toBar, toCross }: Props) {
  const d = useTransform([toBar, toCross], ([bar, cross]: number[]) => {
    const yBar = ramp(bar, 0, 0.6);
    const xBar = ramp(bar, 0.3, 1);
    return toPath(
      shape.logo.map((from, i) => {
        const line = from + (shape.bar[i] - from) * (i % 2 ? yBar : xBar);
        return line + (shape.cross[i] - line) * cross;
      }),
      shape.kind
    );
  });

  return <motion.path d={d} />;
}
