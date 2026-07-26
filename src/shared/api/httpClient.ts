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

function redirectToLogin() {
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
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

    refreshPromise ??= httpClient
      .post(REFRESH_URL, undefined, { skipAuthRetry: true })
      .finally(() => {
        refreshPromise = null;
      });

    try {
      await refreshPromise;
    } catch {
      redirectToLogin();
      throw error;
    }

    return httpClient(config);
  }
);

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function toApiError(err: unknown): ApiError {
  if (err instanceof AxiosError) {
    const detail = err.response?.data?.detail;
    const message =
      typeof detail === "string" ? detail : "Bir şeyler ters gitti. Lütfen tekrar deneyin.";
    return new ApiError(message, err.response?.status ?? 0);
  }
  return new ApiError("Bir şeyler ters gitti. Lütfen tekrar deneyin.", 0);
}
