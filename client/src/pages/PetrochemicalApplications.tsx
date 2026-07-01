import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Wrench } from "lucide-react";
import { Link } from "wouter";

const PETROCHEM_APPLICATIONS = [
  {
    titleEn: "Pipework Deterioration & Repair",
    descEn: "Repair and protect pipework exposed to aggressive chemicals, heat, and pressure. Belzona solutions restore process equipment to full service.",
    icon: <Wrench className="h-8 w-8" />,
  },
  {
    titleEn: "Process Vessels & Absorber Towers",
    descEn: "Protect process vessels and absorber towers from chemical attack and corrosion. Belzona linings resist aggressive chemicals and extend asset life.",
    icon: <Shield className="h-8 w-8" />,
  },
  {
    titleEn: "Storage Tank & Containment Protection",
    descEn: "Protect storage tanks and containment systems from chemical spillage and corrosion. Belzona linings provide long-term protection and regulatory compliance.",
    icon: <Shield className="h-8 w-8" />,
  },
];

export default function PetrochemicalApplications() {
  return (
    <div>
      <PageHeader
        title="Petrochemical Applications"
        subtitle="Comprehensive Belzona solutions for chemical plants, refineries, and petrochemical facilities"
        image="/manus-storage/ind_petrochemical_06d891fd.jpg"
      />

      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-navy">
              Petrochemical Solutions
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
              Proven Belzona repair and protection systems for chemical processing environments and refinery operations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {PETROCHEM_APPLICATIONS.map((app, i) => (
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
              Ensure Regulatory Compliance
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Contact our team to discuss Belzona solutions for your petrochemical facility.
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
