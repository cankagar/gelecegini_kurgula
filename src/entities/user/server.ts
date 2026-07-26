// Server-only public API for the `user` entity. Kept separate from `index.ts`
// so client components importing that barrel never pull `next/headers` in.
import { cache } from "react";
import { redirect } from "next/navigation";
import { getServerHttpClient } from "@/shared/api/server";
import { toApiError } from "@/shared/api";
import type { User, UserRole } from "@/entities/user/model/types";

// React `cache` dedupes this within a single request — layout + page can both
// call it without an extra network round-trip.
export const getMeServer = cache(async function getMeServer() {
  try {
    const client = await getServerHttpClient();
    const { data } = await client.get<User>("/v1/auth/me");
    return data;
  } catch (err) {
    throw toApiError(err);
  }
});

export async function requireUser() {
  const user = await getMeServer().catch(() => null);
  if (!user) {
    redirect("/auth/login");
  }
  return user;
}

export async function requireRole(role: UserRole) {
  const user = await requireUser();
  if (user.role !== role) {
    redirect("/dashboard");
  }
  return user;
}
