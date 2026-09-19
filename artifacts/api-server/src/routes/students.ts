import { Router, type IRouter } from "express";
import { and, asc, desc, eq, ilike, or } from "drizzle-orm";
import { db, studentsTable, type Student } from "@workspace/db";
import {
  CreateStudentBody,
  GetStudentParams,
  ListStudentsQueryParams,
  UpdateStudentBody,
  UpdateStudentParams,
} from "@workspace/api-zod";
import { requireAdmin, serializeStudent } from "./portfolio-utils";

const router: IRouter = Router();

function normalizePlacement(placement: typeof CreateStudentBody._output["placement"] | typeof UpdateStudentBody._output["placement"]) {
  if (placement === undefined || placement === null) return placement;
  return { ...placement, placedAt: placement.placedAt.toISOString().slice(0, 10) };
}

// Public API for Data Siswa Showcase
router.get("/public/students", async (request, response) => {
  try {
    const { level, status, cohort, search, program } = request.query as Record<string, string>;
    const conditions = [];
    if (level && level !== "all") conditions.push(eq(studentsTable.level, level));
    if (status && status !== "all") conditions.push(eq(studentsTable.status, status));
    if (cohort && cohort !== "all") conditions.push(eq(studentsTable.cohort, cohort));
    if (search && search.trim()) {
      conditions.push(or(ilike(studentsTable.name, `%${search.trim()}%`), ilike(studentsTable.bio, `%${search.trim()}%`)));
    }
    const rows: Student[] = await db.select().from(studentsTable).where(conditions.length ? and(...conditions) : undefined).orderBy(desc(studentsTable.updatedAt), asc(studentsTable.name));
    response.json(rows.map((row) => serializeStudent(row)));
  } catch (err: any) {
    console.error("[Students] Public students fetch error:", err);
    response.status(500).json({ error: "Gagal memuat data siswa." });
  }
});

router.get("/public/students/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) {
      response.status(400).json({ error: "ID siswa tidak valid." });
      return;
    }
    const [student] = await db.select().from(studentsTable).where(eq(studentsTable.id, id)).limit(1);
    if (!student) {
      response.status(404).json({ error: "Siswa tidak ditemukan." });
      return;
    }
    response.json(serializeStudent(student));
  } catch (err) {
    response.status(500).json({ error: "Gagal memuat profil siswa." });
  }
});

// Admin-Protected routes
router.use("/students", requireAdmin);

router.get("/students", async (request, response) => {
  const filters = ListStudentsQueryParams.parse(request.query);
  const conditions = [];
  if (filters.level) conditions.push(eq(studentsTable.level, filters.level));
  if (filters.status) conditions.push(eq(studentsTable.status, filters.status));
  if (filters.cohort) conditions.push(eq(studentsTable.cohort, filters.cohort));
  if (filters.search) {
    conditions.push(or(ilike(studentsTable.name, `%${filters.search}%`), ilike(studentsTable.email, `%${filters.search}%`)));
  }
  const rows: Student[] = await db.select().from(studentsTable).where(conditions.length ? and(...conditions) : undefined).orderBy(desc(studentsTable.updatedAt), asc(studentsTable.name));
  response.json(rows.map((row) => serializeStudent(row)));
});

router.post("/students", async (request, response) => {
  const parsed = CreateStudentBody.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: "Data siswa belum lengkap.", details: parsed.error.flatten() });
    return;
  }
  const values = {
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    phone: parsed.data.phone,
    photoUrl: parsed.data.photoUrl,
    level: parsed.data.level,
    status: parsed.data.status,
    cohort: parsed.data.cohort,
    joinedAt: parsed.data.joinedAt.toISOString().slice(0, 10),
    bio: parsed.data.bio,
    speakingVideoUrl: parsed.data.speakingVideoUrl,
    certificateName: parsed.data.certificateName,
    certificateUrl: parsed.data.certificateUrl,
    placement: normalizePlacement(parsed.data.placement),
    levelHistory: [{ level: parsed.data.level, completedAt: parsed.data.joinedAt.toISOString().slice(0, 10), score: null }],
  };
  const [created] = await db.insert(studentsTable).values(values).returning();
  response.status(201).json(serializeStudent(created));
});

router.get("/students/:id", async (request, response) => {
  const parsed = GetStudentParams.safeParse(request.params);
  if (!parsed.success) {
    response.status(400).json({ error: "ID siswa tidak valid." });
    return;
  }
  const [student] = await db.select().from(studentsTable).where(eq(studentsTable.id, parsed.data.id)).limit(1);
  if (!student) {
    response.status(404).json({ error: "Siswa tidak ditemukan." });
    return;
  }
  response.json(serializeStudent(student));
});

router.patch("/students/:id", async (request, response) => {
  const params = UpdateStudentParams.safeParse(request.params);
  const parsed = UpdateStudentBody.safeParse(request.body);
  if (!params.success || !parsed.success) {
    response.status(400).json({ error: "Perubahan data belum valid." });
    return;
  }
  const [existing] = await db.select().from(studentsTable).where(eq(studentsTable.id, params.data.id)).limit(1);
  if (!existing) {
    response.status(404).json({ error: "Siswa tidak ditemukan." });
    return;
  }
  const update: Partial<typeof studentsTable.$inferInsert> & { updatedAt: Date } = {
    updatedAt: new Date(),
    ...(parsed.data.name !== undefined && { name: parsed.data.name }),
    ...(parsed.data.email !== undefined && { email: parsed.data.email.toLowerCase() }),
    ...(parsed.data.phone !== undefined && { phone: parsed.data.phone }),
    ...(parsed.data.photoUrl !== undefined && { photoUrl: parsed.data.photoUrl }),
    ...(parsed.data.level !== undefined && { level: parsed.data.level }),
    ...(parsed.data.status !== undefined && { status: parsed.data.status }),
    ...(parsed.data.cohort !== undefined && { cohort: parsed.data.cohort }),
    ...(parsed.data.joinedAt !== undefined && { joinedAt: parsed.data.joinedAt.toISOString().slice(0, 10) }),
    ...(parsed.data.bio !== undefined && { bio: parsed.data.bio }),
    ...(parsed.data.speakingVideoUrl !== undefined && { speakingVideoUrl: parsed.data.speakingVideoUrl }),
    ...(parsed.data.certificateName !== undefined && { certificateName: parsed.data.certificateName }),
    ...(parsed.data.certificateUrl !== undefined && { certificateUrl: parsed.data.certificateUrl }),
    ...(parsed.data.placement !== undefined && { placement: normalizePlacement(parsed.data.placement) }),
  };
  if (parsed.data.level && parsed.data.level !== existing.level) {
    update.levelHistory = [...(existing.levelHistory ?? []), { level: parsed.data.level, completedAt: new Date().toISOString().slice(0, 10), score: null }];
  }
  const [updated] = await db.update(studentsTable).set(update).where(eq(studentsTable.id, params.data.id)).returning();
  response.json(serializeStudent(updated));
});

router.delete("/students/:id", async (request, response) => {
  const parsed = GetStudentParams.safeParse(request.params);
  if (!parsed.success) {
    response.status(400).json({ error: "ID siswa tidak valid." });
    return;
  }
  await db.delete(studentsTable).where(eq(studentsTable.id, parsed.data.id));
  response.status(204).send();
});

export default router;