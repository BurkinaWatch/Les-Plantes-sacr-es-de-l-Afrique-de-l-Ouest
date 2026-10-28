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

test("fatal startup errors reach the mounted recovery listener without exposing message or stack", () => {
  const capture = createStartupFatalCapture();
  const runtime = makeErrorUtils();
  runtime.setOriginalHandler(() => runtime.countPreviousCall());
  const events = [];
  const nativeErrors = [];

  capture.setNativeBridge({
    recordStartupError: (...args) => {
      nativeErrors.push(args);
      return true;
    },
  });
  capture.setStage("navigation");
  capture.subscribe(event => events.push(event));
  capture.install(runtime.utils);
  runtime.invoke(
    new TypeError("account@example.com token=private-secret"),
    true,
  );

  assert.equal(capture.getDiagnostic().errorType, "TypeError");
  assert.equal(capture.getDiagnostic().stage, "navigation");
  assert.equal(capture.getDiagnostic().errorMessage, "[e-mail] token=[masqué]");
  assert.equal(capture.getDiagnostic().errorKind, "fatal-js");
  assert.doesNotMatch(capture.getDiagnostic().errorStack, /account@example\.com|private-secret/);
  assert.equal(events.length, 1);
  assert.equal(events[0].errorKind, "fatal-js");
  assert.deepEqual(nativeErrors[0].slice(0, 2), [
    "TypeError",
    "[e-mail] token=[masqué]",
  ]);
  assert.equal(nativeErrors[0][3], "navigation");
  assert.equal(nativeErrors[0][4], "fatal-js");
  assert.equal(runtime.previousCalls, 0);
});

test("native diagnostic bridge failures do not replace React Native error handling", () => {
  const capture = createStartupFatalCapture();
  const runtime = makeErrorUtils();
  runtime.setOriginalHandler(() => runtime.countPreviousCall());
  capture.setNativeBridge({
    recordStartupError() {
      throw new Error("native bridge failed");
    },
  });
  capture.install(runtime.utils);

  assert.doesNotThrow(() => runtime.invoke(new Error("startup failed"), true));
  assert.equal(runtime.previousCalls, 1);
});

test("fatal startup errors before a recovery listener preserve React Native handling", () => {
  const capture = createStartupFatalCapture();
  const runtime = makeErrorUtils();
  runtime.setOriginalHandler(() => runtime.countPreviousCall());
  capture.install(runtime.utils);
  capture.setStage("root-layout");
  runtime.invoke(new TypeError("startup failed"), true);

  assert.equal(capture.getDiagnostic().errorType, "TypeError");
  assert.equal(capture.getDiagnostic().stage, "root-layout");
  assert.equal(capture.getDiagnostic().errorMessage, "startup failed");
  assert.equal(runtime.previousCalls, 1);
});

test("fatal entry errors are labeled and preserve React Native handling before recovery mounts", () => {
  const capture = createStartupFatalCapture();
  const runtime = makeErrorUtils();
  runtime.setOriginalHandler(() => runtime.countPreviousCall());
  capture.install(runtime.utils);
  capture.setStage("javascript-entry");

  const error = new TypeError("private account and token must never be copied");
  capture.recordFatalError(error);

  assert.equal(capture.getDiagnostic().errorType, "TypeError");
  assert.equal(capture.getDiagnostic().stage, "javascript-entry");
  assert.equal(
    capture.getDiagnostic().errorMessage,
    "private account and token must never be copied",
  );
  assert.equal(runtime.previousCalls, 0);
  runtime.invoke(error, true);
  assert.equal(runtime.previousCalls, 1);
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

test("unhandled promise failures are captured with a sanitized stack before readiness", () => {
  const capture = createStartupFatalCapture();
  const events = [];
  const nativeErrors = [];
  capture.setNativeBridge({
    recordStartupError: (...args) => {
      nativeErrors.push(args);
      return true;
    },
  });
  capture.setStage("providers");
  capture.subscribe(event => events.push(event));

  assert.equal(
    capture.recordPromiseRejection(
      new TypeError("email=customer@example.com token=private-token"),
    ),
    true,
  );
  assert.equal(events[0].errorKind, "promise-rejection");
  assert.match(events[0].errorMessage, /email=\[masqué\].*token=\[masqué\]/);
  assert.equal(nativeErrors[0][4], "promise-rejection");
  assert.doesNotMatch(events[0].errorStack, /customer@example\.com|private-token/);
});

test("React root render errors are persisted without notifying global recovery listeners", () => {
  const capture = createStartupFatalCapture();
  const events = [];
  const nativeErrors = [];
  capture.setNativeBridge({
    recordStartupError: (...args) => {
      nativeErrors.push(args);
      return true;
    },
  });
  capture.setStage("root-layout");
  capture.subscribe(event => events.push(event));

  capture.recordRenderError(new Error("render failed"), "Error: render failed\nat Root\nat App");

  assert.equal(events.length, 0);
  assert.equal(nativeErrors.length, 1);
  assert.equal(nativeErrors[0][4], "react-render-error");
  assert.match(nativeErrors[0][2], /Root/);
});
