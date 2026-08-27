import assert from "node:assert/strict";
import { createServer } from "node:http";
import express from "express";
import test from "node:test";

import { createChatRouter } from "../.test-dist/src/routes/chat.js";
import { createPlantRecognitionRouter } from "../.test-dist/src/routes/plant-recognition.js";

const API_KEY = "test-chat-key";

const plantData = {
  nom: "Baobab",
  nomScientifique: "Adansonia digitata",
  element: "Terre",
  categorie: "Arbre",
  regionOrigine: "Afrique de l'Ouest",
  description: "Un arbre ancien et majestueux.",
  symboliqueAfricaine: "Il représente la force et la mémoire.",
  symboliqueSpirirtuelle: "Il relie les générations.",
  qualites: ["sage"],
  defauts: ["patient"],
  pouvoirs: ["ancrage"],
  enseignements: ["Rester enraciné"],
  citation: "La patience porte ses fruits.",
  proverbes: ["Chaque chose en son temps."],
  conseilsDeVie: ["Écoute tes racines."],
  niveauSpirituel: 5,
};

function createMockGroq({ chatContent, plantContent } = {}) {
  const calls = [];
  return {
    calls,
    client: {
      chat: {
        completions: {
          create: async (request) => {
            calls.push(request);
            if (request.messages[0]?.content?.[0]?.type === "image_url") {
              return {
                choices: [{
                  message: {
                    content: plantContent ?? JSON.stringify({
                      nom: "Baobab",
                      nomScientifique: "Adansonia digitata",
                      famille: "Malvaceae",
                      description: "Un arbre emblématique des savanes.",
                      origineGeographique: "Afrique de l'Ouest",
                      utilisationsTraditionnelles: ["Alimentation"],
                      proprietesMediacinales: ["Riche en vitamine C"],
                      symboliqueAfricaine: "Un symbole de résilience.",
                      conseils: ["Respecter l'arbre."],
                      curiosite: "Son tronc peut stocker beaucoup d'eau.",
                      confidence: "high",
                    }),
                  },
                }],
              };
            }
            return { choices: [{ message: { content: chatContent ?? "Je suis là, au cœur de tes racines." } }] };
          },
        },
      },
    },
  };
}

async function withApp(mock, callback) {
  const app = express();
  app.use(express.json());
  app.use("/api/chat", createChatRouter(() => mock.client));
  app.use("/api/plant-recognition", createPlantRecognitionRouter(() => mock.client));
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try {
    return await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

async function post(baseUrl, path, body, key = API_KEY) {
  const headers = { "Content-Type": "application/json" };
  if (key !== null) headers["x-api-key"] = key;
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  return { response, body: await response.json() };
}

test("Totem chat returns the mocked response and preserves its request contract", async () => {
  const mock = createMockGroq();
  await withApp(mock, async (baseUrl) => {
    const result = await post(baseUrl, "/api/chat/totem", {
      planteId: "baobab",
      planteData: plantData,
      messages: [{ role: "user", content: "Que peux-tu m'apprendre ?" }],
      userLang: "fr",
    });

    assert.equal(result.response.status, 200);
    assert.deepEqual(result.body, { content: "Je suis là, au cœur de tes racines." });
    assert.equal(mock.calls.length, 1);
    assert.equal(mock.calls[0].model, "qwen/qwen3.8-27b");
    assert.equal(mock.calls[0].messages.at(-1).content, "Que peux-tu m'apprendre ?");
  });
});

test("Plant recognition returns the mocked structured plant response", async () => {
  const mock = createMockGroq();
  await withApp(mock, async (baseUrl) => {
    const result = await post(baseUrl, "/api/plant-recognition", {
      imageBase64: "fake-image-bytes",
      lang: "fr",
    });

    assert.equal(result.response.status, 200);
    assert.equal(result.body.plant.nom, "Baobab");
    assert.equal(result.body.plant.confidence, "high");
    assert.equal(mock.calls[0].model, "qwen/qwen3.8-27b");
    assert.equal(mock.calls[0].messages[0].content[0].image_url.url, "data:image/jpeg;base64,fake-image-bytes");
  });
});

test("Totem chat returns a retryable error when the model has no usable content", async () => {
  const mock = createMockGroq({ chatContent: "   " });
  await withApp(mock, async (baseUrl) => {
    const result = await post(baseUrl, "/api/chat/totem", {
      planteId: "baobab",
      planteData: plantData,
      messages: [{ role: "user", content: "Que peux-tu m'apprendre ?" }],
      userLang: "fr",
    });

    assert.equal(result.response.status, 502);
    assert.match(result.body.error, /indisponible|Réponse/i);
    assert.equal(mock.calls.length, 1);
  });
});

for (const [description, plantContent] of [
  ["non-JSON content", "Je ne peux pas identifier cette plante."],
  ["incomplete JSON content", JSON.stringify({ nom: "Baobab", confidence: "high" })],
]) {
  test(`Plant recognition returns a retryable error for ${description}`, async () => {
    const mock = createMockGroq({ plantContent });
    await withApp(mock, async (baseUrl) => {
      const result = await post(baseUrl, "/api/plant-recognition", {
        imageBase64: "fake-image-bytes",
        lang: "fr",
      });

      assert.equal(result.response.status, 502);
      assert.match(result.body.error, /Réponse|JSON/i);
      assert.equal(mock.calls.length, 1);
    });
  });
}

for (const path of ["/api/chat/totem", "/api/plant-recognition"]) {
  test(`${path} clearly rejects a missing API key`, async () => {
    const mock = createMockGroq();
    await withApp(mock, async (baseUrl) => {
      const result = await post(baseUrl, path, {}, null);
      assert.equal(result.response.status, 401);
      assert.equal(result.body.error, "Clé API manquante ou invalide");
      assert.equal(mock.calls.length, 0);
    });
  });

  test(`${path} clearly rejects an invalid API key`, async () => {
    const mock = createMockGroq();
    await withApp(mock, async (baseUrl) => {
      const result = await post(baseUrl, path, {}, "wrong-key");
      assert.equal(result.response.status, 401);
      assert.equal(result.body.error, "Clé API manquante ou invalide");
      assert.equal(mock.calls.length, 0);
    });
  });
}