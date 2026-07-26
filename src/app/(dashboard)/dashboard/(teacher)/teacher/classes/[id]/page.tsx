"use client";

import { use } from "react";
import { DashboardTeacherClassroomDetailView } from "@/views/dashboard-teacher-classroom-detail";

export default function TeacherClassroomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <DashboardTeacherClassroomDetailView classroomId={id} />;
}
