"use client";

import { useCurrentUserQuery } from "@/entities/user/lib/useCurrentUserQuery";

// Read-only access to the current user, for UI rendered only after a guard
// (`useRequireRole`/`useRedirectToRoleHome`) has already resolved it.
// Throws if read before that (programmer error).
export function useCurrentUser() {
  const { data: user } = useCurrentUserQuery();
  if (!user) {
    throw new Error("useCurrentUser must be called after a dashboard guard has resolved");
  }
  return user;
}
