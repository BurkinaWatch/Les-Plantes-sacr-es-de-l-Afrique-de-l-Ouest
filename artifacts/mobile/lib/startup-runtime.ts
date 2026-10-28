export type StartupStage =
  | "javascript-entry"
  | "root-layout"
  | "providers"
  | "router"
  | "navigation"
  | "route-laid-out";

export type StartupErrorKind =
  | "fatal-js"
  | "promise-rejection"
  | "react-render-error";

export type StartupFatalDiagnostic = {
  errorType: string;
  stage: StartupStage;
  errorMessage: string;
  errorStack: string;
  errorKind: StartupErrorKind;
};

export type StartupRuntimeInfo = {
  abi: string;
  newArchitecture: boolean | null;
  jsEngine: string;
};

type GlobalErrorHandler = (error: unknown, isFatal?: boolean) => void;

export type NativeStartupDiagnosticBridge = {
  recordStartupError: (
    errorType: string,
    message: string,
    stack: string,
    stage: string,
    errorKind: string,
  ) => boolean;
  recordStartupMarker?: (marker: string) => boolean;
  recordStartupMetadata?: (
    runtimeVersion: string,
    channel: string,
    updateId: string,
    isEmbeddedLaunch: boolean,
  ) => boolean;
  getRuntimeInfo?: () => StartupRuntimeInfo;
};

type ErrorUtilsLike = {
  getGlobalHandler?: () => GlobalErrorHandler | undefined;
  setGlobalHandler: (handler: GlobalErrorHandler) => void;
  reportError?: (error: unknown) => void;
};

type HermesPromiseRejectionTracker = {
  enablePromiseRejectionTracker?: (options: {
    allRejections: boolean;
    onUnhandled: (id: number, rejection: unknown) => void;
    onHandled: (id: number, rejection: unknown) => void;
  }) => void;
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

function safeErrorStack(error: unknown, stackOverride?: string): string {
  const candidate =
    stackOverride ??
    (error instanceof Error
      ? error.stack
      : typeof error === "object" &&
          error !== null &&
          "stack" in error &&
          typeof error.stack === "string"
        ? error.stack
        : "");

  if (!candidate) return "Pile indisponible";

  const lines = candidate
    .split(/\r?\n/)
    .slice(0, 4)
    .map((line) => safeErrorMessage({ message: line }))
    .filter(Boolean);

  return lines.join("\n").slice(0, 500) || "Pile indisponible";
}

export function getSafeStartupErrorDetails(
  error: unknown,
  stackOverride?: string,
): Pick<StartupFatalDiagnostic, "errorType" | "errorMessage" | "errorStack"> {
  return {
    errorType: safeErrorType(error),
    errorMessage: safeErrorMessage(error),
    errorStack: safeErrorStack(error, stackOverride),
  };
}

function promiseRejectionAsError(rejection: unknown): Error {
  if (rejection instanceof Error) return rejection;
  if (
    typeof rejection === "object" &&
    rejection !== null &&
    "message" in rejection &&
    typeof rejection.message === "string"
  ) {
    const error = new Error(rejection.message);
    if ("stack" in rejection && typeof rejection.stack === "string") {
      error.stack = rejection.stack;
    }
    if ("name" in rejection && typeof rejection.name === "string") {
      error.name = rejection.name;
    }
    return error;
  }
  return new Error(typeof rejection === "string" ? rejection : "Promesse rejetée sans message");
}

export function createStartupFatalCapture() {
  let stage: StartupStage = "javascript-entry";
  let ready = false;
  let fatalDiagnostic: StartupFatalDiagnostic | null = null;
  let installed = false;
  let promiseTrackerInstalled = false;
  let nativeBridge: NativeStartupDiagnosticBridge | undefined;
  const listeners = new Set<
    (diagnostic: StartupFatalDiagnostic) => void
  >();

  const recordError = (
    error: unknown,
    errorKind: StartupErrorKind,
    stackOverride?: string,
    allowAfterReady = false,
    notifyListeners = true,
  ): boolean => {
    if ((ready && !allowAfterReady) || (fatalDiagnostic && !allowAfterReady)) {
      return false;
    }

    const safeDetails = getSafeStartupErrorDetails(error, stackOverride);
    fatalDiagnostic = {
      ...safeDetails,
      stage,
      errorKind,
    };
    try {
      const saved = nativeBridge?.recordStartupError(
        fatalDiagnostic.errorType,
        fatalDiagnostic.errorMessage,
        fatalDiagnostic.errorStack,
        fatalDiagnostic.stage,
        fatalDiagnostic.errorKind,
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
      `[Startup] ${errorKind} captured (${fatalDiagnostic.errorType}) at ${fatalDiagnostic.stage}`,
    );

    let recoveryNotified = false;
    if (notifyListeners) {
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
    }

    return recoveryNotified;
  };

  const recordFatalError = (error: unknown): boolean =>
    recordError(error, "fatal-js");

  return {
    setStage(nextStage: StartupStage) {
      stage = nextStage;
      if (nextStage === "route-laid-out") ready = true;
    },

    recordMarker(marker: string) {
      try {
        nativeBridge?.recordStartupMarker?.(marker);
      } catch (error) {
        console.warn(
          `[Startup] Native marker unavailable (${safeErrorType(error)})`,
        );
      }
    },

    setMetadata(metadata: {
      runtimeVersion: string | null | undefined;
      channel: string | null | undefined;
      updateId: string | null | undefined;
      isEmbeddedLaunch: boolean;
    }) {
      try {
        nativeBridge?.recordStartupMetadata?.(
          metadata.runtimeVersion ?? "",
          metadata.channel ?? "",
          metadata.updateId ?? "",
          metadata.isEmbeddedLaunch,
        );
      } catch (error) {
        console.warn(
          `[Startup] Native update metadata unavailable (${safeErrorType(error)})`,
        );
      }
    },

    getRuntimeInfo(): StartupRuntimeInfo | null {
      try {
        return nativeBridge?.getRuntimeInfo?.() ?? null;
      } catch {
        return null;
      }
    },

    setNativeBridge(bridge: NativeStartupDiagnosticBridge | undefined) {
      nativeBridge = bridge;
    },

    getDiagnostic() {
      return fatalDiagnostic;
    },

    recordPromiseRejection(rejection: unknown): boolean {
      if (ready) return false;
      return recordError(promiseRejectionAsError(rejection), "promise-rejection");
    },

    recordRenderError(error: unknown, stackOverride?: string): void {
      recordError(error, "react-render-error", stackOverride, true, false);
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

      const globalObject = globalThis as typeof globalThis & {
        __DEV__?: boolean;
        HermesInternal?: HermesPromiseRejectionTracker;
      };
      if (
        promiseTrackerInstalled ||
        globalObject.__DEV__ === true ||
        !globalObject.HermesInternal?.enablePromiseRejectionTracker
      ) {
        return;
      }

      try {
        globalObject.HermesInternal.enablePromiseRejectionTracker({
          allRejections: true,
          onUnhandled: (_id, rejection) => {
            if (ready) return;
            const error = promiseRejectionAsError(rejection);
            recordError(error, "promise-rejection");
            // Keep React Native's existing non-fatal error reporting path.
            errorUtils.reportError?.(error);
          },
          onHandled: () => {},
        });
        promiseTrackerInstalled = true;
      } catch (error) {
        console.warn(
          `[Startup] Promise rejection tracking unavailable (${safeErrorType(error)})`,
        );
      }
    },
  };
}

const startupFatalCapture = createStartupFatalCapture();

export function setStartupStage(stage: StartupStage): void {
  startupFatalCapture.setStage(SAFE_STAGES.has(stage) ? stage : "javascript-entry");
}

export function recordStartupMarker(marker: string): void {
  startupFatalCapture.recordMarker(marker);
}

export function setStartupUpdateMetadata(metadata: {
  runtimeVersion: string | null | undefined;
  channel: string | null | undefined;
  updateId: string | null | undefined;
  isEmbeddedLaunch: boolean;
}): void {
  startupFatalCapture.setMetadata(metadata);
}

export function getStartupRuntimeInfo(): StartupRuntimeInfo | null {
  return startupFatalCapture.getRuntimeInfo();
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

export function recordStartupPromiseRejection(error: unknown): boolean {
  return startupFatalCapture.recordPromiseRejection(error);
}

export function recordStartupRenderError(
  error: unknown,
  stackOverride?: string,
): void {
  startupFatalCapture.recordRenderError(error, stackOverride);
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
