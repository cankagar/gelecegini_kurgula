"use client";

import type { ReactNode } from "react";
import { useRequireRole } from "@/entities/user";

export default function TeacherDashboardLayout({ children }: { children: ReactNode }) {
  const user = useRequireRole("teacher");

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
