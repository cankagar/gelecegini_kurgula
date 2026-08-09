"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/widgets/dashboard-shell";

export default function AuthorDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="author">{children}</DashboardShell>;
}
