# URL Shortener

## Tech Stack

```
url-shortener/
├── frontend/            # React Router v7
├── backend/             # Express API, Clean Architecture
└── prisma/              # PostgreSQL schema and migrations
```

| Technology                                    | Description                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [pnpm](https://pnpm.io/)                      | Fast, disk-efficient package manager with built-in monorepo support via workspaces                |
| [Turbo](https://turbo.build/)                 | High-performance build system for monorepos. Runs tasks in parallel and caches results            |
| [React](https://react.dev/)                   | Library for building user interfaces with components                                              |
| [React Router v7](https://reactrouter.com/)   | Full-stack React framework. Handles routing, data loading (loaders), mutations (actions), and SSR |
| [TypeScript](https://www.typescriptlang.org/) | Typed superset of JavaScript for catching errors at compile time                                  |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-first CSS framework for rapid UI development                                              |
| [Vite](https://vite.dev/)                     | Fast build tool and dev server with hot module replacement                                        |

## Local Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open `http://localhost:5173` (frontend) and `http://localhost:4000/health` (API health).

## Docker Setup

```bash
docker compose up --build
```

Open `http://localhost:3000`. Compose starts the frontend, backend, PostgreSQL, and Redis. The backend applies committed Prisma migrations during container startup.

## Architecture and API

The backend follows `Api → Application → Domain`, with Prisma/PostgreSQL and Redis adapters in `Infrastructure`. The React Router frontend calls the backend through server-side loaders/actions. Redis caches redirect destinations for one hour; redirect requests still increment the PostgreSQL click counter, and the links page reads statistics from PostgreSQL.

The original `libs/engine` starter files are still present as a legacy reference, but they are no longer included in the workspace or used by the application.

- `POST /api/urls` with `{ "originalUrl": "https://example.com" }` creates a short URL.
- `GET /api/urls` lists links and click counts.
- `GET /api/:shortCode` redirects and increments click statistics.
- `DELETE /api/urls/:id` deletes a link and invalidates its Redis entry.

For local development, copy `.env.example` to `.env`, run `docker compose up -d database redis`, then run `pnpm install`, `pnpm db:generate`, `pnpm db:migrate` once, and `pnpm dev`. The checked-in initial migration is applied by that command. For normal Compose startup, it is applied automatically before the API starts.
