"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, useUserStore } from "@/entities/user";
import { isDashboardRole } from "@/entities/dashboard";

// Fetches the current user client-side and redirects to their role's
// dashboard home. Accounts without a dashboard role (e.g. "user") are sent
// home instead of looping back into /dashboard.
export function useRedirectToRoleHome() {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    let active = true;

    getMe()
      .then((user) => {
        if (!active) return;
        setUser(user);
        router.replace(isDashboardRole(user.role) ? `/dashboard/${user.role}` : "/");
      })
      .catch(() => {
        if (active) router.replace("/auth/login");
      });

    return () => {
      active = false;
    };
  }, [router, setUser]);
}
