"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthFormError, AuthSubmitButton } from "@/shared/ui/auth-form";
import { useAcceptInvitationMutation } from "@/entities/classroom-invitation";
import type { User } from "@/entities/user";
import { ApiError } from "@/shared/api";

type InvitationAcceptConfirmProps = {
  token: string;
  invitationEmail: string;
  classroomName: string;
  currentUser: User | null | undefined;
};

// Hesabı olan kullanıcı için — giriş durumuna ve e-posta eşleşmesine göre
// üç farklı hâl gösterir: giriş yapması gerekiyor / yanlış hesapla girmiş / kabul edebilir.
export function InvitationAcceptConfirm({
  token,
  invitationEmail,
  classroomName,
  currentUser,
}: InvitationAcceptConfirmProps) {
  const router = useRouter();
  const accept = useAcceptInvitationMutation(token);

  async function handleAccept(e: FormEvent) {
    e.preventDefault();
    try {
      await accept.mutateAsync();
      router.push("/dashboard");
      router.refresh();
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  if (currentUser === undefined) {
    return null;
  }

  if (currentUser === null) {
    return (
      <div>
        <div className="mb-7">
          <h2 className="font-heading text-[1.55rem] font-bold text-text tracking-[-0.02em]">Daveti Kabul Et</h2>
          <p className="text-[0.85rem] text-text-muted mt-1.5">
            <strong className="text-text">{classroomName}</strong> sınıfına davet edildin. Devam etmek için{" "}
            <strong className="text-text">{invitationEmail}</strong> hesabıyla giriş yap.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-hover"
        >
          Giriş Yap
        </Link>
        <p className="mt-4 text-center text-[0.78rem] text-text-muted">
          Giriş yaptıktan sonra bu davet linkine tekrar tıklaman gerekiyor.
        </p>
      </div>
    );
  }

  if ((currentUser.email ?? "").toLowerCase() !== invitationEmail.toLowerCase()) {
    return (
      <div>
        <h2 className="font-heading text-[1.55rem] font-bold text-text tracking-[-0.02em]">Daveti Kabul Et</h2>
        <AuthFormError
          message={`Bu davet sana ait değil. ${invitationEmail} hesabıyla giriş yapman gerekiyor.`}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleAccept}>
      <div className="mb-7">
        <h2 className="font-heading text-[1.55rem] font-bold text-text tracking-[-0.02em]">Daveti Kabul Et</h2>
        <p className="text-[0.85rem] text-text-muted mt-1.5">
          <strong className="text-text">{classroomName}</strong> sınıfına katılmak üzeresin.
        </p>
      </div>

      <AuthFormError message={accept.isError ? (accept.error as ApiError).message : null} />

      <AuthSubmitButton loading={accept.isPending}>Sınıfa Katıl</AuthSubmitButton>
    </form>
  );
}
