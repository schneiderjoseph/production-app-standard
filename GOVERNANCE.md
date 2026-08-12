# Governance

## Purpose

This repository defines the engineering standard. Application repos **consume** it; they do not casually fork conflicting rules.

## Three levels

See [`LEVELS.md`](LEVELS.md): Policy → Check → Enforcement. A rule without a check is aspirational; a check without CI is optional theater.

## Change control

- Material changes to P0 rules require a PR and explicit rationale
- Prefer linking to upstream standards (OWASP, WCAG, etc.) over inventing parallel wording
- Breaking changes to checklists / production-check probes bump `CHANGELOG.md`
- ASVS registry rows should stay aligned with official OWASP ASVS intent

## Roles

- **Maintainer** — owns the standard, merges PRs, keeps references current
- **App owners** — map this standard into their stack and CI; set maturity target
- **Agents / contributors** — follow `AGENTS.md`; do not weaken P0 controls

## Versioning

- `0.x` — operational spine forming
- `1.0` — adopters can enforce Gold gates with documented probes + required checks

Use `CHANGELOG.md` when P0/P1 expectations change.
