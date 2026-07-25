"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MailIcon, LockIcon } from "@/shared/ui/icons";
import { AuthFormError, AuthSubmitButton } from "@/widgets/auth-shell";
import { AuthTextInput, AuthPasswordInput } from "@/features/auth/ui/AuthInput";
import { login } from "@/features/auth/api/authApi";
import { ApiError } from "@/shared/api";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Giriş yapılamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-7">
        <h2 className="font-heading text-[1.55rem] font-bold text-text tracking-[-0.02em]">Giriş Yap</h2>
        <p className="text-[0.85rem] text-text-muted mt-1.5">Hesabına giriş yaparak kaldığın yerden devam et.</p>
      </div>

      <AuthFormError message={error} />

      <div className="flex flex-col gap-4">
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
        <div>
          <AuthPasswordInput
            label="Şifre"
            value={password}
            onChange={setPassword}
            icon={<LockIcon size={17} />}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
          <div className="flex justify-end mt-2">
            <Link href="/auth/forgot-password" className="text-[0.78rem] font-medium text-primary hover:text-primary-hover transition-colors duration-200">
              Şifreni mi unuttun?
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <AuthSubmitButton loading={loading}>Giriş Yap</AuthSubmitButton>
      </div>
    </form>
  );
}
