import assert from "node:assert/strict";
import test from "node:test";

import {
  ApiRequestError,
  requestPlantRecognition,
  requestTotem,
} from "../.test-dist/ai-api.js";

function response(status, body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function fakeFetch(result) {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    return result;
  };
  return { calls, fetchImpl };
}

const totemBody = {
  planteId: "baobab",
  planteData: { nom: "Baobab" },
  messages: [{ role: "user", content: "Bonjour" }],
  userLang: "fr",
};

const validPlant = {
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
};

test("Totem client returns a successful mocked response and sends only the JWT", async () => {
  const mock = fakeFetch(response(200, { content: "Je t'écoute." }, {
    "RateLimit-Remaining": "19",
    "RateLimit-Reset": "12345",
  }));
  const result = await requestTotem({
    apiBase: "https://example.test/api/",
    token: "jwt-test",
    body: totemBody,
    fetchImpl: mock.fetchImpl,
  });

  assert.deepEqual(result, { content: "Je t'écoute.", remaining: 19, resetAt: 12345 });
  assert.equal(mock.calls[0].url, "https://example.test/api/chat/totem");
  assert.equal(mock.calls[0].options.headers["x-api-key"], undefined);
  assert.equal(mock.calls[0].options.headers.Authorization, "Bearer jwt-test");
  assert.deepEqual(JSON.parse(mock.calls[0].options.body), totemBody);
});

test("Plant recognition client returns a successful mocked response", async () => {
  const plant = validPlant;
  const mock = fakeFetch(response(200, { plant }));
  const result = await requestPlantRecognition({
    apiBase: "https://example.test/api",
    token: "jwt-test",
    imageBase64: "fake-image",
    lang: "fr",
    fetchImpl: mock.fetchImpl,
  });

  assert.deepEqual(result, { plant, remaining: null, resetAt: null });
  assert.equal(mock.calls[0].url, "https://example.test/api/plant-recognition");
  assert.deepEqual(JSON.parse(mock.calls[0].options.body), {
    imageBase64: "fake-image",
    lang: "fr",
  });
});

test("Totem client rejects a successful response with no usable content", async () => {
  const mock = fakeFetch(response(200, { content: "  " }));

  await assert.rejects(
    requestTotem({
      apiBase: "https://example.test/api",
      token: "jwt-test",
      body: totemBody,
      fetchImpl: mock.fetchImpl,
    }),
    (error) => error instanceof ApiRequestError && error.code === "unavailable",
  );
});

test("Plant recognition client rejects an incomplete successful payload", async () => {
  const mock = fakeFetch(response(200, { plant: { nom: "Baobab" } }));

  await assert.rejects(
    requestPlantRecognition({
      apiBase: "https://example.test/api",
      token: "jwt-test",
      imageBase64: "fake-image",
      lang: "fr",
      fetchImpl: mock.fetchImpl,
    }),
    (error) => error instanceof ApiRequestError && error.code === "unavailable",
  );
});

test("Plant recognition client preserves a valid unable-to-identify response", async () => {
  const plant = { error: true, message: "Impossible d'identifier la plante." };
  const mock = fakeFetch(response(200, { plant }));

  const result = await requestPlantRecognition({
    apiBase: "https://example.test/api",
    apiKey: "mobile-test-key",
    imageBase64: "fake-image",
    lang: "fr",
    fetchImpl: mock.fetchImpl,
  });

  assert.deepEqual(result.plant, plant);
});

for (const request of [
  () => requestTotem({
    apiBase: "https://example.test/api",
    body: totemBody,
    fetchImpl: async () => { throw new Error("network must not be called"); },
  }),
  () => requestPlantRecognition({
    apiBase: "https://example.test/api",
      token: null,
    imageBase64: "fake-image",
    lang: "fr",
    fetchImpl: async () => { throw new Error("network must not be called"); },
  }),
]) {
  test("AI clients reject an absent session before making a request", async () => {
    await assert.rejects(request(), (error) => error instanceof ApiRequestError && error.code === "unauthenticated");
  });
}

for (const request of [
  () => requestTotem({
    apiBase: "https://example.test/api",
    token: "wrong-token",
    body: totemBody,
    fetchImpl: async () => response(401, { error: "Clé API manquante ou invalide" }),
  }),
  () => requestPlantRecognition({
    apiBase: "https://example.test/api",
    token: "wrong-token",
    imageBase64: "fake-image",
    lang: "fr",
    fetchImpl: async () => response(401, { error: "Clé API manquante ou invalide" }),
  }),
]) {
  test("AI clients expose an unauthenticated error from the API boundary", async () => {
    await assert.rejects(request(), (error) => error instanceof ApiRequestError && error.code === "unauthenticated");
  });
}