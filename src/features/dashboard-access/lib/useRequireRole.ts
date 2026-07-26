"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, useUserStore } from "@/entities/user";
import type { DashboardRole } from "@/entities/dashboard";

// Fetches the current user client-side and redirects if unauthenticated or
// if the role doesn't match. Writes the resolved user into the shared store
// so sibling components (navbar, etc.) can read it without re-fetching.
// Returns null while loading/redirecting — derived straight from the store
// (not separate local state) so it reacts immediately when the store is
// cleared (e.g. on logout), instead of leaving children rendered with a
// stale "resolved" user while the global store already went null.
export function useRequireRole(role: DashboardRole) {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    let active = true;

    getMe()
      .then((fetchedUser) => {
        if (!active) return;
        if (fetchedUser.role !== role) {
          router.replace("/dashboard");
          return;
        }
        setUser(fetchedUser);
      })
      .catch(() => {
        if (active) router.replace("/auth/login");
      });

    return () => {
      active = false;
    };
  }, [role, router, setUser]);

  return user && user.role === role ? user : null;
}
