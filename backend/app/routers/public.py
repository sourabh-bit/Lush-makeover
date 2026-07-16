"""Unauthenticated endpoints: site content bootstrap and public form posts."""
from typing import Any, Dict

from fastapi import APIRouter

from ..database import db
from ..models import BookingInput, MessageInput
from ..utils import bootstrap_payload, new_id, now_utc

router = APIRouter(prefix="/api", tags=["public"])


@router.get("/")
async def root() -> Dict[str, str]:
    return {"message": "Lush Makeovers CMS API"}


@router.get("/public/bootstrap")
async def public_bootstrap() -> Dict[str, Any]:
    docs = await db.cms_documents.find({"visible": True}, {"_id": 0}).sort("order", 1).to_list(500)
    return bootstrap_payload(docs)


@router.post("/contact")
async def create_contact(payload: MessageInput) -> Dict[str, Any]:
    doc = {"id": new_id("msg_"), "name": payload.name, "phone": payload.phone, "email": payload.email, "message": payload.message, "category": payload.category, "status": "unread", "reply_notes": "", "created_at": now_utc()}
    await db.messages.insert_one(doc)
    return {"ok": True, "message_id": doc["id"]}


@router.post("/bookings")
async def create_booking(payload: BookingInput) -> Dict[str, Any]:
    doc = {"id": new_id("booking_"), "client_user_id": None, "customer": payload.customer, "phone": payload.phone, "email": payload.email, "service": payload.service, "date": payload.date, "time": payload.time, "amount": payload.amount, "notes": payload.notes, "status": "pending", "created_at": now_utc()}
    await db.bookings.insert_one(doc)
    return {"ok": True, "booking_id": doc["id"]}
