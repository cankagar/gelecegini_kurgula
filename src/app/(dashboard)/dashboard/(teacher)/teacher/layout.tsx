import type { ReactNode } from "react";
import { requireRole } from "@/entities/user/server";

export default async function TeacherDashboardLayout({ children }: { children: ReactNode }) {
  await requireRole("teacher");
  return <>{children}</>;
}
