import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Droplet, Wrench, Zap } from "lucide-react";
import { Link } from "wouter";

const OIL_GAS_APPLICATIONS = [
  {
    titleEn: "Pipework Repair & Protection",
    titleEl: "Επισκευή & Προστασία Σωληνώσεων",
    descEn: "Belzona composites repair corroded, eroded, and damaged pipework in offshore platforms and refineries. Cold-applied solutions prevent downtime and extend equipment life.",
    descEl: "Τα σύνθετα Belzona επισκευάζουν διαβρωμένες, διαβρωμένες και ζημιασμένες σωληνώσεις σε offshore πλατφόρμες και διυλιστήρια. Οι λύσεις ψυχρής εφαρμογής αποτρέπουν τη διακοπή και επεκτείνουν τη διάρκεια ζωής του εξοπλισμού.",
    icon: <Droplet className="h-8 w-8" />,
  },
  {
    titleEn: "Process Vessels & Linings",
    titleEl: "Δεξαμενές Διεργασίας & Επενδύσεις",
    descEn: "Protect process vessels from chemical attack and corrosion. Belzona linings resist aggressive chemicals and restore vessel integrity without hot work.",
    descEl: "Προστατεύστε τις δεξαμενές διεργασίας από χημική προσβολή και διάβρωση. Οι επενδύσεις Belzona αντιστέκονται σε επιθετικά χημικά και αποκαθιστούν την ακεραιότητα της δεξαμενής χωρίς θερμές εργασίες.",
    icon: <Wrench className="h-8 w-8" />,
  },
  {
    titleEn: "Corrosion Under Insulation (CUI)",
    titleEl: "Διάβρωση Κάτω από Μόνωση (CUI)",
    descEn: "Combat corrosion under insulation on offshore structures and pipework. Belzona solutions provide long-term protection and extend asset life.",
    descEl: "Καταπολεμήστε τη διάβρωση κάτω από τη μόνωση σε offshore κατασκευές και σωληνώσεις. Οι λύσεις Belzona παρέχουν μακροχρόνια προστασία και επεκτείνουν τη διάρκεια ζωής του περιουσιακού στοιχείου.",
    icon: <Zap className="h-8 w-8" />,
  },
];

export default function OilGasApplications() {
  const { t, pick } = useLanguage();

  return (
    <div>
      <PageHeader
        title="Oil & Gas Applications"
        subtitle="Comprehensive Belzona solutions for offshore platforms, refineries, and onshore facilities"
        image="/manus-storage/ind_oil_gas_301fe14d.jpg"
      />

      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-navy">
              Oil & Gas Solutions
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
              Proven Belzona repair and protection systems for demanding offshore and onshore environments
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {OIL_GAS_APPLICATIONS.map((app, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-lg bg-orange-brand/10 p-3 text-orange-brand">
                  {app.icon}
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-navy">
                  {app.titleEn}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {app.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="container flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white lg:text-4xl">
              Ready to Protect Your Assets?
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Contact our team to discuss Belzona solutions for your specific oil & gas applications.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90"
          >
            <Link href="/contact">
              Request a Quote <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
