"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/features/auth";
import { useActiveDashboardRole } from "@/features/dashboard-access";
import { dashboardProfileRoute } from "@/entities/dashboard";

// Chrome for /profile — the personal profile page for accounts with no
// dashboard (plain "user"/"author"). Accounts that do have a dashboard role
// get their self-profile inside their own dashboard instead (role-native
// header, sidebar, nav) — so this shell redirects them there rather than
// rendering a second, sidebar-bolted copy of the same page.
export function ProfileShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const user = useRequireAuth();
  const activeRole = useActiveDashboardRole(user);

  useEffect(() => {
    if (activeRole) {
      router.replace(dashboardProfileRoute(activeRole));
    }
  }, [activeRole, router]);

  if (!user || activeRole) return null;

  return <main className="min-h-screen">{children}</main>;
}
