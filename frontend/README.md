# Frontend

React Router v7 frontend for the URL shortener. Install dependencies and run the full application from the workspace root; see the root README for Docker Compose and local development instructions.

## App structure

- `app/api` contains backend requests and frontend API contracts. `urlApi.server.ts` is server-only and is used by route loaders/actions.
- `app/pages` contains screen-level page components.
- `app/features/home` groups the home screen's form, layout, and form helper.
- `app/features/urls-page` groups dashboard components, layout, and summary helper.
- `app/components` contains generic components shared across pages.
- `app/helpers` contains generic frontend helpers.
- `app/routes/<page>/route.tsx` contains the React Router route module for that page. Its `loader` and `action` exports coordinate page data and form submissions.
- `app/routes/<page>/actions` contains page-specific action handlers. The route action dispatches to a handler using the form's `_intent` value; these are handlers, not separate URLs.
- `app/routes/<page>/loaders` contains page-specific loader implementations delegated to by the route module.
