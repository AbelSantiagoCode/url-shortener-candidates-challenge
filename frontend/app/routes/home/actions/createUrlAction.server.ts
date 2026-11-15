import { createUrl } from "../../../api/urlApi.server";
import type { UrlRecord } from "../../../api/urlContracts";
import { getOriginalUrlFromForm } from "../../../features/home/helpers/getOriginalUrlFromForm";

export interface HomeActionResult {
  url?: UrlRecord;
  error?: string;
}

export async function createUrlAction(formData: FormData): Promise<HomeActionResult> {
  const originalUrl = getOriginalUrlFromForm(formData);
  if (!originalUrl) return { error: "Enter a URL to shorten." };

  try {
    return { url: await createUrl(originalUrl) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not shorten this URL." };
  }
}
