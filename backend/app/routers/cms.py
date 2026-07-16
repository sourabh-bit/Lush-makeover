"""Website content documents (the CMS itself)."""
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException, Request

from ..database import db
from ..models import CmsUpsert
from ..security import require_user
from ..utils import deep_copy, new_id, now_utc

router = APIRouter(prefix="/api/cms", tags=["cms"])

EDIT_ROLES = ["super_admin", "admin", "editor"]


async def get_document(key: str) -> Dict[str, Any]:
    document = await db.cms_documents.find_one({"key": key}, {"_id": 0})
    if not document:
        raise HTTPException(status_code=404, detail=f"Document {key} not found")
    return document


async def upsert_document(document: CmsUpsert, actor: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    existing = await db.cms_documents.find_one({"key": document.key})
    data = {"id": existing["id"] if existing else new_id("cms_"), "key": document.key, "scope": document.scope, "payload": deep_copy(document.payload), "visible": document.visible, "order": document.order, "updated_at": now_utc(), "updated_by": actor["id"] if actor else None}
    if existing:
        data["created_at"] = existing.get("created_at", now_utc())
        await db.cms_documents.replace_one({"key": document.key}, data)
    else:
        data["created_at"] = now_utc()
        await db.cms_documents.insert_one(data)
    return data


@router.get("/documents")
async def list_cms_documents(request: Request, scope: Optional[str] = None) -> List[Dict[str, Any]]:
    await require_user(request, EDIT_ROLES)
    query: Dict[str, Any] = {}
    if scope:
        query["scope"] = scope
    return await db.cms_documents.find(query, {"_id": 0}).sort("order", 1).to_list(500)


@router.get("/documents/{key}")
async def get_cms_document(request: Request, key: str) -> Dict[str, Any]:
    await require_user(request, EDIT_ROLES)
    return await get_document(key)


@router.put("/documents/{key}")
async def update_cms_document(request: Request, key: str, document: CmsUpsert) -> Dict[str, Any]:
    actor = await require_user(request, EDIT_ROLES)
    if key != document.key:
        raise HTTPException(status_code=400, detail="Document key mismatch")
    return await upsert_document(document, actor)


@router.post("/documents")
async def create_cms_document(request: Request, document: CmsUpsert) -> Dict[str, Any]:
    actor = await require_user(request, EDIT_ROLES)
    return await upsert_document(document, actor)
