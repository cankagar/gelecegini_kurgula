import { httpClient, toApiError } from "@/shared/api";
import type { AdminUser, User, UserRole } from "@/entities/user/model/types";

export async function getMe() {
  try {
    // Just an auth check — on 401 the caller decides what happens (clear
    // store, soft-redirect). Must not trigger the interceptor's refresh +
    // hard `window.location` redirect, or every page (incl. /auth/login,
    // which also renders the navbar) reload-loops when there's no valid
    // session.
    const { data } = await httpClient.get<User>("/v1/auth/me", { skipAuthRetry: true });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

// Admin-only — backend rejects with 403 for non-admins.
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
  updates: { email?: string; full_name?: string; is_active?: boolean }
) {
  try {
    const { data } = await httpClient.patch<AdminUser>(`/v1/users/${id}`, updates);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function updateUserRole(id: string, role: UserRole) {
  try {
    const { data } = await httpClient.patch<AdminUser>(`/v1/users/${id}/role`, { role });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}
