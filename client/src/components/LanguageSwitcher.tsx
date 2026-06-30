import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/25 bg-white/10 p-0.5 text-xs font-semibold",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors duration-150",
          lang === "en" ? "bg-orange-brand text-orange-brand-foreground" : "text-white/80 hover:text-white",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("el")}
        aria-pressed={lang === "el"}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors duration-150",
          lang === "el" ? "bg-orange-brand text-orange-brand-foreground" : "text-white/80 hover:text-white",
        )}
      >
        ΕΛ
      </button>
    </div>
  );
}
