import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_TOKEN_COOKIE = "access_token";

// Decodes the JWT payload to check `exp` — no signature verification. This
// is a UX-only redirect gate, not an authorization boundary; every real
// request still gets its `access_token` verified against Supabase's JWKS on
// the backend (see app/core/security.py). Reading `exp` locally means this
// check never needs a network call and never goes stale: unlike the
// `is_authenticated` flag cookie (which can outlive a dead session by
// weeks), an expired access token always reads as "not logged in" here, so
// a user is never locked out of the auth pages.
function hasValidAccessToken(token: string | undefined): boolean {
  if (!token) return false;
  const payloadSegment = token.split(".")[1];
  if (!payloadSegment) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadSegment, "base64url").toString("utf8"));
    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// Server-side gate: a logged-in user should never see login/register/forgot-
// password — checked before the page renders, so there's no client-side
// flash of the form. Reset-password is excluded: it authenticates via a
// Supabase recovery token in the URL, independent of the session cookie, and
// an already-logged-in user can legitimately land there from an email link.
export function proxy(request: NextRequest) {
  if (hasValidAccessToken(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/auth/forgot-password"],
};
