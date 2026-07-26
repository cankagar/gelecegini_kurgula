"use client";

import { useQuery } from "@tanstack/react-query";
import { getClassroomById } from "@/entities/classroom/api/classroomApi";

export function useClassroomQuery(id: string) {
  return useQuery({
    queryKey: ["classroom", id],
    queryFn: () => getClassroomById(id),
    staleTime: 30 * 1000,
  });
}
