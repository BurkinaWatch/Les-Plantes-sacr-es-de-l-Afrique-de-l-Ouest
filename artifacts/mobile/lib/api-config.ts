import Constants from 'expo-constants';
import { Platform } from 'react-native';

const configuredApiBaseUrl = Constants.expoConfig?.extra?.apiBaseUrl;

function normalizeApiBaseUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim() === '') return null;
  return value.trim().replace(/\/+$/, '');
}

/**
 * Resolves the API endpoint without making native builds depend on a
 * development-only Replit environment variable.
 *
 * Build-time environment variables still take precedence so local preview
 * and future deployments can override the public fallback safely.
 */
export function getApiBase(): string | null {
  const explicitBaseUrl = normalizeApiBaseUrl(process.env.EXPO_PUBLIC_API_BASE_URL);
  if (explicitBaseUrl) return explicitBaseUrl;

  if (process.env.EXPO_PUBLIC_DOMAIN) {
    return `https://${process.env.EXPO_PUBLIC_DOMAIN}/api`;
  }

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host.includes('replit.dev') || host.includes('replit.app')) {
      return `https://${host}:8080/api`;
    }
    if (host === 'localhost' || host === '127.0.0.1') {
      return `http://${host}:8080/api`;
    }
  }

  return normalizeApiBaseUrl(configuredApiBaseUrl);
}