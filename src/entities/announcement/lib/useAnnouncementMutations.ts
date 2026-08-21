"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  type CreateAnnouncementParams,
  type UpdateAnnouncementParams,
} from "@/entities/announcement/api/announcementApi";

export function useAnnouncementMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["announcements"] });

  const create = useMutation({
    mutationFn: (params: CreateAnnouncementParams) => createAnnouncement(params),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, params }: { id: string; params: UpdateAnnouncementParams }) =>
      updateAnnouncement(id, params),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (announcementId: string) => deleteAnnouncement(announcementId),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
