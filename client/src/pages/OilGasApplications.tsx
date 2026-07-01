import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Droplet, Wrench, Shield, Zap, Waves, Flame, Package, Layers, Recycle } from "lucide-react";
import { Link } from "wouter";

export default function OilGasApplications() {
  const { t, pick } = useLanguage();

  const apps = [
    {
      id: "vessels",
      titleEn: "Internal & External Protection of Process Vessels",
      titleEl: "Εσωτερική & Εξωτερική Προστασία Δεξαμενών Διεργασίας",
      descriptionEn: "Belzona elevated and high-temperature linings (up to 160°C) can be spray or hand-applied, forming a barrier between substrate and corrosive media. They resist erosion-corrosion, pressure and temperature fluctuations, steam-out and explosive decompression.",
      descriptionEl: "Οι επενδύσεις υψηλής θερμοκρασίας Belzona (έως 160°C) εφαρμόζονται με ψεκασμό ή στο χέρι, σχηματίζοντας φραγμό μεταξύ υποστρώματος και διαβρωτικών μέσων. Αντέχουν σε διάβρωση, διακυμάνσεις πίεσης/θερμοκρασίας και εκτόνωση.",
      products: ["1511", "1391T", "1391S"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "pipework",
      titleEn: "Pipework Repair & Protection",
      titleEl: "Επισκευή & Προστασία Σωληνώσεων",
      descriptionEn: "Thin-wall and through-wall damage repaired with Belzona metal repair composites. Belzona SuperWrap II restores strength to corroded, weakened and holed pipes and vessels — compliant with ISO 24817 and ASME PCC-2, up to 150°C — eliminating cut-and-weld hot work.",
      descriptionEl: "Ζημιές λεπτού και διαμπερούς τοιχώματος επισκευάζονται με σύνθετα Belzona. Το Belzona SuperWrap II αποκαθιστά την αντοχή σε διαβρωμένους σωλήνες — συμβατό με ISO 24817 και ASME PCC-2, έως 150°C — χωρίς θερμές εργασίες.",
      products: ["1111", "SuperWrap II", "3412"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-cyan-600 to-cyan-400",
    },
    {
      id: "cui",
      titleEn: "Corrosion Under Insulation (CUI)",
      titleEl: "Διάβρωση Κάτω από Μόνωση (CUI)",
      descriptionEn: "CUI can be repaired using surface-tolerant, heat-activated polymeric materials. Corrosion is further prevented by encapsulating the insulation with a microporous Belzona 3211 (Lagseal) system.",
      descriptionEl: "Η διάβρωση κάτω από μόνωση επισκευάζεται με θερμοενεργοποιούμενα πολυμερή υλικά. Η διάβρωση αποτρέπεται περαιτέρω με ενθυλάκωση της μόνωσης με το μικροπορώδες σύστημα Belzona 3211 (Lagseal).",
      products: ["5851", "3211"],
      icon: <Layers className="h-8 w-8" />,
      color: "from-amber-600 to-amber-400",
    },
    {
      id: "cold-bonding",
      titleEn: "Cold Bonding",
      titleEl: "Ψυχρή Συγκόλληση",
      descriptionEn: "Belzona provides cold bonding as an alternative to welding for installation and maintenance of decks, tanks, pipes and fittings — carried out safely in situ. Injection bonding technology repairs corroded structures during turnarounds or in operation.",
      descriptionEl: "Η Belzona προσφέρει ψυχρή συγκόλληση ως εναλλακτική στη συγκόλληση για καταστρώματα, δεξαμενές και σωλήνες — με ασφάλεια επί τόπου. Η τεχνολογία σύνδεσης με έγχυση επισκευάζει διαβρωμένες κατασκευές.",
      products: ["1111", "1121", "1811"],
      icon: <Package className="h-8 w-8" />,
      color: "from-slate-600 to-slate-400",
    },
    {
      id: "splash-zone",
      titleEn: "Splash Zone Repair & Protection",
      titleEl: "Επισκευή & Προστασία Ζώνης Παφλασμού",
      descriptionEn: "Corrosion-resistant repair composites and coatings repair rubber sheath and pitting corrosion damage, ensuring long-term erosion and corrosion protection of risers. Surface-tolerant coatings applied in situ at splash zones and below waterline.",
      descriptionEl: "Ανθεκτικά σύνθετα και επικαλύψεις επισκευάζουν ζημιές ελαστικού περιβλήματος και διάβρωση με βελονισμούς. Επιφανειακά ανεκτικές επικαλύψεις εφαρμόζονται επί τόπου στη ζώνη παφλασμού και κάτω από την ίσαλο γραμμή.",
      products: ["2111", "5831", "5831LT"],
      icon: <Waves className="h-8 w-8" />,
      color: "from-teal-600 to-teal-400",
    },
    {
      id: "storage-tanks",
      titleEn: "Storage Tank & Secondary Containment Protection",
      titleEl: "Προστασία Δεξαμενών & Δευτερεύουσας Ανάσχεσης",
      descriptionEn: "Solutions for damaged storage tanks including emergency leak sealing and cold plate bonding with fast-curing epoxies — no hot work. Tank bases sealed with breathable membranes; secondary containment repaired with concrete composites resistant to acids and alkalis.",
      descriptionEl: "Λύσεις για δεξαμενές: επείγουσα σφράγιση διαρροών και ψυχρή συγκόλληση με ταχείας ωρίμανσης εποξικά — χωρίς θερμές εργασίες. Οι βάσεις σφραγίζονται με αναπνέουσες μεμβράνες· οι περιοχές ανάσχεσης με ανθεκτικά σε οξέα σύνθετα.",
      products: ["3111", "4111", "4341"],
      icon: <Droplet className="h-8 w-8" />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: "carbon-capture",
      titleEn: "Carbon Capture",
      titleEl: "Δέσμευση Άνθρακα",
      descriptionEn: "Amine stripper columns that remove CO2 can suffer corrosion and wall-thickness reduction. Areas of metal loss are rebuilt with Belzona 1511. High-temperature coatings Belzona 1593 and 1391T protect against corrosion depending on the amine used.",
      descriptionEl: "Οι στήλες αφαίρεσης αμινών που απομακρύνουν CO2 μπορεί να διαβρωθούν. Οι περιοχές απώλειας μετάλλου ανακατασκευάζονται με Belzona 1511. Οι επικαλύψεις υψηλής θερμοκρασίας 1593 και 1391T προστατεύουν ανάλογα με την αμίνη.",
      products: ["1511", "1593", "1391T"],
      icon: <Recycle className="h-8 w-8" />,
      color: "from-green-600 to-green-400",
    },
    {
      id: "decommissioning",
      titleEn: "Decommissioning",
      titleEl: "Παροπλισμός",
      descriptionEn: "For fields nearing end of life, Belzona supports repair, bonding, sealing and coatings for the environment. Belzona 1111 and 1121 rebuild areas of metal loss; Belzona 1611 repairs underwater; Belzona 5831LT is designed for low-temperature environments like the North Sea.",
      descriptionEl: "Για πεδία στο τέλος ζωής, η Belzona υποστηρίζει επισκευή, συγκόλληση και επικαλύψεις. Τα 1111 και 1121 ανακατασκευάζουν απώλεια μετάλλου· το 1611 επισκευάζει υποβρύχια· το 5831LT σχεδιάστηκε για χαμηλές θερμοκρασίες όπως η Βόρεια Θάλασσα.",
      products: ["1111", "1121", "5831LT"],
      icon: <Flame className="h-8 w-8" />,
      color: "from-red-600 to-red-400",
    },
    {
      id: "other",
      titleEn: "Heat Exchangers, Pumps & Other Equipment",
      titleEl: "Εναλλάκτες Θερμότητας, Αντλίες & Λοιπός Εξοπλισμός",
      descriptionEn: "Belzona metal repair composites, high-temperature coatings and linings are also suitable for fenders and hoses, heat exchangers, seawater filters, centrifugal and vacuum pumps, chemical containment and separator vessels.",
      descriptionEl: "Τα σύνθετα Belzona, οι επικαλύψεις υψηλής θερμοκρασίας και οι επενδύσεις είναι κατάλληλα για προφυλακτήρες, εναλλάκτες θερμότητας, φίλτρα θαλασσινού νερού, φυγοκεντρικές αντλίες, ανάσχεση χημικών και διαχωριστές.",
      products: ["1321", "1341", "5811"],
      icon: <Zap className="h-8 w-8" />,
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
              <Droplet className="h-3 w-3" />
              {t("nav.industries")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl lg:text-6xl">
              Oil & Gas Applications
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
              Belzona epoxy-based metal repair composites, high-temperature coatings and linings have served the Oil and Gas industry since the late 1970s — designed for outstanding erosion, corrosion and chemical resistance offshore and onshore, at various temperatures and pressures.
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
              Need Oil & Gas Solutions?
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
