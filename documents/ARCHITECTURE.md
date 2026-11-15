# Architecture

## Workspace

```text
frontend/   React Router v7 application and browser-facing UI
backend/    Express API using Clean Architecture boundaries
prisma/     PostgreSQL data model and versioned migrations
```

The frontend talks to the backend through server-side React Router loaders and actions. The browser does not import the server-only API client.

## Frontend boundaries

```text
app/
├── api/                 Backend HTTP client and frontend API contracts
├── components/          Shared UI components
├── features/            Page-related UI, helpers, and layouts
├── helpers/             App-wide pure helpers
├── pages/               Screen composition
└── routes/              React Router route modules
```

Each page route module exports the relevant React Router `loader` and/or `action`. Route actions dispatch on a validated `_intent` to page-specific handlers under that page's `actions/` folder. Those handlers validate form data and call `app/api/urlApi.server.ts`. The `urls` page loader returns its URL-list promise so `UrlsPage` can render its own `<Suspense>` loading state while the data resolves.

## Backend boundaries

```text
backend/src/
├── Api/             Express controllers, routes, request/response contracts
├── Application/     Use cases, input/result contracts, repository/cache ports
├── Domain/          URL entity, value objects, short-code generation
└── Infrastructure/  Prisma/PostgreSQL, Redis, tsyringe registrations
```

The dependency direction points inward: API controllers call application use cases; use cases depend on application interfaces and domain behavior; infrastructure implements the repository and cache interfaces. Prisma models and Redis clients stay in Infrastructure. Controllers map HTTP contracts to application inputs and application results back to HTTP responses.

## Persistence, short codes, and cache

- PostgreSQL persists `Url` records, including `shortCode` and `clickCount`.
- Short codes are random seven-character Base62 strings and are protected by a database unique constraint. Create retries a collision up to five times.
- Redis uses Cache-Aside for redirect destinations with a one-hour TTL.
- PostgreSQL remains the source of truth for URL records and click statistics. Each redirect increments the stored click count, including cache hits.
- Delete removes the database record and then invalidates the corresponding Redis key.

## Main routes

| Route | Responsibility |
| --- | --- |
| `POST /api/urls` | Create a short URL |
| `GET /api/urls` | List URLs and click statistics |
| `DELETE /api/urls/:id` | Delete a URL and invalidate its cache entry |
| `GET /api/:shortCode` | Resolve and redirect, tracking a click |
| `GET /go/:shortCode` | Public React Router route that forwards the visitor to the backend redirect |
