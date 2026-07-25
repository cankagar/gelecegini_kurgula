"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockIcon } from "@/shared/ui/icons";
import { AuthFormError, AuthFormSuccess, AuthSubmitButton } from "@/widgets/auth-shell";
import { AuthPasswordInput } from "@/features/auth/ui/AuthInput";
import { confirmPasswordReset } from "@/features/auth/api/authApi";
import { ApiError } from "@/shared/api";

function readRecoveryTokens(): { accessToken: string; refreshToken: string } | null {
  if (typeof window === "undefined") return null;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const accessToken = hash.get("access_token");
  const refreshToken = hash.get("refresh_token");
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

export function ResetPasswordForm() {
  const router = useRouter();
  const [tokens, setTokens] = useState<{ accessToken: string; refreshToken: string } | null>(null);
  const [tokensChecked, setTokensChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Recovery token'lar Supabase'den URL fragment'inde gelir — sadece
    // tarayıcıda okunabilir, bu yüzden effect dışında hesaplanamaz.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTokens(readRecoveryTokens());
    setTokensChecked(true);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!tokens) {
      setError("Bağlantı geçersiz veya süresi dolmuş. Lütfen yeni bir sıfırlama isteği oluştur.");
      return;
    }
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
      await confirmPasswordReset({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        new_password: password,
      });
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 1800);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Şifre güncellenemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-7">
        <span className="inline-flex items-center rounded-full bg-primary-tint px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-3">
          Yeni Şifre
        </span>
        <h2 className="font-heading text-[1.55rem] font-bold text-text tracking-[-0.02em]">Şifreni Sıfırla</h2>
        <p className="text-[0.85rem] text-text-muted mt-1.5">Hesabın için yeni bir şifre belirle.</p>
      </div>

      <AuthFormError message={error ?? (tokensChecked && !tokens ? "Bu bağlantı geçersiz görünüyor." : null)} />
      <AuthFormSuccess message={success ? "Şifren güncellendi. Giriş sayfasına yönlendiriliyorsun…" : null} />

      {!success && (
        <>
          <div className="flex flex-col gap-4">
            <AuthPasswordInput
              label="Yeni Şifre"
              value={password}
              onChange={setPassword}
              icon={<LockIcon size={17} />}
              placeholder="En az 8 karakter"
              autoComplete="new-password"
              required
            />
            <AuthPasswordInput
              label="Yeni Şifre (Tekrar)"
              value={confirmPassword}
              onChange={setConfirmPassword}
              icon={<LockIcon size={17} />}
              placeholder="Şifreni tekrar gir"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="mt-7">
            <AuthSubmitButton loading={loading} disabled={!tokens}>
              Şifreyi Güncelle
            </AuthSubmitButton>
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
