const fs = require("fs");
const path = require("path");
const {
  checkPublicDeployment,
  formatPublicDeploymentReport,
  getDeploymentDomain,
  normalizeBasePath,
} = require("../lib/public-deployment");

function getExpectedAppName() {
  const appJsonPath = path.resolve(__dirname, "..", "app.json");
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));
  const appName = appJson.expo?.name;
  if (!appName) {
    throw new Error("Could not determine the expected Expo application name from app.json");
  }
  return appName;
}

async function main() {
  let domain;
  let basePath;
  try {
    domain = getDeploymentDomain();
    basePath = normalizeBasePath(process.env.BASE_PATH);
  } catch (error) {
    console.error(`PUBLIC DEPLOYMENT CHECK FAILED\n- ${error.message}`);
    process.exitCode = 1;
    return;
  }

  const report = await checkPublicDeployment({
    domain,
    expectedAppName: getExpectedAppName(),
    basePath,
  });
  console.log(formatPublicDeploymentReport(report));
  if (!report.ok) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`PUBLIC DEPLOYMENT CHECK FAILED\n- ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { getExpectedAppName, main };