"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/widgets/dashboard-shell";

export default function StudentDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="student">{children}</DashboardShell>;
}
