"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/widgets/dashboard-shell";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="admin">{children}</DashboardShell>;
}
