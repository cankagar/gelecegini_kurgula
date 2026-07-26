"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/features/auth/api/authApi";

// Clears the session (backend + the cached current-user query) and sends
// the user home. Shared by every "Çıkış Yap" button (navbar, dashboard
// sidebar) so the cache-invalidation step can't drift between them.
// The query has a 5min staleTime, so without removing it the navbar would
// keep rendering the logged-out user's profile icon until it expires.
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return async function handleLogout() {
    await logout().catch(() => {});
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    router.push("/");
    router.refresh();
  };
}
