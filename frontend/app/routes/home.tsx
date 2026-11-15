import { Link, useActionData } from "react-router";
import type { Route } from "./+types/home";
import { createUrl } from "../api/urlApi.server";
import { UrlForm } from "../components/UrlForm";

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const originalUrl = form.get("url");
  if (typeof originalUrl !== "string" || !originalUrl.trim()) return { error: "Enter a URL to shorten." };
  try { return { url: await createUrl(originalUrl.trim()) }; }
  catch (error) { return { error: error instanceof Error ? error.message : "Could not shorten this URL." }; }
}

export function meta() { return [{ title: "Linkfold — URL shortener" }, { name: "description", content: "Create short links and track visits." }]; }

export default function Home() {
  const result = useActionData<typeof action>();
  return <main className="page-shell">
    <header className="site-header"><Link to="/" className="brand"><span className="brand-mark">↗</span>linkfold</Link><Link to="/urls" className="nav-link">Your links <span aria-hidden="true">→</span></Link></header>
    <section className="hero">
      <div className="eyebrow"><span className="status-dot" /> SIMPLE LINKS. CLEAR INSIGHTS.</div>
      <h1>Make every link<br /><span>go further.</span></h1>
      <p className="hero-copy">Turn long URLs into tidy, shareable links. Keep an eye on every click along the way.</p>
      <div className="form-panel"><UrlForm error={result?.error} /></div>
      {result?.url && <section className="result-panel" aria-live="polite"><div><span className="result-label">YOUR SHORT LINK</span><a href={result.url.shortUrl}>{result.url.shortUrl}</a></div><a className="copy-action" href={result.url.shortUrl}>Open link ↗</a></section>}
      <div className="hero-footnote"><span>Free to use</span><span>·</span><span>No sign-up needed</span></div>
    </section>
    <footer className="site-footer"><span>LINKFOLD</span><span>Short links, made thoughtful.</span></footer>
  </main>;
}
