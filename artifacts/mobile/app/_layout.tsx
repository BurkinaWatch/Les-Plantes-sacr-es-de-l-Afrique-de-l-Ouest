import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { LanguageProvider } from "@/i18n";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
const { width } = Dimensions.get("window");
const isNative = Platform.OS !== "web";

/* ── Splash animé ──────────────────────────────────────────────── */
function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  const logoScale   = useRef(new Animated.Value(0.75)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity    = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity   = useRef(new Animated.Value(1)).current;
  const shimmer         = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const native = isNative;

    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 2000, useNativeDriver: native }),
        Animated.timing(shimmer, { toValue: 0, duration: 2000, useNativeDriver: native }),
      ])
    ).start();

    Animated.sequence([
      Animated.delay(150),
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 55,
          friction: 8,
          useNativeDriver: native,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: native,
        }),
      ]),
      Animated.delay(250),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: native,
      }),
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: native,
      }),
      Animated.delay(2000),
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: native,
      }),
    ]).start(() => onFinish());
  }, []);

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.08, 0.2],
  });

  return (
    <Animated.View style={[styles.splashContainer, { opacity: screenOpacity }]}>
      {/* Motif de fond */}
      <View style={[styles.bgPattern, { pointerEvents: 'none' }]}>
        {Array.from({ length: 24 }).map((_, i) => (
          <Text
            key={i}
            style={[
              styles.patternSymbol,
              {
                top: (Math.floor(i / 4)) * 130 + (i % 2 === 0 ? 0 : 65),
                left: (i % 4) * (width / 3.5),
              },
            ]}
          >
            ✦
          </Text>
        ))}
      </View>

      {/* Halo doré animé */}
      <Animated.View style={[styles.logoGlow, { opacity: shimmerOpacity }]} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Image
          source={require("@/assets/images/icon-plants.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Titre */}
      <Animated.View style={[styles.titleBlock, { opacity: titleOpacity }]}>
        <Text style={styles.titleSmall}>✦  LES PLANTES SACRÉES  ✦</Text>
        <Text style={styles.titleBig}>D'AFRIQUE</Text>
        <Text style={styles.titleMid}>DE L'OUEST</Text>
      </Animated.View>

      {/* Sous-titre */}
      <Animated.View style={[styles.subtitleBlock, { opacity: subtitleOpacity }]}>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>Symboles de l'ancienne Sagesse</Text>
        <View style={styles.divider} />
      </Animated.View>

    </Animated.View>
  );
}

/* ── Navigation ────────────────────────────────────────────────── */
function RootLayoutNav() {
  const { isLoading } = useAuth();
  if (isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)"      options={{ headerShown: false }} />
      <Stack.Screen name="animal/[id]" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="(auth)"      options={{ headerShown: false }} />
      <Stack.Screen name="chat-totem"  options={{ headerShown: false, presentation: "card" }} />
    </Stack>
  );
}

/* ── Root Layout ───────────────────────────────────────────────── */
export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <LanguageProvider>
                <AuthProvider>
                  <AppProvider>
                    {showSplash ? (
                      <AnimatedSplash onFinish={() => setShowSplash(false)} />
                    ) : (
                      <RootLayoutNav />
                    )}
                  </AppProvider>
                </AuthProvider>
              </LanguageProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

/* ── Styles ────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#0A1F0A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  bgPattern: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  patternSymbol: {
    position: "absolute",
    fontSize: 36,
    color: "#C8A020",
    opacity: 0.07,
  },
  logoGlow: {
    position: "absolute",
    width: width * 0.72,
    height: width * 0.72,
    borderRadius: (width * 0.72) / 2,
    backgroundColor: "#C8A020",
  },
  logoWrap: {
    width: width * 0.62,
    height: width * 0.62,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  logo: {
    width: width * 0.60,
    height: width * 0.60,
    borderRadius: 20,
  },
  titleBlock: {
    alignItems: "center",
    marginBottom: 4,
  },
  titleSmall: {
    fontSize: 11,
    letterSpacing: 4,
    color: "#C8A020",
    fontWeight: "700",
    marginBottom: 6,
  },
  titleBig: {
    fontSize: 46,
    fontWeight: "900",
    color: "#F0EAD6",
    letterSpacing: 3,
    lineHeight: 50,
  },
  titleMid: {
    fontSize: 18,
    fontWeight: "300",
    color: "#C4622D",
    letterSpacing: 7,
    textTransform: "uppercase",
    marginTop: 2,
  },
  subtitleBlock: {
    alignItems: "center",
    marginTop: 20,
  },
  divider: {
    width: 56,
    height: 1,
    backgroundColor: "#C8A020",
    opacity: 0.45,
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#C8A02099",
    letterSpacing: 1.5,
    fontStyle: "italic",
  },
  authors: {
    position: "absolute",
    bottom: 50,
    fontSize: 10,
    color: "#F0EAD650",
    letterSpacing: 2.5,
    textTransform: "uppercase",
  },
});
