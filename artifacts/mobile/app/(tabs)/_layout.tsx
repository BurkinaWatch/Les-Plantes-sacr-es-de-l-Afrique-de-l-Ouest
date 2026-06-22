import { BottomTabBar } from "@react-navigation/bottom-tabs";
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
const FAB_LIFT = 20;

function ScannerFab() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const tabBarH = isWeb ? 84 : 49 + insets.bottom;

  return (
    <Pressable
      onPress={() => router.push("/scanner")}
      style={({ pressed }) => [
        styles.fab,
        {
          backgroundColor: colors.gold,
          bottom: tabBarH + FAB_LIFT,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.93 : 1 }],
        },
      ]}
      accessibilityLabel="Scanner une plante"
      accessibilityRole="button"
    >
      {Feather ? (
        <Feather name="camera" size={26} color={colors.background} />
      ) : (
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 4,
            backgroundColor: colors.background,
          }}
        />
      )}
    </Pressable>
  );
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

  const tabBarStyle = {
    position: "absolute" as const,
    backgroundColor: isIOS ? "transparent" : colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 0,
    ...(isWeb ? { height: 84 } : {}),
  };

  return (
    <Tabs
      tabBar={(props) => (
        <View style={styles.tabBarWrapper} pointerEvents="box-none">
          <ScannerFab />
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarStyle,
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
        options={{
          href: null,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="savoir"
        options={{
          title: t.tab_knowledge,
          tabBarIcon: tabIcon("books.vertical.fill", "book-open-variant", "mci"),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="mon-animal"
        options={{ href: null }}
      />
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
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    elevation: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#C8A020",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.45,
        shadowRadius: 10,
      },
      android: {},
      web: {
        boxShadow: "0px 4px 20px rgba(200, 160, 32, 0.5)",
      } as any,
    }),
  },
});
