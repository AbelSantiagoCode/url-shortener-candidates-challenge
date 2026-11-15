import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../../../Errors/NotFoundError.js";
import { TOKENS } from "../../../Interfaces/tokens.js";
import type { IUrlRepository } from "../../../Interfaces/IUrlRepository.js";
import type { IUrlCache } from "../../../Interfaces/IUrlCache.js";
import type { RedirectUrlInput } from "./RedirectUrlInput.js";
import type { RedirectUrlResult } from "./RedirectUrlResult.js";

@injectable()
export class RedirectUrlUseCase {
  constructor(@inject(TOKENS.UrlRepository) private readonly repository: IUrlRepository, @inject(TOKENS.UrlCache) private readonly cache: IUrlCache) {}
  async execute(input: RedirectUrlInput): Promise<RedirectUrlResult> {
    const { shortCode } = input;
    let cached: Awaited<ReturnType<IUrlCache["get"]>> = null;
    try { cached = await this.cache.get(shortCode); } catch (error) { console.error("Redis cache read failed:", error); }
    if (cached) {
      await this.repository.incrementClicks(BigInt(cached.id));
      return { destinationUrl: cached.originalUrl };
    }
    const url = await this.repository.findByShortCode(shortCode);
    if (!url) throw new NotFoundError();
    try { await this.cache.set(shortCode, { id: url.id!.toString(), originalUrl: url.originalUrl.value }, 3600); }
    catch (error) { console.error("Redis cache write failed:", error); }
    await this.repository.incrementClicks(url.id!);
    return { destinationUrl: url.originalUrl.value };
  }
}
