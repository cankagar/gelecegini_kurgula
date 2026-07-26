"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUserQuery } from "@/entities/user";
import type { DashboardRole } from "@/entities/dashboard";

// Redirects if unauthenticated or if the role doesn't match. Returns null
// while loading/redirecting — derived straight from the query cache (not
// local state) so it reacts immediately once the query resolves, instead
// of leaving children rendered with a stale user.
export function useRequireRole(role: DashboardRole) {
  const router = useRouter();
  const { data: user, isError } = useCurrentUserQuery();

  useEffect(() => {
    if (isError) {
      router.replace("/auth/login");
    } else if (user && user.role !== role) {
      router.replace("/dashboard");
    }
  }, [isError, user, role, router]);

  return user && user.role === role ? user : null;
}
