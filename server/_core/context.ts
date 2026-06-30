import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { StaffAdmin, User } from "../../drizzle/schema";
import { resolveStaffFromRequest } from "../staffAuth";
import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  /** Staff admin authenticated via email/password session (separate from Manus OAuth). */
  staff: StaffAdmin | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  let staff: StaffAdmin | null = null;
  try {
    staff = await resolveStaffFromRequest(opts.req);
  } catch (error) {
    staff = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
    staff,
  };
}
