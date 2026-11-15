import type { ReactNode } from "react";
import { BrandHeader } from "../../../components/BrandHeader";
import { SiteFooter } from "../../../components/SiteFooter";

export function HomeLayout({ children }: { children: ReactNode }) {
  return <main className="page-shell">
    <BrandHeader linkTo="/urls" linkLabel="Your links" />
    {children}
    <SiteFooter />
  </main>;
}
