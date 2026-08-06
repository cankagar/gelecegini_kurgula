"use client";

import type { ReactNode } from "react";
import { useRequireAuth } from "@/features/auth";
import { useActiveDashboardRole } from "@/features/dashboard-access";
import { DashboardSidebar, DASHBOARD_MOBILE_MAIN_CLEARANCE_CLASS } from "@/widgets/dashboard-sidebar";

// Chrome for /profile pages — same dashboard sidebar a logged-in user
// already sees elsewhere, so profile doesn't feel like a different site.
// Unlike DashboardShell, this doesn't gate on a specific role: any
// authenticated user can reach their profile, sidebar or not.
export function ProfileShell({ children }: { children: ReactNode }) {
  const user = useRequireAuth();
  const activeRole = useActiveDashboardRole(user);

  if (!user) return null;

  if (!activeRole) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role={activeRole} />
      <main className={`flex-1 ${DASHBOARD_MOBILE_MAIN_CLEARANCE_CLASS}`}>{children}</main>
    </div>
  );
}
