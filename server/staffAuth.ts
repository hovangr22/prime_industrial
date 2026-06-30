import { randomBytes, scrypt as scryptCb, timingSafeEqual, createHash } from "node:crypto";
import { promisify } from "node:util";
import type { Request, Response } from "express";
import {
  createStaffSession,
  deleteStaffSessionByTokenHash,
  getStaffAdminById,
  getStaffSessionByTokenHash,
} from "./db";
import type { StaffAdmin } from "../drizzle/schema";

const scrypt = promisify(scryptCb);

export const STAFF_COOKIE = "pi_staff_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
const KEYLEN = 64;

/* ------------------------------ Passwords ------------------------------ */

/** Create a fresh salt + scrypt hash (both hex) for a plaintext password. */
export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, KEYLEN)) as Buffer;
  return { hash: derived.toString("hex"), salt };
}

/** Constant-time verify a plaintext password against a stored hash + salt. */
export async function verifyPassword(
  password: string,
  hash: string | null,
  salt: string | null,
): Promise<boolean> {
  if (!hash || !salt) return false;
  const derived = (await scrypt(password, salt, KEYLEN)) as Buffer;
  const stored = Buffer.from(hash, "hex");
  if (stored.length !== derived.length) return false;
  return timingSafeEqual(stored, derived);
}

/** Generate a short, human-friendly temporary password for new admins. */
export function generateTempPassword(): string {
  // 9 chars, avoids ambiguous characters.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(9);
  let out = "";
  for (let i = 0; i < bytes.length; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

/* ------------------------------ Sessions ------------------------------ */

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Create a session for a staff admin and set the httpOnly cookie. */
export async function startStaffSession(res: Response, req: Request, staffId: number): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await createStaffSession({ tokenHash, staffId, expiresAt });

  const isHttps = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https";
  res.cookie(STAFF_COOKIE, token, {
    httpOnly: true,
    secure: isHttps,
    sameSite: isHttps ? "none" : "lax",
    path: "/",
    maxAge: SESSION_TTL_MS,
  });
}

/** Clear the current staff session (DB + cookie). */
export async function endStaffSession(req: Request, res: Response): Promise<void> {
  const token = readStaffCookie(req);
  if (token) await deleteStaffSessionByTokenHash(hashToken(token));
  const isHttps = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https";
  res.clearCookie(STAFF_COOKIE, {
    httpOnly: true,
    secure: isHttps,
    sameSite: isHttps ? "none" : "lax",
    path: "/",
  });
}

function readStaffCookie(req: Request): string | null {
  const raw = req.headers.cookie;
  if (!raw) return null;
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === STAFF_COOKIE) return decodeURIComponent(v.join("="));
  }
  return null;
}

/**
 * Resolve the currently authenticated staff admin from the request cookie,
 * or null if there is no valid, unexpired session for an active admin.
 */
export async function resolveStaffFromRequest(req: Request): Promise<StaffAdmin | null> {
  const token = readStaffCookie(req);
  if (!token) return null;
  const session = await getStaffSessionByTokenHash(hashToken(token));
  if (!session) return null;
  if (new Date(session.expiresAt).getTime() < Date.now()) {
    await deleteStaffSessionByTokenHash(hashToken(token));
    return null;
  }
  const staff = await getStaffAdminById(session.staffId);
  if (!staff || !staff.active) return null;
  return staff;
}
