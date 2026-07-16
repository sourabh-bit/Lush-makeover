"""Small shared helpers."""
from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def new_id(prefix: str = "") -> str:
    return f"{prefix}{uuid.uuid4().hex}"


def deep_copy(value: Any) -> Any:
    if isinstance(value, dict):
        return {k: deep_copy(v) for k, v in value.items()}
    if isinstance(value, list):
        return [deep_copy(v) for v in value]
    return value


def bootstrap_payload(documents: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Collapse a list of CMS documents into a {key: payload} map."""
    payload: Dict[str, Any] = {}
    for document in documents:
        payload[document["key"]] = deep_copy(document["payload"])
    return payload
