import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/route.tsx"),
  route("urls", "routes/urls/route.tsx"),
  route("go/:shortCode", "routes/go.$shortCode.tsx"),
] satisfies RouteConfig;
