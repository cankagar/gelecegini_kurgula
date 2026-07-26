"use client";

import { useEffect } from "react";
import { getMe } from "@/entities/user/api/userApi";
import { useUserStore } from "@/entities/user/model/store";

// Silently checks auth state on mount — no redirect, unlike `useRequireRole`.
// For UI that renders on every page (navbar) and just needs to know whether
// someone is logged in.
export function useSyncCurrentUser() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);

  useEffect(() => {
    let active = true;

    getMe()
      .then((fetchedUser) => {
        if (active) setUser(fetchedUser);
      })
      .catch(() => {
        if (active) clearUser();
      });

    return () => {
      active = false;
    };
  }, [setUser, clearUser]);

  return user;
}
