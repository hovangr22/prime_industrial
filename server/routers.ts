import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import {
  createApplication,
  createInquiry,
  createProduct,
  deleteApplication,
  deleteProduct,
  listApplications,
  listInquiries,
  listProducts,
  setInquiryHandled,
  updateApplication,
  updateProduct,
} from "./db";

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

        return { success: true, id };
      }),
    list: adminProcedure.query(() => listInquiries()),
    setHandled: adminProcedure
      .input(z.object({ id: z.number().int(), handled: z.boolean() }))
      .mutation(({ input }) => setInquiryHandled(input.id, input.handled)),
  }),
});

export type AppRouter = typeof appRouter;
