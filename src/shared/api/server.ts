// Server-only http client (RSC/route handlers). Forwards the incoming request's
// cookies to the backend since the browser's automatic cookie attachment
// (withCredentials) only applies to client-side requests.
import axios from "axios";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/shared/config";

export async function getServerHttpClient() {
  const cookieStore = await cookies();

  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
}
