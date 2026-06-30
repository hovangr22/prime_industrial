import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { TRPCError } from "@trpc/server";
import { adminProcedure, ownerProcedure, publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { sendEmail } from "./_core/email";
import {
  createApplication,
  createInquiry,
  createProduct,
  createStaffAdmin,
  deleteApplication,
  deleteProduct,
  deleteStaffAdmin,
  deleteStaffSessionsForStaff,
  getStaffAdminByEmail,
  getStaffAdminById,
  listApplications,
  listInquiries,
  listProducts,
  listSiteContent,
  listStaffAdmins,
  setInquiryHandled,
  updateApplication,
  updateProduct,
  updateStaffAdmin,
  upsertSiteContent,
} from "./db";
import { SITE_CONTENT_FIELDS, ensureSiteContentSeeded } from "./siteContentSeed";
import {
  endStaffSession,
  generateTempPassword,
  hashPassword,
  startStaffSession,
  verifyPassword,
} from "./staffAuth";

const productInput = z.object({
  category: z.string().min(1).max(64),
  code: z.string().min(1).max(128),
  nameEn: z.string().min(1).max(255),
  nameEl: z.string().min(1).max(255),
  descriptionEn: z.string().max(8000).optional().nullable(),
  descriptionEl: z.string().max(8000).optional().nullable(),
  imageUrl: z.string().max(2000).optional().nullable(),
  imageKey: z.string().max(512).optional().nullable(),
  sortOrder: z.number().int().optional(),
  published: z.boolean().optional(),
});

const applicationInput = z.object({
  titleEn: z.string().min(1).max(255),
  titleEl: z.string().min(1).max(255),
  summaryEn: z.string().max(512).optional().nullable(),
  summaryEl: z.string().max(512).optional().nullable(),
  descriptionEn: z.string().max(8000).optional().nullable(),
  descriptionEl: z.string().max(8000).optional().nullable(),
  imageUrl: z.string().max(2000).optional().nullable(),
  imageKey: z.string().max(512).optional().nullable(),
  sortOrder: z.number().int().optional(),
  published: z.boolean().optional(),
});

// Data URL upload (base64) coming from the admin image picker.
const uploadInput = z.object({
  fileName: z.string().min(1).max(255),
  mimeType: z.string().min(1).max(128),
  dataBase64: z.string().min(1),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  /* ---------------------------- Public catalog ---------------------------- */
  products: router({
    list: publicProcedure.query(() => listProducts(true)),
    listAll: adminProcedure.query(() => listProducts(false)),
    create: adminProcedure.input(productInput).mutation(({ input }) => createProduct(input)),
    update: adminProcedure
      .input(z.object({ id: z.number().int() }).and(productInput.partial()))
      .mutation(({ input }) => {
        const { id, ...rest } = input;
        return updateProduct(id, rest);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(({ input }) => deleteProduct(input.id)),
  }),

  applications: router({
    list: publicProcedure.query(() => listApplications(true)),
    listAll: adminProcedure.query(() => listApplications(false)),
    create: adminProcedure.input(applicationInput).mutation(({ input }) => createApplication(input)),
    update: adminProcedure
      .input(z.object({ id: z.number().int() }).and(applicationInput.partial()))
      .mutation(({ input }) => {
        const { id, ...rest } = input;
        return updateApplication(id, rest);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(({ input }) => deleteApplication(input.id)),
  }),

  /* ------------------------------- Uploads -------------------------------- */
  media: router({
    upload: adminProcedure.input(uploadInput).mutation(async ({ input }) => {
      const buffer = Buffer.from(input.dataBase64, "base64");
      const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const key = `prime-media/${Date.now()}-${safeName}`;
      const { url } = await storagePut(key, buffer, input.mimeType);
      return { url, key };
    }),
  }),

  /* ------------------------------ Inquiries ------------------------------- */
  inquiries: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(255),
          company: z.string().max(255).optional().nullable(),
          email: z.string().email().max(320),
          phone: z.string().max(64).optional().nullable(),
          message: z.string().min(1).max(8000),
          sector: z.enum(["industry", "maritime", "general"]).default("general"),
        }),
      )
      .mutation(async ({ input }) => {
        const id = await createInquiry({
          name: input.name,
          company: input.company ?? null,
          email: input.email,
          phone: input.phone ?? null,
          message: input.message,
          sector: input.sector,
        });

        // Notify the project owner (best-effort, non-blocking on failure).
        const sectorLabel =
          input.sector === "industry"
            ? "Industry"
            : input.sector === "maritime"
              ? "Maritime"
              : "General";
        await notifyOwner({
          title: `New inquiry from ${input.name}${input.company ? ` (${input.company})` : ""}`,
          content: [
            `Sector: ${sectorLabel}`,
            `Name: ${input.name}`,
            input.company ? `Company: ${input.company}` : null,
            `Email: ${input.email}`,
            input.phone ? `Phone: ${input.phone}` : null,
            "",
            "Message:",
            input.message,
          ]
            .filter(Boolean)
            .join("\n"),
        }).catch(() => false);

        // Send email to info@primeindustrial.com (best-effort, non-blocking on failure).
        await sendEmail({
          to: "info@primeindustrial.com",
          subject: `New Inquiry from ${input.name}${input.company ? ` (${input.company})` : ""}`,
          body: [
            `Sector: ${sectorLabel}`,
            `Name: ${input.name}`,
            input.company ? `Company: ${input.company}` : null,
            `Email: ${input.email}`,
            input.phone ? `Phone: ${input.phone}` : null,
            "",
            "Message:",
            input.message,
          ]
            .filter(Boolean)
            .join("\n"),
        }).catch(() => false);

        return { success: true, id };
      }),
    list: adminProcedure.query(() => listInquiries()),
    setHandled: adminProcedure
      .input(z.object({ id: z.number().int(), handled: z.boolean() }))
      .mutation(({ input }) => setInquiryHandled(input.id, input.handled)),
  }),

  /* ---------------------------- Site Content ------------------------------ */
  siteContent: router({
    // Public: returns the editable copy as a { key: { en, el } } map for the frontend.
    list: publicProcedure.query(async () => {
      await ensureSiteContentSeeded();
      const rows = await listSiteContent();
      const map: Record<string, { en: string | null; el: string | null }> = {};
      for (const r of rows) map[r.contentKey] = { en: r.valueEn, el: r.valueEl };
      return map;
    }),
    // Admin: full rows (incl. labels/groups) for the editor.
    listAll: adminProcedure.query(async () => {
      await ensureSiteContentSeeded();
      return listSiteContent();
    }),
    update: adminProcedure
      .input(
        z.object({
          contentKey: z.string().min(1).max(191),
          valueEn: z.string().max(8000).optional().nullable(),
          valueEl: z.string().max(8000).optional().nullable(),
        }),
      )
      .mutation(({ input }) => upsertSiteContent(input)),
    // Admin: reset a single field back to its default seed value.
    reset: adminProcedure
      .input(z.object({ contentKey: z.string().min(1).max(191) }))
      .mutation(({ input }) => {
        const def = SITE_CONTENT_FIELDS.find((f) => f.contentKey === input.contentKey);
        if (!def) return;
        return upsertSiteContent({
          contentKey: input.contentKey,
          valueEn: def.valueEn,
          valueEl: def.valueEl,
        });
      }),
  }),

  /* ----------------------- Staff auth (email/password) -------------------- */
  staffAuth: router({
    // Who is the current admin? Reports Manus owner OR staff session identity.
    me: publicProcedure.query(({ ctx }) => {
      if (ctx.user?.role === "admin") {
        return {
          kind: "owner" as const,
          name: ctx.user.name ?? "Owner",
          email: ctx.user.email ?? null,
          mustChangePassword: false,
        };
      }
      if (ctx.staff) {
        return {
          kind: "staff" as const,
          name: ctx.staff.name ?? ctx.staff.email,
          email: ctx.staff.email,
          mustChangePassword: ctx.staff.mustChangePassword,
        };
      }
      return null;
    }),
    login: publicProcedure
      .input(z.object({ email: z.string().email().max(320), password: z.string().min(1).max(256) }))
      .mutation(async ({ ctx, input }) => {
        const staff = await getStaffAdminByEmail(input.email);
        // Constant-ish behaviour: always run verify even if not found.
        const ok =
          !!staff &&
          staff.active &&
          (await verifyPassword(input.password, staff.passwordHash, staff.passwordSalt));
        if (!staff || !ok) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
        }
        await startStaffSession(ctx.res, ctx.req, staff.id);
        await updateStaffAdmin(staff.id, { lastSignedIn: new Date() });
        return { success: true, mustChangePassword: staff.mustChangePassword };
      }),
    logout: publicProcedure.mutation(async ({ ctx }) => {
      await endStaffSession(ctx.req, ctx.res);
      return { success: true } as const;
    }),
    // A logged-in staff admin changes their own password.
    changePassword: publicProcedure
      .input(
        z.object({
          currentPassword: z.string().min(1).max(256),
          newPassword: z.string().min(8).max(256),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.staff) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Not signed in as staff." });
        }
        const current = await getStaffAdminById(ctx.staff.id);
        const ok =
          !!current &&
          (await verifyPassword(input.currentPassword, current.passwordHash, current.passwordSalt));
        if (!ok) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Current password is incorrect." });
        }
        const { hash, salt } = await hashPassword(input.newPassword);
        await updateStaffAdmin(ctx.staff.id, {
          passwordHash: hash,
          passwordSalt: salt,
          mustChangePassword: false,
        });
        return { success: true } as const;
      }),
  }),

  /* --------------- Staff admin management (owner-only) -------------------- */
  staffAdmins: router({
    list: ownerProcedure.query(async () => {
      const rows = await listStaffAdmins();
      // Never expose password material to the client.
      return rows.map((r) => ({
        id: r.id,
        email: r.email,
        name: r.name,
        active: r.active,
        mustChangePassword: r.mustChangePassword,
        lastSignedIn: r.lastSignedIn,
        createdAt: r.createdAt,
      }));
    }),
    // Create a new admin and return a one-time temporary password to share.
    create: ownerProcedure
      .input(
        z.object({
          email: z.string().email().max(320),
          name: z.string().max(255).optional().nullable(),
        }),
      )
      .mutation(async ({ input }) => {
        const existing = await getStaffAdminByEmail(input.email);
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: "An admin with that email already exists." });
        }
        const tempPassword = generateTempPassword();
        const { hash, salt } = await hashPassword(tempPassword);
        const id = await createStaffAdmin({
          email: input.email,
          name: input.name ?? null,
          passwordHash: hash,
          passwordSalt: salt,
          mustChangePassword: true,
          active: true,
        });
        return { id, email: input.email.toLowerCase().trim(), tempPassword };
      }),
    setActive: ownerProcedure
      .input(z.object({ id: z.number().int(), active: z.boolean() }))
      .mutation(async ({ input }) => {
        await updateStaffAdmin(input.id, { active: input.active });
        // Revoke sessions when deactivating.
        if (!input.active) await deleteStaffSessionsForStaff(input.id);
        return { success: true } as const;
      }),
    // Issue a fresh temporary password (returned once to the owner).
    resetPassword: ownerProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input }) => {
        const staff = await getStaffAdminById(input.id);
        if (!staff) throw new TRPCError({ code: "NOT_FOUND", message: "Admin not found." });
        const tempPassword = generateTempPassword();
        const { hash, salt } = await hashPassword(tempPassword);
        await updateStaffAdmin(input.id, {
          passwordHash: hash,
          passwordSalt: salt,
          mustChangePassword: true,
        });
        await deleteStaffSessionsForStaff(input.id);
        return { tempPassword };
      }),
    delete: ownerProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input }) => {
        await deleteStaffAdmin(input.id);
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
