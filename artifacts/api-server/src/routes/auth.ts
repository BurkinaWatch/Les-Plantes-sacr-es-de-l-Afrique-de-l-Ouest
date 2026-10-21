import { Router } from "express";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { db, usersTable } from "@workspace/db";
import { and, eq } from "drizzle-orm";
import { signUserToken } from "../lib/auth-middleware.js";
import { credentialsSchema } from "../lib/auth-credentials.js";
import { createEmailLinkHandler } from "../lib/email-link.js";

const router = Router();

const SALT_ROUNDS = 10;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives. Réessaye dans 15 minutes." },
});

router.post("/register", authLimiter, async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Données invalides" });
  }

  const { username, password } = parsed.data;

  const existing = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
  if (existing.length > 0) {
    return res.status(409).json({ error: "Un compte existe déjà avec cette adresse e-mail ou cet identifiant." });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const [user] = await db.insert(usersTable).values({ username, passwordHash })
    .onConflictDoNothing({ target: usersTable.username })
    .returning({ id: usersTable.id, username: usersTable.username });
  if (!user) {
    return res.status(409).json({ error: "Un compte existe déjà avec cette adresse e-mail ou cet identifiant." });
  }

  const token = signUserToken({ id: user!.id, username: user!.username });

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
    return res.status(401).json({ error: "Adresse e-mail ou mot de passe incorrect" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Adresse e-mail ou mot de passe incorrect" });
  }

  const token = signUserToken({ id: user.id, username: user.username });

  return res.status(200).json({ token, user: { id: user.id, username: user.username } });
});

router.post("/link-email", authLimiter, createEmailLinkHandler({
  findAccount: async (username) => {
    const [account] = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
    return account;
  },
  renameAccount: async (account, email) => {
    const [user] = await db.update(usersTable).set({ username: email })
      .where(and(eq(usersTable.id, account.id), eq(usersTable.username, account.username)))
      .returning({ id: usersTable.id, username: usersTable.username });
    return user;
  },
}));

export default router;
