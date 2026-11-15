import { inject, injectable } from "tsyringe";
import { Url } from "../../../../Domain/Entities/Url.js";
import { OriginalUrl } from "../../../../Domain/ValueObjects/OriginalUrl.js";
import { TOKENS } from "../../../Interfaces/tokens.js";
import type { IUrlRepository } from "../../../Interfaces/IUrlRepository.js";
import type { IUrlCache } from "../../../Interfaces/IUrlCache.js";
import { ShortCodeGenerator } from "../../../../Domain/Services/ShortCodeGenerator.js";
import { DomainError } from "../../../../Domain/Errors/DomainError.js";
import type { CreateUrlInput } from "./CreateUrlInput.js";
import type { CreateUrlResult } from "./CreateUrlResult.js";

@injectable()
export class CreateUrlUseCase {
  constructor(
    @inject(TOKENS.UrlRepository) private readonly repository: IUrlRepository,
    @inject(TOKENS.UrlCache) private readonly cache: IUrlCache,
    private readonly codeGenerator: ShortCodeGenerator,
  ) {}
  async execute(input: CreateUrlInput): Promise<CreateUrlResult> {
    const validUrl = OriginalUrl.create(input.originalUrl).value;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      let url: Url;
      try {
        url = await this.repository.create(Url.create({ originalUrl: validUrl, shortCode: this.codeGenerator.generate() }));
      } catch (error) {
        if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") continue;
        throw error;
      }
      if (!url.id) throw new DomainError("URL repository did not return a persisted ID.");
      try { await this.cache.set(url.shortCode.value, { id: url.id.toString(), originalUrl: url.originalUrl.value }, 3600); }
      catch (error) { console.error("Redis cache write failed:", error); }
      return this.toResponse(url);
    }
    throw new DomainError("Could not generate a unique short code. Please retry.");
  }
  private toResponse(url: Url): CreateUrlResult {
    return { id: url.id!.toString(), originalUrl: url.originalUrl.value, shortCode: url.shortCode.value, clickCount: url.clickCount, createdAt: url.createdAt! };
  }
}
