import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { emailLinkSchema } from "./auth-credentials.js";
import { signUserToken } from "./auth-middleware.js";

type Account = { id: number; username: string; passwordHash: string };

export function createEmailLinkHandler(options: {
  findAccount: (username: string) => Promise<Account | undefined>;
  renameAccount: (account: Account, email: string) => Promise<{ id: number; username: string } | undefined>;
  comparePassword?: (password: string, hash: string) => Promise<boolean>;
}): RequestHandler {
  return async (req, res, next) => {
    const parsed = emailLinkSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Vérifiez l’ancien identifiant, l’adresse e-mail et le mot de passe." });
      return;
    }
    const { username, email, password } = parsed.data;
    try {
      const account = await options.findAccount(username);
      if (!account || !(await (options.comparePassword ?? bcrypt.compare)(password, account.passwordHash))) {
        res.status(401).json({ error: "Ancien identifiant ou mot de passe incorrect." });
        return;
      }
      // This changes only the login identifier, never the account ID, password
      // hash or dependent records. The database uniqueness constraint is atomic.
      const user = await options.renameAccount(account, email);
      if (!user) {
        res.status(409).json({ error: "Ce compte a déjà été modifié. Essayez de vous connecter avec votre e-mail." });
        return;
      }
      res.json({ token: signUserToken(user), user });
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
        res.status(409).json({ error: "Cette adresse e-mail est déjà utilisée par un autre compte." });
        return;
      }
      next(error);
    }
  };
}
