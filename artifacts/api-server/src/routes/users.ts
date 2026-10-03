import { Router, type IRouter } from "express";
import { db, usersTable } from "@workspace/db";
import { count } from "drizzle-orm";
import { ListUsersQueryParams } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/users", requireAdmin, async (req, res): Promise<void> => {
  const params = ListUsersQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { page = 1, limit = 20 } = params.data;
  const offset = (page - 1) * limit;

  const [users, totalResult] = await Promise.all([
    db.select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      phone: usersTable.phone,
      role: usersTable.role,
      area: usersTable.area,
      createdAt: usersTable.createdAt,
    }).from(usersTable).limit(limit).offset(offset),
    db.select({ count: count() }).from(usersTable),
  ]);

  res.json({
    users,
    total: totalResult[0]?.count ?? 0,
    page,
    limit,
  });
});

export default router;
