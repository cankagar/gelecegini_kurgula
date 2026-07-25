import Link from "next/link";
import { AuthShell } from "@/widgets/auth-shell";
import { RegisterForm } from "@/features/auth";

export function AuthRegisterView() {
  return (
    <AuthShell
      eyebrow="Kayıt Ol"
      title="Bilimle geleceğini bugün kurgulamaya başla."
      description="Ücretsiz hesap oluştur, STEM içeriklerine, oyunlaştırılmış öğrenmeye ve topluluğa katıl."
      footer={
        <p className="text-[0.85rem] text-text-muted">
          Zaten hesabın var mı?{" "}
          <Link href="/auth/login" className="font-semibold text-primary hover:text-primary-hover transition-colors duration-200">
            Giriş yap
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
