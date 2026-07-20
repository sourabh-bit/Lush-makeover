"""Branded HTML templates for every transactional email the API sends.

One shared shell (_shell) renders the site's look — cream background, a
white card, the LUSH MAKEOVERS wordmark, a gold divider, serif display
type — and every email type below is just different content poured into
that shell. Inline styles only: email clients strip <style> blocks and
external stylesheets unpredictably.
"""
from __future__ import annotations

from typing import List, Optional, Tuple

INK = "#2a2a2a"
INK_SOFT = "#4a4742"
MUTED = "#6b6760"
MUTED_LIGHT = "#8b7f72"
GOLD = "#8a7656"
GOLD_LINE = "#b8a17a"
BORDER = "#ece6da"
CREAM = "#fcfaf7"
CARD_BG = "#fbfaf6"

DISPLAY_FONT = "Georgia, 'Times New Roman', serif"
BODY_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"


def _button(label: str, url: str) -> str:
    return f"""
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
      <tr>
        <td bgcolor="{INK}" style="background:{INK}; border-radius: 2px;">
          <a href="{url}" style="display:inline-block; padding: 13px 26px; font-family:{BODY_FONT}; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #ffffff !important; text-decoration: none;">{label}</a>
        </td>
      </tr>
    </table>
    """


def _detail_rows(rows: List[Tuple[str, str]]) -> str:
    cells = "".join(
        f"""
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid {BORDER}; font-family:{BODY_FONT}; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color:{MUTED_LIGHT} !important; width: 110px; vertical-align: top;">{label}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid {BORDER}; font-family:{BODY_FONT}; font-size: 14px; color:{INK} !important; vertical-align: top;">{value}</td>
        </tr>
        """
        for label, value in rows
    )
    return f"""
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0; border-top: 1px solid {BORDER};">
      {cells}
    </table>
    """


def _shell(eyebrow: str, heading: str, body_html: str, script_line: Optional[str] = None) -> str:
    script_html = (
        f'<div style="font-family:{DISPLAY_FONT}; font-style: italic; font-size: 18px; color:{GOLD} !important; margin-top: 4px;">{script_line}</div>'
        if script_line
        else ""
    )
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <!-- Tells Gmail/Outlook/Apple Mail this email is designed for light mode
         only — without this, dark-mode clients auto-invert the colors,
         which is why the card was rendering black-on-black/gold blocks. -->
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>{heading}</title>
    <style>
      :root {{ color-scheme: light; supported-color-schemes: light; }}
      body, table, td, a {{ -webkit-text-size-adjust: 100%; }}
    </style>
  </head>
  <body style="margin:0; padding: 24px 12px; background-color:{CREAM}; font-family:{BODY_FONT};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border: 1px solid {BORDER};">
      <tr>
        <td style="padding: 28px 24px 22px; text-align: center; border-bottom: 1px solid {BORDER};">
          <div style="font-family:{DISPLAY_FONT}; font-size: 18px; letter-spacing: 0.28em; color:{INK} !important;">LUSH MAKEOVERS</div>
          <div style="font-family:{BODY_FONT}; font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color:{MUTED} !important; margin-top: 6px;">Hair &amp; Makeup</div>
        </td>
      </tr>
      <tr>
        <td style="padding: 28px 24px 32px;">
          <div style="font-family:{BODY_FONT}; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color:{MUTED_LIGHT} !important; text-align: center;">{eyebrow}</div>
          <h1 style="font-family:{DISPLAY_FONT}; font-weight: 400; font-size: 23px; color:{INK} !important; text-align: center; margin: 10px 0 0;">{heading}</h1>
          {f'<div style="text-align:center;">{script_html}</div>' if script_line else ""}
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 18px auto;">
            <tr>
              <td style="width: 36px; height: 1px; background-color:{GOLD_LINE};">&nbsp;</td>
              <td style="width: 6px; height: 6px; border-radius: 50%; background-color:{GOLD_LINE};">&nbsp;</td>
              <td style="width: 36px; height: 1px; background-color:{GOLD_LINE};">&nbsp;</td>
            </tr>
          </table>
          <div style="font-family:{BODY_FONT}; font-size: 15px; line-height: 1.65; color:{INK_SOFT} !important;">
            {body_html}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 24px; background-color:{CARD_BG}; border-top: 1px solid {BORDER}; text-align:center;">
          <div style="font-family:{BODY_FONT}; font-size: 12px; color:{MUTED} !important; line-height: 1.6;">
            Lush Makeovers &middot; M.G. Road, Vijayawada 520010<br />
            hello@lushmakeovers.in
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>"""


def password_reset(reset_link: str) -> Tuple[str, str]:
    subject = "Reset your Lush Makeovers admin password"
    body = f"""
    <p>Someone (hopefully you) asked to reset the password for the Lush Makeovers admin dashboard. Tap the button below to choose a new one — this link stops working in 30 minutes.</p>
    {_button("Choose New Password", reset_link)}
    <p style="font-size: 13px; color:{MUTED_LIGHT} !important;">Didn't ask for this? You can ignore this email — your password stays the same.</p>
    """
    return subject, _shell("Admin Account", "Reset your password", body)


def new_enquiry_notification(name: str, phone: Optional[str], email: Optional[str], category: str, message: str, admin_url: str) -> Tuple[str, str]:
    kind = {"wedding": "a wedding enquiry", "academy": "an academy enquiry"}.get(category, "a new message")
    subject = f"New: {kind} from {name}"
    rows = [("Name", name)]
    if phone:
        rows.append(("Phone", phone))
    if email:
        rows.append(("Email", email))
    body = f"""
    <p>You've received {kind} through your website. Details below — open the admin dashboard to reply or confirm.</p>
    {_detail_rows(rows)}
    <div style="margin-top: 4px;">
      <div style="font-family:{BODY_FONT}; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color:{MUTED_LIGHT} !important;">Details</div>
      <p style="margin-top: 8px; white-space: pre-wrap;">{message}</p>
    </div>
    {_button("Open Admin Dashboard", admin_url)}
    """
    return subject, _shell("New Enquiry", "You have a new enquiry", body)


def enquiry_confirmation(name: str) -> Tuple[str, str]:
    subject = "We've got your message — Lush Makeovers"
    body = f"""
    <p>Hi {name},</p>
    <p>This confirms your message reached the Lush Makeovers studio. A real person on our team reads every message and writes back personally within 24 hours — usually sooner.</p>
    <p>Nothing more to do on your end — we'll be in touch. Meanwhile you're welcome to browse our work on Instagram <a href="https://www.instagram.com/lush_makeovers/" style="color:{GOLD} !important;">@lush_makeovers</a>.</p>
    <p>With warmth,<br />The Lush Makeovers Studio</p>
    """
    return subject, _shell("Message Received", "Thank you for writing", body, script_line="we'll reply within 24 hours")


def booking_received(customer: str, service: str, date: Optional[str] = None, time: Optional[str] = None) -> Tuple[str, str]:
    """Sent the moment a booking/enquiry form is submitted. Deliberately does
    NOT say "confirmed" — nothing is confirmed until a human on the team
    reviews it and confirms it from the admin dashboard (see
    booking_confirmed below, sent at that later point instead)."""
    subject = "We've got your booking request — Lush Makeovers"
    rows = [("Service", service)]
    if date:
        rows.append(("Date", date))
    if time:
        rows.append(("Time", time))
    body = f"""
    <p>Hi {customer},</p>
    <p>This confirms we <strong>received</strong> your booking request below. It is <strong>not yet confirmed</strong> — our team personally reviews every request and will confirm your appointment within 24 hours.</p>
    {_detail_rows(rows)}
    <p style="font-size: 13px; color:{MUTED_LIGHT} !important;">You'll get a separate email the moment it's confirmed. Questions before then? Just reply to this email or message us on WhatsApp.</p>
    """
    return subject, _shell("Request Received", "We've got your request", body, script_line="not yet confirmed — more soon")


def booking_confirmed(customer: str, service: str, date: Optional[str] = None, time: Optional[str] = None) -> Tuple[str, str]:
    """Sent only when a team member confirms the booking from the admin
    dashboard — this is the one email that's allowed to say "confirmed"."""
    subject = "Your booking is confirmed — Lush Makeovers"
    rows = [("Service", service)]
    if date:
        rows.append(("Date", date))
    if time:
        rows.append(("Time", time))
    body = f"""
    <p>Hi {customer},</p>
    <p>Good news — our team has reviewed and <strong>confirmed</strong> your booking.</p>
    {_detail_rows(rows)}
    <p>If anything changes or you have questions before your appointment, just reply to this email or reach us on WhatsApp.</p>
    """
    return subject, _shell("Booking Confirmed", "You're all set", body, script_line="we can't wait to style you")


def team_welcome(name: str, email: str, password: str, role: str, login_url: str) -> Tuple[str, str]:
    subject = "Welcome to the Lush Makeovers team"
    role_label = role.replace("_", " ").title()
    body = f"""
    <p>Hi {name},</p>
    <p>You now have an account on the Lush Makeovers admin dashboard as <strong>{role_label}</strong>. Sign-in details:</p>
    {_detail_rows([("Email", email), ("Temp. Password", password)])}
    <p style="font-size: 13px; color:{MUTED_LIGHT} !important;">For security, please sign in and set your own password right away (More &rarr; Change Password).</p>
    {_button("Sign In", login_url)}
    """
    return subject, _shell("Welcome", f"Welcome, {name}", body)
