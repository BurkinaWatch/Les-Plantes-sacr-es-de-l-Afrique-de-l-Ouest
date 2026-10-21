import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { fr } from "../.test-dist/i18n/fr.js";

process.env.NODE_ENV = "test";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const require = createRequire(import.meta.url);
const React = require("react");
const Renderer = require("react-test-renderer");
const { act } = Renderer;
const Module = require("node:module");

function content(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node !== "object") return String(node);
  if (Array.isArray(node)) return node.map(content).join("");
  return content(node.props?.children);
}

async function mount({ params = {}, result = {} } = {}) {
  const calls = { credentials: [], links: [], routes: [] };
  const original = Module._load;
  Module._load = function (id, ...args) {
    if (id === "expo-router") return {
      useLocalSearchParams: () => params,
      useRouter: () => ({
        replace: path => calls.routes.push(["replace", path]),
        dismissTo: path => calls.routes.push(["dismissTo", path]),
      }),
    };
    if (id === "@/context/AuthContext") return { useAuth: () => ({
      login: async (...credentials) => { calls.credentials.push(credentials); return result; },
      linkEmail: async (...credentials) => { calls.links.push(credentials); return result; },
    }) };
    if (id === "@/hooks/useColors") return { useColors: () => ({}) };
    if (id === "@/i18n") return { useTranslation: () => ({ t: fr }) };
    if (id === "@/lib/auth-validation") return require("../.screen-test-dist/lib/auth-validation.js");
    if (id.startsWith("@/assets/")) return 1;
    if (id === "expo-linear-gradient") return { LinearGradient: "LinearGradient" };
    if (id === "react-native-safe-area-context") return { useSafeAreaInsets: () => ({ top: 0, bottom: 0 }) };
    if (id === "react-native") return {
      ...Object.fromEntries(["ActivityIndicator", "Image", "KeyboardAvoidingView", "Pressable", "ScrollView", "Text", "TextInput", "View"].map(x => [x, x])),
      StyleSheet: { create: x => x }, Platform: { OS: "web" },
    };
    return original.call(this, id, ...args);
  };
  const file = require.resolve("../.screen-test-dist/app/(auth)/login.js");
  delete require.cache[file];
  const Screen = require(file).default;
  let renderer;
  try {
    await act(async () => { renderer = Renderer.create(React.createElement(Screen)); });
  } catch (error) {
    Module._load = original;
    throw error;
  }
  const input = label => renderer.root.findByProps({ accessibilityLabel: label });
  return {
    renderer, calls, input,
    fill: async (username, password) => act(async () => {
      input(fr.auth_username).props.onChangeText(username);
      input(fr.auth_password).props.onChangeText(password);
    }),
    submit: async () => act(async () => {
      const button = renderer.root.findAllByType("Pressable").find(x =>
        content(x) === fr.auth_login_btn || content(x) === "Associer mon e-mail et me connecter");
      await button.props.onPress();
    }),
    close: async () => {
      try { await act(async () => renderer.unmount()); }
      finally { Module._load = original; }
    },
  };
}

test("reconnection prefills the saved email and returns to subscription after login", async () => {
  const f = await mount({ params: { username: "client@example.com", returnTo: "/abonnement" } });
  try {
    assert.equal(f.input(fr.auth_username).props.value, "client@example.com");
    assert.equal(f.input(fr.auth_username).props.autoComplete, "username");
    assert.equal(f.input(fr.auth_password).props.autoComplete, "current-password");
    await act(async () => f.input(fr.auth_password).props.onChangeText("test-password"));
    await f.submit();
    assert.deepEqual(f.calls.credentials, [["client@example.com", "test-password"]]);
    assert.deepEqual(f.calls.routes, [["dismissTo", "/abonnement"]]);
  } finally { await f.close(); }
});

test("invalid emails are rejected, while valid emails reach the login API", async () => {
  const f = await mount();
  try {
    await f.fill("not-an-email", "test-password");
    await f.submit();
    assert.equal(f.calls.credentials.length, 0);
    await f.fill("client@example.com", "test-password");
    await f.submit();
    assert.equal(f.calls.credentials.length, 1);
  } finally { await f.close(); }
});

test("wrong passwords remain rejected and the identifier is retained", async () => {
  const f = await mount({ result: { error: "Nom d'utilisateur ou mot de passe incorrect" } });
  try {
    await f.fill("client@example.com", "wrong-password");
    await f.submit();
    assert.equal(f.calls.credentials.length, 1);
    assert.equal(f.calls.routes.length, 0);
    assert.equal(f.input(fr.auth_username).props.value, "client@example.com");
    assert.ok(f.renderer.root.findAllByType("Text").some(x => content(x).includes("mot de passe incorrect")));
  } finally { await f.close(); }
});

test("email login opens home and never follows arbitrary return URLs", async () => {
  const f = await mount({ params: { returnTo: "https://untrusted.example" } });
  try {
    await f.fill(" client@example.com ", "test-password");
    await f.submit();
    assert.deepEqual(f.calls.credentials, [["client@example.com", "test-password"]]);
    assert.deepEqual(f.calls.routes, [["replace", "/(tabs)"]]);
  } finally { await f.close(); }
});

test("legacy association requires the old account credentials without silently creating a new account", async () => {
  const f = await mount({ params: { username: "existing_user", returnTo: "/abonnement" } });
  try {
    assert.equal(f.input("Ancien identifiant").props.value, "existing_user");
    assert.equal(f.input(fr.auth_username).props.value, "", "never invent an email for a legacy account");
    await f.fill("client@example.com", "same-password");
    await f.submit();
    assert.equal(f.calls.credentials.length, 0);
    assert.deepEqual(f.calls.links, [["existing_user", "client@example.com", "same-password"]]);
    assert.deepEqual(f.calls.routes, [["dismissTo", "/abonnement"]]);
  } finally { await f.close(); }
});
