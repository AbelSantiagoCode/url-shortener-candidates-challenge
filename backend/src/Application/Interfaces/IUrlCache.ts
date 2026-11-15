export interface CachedUrlDestination {
  id: string;
  originalUrl: string;
}

export interface IUrlCache {
  get(shortCode: string): Promise<CachedUrlDestination | null>;
  set(shortCode: string, destination: CachedUrlDestination, ttlSeconds: number): Promise<void>;
  delete(shortCode: string): Promise<void>;
}
