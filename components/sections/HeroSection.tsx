import { getSiteSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import HeroSectionClient from "./HeroSectionClient";

export default async function HeroSection() {
  // Safe fetch: resolves to null when Sanity is empty or unreachable,
  // in which case the hero renders its illustrated Najdi placeholder.
  const settings = await getSiteSettings();

  let heroImageUrl: string | null = null;
  if (settings?.heroImage) {
    try {
      heroImageUrl = urlFor(settings.heroImage).width(2000).height(1200).url();
    } catch {
      heroImageUrl = null;
    }
  }

  return <HeroSectionClient heroImageUrl={heroImageUrl} />;
}
