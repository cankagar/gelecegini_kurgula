import type { AttendanceStatus } from "@/entities/attendance/model/types";

export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: "Geldi",
  absent: "Gelmedi",
};
