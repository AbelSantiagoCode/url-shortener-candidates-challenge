import { useActionData } from "react-router";
import type { Route } from "./+types/route";
import { HomePage } from "../../pages/HomePage";
import { createUrlAction, type HomeActionResult } from "./actions/createUrlAction.server";

const actionHandlers = {
  createUrl: createUrlAction,
} satisfies Record<string, (formData: FormData) => Promise<HomeActionResult>>;

type HomeActionIntent = keyof typeof actionHandlers;

function isHomeActionIntent(value: string): value is HomeActionIntent {
  return Object.hasOwn(actionHandlers, value);
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("_intent");
  if (typeof intent !== "string" || !isHomeActionIntent(intent)) return { error: "Unknown home action." };
  return actionHandlers[intent](formData);
}

export function meta() { return [{ title: "Linkfold — URL shortener" }, { name: "description", content: "Create short links and track visits." }]; }

export default function Home() {
  const result = useActionData<typeof action>();
  return <HomePage error={result?.error} createdUrl={result?.url} />;
}
