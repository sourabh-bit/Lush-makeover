"""Database access: MongoDB via motor, with an in-memory fallback for
development machines that don't have MongoDB running (data resets on restart).
"""
from __future__ import annotations

import copy
from typing import Any, Dict, List, Optional

import certifi
from motor.motor_asyncio import AsyncIOMotorClient

from .config import DB_NAME, MONGO_URL

# tlsCAFile=certifi.where() avoids "certificate verify failed: unable to get
# local issuer certificate" against MongoDB Atlas on machines (notably
# Windows/some minimal Linux images) whose Python install doesn't ship a
# trusted CA bundle. Harmless where the OS store already works fine.
mongo_client = AsyncIOMotorClient(MONGO_URL, tlsCAFile=certifi.where())
_current_db: Any = mongo_client[DB_NAME]


def _matches(document: Dict[str, Any], query: Dict[str, Any]) -> bool:
    for key, expected in query.items():
        if key not in document or document[key] != expected:
            return False
    return True


class _MemoryCursor:
    def __init__(self, rows: List[Dict[str, Any]]):
        self._rows = rows

    def sort(self, key: str, direction: int):
        reverse = direction < 0
        self._rows.sort(key=lambda row: row.get(key), reverse=reverse)
        return self

    def limit(self, count: int):
        self._rows = self._rows[:count]
        return self

    async def to_list(self, count: int):
        return self._rows[:count]


class _MemoryCollection:
    def __init__(self):
        self.rows: List[Dict[str, Any]] = []

    async def create_index(self, *args, **kwargs):
        return None

    async def estimated_document_count(self):
        return len(self.rows)

    async def count_documents(self, query: Dict[str, Any]):
        return len([row for row in self.rows if _matches(row, query)])

    async def insert_one(self, document: Dict[str, Any]):
        self.rows.append(copy.deepcopy(document))
        return document

    async def insert_many(self, documents: List[Dict[str, Any]]):
        for document in documents:
            self.rows.append(copy.deepcopy(document))
        return documents

    async def find_one(self, query: Dict[str, Any], projection: Optional[Dict[str, int]] = None):
        for row in self.rows:
            if _matches(row, query):
                return copy.deepcopy(row)
        return None

    def find(self, query: Dict[str, Any], projection: Optional[Dict[str, int]] = None):
        return _MemoryCursor([copy.deepcopy(row) for row in self.rows if _matches(row, query)])

    async def replace_one(self, query: Dict[str, Any], replacement: Dict[str, Any]):
        for index, row in enumerate(self.rows):
            if _matches(row, query):
                self.rows[index] = copy.deepcopy(replacement)
                return replacement
        self.rows.append(copy.deepcopy(replacement))
        return replacement

    async def update_one(self, query: Dict[str, Any], update: Dict[str, Any]):
        for row in self.rows:
            if _matches(row, query):
                payload = update.get("$set", {})
                row.update(copy.deepcopy(payload))
                return row
        return None

    async def delete_one(self, query: Dict[str, Any]):
        for index, row in enumerate(self.rows):
            if _matches(row, query):
                self.rows.pop(index)
                return None
        return None


class _MemoryDatabase:
    def __init__(self):
        self.users = _MemoryCollection()
        self.sessions = _MemoryCollection()
        self.cms_documents = _MemoryCollection()
        self.media_assets = _MemoryCollection()
        self.bookings = _MemoryCollection()
        self.orders = _MemoryCollection()
        self.messages = _MemoryCollection()
        self.password_resets = _MemoryCollection()


class _DatabaseProxy:
    """Always resolves against the active database, so modules can safely do
    `from .database import db` even though the backing store may be swapped
    to the in-memory fallback at startup."""

    def __getattr__(self, name: str) -> Any:
        return getattr(_current_db, name)


db = _DatabaseProxy()


def use_memory_database() -> None:
    global _current_db
    _current_db = _MemoryDatabase()


async def ping() -> None:
    await mongo_client.admin.command("ping")


async def ensure_indexes() -> None:
    await db.users.create_index("email", unique=True)
    await db.sessions.create_index("refresh_jti", unique=True)
    await db.cms_documents.create_index("key", unique=True)
    await db.media_assets.create_index("id", unique=True)
    await db.bookings.create_index("id", unique=True)
    await db.orders.create_index("id", unique=True)
    await db.messages.create_index("id", unique=True)
    await db.password_resets.create_index("token_hash", unique=True)
