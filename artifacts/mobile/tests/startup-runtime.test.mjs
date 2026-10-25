import assert from "node:assert/strict";
import test from "node:test";
import { createStartupFatalCapture } from "../.test-dist/lib/startup-runtime.js";

function makeErrorUtils() {
  let handler = () => {};
  let previousCalls = 0;
  return {
    utils: {
      getGlobalHandler: () => handler,
      setGlobalHandler: next => { handler = next; },
    },
    setOriginalHandler(next) {
      handler = next;
    },
    invoke(error, isFatal) {
      handler(error, isFatal);
    },
    get previousCalls() {
      return previousCalls;
    },
    countPreviousCall() {
      previousCalls += 1;
    },
  };
}

test("fatal startup errors are captured without exposing message or stack", () => {
  const capture = createStartupFatalCapture();
  const runtime = makeErrorUtils();
  runtime.setOriginalHandler(() => runtime.countPreviousCall());
  const events = [];

  capture.setStage("navigation");
  capture.subscribe(event => events.push(event));
  capture.install(runtime.utils);
  runtime.invoke(
    new TypeError("account@example.com token=private-secret"),
    true,
  );

  assert.deepEqual(capture.getDiagnostic(), {
    errorType: "TypeError",
    stage: "navigation",
  });
  assert.deepEqual(events, [{ errorType: "TypeError", stage: "navigation" }]);
  assert.equal(runtime.previousCalls, 0);
});

test("fatal errors after the first route keep the original crash handling", () => {
  const capture = createStartupFatalCapture();
  const runtime = makeErrorUtils();
  runtime.setOriginalHandler(() => runtime.countPreviousCall());
  capture.install(runtime.utils);
  capture.setStage("route-laid-out");
  runtime.invoke(new Error("runtime failure"), true);

  assert.equal(capture.getDiagnostic(), null);
  assert.equal(runtime.previousCalls, 1);
});

test("nonfatal errors keep the original React Native handling", () => {
  const capture = createStartupFatalCapture();
  const runtime = makeErrorUtils();
  runtime.setOriginalHandler(() => runtime.countPreviousCall());
  capture.install(runtime.utils);
  runtime.invoke(new Error("warning"), false);

  assert.equal(capture.getDiagnostic(), null);
  assert.equal(runtime.previousCalls, 1);
});
