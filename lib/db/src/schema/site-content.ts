import { timestamp, pgTable, serial, text } from "drizzle-orm/pg-core";

export const siteContentTable = pgTable("site_content", {
  id: serial("id").primaryKey(),
  eyebrow: text("eyebrow").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  primaryCta: text("primary_cta").notNull(),
  secondaryCta: text("secondary_cta").notNull(),
  introLabel: text("intro_label").notNull(),
  introText: text("intro_text").notNull(),
  statOneValue: text("stat_one_value").notNull(),
  statOneLabel: text("stat_one_label").notNull(),
  statTwoValue: text("stat_two_value").notNull(),
  statTwoLabel: text("stat_two_label").notNull(),
  statThreeValue: text("stat_three_value").notNull(),
  statThreeLabel: text("stat_three_label").notNull(),
  statFourValue: text("stat_four_value").notNull(),
  statFourLabel: text("stat_four_label").notNull(),
  trustTitle: text("trust_title").notNull(),
  trustText: text("trust_text").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SiteContent = typeof siteContentTable.$inferSelect;