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
  require("expo-router/entry");
} catch (error) {
  // Some synchronous module-evaluation failures do not pass through
  // ErrorUtils. Record only the safe type/stage, then preserve RN's fatal path.
  startupRuntime.recordStartupFatalError(error);
  throw error;
}
