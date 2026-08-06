"use client";

import type { ReactNode } from "react";
import { useRequireRole } from "@/features/dashboard-access";
import type { DashboardRole } from "@/entities/dashboard";
import { DashboardSidebar, DASHBOARD_MOBILE_MAIN_CLEARANCE_CLASS } from "@/widgets/dashboard-sidebar";

type DashboardShellProps = {
  role: DashboardRole;
  children: ReactNode;
};

export function DashboardShell({ role, children }: DashboardShellProps) {
  const user = useRequireRole(role);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role={role} />
      <main className={`min-w-0 flex-1 ${DASHBOARD_MOBILE_MAIN_CLEARANCE_CLASS}`}>{children}</main>
    </div>
  );
}
