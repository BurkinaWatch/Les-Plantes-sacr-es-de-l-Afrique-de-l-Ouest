"use strict";

const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

const imageSize = require("./index.cjs");

function png(width, height) {
  const bytes = Buffer.alloc(24);
  Buffer.from("\x89PNG\r\n\x1a\n", "binary").copy(bytes);
  bytes.writeUInt32BE(width, 16);
  bytes.writeUInt32BE(height, 20);
  return bytes;
}

function gif(width, height) {
  const bytes = Buffer.alloc(10);
  Buffer.from("GIF89a", "ascii").copy(bytes);
  bytes.writeUInt16LE(width, 6);
  bytes.writeUInt16LE(height, 8);
  return bytes;
}

function jpeg(width, height) {
  const bytes = Buffer.alloc(21);
  bytes[0] = 0xff;
  bytes[1] = 0xd8;
  bytes[2] = 0xff;
  bytes[3] = 0xc0;
  bytes.writeUInt16BE(17, 4);
  bytes[6] = 8;
  bytes.writeUInt16BE(height, 7);
  bytes.writeUInt16BE(width, 9);
  bytes[11] = 3;
  return bytes;
}

function webpChunk(type, payload) {
  const header = Buffer.alloc(12);
  header.write("RIFF", 0, "ascii");
  header.writeUInt32LE(4 + 8 + payload.length, 4);
  header.write("WEBP", 8, "ascii");

  const chunk = Buffer.alloc(8 + payload.length + (payload.length & 1));
  chunk.write(type, 0, "ascii");
  chunk.writeUInt32LE(payload.length, 4);
  payload.copy(chunk, 8);
  return Buffer.concat([header, chunk]);
}

function webpExtended(width, height) {
  const payload = Buffer.alloc(10);
  payload[4] = (width - 1) & 0xff;
  payload[5] = ((width - 1) >> 8) & 0xff;
  payload[6] = (width - 1) >> 16;
  payload[7] = (height - 1) & 0xff;
  payload[8] = ((height - 1) >> 8) & 0xff;
  payload[9] = (height - 1) >> 16;
  return webpChunk("VP8X", payload);
}

function webpLossy(width, height) {
  const payload = Buffer.alloc(10);
  payload[3] = 0x9d;
  payload[4] = 0x01;
  payload[5] = 0x2a;
  payload.writeUInt16LE(width, 6);
  payload.writeUInt16LE(height, 8);
  return webpChunk("VP8 ", payload);
}

function webpLossless(width, height) {
  const encodedWidth = width - 1;
  const encodedHeight = height - 1;
  const payload = Buffer.alloc(5);
  payload[0] = 0x2f;
  payload[1] = encodedWidth & 0xff;
  payload[2] = ((encodedWidth >> 8) & 0x3f) | ((encodedHeight & 0x03) << 6);
  payload[3] = (encodedHeight >> 2) & 0xff;
  payload[4] = encodedHeight >> 10;
  return webpChunk("VP8L", payload);
}

function bmp(width, height) {
  const bytes = Buffer.alloc(26);
  bytes.write("BM", 0, "ascii");
  bytes.writeInt32LE(width, 18);
  bytes.writeInt32LE(height, 22);
  return bytes;
}

function psd(width, height) {
  const bytes = Buffer.alloc(26);
  bytes.write("8BPS", 0, "ascii");
  bytes.writeUInt16BE(1, 4);
  bytes.writeUInt32BE(height, 14);
  bytes.writeUInt32BE(width, 18);
  return bytes;
}

function tiff(width, height, littleEndian = true) {
  const bytes = Buffer.alloc(34);
  const write16 = littleEndian
    ? (offset, value) => bytes.writeUInt16LE(value, offset)
    : (offset, value) => bytes.writeUInt16BE(value, offset);
  const write32 = littleEndian
    ? (offset, value) => bytes.writeUInt32LE(value, offset)
    : (offset, value) => bytes.writeUInt32BE(value, offset);

  bytes.write(littleEndian ? "II" : "MM", 0, "ascii");
  write16(2, 42);
  write32(4, 8);
  write16(8, 2);
  write16(10, 256);
  write16(12, 4);
  write32(14, 1);
  write32(18, width);
  write16(22, 257);
  write16(24, 4);
  write32(26, 1);
  write32(30, height);
  return bytes;
}

function ktx(width, height) {
  const bytes = Buffer.alloc(44);
  Buffer.from([0xab, 0x4b, 0x54, 0x58, 0x20, 0x31]).copy(bytes);
  bytes.writeUInt32LE(width, 36);
  bytes.writeUInt32LE(height, 40);
  return bytes;
}

const validFixtures = [
  ["png", png(640, 480), { width: 640, height: 480, type: "png" }],
  ["gif", gif(320, 200), { width: 320, height: 200, type: "gif" }],
  ["jpeg", jpeg(800, 600), { width: 800, height: 600, type: "jpg" }],
  [
    "webp VP8X",
    webpExtended(1024, 768),
    { width: 1024, height: 768, type: "webp" },
  ],
  ["webp VP8", webpLossy(321, 213), { width: 321, height: 213, type: "webp" }],
  ["webp VP8L", webpLossless(37, 29), { width: 37, height: 29, type: "webp" }],
  ["bmp", bmp(400, 300), { width: 400, height: 300, type: "bmp" }],
  ["psd", psd(1600, 900), { width: 1600, height: 900, type: "psd" }],
  [
    "tiff little-endian",
    tiff(256, 128),
    { width: 256, height: 128, type: "tiff" },
  ],
  [
    "tiff big-endian",
    tiff(256, 128, false),
    { width: 256, height: 128, type: "tiff" },
  ],
  ["ktx", ktx(512, 256), { width: 512, height: 256, type: "ktx" }],
  [
    "svg dimensions",
    Buffer.from('<svg width="120" height="80" viewBox="0 0 120 80"></svg>'),
    { width: 120, height: 80, type: "svg" },
  ],
  [
    "svg viewBox",
    Buffer.from('<svg viewBox="-4 2 90 45"></svg>'),
    { width: 90, height: 45, type: "svg" },
  ],
];

test("all supported image formats return their encoded dimensions", () => {
  for (const [name, input, expected] of validFixtures) {
    assert.deepEqual(imageSize(input), expected, name);
  }
});
test("the exported format list stays aligned with the supported fixtures", () => {
  const fixtureTypes = new Set(
    validFixtures.map(([, , dimensions]) => dimensions.type),
  );
  const canonicalTypes = new Set(
    imageSize.types.map((type) => (type === "jpeg" ? "jpg" : type)),
  );
  assert.deepEqual(canonicalTypes, fixtureTypes);
});

const malformedFixtures = [
  ["empty input", Buffer.alloc(0)],
  ["truncated png signature", Buffer.from("\x89PNG\r\n\x1a\n", "binary")],
  ["truncated gif header", Buffer.from("GIF89a", "ascii")],
  [
    "jpeg segment without a complete length",
    Buffer.from([0xff, 0xd8, 0xff, 0xc0, 0x00]),
  ],
  [
    "jpeg segment with an invalid short length",
    Buffer.from([0xff, 0xd8, 0xff, 0xc0, 0x00, 0x01]),
  ],
  [
    "jpeg segment longer than the input",
    Buffer.from([0xff, 0xd8, 0xff, 0xc0, 0xff, 0xff]),
  ],
  [
    "webp chunk longer than the input",
    (() => {
      const bytes = Buffer.alloc(20);
      bytes.write("RIFF", 0, "ascii");
      bytes.write("WEBP", 8, "ascii");
      bytes.write("VP8X", 12, "ascii");
      bytes.writeUInt32LE(0xffffffff, 16);
      return bytes;
    })(),
  ],
  ["truncated bmp header", Buffer.alloc(25, 0)],
  [
    "psd header with missing dimension bytes",
    Buffer.concat([Buffer.from("8BPS", "ascii"), Buffer.alloc(21)]),
  ],
  [
    "tiff IFD outside the input",
    (() => {
      const bytes = Buffer.alloc(8);
      bytes.write("II", 0, "ascii");
      bytes.writeUInt16LE(42, 2);
      bytes.writeUInt32LE(0xffffffff, 4);
      return bytes;
    })(),
  ],
  [
    "tiff IFD entries longer than the input",
    (() => {
      const bytes = Buffer.alloc(10);
      bytes.write("II", 0, "ascii");
      bytes.writeUInt16LE(42, 2);
      bytes.writeUInt32LE(8, 4);
      bytes.writeUInt16LE(1, 8);
      return bytes;
    })(),
  ],
  ["truncated ktx header", Buffer.alloc(43, 0xab)],
  ["svg without both dimensions", Buffer.from('<svg width="10"></svg>')],
  ["unknown file type", Buffer.from("not an image")],
];

test("truncated headers and invalid lengths are rejected", () => {
  for (const [name, input] of malformedFixtures) {
    assert.throws(() => imageSize(input), name);
  }
});

test("malformed inputs are rejected within a bounded time", () => {
  const childScript = `
    const imageSize = require(process.argv[1]);
    for (const encoded of JSON.parse(process.argv[2])) {
      try {
        imageSize(Buffer.from(encoded, "base64"));
        process.exitCode = 1;
      } catch {}
    }
  `;
  const result = spawnSync(
    process.execPath,
    [
      "-e",
      childScript,
      require.resolve("./index.cjs"),
      JSON.stringify(
        malformedFixtures.map(([, input]) => input.toString("base64")),
      ),
    ],
    { encoding: "utf8", timeout: 500 },
  );

  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
});
