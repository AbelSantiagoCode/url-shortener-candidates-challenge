import { Form, useNavigation } from "react-router";

export function UrlForm({ error }: { error?: string }) {
  const navigation = useNavigation();
  const busy = navigation.state !== "idle";
  return <Form method="post" className="url-form">
    <input type="hidden" name="_intent" value="createUrl" />
    <label htmlFor="url">Long URL</label>
    <div className="form-row">
      <input id="url" type="url" name="url" placeholder="https://example.com/a/long/link" required autoComplete="url" />
      <button type="submit" disabled={busy} aria-busy={busy}>{busy ? <><span className="loading-spinner loading-spinner-small" aria-hidden="true" />Shortening…</> : "Shorten URL"}</button>
    </div>
    {error && <p className="error-message" role="alert">{error}</p>}
  </Form>;
}
