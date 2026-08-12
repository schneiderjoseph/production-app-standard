#!/usr/bin/env node
/**
 * Production Readiness Engine (Level 2 — CHECK)
 *
 * Usage:
 *   node scripts/production-check.mjs
 *   node scripts/production-check.mjs --root /path/to/app
 *   node scripts/production-check.mjs --config production-check.config.json
 *
 * Exit codes:
 *   0 = no FAIL (WARN allowed)
 *   1 = at least one FAIL
 *   2 = usage / config error
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const args = parseArgs(process.argv.slice(2));
const root = path.resolve(args.root || process.cwd());
const config = loadConfig(root, args.config);

const results = [];

function parseArgs(argv) {
  const out = { root: null, config: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--root") out.root = argv[++i];
    else if (a === "--config") out.config = argv[++i];
    else if (a === "--json") out.json = true;
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/production-check.mjs [--root DIR] [--config FILE] [--json]`);
      process.exit(0);
    }
  }
  return out;
}

function loadConfig(rootDir, configPath) {
  const candidates = [
    configPath,
    path.join(rootDir, "production-check.config.json"),
    path.join(rootDir, "templates", "production-check.config.json"),
  ].filter(Boolean);

  for (const c of candidates) {
    const abs = path.isAbsolute(c) ? c : path.join(rootDir, c);
    if (fs.existsSync(abs) && abs.endsWith(".json")) {
      try {
        return { ...defaultConfig(), ...JSON.parse(fs.readFileSync(abs, "utf8")), _path: abs };
      } catch (e) {
        console.error(`Invalid config ${abs}: ${e.message}`);
        process.exit(2);
      }
    }
  }
  return { ...defaultConfig(), _path: null };
}

function defaultConfig() {
  return {
    mode: "auto", // auto | standard-repo | app-repo
    maturityTarget: "gold",
    skip: [],
  };
}

function exists(...parts) {
  return fs.existsSync(path.join(root, ...parts));
}

function read(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, "utf8");
}

function readJSON(rel) {
  const raw = read(rel);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function walk(dir, pred, acc = []) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return acc;
  for (const ent of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".git" || ent.name === "dist" || ent.name === "build") continue;
      walk(rel, pred, acc);
    } else if (pred(rel.replace(/\\/g, "/"))) acc.push(rel.replace(/\\/g, "/"));
  }
  return acc;
}

function detectMode() {
  if (config.mode && config.mode !== "auto") return config.mode;
  if (exists("AGENTS.md") && exists("checklists/production.md") && exists("docs/security/SECURITY.md")) {
    return "standard-repo";
  }
  return "app-repo";
}

function record(domain, status, detail, severity = "P0") {
  if (config.skip?.includes(domain)) return;
  results.push({ domain, status, detail, severity });
}

function pkgScripts() {
  const pkg = readJSON("package.json") || {};
  return pkg.scripts || {};
}

function hasScript(names) {
  const s = pkgScripts();
  return names.some((n) => typeof s[n] === "string");
}

function hasWorkflow(pred) {
  const files = walk(".github/workflows", (f) => f.endsWith(".yml") || f.endsWith(".yaml"));
  return files.some((f) => {
    const body = read(f) || "";
    return pred(body.toLowerCase(), f);
  });
}

function checkStandardRepo() {
  record(
    "Architecture",
    exists("docs/architecture/ARCHITECTURE.md") && exists("PRINCIPLES.md") && exists("LEVELS.md") ? "PASS" : "FAIL",
    "PRINCIPLES.md, LEVELS.md, docs/architecture present",
  );
  record(
    "Security",
    exists("docs/security/SECURITY.md") && exists("docs/security/ASVS_REGISTRY.md") && exists("docs/security/ASVS_5.0/V4_ACCESS_CONTROL.md")
      ? "PASS"
      : "FAIL",
    "Security docs + ASVS registry + V4 chapter",
  );
  record(
    "Dependencies",
    exists("docs/devops/CI_CD.md") && exists("templates/github/workflows/app-ci.yml") ? "PASS" : "FAIL",
    "CI/CD policy + adopter workflow template",
  );
  record(
    "Secrets",
    exists("docs/security/SECRETS.md") && exists("SECURITY.md") ? "PASS" : "WARN",
    "Secrets policy documents",
    "P1",
  );
  record(
    "Database",
    exists("docs/database/DATABASE.md") && exists("docs/database/MIGRATIONS.md") && exists("docs/database/BACKUPS.md")
      ? "PASS"
      : "FAIL",
    "Database + migrations + backups docs",
  );
  record(
    "Tests",
    exists("docs/testing/TESTING.md") && exists("checklists/testing.md") ? "PASS" : "FAIL",
    "Testing standard + checklist",
  );
  record(
    "API",
    exists("docs/backend/API.md") && exists("checklists/api.md") ? "PASS" : "FAIL",
    "API standard + checklist",
  );
  record(
    "Docker",
    exists("docs/devops/DOCKER.md") ? "PASS" : "WARN",
    "Docker guidance",
    "P1",
  );
  record(
    "Observability",
    exists("docs/observability/MONITORING.md") && exists("docs/observability/ALERTING.md") ? "PASS" : "WARN",
    "Monitoring + alerting docs",
    "P1",
  );
  record(
    "Backup",
    exists("docs/database/BACKUPS.md") && exists("checklists/disaster-recovery.md") ? "PASS" : "FAIL",
    "Backup/DR docs + checklist",
  );
  record(
    "AgentGovernance",
    exists("AGENTS.md") && (read("AGENTS.md") || "").includes("production ready") ? "PASS" : "FAIL",
    "AGENTS.md work contract forbids casual production-ready claims",
  );
  record(
    "ReadinessEngine",
    exists("scripts/production-check.mjs") ? "PASS" : "FAIL",
    "production-check engine present",
  );
  record(
    "EnforcementTemplates",
    exists("templates/github/workflows/app-ci.yml") && exists("MATURITY.md") ? "PASS" : "FAIL",
    "App CI template + maturity model",
  );
}

function checkAppRepo() {
  const scripts = pkgScripts();

  record(
    "Architecture",
    exists("README.md") || exists("docs/architecture.md") || exists("ARCHITECTURE.md") ? "PASS" : "WARN",
    "README or architecture doc present",
    "P1",
  );

  const hasAuthTests =
    walk(".", (f) => /test|spec/.test(f) && /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(f)).some((f) => {
      const b = (read(f) || "").toLowerCase();
      return b.includes("401") || b.includes("403") || b.includes("unauthorized") || b.includes("forbidden") || b.includes("tenant");
    });

  record(
    "Security",
    hasAuthTests || exists("docs/security.md") ? (hasAuthTests ? "PASS" : "WARN") : "FAIL",
    hasAuthTests ? "Found authz/authn-related tests" : "No authz isolation tests detected — add cross-user tests",
  );

  const lock = exists("package-lock.json") || exists("pnpm-lock.yaml") || exists("yarn.lock") || exists("bun.lockb");
  record(
    "Dependencies",
    lock && (hasScript(["audit", "security:audit", "deps:audit"]) || hasWorkflow((b) => b.includes("audit") || b.includes("osv")))
      ? "PASS"
      : lock
        ? "WARN"
        : "FAIL",
    lock ? "Lockfile present; ensure audit runs in CI" : "No lockfile — supply-chain risk",
  );

  const gitignore = read(".gitignore") || "";
  const envExample = exists(".env.example") || exists(".env.sample");
  const envIgnored = gitignore.includes(".env");
  record(
    "Secrets",
    envIgnored && !exists(".env") ? "PASS" : envIgnored ? "WARN" : "FAIL",
    envIgnored
      ? `.env ignored${envExample ? "; example present" : "; add .env.example"}`
      : "Ensure .env is gitignored; never commit secrets",
  );

  const migrations =
    exists("prisma/schema.prisma") ||
    exists("drizzle.config.ts") ||
    walk(".", (f) => /migrations?\//.test(f) || /\/supabase\//.test(f)).length > 0;
  record(
    "Database",
    migrations ? "PASS" : "WARN",
    migrations ? "Migration/schema tooling detected" : "No migrations detected — required if you persist data",
    migrations ? "P0" : "P1",
  );

  const hasTest = hasScript(["test", "test:unit", "vitest", "jest"]);
  record(
    "Tests",
    hasTest ? "PASS" : "FAIL",
    hasTest ? `Test script: ${Object.keys(scripts).filter((k) => k.startsWith("test")).join(", ") || "test"}` : "No npm test script",
  );

  record(
    "API",
    exists("openapi.yaml") || exists("openapi.json") || exists("docs/api.md") || walk("src", (f) => /route|controller|api/.test(f)).length > 0
      ? "PASS"
      : "WARN",
    "API surface or OpenAPI/docs evidence",
    "P1",
  );

  record(
    "Docker",
    exists("Dockerfile") || exists("docker-compose.yml") || exists("compose.yaml") ? "PASS" : "WARN",
    "Container definition",
    "P2",
  );

  const obs =
    hasScript(["observability:check"]) ||
    walk(".", (f) => /sentry|otel|opentelemetry|prometheus/.test(f.toLowerCase())).length > 0 ||
    (read("package.json") || "").toLowerCase().includes("sentry");
  record(
    "Observability",
    obs ? "PASS" : "WARN",
    obs ? "Observability tooling signals found" : "No error-tracking/OTel signals found",
    "P1",
  );

  record(
    "Backup",
    exists("docs/backup.md") || exists("docs/disaster-recovery.md") || exists("RUNBOOK.md")
      ? "PASS"
      : "FAIL",
    "Backup/restore runbook must exist for Gold+",
  );

  const e2e = hasScript(["test:e2e", "e2e", "playwright"]) || hasWorkflow((b) => b.includes("playwright") || b.includes("cypress") || b.includes("e2e"));
  record(
    "E2E",
    e2e ? "PASS" : "WARN",
    e2e ? "E2E/smoke tooling detected" : "No E2E/smoke detected — required for Gold release paths",
    "P1",
  );

  const ci = exists(".github/workflows") && walk(".github/workflows", () => true).length > 0;
  record(
    "CI",
    ci ? "PASS" : "FAIL",
    ci ? "GitHub workflows present" : "No CI workflows — Level 3 enforcement missing",
  );
}

function printReport(mode) {
  const width = Math.max(...results.map((r) => r.domain.length), 12);
  console.log("");
  console.log("Production Readiness Audit");
  console.log(`Root: ${root}`);
  console.log(`Mode: ${mode}`);
  if (config._path) console.log(`Config: ${config._path}`);
  console.log(`Maturity target: ${config.maturityTarget || "gold"}`);
  console.log("");

  for (const r of results) {
    const pad = " ".repeat(width - r.domain.length);
    console.log(`${r.domain}${pad}  ${r.status.padEnd(4)}  ${r.detail}`);
  }

  const fails = results.filter((r) => r.status === "FAIL");
  const warns = results.filter((r) => r.status === "WARN");
  const p0fails = fails.filter((r) => r.severity === "P0");

  console.log("");
  if (p0fails.length || fails.length) {
    console.log("Result: NOT PRODUCTION READY");
    console.log(`FAIL=${fails.length} (P0=${p0fails.length}) WARN=${warns.length}`);
  } else if (warns.length) {
    console.log("Result: READY WITH WARNINGS (not Platinum)");
    console.log(`FAIL=0 WARN=${warns.length}`);
  } else {
    console.log("Result: PRODUCTION READY (engine checks passed)");
  }
  console.log("");
  console.log("Note: Agents must still not claim Gold/Platinum without human acceptance of residual risk.");
}

function main() {
  if (!fs.existsSync(root)) {
    console.error(`Root not found: ${root}`);
    process.exit(2);
  }

  const mode = detectMode();
  if (mode === "standard-repo") checkStandardRepo();
  else checkAppRepo();

  if (args.json) {
    const fails = results.filter((r) => r.status === "FAIL");
    console.log(
      JSON.stringify(
        {
          root,
          mode,
          maturityTarget: config.maturityTarget,
          results,
          ready: fails.length === 0,
        },
        null,
        2,
      ),
    );
  } else {
    printReport(mode);
  }

  const fails = results.filter((r) => r.status === "FAIL");
  process.exit(fails.length ? 1 : 0);
}

main();
