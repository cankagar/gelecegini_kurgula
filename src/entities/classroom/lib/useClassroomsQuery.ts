"use client";

import { useQuery } from "@tanstack/react-query";
import { listClassrooms } from "@/entities/classroom/api/classroomApi";

export function useClassroomsQuery() {
  return useQuery({
    queryKey: ["classrooms"],
    queryFn: listClassrooms,
    staleTime: 30 * 1000,
  });
}
