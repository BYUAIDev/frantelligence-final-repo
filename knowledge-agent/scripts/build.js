#!/usr/bin/env node
/**
 * build.js — Knowledge Builder Agent environment verifier
 *
 * Checks that the Python environment, dependencies, and project structure
 * are correctly set up for the Knowledge Builder Agent work stream.
 * Run this after cloning the repo or before a new dev session.
 *
 * Usage:
 *   node scripts/build.js          Run all checks
 *   node scripts/build.js --help   Show this help
 *
 * Output: JSON to stdout. Diagnostics to stderr.
 * Exit codes: 0 = all pass, 1 = issues found, 127 = python not found
 *
 * Windows: run with  node scripts/build.js  (no shell needed)
 */

import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Paths (ESM-safe __dirname equivalent)
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRIPT_DIR = __dirname;
const KB_ROOT = path.resolve(SCRIPT_DIR, '..');
const REPO_ROOT = path.resolve(KB_ROOT, '..');
const AI_BACKEND = path.join(REPO_ROOT, 'ai-backend');

// ---------------------------------------------------------------------------
// Help
// ---------------------------------------------------------------------------
const HELP = `
Knowledge Builder Agent — Build / Environment Verifier
=======================================================
Usage:
  node scripts/build.js          Run all checks
  node scripts/build.js --help   Show this help

Checks performed:
  1. Python version (3.10+ required)
  2. Core pip packages importable (fastapi, supabase, httpx, langfuse, structlog)
  3. ruff linter available
  4. .testEnvVars.example present
  5. .testEnvVars present (warn only — gitignored)
  6. aiDocs/context.md, prd.md, coding-style.md present
  7. ai/roadmaps/ directory present
  8. .cursorrules present at repo root

Output: JSON to stdout. Diagnostics to stderr.
Exit codes: 0 = all pass, 1 = issues found, 127 = python not found
`.trim();

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(HELP);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function run(cmd, cwd) {
  const r = spawnSync(cmd, { shell: true, cwd: cwd || REPO_ROOT, encoding: 'utf8' });
  return {
    exitCode: r.status !== null ? r.status : 1,
    stdout: (r.stdout || '').trim(),
    stderr: (r.stderr || '').trim(),
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const startMs = Date.now();
const report = {
  timestamp: new Date().toISOString(),
  suite: 'knowledge-builder-build-check',
  checks: {},
  issues: [],
  warnings: [],
  exit_code: 0,
};

// 1. Python version
const pyVer = run('python --version');
if (pyVer.exitCode !== 0) {
  process.stderr.write('ERROR: python not found. Install Python 3.10+ and add it to PATH.\n');
  process.exit(127);
}
const verStr = pyVer.stdout || pyVer.stderr;
const match = verStr.match(/Python (\d+)\.(\d+)/);
const major = match ? parseInt(match[1]) : 0;
const minor = match ? parseInt(match[2]) : 0;
const pyOk = major === 3 && minor >= 10;
report.checks.python_version = { status: pyOk ? 'pass' : 'fail', version: verStr, required: '3.10+' };
if (!pyOk) report.issues.push(`Python 3.10+ required. Found: ${verStr}`);
else process.stderr.write(`✓ Python: ${verStr}\n`);

// 2. Core pip packages
const coreModules = ['fastapi', 'supabase', 'httpx', 'langfuse', 'pydantic', 'structlog'];
for (const mod of coreModules) {
  const r = run(`python -c "import ${mod}; print(getattr(${mod}, '__version__', 'ok'))"`, AI_BACKEND);
  const ok = r.exitCode === 0;
  report.checks[`import_${mod}`] = { status: ok ? 'pass' : 'fail', version: ok ? r.stdout : null };
  if (ok) process.stderr.write(`✓ ${mod}: ${r.stdout}\n`);
  else {
    report.issues.push(`Module '${mod}' not importable. Run: cd ai-backend && pip install -r requirements.txt`);
    process.stderr.write(`✗ ${mod}: not found\n`);
  }
}

// 3. ruff linter
const ruff = run('python -m ruff --version', AI_BACKEND);
const ruffOk = ruff.exitCode === 0;
report.checks.ruff_linter = { status: ruffOk ? 'pass' : 'fail', version: ruffOk ? ruff.stdout : null };
if (ruffOk) process.stderr.write(`✓ ruff: ${ruff.stdout}\n`);
else {
  report.issues.push('ruff not found. Run: pip install ruff');
  process.stderr.write('✗ ruff: not found\n');
}

// 4. .testEnvVars.example
const examplePath = path.join(KB_ROOT, '.testEnvVars.example');
const exampleOk = fs.existsSync(examplePath);
report.checks.testEnvVars_example = { status: exampleOk ? 'pass' : 'fail', path: examplePath };
if (!exampleOk) report.issues.push('.testEnvVars.example missing from knowledge-agent/');
else process.stderr.write('✓ .testEnvVars.example present\n');

// 5. .testEnvVars (warn only — gitignored)
const actualEnvPath = path.join(KB_ROOT, '.testEnvVars');
const hasActualEnv = fs.existsSync(actualEnvPath);
report.checks.testEnvVars = {
  status: hasActualEnv ? 'pass' : 'warn',
  note: hasActualEnv
    ? 'Present — test credentials available for live integration tests'
    : 'Not found. Copy .testEnvVars.example → .testEnvVars and fill in credentials.',
};
if (!hasActualEnv) {
  report.warnings.push('knowledge-agent/.testEnvVars not found — live integration tests will be skipped');
  process.stderr.write('⚠ .testEnvVars not found (copy from .testEnvVars.example for live tests)\n');
} else {
  process.stderr.write('✓ .testEnvVars present\n');
}

// 6. Required aiDocs and roadmaps
const docChecks = [
  ['context_md',   path.join(KB_ROOT, 'aiDocs', 'context.md')],
  ['prd_md',       path.join(KB_ROOT, 'aiDocs', 'prd.md')],
  ['coding_style', path.join(KB_ROOT, 'aiDocs', 'coding-style.md')],
  ['changelog',    path.join(KB_ROOT, 'aiDocs', 'changelog.md')],
  ['roadmaps_dir', path.join(KB_ROOT, 'ai', 'roadmaps')],
  ['cursorrules',  path.join(REPO_ROOT, '.cursorrules')],
];
for (const [key, p] of docChecks) {
  const exists = fs.existsSync(p);
  report.checks[key] = { status: exists ? 'pass' : 'warn', path: p };
  if (exists) process.stderr.write(`✓ ${key}\n`);
  else {
    report.warnings.push(`${key} missing: ${p}`);
    process.stderr.write(`⚠ ${key} not found: ${p}\n`);
  }
}

// 7. kb_logging.py
const kbLoggingPath = path.join(AI_BACKEND, 'app', 'kb_logging.py');
const loggingExists = fs.existsSync(kbLoggingPath);
report.checks.kb_logging = { status: loggingExists ? 'pass' : 'warn', path: kbLoggingPath };
if (loggingExists) process.stderr.write('✓ kb_logging.py present\n');
else {
  report.warnings.push('kb_logging.py not found in ai-backend/app/');
  process.stderr.write('⚠ kb_logging.py not found\n');
}

// ---------------------------------------------------------------------------
// Final summary
// ---------------------------------------------------------------------------
if (report.issues.length > 0) {
  report.exit_code = 1;
  process.stderr.write('\nISSUES (must fix):\n');
  report.issues.forEach(i => process.stderr.write(`  ✗ ${i}\n`));
}
if (report.warnings.length > 0) {
  process.stderr.write('\nWARNINGS (optional / pre-implementation):\n');
  report.warnings.forEach(w => process.stderr.write(`  ⚠ ${w}\n`));
}

report.duration_ms = Date.now() - startMs;
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
process.exit(report.exit_code);
