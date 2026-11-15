import { Form, useNavigation } from "react-router";

export function UrlForm({ error }: { error?: string }) {
  const navigation = useNavigation();
  const busy = navigation.state !== "idle";
  return <Form method="post" className="url-form">
    <label htmlFor="url">Long URL</label>
    <div className="form-row">
      <input id="url" type="url" name="url" placeholder="https://example.com/a/long/link" required autoComplete="url" />
      <button type="submit" disabled={busy}>{busy ? "Shortening…" : "Shorten URL"}</button>
    </div>
    {error && <p className="error-message" role="alert">{error}</p>}
  </Form>;
}
