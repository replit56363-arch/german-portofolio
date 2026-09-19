import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { and, eq, gt } from "drizzle-orm";
import { db, adminsTable, sessionsTable, getEnvAdminCredentials, memoryStore } from "@workspace/db";

export const SESSION_COOKIE = "sprachraum_session";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(key, "hex");
  return expected.length === derived.length && timingSafeEqual(expected, derived);
}

export function createSessionId() {
  return randomBytes(32).toString("hex");
}

export async function currentAdmin(request: Request) {
  let sessionId = request.cookies?.[SESSION_COOKIE] as string | undefined;

  if (!sessionId) {
    const authHeader = request.headers.authorization;
    if (authHeader && typeof authHeader === "string" && authHeader.toLowerCase().startsWith("bearer ")) {
      sessionId = authHeader.slice(7).trim();
    }
  }

  if (!sessionId) {
    sessionId = (request.headers["x-session-id"] || request.headers["x-auth-token"]) as string | undefined;
  }

  if (typeof sessionId === "string") {
    sessionId = sessionId.trim().replace(/^["']|["']$/g, "");
  }

  if (!sessionId || sessionId === "null" || sessionId === "undefined" || sessionId === "") {
    return null;
  }

  // 1. Try PostgreSQL / DB query
  try {
    const [result] = await db
      .select({ admin: adminsTable, session: sessionsTable })
      .from(sessionsTable)
      .innerJoin(adminsTable, eq(sessionsTable.adminId, adminsTable.id))
      .where(and(eq(sessionsTable.id, sessionId), gt(sessionsTable.expiresAt, new Date())))
      .limit(1);

    if (result?.admin) {
      return result.admin;
    }
  } catch (dbErr) {
    console.warn("[AUTH] Error querying database for session:", dbErr);
  }

  // 2. Fallback to memoryStore
  try {
    const now = Date.now();
    const memSession = (memoryStore as any)?.sessions?.find(
      (s: any) => s.id === sessionId && new Date(s.expiresAt).getTime() > now
    );
    if (memSession) {
      const memAdmin = (memoryStore as any)?.admins?.find((a: any) => a.id === memSession.adminId);
      if (memAdmin) {
        return memAdmin;
      }
    }
  } catch (memErr) {
    console.warn("[AUTH] Error checking in-memory session:", memErr);
  }

  return null;
}

export async function requireAdmin(request: Request, response: Response, next: NextFunction) {
  try {
    const admin = await currentAdmin(request);
    if (!admin) {
      response.status(401).json({ error: "Authentication required" });
      return;
    }
    response.locals.admin = admin;
    next();
  } catch (error) {
    if ((request as any).log?.error) {
      (request as any).log.error({ error }, "Unable to resolve admin session");
    } else {
      console.error("Unable to resolve admin session", error);
    }
    response.status(500).json({ error: "Unable to check authentication" });
  }
}

export function publicAdmin(admin: { id: number; email: string; name: string }) {
  return { id: admin.id, email: admin.email, name: admin.name };
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function serializeStudent(student: Record<string, unknown>) {
  return {
    ...student,
    initials: initials(String(student.name ?? "")),
    levelHistory: student.levelHistory ?? [],
    placement: student.placement ?? null,
  };
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}