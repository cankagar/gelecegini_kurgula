import { ROUTES } from "@/shared/lib/routes";
import type { DashboardRole } from "../model/types";

const DASHBOARD_PROFILE_ROUTES: Record<DashboardRole, string> = {
  admin: ROUTES.ADMIN.PROFILE,
  teacher: ROUTES.TEACHER.PROFILE,
  student: ROUTES.STUDENT.PROFILE,
  author: ROUTES.AUTHOR.PROFILE,
};

// Self-profile lives inside each role's own dashboard route group, not at
// a single shared path — so linking to "my profile" needs the active role.
export function dashboardProfileRoute(role: DashboardRole): string {
  return DASHBOARD_PROFILE_ROUTES[role];
}
