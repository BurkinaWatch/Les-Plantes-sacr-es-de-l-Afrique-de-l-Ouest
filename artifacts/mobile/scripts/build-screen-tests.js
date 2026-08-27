const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const outputRoot = path.join(root, ".screen-test-dist");

const sources = [
  ["app/chat-totem.tsx", "app/chat-totem.js"],
  ["app/(tabs)/scanner.tsx", "app/(tabs)/scanner.js"],
  ["lib/ai-api.ts", "lib/ai-api.js"],
];

fs.rmSync(outputRoot, { recursive: true, force: true });
for (const [source, output] of sources) {
  const sourcePath = path.join(root, source);
  const outputPath = path.join(outputRoot, output);
  const result = ts.transpileModule(fs.readFileSync(sourcePath, "utf8"), {
    fileName: sourcePath,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
    },
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, result.outputText);
}

fs.writeFileSync(
  path.join(outputRoot, "package.json"),
  JSON.stringify({ type: "commonjs" }),
);