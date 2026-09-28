import React from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { useColors } from "@/hooks/useColors";

const LOGO_SURFACE_PADDING = 8;

type SotyssiBrandingProps = {
  variant?: "footer" | "compact";
};

export function SotyssiBranding({
  variant = "footer",
}: SotyssiBrandingProps) {
  const colors = useColors();
  const { width } = useWindowDimensions();

  if (variant === "compact") {
    return (
      <View
        testID="sotyssi-branding-compact"
        style={[styles.compact, { borderTopColor: colors.border }]}
      >
        <Text style={[styles.productLine, { color: colors.mutedForeground }]}>
          Un produit SOTYSSI
        </Text>
      </View>
    );
  }

  const isWide = width >= 720;
  const logoWidth = Math.max(0, Math.min(248, width - 80));
  const year = new Date().getFullYear();

  return (
    <View
      testID="sotyssi-branding-footer"
      style={[
        styles.footer,
        isWide && styles.footerWide,
        { borderTopColor: colors.border },
      ]}
    >
      <View
        style={[
          styles.logoSurface,
          {
            backgroundColor: colors.ivory,
          width: logoWidth + LOGO_SURFACE_PADDING * 2,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/sotyssi-cycle.png")}
          style={[styles.logo, { width: logoWidth, height: logoWidth / 3 }]}
          resizeMode="contain"
          accessible
          accessibilityLabel="SOTYSSI — We build what connects us. People, Ideas, Culture, Opportunities."
        />
      </View>

      <View style={[styles.copy, isWide && styles.copyWide]}>
        <Text style={[styles.productLine, { color: colors.ivory }]}>
          Un produit SOTYSSI
        </Text>
        <Text style={[styles.copyright, { color: colors.mutedForeground }]}>
          © {year} Les Plantes Sacrées d’Afrique de l’Ouest
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 960,
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerWide: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoSurface: {
    padding: LOGO_SURFACE_PADDING,
  },
  logo: {
    aspectRatio: 3,
  },
  copy: {
    alignItems: "center",
    gap: 3,
  },
  copyWide: {
    alignItems: "flex-end",
  },
  productLine: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.2,
    textAlign: "center",
  },
  copyright: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
  },
  compact: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingTop: 12,
    paddingBottom: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});