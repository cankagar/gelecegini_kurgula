"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCurrentUser } from "@/entities/user";
import {
  ROLE_NAV_ITEMS,
  dashboardProfileRoute,
  isDashboardRole,
  setStoredActiveRole,
  type DashboardRole,
} from "@/entities/dashboard";
import { useLogout } from "@/features/auth";
import { ChevronsLeftIcon, LogOutIcon, MoreHorizontalIcon, UserIcon } from "@/shared/ui/icons";
import { Avatar } from "@/shared/ui/avatar";

const STORAGE_KEY = "payastem:sidebar-collapsed";
const EASE = [0.32, 0.72, 0, 1] as const;
const EXPANDED_WIDTH = 248;
const COLLAPSED_WIDTH = 76;
const MOBILE_NAV_PEEK_TOP = "30%";

// Bottom padding a page's <main> needs on mobile so its content clears the
// floating trigger button below (bottom-6 h-12) — unneeded once this sidebar
// takes over as a fixed column on md+.
export const DASHBOARD_MOBILE_MAIN_CLEARANCE_CLASS = "pb-24 md:pb-0";

const ROLE_LABELS: Record<DashboardRole, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
  student: "Öğrenci",
};

type DashboardSidebarProps = {
  // Which role's dashboard this sidebar belongs to — passed by the layout,
  // not derived from the user, since a user can hold several roles at once.
  role: DashboardRole;
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();
  const logout = useLogout();
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileNavExpanded, setMobileNavExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);
  const mobileRoleMenuRef = useRef<HTMLDivElement>(null);

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
      if (
        roleMenuRef.current &&
        !roleMenuRef.current.contains(e.target as Node) &&
        mobileRoleMenuRef.current &&
        !mobileRoleMenuRef.current.contains(e.target as Node)
      ) {
        setRoleMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeMobileNav() {
    setMobileNavOpen(false);
    setMobileNavExpanded(false);
  }

  async function handleLogout() {
    setMenuOpen(false);
    closeMobileNav();
    await logout();
  }

  function switchToRole(target: DashboardRole) {
    setRoleMenuOpen(false);
    closeMobileNav();
    setStoredActiveRole(target);
    router.push(`/dashboard/${target}`);
  }

  const items = ROLE_NAV_ITEMS[role];
  const otherRoles = user.roles.filter(isDashboardRole).filter((r) => r !== role);

  return (
    <>
    <motion.aside
      animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      transition={{ duration: 0.35, ease: EASE }}
      className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-bg-alt md:flex"
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
        <Link
          href="/"
          className="font-heading text-[1.1rem] font-bold text-text tracking-[-0.02em] whitespace-nowrap transition-opacity duration-150 hover:opacity-70"
        >
          {collapsed ? "PS" : "PayaSTEM"}
        </Link>
      </div>

      {!collapsed && (
        <div ref={roleMenuRef} className="relative px-3 pt-3">
          <button
            onClick={() => otherRoles.length > 0 && setRoleMenuOpen((v) => !v)}
            disabled={otherRoles.length === 0}
            className={`flex w-full items-center justify-between rounded-md border border-border px-3 py-2 text-[0.82rem] font-medium text-text transition-colors duration-150 ${
              otherRoles.length > 0 ? "bg-bg hover:bg-surface cursor-pointer" : "bg-bg-alt cursor-default"
            }`}
          >
            {ROLE_LABELS[role]}
            {otherRoles.length > 0 && (
              <ChevronDown
                size={14}
                className={`shrink-0 text-text-muted transition-transform duration-150 ${roleMenuOpen ? "rotate-180" : ""}`}
              />
            )}
          </button>

          <AnimatePresence>
            {roleMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="absolute left-3 right-3 z-20 mt-1.5 overflow-hidden rounded-md border border-border bg-bg py-1 shadow-lg"
              >
                <p className="px-3 pb-1 pt-1.5 text-[0.68rem] font-medium uppercase tracking-wide text-text-muted opacity-60">
                  Panel Değiştir
                </p>
                {otherRoles.map((r) => (
                  <button
                    key={r}
                    onClick={() => switchToRole(r)}
                    className="flex w-full items-center px-3 py-2 text-left text-[0.85rem] text-text transition-colors duration-150 hover:bg-surface"
                  >
                    {ROLE_LABELS[r]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-4">
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
              <Link
                href={dashboardProfileRoute(role)}
                onClick={() => setMenuOpen(false)}
                className="block px-3.5 py-2 text-[0.82rem] text-text-muted transition-colors duration-150 hover:bg-surface hover:text-text"
              >
                Profilim
              </Link>
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

    {/* Mobile trigger — floating pill, replaces the sidebar on small screens */}
    {!mobileNavOpen && (
      <button
        onClick={() => {
          setMobileNavExpanded(false);
          setMobileNavOpen(true);
        }}
        aria-label="Menüyü aç"
        className="md:hidden fixed bottom-6 left-1/2 z-40 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-text text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-150 active:scale-95"
      >
        <Menu size={20} />
      </button>
    )}

    {/* Mobile nav scrim — blurs the page peeking above the sheet */}
    <AnimatePresence>
      {mobileNavOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeMobileNav}
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}
    </AnimatePresence>

    {/* Mobile nav modal — full-screen, mirrors the desktop sidebar's items */}
    <AnimatePresence>
      {mobileNavOpen && (
        <motion.div
          initial={{ opacity: 0, top: MOBILE_NAV_PEEK_TOP }}
          animate={{ opacity: 1, top: mobileNavExpanded ? 0 : MOBILE_NAV_PEEK_TOP }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={`md:hidden fixed inset-x-0 bottom-0 z-50 flex flex-col bg-[#0a0a0a]/97 backdrop-blur-sm transition-[border-radius] duration-300 ${
            mobileNavExpanded ? "rounded-none" : "rounded-t-3xl"
          }`}
        >
          <div
            className="flex-1 overflow-y-auto px-5 pb-28 pt-10"
            onScroll={(e) => {
              if (!mobileNavExpanded && e.currentTarget.scrollTop > 4) {
                setMobileNavExpanded(true);
              }
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <Link
                href={dashboardProfileRoute(role)}
                onClick={closeMobileNav}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[0.85rem] font-medium text-white transition-colors duration-150 hover:bg-white/10"
              >
                <UserIcon size={16} className="shrink-0 text-white/70" />
                Profilim
              </Link>

              <div ref={mobileRoleMenuRef} className="relative shrink-0">
                <button
                  onClick={() => otherRoles.length > 0 && setRoleMenuOpen((v) => !v)}
                  disabled={otherRoles.length === 0}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-white/15 px-3.5 py-2.5 text-[0.85rem] font-medium text-white transition-colors duration-150 ${
                    otherRoles.length > 0 ? "bg-white/5 hover:bg-white/10" : "bg-white/5 opacity-70"
                  }`}
                >
                  {ROLE_LABELS[role]}
                  {otherRoles.length > 0 && (
                    <ChevronDown
                      size={14}
                      className={`shrink-0 text-white/60 transition-transform duration-150 ${roleMenuOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {roleMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15, ease: EASE }}
                      className="absolute right-0 z-20 mt-1.5 w-44 overflow-hidden rounded-xl border border-white/15 bg-[#161616] py-1 shadow-lg"
                    >
                      <p className="px-3 pb-1 pt-1.5 text-[0.65rem] font-medium uppercase tracking-wide text-white/40">
                        Panel Değiştir
                      </p>
                      {otherRoles.map((r) => (
                        <button
                          key={r}
                          onClick={() => switchToRole(r)}
                          className="flex w-full items-center px-3 py-2 text-left text-[0.85rem] text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                        >
                          {ROLE_LABELS[r]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="my-4 border-t border-white/10" />

            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobileNav}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[0.95rem] font-medium transition-colors duration-150 ${
                        active ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={18} className="shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="my-4 border-t border-white/10" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-[0.95rem] font-medium text-white/80 transition-colors duration-150 hover:bg-white/5 hover:text-white"
            >
              <LogOutIcon size={18} className="shrink-0" />
              Çıkış Yap
            </button>
          </div>

          <button
            onClick={closeMobileNav}
            aria-label="Menüyü kapat"
            className="fixed bottom-6 left-1/2 z-50 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-transform duration-150 active:scale-95"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
