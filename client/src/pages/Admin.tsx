import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { LOGO_URL, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/siteContent";
import { trpc } from "@/lib/trpc";
import {
  CheckCircle2,
  Circle,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Admin() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Gate
        title="Admin Login"
        body="Please sign in with the owner account to manage the website."
        action={
          <Button
            className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90"
            onClick={() => (window.location.href = getLoginUrl("/admin"))}
          >
            Sign In
          </Button>
        }
      />
    );
  }

  if (user?.role !== "admin") {
    return (
      <Gate
        title="Access Restricted"
        body="This area is reserved for the site owner. Your account does not have admin permissions."
        action={
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button variant="outline" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        }
      />
    );
  }

  return <AdminDashboard onLogout={logout} userName={user?.name ?? "Owner"} />;
}

function Gate({ title, body, action }: { title: string; body: string; action: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-4 text-center">
      <img src={LOGO_URL} alt="Prime Industrial" className="h-12 w-auto" />
      <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-orange-brand">
        <ShieldAlert className="h-7 w-7" />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-navy">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{body}</p>
      <div className="mt-6">{action}</div>
    </div>
  );
}

function AdminDashboard({ onLogout, userName }: { onLogout: () => void; userName: string }) {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b bg-navy text-navy-foreground">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded bg-white p-1.5">
              <img src={LOGO_URL} alt="Prime Industrial" className="h-7 w-auto" />
            </div>
            <span className="font-display text-lg font-bold uppercase tracking-wide">Admin</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-white/70 sm:inline">{userName}</span>
            <Button asChild variant="outline" size="sm" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/">View Site</Link>
            </Button>
            <Button size="sm" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={onLogout}>
              <LogOut className="mr-1.5 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="content">Page Content</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="mt-6">
            <ProductsAdmin />
          </TabsContent>
          <TabsContent value="applications" className="mt-6">
            <ApplicationsAdmin />
          </TabsContent>
          <TabsContent value="content" className="mt-6">
            <SiteContentAdmin />
          </TabsContent>
          <TabsContent value="inquiries" className="mt-6">
            <InquiriesAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ------------------------------- Products ------------------------------- */

type ProductForm = {
  id?: number;
  category: ProductCategory;
  code: string;
  nameEn: string;
  nameEl: string;
  descriptionEn: string;
  descriptionEl: string;
  imageUrl: string | null;
  published: boolean;
};

const emptyProduct: ProductForm = {
  category: "metal-repair",
  code: "",
  nameEn: "",
  nameEl: "",
  descriptionEn: "",
  descriptionEl: "",
  imageUrl: null,
  published: true,
};

function ProductsAdmin() {
  const utils = trpc.useUtils();
  const listQuery = trpc.products.listAll.useQuery();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProductForm>(emptyProduct);

  const invalidate = () => {
    utils.products.listAll.invalidate();
    utils.products.list.invalidate();
  };

  const createM = trpc.products.create.useMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Product created.");
      setOpen(false);
    },
    onError: () => toast.error("Could not save product."),
  });
  const updateM = trpc.products.update.useMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Product updated.");
      setOpen(false);
    },
    onError: () => toast.error("Could not update product."),
  });
  const deleteM = trpc.products.delete.useMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Product deleted.");
    },
    onError: () => toast.error("Could not delete product."),
  });

  const openNew = () => {
    setForm(emptyProduct);
    setOpen(true);
  };
  const openEdit = (p: NonNullable<typeof listQuery.data>[number]) => {
    setForm({
      id: p.id,
      category: p.category as ProductCategory,
      code: p.code,
      nameEn: p.nameEn,
      nameEl: p.nameEl,
      descriptionEn: p.descriptionEn ?? "",
      descriptionEl: p.descriptionEl ?? "",
      imageUrl: p.imageUrl ?? null,
      published: p.published,
    });
    setOpen(true);
  };

  const save = () => {
    if (!form.code || !form.nameEn || !form.nameEl) {
      toast.error("Code and both names are required.");
      return;
    }
    const payload = {
      category: form.category,
      code: form.code,
      nameEn: form.nameEn,
      nameEl: form.nameEl,
      descriptionEn: form.descriptionEn || null,
      descriptionEl: form.descriptionEl || null,
      imageUrl: form.imageUrl,
      published: form.published,
    };
    if (form.id) updateM.mutate({ id: form.id, ...payload });
    else createM.mutate(payload);
  };

  const rows = listQuery.data ?? [];
  const saving = createM.isPending || updateM.isPending;

  return (
    <div>
      <SectionBar title="Products" count={rows.length} onAdd={openNew} addLabel="Add Product" />

      {listQuery.isLoading ? (
        <LoadingRows />
      ) : rows.length === 0 ? (
        <EmptyAdmin message="No products yet. Add your first Belzona product." />
      ) : (
        <div className="grid gap-3">
          {rows.map((p) => (
            <AdminRow
              key={p.id}
              image={p.imageUrl}
              title={`${p.code} — ${p.nameEn}`}
              subtitle={p.nameEl}
              published={p.published}
              onEdit={() => openEdit(p)}
              onDelete={() => {
                if (confirm(`Delete "${p.code}"?`)) deleteM.mutate({ id: p.id });
              }}
            />
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Product" : "New Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <FormRow label="Image">
              <ImageUploadField value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} />
            </FormRow>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormRow label="Category">
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as ProductCategory })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((c) => (
                      <SelectItem key={c.key} value={c.key}>
                        {c.key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormRow>
              <FormRow label="Product Code / Number">
                <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. Belzona 1111" />
              </FormRow>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormRow label="Name (English)">
                <Input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} />
              </FormRow>
              <FormRow label="Name (Greek)">
                <Input value={form.nameEl} onChange={(e) => setForm({ ...form, nameEl: e.target.value })} />
              </FormRow>
            </div>
            <FormRow label="Description (English)">
              <Textarea rows={3} value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} />
            </FormRow>
            <FormRow label="Description (Greek)">
              <Textarea rows={3} value={form.descriptionEl} onChange={(e) => setForm({ ...form, descriptionEl: e.target.value })} />
            </FormRow>
            <div className="flex items-center gap-3">
              <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
              <span className="text-sm font-medium">Published (visible on site)</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90" disabled={saving} onClick={save}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ----------------------------- Applications ----------------------------- */

type AppForm = {
  id?: number;
  titleEn: string;
  titleEl: string;
  summaryEn: string;
  summaryEl: string;
  descriptionEn: string;
  descriptionEl: string;
  imageUrl: string | null;
  published: boolean;
};

const emptyApp: AppForm = {
  titleEn: "",
  titleEl: "",
  summaryEn: "",
  summaryEl: "",
  descriptionEn: "",
  descriptionEl: "",
  imageUrl: null,
  published: true,
};

function ApplicationsAdmin() {
  const utils = trpc.useUtils();
  const listQuery = trpc.applications.listAll.useQuery();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AppForm>(emptyApp);

  const invalidate = () => {
    utils.applications.listAll.invalidate();
    utils.applications.list.invalidate();
  };

  const createM = trpc.applications.create.useMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Application created.");
      setOpen(false);
    },
    onError: () => toast.error("Could not save application."),
  });
  const updateM = trpc.applications.update.useMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Application updated.");
      setOpen(false);
    },
    onError: () => toast.error("Could not update application."),
  });
  const deleteM = trpc.applications.delete.useMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Application deleted.");
    },
    onError: () => toast.error("Could not delete application."),
  });

  const openNew = () => {
    setForm(emptyApp);
    setOpen(true);
  };
  const openEdit = (a: NonNullable<typeof listQuery.data>[number]) => {
    setForm({
      id: a.id,
      titleEn: a.titleEn,
      titleEl: a.titleEl,
      summaryEn: a.summaryEn ?? "",
      summaryEl: a.summaryEl ?? "",
      descriptionEn: a.descriptionEn ?? "",
      descriptionEl: a.descriptionEl ?? "",
      imageUrl: a.imageUrl ?? null,
      published: a.published,
    });
    setOpen(true);
  };

  const save = () => {
    if (!form.titleEn || !form.titleEl) {
      toast.error("Both titles are required.");
      return;
    }
    const payload = {
      titleEn: form.titleEn,
      titleEl: form.titleEl,
      summaryEn: form.summaryEn || null,
      summaryEl: form.summaryEl || null,
      descriptionEn: form.descriptionEn || null,
      descriptionEl: form.descriptionEl || null,
      imageUrl: form.imageUrl,
      published: form.published,
    };
    if (form.id) updateM.mutate({ id: form.id, ...payload });
    else createM.mutate(payload);
  };

  const rows = listQuery.data ?? [];
  const saving = createM.isPending || updateM.isPending;

  return (
    <div>
      <SectionBar title="Applications" count={rows.length} onAdd={openNew} addLabel="Add Application" />

      {listQuery.isLoading ? (
        <LoadingRows />
      ) : rows.length === 0 ? (
        <EmptyAdmin message="No applications yet. Showcase your Belzona use cases here." />
      ) : (
        <div className="grid gap-3">
          {rows.map((a) => (
            <AdminRow
              key={a.id}
              image={a.imageUrl}
              title={a.titleEn}
              subtitle={a.titleEl}
              published={a.published}
              onEdit={() => openEdit(a)}
              onDelete={() => {
                if (confirm(`Delete "${a.titleEn}"?`)) deleteM.mutate({ id: a.id });
              }}
            />
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Application" : "New Application"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <FormRow label="Image">
              <ImageUploadField value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} />
            </FormRow>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormRow label="Title (English)">
                <Input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
              </FormRow>
              <FormRow label="Title (Greek)">
                <Input value={form.titleEl} onChange={(e) => setForm({ ...form, titleEl: e.target.value })} />
              </FormRow>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormRow label="Summary (English)">
                <Textarea rows={2} value={form.summaryEn} onChange={(e) => setForm({ ...form, summaryEn: e.target.value })} />
              </FormRow>
              <FormRow label="Summary (Greek)">
                <Textarea rows={2} value={form.summaryEl} onChange={(e) => setForm({ ...form, summaryEl: e.target.value })} />
              </FormRow>
            </div>
            <FormRow label="Full Description (English)">
              <Textarea rows={4} value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} />
            </FormRow>
            <FormRow label="Full Description (Greek)">
              <Textarea rows={4} value={form.descriptionEl} onChange={(e) => setForm({ ...form, descriptionEl: e.target.value })} />
            </FormRow>
            <div className="flex items-center gap-3">
              <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
              <span className="text-sm font-medium">Published (visible on site)</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90" disabled={saving} onClick={save}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ------------------------------ Inquiries ------------------------------- */

function InquiriesAdmin() {
  const utils = trpc.useUtils();
  const listQuery = trpc.inquiries.list.useQuery();
  const setHandled = trpc.inquiries.setHandled.useMutation({
    onSuccess: () => utils.inquiries.list.invalidate(),
  });

  const rows = listQuery.data ?? [];

  if (listQuery.isLoading) return <LoadingRows />;
  if (rows.length === 0) return <EmptyAdmin message="No inquiries received yet." />;

  return (
    <div className="grid gap-3">
      {rows.map((q) => (
        <div key={q.id} className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-navy">{q.name}</h3>
                {q.company && <span className="text-sm text-muted-foreground">· {q.company}</span>}
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                  {q.sector}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <a href={`mailto:${q.email}`} className="hover:text-orange-brand">{q.email}</a>
                {q.phone && <a href={`tel:${q.phone}`} className="hover:text-orange-brand">{q.phone}</a>}
                <span>{new Date(q.createdAt).toLocaleString()}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setHandled.mutate({ id: q.id, handled: !q.handled })}
            >
              {q.handled ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-4 w-4 text-green-600" /> Handled
                </>
              ) : (
                <>
                  <Circle className="mr-1.5 h-4 w-4" /> Mark handled
                </>
              )}
            </Button>
          </div>
          <p className="mt-3 whitespace-pre-line rounded-md bg-secondary p-3 text-sm text-foreground">
            {q.message}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- Site Content ----------------------------- */

function SiteContentAdmin() {
  const utils = trpc.useUtils();
  const listQuery = trpc.siteContent.listAll.useQuery();
  const rows = listQuery.data ?? [];

  if (listQuery.isLoading) return <LoadingRows />;
  if (rows.length === 0) return <EmptyAdmin message="No editable content found." />;

  // Group rows by their page/group for a tidy editor.
  const groups = rows.reduce<Record<string, typeof rows>>((acc, r) => {
    (acc[r.groupName] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-navy">Page Content</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit the fixed text shown on your public pages, in English and Greek. Changes go live
          immediately after you save. Leave a field unchanged to keep the current text.
        </p>
      </div>
      <div className="space-y-8">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <h3 className="mb-3 border-b pb-2 font-display text-lg font-bold uppercase tracking-wide text-navy">
              {group}
            </h3>
            <div className="space-y-3">
              {items.map((row) => (
                <ContentField
                  key={row.id}
                  row={row}
                  onSaved={() => {
                    utils.siteContent.listAll.invalidate();
                    utils.siteContent.list.invalidate();
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentField({
  row,
  onSaved,
}: {
  row: { contentKey: string; label: string; valueEn: string | null; valueEl: string | null; multiline: boolean };
  onSaved: () => void;
}) {
  const [en, setEn] = useState(row.valueEn ?? "");
  const [el, setEl] = useState(row.valueEl ?? "");

  const dirty = en !== (row.valueEn ?? "") || el !== (row.valueEl ?? "");

  const updateM = trpc.siteContent.update.useMutation({
    onSuccess: () => {
      toast.success(`Saved: ${row.label}`);
      onSaved();
    },
    onError: () => toast.error("Could not save. Please try again."),
  });
  const resetM = trpc.siteContent.reset.useMutation({
    onSuccess: () => {
      toast.success(`Reset to default: ${row.label}`);
      onSaved();
    },
    onError: () => toast.error("Could not reset."),
  });

  const Field = row.multiline ? Textarea : Input;

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold text-navy">{row.label}</Label>
        <div className="flex gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground"
            disabled={resetM.isPending}
            onClick={() => {
              if (confirm(`Reset "${row.label}" back to the original text?`)) resetM.mutate({ contentKey: row.contentKey });
            }}
            aria-label="Reset to default"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset
          </Button>
          <Button
            size="sm"
            className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90"
            disabled={!dirty || updateM.isPending}
            onClick={() => updateM.mutate({ contentKey: row.contentKey, valueEn: en, valueEl: el })}
          >
            {updateM.isPending ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="mr-1.5 h-3.5 w-3.5" />
            )}
            Save
          </Button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">English</span>
          <Field value={en} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEn(e.target.value)} rows={row.multiline ? 3 : undefined} />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Ελληνικά</span>
          <Field value={el} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEl(e.target.value)} rows={row.multiline ? 3 : undefined} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Shared UI ------------------------------ */

function SectionBar({
  title,
  count,
  onAdd,
  addLabel,
}: {
  title: string;
  count: number;
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-navy">
        {title} <span className="text-base text-muted-foreground">({count})</span>
      </h2>
      <Button className="bg-navy text-white hover:bg-navy/90" onClick={onAdd}>
        <Plus className="mr-1.5 h-4 w-4" /> {addLabel}
      </Button>
    </div>
  );
}

function AdminRow({
  image,
  title,
  subtitle,
  published,
  onEdit,
  onDelete,
}: {
  image?: string | null;
  title: string;
  subtitle?: string;
  published: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-secondary">
        {image ? <img src={image} alt="" className="h-full w-full object-cover" /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-navy">{title}</p>
        {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
        }`}
      >
        {published ? "Published" : "Draft"}
      </span>
      <div className="flex gap-1">
        <Button size="icon" variant="ghost" onClick={onEdit} aria-label="Edit">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onDelete} aria-label="Delete" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-navy">{label}</Label>
      {children}
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="h-6 w-6 animate-spin text-navy" />
    </div>
  );
}

function EmptyAdmin({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">{message}</div>
  );
}
