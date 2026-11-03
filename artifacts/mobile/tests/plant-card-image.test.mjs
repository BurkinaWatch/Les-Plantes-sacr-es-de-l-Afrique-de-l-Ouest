import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { act, createScreenRenderer } from "./screen-test-renderer.mjs";

const require = createRequire(import.meta.url);
const React = require("react");
const Module = require("node:module");
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const screenDist = path.join(projectRoot, ".screen-test-dist");

function host(type, resolvePressableChildren = false) {
  return React.forwardRef((props, ref) => {
    const children =
      resolvePressableChildren && typeof props.children === "function"
        ? props.children({ pressed: false })
        : props.children;
    return React.createElement(type, { ...props, ref }, children);
  });
}

test("catalog cards keep a cached, correctly sized image for every plant", () => {
  const mocks = new Map([
    [
      "react-native",
      {
        Platform: {
          OS: "android",
          select: (styles) => styles.android ?? styles.default,
        },
        Pressable: host("Pressable", true),
        StyleSheet: {
          create: (styles) => styles,
          absoluteFill: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          absoluteFillObject: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        Text: host("Text"),
        View: host("View"),
      },
    ],
    ["expo-image", { Image: host("ExpoImage") }],
    ["expo-linear-gradient", { LinearGradient: host("LinearGradient") }],
    ["expo-router", { useRouter: () => ({ push() {} }) }],
    ["@/data/animals", {}],
    [
      "@/hooks/useColors",
      { useColors: () => ({ card: "#163016" }) },
    ],
  ]);

  const originalLoad = Module._load;
  Module._load = function patchedLoad(request, parent, isMain) {
    if (request.startsWith("@/assets/images/plants/")) {
      return { assetPath: request };
    }
    if (mocks.has(request)) return mocks.get(request);
    return originalLoad.call(this, request, parent, isMain);
  };

  try {
    const registry = require(
      path.join(screenDist, "constants/plantImages.js"),
    ).default;
    mocks.set("@/constants/plantImages", registry);
    const componentPath = path.join(screenDist, "components/PlanteCard.js");
    delete require.cache[componentPath];
    const { PlanteCard } = require(componentPath);

    for (const [id, source] of Object.entries(registry)) {
      let renderer;
      act(() => {
        renderer = createScreenRenderer(
          React.createElement(PlanteCard, {
            plante: {
              id,
              nom: id,
              categorie: "Plantes Médicinales",
              niveauSpirituel: 3,
              pouvoirs: ["Transmission"],
            },
          }),
        );
      });

      const images = renderer.root.findAllByType("ExpoImage");
      assert.equal(images.length, 1, `${id} doit rendre son illustration`);
      assert.equal(images[0].props.source, source, `${id} doit garder sa source locale`);
      assert.equal(images[0].props.contentFit, "cover");
      assert.equal(images[0].props.cachePolicy, "memory-disk");
      assert.equal(images[0].props.recyclingKey, id);
      assert.equal(images[0].props.style.width, "100%");
      assert.equal(images[0].props.style.height, "100%");
      act(() => renderer.unmount());
    }
  } finally {
    Module._load = originalLoad;
  }
});
