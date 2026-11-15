import { Link, useFetcher } from "react-router";
import type { Route } from "./+types/urls";
import { deleteUrl, listUrls } from "../api/urlApi.server";
import { UrlCard } from "../components/UrlCard";

export async function loader() { return { urls: await listUrls() }; }
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  if (typeof id !== "string" || !/^[1-9]\d*$/.test(id)) return { error: "Invalid link ID." };
  try { await deleteUrl(id); return { deletedId: id }; }
  catch (error) { return { error: error instanceof Error ? error.message : "Could not delete this link." }; }
}
export function meta() { return [{ title: "Your links — Linkfold" }]; }

function DeletableUrlCard({ url }: { url: Awaited<ReturnType<typeof listUrls>>[number] }) {
  const fetcher = useFetcher<typeof action>();
  const busy = fetcher.state !== "idle";
  return <div className="deletable-url-card">
    <UrlCard url={url} />
    <fetcher.Form method="post" onSubmit={(event) => {
      if (!window.confirm("Delete this short link? It will stop redirecting.")) event.preventDefault();
    }}>
      <input type="hidden" name="id" value={url.id} />
      <button className="delete-button" type="submit" disabled={busy} aria-label={`Delete ${url.shortUrl}`}>
        {busy ? "Deleting…" : "Delete"}
      </button>
      {fetcher.data?.error && <span className="delete-error" role="alert">{fetcher.data.error}</span>}
    </fetcher.Form>
  </div>;
}

export default function Urls({ loaderData }: Route.ComponentProps) {
  const totalClicks = loaderData.urls.reduce((sum, url) => sum + url.clickCount, 0);
  return <main className="page-shell dashboard-shell">
    <header className="site-header"><Link to="/" className="brand"><span className="brand-mark">↗</span>linkfold</Link><Link to="/" className="nav-link">← Create a link</Link></header>
    <section className="dashboard-heading"><div><div className="eyebrow">YOUR LINK LIBRARY</div><h1>All your links,<br /><span>at a glance.</span></h1></div><div className="summary-card"><div><strong>{loaderData.urls.length}</strong><span>links created</span></div><div><strong>{totalClicks}</strong><span>total clicks</span></div></div></section>
    <section className="links-section"><div className="section-heading"><h2>Recent links</h2><span>{loaderData.urls.length} total</span></div>
      {loaderData.urls.length === 0
        ? <div className="empty-state"><span aria-hidden="true">↗</span><h2>No links yet</h2><p>Shorten your first URL to see its click statistics here.</p></div>
        : <div className="url-list">{loaderData.urls.map((url) => <DeletableUrlCard key={url.id} url={url} />)}</div>}
    </section>
    <footer className="site-footer"><span>LINKFOLD</span><span>Short links, made thoughtful.</span></footer>
  </main>;
}
