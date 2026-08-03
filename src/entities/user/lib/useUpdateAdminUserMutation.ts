"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserRole, removeUserRole, updateUser } from "@/entities/user/api/userApi";
import type { UserRole } from "@/entities/user/model/types";

export function useUpdateAdminUserMutation(userId: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["adminUser", userId] });
    queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
  };

  const updateFields = useMutation({
    mutationFn: (updates: { email?: string; full_name?: string; is_active?: boolean }) =>
      updateUser(userId, updates),
    onSuccess: invalidate,
  });

  const addRole = useMutation({
    mutationFn: (role: UserRole) => addUserRole(userId, role),
    onSuccess: invalidate,
  });

  const removeRole = useMutation({
    mutationFn: (role: UserRole) => removeUserRole(userId, role),
    onSuccess: invalidate,
  });

  return { updateFields, addRole, removeRole };
}
