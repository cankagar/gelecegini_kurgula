import type { ReactNode } from "react";
import Navbar from "@/widgets/navbar";
import Footer from "@/widgets/footer";
import { SiteDock } from "@/widgets/site-dock/SiteDock";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 65px)" }}>{children}</main>
      <Footer />
      <SiteDock />
    </>
  );
}
