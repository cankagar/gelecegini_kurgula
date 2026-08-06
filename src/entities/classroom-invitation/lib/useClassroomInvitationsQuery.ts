"use client";

import { useQuery } from "@tanstack/react-query";
import { listClassroomInvitations } from "@/entities/classroom-invitation/api/classroomInvitationApi";

export function useClassroomInvitationsQuery(classroomId: string) {
  return useQuery({
    queryKey: ["classroomInvitations", classroomId],
    queryFn: () => listClassroomInvitations(classroomId),
    staleTime: 15 * 1000,
  });
}
