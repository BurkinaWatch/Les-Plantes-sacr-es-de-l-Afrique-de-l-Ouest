import { BlurView } from "expo-blur";
import { useRouter, Tabs } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useTranslation } from "@/i18n";

let SymbolView: any = null;
try {
  SymbolView = require("expo-symbols").SymbolView;
} catch {}

let MaterialCommunityIcons: any = null;
let Feather: any = null;
try {
  const icons = require("@expo/vector-icons");
  MaterialCommunityIcons = icons.MaterialCommunityIcons;
  Feather = icons.Feather;
} catch {}

const FAB_SIZE = 58;

export default function TabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const tabBarH = isWeb ? 84 : 49 + insets.bottom;
  const fabBottom = tabBarH + 16;

  const tabIcon = (
    sfName: string,
    androidIcon: string,
    androidIconSet: "feather" | "mci",
    size = 22
  ) =>
    ({ color }: { color: string }) => {
      if (isIOS && SymbolView) {
        return <SymbolView name={sfName} tintColor={color} size={size} />;
      }
      if (androidIconSet === "mci" && MaterialCommunityIcons) {
        return (
          <MaterialCommunityIcons name={androidIcon} size={size} color={color} />
        );
      }
      if (Feather) {
        return <Feather name={androidIcon} size={size} color={color} />;
      }
      return null;
    };

  return (
    <View style={styles.root}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.mutedForeground,
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: isIOS ? "transparent" : colors.card,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            elevation: 0,
            ...(isWeb ? { height: 84 } : {}),
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            letterSpacing: 0.3,
            marginBottom: isWeb ? 8 : 0,
          },
          tabBarBackground: () =>
            isIOS ? (
              <BlurView
                intensity={100}
                tint={isDark ? "dark" : "default"}
                style={StyleSheet.absoluteFill}
              />
            ) : isWeb ? (
              <View
                style={[StyleSheet.absoluteFill, { backgroundColor: colors.card }]}
              />
            ) : null,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t.tab_home,
            tabBarIcon: tabIcon("house.fill", "home", "feather"),
          }}
        />
        <Tabs.Screen
          name="animaux"
          options={{
            title: t.tab_animals,
            tabBarIcon: tabIcon("leaf.fill", "sprout", "mci"),
          }}
        />
        <Tabs.Screen
          name="scanner"
          options={{ href: null, tabBarButton: () => null }}
        />
        <Tabs.Screen
          name="savoir"
          options={{
            title: t.tab_knowledge,
            tabBarIcon: tabIcon("books.vertical.fill", "book-open-variant", "mci"),
          }}
        />
        <Tabs.Screen name="quiz" options={{ href: null }} />
        <Tabs.Screen name="mon-animal" options={{ href: null }} />
        <Tabs.Screen
          name="ma-plante"
          options={{
            title: t.tab_my_animal,
            tabBarIcon: tabIcon("crown.fill", "crown", "mci"),
          }}
        />
        <Tabs.Screen
          name="profil"
          options={{
            title: t.tab_profile,
            tabBarIcon: tabIcon("person.circle.fill", "user", "feather"),
          }}
        />
      </Tabs>

      {/* Floating Scanner Button */}
      <View style={[styles.fabRow, { bottom: fabBottom }]} pointerEvents="box-none">
        <Pressable
          onPress={() => router.push("/scanner")}
          style={({ pressed }) => [
            styles.fab,
            {
              backgroundColor: colors.gold,
              opacity: pressed ? 0.82 : 1,
              transform: [{ scale: pressed ? 0.92 : 1 }],
              ...Platform.select({
                ios: {
                  shadowColor: "#C8A020",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                },
                android: {},
                web: { boxShadow: "0 4px 20px rgba(200,160,32,0.55)" } as any,
              }),
            },
          ]}
          accessibilityLabel="Scanner une plante"
          accessibilityRole="button"
        >
          {Feather ? (
            <Feather name="camera" size={26} color={colors.background} />
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  fabRow: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
    pointerEvents: "box-none" as any,
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    elevation: 12,
  },
});
