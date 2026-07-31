import type { ComponentType } from "react";
import {
  GraduationCapIcon,
  HomeIcon,
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
  ],
  teacher: [
    { href: "/dashboard/teacher", label: "Panelim", icon: HomeIcon },
    { href: "/dashboard/teacher/classes", label: "Sınıflarım", icon: GraduationCapIcon },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Panelim", icon: HomeIcon },
    { href: "/dashboard/admin/users", label: "Kullanıcılar", icon: UsersIcon },
    { href: "/dashboard/admin/classrooms", label: "Sınıflar", icon: GraduationCapIcon },
  ],
};
