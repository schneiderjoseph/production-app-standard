# CI/CD

## Recommended PR pipeline

```text
Format → Lint → Typecheck → Unit → Integration → Dependency audit
 → Secret scan → SAST (as available) → Build → (Docker build/scan)
 → Staging deploy → Smoke/E2E → Production (protected)
```

## P0

1. `main` protected: PR + required checks
2. CI must pass before merge
3. No deploying by manually copying from a laptop as the normal path

## P1

1. Separate staging and production
2. Rollback strategy documented and exercised
3. Migrations gated and reversible/expand-contract when destructive

Critical control failures **block deployment**.
