"use client";

import { use } from "react";
import { DashboardStudentClassroomDetailView } from "@/views/dashboard-student-classroom-detail";

export default function StudentClassroomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <DashboardStudentClassroomDetailView classroomId={id} />;
}
