// Install the sanitized fatal-error capture before Expo Router evaluates its
// entry module and route graph. Keep the Router require synchronous and after
// this setup so errors from its startup path retain the "javascript-entry"
// stage.
const startupRuntime = require("./lib/startup-runtime");
startupRuntime.setStartupStage("javascript-entry");
startupRuntime.installStartupFatalCapture();

try {
  const { NativeModules } = require("react-native");
  startupRuntime.setNativeStartupDiagnosticBridge(
    NativeModules?.StartupDiagnostic,
  );

  startupRuntime.recordStartupMarker("STARTUP_01_INDEX_JS_LOADED");
  try {
    const Updates = require("expo-updates");
    startupRuntime.setStartupUpdateMetadata({
      runtimeVersion: Updates.runtimeVersion,
      channel: Updates.channel,
      updateId: Updates.updateId,
      isEmbeddedLaunch: Updates.isEmbeddedLaunch === true,
    });
  } catch (metadataError) {
    console.warn(
      "[Startup] Expo Updates metadata unavailable:",
      metadataError instanceof Error ? metadataError.name : "Unknown error",
    );
  }

  require("expo-router/entry");
} catch (error) {
  // Some synchronous module-evaluation failures do not pass through
  // ErrorUtils. Record only the safe type/stage, then preserve RN's fatal path.
  startupRuntime.recordStartupFatalError(error);
  try {
    startupRuntime.recordStartupMarker("STARTUP_06_SPLASH_HIDE_ASYNC_CALLED");
    const SplashScreen = require("expo-splash-screen");
    void SplashScreen.hideAsync()
      .catch((splashError) => {
        console.warn(
          "[Startup] Splash hide failed after entry error:",
          splashError instanceof Error ? splashError.name : "Unknown error",
        );
      })
      .finally(() => {
        console.info("[Startup] Entry failure splash cleanup finished");
      });
  } catch (splashRequireError) {
    console.warn(
      "[Startup] Splash cleanup module unavailable:",
      splashRequireError instanceof Error
        ? splashRequireError.name
        : "Unknown error",
    );
  }
  throw error;
}
