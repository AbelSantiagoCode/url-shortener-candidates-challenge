import type { ReactNode } from "react";
import { BrandHeader } from "../../../components/BrandHeader";
import { SiteFooter } from "../../../components/SiteFooter";

export function UrlsPageLayout({ children }: { children: ReactNode }) {
  return <main className="page-shell dashboard-shell">
    <BrandHeader linkTo="/" linkLabel="Create a link" arrow="←" />
    {children}
    <SiteFooter />
  </main>;
}
