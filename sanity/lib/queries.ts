import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SanityProject {
  _id: string;
  title: string;
  titleAr?: string;
  slug: string; // projected as "slug": slug.current in GROQ — returns a plain string
  type: "residential" | "commercial" | "urban" | "planning" | "interior";
  location?: string;
  year?: number;
  description?: unknown[];
  descriptionAr?: unknown[];
  coverImage: SanityImageSource;
  gallery?: SanityImageSource[];
  featured: boolean;
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  nameAr?: string;
  role?: string;
  roleAr?: string;
  bio?: unknown[];
  bioAr?: unknown[];
  photo?: unknown;
}

export interface SanityService {
  _id: string;
  title: string;
  titleAr?: string;
  description?: unknown[];
  descriptionAr?: unknown[];
  icon?: string;
}

// ─── Queries ─────────────────────────────────────────────────────────────────

const projectFields = groq`
  _id,
  title,
  titleAr,
  "slug": slug.current,
  type,
  location,
  year,
  coverImage,
  featured
`;

const projectDetailFields = groq`
  ${projectFields},
  description,
  descriptionAr,
  gallery
`;

const fetchOptions = { cache: "no-store" } as const;

export async function getAllProjects(): Promise<SanityProject[]> {
  return client.fetch(
    groq`*[_type == "project"] | order(year desc) { ${projectFields} }`,
    {},
    fetchOptions
  );
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  return client.fetch(
    groq`*[_type == "project" && featured == true] | order(year desc) { ${projectFields} }`,
    {},
    fetchOptions
  );
}

export async function getProjectBySlug(
  slug: string
): Promise<SanityProject | null> {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] { ${projectDetailFields} }`,
    { slug },
    fetchOptions
  );
}

export async function getAdjacentProjects(
  currentSlug: string
): Promise<{ prev: SanityProject | null; next: SanityProject | null }> {
  const all: SanityProject[] = await getAllProjects();
  const index = all.findIndex((p) => p.slug === currentSlug);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export async function getAllTeamMembers(): Promise<SanityTeamMember[]> {
  return client.fetch(
    groq`*[_type == "teamMember"] {
      _id, name, nameAr, role, roleAr, bio, bioAr, photo
    }`,
    {},
    fetchOptions
  );
}

export async function getAllServices(): Promise<SanityService[]> {
  return client.fetch(
    groq`*[_type == "service"] {
      _id, title, titleAr, description, descriptionAr, icon
    }`,
    {},
    fetchOptions
  );
}
