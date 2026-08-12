const DASHBOARD = "/dashboard";
const ADMIN = `${DASHBOARD}/admin`;
const TEACHER = `${DASHBOARD}/teacher`;
const STUDENT = `${DASHBOARD}/student`;
const AUTHOR = `${DASHBOARD}/author`;
const PROFILE = "/profile";
const SERBEST_KURSU = "/serbest-kursu";

export const ROUTES = {
  PROFILE: {
    HOME: PROFILE,
  },
  SERBEST_KURSU: {
    HOME: SERBEST_KURSU,
    ARTICLE_DETAIL: (slug: string) => `${SERBEST_KURSU}/${slug}`,
    PREVIEW: `${SERBEST_KURSU}/onizleme`,
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
    CLASSROOM_EDIT: (id: string) => `${TEACHER}/classrooms/${id}/edit`,
  },
  STUDENT: {
    HOME: STUDENT,
    PROFILE: `${STUDENT}/profile`,
    CLASSROOMS: `${STUDENT}/classrooms`,
    CLASSROOM_DETAIL: (id: string) => `${STUDENT}/classrooms/${id}`,
  },
  AUTHOR: {
    HOME: AUTHOR,
    PROFILE: `${AUTHOR}/profile`,
    ARTICLE_NEW: `${AUTHOR}/articles/new`,
    ARTICLE_EDIT: (id: string) => `${AUTHOR}/articles/${id}`,
  },
};