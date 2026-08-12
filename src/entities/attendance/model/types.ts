export type AttendanceStatus = "present" | "absent";

export type AttendanceRecordInput = {
  student_id: string;
  status: AttendanceStatus;
  note?: string | null;
};

export type AttendanceRecord = {
  student_id: string;
  status: AttendanceStatus;
  note: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
};

export type AttendanceSession = {
  id: string;
  classroom_id: string;
  session_date: string;
  taken_by: string;
  created_at: string;
  updated_at: string;
  records: AttendanceRecord[];
};

export type MyAttendanceRecord = {
  classroom_id: string;
  classroom_name: string;
  session_date: string;
  status: AttendanceStatus;
  note: string | null;
};
