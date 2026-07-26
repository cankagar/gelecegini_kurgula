"use client";

import { useCurrentUser } from "@/entities/user";
import { DashboardAdminView } from "@/views/dashboard-admin";

export default function AdminDashboardPage() {
  const user = useCurrentUser();
  return <DashboardAdminView user={user} />;
}
