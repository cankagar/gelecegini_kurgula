import { httpClient, toApiError } from "@/shared/api";
import type { User } from "@/entities/user/model/types";

export async function getMe() {
  try {
    const { data } = await httpClient.get<User>("/v1/auth/me");
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}
