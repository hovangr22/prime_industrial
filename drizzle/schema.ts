import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Belzona products managed by the owner via the admin panel.
 * Bilingual fields store both English (en) and Greek (el) content.
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  /** Category key, e.g. "metal-repair", "coatings", "elastomers", "specialised". */
  category: varchar("category", { length: 64 }).notNull(),
  /** Belzona product code / display name, e.g. "Belzona 1111". */
  code: varchar("code", { length: 128 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameEl: varchar("nameEl", { length: 255 }).notNull(),
  descriptionEn: text("descriptionEn"),
  descriptionEl: text("descriptionEl"),
  /** Storage key / url for the product image. */
  imageUrl: text("imageUrl"),
  imageKey: varchar("imageKey", { length: 512 }),
  sortOrder: int("sortOrder").default(0).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Applications / Solutions showcased on the site, managed via the admin panel.
 */
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleEl: varchar("titleEl", { length: 255 }).notNull(),
  /** Short one-line summary shown on cards. */
  summaryEn: varchar("summaryEn", { length: 512 }),
  summaryEl: varchar("summaryEl", { length: 512 }),
  descriptionEn: text("descriptionEn"),
  descriptionEl: text("descriptionEl"),
  imageUrl: text("imageUrl"),
  imageKey: varchar("imageKey", { length: 512 }),
  sortOrder: int("sortOrder").default(0).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

/**
 * Contact / quote request submissions from the public contact form.
 */
export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  message: text("message").notNull(),
  /** "industry" | "maritime" | "general" — which sector / interest the inquiry targets. */
  sector: varchar("sector", { length: 32 }).default("general").notNull(),
  handled: boolean("handled").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

/**
 * Owner-editable site content. Each row is a single editable text field,
 * identified by a stable `key`, with English and Greek values.
 * Pages read these (with a code-side fallback) so the owner can edit copy
 * from the admin panel without code changes.
 */
export const siteContent = mysqlTable("site_content", {
  id: int("id").autoincrement().primaryKey(),
  /** Stable identifier, e.g. "services.support24.title". */
  contentKey: varchar("contentKey", { length: 191 }).notNull().unique(),
  /** Grouping for the admin UI, e.g. "Services", "About". */
  groupName: varchar("groupName", { length: 64 }).notNull(),
  /** Human-readable label shown in the admin editor. */
  label: varchar("label", { length: 191 }).notNull(),
  valueEn: text("valueEn"),
  valueEl: text("valueEl"),
  /** Whether the editor should render a multi-line textarea. */
  multiline: boolean("multiline").default(false).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = typeof siteContent.$inferInsert;
