import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import StatsSection from "@/components/sections/StatsSection";
import NajdiDivider from "@/components/najdi/NajdiDivider";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import ServicesTeaserSection from "@/components/sections/ServicesTeaserSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ContactCtaSection from "@/components/sections/ContactCtaSection";

export async function generateMetadata() {
  const t = await getTranslations("meta");
  const description = t("homeDescription");
  return {
    description,
    openGraph: { title: "DarSaif Architecture", description },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <StatsSection />
      <NajdiDivider />
      <FeaturedProjectsSection />
      <ServicesTeaserSection />
      <PhilosophySection />
      <ContactCtaSection />
    </>
  );
}
