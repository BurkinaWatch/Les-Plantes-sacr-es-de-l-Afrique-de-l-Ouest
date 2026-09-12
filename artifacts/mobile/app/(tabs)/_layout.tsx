import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View, useColorScheme } from "react-native";

import { SacredIcon, type SacredIconName } from "@/components/SacredIcon";
import { useColors } from "@/hooks/useColors";
import { useTranslation } from "@/i18n";

let SymbolView: any = null;
try {
  SymbolView = require("expo-symbols").SymbolView;
} catch {}

let Feather: any = null;
let MaterialCommunityIcons: any = null;
if (Platform.OS !== "web") {
  const vectorIcons = require("@expo/vector-icons");
  Feather = vectorIcons.Feather;
  MaterialCommunityIcons = vectorIcons.MaterialCommunityIcons;
}

export default function TabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";
  const { t } = useTranslation();

  const tabIcon = (
    sfName: string,
    androidIcon: string,
    androidIconSet: "feather" | "mci",
    size = 22,
    webIcon: SacredIconName = "circle",
  ) =>
    ({ color }: { color: string }) => {
      if (isIOS && SymbolView) {
        return <SymbolView name={sfName} tintColor={color} size={size} />;
      }
      if (isWeb) {
        return <SacredIcon name={webIcon} size={size} color={color} />;
      }
      if (androidIconSet === "mci") {
        return (
          <MaterialCommunityIcons
            name={androidIcon as any}
            size={size}
            color={color}
          />
        );
      }
      return <Feather name={androidIcon as any} size={size} color={color} />;
    };

  return (
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
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: colors.card },
              ]}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.tab_home,
          tabBarIcon: tabIcon("house.fill", "home", "feather", 22, "tree"),
        }}
      />
      <Tabs.Screen
        name="animaux"
        options={{
          title: t.tab_animals,
          tabBarIcon: tabIcon("leaf.fill", "sprout", "mci", 22, "sprout"),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="savoir"
        options={{
          title: t.tab_knowledge,
          tabBarIcon: tabIcon(
            "books.vertical.fill",
            "book-open-variant",
            "mci",
            22,
            "book",
          ),
        }}
      />
      <Tabs.Screen name="quiz" options={{ href: null }} />
      <Tabs.Screen name="mon-animal" options={{ href: null }} />
      <Tabs.Screen
        name="ma-plante"
        options={{
          title: t.tab_my_animal,
          tabBarIcon: tabIcon("crown.fill", "crown", "mci", 22, "crown"),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: t.tab_profile,
          tabBarIcon: tabIcon("person.circle.fill", "user", "feather", 22, "user"),
        }}
      />
    </Tabs>
  );
}
