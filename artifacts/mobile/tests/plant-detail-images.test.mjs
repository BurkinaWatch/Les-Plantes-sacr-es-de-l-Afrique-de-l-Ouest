import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

process.env.NODE_ENV = "test";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const require = createRequire(import.meta.url);
const TestRenderer = require("react-test-renderer");
const React = require("react");
const { act } = TestRenderer;
const Module = require("node:module");
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const screenDist = path.join(projectRoot, ".screen-test-dist");

function makeHostComponent(type, { resolvePressableChildren = false } = {}) {
  return React.forwardRef((props, ref) => {
    const children =
      resolvePressableChildren && typeof props.children === "function"
        ? props.children({ pressed: false })
        : props.children;
    return React.createElement(type, { ...props, ref }, children);
  });
}

const Image = makeHostComponent("Image");
const SacredIcon = makeHostComponent("SacredIcon");
const currentPlant = { id: "" };

const colors = {
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
};

function makePlant(id) {
  return {
    id,
    nom: id,
    nomAnglais: id,
    nomScientifique: `Species ${id}`,
    categorie: "Plantes Médicinales",
    element: "Terre",
    description: "Une plante documentée.",
    symboliqueAfricaine: "Un savoir transmis.",
    symboliqueSpirirtuelle: "Une observation attentive.",
    symbolique: "Un lien au vivant.",
    qualites: ["Observation"],
    defauts: ["Confusion possible"],
    pouvoirs: ["Transmission"],
    enseignements: ["Observe avant d’agir."],
    citation: "Connaître ses limites.",
    proverbes: [],
    legendes: [],
    conseilsDeVie: ["Demander conseil."],
    niveauSpirituel: 2,
    regionOrigine: "Afrique de l’Ouest",
    couleur: "#5C8A3A",
    couleurSecondaire: "#384A29",
    enseignementDuJour: "La prudence accompagne le savoir.",
    vertus: ["Usage traditionnel"],
    usagesTraditionnels: ["Usage documenté"],
  };
}

function makeNativeMock() {
  return {
    Image,
    Platform: { OS: "web" },
    Pressable: makeHostComponent("Pressable", {
      resolvePressableChildren: true,
    }),
    ScrollView: makeHostComponent("ScrollView"),
    StyleSheet: {
      create: (styles) => styles,
      absoluteFillObject: {},
    },
    Text: makeHostComponent("Text"),
    View: makeHostComponent("View"),
    useWindowDimensions: () => ({ width: 400, height: 720 }),
  };
}

function loadDetailScreen() {
  const native = makeNativeMock();
  const mocks = new Map([
    ["react-native", native],
    [
      "expo-haptics",
      { ImpactFeedbackStyle: { Light: "light" }, impactAsync: async () => {} },
    ],
    [
      "expo-linear-gradient",
      { LinearGradient: makeHostComponent("LinearGradient") },
    ],
    [
      "expo-router",
      {
        useLocalSearchParams: () => ({ id: currentPlant.id }),
        useRouter: () => ({ back() {} }),
      },
    ],
    [
      "react-native-safe-area-context",
      { useSafeAreaInsets: () => ({ top: 0, bottom: 0 }) },
    ],
    ["@/components/SacredIcon", { SacredIcon, iconForCategory: () => "leaf" }],
    [
      "@/context/AppContext",
      { useApp: () => ({ isFavorite: () => false, toggleFavorite() {} }) },
    ],
    ["@/data/animals", { getPlanteById: (id) => makePlant(id) }],
    ["@/hooks/useColors", { useColors: () => colors }],
  ]);

  const originalLoad = Module._load;
  Module._load = function patchedLoad(request, parent, isMain) {
    if (request.startsWith("@/assets/images/plants/")) {
      return { assetPath: request };
    }
    if (mocks.has(request)) return mocks.get(request);
    return originalLoad.call(this, request, parent, isMain);
  };

  const imageRegistry = require(
    path.join(screenDist, "constants/plantImages.js"),
  ).default;
  mocks.set("@/constants/plantImages", imageRegistry);
  const screen = require(path.join(screenDist, "app/animal/[id].js")).default;
  return {
    imageRegistry,
    screen,
    restore() {
      Module._load = originalLoad;
    },
  };
}

function renderedImages(renderer) {
  return renderer.root.findAllByType("Image");
}

test("each complementary plant renders its dedicated detail illustration", () => {
  const { PLANTES_COMPLEMENTAIRES } = require(
    path.join(
      projectRoot,
      ".data-test-dist/data/plantes-medicinales-complementaires.js",
    ),
  );
  const { imageRegistry, screen, restore } = loadDetailScreen();
  const failures = [];

  try {
    for (const { id } of PLANTES_COMPLEMENTAIRES) {
      currentPlant.id = id;
      let renderer;
      act(() => {
        renderer = TestRenderer.create(React.createElement(screen));
      });

      const images = renderedImages(renderer);
      if (images.length !== 1 || images[0].props.source !== imageRegistry[id]) {
        failures.push(
          `${id}: l’illustration dédiée n’est pas rendue par l’écran de détail`,
        );
      }
      act(() => {
        renderer.unmount();
      });
    }
  } finally {
    restore();
  }

  assert.deepEqual(
    failures,
    [],
    `Illustrations de fiches complémentaires invalides :\n${failures.join("\n")}`,
  );
});

test("detail screen keeps the existing fallback for plants without an illustration", () => {
  const { screen, restore } = loadDetailScreen();
  currentPlant.id = "plant-without-dedicated-illustration";

  try {
    let renderer;
    act(() => {
      renderer = TestRenderer.create(React.createElement(screen));
    });

    assert.equal(
      renderedImages(renderer).length,
      0,
      "Une fiche sans illustration dédiée ne doit pas rendre d’image",
    );
    assert.ok(
      renderer.root.findAllByType("SacredIcon").length > 0,
      "Le placeholder du fallback doit rester visible",
    );
    act(() => {
      renderer.unmount();
    });
  } finally {
    restore();
  }
});
