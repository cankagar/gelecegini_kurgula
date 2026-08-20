"use client";

import { useQuery } from "@tanstack/react-query";
import { listClassrooms } from "@/entities/classroom/api/classroomApi";

export const CLASSROOMS_PAGE_SIZE = 15;

export function useClassroomsQuery(page: number, search?: string, isClosed?: boolean) {
  return useQuery({
    queryKey: ["classrooms", page, search ?? "", isClosed ?? "all"],
    queryFn: () =>
      listClassrooms({
        skip: (page - 1) * CLASSROOMS_PAGE_SIZE,
        limit: CLASSROOMS_PAGE_SIZE,
        search,
        isClosed,
      }),
    staleTime: 30 * 1000,
  });
}
