import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, studentsTable } from "@workspace/db";
import { requireAdmin, serializeStudent } from "./portfolio-utils";

const router: IRouter = Router();
router.get("/dashboard/summary", requireAdmin, async (_request, response) => {
  const rows = await db.select().from(studentsTable).orderBy(desc(studentsTable.updatedAt));
  const levels = ["A1", "A2", "B1", "B2"];
  const byLevel = levels.map((level) => ({ level, count: rows.filter((row) => row.level === level).length }));
  const cohorts = Array.from(new Set(rows.map((row) => row.cohort))).sort().slice(-5);
  const byPeriod = cohorts.map((period) => ({
    period,
    total: rows.filter((row) => row.cohort === period).length,
    placed: rows.filter((row) => row.cohort === period && row.status === "placed").length,
  }));
  const placedStudents = rows.filter((row) => row.status === "placed").length;
  response.json({
    totalStudents: rows.length,
    readyToPlace: rows.filter((row) => row.status === "ready").length,
    placedStudents,
    placementRate: rows.length ? Math.round((placedStudents / rows.length) * 1000) / 10 : 0,
    byLevel,
    byPeriod,
    recentStudents: rows.slice(0, 5).map((row) => serializeStudent(row)),
  });
});

export default router;