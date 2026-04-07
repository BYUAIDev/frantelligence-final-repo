"""Knowledge Builder structured logging (app.kb_logging) — rubric: JSON logs, testable."""

import json

import pytest

pytest.importorskip("structlog")

from app.kb_logging import configure_structlog, get_logger, log_entry, log_exit


def test_kb_logging_emits_json_with_action_and_fields(capsys):
    """log_entry / log_exit produce parseable JSON on stdout for test-log-fix loops."""
    configure_structlog()
    log = get_logger("tests.knowledge_builder")

    log_entry(log, "demo_operation", company_id="test-co", items=2)
    captured = capsys.readouterr().out
    lines = [ln for ln in captured.splitlines() if ln.strip() and ln.strip().startswith("{")]
    assert lines, "expected JSON line on stdout"
    payload = json.loads(lines[0])
    blob = json.dumps(payload)
    assert "demo_operation" in blob
    assert "test-co" in blob

    log_exit(log, "demo_operation", company_id="test-co", result="ok")
    captured2 = capsys.readouterr().out
    lines2 = [ln for ln in captured2.splitlines() if ln.strip() and ln.strip().startswith("{")]
    assert lines2
    payload2 = json.loads(lines2[0])
    assert "demo_operation" in json.dumps(payload2)


def test_generate_from_gaps_endpoint_exists_on_kb_router():
    """Knowledge Builder route is registered (logging is lazy inside handler only)."""
    from app.routers.kb import router

    paths = []
    for route in router.routes:
        p = getattr(route, "path", None)
        if p:
            paths.append(p)
    assert any("generate-from-gaps" in p for p in paths)
