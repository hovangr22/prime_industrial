import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT } from "@/lib/siteContent";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Sector = "industry" | "maritime" | "general";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    sector: "general" as Sector,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submit = trpc.inquiries.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success(t("contact.form.success"));
      setForm({ name: "", company: "", email: "", phone: "", sector: "general", message: "" });
    },
    onError: () => {
      toast.error(t("contact.form.error"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit.mutate({
      name: form.name,
      company: form.company || null,
      email: form.email,
      phone: form.phone || null,
      message: form.message,
      sector: form.sector,
    });
  };

  return (
    <div>
      <PageHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-orange-brand" />
                <p className="mt-4 max-w-sm text-lg font-medium text-navy">{t("contact.form.success")}</p>
                <Button
                  variant="outline"
                  className="mt-6 border-navy/20 text-navy hover:bg-navy hover:text-white"
                  onClick={() => setSubmitted(false)}
                >
                  {t("cta.contact")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("contact.form.name")} required>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </Field>
                  <Field label={t("contact.form.company")}>
                    <Input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </Field>
                  <Field label={t("contact.form.email")} required>
                    <Input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </Field>
                  <Field label={t("contact.form.phone")}>
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </Field>
                </div>

                <Field label={t("contact.form.sector")}>
                  <Select
                    value={form.sector}
                    onValueChange={(v) => setForm({ ...form, sector: v as Sector })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industry">{t("contact.form.sector.industry")}</SelectItem>
                      <SelectItem value="maritime">{t("contact.form.sector.maritime")}</SelectItem>
                      <SelectItem value="general">{t("contact.form.sector.general")}</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label={t("contact.form.message")} required>
                  <Textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submit.isPending}
                  className="w-full bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90 sm:w-auto"
                >
                  {submit.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("contact.form.sending")}
                    </>
                  ) : (
                    t("contact.form.submit")
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Details */}
          <aside className="space-y-6">
            <div className="rounded-2xl bg-navy p-8 text-navy-foreground">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                {t("contact.info.title")}
              </h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-brand" />
                  <span className="text-white/85">
                    {CONTACT.addressLine1}
                    <br />
                    {CONTACT.addressLine2}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-orange-brand" />
                  <a href={CONTACT.phoneHref} className="text-white/85 hover:text-white">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-orange-brand" />
                  <a href={CONTACT.emailHref} className="text-white/85 hover:text-white">
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border">
              <iframe
                title="Prime Industrial location"
                src="https://www.google.com/maps?q=Moutsopoulou+90+Piraeus+18541+Greece&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-orange-brand"> *</span>}
      </Label>
      {children}
    </div>
  );
}
