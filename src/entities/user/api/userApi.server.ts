import { toApiError } from "@/shared/api";
import { createServerHttpClient } from "@/shared/api/server";
import type { User } from "@/entities/user/model/types";

// Server-side counterpart of `getMe`, for prefetching the current-user
// query during SSR (root layout) so the client never renders a "guest"
// flash before the real session state is known.
export async function getMeServer(cookieHeader: string) {
  try {
    const serverHttpClient = createServerHttpClient(cookieHeader);
    const { data } = await serverHttpClient.get<User>("/v1/auth/me");
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}
