import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// In-memory staff admin store for the mocked DB layer.
let staffStore: Array<Record<string, unknown>> = [];
let nextId = 1;

vi.mock("./db", async () => {
  return {
    listStaffAdmins: vi.fn(async () => staffStore),
    getStaffAdminByEmail: vi.fn(async (email: string) =>
      staffStore.find((s) => s.email === email) ?? null,
    ),
    getStaffAdminById: vi.fn(async (id: number) => staffStore.find((s) => s.id === id) ?? null),
    createStaffAdmin: vi.fn(async (row: Record<string, unknown>) => {
      const id = nextId++;
      staffStore.push({
        id,
        active: true,
        mustChangePassword: true,
        createdAt: new Date(),
        ...row,
      });
      return id;
    }),
    updateStaffAdmin: vi.fn(async (id: number, patch: Record<string, unknown>) => {
      const s = staffStore.find((x) => x.id === id);
      if (s) Object.assign(s, patch);
    }),
    deleteStaffAdmin: vi.fn(async (id: number) => {
      staffStore = staffStore.filter((x) => x.id !== id);
    }),
    deleteStaffSessionsForStaff: vi.fn(async () => undefined),
  };
});

function ownerCtx(): TrpcContext {
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
    staff: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { cookie: () => {}, clearCookie: () => {} } as unknown as TrpcContext["res"],
  } as TrpcContext;
}

// A staff admin is NOT the owner, so they must be blocked from managing admins.
function staffCtx(): TrpcContext {
  return {
    user: null,
    staff: {
      id: 99,
      email: "staff@example.com",
      name: "Staff",
      active: true,
      mustChangePassword: false,
      passwordHash: "x",
      passwordSalt: "y",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { cookie: () => {}, clearCookie: () => {} } as unknown as TrpcContext["res"],
  } as unknown as TrpcContext;
}

function anonCtx(): TrpcContext {
  return {
    user: null,
    staff: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { cookie: () => {}, clearCookie: () => {} } as unknown as TrpcContext["res"],
  } as TrpcContext;
}

describe("staffAdmins owner-only management", () => {
  it("blocks anonymous users from listing administrators", async () => {
    const caller = appRouter.createCaller(anonCtx());
    await expect(caller.staffAdmins.list()).rejects.toThrow();
  });

  it("blocks a staff admin (non-owner) from managing administrators", async () => {
    const caller = appRouter.createCaller(staffCtx());
    await expect(caller.staffAdmins.list()).rejects.toThrow();
    await expect(
      caller.staffAdmins.create({ email: "new@example.com", name: "New" }),
    ).rejects.toThrow();
  });

  it("lets the owner create an administrator and returns a one-time temp password", async () => {
    staffStore = [];
    nextId = 1;
    const caller = appRouter.createCaller(ownerCtx());
    const res = await caller.staffAdmins.create({ email: "new@example.com", name: "New Admin" });
    expect(res.email).toBe("new@example.com");
    expect(typeof res.tempPassword).toBe("string");
    expect(res.tempPassword.length).toBeGreaterThanOrEqual(8);

    const list = await caller.staffAdmins.list();
    expect(list).toHaveLength(1);
    // Password material must never be exposed in the list response.
    expect(list[0]).not.toHaveProperty("passwordHash");
    expect(list[0]).not.toHaveProperty("passwordSalt");
  });
});
