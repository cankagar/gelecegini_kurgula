// Matches the backend's `UserRole` enum exactly — includes "user", the
// default for accounts an admin hasn't assigned a dashboard role to yet.
export type UserRole = "student" | "teacher" | "admin" | "author" | "user";

// A user can hold more than one role at once (e.g. teacher + author) — the
// backend now models this as a many-to-many `user_roles` table, not a
// single column.
export type User = {
  id: string;
  email: string | null;
  full_name: string | null;
  roles: UserRole[];
};

// Full shape returned by the admin-only `/v1/users` endpoints.
export type AdminUser = User & {
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
