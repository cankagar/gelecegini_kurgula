"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudentAttendance } from "@/entities/attendance/api/attendanceApi";

export function useStudentAttendanceQuery(userId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["studentAttendance", userId],
    queryFn: () => getStudentAttendance(userId),
    enabled,
    staleTime: 60 * 1000,
  });
}
