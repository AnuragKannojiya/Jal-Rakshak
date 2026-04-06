import { Router, type IRouter } from "express";
import { db, areaStatusTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { GetAreaParams, UpdateAreaBody, UpdateAreaParams } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/areas", async (_req, res): Promise<void> => {
  const areas = await db.select().from(areaStatusTable).orderBy(areaStatusTable.areaName);
  res.json(areas);
});

router.get("/areas/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetAreaParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [area] = await db.select().from(areaStatusTable).where(eq(areaStatusTable.id, params.data.id));
  if (!area) {
    res.status(404).json({ error: "Area not found" });
    return;
  }

  res.json(area);
});

router.patch("/areas/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateAreaParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const parsed = UpdateAreaBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db.select().from(areaStatusTable).where(eq(areaStatusTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Area not found" });
    return;
  }

  const score = parsed.data.waterScore ?? existing.waterScore;
  let riskLevel = parsed.data.riskLevel ?? existing.riskLevel;
  let qualityTag = parsed.data.qualityTag ?? existing.qualityTag;

  if (!parsed.data.riskLevel) {
    if (score >= 90) { riskLevel = "safe"; qualityTag = "Safe"; }
    else if (score >= 70) { riskLevel = "moderate"; qualityTag = "Moderate"; }
    else if (score >= 40) { riskLevel = "risky"; qualityTag = "Risky"; }
    else { riskLevel = "unsafe"; qualityTag = "Unsafe"; }
  }

  const [updated] = await db
    .update(areaStatusTable)
    .set({
      waterScore: score,
      riskLevel,
      qualityTag,
      notes: parsed.data.notes ?? existing.notes,
      lastUpdated: new Date(),
    })
    .where(eq(areaStatusTable.id, params.data.id))
    .returning();

  res.json(updated);
});

export default router;
