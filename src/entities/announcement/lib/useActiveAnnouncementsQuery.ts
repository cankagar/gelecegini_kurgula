"use client";

import { useQuery } from "@tanstack/react-query";
import { listActiveAnnouncements } from "@/entities/announcement/api/announcementApi";

export function useActiveAnnouncementsQuery() {
  return useQuery({
    queryKey: ["announcements", "active"],
    queryFn: listActiveAnnouncements,
    staleTime: 5 * 60 * 1000,
  });
}
