import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Anchor, Droplet, Wrench, Shield, Flame, Wind, Zap } from "lucide-react";
import { Link } from "wouter";

export default function OilGasApplications() {
  const { t, pick } = useLanguage();

  const oilGasApps = [
    {
      id: "pipework",
      titleEn: "Pipework Repair & Protection",
      titleEl: "Επισκευή & Προστασία Σωληνώσεων",
      descriptionEn: "Thin-wall and through-wall damage repaired with Belzona metal repair composites. Pipe wraps, plate bonding, and pit filling prolong asset life. SuperWrap II restores strength to weakened pipes and provides excellent corrosion protection up to 150°C.",
      descriptionEl: "Επισκευή λεπτών και διαπερατών ζημιών με σύνθετα υλικά της Belzona. Το SuperWrap II αποκαθιστά την αντοχή και παρέχει προστασία από διάβρωση έως 150°C.",
      products: ["SuperWrap II", "1212", "3412"],
      icon: <Droplet className="h-8 w-8" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "vessels",
      titleEn: "Process Vessels & Linings",
      titleEl: "Δοχεία Διεργασίας & Επενδύσεις",
      descriptionEn: "Internal and external protection of process vessels using elevated and high-temperature linings. Spray or hand-applied systems form a barrier against corrosive media, withstanding vast pressure and temperature fluctuations.",
      descriptionEl: "Εσωτερική και εξωτερική προστασία δοχείων διεργασίας. Τα συστήματα αντέχουν μεγάλες διακυμάνσεις πίεσης και θερμοκρασίας.",
      products: ["1391T", "1511", "5831"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-cyan-600 to-cyan-400",
    },
    {
      id: "cui",
      titleEn: "Corrosion Under Insulation (CUI)",
      titleEl: "Διάβρωση Κάτω από Μόνωση (CUI)",
      descriptionEn: "Hot pipework suffering from CUI is repaired using surface-tolerant heat-activated polymeric materials. Insulation is encapsulated with microporous Belzona 3211 (Lagseal) to prevent further corrosion.",
      descriptionEl: "Η θερμή σωλήνωση που υποφέρει από CUI επισκευάζεται με ανθεκτικά υλικά. Η μόνωση ενκαψυλώνεται για πρόληψη περαιτέρω διάβρωσης.",
      products: ["5851", "3211", "1251"],
      icon: <Flame className="h-8 w-8" />,
      color: "from-orange-600 to-orange-400",
    },
    {
      id: "bonding",
      titleEn: "Cold Bonding Solutions",
      titleEl: "Λύσεις Ψυχρής Συγκόλλησης",
      descriptionEn: "Cold bonding provides an alternative to welding for installation and maintenance of decks, tanks, pipes, and fittings. Corroded equipment and structures are repaired in situ using injection bonding technology.",
      descriptionEl: "Η ψυχρή συγκόλληση είναι εναλλακτική της συγκόλλησης για επισκευές δοχείων και σωληνώσεων. Ιδανική για επισκευές στη θέση τοποθέτησης.",
      products: ["1111", "1121", "1161"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-green-600 to-green-400",
    },
    {
      id: "splash",
      titleEn: "Splash Zone Repair",
      titleEl: "Επισκευή Ζώνης Εκτοξεύσεως",
      descriptionEn: "Corrosion resistant repair composites and coatings repair rubber sheath and pitting corrosion damage on risers. Flexible sealing solutions ensure long-term erosion and corrosion protection below the waterline.",
      descriptionEl: "Επισκευή ζημιών από διάβρωση και αποφλοίωση σε ανυψωτικούς σωλήνες. Ευέλικτες λύσεις σφράγισης για μακροχρόνια προστασία.",
      products: ["2111", "5831", "1111"],
      icon: <Wind className="h-8 w-8" />,
      color: "from-teal-600 to-teal-400",
    },
    {
      id: "storage",
      titleEn: "Storage Tank & Containment",
      titleEl: "Δοχεία Αποθήκευσης & Περιεκτικότητα",
      descriptionEn: "Emergency leak sealing and cold plate bonding using fast-curing epoxy materials eliminate the need for hot work. Tank bases are sealed with solvent-free coatings allowing trapped moisture to escape.",
      descriptionEl: "Σφράγιση διαρροών έκτακτης ανάγκης και ψυχρή συγκόλληση πλακών. Σφράγιση βάσης δοχείου με αναπνεόμενες επικαλύψεις.",
      products: ["1212", "3111", "4361"],
      icon: <Droplet className="h-8 w-8" />,
      color: "from-red-600 to-red-400",
    },
    {
      id: "carbon",
      titleEn: "Carbon Capture Equipment",
      titleEl: "Εξοπλισμός Σύλληψης Άνθρακα",
      descriptionEn: "Amine stripper columns are protected from corrosion using high-temperature repair solutions. Belzona 1511 provides excellent long-term corrosion protection without traditional welding.",
      descriptionEl: "Στήλες amine stripper προστατεύονται από διάβρωση με λύσεις υψηλής θερμοκρασίας. Εξαιρετική μακροχρόνια προστασία χωρίς συγκόλληση.",
      products: ["1511", "1593", "1391T"],
      icon: <Zap className="h-8 w-8" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      id: "decommission",
      titleEn: "Decommissioning Support",
      titleEl: "Υποστήριξη Απόσυρσης",
      descriptionEn: "Repair, bonding, sealing, and coatings appropriate for decommissioning phase. Belzona 1111 and 1121 rebuild areas of metal loss. Belzona 1611 enables underwater repairs.",
      descriptionEl: "Επισκευή, συγκόλληση, σφράγιση και επικαλύψεις για την φάση απόσυρσης. Ιδανικές για υποθαλάσσιες επισκευές.",
      products: ["1111", "1611", "5831LT"],
      icon: <Wrench className="h-8 w-8" />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: "heat-exchanger",
      titleEn: "Heat Exchanger Protection",
      titleEl: "Προστασία Ανταλλάκτη Θερμότητας",
      descriptionEn: "Tube sheets, water boxes, and end covers are protected against galvanic corrosion and chemical attack. Cold-curing epoxy products allow rapid, in-situ application minimizing downtime.",
      descriptionEl: "Προστασία φύλλων σωλήνων, κουτιών νερού και καλυμμάτων από γαλβανική διάβρωση. Ταχεία εφαρμογή in-situ με ελάχιστη διακοπή.",
      products: ["1111", "1321", "1391T"],
      icon: <Flame className="h-8 w-8" />,
      color: "from-pink-600 to-pink-400",
    },
    {
      id: "auxiliary",
      titleEn: "Auxiliary Equipment",
      titleEl: "Βοηθητικός Εξοπλισμός",
      descriptionEn: "Fenders, hoses, seawater filters, pumps, and separator vessels are protected from corrosion and erosion. Comprehensive solutions for all critical offshore and onshore equipment.",
      descriptionEl: "Προστασία αμορτισέρ, σωλήνων, φίλτρων θαλασσινού νερού, αντλιών και δοχείων διαχωρισμού. Ολοκληρωμένες λύσεις για όλο τον εξοπλισμό.",
      products: ["2141", "1321", "5811"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-yellow-600 to-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-20 text-white">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2">
              <Anchor className="h-4 w-4 text-blue-300" />
              <span className="text-sm font-medium text-blue-200">INDUSTRIES</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            {pick("Oil & Gas Applications", "Εφαρμογές Πετρελαίου & Φυσικού Αερίου")}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            {pick(
              "Comprehensive Belzona solutions for offshore platforms, refineries, and onshore facilities. From emergency at-sea repairs to long-term corrosion protection, we deliver proven solutions approved by major classification societies.",
              "Ολοκληρωμένες λύσεις Belzona για θαλάσσιες πλατφόρμες, διυλιστήρια και εγκαταστάσεις στη στεριά. Από επείγουσες επισκευές έως μακροχρόνια προστασία από διάβρωση."
            )}
          </p>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {pick("Oil & Gas Solutions", "Λύσεις Πετρελαίου & Φυσικού Αερίου")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {pick(
                "Proven Belzona repair and protection systems for demanding offshore and onshore environments",
                "Αποδεδειγμένα συστήματα επισκευής και προστασίας Belzona για απαιτητικά περιβάλλοντα"
              )}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {oilGasApps.map((app) => (
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

      {/* Classification Approvals */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {pick("Marine Classification Approvals", "Έγκριση Ταξινόμησης Ναυτιλίας")}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: pick("Lloyd's Register", "Lloyd's Register"), abbr: "LR" },
              { name: pick("American Bureau of Shipping", "American Bureau of Shipping"), abbr: "ABS" },
              { name: pick("Det Norske Veritas", "Det Norske Veritas"), abbr: "DNV GL" },
              { name: pick("Bureau Veritas", "Bureau Veritas"), abbr: "BV" },
            ].map((org, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 bg-white p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{org.abbr}</div>
                <div className="text-sm text-slate-600">{org.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            {pick("Need Oil & Gas Solutions?", "Χρειάζεστε Λύσεις Πετρελαίου & Φυσικού Αερίου;")}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {pick(
              "Contact Prime Industrial for expert consultation on Belzona repair and protection systems for your offshore or onshore operations.",
              "Επικοινωνήστε με την Prime Industrial για ειδικευμένη συμβουλή σχετικά με τα συστήματα επισκευής και προστασίας Belzona."
            )}
          </p>
          <Link href="/contact">
            <a className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors">
              {pick("Contact Us", "Επικοινωνήστε μαζί μας")}
              <ArrowRight className="h-5 w-5" />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
