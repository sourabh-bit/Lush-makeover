"""Default content loading and first-run database seeding."""
from __future__ import annotations

import json
from typing import Any, Dict

from .config import (
    CONTENT_DEFAULTS_PATH,
    SEED_ADMIN_EMAIL,
    SEED_ADMIN_PASSWORD,
    SEED_CLIENT_EMAIL,
    SEED_CLIENT_PASSWORD,
)
from .database import db
from .security import hash_password
from .utils import deep_copy, new_id, now_utc

SEED_USERS = [
    {"id": "user_admin", "email": SEED_ADMIN_EMAIL, "name": "Super Admin", "role": "super_admin", "password": SEED_ADMIN_PASSWORD},
    {"id": "user_client", "email": SEED_CLIENT_EMAIL, "name": "Client One", "role": "client", "password": SEED_CLIENT_PASSWORD},
]


def load_content_defaults() -> Dict[str, Any]:
    """Read the shared default site content (also used by the frontend as fallback)."""
    if not CONTENT_DEFAULTS_PATH.exists():
        raise RuntimeError(
            f"Content defaults file not found at {CONTENT_DEFAULTS_PATH}. "
            "Set CONTENT_DEFAULTS_PATH to the location of defaults.json."
        )
    with CONTENT_DEFAULTS_PATH.open(encoding="utf-8") as fh:
        return json.load(fh)


async def seed_documents() -> None:
    # Insert any default content key that is missing, without ever overwriting
    # documents the client has already edited. Also self-heals when new keys
    # are added to defaults.json later.
    defaults = load_content_defaults()
    for order, (key, payload) in enumerate(defaults.items()):
        existing = await db.cms_documents.find_one({"key": key})
        if existing is None:
            await db.cms_documents.insert_one(
                {"id": new_id("cms_"), "key": key, "scope": "public", "payload": deep_copy(payload), "visible": True, "order": order, "created_at": now_utc(), "updated_at": now_utc()}
            )
    if await db.users.estimated_document_count() == 0:
        await db.users.insert_many(
            [
                {"id": user["id"], "name": user["name"], "email": user["email"], "role": user["role"], "password_hash": hash_password(user["password"]), "disabled": False, "created_at": now_utc()}
                for user in SEED_USERS
            ]
        )
