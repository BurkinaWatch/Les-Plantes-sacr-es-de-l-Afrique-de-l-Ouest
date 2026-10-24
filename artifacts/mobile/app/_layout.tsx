import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { reloadAppAsync } from "expo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { ErrorFallbackProps } from "@/components/ErrorFallback";
import { SacredIcon } from "@/components/SacredIcon";
import { StartupDiagnosticButton } from "@/components/StartupDiagnosticButton";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { StartupReadinessContext } from "@/context/StartupReadinessContext";
import colors from "@/constants/colors";
import { useColors } from "@/hooks/useColors";
import { LanguageProvider } from "@/i18n";
import { useNotifications } from "@/hooks/useNotifications";
import { getApiBase } from "@/lib/api-config";
import {
  setAuthTokenGetter,
  setBaseUrl,
  useGetSubscriptionStatus,
} from "@workspace/api-client-react";

setBaseUrl(getApiBase());

// Suppress fontfaceobserver timeout errors on web (known Expo Web / vector-icons issue)
if (Platform.OS === "web" && typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (e) => {
    const msg = String(e?.reason?.message ?? e?.reason ?? "");
    // fontfaceobserver throws: '"FontName" font timed out.' or 'Xms timeout'
    if (msg.includes("ms timeout") || msg.includes("font timed out") || msg.includes("fontface")) {
      e.preventDefault();
    }
  });
  const origError = window.onerror;
  window.onerror = (msg, src, _line, _col, _err) => {
    if (typeof src === "string" && src.includes("fontfaceobserver")) return true;
    if (typeof msg === "string" && (msg.includes("ms timeout") || msg.includes("font timed out"))) return true;
    return origError ? origError(msg, src, _line, _col, _err) : false;
  };
}

const queryClient = new QueryClient();
const isNative = Platform.OS !== "web";

if (isNative) {
  void SplashScreen.preventAutoHideAsync().catch((error) => {
    console.warn("Unable to retain the native splash screen:", error);
  });
}

/* ── FAB Scanner ────────────────────────────────────────────────── */
const FAB_SIZE = 58;

function ScannerFab() {
  const segments = useSegments();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const pulseScale = useRef(new Animated.Value(1)).current;
  const ringScale = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(0.7)).current;

  const isOnAccueil = segments[0] === "(tabs)" && segments[1] === undefined;

  useEffect(() => {
    if (!isOnAccueil) return;

    // Gentle breathing pulse on the button
    const breath = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, { toValue: 1.08, duration: 1100, useNativeDriver: true }),
        Animated.timing(pulseScale, { toValue: 1.0,  duration: 1100, useNativeDriver: true }),
      ])
    );

    // Expanding glowing ring
    const ring = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ringScale,   { toValue: 1.7,  duration: 1400, useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0,    duration: 1400, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(ringScale,   { toValue: 1.0,  duration: 0,    useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0.55, duration: 0,    useNativeDriver: true }),
        ]),
        Animated.delay(400),
      ])
    );

    breath.start();
    ring.start();
    return () => { breath.stop(); ring.stop(); };
  }, [isOnAccueil]);

  if (!isOnAccueil) return null;

  const tabBarH = Platform.OS === "web" ? 84 : 49 + insets.bottom;
  const fabBottom = tabBarH + 16;

  return (
    <View
      style={[fabStyles.row, { bottom: fabBottom, pointerEvents: "box-none" }]}
    >
      {/* Glowing ring */}
      <Animated.View
        style={[
          fabStyles.ring,
          {
            borderColor: colors.gold,
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          },
        ]}
        pointerEvents="none"
      />

      {/* Button with breathing scale */}
      <Animated.View style={{ transform: [{ scale: pulseScale }] }}>
        <Pressable
          onPress={() => router.push("/(tabs)/scanner")}
          style={({ pressed }) => [
            fabStyles.btn,
            {
              backgroundColor: colors.gold,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.93 : 1 }],
            },
            Platform.select({
              ios: {
                shadowColor: "#C8A020",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.55,
                shadowRadius: 10,
              },
              android: {},
              web: { boxShadow: "0 4px 20px rgba(200,160,32,0.6)" } as any,
            }),
          ]}
          accessibilityLabel="Scanner une plante"
          accessibilityRole="button"
        >
          <SacredIcon name="camera" size={26} color={colors.background} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const fabStyles = StyleSheet.create({
  row: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
    elevation: 12,
  },
  btn: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    elevation: 12,
  },
  ring: {
    position: "absolute",
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    borderWidth: 2.5,
  },
});

/* ── Notifications bootstrap ────────────────────────────────────── */
/**
 * Mounted once inside AppProvider. Requests notification permission on first
 * launch and (silently) registers the Expo push token with the API server so
 * the server can send remote notifications in the future.
 */
function NotificationsSetup() {
  const { pushToken } = useNotifications();
  const { token } = useAuth();

  useEffect(() => {
    setAuthTokenGetter(() => token ?? null);
    return () => setAuthTokenGetter(null);
  }, [token]);

  useEffect(() => {
    if (!pushToken || !token) return;

    const apiBase = getApiBase();
    if (!apiBase) return;

    fetch(`${apiBase}/push-tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token: pushToken, platform: Platform.OS }),
    }).catch(() => {
      // Non-critical — silently ignore network errors
    });
  }, [pushToken, token]);

  return null;
}

/* ── Navigation ────────────────────────────────────────────────── */
function RootLayoutNav({
  onRouteLayoutReady,
  onRouteKeyChange,
}: {
  onRouteLayoutReady: (routeKey: string) => void;
  onRouteKeyChange: (routeKey: string) => void;
}) {
  const segments = useSegments();
  const router = useRouter();
  const theme = useColors();
  const { user, isLoading: authLoading, logout } = useAuth();
  const routeKey = segments.join("/");
  const markCurrentRouteLaidOut = useCallback(() => {
    onRouteLayoutReady(routeKey);
  }, [onRouteLayoutReady, routeKey]);
  const routeGroup = segments[0] ?? "";
  const onAuthRoute = routeGroup === "(auth)";
  const onSubscriptionRoute = routeGroup === "abonnement";
  const onAccountDeletionRoute = routeGroup === "account-deletion";
  const onFallbackRoute = routeGroup === "error-fallback";
  const accessQuery = useGetSubscriptionStatus({
    query: {
      enabled: Boolean(user) && !authLoading,
      queryKey: ["trial-access", user?.id],
      refetchInterval: 30_000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  });
  const access = accessQuery.data?.access;
  const trialStartedAt = accessQuery.data?.trial.startedAt
    ? Date.parse(accessQuery.data.trial.startedAt)
    : Number.NaN;
  const trialEndsAt = accessQuery.data?.trial.endsAt
    ? Date.parse(accessQuery.data.trial.endsAt)
    : Number.NaN;
  const subscriptionEndsAt = accessQuery.data?.subscription?.expiresAt
    ? Date.parse(accessQuery.data.subscription.expiresAt)
    : Number.NaN;
  const locallyActiveTrial =
    access?.trialActive === true &&
    Number.isFinite(trialStartedAt) &&
    Number.isFinite(trialEndsAt) &&
    Date.now() >= trialStartedAt &&
    Date.now() < trialEndsAt;
  const locallyActiveSubscription =
    access?.subscriptionActive === true &&
    (!Number.isFinite(subscriptionEndsAt) || Date.now() < subscriptionEndsAt);
  const hasCurrentAccess =
    access?.hasAccess === true &&
    (locallyActiveTrial || locallyActiveSubscription);
  const needsAccessCheck =
    !onAuthRoute &&
    !onSubscriptionRoute &&
    !onAccountDeletionRoute &&
    !onFallbackRoute;

  useEffect(() => {
    console.info(`[Startup] Active route: ${routeKey || "(none)"}`);
    onRouteKeyChange(routeKey);
  }, [onRouteKeyChange, routeKey]);

  useEffect(() => {
    if (authLoading) return;

    if (
      user &&
      accessQuery.isError &&
      isUnauthorizedApiError(accessQuery.error)
    ) {
      void logout();
      if (!onAuthRoute) router.replace("/(auth)/login");
      return;
    }

    if (!user) {
      if (!onAuthRoute && !onSubscriptionRoute && !onFallbackRoute) {
        router.replace("/(auth)/login");
      }
      return;
    }

    if (
      needsAccessCheck &&
      accessQuery.data &&
      !hasCurrentAccess
    ) {
      router.replace({
        pathname: "/abonnement",
        params: { reason: "trial-expired" },
      });
    }
  }, [
    accessQuery.data,
    accessQuery.error,
    accessQuery.isError,
    authLoading,
    hasCurrentAccess,
    needsAccessCheck,
    onAuthRoute,
    onFallbackRoute,
    onSubscriptionRoute,
    logout,
    router,
    user,
  ]);

  const shouldBlockPrivateContent =
    needsAccessCheck &&
    (authLoading ||
      !user ||
      !accessQuery.data ||
      !hasCurrentAccess ||
      (accessQuery.isError && !accessQuery.data));

  return (
    <StartupReadinessContext.Provider value={markCurrentRouteLaidOut}>
      <View style={{ flex: 1, backgroundColor: colors.light.background }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)"      options={{ headerShown: false }} />
          <Stack.Screen name="animal/[id]" options={{ headerShown: false, presentation: "card" }} />
          <Stack.Screen name="plant/[id]"  options={{ headerShown: false, presentation: "card" }} />
          <Stack.Screen name="(auth)"      options={{ headerShown: false }} />
          <Stack.Screen name="chat-totem"  options={{ headerShown: false, presentation: "card" }} />
          <Stack.Screen name="progression-spirituelle" options={{ headerShown: false, presentation: "card" }} />
          <Stack.Screen name="error-fallback" options={{ headerShown: false, presentation: "card" }} />
          <Stack.Screen name="abonnement" options={{ headerShown: false, presentation: "card" }} />
          <Stack.Screen name="account-deletion" options={{ headerShown: false, presentation: "card" }} />
        </Stack>
        <ScannerFab />
        {shouldBlockPrivateContent && (
          <View
            accessibilityViewIsModal
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                backgroundColor: theme.background,
                justifyContent: "center",
                padding: 28,
                zIndex: 1000,
                elevation: 1000,
              },
            ]}
          >
            {accessQuery.isError && !accessQuery.data ? (
              <>
                <Text style={{ color: theme.ivory, fontSize: 16, textAlign: "center" }}>
                  Impossible de vérifier votre accès. Vérifiez votre connexion puis réessayez.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => void accessQuery.refetch()}
                  style={{
                    backgroundColor: theme.gold,
                    borderRadius: 14,
                    marginTop: 20,
                    paddingHorizontal: 22,
                    paddingVertical: 13,
                  }}
                >
                  <Text style={{ color: theme.deepBrown, fontWeight: "700" }}>
                    Réessayer
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <ActivityIndicator color={theme.gold} />
                <Text
                  style={{
                    color: theme.mutedForeground,
                    fontSize: 14,
                    marginTop: 14,
                    textAlign: "center",
                  }}
                >
                  {user
                    ? "Vérification de votre accès…"
                    : "Ouverture de la connexion…"}
                </Text>
              </>
            )}
          </View>
        )}
      </View>
    </StartupReadinessContext.Provider>
  );
}

function isUnauthorizedApiError(error: unknown): boolean {
  return typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 401;
}

/* ── Root Layout ───────────────────────────────────────────────── */
export default function RootLayout() {
  return (
    <ErrorBoundary
      FallbackComponent={StartupFatalFallback}
      onError={(error, componentStack) => {
        console.error("[Startup] Root render error:", error.name);
        console.error("[Startup] Root component stack:", componentStack);
      }}
    >
      <RootLayoutContent />
    </ErrorBoundary>
  );
}

function StartupFatalFallback({ resetError }: ErrorFallbackProps) {
  useEffect(() => {
    console.error("[Startup] Displaying root error recovery screen");
    void SplashScreen.hideAsync().catch((error) => {
      console.warn("Unable to hide the native splash from root recovery:", error);
    });
  }, []);

  const retry = async () => {
    try {
      await reloadAppAsync();
    } catch (error) {
      console.warn(
        "[Startup] Root recovery reload failed:",
        error instanceof Error ? error.name : "Unknown error",
      );
      resetError();
    }
  };

  return (
    <View style={styles.startupRecovery}>
      <Text style={styles.startupRecoveryTitle}>
        L’application n’a pas pu démarrer
      </Text>
      <Text style={styles.startupRecoveryMessage}>
        Une erreur a interrompu l’ouverture. Réessayez ou partagez un diagnostic
        sûr pour nous aider à identifier le problème.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => void retry()}
        style={({ pressed }) => [
          styles.startupRetryButton,
          { opacity: pressed ? 0.82 : 1 },
        ]}
      >
        <Text style={styles.startupRetryText}>Réessayer</Text>
      </Pressable>
      <StartupDiagnosticButton
        reason="react-render-error"
        route=""
        style={styles.startupDiagnosticButton}
      />
    </View>
  );
}

function RootLayoutContent() {
  const [laidOutRouteKey, setLaidOutRouteKey] = useState("");
  const [startupFailed, setStartupFailed] = useState(false);
  const [routeKey, setRouteKey] = useState("");
  const nativeSplashHidden = useRef(false);
  const navigationReady = Boolean(
    routeKey.length > 0 &&
      routeKey !== "index" &&
      laidOutRouteKey === routeKey,
  );

  const markRouteLaidOut = useCallback((laidOutKey: string) => {
    setLaidOutRouteKey(laidOutKey);
  }, []);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        if (Platform.OS !== "web") {
          console.info("[Startup] Optional icon font load started");
          const fontsLoaded = await Promise.race([
            Font.loadAsync({
              Feather: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf"),
              MaterialCommunityIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
            }).then(() => true),
            new Promise<boolean>((resolve) =>
              setTimeout(() => resolve(false), 3000),
            ),
          ]);
          console.info(
            `[Startup] Optional icon fonts ${fontsLoaded ? "loaded" : "timed out"}; continuing`,
          );
        }
      } catch (error) {
        console.warn(
          "[Startup] Optional icon font load failed; continuing:",
          error instanceof Error ? error.name : "Unknown error",
        );
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    console.info("[Startup] Root layout content mounted");
  }, []);

  useEffect(() => {
    if (!isNative || navigationReady) return;

    const startupTimeout = setTimeout(() => {
      console.error(
        `[Startup] Initial route did not lay out within 12 seconds; active route: ${routeKey || "(none)"}, last laid-out route: ${laidOutRouteKey || "(none)"}`,
      );
      setStartupFailed(true);
    }, 12000);

    return () => clearTimeout(startupTimeout);
  }, [laidOutRouteKey, navigationReady, routeKey]);

  useEffect(() => {
    if (!navigationReady) return;
    console.info(`[Startup] Initial route layout is ready: ${routeKey}`);
    setStartupFailed(false);
  }, [navigationReady, routeKey]);

  useEffect(() => {
    if (
      !isNative ||
      (!navigationReady && !startupFailed) ||
      nativeSplashHidden.current
    ) {
      return;
    }

    nativeSplashHidden.current = true;
    void SplashScreen.hideAsync().catch((error) => {
      nativeSplashHidden.current = false;
      console.warn("Unable to hide the native splash screen:", error);
    });
  }, [navigationReady, startupFailed]);

  return (
    <SafeAreaProvider>
      <ErrorBoundary
        onError={(error, componentStack) => {
          console.error("[Startup] React render error:", error.name);
          console.error("[Startup] React component stack:", componentStack);
        }}
      >
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <LanguageProvider>
                <AuthProvider>
                  <AppProvider>
                    <NotificationsSetup />
                    <View style={{ flex: 1 }}>
                      <RootLayoutNav
                        onRouteLayoutReady={markRouteLaidOut}
                        onRouteKeyChange={setRouteKey}
                      />
                      {startupFailed ? (
                        <StartupRecoveryScreen route={routeKey} />
                      ) : null}
                    </View>
                  </AppProvider>
                </AuthProvider>
              </LanguageProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

function StartupRecoveryScreen({ route }: { route: string }) {
  const handleRetry = async () => {
    try {
      await reloadAppAsync();
    } catch (error) {
      console.error(
        "[Startup] App reload failed:",
        error instanceof Error ? error.name : "Unknown error",
      );
    }
  };

  return (
    <View style={styles.startupRecovery}>
      <Text style={styles.startupRecoveryTitle}>
        L’application n’a pas pu s’ouvrir
      </Text>
      <Text style={styles.startupRecoveryMessage}>
        L’écran d’accueil ne s’est pas chargé. Réessayez de démarrer
        l’application.
      </Text>
      <Text style={styles.startupDiagnosticPrivacy}>
        Le rapport ne contient ni identifiant, ni e-mail, ni jeton. Rien n’est
        transmis avant que vous choisissiez de le partager.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={handleRetry}
        style={({ pressed }) => [
          styles.startupRetryButton,
          { opacity: pressed ? 0.82 : 1 },
        ]}
      >
        <Text style={styles.startupRetryText}>Réessayer</Text>
      </Pressable>
      <StartupDiagnosticButton
        reason="route-timeout"
        route={route}
        style={styles.startupDiagnosticButton}
      />
    </View>
  );
}

/* ── Styles ────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  startupRecovery: {
    ...StyleSheet.absoluteFill,
    zIndex: 1100,
    elevation: 1100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: colors.splashBackground,
  },
  startupRecoveryTitle: {
    color: "#F0EAD6",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 14,
  },
  startupRecoveryMessage: {
    color: "#D8CDB6",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  startupDiagnosticPrivacy: {
    color: "#D8CDB6",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginBottom: 18,
  },
  startupRetryButton: {
    minWidth: 180,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#D4A017",
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  startupRetryText: {
    color: "#120A05",
    fontSize: 16,
    fontWeight: "700",
  },
  startupDiagnosticButton: {
    marginTop: 12,
  },
});
