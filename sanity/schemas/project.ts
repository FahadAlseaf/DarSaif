import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Urban", value: "urban" },
          { title: "Planning", value: "planning" },
          { title: "Interior", value: "interior" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "glyph",
      title: "Feed Pictogram (Najdi glyph)",
      description:
        "The small icon shown next to the project in the homepage feed. If empty, one is picked automatically from the project type.",
      type: "string",
      options: {
        list: [
          { title: "Najdi Arch — قوس", value: "arch" },
          { title: "Carved Door — باب", value: "door" },
          { title: "Zigzag — متعرج", value: "zigzag" },
          { title: "Crenellation — شرفات", value: "crenellation" },
          { title: "Dome — قبة", value: "dome" },
          { title: "Triangles — مثلثات", value: "triangles" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "locationAr",
      title: "Location (Arabic)",
      type: "string",
    }),
    defineField({
      name: "clientName",
      title: "Client (English)",
      type: "string",
    }),
    defineField({
      name: "clientNameAr",
      title: "Client (Arabic)",
      type: "string",
    }),
    defineField({
      name: "areaSqm",
      title: "Area (m²)",
      type: "number",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Completed — مكتمل", value: "completed" },
          { title: "Under Construction — قيد التنفيذ", value: "inProgress" },
          { title: "In Design — قيد التصميم", value: "inDesign" },
          { title: "Concept — تصور مبدئي", value: "concept" },
        ],
      },
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
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
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "coverImage",
    },
  },
});
