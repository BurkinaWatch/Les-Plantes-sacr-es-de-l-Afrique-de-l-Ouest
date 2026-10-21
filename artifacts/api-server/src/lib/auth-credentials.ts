import { z } from "zod";

export const emailIdentifier = z.string().trim().toLowerCase().max(254).email(
  "Saisissez une adresse e-mail valide.",
);

// Keep the existing wire field and legacy clients compatible. New clients send
// the email in `username`; the unique account identifier stores that exact email.
export const credentialsSchema = z.object({
  username: z.union([
    emailIdentifier,
    z.string().trim().toLowerCase().min(3).max(30).regex(/^[a-z0-9_]+$/),
  ]),
  password: z.string().min(6).max(128),
}).strict();

export const emailLinkSchema = z.object({
  username: z.string().trim().toLowerCase().min(3).max(30).regex(/^[a-z0-9_]+$/),
  email: emailIdentifier,
  password: z.string().min(6).max(128),
}).strict();
