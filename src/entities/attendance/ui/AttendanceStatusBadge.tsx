import type { AttendanceStatus } from "@/entities/attendance/model/types";
import { ATTENDANCE_STATUS_LABELS } from "@/entities/attendance/model/labels";

type AttendanceStatusBadgeProps = {
  status: AttendanceStatus;
};

export function AttendanceStatusBadge({ status }: AttendanceStatusBadgeProps) {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[0.75rem] font-medium ${
        status === "present" ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
      }`}
    >
      {ATTENDANCE_STATUS_LABELS[status]}
    </span>
  );
}
