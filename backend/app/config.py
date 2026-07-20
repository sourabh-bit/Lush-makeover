"""Environment configuration for the Lush Makeovers API."""
import os
from pathlib import Path

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[1]
load_dotenv(ROOT_DIR / ".env")

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "lush_makeovers")

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
REFRESH_TOKEN_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "30"))
RESET_TOKEN_MINUTES = int(os.getenv("RESET_TOKEN_EXPIRE_MINUTES", "30"))

# Single source of truth for default site content, shared with the frontend fallback.
CONTENT_DEFAULTS_PATH = Path(
    os.getenv("CONTENT_DEFAULTS_PATH", str(ROOT_DIR.parent / "frontend" / "src" / "content" / "defaults.json"))
).resolve()

CORS_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()]

SEED_ADMIN_EMAIL = os.getenv("SEED_ADMIN_EMAIL", "admin@lushmakeovers.in")
SEED_ADMIN_PASSWORD = os.getenv("SEED_ADMIN_PASSWORD", "Admin@12345")
SEED_CLIENT_EMAIL = os.getenv("SEED_CLIENT_EMAIL", "client@lushmakeovers.in")
SEED_CLIENT_PASSWORD = os.getenv("SEED_CLIENT_PASSWORD", "Client@12345")

# --- Email (Resend) ---
# Without an API key, password-reset emails aren't sent — the API falls back
# to returning the reset token directly in the response, for local dev only.
RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
# Resend requires the sending address's domain to be verified in your Resend
# account. Until lushmakeovers.in is verified there, "onboarding@resend.dev"
# is Resend's own shared test domain and works out of the box.
RESEND_FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "Lush Makeovers <onboarding@resend.dev>")

# Base URL of the public site, used to build links inside emails
# (e.g. https://lushmakeovers.in or https://lushmakeovers.vercel.app).
# Set this explicitly once the frontend is deployed — the Render backend has
# no way to know the frontend's URL on its own.
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/")

# --- Media storage (Cloudinary) ---
# Uploaded photos go here instead of local disk, which is wiped on every
# redeploy on hosts like Render.
CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME", "")
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY", "")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET", "")
