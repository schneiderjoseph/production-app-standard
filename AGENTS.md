# AGENTS.md — Rules for AI coding agents

You are building or reviewing production software. Follow this repository’s standards.
Do **not** invent architecture, weaken security, skip tests, or claim “done” while P0 gaps remain.

## Non-negotiable

1. Before changing a domain, read the matching docs under `docs/` and the matching file under `checklists/`.
2. Treat every **P0** item as a merge/ship blocker unless the human documents risk acceptance.
3. Prefer fixing production gaps over adding feature chrome.
4. Never bypass authorization, expose secrets, disable failing tests to greenwash CI, or edit production schema by hand.
5. Never invent APIs, business rules, or database fields that are not in the spec / ADR.
6. After business-logic changes: add/update tests and validate external inputs.
7. End substantial work with a compliance summary (categories touched, P0 passed, P0 gaps).

## Hard stops (refuse or escalate)

- Secrets or credentials in source / client bundles
- Client-only security (UI hide without server checks)
- Cross-user or cross-tenant data access possible
- Raw stack traces / SQL errors returned to clients in production
- Payment webhooks without signature verification
- Schema change without a versioned migration
- “I’ll test manually later” on auth, payments, or data isolation

## Routing

| Task involves… | Read |
|---|---|
| Login, sessions, JWT, roles, permissions, tenancy | `docs/security/AUTHENTICATION.md`, `AUTHORIZATION.md` |
| CORS, headers, XSS/SQLi, rate limits, secrets | `docs/security/` + `checklists/security.md` |
| Schema, migrations, indexes, backups | `docs/database/` |
| Endpoints, validation, versioning, webhooks | `docs/backend/API.md` |
| UI states, forms, XSS, storage | `docs/frontend/` |
| Keyboard / WCAG | `docs/frontend/ACCESSIBILITY.md` |
| Unit / integration / E2E / CI gates | `docs/testing/` |
| Environments, Docker, deploy, rollback | `docs/devops/` |
| Logs, metrics, alerts, incidents | `docs/observability/` |
| Privacy, retention, deletion/export | `docs/compliance/` |
| Stripe / payments | `docs/payments/` |
| LLM features | `docs/ai/` |
| “Is it production ready?” | `checklists/production.md` |

## Output contract

```text
## Standard compliance
- Domains touched: ...
- P0 passed: ...
- P0 gaps (blockers): ...
- P1 remaining: ...
- Tests added/updated: ...
- Docs/checklists updated: ...
```

## Definition of Done (every feature)

Use [`checklists/release.md`](checklists/release.md) feature section — at minimum: authz, validation, errors, logging, tests, docs, CI green.
