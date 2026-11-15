# URL Shortener

A full-stack URL shortener built as a technical challenge. It provides a React Router web app for creating and managing short links, with an Express API backed by PostgreSQL and Redis.

## Features

- Create short links with unique Base62 codes
- Redirect visitors to original URLs and track clicks
- View a dashboard of links and click statistics
- Delete links and invalidate their cached redirect entries
- Run the frontend, API, database, and cache together with Docker Compose

## Workspace

```text
frontend/    React Router v7 app
backend/     Express and TypeScript API
prisma/      PostgreSQL schema and migrations
documents/   Setup, architecture, and application-flow documentation
```

## Run the project

To start all services with Docker Compose:

```bash
cp .env.example .env
docker compose up --build
```

Then open `http://localhost:3000`. For local development or environment variable details, see the [local setup guide](documents/LOCAL_SETUP.md).

## Documentation

- [Local environment and setup](documents/LOCAL_SETUP.md)
- [Architecture and API routes](documents/ARCHITECTURE.md)
- [Create, dashboard, redirect, and delete flows](documents/FLOWS.md)
- [Frontend structure](frontend/README.md)
