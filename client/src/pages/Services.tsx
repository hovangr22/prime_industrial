import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CTA_INDUSTRY_IMG } from "@/lib/siteContent";
import { ArrowRight, ClipboardCheck, Headset, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Headset className="h-7 w-7" />,
      title: t("services.support.title"),
      body: t("services.support.body"),
    },
    {
      icon: <MapPin className="h-7 w-7" />,
      title: t("services.onsite.title"),
      body: t("services.onsite.body"),
    },
    {
      icon: <ClipboardCheck className="h-7 w-7" />,
      title: t("services.consultancy.title"),
      body: t("services.consultancy.body"),
    },
  ];

  return (
    <div>
      <PageHeader title={t("services.title")} subtitle={t("services.subtitle")} image={CTA_INDUSTRY_IMG} />

      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl border bg-card p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="absolute right-4 top-3 font-display text-6xl font-bold text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-lg bg-navy text-orange-brand">
                  {s.icon}
                </div>
                <h2 className="relative mt-5 font-display text-xl font-bold uppercase tracking-wide text-navy">
                  {s.title}
                </h2>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy">
        <div className="container flex flex-col items-center gap-6 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white lg:text-3xl">
            {t("home.cta.title")}
          </h2>
          <Button asChild size="lg" className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90">
            <Link href="/contact">
              {t("cta.contact")} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
