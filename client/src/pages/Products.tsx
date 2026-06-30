import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/siteContent";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { PackageSearch } from "lucide-react";
import { useMemo, useState } from "react";

export default function Products() {
  const { t, pick } = useLanguage();
  const [active, setActive] = useState<ProductCategory | "all">("all");
  const productsQuery = trpc.products.list.useQuery();

  const products = productsQuery.data ?? [];
  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [products, active],
  );

  const categoryImage = (cat: string) =>
    PRODUCT_CATEGORIES.find((c) => c.key === cat)?.image ?? PRODUCT_CATEGORIES[0].image;

  return (
    <div>
      <PageHeader title={t("products.title")} subtitle={t("products.subtitle")} />

      <section className="py-14">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <FilterPill active={active === "all"} onClick={() => setActive("all")}>
              {t("products.filter.all")}
            </FilterPill>
            {PRODUCT_CATEGORIES.map((c) => (
              <FilterPill key={c.key} active={active === c.key} onClick={() => setActive(c.key)}>
                {t(`cat.${c.key}`)}
              </FilterPill>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-10">
            {productsQuery.isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState message={t("products.empty")} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <article
                    key={p.id}
                    className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="h-48 overflow-hidden bg-secondary">
                      <img
                        src={p.imageUrl || categoryImage(p.category)}
                        alt={pick(p.nameEn, p.nameEl)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="inline-flex w-fit rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                        {t(`cat.${p.category}`)}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-navy">
                        {p.code}
                      </h3>
                      <p className="text-sm font-semibold text-foreground">{pick(p.nameEn, p.nameEl)}</p>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                        {pick(p.descriptionEn, p.descriptionEl)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 active:scale-[0.97]",
        active
          ? "bg-navy text-white"
          : "border border-navy/20 bg-white text-navy hover:border-orange-brand hover:text-orange-brand",
      )}
    >
      {children}
    </button>
  );
}

function EmptyState({ message }: { message: string }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
      <PackageSearch className="h-12 w-12 text-muted-foreground/50" />
      <p className="mt-4 text-muted-foreground">{message}</p>
      <Button asChild variant="outline" className="mt-6 border-navy/20 text-navy hover:bg-navy hover:text-white">
        <a href="/contact">{t("cta.contact")}</a>
      </Button>
    </div>
  );
}
