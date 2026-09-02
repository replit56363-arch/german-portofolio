import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const cmsSectionsTable = pgTable("cms_sections", {
  id: serial("id").primaryKey(),
  sectionKey: text("section_key").notNull().unique(),
  content: jsonb("content").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type CmsSection = typeof cmsSectionsTable.$inferSelect;
export type InsertCmsSection = typeof cmsSectionsTable.$inferInsert;
