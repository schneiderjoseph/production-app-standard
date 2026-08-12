# AGENTS.md — Work contract for AI coding agents

You are building or reviewing production software under **production-app-standard**.
This file is your employment contract. Violating it is a failed task.

Do **not** invent architecture, weaken security, skip tests, or claim “done” / “production ready” while P0 gaps remain.

## Required workflow

```text
BEFORE CODING
    ↓
Read AGENTS.md (this file)
    ↓
Read PRINCIPLES.md + LEVELS.md (when changing how work is done)
    ↓
Read relevant domain docs under docs/ + matching checklists/
    ↓
Understand existing architecture & patterns in the target repo
    ↓
Implement the smallest change that satisfies the request
    ↓
Run required checks (lint / typecheck / tests / production-check as available)
    ↓
Report what changed
    ↓
Report what was NOT verified
```

## Non-negotiable

1. Before changing a domain, read matching `docs/` and `checklists/`.
2. Treat every **P0** as a merge/ship blocker unless the human documents risk acceptance.
3. Prefer fixing production gaps over feature chrome.
4. Never bypass authorization, expose secrets, disable failing tests to greenwash CI, or edit production schema by hand.
5. Never invent APIs, business rules, or DB fields that are not in the spec / ADR.
6. After business-logic changes: add/update tests and validate external inputs.
7. **Complexity must be earned** — no Redis/K8s/microservices/queues “for seriousness”. See `PRINCIPLES.md`.
8. **Every new dependency is a liability** — justify before adding.
9. End substantial work with the output contract below.

## Hard stops (refuse or escalate)

- Secrets or credentials in source / client bundles
- Client-only security (UI hide without server checks)
- Cross-user or cross-tenant data access possible
- Raw stack traces / SQL errors returned to clients in production
- Payment webhooks without signature verification
- Schema change without a versioned migration
- “I’ll test manually later” on auth, payments, or data isolation
- Claiming **production ready** because unit tests passed

## You may NOT declare “production ready” unless

You have evidence across **all** of:

```text
Code quality · Security · Architecture · Database · Tests
Infrastructure · Observability · Backup · Documentation · Compliance
```

Minimum bar: `node scripts/production-check.mjs` (or app equivalent) shows **no P0 FAIL**, and residual WARNs are listed explicitly for the human.

Passing tests alone is **not** Gold maturity. See `MATURITY.md`.

## Routing

| Task involves… | Read |
|---|---|
| How the standard is enforced | `LEVELS.md`, `MATURITY.md`, `PRINCIPLES.md` |
| Login, sessions, JWT, roles, tenancy | `docs/security/AUTHENTICATION.md`, `AUTHORIZATION.md` |
| ASVS control mapping | `docs/security/OWASP_ASVS.md`, `docs/security/ASVS_REGISTRY.md` |
| CORS, headers, XSS/SQLi, rate limits, secrets | `docs/security/` + `checklists/security.md` |
| Schema, migrations, indexes, backups | `docs/database/` |
| Endpoints, validation, versioning, webhooks | `docs/backend/API.md` |
| UI states, forms, XSS, storage | `docs/frontend/` + companion **design-system-standard** |
| Keyboard / WCAG / UX-UI MUST rules | `docs/frontend/ACCESSIBILITY.md` + **design-system-standard** (`AGENTS.md`, `accessibility/`, `ux/`) |
| Unit / integration / E2E / CI gates | `docs/testing/`, `docs/devops/CI_CD.md` |
| Environments, Docker, deploy, rollback | `docs/devops/` |
| Logs, metrics, alerts, incidents | `docs/observability/` |
| Privacy, retention, deletion/export | `docs/compliance/` |
| Stripe / payments | `docs/payments/` |
| LLM features | `docs/ai/` |
| “Is it production ready?” | `checklists/production.md` + `scripts/production-check.mjs` |

## Output contract

```text
## Standard compliance
- Domains touched: ...
- Maturity impact (Bronze/Silver/Gold/Platinum): ...
- P0 passed: ...
- P0 gaps (blockers): ...
- P1 remaining: ...
- Checks run: ...
- Checks NOT run (and why): ...
- Tests added/updated: ...
- Docs/checklists updated: ...
- New dependencies (justification or none): ...
```

## UX / UI compliance

All user-facing interfaces **MUST** also comply with the companion standard:

→ [`design-system-standard`](https://github.com/schneiderjoseph/design-system-standard)

Mandatory areas: UX principles, UI consistency, accessibility, responsive behavior, forms, navigation, feedback/empty/loading/error states, design tokens, component consistency.

Pretty UI does **not** waive engineering P0s in this repo.

## Definition of Done (every feature)

Use [`checklists/release.md`](checklists/release.md) — at minimum: authz, validation, errors, logging, tests, docs, CI green for required gates + design-system-standard MUST rules for UI surfaces.
