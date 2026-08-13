import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ProjectGlyph =
  | "arch"
  | "door"
  | "zigzag"
  | "crenellation"
  | "dome"
  | "triangles";

export type ProjectStatus =
  | "completed"
  | "inProgress"
  | "inDesign"
  | "concept";

export interface SanityProject {
  _id: string;
  title: string;
  titleAr?: string;
  slug: string; // projected as "slug": slug.current in GROQ — returns a plain string
  type: "residential" | "commercial" | "urban" | "planning" | "interior";
  glyph?: ProjectGlyph;
  location?: string;
  locationAr?: string;
  clientName?: string;
  clientNameAr?: string;
  areaSqm?: number;
  status?: ProjectStatus;
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
  glyph,
  location,
  locationAr,
  clientName,
  clientNameAr,
  areaSqm,
  status,
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

// ─── Site settings (singleton) + safe variants ──────────────────────────────
// The homepage renders complete placeholder content when Sanity has no data
// (or is unreachable), so these helpers never throw.

export interface SanityStat {
  value: string;
  label?: string;
  labelAr?: string;
  description?: string;
  descriptionAr?: string;
}

export interface SanitySiteSettings {
  heroImage?: SanityImageSource;
  stats?: SanityStat[];
  email?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  whatsapp?: string;
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  try {
    return await client.fetch(
      groq`*[_type == "siteSettings"][0] {
        heroImage, stats, email, instagram, twitter, linkedin, whatsapp
      }`,
      {},
      fetchOptions
    );
  } catch {
    return null;
  }
}

/** Like getFeaturedProjects, but resolves to [] instead of throwing. */
export async function getFeaturedProjectsSafe(): Promise<SanityProject[]> {
  try {
    return (await getFeaturedProjects()) ?? [];
  } catch {
    return [];
  }
}

/** Like getAllProjects, but resolves to [] instead of throwing. */
export async function getAllProjectsSafe(): Promise<SanityProject[]> {
  try {
    return (await getAllProjects()) ?? [];
  } catch {
    return [];
  }
}

/**
 * Homepage feed: every project WITH detail fields (description + gallery),
 * since the feed expands projects inline instead of routing to a detail page.
 * Fine at this portfolio's scale; revisit if the archive grows past ~50.
 * Resolves to [] instead of throwing so the feed can fall back to placeholders.
 */
export async function getFeedProjectsSafe(): Promise<SanityProject[]> {
  try {
    return (
      (await client.fetch(
        groq`*[_type == "project"] | order(featured desc, year desc) { ${projectDetailFields} }`,
        {},
        fetchOptions
      )) ?? []
    );
  } catch {
    return [];
  }
}

/** Like getAllServices, but resolves to [] instead of throwing. */
export async function getAllServicesSafe(): Promise<SanityService[]> {
  try {
    return (await getAllServices()) ?? [];
  } catch {
    return [];
  }
}
