import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, siteContentTable } from "@workspace/db";
import { UpdateSiteContentBody } from "@workspace/api-zod";
import { requireAdmin } from "./portfolio-utils";

const router: IRouter = Router();

const defaultContent = {
  eyebrow: "Lernpfad · Talent bridging Indonesia — Jerman",
  title: "Orang yang tepat, jalan yang jelas.",
  description: "Lernpfad membantu perusahaan di Jerman menemukan peserta Ausbildung dan tenaga layanan yang siap tumbuh — lalu mendampingi mereka dari Indonesia sampai merasa di rumah.",
  primaryCta: "Cari talenta untuk tim Anda",
  secondaryCta: "Kenali pendekatan kami",
  introLabel: "Lebih dari penempatan",
  introText: "Kami merawat perjalanan, bukan hanya keberangkatan. Setiap tahap dipahami, dibicarakan, dan dipersiapkan bersama.",
  statOneValue: "A1–B2",
  statOneLabel: "Pelatihan terarah",
  statTwoValue: "1:1",
  statTwoLabel: "Pendampingan dekat",
  statThreeValue: "ID × DE",
  statThreeLabel: "Satu arah lintas negara",
  statFourValue: "6",
  statFourLabel: "Profil dalam portfolio",
  trustTitle: "Membuka jalan yang lebih manusiawi.",
  trustText: "Gunakan portfolio dan proses yang transparan untuk memulai percakapan kerja yang lebih percaya diri bersama kandidat Indonesia.",
};

router.get("/site-content", async (_request, response) => {
  let [content] = await db.select().from(siteContentTable).orderBy(desc(siteContentTable.id)).limit(1);
  if (!content) {
    [content] = await db.insert(siteContentTable).values(defaultContent).returning();
  }
  response.json(content);
});

router.patch("/site-content", requireAdmin, async (request, response) => {
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