export type RegisterPayload = {
  email: string;
  password: string;
  full_name?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string | null;
};

export type AuthResponse = {
  user: AuthUser;
};

export type RegisterResponse = {
  user: AuthUser;
  message: string;
};

export type PasswordResetPayload = {
  email: string;
};

export type PasswordResetConfirmPayload = {
  access_token: string;
  refresh_token: string;
  new_password: string;
};
