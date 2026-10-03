import { createHash, randomBytes } from "crypto";
import { Request, Response, NextFunction } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export function hashPassword(password: string): string {
  const salt = "jalrakshak_salt_2024";
  return createHash("sha256").update(password + salt).digest("hex");
}

export function generateToken(userId: number, role: string): string {
  const payload = `${userId}:${role}:${randomBytes(16).toString("hex")}`;
  return Buffer.from(payload).toString("base64url");
}

export function parseToken(token: string): { userId: number; role: string } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length < 2) return null;
    const userId = parseInt(parts[0], 10);
    const role = parts[1];
    if (isNaN(userId)) return null;
    return { userId, role };
  } catch {
    return null;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: string; name: string; email: string };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = authHeader.slice(7);
  const parsed = parseToken(token);
  if (!parsed) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, parsed.userId));
  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }
  req.user = { id: user.id, role: user.role, name: user.name, email: user.email };
  next();
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  await requireAuth(req, res, async () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  });
}

export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next();
    return;
  }
  const token = authHeader.slice(7);
  const parsed = parseToken(token);
  if (parsed) {
    req.user = { id: parsed.userId, role: parsed.role, name: "", email: "" };
  }
  next();
}
