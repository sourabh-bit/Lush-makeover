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
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0;">
      <tr>
        <td style="background:{INK}; border-radius: 2px;">
          <a href="{url}" style="display:inline-block; padding: 13px 30px; font-family:{BODY_FONT}; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #ffffff; text-decoration: none;">{label}</a>
        </td>
      </tr>
    </table>
    """


def _detail_rows(rows: List[Tuple[str, str]]) -> str:
    cells = "".join(
        f"""
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid {BORDER}; font-family:{BODY_FONT}; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color:{MUTED_LIGHT}; width: 130px; vertical-align: top;">{label}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid {BORDER}; font-family:{BODY_FONT}; font-size: 14px; color:{INK}; vertical-align: top;">{value}</td>
        </tr>
        """
        for label, value in rows
    )
    return f"""
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 22px 0; border-top: 1px solid {BORDER};">
      {cells}
    </table>
    """


def _shell(eyebrow: str, heading: str, body_html: str, script_line: Optional[str] = None) -> str:
    script_html = (
        f'<div style="font-family:{DISPLAY_FONT}; font-style: italic; font-size: 19px; color:{GOLD}; margin-top: 4px;">{script_line}</div>'
        if script_line
        else ""
    )
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{heading}</title>
  </head>
  <body style="margin:0; padding: 40px 16px; background-color:{CREAM}; font-family:{BODY_FONT};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid {BORDER};">
      <tr>
        <td style="padding: 40px 44px 32px; text-align: center; border-bottom: 1px solid {BORDER};">
          <div style="font-family:{DISPLAY_FONT}; font-size: 20px; letter-spacing: 0.32em; color:{INK};">LUSH MAKEOVERS</div>
          <div style="font-family:{BODY_FONT}; font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase; color:{MUTED}; margin-top: 6px;">Hair &amp; Makeup</div>
        </td>
      </tr>
      <tr>
        <td style="padding: 40px 44px 44px;">
          <div style="font-family:{BODY_FONT}; font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color:{MUTED_LIGHT}; text-align: center;">{eyebrow}</div>
          <h1 style="font-family:{DISPLAY_FONT}; font-weight: 400; font-size: 26px; color:{INK}; text-align: center; margin: 10px 0 0;">{heading}</h1>
          {f'<div style="text-align:center;">{script_html}</div>' if script_line else ""}
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 20px auto;">
            <tr>
              <td style="width: 44px; height: 1px; background-color:{GOLD_LINE};"></td>
              <td style="width: 6px; height: 6px; border-radius: 50%; background-color:{GOLD_LINE}; margin: 0 8px;"></td>
              <td style="width: 44px; height: 1px; background-color:{GOLD_LINE};"></td>
            </tr>
          </table>
          <div style="font-family:{BODY_FONT}; font-size: 15px; line-height: 1.7; color:{INK_SOFT};">
            {body_html}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 26px 44px; background-color:{CARD_BG}; border-top: 1px solid {BORDER}; text-align:center;">
          <div style="font-family:{BODY_FONT}; font-size: 12px; color:{MUTED}; line-height: 1.7;">
            Lush Makeovers &middot; 3rd Floor, Park Avenue, M.G. Road, Vijayawada 520010<br />
            hello@lushmakeovers.in
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>"""


def password_reset(reset_link: str) -> Tuple[str, str]:
    subject = "Reset your Lush Makeovers password"
    body = f"""
    <p>We received a request to reset the password for your admin account. Click the button below to choose a new one. This link expires in 30 minutes.</p>
    {_button("Reset Password", reset_link)}
    <p style="font-size: 13px; color:{MUTED_LIGHT};">If you didn't request this, you can safely ignore this email — your password will not be changed.</p>
    """
    return subject, _shell("Password Reset", "Reset your password", body)


def new_enquiry_notification(name: str, phone: Optional[str], email: Optional[str], category: str, message: str, admin_url: str) -> Tuple[str, str]:
    subject = f"New enquiry from {name}"
    rows = [("Name", name)]
    if phone:
        rows.append(("Phone", phone))
    if email:
        rows.append(("Email", email))
    rows.append(("Category", category.title()))
    body = f"""
    <p>You've received a new message through the website.</p>
    {_detail_rows(rows)}
    <div style="margin-top: 6px;">
      <div style="font-family:{BODY_FONT}; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color:{MUTED_LIGHT};">Message</div>
      <p style="margin-top: 8px; white-space: pre-wrap;">{message}</p>
    </div>
    {_button("View in Admin", admin_url)}
    """
    return subject, _shell("New Enquiry", "You have a new message", body)


def enquiry_confirmation(name: str) -> Tuple[str, str]:
    subject = "We've received your message — Lush Makeovers"
    body = f"""
    <p>Dear {name},</p>
    <p>Thank you for writing to us. Your message has reached our studio, and we personally respond to every enquiry within 24 hours — often much sooner.</p>
    <p>In the meantime, feel free to browse our portfolio or follow along on Instagram <a href="https://www.instagram.com/lush_makeovers/" style="color:{GOLD};">@lush_makeovers</a> for our latest work.</p>
    <p>With warmth,<br />The Lush Makeovers Studio</p>
    """
    return subject, _shell("Thank You", "We've received your message", body, script_line="we'll be in touch soon")


def booking_confirmation(customer: str, service: str, date: str, time: str) -> Tuple[str, str]:
    subject = "Your booking is confirmed — Lush Makeovers"
    body = f"""
    <p>Dear {customer},</p>
    <p>Thank you — your booking request has been received and is pending confirmation from our team.</p>
    {_detail_rows([("Service", service), ("Date", date), ("Time", time)])}
    <p>Our team will reach out shortly to confirm final details. If you have any questions in the meantime, simply reply to this email or reach us on WhatsApp.</p>
    """
    return subject, _shell("Booking Received", "Your booking request", body, script_line="we can't wait to style you")


def team_welcome(name: str, email: str, password: str, role: str, login_url: str) -> Tuple[str, str]:
    subject = "Welcome to the Lush Makeovers team"
    role_label = role.replace("_", " ").title()
    body = f"""
    <p>Hi {name},</p>
    <p>An account has been created for you on the Lush Makeovers admin dashboard as <strong>{role_label}</strong>. Here are your sign-in details:</p>
    {_detail_rows([("Email", email), ("Temporary Password", password)])}
    <p style="font-size: 13px; color:{MUTED_LIGHT};">For security, please sign in and change this password as soon as possible (More &rarr; Change Password).</p>
    {_button("Sign In", login_url)}
    """
    return subject, _shell("Welcome", f"Welcome, {name}", body)
