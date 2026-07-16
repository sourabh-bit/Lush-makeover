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

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", str(ROOT_DIR / "uploads"))).resolve()
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Public base URL of this API (e.g. https://api.lushmakeovers.in). Used to build
# absolute URLs for uploaded media so they work from the statically hosted site.
PUBLIC_API_URL = os.getenv("PUBLIC_API_URL", "").rstrip("/")

# Single source of truth for default site content, shared with the frontend fallback.
CONTENT_DEFAULTS_PATH = Path(
    os.getenv("CONTENT_DEFAULTS_PATH", str(ROOT_DIR.parent / "frontend" / "src" / "content" / "defaults.json"))
).resolve()

CORS_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()]

SEED_ADMIN_EMAIL = os.getenv("SEED_ADMIN_EMAIL", "admin@lushmakeovers.in")
SEED_ADMIN_PASSWORD = os.getenv("SEED_ADMIN_PASSWORD", "Admin@12345")
SEED_CLIENT_EMAIL = os.getenv("SEED_CLIENT_EMAIL", "client@lushmakeovers.in")
SEED_CLIENT_PASSWORD = os.getenv("SEED_CLIENT_PASSWORD", "Client@12345")
