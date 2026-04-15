/**
 * Seed placeholder projects into Sanity for layout testing.
 *
 * Usage:
 *   1. Add SANITY_WRITE_TOKEN to .env.local
 *      (sanity.io/manage → your project → API → Tokens → Add API token → Editor)
 *   2. node scripts/seed-projects.mjs
 *
 * The script is idempotent — running it twice will update existing documents
 * rather than create duplicates (uses createOrReplace with fixed _id values).
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

// ─── Load .env.local ────────────────────────────────────────────────────────

function loadEnv() {
  try {
    const raw = readFileSync(join(process.cwd(), ".env.local"), "utf8");
    const env = {};
    for (const line of raw.split("\n")) {
      const m = line.match(/^([^#\s=][^=]*)=(.*)$/);
      if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    }
    return env;
  } catch {
    return {};
  }
}

const env = loadEnv();

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local");
  process.exit(1);
}
if (!token) {
  console.error("❌  SANITY_WRITE_TOKEN not found in .env.local");
  console.error(
    "   Go to sanity.io/manage → your project → API → Tokens → Add API token (Editor role)"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ─── Placeholder image upload ────────────────────────────────────────────────

async function uploadPlaceholder(slug) {
  // Fetch a simple gray placeholder PNG sized for a project cover (1200×800)
  const url = `https://placehold.co/1200x800/111111/444444/png`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching placeholder`);
  const buffer = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buffer, {
    filename: `placeholder-${slug}.png`,
    contentType: "image/png",
  });
}

// ─── Portable Text helpers ───────────────────────────────────────────────────

function block(text) {
  return {
    _type: "block",
    _key: uid(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: uid(), text, marks: [] }],
  };
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Project data ────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "seed-villa-al-qasr",
    title: "Villa Al-Qasr",
    titleAr: "فيلا القصر",
    slug: "villa-al-qasr",
    type: "residential",
    location: "Buraydah, Qassim",
    year: 2024,
    featured: true,
    descEn:
      "A contemporary residential villa combining traditional Najdi architectural elements with modern spatial planning. The design responds to the Qassim climate through deep shading devices and an internal courtyard that organises the private zones of the house.",
    descAr:
      "فيلا سكنية معاصرة تجمع بين عناصر العمارة النجدية التقليدية والتخطيط المكاني الحديث. يستجيب التصميم لمناخ منطقة القصيم من خلال أجهزة تظليل عميقة وفناء داخلي ينظّم المناطق الخاصة في المنزل.",
  },
  {
    id: "seed-al-waha-commercial",
    title: "Al-Waha Commercial Centre",
    titleAr: "مركز الواحة التجاري",
    slug: "al-waha-commercial-centre",
    type: "commercial",
    location: "Unaizah, Qassim",
    year: 2024,
    featured: true,
    descEn:
      "A mixed-use commercial centre in central Unaizah designed to activate the street edge through ground-floor retail and a shaded public forecourt. Upper levels accommodate office and service uses with views across the city.",
    descAr:
      "مركز تجاري متعدد الاستخدامات في وسط عنيزة، مصمم لتنشيط واجهة الشارع من خلال محلات تجارية في الطابق الأرضي وفناء عام مظلل. تستوعب الطوابق العليا الاستخدامات المكتبية والخدمية مع إطلالات على المدينة.",
  },
  {
    id: "seed-al-rawdah-plan",
    title: "Al-Rawdah District Plan",
    titleAr: "مخطط حي الروضة",
    slug: "al-rawdah-district-plan",
    type: "planning",
    location: "Buraydah, Qassim",
    year: 2023,
    featured: false,
    descEn:
      "An urban planning study for a 42-hectare residential district on the northern edge of Buraydah. The plan establishes a walkable street network, defined public open spaces, and a housing mix suited to extended-family living.",
    descAr:
      "دراسة تخطيط عمراني لحي سكني مساحته 42 هكتاراً على الحافة الشمالية لبريدة. يرسي المخطط شبكة شوارع صالحة للمشي ومساحات عامة مفتوحة محددة ومزيجاً من أنماط الإسكان يناسب السكن العائلي.",
  },
  {
    id: "seed-qassim-cultural-hub",
    title: "Qassim Cultural Hub",
    titleAr: "مركز القصيم الثقافي",
    slug: "qassim-cultural-hub",
    type: "urban",
    location: "Buraydah, Qassim",
    year: 2024,
    featured: false,
    descEn:
      "An urban design proposal for a civic and cultural precinct anchored by a central public square. The scheme weaves together a performance venue, library, and open market within a continuous shaded pedestrian network.",
    descAr:
      "مقترح تصميم حضري لحي مدني وثقافي يتمحور حول ميدان عام مركزي. يجمع المخطط بين قاعة للعروض ومكتبة وسوق مفتوح ضمن شبكة مشاة مظللة متواصلة.",
  },
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n🌱  Seeding placeholder projects → ${projectId} / ${dataset}\n`);

  for (const p of PROJECTS) {
    process.stdout.write(`  ${p.title} …`);

    try {
      // Upload a fresh placeholder image for each project
      const asset = await uploadPlaceholder(p.slug);

      const doc = {
        _type: "project",
        _id: p.id,
        title: p.title,
        titleAr: p.titleAr,
        slug: { _type: "slug", current: p.slug },
        type: p.type,
        location: p.location,
        year: p.year,
        featured: p.featured,
        coverImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
        description: [block(p.descEn)],
        descriptionAr: [block(p.descAr)],
      };

      await client.createOrReplace(doc);
      console.log(" ✓");
    } catch (err) {
      console.log(" ✗");
      console.error(`    ${err.message}`);
    }
  }

  console.log("\n✅  Done. Open Sanity Studio to review → /studio\n");
}

run();
