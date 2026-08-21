"use client";

import { useQuery } from "@tanstack/react-query";
import { listAllAnnouncements } from "@/entities/announcement/api/announcementApi";

export const ANNOUNCEMENTS_PAGE_SIZE = 20;

export function useAllAnnouncementsQuery(page: number) {
  return useQuery({
    queryKey: ["announcements", "all", page],
    queryFn: () =>
      listAllAnnouncements({
        skip: (page - 1) * ANNOUNCEMENTS_PAGE_SIZE,
        limit: ANNOUNCEMENTS_PAGE_SIZE,
      }),
    staleTime: 15 * 1000,
  });
}
