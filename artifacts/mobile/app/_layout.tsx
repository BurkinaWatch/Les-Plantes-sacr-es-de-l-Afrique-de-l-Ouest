import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { reloadAppAsync } from "expo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SacredIcon } from "@/components/SacredIcon";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { StartupReadinessContext } from "@/context/StartupReadinessContext";
import colors from "@/constants/colors";
import { useColors } from "@/hooks/useColors";
import { LanguageProvider } from "@/i18n";
import { useNotifications } from "@/hooks/useNotifications";
import { getApiBase } from "@/lib/api-config";
import { setAuthTokenGetter, setBaseUrl } from "@workspace/api-client-react";

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
const { width } = Dimensions.get("window");
const splashLogoSize = Math.min(width * 0.84, 360);
const isNative = Platform.OS !== "web";

if (isNative) {
  void SplashScreen.preventAutoHideAsync().catch((error) => {
    console.warn("Unable to retain the native splash screen:", error);
  });
}

/* ── Splash animé ──────────────────────────────────────────────── */
function AnimatedSplash({
  canDismiss,
  onFinish,
}: {
  canDismiss: boolean;
  onFinish: () => void;
}) {
  const logoScale   = useRef(new Animated.Value(0.94)).current;
  const titleOpacity    = useRef(new Animated.Value(0)).current;
  const screenOpacity   = useRef(new Animated.Value(1)).current;
  const onFinishRef = useRef(onFinish);
  const nativeSplashHidden = useRef(false);
  const [introComplete, setIntroComplete] = useState(false);
  onFinishRef.current = onFinish;

  useEffect(() => {
    const native = isNative;
    const introFallback = setTimeout(() => setIntroComplete(true), 2600);
    const animation = Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 55,
          friction: 8,
          useNativeDriver: native,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: native,
        }),
      ]),
      Animated.delay(650),
    ]);
    animation.start(({ finished: animationFinished }) => {
      if (animationFinished) setIntroComplete(true);
    });

    return () => {
      clearTimeout(introFallback);
      animation.stop();
    };
  }, []);

  useEffect(() => {
    if (!canDismiss || !introComplete) return;

    const fadeOut = Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 280,
      useNativeDriver: isNative,
    });
    fadeOut.start(({ finished }) => {
      if (finished) onFinishRef.current();
    });

    return () => fadeOut.stop();
  }, [canDismiss, introComplete, screenOpacity]);

  const handleLayout = () => {
    if (!isNative || nativeSplashHidden.current) return;
    nativeSplashHidden.current = true;
    void SplashScreen.hideAsync().catch((error) => {
      console.warn("Unable to hide the native splash screen:", error);
    });
  };

  return (
    <Animated.View
      onLayout={handleLayout}
      style={[styles.splashContainer, { opacity: screenOpacity }]}
    >
      {/* Logo principal */}
      <Animated.View
        style={[
          styles.logoWrap,
          {
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require("@/assets/images/logo-plantes-sacrees.png")}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Logo des Plantes Sacrées d'Afrique de l'Ouest"
        />
      </Animated.View>

      {/* Titre */}
      <Animated.View style={[styles.titleBlock, { opacity: titleOpacity }]}>
        <Text
          accessibilityLabel="Les Plantes Sacrées d'Afrique de l'Ouest"
          style={styles.splashTitle}
        >
          Les Plantes Sacrées{"\n"}d'Afrique de l'Ouest
        </Text>
      </Animated.View>

    </Animated.View>
  );
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
function RootLayoutNav({ onLayoutReady }: { onLayoutReady: () => void }) {
  return (
    <View
      onLayout={onLayoutReady}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
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
    </View>
  );
}

/* ── Root Layout ───────────────────────────────────────────────── */
export default function RootLayout() {
  const [showLaunchSplash, setShowLaunchSplash] = useState(isNative);
  const [navigatorHasLayout, setNavigatorHasLayout] = useState(false);
  const [homeHasLayout, setHomeHasLayout] = useState(false);
  const [startupFailed, setStartupFailed] = useState(false);
  const rootNavigationState = useRootNavigationState();
  const segments = useSegments();
  const routeKey = segments.join("/");
  const initialRouteIsHome = segments.length === 1 && segments[0] === "(tabs)";
  const navigationReady = Boolean(
    rootNavigationState?.key &&
      rootNavigationState.routes.length > 0 &&
      segments.length > 0 &&
      navigatorHasLayout &&
      (!initialRouteIsHome || homeHasLayout),
  );

  const markNavigatorLaidOut = useCallback(() => {
    setNavigatorHasLayout(true);
  }, []);
  const markHomeLaidOut = useCallback(() => {
    setHomeHasLayout(true);
  }, []);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        if (Platform.OS !== "web") {
          await Promise.race([
            Font.loadAsync({
              Feather: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf"),
              MaterialCommunityIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
            }),
            new Promise<void>((resolve) => setTimeout(resolve, 3000)),
          ]);
        }
      } catch {
        // Les icônes se dégradent gracieusement si les polices échouent
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (!isNative || navigationReady) return;

    const startupTimeout = setTimeout(() => {
      console.error(
        `[Startup] Initial route did not lay out within 12 seconds; route segments: ${routeKey || "(none)"}`,
      );
      setStartupFailed(true);
      setShowLaunchSplash(false);
    }, 12000);

    return () => clearTimeout(startupTimeout);
  }, [navigationReady, routeKey]);

  useEffect(() => {
    if (!navigationReady) return;
    console.info("[Startup] Initial route layout is ready.");
    setStartupFailed(false);
  }, [navigationReady]);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        onError={(error, componentStack) => {
          console.error("[Startup] React render error:", error.name);
          console.error("[Startup] React component stack:", componentStack);
        }}
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <LanguageProvider>
                <AuthProvider>
                  <AppProvider>
                    <NotificationsSetup />
                    <View style={{ flex: 1 }}>
                      <StartupReadinessContext.Provider value={markHomeLaidOut}>
                        <RootLayoutNav onLayoutReady={markNavigatorLaidOut} />
                      </StartupReadinessContext.Provider>
                      {showLaunchSplash && !startupFailed ? (
                        <AnimatedSplash
                          canDismiss={navigationReady}
                          onFinish={() => setShowLaunchSplash(false)}
                        />
                      ) : null}
                      {startupFailed ? <StartupRecoveryScreen /> : null}
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

function StartupRecoveryScreen() {
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
    </View>
  );
}

/* ── Styles ────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.splashBackground,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    zIndex: 1000,
    elevation: 1000,
  },
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
  logoWrap: {
    width: splashLogoSize,
    height: splashLogoSize,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: splashLogoSize,
    height: splashLogoSize,
    borderRadius: 28,
  },
  titleBlock: {
    alignItems: "center",
    marginBottom: 0,
    width: "100%",
  },
  splashTitle: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "800",
    color: "#F0EAD6",
    letterSpacing: 0.3,
    textAlign: "center",
  },
});
