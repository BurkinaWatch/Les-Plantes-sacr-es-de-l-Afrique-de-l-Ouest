function getUrl(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} is missing`);
  }

  let url;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error(`${label} is not a valid URL`);
  }

  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error(`${label} must be an HTTPS URL without credentials`);
  }

  return url;
}

function getApiBaseUrlFromManifest(manifest) {
  const configuredApiBaseUrl =
    manifest?.extra?.expoClient?.extra?.apiBaseUrl ??
    manifest?.extra?.apiBaseUrl;
  return typeof configuredApiBaseUrl === "string"
    ? configuredApiBaseUrl.trim()
    : "";
}

function extractApiUrls(bundle) {
  const urls = [];
  const urlPattern = /https?:\/\/[A-Za-z0-9.-]+(?::\d+)?(?:\/[^"'`\s)]*)?/g;

  for (const match of bundle.matchAll(urlPattern)) {
    let url;
    try {
      url = new URL(match[0]);
    } catch {
      continue;
    }

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      urls.push(url);
    }
  }

  return urls;
}

/**
 * Check the generated Android bundle and manifest before publishing.
 *
 * The mobile host is allowed for the launch asset and Expo metadata. It must
 * never be the host used by the bundle's absolute /api URLs.
 */
function assertAndroidApiConfiguration({
  bundle,
  manifest,
  mobileBaseUrl,
  apiBaseUrl,
}) {
  if (typeof bundle !== "string" || bundle.trim() === "") {
    throw new Error("Android bundle is missing or empty");
  }

  const mobileUrl = getUrl(mobileBaseUrl, "Mobile deployment URL");
  const configuredApiUrl = getUrl(apiBaseUrl, "Configured API base URL");
  const manifestApiBaseUrl = getApiBaseUrlFromManifest(manifest);
  if (!manifestApiBaseUrl) {
    throw new Error("Android manifest is missing its API base URL");
  }
  const manifestApiUrl = getUrl(
    manifestApiBaseUrl,
    "Android manifest API base URL",
  );

  if (manifestApiUrl.host === mobileUrl.host) {
    throw new Error(
      `Android manifest API base URL points to the mobile host (${mobileUrl.host})`,
    );
  }

  if (configuredApiUrl.host === mobileUrl.host) {
    throw new Error(
      `Configured API base URL points to the mobile host (${mobileUrl.host})`,
    );
  }

  const bundleApiUrls = extractApiUrls(bundle);
  for (const bundleApiUrl of bundleApiUrls) {
    if (bundleApiUrl.host === mobileUrl.host) {
      throw new Error(
        `Android bundle targets the mobile host for API calls: ${bundleApiUrl.href}`,
      );
    }
  }

  return {
    apiHost: configuredApiUrl.host,
    manifestApiHost: manifestApiUrl.host,
    mobileHost: mobileUrl.host,
    bundleApiUrls: bundleApiUrls.map((url) => url.href),
  };
}

module.exports = {
  assertAndroidApiConfiguration,
  extractApiUrls,
  getApiBaseUrlFromManifest,
};