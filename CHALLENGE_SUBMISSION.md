# Submission

## What I Did

Refactored the starter into a React Router frontend and an Express/TypeScript backend workspace. The backend uses Clean Architecture boundaries, Prisma/PostgreSQL persistence, Base62 short codes, Redis Cache-Aside for redirects, URL validation, persisted click statistics, and URL deletion with cache invalidation. The frontend now has a responsive create-link flow and a links dashboard with click counts and delete controls.

## What I Would Do With More Time

Add automated unit and integration tests, pagination and deletion, plus abuse controls such as rate limiting and destination safety checks.

## AI Usage

AI tools were used to help inspect the starter, plan the architecture, implement the refactor, and review build errors. Example prompt: “Refactor this URL shortener into a React Router frontend and a Clean Architecture Express backend with Prisma, PostgreSQL, Redis caching, and click statistics.”

## Feedback

The deliberately flawed starting point made the design improvements easy to demonstrate. A Docker Compose setup that includes the database and cache helps make the expected runtime dependencies clear.
