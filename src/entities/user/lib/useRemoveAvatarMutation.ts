"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAvatar } from "@/entities/user/api/userApi";

// Admin-only — backend router bunu `require_role(ADMIN)` ile korur.
export function useRemoveAvatarMutation(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeAvatar(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["adminUser", userId] });
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });
}
