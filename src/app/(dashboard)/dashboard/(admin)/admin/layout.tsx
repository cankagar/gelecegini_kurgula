"use client";

import type { ReactNode } from "react";
import { useRequireRole } from "@/entities/user";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const user = useRequireRole("admin");

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
