"use client";

import { useRedirectToRoleHome, RolePicker } from "@/features/dashboard-access";

export default function DashboardPage() {
  const { eligibleRoles, needsRoleChoice } = useRedirectToRoleHome();

  if (needsRoleChoice) {
    return <RolePicker roles={eligibleRoles} />;
  }
  return null;
}
