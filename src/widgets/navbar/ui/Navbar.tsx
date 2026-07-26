"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useScrolledPast, NAV_HIDE_THRESHOLD } from "@/shared/lib";
import { UserIcon, ChevronDownIcon } from "@/shared/ui/icons";
import { useSyncCurrentUser, useUserStore } from "@/entities/user";
import { logout } from "@/features/auth";

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
  const scrolled = useScrolledPast(NAV_HIDE_THRESHOLD);
  const router = useRouter();
  const user = useSyncCurrentUser();
  const clearUser = useUserStore((s) => s.clearUser);

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

  async function handleLogout() {
    setIsProfileOpen(false);
    setIsMobileOpen(false);
    await logout().catch(() => {});
    clearUser();
    router.push("/");
    router.refresh();
  }

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-[#EAEAEA] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "-translate-y-full" : "translate-y-0"}`}
      style={{ background: "rgba(251,251,250,0.92)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-5xl mx-auto px-6 h-[65px] flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo-stem.png" alt="PayaSTEM" width={110} height={44} className="h-10 w-auto" />
        </Link>

        {/* Desktop nav — identical for guests and logged-in users */}
        <ul className="hidden md:flex items-center gap-0 flex-1">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3.5 py-2 text-[0.82rem] font-medium text-[#787774] hover:text-[#111111] transition-colors duration-150"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — swaps between guest buttons and profile menu */}
        <div className="hidden md:block relative h-10">
          <AnimatePresence mode="wait" initial={false}>
            {user ? (
              <motion.div
                key="profile"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={SLIDE_TRANSITION}
                className="flex items-center"
              >
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen((v) => !v)}
                    aria-label="Profil menüsü"
                    className="flex items-center gap-1.5 pl-1 pr-2.5 py-1.5 rounded-md hover:bg-[#F7F6F3] transition-colors duration-150"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#111111] text-white">
                      <UserIcon size={16} />
                    </span>
                    <ChevronDownIcon
                      size={14}
                      className={`text-[#787774] transition-transform duration-150 ${isProfileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 rounded-md border border-[#EAEAEA] bg-white shadow-lg py-1.5">
                      <p className="px-3.5 py-2 text-[0.78rem] font-medium text-[#111111] truncate border-b border-[#EAEAEA]">
                        {user.full_name ?? user.email}
                      </p>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-3.5 py-2 text-[0.82rem] text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-colors duration-150"
                      >
                        Panele Git
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
          className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 rounded-md hover:bg-[#F7F6F3] transition-colors"
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

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-[#EAEAEA] bg-[#FBFBFA] px-4 pb-5 pt-2">
          <ul className="flex flex-col">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2.5 text-[0.82rem] font-medium text-[#787774] hover:text-[#111111] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-[#EAEAEA] flex flex-col gap-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="block text-center px-4 py-2.5 rounded-md text-[0.82rem] font-semibold bg-[#111111] hover:bg-[#333333] text-white transition-colors"
              >
                Çıkış Yap
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-center px-4 py-2.5 text-[0.82rem] font-medium text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] rounded-md transition-all"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-center px-4 py-2.5 rounded-md text-[0.82rem] font-semibold bg-[#111111] hover:bg-[#333333] text-white transition-colors"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
