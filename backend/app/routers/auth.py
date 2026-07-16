"""Authentication: login, tokens and password management."""
import hashlib
from datetime import timedelta
from typing import Any, Dict

from fastapi import APIRouter, HTTPException, Request
from starlette.status import HTTP_401_UNAUTHORIZED

from ..config import ACCESS_TOKEN_MINUTES, REFRESH_TOKEN_DAYS, RESET_TOKEN_MINUTES
from ..database import db
from ..models import LoginInput, PasswordChange, ResetConfirm, ResetRequest, TokenPair
from ..security import decode_token, encode_token, hash_password, require_user, safe_user, verify_password
from ..utils import new_id, now_utc

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login")
async def login(payload: LoginInput) -> TokenPair:
    user = await db.users.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    session_jti = new_id("session_")
    refresh_jti = new_id("refresh_")
    await db.sessions.insert_one({"jti": session_jti, "refresh_jti": refresh_jti, "user_id": user["id"], "role": user["role"], "revoked_at": None, "created_at": now_utc(), "expires_at": now_utc() + timedelta(days=REFRESH_TOKEN_DAYS)})
    access_token = encode_token(user, "access", session_jti, timedelta(minutes=ACCESS_TOKEN_MINUTES))
    refresh_token = encode_token(user, "refresh", refresh_jti, timedelta(days=REFRESH_TOKEN_DAYS))
    return TokenPair(access_token=access_token, refresh_token=refresh_token, user=safe_user(user))


@router.post("/refresh")
async def refresh(request: Request) -> TokenPair:
    header = request.headers.get("authorization", "")
    if not header.startswith("Bearer "):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Missing refresh token")
    token = header.split(" ", 1)[1].strip()
    payload = decode_token(token, "refresh")
    session = await db.sessions.find_one({"refresh_jti": payload["jti"], "revoked_at": None})
    if not session:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Session expired")
    user = await db.users.find_one({"id": session["user_id"]})
    if not user:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="User not found")
    new_session_jti = new_id("session_")
    new_refresh_jti = new_id("refresh_")
    await db.sessions.update_one({"refresh_jti": payload["jti"]}, {"$set": {"jti": new_session_jti, "refresh_jti": new_refresh_jti, "expires_at": now_utc() + timedelta(days=REFRESH_TOKEN_DAYS)}})
    return TokenPair(access_token=encode_token(user, "access", new_session_jti, timedelta(minutes=ACCESS_TOKEN_MINUTES)), refresh_token=encode_token(user, "refresh", new_refresh_jti, timedelta(days=REFRESH_TOKEN_DAYS)), user=safe_user(user))


@router.post("/logout")
async def logout(request: Request) -> Dict[str, bool]:
    header = request.headers.get("authorization", "")
    if header.startswith("Bearer "):
        token = header.split(" ", 1)[1].strip()
        payload = decode_token(token, "access")
        await db.sessions.update_one({"jti": payload["jti"]}, {"$set": {"revoked_at": now_utc()}})
    return {"ok": True}


@router.get("/me")
async def me(request: Request) -> Dict[str, Any]:
    return await require_user(request)


@router.post("/password/change")
async def change_password(request: Request, payload: PasswordChange) -> Dict[str, bool]:
    actor = await require_user(request)
    user = await db.users.find_one({"id": actor["id"]})
    if not user or not verify_password(payload.current_password, user["password_hash"]):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Current password is incorrect")
    if len(payload.new_password) < 8:
        raise HTTPException(status_code=400, detail="New password must be at least 8 characters")
    await db.users.update_one({"id": user["id"]}, {"$set": {"password_hash": hash_password(payload.new_password)}})
    return {"ok": True}


@router.post("/password/forgot")
async def forgot_password(payload: ResetRequest) -> Dict[str, Any]:
    user = await db.users.find_one({"email": payload.email.lower()})
    if not user:
        return {"ok": True}
    token = new_id("reset_")
    await db.password_resets.insert_one({"token_hash": hashlib.sha256(token.encode("utf-8")).hexdigest(), "user_id": user["id"], "expires_at": now_utc() + timedelta(minutes=RESET_TOKEN_MINUTES), "used_at": None, "created_at": now_utc()})
    return {"ok": True, "reset_token": token}


@router.post("/password/reset")
async def reset_password(payload: ResetConfirm) -> Dict[str, bool]:
    token_hash = hashlib.sha256(payload.token.encode("utf-8")).hexdigest()
    reset_doc = await db.password_resets.find_one({"token_hash": token_hash, "used_at": None})
    if not reset_doc or reset_doc["expires_at"] < now_utc():
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid reset token")
    await db.users.update_one({"id": reset_doc["user_id"]}, {"$set": {"password_hash": hash_password(payload.password)}})
    await db.password_resets.update_one({"token_hash": token_hash}, {"$set": {"used_at": now_utc()}})
    return {"ok": True}
