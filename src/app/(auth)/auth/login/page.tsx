import type { Metadata } from "next";
import { AuthLoginView } from "@/views/auth-login";

export const metadata: Metadata = {
  title: "Giriş Yap | PayaSTEM",
};

export default function LoginPage() {
  return <AuthLoginView />;
}
