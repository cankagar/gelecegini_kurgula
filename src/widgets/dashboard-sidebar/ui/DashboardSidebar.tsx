"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import { Check, ChevronDown, Home, Search } from "lucide-react";
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
import { IconChip } from "@/shared/ui/icon-chip";
import { Avatar } from "@/shared/ui/avatar";
import { formatFullName } from "@/shared/lib";

const STORAGE_KEY = "payastem:sidebar-collapsed";
const EASE = [0.32, 0.72, 0, 1] as const;
const EXPANDED_WIDTH = 228;
const COLLAPSED_WIDTH = 64;

// Bottom padding a page's <main> needs on mobile so its content clears the
// floating trigger button below (bottom-6 h-14) — unneeded once this sidebar
// takes over as a fixed column on md+.
export const DASHBOARD_MOBILE_MAIN_CLEARANCE_CLASS = "pb-24 md:pb-0";

const ROLE_LABELS: Record<DashboardRole, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
  student: "Öğrenci",
  author: "Yazar",
};

const ROLE_ORDER: DashboardRole[] = ["admin", "teacher", "student", "author"];

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [roleQuery, setRoleQuery] = useState("");
  const [roleHighlight, setRoleHighlight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const roleSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const mobileSheetPanStartHeight = useRef(0);
  const [mobileSheetDragActive, setMobileSheetDragActive] = useState(false);
  const mobileSheetHeight = useMotionValue<number | string>("auto");
  const mobileSheetY = useMotionValue(0);

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

  function handleProfileTriggerClick() {
    if (collapsed) {
      setCollapsed(false);
      localStorage.setItem(STORAGE_KEY, "0");
      setMenuOpen(true);
      return;
    }
    setMenuOpen((v) => !v);
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

  function closeMobileNav() {
    setMobileNavOpen(false);
    setMobileSheetDragActive(false);
    mobileSheetY.set(0);
  }

  function toggleMobileNav() {
    setMobileNavOpen((v) => !v);
  }

  function handleMobileSheetPanStart() {
    if (mobileSheetRef.current) {
      mobileSheetPanStartHeight.current = mobileSheetRef.current.getBoundingClientRect().height;
      mobileSheetHeight.set(mobileSheetPanStartHeight.current);
      setMobileSheetDragActive(true);
    }
  }

  function handleMobileSheetPan(_: unknown, info: { offset: { y: number } }) {
    const dy = info.offset.y;
    if (dy < 0) {
      // Pulling the handle up grows the sheet upward — the bottom edge never moves.
      const maxHeight = window.innerHeight - 40;
      mobileSheetHeight.set(Math.min(mobileSheetPanStartHeight.current - dy, maxHeight));
      mobileSheetY.set(0);
    } else {
      // Pulling down rubber-bands the whole sheet toward dismissal instead.
      mobileSheetHeight.set(mobileSheetPanStartHeight.current);
      mobileSheetY.set(Math.min(dy, 200));
    }
  }

  function handleMobileSheetPanEnd(_: unknown, info: { offset: { y: number }; velocity: { y: number } }) {
    if (info.offset.y > 80 || info.velocity.y > 600) {
      closeMobileNav();
      return;
    }
    if (info.offset.y < -60 || info.velocity.y < -600) {
      // Pulled up decisively — snap open and stay expanded instead of springing back.
      const maxHeight = window.innerHeight - 40;
      animate(mobileSheetHeight, maxHeight, { type: "spring", stiffness: 300, damping: 32 });
      return;
    }
    animate(mobileSheetY, 0, { type: "spring", stiffness: 400, damping: 40 });
    animate(mobileSheetHeight, mobileSheetPanStartHeight.current, { type: "spring", stiffness: 300, damping: 32 });
  }

  async function handleLogout() {
    setMenuOpen(false);
    closeMobileNav();
    await logout();
  }

  function switchToRole(target: DashboardRole) {
    closeMobileNav();
    setStoredActiveRole(target);
    router.push(`/dashboard/${target}`);
  }

  const items = ROLE_NAV_ITEMS[role];
  const otherRoles = user.roles.filter(isDashboardRole).filter((r) => r !== role);
  const allRoles = ROLE_ORDER.filter((r) => r === role || otherRoles.includes(r));
  const filteredRoles = allRoles.filter((r) =>
    ROLE_LABELS[r].toLocaleLowerCase("tr-TR").includes(roleQuery.trim().toLocaleLowerCase("tr-TR")),
  );

  function openRoleModal() {
    if (otherRoles.length === 0) return;
    setRoleQuery("");
    setRoleHighlight(0);
    setRoleModalOpen(true);
  }

  function closeRoleModal() {
    setRoleModalOpen(false);
  }

  function selectRole(target: DashboardRole) {
    closeRoleModal();
    if (target !== role) {
      switchToRole(target);
    }
  }

  function handleRoleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      closeRoleModal();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setRoleHighlight((h) => Math.min(h + 1, filteredRoles.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setRoleHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredRoles[roleHighlight];
      if (target) selectRole(target);
    }
  }

  useEffect(() => {
    if (roleModalOpen) {
      roleSearchInputRef.current?.focus();
    }
  }, [roleModalOpen]);

  return (
    <>
      {/* ─ Desktop: floating island sidebar ─ */}
      <motion.aside
        animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
        transition={{ duration: 0.35, ease: EASE }}
        className="sticky top-4 z-10 ml-4 hidden h-[calc(100dvh-2rem)] shrink-0 flex-col md:flex"
      >
        <motion.div
          initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative flex h-full flex-col rounded-[1.75rem] bg-surface/60 ring-1 ring-border/70 backdrop-blur-xl"
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 rounded-[1.75rem] pointer-events-none select-none overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse 70% 45% at 10% 0%, rgba(207,162,77,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(184,115,66,0.07) 0%, transparent 65%)",
            }}
          />

          {/* Logo */}
          <div className={`relative z-10 flex h-16 shrink-0 items-center ${collapsed ? "justify-center px-0" : "px-4"}`}>
            <Link href="/" aria-label="Ana Sayfa" className={`group flex items-center ${collapsed ? "gap-0" : "gap-3"}`}>
              <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-2xl bg-text">
                <span className="flex h-20 flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-10">
                  <span className="flex h-10 w-10 items-center justify-center font-heading text-[0.85rem] font-bold text-bg">
                    PS
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center text-bg">
                    <Home size={17} />
                  </span>
                </span>
              </span>

              <span
                className={`relative block h-6 overflow-hidden transition-[max-width,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  collapsed ? "max-w-0 opacity-0" : "max-w-[140px] opacity-100"
                }`}
              >
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-6">
                  <span className="h-6 whitespace-nowrap font-heading text-[0.95rem] font-bold leading-6 tracking-[-0.02em] text-text">
                    PayaSTEM
                  </span>
                  <span className="h-6 whitespace-nowrap font-heading text-[0.95rem] font-bold leading-6 tracking-[-0.02em] text-text">
                    Ana Sayfa
                  </span>
                </span>
              </span>
            </Link>
          </div>

          {/* Collapse toggle — magnetic chip, vertically centered on the full sidebar height */}
          <button
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
            className="group absolute -right-3.5 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-bg text-text-muted ring-1 ring-border shadow-[0_2px_10px_rgba(31,31,27,0.08)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-primary hover:ring-primary-border active:scale-90"
          >
            <ChevronsLeftIcon
              size={13}
              className={`transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-0.5 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>

          {!collapsed && (
            <div className="relative z-10 px-3 pb-1">
              <button
                onClick={openRoleModal}
                disabled={otherRoles.length === 0}
                className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-[0.8rem] font-semibold transition-colors duration-200 ${
                  otherRoles.length > 0
                    ? "bg-bg text-text ring-1 ring-border hover:ring-primary-border cursor-pointer"
                    : "bg-bg/60 text-text-muted cursor-default"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {ROLE_LABELS[role]}
                </span>
                {otherRoles.length > 0 && <ChevronDown size={13} className="shrink-0 text-text-muted" />}
              </button>
            </div>
          )}

          <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-3">
            <ul className="flex flex-col gap-1">
              {items.map((item, i) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`group relative flex h-11 items-center rounded-2xl px-2.5 text-[0.85rem] font-medium transition-colors duration-150 ${
                        collapsed ? "justify-center" : ""
                      } ${active ? "text-primary-hover" : "text-text-muted hover:text-text"}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="dashboard-sidebar-active-desktop"
                          transition={{ duration: 0.35, ease: EASE }}
                          className="absolute inset-0 rounded-2xl bg-primary-tint"
                        />
                      )}
                      <IconChip
                        icon={Icon}
                        size={15}
                        className={`relative z-10 h-8 w-8 ${active ? "border-primary-border bg-bg text-primary" : "bg-bg/70"}`}
                      />
                      <span
                        className={`relative z-10 overflow-hidden whitespace-nowrap transition-[max-width,margin-left,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          collapsed ? "ml-0 max-w-0 opacity-0" : "ml-2.5 max-w-[150px] opacity-100"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <div ref={menuRef} className="relative z-10 shrink-0 px-3 py-3">
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="absolute bottom-full left-3 right-3 z-30 mb-2 overflow-hidden rounded-2xl bg-bg p-1.5 ring-1 ring-border shadow-[0_12px_32px_rgba(31,31,27,0.12)]"
                >
                  <Link
                    href={dashboardProfileRoute(role)}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[0.82rem] font-medium text-text-muted transition-colors duration-150 hover:bg-surface hover:text-text"
                  >
                    <UserIcon size={16} className="shrink-0" />
                    Profilim
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[0.82rem] font-medium text-danger transition-colors duration-150 hover:bg-danger-bg"
                  >
                    <LogOutIcon size={16} className="shrink-0" />
                    Çıkış Yap
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleProfileTriggerClick}
              title={collapsed ? formatFullName(user, user.email ?? "?") : undefined}
              className={`flex h-12 w-full items-center rounded-2xl px-2 ring-1 ring-transparent transition-all duration-200 hover:bg-bg hover:ring-border ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Avatar name={formatFullName(user, user.email ?? "?")} src={user.avatar_url} size={30} />
              <span
                className={`flex-1 overflow-hidden whitespace-nowrap text-left text-[0.82rem] font-semibold text-text transition-[max-width,margin-left,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  collapsed ? "ml-0 max-w-0 opacity-0" : "ml-3 max-w-[150px] opacity-100"
                }`}
              >
                {formatFullName(user, user.email ?? "?")}
              </span>
              <MoreHorizontalIcon
                size={16}
                className={`shrink-0 text-text-muted transition-[max-width,margin-left,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  collapsed ? "ml-0 max-w-0 opacity-0" : "ml-1 max-w-[16px] opacity-100"
                }`}
              />
            </button>
          </div>
        </motion.div>
      </motion.aside>

      {/* ─ Mobile: floating morphing trigger, replaces the sidebar on small screens ─ */}
      <button
        onClick={toggleMobileNav}
        aria-label={mobileNavOpen ? "Menüyü kapat" : "Menüyü aç"}
        className={`md:hidden fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center rounded-full shadow-[0_8px_28px_rgba(31,31,27,0.25)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-90 ${
          mobileNavOpen ? "h-11 w-11 bg-bg text-text ring-1 ring-border" : "h-12 w-12 bg-text text-bg"
        }`}
      >
        <span className="relative flex h-4 w-5 items-center justify-center">
          <motion.span
            animate={mobileNavOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute h-[1.5px] w-5 rounded-full bg-current"
          />
          <motion.span
            animate={mobileNavOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute h-[1.5px] w-5 rounded-full bg-current"
          />
        </span>
      </button>

      {/* Mobile nav scrim — blurs the page peeking above the sheet */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileNav}
            className="md:hidden fixed inset-0 z-40 bg-text/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile nav modal — sized to its content, drag-to-dismiss from the handle */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            ref={mobileSheetRef}
            style={{ y: mobileSheetY, height: mobileSheetDragActive ? mobileSheetHeight : "auto" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`md:hidden fixed inset-x-0 bottom-3 z-40 flex flex-col rounded-[2rem] bg-text/95 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl ${
              mobileSheetDragActive ? "" : "max-h-[75dvh]"
            }`}
          >
            <motion.div
              onPanStart={handleMobileSheetPanStart}
              onPan={handleMobileSheetPan}
              onPanEnd={handleMobileSheetPanEnd}
              className="flex shrink-0 touch-none justify-center pb-2 pt-3"
            >
              <span className="h-1 w-10 rounded-full bg-bg/20" />
            </motion.div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-1">
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  onClick={closeMobileNav}
                  aria-label="Ana Sayfa"
                  title="Ana Sayfa"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg/5 ring-1 ring-bg/15 transition-colors duration-150 hover:bg-bg/10"
                >
                  <Home size={17} className="text-bg/85" />
                </Link>

                <Link
                  href={dashboardProfileRoute(role)}
                  onClick={closeMobileNav}
                  className="flex h-11 items-center gap-2 rounded-xl bg-bg/5 px-3.5 text-[0.85rem] font-medium text-bg ring-1 ring-bg/15 transition-colors duration-150 hover:bg-bg/10"
                >
                  <UserIcon size={15} className="shrink-0 text-bg/80" />
                  Profilim
                </Link>

                <button
                  onClick={openRoleModal}
                  disabled={otherRoles.length === 0}
                  className={`flex h-11 min-w-0 flex-1 items-center justify-between gap-1.5 truncate rounded-xl px-3.5 text-[0.85rem] font-medium text-bg ring-1 ring-bg/15 transition-colors duration-150 ${
                    otherRoles.length > 0 ? "bg-bg/5 hover:bg-bg/10 cursor-pointer" : "bg-bg/5 opacity-70"
                  }`}
                >
                  <span className="truncate">{ROLE_LABELS[role]}</span>
                  {otherRoles.length > 0 && <ChevronDown size={14} className="shrink-0 text-bg/60" />}
                </button>
              </div>

              <div className="my-4 border-t border-bg/10" />

              <ul className="flex flex-col gap-1 rounded-2xl bg-bg/5 p-1.5 ring-1 ring-bg/10">
                {items.map((item, i) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: 0.04 + i * 0.035 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileNav}
                        className={`relative flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[0.9rem] font-medium transition-colors duration-150 ${
                          active ? "text-bg" : "text-bg/75 hover:text-bg"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="dashboard-sidebar-active-mobile"
                            transition={{ duration: 0.35, ease: EASE }}
                            className="absolute inset-0 rounded-xl bg-bg/10"
                          />
                        )}
                        <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg/10">
                          <Icon size={14} />
                        </span>
                        <span className="relative z-10">{item.label}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <div className="shrink-0 border-t border-bg/10 px-5 pb-8 pt-4">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-2xl px-2.5 py-2.5 text-left text-[0.9rem] font-medium text-bg/75 transition-colors duration-150 hover:text-bg"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg/10">
                  <LogOutIcon size={14} className="shrink-0" />
                </span>
                Çıkış Yap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rol değiştirme — arama kutulu komut paleti */}
      <AnimatePresence>
        {roleModalOpen && (
          <>
            <motion.div
              key="role-modal-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeRoleModal}
              className="fixed inset-0 z-[110] bg-text/40 backdrop-blur-sm"
            />
            <motion.div
              key="role-modal-panel"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="fixed left-1/2 top-1/2 z-[111] w-[min(320px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-text p-3 shadow-[0_20px_48px_rgba(31,31,27,0.18)] ring-1 ring-bg/10 md:bg-bg md:ring-0"
            >
              <div className="flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-bg/15 md:ring-border">
                <Search size={15} className="shrink-0 text-bg/50 md:text-text-muted" />
                <input
                  ref={roleSearchInputRef}
                  value={roleQuery}
                  onChange={(e) => {
                    setRoleQuery(e.target.value);
                    setRoleHighlight(0);
                  }}
                  onKeyDown={handleRoleSearchKeyDown}
                  placeholder="Rol ara..."
                  className="w-full bg-transparent text-[0.82rem] text-bg placeholder:text-bg/45 focus:outline-none md:text-text md:placeholder:text-text-muted"
                />
              </div>

              <div className="mt-2 max-h-60 overflow-y-auto">
                {filteredRoles.length === 0 ? (
                  <p className="px-3 py-6 text-center text-[0.8rem] text-bg/50 md:text-text-muted">Eşleşen rol yok</p>
                ) : (
                  filteredRoles.map((r, i) => {
                    const active = r === role;
                    return (
                      <button
                        key={r}
                        onMouseEnter={() => setRoleHighlight(i)}
                        onClick={() => selectRole(r)}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[0.85rem] font-medium transition-colors duration-150 ${
                          active
                            ? "bg-bg/15 text-bg md:bg-primary-tint md:text-primary-hover"
                            : i === roleHighlight
                              ? "bg-bg/10 text-bg md:bg-surface md:text-text"
                              : "text-bg/75 hover:bg-bg/10 md:text-text md:hover:bg-surface"
                        }`}
                      >
                        {ROLE_LABELS[r]}
                        {active && <Check size={14} className="ml-auto shrink-0" />}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
