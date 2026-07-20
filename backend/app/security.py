"""Passwords, JWT tokens and the authenticated-user dependency."""
from __future__ import annotations

from datetime import timedelta
from typing import Any, Dict, List, Optional

import jwt
from fastapi import HTTPException, Request
from passlib.context import CryptContext
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN

from .config import JWT_ALGORITHM, JWT_SECRET
from .database import db
from .utils import now_utc

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def hash_password(raw: str) -> str:
    return pwd_context.hash(raw)


def verify_password(raw: str, hashed: str) -> bool:
    return pwd_context.verify(raw, hashed)


def safe_user(user: Dict[str, Any]) -> Dict[str, Any]:
    # Drop password_hash plus Mongo's own _id (an ObjectId, injected into the
    # dict by insert_one/find_one) — neither is safe to send to the client or
    # JSON-serializable as-is.
    return {k: v for k, v in user.items() if k not in ("password_hash", "_id")}


def encode_token(user: Dict[str, Any], token_type: str, jti: str, expires: timedelta) -> str:
    payload = {
        "sub": user["id"],
        "email": user["email"],
        "role": user["role"],
        "type": token_type,
        "jti": jti,
        "iat": int(now_utc().timestamp()),
        "exp": now_utc() + expires,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str, token_type: str) -> Dict[str, Any]:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError as exc:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc
    if payload.get("type") != token_type:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid token type")
    return payload


async def require_user(request: Request, roles: Optional[List[str]] = None) -> Dict[str, Any]:
    header = request.headers.get("authorization", "")
    if not header.startswith("Bearer "):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Missing token")
    token = header.split(" ", 1)[1].strip()
    payload = decode_token(token, "access")
    user = await db.users.find_one({"id": payload["sub"]})
    if not user or user.get("disabled"):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="User not found")
    if roles and user["role"] not in roles:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return safe_user(user)
