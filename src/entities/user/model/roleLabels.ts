import type { UserRole } from "./types";

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
  student: "Öğrenci",
  user: "Kullanıcı",
};
