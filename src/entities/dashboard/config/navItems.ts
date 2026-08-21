import type { ComponentType } from "react";
import {
  ClipboardListIcon,
  FileTextIcon,
  GraduationCapIcon,
  HomeIcon,
  LockIcon,
  MegaphoneIcon,
  UsersIcon,
} from "@/shared/ui/icons";
import type { DashboardRole } from "@/entities/dashboard/model/types";
import { ROUTES } from "@/shared/lib/routes";

export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string; size?: number }>;
};

// Placeholder items per role — swap in real sections as each area is built.
export const ROLE_NAV_ITEMS: Record<DashboardRole, NavItem[]> = {
  student: [
    { href: ROUTES.STUDENT.HOME, label: "Panelim", icon: HomeIcon },
    { href: ROUTES.STUDENT.CLASSROOMS, label: "Sınıflarım", icon: GraduationCapIcon },
    { href: ROUTES.STUDENT.ATTENDANCE, label: "Yoklamalarım", icon: ClipboardListIcon },
  ],
  teacher: [
    { href: ROUTES.TEACHER.HOME, label: "Panelim", icon: HomeIcon },
    { href: ROUTES.TEACHER.CLASSROOMS, label: "Sınıflarım", icon: GraduationCapIcon },
  ],
  admin: [
    { href: ROUTES.ADMIN.HOME, label: "Panelim", icon: HomeIcon },
    { href: ROUTES.ADMIN.USERS, label: "Kullanıcılar", icon: UsersIcon },
    { href: ROUTES.ADMIN.CLASSROOMS, label: "Sınıflar", icon: GraduationCapIcon },
    { href: ROUTES.ADMIN.AUDIT_LOG, label: "Denetim Kaydı", icon: LockIcon },
    { href: ROUTES.ADMIN.ANNOUNCEMENTS, label: "Duyurular", icon: MegaphoneIcon },
  ],
  author: [{ href: ROUTES.AUTHOR.HOME, label: "Yazılarım", icon: FileTextIcon }],
};
