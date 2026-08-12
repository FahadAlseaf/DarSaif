import { defineField, defineType } from "sanity";

/**
 * Site Settings — a singleton document for homepage content that is not a
 * project/service/team member: hero image, stats, contact links.
 *
 * Every field is OPTIONAL by design. The frontend ships with placeholder
 * fallbacks for all of them, so an empty (or missing) document renders a
 * complete homepage. Fill fields in the Studio to replace placeholders.
 */
export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image (homepage)",
      description:
        "Optional. When set, the homepage hero shows this photo behind the wordmark. Leave empty to keep the illustrated Najdi placeholder.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stats",
      title: "Homepage Stats",
      description:
        "Optional. Shown in the dark stats section. Leave empty to keep placeholder figures (marked as placeholders on the page).",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "value",
              title: "Value (e.g. 120+, 98%)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "label", title: "Label (English)", type: "string" }),
            defineField({ name: "labelAr", title: "Label (Arabic)", type: "string" }),
            defineField({
              name: "description",
              title: "Short description (English)",
              type: "string",
            }),
            defineField({
              name: "descriptionAr",
              title: "Short description (Arabic)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "twitter",
      title: "X (Twitter) URL",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp link (wa.me/…)",
      type: "url",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
