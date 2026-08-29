const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const outputRoot = path.join(root, ".data-test-dist");
const sources = [
  "data/plantes-medicinales-complementaires.ts",
  "data/plantes-medicinales.ts",
  "data/animals.ts",
];

fs.rmSync(outputRoot, { recursive: true, force: true });

for (const source of sources) {
  const sourcePath = path.join(root, source);
  const outputPath = path.join(
    outputRoot,
    source.replace(/\.tsx?$/, ".js"),
  );
  const result = ts.transpileModule(fs.readFileSync(sourcePath, "utf8"), {
    fileName: sourcePath,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
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