# Desi Dutch - Vercel Free Tier & Turso (LibSQL) Migration Guide

## 1. Migration Overview

The `desi-dutch` application has been migrated from `dd2` to support cloud persistence on **Vercel Free Tier** using **Turso (LibSQL)**.

### Key Architectural Updates

1. **Complete Structure Migration**:
   - Modern Next.js 16.4.0 (Turbopack) + React 19.3.0 + Tailwind CSS v4 stack.
   - Fully unified frontend (`/`, `/admin`, `/admin/login`) and backend APIs (`/api/dishes`, `/api/dishes/[id]`, `/api/config`, `/api/auth/*`).
   - All components, context providers, services, tests, and configuration assets copied cleanly.
   - `C:\repos\dd2` remains 100% untouched and clean.

2. **Turso LibSQL Cloud Persistence**:
   - Added `@libsql/client` (v0.18.0) to dependencies.
   - Created `src/db/turso.ts` providing:
     - `getTursoClient()`: Initializes client using `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`.
     - `initTursoSchema(client)`: Creates `dishes` table and optimal indexes (`idx_dishes_name`, `idx_dishes_daily_special`, `idx_dishes_is_available`, `idx_dishes_category`, `idx_dishes_coming_soon`).
     - `seedTursoIfEmpty(client)`: Automatically populates catalog dishes via atomic batch write if database is empty.
     - `TursoDishRepository implements IDishRepository`: Implements asynchronous CRUD (`findAll`, `findById`, `create`, `update`, `delete`, `count`).

3. **Controlled Fallback Logic**:
   - In `src/services/dish.service.ts`, `createDefaultRepository()` defaults to `TursoDishRepository` when `TURSO_DATABASE_URL` is set.
   - If `TURSO_DATABASE_URL` is missing:
     - Controlled by the environment flag `ENABLE_LOCAL_SQLITE_FALLBACK` (defaults to `false`).
     - When `false`, throws a clear descriptive error alerting the developer or administrator that Turso credentials are required.
     - When `true` (e.g. for offline local development and test runs), cleanly falls back to `SqliteDishRepository`.

4. **Database Seeding (`src/db/seed.ts`)**:
   - Supports both local SQLite and remote Turso database seeding.
   - If `TURSO_DATABASE_URL` is present, `npm run seed` connects to Turso and seeds all catalog dishes.
   - Otherwise, seeds local SQLite `data.db`.

5. **Test Suite & Mutation Authorization (`tests/e2e-api.test.ts`)**:
   - Added signed admin HMAC session tokens (`createSessionToken('admin')`) in Authorization headers for mutation tests (`POST /api/dishes`, `PUT /api/dishes/[id]`, `DELETE /api/dishes/[id]`).
   - Full test suite passed (57/57 tests passing).
   - Production Next.js build succeeded with all static and dynamic routes compiled.

---

## 2. Setting Up Turso (LibSQL Database)

Turso provides free serverless SQLite databases ideal for Vercel Free Tier deployments.

### Step 1: Install Turso CLI or Use Web Console

Install Turso CLI (Mac/Linux/WSL/Windows):
```powershell
# Windows PowerShell
irm https://get.tur.so/install.ps1 | iex
```
Or sign up directly via the web dashboard at [https://turso.tech](https://turso.tech).

### Step 2: Create a Turso Database

Log in and create your database:
```bash
turso auth login
turso db create desi-dutch
```

### Step 3: Retrieve Database URL and Auth Token

Retrieve the database connection URL:
```bash
turso db show --url desi-dutch
# Output example: libsql://desi-dutch-[your-org].turso.io
```

Generate an authentication token:
```bash
turso db tokens create desi-dutch
# Output: [long JWT token string]
```

### Step 4: Seed the Turso Database

You can pre-seed the database using the seed script:
```bash
TURSO_DATABASE_URL="libsql://desi-dutch-[your-org].turso.io" TURSO_AUTH_TOKEN="your-turso-auth-token" npm run seed
```
*(Note: If you skip manual seeding, `seedTursoIfEmpty` will automatically bootstrap the catalog upon the first API request!)*

---

## 3. Deploying to Vercel (Free Tier)

### Step 1: Push Repository to GitHub

Ensure your local branch is committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "feat: migrate to Turso LibSQL persistence for Vercel Free Tier"
git push origin main
```

### Step 2: Import Project on Vercel

1. Log into [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Select your GitHub repository (`desi-dutch`).
4. Framework Preset will automatically detect **Next.js**.

### Step 3: Configure Environment Variables

Under **Environment Variables**, add the following required variables:

| Variable Name | Value / Description | Required? |
|---|---|---|
| `TURSO_DATABASE_URL` | `libsql://desi-dutch-[your-org].turso.io` | **Yes** |
| `TURSO_AUTH_TOKEN` | Your Turso database token | **Yes** |
| `ADMIN_USERNAME` | `admin` (or custom admin username) | **Yes** |
| `ADMIN_PASSWORD_HASH` | SHA-256 hash of admin password (e.g. `5b0885b3479975349c10e21359d69a34187a281e38d1b35300257db059093f5d` for default) | **Yes** |
| `SESSION_SECRET` | A secure random 32+ char string | **Yes** |
| `ENABLE_LOCAL_SQLITE_FALLBACK` | `"false"` | Recommended (ensures no silent fallback in serverless) |

### Step 4: Deploy

Click **Deploy**.
Vercel will run `next build` and deploy serverless functions globally across their edge network.

---

## 4. Local Development

### Option A: Local Offline Development (Default SQLite)
In `.env.local`:
```env
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="5b0885b3479975349c10e21359d69a34187a281e38d1b35300257db059093f5d"
SESSION_SECRET="desi-dutch-secret-key-amsterdam-delhi-2026"
ENABLE_LOCAL_SQLITE_FALLBACK="true"
```
Run `npm run dev`. Dishes will be stored in local `data.db`.

### Option B: Local Development with Turso Cloud
In `.env.local`:
```env
TURSO_DATABASE_URL="libsql://desi-dutch-[your-org].turso.io"
TURSO_AUTH_TOKEN="your-turso-auth-token"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="5b0885b3479975349c10e21359d69a34187a281e38d1b35300257db059093f5d"
SESSION_SECRET="desi-dutch-secret-key-amsterdam-delhi-2026"
ENABLE_LOCAL_SQLITE_FALLBACK="false"
```
Run `npm run dev`. Dishes will be queried directly from Turso.

---

## 5. Verification Checklist

- [x] Structure and code migrated from `dd2` to `desi-dutch`
- [x] `dd2` remains untouched and git working tree is clean
- [x] `@libsql/client` added to dependencies
- [x] `src/db/turso.ts` created with client, schema init, auto-seeding, and `TursoDishRepository`
- [x] Fallback controlled via `ENABLE_LOCAL_SQLITE_FALLBACK` (defaults to false, throws descriptive error if credentials missing)
- [x] `src/db/seed.ts` supports Turso cloud seeding
- [x] `.env.example` documents all Turso and Auth credentials
- [x] `tests/e2e-api.test.ts` includes admin Authorization headers
- [x] All 57 unit, integration, and E2E tests pass (`npm test`)
- [x] Next.js production build succeeds (`npm run build`)
