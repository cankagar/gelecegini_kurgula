"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUserQuery } from "@/entities/user";
import type { DashboardRole } from "@/entities/dashboard";
import { setStoredActiveRole } from "@/entities/dashboard";

// Redirects if unauthenticated or if the user doesn't hold this role. A user
// can hold several roles at once (e.g. teacher + author) — this only checks
// whether `role` is one of them, not whether it's their only one. Returns
// null while loading/redirecting — derived straight from the query cache
// (not local state) so it reacts immediately once the query resolves,
// instead of leaving children rendered with a stale user.
export function useRequireRole(role: DashboardRole) {
  const router = useRouter();
  const { data: user, isError } = useCurrentUserQuery();
  const hasRole = !!user?.roles.includes(role);

  useEffect(() => {
    if (isError) {
      // Never force an unauthenticated visitor onto the login page — dashboard
      // pages just aren't reachable without a session, so send them home.
      router.replace("/");
    } else if (user && !hasRole) {
      router.replace("/dashboard");
    } else if (hasRole) {
      // This is now the role the user is actively viewing the dashboard as.
      setStoredActiveRole(role);
    }
  }, [isError, user, hasRole, role, router]);

  return hasRole ? user! : null;
}
