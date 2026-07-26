"use client";

import { useUserStore } from "@/entities/user/model/store";

// Read-only access to the current user, once `useRequireRole`/`useRedirectToRoleHome`
// has resolved it into the store. Throws if read before that (programmer error).
export function useCurrentUser() {
  const user = useUserStore((s) => s.user);
  if (!user) {
    throw new Error("useCurrentUser must be called after useRequireRole has resolved");
  }
  return user;
}
