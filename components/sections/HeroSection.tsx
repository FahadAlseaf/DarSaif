import {
  getAllProjectsSafe,
  getFeaturedProjectsSafe,
  getSiteSettings,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import HeroSectionClient from "./HeroSectionClient";

/**
 * V3 "Najdi Interactive" hero with a rotating arch image.
 * Collects every available image (Site Settings hero image first, then
 * featured project covers, then the rest), deduplicated, max 6.
 * Empty list → illustrated Najdi-door placeholder.
 */
export default async function HeroSection() {
  const settings = await getSiteSettings();

  const tryUrl = (source: unknown): string | null => {
    try {
      return source
        ? urlFor(source as Parameters<typeof urlFor>[0])
            .width(1100)
            .height(1400)
            .url()
        : null;
    } catch {
      return null;
    }
  };

  const urls: string[] = [];
  const push = (u: string | null) => {
    if (u && !urls.includes(u)) urls.push(u);
  };

  push(tryUrl(settings?.heroImage));

  const featured = await getFeaturedProjectsSafe();
  featured.forEach((p) => push(tryUrl(p.coverImage)));

  if (urls.length < 2) {
    const all = await getAllProjectsSafe();
    all.forEach((p) => push(tryUrl(p.coverImage)));
  }

  return <HeroSectionClient archImageUrls={urls.slice(0, 6)} />;
}
