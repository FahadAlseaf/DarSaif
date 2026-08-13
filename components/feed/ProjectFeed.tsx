"use client";

import { memo, useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProject } from "@/sanity/lib/queries";
import ProjectGlyphMark, { glyphFor } from "@/components/najdi/ProjectGlyph";
import FeedSearchField from "./FeedSearchField";
import { ProjectPlaceholderArt } from "@/components/najdi/motifs";

/**
 * «السجل» — the homepage as a single project feed (big.dk's core idea,
 * DarSaif's skin). Each entry is glyph + title + location + cover; clicking
 * expands it IN PLACE: wider image, metadata rail on the start side,
 * description on the end side, gallery below. No project detail routing
 * from the feed — the archive is the site.
 */

type FilterKey = SanityProject["type"] | "all";

const FILTERS: FilterKey[] = [
  "all",
  "residential",
  "commercial",
  "urban",
  "planning",
  "interior",
];

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const arNum = (n: number | string) =>
  String(n).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);

export default function ProjectFeed({
  projects,
}: {
  projects: SanityProject[];
}) {
  const t = useTranslations("feed");
  const locale = useLocale();
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const isPlaceholder = projects.length === 0;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (filter !== "all" && p.type !== filter) return false;
      if (!q) return true;
      return [p.title, p.titleAr, p.location, p.locationAr]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(q));
    });
  }, [projects, filter, query]);

  // fmt and toggle are passed to every entry, so they have to keep a stable
  // identity or React.memo on FeedEntry can never hold.
  const fmt = useCallback(
    (n: number | string) => (isAr ? arNum(n) : String(n)),
    [isAr]
  );

  // Read through a ref rather than depending on openId, so opening an entry
  // doesn't hand every other entry a new callback and re-render the feed.
  const openIdRef = useRef<string | null>(null);
  openIdRef.current = openId;

  const toggle = useCallback(
    (id: string, slug: string) => {
      const next = openIdRef.current === id ? null : id;
      setOpenId(next);
      window.history.replaceState(null, "", next ? `#${slug}` : " ");
      if (next) {
        // Let the expansion start, then bring the entry into view
        // (matters most on mobile, where the entry grows tall).
        setTimeout(() => {
          document.getElementById(slug)?.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
            block: "start",
          });
        }, 100);
      }
    },
    [shouldReduceMotion]
  );

  return (
    // No top padding: main is already offset by the header height, and any
    // padding here stacks on top of that as dead space.
    <section className="pb-10" id="feed">
      {/* filter bar */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setOpenId(null);
              }}
              className={`relative pb-1 text-sm transition-colors ${
                filter === f
                  ? "text-text-primary after:absolute after:bottom-0 after:start-0 after:h-px after:w-full after:bg-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
          <FeedSearchField value={query} onChange={setQuery} />
        </div>

        {/* count line */}
        <div className="mt-6 mb-10 flex items-center gap-4 text-[11px] tracking-widest text-text-secondary">
          <span>
            {isPlaceholder
              ? t("placeholderCount")
              : t("count", { count: fmt(visible.length) })}
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
      </div>

      {/* feed */}
      <div className="mx-auto max-w-6xl px-6">
        {isPlaceholder ? (
          <PlaceholderFeed />
        ) : (
          visible.map((p) => (
            <FeedEntry
              key={p._id}
              project={p}
              isAr={isAr}
              fmt={fmt}
              open={openId === p._id}
              onToggle={toggle}
              reduceMotion={!!shouldReduceMotion}
            />
          ))
        )}
        {!isPlaceholder && visible.length === 0 && (
          <p className="py-24 text-center text-sm text-text-secondary">
            {t("noResults")}
          </p>
        )}
      </div>
    </section>
  );
}

/* ─── single entry ─────────────────────────────────────────────────────── */

/**
 * Memoised so a parent re-render doesn't walk every entry — only holds while
 * fmt/onToggle keep a stable identity upstream.
 *
 * Deliberately NOT a `layout` motion element: the AnimatePresence blocks below
 * already animate their own height, so the article's box follows on its own.
 * Adding `layout` on top of that bought nothing and cost a projection node per
 * entry plus a re-measure on every render.
 */
const FeedEntry = memo(function FeedEntry({
  project: p,
  isAr,
  fmt,
  open,
  onToggle,
  reduceMotion,
}: {
  project: SanityProject;
  isAr: boolean;
  fmt: (n: number | string) => string;
  open: boolean;
  onToggle: (id: string, slug: string) => void;
  reduceMotion: boolean;
}) {
  const t = useTranslations("feed");
  const handleToggle = () => onToggle(p._id, p.slug);
  const title = isAr ? p.titleAr ?? p.title : p.title;
  const location = isAr ? p.locationAr ?? p.location : p.location;
  const clientName = isAr ? p.clientNameAr ?? p.clientName : p.clientName;
  const description = (isAr ? p.descriptionAr ?? p.description : p.description) as
    | PortableTextBlock[]
    | undefined;

  const cover = p.coverImage
    ? urlFor(p.coverImage).width(1600).height(1000).url()
    : null;

  const spring = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 0.8, 0.24, 1] as const };

  return (
    <motion.article
      transition={spring}
      className="mb-24 scroll-mt-24 grid grid-cols-1 gap-y-4 md:grid-cols-[1fr_minmax(0,3fr)_1fr] md:gap-x-9"
      id={p.slug}
    >
      {/* meta — start side */}
      <div className="flex flex-col gap-2.5 md:items-end md:text-end">
        <button
          onClick={handleToggle}
          aria-expanded={open}
          className={`flex h-11 w-11 items-center justify-center rounded-sm transition-colors hover:bg-accent ${
            open ? "bg-accent" : "bg-text-primary"
          }`}
          aria-label={title}
        >
          <ProjectGlyphMark name={glyphFor(p)} className="h-6 w-6 text-bg" />
        </button>
        <h2
          onClick={handleToggle}
          className="max-w-[240px] cursor-pointer font-heading text-lg font-semibold leading-relaxed transition-colors hover:text-accent"
        >
          {title}
        </h2>
        {location && (
          <div className="text-[11px] tracking-widest text-text-secondary">
            {location}
          </div>
        )}

        {/* deep metadata rail — appears on expansion */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.dl
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={spring}
              className="mt-3 flex flex-col gap-3 overflow-hidden md:items-end"
            >
              {clientName && (
                <MetaField label={t("meta.client")} value={clientName} />
              )}
              <MetaField label={t("meta.type")} value={t(`filters.${p.type}`)} />
              {p.areaSqm != null && (
                <MetaField
                  label={t("meta.area")}
                  value={t("sqm", { value: fmt(p.areaSqm.toLocaleString("en-US")) })}
                />
              )}
              {p.status && (
                <MetaField label={t("meta.status")} value={t(`status.${p.status}`)} />
              )}
              {p.year != null && (
                <MetaField label={t("meta.year")} value={fmt(p.year)} />
              )}
            </motion.dl>
          )}
        </AnimatePresence>
      </div>

      {/* cover + gallery — center column */}
      <div>
        <motion.button
          onClick={handleToggle}
          aria-expanded={open}
          className="group block w-full cursor-pointer overflow-hidden rounded-sm bg-surface"
          transition={spring}
        >
          <div className="relative aspect-[16/10] w-full">
            {cover ? (
              <Image
                src={cover}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className={`object-cover transition-transform duration-700 ${
                  open ? "" : "group-hover:scale-[1.035]"
                }`}
              />
            ) : (
              <ProjectPlaceholderArt />
            )}
          </div>
        </motion.button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={spring}
              className="overflow-hidden"
            >
              {p.gallery && p.gallery.length > 0 && (
                <div className="mt-3.5 grid grid-cols-2 gap-3.5">
                  {p.gallery.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface"
                    >
                      <Image
                        src={urlFor(img).width(900).height(675).url()}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 30vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* description — end side on desktop, after the gallery on mobile */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={spring}
            className="overflow-hidden text-[13px] leading-loose text-text-primary md:max-w-[260px]"
          >
            {description && description.length > 0 ? (
              <PortableText value={description} />
            ) : (
              <p className="text-text-secondary">{t("noDescription")}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* close — always the last element of an open entry */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={spring}
            className="overflow-hidden text-center md:col-start-2"
          >
            <button
              onClick={handleToggle}
              className="mt-1 rounded-full border border-border px-6 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              {t("close")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
});

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 md:items-end">
      <dt className="text-[10px] font-medium tracking-[0.15em] text-accent">
        {label}
      </dt>
      <dd className="text-[13px]">{value}</dd>
    </div>
  );
}

/* ─── placeholder feed (no Sanity content yet) ─────────────────────────── */

function PlaceholderFeed() {
  const t = useTranslations("feed");
  return (
    <>
      {[0, 1, 2].map((i) => (
        <article
          key={i}
          className="mb-24 grid grid-cols-1 gap-y-4 md:grid-cols-[1fr_minmax(0,3fr)_1fr] md:gap-x-9"
        >
          <div className="flex flex-col gap-2.5 md:items-end md:text-end">
            <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-text-primary">
              <ProjectGlyphMark
                name={(["arch", "zigzag", "door"] as const)[i]}
                className="h-6 w-6 text-bg"
              />
            </div>
            <h2 className="font-heading text-lg font-semibold leading-relaxed">
              {t("placeholderTitle")}
            </h2>
            <div className="text-[11px] tracking-widest text-text-secondary">
              {t("placeholderMeta")}
            </div>
          </div>
          <div className="overflow-hidden rounded-sm bg-surface">
            <div className="relative aspect-[16/10] w-full">
              <ProjectPlaceholderArt variant={i} />
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
