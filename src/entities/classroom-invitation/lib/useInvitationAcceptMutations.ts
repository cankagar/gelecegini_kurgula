"use client";

import { useMutation } from "@tanstack/react-query";
import {
  acceptInvitation,
  acceptInvitationWithSignup,
} from "@/entities/classroom-invitation/api/classroomInvitationApi";
import type { InvitationAcceptSignupPayload } from "@/entities/classroom-invitation/model/types";

// Public — hesabı olan, giriş yapmış kullanıcı için.
export function useAcceptInvitationMutation(token: string) {
  return useMutation({
    mutationFn: () => acceptInvitation(token),
  });
}

// Public — hesabı olmayan kullanıcının davet linkinden kayıt olması için.
export function useAcceptInvitationWithSignupMutation(token: string) {
  return useMutation({
    mutationFn: (payload: InvitationAcceptSignupPayload) =>
      acceptInvitationWithSignup(token, payload),
  });
}
