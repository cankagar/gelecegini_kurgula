"use client";

import { useQuery } from "@tanstack/react-query";
import { listClassroomsForMember } from "@/entities/classroom/api/classroomApi";

export function useClassroomsForMemberQuery(userId: string, enabled = true) {
  return useQuery({
    queryKey: ["classroomsForMember", userId],
    queryFn: () => listClassroomsForMember(userId),
    enabled,
    staleTime: 30 * 1000,
  });
}
