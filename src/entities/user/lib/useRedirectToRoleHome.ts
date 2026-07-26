"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/entities/user/api/userApi";
import { useUserStore } from "@/entities/user/model/store";

// Fetches the current user client-side and redirects to their role's
// dashboard home, or to login if unauthenticated.
export function useRedirectToRoleHome() {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    let active = true;

    getMe()
      .then((user) => {
        if (!active) return;
        setUser(user);
        router.replace(`/dashboard/${user.role}`);
      })
      .catch(() => {
        if (active) router.replace("/auth/login");
      });

    return () => {
      active = false;
    };
  }, [router, setUser]);
}
