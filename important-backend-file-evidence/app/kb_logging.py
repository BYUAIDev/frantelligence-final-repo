"""
Structured logging for the Knowledge Builder Agent.

Uses structlog to emit JSON-formatted log entries to stdout. Every log
statement includes a timestamp, level, module name, action name, and any
keyword fields passed by the caller. This makes logs machine-readable so the
AI test-fix loop can parse, filter, and diagnose failures without a debugger.

All Knowledge Builder services MUST use this module. Do NOT use:
  - print()
  - logging.getLogger() directly
  - bare string messages like logger.info("something happened")

Usage
-----
At the top of every KB Agent service file:

    from app.kb_logging import get_logger
    logger = get_logger(__name__)

Then log with keyword fields (not f-strings):

    logger.info("gap_detected", gap_id=gap_id, company_id=company_id, severity=45)
    logger.warning("severity_below_threshold", gap_id=gap_id, threshold=MIN_SCORE)
    logger.error("generation_failed", gap_id=gap_id, error=str(e))

Use the entry/exit/error helpers for the standard operation lifecycle:

    from app.kb_logging import get_logger, log_entry, log_exit, log_error

    async def detect_gaps(self, company_id: str) -> list:
        log_entry(logger, "detect_gaps", company_id=company_id)
        try:
            result = await self._query(company_id)
            log_exit(logger, "detect_gaps", company_id=company_id, count=len(result))
            return result
        except Exception as e:
            log_error(logger, "detect_gaps", e, company_id=company_id)
            raise

Example JSON output
-------------------
{"timestamp": "2026-02-24T14:30:00Z", "level": "info",  "logger": "app.services.gap_detection",
 "event": "detect_gaps.entry",  "action": "detect_gaps", "company_id": "abc-123", "days": 30}

{"timestamp": "2026-02-24T14:30:01Z", "level": "info",  "logger": "app.services.gap_detection",
 "event": "detect_gaps.exit",   "action": "detect_gaps", "company_id": "abc-123", "count": 4}

{"timestamp": "2026-02-24T14:30:02Z", "level": "error", "logger": "app.services.gap_detection",
 "event": "generate_document.error", "action": "generate_document", "gap_id": "xyz-789",
 "error": "HTTPStatusError", "error_message": "503 Service Unavailable", "exc_info": "..."}
"""

import logging
import sys
from typing import Any

import structlog


# ---------------------------------------------------------------------------
# One-time configuration — idempotent, safe to call multiple times
# ---------------------------------------------------------------------------

def configure_structlog() -> None:
    """
    Configure structlog to emit JSON to stdout.

    Called automatically by get_logger() on first use. Safe to call
    explicitly at application startup if you want deterministic ordering.

    Log level is controlled by the LOG_LEVEL environment variable (via the
    app settings). Default is INFO. Set LOG_LEVEL=debug in .testEnvVars for
    verbose output during test runs.
    """
    # Determine log level from the environment (mirrors app.config pattern)
    import os
    level_name = os.environ.get("LOG_LEVEL", "info").upper()
    level = getattr(logging, level_name, logging.INFO)

    structlog.configure(
        processors=[
            # Add log level ("info", "error", etc.) as a field
            structlog.stdlib.add_log_level,
            # Add the logger name (module path) as a field
            structlog.stdlib.add_logger_name,
            # ISO 8601 timestamp
            structlog.processors.TimeStamper(fmt="iso", utc=True),
            # Render stack info if passed
            structlog.processors.StackInfoRenderer(),
            # Render exception info if exc_info is truthy
            structlog.processors.ExceptionRenderer(),
            # Ensure all strings are unicode
            structlog.processors.UnicodeDecoder(),
            # Final step: render as compact JSON
            structlog.processors.JSONRenderer(),
        ],
        wrapper_class=structlog.make_filtering_bound_logger(level),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(file=sys.stdout),
        cache_logger_on_first_use=True,
    )


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def get_logger(name: str) -> structlog.stdlib.BoundLogger:
    """
    Return a structured logger bound to the given module name.

    Call at module level in every KB Agent service:

        from app.kb_logging import get_logger
        logger = get_logger(__name__)

    Args:
        name: Typically __name__ — gives logs a clean module-path label
              like "app.services.gap_detection".

    Returns:
        A structlog BoundLogger that emits JSON to stdout.
    """
    configure_structlog()
    return structlog.get_logger(name)


def log_entry(logger: Any, action: str, **kwargs: Any) -> None:
    """
    Log the entry point of an operation with its input context.

    Emits an INFO event named "<action>.entry".

    Args:
        logger: Logger returned by get_logger().
        action: Name of the operation (snake_case, matches function name).
        **kwargs: Any input fields relevant to the operation
                  (e.g., company_id, gap_id, days).

    Example:
        log_entry(logger, "detect_gaps", company_id=company_id, days=30)
        # → {"event": "detect_gaps.entry", "action": "detect_gaps",
        #    "company_id": "...", "days": 30, ...}
    """
    logger.info(f"{action}.entry", action=action, **kwargs)


def log_exit(logger: Any, action: str, **kwargs: Any) -> None:
    """
    Log the successful completion of an operation with its result summary.

    Emits an INFO event named "<action>.exit".

    Args:
        logger: Logger returned by get_logger().
        action: Name of the operation (must match the log_entry call).
        **kwargs: Result fields (e.g., count=len(gaps), document_id=doc.id).

    Example:
        log_exit(logger, "detect_gaps", company_id=company_id, count=4)
        # → {"event": "detect_gaps.exit", "action": "detect_gaps",
        #    "company_id": "...", "count": 4, ...}
    """
    logger.info(f"{action}.exit", action=action, **kwargs)


def log_error(logger: Any, action: str, error: Exception, **kwargs: Any) -> None:
    """
    Log a failed operation with full exception context.

    Emits an ERROR event named "<action>.error". The exception class name
    and message are always included. exc_info is set so the full traceback
    appears in the JSON output for AI-assisted debugging.

    Args:
        logger: Logger returned by get_logger().
        action: Name of the operation that failed.
        error: The caught exception.
        **kwargs: Any additional context (e.g., gap_id, company_id).

    Example:
        except Exception as e:
            log_error(logger, "generate_document", e, gap_id=gap_id)
            raise
        # → {"event": "generate_document.error", "action": "generate_document",
        #    "error": "HTTPStatusError", "error_message": "503 ...",
        #    "gap_id": "...", "exc_info": "...", ...}
    """
    logger.error(
        f"{action}.error",
        action=action,
        error=type(error).__name__,
        error_message=str(error),
        exc_info=error,
        **kwargs,
    )
