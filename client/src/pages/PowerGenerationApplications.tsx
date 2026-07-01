import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Zap, Wrench, Droplet, Layers, Wind, Flame, Package } from "lucide-react";
import { Link } from "wouter";

export default function PowerGenerationApplications() {
  const { t, pick } = useLanguage();

  const apps = [
    {
      id: "fluid-handling",
      titleEn: "Repair & Protection of Fluid Handling Equipment",
      titleEl: "Επισκευή & Προστασία Εξοπλισμού Διαχείρισης Ρευστών",
      descriptionEn: "Severely damaged pumps and tube sheets are rebuilt and restored, then protected against erosion, corrosion and chemical attack. Belzona 1341 (Supermetalglide) is proven to increase pump efficiency up to 7% on new equipment and up to 20% on refurbished equipment.",
      descriptionEl: "Οι σοβαρά κατεστραμμένες αντλίες και σωληνωτές πλάκες ανακατασκευάζονται και προστατεύονται από διάβρωση και χημική προσβολή. Το Belzona 1341 (Supermetalglide) αυξάνει την απόδοση αντλιών έως 7% σε νέο και έως 20% σε ανακαινισμένο εξοπλισμό.",
      products: ["1111", "1321", "1341"],
      icon: <Droplet className="h-8 w-8" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "abrasion",
      titleEn: "Abrasion Resistant Systems",
      titleEl: "Συστήματα Ανθεκτικά στην Τριβή",
      descriptionEn: "Belzona coatings and metal repair composites slow erosion in solids handling and FGD systems, resisting corrosion even where chemicals and high temperatures are present. High-build erosion-resistant materials restore eroded steelwork.",
      descriptionEl: "Οι επικαλύψεις και τα σύνθετα Belzona επιβραδύνουν τη διάβρωση σε συστήματα διαχείρισης στερεών και FGD, αντιστεκόμενα σε χημικά και υψηλές θερμοκρασίες. Τα υλικά υψηλής αντοχής αποκαθιστούν διαβρωμένο χάλυβα.",
      products: ["1311", "1811", "1812"],
      icon: <Layers className="h-8 w-8" />,
      color: "from-amber-600 to-amber-400",
    },
    {
      id: "cavitation",
      titleEn: "Cavitation Resistant Turbine Linings",
      titleEl: "Επενδύσεις Στροβίλων Ανθεκτικές στην Κοιλότητα",
      descriptionEn: "Cavitation-resistant elastomers such as Belzona 2141 (ACR-Fluid Elastomer) are ideal for lining turbine runners, wicket gates and other fluid handling equipment, resisting the impact of imploding cavitation bubbles and reducing running costs.",
      descriptionEl: "Τα ανθεκτικά στην κοιλότητα ελαστομερή όπως το Belzona 2141 είναι ιδανικά για επένδυση δρομέων στροβίλων και θυρών, αντιστεκόμενα στην κρούση των φυσαλίδων κοιλότητας και μειώνοντας το κόστος λειτουργίας.",
      products: ["2141", "1321"],
      icon: <Zap className="h-8 w-8" />,
      color: "from-cyan-600 to-cyan-400",
    },
    {
      id: "pipework",
      titleEn: "Pipework Repair & Protection",
      titleEl: "Επισκευή & Προστασία Σωληνώσεων",
      descriptionEn: "Thin-wall and through-wall defects repaired using Belzona wrap systems or cold plate bonding. Belzona SuperWrap II is an ISO and ASME compliant solution for pressurised, weakened or holed pipes — applied in situ, eliminating cut-and-weld hot work.",
      descriptionEl: "Ελαττώματα λεπτού και διαμπερούς τοιχώματος επισκευάζονται με συστήματα περιτύλιξης Belzona ή ψυχρή συγκόλληση. Το Belzona SuperWrap II είναι συμβατό με ISO/ASME για σωλήνες υπό πίεση — επί τόπου, χωρίς θερμές εργασίες.",
      products: ["1111", "1212", "SuperWrap II"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-teal-600 to-teal-400",
    },
    {
      id: "containment",
      titleEn: "Linings for Chemical Containment, Channels & Sumps",
      titleEl: "Επενδύσεις για Ανάσχεση Χημικών, Κανάλια & Φρεάτια",
      descriptionEn: "Applied by brush or airless spray, areas such as chemical bunds, channels and sumps are effectively lined for long-term environmental protection. Belzona 4311 (Magma CR1) provides chemical resistance against a wide range of aggressive chemicals.",
      descriptionEl: "Εφαρμοζόμενα με βούρτσα ή ψεκασμό, περιοχές όπως χημικές λεκάνες, κανάλια και φρεάτια επενδύονται για μακροχρόνια περιβαλλοντική προστασία. Το Belzona 4311 (Magma CR1) προσφέρει αντοχή σε επιθετικά χημικά.",
      products: ["4311", "5811"],
      icon: <Droplet className="h-8 w-8" />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: "transformer",
      titleEn: "Transformer Oil & SF6 Leaks",
      titleEl: "Διαρροές Λαδιού Μετασχηματιστή & SF6",
      descriptionEn: "Belzona 1161 (Super UW-Metal) bonds strongly to oily and wet metal surfaces. Even live leaks on pipework and metallic equipment can be stemmed and sealed in situ using a Belzona leak sealing kit due to its high adhesion and cold curing.",
      descriptionEl: "Το Belzona 1161 (Super UW-Metal) συγκολλάται ισχυρά σε λιπαρές και υγρές μεταλλικές επιφάνειες. Ακόμη και ενεργές διαρροές σφραγίζονται επί τόπου με το kit σφράγισης διαρροών Belzona χάρη στην υψηλή πρόσφυση.",
      products: ["1161", "Leak Sealing Kit"],
      icon: <Flame className="h-8 w-8" />,
      color: "from-red-600 to-red-400",
    },
    {
      id: "mechanical",
      titleEn: "Shafts, Casings & Mechanical Elements",
      titleEl: "Άξονες, Κελύφη & Μηχανικά Στοιχεία",
      descriptionEn: "Belzona metal repair composites repair shafts, casings, keyways and other mechanical elements in situ. Flexible elastomers also repair conveyor belts and other rubber elements, minimizing downtime.",
      descriptionEl: "Τα σύνθετα Belzona επισκευάζουν άξονες, κελύφη, σφηνόδρομους και άλλα μηχανικά στοιχεία επί τόπου. Τα ελαστικά ελαστομερή επισκευάζουν επίσης ιμάντες μεταφοράς, ελαχιστοποιώντας το χρόνο διακοπής.",
      products: ["1111", "1121", "2211"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-slate-600 to-slate-400",
    },
    {
      id: "facilities",
      titleEn: "Facilities Maintenance & Chocking",
      titleEl: "Συντήρηση Εγκαταστάσεων & Στήριξη Μηχανών",
      descriptionEn: "Belzona covers facilities maintenance including floor screeds, grip systems and liquid-applied roofing membranes, plus alignment and anchorage of machinery through chocking and grouting applications for stable, vibration-resistant foundations.",
      descriptionEl: "Η Belzona καλύπτει συντήρηση εγκαταστάσεων: δάπεδα, αντιολισθητικά συστήματα και υγρές μεμβράνες στέγης, καθώς και ευθυγράμμιση και αγκύρωση μηχανημάτων μέσω στήριξης για σταθερές, αντικραδασμικές βάσεις.",
      products: ["4111", "5231", "7111"],
      icon: <Package className="h-8 w-8" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      id: "wind",
      titleEn: "Renewable & Wind Power Protection",
      titleEl: "Προστασία Ανανεώσιμων & Αιολικής Ενέργειας",
      descriptionEn: "Whether power is generated by nuclear, fossil or renewable means, Belzona provides erosion, corrosion and leak protection solutions engineered to withstand demanding operating conditions and ensure environmental compliance.",
      descriptionEl: "Είτε η ενέργεια παράγεται από πυρηνικά, ορυκτά ή ανανεώσιμα μέσα, η Belzona παρέχει λύσεις προστασίας από διάβρωση και διαρροές, σχεδιασμένες για απαιτητικές συνθήκες και περιβαλλοντική συμμόρφωση.",
      products: ["5831", "1341", "5111"],
      icon: <Wind className="h-8 w-8" />,
      color: "from-green-600 to-green-400",
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
              <Zap className="h-3 w-3" />
              {t("nav.industries")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl lg:text-6xl">
              Power Generation Applications
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
              Belzona's cold-curing polymeric coatings and repair composites have served the power industry for over 60 years. Engineered to withstand demanding operating conditions, they offer exceptional wear resistance plus erosion and corrosion protection — minimizing downtime and increasing plant efficiency.
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
              Need Power Generation Solutions?
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
