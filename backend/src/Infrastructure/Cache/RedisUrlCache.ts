import { injectable } from "tsyringe";
import type { CachedUrlDestination, IUrlCache } from "../../Application/Interfaces/IUrlCache.js";
import { redis } from "./redisClient.js";

@injectable()
export class RedisUrlCache implements IUrlCache {
  async get(code: string): Promise<CachedUrlDestination | null> {
    const value = await redis.get(`url:${code}`);
    return value === null ? null : JSON.parse(value) as CachedUrlDestination;
  }
  async set(code: string, destination: CachedUrlDestination, ttlSeconds: number): Promise<void> {
    await redis.set(`url:${code}`, JSON.stringify(destination), { EX: ttlSeconds });
  }
  async delete(code: string): Promise<void> { await redis.del(`url:${code}`); }
}
