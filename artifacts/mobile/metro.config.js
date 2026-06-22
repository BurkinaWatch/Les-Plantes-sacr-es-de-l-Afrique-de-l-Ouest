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

const existingBlockList = config.resolver?.blockList;
const newBlockListEntry = new RegExp(`^${escapedPath}\\/.*$`);
config.resolver = {
  ...config.resolver,
  blockList: existingBlockList
    ? Array.isArray(existingBlockList)
      ? [...existingBlockList, newBlockListEntry]
      : [existingBlockList, newBlockListEntry]
    : newBlockListEntry,
};

module.exports = config;
