import Constants from "expo-constants";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  Share,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

import {
  buildStartupDiagnostic,
  StartupDiagnosticReason,
} from "@/lib/startup-diagnostics";

type StartupDiagnosticButtonProps = {
  reason: StartupDiagnosticReason;
  route: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function StartupDiagnosticButton({
  reason,
  route,
  style,
  textStyle,
}: StartupDiagnosticButtonProps) {
  const [sharing, setSharing] = useState(false);

  if (Platform.OS === "web") return null;

  const shareDiagnostic = async () => {
    if (sharing) return;
    setSharing(true);
    try {
      const diagnostic = buildStartupDiagnostic({
        reason,
        route,
        platform: Platform.OS,
        osVersion: Platform.Version,
        appVersion: Constants.expoConfig?.version,
        buildNumber:
          Constants.expoConfig?.android?.versionCode ??
          Constants.expoConfig?.ios?.buildNumber,
      });
      await Share.share({
        title: "Diagnostic de démarrage",
        message: diagnostic,
      });
    } catch {
      Alert.alert(
        "Partage indisponible",
        "Impossible d’ouvrir le menu de partage. Réessayez ou contactez l’assistance.",
      );
    } finally {
      setSharing(false);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Partager un diagnostic sûr"
      disabled={sharing}
      onPress={() => void shareDiagnostic()}
      style={({ pressed }) => [
        {
          minHeight: 46,
          minWidth: 180,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#D4A017",
          paddingHorizontal: 20,
          paddingVertical: 12,
          opacity: sharing ? 0.6 : pressed ? 0.82 : 1,
        },
        style,
      ]}
      testID="share-startup-diagnostic"
    >
      <Text
        style={[
          {
            color: "#F0EAD6",
            fontSize: 15,
            fontWeight: "700",
            textAlign: "center",
          },
          textStyle,
        ]}
      >
        {sharing ? "Préparation…" : "Partager un diagnostic sûr"}
      </Text>
    </Pressable>
  );
}
