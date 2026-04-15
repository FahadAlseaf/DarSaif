"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale() {
    const next = locale === "en" ? "ar" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-200 tracking-widest uppercase"
      aria-label="Switch language"
    >
      {locale === "en" ? "AR" : "EN"}
    </button>
  );
}
