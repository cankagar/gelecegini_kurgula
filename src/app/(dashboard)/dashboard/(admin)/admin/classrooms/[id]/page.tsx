"use client";

import { use } from "react";
import { DashboardAdminClassroomView } from "@/views/dashboard-admin-classroom-view";

export default function AdminClassroomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <DashboardAdminClassroomView classroomId={id} />;
}
