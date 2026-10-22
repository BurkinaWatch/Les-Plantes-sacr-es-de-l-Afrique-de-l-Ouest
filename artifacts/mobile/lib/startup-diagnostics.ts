export type StartupDiagnosticReason = "route-timeout" | "react-render-error";

const ROUTE_LABELS: Record<string, string> = {
  "(auth)": "authentification",
  "(tabs)": "écran principal",
  "abonnement": "abonnement",
  "account-deletion": "suppression de compte",
  "animal": "fiche de contenu",
  "chat-totem": "chat",
  "error-fallback": "écran de secours",
  "plant": "fiche de contenu",
  "progression-spirituelle": "progression",
};

const REASON_LABELS: Record<StartupDiagnosticReason, string> = {
  "route-timeout": "l’écran initial n’a pas terminé son affichage dans le délai prévu",
  "react-render-error": "une erreur React a interrompu l’affichage",
};

function safeVersion(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") return "inconnue";
  const normalized = String(value).trim();
  return /^[a-zA-Z0-9.+_-]{1,32}$/.test(normalized) ? normalized : "inconnue";
}

function safeBuildNumber(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") return "inconnu";
  const normalized = String(value).trim();
  return /^\d{1,10}$/.test(normalized) ? normalized : "inconnu";
}

function safePlatform(value: string): string {
  return value === "android" || value === "ios" ? value : "autre";
}

function safeRoute(route: string): string {
  const firstSegment = route.split("/")[0] ?? "";
  return ROUTE_LABELS[firstSegment] ?? "autre";
}

export function buildStartupDiagnostic(input: {
  reason: StartupDiagnosticReason;
  route: string;
  platform: string;
  osVersion: unknown;
  appVersion: unknown;
  buildNumber: unknown;
  occurredAt?: Date;
}): string {
  const occurredAt = input.occurredAt ?? new Date();
  const timestamp = Number.isNaN(occurredAt.getTime())
    ? "inconnu"
    : occurredAt.toISOString();

  return [
    "Diagnostic de démarrage — Les Plantes Sacrées",
    `Date UTC : ${timestamp}`,
    `Plateforme : ${safePlatform(input.platform)}`,
    `Version du système : ${safeVersion(input.osVersion)}`,
    `Version de l’application : ${safeVersion(input.appVersion)}`,
    `Numéro de build : ${safeBuildNumber(input.buildNumber)}`,
    `Étape : ${REASON_LABELS[input.reason]}`,
    `Écran concerné : ${safeRoute(input.route)}`,
    "",
    "Rapport technique sans données de compte : aucun identifiant, e-mail, jeton, paramètre de navigation ou message d’erreur brut n’est inclus.",
  ].join("\n");
}
