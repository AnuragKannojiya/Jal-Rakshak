import { pgTable, text, serial, timestamp, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const complaintsTable = pgTable("complaints", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  complaintTitle: text("complaint_title").notNull(),
  issueType: text("issue_type").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  area: text("area").notNull(),
  latitude: real("latitude"),
  longitude: real("longitude"),
  imageUrl: text("image_url"),
  severityScore: integer("severity_score").notNull().default(0),
  priority: text("priority").notNull().default("low"),
  status: text("status").notNull().default("submitted"),
  adminRemark: text("admin_remark"),
  resolvedImage: text("resolved_image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertComplaintSchema = createInsertSchema(complaintsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
export type Complaint = typeof complaintsTable.$inferSelect;

export const complaintHistoryTable = pgTable("complaint_history", {
  id: serial("id").primaryKey(),
  complaintId: integer("complaint_id").notNull(),
  changedBy: text("changed_by").notNull(),
  oldStatus: text("old_status").notNull(),
  newStatus: text("new_status").notNull(),
  remark: text("remark"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
});

export const insertComplaintHistorySchema = createInsertSchema(complaintHistoryTable).omit({ id: true, timestamp: true });
export type InsertComplaintHistory = z.infer<typeof insertComplaintHistorySchema>;
export type ComplaintHistory = typeof complaintHistoryTable.$inferSelect;
