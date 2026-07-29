// Public API for the `config` segment (env, constants).
export const API_BASE_URL =
  typeof window !== "undefined"
    ? "/api"
    : process.env.INTERNAL_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000/api";
