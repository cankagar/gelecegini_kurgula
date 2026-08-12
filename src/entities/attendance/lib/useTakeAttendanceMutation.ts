"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { takeAttendance } from "@/entities/attendance/api/attendanceApi";
import type { AttendanceRecordInput } from "@/entities/attendance/model/types";

export function useTakeAttendanceMutation(classroomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { session_date: string; records: AttendanceRecordInput[] }) =>
      takeAttendance(classroomId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["attendanceSessions", classroomId] });
      queryClient.invalidateQueries({
        queryKey: ["attendanceSession", classroomId, variables.session_date],
      });
    },
  });
}
