import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../../../Errors/NotFoundError.js";
import { TOKENS } from "../../../Interfaces/tokens.js";
import type { IUrlRepository } from "../../../Interfaces/IUrlRepository.js";
import type { IUrlCache } from "../../../Interfaces/IUrlCache.js";
import type { DeleteUrlInput } from "./DeleteUrlInput.js";
import type { DeleteUrlResult } from "./DeleteUrlResult.js";
import { DomainError } from "../../../../Domain/Errors/DomainError.js";

@injectable()
export class DeleteUrlUseCase {
  constructor(
    @inject(TOKENS.UrlRepository) private readonly repository: IUrlRepository,
    @inject(TOKENS.UrlCache) private readonly cache: IUrlCache,
  ) {}

  async execute(input: DeleteUrlInput): Promise<DeleteUrlResult> {
    if (!/^[1-9]\d*$/.test(input.id)) throw new DomainError("URL ID must be a positive integer.");
    const id = BigInt(input.id);
    const url = await this.repository.findById(id);
    if (!url) throw new NotFoundError();

    await this.repository.delete(id);
    try {
      await this.cache.delete(url.shortCode.value);
    } catch (error) {
      console.error("Redis cache invalidation failed:", error);
    }
    return { deleted: true };
  }
}
