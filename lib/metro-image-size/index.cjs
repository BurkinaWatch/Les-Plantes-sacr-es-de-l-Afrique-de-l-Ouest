"use strict";

const fs = require("node:fs");

// Metro only needs synchronous dimensions from an already loaded asset buffer.
// Keep the input bounded so malformed assets cannot make parsing unbounded.
const MAX_INPUT_SIZE = 512 * 1024;

function fail(type = "unknown") {
  throw new TypeError(`unsupported file type: ${type}`);
}

function asBytes(input) {
  if (typeof input === "string") {
    const descriptor = fs.openSync(input, "r");
    try {
      const { size } = fs.fstatSync(descriptor);
      if (size <= 0) {
        throw new Error("Empty file");
      }
      const bytes = Buffer.allocUnsafe(Math.min(size, MAX_INPUT_SIZE));
      fs.readSync(descriptor, bytes, 0, bytes.length, 0);
      return bytes;
    } finally {
      fs.closeSync(descriptor);
    }
  }

  if (input instanceof Uint8Array) {
    const bytes =
      input.byteLength > MAX_INPUT_SIZE
        ? input.subarray(0, MAX_INPUT_SIZE)
        : input;
    return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }

  throw new TypeError("invalid invocation. input should be a Uint8Array");
}

function isPng(bytes) {
  return (
    bytes.length >= 24 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  );
}

function parsePng(bytes) {
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    type: "png",
  };
}

function isGif(bytes) {
  return (
    bytes.length >= 10 &&
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38 &&
    (bytes[4] === 0x37 || bytes[4] === 0x39) &&
    bytes[5] === 0x61
  );
}

function parseGif(bytes) {
  return {
    width: bytes.readUInt16LE(6),
    height: bytes.readUInt16LE(8),
    type: "gif",
  };
}

function isJpeg(bytes) {
  return bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xd8;
}

function parseJpeg(bytes) {
  let offset = 2;
  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    while (offset < bytes.length && bytes[offset] === 0xff) {
      offset += 1;
    }
    if (offset >= bytes.length) {
      break;
    }

    const marker = bytes[offset];
    offset += 1;
    if (marker === 0xd9 || marker === 0xda) {
      break;
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue;
    }
    if (offset + 2 > bytes.length) {
      break;
    }

    const segmentLength = bytes.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > bytes.length) {
      break;
    }

    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isStartOfFrame && segmentLength >= 7) {
      return {
        height: bytes.readUInt16BE(offset + 3),
        width: bytes.readUInt16BE(offset + 5),
        type: "jpg",
      };
    }
    offset += segmentLength;
  }

  fail("jpg");
}

function isWebp(bytes) {
  return (
    bytes.length >= 16 &&
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP"
  );
}

function parseWebp(bytes) {
  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const chunkType = bytes.toString("ascii", offset, offset + 4);
    const chunkLength = bytes.readUInt32LE(offset + 4);
    const payload = offset + 8;
    if (payload + chunkLength > bytes.length) {
      break;
    }

    if (chunkType === "VP8X" && chunkLength >= 10) {
      return {
        width:
          1 +
          bytes[payload + 4] +
          (bytes[payload + 5] << 8) +
          (bytes[payload + 6] << 16),
        height:
          1 +
          bytes[payload + 7] +
          (bytes[payload + 8] << 8) +
          (bytes[payload + 9] << 16),
        type: "webp",
      };
    }

    if (chunkType === "VP8 " && chunkLength >= 10) {
      if (
        bytes[payload + 3] === 0x9d &&
        bytes[payload + 4] === 0x01 &&
        bytes[payload + 5] === 0x2a
      ) {
        return {
          width: bytes.readUInt16LE(payload + 6) & 0x3fff,
          height: bytes.readUInt16LE(payload + 8) & 0x3fff,
          type: "webp",
        };
      }
    }

    if (chunkType === "VP8L" && chunkLength >= 5 && bytes[payload] === 0x2f) {
      return {
        width:
          1 +
          bytes[payload + 1] +
          ((bytes[payload + 2] & 0x3f) << 8),
        height:
          1 +
          ((bytes[payload + 2] >> 6) |
            (bytes[payload + 3] << 2) |
            ((bytes[payload + 4] & 0x0f) << 10)),
        type: "webp",
      };
    }

    offset = payload + chunkLength + (chunkLength & 1);
  }

  fail("webp");
}

function isBmp(bytes) {
  return bytes.length >= 26 && bytes[0] === 0x42 && bytes[1] === 0x4d;
}

function parseBmp(bytes) {
  return {
    width: Math.abs(bytes.readInt32LE(18)),
    height: Math.abs(bytes.readInt32LE(22)),
    type: "bmp",
  };
}

function isPsd(bytes) {
  return (
    bytes.length >= 26 &&
    bytes.toString("ascii", 0, 4) === "8BPS" &&
    bytes.readUInt16BE(4) === 1
  );
}

function parsePsd(bytes) {
  return {
    width: bytes.readUInt32BE(18),
    height: bytes.readUInt32BE(14),
    type: "psd",
  };
}

function isTiff(bytes) {
  return (
    bytes.length >= 8 &&
    ((bytes[0] === 0x49 &&
      bytes[1] === 0x49 &&
      bytes.readUInt16LE(2) === 42) ||
      (bytes[0] === 0x4d &&
        bytes[1] === 0x4d &&
        bytes.readUInt16BE(2) === 42))
  );
}

function parseTiff(bytes) {
  const littleEndian = bytes[0] === 0x49;
  const read16 = littleEndian
    ? (offset) => bytes.readUInt16LE(offset)
    : (offset) => bytes.readUInt16BE(offset);
  const read32 = littleEndian
    ? (offset) => bytes.readUInt32LE(offset)
    : (offset) => bytes.readUInt32BE(offset);
  const ifdOffset = read32(4);
  if (ifdOffset > bytes.length - 2) {
    fail("tiff");
  }

  const entryCount = read16(ifdOffset);
  if (entryCount > 1024 || ifdOffset + 2 + entryCount * 12 > bytes.length) {
    fail("tiff");
  }

  let width;
  let height;
  for (let index = 0; index < entryCount; index += 1) {
    const entry = ifdOffset + 2 + index * 12;
    const tag = read16(entry);
    if (tag !== 256 && tag !== 257) {
      continue;
    }
    const format = read16(entry + 2);
    const count = read32(entry + 4);
    const byteSize = format === 3 ? 2 : format === 4 ? 4 : 0;
    if (!byteSize || count < 1 || count > 1_000_000) {
      continue;
    }
    const totalSize = byteSize * count;
    const valueOffset = totalSize <= 4 ? entry + 8 : read32(entry + 8);
    if (
      valueOffset > bytes.length - byteSize ||
      valueOffset + totalSize > bytes.length
    ) {
      continue;
    }
    const value =
      format === 3 ? read16(valueOffset) : read32(valueOffset);
    if (tag === 256) width = value;
    if (tag === 257) height = value;
  }

  if (!width || !height) {
    fail("tiff");
  }
  return { width, height, type: "tiff" };
}

function isKtx(bytes) {
  return (
    bytes.length >= 44 &&
    bytes[0] === 0xab &&
    bytes[1] === 0x4b &&
    bytes[2] === 0x54 &&
    bytes[3] === 0x58 &&
    bytes[4] === 0x20 &&
    bytes[5] === 0x31
  );
}

function parseKtx(bytes) {
  return {
    width: bytes.readUInt32LE(36),
    height: bytes.readUInt32LE(40),
    type: "ktx",
  };
}

function isSvg(bytes) {
  return /<svg(?:\s|>)/i.test(bytes.toString("utf8", 0, MAX_INPUT_SIZE));
}

function parseSvg(bytes) {
  const source = bytes.toString("utf8", 0, MAX_INPUT_SIZE);
  const tag = source.match(/<svg\b[^>]*>/i)?.[0] ?? "";
  const readDimension = (name) => {
    const value = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)`, "i"));
    const numeric = value?.[1].match(/^\s*([0-9]+(?:\.[0-9]+)?)/)?.[1];
    return numeric ? Number(numeric) : undefined;
  };
  let width = readDimension("width");
  let height = readDimension("height");
  const viewBox = tag.match(
    /\bviewBox\s*=\s*["']\s*[-+\d.]+\s+[-+\d.]+\s+([\d.]+)\s+([\d.]+)/i,
  );
  width ??= viewBox ? Number(viewBox[1]) : undefined;
  height ??= viewBox ? Number(viewBox[2]) : undefined;
  if (!width || !height || !Number.isFinite(width) || !Number.isFinite(height)) {
    fail("svg");
  }
  return { width, height, type: "svg" };
}

function imageSize(input) {
  const bytes = asBytes(input);
  if (isPng(bytes)) return parsePng(bytes);
  if (isGif(bytes)) return parseGif(bytes);
  if (isJpeg(bytes)) return parseJpeg(bytes);
  if (isWebp(bytes)) return parseWebp(bytes);
  if (isBmp(bytes)) return parseBmp(bytes);
  if (isPsd(bytes)) return parsePsd(bytes);
  if (isTiff(bytes)) return parseTiff(bytes);
  if (isKtx(bytes)) return parseKtx(bytes);
  if (isSvg(bytes)) return parseSvg(bytes);
  fail();
}

module.exports = imageSize;
module.exports.default = imageSize;
module.exports.imageSize = imageSize;
module.exports.types = ["png", "jpg", "jpeg", "bmp", "gif", "webp", "psd", "svg", "tiff", "ktx"];