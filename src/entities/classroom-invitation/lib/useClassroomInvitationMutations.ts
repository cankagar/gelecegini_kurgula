"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  inviteStudent,
  resendInvitation,
  revokeInvitation,
} from "@/entities/classroom-invitation/api/classroomInvitationApi";

export function useClassroomInvitationMutations(classroomId: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["classroomInvitations", classroomId] });
    // "added" sonucu direkt üyeliğe dönüşebiliyor — sınıf/üye listeleri de tazelenmeli.
    queryClient.invalidateQueries({ queryKey: ["classroom", classroomId] });
    queryClient.invalidateQueries({ queryKey: ["classrooms"] });
  };

  const invite = useMutation({
    mutationFn: (email: string) => inviteStudent(classroomId, email),
    onSuccess: invalidate,
  });

  const revoke = useMutation({
    mutationFn: (invitationId: string) => revokeInvitation(classroomId, invitationId),
    onSuccess: invalidate,
  });

  const resend = useMutation({
    mutationFn: (invitationId: string) => resendInvitation(classroomId, invitationId),
    onSuccess: invalidate,
  });

  return { invite, revoke, resend };
}
