import { requireUser } from "@/entities/user/server";
import { DashboardTeacherView } from "@/views/dashboard-teacher";

export default async function TeacherDashboardPage() {
  const user = await requireUser();
  return <DashboardTeacherView user={user} />;
}
