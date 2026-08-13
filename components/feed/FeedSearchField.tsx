"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const HINT_INTERVAL_MS = 2600;

/**
 * The feed's search box, with a placeholder that cycles through example
 * queries to teach the vocabulary.
 *
 * It owns the cycling state on purpose: living in ProjectFeed, the interval
 * re-rendered every entry every 2.6s, and each entry is a `layout` motion
 * element — so framer-motion re-measured the whole feed on a timer. Keeping
 * it here means the tick only ever re-renders this input.
 */
export default function FeedSearchField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("feed");

  const hints = useMemo(
    () => t("searchHints").split("،").map((h) => h.trim()),
    [t]
  );
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setHintIndex((i) => (i + 1) % hints.length),
      HINT_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [hints.length]);

  return (
    <span className="ms-auto flex items-center gap-2 text-text-secondary">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={hints[hintIndex]}
        aria-label={t("searchLabel")}
        className="w-28 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary md:w-36"
      />
    </span>
  );
}
