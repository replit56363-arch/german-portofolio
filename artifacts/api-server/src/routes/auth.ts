import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, adminsTable, sessionsTable, getEnvAdminCredentials, hashPassword, memoryStore } from "@workspace/db";
import { LoginBody } from "@workspace/api-zod";
import {
  SESSION_COOKIE,
  createSessionId,
  currentAdmin,
  publicAdmin,
} from "./portfolio-utils";

const router: IRouter = Router();

router.post("/auth/login", async (request, response) => {
  const parsed = LoginBody.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: "Email dan kata sandi wajib diisi." });
    return;
  }

  const { email: expectedEmail, password: expectedPassword } = getEnvAdminCredentials();
  const inputEmail = parsed.data.email.trim().toLowerCase();
  const inputPassword = parsed.data.password;

  // STRICT RULE: Only the admin credentials configured in .env are allowed to log in
  if (inputEmail !== expectedEmail || inputPassword !== expectedPassword) {
    response.status(401).json({ error: "Email atau kata sandi tidak sesuai." });
    return;
  }

  let [admin] = await db.select().from(adminsTable).where(eq(adminsTable.email, expectedEmail)).limit(1);
  if (!admin) {
    const results = await db.insert(adminsTable).values({
      email: expectedEmail,
      name: "Admin Utama",
      passwordHash: hashPassword(expectedPassword),
      createdAt: new Date(),
    }).returning();
    admin = results[0] || { id: 1, email: expectedEmail, name: "Admin Utama" };
  }

  const sessionId = createSessionId();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  try {
    await db.insert(sessionsTable).values({
      id: sessionId,
      adminId: admin.id,
      expiresAt: expiresAt,
    });
  } catch (err) {
    console.warn("[AUTH] Error inserting session into DB:", err);
  }

  try {
    if (!(memoryStore as any).sessions) (memoryStore as any).sessions = [];
    if (!(memoryStore as any).admins) (memoryStore as any).admins = [];

    (memoryStore as any).sessions.unshift({
      id: sessionId,
      adminId: admin.id,
      expiresAt: expiresAt,
      createdAt: new Date(),
    });
    if (!(memoryStore as any).admins.some((a: any) => a.id === admin.id)) {
      (memoryStore as any).admins.push(admin);
    }
  } catch {}

  // Set cookie for browser sessions (including iframe support and standalone VPS reverse-proxy)
  try {
    const isHttps = Boolean(
      request.secure ||
      request.headers["x-forwarded-proto"] === "https" ||
      request.headers["referer"]?.startsWith("https://") ||
      request.headers["origin"]?.startsWith("https://")
    );
    response.cookie(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: isHttps ? "none" : "lax",
      secure: isHttps,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  } catch {}

  response.json({
    admin: publicAdmin(admin),
    token: sessionId,
    sessionId: sessionId,
  });
});

router.post("/auth/logout", async (request, response) => {
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

  if (sessionId) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
  }
  response.clearCookie(SESSION_COOKIE, { sameSite: "none", secure: true });
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