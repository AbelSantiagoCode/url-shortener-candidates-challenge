import dotenv from "dotenv";
dotenv.config({ path: new URL("./.env", import.meta.url) });
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
});
