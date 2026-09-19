import { Router, type IRouter } from "express";
import { requireAdmin } from "./portfolio-utils";
import { db, siteContentTable, cmsSectionsTable, defaultCmsData, memoryStore } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

const router: IRouter = Router();

// Helper: Sync home data with siteContentTable
async function syncHomeToSiteContent(homeData: typeof defaultCmsData.home) {
  try {
    let [content] = await db.select().from(siteContentTable).orderBy(desc(siteContentTable.id)).limit(1);
    const updatePayload = {
      eyebrow: homeData.eyebrow,
      title: homeData.title,
      description: homeData.description,
      primaryCta: homeData.primaryCta,
      secondaryCta: homeData.secondaryCta,
      introLabel: homeData.introLabel,
      introText: homeData.introText,
      statOneValue: homeData.stats[0]?.value || "A1–B2",
      statOneLabel: homeData.stats[0]?.label || "Pelatihan terarah",
      statTwoValue: homeData.stats[1]?.value || "1:1",
      statTwoLabel: homeData.stats[1]?.label || "Pendampingan dekat",
      statThreeValue: homeData.stats[2]?.value || "ID × DE",
      statThreeLabel: homeData.stats[2]?.label || "Satu arah lintas negara",
      statFourValue: homeData.stats[3]?.value || "100%",
      statFourLabel: homeData.stats[3]?.label || "Transparansi data",
      trustTitle: homeData.trustTitle,
      trustText: homeData.trustText,
      updatedAt: new Date(),
    };
    if (content) {
      await db.update(siteContentTable).set(updatePayload).where(eq(siteContentTable.id, content.id));
    } else {
      await db.insert(siteContentTable).values(updatePayload);
    }
  } catch (err) {
    console.warn("[CMS] SiteContent sync warning (non-fatal):", err);
  }
}

// Get all sections from PostgreSQL (with fallback)
async function getAllCmsFromDb(): Promise<Record<string, any>> {
  try {
    const rows = await db.select().from(cmsSectionsTable);
    if (rows && rows.length > 0) {
      const result: Record<string, any> = { ...defaultCmsData };
      for (const row of rows) {
        result[row.sectionKey] = row.content;
      }
      return result;
    }
  } catch (e) {
    console.warn("[CMS] Error reading cms from database, fallback to memory", e);
  }
  const memData = memoryStore.cmsSections.reduce((acc: any, curr: any) => {
    acc[curr.sectionKey] = curr.content;
    return acc;
  }, {});
  return { ...defaultCmsData, ...memData };
}

// Get single section from PostgreSQL (with fallback)
async function getSectionFromDb(sectionKey: string): Promise<any> {
  try {
    const [row] = await db
      .select()
      .from(cmsSectionsTable)
      .where(eq(cmsSectionsTable.sectionKey, sectionKey))
      .limit(1);
    if (row && row.content) {
      return row.content;
    }
  } catch (e) {
    console.warn(`[CMS] Error reading section ${sectionKey} from database`, e);
  }
  const mem = memoryStore.cmsSections.find((s) => s.sectionKey === sectionKey);
  if (mem) return mem.content;
  return (defaultCmsData as any)[sectionKey] || null;
}

// Save single section to PostgreSQL
async function saveSectionToDb(sectionKey: string, content: any): Promise<void> {
  try {
    const [existing] = await db
      .select({ id: cmsSectionsTable.id })
      .from(cmsSectionsTable)
      .where(eq(cmsSectionsTable.sectionKey, sectionKey))
      .limit(1);

    if (existing) {
      await db
        .update(cmsSectionsTable)
        .set({ content, updatedAt: new Date() })
        .where(eq(cmsSectionsTable.sectionKey, sectionKey));
    } else {
      await db.insert(cmsSectionsTable).values({
        sectionKey,
        content,
        updatedAt: new Date(),
      });
    }
  } catch (e) {
    console.warn(`[CMS] Error saving section ${sectionKey} to db`, e);
  }

  // Also update memory fallback
  const memIdx = memoryStore.cmsSections.findIndex((s) => s.sectionKey === sectionKey);
  if (memIdx >= 0) {
    memoryStore.cmsSections[memIdx].content = content;
    memoryStore.cmsSections[memIdx].updatedAt = new Date();
  } else {
    memoryStore.cmsSections.push({
      id: Date.now(),
      sectionKey,
      content,
      updatedAt: new Date(),
    });
  }
}

// GET all CMS content
router.get("/cms", async (_req, res) => {
  const allData = await getAllCmsFromDb();
  res.json(allData);
});

// GET specific section content
router.get("/cms/:section", async (req, res) => {
  const section = req.params.section;
  const content = await getSectionFromDb(section);
  if (!content) {
    res.status(404).json({ error: `Halaman/bagian '${section}' tidak ditemukan di database.` });
    return;
  }
  res.json(content);
});

// UPDATE entire section
router.put("/cms/:section", requireAdmin, async (req, res) => {
  const section = req.params.section;
  const current = await getSectionFromDb(section);
  if (!current) {
    res.status(404).json({ error: `Halaman/bagian '${section}' tidak ditemukan di database.` });
    return;
  }

  const payload = (req.body && typeof req.body === "object" && "data" in req.body && Object.keys(req.body).length === 1 && typeof req.body.data === "object")
    ? req.body.data
    : req.body;

  const updatedContent = {
    ...current,
    ...payload,
  };

  await saveSectionToDb(section, updatedContent);

  if (section === "home") {
    await syncHomeToSiteContent(updatedContent);
  }

  res.json({
    success: true,
    message: `Bagian '${section}' berhasil disimpan ke database PostgreSQL.`,
    data: updatedContent,
  });
});

// CREATE item in a section array (e.g. news items, media items, services stages, navbar links, etc.)
router.post("/cms/:section/items", requireAdmin, async (req, res) => {
  const section = req.params.section;
  const target = await getSectionFromDb(section);
  if (!target) {
    res.status(404).json({ error: `Halaman/bagian '${section}' tidak ditemukan di database.` });
    return;
  }

  const arrayField = (req.query.field as string) ||
    (Array.isArray(target.items) ? "items" :
     Array.isArray(target.links) ? "links" :
     Array.isArray(target.stages) ? "stages" :
     Array.isArray(target.stories) ? "stories" :
     Array.isArray(target.steps) ? "steps" :
     Array.isArray(target.stats) ? "stats" :
     Array.isArray(target.programCards) ? "programCards" :
     Array.isArray(target.pillars) ? "pillars" : "items");

  if (!Array.isArray(target[arrayField])) {
    target[arrayField] = [];
  }

  const newId = Date.now();
  const newItem = {
    id: req.body.id || newId,
    ...req.body,
  };

  target[arrayField].unshift(newItem);
  await saveSectionToDb(section, target);

  if (section === "home") {
    await syncHomeToSiteContent(target);
  }

  res.status(201).json({
    success: true,
    message: "Item baru berhasil ditambahkan dan disimpan ke database PostgreSQL.",
    item: newItem,
    list: target[arrayField],
  });
});

// UPDATE single item in a section array
router.put("/cms/:section/items/:itemId", requireAdmin, async (req, res) => {
  const section = req.params.section;
  const itemId = req.params.itemId;
  const target = await getSectionFromDb(section);

  if (!target) {
    res.status(404).json({ error: `Halaman/bagian '${section}' tidak ditemukan di database.` });
    return;
  }

  const arrayField = (req.query.field as string) ||
    (Array.isArray(target.items) ? "items" :
     Array.isArray(target.links) ? "links" :
     Array.isArray(target.stages) ? "stages" :
     Array.isArray(target.stories) ? "stories" :
     Array.isArray(target.steps) ? "steps" :
     Array.isArray(target.stats) ? "stats" :
     Array.isArray(target.programCards) ? "programCards" :
     Array.isArray(target.pillars) ? "pillars" : "items");

  if (!Array.isArray(target[arrayField])) {
    res.status(404).json({ error: `Daftar item tidak ditemukan pada bagian '${section}'.` });
    return;
  }

  const index = target[arrayField].findIndex((item: any) => String(item.id) === String(itemId));
  if (index === -1) {
    res.status(404).json({ error: `Item dengan ID '${itemId}' tidak ditemukan.` });
    return;
  }

  target[arrayField][index] = {
    ...target[arrayField][index],
    ...req.body,
    id: target[arrayField][index].id, // preserve ID
  };

  await saveSectionToDb(section, target);

  if (section === "home") {
    await syncHomeToSiteContent(target);
  }

  res.json({
    success: true,
    message: "Item berhasil diperbarui di database PostgreSQL.",
    item: target[arrayField][index],
  });
});

// DELETE single item in a section array
router.delete("/cms/:section/items/:itemId", requireAdmin, async (req, res) => {
  const section = req.params.section;
  const itemId = req.params.itemId;
  const target = await getSectionFromDb(section);

  if (!target) {
    res.status(404).json({ error: `Halaman/bagian '${section}' tidak ditemukan di database.` });
    return;
  }

  const arrayField = (req.query.field as string) ||
    (Array.isArray(target.items) ? "items" :
     Array.isArray(target.links) ? "links" :
     Array.isArray(target.stages) ? "stages" :
     Array.isArray(target.stories) ? "stories" :
     Array.isArray(target.steps) ? "steps" :
     Array.isArray(target.stats) ? "stats" :
     Array.isArray(target.programCards) ? "programCards" :
     Array.isArray(target.pillars) ? "pillars" : "items");

  if (!Array.isArray(target[arrayField])) {
    res.status(404).json({ error: `Daftar item tidak ditemukan pada bagian '${section}'.` });
    return;
  }

  const initialLength = target[arrayField].length;
  target[arrayField] = target[arrayField].filter((item: any) => String(item.id) !== String(itemId));

  if (target[arrayField].length === initialLength) {
    res.status(404).json({ error: `Item dengan ID '${itemId}' tidak ditemukan.` });
    return;
  }

  await saveSectionToDb(section, target);

  if (section === "home") {
    await syncHomeToSiteContent(target);
  }

  res.json({
    success: true,
    message: "Item berhasil dihapus dari database PostgreSQL.",
    deletedId: itemId,
  });
});

// RESET section or all CMS to defaults in PostgreSQL
router.post("/cms/reset", requireAdmin, async (req, res) => {
  const section = req.query.section as string | undefined;
  if (section && (defaultCmsData as any)[section]) {
    const defaultSec = JSON.parse(JSON.stringify((defaultCmsData as any)[section]));
    await saveSectionToDb(section, defaultSec);
    if (section === "home") await syncHomeToSiteContent(defaultSec);
    res.json({
      success: true,
      message: `Bagian '${section}' telah di-reset ke data default di PostgreSQL.`,
      data: defaultSec,
    });
    return;
  }

  for (const [secKey, secVal] of Object.entries(defaultCmsData)) {
    await saveSectionToDb(secKey, JSON.parse(JSON.stringify(secVal)));
  }
  await syncHomeToSiteContent(defaultCmsData.home);

  res.json({
    success: true,
    message: "Semua konten halaman publik di database PostgreSQL berhasil di-reset ke standar awal.",
    data: defaultCmsData,
  });
});

export default router;
