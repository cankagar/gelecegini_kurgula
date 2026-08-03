import type { Metadata } from "next";
import { ProfileView } from "@/views/profile";

export const metadata: Metadata = {
  title: "Profil | PayaSTEM",
};

export default function ProfilePage() {
  return <ProfileView />;
}
