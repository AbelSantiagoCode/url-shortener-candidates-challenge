export interface UrlStatisticsResult {
  id: string;
  originalUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: Date;
}

export type GetUrlStatisticsResult = UrlStatisticsResult[];
