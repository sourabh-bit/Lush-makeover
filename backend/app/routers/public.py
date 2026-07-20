"""Unauthenticated endpoints: site content bootstrap and public form posts."""
from typing import Any, Dict, Optional

from fastapi import APIRouter

from ..config import FRONTEND_URL, SEED_ADMIN_EMAIL
from ..database import db
from ..email_service import send_booking_received, send_enquiry_confirmation, send_new_enquiry_notification
from ..models import BookingInput, MessageInput
from ..utils import bootstrap_payload, new_id, now_utc

router = APIRouter(prefix="/api", tags=["public"])


async def _notify_email() -> str:
    """Where new-enquiry/booking notifications go — the business email set
    in Admin > Business Details, so it always follows what the owner has
    configured there. Falls back to the seed admin email if unset."""
    settings_doc = await db.cms_documents.find_one({"key": "settings"})
    email = (settings_doc or {}).get("payload", {}).get("email")
    return email or SEED_ADMIN_EMAIL


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

    send_new_enquiry_notification(
        await _notify_email(),
        payload.name,
        payload.phone,
        payload.email,
        payload.category,
        payload.message,
        f"{FRONTEND_URL}/admin/messages",
    )
    if payload.email:
        send_enquiry_confirmation(payload.email, payload.name)

    return {"ok": True, "message_id": doc["id"]}


@router.post("/bookings")
async def create_booking(payload: BookingInput) -> Dict[str, Any]:
    doc = {"id": new_id("booking_"), "client_user_id": None, "customer": payload.customer, "phone": payload.phone, "email": payload.email, "service": payload.service, "date": payload.date, "time": payload.time, "amount": payload.amount, "notes": payload.notes, "category": payload.category, "status": "pending", "created_at": now_utc()}
    await db.bookings.insert_one(doc)

    schedule = payload.service
    if payload.date:
        schedule += f" — {payload.date}" + (f" {payload.time}" if payload.time else "")
    send_new_enquiry_notification(
        await _notify_email(),
        payload.customer,
        payload.phone,
        payload.email,
        payload.category,
        schedule + (f"\n{payload.notes}" if payload.notes else ""),
        f"{FRONTEND_URL}/admin/bookings",
    )
    if payload.email:
        send_booking_received(payload.email, payload.customer, payload.service, payload.date, payload.time)

    return {"ok": True, "booking_id": doc["id"]}
