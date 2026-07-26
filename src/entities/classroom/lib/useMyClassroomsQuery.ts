"use client";

import { useQuery } from "@tanstack/react-query";
import { listMyClassrooms } from "@/entities/classroom/api/classroomApi";

export function useMyClassroomsQuery() {
  return useQuery({
    queryKey: ["myClassrooms"],
    queryFn: listMyClassrooms,
    staleTime: 30 * 1000,
  });
}
