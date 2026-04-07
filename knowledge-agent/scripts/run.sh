#!/usr/bin/env bash
# run.sh — Start the Frantelligence AI Backend for Knowledge Builder development
#
# Usage:
#   ./scripts/run.sh              Start backend on default port (8000)
#   ./scripts/run.sh --reload     Enable hot-reload (development mode)
#   ./scripts/run.sh --port 9000  Start on a custom port
#   ./scripts/run.sh --help       Show this help
#
# Prerequisites:
#   - Python 3.10+ with ai-backend/requirements.txt installed
#   - Source .testEnvVars (or set env vars) before running:
#       source knowledge-agent/.testEnvVars && ./knowledge-agent/scripts/run.sh
#
# Windows users: run via Git Bash or WSL.
#   Alternatively run directly: cd ai-backend && python -m uvicorn app.main:app --reload
#
# Exit codes: 0 = clean shutdown, 1 = startup error, 127 = command not found

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KB_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$KB_ROOT/.." && pwd)"
AI_BACKEND="$REPO_ROOT/ai-backend"

# ---------------------------------------------------------------------------
# Help
# ---------------------------------------------------------------------------
show_help() {
  cat <<EOF
Knowledge Builder Agent — Backend Runner
=========================================
Usage:
  ./scripts/run.sh [options]

Options:
  --help          Show this help
  --reload        Enable uvicorn hot-reload (recommended for development)
  --port <N>      Port to listen on (default: 8000)

Environment:
  Source knowledge-agent/.testEnvVars for local credentials:
    source knowledge-agent/.testEnvVars && ./knowledge-agent/scripts/run.sh --reload

Knowledge Builder endpoints once running:
  POST   http://localhost:<port>/api/v1/knowledge-builder/generate/{gap_id}
  GET    http://localhost:<port>/api/v1/knowledge-builder/gaps
  GET    http://localhost:<port>/api/v1/knowledge-builder/suggestions
  POST   http://localhost:<port>/api/v1/knowledge-builder/approve/{token}
  POST   http://localhost:<port>/api/v1/knowledge-builder/dismiss/{token}
  GET    http://localhost:<port>/docs   (Swagger UI — dev only)

Exit codes: 0 = clean shutdown, 1 = startup error, 127 = python/uvicorn not found
EOF
}

# ---------------------------------------------------------------------------
# Parse arguments
# ---------------------------------------------------------------------------
PORT="${PORT:-8000}"
RELOAD_FLAG=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --help|-h)    show_help; exit 0 ;;
    --reload)     RELOAD_FLAG="--reload"; shift ;;
    --port)       PORT="$2"; shift 2 ;;
    *)            echo "ERROR: Unknown argument: $1" >&2; exit 2 ;;
  esac
done

# ---------------------------------------------------------------------------
# Load .testEnvVars if not already configured
# ---------------------------------------------------------------------------
TEST_ENV="$KB_ROOT/.testEnvVars"
if [[ -f "$TEST_ENV" && -z "${SUPABASE_URL:-}" ]]; then
  echo "Loading .testEnvVars..." >&2
  # shellcheck source=/dev/null
  source "$TEST_ENV"
elif [[ -z "${SUPABASE_URL:-}" ]]; then
  echo "WARN: SUPABASE_URL not set and .testEnvVars not found." >&2
  echo "      Backend will start but database calls will fail." >&2
  echo "      Copy knowledge-agent/.testEnvVars.example → .testEnvVars and fill in values." >&2
fi

# ---------------------------------------------------------------------------
# Verify python / uvicorn available
# ---------------------------------------------------------------------------
if ! command -v python &>/dev/null; then
  echo "ERROR: python not found. Ensure Python 3.10+ is installed and on PATH." >&2
  exit 127
fi

# ---------------------------------------------------------------------------
# Start
# ---------------------------------------------------------------------------
echo "======================================================" >&2
echo " Frantelligence AI Backend — Knowledge Builder Mode   " >&2
echo "======================================================" >&2
echo " Port:     $PORT" >&2
echo " Reload:   ${RELOAD_FLAG:-disabled}" >&2
echo " Docs:     http://localhost:$PORT/docs" >&2
echo " KB API:   http://localhost:$PORT/api/v1/knowledge-builder/" >&2
echo "------------------------------------------------------" >&2
echo " Tip: enable the feature flag in .testEnvVars:" >&2
echo "   export VITE_FEATURE_KNOWLEDGE_BUILDER=true" >&2
echo "======================================================" >&2

cd "$AI_BACKEND"
exec python -m uvicorn app.main:app \
  --host 0.0.0.0 \
  --port "$PORT" \
  $RELOAD_FLAG
