export function isInitialRouteReady(
  routeKey: string,
  initialScreenLayoutReceived: boolean,
): boolean {
  const activeRoute = routeKey.trim();
  return Boolean(
    initialScreenLayoutReceived && activeRoute.length > 0 && activeRoute !== "index",
  );
}
