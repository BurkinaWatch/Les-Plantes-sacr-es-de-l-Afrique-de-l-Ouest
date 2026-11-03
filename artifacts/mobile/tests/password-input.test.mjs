import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const mobileRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("login, registration, confirmation, and account deletion use the shared password input", () => {
  const fieldsByScreen = [
    ["app/(auth)/login.tsx", 1],
    ["app/(auth)/register.tsx", 2],
    ["app/account-deletion.tsx", 1],
  ];

  for (const [relativePath, expectedCount] of fieldsByScreen) {
    const source = fs.readFileSync(path.join(mobileRoot, relativePath), "utf8");
    const fields = source.match(/<PasswordInput\b/g) ?? [];
    assert.equal(fields.length, expectedCount, `${relativePath} password field count`);
    assert.doesNotMatch(source, /secureTextEntry/);
  }
});
