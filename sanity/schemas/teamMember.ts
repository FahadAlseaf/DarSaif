import { defineField, defineType } from "sanity";

export const teamMemberSchema = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameAr",
      title: "Name (Arabic)",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role (English)",
      type: "string",
    }),
    defineField({
      name: "roleAr",
      title: "Role (Arabic)",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Bio (English)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "bioAr",
      title: "Bio (Arabic)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
