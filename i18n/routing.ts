import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  // Arabic-first: "/" always serves Arabic (no browser-language redirect);
  // English lives under /en.
  defaultLocale: "ar",
  localePrefix: "as-needed",
  localeDetection: false,
});
