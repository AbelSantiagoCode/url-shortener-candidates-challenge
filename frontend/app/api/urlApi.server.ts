const backendUrl = process.env.BACKEND_URL ?? "http://localhost:4000";

export interface UrlRecord {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clickCount: number;
  createdAt: string;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(typeof data.error === "string" ? data.error : "The URL service could not complete the request.");
  return data as T;
}

export async function createUrl(originalUrl: string): Promise<UrlRecord> {
  return parseResponse(await fetch(`${backendUrl}/api/urls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl }),
  }));
}

export async function listUrls(): Promise<UrlRecord[]> {
  return parseResponse(await fetch(`${backendUrl}/api/urls`, { headers: { Accept: "application/json" } }));
}

export async function deleteUrl(id: string): Promise<void> {
  const response = await fetch(`${backendUrl}/api/urls/${encodeURIComponent(id)}`, { method: "DELETE" });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(typeof data.error === "string" ? data.error : "Could not delete this link.");
  }
}

export async function resolveShortUrl(code: string): Promise<string> {
  const response = await fetch(`${backendUrl}/api/${encodeURIComponent(code)}`, { redirect: "manual" });
  if (response.status !== 302) throw new Response("Short URL not found", { status: response.status === 404 ? 404 : 502 });
  const location = response.headers.get("location");
  if (!location) throw new Response("Redirect destination missing", { status: 502 });
  return location;
}
