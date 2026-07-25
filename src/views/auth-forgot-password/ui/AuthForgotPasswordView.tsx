import { AuthShell } from "@/widgets/auth-shell";
import { ForgotPasswordForm } from "@/features/auth";

export function AuthForgotPasswordView() {
  return (
    <AuthShell
      eyebrow="Hesap Kurtarma"
      title="Şifreni sıfırlamak sadece birkaç saniye sürer."
      description="E-posta adresine göndereceğimiz güvenli bağlantıyla yeni bir şifre belirleyebilirsin."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
