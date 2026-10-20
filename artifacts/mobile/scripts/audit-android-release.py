#!/usr/bin/env python3
"""Compare signed APKs and prove local catalog images survived packaging."""
import collections
import hashlib
import json
import pathlib
import re
import subprocess
import sys
import zipfile


def run(*args):
    return subprocess.check_output(args, text=True)


def inventory(apk):
    categories = collections.defaultdict(lambda: {"files": 0, "raw": 0, "download": 0})
    duplicates = collections.defaultdict(list)
    with zipfile.ZipFile(apk) as archive:
        entries = archive.infolist()
        for item in entries:
            name = item.filename
            category = "/".join(name.split("/")[:2]) if name.startswith("lib/") else name.split("/")[0]
            if re.match(r"classes\d*\.dex$", category):
                category = "dex"
            group = categories[category]
            group["files"] += 1
            group["raw"] += item.file_size
            group["download"] += item.compress_size
            if name.startswith("res/"):
                duplicates[hashlib.sha256(archive.read(item)).hexdigest()].append(name)
        sizes = {i.filename: i.file_size for i in entries}
        return {
            "bytes": apk.stat().st_size,
            "sha256": hashlib.sha256(apk.read_bytes()).hexdigest(),
            "categories": dict(categories),
            "largestResources": [
                {"path": i.filename, "bytes": i.file_size}
                for i in sorted(
                    (i for i in entries if i.filename.startswith("res/")),
                    key=lambda i: i.file_size, reverse=True,
                )[:15]
            ],
            "exactDuplicateResourceGroups": [v for v in duplicates.values() if len(v) > 1],
            "duplicateResourceBytes": sum(sum(sizes[n] for n in v[1:]) for v in duplicates.values()),
        }, duplicates


def main():
    if len(sys.argv) != 4:
        raise SystemExit("Usage: audit-android-release.py baseline.apk optimized.apk build-tools-directory")
    baseline, optimized, tools = map(pathlib.Path, sys.argv[1:])
    root = pathlib.Path(__file__).resolve().parents[1]
    config = json.loads((root / "app.json").read_text())["expo"]
    before, _ = inventory(baseline)
    after, hashes = inventory(optimized)
    identities = []
    certificates = []
    for apk in (baseline, optimized):
        badging = run(str(tools / "aapt"), "dump", "badging", str(apk))
        match = re.search(r"package: name='([^']+)' versionCode='(\d+)' versionName='([^']+)'", badging)
        assert match, "Cannot read APK identity"
        identities.append(dict(zip(("package", "versionCode", "versionName"), match.groups())))
        signature = run(str(tools / "apksigner"), "verify", "--verbose", "--print-certs", str(apk))
        fingerprints = re.findall(r"Signer #\d+ certificate SHA-256 digest: (\w+)", signature)
        assert len(fingerprints) == 1, "Expected one verified signer"
        certificates.append(fingerprints[0])
    assert certificates[0] == certificates[1], "Signing certificate changed"
    assert identities[0]["package"] == identities[1]["package"] == config["android"]["package"]
    assert identities[1]["versionName"] == config["version"]
    assert int(identities[1]["versionCode"]) == config["android"]["versionCode"]
    assert int(identities[1]["versionCode"]) > int(identities[0]["versionCode"])
    run(str(tools / "zipalign"), "-c", "-P", "16", "4", str(optimized))
    registry = (root / "constants/plantImages.ts").read_text()
    files = sorted(set(re.findall(r"require\(['\"]@/(assets/images/plants/[^'\"]+)['\"]\)", registry)))
    assert files, "Empty image registry"
    for name in files:
        digest = hashlib.sha256((root / name).read_bytes()).hexdigest()
        assert digest in hashes, f"Offline asset missing or altered: {name}"
    with zipfile.ZipFile(optimized) as archive:
        libraries = [i for i in archive.infolist() if i.filename.startswith("lib/") and i.filename.endswith(".so")]
        abis = sorted({i.filename.split("/")[1] for i in libraries})
        assert abis == ["arm64-v8a", "armeabi-v7a", "x86", "x86_64"], abis
        assert all(i.compress_type == zipfile.ZIP_DEFLATED for i in libraries)
        assert all(
            any(i.filename == f"lib/{abi}/{library}" for i in libraries)
            for abi in abis for library in ("libreactnative.so", "libhermesvm.so")
        ), "Runtime library missing"
    saving = 1 - after["bytes"] / before["bytes"]
    assert saving >= 0.20, f"Download reduction below 20%: {saving:.1%}"
    report = {
        "baseline": before, "optimized": after,
        "identity": identities[1], "signerSha256": certificates[1],
        "reductionPercent": round(saving * 100, 2),
        "offlineUniqueImagesVerifiedBySha256": len(files),
        "architectures": abis, "compressedNativeLibraries": len(libraries),
        "signatureVerified": True, "zipAlignment16KiBVerified": True,
        "deviceInstallTest": "Not performed: no device/emulator attached",
    }
    output = root.parents[1] / "generated-artifacts/android-size"
    output.mkdir(parents=True, exist_ok=True)
    (output / "apk-audit.json").write_text(json.dumps(report, indent=2))
    print(json.dumps({k: v for k, v in report.items() if k not in ("baseline", "optimized")}, indent=2))
    print(f"APK bytes: {before['bytes']} -> {after['bytes']}")


if __name__ == "__main__":
    main()
