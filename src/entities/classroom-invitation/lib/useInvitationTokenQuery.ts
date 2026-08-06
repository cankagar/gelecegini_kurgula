"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvitationByToken } from "@/entities/classroom-invitation/api/classroomInvitationApi";

// Public — davet linkine (/invitations/[token]) gidince çalışır, auth gerektirmez.
export function useInvitationTokenQuery(token: string) {
  return useQuery({
    queryKey: ["invitationToken", token],
    queryFn: () => getInvitationByToken(token),
    staleTime: 30 * 1000,
    retry: false,
  });
}
