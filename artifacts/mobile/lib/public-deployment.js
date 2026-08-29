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

module.exports = {
  getDeploymentDomain,
  normalizeBasePath,
  normalizePublicDomain,
};