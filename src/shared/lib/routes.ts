const DASHBOARD = "/dashboard";
const ADMIN = `${DASHBOARD}/admin`;
const TEACHER = `${DASHBOARD}/teacher`;
const STUDENT = `${DASHBOARD}/student`;
const PROFILE = "/profile";

export const ROUTES = {
  PROFILE: {
    HOME: PROFILE,
  },
  ADMIN: {
    HOME: ADMIN,
    PROFILE: `${ADMIN}/profile`,
    CLASSROOMS: `${ADMIN}/classrooms`,
    CLASSROOM_DETAIL: (id: string) => `${ADMIN}/classrooms/${id}`,
    CLASSROOM_EDIT: (id: string) => `${ADMIN}/classrooms/${id}/edit`,
    USERS: `${ADMIN}/users`,
    USER_DETAIL: (id: string) => `${ADMIN}/users/${id}`,
  },
  TEACHER: {
    HOME: TEACHER,
    PROFILE: `${TEACHER}/profile`,
    CLASSROOMS: `${TEACHER}/classrooms`,
    CLASSROOM_DETAIL: (id: string) => `${TEACHER}/classrooms/${id}`,
  },
  STUDENT: {
    HOME: STUDENT,
    PROFILE: `${STUDENT}/profile`,
    CLASSROOMS: `${STUDENT}/classrooms`,
    CLASSROOM_DETAIL: (id: string) => `${STUDENT}/classrooms/${id}`,
  },
};