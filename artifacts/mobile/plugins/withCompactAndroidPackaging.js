const { withGradleProperties } = require("expo/config-plugins");

// Preserve all four ABIs. Compression reduces the universal APK download
// without excluding older ARM devices or x86 devices/emulators.
function compactProperties(properties) {
  return [
    ...properties.filter(
      (entry) => !(entry.type === "property" && entry.key === "expo.useLegacyPackaging"),
    ),
    { type: "property", key: "expo.useLegacyPackaging", value: "true" },
  ];
}

module.exports = (config) =>
  withGradleProperties(config, (mod) => {
    mod.modResults = compactProperties(mod.modResults);
    return mod;
  });
module.exports.compactProperties = compactProperties;
