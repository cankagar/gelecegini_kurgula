"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@/shared/ui/icons";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860) setIsMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo-stem.png" alt="PayaSTEM" width={120} height={48} className="h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text hover:bg-bg transition-all duration-200 cursor-pointer"
            >
              PayaSTEM
              <ChevronDownIcon
                size={14}
                className={`text-text-muted transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-52 bg-surface border border-border rounded-xl shadow-md p-1.5 z-50">
                {[
                  { href: "/payastem/junior-stem", label: "Junior STEM" },
                  { href: "/payastem/ilkokul-stem", label: "İlkokul STEM" },
                  { href: "/payastem/ortaokul-stem", label: "Ortaokul STEM" },
                  { href: "/payastem/lise-stem", label: "Lise STEM" },
                  { href: "/payastem/nedir", label: "PayaSTEM Nedir?" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-3 py-2 text-sm text-text-muted hover:text-text hover:bg-bg rounded-lg transition-all duration-150"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
          {[
            { href: "/serbest-kursu", label: "Serbest Kürsü" },
            { href: "/oyun-merkezi", label: "Oyun Merkezi" },
            { href: "/admin/basvurular", label: "Yönetim" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3.5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text hover:bg-bg transition-all duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text transition-colors duration-200"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold pl-4 pr-1.5 py-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            Kayıt Ol
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label={isMobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 rounded-lg hover:bg-bg transition-colors"
        >
          <span className={`w-5 h-[2px] bg-text rounded-full mx-auto transition-all duration-200 ${isMobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`w-5 h-[2px] bg-text rounded-full mx-auto transition-all duration-200 ${isMobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-[2px] bg-text rounded-full mx-auto transition-all duration-200 ${isMobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 pb-4 pt-2">
          <ul className="flex flex-col gap-0.5">
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:text-text hover:bg-bg transition-all"
              >
                PayaSTEM
                <ChevronDownIcon size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isDropdownOpen && (
                <div className="mt-1 ml-3 pl-3 border-l-2 border-border flex flex-col gap-0.5">
                  {[
                    { href: "/payastem/junior-stem", label: "Junior STEM" },
                    { href: "/payastem/ilkokul-stem", label: "İlkokul STEM" },
                    { href: "/payastem/ortaokul-stem", label: "Ortaokul STEM" },
                    { href: "/payastem/lise-stem", label: "Lise STEM" },
                    { href: "/payastem/nedir", label: "PayaSTEM Nedir?" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => { setIsDropdownOpen(false); setIsMobileOpen(false); }}
                      className="block px-3 py-2 text-sm text-text-muted hover:text-text rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {[
              { href: "/serbest-kursu", label: "Serbest Kürsü" },
              { href: "/oyun-merkezi", label: "Oyun Merkezi" },
              { href: "/admin/basvurular", label: "Yönetim" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:text-text hover:bg-bg transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
            <Link href="/login" onClick={() => setIsMobileOpen(false)} className="block text-center px-4 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:bg-bg transition-all">
              Giriş Yap
            </Link>
            <Link href="/register" onClick={() => setIsMobileOpen(false)} className="block text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary hover:bg-primary-hover text-white transition-all">
              Kayıt Ol
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
