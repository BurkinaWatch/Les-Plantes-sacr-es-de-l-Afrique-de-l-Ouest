import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

process.env.NODE_ENV = "test";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const require = createRequire(import.meta.url);
const React = require("react");
const TestRenderer = require("react-test-renderer");
const { act } = TestRenderer;
const Module = require("node:module");
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const screenDist = path.join(projectRoot, ".screen-test-dist");
const apiClient = require(path.join(screenDist, "lib/ai-api.js"));

const unavailableMessage = "Service indisponible — réessayez.";
const retryLabel = "Réessayer";
const galleryLabel = "Choisir dans la galerie";
const translations = new Proxy({
  api_error_unavailable: unavailableMessage,
  scanner_retry: retryLabel,
  scanner_btn_gallery: galleryLabel,
}, {
  get: (target, key) => target[key] ?? String(key),
});

const plant = {
  id: "baobab",
  nom: "Baobab",
  nomScientifique: "Adansonia digitata",
  nomAnglais: "Baobab",
  categorie: "Arbres Sacrés",
  element: "Terre",
  description: "Un arbre emblématique.",
  symboliqueAfricaine: "Un symbole de résilience.",
  symboliqueSpirirtuelle: "Une force ancienne.",
  symbolique: "Sagesse ancestrale.",
  qualites: ["Sagesse"],
  defauts: ["Lenteur"],
  pouvoirs: ["Ancrage"],
  enseignements: ["Prends racine."],
  citation: "Les racines profondes résistent.",
  proverbes: [],
  legendes: [],
  conseilsDeVie: ["Reste ancré."],
  niveauSpirituel: 4,
  regionOrigine: "Afrique de l'Ouest",
  couleur: "#D4A017",
  couleurSecondaire: "#5C7A3E",
  enseignementDuJour: "La patience porte ses fruits.",
};

const totem = {
  id: "baobab",
  nom: "Baobab",
  description: "Un guide enraciné.",
  forces: ["Patience"],
  defis: ["Rigidité"],
  mantra: "Je suis ancré.",
  animalSecondaire: "neem",
  couleur: "#D4A017",
  profilDimensions: { E: 3, O: 4, C: 4, A: 3, S: 4 },
};

function textContent(node) {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (typeof node === "object" && "props" in node) return textContent(node.props.children);
  return "";
}

function makeHostComponent(type, { resolvePressableChildren = false } = {}) {
  return React.forwardRef((props, ref) => {
    const children = resolvePressableChildren && typeof props.children === "function"
      ? props.children({ pressed: false })
      : props.children;
    return React.createElement(type, { ...props, ref }, children);
  });
}

function makeNativeMock() {
  const View = makeHostComponent("View");
  const Text = makeHostComponent("Text");
  const ScrollView = makeHostComponent("ScrollView");
  const KeyboardAvoidingView = makeHostComponent("KeyboardAvoidingView");
  const Pressable = makeHostComponent("Pressable", { resolvePressableChildren: true });
  const TextInput = makeHostComponent("TextInput");
  const ActivityIndicator = makeHostComponent("ActivityIndicator");
  const Image = makeHostComponent("Image");
  const Modal = makeHostComponent("Modal");

  class AnimatedValue {
    constructor(value) {
      this.value = value;
    }

    setValue(value) {
      this.value = value;
    }

    stopAnimation() {}

    interpolate() {
      return 1;
    }
  }

  const Animated = {
    Value: AnimatedValue,
    View: makeHostComponent("Animated.View"),
    timing: () => ({ start() {} }),
    spring: () => ({ start() {} }),
    delay: () => ({ start() {} }),
    sequence: () => ({ start() {} }),
    parallel: () => ({ start() {} }),
    loop: () => ({ start() {} }),
  };

  return {
    ActivityIndicator,
    Alert: { alert() {} },
    Animated,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform: { OS: "web" },
    Pressable,
    ScrollView,
    StyleSheet: {
      create: (styles) => styles,
      absoluteFillObject: {},
    },
    Text,
    TextInput,
    View,
  };
}

function mockModules() {
  const native = makeNativeMock();
  const asyncStorage = {
    getItem: async () => null,
    setItem: async () => {},
    removeItem: async () => {},
  };
  const imagePicker = {
    launchCameraAsync: async () => ({
      canceled: false,
      assets: [{ uri: "test://plant", base64: "fake-image" }],
    }),
    launchImageLibraryAsync: async () => ({
      canceled: false,
      assets: [{ uri: "test://plant", base64: "fake-image" }],
    }),
    requestCameraPermissionsAsync: async () => ({ status: "granted" }),
    requestMediaLibraryPermissionsAsync: async () => ({ status: "granted" }),
  };
  const mocks = new Map([
    ["react-native", native],
    ["react-native-safe-area-context", { useSafeAreaInsets: () => ({ top: 0, bottom: 0 }) }],
    ["expo-linear-gradient", { LinearGradient: makeHostComponent("LinearGradient") }],
    ["@expo/vector-icons", { Feather: makeHostComponent("Feather") }],
    ["expo-router", { useRouter: () => ({ back() {}, push() {} }) }],
    ["@react-native-async-storage/async-storage", { default: asyncStorage }],
    ["expo-image-picker", imagePicker],
    ["@/hooks/useColors", { useColors: () => ({
      background: "#0A1F0A",
      card: "#163016",
      border: "#456345",
      foreground: "#F5F0E6",
      gold: "#D4A017",
      ivory: "#F5F0E6",
      muted: "#294529",
      mutedForeground: "#B0B8A0",
      deepBrown: "#24140C",
      warmBrown: "#3A2115",
      ochre: "#A66A16",
      midBrown: "#633A23",
      terracotta: "#C4622D",
    }) }],
    ["@/i18n", { useTranslation: () => ({ lang: "fr", t: translations }) }],
    ["@/context/AuthContext", { useAuth: () => ({ token: null }) }],
    ["@/context/AppContext", { useApp: () => ({
      quizResult: { primary: "baobab", secondary: "neem", completedAt: "2026-08-27T00:00:00.000Z" },
    }) }],
    ["@/hooks/useNotifications", { useNotifications: () => ({
      scheduleLocalNotification: async () => {},
    }) }],
    ["@/data/quiz", { TOTEM_RESULTS: { baobab: totem } }],
    ["@/data/animals", { getPlanteById: () => plant }],
    ["@/lib/ai-api", apiClient],
  ]);

  const originalLoad = Module._load;
  Module._load = function patchedLoad(request, parent, isMain) {
    if (mocks.has(request)) return mocks.get(request);
    return originalLoad.call(this, request, parent, isMain);
  };
  return () => {
    Module._load = originalLoad;
  };
}

function findTextNodes(renderer, expected) {
  return renderer.root.findAll(
    (node) => node.type === "Text" && textContent(node).includes(expected),
  );
}

function findPressableWithText(renderer, expected) {
  return renderer.root.find(
    (node) => node.type === "Pressable" && textContent(node).includes(expected),
  );
}

function findSendButton(renderer) {
  return renderer.root.find(
    (node) => node.type === "Pressable" && node.props.disabled === false,
  );
}

function mockJsonResponse(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

test("Totem screen shows recovery text and clears loading for empty AI content", async () => {
  process.env.EXPO_PUBLIC_DOMAIN = "example.test";
  process.env.EXPO_PUBLIC_CHAT_API_KEY = "screen-test-key";
  const restoreModules = mockModules();
  const originalFetch = globalThis.fetch;
  const fetchCalls = [];
  globalThis.fetch = async (url, options) => {
    fetchCalls.push({ url, options });
    return mockJsonResponse({ content: "   " });
  };

  try {
    const { default: ChatTotemScreen } = require(path.join(screenDist, "app/chat-totem.js"));
    let renderer;
    await act(async () => {
      renderer = TestRenderer.create(React.createElement(ChatTotemScreen));
    });

    await act(async () => {
      const input = renderer.root.findByType("TextInput");
      input.props.onChangeText("Bonjour");
    });

    await act(async () => {
      findSendButton(renderer).props.onPress();
      await Promise.resolve();
    });

    assert.equal(fetchCalls.length, 1);
    assert.equal(findTextNodes(renderer, unavailableMessage).length, 1);
    assert.equal(renderer.root.findAllByType("ActivityIndicator").length, 0);

    await act(async () => {
      renderer.root.findByType("TextInput").props.onChangeText("Encore");
    });
    assert.equal(findSendButton(renderer).props.disabled, false);
  } finally {
    restoreModules();
    globalThis.fetch = originalFetch;
  }
});

test("Scanner shows unavailable recovery UI for incomplete plant data and retries", async () => {
  process.env.EXPO_PUBLIC_DOMAIN = "example.test";
  process.env.EXPO_PUBLIC_CHAT_API_KEY = "screen-test-key";
  const restoreModules = mockModules();
  const originalFetch = globalThis.fetch;
  const fetchCalls = [];
  globalThis.fetch = async (url, options) => {
    fetchCalls.push({ url, options });
    return mockJsonResponse({ plant: { nom: "Baobab" } });
  };

  try {
    const { default: ScannerScreen } = require(path.join(screenDist, "app/(tabs)/scanner.js"));
    let renderer;
    await act(async () => {
      renderer = TestRenderer.create(React.createElement(ScannerScreen));
    });

    await act(async () => {
      findPressableWithText(renderer, galleryLabel).props.onPress();
      await Promise.resolve();
    });

    assert.equal(fetchCalls.length, 1);
    assert.equal(findTextNodes(renderer, unavailableMessage).length, 1);
    assert.equal(findTextNodes(renderer, retryLabel).length, 1);
    assert.equal(renderer.root.findAllByType("ActivityIndicator").length, 0);

    await act(async () => {
      findPressableWithText(renderer, retryLabel).props.onPress();
      await Promise.resolve();
    });

    assert.equal(fetchCalls.length, 2);
    assert.equal(findTextNodes(renderer, unavailableMessage).length, 1);
    assert.equal(renderer.root.findAllByType("ActivityIndicator").length, 0);
  } finally {
    restoreModules();
    globalThis.fetch = originalFetch;
  }
});