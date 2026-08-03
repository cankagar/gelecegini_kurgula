import type { UserRole } from "./types";

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
  student: "Öğrenci",
  author: "Yazar",
  user: "Kullanıcı",
};
