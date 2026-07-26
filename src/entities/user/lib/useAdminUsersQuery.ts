"use client";

import { useQuery } from "@tanstack/react-query";
import { listUsers } from "@/entities/user/api/userApi";
import type { UserRole } from "@/entities/user/model/types";

export function useAdminUsersQuery(search: string, role?: UserRole) {
  return useQuery({
    queryKey: ["adminUsers", search, role],
    queryFn: () => listUsers({ search: search || undefined, role: search ? undefined : role }),
    staleTime: 30 * 1000,
  });
}
