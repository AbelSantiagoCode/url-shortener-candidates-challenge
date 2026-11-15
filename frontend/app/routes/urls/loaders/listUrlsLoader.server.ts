import { listUrls } from "../../../api/urlApi.server";

export async function listUrlsLoader() {
  return { urls: await listUrls() };
}
