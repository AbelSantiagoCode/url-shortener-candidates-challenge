import { listUrls } from "../../../api/urlApi.server";

export async function listUrlsLoader() {
  // Return the promise so the route can render its loading shell immediately.
  return { urls: listUrls() };
}
