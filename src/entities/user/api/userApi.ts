import { httpClient, toApiError } from "@/shared/api";
import type { AdminUser, User, UserRole } from "@/entities/user/model/types";

export async function getMe() {
  try {
    // Query is only enabled when `hasSessionFlag()` is true (see
    // useCurrentUserQuery), so a 401 here means the access token expired —
    // let the interceptor's refresh + retry run. It redirects to login only
    // if the refresh itself fails (refresh token invalid/expired too).
    const { data } = await httpClient.get<User>("/v1/auth/me");
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

// Admin veya öğretmen — backend öğretmen için `role` param'ını STUDENT'a
// sabitler, diğer roller için 403 döner.
export async function listUsers(params: { search?: string; role?: UserRole } = {}) {
  try {
    const { data } = await httpClient.get<AdminUser[]>("/v1/users", { params });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function getUserById(id: string) {
  try {
    const { data } = await httpClient.get<AdminUser>(`/v1/users/${id}`);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function updateUser(
  id: string,
  updates: {
    email?: string;
    first_name?: string;
    last_name?: string;
    is_active?: boolean;
  }
) {
  try {
    const { data } = await httpClient.patch<AdminUser>(`/v1/users/${id}`, updates);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function updateMe(updates: { first_name?: string; last_name?: string }) {
  try {
    const { data } = await httpClient.patch<User>("/v1/users/me", updates);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function addUserRole(id: string, role: UserRole) {
  try {
    const { data } = await httpClient.post<AdminUser>(`/v1/users/${id}/roles`, { role });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function removeUserRole(id: string, role: UserRole) {
  try {
    const { data } = await httpClient.delete<AdminUser>(`/v1/users/${id}/roles/${role}`);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}
