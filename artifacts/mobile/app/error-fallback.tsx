import { useLocalSearchParams } from "expo-router";
import React from "react";

import { ErrorFallback } from "@/components/ErrorFallback";

/**
 * Deterministic visual-test entry point for the global error fallback.
 * It is intentionally a normal route so native screenshot runners can open
 * it with a deep link without having to crash the whole application.
 */
export default function ErrorFallbackCaptureScreen() {
  const { details } = useLocalSearchParams<{ details?: string }>();

  return (
    <ErrorFallback
      error={new Error("Native SVG capture fixture")}
      resetError={() => undefined}
      initialModalVisible={details === "1"}
    />
  );
}