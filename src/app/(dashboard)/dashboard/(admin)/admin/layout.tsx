import type { ReactNode } from "react";
import { requireRole } from "@/entities/user/server";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  await requireRole("admin");
  return <>{children}</>;
}
