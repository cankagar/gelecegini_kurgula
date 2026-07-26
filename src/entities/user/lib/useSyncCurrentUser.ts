"use client";

import { useCurrentUserQuery } from "@/entities/user/lib/useCurrentUserQuery";

// Silently checks auth state — no redirect, unlike `useRequireRole`. For UI
// that renders on every page (navbar) and just needs to know whether
// someone is logged in. Shares the cache with any other guard mounted at
// the same time — React Query dedupes concurrent fetches by query key.
// The root layout prefetches this query server-side when a session cookie
// is present, so logged-in users get hydrated data on the first render
// instead of a guest-UI flash.
export function useSyncCurrentUser() {
  const { data: user } = useCurrentUserQuery();
  return user ?? null;
}
