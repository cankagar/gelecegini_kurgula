import { redirect } from "next/navigation";
import { requireUser } from "@/entities/user/server";

export default async function DashboardPage() {
  const user = await requireUser();
  redirect(`/dashboard/${user.role}`);
}
