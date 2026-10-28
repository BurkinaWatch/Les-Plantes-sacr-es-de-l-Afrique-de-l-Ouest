---
name: React Native Fabric marker routing
description: React Native marker-listener routing and timestamps used by Android startup diagnostics
---

When instrumenting `ReactMarker`, do not record every callback delivered to both its Fabric and generic listeners. Ordinary React markers are forwarded through both channels; route general markers through the generic listener and reserve the Fabric listener for the explicit Fabric-only constants. For Fabric events, use the callback timestamp. React Native's telemetry timestamp is milliseconds from `std::chrono::steady_clock`, which aligns with Android's monotonic uptime clock; use the same clock for the watchdog baseline.

**Why:** recording both paths duplicates normal events, while substituting callback-time measurements for Fabric's event timestamps can distort event order and timing.

**How to apply:** when upgrading React Native or extending the startup marker list, recheck `ReactMarker` and Fabric telemetry source, then update the channel filter and tests together.
