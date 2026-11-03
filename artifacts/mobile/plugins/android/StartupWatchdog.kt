package __PACKAGE_NAME__

import android.app.Activity
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast
import com.facebook.react.ReactActivity
import com.facebook.react.ReactHost
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactMarker
import com.facebook.react.bridge.ReactMarkerConstants
import com.facebook.react.bridge.WritableMap
import expo.modules.splashscreen.SplashScreenManager
import java.lang.ref.WeakReference

/**
 * Reveals a copyable native startup report if React Native never shows its
 * first view. This still works when the JavaScript root layout cannot mount.
 */
internal object StartupWatchdog {
  private const val TIMEOUT_MS = 12_000L
  private const val MAX_MARKERS = 40
  private const val BACKGROUND = 0xFF0A1F0C.toInt()
  private const val CARD = 0xFF1D3D20.toInt()
  private const val GOLD = 0xFFD4A017.toInt()
  private const val IVORY = 0xFFF0EAD6.toInt()
  private const val MUTED = 0xFFB6C5AD.toInt()
  private const val DIAGNOSTIC_PREFERENCES = "startup_diagnostic"
  private const val ERROR_TYPE_KEY = "javascript_error_type"
  private const val ERROR_MESSAGE_KEY = "javascript_error_message"
  private const val ERROR_STACK_KEY = "javascript_error_stack"
  private const val ERROR_STAGE_KEY = "javascript_error_stage"
  private const val ERROR_KIND_KEY = "javascript_error_kind"
  private val startupStepLabels = mapOf(
    "STARTUP_01_INDEX_JS_LOADED" to "01 index.js chargé",
    "STARTUP_02_ROOT_LAYOUT_MOUNTED" to "02 _layout monté",
    "STARTUP_03_PROVIDERS_MOUNTED" to "03 providers montés",
    "STARTUP_04_STACK_MOUNTED" to "04 Stack monté",
    "STARTUP_05_FIRST_ON_LAYOUT" to "05 premier onLayout reçu",
    "STARTUP_06_SPLASH_HIDE_ASYNC_CALLED" to "06 hideAsync appelé",
    "STARTUP_07_CONTENT_APPEARED_NATIVE" to "07 CONTENT_APPEARED reçu côté natif",
  )
  private val safeStartupStages = setOf(
    "javascript-entry",
    "root-layout",
    "providers",
    "router",
    "navigation",
    "route-laid-out",
  )

  private val handler = Handler(Looper.getMainLooper())
  private data class JavaScriptStartupError(
    val errorType: String,
    val message: String,
    val stack: String,
    val stage: String,
    val kind: String,
  )

  private data class StartupUpdateMetadata(
    val runtimeVersion: String,
    val channel: String,
    val updateId: String,
    val isEmbeddedLaunch: Boolean,
  )

  private data class StartupMarker(
    val timestampUptimeMs: Long,
    val sequence: Long,
    val displayValue: String,
  )

  private val markers = mutableListOf<StartupMarker>()
  @Volatile private var activityRef: WeakReference<Activity>? = null
  private var applicationContext: Context? = null
  @Volatile private var reactContentAppeared = false
  @Volatile private var javascriptStartupError: JavaScriptStartupError? = null
  @Volatile private var updateMetadata: StartupUpdateMetadata? = null
  @Volatile private var startedAtElapsedRealtimeMs = 0L
  @Volatile private var startedAtUptimeMs = 0L
  private var markerSequence = 0L
  private var overlay: View? = null
  @Volatile private var overlayReportView: TextView? = null

  private val fabricOnlyMarkers = setOf(
    ReactMarkerConstants.LOAD_REACT_NATIVE_FABRIC_SO_FILE_START,
    ReactMarkerConstants.LOAD_REACT_NATIVE_FABRIC_SO_FILE_END,
    ReactMarkerConstants.FABRIC_COMMIT_START,
    ReactMarkerConstants.FABRIC_COMMIT_END,
    ReactMarkerConstants.FABRIC_FINISH_TRANSACTION_START,
    ReactMarkerConstants.FABRIC_FINISH_TRANSACTION_END,
    ReactMarkerConstants.FABRIC_DIFF_START,
    ReactMarkerConstants.FABRIC_DIFF_END,
    ReactMarkerConstants.FABRIC_LAYOUT_START,
    ReactMarkerConstants.FABRIC_LAYOUT_END,
    ReactMarkerConstants.FABRIC_LAYOUT_AFFECTED_NODES,
    ReactMarkerConstants.FABRIC_BATCH_EXECUTION_START,
    ReactMarkerConstants.FABRIC_BATCH_EXECUTION_END,
    ReactMarkerConstants.FABRIC_UPDATE_UI_MAIN_THREAD_START,
    ReactMarkerConstants.FABRIC_UPDATE_UI_MAIN_THREAD_END,
  )

  private val interestingMarkers = setOf(
    "APP_STARTUP_START",
    "APP_STARTUP_END",
    "REACT_CONTEXT_INITIALIZED",
    "REACT_CONTEXT_ALREADY_INITIALIZED",
    "BUILD_REACT_INSTANCE_MANAGER_START",
    "BUILD_REACT_INSTANCE_MANAGER_END",
    "CREATE_REACT_CONTEXT_START",
    "CREATE_REACT_CONTEXT_END",
    "REACT_CONTEXT_THREAD_START",
    "REACT_CONTEXT_THREAD_END",
    "PRE_SETUP_REACT_CONTEXT_START",
    "PRE_SETUP_REACT_CONTEXT_END",
    "SETUP_REACT_CONTEXT_START",
    "SETUP_REACT_CONTEXT_END",
    "NATIVE_MODULE_SETUP_START",
    "NATIVE_MODULE_SETUP_END",
    "INIT_REACT_RUNTIME_START",
    "INIT_REACT_RUNTIME_END",
    "REACT_BRIDGELESS_LOADING_START",
    "REACT_BRIDGELESS_LOADING_END",
    "PRE_RUN_JS_BUNDLE_START",
    "RUN_JS_BUNDLE_START",
    "RUN_JS_BUNDLE_END",
    "ATTACH_MEASURED_ROOT_VIEWS_START",
    "ATTACH_MEASURED_ROOT_VIEWS_END",
    "CONTENT_APPEARED",
  ) + fabricOnlyMarkers.map { it.name } + startupStepLabels.keys

  private val timeout = Runnable {
    val activity = activityRef?.get() ?: return@Runnable
    if (!reactContentAppeared && !activity.isFinishing && !activity.isDestroyed) {
      showDiagnostic(activity)
    }
  }

  private val markerListener: ReactMarker.MarkerListener = ReactMarker.MarkerListener { marker, _, _ ->
    // ReactMarker.logMarker() also forwards each generic marker to Fabric listeners.
    // Fabric-only markers are recorded from that channel below, so skip them here.
    if (marker !in fabricOnlyMarkers) {
      recordMarker(marker.name, SystemClock.uptimeMillis())
    }

    if (marker == ReactMarkerConstants.CONTENT_APPEARED) {
      recordMarker("STARTUP_07_CONTENT_APPEARED_NATIVE", SystemClock.uptimeMillis())
      reactContentAppeared = true
      handler.post {
        handler.removeCallbacks(timeout)
        applicationContext?.let(::clearJavaScriptError)
        ReactMarker.removeListener(markerListener)
        ReactMarker.removeFabricListener(fabricMarkerListener)
        removeReactHostListener()
        removeOverlay()
      }
    }
  }

  // Fabric markers use a separate ReactMarker listener channel. Registering only
  // MarkerListener silently misses commits and UI mounting in the new architecture.
  private val fabricMarkerListener = object : ReactMarker.FabricMarkerListener {
    override fun logFabricMarker(
      name: ReactMarkerConstants,
      tag: String?,
      instanceKey: Int,
      timestamp: Long,
    ) {
      // ReactMarker.logMarker() forwards generic events to this channel too.
      // Only keep Fabric-only events here, using React Native's event timestamp.
      if (name in fabricOnlyMarkers) {
        recordMarker(name.name, timestamp)
      }
    }
  }

  private val reactInstanceListener = object : ReactInstanceEventListener {
    override fun onReactContextInitialized(context: ReactContext) {
      recordMarker("REACT_CONTEXT_INITIALIZED", SystemClock.uptimeMillis())
    }
  }

  @Volatile private var reactHostRef: WeakReference<ReactHost>? = null

  private fun recordMarker(name: String, timestampUptimeMs: Long) {
    if (name !in interestingMarkers) return
    val startUptimeMs = startedAtUptimeMs
    if (startUptimeMs <= 0L || timestampUptimeMs < startUptimeMs) return

    val elapsedTenths = (timestampUptimeMs - startUptimeMs) / 100L
    val displayName = startupStepLabels[name] ?: name
    val displayValue =
      "${elapsedTenths / 10}.${elapsedTenths % 10}s  $displayName"
    synchronized(markers) {
      markers.add(StartupMarker(timestampUptimeMs, markerSequence++, displayValue))
      markers.sortWith(
        compareBy<StartupMarker> { it.timestampUptimeMs }.thenBy { it.sequence },
      )
      while (markers.size > MAX_MARKERS) markers.removeAt(0)
    }
  }

  private fun removeReactHostListener() {
    reactHostRef?.get()?.removeReactInstanceEventListener(reactInstanceListener)
    reactHostRef = null
  }

  fun attach(activity: Activity) {
    handler.removeCallbacks(timeout)
    ReactMarker.removeListener(markerListener)
    ReactMarker.removeFabricListener(fabricMarkerListener)
    removeReactHostListener()
    activityRef = WeakReference(activity)
    applicationContext = activity.applicationContext
    reactContentAppeared = false
    javascriptStartupError = readJavaScriptError(activity)
    startedAtElapsedRealtimeMs = SystemClock.elapsedRealtime()
    startedAtUptimeMs = SystemClock.uptimeMillis()
    synchronized(markers) { markers.clear() }
    markerSequence = 0L
    overlay = null
    ReactMarker.addListener(markerListener)
    ReactMarker.addFabricListener(fabricMarkerListener)

    handler.postDelayed(timeout, TIMEOUT_MS)
  }

  // MainActivity calls this after ReactActivity has created its delegate and host.
  fun observeReactHost(activity: Activity) {
    val reactHost = (activity as? ReactActivity)?.reactDelegate?.reactHost
    if (reactHost != null) {
      reactHostRef = WeakReference(reactHost)
      reactHost.addReactInstanceEventListener(reactInstanceListener)
      if (reactHost.currentReactContext != null) {
        recordMarker("REACT_CONTEXT_ALREADY_INITIALIZED", SystemClock.uptimeMillis())
      }
    }
  }

  fun detach(activity: Activity) {
    if (activityRef?.get() !== activity) return
    handler.removeCallbacks(timeout)
    ReactMarker.removeListener(markerListener)
    ReactMarker.removeFabricListener(fabricMarkerListener)
    removeReactHostListener()
    removeOverlay()
    activityRef = null
  }

  fun recordJavaScriptError(
    context: Context,
    errorType: String,
    message: String,
    stack: String,
    stage: String,
    kind: String,
  ): Boolean {
    val safeError = JavaScriptStartupError(
      errorType = sanitizeErrorType(errorType),
      message = sanitizeErrorMessage(message),
      stack = sanitizeErrorStack(stack),
      stage = stage.takeIf { it in safeStartupStages } ?: "javascript-entry",
      kind = kind.takeIf { it in setOf("fatal-js", "promise-rejection", "react-render-error") }
        ?: "fatal-js",
    )
    javascriptStartupError = safeError
    val saved = context.getSharedPreferences(DIAGNOSTIC_PREFERENCES, Context.MODE_PRIVATE)
      .edit()
      .putString(ERROR_TYPE_KEY, safeError.errorType)
      .putString(ERROR_MESSAGE_KEY, safeError.message)
      .putString(ERROR_STACK_KEY, safeError.stack)
      .putString(ERROR_STAGE_KEY, safeError.stage)
      .putString(ERROR_KIND_KEY, safeError.kind)
      .commit()

    handler.post {
      val activity = activityRef?.get() ?: return@post
      overlayReportView?.text = buildReport(activity)
    }
    return saved
  }

  fun recordStartupMarker(marker: String): Boolean {
    if (marker !in startupStepLabels) return false
    val timestamp = SystemClock.uptimeMillis()
    val alreadyRecorded = synchronized(markers) {
      markers.any { it.displayValue.endsWith(startupStepLabels.getValue(marker)) }
    }
    if (!alreadyRecorded) recordMarker(marker, timestamp)
    return true
  }

  fun recordStartupMetadata(
    runtimeVersion: String,
    channel: String,
    updateId: String,
    isEmbeddedLaunch: Boolean,
  ): Boolean {
    updateMetadata = StartupUpdateMetadata(
      runtimeVersion = sanitizeMetadata(runtimeVersion, 40).ifEmpty {
        embeddedRuntimeVersion(applicationContext)
      },
      channel = sanitizeChannel(channel),
      updateId = sanitizeUpdateId(updateId),
      isEmbeddedLaunch = isEmbeddedLaunch,
    )
    handler.post {
      val activity = activityRef?.get() ?: return@post
      overlayReportView?.text = buildReport(activity)
    }
    return true
  }

  fun getRuntimeInfo(): WritableMap =
    Arguments.createMap().apply {
      putString("abi", Build.SUPPORTED_ABIS.joinToString(",").take(120))
      putBoolean("newArchitecture", BuildConfig.IS_NEW_ARCHITECTURE_ENABLED)
      putString("jsEngine", if (BuildConfig.IS_HERMES_ENABLED) "Hermes" else "JSC")
    }

  private fun readJavaScriptError(context: Context): JavaScriptStartupError? {
    val preferences =
      context.getSharedPreferences(DIAGNOSTIC_PREFERENCES, Context.MODE_PRIVATE)
    val errorType = preferences.getString(ERROR_TYPE_KEY, null) ?: return null
    val message = preferences.getString(ERROR_MESSAGE_KEY, null) ?: return null
    val stack = preferences.getString(ERROR_STACK_KEY, null) ?: "Pile indisponible"
    val stage = preferences.getString(ERROR_STAGE_KEY, null) ?: return null
    val kind = preferences.getString(ERROR_KIND_KEY, null) ?: "fatal-js"
    return JavaScriptStartupError(
      errorType = sanitizeErrorType(errorType),
      message = sanitizeErrorMessage(message),
      stack = sanitizeErrorStack(stack),
      stage = stage.takeIf { it in safeStartupStages } ?: "javascript-entry",
      kind = kind.takeIf { it in setOf("fatal-js", "promise-rejection", "react-render-error") }
        ?: "fatal-js",
    )
  }

  private fun clearJavaScriptError(context: Context) {
    javascriptStartupError = null
    context.getSharedPreferences(DIAGNOSTIC_PREFERENCES, Context.MODE_PRIVATE)
      .edit()
      .remove(ERROR_TYPE_KEY)
      .remove(ERROR_MESSAGE_KEY)
      .remove(ERROR_STACK_KEY)
      .remove(ERROR_STAGE_KEY)
      .remove(ERROR_KIND_KEY)
      .apply()
  }

  private fun sanitizeErrorType(value: String): String =
    value.takeIf { it.matches(Regex("[A-Za-z][A-Za-z0-9_]{0,39}")) } ?: "Error"

  private fun sanitizeMetadata(value: String, maxLength: Int): String =
    value.trim().takeIf { it.matches(Regex("[A-Za-z0-9.+_-]{1,$maxLength}")) } ?: ""

  private fun sanitizeChannel(value: String): String =
    value.trim().takeIf { it.matches(Regex("[A-Za-z0-9._-]{1,64}")) } ?: ""

  private fun sanitizeUpdateId(value: String): String =
    value.trim().takeIf {
      it == "embedded" || it.matches(
        Regex("[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}"),
      )
    } ?: ""

  private fun sanitizeErrorMessage(value: String): String {
    val sanitized = value
      .replace(Regex("[\\u0000-\\u001f\\u007f]"), " ")
      .replace(Regex("[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}", RegexOption.IGNORE_CASE), "[e-mail]")
      .replace(Regex("Bearer\\s+\\S+", RegexOption.IGNORE_CASE), "Bearer [masqué]")
      .replace(Regex("\\beyJ[A-Za-z0-9_-]{10,}\\.[A-Za-z0-9_-]{10,}(?:\\.[A-Za-z0-9_-]{10,})?\\b"), "[jeton masqué]")
      .replace(Regex("https?://\\S+", RegexOption.IGNORE_CASE), "[URL masquée]")
      .replace(
        Regex(
          "\\b(?:authorization|token|access[_-]?token|refresh[_-]?token|password|passwd|secret|cookie|session|credential|email|e-mail|api[_-]?key)\\b\\s*[:=]\\s*[^\\s,;]+",
          RegexOption.IGNORE_CASE,
        ),
        "[valeur sensible masquée]",
      )
      .replace(Regex("\\s+"), " ")
      .trim()
      .take(180)
    return sanitized.ifEmpty { "Message indisponible" }
  }

  private fun sanitizeErrorStack(value: String): String {
    val lines = value
      .lineSequence()
      .take(4)
      .map(::sanitizeErrorMessage)
      .filter { it != "Message indisponible" }
      .toList()
    return lines.joinToString("\n").take(500).ifEmpty { "Pile indisponible" }
  }

  private fun embeddedRuntimeVersion(context: Context?): String {
    if (context == null) return "inconnue"
    val resourceId = context.resources.getIdentifier(
      "expo_runtime_version",
      "string",
      context.packageName,
    )
    return if (resourceId == 0) "inconnue" else context.getString(resourceId)
  }

  private fun showDiagnostic(activity: Activity) {
    if (reactContentAppeared || overlay != null) return
    val content = activity.findViewById<ViewGroup>(android.R.id.content) ?: return

    // Expo normally holds this splash until JavaScript explicitly hides it.
    // A native timeout must release it before placing the report over the app.
    runCatching { SplashScreenManager.hide() }

    val card = LinearLayout(activity).apply {
      orientation = LinearLayout.VERTICAL
      gravity = Gravity.CENTER_VERTICAL
      setPadding(dp(activity, 22), dp(activity, 22), dp(activity, 22), dp(activity, 22))
      background = GradientDrawable().apply {
        setColor(CARD)
        cornerRadius = dp(activity, 20).toFloat()
        setStroke(dp(activity, 1), GOLD)
      }
    }

    val title = TextView(activity).apply {
      text = "Démarrage bloqué"
      setTextColor(IVORY)
      textSize = 23f
      typeface = Typeface.DEFAULT_BOLD
    }
    card.addView(title, verticalParams(activity, bottom = 12))

    val explanation = TextView(activity).apply {
      text = "Le premier écran de l’application n’est pas apparu après 12 secondes. Copiez ce rapport et envoyez-le dans le chat."
      setTextColor(MUTED)
      textSize = 15f
      gravity = Gravity.CENTER_VERTICAL
    }
    card.addView(explanation, verticalParams(activity, bottom = 16))

    val copyButton = Button(activity).apply {
      text = "Copier le diagnostic"
      setTextColor(Color.BLACK)
      backgroundTintList = android.content.res.ColorStateList.valueOf(GOLD)
      setOnClickListener {
        val report = buildReport(activity)
        val clipboard = activity.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clipboard.setPrimaryClip(ClipData.newPlainText("Diagnostic de démarrage", report))
        Toast.makeText(activity, "Diagnostic copié. Collez-le dans le chat.", Toast.LENGTH_LONG).show()
      }
    }
    card.addView(copyButton, verticalParams(activity, bottom = 12))

    val reportView = TextView(activity).apply {
      text = buildReport(activity)
      setTextColor(IVORY)
      textSize = 12f
      typeface = Typeface.MONOSPACE
      setTextIsSelectable(true)
      setPadding(dp(activity, 12), dp(activity, 12), dp(activity, 12), dp(activity, 12))
      background = GradientDrawable().apply {
        setColor(BACKGROUND)
        cornerRadius = dp(activity, 10).toFloat()
      }
    }
    card.addView(reportView, verticalParams(activity, bottom = 12))
    overlayReportView = reportView

    val retryButton = Button(activity).apply {
      text = "Réessayer"
      setTextColor(IVORY)
      backgroundTintList = android.content.res.ColorStateList.valueOf(0xFF355638.toInt())
      setOnClickListener {
        clearJavaScriptError(activity)
        activity.recreate()
      }
    }
    card.addView(retryButton, verticalParams(activity))

    val screen = ScrollView(activity).apply {
      isFillViewport = true
      setBackgroundColor(BACKGROUND)
      setPadding(dp(activity, 20), dp(activity, 24), dp(activity, 20), dp(activity, 24))
      elevation = dp(activity, 24).toFloat()
      addView(
        card,
        FrameLayout.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT,
          ViewGroup.LayoutParams.WRAP_CONTENT,
        ),
      )
      importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_YES
      contentDescription = "Diagnostic du démarrage de l’application"
    }

    content.addView(
      screen,
      FrameLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT,
      ),
    )
    overlay = screen
  }

  private fun buildReport(activity: Activity): String {
    val packageInfo = runCatching {
      activity.packageManager.getPackageInfo(activity.packageName, 0)
    }.getOrNull()
    val versionCode = packageInfo?.let {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) it.longVersionCode else it.versionCode.toLong()
    } ?: -1L
    val elapsed = if (startedAtElapsedRealtimeMs > 0L) {
      "${(SystemClock.elapsedRealtime() - startedAtElapsedRealtimeMs) / 1000}s"
    } else {
      "inconnu"
    }
    val markerLog = synchronized(markers) {
      if (markers.isEmpty()) "Aucun marqueur React Native reçu"
      else markers.joinToString("\n") { it.displayValue }
    }

    return buildString {
      appendLine("Diagnostic de démarrage — Les Plantes Sacrées")
      appendLine("État : premier affichage React Native non reçu")
      appendLine("Temps écoulé : $elapsed")
      appendLine("Version : ${packageInfo?.versionName ?: "inconnue"} ($versionCode)")
      val metadata = updateMetadata
      val runtimeVersion = metadata?.runtimeVersion?.ifEmpty {
        embeddedRuntimeVersion(activity.applicationContext)
      } ?: embeddedRuntimeVersion(activity.applicationContext)
      appendLine("Runtime version : $runtimeVersion")
      appendLine(
        "Canal EAS Update : ${metadata?.channel?.ifEmpty { "non lu (canal non fourni au runtime JS)" } ?: "non lu (JavaScript non exécuté)"}",
      )
      val updateLabel = when {
        metadata?.isEmbeddedLaunch == true -> "embedded"
        !metadata?.updateId.isNullOrEmpty() -> metadata?.updateId
        metadata != null -> "indisponible"
        else -> "indisponible (JavaScript non exécuté)"
      }
      appendLine("Mise à jour chargée : $updateLabel")
      appendLine("Android : ${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT})")
      appendLine("Appareil : ${Build.MANUFACTURER} ${Build.MODEL}")
      appendLine("ABI : ${Build.SUPPORTED_ABIS.joinToString()}")
      appendLine(
        "Nouvelle architecture : ${if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) "oui" else "non"}",
      )
      appendLine(
        "Moteur JavaScript : ${if (BuildConfig.IS_HERMES_ENABLED) "Hermes" else "JSC"}",
      )
      appendLine("Étapes natives :")
      appendLine(markerLog)
      javascriptStartupError?.let { error ->
        appendLine()
        appendLine("Erreur JavaScript (${error.kind}) : ${error.errorType} — ${error.message}")
        appendLine("Étape de l’erreur : ${error.stage}")
        appendLine("Début de pile :")
        appendLine(error.stack)
      }
      appendLine()
      append("Rapport de démarrage : message JavaScript nettoyé, sans trace brute. Les données de compte, e-mail, jeton, paramètres de navigation et journaux système ne sont pas inclus.")
    }
  }

  private fun removeOverlay() {
    val current = overlay ?: return
    (current.parent as? ViewGroup)?.removeView(current)
    overlay = null
    overlayReportView = null
  }

  private fun verticalParams(activity: Activity, bottom: Int = 0) =
    LinearLayout.LayoutParams(
      ViewGroup.LayoutParams.MATCH_PARENT,
      ViewGroup.LayoutParams.WRAP_CONTENT,
    ).apply { bottomMargin = dp(activity, bottom) }

  private fun dp(activity: Activity, value: Int): Int =
    (value * activity.resources.displayMetrics.density).toInt()
}
