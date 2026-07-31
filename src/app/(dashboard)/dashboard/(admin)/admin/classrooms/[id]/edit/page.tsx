"use client";

import { use } from "react";
import { DashboardAdminClassroomEditView } from "@/views/dashboard-admin-classroom-edit";

export default function AdminClassroomEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <DashboardAdminClassroomEditView classroomId={id} />;
}
