import type { Route } from "./+types/route";
import { UrlsPage } from "../../pages/UrlsPage";
import { deleteUrlAction } from "./actions/deleteUrlAction.server";
import type { DeleteUrlActionResult } from "../../features/urls-page/contracts/DeleteUrlActionResult";
import { listUrlsLoader } from "./loaders/listUrlsLoader.server";
import { recordClickAction } from "./actions/recordClickAction.server";
import type { RecordClickActionResult } from "../../features/urls-page/contracts/RecordClickActionResult";

type UrlsActionResult = DeleteUrlActionResult | RecordClickActionResult;

const actionHandlers = {
  deleteUrl: deleteUrlAction,
  recordClick: recordClickAction,
} satisfies Record<string, (formData: FormData) => Promise<UrlsActionResult>>;

type UrlsActionIntent = keyof typeof actionHandlers;

function isUrlsActionIntent(value: string): value is UrlsActionIntent {
  return Object.hasOwn(actionHandlers, value);
}

export const loader = listUrlsLoader;

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("_intent");
  if (typeof intent !== "string" || !isUrlsActionIntent(intent)) return { error: "Unknown URL action." };
  return actionHandlers[intent](formData);
}
export function meta() { return [{ title: "Your links — Linkfold" }]; }

export default function Urls({ loaderData }: Route.ComponentProps) { return <UrlsPage urls={loaderData.urls} />; }
