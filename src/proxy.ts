import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasValidAccessToken } from "@/shared/lib/auth-token";

const ACCESS_TOKEN_COOKIE = "access_token";

// Server-side gate: a logged-in user should never see login/forgot-password —
// checked before the page renders, so there's no client-side flash of the
// form. Reset-password is excluded: it authenticates via a Supabase recovery
// token in the URL, independent of the session cookie, and an already-logged-in
// user can legitimately land there from an email link. Registration is no
// longer public (account creation only happens via classroom invitation), so
// /auth/register isn't a route here anymore.
export function proxy(request: NextRequest) {
  if (hasValidAccessToken(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/forgot-password"],
};
