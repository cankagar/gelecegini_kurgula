const ADMIN = "/admin";
const TEACHER = "/teacher";
const STUDENT = "/student";

export const ROUTES = {
  ADMIN: {
    CLASSROOMS: `${ADMIN}/classrooms`,
    CLASSROOM_DETAIL: (id: string) => `${ADMIN}/classrooms/${id}`,
    CLASSROOM_EDIT: (id: string) => `${ADMIN}/classrooms/${id}/edit`,
    USERS: `${ADMIN}/users`,
    USER_DETAIL: (id: string) => `${ADMIN}/users/${id}`,
  },
  TEACHER: {
    CLASSROOMS: `${TEACHER}/classrooms`,
    CLASSROOM_DETAIL: (id: string) => `${TEACHER}/classrooms/${id}`,
  },
  STUDENT: {
    CLASSROOMS: `${STUDENT}/classrooms`,
    CLASSROOM_DETAIL: (id: string) => `${STUDENT}/classrooms/${id}`,
  },
};