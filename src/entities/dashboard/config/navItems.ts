import type { DashboardRole } from "@/entities/dashboard/model/types";

export type NavItem = {
  href: string;
  label: string;
};

// Placeholder items per role — swap in real sections as each area is built.
export const ROLE_NAV_ITEMS: Record<DashboardRole, NavItem[]> = {
  student: [
    { href: "/dashboard/student", label: "Panelim" },
    { href: "/dashboard/student/courses", label: "Derslerim" },
    { href: "/dashboard/student/assignments", label: "Ödevlerim" },
  ],
  teacher: [
    { href: "/dashboard/teacher", label: "Panelim" },
    { href: "/dashboard/teacher/classes", label: "Sınıflarım" },
    { href: "/dashboard/teacher/students", label: "Öğrenciler" },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Panelim" },
    { href: "/dashboard/admin/users", label: "Kullanıcılar" },
    { href: "/dashboard/admin/classrooms", label: "Sınıflar" },
    { href: "/dashboard/admin/reports", label: "Raporlar" },
  ],
};
