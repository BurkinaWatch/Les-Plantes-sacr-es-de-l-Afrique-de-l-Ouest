"""Reproducible release policy. Reports contain public build metadata only."""
import hashlib
import json
import pathlib
import re
import subprocess
import zipfile


class AuditFailure(Exception):
    pass


def require(condition, message):
    if not condition:
        raise AuditFailure(message)


def tool(tools, name, *args):
    # Never retain tool output in a failure report (e.g. local paths/diagnostics).
    try:
        return subprocess.check_output(
            [str(tools / name), *map(str, args)], text=True, stderr=subprocess.DEVNULL,
        )
    except (OSError, subprocess.CalledProcessError):
        raise AuditFailure(f"Android tool failed: {name}") from None


def catalog(root):
    source = (root / "constants/plantImages.ts").read_text()
    calls = re.findall(r"\brequire\s*\(([^)]*)\)", source)
    files = set()
    for call in calls:
        match = re.fullmatch(r"""\s*['"]@/(assets/images/plants/[^'"]+)['"]\s*""", call)
        require(match is not None, "Unsupported local image reference; update the auditor explicitly")
        name = match[1]
        path = (root / name).resolve()
        require(path.is_relative_to((root / "assets/images/plants").resolve()), "Unsafe image path")
        require(path.is_file(), f"Local image missing: {name}")
        files.add(name)
    require(files, "Empty local image registry")
    images = []
    for name in sorted(files):
        data = (root / name).read_bytes()
        images.append({"path": name, "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()})
    return images


def validate_budget(budget):
    require(isinstance(budget, dict), "Budget must be an object")
    require(budget["schemaVersion"] == 1, "Unsupported budget schema")
    reference = budget["reference"]
    require(isinstance(reference, dict), "Budget reference must be an object")
    for key in ("apkBytes", "catalogBytes", "catalogUniqueImages", "versionCode"):
        require(type(reference[key]) is int and reference[key] > 0, f"Invalid reference: {key}")
    require(reference["apkBytes"] > reference["catalogBytes"], "Invalid reference sizes")
    for key in ("nonCatalogHeadroomBytes", "maxCatalogGrowthBytes"):
        require(type(budget[key]) is int and budget[key] >= 0, f"Invalid budget: {key}")
    require(re.fullmatch(r"[0-9a-f]{64}", budget["signerSha256"]) is not None, "Invalid signer digest")
    # This policy is explicitly for a universal APK, never an ABI-specific build.
    require(sorted(budget["expectedArchitectures"]) == ["arm64-v8a", "armeabi-v7a", "x86", "x86_64"],
            "Budget must preserve all four architectures")
    require(set(budget["requiredLibrariesPerArchitecture"]) >= {"libreactnative.so", "libhermesvm.so"},
            "Budget must preserve React Native and Hermes")
    require(isinstance(budget["approval"], str) and bool(budget["approval"].strip()),
            "Budget update needs an approval rationale")


def audit(apk, tools, root, budget_path, report, inventory):
    budget_data = budget_path.read_bytes()
    budget = json.loads(budget_data)
    validate_budget(budget)
    report["budgetSha256"] = hashlib.sha256(budget_data).hexdigest()
    report["budget"] = budget
    info, packaged_hashes = inventory(apk)
    report["apk"] = info
    images = catalog(root)
    report["catalog"] = {"uniqueImages": len(images), "bytes": sum(i["bytes"] for i in images), "images": images}
    reference = budget["reference"]
    delta = report["catalog"]["bytes"] - reference["catalogBytes"]
    limit = reference["apkBytes"] + budget["nonCatalogHeadroomBytes"] + delta
    report["size"] = {"actualBytes": info["bytes"], "allowedBytes": limit,
                      "catalogDeltaBytes": delta, "remainingBytes": limit - info["bytes"]}

    config = json.loads((root / "app.json").read_text())["expo"]
    badging = tool(tools, "aapt", "dump", "badging", apk)
    match = re.search(r"package: name='([^']+)' versionCode='(\d+)' versionName='([^']+)'", badging)
    require(match is not None, "Cannot read APK identity")
    identity = dict(zip(("package", "versionCode", "versionName"), match.groups()))
    report["identity"] = identity
    require(identity["package"] == config["android"]["package"], "APK package differs from app.json")
    require(identity["versionName"] == config["version"], "APK version differs from app.json")
    require(int(identity["versionCode"]) == config["android"]["versionCode"], "APK versionCode differs from app.json")
    require(int(identity["versionCode"]) >= reference["versionCode"], "APK predates the budget reference")
    signature = tool(tools, "apksigner", "verify", "--verbose", "--print-certs", apk)
    fingerprints = re.findall(r"Signer #\d+ certificate SHA-256 digest: (\w+)", signature)
    require(fingerprints == [budget["signerSha256"]], "Release signer differs from approved certificate")
    report["signatureVerified"] = True
    report["signerSha256"] = fingerprints[0]
    tool(tools, "zipalign", "-c", "-P", "16", "4", apk)
    report["zipAlignment16KiBVerified"] = True

    with zipfile.ZipFile(apk) as archive:
        entries = archive.infolist()
        require(len({i.filename for i in entries}) == len(entries), "Duplicate ZIP entry names")
        libraries = [i for i in entries if i.filename.startswith("lib/") and i.filename.endswith(".so")]
        abis = sorted({i.filename.split("/")[1] for i in libraries})
        report["architectures"] = abis
        report["compressedNativeLibraries"] = sum(i.compress_type == zipfile.ZIP_DEFLATED for i in libraries)
        require(abis == sorted(budget["expectedArchitectures"]), "Expected Android architecture missing or unexpected")
        names = {i.filename for i in libraries}
        require(all(f"lib/{abi}/{lib}" in names for abi in abis
                    for lib in budget["requiredLibrariesPerArchitecture"]), "Native runtime library missing")
        require(all(i.compress_type == zipfile.ZIP_DEFLATED for i in libraries), "Native libraries must stay compressed")

    missing = [image["path"] for image in images if image["sha256"] not in packaged_hashes]
    require(not missing, "Offline images missing or altered in APK: " + ", ".join(missing))
    report["offlineUniqueImagesVerifiedBySha256"] = len(images)
    require(delta <= budget["maxCatalogGrowthBytes"], "Catalogue growth exceeds approved allowance; budget review required")
    require(info["bytes"] <= limit, f"APK size budget exceeded: {info['bytes']} > {limit} bytes")


def check_release(apk, tools, root, budget_path, output, inventory):
    """Always save a small, sanitized report, including for failed gates."""
    report = {"schemaVersion": 1, "status": "failed",
              "deviceInstallTest": "Not performed by this packaging audit"}
    try:
        audit(apk, tools, root, budget_path, report, inventory)
        report["status"] = "passed"
    except (AuditFailure, OSError, ValueError, KeyError, TypeError) as error:
        report["failure"] = str(error) if isinstance(error, AuditFailure) else "Invalid or unreadable audit input"
    # Invalid ZIPs raise BadZipFile, which is not a ValueError.
    except zipfile.BadZipFile:
        report["failure"] = "Invalid APK ZIP archive"
    output.mkdir(parents=True, exist_ok=True)
    (output / "release-audit.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps({key: report[key] for key in ("status", "size", "failure") if key in report}))
    return 0 if report["status"] == "passed" else 1
