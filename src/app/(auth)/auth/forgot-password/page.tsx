import type { Metadata } from "next";
import { AuthForgotPasswordView } from "@/views/auth-forgot-password";

export const metadata: Metadata = {
  title: "Şifremi Unuttum | PayaSTEM",
};

export default function ForgotPasswordPage() {
  return <AuthForgotPasswordView />;
}
