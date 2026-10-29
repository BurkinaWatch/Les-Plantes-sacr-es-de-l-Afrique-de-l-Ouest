import Constants from "expo-constants";
import * as Updates from "expo-updates";
import React, { useState } from "react";
import {
  Alert,
  NativeModules,
  Platform,
  Pressable,
  Share,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

import {
  buildAccessConnectionDiagnostic,
  buildStartupDiagnostic,
  StartupDiagnosticReason,
} from "@/lib/startup-diagnostics";
import type { StartupStage } from "@/lib/startup-runtime";
import type { StartupErrorKind } from "@/lib/startup-runtime";

type StartupDiagnosticButtonProps = {
  reason: StartupDiagnosticReason;
  route: string;
  stage?: StartupStage;
  runtimeErrorType?: string;
  errorMessage?: string;
  errorStack?: string;
  errorKind?: StartupErrorKind;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function StartupDiagnosticButton({
  reason,
  route,
  stage,
  runtimeErrorType,
  errorMessage,
  errorStack,
  errorKind,
  style,
  textStyle,
}: StartupDiagnosticButtonProps) {
  const [sharing, setSharing] = useState(false);

  if (Platform.OS === "web") return null;

  const shareDiagnostic = async () => {
    if (sharing) return;
    setSharing(true);
    try {
      let runtimeInfo:
        | {
            abi?: string;
            newArchitecture?: boolean;
            jsEngine?: string;
          }
        | undefined;
      try {
        runtimeInfo =
          NativeModules.StartupDiagnostic?.getRuntimeInfo?.() ?? undefined;
      } catch {
        runtimeInfo = undefined;
      }

      const diagnostic = buildStartupDiagnostic({
        reason,
        route,
        platform: Platform.OS,
        osVersion: Platform.Version,
        appVersion: Constants.expoConfig?.version,
        buildNumber:
          Constants.expoConfig?.android?.versionCode ??
          Constants.expoConfig?.ios?.buildNumber,
        runtimeVersion: Updates.runtimeVersion ?? Constants.expoConfig?.runtimeVersion,
        easChannel: Updates.channel,
        updateId: Updates.updateId,
        isEmbeddedLaunch: Updates.isEmbeddedLaunch,
        abi: runtimeInfo?.abi,
        newArchitecture: runtimeInfo?.newArchitecture,
        jsEngine: runtimeInfo?.jsEngine,
        stage,
        runtimeErrorType,
        errorMessage,
        errorStack,
        errorKind,
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

function getErrorField(error: unknown, key: string): unknown {
  return typeof error === "object" && error !== null && key in error
    ? (error as Record<string, unknown>)[key]
    : undefined;
}

export function AccessConnectionDiagnosticButton({
  error,
  apiBaseUrl,
  style,
  textStyle,
}: {
  error: unknown;
  apiBaseUrl: string | null;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) {
  const [sharing, setSharing] = useState(false);

  if (Platform.OS === "web") return null;

  const shareDiagnostic = async () => {
    if (sharing) return;
    setSharing(true);
    try {
      const diagnostic = buildAccessConnectionDiagnostic({
        platform: Platform.OS,
        osVersion: Platform.Version,
        appVersion: Constants.expoConfig?.version,
        buildNumber:
          Constants.expoConfig?.android?.versionCode ??
          Constants.expoConfig?.ios?.buildNumber,
        apiBaseUrl,
        errorStatus: getErrorField(error, "status"),
        errorType: getErrorField(error, "name"),
        errorMessage: getErrorField(error, "message"),
      });
      await Share.share({
        title: "Diagnostic de connexion",
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
      accessibilityLabel="Partager le diagnostic de connexion"
      disabled={sharing}
      onPress={() => void shareDiagnostic()}
      style={({ pressed }) => [
        {
          minHeight: 44,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#D4A017",
          marginTop: 12,
          paddingHorizontal: 16,
          paddingVertical: 10,
          opacity: sharing ? 0.6 : pressed ? 0.82 : 1,
        },
        style,
      ]}
      testID="share-access-connection-diagnostic"
    >
      <Text
        style={[
          {
            color: "#F0EAD6",
            fontSize: 14,
            fontWeight: "700",
            textAlign: "center",
          },
          textStyle,
        ]}
      >
        {sharing ? "Préparation…" : "Partager le diagnostic de connexion"}
      </Text>
    </Pressable>
  );
}
