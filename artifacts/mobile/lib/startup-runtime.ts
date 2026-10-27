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
};

type GlobalErrorHandler = (error: unknown, isFatal?: boolean) => void;

type ErrorUtilsLike = {
  getGlobalHandler?: () => GlobalErrorHandler | undefined;
  setGlobalHandler: (handler: GlobalErrorHandler) => void;
};

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

export function createStartupFatalCapture() {
  let stage: StartupStage = "javascript-entry";
  let ready = false;
  let fatalDiagnostic: StartupFatalDiagnostic | null = null;
  let installed = false;
  const listeners = new Set<
    (diagnostic: StartupFatalDiagnostic) => void
  >();

  return {
    setStage(nextStage: StartupStage) {
      stage = nextStage;
      if (nextStage === "route-laid-out") ready = true;
    },

    getDiagnostic() {
      return fatalDiagnostic;
    },

    subscribe(listener: (diagnostic: StartupFatalDiagnostic) => void) {
      listeners.add(listener);
      if (fatalDiagnostic) listener(fatalDiagnostic);
      return () => listeners.delete(listener);
    },

    install(errorUtils: ErrorUtilsLike | undefined) {
      if (installed || !errorUtils) return;
      installed = true;
      const previousHandler = errorUtils.getGlobalHandler?.();

      errorUtils.setGlobalHandler((error, isFatal) => {
        if (isFatal && !ready) {
          fatalDiagnostic = {
            errorType: safeErrorType(error),
            stage,
          };
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
          // Suppress the default fatal handler only when a mounted recovery
          // screen has actually been notified. Before that screen subscribes,
          // delegate so an early exception is not silently swallowed.
          if (recoveryNotified) return;
        }

        previousHandler?.(error, isFatal);
      });
    },
  };
}

const startupFatalCapture = createStartupFatalCapture();

export function setStartupStage(stage: StartupStage): void {
  startupFatalCapture.setStage(stage);
}

export function getStartupFatalDiagnostic(): StartupFatalDiagnostic | null {
  return startupFatalCapture.getDiagnostic();
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
