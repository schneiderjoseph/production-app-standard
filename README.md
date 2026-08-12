# production-app-standard

**One source of truth** for how a professional web/SaaS application should be designed, secured, tested, deployed, and maintained — for humans **and** AI agents — with **automated checks** and **CI enforcement**.

```text
POLICY (docs/)  →  CHECK (scripts/production-check)  →  ENFORCEMENT (GitHub Actions)
```

## What this is

| Layer | What | Where |
|---|---|---|
| **Policy** | Verifiable engineering requirements | `docs/`, `checklists/`, `PRINCIPLES.md` |
| **Check** | Production readiness engine | `scripts/production-check.mjs` |
| **Enforcement** | Merge-blocking CI | `templates/github/workflows/app-ci.yml` + branch protection |
| **Security spine** | OWASP ASVS mapping | `docs/security/ASVS_5.0/`, `ASVS_REGISTRY.md` |
| **Agents** | Work contract | `AGENTS.md` |
| **Maturity** | Bronze → Platinum | `MATURITY.md` |

## Quick start

1. Read [`AGENTS.md`](AGENTS.md) (AI) or [`PRINCIPLES.md`](PRINCIPLES.md) (humans)
2. Understand [`LEVELS.md`](LEVELS.md) and [`MATURITY.md`](MATURITY.md)
3. Run the engine:

```bash
node scripts/production-check.mjs
```

4. Before calling an **app** production-ready: walk [`checklists/production.md`](checklists/production.md) and adopt [`templates/github/workflows/app-ci.yml`](templates/github/workflows/app-ci.yml)
5. Domain detail lives under [`docs/`](docs/)

## Repository map

```text
production-app-standard/
├── PRINCIPLES.md             # complexity earned; dependency liability
├── LEVELS.md                 # Policy → Check → Enforcement
├── MATURITY.md               # Bronze / Silver / Gold / Platinum
├── AGENTS.md                 # mandatory AI work contract
├── docs/                     # domain policy
│   └── security/ASVS_5.0/    # ASVS theme chapters
├── checklists/               # human/agent checklists
├── scripts/production-check.mjs
├── templates/github/workflows/app-ci.yml
└── .github/workflows/ci.yml  # enforces this repo’s integrity
```

## Domains covered

| Domain | Doc | Checklist |
|---|---|---|
| Architecture | [`docs/architecture/`](docs/architecture/) | [`checklists/architecture.md`](checklists/architecture.md) |
| Security / ASVS | [`docs/security/`](docs/security/) | [`checklists/security.md`](checklists/security.md) |
| Database | [`docs/database/`](docs/database/) | [`checklists/database.md`](checklists/database.md) |
| API / Backend | [`docs/backend/`](docs/backend/) | [`checklists/api.md`](checklists/api.md) |
| Frontend / a11y | [`docs/frontend/`](docs/frontend/) | [`checklists/frontend.md`](checklists/frontend.md) |
| Testing | [`docs/testing/`](docs/testing/) | [`checklists/testing.md`](checklists/testing.md) |
| DevOps / CI/CD | [`docs/devops/`](docs/devops/) | [`checklists/devops.md`](checklists/devops.md) |
| Observability | [`docs/observability/`](docs/observability/) | [`checklists/incident.md`](checklists/incident.md) |
| Performance | [`docs/performance/`](docs/performance/) | [`checklists/performance.md`](checklists/performance.md) |
| Backup / DR | [`docs/database/BACKUPS.md`](docs/database/BACKUPS.md) | [`checklists/disaster-recovery.md`](checklists/disaster-recovery.md) |
| Privacy | [`docs/compliance/`](docs/compliance/) | — |
| Payments | [`docs/payments/`](docs/payments/) | — |
| AI features | [`docs/ai/`](docs/ai/) | — |
| Production release | [`docs/devops/RELEASE.md`](docs/devops/RELEASE.md) | [`checklists/production.md`](checklists/production.md) |

## Principles (non-negotiable)

```text
Simple > Clever
Complexity must be earned
Every new dependency is a liability
Secure by default · Least privilege · Fail safely
```

Full text: [`PRINCIPLES.md`](PRINCIPLES.md).

## Priority & maturity

- **P0** blocker · **P1** required · **P2** recommended · **P3** optional → [`MATURITY.md`](MATURITY.md)
- Tiers: **Bronze** → **Silver** → **Gold** (production-ready) → **Platinum**

## Stack assumption

Written primarily for **Node.js / TypeScript, PostgreSQL, React, Docker, GitHub Actions**. Principles transfer; commands may need adaptation.

## Roadmap to v1.0

Operational spine is in place (Levels, engine, ASVS registry, CI templates, agent contract). Remaining work deepens domain policy and expands registry rows / probes until adopters can run Gold gates without guesswork. See [`CHANGELOG.md`](CHANGELOG.md).

## License

MIT — see [`LICENSE`](LICENSE).
