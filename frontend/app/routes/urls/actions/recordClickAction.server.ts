import { resolveShortUrl } from "../../../api/urlApi.server";
import type { RecordClickActionResult } from "../../../features/urls-page/contracts/RecordClickActionResult";

export async function recordClickAction(formData: FormData): Promise<RecordClickActionResult> {
  const shortCode = formData.get("shortCode");
  if (typeof shortCode !== "string" || !/^[0-9a-zA-Z]{4,16}$/.test(shortCode)) {
    return { error: "Invalid short code." };
  }

  try {
    await resolveShortUrl(shortCode);
    return {};
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not record this click." };
  }
}
