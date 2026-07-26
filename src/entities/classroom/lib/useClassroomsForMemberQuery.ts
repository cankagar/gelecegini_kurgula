"use client";

import { useQuery } from "@tanstack/react-query";
import { listClassroomsForMember } from "@/entities/classroom/api/classroomApi";

export function useClassroomsForMemberQuery(userId: string) {
  return useQuery({
    queryKey: ["classroomsForMember", userId],
    queryFn: () => listClassroomsForMember(userId),
    staleTime: 30 * 1000,
  });
}
