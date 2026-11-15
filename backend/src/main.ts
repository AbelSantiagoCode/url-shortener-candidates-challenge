import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({ path: new URL("../../.env", import.meta.url) });
import express from "express";
import { urlRoutes } from "./Api/Routes/urlRoutes.js";
import { errorHandler } from "./Api/Middlewares/errorHandler.js";
import { redis } from "./Infrastructure/Cache/redisClient.js";
import { prisma } from "./Infrastructure/Database/Prisma/prismaClient.js";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", urlRoutes);
app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);
await redis.connect();
const server = app.listen(port, () => console.log(`Backend listening on port ${port}`));
const shutdown = () => server.close(() => { void Promise.all([prisma.$disconnect(), redis.quit()]); });
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
