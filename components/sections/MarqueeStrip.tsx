import { getTranslations } from "next-intl/server";
import MarqueeClient from "./MarqueeClient";

/** Scrolling brand strip between the hero and the first content section. */
export default async function MarqueeStrip() {
  const t = await getTranslations("home");
  const items = [t("marqueeA"), t("marqueeB"), t("marqueeC"), t("marqueeD")];
  return <MarqueeClient items={items} />;
}
