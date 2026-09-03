import { AuthShell } from "@/widgets/auth-shell";
import { LoginForm } from "@/features/auth";

export function AuthLoginView() {
  return (
    <AuthShell
      eyebrow="Giriş Yap"
      title="Öğrenmeye kaldığın yerden devam et."
      description="Hesabına giriş yaparak modüllerine, tartışmalarına ve ilerlemene anında ulaş."
    >
      <LoginForm />
    </AuthShell>
  );
}
