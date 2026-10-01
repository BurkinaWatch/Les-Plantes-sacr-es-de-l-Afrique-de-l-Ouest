import React, { createContext, useContext } from "react";

export const StartupReadinessContext = createContext<() => void>(() => {});

export function useStartupReadiness(): () => void {
  return useContext(StartupReadinessContext);
}