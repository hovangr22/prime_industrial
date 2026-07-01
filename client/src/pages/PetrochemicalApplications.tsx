import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Flame, Droplet, Wrench, Shield, Zap, Wind, Gauge } from "lucide-react";
import { Link } from "wouter";

export default function PetrochemicalApplications() {
  const { t, pick } = useLanguage();

  const petrochemApps = [
    {
      id: "pipework",
      titleEn: "Pipework Deterioration & Repair",
      titleEl: "Φθορά & Επισκευή Σωληνώσεων",
      descriptionEn: "Pipework suffering from erosion and corrosion, including CUI, is sealed in situ using surface-tolerant materials. SuperWrap II restores strength to weakened pipes and provides excellent chemical resistance up to 150°C.",
      descriptionEl: "Σωλήνωση που υποφέρει από διάβρωση και CUI επισκευάζεται in situ. Το SuperWrap II αποκαθιστά την αντοχή με εξαιρετική χημική αντίσταση.",
      products: ["SuperWrap II", "1212", "5851"],
      icon: <Droplet className="h-8 w-8" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "vessels",
      titleEn: "Process Vessels & Absorber Towers",
      titleEl: "Δοχεία Διεργασίας & Πύργοι Απορρόφησης",
      descriptionEn: "Absorber towers and strippers subject to corrosion are protected using high-temperature linings. Epoxies provide excellent chemical, erosion and temperature resistance to MEA, MDEA, sulfanol and other stripping agents.",
      descriptionEl: "Πύργοι απορρόφησης προστατεύονται με επενδύσεις υψηλής θερμοκρασίας. Εξαιρετική αντίσταση σε χημικές ουσίες και θερμοκρασίες.",
      products: ["1391T", "1511", "5831"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-cyan-600 to-cyan-400",
    },
    {
      id: "storage",
      titleEn: "Storage Tank & Containment Protection",
      titleEl: "Προστασία Δοχείων Αποθήκευσης & Περιεκτικότητας",
      descriptionEn: "Storage tanks damaged by deterioration and corrosion are sealed with emergency leak sealing and cold bonding. Tank bases are sealed with microporous membranes allowing trapped moisture to escape.",
      descriptionEl: "Δοχεία αποθήκευσης που έχουν φθαρεί σφραγίζονται με ψυχρή συγκόλληση. Βάσεις δοχείων σφραγίζονται με αναπνεόμενες μεμβράνες.",
      products: ["1212", "3111", "4111"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-orange-600 to-orange-400",
    },
    {
      id: "containment",
      titleEn: "Chemical Containment Areas",
      titleEl: "Περιοχές Χημικής Περιεκτικότητας",
      descriptionEn: "Concrete floors and walls of secondary containment are repaired and protected using concrete repair composites and coatings. Epoxy coatings provide long-term chemical protection against acids, alkalis, and high temperatures.",
      descriptionEl: "Δάπεδα και τοίχοι δευτερογενούς περιεκτικότητας επισκευάζονται και προστατεύονται. Επικαλύψεις παρέχουν προστασία από οξέα και αλκάλια.",
      products: ["4111", "4131", "4311"],
      icon: <Flame className="h-8 w-8" />,
      color: "from-red-600 to-red-400",
    },
    {
      id: "heat-exchanger",
      titleEn: "Heat Exchanger Repair & Protection",
      titleEl: "Επισκευή & Προστασία Ανταλλάκτη Θερμότητας",
      descriptionEn: "Tube sheets, water boxes, division bars and end covers are protected against galvanic corrosion and chemical attack. Cold-curing epoxy products allow rapid in-situ application minimizing downtime.",
      descriptionEl: "Φύλλα σωλήνων και κουτιά νερού προστατεύονται από γαλβανική διάβρωση. Ταχεία εφαρμογή in-situ με ελάχιστη διακοπή.",
      products: ["1111", "1321", "1391T"],
      icon: <Zap className="h-8 w-8" />,
      color: "from-green-600 to-green-400",
    },
    {
      id: "pump",
      titleEn: "Pump Repair & Protection",
      titleEl: "Επισκευή & Προστασία Αντλιών",
      descriptionEn: "Damaged pump casings and impellers are rebuilt using cold-applied metal repair composites. Protective coatings provide long-term erosion and corrosion resistance in aggressive chemical environments.",
      descriptionEl: "Κελύφη και πτερύγια αντλιών ανακατασκευάζονται με ψυχρά σύνθετα υλικά. Προστατευτικές επικαλύψεις παρέχουν μακροχρόνια προστασία.",
      products: ["1111", "1321", "1341"],
      icon: <Gauge className="h-8 w-8" />,
      color: "from-teal-600 to-teal-400",
    },
    {
      id: "flange",
      titleEn: "Flange & Gasket Protection",
      titleEl: "Προστασία Φλάντζας & Παρέμβυσμα",
      descriptionEn: "Flange face damage and sealing issues are resolved using specialized epoxy systems. Gasket surfaces are protected and sealed to prevent leaks and environmental contamination.",
      descriptionEl: "Ζημιές επιφάνειας φλάντζας επιλύονται με εξειδικευμένα συστήματα. Επιφάνειες παρεμβύσματος προστατεύονται και σφραγίζονται.",
      products: ["1111", "3412", "1391"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      id: "structural",
      titleEn: "Structural Support & Steelwork",
      titleEl: "Δομική Στήριξη & Χαλυβδοκατασκευή",
      descriptionEn: "Worn or damaged structural supports and steelwork are repaired using cold bonding and protective coatings. Mechanical damage from impact or vibration is quickly resolved without hot work.",
      descriptionEl: "Φθαρμένη ή κατεστραμμένη δομική στήριξη επισκευάζεται με ψυχρή συγκόλληση. Μηχανικές ζημιές επιλύονται χωρίς συγκόλληση.",
      products: ["1111", "1121", "5831"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: "valve",
      titleEn: "Valve Repair & Restoration",
      titleEl: "Επισκευή & Αποκατάσταση Βαλβίδας",
      descriptionEn: "Valves including seats, seals and casings are repaired and restored using specialized epoxy composites. Protective coatings ensure long-term functionality in corrosive environments.",
      descriptionEl: "Βαλβίδες επισκευάζονται και αποκαθίστανται με εξειδικευμένα σύνθετα υλικά. Προστατευτικές επικαλύψεις εξασφαλίζουν μακροχρόνια λειτουργικότητα.",
      products: ["1111", "1211", "1391"],
      icon: <Flame className="h-8 w-8" />,
      color: "from-yellow-600 to-yellow-400",
    },
    {
      id: "insulation",
      titleEn: "Insulation Protection",
      titleEl: "Προστασία Μόνωσης",
      descriptionEn: "Insulation protection for pipes and other insulated equipment uses fire-resistant materials. Simple to apply and resistant to water and UV radiation, ensuring long-term asset protection.",
      descriptionEl: "Προστασία μόνωσης σωληνώσεων με ανθεκτικά υλικά. Απλή εφαρμογή και αντίσταση στο νερό και τις υπεριώδεις ακτίνες.",
      products: ["3211", "5851", "1251"],
      icon: <Wind className="h-8 w-8" />,
      color: "from-pink-600 to-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 py-20 text-white">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2">
              <Flame className="h-4 w-4 text-red-300" />
              <span className="text-sm font-medium text-red-200">INDUSTRIES</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            {pick("Petrochemical Applications", "Εφαρμογές Πετροχημικών")}
          </h1>
          <p className="text-xl text-red-100 max-w-2xl leading-relaxed">
            {pick(
              "Comprehensive Belzona solutions for chemical plants, refineries, and petrochemical facilities. Proven protection against erosion, corrosion, and chemical attack in the most demanding environments.",
              "Ολοκληρωμένες λύσεις Belzona για χημικές εγκαταστάσεις, διυλιστήρια και πετροχημικές εγκαταστάσεις. Αποδεδειγμένη προστασία από διάβρωση και χημική επίθεση."
            )}
          </p>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {pick("Petrochemical Solutions", "Λύσεις Πετροχημικών")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {pick(
                "Proven Belzona repair and protection systems for chemical processing environments and refinery operations",
                "Αποδεδειγμένα συστήματα επισκευής και προστασίας Belzona για χημικές διεργασίες και λειτουργίες διυλιστηρίων"
              )}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {petrochemApps.map((app) => (
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

      {/* Key Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {pick("Why Choose Belzona for Petrochemical Applications", "Γιατί να Επιλέξετε Belzona για Πετροχημικές Εφαρμογές")}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                titleEn: "No Hot Work Required",
                titleEl: "Δεν Απαιτείται Συγκόλληση",
                descEn: "Cold-applied materials eliminate welding and fire risks in volatile environments",
                descEl: "Ψυχρά υλικά εξαλείφουν τους κινδύνους συγκόλλησης σε ασταθή περιβάλλοντα",
              },
              {
                titleEn: "Minimal Downtime",
                titleEl: "Ελάχιστη Διακοπή",
                descEn: "In-situ application keeps operations running with minimal disruption",
                descEl: "Εφαρμογή in-situ διατηρεί τις λειτουργίες με ελάχιστη διακοπή",
              },
              {
                titleEn: "Chemical Resistance",
                titleEl: "Αντίσταση Χημικών",
                descEn: "Outstanding protection against acids, alkalis, and aggressive chemicals",
                descEl: "Εξαιρετική προστασία από οξέα, αλκάλια και επιθετικές ουσίες",
              },
              {
                titleEn: "Cost Effective",
                titleEl: "Οικονομικά Αποδοτικό",
                descEn: "Extends asset life and avoids costly equipment replacement",
                descEl: "Επεκτείνει τη διάρκεια ζωής του εξοπλισμού και αποφεύγει ακριβές αντικαταστάσεις",
              },
              {
                titleEn: "Environmental Compliance",
                titleEl: "Συμμόρφωση με το Περιβάλλον",
                descEn: "Prevents leaks and contamination, supporting environmental standards",
                descEl: "Αποτρέπει διαρροές και μόλυνση, υποστηρίζοντας περιβαλλοντικά πρότυπα",
              },
              {
                titleEn: "Proven Performance",
                titleEl: "Αποδεδειγμένη Απόδοση",
                descEn: "Decades of successful applications in harsh petrochemical environments",
                descEl: "Δεκαετίες επιτυχημένων εφαρμογών σε αυστηρά περιβάλλοντα",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold mb-2 text-slate-900">
                  {pick(benefit.titleEn, benefit.titleEl)}
                </h3>
                <p className="text-slate-600">
                  {pick(benefit.descEn, benefit.descEl)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            {pick("Protect Your Petrochemical Assets", "Προστατέψτε τα Πετροχημικά Σας Περιουσιακά Στοιχεία")}
          </h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            {pick(
              "Contact Prime Industrial for expert consultation on Belzona repair and protection systems for your petrochemical facility.",
              "Επικοινωνήστε με την Prime Industrial για ειδικευμένη συμβουλή σχετικά με τα συστήματα επισκευής και προστασίας Belzona."
            )}
          </p>
          <Link href="/contact">
            <a className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-red-600 hover:bg-red-50 transition-colors">
              {pick("Contact Us", "Επικοινωνήστε μαζί μας")}
              <ArrowRight className="h-5 w-5" />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
