# Security Policy

## Reporting a vulnerability

If you discover a security issue in a project that adopts this standard:

1. **Do not** open a public GitHub issue with exploit details
2. Contact the repository owner privately (email / security contact listed in the adopting app)
3. Include: affected component, reproduction steps, impact, and any suggested fix

## Baseline expectations for adopting apps

- No secrets in git history or client bundles
- Authentication + **server-side** authorization on every sensitive operation
- Input validation on all external input
- HTTPS in production; secure cookie flags; sensible security headers
- Dependency and secret scanning in CI
- Security-relevant events audited (login failures, permission denials, admin actions)

Primary reference: **OWASP ASVS** (see [`REFERENCE-STANDARDS.md`](REFERENCE-STANDARDS.md) and [`docs/security/`](docs/security/)).
