export interface UrlStatisticsResponse {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clickCount: number;
  createdAt: string;
}

export type GetUrlStatisticsResponse = UrlStatisticsResponse[];
