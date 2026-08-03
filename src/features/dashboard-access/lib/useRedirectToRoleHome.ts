"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUserQuery } from "@/entities/user";
import { isDashboardRole, getStoredActiveRole, setStoredActiveRole } from "@/entities/dashboard";
import type { DashboardRole } from "@/entities/dashboard";

// Redirects to the current user's role dashboard home. Accounts without a
// dashboard role (e.g. "user") are sent home instead of looping back into
// /dashboard. Accounts with exactly one dashboard role go straight there.
// Accounts with more than one (e.g. teacher + author) go to their
// last-used role if it's still valid — otherwise the caller should render a
// role picker (see `eligibleRoles`/`needsRoleChoice`), since which role to
// open isn't ours to guess.
export function useRedirectToRoleHome() {
  const router = useRouter();
  const { data: user, isError } = useCurrentUserQuery();

  const eligibleRoles = (user?.roles.filter(isDashboardRole) ?? []) as DashboardRole[];
  const stored = getStoredActiveRole();
  const needsRoleChoice = eligibleRoles.length > 1 && !(stored && eligibleRoles.includes(stored));

  useEffect(() => {
    if (isError) {
      router.replace("/auth/login");
      return;
    }
    if (!user) return;

    if (eligibleRoles.length === 0) {
      router.replace("/");
    } else if (eligibleRoles.length === 1) {
      setStoredActiveRole(eligibleRoles[0]);
      router.replace(`/dashboard/${eligibleRoles[0]}`);
    } else if (stored && eligibleRoles.includes(stored)) {
      router.replace(`/dashboard/${stored}`);
    }
    // else: more than one role and no valid stored choice — let the caller
    // render a picker instead of guessing which one to open.
  }, [isError, user, eligibleRoles, stored, router]);

  return { eligibleRoles, needsRoleChoice };
}
