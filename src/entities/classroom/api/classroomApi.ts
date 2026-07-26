import { httpClient, toApiError } from "@/shared/api";
import type {
  Classroom,
  ClassroomMember,
  ClassroomWithMembers,
} from "@/entities/classroom/model/types";

// Admin-only — backend rejects with 403 for non-admins.
export async function listClassrooms() {
  try {
    const { data } = await httpClient.get<Classroom[]>("/v1/classrooms");
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

// Any authenticated user — returns the classrooms *they* belong to.
export async function listMyClassrooms() {
  try {
    const { data } = await httpClient.get<Classroom[]>("/v1/classrooms/me");
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

// Admin-only — classrooms a given user belongs to (e.g. for a user's profile page).
export async function listClassroomsForMember(userId: string) {
  try {
    const { data } = await httpClient.get<Classroom[]>(`/v1/classrooms/members/${userId}`);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function getClassroomById(id: string) {
  try {
    const { data } = await httpClient.get<ClassroomWithMembers>(`/v1/classrooms/${id}`);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function createClassroom(name: string) {
  try {
    const { data } = await httpClient.post<Classroom>("/v1/classrooms", { name });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function updateClassroom(id: string, name: string) {
  try {
    const { data } = await httpClient.patch<Classroom>(`/v1/classrooms/${id}`, { name });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function deleteClassroom(id: string) {
  try {
    await httpClient.delete(`/v1/classrooms/${id}`);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function addMemberToClassroom(classroomId: string, memberId: string) {
  try {
    const { data } = await httpClient.post<ClassroomMember>(
      `/v1/classrooms/${classroomId}/members`,
      { member_id: memberId }
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function removeMemberFromClassroom(classroomId: string, memberId: string) {
  try {
    await httpClient.delete(`/v1/classrooms/${classroomId}/members/${memberId}`);
  } catch (err) {
    throw toApiError(err);
  }
}
