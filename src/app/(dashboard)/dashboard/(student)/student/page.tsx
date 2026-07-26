"use client";

import { useCurrentUser } from "@/entities/user";
import { DashboardStudentView } from "@/views/dashboard-student";

export default function StudentDashboardPage() {
  const user = useCurrentUser();
  return <DashboardStudentView user={user} />;
}
