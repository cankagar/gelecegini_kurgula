import type { Metadata } from "next";
import { AuthResetPasswordView } from "@/views/auth-reset-password";

export const metadata: Metadata = {
  title: "Şifreyi Sıfırla | PayaSTEM",
};

export default function ResetPasswordPage() {
  return <AuthResetPasswordView />;
}
