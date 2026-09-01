import { Router, type IRouter } from "express";
import { and, eq } from "drizzle-orm";
import { db, adminsTable, sessionsTable } from "@workspace/db";
import { LoginBody } from "@workspace/api-zod";
import {
  SESSION_COOKIE,
  createSessionId,
  currentAdmin,
  publicAdmin,
  verifyPassword,
} from "./portfolio-utils";

const router: IRouter = Router();

router.post("/auth/login", async (request, response) => {
  const parsed = LoginBody.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: "Email dan password wajib diisi." });
    return;
  }
  const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.email, parsed.data.email.toLowerCase())).limit(1);
  if (!admin || !verifyPassword(parsed.data.password, admin.passwordHash)) {
    response.status(401).json({ error: "Email atau password tidak sesuai." });
    return;
  }
  const sessionId = createSessionId();
  await db.insert(sessionsTable).values({
    id: sessionId,
    adminId: admin.id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
  response.cookie(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  response.json({ admin: publicAdmin(admin) });
});

router.post("/auth/logout", async (request, response) => {
  const sessionId = request.cookies?.[SESSION_COOKIE] as string | undefined;
  if (sessionId) await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
  response.clearCookie(SESSION_COOKIE);
  response.status(204).send();
});

router.get("/auth/me", async (request, response) => {
  const admin = await currentAdmin(request);
  if (!admin) {
    response.status(401).json({ error: "Authentication required" });
    return;
  }
  response.json(publicAdmin(admin));
});

export default router;