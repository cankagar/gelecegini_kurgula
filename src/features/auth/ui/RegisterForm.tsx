"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MailIcon, LockIcon, UserIcon } from "@/shared/ui/icons";
import { AuthFormError, AuthSubmitButton } from "@/widgets/auth-shell";
import { AuthTextInput, AuthPasswordInput } from "@/features/auth/ui/AuthInput";
import { registerAccount } from "@/features/auth/api/authApi";
import { ApiError } from "@/shared/api";

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mismatchHint, setMismatchHint] = useState(false);

  useEffect(() => {
    if (!confirmPassword) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- boş alanda hemen temizle, debounce gerekmez
      setMismatchHint(false);
      return;
    }
    const id = setTimeout(() => setMismatchHint(password !== confirmPassword), 200);
    return () => clearTimeout(id);
  }, [password, confirmPassword]);

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

    setLoading(true);
    try {
      const result = await registerAccount({ email, password, full_name: fullName || undefined });
      if (result.email_confirmation_required) {
        router.push("/auth/login?verify=1");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Kayıt oluşturulamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-7">
        <h2 className="font-heading text-[1.55rem] font-bold text-text tracking-[-0.02em]">Hesap Oluştur</h2>
        <p className="text-[0.85rem] text-text-muted mt-1.5">STEM topluluğuna katıl, öğrenmeye hemen başla.</p>
      </div>

      <AuthFormError message={error} />

      <div className="flex flex-col gap-4">
        <AuthTextInput
          label="Ad Soyad"
          value={fullName}
          onChange={setFullName}
          icon={<UserIcon size={17} />}
          placeholder="Adın Soyadın"
          autoComplete="name"
        />
        <AuthTextInput
          label="E-posta"
          type="email"
          value={email}
          onChange={setEmail}
          icon={<MailIcon size={17} />}
          placeholder="ad@example.com"
          autoComplete="email"
          required
        />
        <AuthPasswordInput
          label="Şifre"
          value={password}
          onChange={setPassword}
          icon={<LockIcon size={17} />}
          placeholder="En az 8 karakter"
          autoComplete="new-password"
          required
        />
        <div>
          <AuthPasswordInput
            label="Şifre (Tekrar)"
            value={confirmPassword}
            onChange={setConfirmPassword}
            icon={<LockIcon size={17} />}
            placeholder="Şifreni tekrar gir"
            autoComplete="new-password"
            required
          />
          {mismatchHint && <p className="mt-1.5 text-[0.75rem] font-medium text-danger">Şifreler eşleşmiyor.</p>}
        </div>
      </div>

      <div className="mt-7">
        <AuthSubmitButton loading={loading}>Kayıt Ol</AuthSubmitButton>
      </div>

      <p className="mt-5 text-center text-[0.72rem] text-text-muted leading-[1.6]">
        Kayıt olarak Kullanım Şartları ve Gizlilik Politikası&rsquo;nı kabul etmiş olursun.
      </p>
    </form>
  );
}
