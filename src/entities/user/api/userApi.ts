import { httpClient, toApiError } from "@/shared/api";
import type { User } from "@/entities/user/model/types";

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
