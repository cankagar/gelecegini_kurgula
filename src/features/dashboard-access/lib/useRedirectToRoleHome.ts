"use client";

import { useEffect, useMemo } from "react";
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
// `enabled: false` yalnızca veriyi okur, yönlendirme yapmaz — davet kabulü
// gibi "sadece belirli bir olaydan sonra tetiklensin" senaryoları için
// (aksi halde sayfa açılır açılmaz, davete konu olmayan mevcut bir oturum
// üzerinden istenmeyen bir yönlendirme tetiklenebilir).
export function useRedirectToRoleHome({ enabled = true }: { enabled?: boolean } = {}) {
  const router = useRouter();
  const { data: user, isError } = useCurrentUserQuery();

  const eligibleRoles = useMemo(
    () => (user?.roles.filter(isDashboardRole) ?? []) as DashboardRole[],
    [user]
  );
  const stored = getStoredActiveRole();
  const needsRoleChoice = eligibleRoles.length > 1 && !(stored && eligibleRoles.includes(stored));

  useEffect(() => {
    if (!enabled) return;
    if (isError) {
      // Never force an unauthenticated visitor onto the login page — dashboard
      // pages just aren't reachable without a session, so send them home.
      router.replace("/");
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
  }, [enabled, isError, user, eligibleRoles, stored, router]);

  return { eligibleRoles, needsRoleChoice };
}
