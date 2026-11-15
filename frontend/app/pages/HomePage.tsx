import type { UrlRecord } from "../api/urlContracts";
import { UrlForm } from "../features/home/components/UrlForm";
import { HomeLayout } from "../features/home/layouts/HomeLayout";

interface HomePageProps {
  error: string | undefined;
  createdUrl: UrlRecord | undefined;
}

export function HomePage({ error, createdUrl }: HomePageProps) {
  return <HomeLayout>
    <section className="hero">
      <div className="eyebrow"><span className="status-dot" /> SIMPLE LINKS. CLEAR INSIGHTS.</div>
      <h1>Make every link<br /><span>go further.</span></h1>
      <p className="hero-copy">Turn long URLs into tidy, shareable links. Keep an eye on every click along the way.</p>
      <div className="form-panel"><UrlForm error={error} /></div>
      {createdUrl && <section className="result-panel" aria-live="polite">
        <div><span className="result-label">YOUR SHORT LINK</span><a href={createdUrl.shortUrl}>{createdUrl.shortUrl}</a></div>
        <a className="copy-action" href={createdUrl.shortUrl}>Open link ↗</a>
      </section>}
      <div className="hero-footnote"><span>Free to use</span><span>·</span><span>No sign-up needed</span></div>
    </section>
  </HomeLayout>;
}
