#!/usr/bin/env bash
# The only release entry point: signed compilation -> blocking audit -> evidence.
set -euo pipefail
cd "$(dirname "$0")/.."
export ANDROID_HOME="${ANDROID_HOME:-$PWD/.android-sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export ANDROID_USER_HOME="${ANDROID_USER_HOME:-$PWD/.android-user}"
export GRADLE_USER_HOME="${GRADLE_USER_HOME:-$PWD/.gradle-cache}"
export CMAKE_BUILD_PARALLEL_LEVEL=2
tools="$ANDROID_HOME/build-tools/36.0.0"
evidence="$PWD/../../generated-artifacts/android-release"
mkdir -p "$evidence"
# No xtrace, environment dumps, keystore or build log in the evidence archive.
rm -f "$evidence/release-audit.json" "$evidence/release-evidence.tar.gz"
archive_evidence() {
  if [[ -f "$evidence/release-audit.json" ]]; then
    tar -czf "$evidence/release-evidence.tar.gz" -C "$evidence" release-audit.json
  fi
}
trap archive_evidence EXIT
: "${PLAY_UPLOAD_KEY_PASSWORD:?Supply PLAY_UPLOAD_KEY_PASSWORD through the secret store}"
test -f .keys/play-upload-key.jks || { echo "Existing Play upload keystore is required" >&2; exit 1; }
test -x "$tools/apksigner" || { echo "Android build-tools 36.0.0 are required" >&2; exit 1; }
pnpm run optimize:catalog-images
pnpm run verify:plant-images
CI=1 pnpm exec expo prebuild --platform android --no-install
# Ensure a failed compile cannot leave an old APK that looks like a new release.
rm -f android/app/build/outputs/apk/release/app-release.apk
(
  cd android
  ./gradlew :app:assembleRelease --no-daemon --no-parallel --max-workers=1 \
    '-Dorg.gradle.jvmargs=-Xmx1536m -XX:MaxMetaspaceSize=1024m' \
    -Pkotlin.compiler.execution.strategy=in-process --console=plain
)
python3 scripts/audit-android-release.py \
  android/app/build/outputs/apk/release/app-release.apk "$tools" \
  --budget android-size-budget.json --output "$evidence"
echo "Signed APK approved. Non-sensitive evidence: generated-artifacts/android-release/release-evidence.tar.gz"
