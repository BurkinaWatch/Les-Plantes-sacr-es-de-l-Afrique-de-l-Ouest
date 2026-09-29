import { Router, type RequestHandler } from "express";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { pool } from "@workspace/db";
import { z } from "zod";

import { requireJwt } from "../lib/auth-middleware.js";

const router = Router();

type UserSelector = { userId: number } | { username: string };
type DeletionResult = "deleted" | "invalid_credentials" | "missing";
type PasswordComparer = (password: string, hash: string) => Promise<boolean>;
type AccountDbClient = {
  query<Row = Record<string, unknown>>(
    queryText: string,
    values?: any[],
  ): Promise<{ rows: Row[]; rowCount: number | null }>;
  release(): void;
};
type ConnectClient = () => Promise<AccountDbClient>;

const deleteLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de demandes. Réessayez dans 15 minutes." },
});

const accountDeletionSchema = z.object({
  password: z.string().min(6).max(128),
}).strict();

const webDeletionSchema = z.object({
  username: z.string().trim().toLowerCase().min(3).max(30)
    .regex(/^[a-z0-9_]+$/),
  password: z.string().min(6).max(128),
  confirm: z.literal("yes"),
}).strict();

const esc = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);

function deletionPage(notice?: { title: string; message: string; success?: boolean }): string {
  const noticeHtml = notice
    ? `<section class="notice ${notice.success ? "success" : "error"}" role="status"><h2>${esc(notice.title)}</h2><p>${esc(notice.message)}</p></section>`
    : "";

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Suppression du compte — Les Plantes Sacrées</title>
  <style>
    :root{color-scheme:light}body{margin:0;background:#f7f3ea;color:#26342c;font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}
    main{box-sizing:border-box;max-width:680px;margin:40px auto;padding:28px;background:#fff;border:1px solid #e3ddd0;border-radius:18px}
    h1{line-height:1.2;color:#183c31}h2{font-size:1.1rem}label{display:block;margin:18px 0 6px;font-weight:600}
    input[type=text],input[type=password]{box-sizing:border-box;width:100%;padding:12px;border:1px solid #aaa;border-radius:8px;font:inherit}
    .confirm{display:flex;gap:10px;align-items:flex-start}.confirm input{margin-top:6px}
    button{margin-top:20px;padding:13px 18px;border:0;border-radius:9px;background:#8b3028;color:#fff;font:inherit;font-weight:700}
    .notice{padding:12px 16px;border-radius:10px;margin:18px 0}.error{background:#fff0ed;color:#842d24}.success{background:#edf7f0;color:#205a35}
    .muted{color:#5d665f;font-size:.94rem}
  </style>
</head>
<body>
<main>
  <h1>Demander la suppression de votre compte</h1>
<p>Cette page permet de supprimer votre compte « Les Plantes Sacrées » même si vous n’avez plus accès à l’application. La vérification se fait avec votre nom d’utilisateur et votre mot de passe; aucun e-mail n’est demandé par ce formulaire.</p>
  ${noticeHtml}
  <h2>Conséquences de la suppression</h2>
  <ul>
    <li>Le compte, son accès et son état d’abonnement dans l’application sont supprimés.</li>
    <li>Les jetons de notification et les tentatives de paiement rattachées au compte sont supprimés. Les événements de paiement associés sont conservés uniquement sous une forme expurgée afin d’éviter le traitement en double.</li>
    <li>Les justificatifs éventuellement conservés par SAS Pay ou d’autres prestataires relèvent de leurs propres règles.</li>
    <li>La suppression ne déclenche ni remboursement ni annulation auprès d’un prestataire de paiement. Les favoris et résultats du quiz stockés uniquement sur votre appareil ne peuvent être effacés que depuis l’application ou en supprimant ses données sur cet appareil.</li>
  </ul>
  <form method="post" action="./account-deletion" autocomplete="on">
    <label for="username">Nom d’utilisateur</label>
    <input id="username" name="username" type="text" autocomplete="username" minlength="3" maxlength="30" required>
    <label for="password">Mot de passe actuel</label>
    <input id="password" name="password" type="password" autocomplete="current-password" minlength="6" maxlength="128" required>
    <label class="confirm"><input type="checkbox" name="confirm" value="yes" required><span>Je comprends que cette suppression est définitive et que l’accès et les données de compte seront supprimés.</span></label>
    <button type="submit">Supprimer définitivement mon compte</button>
  </form>
  <p class="muted">N’envoyez jamais votre mot de passe par e-mail. Ce formulaire le transmet directement au serveur par HTTPS lorsque la page est ouverte sur le site public.</p>
</main>
</body>
</html>`;
}

async function removeAccountRecords(client: AccountDbClient, userId: number): Promise<void> {
  const attempts = await client.query<{
    provider: string;
    provider_transaction_id: string | null;
    provider_reference: string | null;
  }>(
    `SELECT provider, provider_transaction_id, provider_reference
     FROM payment_attempts
     WHERE user_id = $1`,
    [userId],
  );

  const keysByProvider = new Map<string, { transactions: Set<string>; references: Set<string> }>();
  for (const attempt of attempts.rows) {
    let keys = keysByProvider.get(attempt.provider);
    if (!keys) {
      keys = { transactions: new Set(), references: new Set() };
      keysByProvider.set(attempt.provider, keys);
    }
    if (attempt.provider_transaction_id) keys.transactions.add(attempt.provider_transaction_id);
    if (attempt.provider_reference) keys.references.add(attempt.provider_reference);
  }

  for (const [provider, keys] of keysByProvider) {
    if (keys.transactions.size === 0 && keys.references.size === 0) continue;
    await client.query(
      `UPDATE payment_events
       SET provider_reference = NULL,
           payload = $4::jsonb,
           payload_hash = $5,
           processing_error = NULL
       WHERE provider = $1
         AND (
           provider_transaction_id = ANY($2::text[])
           OR provider_reference = ANY($3::text[])
         )`,
      [
        provider,
        [...keys.transactions],
        [...keys.references],
        JSON.stringify({ redacted: true, reason: "account-deletion" }),
        "redacted-after-account-deletion",
      ],
    );
  }

  await client.query("DELETE FROM payment_attempts WHERE user_id = $1", [userId]);
  await client.query("DELETE FROM subscriptions WHERE user_id = $1", [userId]);
  await client.query("DELETE FROM push_tokens WHERE user_id = $1", [userId]);
  const deletedUser = await client.query("DELETE FROM users WHERE id = $1", [userId]);
  if (deletedUser.rowCount !== 1) {
    throw new Error("Account deletion did not remove exactly one user.");
  }
}

async function deleteAccountWithPassword(
  connect: ConnectClient,
  selector: UserSelector,
  password: string,
  comparePassword: PasswordComparer,
): Promise<DeletionResult> {
  const client = await connect();
  let transactionOpen = false;

  try {
    await client.query("BEGIN");
    transactionOpen = true;

    const lookup = "userId" in selector
      ? await client.query<{ id: number; password_hash: string }>(
        "SELECT id, password_hash FROM users WHERE id = $1 FOR UPDATE",
        [selector.userId],
      )
      : await client.query<{ id: number; password_hash: string }>(
        "SELECT id, password_hash FROM users WHERE username = $1 FOR UPDATE",
        [selector.username],
      );
    const user = lookup.rows[0];

    if (!user) {
      await client.query("ROLLBACK");
      transactionOpen = false;
      return "missing";
    }

    if (!(await comparePassword(password, user.password_hash))) {
      await client.query("ROLLBACK");
      transactionOpen = false;
      return "invalid_credentials";
    }

    await removeAccountRecords(client, user.id);
    await client.query("COMMIT");
    transactionOpen = false;
    return "deleted";
  } catch (error) {
    if (transactionOpen) {
      try {
        await client.query("ROLLBACK");
      } catch {
        // Preserve the original database error.
      }
    }
    throw error;
  } finally {
    client.release();
  }
}

export function createAccountDeletionRouter(options: {
  connect?: ConnectClient;
  comparePassword?: PasswordComparer;
  authenticate?: RequestHandler;
} = {}): Router {
  const connect = options.connect ?? (() => pool.connect());
  const comparePassword = options.comparePassword ?? bcrypt.compare;
  const authenticate = options.authenticate ?? requireJwt;
  const accountRouter = Router();

  const sendPage = (res: Parameters<RequestHandler>[1], notice?: {
    title: string;
    message: string;
    success?: boolean;
  }) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    );
    return res.type("html").send(deletionPage(notice));
  };

  accountRouter.get("/account-deletion", (_req, res) => sendPage(res));

  accountRouter.post("/account-deletion", deleteLimit, async (req, res, next) => {
    const parsed = webDeletionSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendPage(res.status(400), {
        title: "Vérifiez les informations",
        message: "Saisissez un nom d’utilisateur et un mot de passe valides, puis confirmez la suppression.",
      });
    }

    try {
      const result = await deleteAccountWithPassword(
        connect,
        { username: parsed.data.username },
        parsed.data.password,
        comparePassword,
      );
      if (result !== "deleted") {
        return sendPage(res.status(401), {
          title: "Compte non supprimé",
          message: "Le nom d’utilisateur ou le mot de passe est incorrect. Vérifiez les informations et réessayez.",
        });
      }
      return sendPage(res, {
        title: "Compte supprimé",
        message: "Votre compte et les données de compte indiquées ci-dessus ont été supprimés.",
        success: true,
      });
    } catch (error) {
      return next(error);
    }
  });

  accountRouter.delete("/account", deleteLimit, authenticate, async (req, res, next) => {
    const parsed = accountDeletionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Mot de passe requis" });
    }

    try {
      const result = await deleteAccountWithPassword(
        connect,
        { userId: req.user!.id },
        parsed.data.password,
        comparePassword,
      );
      if (result === "invalid_credentials") {
        return res.status(401).json({ error: "Mot de passe incorrect" });
      }
      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  });

  return accountRouter;
}

export default createAccountDeletionRouter();