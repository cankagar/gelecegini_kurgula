"use client";

import { use } from "react";
import { DashboardAdminClassroomDetailView } from "@/views/dashboard-admin-classroom-detail";

export default function AdminClassroomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <DashboardAdminClassroomDetailView classroomId={id} />;
}
