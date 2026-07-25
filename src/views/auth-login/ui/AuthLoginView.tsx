import Link from "next/link";
import { AuthShell } from "@/widgets/auth-shell";
import { LoginForm } from "@/features/auth";

export function AuthLoginView() {
  return (
    <AuthShell
      eyebrow="Giriş Yap"
      title="Öğrenmeye kaldığın yerden devam et."
      description="Hesabına giriş yaparak modüllerine, tartışmalarına ve ilerlemene anında ulaş."
      footer={
        <p className="text-[0.85rem] text-text-muted">
          Hesabın yok mu?{" "}
          <Link href="/auth/register" className="font-semibold text-primary hover:text-primary-hover transition-colors duration-200">
            Ücretsiz kayıt ol
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
