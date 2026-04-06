import { db, complaintsTable } from "@workspace/db";
import { eq, and, ne } from "drizzle-orm";

const issueSeverityBase: Record<string, number> = {
  dirty_water: 40,
  sewage_mixing: 50,
  no_water_supply: 35,
  leakage: 20,
  broken_pipeline: 25,
  drainage_overflow: 45,
  tanker_issue: 30,
  contamination: 55,
  other: 15,
};

export async function calculateSeverity(
  issueType: string,
  area: string,
  hasImage: boolean,
  urgency?: string
): Promise<{ score: number; priority: string }> {
  let score = issueSeverityBase[issueType] ?? 20;

  if (hasImage) score += 10;

  const drinkingWaterTypes = ["dirty_water", "sewage_mixing", "contamination"];
  if (drinkingWaterTypes.includes(issueType)) score += 15;

  if (urgency === "high") score += 10;
  else if (urgency === "medium") score += 5;

  const areaComplaints = await db
    .select()
    .from(complaintsTable)
    .where(
      and(
        eq(complaintsTable.area, area),
        ne(complaintsTable.status, "resolved")
      )
    );

  if (areaComplaints.length >= 5) score += 20;
  else if (areaComplaints.length >= 3) score += 10;

  let priority = "low";
  if (score >= 75) priority = "critical";
  else if (score >= 50) priority = "high";
  else if (score >= 25) priority = "medium";

  return { score, priority };
}
