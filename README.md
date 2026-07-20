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
    email_service.py        ← sends transactional email via Resend
    email_templates.py      ← the branded HTML each email type is built from
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
| `CONTENT_DEFAULTS_PATH` | Path to `defaults.json` if the frontend folder isn't next to the backend | auto |
| `CORS_ORIGINS` | Comma-separated allowed origins | `*` |
| `FRONTEND_URL` | Public site URL, used to build links inside emails | `http://localhost:3000` |
| `RESEND_API_KEY` | From resend.com — without it, password-reset emails aren't sent (the token is returned in the API response instead, dev only) | empty |
| `RESEND_FROM_EMAIL` | Sender address; must be on a domain verified in Resend | Resend's shared test address |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | From cloudinary.com — required for the admin Media Library to accept uploads | empty |

Frontend (Vercel project settings or `frontend/.env`):

| Variable | Purpose | Default |
|---|---|---|
| `REACT_APP_API_URL` | Backend URL the site and admin talk to | `http://localhost:8000` |

## Going live (required before the owner can edit the real site)

The Vercel deployment is **static frontend only**. Until the backend is hosted
somewhere, edits made in the admin exist only on the machine running the
backend — the live site keeps showing the defaults, and `/admin/login` will
fail with "can't reach the server" for anyone who isn't running the backend
on their own machine. Three steps, in order:

### 1. MongoDB Atlas (free tier)

1. Create an account at mongodb.com/cloud/atlas and create a free **M0**
   cluster (any region close to your users, e.g. Mumbai).
2. **Database Access** → add a database user (username + strong password).
3. **Network Access** → add `0.0.0.0/0` (allow access from anywhere — Render's
   IPs aren't static on the free plan).
4. **Connect** → "Drivers" → copy the connection string, it looks like
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/`. This is your
   `MONGO_URL` (paste your real password in, URL-encoded if it has special
   characters).

### 2. Backend on Render, via the included Blueprint

This repo has a `render.yaml` at the root, so Render can configure the whole
service for you instead of clicking through the dashboard by hand:

1. Push this repo to GitHub (if it isn't already).
2. In Render: **New** → **Blueprint** → pick this repo. Render reads
   `render.yaml` and proposes one web service, `lush-makeovers-api`.
3. It will prompt you for the env vars marked `sync: false`:
   - `MONGO_URL` — the Atlas connection string from step 1.
   - `SEED_ADMIN_EMAIL` — the email the owner logs in with.
   - `SEED_ADMIN_PASSWORD` — a strong password (not the dev default).
   - `CORS_ORIGINS` — leave blank for now; come back and set it to your
     Vercel URL once you have it (step 3), e.g.
     `https://lushmakeovers.vercel.app`, then redeploy.
   - `FRONTEND_URL` — same Vercel URL, used to build links inside emails.
   - `RESEND_API_KEY` — from resend.com, needed for password-reset emails.
   - `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`
     — from cloudinary.com, needed for the admin Media Library to accept
     photo uploads.
   - `JWT_SECRET` is auto-generated by Render — don't reuse the local dev
     value.
4. Deploy. Render builds and gives you a URL like
   `https://lush-makeovers-api.onrender.com`.

Note: the free Render plan spins the service down after inactivity, so the
first request after a quiet period takes a few extra seconds to wake up —
normal, not a bug.

### 3. Frontend on Vercel

1. Import this repo in Vercel. It already has a root `vercel.json` that
   builds the `frontend` workspace and serves the SPA correctly (client-side
   routes like `/academy` won't 404 on refresh).
2. In the Vercel project's **Environment Variables**, set
   `REACT_APP_API_URL` to your Render URL from step 2, then redeploy.
3. Go back to Render and set `CORS_ORIGINS` to this Vercel URL (comma-separate
   if you later add a custom domain too), then let it redeploy.

Login at `https://<your-vercel-app>/admin/login` with the email/password you
set in step 2.

Photo uploads in the admin Media Library go straight to Cloudinary, so they
survive redeploys even on Render's free plan (its own disk is wiped on every
deploy, but nothing is ever written there).

## Editing content defaults (developers)

Change `frontend/src/content/defaults.json` only. The backend inserts any
missing key into the database on startup and never overwrites edited content.
To make a new key editable in the admin, add a section for it in
`frontend/src/admin/schema.js`.
