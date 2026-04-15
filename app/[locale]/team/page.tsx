import { getTranslations, getLocale } from "next-intl/server";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { getAllTeamMembers } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata() {
  const [tt, tm] = await Promise.all([
    getTranslations("team"),
    getTranslations("meta"),
  ]);
  const title = tt("title");
  const description = tm("teamDescription");
  return { title, description, openGraph: { title, description } };
}

export default async function TeamPage() {
  const [members, t, locale] = await Promise.all([
    getAllTeamMembers(),
    getTranslations("team"),
    getLocale(),
  ]);

  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      {/* Page heading */}
      <h1 className="font-heading text-sm tracking-[0.3em] uppercase text-text-secondary mb-16">
        {t("title")}
      </h1>

      {/* Empty state */}
      {members.length === 0 && (
        <p className="font-body text-base text-text-secondary py-24 text-center">
          {t("empty")}
        </p>
      )}

      {/* Members list — designed to stack gracefully as new members are added */}
      {members.length > 0 && (
        <ul className="flex flex-col divide-y divide-border">
          {members.map((member) => {
            const name = isRTL && member.nameAr ? member.nameAr : member.name;
            const role = isRTL && member.roleAr ? member.roleAr : member.role;
            const bio = (
              isRTL && member.bioAr ? member.bioAr : member.bio
            ) as PortableTextBlock[] | undefined;
            const photo = member.photo as SanityImageSource | undefined;

            return (
              <li
                key={member._id}
                className="py-16 flex flex-col md:flex-row gap-10 md:gap-16"
              >
                {/* Photo */}
                <div className="shrink-0 w-full md:w-64">
                  {photo ? (
                    <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                      <Image
                        src={urlFor(photo).width(512).height(682).url()}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 256px, 100vw"
                      />
                    </div>
                  ) : (
                    /* Intentional placeholder when no photo is uploaded yet */
                    <div
                      aria-hidden="true"
                      className="aspect-[3/4] bg-surface border border-border"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center gap-6 flex-1">
                  <div>
                    <h2 className="font-heading text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[0.02em] text-text-primary mb-2">
                      {name}
                    </h2>
                    {role && (
                      <p className="font-body text-xs tracking-[0.25em] uppercase text-accent">
                        {role}
                      </p>
                    )}
                  </div>

                  {bio && bio.length > 0 && (
                    <div className="max-w-xl">
                      <PortableText
                        value={bio}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="font-body text-base text-text-secondary leading-relaxed mb-4 last:mb-0">
                                {children}
                              </p>
                            ),
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
