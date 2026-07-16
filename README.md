# Lush Makeovers — Website + CMS

A bridal hair & makeup studio website (React + Tailwind) with a simple,
mobile-first admin CMS (FastAPI + MongoDB) built for a non-technical owner.

## How it fits together

- **`frontend/src/content/defaults.json`** — the single source of truth for
  default site content. The public site falls back to it when the backend is
  unreachable, and the backend seeds the database from the same file.
- **Public site** — loads live content once at startup from
  `GET /api/public/bootstrap`; if that fails (or times out after 4s), the site
  still renders fully from `defaults.json`.
- **Admin CMS** (`frontend/src/admin/`) — at `/admin`. Organised the way the
  owner sees her site: pick a page → pick a section → edit → Save. Bottom tab
  bar on phones, sidebar on laptops. Photos are tap-to-upload (camera / photo
  library on mobile). The editor schema lives in `frontend/src/admin/schema.js`.
- **Backend** (`backend/app/`) — FastAPI + MongoDB (falls back to an
  in-memory database when MongoDB isn't running — fine for development, but
  **data resets on every restart** in that mode).

## Project structure

```
frontend/
  src/
    content/defaults.json   ← ALL default site content lives here
    components/             ← public website sections/pages
    admin/                  ← the CMS (schema.js, AdminShell, pages/, fields/, hooks/)
    auth/  cms/  lib/       ← auth context, bootstrap loader, API client
backend/
  app/
    main.py                 ← app factory (CORS, routers, startup seeding)
    config.py               ← all environment variables
    database.py             ← MongoDB client + in-memory fallback
    models.py  security.py  ← request models, passwords/JWT/auth dependency
    content.py  utils.py    ← defaults loading + seeding, small helpers
    routers/                ← public, auth, cms, media, admin, client endpoints
  .env.example              ← copy to .env and adjust
```

## Run locally (Windows)

Terminal 1 — backend:

```powershell
cd backend
.venv\Scripts\uvicorn app.main:app --reload --port 8000
# (first time: python -m venv .venv ; .venv\Scripts\pip install -r requirements.txt)
```

Terminal 2 — frontend (an npm workspace — always install from the repo root):

```powershell
npm install    # first time only, from the repo root
npm start
```

If `npm install` skips dev tools (craco missing), your shell has
`NODE_ENV=production` set — run `npm install --include=dev` instead.

Site: http://localhost:3000 · Admin: http://localhost:3000/admin
Dev login: `admin@lushmakeovers.in` / `Admin@12345`. The owner can change her
password anytime in the admin under **More → Change Password**.

## Environment variables

Copy `backend/.env.example` → `backend/.env` and
`frontend/.env.example` → `frontend/.env`, then adjust.

Backend (`backend/.env`):

| Variable | Purpose | Default |
|---|---|---|
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017` |
| `DB_NAME` | Database name | `lush_makeovers` |
| `JWT_SECRET` | Token signing secret — **must be changed in production** | dev value |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | First admin account created on an empty database | dev values |
| `PUBLIC_API_URL` | Public base URL of the API (e.g. `https://api.example.com`); used to make uploaded photo URLs absolute | empty (relative) |
| `CONTENT_DEFAULTS_PATH` | Path to `defaults.json` if the frontend folder isn't next to the backend | auto |
| `CORS_ORIGINS` | Comma-separated allowed origins | `*` |
| `UPLOAD_DIR` | Where uploaded photos are stored | `backend/uploads` |

Frontend (Vercel project settings or `frontend/.env`):

| Variable | Purpose | Default |
|---|---|---|
| `REACT_APP_API_URL` | Backend URL the site and admin talk to | `http://localhost:8000` |

## Going live (required before the owner can edit the real site)

The Vercel deployment is **static frontend only**. Until the backend is hosted
somewhere, edits made in the admin exist only on the machine running the
backend — the live site keeps showing the defaults. To go live:

1. **MongoDB Atlas** (free tier): create a cluster, get the connection string
   → `MONGO_URL`.
2. **Host the backend** (Render / Railway): deploy this repo, start command
   `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT` (or set root to
   `backend/` and set `CONTENT_DEFAULTS_PATH` to a copy of `defaults.json`).
   Set `MONGO_URL`, `JWT_SECRET`, `SEED_ADMIN_PASSWORD`, `PUBLIC_API_URL`
   (the service's own URL), `CORS_ORIGINS` (the Vercel site URL).
3. **Point the frontend at it**: in Vercel, set `REACT_APP_API_URL` to the
   backend URL and redeploy.

Known limitation: on hosts with ephemeral disks (Render free tier), uploaded
photos disappear on redeploy — use a persistent disk or move uploads to S3 /
Cloudinary later. Photos referenced by URL (Pexels/Unsplash) are unaffected.

## Editing content defaults (developers)

Change `frontend/src/content/defaults.json` only. The backend inserts any
missing key into the database on startup and never overwrites edited content.
To make a new key editable in the admin, add a section for it in
`frontend/src/admin/schema.js`.
