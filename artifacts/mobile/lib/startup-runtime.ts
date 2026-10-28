export type StartupStage =
  | "javascript-entry"
  | "root-layout"
  | "providers"
  | "router"
  | "navigation"
  | "route-laid-out";

export type StartupFatalDiagnostic = {
  errorType: string;
  stage: StartupStage;
  errorMessage: string;
};

type GlobalErrorHandler = (error: unknown, isFatal?: boolean) => void;

export type NativeStartupDiagnosticBridge = {
  recordStartupError: (
    errorType: string,
    message: string,
    stage: string,
  ) => boolean;
};

type ErrorUtilsLike = {
  getGlobalHandler?: () => GlobalErrorHandler | undefined;
  setGlobalHandler: (handler: GlobalErrorHandler) => void;
};

const SAFE_STAGES = new Set<StartupStage>([
  "javascript-entry",
  "root-layout",
  "providers",
  "router",
  "navigation",
  "route-laid-out",
]);

function safeErrorType(error: unknown): string {
  const name =
    error instanceof Error
      ? error.name
      : typeof error === "object" &&
          error !== null &&
          "name" in error &&
          typeof error.name === "string"
        ? error.name
        : "Error";

  return /^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(name) ? name : "Error";
}

function safeErrorMessage(error: unknown): string {
  const rawMessage =
    error instanceof Error
      ? error.message
      : typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof error.message === "string"
        ? error.message
        : "";

  if (!rawMessage) return "Message indisponible";

  return rawMessage
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
}

export function createStartupFatalCapture() {
  let stage: StartupStage = "javascript-entry";
  let ready = false;
  let fatalDiagnostic: StartupFatalDiagnostic | null = null;
  let installed = false;
  let nativeBridge: NativeStartupDiagnosticBridge | undefined;
  const listeners = new Set<
    (diagnostic: StartupFatalDiagnostic) => void
  >();

  const recordFatalError = (error: unknown): boolean => {
    if (ready || fatalDiagnostic) return false;

    fatalDiagnostic = {
      errorType: safeErrorType(error),
      stage,
      errorMessage: safeErrorMessage(error),
    };
    try {
      const saved = nativeBridge?.recordStartupError(
        fatalDiagnostic.errorType,
        fatalDiagnostic.errorMessage,
        fatalDiagnostic.stage,
      );
      if (saved === false) {
        console.warn("[Startup] Native startup diagnostic was not saved");
      }
    } catch (bridgeError) {
      console.warn(
        `[Startup] Native diagnostic bridge unavailable (${safeErrorType(bridgeError)})`,
      );
    }
    console.error(
      `[Startup] Fatal JavaScript error before first route (${fatalDiagnostic.errorType}) at ${fatalDiagnostic.stage}`,
    );

    let recoveryNotified = false;
    for (const listener of listeners) {
      try {
        listener(fatalDiagnostic);
        recoveryNotified = true;
      } catch (listenerError) {
        console.error(
          `[Startup] Recovery listener failed (${safeErrorType(listenerError)})`,
        );
      }
    }

    return recoveryNotified;
  };

  return {
    setStage(nextStage: StartupStage) {
      stage = nextStage;
      if (nextStage === "route-laid-out") ready = true;
    },

    setNativeBridge(bridge: NativeStartupDiagnosticBridge | undefined) {
      nativeBridge = bridge;
    },

    getDiagnostic() {
      return fatalDiagnostic;
    },

    subscribe(listener: (diagnostic: StartupFatalDiagnostic) => void) {
      listeners.add(listener);
      if (fatalDiagnostic) listener(fatalDiagnostic);
      return () => listeners.delete(listener);
    },

    recordFatalError,

    install(errorUtils: ErrorUtilsLike | undefined) {
      if (installed || !errorUtils) return;
      installed = true;
      const previousHandler = errorUtils.getGlobalHandler?.();

      errorUtils.setGlobalHandler((error, isFatal) => {
        if (isFatal && !ready) {
          // Suppress the default fatal handler only when a mounted recovery
          // screen has actually been notified. Before that screen subscribes,
          // delegate so an early exception is not silently swallowed.
          if (recordFatalError(error)) return;
        }

        previousHandler?.(error, isFatal);
      });
    },
  };
}

const startupFatalCapture = createStartupFatalCapture();

export function setStartupStage(stage: StartupStage): void {
  startupFatalCapture.setStage(SAFE_STAGES.has(stage) ? stage : "javascript-entry");
}

export function setNativeStartupDiagnosticBridge(
  bridge: NativeStartupDiagnosticBridge | undefined,
): void {
  startupFatalCapture.setNativeBridge(bridge);
}

export function getStartupFatalDiagnostic(): StartupFatalDiagnostic | null {
  return startupFatalCapture.getDiagnostic();
}

export function recordStartupFatalError(error: unknown): boolean {
  return startupFatalCapture.recordFatalError(error);
}

export function subscribeToStartupFatal(
  listener: (diagnostic: StartupFatalDiagnostic) => void,
): () => void {
  return startupFatalCapture.subscribe(listener);
}

export function installStartupFatalCapture(): void {
  const errorUtils = (
    globalThis as typeof globalThis & { ErrorUtils?: ErrorUtilsLike }
  ).ErrorUtils;
  startupFatalCapture.install(errorUtils);
}
