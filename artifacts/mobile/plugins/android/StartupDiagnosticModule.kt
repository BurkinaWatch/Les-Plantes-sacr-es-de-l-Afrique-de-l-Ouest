package __PACKAGE_NAME__

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ViewManager

internal class StartupDiagnosticPackage : ReactPackage {
  override fun createNativeModules(
    reactContext: ReactApplicationContext,
  ): List<NativeModule> = listOf(StartupDiagnosticModule(reactContext))

  override fun createViewManagers(
    reactContext: ReactApplicationContext,
  ): List<ViewManager<*, *>> = emptyList()
}

internal class StartupDiagnosticModule(
  private val reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "StartupDiagnostic"

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun recordStartupError(
    errorType: String,
    message: String,
    stack: String,
    stage: String,
    kind: String,
  ): Boolean {
    return StartupWatchdog.recordJavaScriptError(
      reactContext.applicationContext,
      errorType,
      message,
      stack,
      stage,
      kind,
    )
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun recordStartupMarker(marker: String): Boolean =
    StartupWatchdog.recordStartupMarker(marker)

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun recordStartupMetadata(
    runtimeVersion: String,
    channel: String,
    updateId: String,
    isEmbeddedLaunch: Boolean,
  ): Boolean =
    StartupWatchdog.recordStartupMetadata(
      runtimeVersion,
      channel,
      updateId,
      isEmbeddedLaunch,
    )

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getRuntimeInfo(): WritableMap = StartupWatchdog.getRuntimeInfo()
}
