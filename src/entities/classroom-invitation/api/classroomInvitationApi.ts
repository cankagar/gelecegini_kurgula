import { httpClient, toApiError } from "@/shared/api";
import type {
  ClassroomInvitation,
  InvitationAcceptSignupPayload,
  InvitationCreateResult,
  InvitationInfo,
} from "@/entities/classroom-invitation/model/types";

// Admin-only — email STUDENT ise direkt eklenir, değilse davet e-postası gider.
export async function inviteStudent(classroomId: string, email: string) {
  try {
    const { data } = await httpClient.post<InvitationCreateResult>(
      `/v1/classrooms/${classroomId}/invitations`,
      { email }
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

// Admin-only — bir sınıfın tüm davetleri (bekleyen/süresi dolmuş/kabul edilmiş/iptal edilmiş).
export async function listClassroomInvitations(classroomId: string) {
  try {
    const { data } = await httpClient.get<ClassroomInvitation[]>(
      `/v1/classrooms/${classroomId}/invitations`
    );
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function revokeInvitation(classroomId: string, invitationId: string) {
  try {
    await httpClient.post(`/v1/classrooms/${classroomId}/invitations/${invitationId}/revoke`);
  } catch (err) {
    throw toApiError(err);
  }
}

export async function resendInvitation(classroomId: string, invitationId: string) {
  try {
    await httpClient.post(`/v1/classrooms/${classroomId}/invitations/${invitationId}/resend`);
  } catch (err) {
    throw toApiError(err);
  }
}

// Public — davet linkine gidince frontend'in signup mı accept mi göstereceğine karar vermesi için.
export async function getInvitationByToken(token: string) {
  try {
    const { data } = await httpClient.get<InvitationInfo>(`/v1/invitations/${token}`);
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}

// Public — hesabı olan, giriş yapmış kullanıcı daveti kabul eder.
export async function acceptInvitation(token: string) {
  try {
    await httpClient.post(`/v1/invitations/${token}/accept`);
  } catch (err) {
    throw toApiError(err);
  }
}

// Public — hesabı olmayan kullanıcı davet linkinden kayıt olur.
export async function acceptInvitationWithSignup(
  token: string,
  payload: InvitationAcceptSignupPayload
) {
  try {
    await httpClient.post(`/v1/invitations/${token}/accept-signup`, payload);
  } catch (err) {
    throw toApiError(err);
  }
}
