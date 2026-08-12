import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

const NAV_LINKS = [
  ["projects", "/projects"],
  ["services", "/services"],
  ["about", "/about"],
  ["team", "/team"],
  ["careers", "/careers"],
  ["contact", "/contact"],
] as const;

export default function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-night-border bg-night text-night-text">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:px-12">
        {/* Brand */}
        <div>
          <p className="font-heading text-2xl font-extrabold">
            {locale === "ar" ? "دار سيف" : "DARSAIF"}
          </p>
          <p className="mt-1 text-[10px] font-medium tracking-[0.3em] text-night-text-secondary">
            {locale === "ar" ? "DARSAIF ARCHITECTURE" : "دار سيف للعمارة"}
          </p>
          <p className="mt-5 max-w-xs text-sm leading-loose text-night-text-secondary">
            {tf("blurb")}
          </p>
          <p className="mt-4 text-sm text-night-text-secondary">
            {tf("location")}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-5 text-[10px] font-medium tracking-[0.3em] text-night-text-secondary">
            {tf("navLabel")}
          </p>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3.5">
            {NAV_LINKS.map(([key, href]) => (
              <Link
                key={key}
                href={href}
                className="font-heading text-base font-bold text-night-text transition-colors duration-200 hover:text-accent-soft"
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-night-border px-6 py-6 md:px-12">
        <p className="text-xs text-night-text-secondary">
          © {year} DarSaif. {tf("rights")}
        </p>
        <LanguageToggle />
      </div>
    </footer>
  );
}
