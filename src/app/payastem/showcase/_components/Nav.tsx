"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PsCloseIcon } from "./icons";

const LINKS = [
  { label: "Anasayfa", href: "#hero" },
  { label: "Hakkımızda", href: "#about" },
  { label: "Takımlar", href: "#teams" },
  { label: "Projeler", href: "#projects" },
  { label: "Yarışmalar", href: "#competitions" },
  { label: "Başarılar", href: "#achievements" },
  { label: "Galeri", href: "#gallery" },
  { label: "İletişim", href: "#footer" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-6 z-30 flex justify-center px-4">
        <nav
          className={`flex w-full max-w-3xl items-center justify-between gap-6 rounded-full border px-5 py-2.5 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? "border-white/10 bg-ps-bg/85 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)]"
              : "border-white/5 bg-ps-bg/30"
          }`}
        >
          <a href="#hero" className="flex items-center shrink-0">
            <Image src="/logo-stem.png" alt="PayaSTEM" width={100} height={40} className="h-10 w-auto" />
          </a>

          <ul className="hidden items-center gap-6 text-[12.5px] font-medium text-ps-text-soft lg:flex">
            {LINKS.slice(0, 6).map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors duration-300 hover:text-ps-cyan">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            aria-label="Menü"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-ps-text transition-colors duration-300 hover:border-ps-cyan/50 hover:text-ps-cyan"
          >
            <span className="relative h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.4px] w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.4px] w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-20 flex items-center justify-center bg-ps-bg/90 backdrop-blur-3xl"
          >
            <button
              aria-label="Kapat"
              onClick={() => setOpen(false)}
              className="absolute right-7 top-7 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ps-text hover:border-ps-cyan/50 hover:text-ps-cyan"
            >
              <PsCloseIcon size={16} />
            </button>
            <ul className="flex flex-col items-center gap-3 text-center">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.32, 0.72, 0, 1],
                    delay: 0.08 + i * 0.05,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-medium text-ps-text transition-colors duration-300 hover:text-ps-gold sm:text-5xl"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
