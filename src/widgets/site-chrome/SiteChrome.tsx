"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/widgets/navbar";
import Footer from "@/widgets/footer";
import { SiteDock } from "@/widgets/site-dock/SiteDock";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 65px)" }}>{children}</main>
      <Footer />
      <SiteDock />
    </>
  );
}
