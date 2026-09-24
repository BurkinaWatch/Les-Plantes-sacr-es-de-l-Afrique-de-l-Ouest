export interface ApiBaseUrlInputs {
  explicitApiBaseUrl?: unknown;
  releaseApiBaseUrl?: unknown;
  developmentDomain?: unknown;
  platform?: string;
  webHostname?: unknown;
}

export function normalizeApiBaseUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim() === '') return null;
  return value.trim().replace(/\/+$/, '').replace(/\/api$/i, '');
}

/**
 * Resolve the API endpoint in the same order used by release and development
 * bundles. The generic Expo/mobile domain is intentionally only a fallback.
 */
export function resolveApiBaseUrl(inputs: ApiBaseUrlInputs): string | null {
  const explicitBaseUrl = normalizeApiBaseUrl(inputs.explicitApiBaseUrl);
  if (explicitBaseUrl) return explicitBaseUrl;

  const releaseBaseUrl = normalizeApiBaseUrl(inputs.releaseApiBaseUrl);
  if (releaseBaseUrl) return releaseBaseUrl;

  const developmentDomain = normalizeApiBaseUrl(inputs.developmentDomain);
  if (developmentDomain) return `https://${developmentDomain}`;

  if (inputs.platform === 'web' && typeof inputs.webHostname === 'string') {
    const host = inputs.webHostname.trim();
    if (host.includes('replit.dev') || host.includes('replit.app')) {
      return `https://${host}:8080`;
    }
    if (host === 'localhost' || host === '127.0.0.1') {
      return `http://${host}:8080`;
    }
  }

  return null;
}