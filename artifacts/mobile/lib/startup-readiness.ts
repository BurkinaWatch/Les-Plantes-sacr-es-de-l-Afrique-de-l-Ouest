export const STARTUP_RECOVERY_TIMEOUT_MS = 45_000;

export function isInitialRouteReady(
  routeKey: string,
  initialScreenLayoutReceived: boolean,
): boolean {
  const activeRoute = routeKey.trim();
  return Boolean(
    initialScreenLayoutReceived && activeRoute.length > 0 && activeRoute !== "index",
  );
}
