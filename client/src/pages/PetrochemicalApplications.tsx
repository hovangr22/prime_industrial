import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, FlaskConical, Wrench, Shield, Droplet, Layers, Thermometer, Package } from "lucide-react";
import { Link } from "wouter";

export default function PetrochemicalApplications() {
  const { t, pick } = useLanguage();

  const apps = [
    {
      id: "pipework",
      titleEn: "Deterioration of Pipework",
      titleEl: "Φθορά Σωληνώσεων",
      descriptionEn: "Pipework suffering erosion, corrosion and CUI may leak or lose containment. Leaks are sealed in situ with surface-tolerant Belzona 1212, applied even on wet, underwater and oily substrates. SuperWrap II restores strength to holed surfaces up to 150°C.",
      descriptionEl: "Οι σωληνώσεις που υποφέρουν από διάβρωση και CUI μπορεί να παρουσιάσουν διαρροές. Οι διαρροές σφραγίζονται επί τόπου με το επιφανειακά ανεκτικό Belzona 1212, ακόμη και σε υγρές, υποβρύχιες και λιπαρές επιφάνειες. Το SuperWrap II αποκαθιστά αντοχή έως 150°C.",
      products: ["1212", "SuperWrap II", "5851"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-cyan-600 to-cyan-400",
    },
    {
      id: "process-vessels",
      titleEn: "Corrosion Protection for Process Vessels",
      titleEl: "Προστασία Διάβρωσης για Δεξαμενές Διεργασίας",
      descriptionEn: "Absorber towers and strippers face many corrosion problems. Belzona high-temperature linings including 1391T have a proven track record and resist problems associated with MEA, MDEA, sulfanol and other stripping agents, plus explosive decompression and steaming out.",
      descriptionEl: "Οι πύργοι απορρόφησης και οι στήλες αφαίρεσης αντιμετωπίζουν προβλήματα διάβρωσης. Οι επενδύσεις υψηλής θερμοκρασίας Belzona (1391T) αντέχουν σε MEA, MDEA, sulfanol και άλλους παράγοντες, καθώς και σε εκτόνωση και ατμό.",
      products: ["1391T", "1391S", "1593"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "storage-tanks",
      titleEn: "Storage Tank & Secondary Containment Protection",
      titleEl: "Προστασία Δεξαμενών & Δευτερεύουσας Ανάσχεσης",
      descriptionEn: "Belzona provides emergency leak sealing and cold metal bonding for damaged tanks with fast-curing epoxies such as 1212 — no hot work. Tank bases sealed with breathable membranes; containment areas protected with concrete composites resistant to acids and alkalis.",
      descriptionEl: "Η Belzona προσφέρει επείγουσα σφράγιση διαρροών και ψυχρή συγκόλληση για δεξαμενές με ταχείας ωρίμανσης εποξικά όπως το 1212 — χωρίς θερμές εργασίες. Οι βάσεις σφραγίζονται με αναπνέουσες μεμβράνες· οι περιοχές ανάσχεσης με ανθεκτικά σε οξέα σύνθετα.",
      products: ["1212", "3111", "4301"],
      icon: <Droplet className="h-8 w-8" />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: "containment-concrete",
      titleEn: "Concrete Containment & Chemical Resistance",
      titleEl: "Ανάσχεση Σκυροδέματος & Χημική Αντοχή",
      descriptionEn: "Containment areas and support structures are protected against chemical attack using Belzona concrete repair composites and coatings. Belzona 4111 and 4131 resurface damaged areas; Belzona 4311 (Magma CR1) provides long-term protection against acids and alkalis even at high temperatures.",
      descriptionEl: "Οι περιοχές ανάσχεσης και οι δομές στήριξης προστατεύονται από χημική προσβολή με σύνθετα και επικαλύψεις σκυροδέματος Belzona. Τα 4111 και 4131 αποκαθιστούν κατεστραμμένες περιοχές· το 4311 παρέχει μακροχρόνια προστασία από οξέα και αλκάλια.",
      products: ["4111", "4131", "4311"],
      icon: <Layers className="h-8 w-8" />,
      color: "from-amber-600 to-amber-400",
    },
    {
      id: "heat-exchangers",
      titleEn: "Heat Exchanger Repair & Protection",
      titleEl: "Επισκευή & Προστασία Εναλλακτών Θερμότητας",
      descriptionEn: "Solvent-free metal repair composites and epoxy coatings repair and protect heat exchangers damaged by erosion and corrosion on tube sheets, water boxes, division bars and end covers. Belzona materials are excellent electrical insulators, preventing galvanic corrosion.",
      descriptionEl: "Σύνθετα χωρίς διαλύτες και εποξικές επικαλύψεις επισκευάζουν και προστατεύουν εναλλάκτες θερμότητας από διάβρωση σε σωληνωτές πλάκες, θαλάμους νερού και καλύμματα. Τα υλικά Belzona είναι εξαιρετικοί ηλεκτρικοί μονωτές, αποτρέποντας γαλβανική διάβρωση.",
      products: ["1111", "1311", "5811"],
      icon: <Thermometer className="h-8 w-8" />,
      color: "from-red-600 to-red-400",
    },
    {
      id: "cui",
      titleEn: "Corrosion Under Insulation (CUI)",
      titleEl: "Διάβρωση Κάτω από Μόνωση (CUI)",
      descriptionEn: "Belzona offers insulation protection for pipes and insulated equipment using fire-resistant Belzona 3211 (Lagseal), which is simple to apply and resists water and UV radiation, preventing corrosion under insulation.",
      descriptionEl: "Η Belzona προσφέρει προστασία μόνωσης για σωλήνες και εξοπλισμό με το πυράντοχο Belzona 3211 (Lagseal), απλό στην εφαρμογή, ανθεκτικό στο νερό και την UV ακτινοβολία, αποτρέποντας τη διάβρωση κάτω από μόνωση.",
      products: ["3211", "5851"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-teal-600 to-teal-400",
    },
    {
      id: "pipe-supports",
      titleEn: "Pipe Support Bonding",
      titleEl: "Συγκόλληση Στηριγμάτων Σωλήνων",
      descriptionEn: "Pipe supports deteriorated by corrosion, wear and galvanic effects can lead to extended forced shutdowns. Belzona cold-applied composite repair materials bond new pipe supports, eliminating the requirement for welding.",
      descriptionEl: "Τα στηρίγματα σωλήνων που έχουν φθαρεί από διάβρωση και γαλβανικά φαινόμενα μπορούν να προκαλέσουν παρατεταμένες διακοπές. Τα ψυχρά σύνθετα υλικά Belzona συγκολλούν νέα στηρίγματα, εξαλείφοντας την ανάγκη συγκόλλησης.",
      products: ["1111", "1121"],
      icon: <Package className="h-8 w-8" />,
      color: "from-slate-600 to-slate-400",
    },
    {
      id: "other",
      titleEn: "Pumps, Valves & Other Equipment",
      titleEl: "Αντλίες, Βαλβίδες & Λοιπός Εξοπλισμός",
      descriptionEn: "Belzona repair composites, high-temperature coatings and linings are also suitable for pump repair, valve restoration (seats, seals, casings), conveyor belts and rubber repairs, protective floor coatings and anti-seize for mating compounds.",
      descriptionEl: "Τα σύνθετα Belzona, οι επικαλύψεις υψηλής θερμοκρασίας και οι επενδύσεις είναι κατάλληλα για επισκευή αντλιών, αποκατάσταση βαλβίδων, ιμάντες μεταφοράς, επικαλύψεις δαπέδων και αντικολλητικά.",
      products: ["1321", "2211", "4341"],
      icon: <FlaskConical className="h-8 w-8" />,
      color: "from-purple-600 to-purple-400",
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-br from-navy via-navy/90 to-navy/70" />
        </div>
        <div className="container relative py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-brand/40 bg-orange-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-brand">
              <FlaskConical className="h-3 w-3" />
              {t("nav.industries")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl lg:text-6xl">
              Petrochemical Applications
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
              The petrochemical industry regularly faces erosion, corrosion, chemical attack, wear and mechanical damage. Rather than replacing assets, engineers use Belzona's solvent-free epoxy composites, high-temperature coatings and linings for reliable, long-lasting maintenance solutions applied in situ.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
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

      <section className="bg-navy">
        <div className="container flex flex-col items-center gap-6 py-16 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white lg:text-4xl">
              Need Petrochemical Solutions?
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Contact our specialists for technical consultation, product recommendations, and on-site support.
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
