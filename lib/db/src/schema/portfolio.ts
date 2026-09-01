import { createInsertSchema } from "drizzle-zod";
import { date, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const adminsTable = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sessionsTable = pgTable("admin_sessions", {
  id: text("id").primaryKey(),
  adminId: integer("admin_id").notNull().references(() => adminsTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const studentsTable = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  photoUrl: text("photo_url"),
  level: text("level").notNull(),
  status: text("status").notNull(),
  cohort: text("cohort").notNull(),
  joinedAt: date("joined_at", { mode: "string" }).notNull(),
  bio: text("bio"),
  speakingVideoUrl: text("speaking_video_url"),
  certificateName: text("certificate_name"),
  certificateUrl: text("certificate_url"),
  levelHistory: jsonb("level_history").$type<Array<{ level: string; completedAt: string; score?: number | null }>>().notNull().default([]),
  placement: jsonb("placement").$type<{ country: string; program: string; company?: string; placedAt: string } | null>(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertStudentSchema = createInsertSchema(studentsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Student = typeof studentsTable.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;