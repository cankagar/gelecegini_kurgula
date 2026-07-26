export type UserRole = "student" | "teacher" | "admin";

export type User = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
};
