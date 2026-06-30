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
  const { loading: manusLoading, logout: manusLogout } = useAuth();
  const utils = trpc.useUtils();
  // Single source of truth for "who is the admin": Manus owner OR staff session.
  const identity = trpc.staffAuth.me.useQuery();

  const staffLogout = trpc.staffAuth.logout.useMutation({
    onSuccess: () => identity.refetch(),
  });

  if (manusLoading || identity.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  const me = identity.data;

  // Not signed in as owner or staff → show combined login screen.
  if (!me) {
    return <LoginScreen onStaffLoggedIn={() => identity.refetch()} />;
  }

  // Staff with a temporary password must set a new one before continuing.
  if (me.kind === "staff" && me.mustChangePassword) {
    return <ForcePasswordChange onDone={() => utils.staffAuth.me.invalidate()} />;
  }

  const handleLogout = () => {
    if (me.kind === "owner") {
      manusLogout();
    } else {
      staffLogout.mutate();
    }
  };

  return (
    <AdminDashboard
      onLogout={handleLogout}
      userName={me.name}
      isOwner={me.kind === "owner"}
      isStaff={me.kind === "staff"}
    />
  );
}

/* ------------------------------ Login screen ---------------------------- */

function LoginScreen({ onStaffLoggedIn }: { onStaffLoggedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginM = trpc.staffAuth.login.useMutation({
    onSuccess: () => {
      toast.success("Signed in.");
      onStaffLoggedIn();
    },
    onError: (e) => toast.error(e.message || "Invalid email or password."),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter your email and password.");
      return;
    }
    loginM.mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm rounded-xl border bg-card p-7 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <img src={LOGO_URL} alt="Prime Industrial" className="h-11 w-auto" />
          <h1 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-navy">
            Admin Sign In
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in with your administrator email and password.
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-navy">Email</Label>
            <Input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-navy">Password</Label>
            <Input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90"
            disabled={loginM.isPending}
          >
            {loginM.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>

        <div className="mt-6 border-t pt-5 text-center">
          <p className="text-xs text-muted-foreground">Site owner?</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => (window.location.href = getLoginUrl("/admin"))}
          >
            Sign in with Manus (Owner)
          </Button>
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------- Forced password change (first login) --------------- */

function ForcePasswordChange({ onDone }: { onDone: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm2, setConfirm2] = useState("");

  const changeM = trpc.staffAuth.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password updated.");
      onDone();
    },
    onError: (e) => toast.error(e.message || "Could not update password."),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (next.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm2) {
      toast.error("Passwords do not match.");
      return;
    }
    changeM.mutate({ currentPassword: current, newPassword: next });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm rounded-xl border bg-card p-7 shadow-sm">
        <div className="text-center">
          <img src={LOGO_URL} alt="Prime Industrial" className="mx-auto h-11 w-auto" />
          <h1 className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-navy">
            Set Your Password
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            For security, please replace your temporary password before continuing.
          </p>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-navy">Temporary password</Label>
            <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-navy">New password</Label>
            <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} placeholder="At least 8 characters" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-navy">Confirm new password</Label>
            <Input type="password" value={confirm2} onChange={(e) => setConfirm2(e.target.value)} />
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90"
            disabled={changeM.isPending}
          >
            {changeM.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Password
          </Button>
        </form>
      </div>
    </div>
  );
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

function AdminDashboard({
  onLogout,
  userName,
  isOwner,
  isStaff,
}: {
  onLogout: () => void;
  userName: string;
  isOwner: boolean;
  isStaff: boolean;
}) {
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
            <span className="hidden text-white/70 sm:inline">
              {userName}
              {isOwner ? " · Owner" : ""}
            </span>
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
            {isOwner && <TabsTrigger value="admins">Administrators</TabsTrigger>}
            {isStaff && <TabsTrigger value="account">My Account</TabsTrigger>}
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
          {isOwner && (
            <TabsContent value="admins" className="mt-6">
              <AdministratorsAdmin />
            </TabsContent>
          )}
          {isStaff && (
            <TabsContent value="account" className="mt-6">
              <MyAccount />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}

/* ---------------------- Administrators (owner only) --------------------- */

function AdministratorsAdmin() {
  const utils = trpc.useUtils();
  const listQuery = trpc.staffAdmins.list.useQuery();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [credential, setCredential] = useState<{ email: string; tempPassword: string } | null>(null);

  const refresh = () => utils.staffAdmins.list.invalidate();

  const createM = trpc.staffAdmins.create.useMutation({
    onSuccess: (res) => {
      refresh();
      setOpen(false);
      setEmail("");
      setName("");
      setCredential({ email: res.email, tempPassword: res.tempPassword });
    },
    onError: (e) => toast.error(e.message || "Could not create administrator."),
  });
  const setActiveM = trpc.staffAdmins.setActive.useMutation({
    onSuccess: () => {
      refresh();
      toast.success("Updated.");
    },
    onError: () => toast.error("Could not update."),
  });
  const resetM = trpc.staffAdmins.resetPassword.useMutation({
    onSuccess: (res, vars) => {
      const target = (listQuery.data ?? []).find((a) => a.id === vars.id);
      setCredential({ email: target?.email ?? "administrator", tempPassword: res.tempPassword });
    },
    onError: () => toast.error("Could not reset password."),
  });
  const deleteM = trpc.staffAdmins.delete.useMutation({
    onSuccess: () => {
      refresh();
      toast.success("Administrator removed.");
    },
    onError: () => toast.error("Could not remove."),
  });

  const rows = listQuery.data ?? [];

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-navy">
            Administrators <span className="text-base text-muted-foreground">({rows.length})</span>
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Grant content-management access to other people using email + password. They can manage
            products, applications, page content and inquiries — but only you (the owner) can manage
            this list.
          </p>
        </div>
        <Button className="bg-navy text-white hover:bg-navy/90" onClick={() => setOpen(true)}>
          <Plus className="mr-1.5 h-4 w-4" /> Add Administrator
        </Button>
      </div>

      {listQuery.isLoading ? (
        <LoadingRows />
      ) : rows.length === 0 ? (
        <EmptyAdmin message="No additional administrators yet. Add one to delegate site management." />
      ) : (
        <div className="grid gap-3">
          {rows.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-navy">{a.name || a.email}</p>
                <p className="truncate text-sm text-muted-foreground">{a.email}</p>
              </div>
              {a.mustChangePassword && (
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                  Pending first login
                </span>
              )}
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  a.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                }`}
              >
                {a.active ? "Active" : "Disabled"}
              </span>
              <div className="flex items-center gap-2">
                <Switch
                  checked={a.active}
                  onCheckedChange={(v) => setActiveM.mutate({ id: a.id, active: v })}
                  aria-label="Toggle active"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground"
                  disabled={resetM.isPending}
                  onClick={() => {
                    if (confirm(`Issue a new temporary password for ${a.email}?`)) resetM.mutate({ id: a.id });
                  }}
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset password
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => {
                    if (confirm(`Remove ${a.email}? They will lose access immediately.`)) deleteM.mutate({ id: a.id });
                  }}
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Administrator</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <FormRow label="Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="person@company.com" />
            </FormRow>
            <FormRow label="Name (optional)">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            </FormRow>
            <p className="text-xs text-muted-foreground">
              A one-time temporary password will be generated. Share it with the person; they will be
              asked to set their own password on first sign-in.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90"
              disabled={createM.isPending || !email}
              onClick={() => createM.mutate({ email, name: name || null })}
            >
              {createM.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Temporary-password reveal dialog */}
      <Dialog open={!!credential} onOpenChange={(o) => !o && setCredential(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Temporary password</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Share these credentials securely with <strong>{credential?.email}</strong>. This
              password is shown only once.
            </p>
            <div className="rounded-lg border bg-secondary p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p>
              <p className="font-mono text-sm text-navy">{credential?.email}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">Temporary password</p>
              <p className="font-mono text-lg font-bold text-navy">{credential?.tempPassword}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                if (credential) {
                  navigator.clipboard?.writeText(
                    `Email: ${credential.email}\nTemporary password: ${credential.tempPassword}`,
                  );
                  toast.success("Copied to clipboard.");
                }
              }}
            >
              Copy
            </Button>
            <Button
              className="bg-navy text-white hover:bg-navy/90"
              onClick={() => {
                refresh();
                setCredential(null);
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ----------------------- My Account (staff only) ------------------------ */

function MyAccount() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm2, setConfirm2] = useState("");

  const changeM = trpc.staffAuth.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password updated.");
      setCurrent("");
      setNext("");
      setConfirm2("");
    },
    onError: (e) => toast.error(e.message || "Could not update password."),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (next.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm2) {
      toast.error("Passwords do not match.");
      return;
    }
    changeM.mutate({ currentPassword: current, newPassword: next });
  };

  return (
    <div className="max-w-md">
      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-navy">Change Password</h2>
      <form onSubmit={submit} className="mt-5 space-y-3 rounded-lg border bg-card p-5 shadow-sm">
        <FormRow label="Current password">
          <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </FormRow>
        <FormRow label="New password">
          <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} placeholder="At least 8 characters" />
        </FormRow>
        <FormRow label="Confirm new password">
          <Input type="password" value={confirm2} onChange={(e) => setConfirm2(e.target.value)} />
        </FormRow>
        <Button
          type="submit"
          className="bg-orange-brand text-orange-brand-foreground hover:bg-orange-brand/90"
          disabled={changeM.isPending}
        >
          {changeM.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Password
        </Button>
      </form>
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
