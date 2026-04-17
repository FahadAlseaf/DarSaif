import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-heading text-[8rem] leading-none text-text-secondary/20 select-none mb-8">
        {t("heading")}
      </p>
      <h1 className="font-heading text-2xl md:text-3xl text-text-primary mb-4">
        {t("title")}
      </h1>
      <p className="font-body text-sm text-text-secondary mb-12 max-w-sm">
        {t("body")}
      </p>
      <Link
        href="/"
        className="font-body text-xs tracking-[0.25em] uppercase text-text-primary border border-border px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-200"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
