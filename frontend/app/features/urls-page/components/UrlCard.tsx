import { useFetcher } from "react-router";
import type { UrlRecord } from "../../../api/urlContracts";
import { formatDate } from "../../../helpers/formatDate";
import type { RecordClickActionResult } from "../contracts/RecordClickActionResult";

export function UrlCard({ url }: { url: UrlRecord }) {
  const fetcher = useFetcher<RecordClickActionResult>();

  return <>
    <article className="url-card">
      <div className="url-card-main">
        <a
          className="short-link"
          href={url.originalUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => fetcher.submit({ _intent: "recordClick", shortCode: url.shortCode }, { method: "post" })}
        >
          {url.shortUrl}
        </a>
        <a
          className="original-link"
          href={url.originalUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => fetcher.submit({ _intent: "recordClick", shortCode: url.shortCode }, { method: "post" })}
        >
          {url.originalUrl}
        </a>
      </div>
      <div className="url-stats"><strong>{url.clickCount}</strong><span>{url.clickCount === 1 ? "click" : "clicks"}</span></div>
      <time dateTime={url.createdAt}>{formatDate(url.createdAt)}</time>
    </article>
    {fetcher.data?.error && <p className="error-message" role="alert">{fetcher.data.error}</p>}
  </>;
}
