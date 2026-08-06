"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { LockIcon, MailIcon, SpinnerIcon, UserIcon } from "@/shared/ui/icons";
import { AuthFormError, AuthFormSuccess, AuthSubmitButton } from "@/shared/ui/auth-form";
import { AuthTextInput, AuthPasswordInput } from "@/shared/ui/auth-input";
import { useAcceptInvitationWithSignupMutation } from "@/entities/classroom-invitation";
import { hasSessionFlag } from "@/entities/user";
import { ApiError } from "@/shared/api";

type InvitationSignupFormProps = {
  token: string;
  email: string;
  classroomName: string;
  // Dashboard'a yönlendirme kararı (rol bazlı) bu feature'ın işi değil —
  // FSD'de feature'lar birbirini import edemez, o yüzden bu karar view'e ait.
  onSuccess?: () => void;
};

// Hesabı olmayan kullanıcı davet linkinden kayıt olur — backend hesabı oluşturup
// direkt STUDENT olarak sınıfa ekler. E-posta doğrulaması kapalıysa (bkz.
// accept-signup endpoint'i) oturum da otomatik açılır; bu durumu sadece
// kendi gösterimimiz (spinner vs. giriş linki) için `hasSessionFlag()` ile okuyoruz.
export function InvitationSignupForm({
  token,
  email,
  classroomName,
  onSuccess,
}: InvitationSignupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const signup = useAcceptInvitationWithSignupMutation(token);
  const autoLoggedIn = signup.isSuccess && hasSessionFlag();

  useEffect(() => {
    if (signup.isSuccess) onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- yalnızca başarı anında bir kez tetiklenmeli
  }, [signup.isSuccess]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Şifre en az 8 karakter olmalı.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    try {
      await signup.mutateAsync({
        password,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Kayıt oluşturulamadı. Lütfen tekrar deneyin.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-7">
        <h2 className="font-heading text-[1.55rem] font-bold text-text tracking-[-0.02em]">Daveti Kabul Et</h2>
        <p className="text-[0.85rem] text-text-muted mt-1.5">
          <strong className="text-text">{classroomName}</strong> sınıfına katılmak için hesabını oluştur.
        </p>
      </div>

      <AuthFormError message={error} />
      <AuthFormSuccess
        message={
          signup.isSuccess
            ? autoLoggedIn
              ? `Hesabın oluşturuldu ve ${classroomName} sınıfına eklendin.`
              : `Hesabın oluşturuldu ve ${classroomName} sınıfına eklendin. Giriş yapabilirsin.`
            : null
        }
      />

      {!signup.isSuccess && (
        <>
          <div className="flex flex-col gap-4">
            <AuthTextInput
              label="E-posta"
              type="email"
              value={email}
              onChange={() => {}}
              icon={<MailIcon size={17} />}
              autoComplete="email"
              disabled
            />
            <div className="grid grid-cols-2 gap-3">
              <AuthTextInput
                label="Ad"
                value={firstName}
                onChange={setFirstName}
                icon={<UserIcon size={17} />}
                placeholder="Adın"
                autoComplete="given-name"
              />
              <AuthTextInput
                label="Soyad"
                value={lastName}
                onChange={setLastName}
                icon={<UserIcon size={17} />}
                placeholder="Soyadın"
                autoComplete="family-name"
              />
            </div>
            <AuthPasswordInput
              label="Şifre"
              value={password}
              onChange={setPassword}
              icon={<LockIcon size={17} />}
              placeholder="En az 8 karakter"
              autoComplete="new-password"
              required
            />
            <AuthPasswordInput
              label="Şifre (Tekrar)"
              value={confirmPassword}
              onChange={setConfirmPassword}
              icon={<LockIcon size={17} />}
              placeholder="Şifreni tekrar gir"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="mt-7">
            <AuthSubmitButton loading={signup.isPending}>Hesap Oluştur ve Katıl</AuthSubmitButton>
          </div>
        </>
      )}

      {signup.isSuccess && (
        <div className="mt-2">
          {autoLoggedIn ? (
            <div className="flex items-center justify-center gap-2 text-[0.85rem] text-text-muted">
              <SpinnerIcon className="animate-spin" size={16} />
              Panele yönlendiriliyorsun...
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-hover"
            >
              Giriş Yap
            </Link>
          )}
        </div>
      )}
    </form>
  );
}
