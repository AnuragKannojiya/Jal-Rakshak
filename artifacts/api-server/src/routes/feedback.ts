import { Router, type IRouter } from "express";
import { db, feedbackTable, complaintsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SubmitFeedbackBody } from "@workspace/api-zod";
import { requireAuth } from "../lib/auth";

const router: IRouter = Router();

router.post("/feedback", requireAuth, async (req, res): Promise<void> => {
  const parsed = SubmitFeedbackBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [complaint] = await db.select().from(complaintsTable).where(eq(complaintsTable.id, parsed.data.complaintId));
  if (!complaint) {
    res.status(404).json({ error: "Complaint not found" });
    return;
  }

  const [existing] = await db.select().from(feedbackTable).where(eq(feedbackTable.complaintId, parsed.data.complaintId));
  if (existing) {
    res.status(400).json({ error: "Feedback already submitted for this complaint" });
    return;
  }

  const [feedback] = await db.insert(feedbackTable).values({
    complaintId: parsed.data.complaintId,
    userId: req.user!.id,
    rating: parsed.data.rating,
    comment: parsed.data.comment ?? null,
  }).returning();

  res.status(201).json(feedback);
});

export default router;
