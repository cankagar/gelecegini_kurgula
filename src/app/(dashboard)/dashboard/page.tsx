"use client";

import { useRedirectToRoleHome } from "@/features/dashboard-access";

export default function DashboardPage() {
  useRedirectToRoleHome();
  return null;
}
