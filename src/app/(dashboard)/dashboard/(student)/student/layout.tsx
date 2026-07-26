"use client";

import type { ReactNode } from "react";
import { useRequireRole } from "@/entities/user";

export default function StudentDashboardLayout({ children }: { children: ReactNode }) {
  const user = useRequireRole("student");

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
