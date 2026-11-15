import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("urls", "routes/urls.tsx"),
  route("s/:code", "routes/s.$code.tsx"),
] satisfies RouteConfig;
