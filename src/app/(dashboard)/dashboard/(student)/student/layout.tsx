import type { ReactNode } from "react";
import { requireRole } from "@/entities/user/server";

export default async function StudentDashboardLayout({ children }: { children: ReactNode }) {
  await requireRole("student");
  return <>{children}</>;
}
