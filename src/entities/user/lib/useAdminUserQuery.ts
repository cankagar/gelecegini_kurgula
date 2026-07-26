"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/entities/user/api/userApi";

export function useAdminUserQuery(id: string) {
  return useQuery({
    queryKey: ["adminUser", id],
    queryFn: () => getUserById(id),
    staleTime: 30 * 1000,
  });
}
