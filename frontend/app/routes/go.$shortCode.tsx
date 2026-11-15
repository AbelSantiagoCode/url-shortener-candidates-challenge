import { redirect } from "react-router";
import type { Route } from "./+types/go.$shortCode";
import { resolveShortUrl } from "../api/urlApi.server";

export async function loader({ params }: Route.LoaderArgs) { return redirect(await resolveShortUrl(params.shortCode!)); }
export default function ShortRedirect() { return null; }
