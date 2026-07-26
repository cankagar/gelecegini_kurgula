import { requireUser } from "@/entities/user/server";
import { DashboardAdminView } from "@/views/dashboard-admin";

export default async function AdminDashboardPage() {
  const user = await requireUser();
  return <DashboardAdminView user={user} />;
}
