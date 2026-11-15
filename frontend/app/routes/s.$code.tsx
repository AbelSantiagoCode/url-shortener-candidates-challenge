import { redirect } from "react-router";
import type { Route } from "./+types/s.$code";
import { resolveShortUrl } from "../api/urlApi.server";

export async function loader({ params }: Route.LoaderArgs) { return redirect(await resolveShortUrl(params.code!)); }
export default function ShortRedirect() { return null; }
