# Scripts

## `production-check.mjs` — Level 2 readiness engine

```bash
node scripts/production-check.mjs
node scripts/production-check.mjs --root /path/to/app
node scripts/production-check.mjs --json
```

- In **this** repo (`standard-repo` mode): verifies the standard itself is complete enough to govern apps.
- In an **application** repo (`app-repo` mode): probes lockfile, tests, CI, secrets hygiene, migrations, backup docs, etc.

Exit `1` if any domain is **FAIL** → use as a required CI check.

Copy [`templates/production-check.config.json`](../templates/production-check.config.json) into an app to tune maturity target / skips (skips are for exceptional risk acceptance — document why).

## Adopters

Also wire:

- `npm run lint` / `typecheck` / `test` / `security:audit` / `test:e2e`
- GitHub workflow from [`templates/github/workflows/app-ci.yml`](../templates/github/workflows/app-ci.yml)
