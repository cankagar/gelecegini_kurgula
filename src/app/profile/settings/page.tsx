import type { Metadata } from "next";
import { ProfileSettingsView } from "@/views/profile-settings";

export const metadata: Metadata = {
  title: "Profil Ayarları | PayaSTEM",
};

export default function ProfileSettingsPage() {
  return <ProfileSettingsView />;
}
