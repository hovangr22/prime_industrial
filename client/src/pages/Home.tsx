import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CTA_INDUSTRY_IMG,
  CTA_MARITIME_IMG,
  HERO_IMAGE,
  INDUSTRIES,
  SEED_APPLICATIONS,
} from "@/lib/siteContent";
import { trpc } from "@/lib/trpc";
import { Anchor, ArrowRight, Factory, Headset, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "wouter";

const INDUSTRY_ROUTES: Record<string, string> = {
  "oil-gas": "/oil-gas",
  "maritime": "/maritime",
  "power-generation": "/power-generation",
  "petrochemical": "/petrochemical",
  "buildings-structures": "/building-structures",
};

export default function Home() {
  const { t, pick } = useLanguage();
  const appsQuery = trpc.applications.list.useQuery();

  const apps =
    appsQuery.data && appsQuery.data.length > 0
      ? appsQuery.data.slice(0, 4).map((a) => ({
          title: pick(a.titleEn, a.titleEl),
          summary: pick(a.summaryEn, a.summaryEl),
          image: a.imageUrl || SEED_APPLICATIONS[0].image,
        }))
      : SEED_APPLICATIONS.map((a) => ({
          title: pick(a.titleEn, a.titleEl),
          summary: pick(a.summaryEn, a.summaryEl),
          image: a.image,
        }));

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/30" />
        </div>

        <div className="container relative grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-brand/40 bg-orange-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-brand">
              {t("home.hero.eyebrow")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl lg:text-6xl">
              {t("brand.tagline")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
              {t("home.hero.subtitle")}
            </p>


            {/* Sector quick-links */}
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-3">
              <SectorCard
                href="/maritime"
                image={CTA_MARITIME_IMG}
                icon={<Anchor className="h-5 w-5" />}
                label={t("home.hero.maritime")}
              />
              <SectorCard
                href="/industries"
                image={CTA_INDUSTRY_IMG}
                icon={<Factory className="h-5 w-5" />}
                label={t("home.hero.industry")}
              />
            </div>
          </div>
        </div>


      </section>

      {/* VALUE PROPS */}
      <section className="py-20">
        <div className="container">
          <SectionTitle title={t("home.value.title")} subtitle={t("home.value.subtitle")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ValueCard
              icon={<ShieldCheck className="h-7 w-7" />}
              title={t("home.value.exclusive.title")}
              body={t("home.value.exclusive.body")}
            />
            <ValueCard
              icon={<Headset className="h-7 w-7" />}
              title={t("home.value.support.title")}
              body={t("home.value.support.body")}
            />
            <ValueCard
              icon={<Wrench className="h-7 w-7" />}
              title={t("home.value.solutions.title")}
              body={t("home.value.solutions.body")}
            />
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-secondary py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle title={t("home.industries.title")} align="left" />
            <Button asChild variant="outline" className="border-navy/20 text-navy hover:bg-navy hover:text-white">
              <Link href="/industries">
                {t("cta.viewAll")} <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={INDUSTRY_ROUTES[ind.slug] ?? "/industries"}
                className="group relative h-56 overflow-hidden rounded-xl"
              >
                <img
                  src={ind.image}
                  alt={pick(ind.titleEn, ind.titleEl)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="h-0.5 w-8 rounded-full bg-orange-brand transition-all duration-300 group-hover:w-14" />
                  <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-white">
                    {pick(ind.titleEn, ind.titleEl)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle title={t("home.applications.title")} align="left" />
            <Button asChild variant="outline" className="border-navy/20 text-navy hover:bg-navy hover:text-white">
              <Link href="/applications">
                {t("cta.viewAll")} <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {apps.map((a, i) => (
              <div key={i} className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
                <div className="h-40 overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-navy">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{a.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy">
        <div className="container flex flex-col items-center gap-6 py-16 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white lg:text-4xl">
              {t("home.cta.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">{t("home.cta.body")}</p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90"
          >
            <Link href="/contact">
              {t("cta.contact")} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function SectorCard({
  href,
  image,
  icon,
  label,
}: {
  href: string;
  image: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-24 items-end overflow-hidden rounded-lg border border-white/15"
    >
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-navy/55" />
      <div className="relative flex items-center gap-2 p-4 text-orange-brand">
        {icon}
        <span className="font-display text-base font-bold uppercase tracking-wide text-white">{label}</span>
      </div>
    </Link>
  );
}

function SectionTitle({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`h-1 w-14 rounded-full bg-orange-brand ${align === "center" ? "mx-auto" : ""}`} />
      <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-navy lg:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function ValueCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-navy text-orange-brand">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
