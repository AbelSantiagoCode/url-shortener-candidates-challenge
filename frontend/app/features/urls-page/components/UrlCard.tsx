import type { UrlRecord } from "../../../api/urlContracts";
import { formatDate } from "../../../helpers/formatDate";

export function UrlCard({ url }: { url: UrlRecord }) {
  return <article className="url-card">
    <div className="url-card-main">
      <a className="short-link" href={url.shortUrl}>{url.shortUrl}</a>
      <a className="original-link" href={url.originalUrl} target="_blank" rel="noreferrer">{url.originalUrl}</a>
    </div>
    <div className="url-stats"><strong>{url.clickCount}</strong><span>{url.clickCount === 1 ? "click" : "clicks"}</span></div>
    <time dateTime={url.createdAt}>{formatDate(url.createdAt)}</time>
  </article>;
}
