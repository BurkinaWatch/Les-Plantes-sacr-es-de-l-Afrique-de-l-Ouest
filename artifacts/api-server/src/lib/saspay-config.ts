// Accept the names already present in Secrets and the original documented names.
// Never expose these values in API responses, diagnostics or logs.
export function getSasPayApiKey(env: NodeJS.ProcessEnv): string | undefined {
  return env.SAS_PAY_API_KEY?.trim() || env.SASPAY_API_KEY?.trim() || undefined;
}

export function getSasPayWebhookSecret(env: NodeJS.ProcessEnv): string | undefined {
  // Do not trim signing secrets: the signature must use their exact bytes.
  return env.SAS_PAY_WEBHOOK_SECRET || env.SASPAY_WEBHOOK_SECRET || undefined;
}
