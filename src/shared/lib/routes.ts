const DASHBOARD = "/dashboard";
const ADMIN = `${DASHBOARD}/admin`;
const TEACHER = `${DASHBOARD}/teacher`;
const STUDENT = `${DASHBOARD}/student`;

export const ROUTES = {
  ADMIN: {
    HOME: ADMIN,
    CLASSROOMS: `${ADMIN}/classrooms`,
    CLASSROOM_DETAIL: (id: string) => `${ADMIN}/classrooms/${id}`,
    CLASSROOM_EDIT: (id: string) => `${ADMIN}/classrooms/${id}/edit`,
    USERS: `${ADMIN}/users`,
    USER_DETAIL: (id: string) => `${ADMIN}/users/${id}`,
  },
  TEACHER: {
    HOME: TEACHER,
    CLASSROOMS: `${TEACHER}/classes`,
    CLASSROOM_DETAIL: (id: string) => `${TEACHER}/classes/${id}`,
  },
  STUDENT: {
    HOME: STUDENT,
    CLASSROOMS: `${STUDENT}/classrooms`,
    CLASSROOM_DETAIL: (id: string) => `${STUDENT}/classrooms/${id}`,
  },
};