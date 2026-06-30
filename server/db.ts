import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  applications,
  inquiries,
  InsertApplication,
  InsertInquiry,
  InsertProduct,
  InsertSiteContent,
  InsertStaffAdmin,
  InsertStaffSession,
  products,
  siteContent,
  staffAdmins,
  staffSessions,
  users,
  type InsertUser,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/* ----------------------------- Products ----------------------------- */

export async function listProducts(onlyPublished = true) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(products).orderBy(asc(products.sortOrder), desc(products.createdAt));
  return onlyPublished ? rows.filter((r) => r.published) : rows;
}

export async function getProduct(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return rows[0];
}

export async function createProduct(data: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const res = await db.insert(products).values(data).$returningId();
  return res[0]?.id;
}

export async function updateProduct(id: number, data: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(products).where(eq(products.id, id));
}

/* --------------------------- Applications --------------------------- */

export async function listApplications(onlyPublished = true) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select()
    .from(applications)
    .orderBy(asc(applications.sortOrder), desc(applications.createdAt));
  return onlyPublished ? rows.filter((r) => r.published) : rows;
}

export async function getApplication(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  return rows[0];
}

export async function createApplication(data: InsertApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const res = await db.insert(applications).values(data).$returningId();
  return res[0]?.id;
}

export async function updateApplication(id: number, data: Partial<InsertApplication>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(applications).set(data).where(eq(applications.id, id));
}

export async function deleteApplication(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(applications).where(eq(applications.id, id));
}

/* ----------------------------- Inquiries ---------------------------- */

export async function createInquiry(data: InsertInquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const res = await db.insert(inquiries).values(data).$returningId();
  return res[0]?.id;
}

export async function listInquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function setInquiryHandled(id: number, handled: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(inquiries).set({ handled }).where(eq(inquiries.id, id));
}

/* --------------------------- Site Content --------------------------- */

export async function listSiteContent() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteContent).orderBy(asc(siteContent.sortOrder), asc(siteContent.id));
}

export async function upsertSiteContent(
  row: Pick<InsertSiteContent, "contentKey" | "valueEn" | "valueEl">,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(siteContent)
    .set({ valueEn: row.valueEn ?? null, valueEl: row.valueEl ?? null })
    .where(eq(siteContent.contentKey, row.contentKey));
}

/**
 * Insert a content field definition if it does not already exist.
 * Used to seed the editable fields without overwriting owner edits.
 */
export async function seedSiteContent(row: InsertSiteContent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .insert(siteContent)
    .values(row)
    .onDuplicateKeyUpdate({
      set: {
        // Keep definition metadata in sync, but never overwrite owner-edited values.
        groupName: row.groupName,
        label: row.label,
        multiline: row.multiline ?? false,
        sortOrder: row.sortOrder ?? 0,
      },
    });
}

/* --------------------------- Staff Admins --------------------------- */

export async function listStaffAdmins() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(staffAdmins).orderBy(asc(staffAdmins.createdAt));
}

export async function getStaffAdminById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(staffAdmins).where(eq(staffAdmins.id, id)).limit(1);
  return rows[0];
}

export async function getStaffAdminByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(staffAdmins)
    .where(eq(staffAdmins.email, email.toLowerCase().trim()))
    .limit(1);
  return rows[0];
}

export async function createStaffAdmin(row: InsertStaffAdmin): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const res = await db.insert(staffAdmins).values({ ...row, email: row.email.toLowerCase().trim() });
  // mysql2 returns insertId on the first element of the result tuple.
  const insertId = (res as unknown as Array<{ insertId: number }>)[0]?.insertId;
  return Number(insertId);
}

export async function updateStaffAdmin(
  id: number,
  set: Partial<Pick<InsertStaffAdmin, "name" | "active" | "passwordHash" | "passwordSalt" | "mustChangePassword" | "lastSignedIn">>,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(staffAdmins).set(set).where(eq(staffAdmins.id, id));
}

export async function deleteStaffAdmin(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Remove the admin and any active sessions they hold.
  await db.delete(staffSessions).where(eq(staffSessions.staffId, id));
  await db.delete(staffAdmins).where(eq(staffAdmins.id, id));
}

/* --------------------------- Staff Sessions --------------------------- */

export async function createStaffSession(row: InsertStaffSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(staffSessions).values(row);
}

export async function getStaffSessionByTokenHash(tokenHash: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(staffSessions)
    .where(eq(staffSessions.tokenHash, tokenHash))
    .limit(1);
  return rows[0];
}

export async function deleteStaffSessionByTokenHash(tokenHash: string) {
  const db = await getDb();
  if (!db) return;
  await db.delete(staffSessions).where(eq(staffSessions.tokenHash, tokenHash));
}

export async function deleteStaffSessionsForStaff(staffId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(staffSessions).where(eq(staffSessions.staffId, staffId));
}
