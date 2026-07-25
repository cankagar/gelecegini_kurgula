import type { Metadata } from "next";
import { AuthRegisterView } from "@/views/auth-register";

export const metadata: Metadata = {
  title: "Kayıt Ol | PayaSTEM",
};

export default function RegisterPage() {
  return <AuthRegisterView />;
}
