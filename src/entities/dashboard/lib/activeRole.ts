import { isDashboardRole, type DashboardRole } from "@/entities/dashboard/model/types";

const STORAGE_KEY = "payastem:active-role";

// Which dashboard the user last chose, for accounts with more than one
// dashboard-eligible role. Purely a UI preference — the backend never sees
// this, authorization is checked against the full `roles` list on every request.
export function getStoredActiveRole(): DashboardRole | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value && isDashboardRole(value) ? value : null;
}

export function setStoredActiveRole(role: DashboardRole): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, role);
}
