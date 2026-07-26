// Matches the backend's `UserRole` enum exactly — includes "user", the
// default for accounts an admin hasn't assigned a dashboard role to yet.
export type UserRole = "student" | "teacher" | "admin" | "user";

export type User = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
};
