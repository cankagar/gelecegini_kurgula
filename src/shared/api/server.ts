// Public API for the `api` segment's server-side http client (SSR/RSC).
import axios from "axios";
import { API_BASE_URL } from "@/shared/config";

// Server Components have no browser cookie jar (`withCredentials` is a
// no-op here), so the request's cookies must be forwarded explicitly per
// call. No 401 refresh/retry interceptor — there's no client redirect to
// fall back to during SSR; callers just let the request fail.
export function createServerHttpClient(cookieHeader: string) {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });
}
