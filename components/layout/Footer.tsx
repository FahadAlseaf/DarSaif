import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

export default function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 md:px-12 py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-heading text-lg tracking-[0.15em] text-text-primary uppercase">
            DarSaif
          </p>
          <p className="mt-1 text-sm text-text-secondary font-body">
            {tf("location")}
          </p>
        </div>

        <nav className="flex flex-wrap gap-6">
          {(
            [
              ["projects", "/projects"],
              ["services", "/services"],
              ["about", "/about"],
              ["team", "/team"],
              ["careers", "/careers"],
              ["contact", "/contact"],
            ] as const
          ).map(([key, href]) => (
            <Link
              key={key}
              href={href}
              className="text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-200 tracking-widest uppercase"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-text-secondary font-body">
          © {year} DarSaif. {tf("rights")}
        </p>
        <LanguageToggle />
      </div>
    </footer>
  );
}
