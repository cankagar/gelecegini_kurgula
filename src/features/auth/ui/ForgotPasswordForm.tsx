"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MailIcon } from "@/shared/ui/icons";
import { AuthFormError, AuthFormSuccess, AuthSubmitButton } from "@/widgets/auth-shell";
import { AuthTextInput } from "@/features/auth/ui/AuthInput";
import { requestPasswordReset } from "@/features/auth/api/authApi";
import { ApiError } from "@/shared/api";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await requestPasswordReset({ email });
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "İstek gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-7">
        <span className="inline-flex items-center rounded-full bg-primary-tint px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-3">
          Şifre Sıfırlama
        </span>
        <h2 className="font-heading text-[1.55rem] font-bold text-text tracking-[-0.02em]">Şifreni mi Unuttun?</h2>
        <p className="text-[0.85rem] text-text-muted mt-1.5">
          E-posta adresini gir, sana sıfırlama bağlantısı gönderelim.
        </p>
      </div>

      <AuthFormError message={error} />
      <AuthFormSuccess
        message={sent ? "E-posta adresine bağlantı gönderdik. Gelen kutunu (ve spam klasörünü) kontrol et." : null}
      />

      {!sent && (
        <>
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
          <div className="mt-7">
            <AuthSubmitButton loading={loading}>Sıfırlama Bağlantısı Gönder</AuthSubmitButton>
          </div>
        </>
      )}

      <p className="mt-6 text-center text-[0.82rem] text-text-muted">
        <Link href="/auth/login" className="font-semibold text-primary hover:text-primary-hover transition-colors duration-200">
          Giriş sayfasına dön
        </Link>
      </p>
    </form>
  );
}
