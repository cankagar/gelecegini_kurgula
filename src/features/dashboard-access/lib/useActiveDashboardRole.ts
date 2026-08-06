"use client";

import { isDashboardRole, getStoredActiveRole, type DashboardRole } from "@/entities/dashboard";
import type { User } from "@/entities/user";

// Which dashboard sidebar (if any) belongs next to a role-agnostic page
// like profile — reuses the same "last active role" preference the
// dashboard itself uses, falling back to the user's first eligible role.
// Accounts with no dashboard role (plain "user"/"author") get null.
export function useActiveDashboardRole(user: User | null): DashboardRole | null {
  if (!user) return null;
  const eligible = user.roles.filter(isDashboardRole) as DashboardRole[];
  if (eligible.length === 0) return null;

  const stored = getStoredActiveRole();
  return stored && eligible.includes(stored) ? stored : eligible[0];
}
