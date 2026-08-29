/**
 * Standalone production server for Expo static builds.
 *
 * Serves the output of build.js (static-build/) with two special routes:
 * - GET / or /manifest with expo-platform header → platform manifest JSON
 * - GET / without expo-platform → landing page HTML
 * Everything else falls through to static file serving from ./static-build/.
 *
 * Zero external dependencies — uses only Node.js built-ins (http, fs, path).
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { fileURLToPath, pathToFileURL } = require("url");
const {
  getDeploymentDomain,
  normalizeBasePath,
  normalizePublicDomain,
} = require("../lib/public-deployment");

const STATIC_ROOT = process.env.STATIC_ROOT
  ? path.resolve(process.env.STATIC_ROOT)
  : path.resolve(__dirname, "..", "static-build");
const TEMPLATE_PATH = path.resolve(__dirname, "templates", "landing-page.html");
let basePath;
try {
  basePath = normalizeBasePath(process.env.BASE_PATH);
} catch (error) {
  console.error(`Invalid deployment configuration: ${error.message}`);
  process.exit(1);
}

let configuredPublicDomain = null;
if (process.env.RAILWAY_PUBLIC_DOMAIN || process.env.EXPO_PUBLIC_DOMAIN) {
  try {
    configuredPublicDomain = getDeploymentDomain();
  } catch (error) {
    console.error(`Invalid deployment domain: ${error.message}`);
    process.exit(1);
  }
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".map": "application/json",
};

function getAppName() {
  try {
    const appJsonPath = path.resolve(__dirname, "..", "app.json");
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf-8"));
    return appJson.expo?.name || "App Landing Page";
  } catch {
    return "App Landing Page";
  }
}

/**
 * Index files from the trusted build directory once at startup. Requests only
 * look up URL paths in this map; they never construct filesystem paths from
 * URL-controlled data.
 */
function buildStaticFileIndex(root, prefix = "") {
  const index = new Map();
  if (!fs.existsSync(root)) return index;

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fileName = entry.name;
    if (!/^[a-zA-Z0-9._-]+$/.test(fileName) || fileName === "." || fileName === "..") continue;
    const diskPath = fileURLToPath(new URL(fileName, pathToFileURL(`${root}${path.sep}`)));
    const urlPath = `${prefix}/${fileName}`.replace(/\/+/g, "/");
    if (entry.isDirectory()) {
      for (const [nestedUrl, nestedFile] of buildStaticFileIndex(diskPath, urlPath)) {
        index.set(nestedUrl, nestedFile);
      }
    } else if (entry.isFile()) {
      index.set(urlPath, {
        content: fs.readFileSync(diskPath),
        extension: path.extname(fileName).toLowerCase(),
      });
    }
  }
  return index;
}

function serveManifest(platform, res, staticFileIndex) {
  const manifestFile = staticFileIndex.get(`/${platform}/manifest.json`);

  if (!manifestFile) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ error: `Manifest not found for platform: ${platform}` }),
    );
    return;
  }

  const manifestJson = manifestFile.content.toString("utf-8");
  const boundary = "expo-manifest-boundary";
  const body = [
    `--${boundary}`,
    'Content-Type: application/json',
    'Content-Disposition: form-data; name="manifest"',
    "",
    manifestJson,
    `--${boundary}--`,
  ].join("\r\n");

  res.writeHead(200, {
    "content-type": `multipart/mixed; boundary=${boundary}`,
    "expo-protocol-version": "0",
    "expo-sfv-version": "0",
    "cache-control": "private, max-age=0",
    "x-content-type-options": "nosniff",
  });
  res.end(body);
}

function isSafeRequestHost(value) {
  return /^(?:localhost|[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+|127(?:\.\d{1,3}){3})(?::\d{1,5})?$/i.test(value);
}

function getFirstForwardedValue(value) {
  return String(value || "").split(",")[0].trim();
}

function getLandingOrigin(req) {
  if (configuredPublicDomain) {
    return {
      baseUrl: `https://${configuredPublicDomain}`,
      expsUrl: configuredPublicDomain,
    };
  }

  const forwardedHost = getFirstForwardedValue(req.headers["x-forwarded-host"]);
  const requestHost = getFirstForwardedValue(req.headers.host);
  const host = isSafeRequestHost(forwardedHost)
    ? forwardedHost
    : isSafeRequestHost(requestHost)
      ? requestHost
      : "localhost";
  const forwardedProto = getFirstForwardedValue(req.headers["x-forwarded-proto"]).toLowerCase();
  const protocol = forwardedProto === "http" ? "http" : "https";

  return {
    baseUrl: `${protocol}://${host}`,
    expsUrl: host,
  };
}

function serveLandingPage(req, res, landingPageTemplate, appName) {
  const { baseUrl, expsUrl } = getLandingOrigin(req);
  const scriptNonce = crypto.randomBytes(16).toString("base64");
  const escapeHtml = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

  const html = landingPageTemplate
    .replace(/BASE_URL_PLACEHOLDER/g, escapeHtml(baseUrl))
    .replace(/EXPS_URL_PLACEHOLDER/g, escapeHtml(expsUrl))
    .replace(/APP_NAME_PLACEHOLDER/g, escapeHtml(appName))
    .replace(/SCRIPT_NONCE_PLACEHOLDER/g, scriptNonce);

  res.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
    "x-content-type-options": "nosniff",
    "cache-control": "no-store",
    "referrer-policy": "no-referrer",
    "x-frame-options": "DENY",
    "content-security-policy": [
      "default-src 'none'",
      "base-uri 'none'",
      "connect-src 'none'",
      "form-action 'none'",
      "frame-ancestors 'none'",
      "img-src data:",
      "script-src 'self' https://unpkg.com 'nonce-" + scriptNonce + "'",
      "style-src 'unsafe-inline'",
    ].join("; "),
  });
  res.end(html);
}

function isUnsafeDecodedPath(decodedPath) {
  return (
    decodedPath.includes("\0") ||
    decodedPath.includes("\\") ||
    decodedPath.split("/").includes("..")
  );
}

function serveStaticFile(urlPath, res, staticFileIndex) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(urlPath);
  } catch {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (isUnsafeDecodedPath(decodedPath)) {
    res.writeHead(403, { "x-content-type-options": "nosniff" });
    res.end("Forbidden");
    return;
  }

  const file = staticFileIndex.get(decodedPath);
  if (!file) {
    res.writeHead(404, { "x-content-type-options": "nosniff" });
    res.end("Not Found");
    return;
  }

  const contentType = MIME_TYPES[file.extension] || "application/octet-stream";
  res.writeHead(200, {
    "content-type": contentType,
    "x-content-type-options": "nosniff",
    "cache-control": urlPath.endsWith(".json")
      ? "no-store"
      : "public, max-age=31536000, immutable",
    "referrer-policy": "no-referrer",
    "content-security-policy": "default-src 'none'; frame-ancestors 'none'",
  });
  res.end(file.content);
}

const landingPageTemplate = fs.readFileSync(TEMPLATE_PATH, "utf-8");
const appName = getAppName();
const staticFileIndex = buildStaticFileIndex(STATIC_ROOT);

const server = http.createServer((req, res) => {
  const rawPathname = (req.url || "/").split("?")[0] || "/";
  let decodedRawPathname;
  try {
    decodedRawPathname = decodeURIComponent(rawPathname);
  } catch {
    return serveStaticFile(rawPathname, res, staticFileIndex);
  }

  // URL normalizes encoded dot segments and backslashes. Check the raw
  // request target first so those characters cannot become a valid index key.
  if (isUnsafeDecodedPath(decodedRawPathname)) {
    return serveStaticFile(rawPathname, res, staticFileIndex);
  }

  let url;
  try {
    url = new URL(req.url || "/", "http://localhost");
  } catch {
    res.writeHead(400, { "x-content-type-options": "nosniff" });
    res.end("Bad Request");
    return;
  }
  let pathname = url.pathname;

  if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    pathname = pathname.slice(basePath.length) || "/";
  }

  const headerPlatform = req.headers["expo-platform"];
  const routePlatform =
    pathname === "/ios/manifest"
      ? "ios"
      : pathname === "/android/manifest"
        ? "android"
        : null;
  if (routePlatform && headerPlatform && headerPlatform !== routePlatform) {
    res.writeHead(400, { "x-content-type-options": "nosniff" });
    res.end("Platform mismatch");
    return;
  }

  const platform =
    headerPlatform === "ios" || headerPlatform === "android"
      ? headerPlatform
      : routePlatform;

  if (
    (pathname === "/" || pathname === "/manifest" || routePlatform) &&
    (platform === "ios" || platform === "android")
  ) {
    return serveManifest(platform, res, staticFileIndex);
  }

  if (pathname === "/") {
    return serveLandingPage(req, res, landingPageTemplate, appName);
  }

  serveStaticFile(pathname, res, staticFileIndex);
});

const port = parseInt(process.env.PORT || "3000", 10);
server.listen(port, "0.0.0.0", () => {
  console.log(`Serving static Expo build on port ${port}`);
});
