"use client";

import { useCurrentUser } from "@/entities/user";
import { DashboardTeacherView } from "@/views/dashboard-teacher";

export default function TeacherDashboardPage() {
  const user = useCurrentUser();
  return <DashboardTeacherView user={user} />;
}
