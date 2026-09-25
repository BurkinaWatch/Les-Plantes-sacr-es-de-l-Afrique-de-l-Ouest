const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.server = {
  ...config.server,
  allowedHosts: "all",
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return middleware(req, res, next);
    };
  },
};

const mockupSandboxPath = path.resolve(__dirname, "../../artifacts/mockup-sandbox");
const escapedPath = mockupSandboxPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const localAndroidBuildPaths = [".android-sdk", ".android-user", ".gradle-cache"].map((directory) =>
  path.resolve(__dirname, directory),
);
const localAndroidBuildBlockList = localAndroidBuildPaths.map((buildPath) => {
  const escapedBuildPath = buildPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escapedBuildPath}(?:[\\\\/].*)?$`);
});
const nativeCmakeBuildBlockList = /(?:^|[\\/])\.cxx(?:[\\/]|$)/;
const nativeAndroidSourceBlockList = /(?:^|[\\/])android[\\/](?:src|build|\.gradle)(?:[\\/]|$)/;

const existingBlockList = config.resolver?.blockList;
const newBlockListEntry = new RegExp(`^${escapedPath}\\/.*$`);
// Keep native build trees and local toolchain caches out of Metro's file map;
// they are not JavaScript inputs and can exhaust the fallback watcher's quota.
config.resolver = {
  ...config.resolver,
  blockList: existingBlockList
    ? Array.isArray(existingBlockList)
      ? [
          ...existingBlockList,
          newBlockListEntry,
          ...localAndroidBuildBlockList,
          nativeCmakeBuildBlockList,
          nativeAndroidSourceBlockList,
        ]
      : [
          existingBlockList,
          newBlockListEntry,
          ...localAndroidBuildBlockList,
          nativeCmakeBuildBlockList,
          nativeAndroidSourceBlockList,
        ]
    : [
        newBlockListEntry,
        ...localAndroidBuildBlockList,
        nativeCmakeBuildBlockList,
        nativeAndroidSourceBlockList,
      ],
};

module.exports = config;
