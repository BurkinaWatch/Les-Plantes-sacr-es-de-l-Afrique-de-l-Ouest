import { createHmac, timingSafeEqual } from "node:crypto";

export function verifySasPayWebhook(
  rawBody: Buffer,
  signature: string | undefined,
  timestamp: string | undefined,
  secret: string | undefined,
  nowMs = Date.now(),
): boolean {
  if (!signature || !timestamp || !secret) return false;
  const timestampMs = Number(timestamp) * 1000;
  if (!Number.isFinite(timestampMs) || Math.abs(nowMs - timestampMs) > 5 * 60 * 1000) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody.toString("utf8")}`)
    .digest("hex");
  const normalized = signature.replace(/^sha256=/i, "");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(normalized, "utf8");
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

/**
 * The payment_events unique index decides whether a webhook is new.
 * Callers must only process the returned event when status is "new".
 */
export async function recordIdempotentWebhookEvent<T>(
  insertEvent: () => Promise<T | undefined>,
): Promise<
  | { status: "new"; event: T }
  | { status: "duplicate" }
> {
  const event = await insertEvent();
  return event ? { status: "new", event } : { status: "duplicate" };
}