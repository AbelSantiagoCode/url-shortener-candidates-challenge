import type { Url } from "../../Domain/Entities/Url.js";

export interface IUrlRepository {
  create(url: Url): Promise<Url>;
  findByShortCode(code: string): Promise<Url | null>;
  findById(id: bigint): Promise<Url | null>;
  list(): Promise<Url[]>;
  incrementClicks(id: bigint): Promise<void>;
  delete(id: bigint): Promise<void>;
}
