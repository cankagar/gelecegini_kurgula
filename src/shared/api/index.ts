// Public API for the `api` segment (base http client).
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/shared/config";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

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
