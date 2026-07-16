"""Read-only portal for customer accounts."""
from typing import Any, Dict

from fastapi import APIRouter, Request

from ..database import db
from ..security import require_user

router = APIRouter(prefix="/api/client", tags=["client"])


@router.get("/dashboard")
async def client_dashboard(request: Request) -> Dict[str, Any]:
    user = await require_user(request, ["client", "admin", "super_admin"])
    return {
        "user": user,
        "orders": await db.orders.find({"client_user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(50),
        "bookings": await db.bookings.find({"client_user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(50),
        "messages": await db.messages.find({"email": user["email"]}, {"_id": 0}).sort("created_at", -1).to_list(50),
    }
