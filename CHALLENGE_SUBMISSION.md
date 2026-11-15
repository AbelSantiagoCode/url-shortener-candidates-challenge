# Submission

## What I Did

I refactored the starter into a pnpm workspace with a React Router v7 frontend and a separate Express/TypeScript backend. The frontend has a URL creation page and a dashboard for viewing links and click statistics. Its route modules handle page data and dispatch form submissions by intent to page-specific action handlers. The UI is organized into pages, shared components, and page-focused features.

The backend follows Clean Architecture boundaries: HTTP request/response contracts live in the API layer; use cases have application input/result contracts; and domain entities and rules stay behind those boundaries. Prisma with PostgreSQL persists URLs, Base62 short codes, and click counts. Redis provides a one-hour Cache-Aside lookup for redirects, and deleting a URL invalidates its cache entry. URL validation and short-code uniqueness checks are also handled by the backend.

I added Docker Compose services for the frontend, backend, PostgreSQL, and Redis. Prisma Client is generated during the image build, and the backend applies committed migrations before it starts. I also documented local setup, architecture, and the main request flows in the `documents/` folder.

I verified the frontend and backend builds and TypeScript checks, validated the Prisma schema and Compose configuration, and built the Docker images. I did not add automated tests during this iteration.

## What I Would Do With More Time

- **Add idempotency for URL creation.** An idempotency key would let a client safely retry a request after a timeout without accidentally creating multiple short links.
- **Support user-defined short codes and accounts.** Users could choose custom aliases and manage their own links. This would require authentication, ownership checks, alias validation, and handling collisions with reserved routes.
- **Add expiration support and a cleanup worker.** Links could have an expiration date; a scheduled worker could remove expired records and their Redis entries, and redirects could return a clear expired-link response.
- **Move click aggregation to an asynchronous event flow.** Redirects could record click events through a transactional outbox, then a background worker could process them and update statistics. The outbox would help avoid losing events between the database transaction and event delivery.
- **Improve production observability.** Structured logs, metrics, and distributed tracing would help diagnose failures and understand API latency, redirect volume, cache hit rates, and database performance in production.
- **Add automated tests.** I would cover domain validation and Base62 generation with unit tests, use-case behavior with repository/cache doubles, persistence and Redis interactions with integration tests, and the main create/redirect/delete flows with end-to-end tests.
- **Add abuse protections.** Rate limits, request size limits, and safeguards against unsafe or abusive destinations would make the public service more resilient.

## AI Usage

I used AI first as a partner in the architecture and requirements work, before using it to generate or change code. I shared the challenge requirements and my preferred direction, then used the discussion to clarify responsibilities, compare architectural choices, and check that the proposed frontend, backend, persistence, caching, and click-tracking flows addressed the requirements.

I iterated on that design as I learned more and noticed gaps. For example, I refined the frontend organization around pages and features, made route actions dispatch by form intent, clarified the API/application contracts, and moved the dashboard loading state into the dashboard page. I used AI to understand unfamiliar React Router v7 Framework Mode behavior and to check how those decisions fit the framework.

Once the direction was clear, I used AI to help implement the refactor, work through build and type-check errors, and document the architecture and flows. I reviewed the suggestions against the requirements and changed the approach when the result did not match the intended structure or user experience.

Example prompts included:

- “Analyze the challenge requirements and propose a frontend/backend architecture that addresses them.”
- “Review this React Router route/action design against the page structure and explain what should own the loading state.”
- “Help iterate on the architecture so the route modules, application contracts, and backend use cases have clear responsibilities.”

## Feedback

The deliberately flawed starter made it easy to identify concrete improvements, particularly around short-code collisions, persistence, separation of concerns, and click tracking. Including PostgreSQL and Redis in the Docker Compose setup makes the runtime dependencies straightforward to start locally. The challenge also leaves room to prioritize architecture and user experience while documenting what remains for a production-ready service.
