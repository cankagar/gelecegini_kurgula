"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/entities/user/api/userApi";

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: { first_name?: string; last_name?: string }) => updateMe(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
