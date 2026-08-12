import { getTranslations } from "next-intl/server";

/** Scrolling brand strip between the hero and the first content section. */
export default async function MarqueeStrip() {
  const t = await getTranslations("home");
  const items = [t("marqueeA"), t("marqueeB"), t("marqueeC"), t("marqueeD")];

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
      {/* direction:ltr keeps the translateX animation identical in RTL */}
      <div className="animate-marquee flex w-max" style={{ direction: "ltr" }}>
        <Sequence />
        <Sequence />
        <Sequence />
        <Sequence />
      </div>
    </div>
  );
}
