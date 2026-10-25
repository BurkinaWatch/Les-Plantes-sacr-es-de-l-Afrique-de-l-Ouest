"""Small ZIP fixtures, no SDK, keystore, APK download or dependencies required."""
import copy
import importlib.util
import json
import os
import pathlib
import shutil
import subprocess
import sys
import tarfile
import tempfile
import unittest
import zipfile
from unittest.mock import patch

MOBILE = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(MOBILE / "scripts"))
from android_release_gate import catalog, check_release

spec = importlib.util.spec_from_file_location("apk_audit", MOBILE / "scripts/audit-android-release.py")
apk_audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(apk_audit)
POLICY = json.loads((MOBILE / "android-size-budget.json").read_text())


class ReleaseBudgetTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = pathlib.Path(self.temp.name)
        (self.root / "constants").mkdir()
        (self.root / "assets/images/plants").mkdir(parents=True)
        (self.root / "app.json").write_text(json.dumps({
            "expo": {"version": "1.0.1", "android": {"package": "com.sotyssi.plantessacrees", "versionCode": 10}},
        }))
        self.image = b"unique local illustration"
        (self.root / "assets/images/plants/plant.webp").write_bytes(self.image)
        self.registry = self.root / "constants/plantImages.ts"
        self.registry.write_text("const images = {one: require('@/assets/images/plants/plant.webp')};")
        self.apk = self.root / "app.apk"
        self.make_apk()
        self.budget = copy.deepcopy(POLICY)
        self.budget["reference"]["apkBytes"] = self.apk.stat().st_size
        self.budget["reference"]["catalogBytes"] = len(self.image)
        self.budget["reference"]["catalogUniqueImages"] = 1
        self.budget["nonCatalogHeadroomBytes"] = 0
        self.output = self.root / "evidence"

    def make_apk(self, missing_abi=None, missing_lib=None, image=None, compression=zipfile.ZIP_DEFLATED, extra=0):
        with zipfile.ZipFile(self.apk, "w") as archive:
            archive.writestr("res/raw/illustration.webp", self.image if image is None else image)
            for abi in POLICY["expectedArchitectures"]:
                if abi == missing_abi:
                    continue
                for lib in POLICY["requiredLibrariesPerArchitecture"]:
                    if lib != missing_lib:
                        archive.writestr(f"lib/{abi}/{lib}", b"native runtime" * 10, compress_type=compression)
            if extra:
                archive.writestr("assets/extra", b"x" * extra)

    def run_gate(self, tool_override=None):
        budget_path = self.root / "budget.json"
        budget_path.write_text(json.dumps(self.budget))
        def fake_tool(tools, name, *args):
            if tool_override:
                result = tool_override(name)
                if result is not None:
                    return result
            if name == "aapt":
                return "package: name='com.sotyssi.plantessacrees' versionCode='10' versionName='1.0.1'"
            if name == "apksigner":
                return f"Signer #1 certificate SHA-256 digest: {POLICY['signerSha256']}"
            return ""
        with patch("android_release_gate.tool", side_effect=fake_tool):
            status = check_release(self.apk, self.root / "tools", self.root, budget_path, self.output, apk_audit.inventory)
        report = json.loads((self.output / "release-audit.json").read_text())
        self.assertEqual(status == 0, report["status"] == "passed")
        return status, report

    def rejects(self, message):
        status, report = self.run_gate()
        self.assertEqual(status, 1)
        self.assertIn(message, report["failure"])

    def test_exact_budget_passes_with_aliases_counted_once(self):
        with self.registry.open("a") as source:
            source.write("\nalias: require('@/assets/images/plants/plant.webp')")
        status, report = self.run_gate()
        self.assertEqual(status, 0, report)
        self.assertEqual(report["offlineUniqueImagesVerifiedBySha256"], 1)
        self.assertEqual(report["size"]["remainingBytes"], 0)

    def test_one_byte_over_budget_fails(self):
        self.budget["reference"]["apkBytes"] -= 1
        self.rejects("size budget exceeded")

    def test_native_or_code_growth_is_not_hidden_by_image_count(self):
        self.make_apk(extra=1000)
        self.rejects("size budget exceeded")

    def test_missing_source_fails_and_report_is_written(self):
        (self.root / "assets/images/plants/plant.webp").unlink()
        self.rejects("Local image missing")

    def test_missing_or_changed_packaged_image_fails(self):
        self.make_apk(image=b"different")
        self.rejects("Offline images missing or altered")

    def test_each_expected_architecture_is_required(self):
        for abi in POLICY["expectedArchitectures"]:
            with self.subTest(abi=abi):
                self.make_apk(missing_abi=abi)
                self.rejects("architecture missing")

    def test_runtime_libraries_are_required(self):
        self.make_apk(missing_lib="libhermesvm.so")
        self.rejects("runtime library missing")

    def test_native_compression_is_required(self):
        self.make_apk(compression=zipfile.ZIP_STORED)
        self.rejects("must stay compressed")

    def test_legitimate_catalog_growth_and_shrink_adjust_limit(self):
        for delta in (100, -5):
            with self.subTest(delta=delta):
                new_image = b"i" * (len(self.image) + delta)
                (self.root / "assets/images/plants/plant.webp").write_bytes(new_image)
                self.make_apk(image=new_image)
                status, report = self.run_gate()
                self.assertEqual(status, 0, report)
                self.assertEqual(report["size"]["catalogDeltaBytes"], delta)
                self.assertEqual(report["size"]["remainingBytes"], 0)

    def test_excess_catalog_growth_requires_review(self):
        self.budget["maxCatalogGrowthBytes"] = 10
        data = self.image + b"i" * 11
        (self.root / "assets/images/plants/plant.webp").write_bytes(data)
        self.make_apk(image=data)
        self.rejects("Catalogue growth exceeds")

    def test_signer_and_identity_are_enforced(self):
        for name, output, failure in [
            ("apksigner", "Signer #1 certificate SHA-256 digest: " + "0" * 64, "signer differs"),
            ("aapt", "package: name='wrong.package' versionCode='10' versionName='1.0.1'", "package differs"),
            ("aapt", "package: name='com.sotyssi.plantessacrees' versionCode='9' versionName='1.0.1'", "versionCode differs"),
        ]:
            with self.subTest(name=name, output=output):
                status, report = self.run_gate(lambda tool: output if tool == name else None)
                self.assertEqual(status, 1)
                self.assertIn(failure, report["failure"])

    def test_android_tool_failure_is_sanitized(self):
        budget_path = self.root / "budget.json"
        budget_path.write_text(json.dumps(self.budget))
        with patch("android_release_gate.subprocess.check_output", side_effect=subprocess.CalledProcessError(
            1, ["private/path"], output="DO_NOT_ARCHIVE", stderr="DO_NOT_ARCHIVE",
        )):
            status = check_release(self.apk, self.root, self.root, budget_path, self.output, apk_audit.inventory)
        self.assertEqual(status, 1)
        self.assertNotIn("DO_NOT_ARCHIVE", (self.output / "release-audit.json").read_text())

    def test_malformed_inputs_fail_closed(self):
        for data in ("{}", '{"schemaVersion": 999}', "not json"):
            with self.subTest(data=data):
                path = self.root / "invalid.json"
                path.write_text(data)
                status = check_release(self.apk, self.root, self.root, path, self.output, apk_audit.inventory)
                self.assertEqual(status, 1)
        self.apk.write_bytes(b"not a zip")
        self.rejects("Invalid APK ZIP")

    def test_dynamic_or_remote_registry_reference_cannot_silently_skip_images(self):
        for source in ("require(variable)", "require('https://remote/image.webp')", ""):
            with self.subTest(source=source):
                self.registry.write_text(source)
                self.assertEqual(self.run_gate()[0], 1)

    def test_real_catalog_matches_documented_reference_without_freezing_future_count(self):
        images = catalog(MOBILE)
        # Current baseline evidence, not a permanent gate on future catalogue size/count.
        self.assertGreater(len(images), 0)
        self.assertGreater(sum(i["bytes"] for i in images), 0)
        self.assertEqual(POLICY["reference"]["apkBytes"], 203468501)
        self.assertEqual(POLICY["reference"]["catalogBytes"], 132206673)


class ReleaseWiringTests(unittest.TestCase):
    def run_release(self, build_status, audit_status):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        workspace = pathlib.Path(temp.name)
        mobile = workspace / "artifacts/mobile"
        (mobile / "scripts").mkdir(parents=True)
        shutil.copy(MOBILE / "scripts/release-android.sh", mobile / "scripts")
        (mobile / ".keys").mkdir()
        (mobile / ".keys/play-upload-key.jks").write_text("fixture, not a signing key")
        apk = mobile / "android/app/build/outputs/apk/release/app-release.apk"
        apk.parent.mkdir(parents=True)
        apk.write_text("stale APK")
        evidence = workspace / "generated-artifacts/android-release"
        evidence.mkdir(parents=True)
        (evidence / "release-audit.json").write_text('{"status":"stale success"}')
        (evidence / "release-evidence.tar.gz").write_text("stale archive")
        tools = mobile / ".android-sdk/build-tools/36.0.0"
        tools.mkdir(parents=True)
        binary = workspace / "bin"
        binary.mkdir()
        def executable(path, content):
            path.write_text(content)
            path.chmod(0o755)
        executable(binary / "pnpm", "#!/bin/sh\nexit 0\n")
        executable(tools / "apksigner", "#!/bin/sh\nexit 0\n")
        executable(mobile / "android/gradlew", f"""#!/bin/sh
test ! -f app/build/outputs/apk/release/app-release.apk || exit 99
test {build_status} = 0 || exit {build_status}
printf 'new signed fixture' > app/build/outputs/apk/release/app-release.apk
""")
        (mobile / "scripts/audit-android-release.py").write_text(f"""
import pathlib, sys
output = pathlib.Path(sys.argv[sys.argv.index("--output") + 1])
(output / "release-audit.json").write_text('{{"status":"{"passed" if audit_status == 0 else "failed"}"}}')
raise SystemExit({audit_status})
""")
        result = subprocess.run(["bash", str(mobile / "scripts/release-android.sh")],
                                env={**os.environ, "PATH": f"{binary}:{os.environ['PATH']}",
                                     "ANDROID_HOME": str(mobile / ".android-sdk"),
                                     "PLAY_UPLOAD_KEY_PASSWORD": "fixture-not-a-secret"},
                                text=True, capture_output=True)
        return result, evidence, apk

    def test_failed_build_cannot_audit_an_old_apk_or_keep_old_success(self):
        result, evidence, apk = self.run_release(7, 0)
        self.assertEqual(result.returncode, 7, result.stderr)
        self.assertFalse(apk.exists())
        self.assertFalse((evidence / "release-audit.json").exists())
        self.assertFalse((evidence / "release-evidence.tar.gz").exists())

    def test_failed_audit_blocks_release_and_archives_only_report(self):
        result, evidence, apk = self.run_release(0, 1)
        self.assertEqual(result.returncode, 1, result.stderr)
        self.assertNotIn("Signed APK approved", result.stdout)
        with tarfile.open(evidence / "release-evidence.tar.gz") as archive:
            self.assertEqual(archive.getnames(), ["release-audit.json"])
            self.assertEqual(json.load(archive.extractfile("release-audit.json"))["status"], "failed")

    def test_successful_build_and_audit_archive_proof(self):
        result, evidence, apk = self.run_release(0, 0)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("Signed APK approved", result.stdout)
        self.assertEqual(apk.read_text(), "new signed fixture")
        with tarfile.open(evidence / "release-evidence.tar.gz") as archive:
            self.assertEqual(archive.getnames(), ["release-audit.json"])
            self.assertEqual(json.load(archive.extractfile("release-audit.json"))["status"], "passed")

    def test_release_build_is_followed_by_blocking_audit_and_allowlisted_archive(self):
        source = (MOBILE / "scripts/release-android.sh").read_text()
        self.assertIn("set -euo pipefail", source)
        self.assertLess(source.index("pnpm run optimize:catalog-images"), source.index("pnpm run verify:plant-images"))
        self.assertLess(source.index("pnpm run verify:plant-images"), source.index("expo prebuild"))
        self.assertLess(source.index("./gradlew :app:assembleRelease"), source.index("python3 scripts/audit-android-release.py"))
        self.assertIn('--budget android-size-budget.json', source)
        self.assertIn('trap archive_evidence EXIT', source)
        self.assertIn('-C "$evidence" release-audit.json', source)
        self.assertNotIn("|| true", source)
        workflow = (MOBILE.parents[1] / ".github/workflows/android-release-budget.yml").read_text()
        self.assertIn("pnpm --filter @workspace/mobile release:android", workflow)
        self.assertIn("path: generated-artifacts/android-release/release-audit.json", workflow)
        self.assertNotIn("path: generated-artifacts/android-release/", workflow.replace(
            "path: generated-artifacts/android-release/release-audit.json", ""))


if __name__ == "__main__":
    unittest.main()
