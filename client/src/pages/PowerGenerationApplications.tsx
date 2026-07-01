import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Zap, Droplet, Wind, Wrench, Shield, Flame, Gauge } from "lucide-react";
import { Link } from "wouter";

export default function PowerGenerationApplications() {
  const { t, pick } = useLanguage();

  const powerApps = [
    {
      id: "fluid-handling",
      titleEn: "Fluid Handling Equipment",
      titleEl: "Εξοπλισμός Διαχείρισης Ρευστών",
      descriptionEn: "Aggressive erosion-corrosion of cooling water systems, pumps, and tube sheets is repaired and protected. Cold-curing materials restore equipment to original profile while providing long-term chemical resistance.",
      descriptionEl: "Επισκευή και προστασία συστημάτων ψύξης, αντλιών και φύλλων σωλήνων. Υλικά ψυχρής σκλήρυνσης αποκαθιστούν τον εξοπλισμό στο αρχικό προφίλ.",
      products: ["1111", "1321", "1341"],
      icon: <Droplet className="h-8 w-8" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "abrasion",
      titleEn: "Abrasion Resistant Systems",
      titleEl: "Συστήματα Αντίστασης Φθοράς",
      descriptionEn: "Erosion in solids handling and FGD systems is slowed using high-build erosion resistant materials. Ceramic filled coatings extend equipment life in harsh operating conditions.",
      descriptionEl: "Επιβράδυνση διάβρωσης σε συστήματα διαχείρισης στερεών. Κεραμικές επικαλύψεις επεκτείνουν τη διάρκεια ζωής του εξοπλισμού.",
      products: ["1311", "1811", "1812"],
      icon: <Gauge className="h-8 w-8" />,
      color: "from-cyan-600 to-cyan-400",
    },
    {
      id: "pipework",
      titleEn: "Pipework Repair & Protection",
      titleEl: "Επισκευή & Προστασία Σωληνώσεων",
      descriptionEn: "Thin-wall and through-wall defects caused by external corrosion are repaired using Belzona wrap systems or cold plate bonding. SuperWrap II provides ISO and ASME compliant permanent repairs.",
      descriptionEl: "Επισκευή ελλειμμάτων λεπτού και διαπερατού τοιχώματος. Το SuperWrap II παρέχει μόνιμες επισκευές σύμφωνες με ISO και ASME.",
      products: ["SuperWrap II", "1111", "3412"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-orange-600 to-orange-400",
    },
    {
      id: "containment",
      titleEn: "Chemical Containment Linings",
      titleEl: "Επενδύσεις Χημικής Περιεκτικότητας",
      descriptionEn: "Chemical bunds, channels, and sumps are effectively lined with brush or airless spray application. Comprehensive range of polymeric coatings provides chemical resistance against aggressive substances.",
      descriptionEl: "Αποτελεσματική επένδυση χημικών δεξαμενών και αγωγών. Πολυμερικές επικαλύψεις παρέχουν αντίσταση σε επιθετικές ουσίες.",
      products: ["4311", "4341", "4361"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-green-600 to-green-400",
    },
    {
      id: "transformer",
      titleEn: "Transformer Oil & SF6 Leak Sealing",
      titleEl: "Σφράγιση Διαρροών Λαδιού Μετασχηματιστή & SF6",
      descriptionEn: "Environmental problems from aging equipment leaks are solved using surface-tolerant materials. Even live leaks on pipework can be stemmed and sealed in situ without hot work.",
      descriptionEl: "Λύση περιβαλλοντικών προβλημάτων από διαρροές παλαιού εξοπλισμού. Ακόμη και ζωντανές διαρροές μπορούν να σφραγιστούν in situ.",
      products: ["1161", "1212", "5831"],
      icon: <Flame className="h-8 w-8" />,
      color: "from-red-600 to-red-400",
    },
    {
      id: "cavitation",
      titleEn: "Cavitation Protection",
      titleEl: "Προστασία από Κοιλοτητα",
      descriptionEn: "Cavitation resistant elastomers are ideal for lining turbine runners, wicket gates, and other fluid handling equipment. They reduce equipment degradation and subsequent running costs.",
      descriptionEl: "Ελαστομερή αντίστασης κοιλοτητας για επένδυση στροβίλων. Μειώνουν τη φθορά του εξοπλισμού και τα λειτουργικά κόστη.",
      products: ["2141", "2111", "2211"],
      icon: <Wind className="h-8 w-8" />,
      color: "from-teal-600 to-teal-400",
    },
    {
      id: "cui",
      titleEn: "Corrosion Under Insulation (CUI)",
      titleEl: "Διάβρωση Κάτω από Μόνωση (CUI)",
      descriptionEn: "CUI is repaired using surface-tolerant, heat-activated materials. Insulation is encapsulated with microporous systems to prevent further corrosion and extend asset life.",
      descriptionEl: "Επισκευή CUI με ανθεκτικά υλικά. Ενκαψύλωση μόνωσης με μικροπορώδη συστήματα για πρόληψη περαιτέρω διάβρωσης.",
      products: ["5851", "3211", "1251"],
      icon: <Zap className="h-8 w-8" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      id: "mechanical",
      titleEn: "Mechanical Component Repair",
      titleEl: "Επισκευή Μηχανικών Εξαρτημάτων",
      descriptionEn: "Shafts, casings, keyways, and other mechanical elements are repaired using cold-applied epoxy composites. Flexible repairs of conveyor belts and rubber elements extend equipment life.",
      descriptionEl: "Επισκευή αξόνων, κελυφών και άλλων μηχανικών στοιχείων. Ευέλικτες επισκευές ιμάντων και ελαστικών στοιχείων.",
      products: ["1111", "1212", "1131"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: "efficiency",
      titleEn: "Efficiency Enhancement",
      titleEl: "Βελτίωση Απόδοσης",
      descriptionEn: "Smooth protective linings improve flow dynamics, reducing energy consumption and wear. Coatings like Belzona 1341 (Supermetalglide) increase pump efficiency up to 20% on refurbished equipment.",
      descriptionEl: "Λείες επικαλύψεις βελτιώνουν τη δυναμική ροής. Μείωση κατανάλωσης ενέργειας και φθοράς με αύξηση απόδοσης έως 20%.",
      products: ["1341", "1321", "5811"],
      icon: <Gauge className="h-8 w-8" />,
      color: "from-yellow-600 to-yellow-400",
    },
    {
      id: "facilities",
      titleEn: "Facilities Maintenance",
      titleEl: "Συντήρηση Εγκαταστάσεων",
      descriptionEn: "Floor screeds, grip systems, and liquid-applied roofing membranes are protected. Alignment and anchorage of machinery for chocking and grouting applications ensure structural integrity.",
      descriptionEl: "Προστασία δαπέδων, συστημάτων πρόσφυσης και στεγάνωσης. Ευθυγράμμιση και αγκύρωση μηχανημάτων για εφαρμογές στήριξης.",
      products: ["4111", "4131", "3111"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-pink-600 to-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-yellow-900 to-slate-900 py-20 text-white">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-500/10 px-4 py-2">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-yellow-200">INDUSTRIES</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            {pick("Power Generation Applications", "Εφαρμογές Παραγωγής Ηλεκτρικής Ενέργειας")}
          </h1>
          <p className="text-xl text-yellow-100 max-w-2xl leading-relaxed">
            {pick(
              "Comprehensive Belzona solutions for thermal, nuclear, hydroelectric, and renewable energy plants. Over 60 years of proven performance in demanding power generation environments.",
              "Ολοκληρωμένες λύσεις Belzona για θερμικές, πυρηνικές, υδροηλεκτρικές και εγκαταστάσεις ανανεώσιμης ενέργειας. Πάνω από 60 χρόνια αποδεδειγμένης απόδοσης."
            )}
          </p>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {pick("Power Generation Solutions", "Λύσεις Παραγωγής Ηλεκτρικής Ενέργειας")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {pick(
                "Proven Belzona repair and protection systems for thermal, nuclear, hydroelectric, and renewable energy applications",
                "Αποδεδειγμένα συστήματα επισκευής και προστασίας Belzona για θερμικές, πυρηνικές και υδροηλεκτρικές εφαρμογές"
              )}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {powerApps.map((app) => (
              <div
                key={app.id}
                className={`group rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br ${app.color} text-white mb-4`}>
                  {app.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  {pick(app.titleEn, app.titleEl)}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {pick(app.descriptionEn, app.descriptionEl)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {app.products.map((product) => (
                    <span
                      key={product}
                      className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Approvals */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {pick("Industry Certifications", "Πιστοποιήσεις Βιομηχανίας")}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: pick("Nuclear Approved", "Εγκεκριμένο για Πυρηνικές"), abbr: "NQA" },
              { name: pick("ISO 9001 Certified", "Πιστοποίηση ISO 9001"), abbr: "ISO" },
              { name: pick("DNV GL Approved", "Έγκριση DNV GL"), abbr: "DNV" },
              { name: pick("60+ Years Experience", "60+ Χρόνια Εμπειρίας"), abbr: "EST" },
            ].map((cert, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 bg-white p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">{cert.abbr}</div>
                <div className="text-sm text-slate-600">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            {pick("Optimize Your Power Generation Operations", "Βελτιστοποιήστε τις Λειτουργίες Παραγωγής Ηλεκτρικής Ενέργειας")}
          </h2>
          <p className="text-lg text-yellow-100 mb-8 max-w-2xl mx-auto">
            {pick(
              "Contact Prime Industrial for expert consultation on Belzona repair and protection systems for your power generation facility.",
              "Επικοινωνήστε με την Prime Industrial για ειδικευμένη συμβουλή σχετικά με τα συστήματα επισκευής και προστασίας Belzona."
            )}
          </p>
          <Link href="/contact">
            <a className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-yellow-600 hover:bg-yellow-50 transition-colors">
              {pick("Contact Us", "Επικοινωνήστε μαζί μας")}
              <ArrowRight className="h-5 w-5" />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
