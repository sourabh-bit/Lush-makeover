"""Pydantic request/response models."""
from typing import Any, Dict, Literal, Optional

from pydantic import BaseModel, EmailStr


class LoginInput(BaseModel):
    email: EmailStr
    password: str


class ResetRequest(BaseModel):
    email: EmailStr


class ResetConfirm(BaseModel):
    token: str
    password: str


class PasswordChange(BaseModel):
    current_password: str
    new_password: str


class CmsUpsert(BaseModel):
    key: str
    payload: Any
    scope: str = "public"
    visible: bool = True
    order: int = 0


class BookingInput(BaseModel):
    customer: str
    phone: str
    email: EmailStr
    service: str
    date: str
    time: str
    amount: Optional[str] = None
    notes: Optional[str] = None


class MessageInput(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    message: str
    # Which form it came from: wedding | academy | general
    category: str = "general"


class OrderInput(BaseModel):
    client_name: str
    amount: str
    package_purchased: str
    payment_method: str = "offline"
    status: str = "pending"


class StatusUpdate(BaseModel):
    status: str


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: Literal["bearer"] = "bearer"
    user: Dict[str, Any]
