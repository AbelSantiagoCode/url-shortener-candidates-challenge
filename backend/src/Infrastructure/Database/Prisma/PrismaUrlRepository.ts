import { injectable } from "tsyringe";
import { Url } from "../../../Domain/Entities/Url.js";
import type { IUrlRepository } from "../../../Application/Interfaces/IUrlRepository.js";
import { prisma } from "./prismaClient.js";

@injectable()
export class PrismaUrlRepository implements IUrlRepository {
  async create(url: Url): Promise<Url> {
    const row = await prisma.url.create({ data: { originalUrl: url.originalUrl.value, shortCode: url.shortCode.value } });
    return this.map(row);
  }
  async findByShortCode(code: string): Promise<Url | null> {
    const row = await prisma.url.findUnique({ where: { shortCode: code } });
    return row ? this.map(row) : null;
  }
  async findById(id: bigint): Promise<Url | null> {
    const row = await prisma.url.findUnique({ where: { id } });
    return row ? this.map(row) : null;
  }
  async list(): Promise<Url[]> {
    const rows = await prisma.url.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((row) => this.map(row));
  }
  async incrementClicks(id: bigint): Promise<void> {
    await prisma.url.update({ where: { id }, data: { clickCount: { increment: 1 } } });
  }
  async delete(id: bigint): Promise<void> { await prisma.url.delete({ where: { id } }); }
  private map(row: { id: bigint; originalUrl: string; shortCode: string; clickCount: number; createdAt: Date }): Url {
    return Url.create({ id: row.id, originalUrl: row.originalUrl, shortCode: row.shortCode, clickCount: row.clickCount, createdAt: row.createdAt });
  }
}
