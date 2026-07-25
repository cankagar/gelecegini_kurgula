import { AuthShell } from "@/widgets/auth-shell";
import { ResetPasswordForm } from "@/features/auth";

export function AuthResetPasswordView() {
  return (
    <AuthShell
      eyebrow="Şifre Sıfırlama"
      title="Son bir adım kaldı."
      description="Yeni şifreni belirle, hesabına kaldığın yerden devam et."
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
