import React, { createContext, useContext, useEffect } from "react";

export const StartupReadinessContext = createContext<() => void>(() => {});

export function useStartupReadiness(): () => void {
  const markStartupReady = useContext(StartupReadinessContext);

  useEffect(() => {
    // A committed first screen is sufficient to release the native splash;
    // Android may not deliver the corresponding onLayout event reliably.
    markStartupReady();
  }, [markStartupReady]);

  return markStartupReady;
}