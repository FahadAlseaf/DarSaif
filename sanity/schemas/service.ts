import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleAr",
      title: "Title (Arabic)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description (English)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "descriptionAr",
      title: "Description (Arabic)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "icon",
      title: "Icon Name (optional)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
