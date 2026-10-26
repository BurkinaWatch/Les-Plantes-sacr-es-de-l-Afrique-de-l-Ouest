import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

process.env.NODE_ENV = "test";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const require = createRequire(import.meta.url);
const React = require("react");
const Renderer = require("react-test-renderer");
const { QueryClient, QueryClientProvider } = require("@tanstack/react-query");
const { act } = Renderer;
const Module = require("node:module");

function text(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node !== "object") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  return text(node.props?.children);
}

async function fixture({
  statusError = null,
  paymentError = null,
  reconcileError = null,
  trialActive = false,
} = {}) {
  const calls = { checkout: 0, routes: [], logout: 0, queryKeys: [], enabled: true };
  const auth = {
    user: { id: 1, username: "test" }, token: "old-session", isLoading: false,
    logout: async () => { calls.logout++; auth.user = null; auth.token = null; },
  };
  const plans = { plans: [{ code: "MONTHLY", name: "Mensuel", active: true, amount: "1000", currency: "XOF", period: "MONTHLY" }] };
  const now = Date.now();
  const trial = trialActive
    ? {
        startedAt: new Date(now - 60_000).toISOString(),
        endsAt: new Date(now + 3 * 24 * 60 * 60 * 1000 - 60_000).toISOString(),
      }
    : {
        startedAt: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(),
        endsAt: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
      };
  let currentStatusError = statusError;
  const originalLoad = Module._load;
  const queryClient = new QueryClient();
  Module._load = function (id, ...args) {
    if (id === "expo-router") return {
      useLocalSearchParams: () => ({}),
      useRouter: () => ({
        back: () => calls.routes.push(["back"]),
        canGoBack: () => false,
        replace: route => calls.routes.push(["replace", route]),
        push: route => calls.routes.push(route),
      }),
    };
    if (id === "@/context/AuthContext") return { useAuth: () => auth };
    if (id === "@/hooks/useColors") return { useColors: () => ({}) };
    if (id === "@/components/SacredIcon") return { SacredIcon: () => null };
    if (id === "react-native-safe-area-context") return { useSafeAreaInsets: () => ({ top: 0 }) };
    if (id === "react-native") return {
      ...Object.fromEntries(["ActivityIndicator", "Pressable", "ScrollView", "Text", "TextInput", "View"].map(x => [x, x])),
      StyleSheet: { create: x => x },
      AppState: { addEventListener: () => ({ remove() {} }) },
      Linking: { openURL: async () => {} },
    };
    if (id === "@workspace/api-client-react") return {
      useGetSubscriptionPlans: () => ({ data: plans }),
      useGetSubscriptionStatus: ({ query }) => {
        calls.enabled = query.enabled;
        calls.queryKeys.push(query.queryKey);
        assert.equal(query.retry(0, { status: 401 }), false);
        return {
          error: currentStatusError,
          data: currentStatusError
            ? undefined
            : {
                access: { hasAccess: trialActive, trialActive, subscriptionActive: false },
                trial,
                subscription: null,
              },
          isSuccess: !currentStatusError,
          refetch: async () => ({}),
        };
      },
      useCreateSubscriptionPayment: () => ({
        isPending: false,
        mutate: (_data, options) => { calls.checkout++; options.onError(paymentError); },
      }),
      useReconcileSubscriptionPayment: () => ({
        mutate: (_data, options) => {
          if (reconcileError) options.onError(reconcileError);
        },
        isPending: false,
      }),
    };
    return originalLoad.call(this, id, ...args);
  };
  const screenPath = require.resolve("../.screen-test-dist/app/abonnement.js");
  delete require.cache[screenPath];
  const Screen = require(screenPath).default;
  const screen = () => React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(Screen),
  );
  let renderer;
  try {
    await act(async () => { renderer = Renderer.create(screen()); });
  } finally {
    Module._load = originalLoad;
  }
  const button = label => renderer.root.findAllByType("Pressable").find(x => text(x).includes(label));
  return {
    calls, auth, renderer, button,
    fill: async () => act(async () => {
      renderer.root.findByProps({ accessibilityLabel: "Votre nom complet" }).props.onChangeText("Client Test");
      renderer.root.findByProps({ accessibilityLabel: "Votre adresse e-mail" }).props.onChangeText("test@example.com");
    }),
    refresh: async () => {
      currentStatusError = null;
      await act(async () => renderer.update(screen()));
    },
    close: async () => act(async () => renderer.unmount()),
  };
}

test("a rejected status session offers reconnection without creating a checkout", async () => {
  const f = await fixture({ statusError: { status: 401 } });
  try {
    assert.ok(f.button("Se reconnecter"));
    assert.equal(f.calls.enabled, false);
    assert.equal(f.calls.checkout, 0);
    assert.equal(f.button("Continuer vers le paiement"), undefined);
    await act(async () => f.button("Se reconnecter").props.onPress());
    assert.equal(f.calls.logout, 1);
    assert.deepEqual(f.calls.routes[0], {
      pathname: "/(auth)/login",
      params: { returnTo: "/abonnement", username: "test" },
    });
  } finally { await f.close(); }
});

test("a restored trial can return from a direct subscription link to the app", async () => {
  const f = await fixture({ trialActive: true });
  try {
    const screenText = f.renderer.root.findAllByType("Text").map(text).join(" ");
    assert.match(screenText, /Votre essai gratuit est actif/);
    await act(async () => f.button("Continuer vers l’application").props.onPress());
    assert.deepEqual(f.calls.routes, [["replace", "/(tabs)"]]);

    await act(async () => {
      f.renderer.root.findByProps({ accessibilityLabel: "Retour" }).props.onPress();
    });
    assert.deepEqual(f.calls.routes.at(-1), ["replace", "/(tabs)"]);
  } finally { await f.close(); }
});

test("a checkout 401 preserves the form and a fresh login permits a deliberate retry", async () => {
  const f = await fixture({ paymentError: { status: 401, message: "HTTP 401 Unauthorized" } });
  try {
    await f.fill();
    const oldKey = f.calls.queryKeys.at(-1);
    await act(async () => f.button("Continuer vers le paiement").props.onPress());
    assert.ok(f.button("Se reconnecter"));
    assert.equal(f.calls.checkout, 1);
    assert.ok(!text(f.renderer.toTree()).includes("HTTP 401"));
    f.auth.token = "fresh-session";
    await f.refresh();
    assert.ok(f.button("Continuer vers le paiement"));
    assert.equal(f.calls.checkout, 1, "never automatically replay a payment");
    assert.notDeepEqual(f.calls.queryKeys.at(-1), oldKey);
    assert.equal(f.renderer.root.findByProps({ accessibilityLabel: "Votre adresse e-mail" }).props.value, "test@example.com");
  } finally { await f.close(); }
});

test("temporary payment failures do not invalidate a valid session", async () => {
  const f = await fixture({ paymentError: { status: 503 } });
  try {
    await f.fill();
    await act(async () => f.button("Continuer vers le paiement").props.onPress());
    assert.ok(f.button("Continuer vers le paiement"));
    assert.equal(f.button("Se reconnecter"), undefined);
    assert.equal(f.calls.logout, 0);
  } finally { await f.close(); }
});

test("unconfigured payments explain the administrator action instead of suggesting a temporary outage", async () => {
  const f = await fixture({
    paymentError: { status: 503, data: { code: "PAYMENTS_NOT_CONFIGURED" } },
  });
  try {
    await f.fill();
    await act(async () => f.button("Continuer vers le paiement").props.onPress());
    const message = f.renderer.root.findAllByType("Text").map(text).join(" ");
    assert.match(message, /paiements ne sont pas encore activés par l’administrateur/);
    assert.doesNotMatch(message, /quelques instants/);
    assert.equal(f.calls.logout, 0);
    assert.equal(f.button("Se reconnecter"), undefined);
    assert.equal(f.calls.checkout, 1, "never automatically repeat a checkout request");
  } finally { await f.close(); }
});

test("a reconciliation 401 uses the same recovery without starting another payment", async () => {
  const f = await fixture({ reconcileError: { status: 401 } });
  try {
    assert.ok(f.button("Se reconnecter"));
    assert.equal(f.calls.enabled, false);
    assert.equal(f.calls.checkout, 0);
  } finally { await f.close(); }
});
