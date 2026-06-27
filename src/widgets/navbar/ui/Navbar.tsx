"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@/shared/ui/icons";

const PAYASTEM_LINKS = [
  { href: "/payastem/junior-stem", label: "Junior STEM" },
  { href: "/payastem/ilkokul-stem", label: "İlkokul STEM" },
  { href: "/payastem/ortaokul-stem", label: "Ortaokul STEM" },
  { href: "/payastem/lise-stem", label: "Lise STEM" },
  { href: "/payastem/nedir", label: "PayaSTEM Nedir?" },
];

const NAV_LINKS = [
  { href: "/serbest-kursu", label: "Serbest Kürsü" },
  { href: "/oyun-merkezi", label: "Oyun Merkezi" },
  { href: "/admin/basvurular", label: "Yönetim" },
];

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
    <nav
      className="sticky top-0 z-50 border-b border-[#EAEAEA]"
      style={{ background: "rgba(251,251,250,0.92)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-5xl mx-auto px-6 h-[65px] flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo-stem.png" alt="PayaSTEM" width={110} height={44} className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0 flex-1">
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 px-3.5 py-2 text-[0.82rem] font-medium text-[#787774] hover:text-[#111111] transition-colors duration-150 cursor-pointer"
            >
              PayaSTEM
              <ChevronDownIcon
                size={13}
                className={`text-[#787774] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#EAEAEA] rounded-lg p-1 z-50"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
              >
                {PAYASTEM_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-3 py-2 text-[0.82rem] text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] rounded-md transition-all duration-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>

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

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/login"
            className="px-4 py-2 text-[0.82rem] font-medium text-[#787774] hover:text-[#111111] transition-colors duration-150"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-[#111111] hover:bg-[#333333] text-white text-[0.82rem] font-semibold rounded-md transition-colors duration-150 active:scale-[0.98]"
          >
            Kayıt Ol
          </Link>
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
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-[0.82rem] font-medium text-[#787774] hover:text-[#111111] transition-colors"
              >
                PayaSTEM
                <ChevronDownIcon
                  size={13}
                  className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isDropdownOpen && (
                <div className="mt-0.5 ml-3 pl-3 border-l border-[#EAEAEA] flex flex-col">
                  {PAYASTEM_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => { setIsDropdownOpen(false); setIsMobileOpen(false); }}
                      className="block px-2 py-2 text-[0.8rem] text-[#787774] hover:text-[#111111] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

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
            <Link
              href="/login"
              onClick={() => setIsMobileOpen(false)}
              className="block text-center px-4 py-2.5 text-[0.82rem] font-medium text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] rounded-md transition-all"
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileOpen(false)}
              className="block text-center px-4 py-2.5 rounded-md text-[0.82rem] font-semibold bg-[#111111] hover:bg-[#333333] text-white transition-colors"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
