"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUserQuery } from "@/entities/user";

// For pages any logged-in user can reach regardless of role (e.g. profile
// settings) — unlike `useRequireRole`, this doesn't care which roles the
// user holds, only that they're authenticated.
export function useRequireAuth() {
  const router = useRouter();
  const { data: user, isError } = useCurrentUserQuery();

  useEffect(() => {
    if (isError) {
      // Never force an unauthenticated visitor onto the login page — dashboard
      // pages just aren't reachable without a session, so send them home.
      router.replace("/");
    }
  }, [isError, router]);

  return user ?? null;
}
