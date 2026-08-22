"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useHeaderVisibility, NAV_HIDE_THRESHOLD, formatFullName } from "@/shared/lib";
import { ChevronDownIcon, ArrowRightIcon } from "@/shared/ui/icons";
import { useSyncCurrentUser } from "@/entities/user";
import { useLogout } from "@/features/auth";
import { ROUTES } from "@/shared/lib/routes";
import { Avatar } from "@/shared/ui/avatar";

type NavLink = { href: string; label: string };

// Same for everyone, logged in or not — only the CTA on the right changes.
const NAV_LINKS: NavLink[] = [
  { href: "/serbest-kursu", label: "Serbest Kürsü" },
  { href: "/oyun-merkezi", label: "Oyun Merkezi" },
  { href: "/payastem", label: "PayaSTEM" },
];

const SLIDE_TRANSITION = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { hidden, atTop } = useHeaderVisibility(NAV_HIDE_THRESHOLD);
  const user = useSyncCurrentUser();
  const logout = useLogout();
  const isOnlyUserRole = user ? user.roles.every((role) => role === "user") : false;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860) setIsMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  async function handleLogout() {
    setIsProfileOpen(false);
    setIsMobileOpen(false);
    await logout();
  }

  return (
    <>
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
    <motion.nav
      animate={{ y: !atTop && hidden ? "calc(-100% - 2rem)" : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.9 }}
      className="mt-4 md:mt-5 w-full md:w-auto rounded-[28px] border border-black/[0.06] pointer-events-auto"
      style={{
        background: "rgba(251,251,250,0.78)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        boxShadow: atTop
          ? "0 1px 2px rgba(17,17,17,0.04)"
          : "0 12px 32px -12px rgba(17,17,17,0.18), 0 1px 2px rgba(17,17,17,0.04)",
      }}
    >
      <div className="flex items-center gap-8 h-[58px] pl-5 pr-2.5 md:pl-6 md:pr-3">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo-stem.png" alt="PayaSTEM" width={110} height={44} className="h-9 w-auto" />
        </Link>

        {/* Desktop nav — identical for guests and logged-in users */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2 rounded-full text-[0.82rem] font-medium text-[#787774] hover:text-[#111111] hover:bg-black/[0.035] transition-colors duration-150"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — swaps between guest buttons and profile menu */}
        <div className="hidden md:block relative h-10 ml-2">
          <AnimatePresence mode="wait" initial={false}>
            {user ? (
              <motion.div
                key="profile"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={SLIDE_TRANSITION}
                className="flex items-center gap-2.5"
              >
              <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen((v) => !v)}
                    aria-label="Profil menüsü"
                    className="flex items-center gap-1.5 pl-1 pr-2.5 py-1.5 rounded-md hover:bg-[#F7F6F3] transition-colors duration-150"
                  >
                    <span className="text-[0.82rem] font-medium text-[#111111] max-w-[140px] truncate">
                      {formatFullName(user, user.email ?? "")}
                    </span>
                    <Avatar name={formatFullName(user, user.email ?? "?")} src={user.avatar_url} size={32} />
                    <ChevronDownIcon
                      size={14}
                      className={`text-[#787774] transition-transform duration-150 ${isProfileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 rounded-md border border-[#EAEAEA] bg-white shadow-lg py-1.5">
                      <p className="px-3.5 py-2 text-[0.78rem] font-medium text-[#111111] truncate border-b border-[#EAEAEA]">
                        {formatFullName(user, user.email ?? "")}
                      </p>
                      {!isOnlyUserRole && (
                        <Link
                          href={ROUTES.DASHBOARD.HOME}
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-3.5 py-2 text-[0.82rem] text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-colors duration-150"
                        >
                          Panele Git
                        </Link>
                      )}
                      <Link
                        href={ROUTES.PROFILE.HOME}
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-3.5 py-2 text-[0.82rem] text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-colors duration-150"
                      >
                        Profilim
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3.5 py-2 text-[0.82rem] text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-colors duration-150"
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="guest"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={SLIDE_TRANSITION}
                className="flex items-center gap-1"
              >
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-[0.82rem] font-medium text-[#787774] hover:text-[#111111] transition-colors duration-150"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-[#111111] hover:bg-[#333333] text-white text-[0.82rem] font-semibold rounded-md transition-colors duration-150 active:scale-[0.98]"
                >
                  Kayıt Ol
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label={isMobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          className="md:hidden flex flex-col justify-center gap-[5px] w-11 h-11 rounded-full hover:bg-black/[0.04] transition-colors ml-auto"
        >
          <span
            className={`w-4 h-[1.5px] bg-[#2F3437] rounded-full mx-auto transition-all duration-200 ${isMobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`w-4 h-[1.5px] bg-[#2F3437] rounded-full mx-auto transition-all duration-200 ${isMobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-4 h-[1.5px] bg-[#2F3437] rounded-full mx-auto transition-all duration-200 ${isMobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>
    </motion.nav>
    </div>

      {/* Mobile menu — fullscreen glass takeover below the floating header, links reveal staggered */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden fixed inset-x-0 top-0 bottom-0 z-40 flex flex-col pt-[92px]"
            style={{ background: "rgba(251,251,250,0.98)", backdropFilter: "blur(24px)" }}
          >
            {user && !isOnlyUserRole && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 border-b border-[#EAEAEA] px-6 py-4"
              >
                <Link
                  href={ROUTES.DASHBOARD.HOME}
                  onClick={() => setIsMobileOpen(false)}
                  className="group relative flex items-center justify-between overflow-hidden rounded-full bg-gradient-to-r from-[#111111] to-[#2A2A2A] px-5 py-3.5 text-[0.9rem] font-semibold text-white ring-1 ring-primary/40 shadow-[0_8px_20px_-8px_rgba(207,162,77,0.55)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                >
                  <span className="relative z-10">Panele Git</span>
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-90">
                    <ArrowRightIcon size={15} className="text-primary" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/25 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-full" />
                </Link>
              </motion.div>
            )}

            <div className="flex-1 overflow-y-auto px-6 pt-8 pb-4">
              <ul className="flex flex-col">
                {NAV_LINKS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-[#EAEAEA]"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block py-4 font-heading text-[1.6rem] font-bold tracking-[-0.02em] text-[#111111] transition-colors duration-200 active:text-[#787774]"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.08 + NAV_LINKS.length * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="shrink-0 border-t border-[#EAEAEA] px-6 pb-8 pt-4 flex flex-col gap-3"
            >
              {user ? (
                <>
                  <Link
                    href={ROUTES.PROFILE.HOME}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 rounded-2xl bg-[#F7F6F3] px-4 py-3 transition-colors active:bg-[#EFEEEA]"
                  >
                    <Avatar name={formatFullName(user, user.email ?? "?")} src={user.avatar_url} size={36} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.85rem] font-semibold text-[#111111]">
                        {formatFullName(user, user.email ?? "")}
                      </p>
                      <p className="text-[0.78rem] text-[#787774]">Profilim</p>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-center text-[0.82rem] font-semibold text-[#B64F4F] transition-colors active:text-[#8F3939]"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-full bg-[#111111] px-5 py-3.5 text-center text-[0.88rem] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 active:scale-[0.98]"
                  >
                    Kayıt Ol
                  </Link>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-2.5 text-center text-[0.85rem] font-medium text-[#787774] transition-colors active:text-[#111111]"
                  >
                    Giriş Yap
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
