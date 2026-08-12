"use client";

import { use } from "react";
import { DashboardTeacherClassroomEditView } from "@/views/dashboard-teacher-classroom-edit";

export default function TeacherClassroomEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <DashboardTeacherClassroomEditView classroomId={id} />;
}
