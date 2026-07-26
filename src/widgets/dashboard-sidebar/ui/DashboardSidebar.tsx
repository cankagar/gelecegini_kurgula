"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/entities/user";
import { ROLE_NAV_ITEMS, isDashboardRole } from "@/entities/dashboard";
import { useLogout } from "@/features/auth";

export function DashboardSidebar() {
  const user = useCurrentUser();
  const pathname = usePathname();
  const handleLogout = useLogout();
  // Always rendered inside a role layout after `useRequireRole` succeeds,
  // so `user.role` is guaranteed dashboard-eligible here.
  const items = isDashboardRole(user.role) ? ROLE_NAV_ITEMS[user.role] : [];

  return (
    <aside className="w-60 shrink-0 min-h-screen border-r border-[#EAEAEA] bg-[#FBFBFA] flex flex-col">
      <div className="h-[65px] flex items-center px-6 border-b border-[#EAEAEA]">
        <span className="font-heading text-[1.1rem] font-bold text-text tracking-[-0.02em]">PayaSTEM</span>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-[0.85rem] font-medium transition-colors duration-150 ${
                    active
                      ? "bg-[#111111] text-white"
                      : "text-[#787774] hover:text-[#111111] hover:bg-[#F0EFEC]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-[#EAEAEA]">
        <p className="px-3 pb-2 text-[0.78rem] font-medium text-text truncate">
          {user.full_name ?? user.email}
        </p>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-md text-[0.85rem] font-medium text-[#787774] hover:text-[#111111] hover:bg-[#F0EFEC] transition-colors duration-150"
        >
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
