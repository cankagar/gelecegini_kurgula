import { httpClient, toApiError } from "@/shared/api";
import type {
  Homework,
  HomeworkCreateInput,
  HomeworkUpdateInput,
} from "@/entities/homework/model/types";

export async function listHomework(classroomId: string) {
  try {
    const { data } = await httpClient.get<Homework[]>(
      `/v1/classrooms/${classroomId}/homework`
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function createHomework(classroomId: string, input: HomeworkCreateInput) {
  try {
    const { data } = await httpClient.post<Homework>(
      `/v1/classrooms/${classroomId}/homework`,
      input
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function updateHomework(
  classroomId: string,
  homeworkId: string,
  input: HomeworkUpdateInput
) {
  try {
    const { data } = await httpClient.patch<Homework>(
      `/v1/classrooms/${classroomId}/homework/${homeworkId}`,
      input
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function deleteHomework(classroomId: string, homeworkId: string) {
  try {
    await httpClient.delete(`/v1/classrooms/${classroomId}/homework/${homeworkId}`);
  } catch (err) {
    throw toApiError(err);
  }
}
