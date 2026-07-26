"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/entities/user/api/userApi";
import { useUserStore } from "@/entities/user/model/store";
import type { User, UserRole } from "@/entities/user/model/types";

// Fetches the current user client-side and redirects if unauthenticated or
// if the role doesn't match. Writes the resolved user into the shared store
// so sibling components (navbar, etc.) can read it without re-fetching.
// Returns null while loading/redirecting.
export function useRequireRole(role: UserRole) {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const [resolvedUser, setResolvedUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;
    setResolvedUser(null);

    getMe()
      .then((fetchedUser) => {
        if (!active) return;
        if (fetchedUser.role !== role) {
          router.replace("/dashboard");
          return;
        }
        setUser(fetchedUser);
        setResolvedUser(fetchedUser);
      })
      .catch(() => {
        if (active) router.replace("/auth/login");
      });

    return () => {
      active = false;
    };
  }, [role, router, setUser]);

  return resolvedUser;
}
