import assert from "node:assert/strict";
import test from "node:test";

import { isValidUsername } from "../.test-dist/lib/auth-validation.js";

test("accepts usernames matching the account rules", () => {
  assert.equal(isValidUsername("wagaraaga"), true);
  assert.equal(isValidUsername("Sacred_Plant7"), true);
  assert.equal(isValidUsername(" valid_name "), true);
});

test("rejects email addresses and characters outside the account rules", () => {
  assert.equal(isValidUsername("name@example.com"), false);
  assert.equal(isValidUsername("two words"), false);
  assert.equal(isValidUsername("name-hyphen"), false);
});

test("enforces the server username length limits after trimming", () => {
  assert.equal(isValidUsername("ab"), false);
  assert.equal(isValidUsername("a".repeat(30)), true);
  assert.equal(isValidUsername("a".repeat(31)), false);
});