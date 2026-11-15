import "reflect-metadata";
import { container } from "tsyringe";
import { TOKENS } from "../../Application/Interfaces/tokens.js";
import type { IUrlRepository } from "../../Application/Interfaces/IUrlRepository.js";
import type { IUrlCache } from "../../Application/Interfaces/IUrlCache.js";
import { PrismaUrlRepository } from "../Database/Prisma/PrismaUrlRepository.js";
import { RedisUrlCache } from "../Cache/RedisUrlCache.js";

container.register<IUrlRepository>(TOKENS.UrlRepository, { useClass: PrismaUrlRepository });
container.register<IUrlCache>(TOKENS.UrlCache, { useClass: RedisUrlCache });
export { container };
