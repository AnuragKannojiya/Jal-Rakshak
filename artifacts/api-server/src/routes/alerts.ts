import { Router, type IRouter } from "express";
import { db, alertsTable } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";
import { CreateAlertBody, UpdateAlertBody, UpdateAlertParams, ListAlertsQueryParams } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/alerts", async (req, res): Promise<void> => {
  const params = ListAlertsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const conditions = [];
  if (params.data.area) conditions.push(eq(alertsTable.area, params.data.area));
  if (params.data.status) conditions.push(eq(alertsTable.status, params.data.status));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const alerts = await db
    .select()
    .from(alertsTable)
    .where(whereClause)
    .orderBy(desc(alertsTable.createdAt));

  res.json(alerts);
});

router.post("/alerts", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateAlertBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [alert] = await db.insert(alertsTable).values({
    ...parsed.data,
    status: "active",
    createdBy: req.user!.name,
  }).returning();

  res.status(201).json(alert);
});

router.patch("/alerts/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateAlertParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const parsed = UpdateAlertBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db.select().from(alertsTable).where(eq(alertsTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Alert not found" });
    return;
  }

  const updateData: Record<string, unknown> = {};
  if (parsed.data.status) updateData.status = parsed.data.status;
  if (parsed.data.description) updateData.description = parsed.data.description;

  const [updated] = await db
    .update(alertsTable)
    .set(updateData)
    .where(eq(alertsTable.id, params.data.id))
    .returning();

  res.json(updated);
});

export default router;
