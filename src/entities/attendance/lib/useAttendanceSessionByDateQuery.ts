"use client";

import { useQuery } from "@tanstack/react-query";
import { getAttendanceSessionByDate } from "@/entities/attendance/api/attendanceApi";

export function useAttendanceSessionByDateQuery(
  classroomId: string,
  sessionDate: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["attendanceSession", classroomId, sessionDate],
    queryFn: () => getAttendanceSessionByDate(classroomId, sessionDate),
    enabled: Boolean(sessionDate) && enabled,
    staleTime: 10 * 1000,
  });
}
