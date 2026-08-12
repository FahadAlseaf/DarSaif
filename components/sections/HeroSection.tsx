import {
  getAllProjectsSafe,
  getFeaturedProjectsSafe,
  getSiteSettings,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import HeroSectionClient from "./HeroSectionClient";

/**
 * V3 "Najdi Interactive" hero.
 * Arch image priority: Site Settings hero image → first featured project
 * cover → first project cover → null (illustrated Najdi-door placeholder).
 */
export default async function HeroSection() {
  const settings = await getSiteSettings();

  let archImageUrl: string | null = null;

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

  archImageUrl = tryUrl(settings?.heroImage);

  if (!archImageUrl) {
    const featured = await getFeaturedProjectsSafe();
    archImageUrl = tryUrl(featured[0]?.coverImage);
  }
  if (!archImageUrl) {
    const all = await getAllProjectsSafe();
    archImageUrl = tryUrl(all[0]?.coverImage);
  }

  return <HeroSectionClient archImageUrl={archImageUrl} />;
}
