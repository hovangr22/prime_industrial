import { PageHeader } from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEED_APPLICATIONS } from "@/lib/siteContent";
import { trpc } from "@/lib/trpc";

export default function Applications() {
  const { t, pick } = useLanguage();
  const query = trpc.applications.list.useQuery();

  const items =
    query.data && query.data.length > 0
      ? query.data.map((a) => ({
          title: pick(a.titleEn, a.titleEl),
          summary: pick(a.summaryEn, a.summaryEl),
          description: pick(a.descriptionEn, a.descriptionEl),
          image: a.imageUrl || SEED_APPLICATIONS[0].image,
        }))
      : SEED_APPLICATIONS.map((a) => ({
          title: pick(a.titleEn, a.titleEl),
          summary: pick(a.summaryEn, a.summaryEl),
          description: "",
          image: a.image,
        }));

  return (
    <div>
      <PageHeader
        title={t("applications.title")}
        subtitle={t("applications.subtitle")}
        image={SEED_APPLICATIONS[1].image}
      />

      <section className="py-16">
        <div className="container">
          {query.isLoading ? (
            <div className="grid gap-10">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {items.map((a, i) => (
                <article
                  key={i}
                  className={`grid items-center gap-8 overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="h-64 overflow-hidden lg:h-full">
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-8 lg:p-10">
                    <div className="h-1 w-12 rounded-full bg-orange-brand" />
                    <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-navy">
                      {a.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-foreground">{a.summary}</p>
                    {a.description && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                        {a.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
