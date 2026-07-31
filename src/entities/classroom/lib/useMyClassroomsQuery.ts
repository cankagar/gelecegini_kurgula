"use client";

import { useQuery } from "@tanstack/react-query";
import { listMyClassrooms } from "@/entities/classroom/api/classroomApi";

export function useMyClassroomsQuery(search?: string) {
  return useQuery({
    queryKey: ["myClassrooms", search ?? ""],
    queryFn: () => listMyClassrooms(search),
    staleTime: 30 * 1000,
  });
}
