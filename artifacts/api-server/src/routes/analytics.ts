import { Router, type IRouter } from "express";
import { db, complaintsTable, alertsTable, areaStatusTable, usersTable } from "@workspace/db";
import { eq, ne, count, sql, avg } from "drizzle-orm";
import { GetAnalyticsTrendsQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/analytics/summary", async (_req, res): Promise<void> => {
  const [totalResult] = await db.select({ count: count() }).from(complaintsTable);
  const [resolvedResult] = await db.select({ count: count() }).from(complaintsTable).where(eq(complaintsTable.status, "resolved"));
  const [criticalResult] = await db.select({ count: count() }).from(complaintsTable).where(eq(complaintsTable.priority, "critical"));
  const [alertsTotal] = await db.select({ count: count() }).from(alertsTable);
  const [activeAlerts] = await db.select({ count: count() }).from(alertsTable).where(eq(alertsTable.status, "active"));
  const [totalAreas] = await db.select({ count: count() }).from(areaStatusTable);
  const [unsafeAreas] = await db.select({ count: count() }).from(areaStatusTable).where(eq(areaStatusTable.riskLevel, "unsafe"));

  const total = totalResult?.count ?? 0;
  const resolved = resolvedResult?.count ?? 0;
  const pending = total - resolved;
  const critical = criticalResult?.count ?? 0;

  const [avgResResult] = await db
    .select({ avg: avg(sql`EXTRACT(EPOCH FROM (${complaintsTable.updatedAt} - ${complaintsTable.createdAt})) / 3600`) })
    .from(complaintsTable)
    .where(eq(complaintsTable.status, "resolved"));

  const avgResolutionHours = Number(avgResResult?.avg ?? 0);
  const resolutionRate = total > 0 ? (resolved / total) * 100 : 0;

  res.json({
    totalComplaints: total,
    resolvedComplaints: resolved,
    pendingComplaints: pending,
    criticalComplaints: critical,
    avgResolutionHours: Math.round(avgResolutionHours * 10) / 10,
    resolutionRate: Math.round(resolutionRate * 10) / 10,
    totalAlerts: alertsTotal?.count ?? 0,
    activeAlerts: activeAlerts?.count ?? 0,
    totalAreas: totalAreas?.count ?? 0,
    unsafeAreas: unsafeAreas?.count ?? 0,
  });
});

router.get("/analytics/trends", async (req, res): Promise<void> => {
  const params = GetAnalyticsTrendsQueryParams.safeParse(req.query);
  const weeks = params.success ? (params.data.weeks ?? 8) : 8;

  const trends = [];
  const now = new Date();

  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() - i * 7);
    weekEnd.setHours(23, 59, 59, 999);

    const [submitted] = await db
      .select({ count: count() })
      .from(complaintsTable)
      .where(sql`${complaintsTable.createdAt} >= ${weekStart} AND ${complaintsTable.createdAt} <= ${weekEnd}`);

    const [resolved] = await db
      .select({ count: count() })
      .from(complaintsTable)
      .where(
        sql`${complaintsTable.status} = 'resolved' AND ${complaintsTable.updatedAt} >= ${weekStart} AND ${complaintsTable.updatedAt} <= ${weekEnd}`
      );

    const label = `W${weeks - i}`;
    trends.push({ week: label, submitted: submitted?.count ?? 0, resolved: resolved?.count ?? 0 });
  }

  res.json(trends);
});

router.get("/analytics/categories", async (_req, res): Promise<void> => {
  const [totalResult] = await db.select({ count: count() }).from(complaintsTable);
  const total = totalResult?.count ?? 1;

  const results = await db
    .select({ issueType: complaintsTable.issueType, count: count() })
    .from(complaintsTable)
    .groupBy(complaintsTable.issueType)
    .orderBy(sql`count DESC`);

  const categories = results.map((r) => ({
    issueType: r.issueType,
    count: r.count,
    percentage: Math.round((r.count / total) * 1000) / 10,
  }));

  res.json(categories);
});

router.get("/analytics/areas", async (_req, res): Promise<void> => {
  const areas = await db.select().from(areaStatusTable).orderBy(areaStatusTable.areaName);
  const results = [];

  for (const area of areas) {
    const [totalResult] = await db
      .select({ count: count() })
      .from(complaintsTable)
      .where(eq(complaintsTable.area, area.areaName));
    const [resolvedResult] = await db
      .select({ count: count() })
      .from(complaintsTable)
      .where(sql`${complaintsTable.area} = ${area.areaName} AND ${complaintsTable.status} = 'resolved'`);
    const [criticalResult] = await db
      .select({ count: count() })
      .from(complaintsTable)
      .where(sql`${complaintsTable.area} = ${area.areaName} AND ${complaintsTable.priority} = 'critical'`);

    results.push({
      areaName: area.areaName,
      total: totalResult?.count ?? 0,
      resolved: resolvedResult?.count ?? 0,
      critical: criticalResult?.count ?? 0,
      waterScore: area.waterScore,
    });
  }

  res.json(results);
});

router.get("/analytics/sdg", async (_req, res): Promise<void> => {
  const [resolvedResult] = await db.select({ count: count() }).from(complaintsTable).where(eq(complaintsTable.status, "resolved"));
  const [totalUsers] = await db.select({ count: count() }).from(usersTable);
  const [alertsResult] = await db.select({ count: count() }).from(alertsTable);

  const resolved = resolvedResult?.count ?? 0;
  const areas = await db.select().from(areaStatusTable).where(ne(areaStatusTable.riskLevel, "unsafe"));

  res.json({
    complaintsResolved: resolved,
    areasImproved: areas.length,
    citizensHelped: (totalUsers?.count ?? 0) * 5,
    alertsIssued: alertsResult?.count ?? 0,
  });
});

export default router;
