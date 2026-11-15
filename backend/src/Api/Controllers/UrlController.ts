import type { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import { CreateUrlUseCase } from "../../Application/UseCases/Urls/CreateUrl/CreateUrlUseCase.js";
import { RedirectUrlUseCase } from "../../Application/UseCases/Urls/RedirectUrl/RedirectUrlUseCase.js";
import { GetUrlStatisticsUseCase } from "../../Application/UseCases/Urls/GetUrlStatistics/GetUrlStatisticsUseCase.js";
import { DeleteUrlUseCase } from "../../Application/UseCases/Urls/DeleteUrl/DeleteUrlUseCase.js";
import type { CreateUrlInput } from "../../Application/UseCases/Urls/CreateUrl/CreateUrlInput.js";
import type { CreateUrlRequest } from "../Contracts/Urls/CreateUrlRequest.js";
import type { CreateUrlResponse } from "../Contracts/Urls/CreateUrlResponse.js";
import type { RedirectUrlRequest } from "../Contracts/Urls/RedirectUrlRequest.js";
import type { RedirectUrlResponse } from "../Contracts/Urls/RedirectUrlResponse.js";
import type { GetUrlStatisticsResponse } from "../Contracts/Urls/GetUrlStatisticsResponse.js";
import type { DeleteUrlRequest } from "../Contracts/Urls/DeleteUrlRequest.js";
import type { DeleteUrlResponse } from "../Contracts/Urls/DeleteUrlResponse.js";

@injectable()
export class UrlController {
  constructor(
    private readonly createUrl: CreateUrlUseCase,
    private readonly redirectUrl: RedirectUrlUseCase,
    private readonly getStatistics: GetUrlStatisticsUseCase,
    private readonly deleteUrl: DeleteUrlUseCase,
  ) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: unknown = req.body;
      const request = this.parseCreateRequest(body);
      if (!request) { res.status(400).json({ error: "originalUrl must be a string." }); return; }
      const input: CreateUrlInput = { originalUrl: request.originalUrl };
      const created = await this.createUrl.execute(input);
      const publicUrl = (process.env.PUBLIC_URL ?? "http://localhost:5173/go").replace(/\/$/, "");
      const response: CreateUrlResponse = {
        ...created,
        shortUrl: `${publicUrl}/${created.shortCode}`,
        createdAt: created.createdAt.toISOString(),
      };
      res.status(201).json(response);
    } catch (error) { next(error); }
  };
  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const publicUrl = (process.env.PUBLIC_URL ?? "http://localhost:5173/go").replace(/\/$/, "");
      const results = await this.getStatistics.execute({});
      const response: GetUrlStatisticsResponse = results.map((url) => ({
        ...url,
        shortUrl: `${publicUrl}/${url.shortCode}`,
        createdAt: url.createdAt.toISOString(),
      }));
      res.json(response);
    } catch (error) { next(error); }
  };
  redirect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: RedirectUrlRequest = { shortCode: String(req.params.code) };
      const result = await this.redirectUrl.execute(request);
      const response: RedirectUrlResponse = { location: result.destinationUrl };
      res.redirect(302, response.location);
    } catch (error) { next(error); }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: DeleteUrlRequest = { id: String(req.params.id) };
      if (!/^[1-9]\d*$/.test(request.id)) { res.status(400).json({ error: "id must be a positive integer." }); return; }
      const result = await this.deleteUrl.execute(request);
      const response: DeleteUrlResponse = { id: request.id, deleted: result.deleted };
      res.status(200).json(response);
    } catch (error) { next(error); }
  };

  private parseCreateRequest(body: unknown): CreateUrlRequest | null {
    if (typeof body !== "object" || body === null || !("originalUrl" in body)) return null;
    const originalUrl = (body as { originalUrl?: unknown }).originalUrl;
    return typeof originalUrl === "string" ? { originalUrl } : null;
  }
}
