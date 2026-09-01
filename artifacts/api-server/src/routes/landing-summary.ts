import { Router, type IRouter } from "express";
import { db, studentsTable } from "@workspace/db";

const router: IRouter = Router();
const levels = ["A1", "A2", "B1", "B2"] as const;
type LandingSummaryRow = {
  level: string;
  status: string;
  placement: { program: string } | null;
};

router.get("/landing-summary", async (_request, response) => {
  const rows: LandingSummaryRow[] = await db
    .select({
      level: studentsTable.level,
      status: studentsTable.status,
      placement: studentsTable.placement,
    })
    .from(studentsTable);

  const placedStudents = rows.filter((row) => row.status === "placed").length;
  const readyToPlace = rows.filter((row) => row.status === "ready").length;

  response.json({
    totalStudents: rows.length,
    readyToPlace,
    placedStudents,
    inProgress: rows.filter((row) => row.status === "in_progress").length,
    placementRate: rows.length ? Math.round((placedStudents / rows.length) * 100) : 0,
    byLevel: levels.map((level) => ({
      level,
      count: rows.filter((row) => row.level === level).length,
    })),
    programs: Array.from(
      rows.reduce((counts, row) => {
        const program = row.placement?.program;
        if (program) counts.set(program, (counts.get(program) ?? 0) + 1);
        return counts;
      }, new Map<string, number>()),
    )
      .sort(([, first], [, second]) => second - first)
      .slice(0, 3)
      .map(([program, count]) => ({ program, count })),
  });
});

export default router;