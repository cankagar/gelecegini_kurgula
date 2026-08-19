"use client";

import { useQuery } from "@tanstack/react-query";
import { listHomework } from "@/entities/homework/api/homeworkApi";

export function useHomeworkQuery(classroomId: string) {
  return useQuery({
    queryKey: ["homework", classroomId],
    queryFn: () => listHomework(classroomId),
    staleTime: 30 * 1000,
  });
}
