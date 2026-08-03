"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/widgets/dashboard-shell";

export default function TeacherDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="teacher">{children}</DashboardShell>;
}
