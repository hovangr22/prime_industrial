import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Anchor, Waves, Wrench, Shield, Zap, Wind } from "lucide-react";
import { Link } from "wouter";

export default function MaritimeApplications() {
  const { t, pick } = useLanguage();

  const maritimeApps = [
    {
      id: "rudder",
      titleEn: "Rudder Repair & Anti-Cavitation Protection",
      titleEl: "Επισκευή Πηδαλίου & Προστασία από Κοιλοτητα",
      descriptionEn: "Rudders suffer from severe erosion and corrosion damage. Belzona's metal rebuilding composites and elastomeric coatings stop cavitation and limit erosive forces, restoring rudders to full operational efficiency.",
      descriptionEl: "Τα πηδάλια υποφέρουν από σοβαρή διάβρωση και φθορά. Τα σύνθετα υλικά και οι ελαστομερικές επικαλύψεις της Belzona σταματούν την κοιλοτητα και περιορίζουν τις διαβρωτικές δυνάμεις.",
      products: ["1341", "2141", "1321"],
      icon: <Anchor className="h-8 w-8" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "propeller",
      titleEn: "Propeller Repair & Cavitation Prevention",
      titleEl: "Επισκευή Έλικας & Πρόληψη Κοιλοτητας",
      descriptionEn: "Propeller cavitation damage reduces vessel efficiency. Belzona solutions rebuild damaged areas and apply anti-cavitation coatings to prevent future damage, optimizing propulsion performance.",
      descriptionEl: "Η φθορά από κοιλοτητα της έλικας μειώνει την απόδοση του σκάφους. Οι λύσεις Belzona ανακατασκευάζουν τις φθαρμένες περιοχές και εφαρμόζουν επικαλύψεις αντικοιλοτητας.",
      products: ["1111", "1341", "2141"],
      icon: <Waves className="h-8 w-8" />,
      color: "from-cyan-600 to-cyan-400",
    },
    {
      id: "engine",
      titleEn: "Marine Engine Repair & Protection",
      titleEl: "Επισκευή & Προστασία Ναυτικών Κινητήρων",
      descriptionEn: "Marine engines suffer from cracked casings, cooling problems, and cavitation around cylinder blocks. High-temperature Belzona composites repair damage and extend engine life significantly.",
      descriptionEl: "Οι ναυτικοί κινητήρες υποφέρουν από σπασμένα κελύφη και προβλήματα ψύξης. Τα σύνθετα υλικά υψηλής θερμοκρασίας της Belzona επισκευάζουν τη φθορά.",
      products: ["1511", "1391T", "1391"],
      icon: <Zap className="h-8 w-8" />,
      color: "from-orange-600 to-orange-400",
    },
    {
      id: "stern-tube",
      titleEn: "Stern Tube Protection & Corrosion Prevention",
      titleEl: "Προστασία Σωλήνα Πρύμνης & Αντιδιάβρωση",
      descriptionEn: "Stern tubes face constant seawater exposure leading to corrosion and wear. Belzona ceramic metal composites rebuild corroded areas and provide long-term protection against marine corrosion.",
      descriptionEl: "Οι σωλήνες πρύμνης αντιμετωπίζουν συνεχή έκθεση στο θαλασσινό νερό. Τα κεραμικά σύνθετα υλικά της Belzona παρέχουν μακροχρόνια προστασία.",
      products: ["1311", "1331", "5811"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-slate-600 to-slate-400",
    },
    {
      id: "emergency",
      titleEn: "Emergency At-Sea Repairs",
      titleEl: "Εκτακτες Επισκευές στη Θάλασσα",
      descriptionEn: "Unplanned maintenance at sea requires fast, reliable solutions. Belzona 1212 provides safe, simple repairs for pipes, engines, shafts, and hydraulic rams on wet, oil-contaminated surfaces.",
      descriptionEl: "Οι απρόσμενες επισκευές στη θάλασσα απαιτούν γρήγορες λύσεις. Το Belzona 1212 παρέχει ασφαλείς επισκευές σε υγρές επιφάνειες.",
      products: ["1212"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-red-600 to-red-400",
    },
    {
      id: "tank",
      titleEn: "Storage Tank Repair & Protection",
      titleEl: "Επισκευή & Προστασία Δεξαμενών Αποθήκευσης",
      descriptionEn: "Marine tanks (fuel, water, ballast) suffer from leaks, corrosion, and chemical attack. Belzona provides emergency leak sealing and long-term protective coatings with potable water approvals.",
      descriptionEl: "Οι ναυτικές δεξαμενές υποφέρουν από διαρροές και διάβρωση. Τα προϊόντα Belzona παρέχουν σφράγιση διαρροών και μακροχρόνια προστασία.",
      products: ["1111", "5811", "5811DW2"],
      icon: <Waves className="h-8 w-8" />,
      color: "from-teal-600 to-teal-400",
    },
    {
      id: "pump",
      titleEn: "Seawater Pump Protection & Repair",
      titleEl: "Προστασία & Επισκευή Αντλιών Θαλασσινού Νερού",
      descriptionEn: "Saltwater pumps face severe corrosion and erosion. Belzona metal repair composites rebuild corroded substrates, while hydrophobic coatings enhance efficiency and prevent future damage.",
      descriptionEl: "Οι αντλίες θαλασσινού νερού αντιμετωπίζουν σοβαρή διάβρωση. Τα σύνθετα υλικά της Belzona ανακατασκευάζουν τις φθαρμένες επιφάνειες.",
      products: ["1111", "1341", "1321"],
      icon: <Waves className="h-8 w-8" />,
      color: "from-sky-600 to-sky-400",
    },
    {
      id: "shaft",
      titleEn: "Shaft In-Situ Repair",
      titleEl: "Επισκευή Άξονα In-Situ",
      descriptionEn: "Ship shafts operate under high mechanical forces and suffer damage and wear. Belzona metal rebuilding materials repair shafts in-situ with minimal downtime and lasting corrosion protection.",
      descriptionEl: "Οι άξονες του πλοίου λειτουργούν υπό υψηλές μηχανικές δυνάμεις. Τα υλικά της Belzona επισκευάζουν in-situ με ελάχιστη διακοπή.",
      products: ["1111", "1121", "1311"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: "rubber",
      titleEn: "Rubber Component Repair & Sealing",
      titleEl: "Επισκευή & Σφράγιση Ελαστικών Εξαρτημάτων",
      descriptionEn: "Marine rubber equipment (fenders, buoys, bellows, hoses) deteriorates in service. Belzona elastomers are cold-applied flexible polyurethanes that restore equipment to serviceable condition at a fraction of replacement cost.",
      descriptionEl: "Τα ελαστικά εξαρτήματα του πλοίου (προφυλακτήρες, σημαντήρες) υποφέρουν από φθορά. Τα ελαστομερή της Belzona επαναφέρουν τα εξαρτήματα σε λειτουργική κατάσταση.",
      products: ["2111", "2211", "2141"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      id: "equipment",
      titleEn: "Equipment Alignment & Chocking",
      titleEl: "Ευθυγράμμιση Εξοπλισμού & Στήριξη",
      descriptionEn: "Precise alignment of heavy ship propulsion systems and auxiliary machinery requires specialized chocking materials. Belzona 7111 (Marine Grade) provides vibration-resistant, pressure-resistant foundations.",
      descriptionEl: "Η ακριβής ευθυγράμμιση των βαρέων συστημάτων πρόωσης απαιτεί ειδικά υλικά. Το Belzona 7111 παρέχει ανθεκτικές βάσεις.",
      products: ["7111"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-amber-600 to-amber-400",
    },
    {
      id: "offshore",
      titleEn: "Offshore Platform & Wind Turbine Protection",
      titleEl: "Προστασία Θαλάσσιων Πλατφορμών & Ανεμογεννητριών",
      descriptionEn: "Offshore structures face extreme corrosion in splash zones and underwater environments. Belzona provides surface-tolerant repair materials and barrier coatings for long-term protection of risers, platform legs, and wind turbines.",
      descriptionEl: "Οι θαλάσσιες κατασκευές αντιμετωπίζουν ακραία διάβρωση. Τα προϊόντα Belzona παρέχουν μακροχρόνια προστασία σε ανεμογεννήτριες και πλατφόρμες.",
      products: ["5811", "5831", "1212"],
      icon: <Wind className="h-8 w-8" />,
      color: "from-emerald-600 to-emerald-400",
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-br from-navy via-navy/90 to-navy/70" />
        </div>

        <div className="container relative py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-brand/40 bg-orange-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-brand">
              <Anchor className="h-3 w-3" />
              {t("nav.industries")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl lg:text-6xl">
              Maritime Applications
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
              Comprehensive Belzona solutions for marine vessels, offshore structures, and maritime equipment. From emergency at-sea repairs to long-term corrosion protection, we deliver proven solutions approved by Lloyd's Register, ABS, DNV GL, and other major classification societies.
            </p>
          </div>
        </div>
      </section>

      {/* APPLICATIONS GRID */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {maritimeApps.map((app) => (
              <div
                key={app.id}
                className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br ${app.color} p-6 text-white`}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    {app.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-navy">
                    {pick(app.titleEn, app.titleEl)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pick(app.descriptionEn, app.descriptionEl)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {app.products.map((prod) => (
                      <span
                        key={prod}
                        className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-navy"
                      >
                        Belzona {prod}
                      </span>
                    ))}
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="mt-4 text-orange-brand hover:text-orange-brand/80"
                  >
                    <Link href="/products">
                      View Products <ArrowRight className="ml-1.5 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROVALS */}
      <section className="bg-secondary py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto h-1 w-14 rounded-full bg-orange-brand" />
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-navy lg:text-4xl">
              Marine Classification Approvals
            </h2>
            <p className="mt-3 text-muted-foreground">
              All Belzona marine products are approved by leading maritime classification societies and regulatory bodies worldwide.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Lloyd's Register",
              "American Bureau of Shipping",
              "Bureau Veritas",
              "DNV GL",
              "RINA Services",
              "China Classification Society",
              "Germanischer Lloyd",
              "Korean Register of Shipping",
            ].map((cert) => (
              <div
                key={cert}
                className="rounded-lg border border-navy/10 bg-white p-4 text-center text-sm font-semibold text-navy"
              >
                {cert}
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
              Need Maritime Solutions?
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Contact our maritime specialists for technical consultation, product recommendations, and on-site support.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90"
          >
            <Link href="/contact">
              Request Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
