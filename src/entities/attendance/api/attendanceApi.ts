import { httpClient, toApiError } from "@/shared/api";
import type {
  AttendanceRecordInput,
  AttendanceSession,
  MyAttendanceRecord,
} from "@/entities/attendance/model/types";

export async function takeAttendance(
  classroomId: string,
  payload: { session_date: string; records: AttendanceRecordInput[] }
) {
  try {
    const { data } = await httpClient.post<AttendanceSession>(
      `/v1/classrooms/${classroomId}/attendance/sessions`,
      payload
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

// Backend o gün için henüz oturum yoksa 404 değil, 200 + null döner — "hiç
// yoklama alınmamış" burada hata değil, normal bir sonuçtur.
export async function getAttendanceSessionByDate(classroomId: string, sessionDate: string) {
  try {
    const { data } = await httpClient.get<AttendanceSession | null>(
      `/v1/classrooms/${classroomId}/attendance/sessions/by-date`,
      { params: { session_date: sessionDate } }
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function getMyAttendance() {
  try {
    const { data } = await httpClient.get<MyAttendanceRecord[]>("/v1/attendance/me");
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function getStudentAttendance(userId: string) {
  try {
    const { data } = await httpClient.get<MyAttendanceRecord[]>(
      `/v1/students/${userId}/attendance`
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}
