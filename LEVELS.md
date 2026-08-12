# Three levels of the standard

Documentation alone is not a standard. This repo operates on three levels:

```text
LEVEL 1 — POLICY      what must be true
LEVEL 2 — CHECK       how we verify it
LEVEL 3 — ENFORCEMENT how CI blocks violations
```

## Level 1 — Policy

Domain rules under `docs/` and priorities in `MATURITY.md` / checklists.

Examples: authz on every sensitive route, versioned migrations, no secrets in git.

## Level 2 — Check

Commands and evidence that a rule is actually met:

```bash
npm run lint
npm run typecheck
npm test
npm run security:audit
npm run test:e2e
node scripts/production-check.mjs
```

`scripts/production-check.mjs` aggregates domain evidence into PASS / WARN / FAIL.

## Level 3 — Enforcement

GitHub Actions (and branch protection) must be able to say **NO** to a PR that breaks a critical gate.

Copy [`templates/github/workflows/app-ci.yml`](templates/github/workflows/app-ci.yml) into an application repo and mark required checks.

```text
PR
├── Lint / Typecheck / Unit     required
├── Integration                 required (when present)
├── Dependency audit            required
├── Secret scan                 required
├── Production check (P0)       required
├── E2E / smoke                 required for release paths
└── MERGE BLOCKED on any FAIL
```

## Mapping rule

Every **P0** policy item should eventually map to:

```text
Policy → Checklist item → Automated check → CI gate
```

If a P0 cannot be automated yet, document the manual check and treat it as a release-blocker sign-off — never as “optional”.
