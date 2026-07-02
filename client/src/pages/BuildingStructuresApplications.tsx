import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Building2, Layers, Home, PanelTop, Footprints, Droplet, Shield, Package } from "lucide-react";
import { Link } from "wouter";

export default function BuildingStructuresApplications() {
  const { t, pick } = useLanguage();

  const apps = [
    {
      id: "floor-repair",
      titleEn: "Floor Repair & Resurfacing",
      titleEl: "Επισκευή & Επαναδιαμόρφωση Δαπέδων",
      descriptionEn: "Damaged, spalled and worn concrete floors are repaired and resurfaced with fast-curing Belzona composites. Belzona 4111 (Magma-Quartz) and 4131 (Magma-Screed) restore floors to a durable, chemical-resistant finish with minimal downtime.",
      descriptionEl: "Κατεστραμμένα, αποφλοιωμένα και φθαρμένα δάπεδα σκυροδέματος επισκευάζονται με ταχείας ωρίμανσης σύνθετα Belzona. Τα 4111 (Magma-Quartz) και 4131 (Magma-Screed) αποκαθιστούν δάπεδα σε ανθεκτικό, χημικά ανθεκτικό φινίρισμα.",
      products: ["4111", "4131", "4141"],
      icon: <Layers className="h-8 w-8" />,
      color: "from-amber-600 to-amber-400",
    },
    {
      id: "floor-coating",
      titleEn: "Floor Protective Coatings",
      titleEl: "Προστατευτικές Επικαλύψεις Δαπέδων",
      descriptionEn: "High-performance floor coatings provide chemical resistance, abrasion resistance and easy-clean surfaces for industrial environments. Belzona 4341 (Magma CR4) and 4361 protect against a wide range of substances including acids and alkalis.",
      descriptionEl: "Επικαλύψεις δαπέδων υψηλής απόδοσης προσφέρουν χημική αντοχή, αντοχή στην τριβή και εύκολα καθαριζόμενες επιφάνειες. Τα Belzona 4341 (Magma CR4) και 4361 προστατεύουν από οξέα και αλκάλια.",
      products: ["4341", "4361", "4311"],
      icon: <Footprints className="h-8 w-8" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      id: "anti-slip",
      titleEn: "Safety & Anti-Slip Grip Systems",
      titleEl: "Συστήματα Ασφαλείας & Αντιολισθητικής Πρόσφυσης",
      descriptionEn: "Belzona safety grip systems provide long-lasting anti-slip surfaces for walkways, ramps, stairs and decks — improving workplace safety in wet and high-traffic areas while resisting wear and chemical exposure.",
      descriptionEl: "Τα συστήματα αντιολισθητικής πρόσφυσης Belzona παρέχουν μακράς διάρκειας αντιολισθητικές επιφάνειες για διαδρόμους, ράμπες, σκάλες και καταστρώματα — βελτιώνοντας την ασφάλεια σε υγρές περιοχές υψηλής κυκλοφορίας.",
      products: ["5231", "4411"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-orange-600 to-orange-400",
    },
    {
      id: "roof-waterproofing",
      titleEn: "Roof Waterproofing & Weatherproofing",
      titleEl: "Στεγανοποίηση & Προστασία Στέγης",
      descriptionEn: "Liquid-applied roofing membranes seal and protect flat and pitched roofs against water ingress and weathering. Belzona 5121 (SG Membrane) and 3111 (Flexible Membrane) provide seamless, durable, UV-resistant waterproofing.",
      descriptionEl: "Υγρές μεμβράνες στέγης σφραγίζουν και προστατεύουν επίπεδες και κεκλιμένες στέγες από την εισροή νερού και τις καιρικές συνθήκες. Τα Belzona 5121 (SG Membrane) και 3111 προσφέρουν αδιάλειπτη, ανθεκτική στην UV στεγανοποίηση.",
      products: ["3111", "5111", "5121"],
      icon: <Home className="h-8 w-8" />,
      color: "from-teal-600 to-teal-400",
    },
    {
      id: "wall-protection",
      titleEn: "Wall Repair & Protection",
      titleEl: "Επισκευή & Προστασία Τοίχων",
      descriptionEn: "Damaged and weathered walls, facades and concrete structures are repaired and protected against water ingress, carbonation and chemical attack. Belzona coatings provide breathable, long-lasting protection for building envelopes.",
      descriptionEl: "Κατεστραμμένοι και φθαρμένοι τοίχοι, προσόψεις και κατασκευές σκυροδέματος επισκευάζονται και προστατεύονται από την εισροή νερού, την ενανθράκωση και τη χημική προσβολή. Οι επικαλύψεις Belzona παρέχουν αναπνέουσα, μακράς διάρκειας προστασία.",
      products: ["4141", "5122", "3131"],
      icon: <PanelTop className="h-8 w-8" />,
      color: "from-slate-600 to-slate-400",
    },
    {
      id: "waterproofing-membrane",
      titleEn: "Water Ingress & Damp Protection",
      titleEl: "Προστασία από Εισροή Νερού & Υγρασία",
      descriptionEn: "Microporous breathable membranes allow trapped moisture to escape while preventing water ingress. Ideal for below-grade structures, containment areas and damp-affected surfaces, ensuring long-term structural integrity.",
      descriptionEl: "Μικροπορώδεις αναπνέουσες μεμβράνες επιτρέπουν στην παγιδευμένη υγρασία να διαφύγει ενώ αποτρέπουν την εισροή νερού. Ιδανικές για υπόγειες κατασκευές, περιοχές ανάσχεσης και επιφάνειες με υγρασία.",
      products: ["3111", "3131", "3121"],
      icon: <Droplet className="h-8 w-8" />,
      color: "from-indigo-600 to-indigo-400",
    },
    {
      id: "expansion-joints",
      titleEn: "Expansion Joints & Crack Sealing",
      titleEl: "Αρμοί Διαστολής & Σφράγιση Ρωγμών",
      descriptionEn: "Flexible sealants repair and seal expansion joints, cracks and movement joints in concrete structures. Belzona 4521 and 2211 accommodate movement while providing durable, weatherproof, chemical-resistant seals.",
      descriptionEl: "Ελαστικά σφραγιστικά επισκευάζουν και σφραγίζουν αρμούς διαστολής, ρωγμές και αρμούς κίνησης σε κατασκευές σκυροδέματος. Τα Belzona 4521 και 2211 επιτρέπουν την κίνηση παρέχοντας ανθεκτικά, στεγανά σφραγίσματα.",
      products: ["4521", "4511", "2211"],
      icon: <Package className="h-8 w-8" />,
      color: "from-purple-600 to-purple-400",
    },
    {
      id: "structural-bonding",
      titleEn: "Structural Bonding & Anchoring",
      titleEl: "Δομική Συγκόλληση & Αγκύρωση",
      descriptionEn: "Belzona chocking and grouting compounds provide stable, vibration-resistant foundations for machinery, columns and structural elements. Cold-applied bonding eliminates welding and provides high compressive strength.",
      descriptionEl: "Τα υλικά στήριξης και ενεμάτωσης Belzona παρέχουν σταθερές, αντικραδασμικές βάσεις για μηχανήματα, κολώνες και δομικά στοιχεία. Η ψυχρή συγκόλληση εξαλείφει τη συγκόλληση και προσφέρει υψηλή αντοχή σε θλίψη.",
      products: ["7111", "7211", "4141"],
      icon: <Building2 className="h-8 w-8" />,
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
              <Building2 className="h-3 w-3" />
              {t("nav.industries")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl lg:text-6xl">
              Building & Structures Applications
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
              Belzona provides durable repair and protection solutions for floors, roofs and walls across commercial and industrial buildings. From chemical-resistant floor coatings and anti-slip grip systems to liquid-applied roofing membranes and structural bonding, our systems extend the life of building envelopes.
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
                      <Link
                        key={prod}
                        href={`/products?product=${encodeURIComponent(prod)}`}
                        className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-navy transition-colors duration-150 hover:bg-navy hover:text-white active:scale-[0.97]"
                      >
                        Belzona {prod}
                      </Link>
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
              Need Building & Structures Solutions?
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
