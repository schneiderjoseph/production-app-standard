# Principles

Non-negotiable engineering principles for this standard and every app that adopts it.

## Core comparisons

```text
Simple > Clever
Explicit > Implicit
Validated > Trusted
Tested > Assumed
Documented > Remembered
Automated > Manual
Observable > Blind
Recoverable > Fragile
Secure by default
Least privilege
Fail safely
```

## Complexity must be earned

Do **not** impose Redis, Kubernetes, microservices, Kafka, Elasticsearch, GraphQL, CDN, queues, or AI “because serious apps have them”.

```text
Need demonstrated?
    ↓
YES → implement, document decision (ADR)
NO  → do not introduce the complexity
```

**Use when justified. Document the decision.**

Same bar for: caching layers, message buses, multi-region, service meshes, extra databases.

## Every new dependency is a liability

Before `npm install` / adding a library, answer:

| Question | Why it matters |
|---|---|
| Why do we need it? | Feature vs convenience |
| Security track record? | CVEs, maintainer trust |
| Maintenance? | Last release, bus factor |
| License? | Compatible with distribution |
| Popularity / alternatives? | Escape hatches |
| Bundle / runtime cost? | Perf and cold start |
| Supply-chain risk? | Typosquatting, install scripts |

Prefer stdlib / already-approved stack. Adding a dependency is a product decision, not a typing shortcut.

## Related

- Architecture detail: [`docs/architecture/PRINCIPLES.md`](docs/architecture/PRINCIPLES.md)
- Maturity tiers: [`MATURITY.md`](MATURITY.md)
- Levels: [`LEVELS.md`](LEVELS.md)
