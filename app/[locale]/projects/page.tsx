import { getTranslations } from "next-intl/server";
import { getAllProjects } from "@/sanity/lib/queries";
import ProjectsList from "@/components/project/ProjectsList";

export async function generateMetadata() {
  const [tp, tm] = await Promise.all([
    getTranslations("projects"),
    getTranslations("meta"),
  ]);
  const title = tp("title");
  const description = tm("projectsDescription");
  return { title, description, openGraph: { title, description } };
}

export default async function ProjectsPage() {
  const [projects, t] = await Promise.all([
    getAllProjects(),
    getTranslations("projects"),
  ]);

  return (
    <div className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      {/* Page heading */}
      <h1 className="font-heading text-sm tracking-[0.3em] uppercase text-text-secondary mb-16">
        {t("title")}
      </h1>

      <ProjectsList projects={projects} />
    </div>
  );
}
