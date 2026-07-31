"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCurrentUser } from "@/entities/user";
import { ROLE_NAV_ITEMS, isDashboardRole } from "@/entities/dashboard";
import { useLogout } from "@/features/auth";
import { ChevronsLeftIcon, LogOutIcon, MoreHorizontalIcon } from "@/shared/ui/icons";
import { Avatar } from "@/shared/ui/avatar";

const STORAGE_KEY = "payastem:sidebar-collapsed";
const EASE = [0.32, 0.72, 0, 1] as const;
const EXPANDED_WIDTH = 248;
const COLLAPSED_WIDTH = 76;

export function DashboardSidebar() {
  const user = useCurrentUser();
  const pathname = usePathname();
  const logout = useLogout();
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      setCollapsed(true);
    }
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
  }

  // Always rendered inside a role layout after `useRequireRole` succeeds,
  // so `user.role` is guaranteed dashboard-eligible here.
  const items = isDashboardRole(user.role) ? ROLE_NAV_ITEMS[user.role] : [];

  return (
    <motion.aside
      animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      transition={{ duration: 0.35, ease: EASE }}
      className="relative shrink-0 min-h-screen border-r border-border bg-bg-alt flex flex-col"
    >
      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
        className="group absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-bg text-text-muted ring-1 ring-border shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-primary hover:ring-primary-border hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-90"
      >
        <ChevronsLeftIcon
          size={14}
          className={`transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-0.5 ${collapsed ? "rotate-180" : ""}`}
        />
      </button>

      <div className="h-[65px] flex items-center px-6 border-b border-border overflow-hidden">
        <span className="font-heading text-[1.1rem] font-bold text-text tracking-[-0.02em] whitespace-nowrap">
          {collapsed ? "PS" : "PayaSTEM"}
        </span>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex h-10 items-center gap-3 rounded-md px-3 text-[0.85rem] font-medium transition-colors duration-150 ${
                    collapsed ? "justify-center" : ""
                  } ${
                    active
                      ? "bg-primary text-cta-text"
                      : "text-text-muted hover:bg-surface hover:text-text"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      collapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div ref={menuRef} className="relative px-3 py-4 border-t border-border">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute bottom-full left-3 z-20 mb-2 w-52 overflow-hidden rounded-md border border-border bg-bg py-1.5 shadow-lg"
            >
              <p className="cursor-not-allowed px-3.5 py-2 text-[0.82rem] text-text-muted opacity-60">
                Profilim
              </p>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-[0.82rem] text-text-muted transition-colors duration-150 hover:bg-surface hover:text-text"
              >
                <LogOutIcon size={16} className="shrink-0" />
                Çıkış Yap
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          title={collapsed ? (user.full_name ?? user.email ?? "?") : undefined}
          className={`flex h-10 w-full items-center gap-3 rounded-md px-1.5 transition-colors duration-150 hover:bg-surface ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Avatar name={user.full_name ?? user.email ?? "?"} size={28} />
          <span
            className={`flex-1 overflow-hidden whitespace-nowrap text-left text-[0.82rem] font-medium text-text transition-[max-width,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              collapsed ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"
            }`}
          >
            {user.full_name ?? user.email ?? "?"}
          </span>
          <MoreHorizontalIcon
            size={16}
            className={`shrink-0 text-text-muted transition-[max-width,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              collapsed ? "max-w-0 opacity-0" : "max-w-[16px] opacity-100"
            }`}
          />
        </button>
      </div>
    </motion.aside>
  );
}
