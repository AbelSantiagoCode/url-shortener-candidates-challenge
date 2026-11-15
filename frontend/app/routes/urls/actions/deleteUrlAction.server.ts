import { deleteUrl } from "../../../api/urlApi.server";
import type { DeleteUrlActionResult } from "../../../features/urls-page/contracts/DeleteUrlActionResult";

export async function deleteUrlAction(formData: FormData): Promise<DeleteUrlActionResult> {
  const id = formData.get("id");
  if (typeof id !== "string" || !/^[1-9]\d*$/.test(id)) return { error: "Invalid link ID." };

  try {
    await deleteUrl(id);
    return { deletedId: id };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not delete this link." };
  }
}
