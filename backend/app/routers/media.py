"""Photo upload, listing and deletion — backed by Cloudinary so uploads
survive redeploys (the API's own disk is ephemeral on hosts like Render)."""
from typing import Any, Dict, List

import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, File, Form, HTTPException, Request, UploadFile

from ..config import CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME
from ..database import db
from ..security import require_user
from ..utils import new_id, now_utc

router = APIRouter(prefix="/api/media", tags=["media"])

EDIT_ROLES = ["super_admin", "admin", "editor"]
MAX_UPLOAD_BYTES = 10 * 1024 * 1024

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET,
    secure=True,
)


@router.get("")
async def list_media(request: Request) -> List[Dict[str, Any]]:
    await require_user(request, EDIT_ROLES)
    return await db.media_assets.find({}, {"_id": 0}).sort("uploaded_at", -1).to_list(200)


@router.post("/upload")
async def upload_media(request: Request, file: UploadFile = File(...), alt_text: str = Form(""), folder: str = Form("general")) -> Dict[str, Any]:
    actor = await require_user(request, EDIT_ROLES)
    if not (file.content_type or "").startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image uploads are allowed")
    safe_folder = folder.replace("..", "").strip() or "general"

    contents = await file.read()
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=400, detail="Image exceeds 10MB")

    try:
        result = cloudinary.uploader.upload(contents, folder=f"lush-makeovers/{safe_folder}", resource_type="image")
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Image upload failed. Please try again.") from exc

    doc = {
        "id": new_id("media_"),
        "filename": result.get("public_id"),
        "original_name": file.filename,
        "url": result.get("secure_url"),
        "size": result.get("bytes", len(contents)),
        "content_type": file.content_type,
        "alt_text": alt_text,
        "folder": safe_folder,
        "uploaded_by": actor["id"],
        "uploaded_at": now_utc(),
    }
    await db.media_assets.insert_one(doc)
    doc.pop("_id", None)  # insert_one injects Mongo's _id into doc; not JSON-serializable
    return doc


@router.delete("/{media_id}")
async def delete_media(request: Request, media_id: str) -> Dict[str, bool]:
    await require_user(request, EDIT_ROLES)
    media = await db.media_assets.find_one({"id": media_id})
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    public_id = media.get("filename")
    if public_id:
        try:
            cloudinary.uploader.destroy(public_id)
        except Exception:
            pass  # best-effort — still remove our own record either way
    await db.media_assets.delete_one({"id": media_id})
    return {"ok": True}
