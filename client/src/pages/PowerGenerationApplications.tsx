import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplet, Zap } from "lucide-react";
import { Link } from "wouter";

const POWER_GEN_APPLICATIONS = [
  {
    titleEn: "Fluid Handling Equipment",
    descEn: "Aggressive erosion-corrosion of cooling water systems, condensers, and heat exchangers. Belzona composites rebuild damaged surfaces and extend equipment life.",
    icon: <Droplet className="h-8 w-8" />,
  },
  {
    titleEn: "Abrasion Resistant Systems",
    descEn: "Protect turbines, pumps, and piping from abrasive wear. Belzona elastomeric coatings provide superior abrasion resistance and reduce maintenance costs.",
    icon: <Zap className="h-8 w-8" />,
  },
  {
    titleEn: "Pipework Repair & Protection",
    descEn: "Repair corroded and eroded pipework in thermal, nuclear, and renewable energy plants. Cold-applied solutions prevent costly downtime.",
    icon: <Droplet className="h-8 w-8" />,
  },
];

export default function PowerGenerationApplications() {
  return (
    <div>
      <PageHeader
        title="Power Generation Applications"
        subtitle="Comprehensive Belzona solutions for thermal, nuclear, hydroelectric, and renewable energy plants"
        image="/manus-storage/ind_power_generation_72b75eed.jpg"
      />

      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-navy">
              Power Generation Solutions
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
              Proven Belzona repair and protection systems for thermal, nuclear, hydroelectric, and renewable energy applications
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {POWER_GEN_APPLICATIONS.map((app, i) => (
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
              Maximize Equipment Uptime
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Contact our team to discuss Belzona solutions for your power generation facility.
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
