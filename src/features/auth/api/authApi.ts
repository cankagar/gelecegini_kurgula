import { httpClient, toApiError } from "@/shared/api";
import type {
  AuthResponse,
  LoginPayload,
  PasswordResetConfirmPayload,
  PasswordResetPayload,
  RegisterPayload,
  RegisterResponse,
} from "@/features/auth/model/types";

export async function registerAccount(payload: RegisterPayload) {
  try {
    const { data } = await httpClient.post<RegisterResponse>("/v1/auth/register", payload);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function login(payload: LoginPayload) {
  try {
    const { data } = await httpClient.post<AuthResponse>("/v1/auth/login", payload);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function logout() {
  try {
    await httpClient.post<void>("/v1/auth/logout");
  } catch (err) {
    throw toApiError(err);
  }
}

export async function requestPasswordReset(payload: PasswordResetPayload) {
  try {
    await httpClient.post<void>("/v1/auth/password-reset", payload);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function confirmPasswordReset(payload: PasswordResetConfirmPayload) {
  try {
    await httpClient.post<void>("/v1/auth/password-reset/confirm", payload);
  } catch (err) {
    throw toApiError(err);
  }
}
