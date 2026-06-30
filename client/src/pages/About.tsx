import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { DISTRIBUTOR_BADGE, HERO_IMAGE } from "@/lib/siteContent";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const credentials = [
    t("home.value.exclusive.title"),
    t("services.support.title"),
    t("services.onsite.title"),
    t("home.value.solutions.title"),
  ];

  return (
    <div>
      <PageHeader title={t("about.title")} subtitle={t("about.lead")} image={HERO_IMAGE} />

      {/* Story */}
      <section className="py-16">
        <div className="container grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <div>
              <div className="h-1 w-12 rounded-full bg-orange-brand" />
              <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-navy">
                {t("about.story.title")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("about.story.body")}</p>
            </div>

            <div>
              <div className="h-1 w-12 rounded-full bg-orange-brand" />
              <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-navy">
                {t("about.partnership.title")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t("about.partnership.body")}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm font-medium text-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-brand" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Badge */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
              <img
                src={DISTRIBUTOR_BADGE}
                alt={t("about.badge.alt")}
                className="mx-auto h-52 w-52 object-contain"
              />
              <p className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-navy">
                {t("about.badge.caption")}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
