"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/widgets/navbar";
import Footer from "@/widgets/footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/profile") ||
    pathname?.startsWith("/auth")
  ) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: "104px" }}>{children}</main>
      <Footer />
    </>
  );
}
