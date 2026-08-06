"use client";

import { use } from "react";
import { AuthInvitationAcceptView } from "@/views/auth-invitation-accept";

export default function InvitationAcceptPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  return <AuthInvitationAcceptView token={token} />;
}
