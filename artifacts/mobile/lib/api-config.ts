import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { resolveApiBaseUrl } from './api-config-core';

const configuredApiBaseUrl = Constants.expoConfig?.extra?.apiBaseUrl;

/**
 * Resolves the API endpoint without making native builds depend on a
 * development-only Replit environment variable.
 *
 * An explicit API URL still takes precedence, followed by the release
 * configuration embedded in app.json. The generic Expo domain is only a
 * development fallback because the mobile bundle's host is not necessarily
 * the API service.
 */
export function getApiBase(): string | null {
  return resolveApiBaseUrl({
    explicitApiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
    releaseApiBaseUrl: configuredApiBaseUrl,
    developmentDomain: process.env.EXPO_PUBLIC_DOMAIN,
    platform: Platform.OS,
    preferDevelopmentDomain: Platform.OS === 'web' && __DEV__,
    webHostname:
      typeof window !== 'undefined' ? window.location.hostname : undefined,
  });
}
