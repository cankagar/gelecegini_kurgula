// Decodes the JWT payload to check `exp` — no signature verification. This
// is a UX-only check, not an authorization boundary; every real request
// still gets its `access_token` verified against Supabase's JWKS on the
// backend (see app/core/security.py). Reading `exp` locally means this
// check never needs a network call and never goes stale: unlike the
// `is_authenticated` flag cookie (which can outlive a dead session by
// weeks), an expired access token always reads as "not logged in" here.
export function hasValidAccessToken(token: string | undefined): boolean {
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
