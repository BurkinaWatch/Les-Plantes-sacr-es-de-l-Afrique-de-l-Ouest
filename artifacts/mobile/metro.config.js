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
const nativePlatformSourceBlockList = /(?:^|[\\/])(?:android|ios)(?:[\\/]|$)/;

const existingBlockList = config.resolver?.blockList;
const newBlockListEntry = new RegExp(`^${escapedPath}\\/.*$`);
config.resolver = {
  ...config.resolver,
  blockList: existingBlockList
    ? Array.isArray(existingBlockList)
      ? [
          ...existingBlockList,
          newBlockListEntry,
          ...localAndroidBuildBlockList,
          nativeCmakeBuildBlockList,
          nativePlatformSourceBlockList,
        ]
      : [
          existingBlockList,
          newBlockListEntry,
          ...localAndroidBuildBlockList,
          nativeCmakeBuildBlockList,
          nativePlatformSourceBlockList,
        ]
    : [
        newBlockListEntry,
        ...localAndroidBuildBlockList,
        nativeCmakeBuildBlockList,
        nativePlatformSourceBlockList,
      ],
};

module.exports = config;
