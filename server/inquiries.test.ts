import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock DB + notification so tests don't need a live database.
vi.mock("./db", async () => {
  return {
    createInquiry: vi.fn(async () => 123),
    listInquiries: vi.fn(async () => []),
    setInquiryHandled: vi.fn(async () => undefined),
    listProducts: vi.fn(async () => []),
    listApplications: vi.fn(async () => []),
    createProduct: vi.fn(async () => 1),
    updateProduct: vi.fn(async () => undefined),
    deleteProduct: vi.fn(async () => undefined),
    createApplication: vi.fn(async () => 1),
    updateApplication: vi.fn(async () => undefined),
    deleteApplication: vi.fn(async () => undefined),
  };
});

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
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

describe("inquiries.submit", () => {
  it("accepts a valid public inquiry and notifies the owner", async () => {
    const caller = appRouter.createCaller(publicCtx());
    const res = await caller.inquiries.submit({
      name: "Test User",
      company: "Acme Shipping",
      email: "test@example.com",
      phone: "+30 210 0000000",
      message: "We need pump restoration on a vessel.",
      sector: "maritime",
    });
    expect(res.success).toBe(true);

    const { notifyOwner } = await import("./_core/notification");
    expect(notifyOwner).toHaveBeenCalledOnce();
  });

  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.inquiries.submit({
        name: "Bad",
        email: "not-an-email",
        message: "hi",
        sector: "general",
      }),
    ).rejects.toThrow();
  });
});

describe("admin access control", () => {
  it("blocks anonymous users from listing all products", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(caller.products.listAll()).rejects.toThrow();
  });

  it("blocks anonymous users from creating products", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.products.create({
        category: "metal-repair",
        code: "X",
        nameEn: "X",
        nameEl: "X",
      }),
    ).rejects.toThrow();
  });

  it("allows admins to list all products and inquiries", async () => {
    const caller = appRouter.createCaller(adminCtx());
    await expect(caller.products.listAll()).resolves.toEqual([]);
    await expect(caller.inquiries.list()).resolves.toEqual([]);
  });
});
