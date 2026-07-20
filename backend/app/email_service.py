"""Transactional email via Resend. Every send goes through _send, which
never raises — a broken email provider should never break the request
that triggered it (a form submission, a login, an admin action)."""
from __future__ import annotations

import logging
from typing import Optional

import resend

from . import email_templates as templates
from .config import RESEND_API_KEY, RESEND_FROM_EMAIL

logger = logging.getLogger(__name__)

resend.api_key = RESEND_API_KEY


def email_configured() -> bool:
    return bool(RESEND_API_KEY)


def _send(to_email: str, subject: str, html: str) -> bool:
    if not email_configured():
        return False
    try:
        resend.Emails.send({"from": RESEND_FROM_EMAIL, "to": [to_email], "subject": subject, "html": html})
        return True
    except Exception:
        logger.exception("Failed to send email to %s", to_email)
        return False


def send_password_reset_email(to_email: str, reset_link: str) -> bool:
    subject, html = templates.password_reset(reset_link)
    return _send(to_email, subject, html)


def send_new_enquiry_notification(to_email: str, name: str, phone: Optional[str], email: Optional[str], category: str, message: str, admin_url: str) -> bool:
    subject, html = templates.new_enquiry_notification(name, phone, email, category, message, admin_url)
    return _send(to_email, subject, html)


def send_enquiry_confirmation(to_email: str, name: str) -> bool:
    subject, html = templates.enquiry_confirmation(name)
    return _send(to_email, subject, html)


def send_booking_received(to_email: str, customer: str, service: str, date: Optional[str] = None, time: Optional[str] = None) -> bool:
    """The form-submission email — deliberately says "received", not
    "confirmed". Pair with send_booking_confirmed, sent only when the admin
    actually confirms the booking from the dashboard."""
    subject, html = templates.booking_received(customer, service, date, time)
    return _send(to_email, subject, html)


def send_booking_confirmed(to_email: str, customer: str, service: str, date: Optional[str] = None, time: Optional[str] = None) -> bool:
    subject, html = templates.booking_confirmed(customer, service, date, time)
    return _send(to_email, subject, html)


def send_team_welcome_email(to_email: str, name: str, password: str, role: str, login_url: str) -> bool:
    subject, html = templates.team_welcome(name, to_email, password, role, login_url)
    return _send(to_email, subject, html)
