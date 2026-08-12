import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import { NajdiDoor } from "@/components/najdi/motifs";

/** "From Najd earth to the future" — design philosophy with door geometry. */
export default async function PhilosophySection() {
  const [t, locale] = await Promise.all([
    getTranslations("home"),
    getLocale(),
  ]);
  const isRTL = locale === "ar";
  const arrow = isRTL ? "↖" : "↗";
  const points = [
    t("philPoint1"),
    t("philPoint2"),
    t("philPoint3"),
    t("philPoint4"),
  ];

  return (
    <section
      aria-label={`${t("philosophyPre")} ${t("philosophyAccent")} ${t("philosophyPost")}`}
      className="bg-bg"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <h2 className="mb-9 font-heading text-4xl font-extrabold leading-snug md:text-6xl">
              {t("philosophyPre")}{" "}
              <span className="font-accent font-normal text-accent">
                {t("philosophyAccent")}
              </span>
              <br />
              {t("philosophyPost")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-loose text-text-primary/80">
              {t("philosophyBody")}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="my-9">
              {points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3.5 border-t border-border py-3.5 text-[15px] font-medium last:border-b"
                >
                  <span aria-hidden="true" className="text-[10px] text-accent">
                    ◆
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.24}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-bg transition-transform hover:-translate-y-0.5"
            >
              {t("philosophyCta")} <span aria-hidden="true">{arrow}</span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-2xl bg-surface">
            <NajdiDoor />
            <div className="absolute inset-x-6 bottom-6 rounded-xl border border-bg/60 bg-bg/60 p-4 text-[13px] font-medium leading-relaxed backdrop-blur-md">
              {t("philCallout")}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
