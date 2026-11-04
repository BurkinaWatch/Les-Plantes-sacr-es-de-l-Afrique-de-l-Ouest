---
name: Quiz result diversity
description: Product expectations for varied, deterministic plant-quiz recommendations.
---

**Rule:** Keep recommendations deterministic and based on the centered pattern of all 20 answers, combined with the five editorial axes. Use one clear, reverse-keyed, nonjudgmental item per axis; avoid double negatives. Interpret low differentiation from normalized semantic answers, so midpoint responses are neutral without treating every agreement-heavy response as neutral. Match only against symbolic and reflective editorial fields, never medicinal virtues, traditional uses, or botanical morphology. Treat scores as editorial indices, not probabilities or validated compatibility. Any resonance feedback must be optional and store only aggregate yes/no counts by plant and algorithm version, without quiz answers, account identifiers, or free text.

**Why:** The owner observed that common agree-heavy answers repeatedly returned the same few plants. Balanced wording reduces acquiescence without making every prompt confusing; opt-in aggregate feedback can reveal whether recommendations resonate without retaining detailed responses.

**How to apply:** Keep question-specific, token-boundary signal matching and combine it with the axis profile; regression-test agree-heavy, centered, axis-correlated, and midpoint cohorts. Bump the algorithm version when scoring semantics change. Keep feedback copy and endpoints explicit about the three aggregate dimensions, and describe the result as a reflection prompt rather than a validated assessment.
