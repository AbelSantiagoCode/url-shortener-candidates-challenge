import type { UrlRecord } from "../api/urlContracts";
import { UrlList } from "../features/urls-page/components/UrlList";
import { UrlsPageLayout } from "../features/urls-page/layouts/UrlsPageLayout";
import { getUrlSummary } from "../features/urls-page/helpers/getUrlSummary";

export function UrlsPage({ urls }: { urls: UrlRecord[] }) {
  const summary = getUrlSummary(urls);
  return <UrlsPageLayout>
    <section className="dashboard-heading">
      <div><div className="eyebrow">YOUR LINK LIBRARY</div><h1>All your links,<br /><span>at a glance.</span></h1></div>
      <div className="summary-card"><div><strong>{summary.totalLinks}</strong><span>links created</span></div><div><strong>{summary.totalClicks}</strong><span>total clicks</span></div></div>
    </section>
    <section className="links-section">
      <div className="section-heading"><h2>Recent links</h2><span>{urls.length} total</span></div>
      <UrlList urls={urls} />
    </section>
  </UrlsPageLayout>;
}
