# How to Add a Project — DarSaif Studio

This guide explains how to add a new project to the website using Sanity Studio.
No coding required.

---

## Step 1 — Open Studio

Go to your website URL and add `/studio` at the end:

```
http://localhost:3000/studio        ← when developing locally
https://your-domain.com/studio      ← on the live site
```

Sign in with your Sanity account if prompted.

---

## Step 2 — Create a New Project

1. In the left sidebar, click **Project**
2. Click the **pencil / compose icon** (top right of the list) to create a new document

---

## Step 3 — Fill in the Fields

### Title (English) — required
The project name in English.
Example: `Al-Nakheel Villa`

### Title (Arabic)
The project name in Arabic.
Example: `فيلا النخيل`

### Slug — required
This becomes the URL of the project page.
Click **Generate** — it will be created automatically from the English title.
Example: `al-nakheel-villa` → URL will be `/projects/al-nakheel-villa`

> Do not change the slug after the project is published, or existing links will break.

### Project Type — required
Choose one from the dropdown:
- Residential — سكني
- Commercial — تجاري
- Urban — تطوير عمراني
- Planning — تخطيط
- Interior — تصميم داخلي

### Location
The city or area where the project is located.
Example: `Buraydah, Qassim`

### Year
The year the project was completed or designed.
Example: `2024`

### Description (English)
A paragraph or two describing the project. This appears on the project detail page.

### Description (Arabic)
The same description in Arabic.

### Cover Image — required
The main image shown on the projects list and at the top of the project page.

1. Click **Upload** and select an image from your computer
2. After uploading, drag the **hotspot circle** to focus on the most important part of the image — this is what stays visible when the image is cropped for different screen sizes

Recommended size: at least **1920 × 1080 px**

### Gallery
Additional images shown in the horizontal scroll strip on the project page.

1. Click **Add item**
2. Upload each image
3. Drag to reorder

Recommended size: at least **1200 × 900 px** per image

### Featured on Homepage
Tick this box if you want the project to appear in the **Featured Projects** section on the home page.

> Keep this to 3–4 projects maximum for the best layout.

---

## Step 4 — Publish

Once all required fields are filled:

1. Review the form — required fields are marked with a red dot if empty
2. Click the green **Publish** button at the bottom right

The project will appear on the website immediately.

---

## Editing an Existing Project

1. Click **Project** in the left sidebar
2. Click the project you want to edit
3. Make your changes
4. Click **Publish** to save

Changes are not live until you click Publish.

---

## Deleting a Project

1. Open the project document
2. Click the **three-dot menu** (top right of the document)
3. Choose **Delete**

> This cannot be undone. The project URL will stop working.

---

## Quick Reference

| Field | Required | Notes |
|---|---|---|
| Title (English) | Yes | Used in URL slug |
| Title (Arabic) | No | Shown to Arabic visitors |
| Slug | Yes | Auto-generated — do not change after publish |
| Project Type | Yes | Used for filtering on projects page |
| Location | No | Shown in project metadata |
| Year | No | Shown in project metadata |
| Description (English) | No | Main project text |
| Description (Arabic) | No | Arabic version of the text |
| Cover Image | Yes | Main image — minimum 1920×1080 px |
| Gallery | No | Extra images — minimum 1200×900 px each |
| Featured on Homepage | No | Tick for home page feature section |
