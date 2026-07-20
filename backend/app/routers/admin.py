"""Admin dashboard, bookings, messages, orders and user management."""
import uuid
from typing import Any, Dict, List

from fastapi import APIRouter, Form, HTTPException, Request
from pydantic import EmailStr

from ..config import FRONTEND_URL
from ..database import db
from ..email_service import send_booking_confirmed, send_booking_received, send_team_welcome_email
from ..models import BookingInput, OrderInput, StatusUpdate
from ..security import hash_password, require_user, safe_user
from ..utils import new_id, now_utc

router = APIRouter(prefix="/api/admin", tags=["admin"])

ADMIN_ROLES = ["super_admin", "admin"]


@router.get("/dashboard")
async def admin_dashboard(request: Request) -> Dict[str, Any]:
    user = await require_user(request, ["super_admin", "admin", "editor"])
    return {
        "user": user,
        "summary": {
            "bookings": await db.bookings.count_documents({}),
            "orders": await db.orders.count_documents({}),
            "messages": await db.messages.count_documents({}),
            "media": await db.media_assets.count_documents({}),
            "documents": await db.cms_documents.count_documents({}),
        },
        "recent_activity": await db.messages.find({}, {"_id": 0}).sort("created_at", -1).limit(5).to_list(5),
    }


@router.get("/orders")
async def admin_orders(request: Request) -> List[Dict[str, Any]]:
    await require_user(request, ADMIN_ROLES)
    return await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)


@router.get("/bookings")
async def admin_bookings(request: Request) -> List[Dict[str, Any]]:
    await require_user(request, ADMIN_ROLES)
    return await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)


@router.get("/messages")
async def admin_messages(request: Request) -> List[Dict[str, Any]]:
    await require_user(request, ADMIN_ROLES)
    return await db.messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)


@router.patch("/messages/{message_id}")
async def update_message_status(request: Request, message_id: str, payload: StatusUpdate) -> Dict[str, Any]:
    await require_user(request, ADMIN_ROLES)
    message = await db.messages.find_one({"id": message_id})
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    await db.messages.update_one({"id": message_id}, {"$set": {"status": payload.status}})
    return {"ok": True, "id": message_id, "status": payload.status}


@router.delete("/messages/{message_id}")
async def delete_message(request: Request, message_id: str) -> Dict[str, Any]:
    await require_user(request, ADMIN_ROLES)
    message = await db.messages.find_one({"id": message_id})
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    await db.messages.delete_one({"id": message_id})
    return {"ok": True, "id": message_id}


@router.patch("/bookings/{booking_id}")
async def update_booking_status(request: Request, booking_id: str, payload: StatusUpdate) -> Dict[str, Any]:
    await require_user(request, ADMIN_ROLES)
    booking = await db.bookings.find_one({"id": booking_id})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    await db.bookings.update_one({"id": booking_id}, {"$set": {"status": payload.status}})
    # The "your booking is confirmed" email only ever goes out from here —
    # i.e. only once a real person has reviewed and confirmed it, never at
    # the moment the customer merely submits the form.
    if payload.status == "confirmed" and booking.get("email"):
        send_booking_confirmed(booking["email"], booking["customer"], booking["service"], booking.get("date"), booking.get("time"))
    return {"ok": True, "id": booking_id, "status": payload.status}


@router.post("/orders")
async def create_order(request: Request, payload: OrderInput) -> Dict[str, Any]:
    await require_user(request, ADMIN_ROLES)
    doc = {"id": new_id("order_"), "client_user_id": None, "client_name": payload.client_name, "amount": payload.amount, "package_purchased": payload.package_purchased, "payment_method": payload.payment_method, "status": payload.status, "invoice_number": f"LM-{uuid.uuid4().hex[:6].upper()}", "created_at": now_utc()}
    await db.orders.insert_one(doc)
    doc.pop("_id", None)  # insert_one injects Mongo's _id into doc; not JSON-serializable
    return doc


@router.post("/bookings")
async def create_booking_admin(request: Request, payload: BookingInput) -> Dict[str, Any]:
    await require_user(request, ADMIN_ROLES)
    doc = {"id": new_id("booking_"), "client_user_id": None, "customer": payload.customer, "phone": payload.phone, "email": payload.email, "service": payload.service, "date": payload.date, "time": payload.time, "amount": payload.amount, "notes": payload.notes, "category": payload.category, "status": "pending", "created_at": now_utc()}
    await db.bookings.insert_one(doc)
    doc.pop("_id", None)  # insert_one injects Mongo's _id into doc; not JSON-serializable
    if payload.email:
        send_booking_received(payload.email, payload.customer, payload.service, payload.date, payload.time)
    return doc


@router.get("/users")
async def admin_users(request: Request) -> List[Dict[str, Any]]:
    await require_user(request, ["super_admin"])
    return await db.users.find({}, {"_id": 0, "password_hash": 0}).sort("created_at", -1).to_list(200)


@router.post("/users")
async def create_user(request: Request, email: EmailStr = Form(...), name: str = Form(...), role: str = Form("client"), password: str = Form(...)) -> Dict[str, Any]:
    await require_user(request, ["super_admin"])
    doc = {"id": new_id("user_"), "email": str(email).lower(), "name": name, "role": role, "password_hash": hash_password(password), "disabled": False, "created_at": now_utc()}
    await db.users.insert_one(doc)
    send_team_welcome_email(doc["email"], name, password, role, f"{FRONTEND_URL}/admin/login")
    return safe_user(doc)
