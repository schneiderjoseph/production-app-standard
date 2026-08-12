# Governance

## Purpose

This repository defines the engineering standard. Application repos **consume** it; they do not casually fork conflicting rules.

## Change control

- Material changes to P0 rules require a PR and explicit rationale
- Prefer linking to upstream standards (OWASP, WCAG, etc.) over inventing parallel wording
- Breaking changes to checklists should bump a clear changelog entry

## Roles

- **Maintainer** — owns the standard, merges PRs, keeps references current
- **App owners** — map this standard into their stack and CI
- **Agents / contributors** — follow `AGENTS.md` and checklists; do not weaken P0 controls

## Versioning

Use semantic-ish documentation versions in `CHANGELOG.md` when P0/P1 expectations change.
