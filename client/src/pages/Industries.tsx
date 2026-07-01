import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { INDUSTRIES } from "@/lib/siteContent";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Industries() {
  const { t, pick } = useLanguage();

  return (
    <div>
      <PageHeader
        title={t("industries.title")}
        subtitle={t("industries.subtitle")}
        image={INDUSTRIES[0].image}
      />

      <section className="py-16">
        <div className="container space-y-16">
          {INDUSTRIES.map((ind, i) => (
            <article
              id={ind.slug}
              key={ind.slug}
              className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2"
            >
              <div className={`overflow-hidden rounded-2xl ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <img
                  src={ind.image}
                  alt={pick(ind.titleEn, ind.titleEl)}
                  className="h-72 w-full object-cover lg:h-96"
                />
              </div>
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-orange-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-navy">
                  {pick(ind.titleEn, ind.titleEl)}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {pick(ind.bodyEn, ind.bodyEl)}
                </p>
                <div className="mt-6 flex gap-3">
                  {ind.slug === "maritime" && (
                    <Button asChild variant="default" className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90">
                      <Link href="/maritime">
                        View Applications <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {ind.slug === "oil-gas" && (
                    <Button asChild variant="default" className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90">
                      <Link href="/oil-gas">
                        View Applications <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {ind.slug === "power-generation" && (
                    <Button asChild variant="default" className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90">
                      <Link href="/power-generation">
                        View Applications <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {ind.slug === "petrochemical" && (
                    <Button asChild variant="default" className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90">
                      <Link href="/petrochemical">
                        View Applications <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="border-navy/20 text-navy hover:bg-navy hover:text-white"
                  >
                    <Link href="/contact">
                      {t("cta.getQuote")} <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
