"use client";

import { useQuery } from "@tanstack/react-query";
import { listClassrooms } from "@/entities/classroom/api/classroomApi";

export function useClassroomsQuery(search?: string) {
  return useQuery({
    queryKey: ["classrooms", search ?? ""],
    queryFn: () => listClassrooms(search),
    staleTime: 30 * 1000,
  });
}
