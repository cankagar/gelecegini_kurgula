"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/widgets/navbar";
import Footer from "@/widgets/footer";
import { SiteDock } from "@/widgets/site-dock/SiteDock";

const STANDALONE_ROUTES = ["/payastem/showcase"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_ROUTES.some((route) => pathname?.startsWith(route));

  if (isStandalone) {
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
