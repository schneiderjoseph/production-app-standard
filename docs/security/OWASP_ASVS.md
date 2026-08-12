# OWASP ASVS mapping

Use [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) as the detailed security requirements catalog.

## How to use ASVS in this standard

1. Pick a target level appropriate to your risk (many SaaS start with a pragmatic subset aligned to Level 1–2 controls)
2. Track coverage in your app’s security checklist
3. Prefer ASVS wording for audits; keep this repo’s docs as the engineering “how we apply it”

## Practical mapping

| Area | This repo | ASVS themes |
|---|---|---|
| Login / sessions | `AUTHENTICATION.md` | Authentication, Session |
| Permissions / tenancy | `AUTHORIZATION.md` | Access Control |
| Validation | `API_SECURITY.md` + backend docs | Validation, Encoding |
| Secrets / config | `SECRETS.md` | Configuration |
| Crypto | app threat model + ASVS crypto chapters | Cryptography |
| Files / uploads | security checklist | File handling |

Do not claim “ASVS certified” unless you actually performed a verification against the standard.
