"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/entities/user/api/userApi";

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  });
}
