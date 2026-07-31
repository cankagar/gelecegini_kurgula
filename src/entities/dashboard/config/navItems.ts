import type { ComponentType } from "react";
import {
  BookIcon,
  ClipboardListIcon,
  GraduationCapIcon,
  HomeIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@/shared/ui/icons";
import type { DashboardRole } from "@/entities/dashboard/model/types";

export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string; size?: number }>;
};

// Placeholder items per role — swap in real sections as each area is built.
export const ROLE_NAV_ITEMS: Record<DashboardRole, NavItem[]> = {
  student: [
    { href: "/dashboard/student", label: "Panelim", icon: HomeIcon },
    { href: "/dashboard/student/classrooms", label: "Sınıflarım", icon: GraduationCapIcon },
    { href: "/dashboard/student/courses", label: "Derslerim", icon: BookIcon },
    { href: "/dashboard/student/assignments", label: "Ödevlerim", icon: ClipboardListIcon },
  ],
  teacher: [
    { href: "/dashboard/teacher", label: "Panelim", icon: HomeIcon },
    { href: "/dashboard/teacher/classes", label: "Sınıflarım", icon: GraduationCapIcon },
    { href: "/dashboard/teacher/students", label: "Öğrenciler", icon: UsersIcon },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Panelim", icon: HomeIcon },
    { href: "/dashboard/admin/users", label: "Kullanıcılar", icon: UsersIcon },
    { href: "/dashboard/admin/classrooms", label: "Sınıflar", icon: GraduationCapIcon },
    { href: "/dashboard/admin/reports", label: "Raporlar", icon: TrendingUpIcon },
  ],
};
