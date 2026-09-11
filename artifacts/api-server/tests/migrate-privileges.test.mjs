import assert from "node:assert/strict";
import test from "node:test";

import { verifyEffectivePrivileges } from "../.test-dist/src/lib/migrate.js";

function createPrivilegeClient({
  databaseUser = "api_runtime",
  objectExists = true,
  privilegeGranted = false,
}) {
  return {
    async query() {
      return {
        rows: [
          {
            database_user: databaseUser,
            object_exists: objectExists,
            privilege_granted: privilegeGranted,
          },
        ],
      };
    },
  };
}

test("reports the API role and missing table privilege", async () => {
  await assert.rejects(
    verifyEffectivePrivileges(
      createPrivilegeClient({}),
      "postgresql://test.invalid/app",
      [
        {
          objectType: "table",
          objectName: "users",
          privileges: ["SELECT"],
        },
      ],
    ),
    (error) => {
      assert.match(error.message, /role "api_runtime"/);
      assert.match(error.message, /lacks SELECT/);
      assert.match(error.message, /on table/);
      assert.match(error.message, /"users"/);
      return true;
    },
  );
});

test("reports the API role and missing sequence privilege", async () => {
  await assert.rejects(
    verifyEffectivePrivileges(
      createPrivilegeClient({}),
      "postgresql://test.invalid/app",
      [
        {
          objectType: "sequence",
          objectName: "users_id_seq",
          privileges: ["USAGE"],
        },
      ],
    ),
    (error) => {
      assert.match(error.message, /role "api_runtime"/);
      assert.match(error.message, /lacks USAGE/);
      assert.match(error.message, /on sequence/);
      assert.match(error.message, /"users_id_seq"/);
      return true;
    },
  );
});