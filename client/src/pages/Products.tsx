import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import type { inferRouterOutputs } from "@trpc/server";
import { ArrowRight, PackageSearch } from "lucide-react";
import { useMemo, useState } from "react";
import type { AppRouter } from "../../../server/routers";

type ProductRow = inferRouterOutputs<AppRouter>["products"]["list"][number];

const DEFAULT_PLACEHOLDER = "/manus-storage/prod_metal_repair_dba10367.jpg";

export default function Products() {
  const { t, pick } = useLanguage();
  const [active, setActive] = useState<string | "all">("all");
  const [selected, setSelected] = useState<ProductRow | null>(null);
  const productsQuery = trpc.products.list.useQuery();

  const products = productsQuery.data ?? [];
  
  // Extract unique series from products (sorted numerically)
  const series = useMemo(
    () => {
      const unique = Array.from(new Set(products.map((p) => p.category)));
      return unique.sort((a, b) => {
        // Extract numeric part from category (e.g., "1000 Series" -> 1000)
        const aNum = parseInt(a.match(/\d+/)?.[0] || "999999");
        const bNum = parseInt(b.match(/\d+/)?.[0] || "999999");
        return aNum - bNum;
      });
    },
    [products],
  );

  const filtered = useMemo(
    () => {
      const filtered = active === "all" ? products : products.filter((p) => p.category === active);
      return filtered.sort((a, b) => {
        const aNum = parseInt(a.code.match(/\d+/)?.[0] || "0");
        const bNum = parseInt(b.code.match(/\d+/)?.[0] || "0");
        return aNum - bNum;
      });
    },
    [products, active],
  );

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
            {series.map((s) => (
              <FilterPill key={s} active={active === s} onClick={() => setActive(s)}>
                {s}
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
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelected(p)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(p);
                      }
                    }}
                    className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-brand"
                  >
                    <div className="h-48 overflow-hidden bg-secondary">
                      <img
                        src={p.imageUrl || DEFAULT_PLACEHOLDER}
                        alt={pick(p.nameEn, p.nameEl)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="inline-flex w-fit rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                        {p.category}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-navy">
                        {p.code}
                      </h3>
                      <p className="text-sm font-semibold text-foreground">{pick(p.nameEn, p.nameEl)}</p>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                        {pick(p.descriptionEn, p.descriptionEl)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-brand">
                        {t("products.viewDetails")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <ProductDetailDialog
        product={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

function ProductDetailDialog({
  product,
  onClose,
}: {
  product: ProductRow | null;
  onClose: () => void;
}) {
  const { t, pick } = useLanguage();

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-3xl">
        {product && (
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="h-56 overflow-hidden bg-secondary md:h-full">
              <img
                src={product.imageUrl || DEFAULT_PLACEHOLDER}
                alt={pick(product.nameEn, product.nameEl)}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col p-6 md:p-8">
              <span className="inline-flex w-fit rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                {product.category}
              </span>
              <DialogTitle className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-navy">
                {product.code}
              </DialogTitle>
              <p className="mt-1 text-base font-semibold text-foreground">
                {pick(product.nameEn, product.nameEl)}
              </p>

              <div className="mt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("products.detail.description")}
                </h4>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {pick(product.descriptionEn, product.descriptionEl) ||
                    t("products.detail.noDescription")}
                </p>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <Button asChild className="bg-orange-brand text-white hover:bg-orange-brand/90">
                  <a href="/contact">
                    {t("cta.getQuote")}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-navy/20 text-navy hover:bg-navy hover:text-white"
                >
                  {t("products.detail.close")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
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
