# production-app-standard

**One source of truth** for how a professional web/SaaS application should be designed, secured, tested, deployed, and maintained.

Use this repo as the engineering standard for every new project. Humans and AI coding agents follow the same rules. GitHub CI should eventually enforce the critical gates.

## What this is

- Verifiable requirements (checklists), not vague opinions
- Security baseline aligned with **OWASP ASVS** and **OWASP Top 10**
- Full coverage beyond security: architecture, database, API, frontend, testing, DevOps, observability, backup/DR, privacy, payments, AI features
- Agent-ready: `AGENTS.md` + Cursor rules so AI cannot “wing it”

## What this is not

- Not a starter app / boilerplate
- Not a substitute for reading OWASP primary sources
- Not legal advice — apply privacy/compliance controls that match your product and jurisdiction

## Quick start

1. Read [`AGENTS.md`](AGENTS.md) if you use Cursor / Copilot / Claude
2. Walk [`checklists/production.md`](checklists/production.md) before calling anything “production ready”
3. Open the domain docs under [`docs/`](docs/) for the area you are changing
4. Copy relevant templates from [`templates/`](templates/) into your app repo
5. Point your app’s CI at the gates described in [`docs/devops/CI_CD.md`](docs/devops/CI_CD.md)

## Repository map

```text
production-app-standard/
├── README.md
├── AGENTS.md                 # mandatory rules for AI coding agents
├── SECURITY.md               # security policy + reporting
├── GOVERNANCE.md
├── CONTRIBUTING.md
├── REFERENCE-STANDARDS.md    # OWASP, WCAG, 12-Factor, etc.
├── docs/                     # deep standards by domain
├── checklists/               # ship / audit checklists
├── templates/                # ADR, PR, feature, security report
├── scripts/                  # audit helpers (stubs → expand per stack)
└── .github/                  # PR/issue templates + workflow stubs
```

## Domains covered

| Domain | Doc | Checklist |
|---|---|---|
| Architecture | [`docs/architecture/`](docs/architecture/) | [`checklists/architecture.md`](checklists/architecture.md) |
| Security | [`docs/security/`](docs/security/) | [`checklists/security.md`](checklists/security.md) |
| Database | [`docs/database/`](docs/database/) | [`checklists/database.md`](checklists/database.md) |
| API / Backend | [`docs/backend/`](docs/backend/) | [`checklists/api.md`](checklists/api.md) |
| Frontend / UX / a11y | [`docs/frontend/`](docs/frontend/) | [`checklists/frontend.md`](checklists/frontend.md) · [`checklists/accessibility.md`](checklists/accessibility.md) |
| Testing | [`docs/testing/`](docs/testing/) | [`checklists/testing.md`](checklists/testing.md) |
| DevOps / CI/CD | [`docs/devops/`](docs/devops/) | [`checklists/devops.md`](checklists/devops.md) |
| Observability | [`docs/observability/`](docs/observability/) | [`checklists/incident.md`](checklists/incident.md) |
| Performance | [`docs/performance/`](docs/performance/) | [`checklists/performance.md`](checklists/performance.md) |
| Backup / DR | [`docs/database/BACKUPS.md`](docs/database/BACKUPS.md) | [`checklists/disaster-recovery.md`](checklists/disaster-recovery.md) |
| Privacy | [`docs/compliance/`](docs/compliance/) | (see compliance docs) |
| Payments | [`docs/payments/`](docs/payments/) | (see payments docs) |
| AI features | [`docs/ai/`](docs/ai/) | (see AI docs) |
| Production release | [`docs/devops/RELEASE.md`](docs/devops/RELEASE.md) | [`checklists/production.md`](checklists/production.md) · [`checklists/release.md`](checklists/release.md) |

## Principles (non-negotiable)

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

## Priority tags used in docs

- **P0** — ship blocker for real users / real money / real data
- **P1** — required in the same milestone unless risk is explicitly accepted
- **P2** — important; schedule deliberately

## Stack assumption

Written primarily for **Node.js / TypeScript, PostgreSQL, React, Docker, GitHub Actions** SaaS/web apps. Principles transfer; commands and tooling examples may need adaptation.

## Rollout plan for adopting this standard

1. **Foundation** — architecture docs, git governance, code quality, README set
2. **Security** — ASVS-aligned authn/authz, secrets, API security
3. **Quality** — tests, CI gates, database discipline, performance budgets
4. **Production** — Docker, deploy/rollback, backup/restore drills, monitoring/alerts

## License

MIT — see [`LICENSE`](LICENSE).
