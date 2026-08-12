"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyAttendance } from "@/entities/attendance/api/attendanceApi";

export function useMyAttendanceQuery() {
  return useQuery({
    queryKey: ["myAttendance"],
    queryFn: getMyAttendance,
    staleTime: 60 * 1000,
  });
}
