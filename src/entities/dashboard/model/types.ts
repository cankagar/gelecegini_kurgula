// Roles that get a dashboard area. Deliberately independent of
// `entities/user` (entities can't import sibling entities) — takes a plain
// `string` so it works with any role value, whatever its source.
export type DashboardRole = "student" | "teacher" | "admin" | "author";

export const DASHBOARD_ROLES: readonly DashboardRole[] = [
  "student",
  "teacher",
  "admin",
  "author",
];

export function isDashboardRole(role: string): role is DashboardRole {
  return (DASHBOARD_ROLES as readonly string[]).includes(role);
}
