import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// In-memory store for site content rows used by the mocked db helpers.
const store: Record<string, { valueEn: string | null; valueEl: string | null }> = {
  "services.title": { valueEn: "Our Services", valueEl: "Οι Υπηρεσίες μας" },
};

vi.mock("./db", async () => {
  return {
    listSiteContent: vi.fn(async () =>
      Object.entries(store).map(([contentKey, v], i) => ({
        id: i + 1,
        contentKey,
        groupName: "Services",
        label: contentKey,
        valueEn: v.valueEn,
        valueEl: v.valueEl,
        multiline: false,
        sortOrder: 0,
        updatedAt: new Date(),
      })),
    ),
    upsertSiteContent: vi.fn(async (row: { contentKey: string; valueEn: string | null; valueEl: string | null }) => {
      store[row.contentKey] = { valueEn: row.valueEn ?? null, valueEl: row.valueEl ?? null };
    }),
    seedSiteContent: vi.fn(async () => undefined),
  };
});

// The router also imports the seeder module; stub it so seeding is a no-op in tests.
vi.mock("./siteContentSeed", () => ({
  ensureSiteContentSeeded: vi.fn(async () => undefined),
  SITE_CONTENT_FIELDS: [
    { contentKey: "services.title", valueEn: "Our Services", valueEl: "Οι Υπηρεσίες μας" },
  ],
}));

function publicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function adminCtx(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "owner",
      email: "owner@example.com",
      name: "Owner",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("siteContent.list (public)", () => {
  it("returns a key -> {en,el} map", async () => {
    const caller = appRouter.createCaller(publicCtx());
    const map = await caller.siteContent.list();
    expect(map["services.title"]).toEqual({ en: "Our Services", el: "Οι Υπηρεσίες μας" });
  });
});

describe("siteContent admin access control", () => {
  it("blocks anonymous users from listing all content", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(caller.siteContent.listAll()).rejects.toThrow();
  });

  it("blocks anonymous users from updating content", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.siteContent.update({ contentKey: "services.title", valueEn: "Hacked", valueEl: "Hacked" }),
    ).rejects.toThrow();
  });

  it("allows the owner to update content, reflected in the public map", async () => {
    const admin = appRouter.createCaller(adminCtx());
    await admin.siteContent.update({
      contentKey: "services.title",
      valueEn: "Services & Support",
      valueEl: "Υπηρεσίες & Υποστήριξη",
    });

    const pub = appRouter.createCaller(publicCtx());
    const map = await pub.siteContent.list();
    expect(map["services.title"]).toEqual({ en: "Services & Support", el: "Υπηρεσίες & Υποστήριξη" });
  });

  it("allows the owner to reset content back to its default", async () => {
    const admin = appRouter.createCaller(adminCtx());
    await admin.siteContent.reset({ contentKey: "services.title" });

    const pub = appRouter.createCaller(publicCtx());
    const map = await pub.siteContent.list();
    expect(map["services.title"]?.en).toBe("Our Services");
  });
});
