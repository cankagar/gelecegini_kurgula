"use client";

import type { ReactNode } from "react";
import { useRequireRole } from "@/features/dashboard-access";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";

export default function StudentDashboardLayout({ children }: { children: ReactNode }) {
  const user = useRequireRole("student");

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
