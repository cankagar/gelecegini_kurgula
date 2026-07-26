import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge-level auth check for /dashboard routes. Only verifies the access
// token cookie's presence — role matching still happens client-side
// (useRequireRole), since role isn't decodable from an httpOnly cookie here.
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("access_token");

  if (!hasSession) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
