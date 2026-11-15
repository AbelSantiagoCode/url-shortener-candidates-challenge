FROM node:22-alpine AS build
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
RUN pnpm install --frozen-lockfile
COPY . .
ENV DATABASE_URL=postgresql://postgres:change-me@localhost:5432/urlshortener
RUN pnpm build

FROM node:22-alpine AS runtime
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000 4000
CMD ["pnpm", "--filter", "@url-shortener/frontend", "start"]
