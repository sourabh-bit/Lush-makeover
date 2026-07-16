"""Lush Makeovers CMS API.

Application factory: wires up CORS, the route modules and startup seeding.
Run with: uvicorn app.main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import CORS_ORIGINS
from .content import seed_documents
from .database import ensure_indexes, mongo_client, ping, use_memory_database
from .routers import admin, auth, client, cms, media, public

app = FastAPI(title="Lush Makeovers CMS", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public.router)
app.include_router(auth.router)
app.include_router(cms.router)
app.include_router(media.router)
app.include_router(admin.router)
app.include_router(client.router)


@app.on_event("startup")
async def startup() -> None:
    try:
        await ping()
    except Exception:
        # MongoDB not reachable: fall back to the in-memory database so
        # development still works. Data resets on restart in this mode.
        use_memory_database()
    await ensure_indexes()
    await seed_documents()


@app.on_event("shutdown")
async def shutdown() -> None:
    mongo_client.close()
