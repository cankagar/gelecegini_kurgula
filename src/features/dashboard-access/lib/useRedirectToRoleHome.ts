"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUserQuery } from "@/entities/user";
import { isDashboardRole } from "@/entities/dashboard";

// Redirects to the current user's role dashboard home. Accounts without a
// dashboard role (e.g. "user") are sent home instead of looping back into
// /dashboard.
export function useRedirectToRoleHome() {
  const router = useRouter();
  const { data: user, isError } = useCurrentUserQuery();

  useEffect(() => {
    if (isError) {
      router.replace("/auth/login");
    } else if (user) {
      router.replace(isDashboardRole(user.role) ? `/dashboard/${user.role}` : "/");
    }
  }, [isError, user, router]);
}
