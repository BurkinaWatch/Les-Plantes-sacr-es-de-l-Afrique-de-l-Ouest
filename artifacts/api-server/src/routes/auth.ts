import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router = Router();

const JWT_SECRET = process.env["JWT_SECRET"];
if (!JWT_SECRET) {
  if (process.env["NODE_ENV"] === "production") {
    throw new Error("FATAL: JWT_SECRET environment variable is not set. Refusing to start in production.");
  } else {
    console.warn("[auth] WARNING: JWT_SECRET is not set — using insecure default. Set it before deploying.");
  }
}
const SECRET = JWT_SECRET ?? "animaux-sacres-secret-change-in-prod";

const SALT_ROUNDS = 10;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives. Réessaye dans 15 minutes." },
});

const credentialsSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores"),
  password: z.string().min(6),
});

router.post("/register", authLimiter, async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Données invalides" });
  }

  const { username, password } = parsed.data;

  const existing = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
  if (existing.length > 0) {
    return res.status(409).json({ error: "Ce nom d'utilisateur est déjà pris" });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const [user] = await db.insert(usersTable).values({ username, passwordHash }).returning({ id: usersTable.id, username: usersTable.username });

  const token = jwt.sign({ id: user!.id, username: user!.username }, SECRET, { expiresIn: "30d" });

  return res.status(201).json({ token, user: { id: user!.id, username: user!.username } });
});

router.post("/login", authLimiter, async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Données invalides" });
  }

  const { username, password } = parsed.data;

  const [user] = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
  if (!user) {
    return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "30d" });

  return res.status(200).json({ token, user: { id: user.id, username: user.username } });
});

export default router;
