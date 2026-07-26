import { requireUser } from "@/entities/user/server";
import { DashboardStudentView } from "@/views/dashboard-student";

export default async function StudentDashboardPage() {
  const user = await requireUser();
  return <DashboardStudentView user={user} />;
}
