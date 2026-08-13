import { getTranslations } from "next-intl/server";
import { getFeedProjectsSafe } from "@/sanity/lib/queries";
import ProjectFeed from "@/components/feed/ProjectFeed";
import NajdiDivider from "@/components/najdi/NajdiDivider";
import ContactCtaSection from "@/components/sections/ContactCtaSection";

export async function generateMetadata() {
  const t = await getTranslations("meta");
  const description = t("homeDescription");
  return {
    description,
    openGraph: { title: "DarSaif Architecture", description },
  };
}

/**
 * «السجل» homepage — the site IS the project feed (big.dk's core idea).
 * The former hero/marquee/services/stats/philosophy sections were retired
 * from the homepage on 2026-08-13; their components remain in
 * components/sections for the inner pages.
 */
export default async function HomePage() {
  const projects = await getFeedProjectsSafe();

  return (
    <>
      <ProjectFeed projects={projects} />
      <NajdiDivider />
      <ContactCtaSection />
    </>
  );
}
