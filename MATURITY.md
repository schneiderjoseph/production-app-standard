# Maturity model

## Priority tags

| Tag | Meaning | Enforcement |
|---|---|---|
| **P0** | BLOCKER | Must pass for real users / money / data; CI blocks merge/release |
| **P1** | REQUIRED | Same milestone unless explicit risk acceptance |
| **P2** | RECOMMENDED | Schedule deliberately |
| **P3** | OPTIONAL | Nice-to-have; never pretend it is done |

## Tiers

### Bronze — functional

App works for a trusted demo / internal pilot.

- Core happy paths work
- Basic auth if multi-user
- Deployable somehow
- Secrets not in the client bundle

**Not** production for paying customers.

### Silver — seriously tested & secured

- Automated unit + critical integration tests
- Server-side authz on sensitive routes
- Input validation on external boundaries
- CI on every PR (lint, typecheck, test)
- Dependency audit + secret scan in CI
- Error handling without leaking internals

### Gold — production-ready

Everything in [`checklists/production.md`](checklists/production.md), including:

- Cross-user / cross-tenant isolation tested
- Migrations versioned; backup **and restore** drilled
- Monitoring + alerts + error tracking
- Staging → prod path with rollback
- Rate limits on abuse surfaces
- Privacy baseline for the product’s data

`scripts/production-check.mjs` must report **no P0 FAIL**.

### Platinum — production-grade

Gold plus:

- High availability design (as justified)
- Documented DR with RPO/RTO and drills
- Full observability (SLOs, actionable alerts)
- Security automation (SAST, image scan, ASVS tracking)
- Performance budgets enforced
- Supply-chain controls (lockfile, SBOM where appropriate)
- Compliance controls matched to real obligations

## Declaring a tier

In an app repo, record:

```text
Maturity target: Gold
Current: Silver
Blockers to Gold: <list from production-check>
```

Agents must **never** claim “production ready” / Gold unless production-check P0s pass and the human accepts residual risk.
