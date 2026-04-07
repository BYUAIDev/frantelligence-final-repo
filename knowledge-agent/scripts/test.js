#!/usr/bin/env node
/**
 * test.js — Knowledge Builder Agent test runner
 *
 * Runs pytest on the knowledge_builder test suite and the ruff linter
 * (including `app/routers/kb.py` where Knowledge Builder logging is integrated,
 * plus `app/kb_logging.py` and legacy KB Agent paths if present),
 * then outputs a JSON result summary to stdout.
 *
 * Usage:
 *   node scripts/test.js           Run tests + linter (default)
 *   node scripts/test.js --unit    Run pytest only
 *   node scripts/test.js --lint    Run ruff linter only
 *   node scripts/test.js --help    Show this help
 *
 * Output: JSON to stdout. Diagnostics and progress to stderr.
 * Exit codes: 0 = all pass, 1 = failures found, 2 = bad arguments, 127 = python not found
 *
 * Windows: run with  node scripts/test.js  (no shell needed)
 * Unix:    run with  node scripts/test.js  OR after chmod +x: ./scripts/test.js
 *
 * Source credentials before running live integration tests:
 *   In Git Bash/WSL:  source knowledge-agent/.testEnvVars && node scripts/test.js
 *   In PowerShell:    set vars manually, then: node scripts/test.js
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
const TEST_DIR = path.join(AI_BACKEND, 'tests', 'knowledge_builder');
const LOGS_DIR = path.join(KB_ROOT, 'logs');

// ---------------------------------------------------------------------------
// Help
// ---------------------------------------------------------------------------
const HELP = `
Knowledge Builder Agent — Test Runner
======================================
Usage:
  node scripts/test.js           Run tests + linter (default)
  node scripts/test.js --unit    Run pytest only
  node scripts/test.js --lint    Run ruff linter only
  node scripts/test.js --help    Show this help

Output:  JSON to stdout
Errors:  stderr
Logs:    knowledge-agent/logs/test-<timestamp>.json  (if logs/ directory exists)

Exit codes:
  0    All checks passed
  1    One or more checks failed
  2    Bad arguments
  127  Python not found

Source credentials for live integration tests (Git Bash / WSL):
  source knowledge-agent/.testEnvVars && node knowledge-agent/scripts/test.js
`.trim();

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(HELP);
  process.exit(0);
}

const knownArgs = ['--unit', '--lint', '--all'];
const unknownArgs = args.filter(a => !knownArgs.includes(a));
if (unknownArgs.length > 0) {
  process.stderr.write(`ERROR: Unknown arguments: ${unknownArgs.join(', ')}\n`);
  process.stderr.write('Run  node scripts/test.js --help  for usage.\n');
  process.exit(2);
}

const runUnit = args.includes('--unit') || args.includes('--all') || args.length === 0;
const runLint = args.includes('--lint') || args.includes('--all') || args.length === 0;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function run(cmd, cwd) {
  const result = spawnSync(cmd, { shell: true, cwd, encoding: 'utf8' });
  return {
    exitCode: result.status !== null ? result.status : 1,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

function checkPython() {
  const r = run('python --version', REPO_ROOT);
  if (r.exitCode !== 0) {
    process.stderr.write('ERROR: python not found. Ensure Python 3.10+ is installed and on PATH.\n');
    process.exit(127);
  }
  return (r.stdout || r.stderr).trim();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const startMs = Date.now();
const report = {
  timestamp: new Date().toISOString(),
  suite: 'knowledge-builder-agent',
  python_version: checkPython(),
  checks: {},
  summary: { passed: 0, failed: 0, skipped: 0 },
  exit_code: 0,
};

// --- Unit tests (pytest) ---
if (runUnit) {
  if (!fs.existsSync(TEST_DIR)) {
    process.stderr.write(
      `WARN: Test directory not found: ${TEST_DIR}\n` +
      `      Create ai-backend/tests/knowledge_builder/ during Phase 1 implementation.\n`
    );
    report.checks.unit_tests = {
      status: 'skipped',
      reason: 'Test directory not yet created — implementation pending (see roadmap Phase 1)',
      expected_path: TEST_DIR,
    };
    report.summary.skipped += 1;
  } else {
    process.stderr.write('Running pytest on tests/knowledge_builder/...\n');
    const pytest = run(
      'python -m pytest tests/knowledge_builder/ -v --tb=short -q --no-header',
      AI_BACKEND,
    );
    process.stderr.write(pytest.stderr);
    const passed = pytest.exitCode === 0;
    report.checks.unit_tests = {
      status: passed ? 'pass' : 'fail',
      exit_code: pytest.exitCode,
      output: pytest.stdout.slice(-3000),
    };
    if (passed) {
      report.summary.passed += 1;
      process.stderr.write('✓ pytest passed\n');
    } else {
      report.summary.failed += 1;
      report.exit_code = 1;
      process.stderr.write('✗ pytest failed\n');
    }
  }
}

// --- Linter (ruff) ---
if (runLint) {
  // kb.py = live integration (generate_document_from_gaps + lazy kb_logging import); kb_logging.py = structlog module
  const kbFiles = [
    'app/routers/kb.py',
    'app/kb_logging.py',
    'app/services/gap_detection.py',
    'app/services/style_extraction.py',
    'app/services/document_generation.py',
    'app/services/kb_orchestrator.py',
    'app/routers/knowledge_builder.py',
  ].filter(f => fs.existsSync(path.join(AI_BACKEND, f)));

  if (kbFiles.length === 0) {
    process.stderr.write(
      'WARN: No KB Agent source files found yet — linter skipped.\n' +
      '      Files will be created during Phase 1 implementation.\n'
    );
    report.checks.linter = {
      status: 'skipped',
      reason: 'KB Agent source files not yet created (implementation pending)',
    };
    report.summary.skipped += 1;
  } else {
    const targets = kbFiles.join(' ');
    process.stderr.write(`Running ruff on: ${kbFiles.join(', ')}\n`);
    const ruff = run(
      `python -m ruff check ${targets} --select=E,F,W --ignore=E501`,
      AI_BACKEND,
    );
    process.stderr.write(ruff.stderr);
    const passed = ruff.exitCode === 0;
    report.checks.linter = {
      status: passed ? 'pass' : 'fail',
      exit_code: ruff.exitCode,
      files_checked: kbFiles,
      output: ruff.stdout.trim(),
    };
    if (passed) {
      report.summary.passed += 1;
      process.stderr.write('✓ ruff passed\n');
    } else {
      report.summary.failed += 1;
      report.exit_code = 1;
      process.stderr.write('✗ ruff found issues\n');
    }
  }
}

// --- Finalize ---
report.duration_ms = Date.now() - startMs;

// Write structured log to logs/ if the directory exists
if (fs.existsSync(LOGS_DIR)) {
  const logFile = path.join(LOGS_DIR, `test-${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify(report, null, 2));
  process.stderr.write(`Log written: ${logFile}\n`);
}

process.stdout.write(JSON.stringify(report, null, 2) + '\n');
process.exit(report.exit_code);
