"use client";

import { use } from "react";
import { DashboardAdminUserDetailView } from "@/views/dashboard-admin-user-detail";

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <DashboardAdminUserDetailView userId={id} />;
}
