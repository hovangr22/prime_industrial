import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT, LOGO_URL } from "@/lib/siteContent";
import { cn } from "@/lib/utils";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const NAV_ITEMS = [
  { path: "/", key: "nav.home" },
  { path: "/products", key: "nav.products" },
  { path: "/applications", key: "nav.applications" },
  { path: "/industries", key: "nav.industries" },
  { path: "/services", key: "nav.services" },
  { path: "/about", key: "nav.about" },
  { path: "/contact", key: "nav.contact" },
];

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  const isActive = (path: string) => (path === "/" ? location === "/" : location.startsWith(path));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top utility bar */}
      <div className="hidden bg-navy text-navy-foreground md:block">
        <div className="container flex h-9 items-center justify-between text-xs">
          <span className="font-semibold tracking-wide text-white/90">
            {t("brand.tagline")}
          </span>
          <div className="flex items-center gap-5">
            <a href={CONTACT.phoneHref} className="flex items-center gap-1.5 text-white/85 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-orange-brand" />
              {CONTACT.phone}
            </a>
            <a href={CONTACT.emailHref} className="flex items-center gap-1.5 text-white/85 hover:text-white">
              <Mail className="h-3.5 w-3.5 text-orange-brand" />
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-shadow duration-200",
          scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-white",
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" className="flex shrink-0 items-center">
            <img src={LOGO_URL} alt="Prime Industrial" className="h-9 w-auto lg:h-11" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-150",
                  isActive(item.path)
                    ? "text-orange-brand"
                    : "text-navy hover:text-orange-brand",
                )}
              >
                {t(item.key)}
                {isActive(item.path) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-orange-brand" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="rounded-full bg-navy p-0.5">
              <LanguageSwitcher />
            </div>
            <Button asChild className="hidden bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90 sm:inline-flex">
              <Link href="/contact">{t("cta.getQuote")}</Link>
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t bg-white lg:hidden">
            <nav className="container flex flex-col py-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide",
                    isActive(item.path) ? "bg-accent text-orange-brand" : "text-navy",
                  )}
                >
                  {t(item.key)}
                </Link>
              ))}
              <Button asChild className="mt-2 mb-2 bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90">
                <Link href="/contact">{t("cta.getQuote")}</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="inline-flex rounded-md bg-white p-2.5">
            <img src={LOGO_URL} alt="Prime Industrial" className="h-9 w-auto" />
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{t("footer.about")}</p>
          <p className="mt-4 text-xs text-orange-brand font-semibold uppercase tracking-wider">
            {t("brand.tagline")}
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className="text-white/70 transition-colors hover:text-orange-brand">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            {t("footer.contact")}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>{CONTACT.addressLine1}</li>
            <li>{CONTACT.addressLine2}</li>
            <li>
              <a href={CONTACT.phoneHref} className="hover:text-orange-brand">{CONTACT.phone}</a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="hover:text-orange-brand">{CONTACT.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <span>© {year} {t("footer.company")}. {t("footer.rights")}</span>
          <span>{t("footer.distributorNote")}</span>
        </div>
      </div>
    </footer>
  );
}
