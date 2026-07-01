import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";

export type Lang = "en" | "el";

type Dict = Record<string, { en: string; el: string }>;

// Central UI string dictionary. Keys are dot-namespaced by area.
const DICT: Dict = {
  // Brand / global
  "brand.tagline": { en: "Official Exclusive Belzona Distributor for Greece & Cyprus", el: "Επίσημος Αποκλειστικός Διανομέας Belzona για Ελλάδα & Κύπρο" },
  "cta.contact": { en: "Contact Us", el: "Επικοινωνία" },
  "cta.getQuote": { en: "Request a Quote", el: "Ζητήστε Προσφορά" },
  "cta.learnMore": { en: "Learn More", el: "Μάθετε Περισσότερα" },
  "cta.viewAll": { en: "View All", el: "Δείτε Όλα" },
  "cta.explore": { en: "Explore", el: "Εξερευνήστε" },

  // Nav
  "nav.home": { en: "Home", el: "Αρχική" },
  "nav.products": { en: "Products", el: "Προϊόντα" },
  "nav.applications": { en: "Applications", el: "Εφαρμογές" },
  "nav.industries": { en: "Industries", el: "Κλάδοι" },
  "nav.services": { en: "Services", el: "Υπηρεσίες" },
  "nav.about": { en: "About Us", el: "Η Εταιρεία" },
  "nav.contact": { en: "Contact", el: "Επικοινωνία" },
  "nav.admin": { en: "Admin", el: "Διαχείριση" },

  // Home / hero
  "home.hero.eyebrow": { en: "Repair · Protect · Improve", el: "Επισκευή · Προστασία · Βελτίωση" },
  "home.hero.subtitle": {
    en: "From power generation and petrochemicals to shipping and shipyards, Prime Industrial delivers Belzona polymer composites, coatings and linings — backed by local 24-hour technical support and on-site assistance.",
    el: "Από την παραγωγή ενέργειας και τα πετροχημικά έως τη ναυτιλία και τα ναυπηγεία, η Prime Industrial προσφέρει σύνθετα πολυμερή, επιστρώσεις και επενδύσεις Belzona — με τοπική 24ωρη τεχνική υποστήριξη και επιτόπια συνδρομή.",
  },
  "home.hero.industry": { en: "For Industry", el: "Για τη Βιομηχανία" },
  "home.hero.maritime": { en: "For Maritime", el: "Για τη Ναυτιλία" },

  "home.stats.experience": { en: "Years of Belzona heritage", el: "Χρόνια κληρονομιάς Belzona" },
  "home.stats.support": { en: "Local technical support", el: "Τοπική τεχνική υποστήριξη" },
  "home.stats.industries": { en: "Core industries served", el: "Βασικοί κλάδοι που εξυπηρετούμε" },
  "home.stats.exclusive": { en: "Distributor for Greece & Cyprus", el: "Διανομέας για Ελλάδα & Κύπρο" },
  "home.stats.exclusiveValue": { en: "Exclusive", el: "Αποκλειστικός" },

  "home.value.title": { en: "Why Prime Industrial", el: "Γιατί Prime Industrial" },
  "home.value.subtitle": {
    en: "We pair world-class Belzona technology with engineering expertise on the ground in Greece and Cyprus.",
    el: "Συνδυάζουμε την κορυφαία τεχνολογία Belzona με τεχνογνωσία μηχανικού επί τόπου σε Ελλάδα και Κύπρο.",
  },
  "home.value.exclusive.title": { en: "Exclusive Belzona Distributor", el: "Αποκλειστικός Διανομέας Belzona" },
  "home.value.exclusive.body": {
    en: "Prime Industrial is the sole authorised distributor of Belzona products in Greece and Cyprus, ensuring genuine materials and full manufacturer support.",
    el: "Η Prime Industrial είναι ο μοναδικός εξουσιοδοτημένος διανομέας προϊόντων Belzona σε Ελλάδα και Κύπρο, εξασφαλίζοντας γνήσια υλικά και πλήρη υποστήριξη κατασκευαστή.",
  },
  "home.value.support.title": { en: "24-Hour Local Support", el: "24ωρη Τοπική Υποστήριξη" },
  "home.value.support.body": {
    en: "Our engineers provide rapid on-site assistance and consultancy, minimising downtime across industry and maritime operations.",
    el: "Οι μηχανικοί μας παρέχουν άμεση επιτόπια συνδρομή και συμβουλευτική, ελαχιστοποιώντας τον χρόνο διακοπής σε βιομηχανία και ναυτιλία.",
  },
  "home.value.solutions.title": { en: "Proven Solutions", el: "Δοκιμασμένες Λύσεις" },
  "home.value.solutions.body": {
    en: "Cold-applied repair composites and coatings solve erosion, corrosion, chemical attack and abrasion without hot work.",
    el: "Σύνθετα υλικά επισκευής και επιστρώσεις ψυχρής εφαρμογής αντιμετωπίζουν διάβρωση, οξείδωση, χημική προσβολή και τριβή χωρίς θερμές εργασίες.",
  },
  "home.industries.title": { en: "Industries We Serve", el: "Κλάδοι που Εξυπηρετούμε" },
  "home.applications.title": { en: "Featured Applications", el: "Επιλεγμένες Εφαρμογές" },
  "home.cta.title": { en: "Ready to solve your maintenance challenge?", el: "Έτοιμοι να λύσετε το πρόβλημα συντήρησής σας;" },
  "home.cta.body": {
    en: "Talk to our team about the right Belzona solution for your equipment and structures.",
    el: "Μιλήστε με την ομάδα μας για τη σωστή λύση Belzona για τον εξοπλισμό και τις κατασκευές σας.",
  },

  // Products
  "products.title": { en: "Belzona Products", el: "Προϊόντα Belzona" },
  "products.subtitle": {
    en: "Browse our range of Belzona repair composites, protective coatings and elastomer systems. Filter by series to find the right solution.",
    el: "Περιηγηθείτε στη γκάμα συνθέτων επισκευής, προστατευτικών επιστρώσεων και ελαστομερών Belzona. Φιλτράρετε ανά σειρά για να βρείτε τη σωστή λύση.",
  },
  "products.filter.all": { en: "All Products", el: "Όλα τα Προϊόντα" },
  "products.empty": { en: "No products in this category yet.", el: "Δεν υπάρχουν ακόμη προϊόντα σε αυτή την κατηγορία." },
  "products.viewDetails": { en: "View details", el: "Δείτε λεπτομέρειες" },
  "products.detail.category": { en: "Category", el: "Κατηγορία" },
  "products.detail.code": { en: "Product code", el: "Κωδικός προϊόντος" },
  "products.detail.description": { en: "Description", el: "Περιγραφή" },
  "products.detail.noDescription": { en: "More information about this product is available on request. Contact our team for a detailed technical data sheet.", el: "Περισσότερες πληροφορίες για αυτό το προϊόν διατίθενται κατόπιν αιτήματος. Επικοινωνήστε με την ομάδα μας για αναλυτικό τεχνικό φυλλάδιο." },
  "products.detail.close": { en: "Close", el: "Κλείσιμο" },

  // Categories (Series)
  "cat.1000 Series": { en: "1000 Series", el: "Σειρά 1000" },
  "cat.2000 Series": { en: "2000 Series", el: "Σειρά 2000" },
  "cat.3000 Series": { en: "3000 Series", el: "Σειρά 3000" },
  "cat.4000 Series": { en: "4000 Series", el: "Σειρά 4000" },
  "cat.5000 Series": { en: "5000 Series", el: "Σειρά 5000" },
  "cat.Other Products": { en: "Other Products", el: "Άλλα Προϊόντα" },

  // Applications
  "applications.title": { en: "Applications & Solutions", el: "Εφαρμογές & Λύσεις" },
  "applications.subtitle": {
    en: "Real-world maintenance solutions delivered with Belzona technology across industrial and maritime assets.",
    el: "Λύσεις συντήρησης πραγματικού κόσμου με τεχνολογία Belzona σε βιομηχανικά και ναυτιλιακά περιουσιακά στοιχεία.",
  },
  "applications.empty": { en: "Applications will appear here soon.", el: "Οι εφαρμογές θα εμφανιστούν εδώ σύντομα." },

  // Industries
  "industries.title": { en: "Industries We Serve", el: "Κλάδοι που Εξυπηρετούμε" },
  "industries.subtitle": {
    en: "Belzona solutions tailored to the demands of the most critical sectors in Greece and Cyprus.",
    el: "Λύσεις Belzona προσαρμοσμένες στις απαιτήσεις των πιο κρίσιμων κλάδων σε Ελλάδα και Κύπρο.",
  },

  // Services
  "services.title": { en: "Our Services", el: "Οι Υπηρεσίες μας" },
  "services.subtitle": {
    en: "More than products — Prime Industrial delivers end-to-end support to keep your operations running.",
    el: "Πέρα από προϊόντα — η Prime Industrial προσφέρει ολοκληρωμένη υποστήριξη για να διατηρεί τις λειτουργίες σας ενεργές.",
  },
  "services.support.title": { en: "24/7 Local Technical Support", el: "24/7 Τοπική Τεχνική Υποστήριξη" },
  "services.support.body": {
    en: "Round-the-clock guidance from Belzona-trained engineers serving Greece and Cyprus, available whenever a critical issue arises.",
    el: "Ολοήμερη καθοδήγηση από μηχανικούς εκπαιδευμένους στη Belzona που εξυπηρετούν Ελλάδα και Κύπρο, διαθέσιμη όποτε προκύψει κρίσιμο ζήτημα.",
  },
  "services.onsite.title": { en: "On-Site Assistance", el: "Επιτόπια Συνδρομή" },
  "services.onsite.body": {
    en: "Our specialists attend your facility or vessel to assess damage, recommend solutions and supervise application.",
    el: "Οι ειδικοί μας επισκέπτονται την εγκατάστασή σας ή το πλοίο για να αξιολογήσουν τη ζημιά, να προτείνουν λύσεις και να επιβλέψουν την εφαρμογή.",
  },
  "services.consultancy.title": { en: "Engineering Consultancy", el: "Συμβουλευτική Μηχανικού" },
  "services.consultancy.body": {
    en: "From material selection to long-term asset protection strategy, we advise on the most cost-effective approach.",
    el: "Από την επιλογή υλικού έως τη στρατηγική μακροχρόνιας προστασίας, σας συμβουλεύουμε για την πιο οικονομικά αποδοτική προσέγγιση.",
  },

  // About
  "about.title": { en: "About Prime Industrial", el: "Σχετικά με την Prime Industrial" },
  "about.lead": {
    en: "Prime Industrial is the Exclusive Authorised Distributor of Belzona products for Greece and Cyprus, serving industry and maritime clients with proven repair and protection solutions.",
    el: "Η Prime Industrial είναι ο Αποκλειστικός Εξουσιοδοτημένος Διανομέας προϊόντων Belzona για Ελλάδα και Κύπρο, εξυπηρετώντας πελάτες βιομηχανίας και ναυτιλίας με δοκιμασμένες λύσεις επισκευής και προστασίας.",
  },
  "about.story.title": { en: "Who We Are", el: "Ποιοι Είμαστε" },
  "about.story.body": {
    en: "Based in Piraeus, the heart of Greek shipping, Prime Industrial brings Belzona's globally trusted polymer technology to local industry and maritime operators. We combine genuine Belzona materials with hands-on engineering experience to repair, protect and improve equipment and structures — reducing downtime, extending asset life and cutting replacement costs.",
    el: "Με έδρα τον Πειραιά, την καρδιά της ελληνικής ναυτιλίας, η Prime Industrial φέρνει την παγκοσμίως αξιόπιστη τεχνολογία πολυμερών της Belzona στην τοπική βιομηχανία και τους ναυτιλιακούς φορείς. Συνδυάζουμε γνήσια υλικά Belzona με πρακτική εμπειρία μηχανικού για την επισκευή, προστασία και βελτίωση εξοπλισμού και κατασκευών — μειώνοντας τον χρόνο διακοπής, επεκτείνοντας τη διάρκεια ζωής και περιορίζοντας το κόστος αντικατάστασης.",
  },
  "about.partnership.title": { en: "Our Belzona Partnership", el: "Η Συνεργασία μας με τη Belzona" },
  "about.partnership.body": {
    en: "As the official and exclusive Belzona distributor for Greece and Cyprus, we have direct access to Belzona's manufacturing know-how, technical resources and continuous product innovation. Every solution we deliver carries the full backing of Belzona International.",
    el: "Ως ο επίσημος και αποκλειστικός διανομέας Belzona για Ελλάδα και Κύπρο, έχουμε άμεση πρόσβαση στην τεχνογνωσία παραγωγής, τους τεχνικούς πόρους και τη συνεχή καινοτομία προϊόντων της Belzona. Κάθε λύση που παρέχουμε φέρει την πλήρη υποστήριξη της Belzona International.",
  },
  "about.badge.alt": { en: "Belzona Authorised Distributor", el: "Εξουσιοδοτημένος Διανομέας Belzona" },
  "about.badge.caption": { en: "Official Authorised Belzona Distributor — Greece & Cyprus", el: "Επίσημος Εξουσιοδοτημένος Διανομέας Belzona — Ελλάδα & Κύπρο" },

  // Contact
  "contact.title": { en: "Get in Touch", el: "Επικοινωνήστε μαζί μας" },
  "contact.subtitle": {
    en: "Tell us about your maintenance challenge and our team will respond promptly with the right Belzona solution.",
    el: "Πείτε μας για το πρόβλημα συντήρησής σας και η ομάδα μας θα απαντήσει άμεσα με τη σωστή λύση Belzona.",
  },
  "contact.form.name": { en: "Full Name", el: "Ονοματεπώνυμο" },
  "contact.form.company": { en: "Company", el: "Εταιρεία" },
  "contact.form.email": { en: "Email", el: "Email" },
  "contact.form.phone": { en: "Telephone", el: "Τηλέφωνο" },
  "contact.form.sector": { en: "Area of Interest", el: "Τομέας Ενδιαφέροντος" },
  "contact.form.sector.industry": { en: "Industry", el: "Βιομηχανία" },
  "contact.form.sector.maritime": { en: "Maritime", el: "Ναυτιλία" },
  "contact.form.sector.general": { en: "General Enquiry", el: "Γενικό Ερώτημα" },
  "contact.form.message": { en: "Message", el: "Μήνυμα" },
  "contact.form.submit": { en: "Send Message", el: "Αποστολή Μηνύματος" },
  "contact.form.sending": { en: "Sending…", el: "Αποστολή…" },
  "contact.form.success": { en: "Thank you! We will get back to you shortly.", el: "Ευχαριστούμε! Θα επικοινωνήσουμε μαζί σας σύντομα." },
  "contact.form.error": { en: "Something went wrong. Please try again.", el: "Κάτι πήγε στραβά. Παρακαλούμε δοκιμάστε ξανά." },
  "contact.info.title": { en: "Contact Details", el: "Στοιχεία Επικοινωνίας" },
  "contact.info.address": { en: "Address", el: "Διεύθυνση" },
  "contact.info.phone": { en: "Phone", el: "Τηλέφωνο" },
  "contact.info.email": { en: "Email", el: "Email" },

  // Footer
  "footer.company": { en: "Prime Industrial", el: "Prime Industrial" },
  "footer.about": {
    en: "Official Exclusive Belzona Distributor for Greece & Cyprus, serving industry and maritime sectors with proven repair and protection solutions.",
    el: "Επίσημος Αποκλειστικός Διανομέας Belzona για Ελλάδα & Κύπρο, εξυπηρετώντας τους τομείς βιομηχανίας και ναυτιλίας με δοκιμασμένες λύσεις επισκευής και προστασίας.",
  },
  "footer.quickLinks": { en: "Quick Links", el: "Σύνδεσμοι" },
  "footer.contact": { en: "Contact", el: "Επικοινωνία" },
  "footer.rights": { en: "All rights reserved.", el: "Με την επιφύλαξη παντός δικαιώματος." },
  "footer.distributorNote": { en: "Authorised Belzona Distributor. Belzona® is a registered trademark of Belzona International Ltd.", el: "Εξουσιοδοτημένος Διανομέας Belzona. Το Belzona® είναι σήμα κατατεθέν της Belzona International Ltd." },

  // Common
  "common.loading": { en: "Loading…", el: "Φόρτωση…" },
  "common.backHome": { en: "Back to Home", el: "Επιστροφή στην Αρχική" },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  /** Pick the value matching the current language from a bilingual pair. */
  pick: (en?: string | null, el?: string | null) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "prime-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "el" ? "el" : "en";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((p) => (p === "en" ? "el" : "en")), []);

  // Owner-editable copy overrides (managed from the admin "Site Content" tab).
  // Falls back silently to the built-in dictionary when unavailable or unedited.
  const { data: overrides } = trpc.siteContent.list.useQuery(undefined, {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const t = useCallback(
    (key: string) => {
      const override = overrides?.[key];
      if (override) {
        const val = lang === "el" ? override.el ?? override.en : override.en ?? override.el;
        if (val != null && val !== "") return val;
      }
      const entry = DICT[key];
      if (!entry) return key;
      return entry[lang] ?? entry.en;
    },
    [lang, overrides],
  );

  const pick = useCallback(
    (en?: string | null, el?: string | null) => {
      if (lang === "el") return (el || en || "") as string;
      return (en || el || "") as string;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t, pick }),
    [lang, setLang, toggleLang, t, pick],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
