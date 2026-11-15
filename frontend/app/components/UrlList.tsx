import type { UrlRecord } from "../api/urlApi.server";
import { UrlCard } from "./UrlCard";

export function UrlList({ urls }: { urls: UrlRecord[] }) {
  if (!urls.length) return <div className="empty-state"><span aria-hidden="true">↗</span><h2>No links yet</h2><p>Shorten your first URL to see its click statistics here.</p></div>;
  return <div className="url-list">{urls.map((url) => <UrlCard key={url.id} url={url} />)}</div>;
}
