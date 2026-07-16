"""Photo upload, serving and deletion."""
import uuid
from pathlib import Path
from typing import Any, Dict, List

from fastapi import APIRouter, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import FileResponse

from ..config import PUBLIC_API_URL, UPLOAD_DIR
from ..database import db
from ..security import require_user
from ..utils import new_id, now_utc

router = APIRouter(prefix="/api/media", tags=["media"])

EDIT_ROLES = ["super_admin", "admin", "editor"]
MAX_UPLOAD_BYTES = 10 * 1024 * 1024


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
    upload_path = UPLOAD_DIR / safe_folder
    upload_path.mkdir(parents=True, exist_ok=True)
    ext = Path(file.filename or "upload").suffix or ".jpg"
    filename = f"{uuid.uuid4().hex}{ext}"
    destination = upload_path / filename
    total = 0
    with destination.open("wb") as handle:
        while True:
            chunk = await file.read(1024 * 1024)
            if not chunk:
                break
            total += len(chunk)
            if total > MAX_UPLOAD_BYTES:
                handle.close()
                destination.unlink(missing_ok=True)
                raise HTTPException(status_code=400, detail="Image exceeds 10MB")
            handle.write(chunk)
    doc = {"id": new_id("media_"), "filename": filename, "original_name": file.filename, "url": f"{PUBLIC_API_URL}/api/media/file/{safe_folder}/{filename}", "size": total, "content_type": file.content_type, "alt_text": alt_text, "folder": safe_folder, "uploaded_by": actor["id"], "uploaded_at": now_utc()}
    await db.media_assets.insert_one(doc)
    return doc


@router.get("/file/{folder}/{filename}")
async def media_file(folder: str, filename: str) -> FileResponse:
    path = (UPLOAD_DIR / folder / filename).resolve()
    if not str(path).startswith(str(UPLOAD_DIR)):
        raise HTTPException(status_code=400, detail="Invalid path")
    if not path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path)


@router.delete("/{media_id}")
async def delete_media(request: Request, media_id: str) -> Dict[str, bool]:
    await require_user(request, EDIT_ROLES)
    media = await db.media_assets.find_one({"id": media_id})
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    path = (UPLOAD_DIR / media["folder"] / media["filename"]).resolve()
    if path.exists():
        path.unlink()
    await db.media_assets.delete_one({"id": media_id})
    return {"ok": True}
