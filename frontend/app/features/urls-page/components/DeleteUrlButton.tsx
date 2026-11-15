import { useFetcher } from "react-router";
import type { DeleteUrlActionResult } from "../contracts/DeleteUrlActionResult";

export function DeleteUrlButton({ id, shortUrl }: { id: string; shortUrl: string }) {
  const fetcher = useFetcher<DeleteUrlActionResult>();
  const busy = fetcher.state !== "idle";
  return <fetcher.Form method="post" onSubmit={(event) => {
    if (!window.confirm("Delete this short link? It will stop redirecting.")) event.preventDefault();
  }}>
    <input type="hidden" name="_intent" value="deleteUrl" />
    <input type="hidden" name="id" value={id} />
    <button className="delete-button" type="submit" disabled={busy} aria-busy={busy} aria-label={`Delete ${shortUrl}`}>
      {busy ? <><span className="loading-spinner loading-spinner-small" aria-hidden="true" />Deleting…</> : "Delete"}
    </button>
    {fetcher.data?.error && <span className="delete-error" role="alert">{fetcher.data.error}</span>}
  </fetcher.Form>;
}
