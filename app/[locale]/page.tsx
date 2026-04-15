import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import ServicesTeaserSection from "@/components/sections/ServicesTeaserSection";
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
      <FeaturedProjectsSection />
      <ServicesTeaserSection />
      <ContactCtaSection />
    </>
  );
}
