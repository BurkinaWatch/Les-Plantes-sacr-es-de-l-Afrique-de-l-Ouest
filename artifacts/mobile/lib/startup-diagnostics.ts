import type { StartupStage } from "./startup-runtime";

export type StartupDiagnosticReason =
  | "route-timeout"
  | "react-render-error"
  | "runtime-js-error"
  | "promise-rejection";

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
  "runtime-js-error": "une erreur JavaScript fatale est survenue avant le premier écran",
  "promise-rejection": "une promesse JavaScript a échoué avant le premier écran",
};

const STAGE_LABELS: Record<StartupStage, string> = {
  "javascript-entry": "initialisation JavaScript",
  "root-layout": "initialisation de la structure de l’application",
  providers: "initialisation des services de l’application",
  router: "démarrage de la navigation",
  navigation: "chargement de l’écran initial",
  "route-laid-out": "premier écran affiché",
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

function safeRuntimeValue(value: unknown): string {
  return typeof value === "string" &&
    /^[A-Za-z0-9.+_-]{1,64}$/.test(value)
    ? value
    : "indisponible";
}

function safeAbi(value: unknown): string {
  if (typeof value !== "string") return "indisponible";
  const values = value
    .split(",")
    .map((abi) => abi.trim())
    .filter((abi) =>
      ["arm64-v8a", "armeabi-v7a", "armeabi", "x86", "x86_64"].includes(abi),
    );
  return values.length ? values.join(", ") : "indisponible";
}

function safeErrorDetails(
  errorType: unknown,
  errorMessage: unknown,
  errorStack: unknown,
): { errorType: string; errorMessage: string; errorStack: string } {
  const safeType =
    typeof errorType === "string" &&
    /^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(errorType)
      ? errorType
      : "Error";
  const sanitizeText = (value: string): string =>
    value
      .replace(/[\u0000-\u001f\u007f]/g, " ")
      .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[e-mail]")
      .replace(/\bBearer\s+\S+/gi, "Bearer [masqué]")
      .replace(/\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}(?:\.[A-Za-z0-9_-]{10,})?\b/g, "[jeton masqué]")
      .replace(/\bhttps?:\/\/\S+/gi, "[URL masquée]")
      .replace(
        /\b(authorization|token|access[_-]?token|refresh[_-]?token|password|passwd|secret|cookie|session|credential|email|e-mail|api[_-]?key)\b\s*[:=]\s*[^\s,;]+/gi,
        "$1=[masqué]",
      )
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180) || "Message indisponible";
  const safeMessage =
    typeof errorMessage === "string"
      ? sanitizeText(errorMessage)
      : "Message indisponible";
  const stackLines =
    typeof errorStack === "string"
      ? errorStack
          .split(/\r?\n/)
          .slice(0, 4)
          .map(sanitizeText)
          .filter((line) => line !== "Message indisponible")
      : [];
  return {
    errorType: safeType,
    errorMessage: safeMessage,
    errorStack: stackLines.join("\n").slice(0, 500) || "Pile indisponible",
  };
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
  runtimeVersion?: unknown;
  easChannel?: unknown;
  updateId?: unknown;
  isEmbeddedLaunch?: unknown;
  abi?: unknown;
  newArchitecture?: unknown;
  jsEngine?: unknown;
  stage?: StartupStage;
  routeLayoutObserved?: boolean;
  runtimeErrorType?: unknown;
  errorMessage?: unknown;
  errorStack?: unknown;
  errorKind?: unknown;
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
    `Runtime version : ${safeRuntimeValue(input.runtimeVersion)}`,
    `Canal EAS Update : ${safeRuntimeValue(input.easChannel)}`,
    `Mise à jour chargée : ${
      input.isEmbeddedLaunch === true
        ? "embedded"
        : safeRuntimeValue(input.updateId)
    }`,
    `ABI : ${safeAbi(input.abi)}`,
    `Nouvelle architecture : ${
      typeof input.newArchitecture === "boolean"
        ? input.newArchitecture
          ? "oui"
          : "non"
        : "indisponible"
    }`,
    `Moteur JavaScript : ${
      input.jsEngine === "Hermes" || input.jsEngine === "JSC"
        ? input.jsEngine
        : "indisponible"
    }`,
    `Étape : ${input.stage ? STAGE_LABELS[input.stage] : REASON_LABELS[input.reason]}`,
    ...(input.routeLayoutObserved === undefined
      ? []
      : [
          `Signal de mise en page du premier écran : ${
            input.routeLayoutObserved ? "reçu" : "non reçu"
          }`,
        ]),
    `Écran concerné : ${safeRoute(input.route)}`,
    ...(input.errorMessage !== undefined
      ? (() => {
          const details = safeErrorDetails(
            input.runtimeErrorType,
            input.errorMessage,
            input.errorStack,
          );
          return [
            `Type d’erreur JavaScript : ${details.errorType}`,
            `Catégorie : ${safeRuntimeValue(input.errorKind)}`,
            `Message court : ${details.errorMessage}`,
            "Début de pile :",
            details.errorStack,
          ];
        })()
      : input.runtimeErrorType
        ? [
            `Type d’erreur JavaScript : ${
              typeof input.runtimeErrorType === "string" &&
              /^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(input.runtimeErrorType)
                ? input.runtimeErrorType
                : "inconnu"
            }`,
          ]
        : []),
    "",
    "Rapport technique nettoyé : aucun identifiant, e-mail, jeton, paramètre de navigation ni journal système n’est inclus.",
  ].join("\n");
}

function safeApiHost(value: unknown): string {
  if (typeof value !== "string" || value.length > 512) return "indisponible";
  try {
    const hostname = new URL(value).hostname;
    return /^[a-zA-Z0-9.-]{1,253}$/.test(hostname)
      ? hostname
      : "indisponible";
  } catch {
    return "indisponible";
  }
}

export function buildAccessConnectionDiagnostic(input: {
  platform: string;
  osVersion: unknown;
  appVersion: unknown;
  buildNumber: unknown;
  apiBaseUrl: unknown;
  errorStatus?: unknown;
  errorType?: unknown;
  errorMessage?: unknown;
  occurredAt?: Date;
}): string {
  const occurredAt = input.occurredAt ?? new Date();
  const timestamp = Number.isNaN(occurredAt.getTime())
    ? "inconnu"
    : occurredAt.toISOString();
  const details = safeErrorDetails(input.errorType, input.errorMessage, undefined);
  const status =
    typeof input.errorStatus === "number" &&
    Number.isInteger(input.errorStatus) &&
    input.errorStatus >= 100 &&
    input.errorStatus <= 599
      ? `HTTP ${input.errorStatus}`
      : "aucune réponse HTTP";

  return [
    "Diagnostic de connexion — Les Plantes Sacrées",
    `Date UTC : ${timestamp}`,
    `Plateforme : ${safePlatform(input.platform)}`,
    `Version du système : ${safeVersion(input.osVersion)}`,
    `Version de l’application : ${safeVersion(input.appVersion)}`,
    `Numéro de build : ${safeBuildNumber(input.buildNumber)}`,
    `Hôte API : ${safeApiHost(input.apiBaseUrl)}`,
    `Résultat : ${status}`,
    `Type d’erreur : ${details.errorType}`,
    `Message technique : ${details.errorMessage}`,
    "",
    "Diagnostic limité à la connexion. Aucun compte, e-mail, jeton, en-tête ni paramètre de requête n’est inclus.",
  ].join("\n");
}
