const http = require("http");
const https = require("https");

const HOSTNAME_PATTERN = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

function normalizePublicDomain(value, variableName = "public domain") {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${variableName} must be a non-empty hostname`);
  }

  const trimmed = value.trim();
  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  let parsed;

  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error(`${variableName} is not a valid public hostname`);
  }

  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  ) {
    throw new Error(`${variableName} must contain only an HTTP(S) hostname`);
  }

  const hostname = parsed.hostname.toLowerCase();
  if (
    !HOSTNAME_PATTERN.test(hostname) ||
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    throw new Error(`${variableName} must be a public DNS hostname`);
  }

  return parsed.host.toLowerCase();
}

function getDeploymentDomain(env = process.env) {
  const candidates = [
    ["RAILWAY_PUBLIC_DOMAIN", env.RAILWAY_PUBLIC_DOMAIN],
    ["EXPO_PUBLIC_DOMAIN", env.EXPO_PUBLIC_DOMAIN],
  ];

  for (const [variableName, value] of candidates) {
    if (value) {
      return normalizePublicDomain(value, variableName);
    }
  }

  throw new Error(
    "No public deployment domain found. Set RAILWAY_PUBLIC_DOMAIN or EXPO_PUBLIC_DOMAIN.",
  );
}

function normalizeBasePath(value = "/") {
  const raw = String(value || "/").trim();
  if (raw === "" || raw === "/") return "";

  const normalized = raw.startsWith("/") ? raw : `/${raw}`;
  if (
    normalized.includes("\0") ||
    normalized.includes("\\") ||
    normalized.split("/").includes("..") ||
    !/^\/[a-zA-Z0-9._~!$&'()*+,;=:@%/-]*$/.test(normalized)
  ) {
    throw new Error("BASE_PATH must be a safe URL path");
  }

  return normalized.replace(/\/+$/, "");
}

function joinPublicPath(basePath, requestPath) {
  const prefix = basePath || "";
  return `${prefix}${requestPath.startsWith("/") ? requestPath : `/${requestPath}`}` || "/";
}

function requestPublicPath(baseUrl, requestPath, options = {}) {
  const origin = new URL(baseUrl);
  const method = options.method || "GET";
  const readBody = options.readBody !== false;
  const requestTarget = requestPath.startsWith("/")
    ? requestPath
    : `/${requestPath}`;
  const transport = origin.protocol === "https:" ? https : http;

  return new Promise((resolve, reject) => {
    const request = transport.request(
      {
        protocol: origin.protocol,
        hostname: origin.hostname,
        port: origin.port || undefined,
        method,
        path: requestTarget,
        headers: {
          accept: options.accept || "*/*",
          "user-agent": "mobile-public-deployment-check/1",
          ...(options.headers || {}),
        },
        timeout: options.timeoutMs || 10_000,
      },
      (response) => {
        const chunks = [];
        if (readBody) {
          response.on("data", (chunk) => chunks.push(chunk));
        } else {
          response.resume();
        }
        response.on("end", () => {
          resolve({
            status: response.statusCode || 0,
            headers: response.headers,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );
    request.on("timeout", () => request.destroy(new Error("request timed out")));
    request.on("error", reject);
    request.end();
  });
}

function getHeader(headers, name) {
  const value = headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value.join(", ") : String(value || "");
}

function parseMultipartManifest(response) {
  const contentType = getHeader(response.headers, "content-type");
  if (!/^multipart\/mixed\s*;/i.test(contentType)) {
    throw new Error(`expected multipart/mixed, received ${contentType || "no content type"}`);
  }

  const jsonStart = response.body.indexOf("{");
  const jsonEnd = response.body.lastIndexOf("}");
  if (jsonStart < 0 || jsonEnd < jsonStart) {
    throw new Error("multipart response does not contain a JSON manifest");
  }

  try {
    return JSON.parse(response.body.slice(jsonStart, jsonEnd + 1));
  } catch {
    throw new Error("multipart response contains invalid JSON");
  }
}

function isExpectedPublicUrl(value, expectedHost) {
  try {
    const parsed = new URL(value);
    return (
      parsed.protocol === "https:" &&
      parsed.host === expectedHost &&
      !parsed.username &&
      !parsed.password &&
      !parsed.search &&
      !parsed.hash
    );
  } catch {
    return false;
  }
}

function getPublicDeploymentBaseUrl(domain, basePath = "") {
  const normalizedDomain = normalizePublicDomain(domain, "deployment domain");
  const normalizedBasePath = normalizeBasePath(basePath);
  return {
    domain: normalizedDomain,
    baseUrl: `https://${normalizedDomain}`,
    basePath: normalizedBasePath,
  };
}

/**
 * Validate what a public deployment actually serves, rather than trusting the
 * build output. requestImpl is injectable so the contract can be tested
 * without network access. It receives raw URL paths and must preserve them.
 */
async function checkPublicDeployment({
  domain,
  expectedAppName,
  basePath = "",
  requestImpl = requestPublicPath,
  timeoutMs = 10_000,
}) {
  if (typeof expectedAppName !== "string" || expectedAppName.trim() === "") {
    throw new Error("expectedAppName must be a non-empty string");
  }

  const deployment = getPublicDeploymentBaseUrl(domain, basePath);
  const checks = [];
  const failures = [];
  const routes = [];
  const recordRoute = (route) => {
    if (!routes.includes(route)) routes.push(route);
  };
  const pass = (name, detail) => checks.push({ name, ok: true, detail });
  const fail = (name, detail) => {
    checks.push({ name, ok: false, detail });
    failures.push(`${name}: ${detail}`);
  };
  const request = (requestPath, options = {}) => {
    const publicPath = joinPublicPath(deployment.basePath, requestPath);
    const platform = options.headers?.["expo-platform"];
    recordRoute(platform ? `${publicPath} [expo-platform=${platform}]` : publicPath);
    return requestImpl(deployment.baseUrl, publicPath, {
      timeoutMs,
      ...options,
    });
  };

  let landing = null;
  try {
    landing = await request("/", { accept: "text/html" });
    if (landing.status !== 200) {
      fail("landing page", `HTTP ${landing.status} (expected HTTP 200)`);
    } else if (!/^text\/html\b/i.test(getHeader(landing.headers, "content-type"))) {
      fail("landing page", "the response is not HTML");
    } else {
      pass("landing page", "HTML is reachable");
      if (!landing.body.includes(expectedAppName)) {
        fail(
          "application name",
          `expected “${expectedAppName}”; Railway may be serving an older deployment`,
        );
      } else {
        pass("application name", `found “${expectedAppName}”`);
      }

      const expectedDeepLink = `exps://${deployment.domain}`;
      if (!landing.body.includes(expectedDeepLink)) {
        fail(
          "Expo Go deep link",
          `expected ${expectedDeepLink}; Railway may be serving an older deployment`,
        );
      } else {
        pass("Expo Go deep link", expectedDeepLink);
      }
      if (landing.body.includes("EXPS_URL_PLACEHOLDER")) {
        fail("Expo Go deep link", "the landing page still contains a placeholder");
      }
    }
  } catch (error) {
    fail("landing page", `request failed: ${error.message}`);
  }

  for (const platform of ["ios", "android"]) {
    let manifest = null;
    const manifestLabel = `${platform} manifest`;
    try {
      const response = await request(`/manifest`, {
        accept: "application/json",
        headers: { "expo-platform": platform },
      });
      if (response.status !== 200) {
        fail(manifestLabel, `HTTP ${response.status} (expected HTTP 200)`);
        continue;
      }
      try {
        manifest = parseMultipartManifest(response);
        pass(manifestLabel, "Expo multipart manifest is reachable");
      } catch (error) {
        fail(manifestLabel, error.message);
        continue;
      }
    } catch (error) {
      fail(manifestLabel, `request failed: ${error.message}`);
      continue;
    }

    if (manifest.platform !== platform) {
      fail(
        `${platform} manifest platform`,
        `expected ${platform}, received ${manifest.platform || "missing"}`,
      );
    } else {
      pass(`${platform} manifest platform`, platform);
    }

    const hostUri = manifest.extra?.expoClient?.hostUri;
    if (hostUri !== deployment.domain) {
      fail(
        `${platform} hostUri`,
        `expected ${deployment.domain}, received ${hostUri || "missing"}; Railway may be serving an older deployment`,
      );
    } else {
      pass(`${platform} hostUri`, hostUri);
    }

    const debuggerHost = manifest.extra?.expoGo?.debuggerHost;
    if (debuggerHost !== deployment.domain) {
      fail(
        `${platform} debuggerHost`,
        `expected ${deployment.domain}, received ${debuggerHost || "missing"}; Railway may be serving an older deployment`,
      );
    } else {
      pass(`${platform} debuggerHost`, debuggerHost);
    }

    if (manifest.extra?.expoGo?.packagerOpts?.dev !== false) {
      fail(`${platform} packager mode`, "expoGo.packagerOpts.dev must be false");
    } else {
      pass(`${platform} packager mode`, "production mode");
    }

    const launchAssetUrl = manifest.launchAsset?.url;
    if (!isExpectedPublicUrl(launchAssetUrl, deployment.domain)) {
      fail(
        `${platform} bundle URL`,
        `must be an HTTPS URL on ${deployment.domain}`,
      );
    } else {
      pass(`${platform} bundle URL`, launchAssetUrl);
      try {
        const assetPath = new URL(launchAssetUrl).pathname;
        recordRoute(assetPath);
        const response = await requestImpl(deployment.baseUrl, assetPath, {
          timeoutMs,
          method: "GET",
          readBody: false,
        });
        if (response.status !== 200) {
          fail(`${platform} bundle availability`, `HTTP ${response.status}`);
        } else {
          pass(`${platform} bundle availability`, "bundle is reachable");
        }
      } catch (error) {
        fail(`${platform} bundle availability`, `request failed: ${error.message}`);
      }
    }

    if (!Array.isArray(manifest.assets)) {
      fail(`${platform} assets`, "manifest.assets must be an array");
      continue;
    }

    for (const [index, asset] of manifest.assets.entries()) {
      const label = `${platform} asset ${index + 1}`;
      if (!isExpectedPublicUrl(asset?.url, deployment.domain)) {
        fail(label, `must be an HTTPS URL on ${deployment.domain}`);
        continue;
      }
      pass(label, asset.url);
      try {
        const assetPath = new URL(asset.url).pathname;
        recordRoute(assetPath);
        const response = await requestImpl(deployment.baseUrl, assetPath, {
          timeoutMs,
          method: "GET",
          readBody: false,
        });
        if (response.status !== 200) {
          fail(`${label} availability`, `HTTP ${response.status}`);
        } else {
          pass(`${label} availability`, "asset is reachable");
        }
      } catch (error) {
        fail(`${label} availability`, `request failed: ${error.message}`);
      }
    }
  }

  const traversalPaths = [
    "/%2e%2e/ios/manifest.json",
    "/%2E%2E%2Fios/manifest.json",
    "/%2e%2e%5cios%5cmanifest.json",
    "/ios%5cbundle.js",
    "/ios\\bundle.js",
  ];
  for (const traversalPath of traversalPaths) {
    try {
      const publicPath = joinPublicPath(deployment.basePath, traversalPath);
      recordRoute(publicPath);
      const response = await requestImpl(
        deployment.baseUrl,
        publicPath,
        { timeoutMs, method: "GET", readBody: false },
      );
      if (response.status !== 403) {
        fail(
          `raw traversal ${traversalPath}`,
          `HTTP ${response.status} (expected HTTP 403)`,
        );
      } else {
        pass(`raw traversal ${traversalPath}`, "blocked with HTTP 403");
      }
    } catch (error) {
      fail(`raw traversal ${traversalPath}`, `request failed: ${error.message}`);
    }
  }

  return {
    ok: failures.length === 0,
    domain: deployment.domain,
    basePath: deployment.basePath,
    routes,
    checks,
    failures,
  };
}

function formatPublicDeploymentReport(report) {
  const deploymentUrl = report.domain
    ? `https://${report.domain}${report.basePath || "/"}`
    : "unavailable";
  const lines = [
    report.ok ? "PUBLIC DEPLOYMENT CHECK PASSED" : "PUBLIC DEPLOYMENT CHECK FAILED",
    `- domain: ${deploymentUrl}`,
    "- routes controlled:",
    ...(report.routes || []).map((route) => `  - ${route}`),
  ];

  if (report.ok) {
    lines.push("- all checks passed");
    return lines.join("\n");
  }

  return [
    ...lines,
    ...report.failures.map((failure) => `- ${failure}`),
    "",
    "Railway may be serving a previous deployment. Redeploy the mobile service, wait for it to become healthy, then run this check again before sharing the QR code.",
  ].join("\n");
}

module.exports = {
  checkPublicDeployment,
  formatPublicDeploymentReport,
  getDeploymentDomain,
  getPublicDeploymentBaseUrl,
  joinPublicPath,
  normalizeBasePath,
  normalizePublicDomain,
  requestPublicPath,
};