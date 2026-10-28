export interface ApiBaseUrlInputs {
  explicitApiBaseUrl?: unknown;
  releaseApiBaseUrl?: unknown;
  developmentDomain?: unknown;
  platform?: string;
  webHostname?: unknown;
  preferDevelopmentDomain?: boolean;
}

/**
 * React Native may expose a global `window` without a browser `location`.
 * Only read a hostname when both the platform and the window shape support it.
 */
export function getWebHostname(platform: string, windowLike: unknown): string | undefined {
  if (platform !== "web" || typeof windowLike !== "object" || windowLike === null) {
    return undefined;
  }

  const location = (windowLike as { location?: unknown }).location;
  if (typeof location !== "object" || location === null) return undefined;

  const hostname = (location as { hostname?: unknown }).hostname;
  return typeof hostname === "string" ? hostname : undefined;
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
  const developmentDomain = normalizeApiBaseUrl(inputs.developmentDomain);
  if (inputs.preferDevelopmentDomain && developmentDomain) {
    return `https://${developmentDomain}`;
  }

  const explicitBaseUrl = normalizeApiBaseUrl(inputs.explicitApiBaseUrl);
  if (explicitBaseUrl) return explicitBaseUrl;

  const releaseBaseUrl = normalizeApiBaseUrl(inputs.releaseApiBaseUrl);
  if (releaseBaseUrl) return releaseBaseUrl;

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