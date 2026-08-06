import { httpClient, toApiError } from "@/shared/api";
import type {
  StudentDemographics,
  StudentDemographicsUpdate,
} from "@/entities/student-demographics/model/types";

export async function getMyDemographics() {
  try {
    const { data } = await httpClient.get<StudentDemographics>("/v1/students/me/demographics");
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function updateMyDemographics(updates: StudentDemographicsUpdate) {
  try {
    const { data } = await httpClient.patch<StudentDemographics>(
      "/v1/students/me/demographics",
      updates
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}
