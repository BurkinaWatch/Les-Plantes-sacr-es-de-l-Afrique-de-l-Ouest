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

const STATIC_ROOT = path.resolve(__dirname, "..", "static-build");
const TEMPLATE_PATH = path.resolve(__dirname, "templates", "landing-page.html");
const basePath = (process.env.BASE_PATH || "/").replace(/\/+$/, "");

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
    const diskPath = path.join(root, entry.name);
    const urlPath = `${prefix}/${entry.name}`.replace(/\/+/g, "/");
    if (entry.isDirectory()) {
      for (const [nestedUrl, nestedDiskPath] of buildStaticFileIndex(diskPath, urlPath)) {
        index.set(nestedUrl, nestedDiskPath);
      }
    } else if (entry.isFile()) {
      index.set(urlPath, diskPath);
    }
  }
  return index;
}

function serveManifest(platform, res, staticFileIndex) {
  const manifestPath = staticFileIndex.get(`/${platform}/manifest.json`);

  if (!manifestPath || !fs.existsSync(manifestPath)) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ error: `Manifest not found for platform: ${platform}` }),
    );
    return;
  }

  const manifestJson = fs.readFileSync(manifestPath, "utf-8");
  const boundary = "expo-manifest-boundary";
  const body = [
    `--${boundary}`,
    'Content-Type: application/json',
    'Content-Disposition: inline; name="manifest"',
    "",
    manifestJson,
    `--${boundary}--`,
  ].join("\r\n");

  res.writeHead(200, {
    "content-type": `multipart/mixed; boundary=${boundary}`,
    "expo-protocol-version": "1",
    "expo-sfv-version": "0",
  });
  res.end(body);
}

function serveLandingPage(req, res, landingPageTemplate, appName) {
  const forwardedProto = String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim().toLowerCase();
  const protocol = forwardedProto === "http" ? "http" : "https";
  const rawHost = String(req.headers["x-forwarded-host"] || req.headers["host"] || "");
  const host = rawHost.split(",")[0].trim();
  const safeHost = /^[a-z0-9.-]+(?::\d{1,5})?$/i.test(host) ? host : "localhost";
  const baseUrl = `${protocol}://${safeHost}`;
  const expsUrl = safeHost;
  const escapeHtml = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

  const html = landingPageTemplate
    .replace(/BASE_URL_PLACEHOLDER/g, escapeHtml(baseUrl))
    .replace(/EXPS_URL_PLACEHOLDER/g, escapeHtml(expsUrl))
    .replace(/APP_NAME_PLACEHOLDER/g, escapeHtml(appName));

  res.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
    "x-content-type-options": "nosniff",
    "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; img-src data:; script-src 'unsafe-inline'; frame-ancestors 'none'",
  });
  res.end(html);
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

  if (decodedPath.includes("\0") || decodedPath.includes("\\") || decodedPath.split("/").includes("..")) {
    res.writeHead(403, { "x-content-type-options": "nosniff" });
    res.end("Forbidden");
    return;
  }

  const filePath = staticFileIndex.get(decodedPath);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { "x-content-type-options": "nosniff" });
    res.end("Not Found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const content = fs.readFileSync(filePath);
  res.writeHead(200, {
    "content-type": contentType,
    "x-content-type-options": "nosniff",
    "content-security-policy": "default-src 'none'; frame-ancestors 'none'",
  });
  res.end(content);
}

const landingPageTemplate = fs.readFileSync(TEMPLATE_PATH, "utf-8");
const appName = getAppName();
const staticFileIndex = buildStaticFileIndex(STATIC_ROOT);

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  let pathname = url.pathname;

  if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    pathname = pathname.slice(basePath.length) || "/";
  }

  if (pathname === "/" || pathname === "/manifest") {
    const platform = req.headers["expo-platform"];
    if (platform === "ios" || platform === "android") {
      return serveManifest(platform, res);
    }

    if (pathname === "/") {
      return serveLandingPage(req, res, landingPageTemplate, appName);
    }
  }

  serveStaticFile(pathname, res, staticFileIndex);
});

const port = parseInt(process.env.PORT || "3000", 10);
server.listen(port, "0.0.0.0", () => {
  console.log(`Serving static Expo build on port ${port}`);
});
