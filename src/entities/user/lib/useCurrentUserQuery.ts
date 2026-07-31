"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/entities/user/api/userApi";

// `is_authenticated` is a non-httpOnly flag cookie the backend sets alongside
// the real (httpOnly) access/refresh tokens — readable here only to decide
// whether a session might exist, never used for authorization itself.
function hasSessionFlag(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c.startsWith("is_authenticated="));
}

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    enabled: hasSessionFlag(),
  });
}
