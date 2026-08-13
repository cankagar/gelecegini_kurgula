import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/shared/config";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const REFRESH_URL = "/v1/auth/refresh";

declare module "axios" {
  export interface AxiosRequestConfig {
    /** 401 sonrası refresh+retry akışına girmesin — login/register/refresh isteklerinde set edilir. */
    skipAuthRetry?: boolean;
  }
}

type RetryableConfig = AxiosRequestConfig & { _retried?: boolean };

let refreshPromise: Promise<unknown> | null = null;

// Supabase rotates the refresh token on every use — two concurrent refresh
// calls with the same (stale) token would race: one succeeds and rotates it,
// the other fails and the failure handler clears the (now valid) cookies.
// `refreshPromise` only dedupes within this tab; `navigator.locks` also
// serializes across tabs, so a second tab's refresh request is only actually
// sent after the first tab's has completed and updated the session cookies.
async function refreshSession(): Promise<void> {
  const doRefresh = () =>
    (refreshPromise ??= httpClient
      .post(REFRESH_URL, undefined, { skipAuthRetry: true })
      .finally(() => {
        refreshPromise = null;
      }));

  if (typeof navigator !== "undefined" && "locks" in navigator) {
    await navigator.locks.request("payastem-auth-refresh", () => doRefresh());
  } else {
    await doRefresh();
  }
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableConfig | undefined;
    const isUnauthorized = error.response?.status === 401;

    if (!isUnauthorized || !config || config._retried || config.skipAuthRetry) {
      throw error;
    }

    config._retried = true;

    try {
      await refreshSession();
    } catch {
      // Refresh failed — genuinely logged out. Don't navigate here: this
      // client is used on public pages too (e.g. navbar's silent user
      // check), which must never force a redirect. Callers that require a
      // session (useRequireAuth/useRequireRole) redirect on their own.
      throw error;
    }

    return httpClient(config);
  }
);

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export class ApiError extends Error {
  status: number;
  code: string;
  errors?: ApiErrorDetail[];

  constructor(message: string, status: number, code: string, errors?: ApiErrorDetail[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

const FALLBACK_MESSAGE = "Bir şeyler ters gitti. Lütfen tekrar deneyin.";

export function toApiError(err: unknown): ApiError {
  if (err instanceof AxiosError) {
    const data = err.response?.data;
    const message = typeof data?.message === "string" ? data.message : FALLBACK_MESSAGE;
    const code = typeof data?.code === "string" ? data.code : "UNKNOWN_ERROR";
    return new ApiError(message, err.response?.status ?? 0, code, data?.errors);
  }
  return new ApiError(FALLBACK_MESSAGE, 0, "UNKNOWN_ERROR");
}
