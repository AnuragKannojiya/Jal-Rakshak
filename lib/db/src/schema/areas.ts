import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const areaStatusTable = pgTable("area_status", {
  id: serial("id").primaryKey(),
  areaName: text("area_name").notNull().unique(),
  waterScore: integer("water_score").notNull().default(80),
  riskLevel: text("risk_level").notNull().default("safe"),
  qualityTag: text("quality_tag").notNull().default("Safe"),
  activeComplaints: integer("active_complaints").notNull().default(0),
  lastUpdated: timestamp("last_updated", { withTimezone: true }).notNull().defaultNow(),
  notes: text("notes"),
});

export const insertAreaStatusSchema = createInsertSchema(areaStatusTable).omit({ id: true, lastUpdated: true });
export type InsertAreaStatus = z.infer<typeof insertAreaStatusSchema>;
export type AreaStatus = typeof areaStatusTable.$inferSelect;
