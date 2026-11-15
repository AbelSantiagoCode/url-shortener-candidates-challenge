import type { UrlRecord } from "../../../api/urlContracts";
import { UrlCard } from "./UrlCard";
import { DeleteUrlButton } from "./DeleteUrlButton";

export function UrlList({ urls }: { urls: UrlRecord[] }) {
  if (!urls.length) return <div className="empty-state"><span aria-hidden="true">↗</span><h2>No links yet</h2><p>Shorten your first URL to see its click statistics here.</p></div>;
  return <div className="url-list">{urls.map((url) => <div className="deletable-url-card" key={url.id}>
    <UrlCard url={url} />
    <DeleteUrlButton id={url.id} shortUrl={url.shortUrl} />
  </div>)}</div>;
}
