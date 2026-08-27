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

test("Totem client returns a successful mocked response and sends the API key", async () => {
  const mock = fakeFetch(response(200, { content: "Je t'écoute." }, {
    "RateLimit-Remaining": "19",
    "RateLimit-Reset": "12345",
  }));
  const result = await requestTotem({
    apiBase: "https://example.test/api/",
    apiKey: "mobile-test-key",
    token: "jwt-test",
    body: totemBody,
    fetchImpl: mock.fetchImpl,
  });

  assert.deepEqual(result, { content: "Je t'écoute.", remaining: 19, resetAt: 12345 });
  assert.equal(mock.calls[0].url, "https://example.test/api/chat/totem");
  assert.equal(mock.calls[0].options.headers["x-api-key"], "mobile-test-key");
  assert.equal(mock.calls[0].options.headers.Authorization, "Bearer jwt-test");
  assert.deepEqual(JSON.parse(mock.calls[0].options.body), totemBody);
});

test("Plant recognition client returns a successful mocked response", async () => {
  const plant = { nom: "Baobab", confidence: "high" };
  const mock = fakeFetch(response(200, { plant }));
  const result = await requestPlantRecognition({
    apiBase: "https://example.test/api",
    apiKey: "mobile-test-key",
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

for (const request of [
  () => requestTotem({
    apiBase: "https://example.test/api",
    apiKey: "",
    body: totemBody,
    fetchImpl: async () => { throw new Error("network must not be called"); },
  }),
  () => requestPlantRecognition({
    apiBase: "https://example.test/api",
    apiKey: "",
    imageBase64: "fake-image",
    lang: "fr",
    fetchImpl: async () => { throw new Error("network must not be called"); },
  }),
]) {
  test("AI clients expose a clear missing-key error before making a request", async () => {
    await assert.rejects(request(), (error) => error instanceof ApiRequestError && error.code === "missing_key");
  });
}

for (const request of [
  () => requestTotem({
    apiBase: "https://example.test/api",
    apiKey: "wrong-key",
    body: totemBody,
    fetchImpl: async () => response(401, { error: "Clé API manquante ou invalide" }),
  }),
  () => requestPlantRecognition({
    apiBase: "https://example.test/api",
    apiKey: "wrong-key",
    imageBase64: "fake-image",
    lang: "fr",
    fetchImpl: async () => response(401, { error: "Clé API manquante ou invalide" }),
  }),
]) {
  test("AI clients expose a clear invalid-key error from the API boundary", async () => {
    await assert.rejects(request(), (error) => error instanceof ApiRequestError && error.code === "invalid_key");
  });
}