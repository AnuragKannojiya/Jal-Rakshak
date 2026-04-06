import { Router, type IRouter } from "express";
import { db, complaintsTable, complaintHistoryTable, usersTable, areaStatusTable, feedbackTable } from "@workspace/db";
import { eq, and, ne, desc, count, sql } from "drizzle-orm";
import {
  CreateComplaintBody,
  UpdateComplaintBody,
  GetComplaintParams,
  UpdateComplaintParams,
  ListComplaintsQueryParams,
} from "@workspace/api-zod";
import { requireAuth, requireAdmin, optionalAuth } from "../lib/auth";
import { calculateSeverity } from "../lib/severity";

const router: IRouter = Router();

router.get("/complaints", optionalAuth, async (req, res): Promise<void> => {
  const params = ListComplaintsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { status, priority, issueType, area, page = 1, limit = 20, myOnly } = params.data;
  const conditions = [];

  if (myOnly && req.user) {
    conditions.push(eq(complaintsTable.userId, req.user.id));
  }
  if (status) conditions.push(eq(complaintsTable.status, status));
  if (priority) conditions.push(eq(complaintsTable.priority, priority));
  if (issueType) conditions.push(eq(complaintsTable.issueType, issueType));
  if (area) conditions.push(eq(complaintsTable.area, area));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  const offset = (page - 1) * limit;

  const [complaints, totalResult] = await Promise.all([
    db.select({
      id: complaintsTable.id,
      userId: complaintsTable.userId,
      complaintTitle: complaintsTable.complaintTitle,
      issueType: complaintsTable.issueType,
      description: complaintsTable.description,
      address: complaintsTable.address,
      area: complaintsTable.area,
      latitude: complaintsTable.latitude,
      longitude: complaintsTable.longitude,
      imageUrl: complaintsTable.imageUrl,
      severityScore: complaintsTable.severityScore,
      priority: complaintsTable.priority,
      status: complaintsTable.status,
      adminRemark: complaintsTable.adminRemark,
      resolvedImage: complaintsTable.resolvedImage,
      userName: usersTable.name,
      createdAt: complaintsTable.createdAt,
      updatedAt: complaintsTable.updatedAt,
    })
    .from(complaintsTable)
    .leftJoin(usersTable, eq(complaintsTable.userId, usersTable.id))
    .where(whereClause)
    .orderBy(desc(complaintsTable.createdAt))
    .limit(limit)
    .offset(offset),
    db.select({ count: count() }).from(complaintsTable).where(whereClause),
  ]);

  res.json({
    complaints,
    total: totalResult[0]?.count ?? 0,
    page,
    limit,
  });
});

router.post("/complaints", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateComplaintBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { complaintTitle, issueType, description, address, area, latitude, longitude, imageUrl, urgency } = parsed.data;

  const { score, priority } = await calculateSeverity(
    issueType,
    area,
    !!imageUrl,
    urgency ?? undefined
  );

  const [complaint] = await db.insert(complaintsTable).values({
    userId: req.user!.id,
    complaintTitle,
    issueType,
    description,
    address,
    area,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
    imageUrl: imageUrl ?? null,
    severityScore: score,
    priority,
    status: "submitted",
  }).returning();

  await db.insert(complaintHistoryTable).values({
    complaintId: complaint.id,
    changedBy: req.user!.name || req.user!.email,
    oldStatus: "none",
    newStatus: "submitted",
    remark: "Complaint submitted by citizen",
  });

  await db
    .update(areaStatusTable)
    .set({
      activeComplaints: sql`${areaStatusTable.activeComplaints} + 1`,
      lastUpdated: new Date(),
    })
    .where(eq(areaStatusTable.areaName, area));

  res.status(201).json({
    ...complaint,
    userName: req.user!.name,
  });
});

router.get("/complaints/map", async (_req, res): Promise<void> => {
  const complaints = await db
    .select({
      id: complaintsTable.id,
      latitude: complaintsTable.latitude,
      longitude: complaintsTable.longitude,
      priority: complaintsTable.priority,
      status: complaintsTable.status,
      issueType: complaintsTable.issueType,
      complaintTitle: complaintsTable.complaintTitle,
      area: complaintsTable.area,
    })
    .from(complaintsTable)
    .where(sql`${complaintsTable.latitude} IS NOT NULL AND ${complaintsTable.longitude} IS NOT NULL`);

  res.json(complaints);
});

router.get("/complaints/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetComplaintParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [complaint] = await db
    .select({
      id: complaintsTable.id,
      userId: complaintsTable.userId,
      complaintTitle: complaintsTable.complaintTitle,
      issueType: complaintsTable.issueType,
      description: complaintsTable.description,
      address: complaintsTable.address,
      area: complaintsTable.area,
      latitude: complaintsTable.latitude,
      longitude: complaintsTable.longitude,
      imageUrl: complaintsTable.imageUrl,
      severityScore: complaintsTable.severityScore,
      priority: complaintsTable.priority,
      status: complaintsTable.status,
      adminRemark: complaintsTable.adminRemark,
      resolvedImage: complaintsTable.resolvedImage,
      userName: usersTable.name,
      createdAt: complaintsTable.createdAt,
      updatedAt: complaintsTable.updatedAt,
    })
    .from(complaintsTable)
    .leftJoin(usersTable, eq(complaintsTable.userId, usersTable.id))
    .where(eq(complaintsTable.id, params.data.id));

  if (!complaint) {
    res.status(404).json({ error: "Complaint not found" });
    return;
  }

  const history = await db
    .select()
    .from(complaintHistoryTable)
    .where(eq(complaintHistoryTable.complaintId, params.data.id))
    .orderBy(complaintHistoryTable.timestamp);

  const [feedback] = await db
    .select()
    .from(feedbackTable)
    .where(eq(feedbackTable.complaintId, params.data.id));

  res.json({ ...complaint, history, feedback: feedback ?? null });
});

router.patch("/complaints/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateComplaintParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const parsed = UpdateComplaintBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db.select().from(complaintsTable).where(eq(complaintsTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Complaint not found" });
    return;
  }

  const updateData: Record<string, unknown> = {};
  if (parsed.data.status) updateData.status = parsed.data.status;
  if (parsed.data.priority) updateData.priority = parsed.data.priority;
  if (parsed.data.adminRemark != null) updateData.adminRemark = parsed.data.adminRemark;
  if (parsed.data.resolvedImage != null) updateData.resolvedImage = parsed.data.resolvedImage;

  const [updated] = await db
    .update(complaintsTable)
    .set(updateData)
    .where(eq(complaintsTable.id, params.data.id))
    .returning();

  if (parsed.data.status && parsed.data.status !== existing.status) {
    await db.insert(complaintHistoryTable).values({
      complaintId: params.data.id,
      changedBy: `Admin (${req.user!.name})`,
      oldStatus: existing.status,
      newStatus: parsed.data.status,
      remark: parsed.data.adminRemark ?? null,
    });

    if (parsed.data.status === "resolved" || parsed.data.status === "rejected") {
      await db
        .update(areaStatusTable)
        .set({
          activeComplaints: sql`GREATEST(${areaStatusTable.activeComplaints} - 1, 0)`,
          lastUpdated: new Date(),
        })
        .where(eq(areaStatusTable.areaName, existing.area));
    }
  }

  res.json({ ...updated, userName: req.user!.name });
});

export default router;
