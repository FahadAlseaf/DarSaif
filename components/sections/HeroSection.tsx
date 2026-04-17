import { getAllProjects } from "@/sanity/lib/queries";
import HeroSectionClient from "./HeroSectionClient";

export default async function HeroSection() {
  const projects = await getAllProjects();
  return <HeroSectionClient projects={projects} />;
}
