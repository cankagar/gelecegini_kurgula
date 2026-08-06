"use client";

import { useState } from "react";
import { AuthShell } from "@/widgets/auth-shell";
import { AuthFormError } from "@/shared/ui/auth-form";
import { SpinnerIcon } from "@/shared/ui/icons";
import { useInvitationTokenQuery } from "@/entities/classroom-invitation";
import { hasSessionFlag, useCurrentUserQuery } from "@/entities/user";
import { InvitationAcceptConfirm, InvitationSignupForm } from "@/features/classroom-invitations";
import { useRedirectToRoleHome } from "@/features/dashboard-access";

type AuthInvitationAcceptViewProps = {
  token: string;
};

export function AuthInvitationAcceptView({ token }: AuthInvitationAcceptViewProps) {
  const { data: invitation, isLoading, isError } = useInvitationTokenQuery(token);

  // Sayfa public — oturum olmayabilir. `useCurrentUserQuery` disabled kaldığında
  // sonsuza dek "pending" kalır, o yüzden session cookie'siz durumu ayrıca
  // ele alıp net bir "giriş yapmamış" (null) sonucuna çeviriyoruz.
  const hasSession = hasSessionFlag();
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useCurrentUserQuery();
  const currentUser = !hasSession ? null : isUserLoading ? undefined : isUserError ? null : user ?? null;

  // Signup formu başarıyla tamamlanınca (accept-signup oturumu otomatik
  // açtıysa) kullanıcıyı kendi rolünün dashboard'ına yönlendiriyoruz. İki
  // feature'ı (classroom-invitations + dashboard-access) birleştirmek view'in
  // işi — feature'lar birbirini FSD gereği import edemez.
  const [signupCompleted, setSignupCompleted] = useState(false);
  useRedirectToRoleHome({ enabled: signupCompleted && hasSessionFlag() });

  return (
    <AuthShell
      eyebrow="Sınıf Daveti"
      title="Bir sınıfa davet edildin."
      description="Devam etmek için hesabını oluştur veya mevcut hesabınla giriş yap."
    >
      {isLoading && (
        <div className="flex justify-center py-10 text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      <AuthFormError
        message={isError ? "Bu davet linki geçersiz, süresi dolmuş veya zaten kullanılmış." : null}
      />

      {invitation && !invitation.account_exists && (
        <InvitationSignupForm
          token={token}
          email={invitation.email}
          classroomName={invitation.classroom_name}
          onSuccess={() => setSignupCompleted(true)}
        />
      )}

      {invitation && invitation.account_exists && (
        <InvitationAcceptConfirm
          token={token}
          invitationEmail={invitation.email}
          classroomName={invitation.classroom_name}
          currentUser={currentUser}
        />
      )}
    </AuthShell>
  );
}
