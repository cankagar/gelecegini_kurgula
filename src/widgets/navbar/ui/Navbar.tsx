"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useScrolledPast, NAV_HIDE_THRESHOLD } from "@/shared/lib";

const NAV_LINKS = [
  { href: "/serbest-kursu", label: "Serbest Kürsü" },
  { href: "/oyun-merkezi", label: "Oyun Merkezi" },
  { href: "/payastem/nedir", label: "PayaSTEM" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const scrolled = useScrolledPast(NAV_HIDE_THRESHOLD);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860) setIsMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        {/* Desktop nav */}
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
