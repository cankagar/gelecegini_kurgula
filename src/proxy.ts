import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Server-side gate: a logged-in user should never see login/register/forgot-
// password — checked before the page renders, so there's no client-side
// flash of the form. Reset-password is excluded: it authenticates via a
// Supabase recovery token in the URL, independent of the session cookie, and
// an already-logged-in user can legitimately land there from an email link.
//
// `is_authenticated` is the non-httpOnly flag cookie the backend sets
// alongside the real (httpOnly) access/refresh tokens — same signal
// `hasSessionFlag()` uses client-side. It only proves a session might exist,
// not that the access token is still valid; an expired-but-refreshable
// session still counts as "logged in" here, which is the desired behavior.
export function proxy(request: NextRequest) {
  if (request.cookies.has("is_authenticated")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/auth/forgot-password"],
};
