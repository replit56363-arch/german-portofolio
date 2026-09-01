import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, siteContentTable } from "@workspace/db";
import { UpdateSiteContentBody } from "@workspace/api-zod";
import { requireAdmin } from "./portfolio-utils";

const router: IRouter = Router();
router.use(requireAdmin);

const defaultContent = {
  eyebrow: "Lernpfad · Partner portfolio",
  title: "Bukti kesiapan, lebih dekat.",
  description: "Ruang kerja untuk mengelola portofolio bahasa siswa dan menghubungkan talenta siap kerja dengan partner Jerman.",
  primaryCta: "Lihat katalog siswa",
  secondaryCta: "Kelola konten halaman",
  introLabel: "Satu profil. Lebih banyak peluang.",
  introText: "Kami mendampingi siswa dari fondasi A1 hingga kesiapan profesional B2, dengan bukti kemampuan yang mudah dipahami partner.",
  statOneValue: "A1–B2",
  statOneLabel: "Level terukur",
  statTwoValue: "100%",
  statTwoLabel: "Profil terdokumentasi",
  statThreeValue: "1:1",
  statThreeLabel: "Pendampingan karier",
  statFourValue: "DE",
  statFourLabel: "Fokus penempatan",
  trustTitle: "Portofolio yang siap dibagikan.",
  trustText: "Gunakan data ini sebagai dasar percakapan yang lebih cepat, terarah, dan percaya diri bersama partner penempatan.",
};

router.get("/site-content", async (_request, response) => {
  let [content] = await db.select().from(siteContentTable).orderBy(desc(siteContentTable.id)).limit(1);
  if (!content) {
    [content] = await db.insert(siteContentTable).values(defaultContent).returning();
  }
  response.json(content);
});

router.patch("/site-content", async (request, response) => {
  const parsed = UpdateSiteContentBody.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: "Konten belum lengkap.", details: parsed.error.flatten() });
    return;
  }
  let [content] = await db.select().from(siteContentTable).orderBy(desc(siteContentTable.id)).limit(1);
  if (!content) {
    [content] = await db.insert(siteContentTable).values(defaultContent).returning();
  }
  const [updated] = await db.update(siteContentTable).set({ ...parsed.data, updatedAt: new Date() }).where(eq(siteContentTable.id, content.id)).returning();
  response.json(updated);
});

export default router;