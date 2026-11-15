import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../Interfaces/tokens.js";
import type { IUrlRepository } from "../../../Interfaces/IUrlRepository.js";
import type { GetUrlStatisticsInput } from "./GetUrlStatisticsInput.js";
import type { GetUrlStatisticsResult } from "./GetUrlStatisticsResult.js";

@injectable()
export class GetUrlStatisticsUseCase {
  constructor(@inject(TOKENS.UrlRepository) private readonly repository: IUrlRepository) {}
  async execute(_input: GetUrlStatisticsInput): Promise<GetUrlStatisticsResult> {
    const urls = await this.repository.list();
    return urls.map((url) => ({ id: url.id!.toString(), originalUrl: url.originalUrl.value, shortCode: url.shortCode.value, clickCount: url.clickCount, createdAt: url.createdAt! }));
  }
}
