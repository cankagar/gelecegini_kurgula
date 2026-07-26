"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CompassIcon, RocketIcon, StarIcon, OrbitIcon, HomeIcon, ArrowRightIcon } from "@/shared/ui/icons";

const SPRING = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, ease: SPRING, delay },
});

const ORBIT_ICONS = [
  { Icon: CompassIcon, color: "#CFA24D", pos: "top-[10%] left-[8%]", size: 34 },
  { Icon: RocketIcon, color: "#B87342", pos: "top-[70%] left-[14%]", size: 30 },
  { Icon: StarIcon, color: "#5B7C99", pos: "top-[16%] left-[86%]", size: 26 },
  { Icon: OrbitIcon, color: "#6A866D", pos: "top-[74%] left-[84%]", size: 32 },
];

export function NotFoundView() {
  return (
    <div className="relative min-h-[calc(100dvh-65px)] overflow-hidden bg-bg flex items-center">
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(207,162,77,0.10) 0%, transparent 60%), radial-gradient(ellipse 55% 50% at 82% 88%, rgba(91,124,153,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="hidden lg:block absolute inset-0 pointer-events-none select-none opacity-[0.14]" aria-hidden="true">
        {ORBIT_ICONS.map(({ Icon, color, pos, size }, i) => (
          <span key={i} className={`absolute ${pos}`} style={{ color }}>
            <Icon size={size} />
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-[880px] mx-auto px-6 md:px-10 py-24 text-center">
        <motion.div {...fadeUp(0.04)} className="inline-flex items-center gap-2.5 mb-8">
          <span className="w-7 h-px bg-primary/50" />
          <span className="text-[13px] uppercase tracking-[0.2em] font-bold text-primary">Hata 404</span>
          <span className="w-7 h-px bg-primary/50" />
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-heading text-[clamp(4.5rem,14vw,9rem)] font-black leading-none tracking-[-0.04em] text-text mb-4"
        >
          404
        </motion.h1>

        <motion.p
          {...fadeUp(0.16)}
          className="font-serif italic text-[clamp(1.3rem,2.6vw,1.8rem)] text-text-muted leading-tight mb-6"
        >
          Bu rota henüz keşfedilmemiş bir bölge.
        </motion.p>

        <motion.p {...fadeUp(0.22)} className="text-[1rem] text-text-muted leading-[1.72] max-w-[440px] mx-auto mb-11">
          Aradığın sayfa taşınmış, kaldırılmış ya da hiç var olmamış olabilir. Öğrenmeye kaldığın yerden devam etmek için ana sayfaya dönebilirsin.
        </motion.p>

        <motion.div {...fadeUp(0.28)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-primary hover:bg-primary-hover pl-6 pr-2 py-2 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            <HomeIcon size={17} />
            Ana Sayfaya Dön
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
              <ArrowRightIcon size={15} />
            </span>
          </Link>

          <Link
            href="/serbest-kursu"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text hover:border-primary-border hover:text-primary transition-colors duration-300"
          >
            Serbest Kürsü&apos;ye göz at
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
