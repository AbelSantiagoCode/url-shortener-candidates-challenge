# Local Environment Setup

This guide covers running the frontend and backend on the host while PostgreSQL and Redis run in Docker. For a fully containerized setup, see the Docker Compose section in the root README.

## Prerequisites

- Node.js 22 or later
- pnpm 10.20.0 (the repository's `packageManager` version; Corepack can provide it)
- Docker Desktop or another Docker Engine with Compose

## Configure the environment

From the repository root, copy the sample environment file:

```bash
cp .env.example .env
```

`.env.example` is the shareable template. `.env` is your local configuration and is ignored by Git. The sample values match the Compose defaults:

| Variable | Local development value | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | `postgresql://postgres:change-me@localhost:5433/urlshortener?schema=public` | PostgreSQL connection used by the backend and Prisma CLI |
| `REDIS_URL` | `redis://localhost:6380` | Redis connection used by the backend |
| `POSTGRES_USER` | `postgres` | Compose PostgreSQL user |
| `POSTGRES_PASSWORD` | `change-me` | Compose PostgreSQL password; keep it consistent with `DATABASE_URL` |
| `POSTGRES_DB` | `urlshortener` | Compose database name |
| `POSTGRES_PORT` | `5433` | PostgreSQL host port; the container listens on `5432` |
| `REDIS_PORT` | `6380` | Redis host port; the container listens on `6379` |
| `API_PORT` | `4000` | Backend host port |
| `WEB_PORT` | `3000` | Compose frontend host port |
| `PUBLIC_URL` | `http://localhost:5173/go` | Base URL used in short links when running the frontend with Vite |

Inside Compose, the backend uses service DNS names `database:5432` and `redis:6379`; Compose overrides the host connection URLs for the API container. The Compose short-link base is `http://localhost:${WEB_PORT}/go`.

## Run locally

1. Start PostgreSQL and Redis:

   ```bash
   docker compose up -d database redis
   ```

2. Install workspace dependencies and generate Prisma Client:

   ```bash
   pnpm install
   pnpm db:generate
   ```

3. Apply the checked-in migration:

   ```bash
   pnpm db:migrate
   ```

4. Start the frontend and backend:

   ```bash
   pnpm dev
   ```

Open the frontend at `http://localhost:5173`. The backend health endpoint is `http://localhost:4000/health`.

When finished, stop the database and cache containers with `docker compose down`. This keeps the named data volumes intact.

## Run everything with Compose

For a containerized setup, run:

```bash
docker compose up --build
```

Compose builds the workspace, generates Prisma Client in the image build, starts PostgreSQL and Redis, waits for their health checks, then runs `prisma migrate deploy` before starting the backend. The frontend starts after the backend is healthy. Open `http://localhost:3000`.
