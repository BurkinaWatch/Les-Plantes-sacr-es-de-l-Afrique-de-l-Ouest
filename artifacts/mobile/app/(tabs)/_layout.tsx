import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View, useColorScheme } from "react-native";

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
    size = 22
  ) =>
    ({ color }: { color: string }) => {
      if (isIOS && SymbolView) {
        return <SymbolView name={sfName} tintColor={color} size={size} />;
      }
      if (androidIconSet === "mci" && MaterialCommunityIcons) {
        return (
          <MaterialCommunityIcons
            name={androidIcon}
            size={size}
            color={color}
          />
        );
      }
      if (Feather) {
        return <Feather name={androidIcon} size={size} color={color} />;
      }
      return null;
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
          tabBarIcon: tabIcon("house.fill", "home", "feather"),
        }}
      />
      <Tabs.Screen
        name="animaux"
        options={{
          title: t.tab_animals,
          tabBarIcon: tabIcon("pawprint.fill", "paw", "mci"),
        }}
      />
      <Tabs.Screen
        name="savoir"
        options={{
          title: t.tab_knowledge,
          tabBarIcon: tabIcon("book.closed.fill", "book-open", "feather"),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="mon-animal"
        options={{
          title: t.tab_my_animal,
          tabBarIcon: tabIcon("star.circle.fill", "star-circle", "mci"),
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
  );
}
