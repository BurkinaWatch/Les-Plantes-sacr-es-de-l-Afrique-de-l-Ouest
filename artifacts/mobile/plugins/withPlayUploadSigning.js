const { withAppBuildGradle } = require("expo/config-plugins");

const PLAY_UPLOAD_CONFIG = `        playUpload {
            storeFile rootProject.file("../.keys/play-upload-key.jks")
            storePassword System.getenv("PLAY_UPLOAD_KEY_PASSWORD")
            keyAlias "plantessacrees-upload"
            keyPassword System.getenv("PLAY_UPLOAD_KEY_PASSWORD")
        }`;

function transformBuildGradle(contents) {
  const signingConfigsStart = contents.indexOf("signingConfigs {");
  const buildTypesStart = contents.indexOf("buildTypes {", signingConfigsStart);
  if (signingConfigsStart < 0 || buildTypesStart < 0) {
    throw new Error("Could not find signingConfigs and buildTypes in app/build.gradle.");
  }

  const signingConfigContents = contents.slice(signingConfigsStart, buildTypesStart);
  if (!/\bplayUpload\s*\{/.test(signingConfigContents)) {
    const signingConfigsEnd = contents.lastIndexOf("\n    }", buildTypesStart);
    if (signingConfigsEnd <= signingConfigsStart) {
      throw new Error("Could not find the end of the signingConfigs block.");
    }
    contents =
      contents.slice(0, signingConfigsEnd) +
      `\n${PLAY_UPLOAD_CONFIG}` +
      contents.slice(signingConfigsEnd);
  }

  const updatedBuildTypesStart = contents.indexOf("buildTypes {");
  const releaseStart = contents.indexOf("release {", updatedBuildTypesStart);
  const releaseEnd = contents.indexOf("\n        }", releaseStart);
  if (releaseStart < 0 || releaseEnd < 0) {
    throw new Error("Could not find the release build type in app/build.gradle.");
  }

  const releaseContents = contents.slice(releaseStart, releaseEnd);
  const signingLine = /signingConfig\s+signingConfigs\.\w+/;
  if (signingLine.test(releaseContents)) {
    contents =
      contents.slice(0, releaseStart) +
      releaseContents.replace(signingLine, "signingConfig signingConfigs.playUpload") +
      contents.slice(releaseEnd);
  } else {
    throw new Error("Could not find a release signingConfig line in app/build.gradle.");
  }

  return contents;
}

function withPlayUploadSigning(config) {
  return withAppBuildGradle(config, (modConfig) => {
    modConfig.modResults.contents = transformBuildGradle(modConfig.modResults.contents);
    return modConfig;
  });
}

module.exports = withPlayUploadSigning;
module.exports.transformBuildGradle = transformBuildGradle;