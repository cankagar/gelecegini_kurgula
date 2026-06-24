"use client";

import { motion } from "framer-motion";
import { CinematicField } from "./CinematicField";
import { PsArrowIcon } from "./icons";

const EASE = [0.32, 0.72, 0, 1] as const;

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pt-28">
      <CinematicField particleCount={26} />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-ps-gold/30 bg-ps-gold/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-ps-gold"
        >
          Robotik &middot; Yapay Zeka &middot; Havacılık &amp; Uzay
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="font-display text-[13vw] font-semibold uppercase leading-[0.95] tracking-tight text-ps-text sm:text-[9vw] md:text-[6.4vw] lg:text-[5.4vw]"
        >
          Geleceği
          <br />
          <span className="bg-gradient-to-r from-ps-gold via-ps-gold-dark to-ps-gold bg-clip-text text-transparent">
            Kurgular
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-ps-text-soft sm:text-base"
        >
          PayaSTEM; robotik, yapay zeka, havacılık-uzay ve ileri STEM eğitimiyle
          geleceğin mühendislerini yetiştiren elit bir araştırma ve geliştirme topluluğudur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="group flex items-center gap-3 rounded-full bg-gradient-to-b from-ps-gold to-ps-gold-dark px-6 py-3 text-[13px] font-semibold text-[#1a1004] shadow-[0_0_0_1px_rgba(221,153,22,0.3),0_18px_40px_-15px_rgba(221,153,22,0.55)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_0_1px_rgba(221,153,22,0.5),0_22px_45px_-12px_rgba(221,153,22,0.75)] active:scale-[0.98]"
          >
            Projeleri Keşfet
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
              <PsArrowIcon size={13} />
            </span>
          </a>

          <a
            href="#footer"
            className="group flex items-center gap-3 rounded-full border border-ps-cyan/40 px-6 py-3 text-[13px] font-semibold text-ps-text transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-ps-cyan hover:shadow-[0_0_24px_-4px_rgba(0,200,255,0.5)] active:scale-[0.98]"
          >
            Bize Katıl
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ps-cyan/10 text-ps-cyan transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
              <PsArrowIcon size={13} />
            </span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ps-text-soft/60"
      >
        <span className="flex flex-col items-center gap-2">
          Kaydır
          <span className="h-8 w-px bg-gradient-to-b from-ps-text-soft/60 to-transparent" />
        </span>
      </motion.div>
    </section>
  );
}
